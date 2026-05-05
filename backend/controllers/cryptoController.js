const Crypto = require('../models/Crypto');

exports.getAllCryptos = async (req, res) => {
    try {
        const cryptos = await Crypto.find().sort({ createdAt: -1 });
        return res.json(cryptos);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.getTopGainers = async (req, res) => {
    try {
        const cryptos = await Crypto.find().sort({ change24h: -1 });
        return res.json(cryptos);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.getNewListings = async (req, res) => {
    try {
        const cryptos = await Crypto.find().sort({ createdAt: -1 });
        return res.json(cryptos);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.createCrypto = async (req, res) => {
    const { name, symbol, price, image, change24h } = req.body;

    if (!name || !symbol || price === undefined || change24h === undefined) {
        return res.status(400).json({ message: 'Name, symbol, price, and 24h change are required' });
    }

    const parsedPrice = Number(price);
    const parsedChange = Number(change24h);

    if (Number.isNaN(parsedPrice) || Number.isNaN(parsedChange)) {
        return res.status(400).json({ message: 'Price and 24h change must be valid numbers' });
    }

    try {
        const newCrypto = new Crypto({
            name,
            symbol: symbol.toUpperCase(),
            price: parsedPrice,
            image,
            change24h: parsedChange,
        });

        const savedCrypto = await newCrypto.save();
        return res.status(201).json({
            message: 'Cryptocurrency successfully added',
            crypto: savedCrypto,
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Server error' });
    }
};
