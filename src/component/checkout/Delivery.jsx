"use client"

import { useState } from "react"
import OrderSummary from "./OrderSummary"
import PaymentMethod from "../../component/checkout/PaymentMethod";
import useCreateCheckout from "../../lib/hooks/useCheckout";
import { useRouter } from "next/navigation";
import statesWithLGAs from "../../data/statesWithLGAs.json";
import { useDefaultAddress } from "../../lib/hooks/checkout/useFetchDefaultAddress";
import { useAddressStore } from "../../lib/store/useAddressStore";
import { useCreateAddress } from "../../lib/hooks/useCreateAddress";
import useSnackbarStore from "@/src/lib/store/useSnackbarStore";
import useFetchCartQuery from "@/src/lib/hooks/cart/useFetchCartMutation";

const countries = [
  { code: "+234", name: "Nigeria", flag: "🇳🇬" },
  { code: "+1", name: "USA", flag: "🇺🇸" },
  { code: "+44", name: "UK", flag: "🇬🇧" },
  { code: "+33", name: "France", flag: "🇫🇷" },
  { code: "+49", name: "Germany", flag: "🇩🇪" },
]

export default function Delivery() {
  const { formData, setFormData } = useAddressStore();
  const [deliveryMethod, setDeliveryMethod] = useState("pickup")
  const [countryCode, setCountryCode] = useState("+234")
  const [altCountryCode, setAltCountryCode] = useState("+234")
  const [paymentMethods, setPaymentMethods] = useState(null);
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);

  const { mutate: createAddress } = useCreateAddress();
  const { mutate: checkout, isPending, isError, error } = useCreateCheckout();
  const router = useRouter();
  const [paymentType, setPaymentType] = useState("online_payment");

  const resolvedPaymentType =
    paymentType === "paystack"
      ? "online_payment"
      : paymentType === "delivery"
        ? "payment_on_delivery"
        : paymentType;

  const selectedState = statesWithLGAs.find((s) => s.state === formData.state);
  const lgaOptions = selectedState ? selectedState.lgas : [];
  const { data: defaultAddress, isLoading, refetch: refetchDefaultAddress } = useDefaultAddress();
  const { showSnackbar } = useSnackbarStore();
  const { data: cartData, isLoading: cartLoading, error: cartError } = useFetchCartQuery();

  const handleCheckout = () => {
    const token = sessionStorage.getItem("authToken");
    const email = sessionStorage.getItem("userEmail");

    if (!token) {
      return showSnackbar({ message: "Not logged in", severity: "error" });
    }

    const { firstName, lastName, address, phone, city, state } = formData;
    if (!firstName || !lastName || !address || !phone || !city || !state) {
      return showSnackbar({
        message: "Please fill in all required fields",
        severity: "error"
      });
    }

    const payload = {
      userDetails: {
        firstName,
        lastName,
        address,
        landmark: formData.landmark || "",
        phoneNumber: `${countryCode}${phone}`,
        altPhoneNumber: formData.altPhone ? `${altCountryCode}${formData.altPhone}` : "",
        email,
        city,
        lga: formData.lga || "",
        state,
        postalCode: "100001",
      },
      paymentType: resolvedPaymentType,
    };

    

    checkout({ token, payload }, {
      onSuccess: (data) => {

        if (data && typeof data === 'object') {
          if (data.paymentMethods || data.message?.paymentMethods) {
            const methods = data.paymentMethods || data.message?.paymentMethods;
            setPaymentMethods(methods);
            setShowPaymentGateway(true);
            return;
          }
        }

        if (resolvedPaymentType === "online_payment") {

          let paymentUrl = null;

          // Check various possible paths for payment URL
          if (data?.message?.checkout?.paymentUrl) {
            paymentUrl = data.message.checkout.paymentUrl;
          } else if (data?.paymentUrl) {
            paymentUrl = data.paymentUrl;
          } else if (data?.message?.paymentUrl) {
            paymentUrl = data.message.paymentUrl;
          } else if (data?.data?.paymentUrl) {
            paymentUrl = data.data.paymentUrl;
          } else if (data?.checkout?.paymentUrl) {
            paymentUrl = data.checkout.paymentUrl;
          }

          if (paymentUrl) {
            console.log("🚀 Redirecting to payment URL:", paymentUrl);
            showSnackbar({
              message: "Redirecting to payment...",
              severity: "success"
            });

            // setTimeout(() => {
            //   window.location.href = paymentUrl;
            // }, 1500);
               window.location.href = paymentUrl;

    // After Paystack success (use callback page)
    setTimeout(() => {
      router.push('/order-confirmation');
    }, 1000);
          } else {
            showSnackbar({
              message: "Payment URL not found. Please try again.",
              severity: "error"
            });
          }
        } else {
          console.log("🚚 Processing payment on delivery...");
          showSnackbar({
            message: "Checkout completed successfully!",
            severity: "success"
          });

          // setTimeout(() => {
          //   router.push('/order-confirmation');
          //   console.log("📦 Order placed successfully with payment on delivery");
          // }, 100);
        }
      },
      onError: (error) => {
        showSnackbar({
          message: error.message || "Checkout failed",
          severity: "error"
        });
      }
    });
  };

  const handlePaymentMethodSelect = (method) => {
    setPaymentType(method);

    if (method === "paystack" || method === "online_payment") {
      setShowPaymentGateway(false);
    }
  };

  return (
    // <div className="max-w-md mx-auto p-4 sm:p-6 md:max-w-7xl"></div>
    <div className="max-w-7xl mx-auto py-8 px-4 mt-7 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4">
        {/* ORDER SUMMARY - Top on Mobile */}
        <div className="block md:hidden">
          <OrderSummary checkout={handleCheckout} isPending={isPending} cart={cartData?.message?.cart} />
        </div>
      </div>

      <h1 className="text-xl font-bold mb-6 text-[#061410] hidden md:block">Cart (4 items)</h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4 ">
        {/* Delivery Details Section */}
        <div className="md:col-span-7">
          <div className="bg-white p-6 rounded-md shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-4 text-[#061410]">Delivery Details</h2>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First Name & Last Name */}
              <div>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  value={formData.firstName || ""}
                  onChange={(e) => setFormData({ firstName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-[#101828] text-xs font-medium placeholder:text-sm placeholder:font-normal placeholder:text-[#A1A2AE]"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  value={formData.lastName || ""}
                  onChange={(e) => setFormData({ lastName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-[#101828] text-xs font-medium placeholder:text-sm placeholder:font-normal placeholder:text-[#A1A2AE]"
                />
              </div>

              {/* Phone Number */}
              <div>
                <p className="mb-1 text-[#101828] text-xs font-medium">Phone Number</p>
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                  <div className="flex items-center px-3 border-r border-gray-300">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="text-sm border-0 focus:outline-none focus:ring-0 cursor-pointer"
                    >
                      {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.code}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    type="tel"
                    placeholder="801 234 5678"
                    value={formData.phone || ""}
                    onChange={(e) => setFormData({ phone: e.target.value })}
                    className="flex-1 px-3 py-2 border-0 focus:outline-none text-sm placeholder:text-sm
                    placeholder:font-normal placeholder:text-[#A1A2AE] text-black"
                  />
                </div>
              </div>

              <div>
                <p className="mb-1 text-[#101828] text-xs font-medium">Alternate Phone Number (Optional)</p>
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                  <div className="flex items-center px-3 border-r border-gray-300">
                    <select
                      value={altCountryCode}
                      onChange={(e) => setAltCountryCode(e.target.value)}
                      className="text-sm border-0 focus:outline-none focus:ring-0 cursor-pointer"
                    >
                      {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.code}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    type="tel"
                    placeholder="801 234 5678"
                    value={formData.altPhone || ""}
                    onChange={(e) => setFormData({ altPhone: e.target.value })}
                    className="flex-1 px-3 py-2 border-0 focus:outline-none text-sm placeholder:text-sm
                    placeholder:font-normal placeholder:text-[#A1A2AE] text-black"
                  />
                </div>
              </div>

              {/* Street Address */}
              <div className="sm:col-span-2">
                <p className="mb-1 text-[#101828] text-xs font-medium">Select Address</p>
                <input
                  type="text"
                  placeholder="Enter your address"
                  value={formData.address || ""}
                  onChange={(e) => setFormData({ address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-[#101828] text-xs font-medium placeholder:text-sm placeholder:font-normal placeholder:text-[#A1A2AE]"
                />
              </div>

              {/* Landmark */}
              <div className="">
                <p className="mb-1 text-[#101828] text-xs font-medium">Landmark (Optional)</p>
                <input
                  type="text"
                  placeholder="Enter landmark"
                  value={formData.landmark || ""}
                  onChange={(e) => setFormData({ landmark: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-[#101828] text-xs font-medium placeholder:text-sm placeholder:font-normal placeholder:text-[#A1A2AE]"
                />
              </div>

              {/* City */}
              <div>
                <p className="mb-1 text-[#101828] text-xs font-medium">City</p>
                <input
                  type="text"
                  placeholder="Enter city"
                  value={formData.city || ""}
                  onChange={(e) => setFormData({ city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-[#101828] text-xs font-medium placeholder:text-sm placeholder:font-normal placeholder:text-[#A1A2AE]"
                />
              </div>

              {/* State */}
              <div className="mb-4">
                <label htmlFor="state" className="block text-xs font-medium text-[#101828] mb-1">
                  State
                </label>
                <select
                  value={formData.state || ""}
                  onChange={(e) =>
                    setFormData({ state: e.target.value, lga: '' })
                  }
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none bg-white ${formData.state ? 'text-[#131735] font-normal text-sm' : 'text-gray-400'}`}
                >
                  <option value="" disabled hidden>Select State</option>
                  {statesWithLGAs.map((s) => (
                    <option key={s.state} value={s.state}
                      style={{
                        color: '#101828',
                        fontWeight: '400',
                        fontSize: '14px',
                      }}>{s.state}</option>
                  ))}
                </select>
              </div>

              {/* LGA */}
              {lgaOptions.length > 0 && (
                <div className="mb-4">
                  <label htmlFor="lga" className="block text-xs font-medium text-[#101828] mb-1">
                    Local Government Area (LGA)
                  </label>
                  <select
                    value={formData.lga || ""}
                    onChange={(e) =>
                      setFormData({ lga: e.target.value })
                    }
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none bg-white ${formData.lga ? 'text-[#131735] font-normal text-sm' : 'text-gray-400'}`}
                  >
                    <option value="" disabled hidden>Select LGA</option>
                    {lgaOptions.map((lga) => (
                      <option key={lga} value={lga} style={{
                        color: '#101828',
                        fontWeight: '400',
                        fontSize: '14px',
                      }}>{lga}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Default Address */}
              <div className="sm:col-span-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isDefault || false}
                    onChange={async (e) => {
                      const checked = e.target.checked;

                      setFormData((prev) => ({
                        ...prev,
                        isDefault: checked,
                      }));

                      // If checked, call API to get default address
                      if (checked) {
                        try {
                          const { data } = await refetchDefaultAddress();
                          if (data) {
                            setFormData((prev) => ({
                              ...prev,
                              firstName: data.firstName || "",
                              lastName: data.lastName || "",
                              phone: data.phoneNumber?.slice(-10) || "",
                              altPhone: data.altPhoneNumber?.slice(-10) || "",
                              address: data.address || "",
                              landmark: data.landmark || "",
                              city: data.city || "",
                              lga: data.lga || "",
                              state: data.state || "",
                              isDefault: data.isDefault || true,
                            }));

                            // Auto-set country codes if needed
                            if (data.phoneNumber?.startsWith("+234")) setCountryCode("+234");
                            if (data.altPhoneNumber?.startsWith("+234")) setAltCountryCode("+234");
                          }
                        } catch (err) {
                          console.error("Failed to fetch default address:", err);
                        }
                      }
                    }}
                    className="mr-2"
                  />
                  <span className="text-[#101828] text-xs font-medium">Set as default address</span>
                </label>
              </div>
            </div>
          </div>

          <div className="py-8">
            <PaymentMethod
              selectedMethod={paymentType}
              setSelectedMethod={setPaymentType}
              paymentMethods={paymentMethods}
              onMethodSelect={handlePaymentMethodSelect}
            />
          </div>
        </div>

        {/* Order Summary Section */}
        {/* {cartData?.message?.cart ? ( */}
        <div className="hidden md:block md:col-span-5">
          <OrderSummary checkout={handleCheckout} isPending={isPending} cart={cartData?.message?.cart} />
        </div>
        {/* // ) : ( */}
        {/* <div className="text-gray-400 text-sm">Loading summary...</div> */}
        {/* // )} */}
      </div>

      {/* Payment Gateway Modal */}
      {showPaymentGateway && paymentMethods && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-4">Choose Payment Method</h3>
            <div className="space-y-3">
              {Object.entries(paymentMethods).map(([key, method]) => (
                <button
                  key={key}
                  onClick={() => handlePaymentMethodSelect(key)}
                  className="w-full p-3 border border-gray-300 rounded-md hover:bg-gray-50 text-left"
                >
                  <div className="font-medium">{method.name || key}</div>
                  {method.description && (
                    <div className="text-sm text-gray-600">{method.description}</div>
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowPaymentGateway(false)}
              className="mt-4 w-full py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}