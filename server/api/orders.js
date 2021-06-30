const express = require('express')
const router = express.Router()
const { createOrder, getAllOrders } = require('../db')

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

    try {
        const order = await createOrder(orderuserid)
        res.send({order})
    } catch (error) {
        throw error
    }
})

module.exports = router