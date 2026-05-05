const jwt = require('jsonwebtoken');

const getCookieToken = (cookieHeader = '') => {
    const tokenCookie = cookieHeader
        .split(';')
        .map((cookie) => cookie.trim())
        .find((cookie) => cookie.startsWith('token='));

    if (!tokenCookie) {
        return null;
    }

    return decodeURIComponent(tokenCookie.split('=').slice(1).join('='));
};

module.exports = function(req, res, next) {
    const headerToken = req.header('Authorization');
    const cookieToken = getCookieToken(req.headers.cookie);
    const token = headerToken || cookieToken;

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const actualToken = token.startsWith('Bearer ') ? token.slice(7) : token;
        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
