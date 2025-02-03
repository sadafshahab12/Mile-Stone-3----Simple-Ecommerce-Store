"use client";
import React, { useContext } from "react";
import { ProductType } from "../components/Products";
import { CartContext } from "../components/context/CartContext";
import { ContextProp } from "../product-details/[id]/page";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { VscChevronLeft } from "react-icons/vsc";
import Link from "next/link";

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
    <div
      className={`md:max-w-6xl max-w-7xl mx-auto py-5 px-5 xxs:h-screen ${
        cart.length > 0 ? "h-auto" : "h-screen"
      }`}
    >
      <Link href="/">
        <div className="bg-gray-200 h-10 w-10 flex justify-center items-center rounded-full ml-5 mb-5">
          <VscChevronLeft className="w-6 h-6 " />{" "}
        </div>
      </Link>
      <div className="flex justify-between items-center">
        <h1 className="sm:text-2xl text-xl font-bold">Shopping Cart</h1>
        <p>Total Items: {cart.length}</p>
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 pt-5 justify-self-center">
        {cart.length > 0 ? (
          cart.map((product: ProductType) => (
            <div
              key={product.id}
              className="flex xxs:flex-row flex-col xxs:items-center items-start xs:gap-10 gap-5"
            >
              <div className="shadow-md rounded-md">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-[8rem] h-[8rem] object-contain rounded-md"
                />
              </div>
              <div className="xs:space-y-2 space-y-1">
                <h1 className="xs:text-xl text-lg font-bold">{product.name}</h1>
                <p className="text-sm">Price : ${product.price}</p>
                <p className="text-sm">Size : {selectedSize}</p>
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
