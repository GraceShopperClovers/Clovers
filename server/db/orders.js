const client = require('./client')

async function createOrders({orderuserid}){
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



module.exports = {createOrders}