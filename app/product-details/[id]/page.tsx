"use client";
import { CartContext } from "@/app/components/context/CartContext";
import { ProductType } from "@/app/components/Products";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import Loading from "../loading";
import { VscChevronLeft } from "react-icons/vsc";
import Link from "next/link";

export interface ContextProp {
  addToCart: (product: ProductType, quantity: number) => void;
  cart: ProductType[];
  setCart: React.Dispatch<React.SetStateAction<ProductType[]>>;
  handleSizeSelect: (size: string) => void;
  selectedSize: string;
}
const ProductDetails = () => {
  const { addToCart, selectedSize, handleSizeSelect } = useContext(
    CartContext
  ) as ContextProp;
  const [product, setProducts] = useState<ProductType | null>(null);
  const [count, setCount] = useState<number>(1);

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/products?id=${id}`);
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };
      fetchData();
    }
  }, [id]);
  const decrease = () => {
    setCount((prevCount) => {
      if (prevCount > 1) {
        return prevCount - 1;
      }
      return prevCount;
    });
  };
  const increase = () => {
    setCount((prevCount) => prevCount + 1);
  };
  if (!product) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="md:h-screen h-auto max-w-5xl mx-auto">
      <Link href="/">
        <div className="bg-gray-200 h-10 w-10 flex justify-center items-center rounded-full mt-5 ml-5">
          {" "}
          <VscChevronLeft className="w-6 h-6 " />{" "}
        </div>
      </Link>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-10 items-center  ">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={1000}
            height={1000}
            className="w-full md:h-[18rem] h-[15rem] object-contain  p-4 "
          />
        ) : (
          <div>No image available</div> // Fallback if no image is provided
        )}
        <div className="space-y-4 p-5">
          <h1 className="text-3xl font-bold ">{product.name}</h1>
          <p className="bg-slate-800 text-white text-[0.7rem] inline-block  py-1 px-3 rounded-md">
            {product.category}
          </p>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <div className="flex items-center gap-3">
            Select Size:{" "}
            {product.availableSizes.map((size) => (
              <p
                onClick={() => handleSizeSelect(size)}
                key={size}
                className={`w-10 h-10 flex justify-center items-center rounded-md cursor-pointer ${
                  selectedSize === size
                    ? "bg-slate-800 text-white"
                    : "bg-transparent border-2 border-slate-900 text-black"
                }   `}
              >
                {" "}
                {size}
              </p>
            ))}
          </div>
          <div className="counter flex items-center gap-4">
            <button onClick={decrease}>
              <CiCircleMinus className="w-7 h-7" />
            </button>
            <p>{count}</p>
            <button onClick={increase}>
              <CiCirclePlus className="w-7 h-7" />
            </button>
          </div>
          <button
            onClick={() => addToCart(product, count)}
            className="bg-slate-800 text-white text-[1rem]  py-2 px-4 cursor-pointer w-full"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
