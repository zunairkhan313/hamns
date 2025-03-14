import connectMongoDB from "../../../../lib/mongodb";
import Product from "../../../../models/products";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { 
    title, description, img, price, code,discount,disPrice,stock, categoryId 
  } = await request.json();
console.log("params",params);

  await connectMongoDB();

  await Product.findByIdAndUpdate(id, {
    title,
    description,
    images: img,
    price,
    code,
    discount,
    disPrice,
    stock,
    category_id: categoryId,
  });

  return NextResponse.json({ message: "Product updated" }, { status: 200 });
}