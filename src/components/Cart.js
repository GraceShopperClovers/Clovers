import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DisplayProduct from './DisplayProduct'

export default function Cart() {
    const [cart , setCart] = useState('')
    const [displayCart, setDisplayCart] = useState(true)

    
    let orderNum = localStorage.getItem("ordernum")

    const getOrder = async () => {
        let { data } = await axios.get(`/api/orders/${orderNum}`)
        if (data) {
            const orderProducts = data.products
            if (orderProducts !== cart) {
            setCart(orderProducts)
            }
        } else {
            return
        }
    }

    useEffect(() => {
        if (orderNum) {
            getOrder()
        }
    }, [displayCart])

    return (
        <div id="ShoppingCart">
        {orderNum ? 
        ( <DisplayProduct cart = {cart} setDisplayCart = {setDisplayCart} displayCart = {displayCart}/> )
        :
        ( <div className="emptyCart"><div className="emptyCart1">Your Cart is Empty</div></div> )
        }
        </div>
    )
} 




