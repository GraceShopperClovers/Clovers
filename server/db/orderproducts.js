const client = require('./client')

async function createOrderProduct({ ordernum, sku, quantity }) {
    try {
      const {
        rows: [orderproduct],
      } = await client.query(
        `
        INSERT INTO order_products(ordernum, sku, quantity) VALUES ($1, $2, $3)
        RETURNING *
      `,
        [ordernum, sku, quantity]
      )
      return orderproduct
    } catch (error) {
      throw error
    }
  }

  


  module.exports = {createOrderProduct};