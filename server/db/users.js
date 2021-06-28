const client = require('./client')
const bcrypt = require('bcrypt')
const SALT_COUNT = 10

// database functions

// user functions
async function createUser({ email, password }) {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT)
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(email, password) VALUES ($1, $2)
      ON CONFLICT (email) DO NOTHING 
      RETURNING userid, email
    `,
      [email, hashedPassword]
    )
    return user
  } catch (error) {
    throw error
  }
}
async function getUser({ email, password }) {
  if (!email || !password) {
    return
  }

  try {
    const user = await getUserByEmail(email)
    if (!user) return
    const hashedPassword = user.password
    const passwordsMatch = await bcrypt.compare(password, hashedPassword)
    if (!passwordsMatch) return
    delete user.password
    return user
  } catch (error) {
    throw error
  }
}

async function getUserById(userId) {
  // first get the user
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE userid = $1;
    `,
      [userId]
    )
    // if it doesn't exist, return null
    if (!user) return null
    // if it does:
    // delete the 'password' key from the returned object
    delete user.password
    return user
  } catch (error) {
    throw error
  }
}
async function getUserByEmail(email) {
  // first get the user
  try {
    const { rows } = await client.query(
      `
      SELECT *
      FROM users
      WHERE email = $1;
    `,
      [email]
    )
    // if it doesn't exist, return null
    if (!rows || !rows.length) return null
    // if it does:
    // delete the 'password' key from the returned object
    const [user] = rows
    // delete user.password;
    return user
  } catch (error) {
    console.error(error)
  }
}
module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByEmail,
}
