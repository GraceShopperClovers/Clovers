const express = require('express')
const router = express.Router()
const { createOrder, getAllOrders, getOrderByOrdernum } = require('../db')
const { openOrder } = require('./utils')

// GET api/orders

router.get('/', async (req, res) => {
    try {
        const orders = await getAllOrders()
        res.send( orders)
    } catch (error) {
        throw error
    }
})

// GET api/orders/:ordernum

router.get('/:ordernum', async (req, res)=>{
    const {ordernum} = req.params
    try {
        const order = await getOrderByOrdernum(ordernum)
        res.send(order)
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
        res.send(order)
    } catch (error) {
        throw error
    }
})

module.exports = router