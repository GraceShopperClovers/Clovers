const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { JWT_SECRET = 'neverTell' } = process.env
const { getUserByEmail } = require('../db')

/* Middlware to see if user is logged in already*/

// set `req.user` if possible
router.use(async (req, res, next) => {
  console.log("inside the first .use...")
  const prefix = 'Bearer '
  const auth = req.header('Authorization')
  if (!auth) {
    // nothing to see here
    console.log("no auth")
    next()
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length)
    console.log("TOKEN INSIDE MIDDLEWARE: ", token)
    try {
      const parsedToken = jwt.verify(token, JWT_SECRET)
      const email = parsedToken && parsedToken.email
      if (email) {
        req.user = await getUserByEmail(email)
        console.log("req.user inside middleware: ", req.user)
        next()
      }
    } catch (error) {
      next(error)
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`,
    })
  }
})

router.use((req, res, next) => {
  if (req.user) {
    console.log('User is set:', req.user)
  }
  next()
})

// ROUTER: /api/users
const usersRouter = require('./users')
router.use('/users', usersRouter)

// ------ ADD MORE ROUTES BELOW ------

// ROUTER: /api/products
const productsRouter = require('./products')
router.use('/products', productsRouter)

// ROUTER: /api/orders
const ordersRouter = require('./orders')
router.use('/orders', ordersRouter)

// ROUTER: /api/orderproducts
const orderProdsRouter = require('./orderproducts')
router.use('/orderproducts', orderProdsRouter)

module.exports = router
