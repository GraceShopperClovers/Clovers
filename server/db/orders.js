const client = require('./client')

async function createOrder({orderuserid}){
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

async function getOrderByOrdernum(ordernum) {
  try {
    const { rows: [order] } = await client.query(`
    SELECT *
    FROM orders
    WHERE ordernum=$1;
    `, [ordernum])

    if (!order) {
      throw {
        name: "OrderNotFoundError",
        message: "Could not find an order with that ordernum"
      }
    }

    const { rows: products } = await client.query(`
      SELECT products.*
      FROM products
      JOIN order_products ON products.sku=order_products."sku"
      WHERE order_products."ordernum"=$1;
    `, [ordernum])
    // STILL WORKING 
    // const {rows: orderproducts} = await client.query(`
    //   SELECT quantity, productprice
    //   FROM order_products
    //   JOIN products ON  products.productname= products."productname"
    //   WHERE ordernum = $1;
    // `, [ordernum])

    order.products = products
    // order.products.productprice = orderproducts.productprice
    // order.products.quantity = orderproducts.quantity

    return order
  } catch (error) {
    throw error
  }
}
//PATCH REQUEST TO UPDATE QUANTITY
// async function updateOrder(ordernum, sku, quanitiy) {
//   try {
//     //UPDATE Quantiy FIELD ON one product
//     await client.query(`
//      UPDATE order
//      SET $1
//      WHERE sku=${sku}
//      RETURNING * 
//     `, [quanitiy])
//   } catch (error)  {
//     throw error
//   }
// }

module.exports = {
  createOrder,
  getAllOrders,
  getOrderByOrdernum,
  // updateOrder
}