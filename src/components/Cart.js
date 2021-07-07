import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Cart() {
    const [cart , setCart] = useState('')
    
    let orderNum = localStorage.getItem("ordernum")

    const getOrder = async () => {
        let { data } = await axios.get(`/api/orders/${orderNum}`)
        if (data) {
            const orderProducts = data.products
            setCart(orderProducts)
        } else {
            return
        }
    }

    useEffect(() => {
        if (orderNum) {
            getOrder()
        }
    }, [])

    return (
        <div id="ShoppingCart">
        {orderNum ? 
        ( <DisplayProduct cart = {cart} /> )
        :
        ( <h1>Your shopping cart is empty!</h1> )
        }
        </div>
    )
} 

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
                          <h2 className="price">Price: ${product.productprice}</h2>
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