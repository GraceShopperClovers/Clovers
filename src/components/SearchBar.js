import React, { useState, useEffect } from 'react' 
import axios from 'axios'

export default function ShowSearch (props) {
    const [searchTerm, setSearchTerm] = useState('')
    const { setProducts} = props
    console.log("props:   ", props)
    console.log("PROPS.products:   ", props.products)

function productMatches(products, text){
    if (products.productname.toLowerCase().includes(text) || 
        products.description.toLowerCase().includes(text)){
        return true
        
    } else {
        return false
    }
  }
 if (props.products){
  const filteredProducts = props.products.filter(product => 
    productMatches(product, searchTerm.toLowerCase()))

    console.log("FILTEREDPRODUCTS:     ", filteredProducts)
    setProducts(filteredProducts)
  }
  
//   const productsToDisplay = searchTerm.length ? 
//     filteredProducts : products;  
  
function clearForm(){
    setSearchTerm('')
}

return(
        <div className ="searchBar">
          <label id='searchTitle'>Search Products </label>
          <input 
              id = 'search' 
              type = 'text' 
              placeholder = '...keyword...'
              value = {searchTerm}
              onChange = {(event) => {
                  setSearchTerm(event.target.value)}}
          />
          <button className="clearSearch" >Clear Search</button>
        </div>
        )
}