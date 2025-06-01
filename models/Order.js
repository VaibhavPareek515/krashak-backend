const mongoose = require('mongoose');
const validator = require('validator');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'User ID is required']
    },
    userName: {
        type: String,
        required: [true, 'User name is required'],
        trim: true
    },
    userEmail: {
        type: String,
        required: [true, 'User email is required'],
        lowercase: true,
        validate: [email => validator.isEmail(email), 'Please provide a valid email']
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        required: [true, 'Order price is required'],
        min: [0, 'Price must be positive']
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
