const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { createUser, getUser, getUserByEmail, updateOrderUser } = require('../db')
const SALT_COUNT = 10
const { JWT_SECRET = 'neverTell' } = process.env

// POST /api/users/login
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body

  // request must have both
  if (!email || !password) {
    next({
      name: 'MissingCredentialsError',
      message: 'Please supply both a email and password',
    })
  }

  try {
    const user = await getUser({ email, password })
    if (!user) {
      next({
        name: 'IncorrectCredentialsError',
        message: 'email or password is incorrect',
      })
    } else {
      const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1w' }
      )
      res.send({ user, message: "you're logged in!", token })
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
})

// POST /api/users/register
router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const queriedUser = await getUserByEmail(email)
    if (queriedUser) {
      res.status(401)
      next({
        name: 'UserExistsError',
        message: 'A user by that email already exists',
      })
    } else {
      const user = await createUser({
        email,
        password,
      })
      if (!user) {
        next({
          name: 'UserCreationError',
          message: 'There was a problem registering you. Please try again.',
        })
      } else {
        const token = jwt.sign(
          { id: user.id, email: user.email },
          JWT_SECRET,
          { expiresIn: '1w' }
        )
        
        res.send({ user, message: "you're signed up!", token })
      }
    }
  } catch (error) {
    next(error)
  }
})

// GET /api/users/me
router.get('/me', (req, res, next) => {
  try {
    res.send(req.user)
  } catch (error) {
    next(error)
  }
})

// --------- ADD ADDITONAL USER ROUTES AS NEEDED ---------
module.exports = router
