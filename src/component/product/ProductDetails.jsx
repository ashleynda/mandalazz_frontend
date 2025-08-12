"use client";

import useProductsQuery from "@/src/lib/hooks/favourites/useProductMutation";
import { useParams } from "next/navigation";

export default function ProductDetails() {
     const params = useParams();
      const id = params?.id;
    const { data, isLoading } = useProductsQuery();
    const product = data?.data?.products.find(p => p._id === id);
    return (
        <div>

            <p className="text-sm font-normal text-black mb-4">
                {product?.description || "No description available."}
            </p>
        </div>
    )
}