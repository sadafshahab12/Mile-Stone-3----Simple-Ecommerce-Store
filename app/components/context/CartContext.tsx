"use client";
import React, { createContext, ReactNode, useState } from "react";
import { ProductType } from "../Products";

export const CartContext = createContext({});
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<ProductType[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("");

  const addToCart = (product: ProductType, quantity: number) => {
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
