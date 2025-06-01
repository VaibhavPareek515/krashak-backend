const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create a new order
router.post('/create', async (req, res) => {
    try {
        const {userId, userName, userEmail, price, orderDate } = req.body;

        // Basic validation
        if (!userId || !userName || !userEmail || !price) {
            return res.status(400).json({ message: 'Udi,Name, email, and price are required' });
        }

        // Create the order
        const order = await Order.create({
            userId,
            userName,
            userEmail,
            price,
            orderDate // optional; will default to Date.now if not provided
        });

        res.status(201).json({
            status: 'success',
            data: {
                order
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }

});

// GET /api/orders/user/:userId
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const orders = await Order.find({ userId });

        res.status(200).json({
            status: 'success',
            results: orders.length,
            data: { orders }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});


module.exports = router;
