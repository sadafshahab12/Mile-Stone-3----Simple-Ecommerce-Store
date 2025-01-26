"use client";
import React, { createContext, ReactNode, useState } from "react";
import { ProductType } from "../Products";
import Swal from "sweetalert2";

export const CartContext = createContext({});
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<ProductType[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("");

  const addToCart = (product: ProductType, quantity: number) => {
    if (!selectedSize) {
      alert("Please Select size");
      return setCart([]);
    }
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 0) + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    Swal.fire({
      icon: "success",
      text: `${product.name} add to cart`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, handleSizeSelect, selectedSize }}
    >
      {children}
    </CartContext.Provider>
  );
};
