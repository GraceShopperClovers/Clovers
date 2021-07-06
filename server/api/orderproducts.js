const express = require('express')
const router = express.Router()
const { createOrderProduct, getAllOrderProducts, getOrderProductsByOrderNum, updateOrderQuantity, deleteOrderProduct, getOrderProductsByOrdernumAndSku } = require('../db')


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

//GET api/orderproducts/:ordernum/:sku

router.get('/:ordernum/sku/:sku', async (req, res, next) => {
    const {ordernum, sku} = req.params
    console.log("ordernum: ", ordernum)
    console.log("sku: ", sku)
    try {
        const [orderProduct] = await getOrderProductsByOrdernumAndSku(ordernum, sku)
        console.log(orderProduct)
        res.send(orderProduct)
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
        throw error
    }
    
})

//PATCH api/orderproducts/:ordernum

router.patch('/:ordernum', async (req, res, next)=>{
    try {
        const {sku, quantity} = req.body
        const {ordernum} = req.params
        const updateProductQuantity = await updateOrderQuantity(ordernum, sku, quantity)
        res.send(updateProductQuantity)
    } catch (error) {
        throw error
    }
})

//DELETE api/orderproducts/:ordernum

router.delete('/:ordernum', async (req, res, next)=>{
    try {
        const {sku} = req.body
        const {ordernum} = req.params
        const removeProduct = await deleteOrderProduct(ordernum, sku)
        res.send(removeProduct)
    } catch (error) {
        throw error
    }
})

module.exports = router