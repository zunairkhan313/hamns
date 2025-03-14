import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";

export default function Dropdown() {
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleGetProducts = async () => {
        try {
            const res = await fetch(`/api/category`);
            const data = await res.json();
            setAllProducts(data.Categories || []);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false); // Ensure loading is set to false after the try-catch
        }
    };

    useEffect(() => {
        handleGetProducts();
    }, []);

    return (
        <div>
            {loading ? (
                <div className="flex items-center justify-center h-full w-full my-5 py-5">
                    <Spinner animation="border" role="status" />
                </div>
            ) : allProducts.length > 0 ? (
                allProducts.map((items, i) => (
                    <div key={i}>
                        <Link href={`/product/?id=${items._id}`}>
                            <p>{items.title1}</p>
                        </Link>
                    </div>
                ))
            ) : (
                <div className="py-5 my-5 text-center">No category found</div>
            )}
        </div>
    );
}
