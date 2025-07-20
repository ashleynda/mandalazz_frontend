import { useState } from "react";
import ApplicationTabSlider from "../reusables/ApplicationTabSlider";
import { usePathname } from "next/navigation";
import ProductDetails  from "./ProductDetails";
import Reviews from "./Reviews";
import Specifications from "./Specifications";
import ProductTabs from "../reusables/ApplicationTabSlider";


export default function SpecsAndReviews() {
    const pathname = usePathname();

// Find which tab matches the current pathname

const tabs = [
        {
            id: "Product Details",
            name: 'Product Details',
            // to:"/talent/opportunities/explore",
            to: "/products/productDetails",
            // icon: <Iconify icon="bi:backpack4" height={24} width={24} />,
            exact:true,
        },
       
        {
            id: "Reviews",
            name: 'Reviews',
            to: "/products/reviews",
            // icon: <Iconify icon="material-symbols-light:model-training" height={28} width={28} />,
            exact:true,
        },
    ];
    const activeTab = tabs.findIndex((tab) => pathname?.startsWith(tab.to));
      const contentMinHeight = "400px";
    return (
        <div>
            <ProductTabs />

             <div className="mt-4" style={{ minHeight: contentMinHeight }}>
                {pathname?.startsWith("/products/productDetails") && <ProductDetails />}
                {pathname?.startsWith("/products/reviews") && <Reviews />}
            </div>
        </div>
    )
}