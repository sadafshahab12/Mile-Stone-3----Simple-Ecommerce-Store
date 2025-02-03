"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import { IoSearch } from "react-icons/io5";
import Loading from "./loading";

export interface ProductType {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  quantity?: number;
  image: string;
  availableSizes: string[];
}
const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [product, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    //we will use useEffect because when we trigger search bar with query it will trigger useEffect dependency and run again
    const filtered = product.filter((product: ProductType) => {
      return (
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.price.toString().includes(searchQuery.toString())
      );
    });
    setFilteredProducts(filtered);
  }, [searchQuery, product]);

  const handleClearSearchQuery = () => {
    setSearchQuery("");
  };
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div className=" max-w-7xl mx-auto p-5">
      <div className="relative my-5">
        <input
          type="text"
          name="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Product"
          className="border border-slate-700 py-3 px-4 w-full rounded-md "
        />
        <IoSearch className="w-6 h-6 absolute top-3 right-3" />
        {searchQuery && filteredProducts.length > 0 && (
          <div className="absolute top-16 left-0 bg-white w-full shadow-md px-5 py-4 border">
            {filteredProducts.map((list) => (
              <Link
                key={list.id}
                href={`/product-details/${list.id}`}
                onClick={handleClearSearchQuery}
              >
                <p className="py-1 cursor-pointer hover:bg-gray-300 px-3">
                  {list.name}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 md:px-10 sm:px-5 px-0">
        {filteredProducts.map((product: ProductType) => (
          <Link href={`/product-details/${product.id}`} key={product.id}>
            <div className="border shadow-md p-5 space-y-4 rounded-md">
              <Image
                src={product.image}
                alt={product.name}
                width={1000}
                height={1000}
                className="w-full h-[12rem] object-contain"
              />
              <h1 className="text-xl font-bold">{product.name}</h1>
              <p className="text-sm bg-slate-700 py-1 px-2 rounded-md text-white inline-block">
                {product.category}
              </p>
              <p>${product.price}</p>
              <p>Sizes : {product.availableSizes.join(", ")}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
