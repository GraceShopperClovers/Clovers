const express = require('express')
const router = express.Router()
const { getAllProducts, getProductsBySku } = require('../db')

// GET api/products

router.get('/', async (req, res) => {
    const products = await getAllProducts()
    res.send({ products })
})


//GET api/products/:sku

router.get('/:sku', async (req, res)=>{
    const {sku} = req.params
    try {
        const products = await getProductsBySku(sku)
        res.send(products)
    } catch (error) {
        throw error
    }
})

module.exports = router