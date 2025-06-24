

// const OrderSummary = () => {
//   return (
//     <div className="order-summary bg-[#F7F7F7] rounded flex flex-col justify-center items-start px-4">
//         <div>
//          <h2 className="text-base font-bold text-[#061410]">Order Summary </h2>
//          {/* <p>({items.length} items)</p> */}

import { usePathname, useRouter } from "next/navigation";

//         </div>
//         <div className="flex flex-col gap-4 mt-4">
//             <div>
//                 <p className="text-sm font-normal text-[#061410]">VAT: </p>
//                 <p></p>
//             </div>
//             <div>
//                 <p className="text-sm font-normal text-[#061410]">SubTotal:</p>
//             </div>
//             <div>
//                 <p className="text-sm font-normal text-[#061410]">Total:</p>
//             </div>
//         </div>

//         <button className="bg-[#26735B] rounded-lg text-white text-base font-bold py-2 px-4 mt-4 w-full">
//             Checkout
//         </button>
//         <p className="text-[#8D8C8C] text-xs font-medium">Taxes and delivery calculated at checkout</p>
//     </div>
//   );
// }

// export default OrderSummary;

const OrderSummary = ({ checkout }) => {
  const router = useRouter();
  const pathname = usePathname();
  const subTotal = 120000;
  const vat = 1000;
  const delivery = 900;
  const total = subTotal + vat + delivery;

  const isDelivery = pathname.includes("delivery");
  const isCart = pathname.includes("cart");
  console.log("checkout prop:", checkout); // should show a function

    return (
      <div className="order-summary bg-white rounded-lg flex flex-col justify-center items-start p-6 w-full max-w-md">
        <div className="w-full">
            <div className="flex items-center justify-between mb-4 border-b border-[#F7F7F7]">
                <h2 className="text-lg font-bold text-[#061410] mb-2">Order Summary</h2>
                <p className="text-sm text-[#061410] mb-2">4 items</p>
            </div>
  
          <div className="flex flex-col gap-4 w-full mb-6">
            <div className="flex justify-between">
              <p className="text-sm font-normal text-[#061410]">Sub Total</p>
              <p className="text-sm font-normal text-[#061410]">#120,000</p>
            </div>
            {isDelivery && (
              <>
                <div className="flex justify-between">
                  <p className="text-sm font-normal text-[#061410]">Delivery</p>
                  <p className="text-sm font-normal text-[#061410]">#{delivery.toLocaleString()}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-normal text-[#061410]">VAT</p>
                  <p className="text-sm font-normal text-[#061410]">#1,000</p>
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
            Checkout
          </button>
          <p className="text-[#8D8C8C] text-xs font-medium text-center w-full">
            Taxes and delivery calculated at checkout
          </p>
        </div>
      </div>
    );
  }
  
  export default OrderSummary;