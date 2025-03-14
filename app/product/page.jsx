"use client";

import { useSession } from "next-auth/react";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Link from "next/link";
import ProductCard from "../components/products/productCard";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Spinner } from "react-bootstrap"; // Import Spinner from react-bootstrap

const Product = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true); // Loading state
  const [allProducts, setAllProducts] = useState([]);

  const params = useSearchParams();
  let id = params.get("id");

  // Display Add Product button for admin
  let addButton;
  if (session?.user?.email === "cappello@gmail.com") {
    addButton = (
      <Link href={"/admin"}>
        <button className="custom-file-upload">
          <span className="font-bold">Add Product</span> <ControlPointIcon />
        </button>
      </Link>
    );
  }

  // Fetch Products by category ID
  const handleGetProducts = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await fetch(`/api/products`);
      const data = await response.json();
      setAllProducts(
        data.Products.filter((item) => item.category_id === id) || []
      );
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Fetch products when component mounts or id changes
  useEffect(() => {
    handleGetProducts();
  }, [id]);

  return (
    <>
      <style jsx>{`
        body {
          background-color: white;
        }
      `}</style>

      <div className="container mt-5">
        <div className="flex justify-between">
          <div className="text-[39px] font-extrabold bgVideoText ">
            <h1 className="heading text-black font-bold font-sans">PRODUCTS</h1>
          </div>
          <div className="mt-2">{addButton}</div>
        </div>
        <div className="hr-products"></div>

        {/* Display loading spinner while fetching products */}
        {loading ? (
          <div className="p-5 flex justify-center items-center" style={{ height: '100vh' }}>
            <Spinner animation="border" role="status" />
          </div>
        ) : (
          <div className="md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 mb-4">
            {allProducts?.length > 0 ? (
              allProducts.map((item, i) => (
                <ProductCard key={i} item={item} onReload={handleGetProducts} />
              ))
            ) : (
              <div className="py-5 my-5">Products Coming Soon...</div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Product;
