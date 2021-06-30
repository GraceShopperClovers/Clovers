const express = require('express')
const router = express.Router()
const { createOrder, getAllOrders } = require('../db')
const { openOrder } = require('./utils')

// GET api/orders

router.get('/', async (req, res) => {
    try {
        const orders = await getAllOrders()
        res.send({ orders })
    } catch (error) {
        throw error
    }
})

// POST api/orders


router.post('/', async (req, res, next) => {
    const { orderuserid } = req.body
    const orderData = {}
    orderData.orderuserid = orderuserid
    try {
        const order = await createOrder(orderData)
        res.send({order})
    } catch (error) {
        throw error
    }
})

module.exports = router