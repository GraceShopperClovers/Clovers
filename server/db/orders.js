const client = require('./client')

async function createOrder(orderuserid){
    try {
        const {
            rows: [order],
          } = await client.query(
            `
            INSERT INTO orders(orderuserid) VALUES ($1)
            RETURNING *
          `,
            [orderuserid]
          )
          return order
    } catch (error) {
        throw error
    }

}

async function getAllOrders() {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM orders;
    `)
    return { rows }
  } catch (error) {
    throw error
  }
}



module.exports = {
  createOrder,
  getAllOrders,
}