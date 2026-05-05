const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');

const buildCookieOptions = () => ({
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 5 * 60 * 60 * 1000,
});

const signToken = (userId) => jwt.sign(
    { user: { id: userId } },
    process.env.JWT_SECRET,
    { expiresIn: '5h' },
);

const sendAuthResponse = (res, statusCode, user, message) => {
    const token = signToken(user.id);
    res
        .cookie('token', token, buildCookieOptions())
        .status(statusCode)
        .json({
            message,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
            },
        });
};

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        user = new User({
            name,
            email,
            password: await bcrypt.hash(password, salt),
        });

        await user.save();

        return sendAuthResponse(res, 201, user, 'Account created successfully');
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        return sendAuthResponse(res, 200, user, 'Signed in successfully');
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        return res.json(user);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.logout = (req, res) => {
    res
        .clearCookie('token', buildCookieOptions())
        .json({ message: 'Signed out successfully' });
};

exports.forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: 'There is no user with that email' });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

        await user.save();

        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

        console.log(`\n\n================================`);
        console.log(`PASSWORD RESET DEV LINK`);
        console.log(`================================`);
        console.log(`${resetUrl}`);
        console.log(`================================\n\n`);

        return res.status(200).json({
            message: 'Password reset link generated. Check console for link.',
            devResetUrl: resetUrl,
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        return sendAuthResponse(res, 200, user, 'Password reset successful');
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Server error' });
    }
};
