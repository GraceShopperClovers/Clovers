// require in the database adapter functions as you write them (createUser, createActivity...)
const { createUser } = require('./')
const client = require('./client')

async function dropTables() {
  console.log('Dropping All Tables...')
  // drop all tables, in the correct order

  //  Add more tables as you need them
  try {
    await client.query(`
    DROP TABLE IF EXISTS users cascades;
    DROP TABLE IF EXISTS products cascades;
    DROP TABLE IF EXISTS orders cascades;
    DROP TABLE IF EXISTS order_products cascades;
  `)
  } catch (error) {
    throw error
  }
}

async function createTables() {
  try {
    console.log('Starting to build tables...')
    // create all tables, in the correct order

    // User's Table
    await client.query(`
      CREATE TABLE users(
        userid  SERIAL PRIMARY KEY, 
        email VARCHAR(255) UNIQUE NOT NULL, 
        password VARCHAR(255) NOT NULL

      );
    `)

    //Product Table
    await client.query(`
      CREATE TABLE products(
        sku SERIAL PRIMARY KEY, 
        productName VARCHAR(255) UNIQUE NOT NULL, 
        description VARCHAR(255) NOT NULL,
        price INTEGER NOT NULL,
        imageurl VARCHAR(255) NOT NULL
      );
    `)

    //Orders table
    await client.query(`
      CREATE TABLE orders(
        ordernum SERIAL PRIMARY KEY, 
        "userid" references users(userid)
      );
    `)

    //order_products table
    await client.query(`
      CREATE TABLE order_products(
        "ordernum" references orders(ordernum), 
        "sku" references products(sku),
        "price" references products(price),
        qunatity INTEGER NOT NULL,
        producttotal INTEGER NOT NULL,
        UNIQUE("ordernum","sku")
      );
    `)

    // await client.query(`
    //   CREATE TABLE ordered(
    //     "ordernum" references order_product(ordernum), 
    //     "sku" references products(sku),
    //     "price" references products(price),
    //     qunatity INTEGER NOT NULL,
    //     producttotal INTEGER NOT NULL
    //   );
    // `)
      
    // Add tables as you need them (A good place to start is Products and Orders
    // You may also need an extra table that links products and orders together (HINT* Many-To-Many)

    console.log('Finished building tables!')
  } catch (error) {
    console.error('Error building tables!')
    throw error
  }
}

/* 
ADD DATA BELOW AS NEEDED. This is default seed data, and will help you start testing
*/

async function createInitialUsers() {
  console.log('Starting to create users...')
  try {
    const usersToCreate = [
      { username: 'albert', password: 'bertie99' },
      { username: 'sandra', password: 'sandra123' },
      { username: 'glamgal', password: 'glamgal123' },
    ]
    const users = await Promise.all(usersToCreate.map(createUser))

    console.log('Users created:')
    console.log(users)
    console.log('Finished creating users!')
  } catch (error) {
    console.error('Error creating users!')
    throw error
  }
}

async function rebuildDB() {
  try {
    client.connect()
    await dropTables()
    await createTables()
    await createInitialUsers()

    // create other data
  } catch (error) {
    console.log('Error during rebuildDB')
    throw error
  }
}

module.exports = {
  rebuildDB,
}
