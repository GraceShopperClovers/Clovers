// require in the database adapter functions as you write them (createUser, createActivity...)
const { createUser } = require('./')
const { createProducts } = require('./products')
const { createOrder } = require('./orders')
const { createOrderProduct } = require('./orderproducts')

const client = require('./client')

async function dropTables() {
  console.log('Dropping All Tables...')
  // drop all tables, in the correct order

  //  Add more tables as you need them
  try {
    await client.query(`
    DROP TABLE IF EXISTS users cascade;
    DROP TABLE IF EXISTS products cascade;
    DROP TABLE IF EXISTS orders cascade;
    DROP TABLE IF EXISTS order_products cascade;
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
        sku SERIAL PRIMARY KEY UNIQUE NOT NULL, 
        productname VARCHAR(255) UNIQUE NOT NULL, 
        description TEXT NOT NULL,
        price INTEGER NOT NULL,
        imageurl TEXT NOT NULL
      );
    `)

    //Orders table
    await client.query(`
      CREATE TABLE orders(
        ordernum SERIAL PRIMARY KEY,
        isopen BOOLEAN default TRUE, 
        "orderuserid" INTEGER REFERENCES users(userid)
      );
    `)

    //order_products table
    await client.query(`
      CREATE TABLE order_products(
        "ordernum" INTEGER REFERENCES orders(ordernum) NOT NULL, 
        "sku" INTEGER REFERENCES products(sku) NOT NULL,
        quantity INTEGER NOT NULL,
        productprice INTEGER NOT NULL,
        UNIQUE("ordernum","sku")
      );
    `)
      
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
      { email: 'albert@gmail.com', password: 'bertie99' },
      { email: 'sandra@gmail.com', password: 'sandra123' },
      { email: 'glamgal@gmail.com', password: 'glamgal123' },
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

//create test product data
async function createIntitialProducts(){
  console.log('starting to create products')
  try{
    const prodsToCreate = [
      {productname: 'Sarge the German Shepherd', description: 'Sarge is a German Shepherd Dog with a tan brown body and face and a mottled brown back and head. He has black button eyes and a black nose with black stitching for his mouth.',
       price: '9', imageurl: ' https://beaniepedia.com/beanies/files/2020/11/sarge.jpg'},
       {productname: 'Mooch the Monkey', description:'Mooch is a black spider monkey with a peach coloured face and peach coloured hands and feet. He has brown and black button eyes and black stitching for his eyebrows, nostrils and mouth. He has a ring of white fur surrounding his face.',
      price: '10', imageurl:'https://beaniepedia.com/beanies/files/2020/11/mooch.jpg'},
      {productname:'Tracker the Bassett Hound',description:'Tracker is a brown and cream coloured Bassett Hound. He has brown and black button eyes with white material underneath and a black nose with black stitching for his mouth. He has a long body and short legs. His brown ears are very long.',
      price:'9',imageurl:'https://beaniepedia.com/beanies/files/2020/10/tracker-380x380.jpg'},
      {productname:'Skunkers the Skunk',description:'Skunkers is a black skunk with a white belly and white stripes along the top of his head and back. He has black button eyes and a black nose. His tail is black with white fur all over it.',
      price:'20',imageurl:'https://beaniepedia.com/beanies/files/2021/05/skunkers-380x380.jpg'},
      {productname:'Princess the Bear',description:'Princess is a beautiful royal purple colour with a purple ribbon tied around it’s neck. On it’s chest is an embroidered rose, which is very apt since Princess Diana was also known as “England’s Rose”.',
      price:'25',imageurl:' https://beaniepedia.com/beanies/files/2012/10/51Ns1n0KRSL._SL500_AA300_.jpg'},
      {productname:'Bronty the Brontosaurus',description:'Bronty is a blue, tie-dyed brontosaurus. He has black embroidered eyes and a long neck with a tiny head.',
      price:'1000',imageurl:'https://beaniepedia.com/beanies/files/2020/12/bronty.jpg'},
      {productname:'Nanook the Husky',description:'Nanook is a grey husky with blue and black button eyes and a black nose. He has a white face, white inner ears and white on the tip of his tail. He also has a white belly and white paws.',
      price:'7',imageurl:'https://beaniepedia.com/beanies/files/2020/08/nanook.jpeg'},
      {productname:'Tabasco the Bull',description:'Tabasco is a bright red bull with black button nose and a cream coloured nose with black stitching for his nostrils. He has cream coloured horns and inner ears.',
      price:'15',imageurl:' https://beaniepedia.com/beanies/files/2020/08/tabasco-380x380.jpeg'},
      {productname:'Frigid the Penguin',description:'Frigid is a black penguin with a white belly and white under his flippers. He has brown and black button eyes and a bright red beak. His feet are peach coloured and he has two tufts of yellow fur on either side of his head.',
      price:'12',imageurl:' https://beaniepedia.com/beanies/files/2020/02/frigid.jpg'},
      {productname:'Wrinkles the Dog',description:'Wrinkles is a light brown bulldog with a white belly and face. He has brown and black button eyes and a black nose with wrinkles on his face.',
      price:'7',imageurl:'https://beaniepedia.com/beanies/files/2020/09/wrinkles-380x380.jpg'},
      {productname:'Twigs the Giraffe',description:'Twigs is a bright yellow giraffe covered in an orange “giraffe print” pattern. He has black button eyes and brown hooves. He has two tiny horns on top of his head.',
      price:'250',imageurl:'https://beaniepedia.com/beanies/files/2020/09/twigs-380x380.jpg'},
      {productname:'Seaweed the Otter',description:'Seaweed is a dark brown sea otter with a lighter brown muzzle. She has black button eyes and a tiny black nose. She carries a piece of green seaweed in her paws.',
      price:'7',imageurl:' https://beaniepedia.com/beanies/files/2021/03/seaweed-380x380.jpeg'},
      {productname:'Miami the Bear',description:'Miami is a brown bear with a black nose and pink-rimmed sunglasses. He wears a white towel around his neck and floral beach shorts.',
      price:'11',imageurl:'https://beaniepedia.com/beanies/files/2021/06/miami.jpg'},
      {productname:'Yukon the Bear',description:'Yukon is made from a furry brown material with a smoother brown muzzle. He has large yellow and black button eyes and a dark brown button nose.',
      price:'13',imageurl:'https://beaniepedia.com/beanies/files/2014/02/yukonwwb-1.jpg'},
      {productname:'Thunder the Elephant',description:'Thunder is made from a furry grey material. The inside of his ears and his eyebrows are made from a smoother fabric. Thunder has large silver and black button eyes.',
      price:'5',imageurl:'https://beaniepedia.com/beanies/files/2014/02/thunderwwb-1.jpg'},
      {productname:'Trouble',description:'Trouble is made from a fuzzy green material covered in purple spots. He has a single large sparkly green and black button eye and a huge mouth with a row of white teeth and a pink tongue. He has a purple face, hands and feet. His belly is white and he has two pointy purple horns on top of his head.',
      price:'1',imageurl:'https://beaniepedia.com/beanies/files/2015/09/troublemonstaz-1.jpg'},
      {productname:'Leonardo the Turtle',description:'Leonardo is a bright green turtle with embroidered eyes and an embroidered mouth. He wears a blue mask and brown belt. He wears a blue mask over his eyes.',
      price:'17',imageurl:'https://beaniepedia.com/beanies/files/2021/03/leonardo.jpeg'},
      {productname:'Iron Man the Superhero',description:'Iron Man is a red super hero with a yellow face, shoulders and legs. He has white eyes and light blue underneath and a black mouth.',
      price:'3',imageurl:'https://beaniepedia.com/beanies/files/2020/12/ironman.jpg'},
      {productname:'Inky the Octopus – Grey, With Mouth',description:'Inky is a grey octopus with white and black eyes and black stitching for his mouth. He has eight tentacles sprouting from his head.',
      price:'53',imageurl:'https://beaniepedia.com/beanies/files/2020/12/inkygreywm.jpg'},
      {productname:'Happy the Hippopotamus – Grey',description:'Happy is a light grey hippo with black button eyes and tiny grey ears.',
      price:'5',imageurl:'https://beaniepedia.com/beanies/files/2020/03/happygrey.jpg'},
      {productname:'Digger the Crab – Orange',description:'Digger is made from an orange material with black button eyes and black thread antennae. He has eight legs and two large pincers.',
      price:'8',imageurl:'https://beaniepedia.com/beanies/files/2015/11/diggerorange-1.jpg'},
      {productname:'Punchers the Lobster',description:'Punchers is a bright red colour with black button eyes and black thread antennae.',
      price:'11',imageurl:'https://beaniepedia.com/beanies/files/2019/01/punchers.jpg'},
      {productname:'Scottie the Dog',description:'Scottie is a Scottish Terrier dog made from a textured material. He has black button eyes and a black nose. His legs are short and he is in a standing pose.',
      price:'13',imageurl:'https://beaniepedia.com/beanies/files/2021/06/scottie.jpg'},
      {productname:'Scoop the Pelican',description:'Scoop is a blue pelican with black button eyes and a large orange beak. He has bright orange feet and small, blue wings the same colour as the rest of his body.',
      price:'19',imageurl:'https://beaniepedia.com/beanies/files/2020/10/scoop.jpg'},

    ]
  
    // console.log('Testing input:', prodsToCreate)
    const products = await Promise.all(prodsToCreate.map(createProducts))

    console.log('Products created:')
    console.log(products)
    console.log('Finished creating products!')
  } catch (error) {
    console.error('Error creating products!')
    throw error
  }
    
}

//Create intial orders for testing 

async function createInitialOrders(){
  console.log('starting to create orders')
  try {
    const ordersToCreate = [
      {orderuserid:"1"},
      {orderuserid:"2"},
      {orderuserid:"3"},
      {}

    ]
    const orders = await Promise.all(ordersToCreate.map(createOrder))
    
    
    console.log('Orders created:')
    console.log(orders)
    console.log('Finished creating Orders!')
    
  } catch (error) {
    console.error('Error creating orders!')
    throw error
  }
}

//create initial order products table for testing

async function createInitialOrderProducts(){
  console.log('starting to create ordersProducts')
  try {
    const orderProdsCreated =[
      {ordernum: "1", sku: "12", quantity: "2"},
      {ordernum: "1", sku: "10", quantity: "1"},
      {ordernum: "1", sku: "2", quantity: "3"},
      {ordernum: "2", sku: "12", quantity: "2"},
      {ordernum: "2", sku: "10", quantity: "1"},
      {ordernum: "2", sku: "2", quantity: "3"},
      {ordernum: "3", sku: "12", quantity: "2"},
      {ordernum: "3", sku: "10", quantity: "1"},
      {ordernum: "3", sku: "2"},
      {ordernum:"4",sku:"2",quantity:"1"}
      
    ]
 
    const orderproducts = await Promise.all(orderProdsCreated.map(createOrderProduct))
    console.log('OrdersProducts created:')
    console.log(orderproducts)
    console.log('Finished creating OrderProducts!')
    
  } catch (error) {
    console.error('Error creating orderProducts!')
    throw error
  }
}

async function rebuildDB() {
  try {
    client.connect()
    await dropTables()
    await createTables()
    await createInitialUsers()
    await createIntitialProducts()
    await createInitialOrders()
    await createInitialOrderProducts()

    // create other data
  } catch (error) {
    console.log('Error during rebuildDB')
    throw error
  }
}

module.exports = {
  rebuildDB,
}
