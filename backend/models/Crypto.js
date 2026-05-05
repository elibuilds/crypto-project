const mongoose = require('mongoose');

const CryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    change24h: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Crypto', CryptoSchema);
