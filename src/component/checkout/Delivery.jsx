"use client"

import { useState } from "react"
import OrderSummary from "./OrderSummary"
import PaymentMethod from "../../component/checkout/PaymentMethod";
import useCreateCheckout from "../../lib/hooks/useCheckout";
import { useRouter } from "next/navigation";
import statesWithLGAs from "../../data/statesWithLGAs.json"; 
import { useDefaultAddress } from "../../lib/hooks/checkout/useFetchDefaultAddress";

const countries = [
  { code: "+234", name: "Nigeria", flag: "🇳🇬" },
  { code: "+1", name: "USA", flag: "🇺🇸" },
  { code: "+44", name: "UK", flag: "🇬🇧" },
  { code: "+33", name: "France", flag: "🇫🇷" },
  { code: "+49", name: "Germany", flag: "🇩🇪" },
]

export default function Delivery() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    altPhone: '',
    address: '',
    landmark: '',
    city: '',
    lga: '',
    state: '',
    isDefault: false,
    countryCode: '+234',
    altCountryCode: '+234'
  });
  const [deliveryMethod, setDeliveryMethod] = useState("pickup")
  const [countryCode, setCountryCode] = useState("+234")
  const [altCountryCode, setAltCountryCode] = useState("+234")
  const { mutate: checkout, isPending, isError, error } = useCreateCheckout();
  const router = useRouter();
  const [paymentType, setPaymentType] = useState("card");
  const selectedState = statesWithLGAs.find((s) => s.state === formData.state);
  const lgaOptions = selectedState ? selectedState.lgas : [];
  const { data: defaultAddress, isLoading, refetch: refetchDefaultAddress } = useDefaultAddress();



  const handleCheckout = () => {
    const token = typeof window !== "undefined" ? sessionStorage.getItem("authToken") : null;
    if (!token) {
      console.error("Token is missing or invalid");
      return;
    }
    const payload = {
      token,
      userDetails: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: `${countryCode}${formData.phone}`,
        altPhoneNumber: `${altCountryCode}${formData.altPhone}`,
        address: formData.address,
        landmark: formData.landmark,
        city: formData.city,
        lga: formData.lga,
        state: formData.state,
        isDefault: formData.isDefault,
      },
      paymentType: paymentType,
    };

    console.log('Submitting Checkout:', payload);
    console.log("Token:", token);
    console.log("Full payload:", payload);

    checkout(payload, {
      onSuccess: (data) => {
        console.log("Checkout success:", data);
        router.push("/checkout/success");
      },
      onError: (err) => {
        console.error("Checkout failed:", err);
        // Optional: show toast/snackbar
      },
    });



  };



  return (
    <div className="max-w-7xl mx-auto py-8 px-4 mt-7">
      <h1 className="text-xl font-bold mb-6 text-[#061410]">Cart (4 items)</h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Delivery Details Section */}
        <div className="md:col-span-7">
          <div className="bg-white p-6 rounded-md shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-4 text-[#061410]">Delivery Details</h2>

            {/* Delivery Method */}
            {/* <div className="flex space-x-4 mb-6">
              <label className={`flex items-center cursor-pointer border border-[#319B79] w-full rounded-md px-3 py-2
                ${deliveryMethod === "pickup" ? "border-[#319B79]" : "border-[#E9E8E8]" }`}>
                <span className="flex-grow text-[#171C26] text-sm font-semibold">Pick up from the store</span>
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="pickup"
                  checked={deliveryMethod === "pickup"}
                  onChange={() => setDeliveryMethod("pickup")}
                  className="accent-green-600"
                />
              </label>
              <label className={`flex items-center cursor-pointer border border-[#319B79] w-full rounded-md px-3 py-2
                ${deliveryMethod === "delivery" ? "border-[#319B79]" : "border-[#E9E8E8]" }`}>
                <span className="flex-grow text-[#171C26] text-sm font-semibold">Home delivery</span>
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="delivery"
                  checked={deliveryMethod === "delivery"}
                  onChange={() => setDeliveryMethod("delivery")}
                  className="accent-green-600 border border-[#319B79]"
                />
              </label>
            </div> */}

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First Name & Last Name */}
              <div>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-[#101828] text-xs font-medium placeholder:text-sm placeholder:font-normal placeholder:text-[#A1A2AE]"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-[#101828] text-xs font-medium placeholder:text-sm placeholder:font-normal placeholder:text-[#A1A2AE]"
                />
              </div>

              {/* Phone Number */}
              <div>
                <p className="mb-1 text-[#101828] text-xs font-medium">Phone Number</p>
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                  <div className="flex items-center px-3 border-r border-gray-300">
                    {/* <div className="relative w-5 h-3 mr-1">
                      <div className="absolute inset-0 bg-green-600"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-1/3 h-full bg-white"></div>
                      </div>
                    </div>
                    <span className="text-sm text-[#131735]">+234</span> */}
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
                    type="number"
                    placeholder="801 234 5678"
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="flex-1 px-3 py-2 border-0 focus:outline-none text-sm placeholder:text-sm 
                    placeholder:font-normal placeholder:text-[#A1A2AE] text-black"
                  />
                </div>
              </div>

              <div>
                <p className="mb-1 text-[#101828] text-xs font-medium">Alternate Phone Number (Optional)</p>
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                  <div className="flex items-center px-3 border-r border-gray-300">
                    <div className="relative w-5 h-3 mr-1">
                      <div className="absolute inset-0 bg-green-600"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-1/3 h-full bg-white"></div>
                      </div>
                    </div>
                    <span className="text-sm text-[#131735]">+234</span>
                  </div>
                  <input
                    type="number"
                    placeholder="801 234 5678"
                    onChange={(e) => setFormData({ ...formData, altPhone: e.target.value })}
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
                  placeholder="Placeholder"
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-[#101828] text-xs font-medium placeholder:text-sm placeholder:font-normal placeholder:text-[#A1A2AE]"
                />
              </div>

              {/* Landmark */}
              <div className="">
                <p className="mb-1 text-[#101828] text-xs font-medium">Landmark (Optional)</p>
                <input
                  type="text"
                  placeholder="Placeholder"
                  onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-[#101828] text-xs font-medium placeholder:text-sm placeholder:font-normal placeholder:text-[#A1A2AE]"
                />
              </div>

              {/* City */}
              <div>
                <p className="mb-1 text-[#101828] text-xs font-medium">City</p>
                <input
                  type="text"
                  placeholder="Placeholder"
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-[#101828] text-xs font-medium placeholder:text-sm placeholder:font-normal placeholder:text-[#A1A2AE]"
                />
              </div>

              {/* LGA */}
              {/* <div className="">
                    <p className="mb-1 text-[#101828] text-xs font-medium">LGA(Local Government Area)</p>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none bg-white ">
                        <option value="" >Select LGA</option>
                        </select>
                </div> */}
              {/* <div className="">
                <label htmlFor="lga" className="mb-1 block text-[#101828] text-xs font-medium">
                  LGA (Local Government Area) <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  id="lga"
                  type="text"
                  placeholder="Enter LGA (optional)"
                  onChange={(e) => setFormData({ ...formData, lga: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-[#101828] placeholder:text-gray-400"
                />
              </div>


              {/* State */}
              {/* <div>
                <p className="mb-1 text-[#101828] text-xs font-medium">State</p>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none bg-white"
                  value={formData.state}
  onChange={(e) => setFormData({ ...formData, state: e.target.value })}


                >
                  <option value="">Select State</option>
                  <option value="lagos">Lagos</option>
                  <option value="abuja">Abuja</option>
                  <option value="rivers">Rivers</option>
                </select>
              </div>  */}
              <div className="mb-4">
                <label htmlFor="state" className="block text-xs font-medium text-[#101828] mb-1">
                  State
                </label>
                <select
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value, lga: '' })
                  }
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none bg-white  ${formData.state ? 'text-[#131735] font-normal text-sm' : 'text-gray-400'}`}
                >
                  <option value="" disabled hidden>Select State</option>
                  {statesWithLGAs.map((s, index) => (
                    <option key={s.state} value={s.state}
                      style={{
                        color: '#101828',
                         fontWeight: '400',
                        fontSize: '14px',
                      }}>{s.state}</option>
                  ))}
                </select>
              </div>

              {lgaOptions.length > 0 && (
                <div className="mb-4">
                  <label htmlFor="lga" className="block text-xs font-medium text-[#101828] mb-1">
                    Local Government Area (LGA)
                  </label>
                  <select
                    value={formData.lga}
                    onChange={(e) =>
                      setFormData({ ...formData, lga: e.target.value })
                    }
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none bg-white ${formData.state ? 'text-[#131735] font-normal text-sm' : 'text-gray-400'}`}
                  >
                    {/* #131735 */}
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
              {/* <div className="sm:col-span-2">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox"
                    onChange={(e) => setFormData({ ...formData, isDefault: e.target.value })}
                    className="mr-2" />
                  <span className="text-[#101828] text-xs font-medium">Set as default address</span>
                </label>
              </div> */}
              <div className="sm:col-span-2">
  <label className="flex items-center cursor-pointer">
    <input
      type="checkbox"
      checked={formData.isDefault}
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
            <PaymentMethod selectedMethod={paymentType} setSelectedMethod={setPaymentType} />
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="md:col-span-5">
          <OrderSummary checkout={handleCheckout} />
        </div>
      </div>
    </div>
  )

  //   return (
  //     <Container maxWidth="lg" sx={{ py: 4, marginTop: "100px" }}>
  //       <Typography variant="h6" fontWeight="bold" gutterBottom>
  //         Cart (4 items)
  //       </Typography>

  //       <Grid container spacing={3}>
  //         {/* Delivery Details Section */}
  //         <Grid item xs={12} md={7}>
  //           <Paper sx={{ p: 3, height: "100%" }}>
  //             <Typography variant="h6" fontWeight="bold" gutterBottom>
  //               Delivery Details
  //             </Typography>

  //             <Box sx={{ mb: 3 }} className="flex flex-col gap-2">
  //               <RadioGroup row value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value)}>
  //                 <FormControlLabel value="pickup" control={<Radio />} label="Pick up from the store" className="border border-[#E9E8E8] "/>
  //                 <FormControlLabel value="delivery" control={<Radio color="success" />} label="Home delivery" className="border border-[#E9E8E8] " />
  //               </RadioGroup>
  //             </Box>

  //             <Grid container spacing={2}>
  //               <Grid item xs={12} sm={6}>
  //                 <TextField
  //                   fullWidth
  //                   label="First name"
  //                   placeholder="Enter First Name"
  //                   variant="outlined"
  //                   size="small"
  //                 />
  //               </Grid>
  //               <Grid item xs={12} sm={6}>
  //                 <TextField fullWidth label="Last name" placeholder="Enter Last Name" variant="outlined" size="small" />
  //               </Grid>

  //               <Grid item xs={12} sm={6}>
  //                 <Typography variant="body2" gutterBottom>
  //                   Phone Number
  //                 </Typography>
  //                 <Box sx={{ display: "flex", gap: 1 }}>
  //                   <FormControl size="small" sx={{ width: "30%" }}>
  //                     <Select
  //                       value={countryCode}
  //                       onChange={(e) => setCountryCode(e.target.value)}
  //                       startAdornment={
  //                         <InputAdornment position="start">
  //                           <Box
  //                             component="img"
  //                             src="/ng-flag.svg"
  //                             alt="Nigeria flag"
  //                             sx={{ width: 20, height: 15, mr: 1 }}
  //                           />
  //                         </InputAdornment>
  //                       }
  //                     >
  //                       <MenuItem value="+234">+234</MenuItem>
  //                       <MenuItem value="+1">+1</MenuItem>
  //                       <MenuItem value="+44">+44</MenuItem>
  //                     </Select>
  //                   </FormControl>
  //                   <TextField fullWidth placeholder="801 234 5678" variant="outlined" size="small" />
  //                 </Box>
  //               </Grid>

  //               <Grid item xs={12} sm={6}>
  //                 <Typography variant="body2" gutterBottom>
  //                   Alternate Phone Number (Optional)
  //                 </Typography>
  //                 <Box sx={{ display: "flex", gap: 1 }}>
  //                   <FormControl size="small" sx={{ width: "30%" }}>
  //                     <Select
  //                       value="+234"
  //                       startAdornment={
  //                         <InputAdornment position="start">
  //                           <Box
  //                             component="img"
  //                             src="/ng-flag.svg"
  //                             alt="Nigeria flag"
  //                             sx={{ width: 20, height: 15, mr: 1 }}
  //                           />
  //                         </InputAdornment>
  //                       }
  //                     >
  //                       <MenuItem value="+234">+234</MenuItem>
  //                       <MenuItem value="+1">+1</MenuItem>
  //                       <MenuItem value="+44">+44</MenuItem>
  //                     </Select>
  //                   </FormControl>
  //                   <TextField fullWidth placeholder="801 234 5678" variant="outlined" size="small" />
  //                 </Box>
  //               </Grid>

  //               <Grid item xs={12}>
  //                 <TextField fullWidth label="Street Address" placeholder="Placeholder" variant="outlined" size="small" />
  //               </Grid>

  //               <Grid item xs={12}>
  //                 <TextField
  //                   fullWidth
  //                   label="Landmark (Optional)"
  //                   placeholder="Placeholder"
  //                   variant="outlined"
  //                   size="small"
  //                 />
  //               </Grid>

  //               <Grid item xs={12} sm={6}>
  //                 <TextField fullWidth label="City" placeholder="Placeholder" variant="outlined" size="small" />
  //               </Grid>

  //               <Grid item xs={12} sm={6}>
  //                 <FormControl fullWidth size="small">
  //                   <InputLabel>State</InputLabel>
  //                   <Select label="State" defaultValue="">
  //                     <MenuItem value="lagos">Lagos</MenuItem>
  //                     <MenuItem value="abuja">Abuja</MenuItem>
  //                     <MenuItem value="rivers">Rivers</MenuItem>
  //                   </Select>
  //                 </FormControl>
  //               </Grid>

  //               <Grid item xs={12}>
  //                 <FormControl fullWidth size="small">
  //                   <InputLabel>LGA (Local Government Area)</InputLabel>
  //                   <Select label="LGA (Local Government Area)" defaultValue="">
  //                     <MenuItem value="select-lga">Select LGA</MenuItem>
  //                   </Select>
  //                 </FormControl>
  //               </Grid>

  //               <Grid item xs={12}>
  //                 <FormControlLabel control={<Checkbox />} label="Set as default address" />
  //               </Grid>
  //             </Grid>
  //           </Paper>
  //         </Grid>

  //         {/* Order Summary Section */}
  //         </Grid>
  //     </Container>
  //   )
}
