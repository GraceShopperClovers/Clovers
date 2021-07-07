import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Cart() {
    const [cart , setCart] = useState('')
    
    let orderNum = localStorage.getItem("ordernum")  
    console.log("ORDERNUM: ", orderNum)

    //user id with no order id
    
          const getOpenOrders = () => {
            axios.get(`/api/orders/${orderNum}`)
            .then((response) => {
              const orderProducts = response.data.products;
              const isopen = response.data.isopen
              if(isopen){
                console.log("DATA FOR ORDERPRODUCTS",orderProducts)
                setCart(orderProducts)
                return (
                    <div id="ShoppingCart">
                        <DisplayProduct cart = {cart} />
                        <h1>order num no user id</h1>
                    </div>
                ) 
              }else{
                return (
                    <div className="ShoppingCart">
                        <h1>Your Cart is Empty!</h1>
                    </div>
                )
              }
            })
            .catch(error => console.error(`Error: ${error}`))
          }
          return (
              <div id="ShoppingCart">
                  <DisplayProduct cart = {cart} />
                  <h1>order num no user id</h1>
              </div>
          ) 
    }
    //no order number and no local storage
    
        console.log("START LAST ELSE")
        return (
            <div className="ShoppingCart">
                <h1>Your Cart is Empty!</h1>
            </div>
        )
    

function DisplayProduct(props){

    const showCart = (props) => {
        const {cart} = props

        if(cart.length>0){
            return (
                cart.map((product, index) => {
                    return(
                        <div className='cartProducts' key = {index}>
                          <img className ="productimage" src={product.imageurl}/>
                          <h1 className="productname">{product.productname}</h1>
                          <h2 className="price">Price: ${product.price}</h2>
                          <h2 className="qunatity">{product.quantity}</h2>
                        </div>
                    )
                })
            )
        }

    }
    return(
      <>
          {showCart(props)}
      </>
  )

}