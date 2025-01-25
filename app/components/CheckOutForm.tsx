import React from 'react'
import { ProductType } from './Products';

const CheckOutForm = ({cart}) => {
    const handleSubmit = (e)=>{
        e.preventDefault();
        alert("Form Submitted Successfully")
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Place Order</h2>
        {cart.map((product:ProductType)=>(
            <div key={product.id}>
                <h1>{product.name}</h1>
                <p>{product.price}</p>
                <p>{product.quantity}</p>
                <button type='submit'>Place Order</button>
            </div>
        ))}
      </form>
    </div>
  )
}

export default CheckOutForm
