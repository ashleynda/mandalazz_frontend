import { usePathname, useRouter } from "next/navigation";

const OrderSummary = ({ cart, checkout }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isDelivery = pathname.includes("delivery");
  const isCart = pathname.includes("cart");
  const items = cart?.items ?? [];
  const subTotal = parseFloat(cart?.totalAmount?.$numberDecimal ?? '0');
  const vat = 1000;
  const delivery = 900;
  const total = subTotal + vat + delivery;
 
const handleCheckout = () => {
    console.log("🧪 handleCheckout triggered");
}


    return (
      <div className="order-summary bg-white rounded-lg flex flex-col justify-center items-start p-6 w-full max-w-md">
        <div className="w-full">
            <div className="flex items-center justify-between mb-4 border-b border-[#F7F7F7]">
                <h2 className="text-lg font-bold text-[#061410] mb-2">Order Summary</h2>
                <p className="text-sm text-[#061410] mb-2">{items.length} item{items.length !== 1 ? 's' : ''}</p>
            </div>
  
          <div className="flex flex-col gap-4 w-full mb-6">
            <div className="flex justify-between">
              <p className="text-sm font-normal text-[#061410]">Sub Total</p>
              <p className="text-sm font-normal text-[#061410]">₦{subTotal.toLocaleString()}</p>
            </div>
            {isDelivery && (
              <>
                <div className="flex justify-between">
                  <p className="text-sm font-normal text-[#061410]">Delivery</p>
                  <p className="text-sm font-normal text-[#061410]">#{delivery.toLocaleString()}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-normal text-[#061410]">VAT</p>
                  <p className="text-sm font-normal text-[#061410]">₦{vat.toLocaleString()}</p>
                </div>
              </>
            )}
            <div className="flex justify-between border-t border-[#F7F7F7] pt-4">
              <p className="text-base font-bold text-[#061410]">Total</p>
              <p className="text-base font-bold text-[#061410]">
                #{isDelivery ? total.toLocaleString() : subTotal.toLocaleString()}
              </p>
            </div>
          </div>
  
          <button className="bg-[#26735B] rounded-lg text-white text-base font-bold py-3 px-4 w-full mb-3" 
            onClick={() => {
              if (isDelivery) {
                checkout();
              } else {
                router.push('/viewProductDetails/checkout/delivery')
              }
            }}
          >
             {isDelivery ? "Confirm Order" : "Checkout"}
          </button>
          <button onClick={handleCheckout} className="bg-blue-500 text-white p-2 rounded mt-4">
  Test Checkout
</button>

          <p className="text-[#8D8C8C] text-xs font-medium text-center w-full">
            Taxes and delivery calculated at checkout
          </p>
        </div>
      </div>
    );
  }
  
  export default OrderSummary;