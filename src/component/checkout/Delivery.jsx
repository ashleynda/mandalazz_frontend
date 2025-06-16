"use client"

import { useState } from "react"
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  MenuItem,
  Select,
  Checkbox,
  Button,
  Divider,
  FormControl,
  InputLabel,
  InputAdornment,
} from "@mui/material"
import OrderSummary from "./OrderSummary"
import PaymentMethod from "../../component/checkout/PaymentMethod";

const countries = [
    { code: "+234", name: "Nigeria", flag: "🇳🇬" },
    { code: "+1", name: "USA", flag: "🇺🇸" },
    { code: "+44", name: "UK", flag: "🇬🇧" },
    { code: "+33", name: "France", flag: "🇫🇷" },
    { code: "+49", name: "Germany", flag: "🇩🇪" },
    // Add more countries as needed
  ]

export default function Delivery() {
  const [deliveryMethod, setDeliveryMethod] = useState("pickup")
  const [countryCode, setCountryCode] = useState("+234")
  const [altCountryCode, setAltCountryCode] = useState("+234")

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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-[#101828] text-xs font-medium placeholder:text-sm placeholder:font-normal placeholder:text-[#A1A2AE]"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter Last Name"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-[#101828] text-xs font-medium placeholder:text-sm placeholder:font-normal placeholder:text-[#A1A2AE]"
                />
              </div>

              {/* Landmark */}
              <div className="">
              <p className="mb-1 text-[#101828] text-xs font-medium">Landmark (Optional)</p>
                <input
                  type="text"
                  placeholder="Placeholder"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-[#101828] text-xs font-medium placeholder:text-sm placeholder:font-normal placeholder:text-[#A1A2AE]"
                />
              </div>

              {/* City */}
              <div>
                 <p className="mb-1 text-[#101828] text-xs font-medium">City</p>
                <input
                  type="text"
                  placeholder="Placeholder"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-[#101828] text-xs font-medium placeholder:text-sm placeholder:font-normal placeholder:text-[#A1A2AE]"
                />
              </div>

               {/* LGA */}
               <div className="">
                    <p className="mb-1 text-[#101828] text-xs font-medium">LGA(Local Government Area)</p>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none bg-white ">
                        <option value="" >Select LGA</option>
                        </select>
                </div>

              {/* State */}
              <div>
                <p className="mb-1 text-[#101828] text-xs font-medium">State</p>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none bg-white">
                  <option value="">Select State</option>
                  <option value="lagos">Lagos</option>
                  <option value="abuja">Abuja</option>
                  <option value="rivers">Rivers</option>
                </select>
              </div>

             

              {/* Default Address */}
              <div className="sm:col-span-2">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-[#101828] text-xs font-medium">Set as default address</span>
                </label>
              </div>
            </div>
          </div>
          <div className="py-8">
            <PaymentMethod />
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="md:col-span-5">
          <OrderSummary />
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
