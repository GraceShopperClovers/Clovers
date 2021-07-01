const client = require('./client')
const {createOrderProduct} = require('./orderproducts')

async function createProducts({ productname, description, price, imageurl }) {
    try {
      // console.log('productname', productname)
      // console.log('description', description)
      // console.log('price', price)
      // console.log('imageurl', imageurl)

      const {
        rows: [products],
        
        
      } = await client.query(
        `
        INSERT INTO products(productname, description, price, imageurl) VALUES ($1, $2, $3, $4)
        RETURNING sku, productname, description ,price, imageurl
        
      `,
        [productname, description, price, imageurl]
      );
      return products
    } catch (error) {
      throw error
    }
  }

async function getAllProducts() {
  try {
    const { rows } = await client.query(`
      SELECT productname, description, price, imageurl
      FROM products;
    `)
    return { rows }
  } catch (error) {
    throw error
  }
}

  
  async function getProductsBySku(sku) {
    try {
      const {rows} = await client.query(`
        SELECT *
        FROM products
        WHERE sku = $1
      `, [sku])

      return {rows}
    } catch (error) {
      
    }
  }

  async function addProductsToOrder(ordernum, product) {
    try {
      let result = await createOrderProduct(ordernum, product.sku, quantity)
      return result
    } catch (error) {
      throw error
    }
  }

  module.exports = { 
    createProducts,
    getAllProducts,
    getProductsBySku,
    addProductsToOrder
  };