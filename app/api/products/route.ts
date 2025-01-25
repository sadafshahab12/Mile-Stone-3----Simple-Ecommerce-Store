import { NextResponse } from "next/server";
import { products } from "./data";

export async function GET(req:Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  try {
    if (id) {
      const product = products.find((item) => item.id === parseInt(id));
      if (!product) {
        return NextResponse.json(
          {
            message: "Product Not found",
          },
          { status: 404 }
        );
      }
      return NextResponse.json(product, { status: 200 });
    }
    if (!Array.isArray(products) || products.length === 0) {
      throw new Error("Data is not Available");
    }
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "An error Occurred in fetching data",
      },
      {
        status: 500,
      }
    );
  }
}
