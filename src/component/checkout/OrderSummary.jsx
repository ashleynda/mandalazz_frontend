import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

const OrderSummary = ({ cart, checkout, isLoading = false }) => {
    const router = useRouter();
    const pathname = usePathname();
    const isDelivery = pathname.includes("delivery");
    const isCart = pathname.includes("cart");
    const items = cart?.items ?? [];

    // Extract subtotal from backend totalAmount (MongoDB Decimal128 format)
    const getSubTotal = () => {
        if (!cart?.totalAmount) return 0;

        // Handle MongoDB Decimal128 format from backend
        if (cart.totalAmount.$numberDecimal) {
            return parseFloat(cart.totalAmount.$numberDecimal);
        }

        // Fallback for other formats
        if (typeof cart.totalAmount === 'number') {
            return cart.totalAmount;
        }

        if (typeof cart.totalAmount === 'string') {
            return parseFloat(cart.totalAmount);
        }

        return 0;
    };

    // Memoize calculations to prevent unnecessary re-renders
    const { subTotal, vat, delivery, total } = useMemo(() => {
        const subTotal = getSubTotal();
        const vat = 1000;
        const delivery = 900;
        const total = subTotal + vat + delivery;

        return { subTotal, vat, delivery, total };
    }, [cart?.totalAmount]);

    const handleCheckout = () => {
        console.log("🧪 handleCheckout triggered");
        console.log("Cart data:", cart);
        console.log("Backend totalAmount:", cart?.totalAmount);
        console.log("Parsed subtotal:", subTotal);
        console.log("Final total:", total);
        console.log("Items in cart:", items.length);
    };

    return (
        <div className="order-summary bg-white rounded-lg flex flex-col justify-center items-start p-6 w-full max-w-md">
            <div className="w-full">
                <div className="flex items-center justify-between mb-4 border-b border-[#F7F7F7] pb-2">
                    <h2 className="text-lg font-bold text-[#061410]">Order Summary</h2>
                    <p className="text-sm text-[#061410]">{items.length} item{items.length !== 1 ? 's' : ''}</p>
                </div>

                {/* Loading state overlay */}
                {isLoading && (
                    <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#26735B]"></div>
                    </div>
                )}

                <div className="flex flex-col gap-4 w-full mb-6 relative">
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
                        <p className={`text-base font-bold text-[#061410] ${isLoading ? 'opacity-50' : ''}`}>
                            ₦{isDelivery ? total.toLocaleString() : subTotal.toLocaleString()}
                        </p>
                    </div>
                </div>

                <button
                    className={`bg-[#26735B] rounded-lg text-white text-base font-bold py-3 px-4 w-full mb-3 transition-opacity ${
                        isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1e5a47]'
                    }`}
                    onClick={() => {
                        if (isLoading) return;

                        if (isDelivery) {
                            checkout();
                        } else {
                            router.push('/viewProductDetails/checkout/delivery');
                        }
                    }}
                    disabled={isLoading}
                >
                    {isLoading ? 'Updating...' : (isDelivery ? "Confirm Order" : "Checkout")}
                </button>

                {/* Remove this test button in production */}
                <button
                    onClick={handleCheckout}
                    className="bg-blue-500 text-white p-2 rounded mt-4 w-full hover:bg-blue-600 transition-colors"
                    disabled={isLoading}
                >
                    Test Checkout
                </button>

                <p className="text-[#8D8C8C] text-xs font-medium text-center w-full mt-3">
                    Taxes and delivery calculated at checkout
                </p>
            </div>
        </div>
    );
};

export default OrderSummary;