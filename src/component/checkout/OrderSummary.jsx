"use client";

import useSnackbarStore from "@/src/lib/store/useSnackbarStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from 'react-responsive';

const OrderSummary = ({ cart, checkout, isLoading = false }) => {
    const router = useRouter();
    const pathname = usePathname();
    const isDelivery = pathname.includes("delivery");
    const isCart = pathname.includes("cart");
    const items = cart?.items ?? [];
    // const [isClient, setIsClient] = useState(false);
    // useEffect(() => {
    // setIsClient(true);
    // }, []);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);


    // const isMobile = isClient && useMediaQuery({ query: '(max-width: 768px)' });
    // const mediaQueryMatch = useMediaQuery({ query: '(max-width: 768px)' });
    // const isMobile = isClient && mediaQueryMatch;

    const { showSnackbar } = useSnackbarStore();
    console.log("cart data:", items);

    console.log("cart data:", items);
    console.log("pathname:", pathname);
    console.log("isMobile:", isMobile);
    console.log("isCart:", isCart);
    console.log("Should show mobile cart view:", isMobile && isCart);
    // Extract subtotal from backend totalAmount (MongoDB Decimal128 format)
    // const getSubTotal = () => {
    //     if (!cart?.totalAmount) return 0;

    //     // Handle MongoDB Decimal128 format from backend
    //     if (cart.totalAmount.$numberDecimal) {
    //         return parseFloat(cart.totalAmount.$numberDecimal);
    //     }

    //     // Fallback for other formats
    //     if (typeof cart.totalAmount === 'number') {
    //         return cart.totalAmount;
    //     }

    //     if (typeof cart.totalAmount === 'string') {
    //         return parseFloat(cart.totalAmount);
    //     }

    //     return 0;
    // };

    const getSubTotal = () => {
        console.log("Items array:", items);
        console.log("Items length:", items.length);
        console.log("Is array?", Array.isArray(items));
        if (!Array.isArray(items) || items.length === 0) {
            console.log("No items or not array, returning 0");
            return 0;
        }

        return items.reduce((acc, item) => {
            const price = Number(item?.product?.price?.$numberDecimal || 0);
            const quantity = item?.quantity ?? 1;
            return acc + price * quantity;
        }, 0);
    };


    // Memoize calculations to prevent unnecessary re-renders
    const { subTotal, vat, delivery, total } = useMemo(() => {
        const subTotal = getSubTotal();
        const vat = 1000;
        const delivery = 900;
        const total = subTotal + vat + delivery;

        return { subTotal, vat, delivery, total };
    }, [items]);




    const handleCheckout = () => {
        const token = sessionStorage.getItem('authToken');
        if (isDelivery && typeof checkout === 'function') {
            checkout();
            return;
        }

        if (!token) {
            showSnackbar({ open: true, message: 'Please login before checkout', severity: 'info' });
            // } else {

            setTimeout(() => {
                const isReturningUser = sessionStorage.getItem('hasAccount') === 'true';
                if (isReturningUser) {
                    router.push('/login');
                } else {
                    router.push('/signup');
                }
            }, 1000);
            return;
        }
        router.push('/viewProductDetails/checkout/delivery');
    };

    // if (isMobile && isCart) {
    //     console.log("Rendering OrderSummary for mobile cart view", subTotal);
    //     console.log("isMobile:", isMobile, "isCart:", isCart);

    //     return (
    //         <div>
    //         <div className="w-full flex items-center justify-between px-4 py-2 border-b border-gray-200">
    //             <div>
    //                 <p className="text-sm font-normal text-[#061410]">
    //                     Subtotal ({items.length} {items.length === 1 ? "Item" : "Items"})
    //                 </p>
    //                 <p className="text-xs text-gray-600">Mobile Cart View - Debug</p>
    //             </div>
    //             <p className="text-base font-bold text-[#061410]">
    //                 ₦{subTotal.toLocaleString()}
    //             </p>
    //         </div>


    //         </div>
    //     );
    // }
    
    // {!isMobile && !isCart &&

    return (
        <div className="order-summary bg-white rounded-lg flex flex-col justify-center items-start p-6 w-full max-w-md">
            <div className="w-full">
                 <div className="flex items-center justify-between mb-4 border-b border-[#F7F7F7] pb-2">
                    <h2 className="text-lg font-bold text-[#061410] mb-2">Order Summary</h2>
                    <p className="text-sm text-[#061410] mb-2">{items.length} item{items.length !== 1 ? 's' : ''}</p>
                </div>

                {/* Loading state overlay */}
                {/* {isLoading && (
                    <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#26735B]"></div>
                    </div>
                )} */}

                <div className="flex flex-col gap-4 w-full mb-6">
                    <div className="flex justify-between">
                        <p className="text-sm font-normal text-[#061410]">Sub Total</p>
                        <p className={`text-sm font-normal text-[#061410] ${isLoading ? 'opacity-50' : ''}`}>
                            ₦{subTotal.toLocaleString()}
                        </p>
                    </div>



                    {isDelivery && (
                        <>
                            <div className="flex justify-between">
                                <p className="text-sm font-normal text-[#061410]">Delivery</p>
                                <p className="text-sm font-normal text-[#061410]">₦{delivery.toLocaleString()}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-sm font-normal text-[#061410]">VAT</p>
                                <p className="text-sm font-normal text-[#061410]">₦{vat.toLocaleString()}</p>
                            </div>
                        </>
                    )}

                    <div className="flex justify-between border-t border-[#F7F7F7] pt-4">
                        <p className="text-base font-bold text-[#061410]">Total</p>
                        <p className={`text-base font-bold text-[#061410]`}>
                            ₦{isDelivery ? total.toLocaleString() : subTotal.toLocaleString()}
                        </p>
                    </div>
                </div>
                {/* {isMobile && (isCart || is) (
                    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white px-4 py-2 border-t">
                        <button
                            className="w-full bg-[#26735B] hover:bg-emerald-700 text-white font-bold text-base px-8 py-3 rounded-lg cursor-pointer transition-colors"
                            onClick={handleCheckout}
                        >
                            {isDelivery ? "Confirm Order" : "Checkout"}
                        </button>
                    </div>
                )} */}

                {!isMobile && (
                    <div>
                        <button
                            className='bg-[#26735B] rounded-lg text-white text-base font-bold py-3 px-4 w-full'
                            onClick={handleCheckout}
                        >
                            {isDelivery ? "Confirm Order" : "Checkout"}
                        </button>
                    </div>
                )}
                <p className="text-[#8D8C8C] text-xs font-medium text-center w-full mt-3">
                    Taxes and delivery calculated at checkout
                </p>
            </div>

            {(isMobile && (isCart || isDelivery)) && (
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-white px-4 py-2 border-t">
                    <button
                        className="w-full bg-[#26735B] hover:bg-emerald-700 text-white font-bold text-base px-8 py-3 rounded-lg cursor-pointer transition-colors"
                        onClick={handleCheckout}
                    >
                        {isDelivery ? "Confirm Order" : "Checkout"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default OrderSummary;