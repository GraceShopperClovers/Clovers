const express = require('express')
const router = express.Router()
const { getAllProducts } = require('../db')

// GET api/products

router.get('/', async (req, res) => {
    const products = await getAllProducts()
    res.send({ products })
})

module.exports = router

