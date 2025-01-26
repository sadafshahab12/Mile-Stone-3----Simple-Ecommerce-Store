"use client";
import React, { useContext } from "react";
import { ProductType } from "../components/Products";
import { CartContext } from "../components/context/CartContext";
import { ContextProp } from "../product-details/[id]/page";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";

const CartPage = () => {
  //sabse pehly hm state variable ko set krty hn or cart kia hoga , hmara ek array hoga.
  const { cart, setCart, selectedSize } = useContext(
    CartContext
  ) as ContextProp;
  const handleRemoveFromCart = (product: ProductType) => {
    if (setCart) {
      setCart(cart.filter((item: ProductType) => item.id !== product.id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        <p>Total Items: {cart.length}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 pt-5">
        {cart.length > 0 ? (
          cart.map((product: ProductType) => (
            <div key={product.id} className="flex  items-center gap-10">
              <div className="shadow-md rounded-md">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-[8rem] h-[8rem] object-contain rounded-md"
                />
              </div>
              <div className="space-y-2">
                <h1 className="text-xl font-bold">{product.name}</h1>
                <p className="text-sm">Price : ${product.price}</p>
                <p>Size : {selectedSize}</p>
                <p className="text-sm">Quantity : {product.quantity}</p>
                <p className="text-sm">
                  Total Price: ${product.price * (product.quantity || 0)}
                </p>
              </div>
              <button onClick={() => handleRemoveFromCart(product)}>
                <FaTrash className="w-5 h-5 cursor-pointer" />
              </button>
            </div>
          ))
        ) : (
          <p>Cart is Empty</p>
        )}
      </div>
    </div>
  );
};

export default CartPage;
