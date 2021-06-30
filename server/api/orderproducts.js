const express = require('express')
const router = express.Router()
const { createOrderProduct, getAllOrderProducts, getOrderProductsByOrderNum } = require('../db')


// GET api/orderproducts

router.get('/', async (req, res) => {
    try {
        const orderProducts = await getAllOrderProducts()
        res.send({ orderProducts })
    } catch (error) {
        throw error
    }
})

//GET api/orderproducts/:ordernum

router.get('/:ordernum', async (req, res)=>{
    const {ordernum} = req.params
    try {
        const orderProducts = await getOrderProductsByOrderNum((ordernum))
        res.send({orderProducts})
    } catch (error) {
        throw error
    }
})

//POST api/orderproducts

router.post('/', async (req, res, next)=>{
    try {
        const {ordernum, sku, quantity} = req.body
        const orderData = {}
        orderData.ordernum = ordernum
        orderData.sku = sku
        orderData.quantity = quantity
        const orderProduct = await createOrderProduct(orderData)
        res.send(orderProduct)
    } catch (error) {
        
    }
    
})

module.exports = router