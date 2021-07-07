import React, { useState, useEffect } from 'react' 
import {createOrder} from '../utils'
import axios from 'axios'

export default function Landing() {
  //get data from API 
  const [products , setProducts] = useState('')



  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    axios.get('/api/products')
    .then((response) => {
      const allProducts = response.data.products.rows;
      setProducts(allProducts)
      console.log("All PRODUCTS:  ", allProducts)
    })
    .catch(error => console.error(`Error: ${error}`))
  }
  return(
    <div id="prodcont">
        <DisplayProduct products = {products} />
    </div>
  )


/*
ADDING SEARCH BAR WORK
*/

function productMatches(products, text){
  if (post.title.toLowerCase().includes(text) || 
      post.description.toLowerCase().includes(text) || 
      post.price.toLowerCase().includes(text) || 
      post.author.username.toLowerCase().includes(text) ){
      return true
      
  } else {
      return false
  }
}
}


/*
TILL HERE
*/

function DisplayProduct(props) {
//   function ShowDiv(productname) {
//     document.getElementById(productname).style.display = "";
// }


const [searchTerm, setSearchTerm] = useState('')
  const showProducts = (props) => {
      const {products} = props
   

      if(products.length > 0 ) {
        const filteredProducts = products.filter( product => 
          productMatches(product, searchTerm.toLowerCase()))
          const productsToDisplay = searchTerm.length ? 
          filteredProducts : products;  
          return(
              productsToDisplay.map((product, index) => {
                  //let productname = product.productname
                  return(
                      <div className='products' key = {index}>
                        <img className ="productimage" src={product.imageurl}/>
                          <h1 className="productname">{product.productname}</h1>
                          <h2 className="price">Price: ${product.price}</h2>
                          {/* <button type="button" className="collapsible"  onclick={ShowDiv(productname)}>More info</button> */}
                            {/* <div id={product.productname}> */}
                          <h2 className="description">{product.description}</h2>
                            {/* </div> */}
                          <button type="button" className="addtocart" onClick={()=>{createOrder(product.sku)}}>Add to Cart</button>
                      </div>
                  )
              })
          )
      }
    }
  return(
      <>
          {<div>
            <label id='searchAvail'>Search Available Items </label>
            <input 
                id = 'search' 
                type = 'text' 
                placeholder = 'What are you looking for?'
                value = {searchTerm}
                onChange = {(event) => {
                    setSearchTerm(event.target.value)}}
            />
        </div>}
          {showProducts(props)}
      </>
  )
}
