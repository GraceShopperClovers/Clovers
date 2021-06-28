const client = require('./client')

async function createProducts({ productname, description, price, imageurl }) {
    try {
      const {
        rows: [product],
      } = await client.query(
        `
        INSERT INTO products(productname, description, price, imageurl) VALUES ($1, $2, $3, $4)
        
        RETURNING *
      `,
        [productname, description, price, imageurl]
      )
      return product
    } catch (error) {
      throw error
    }
  }


  module.exports = {createProducts};