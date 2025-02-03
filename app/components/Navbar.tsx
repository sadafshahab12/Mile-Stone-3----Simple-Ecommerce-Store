"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { IoCartOutline } from "react-icons/io5";
import { CartContext } from "./context/CartContext";
import { ContextProp } from "../product-details/[id]/page";

const Navbar = () => {
  const { cart } = useContext(CartContext) as ContextProp;
  return (
    <div className="flex justify-between py-5 md:px-20 sm:px-10 px-5  mx-auto shadow-md">
      <Image
        src="https://pngimg.com/d/nike_PNG6.png"
        alt="logo"
        width={500}
        height={500}
        className="w-[4rem] h-[2rem] object-cover"
      />
      <div className="relative">
        <Link href="/cart">
          <IoCartOutline className="w-8 h-8 cursor-pointer" />{" "}
        </Link>
        <p className="absolute -top-1 left-0 bg-blue-500 text-white w-5 h-5 flex justify-center items-center rounded-full">
          {cart.length}
        </p>
      </div>
    </div>
  );
};

export default Navbar;
