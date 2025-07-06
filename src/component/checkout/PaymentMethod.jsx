// // import { Card, CardContent, RadioGroup } from "@mui/material";


// // export default function PaymentMethod() {
// //     return (
// //         <Card className="w-full max-w-md mx-auto">
// //             <CardHeader>
// //                 <CardTitle className="text-lg font-semibold">Payment Method</CardTitle>
// //             </CardHeader>
// //             <CardContent className="space-y-4">
// //                 <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
// //                 {/* Pay with Card */}
// //                 <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
// //                     <RadioGroupItem value="card" id="card" className="mt-1" />
// //                     <div className="flex-1">
// //                     <Label htmlFor="card" className="font-medium cursor-pointer">
// //                         Pay with Card
// //                     </Label>
// //                     <p className="text-sm text-gray-600 mt-1">
// //                         Pay instantly with your card. You'll be redirected to our secure payment page.
// //                     </p>
// //                     <div className="flex items-center gap-2 mt-2">
// //                         <div className="flex items-center gap-1">
// //                         <div className="w-8 h-5 bg-red-500 rounded-sm flex items-center justify-center">
// //                             <span className="text-white text-xs font-bold">MC</span>
// //                         </div>
// //                         <div className="w-8 h-5 bg-blue-600 rounded-sm flex items-center justify-center">
// //                             <span className="text-white text-xs font-bold">V</span>
// //                         </div>
// //                         <div className="w-8 h-5 bg-green-600 rounded-sm flex items-center justify-center">
// //                             <span className="text-white text-xs font-bold">VE</span>
// //                         </div>
// //                         </div>
// //                     </div>
// //                     </div>
// //                 </div>

// //                 {/* Pay with Paystack */}
// //                 <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
// //                     <RadioGroupItem value="paystack" id="paystack" className="mt-1" />
// //                     <div className="flex-1">
// //                     <Label htmlFor="paystack" className="font-medium cursor-pointer">
// //                         Pay with Paystack
// //                     </Label>
// //                     <p className="text-sm text-gray-600 mt-1">Pay instantly with card, bank transfer or USSD on Paystack</p>
// //                     <div className="mt-2">
// //                         <div className="inline-flex items-center px-3 py-1 bg-blue-100 rounded-full">
// //                         <span className="text-blue-800 text-sm font-semibold">paystack</span>
// //                         </div>
// //                     </div>
// //                     </div>
// //                 </div>

// //                 {/* Pay on Delivery */}
// //                 <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
// //                     <RadioGroupItem value="delivery" id="delivery" className="mt-1" />
// //                     <div className="flex-1">
// //                     <Label htmlFor="delivery" className="font-medium cursor-pointer">
// //                         Pay on Delivery
// //                     </Label>
// //                     <p className="text-sm text-gray-600 mt-1">
// //                         Pay when your item gets delivered to you. This option is only available for deliveries within Lagos.
// //                     </p>
// //                     </div>
// //                 </div>
// //                 </RadioGroup>
// //             </CardContent>

// //         </Card>
// //     )
// // };

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   FormControl,
//   FormControlLabel,
//   Radio,
//   RadioGroup,
//   Typography,
//   Box,
//   Chip,
// } from "@mui/material";
// import { useState } from "react";

// export default function PaymentMethod() {
//   const [selectedMethod, setSelectedMethod] = useState("card");

//   const handleChange = (event) => {
//     setSelectedMethod(event.target.value);
//   };

//   return (
//     <Card sx={{  mx: "auto" }} className="w-full">
//       <CardHeader
//         title={
//           <Typography variant="h6" fontWeight={600}>
//             Payment Method
//           </Typography>
//         }
//       />
//       <CardContent>
//         <FormControl component="fieldset" fullWidth>
//           <RadioGroup value={selectedMethod} onChange={handleChange}>
//             {/* Pay with Card */}
//             <Box
//               display="flex"
//               gap={2}
//               p={2}
//               border={1}
//               borderRadius={2}
//               sx={{ "&:hover": { backgroundColor: "#f9fafb" }, mb: 2 }}
//             >
//               <FormControlLabel
//                 value="card"
//                 control={<Radio />}
//                 label={
//                   <Box>
//                     <Typography fontWeight="medium">Pay with Card</Typography>
//                     <Typography variant="body2" color="text.secondary" mt={0.5}>
//                       Pay instantly with your card. You'll be redirected to our secure payment page.
//                     </Typography>
//                     <Box mt={1} display="flex" gap={1}>
//                       <Chip label="MC" sx={{ backgroundColor: "red", color: "white", fontWeight: "bold" }} />
//                       <Chip label="V" sx={{ backgroundColor: "blue", color: "white", fontWeight: "bold" }} />
//                       <Chip label="VE" sx={{ backgroundColor: "green", color: "white", fontWeight: "bold" }} />
//                     </Box>
//                   </Box>
//                 }
//               />
//             </Box>

//             {/* Pay with Paystack */}
//             <Box
//               display="flex"
//               gap={2}
//               p={2}
//               border={1}
//               borderRadius={2}
//               sx={{ "&:hover": { backgroundColor: "#f9fafb" }, mb: 2 }}
//             >
//               <FormControlLabel
//                 value="paystack"
//                 control={<Radio />}
//                 label={
//                   <Box>
//                     <Typography fontWeight="medium">Pay with Paystack</Typography>
//                     <Typography variant="body2" color="text.secondary" mt={0.5}>
//                       Pay instantly with card, bank transfer or USSD on Paystack.
//                     </Typography>
//                     <Chip
//                       label="paystack"
//                       sx={{
//                         mt: 1,
//                         px: 1,
//                         py: 0.5,
//                         backgroundColor: "blue.100",
//                         color: "blue.800",
//                         fontWeight: 600,
//                       }}
//                     />
//                   </Box>
//                 }
//               />
//             </Box>

//             {/* Pay on Delivery */}
//             <Box
//               display="flex"
//               gap={2}
//               p={2}
//               border={1}
//               borderRadius={2}
//               sx={{ "&:hover": { backgroundColor: "#f9fafb" } }}
//             >
//               <FormControlLabel
//                 value="delivery"
//                 control={<Radio />}
//                 label={
//                   <Box>
//                     <Typography fontWeight="medium">Pay on Delivery</Typography>
//                     <Typography variant="body2" color="text.secondary" mt={0.5}>
//                       Pay when your item gets delivered to you. This option is only available for deliveries within Lagos.
//                     </Typography>
//                   </Box>
//                 }
//               />
//             </Box>
//           </RadioGroup>
//         </FormControl>
//       </CardContent>
//     </Card>
//   );
// }

import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Radio,
  RadioGroup,
  Typography,
  Box,
  Chip,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";
import mastercard from "../../assets/mastercard-logo.png";
import visa from "../../assets/visa.png";
import verve from "../../assets/verve.png";
import paystack from "../../assets/paystack.png";

export default function PaymentMethod({ selectedMethod, setSelectedMethod }) {
  // const [selectedMethod, setSelectedMethod] = useState("card");
  console.log({ mastercard, visa, verve, paystack });
  console.log(selectedMethod); // this is the prop you received



  const handleChange = (event) => {
    setSelectedMethod(event.target.value);
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader
        title={
          <Typography variant="h6" fontWeight={600}>
            Payment Method
          </Typography>
        }
      />
      <CardContent>
        <FormControl component="fieldset" fullWidth>
          <RadioGroup value={selectedMethod} onChange={handleChange}>
            {[
              // {
              //   value: "card",
              //   title: "Pay with Card",
              //   description: "Pay instantly with your card. You'll be redirected to our secure payment page.",
              //             logos: [
              //     mastercard,
              //     visa,
              //     verve,
              //   ],
              // },
              {
                value: "paystack",
                title: "Pay with Paystack",
                description: "Pay instantly with card, bank transfer or USSD on Paystack.",
                logos: [
                  paystack,

                ],
              },
              {
                value: "delivery",
                title: "Pay on Delivery",
                description:
                  "Pay when your item gets delivered to you. This option is only available for deliveries within Lagos.",
                  // logos: [],
              },
            ].map(({ value, title, description, logos }) => {
                const isSelected = selectedMethod === value;
                return (
              <Box
                key={value}
                display="flex"
                // flexDirection="column"
                justifyContent="space-between"
                alignItems="flex-start"
                border={1}
                // borderColor="#e5e7eb"
                borderColor={selectedMethod === value ? "#26735B" : "#e5e7eb"}
                borderRadius={2}
                
                p={2}
                mb={2}
                sx={{ "&:hover": { backgroundColor: "#f9fafb" },    borderRadius: '8px',
    padding: '16px',
    boxShadow: isSelected ? 'none' : '0px 2px 6px 0px #00000014', }}
              >
                <Box className="flex flex-col w-full">
                  <Typography fontWeight={600}>{title}</Typography>

                  <Typography variant="body2" color="text.secondary"  >
                    {description}
                  </Typography>
                 
                </Box>
                <Box display="flex" flexDirection="column" height="101px" >

                  {/* {logos && (
                    // <Box mt={1} display="flex" gap={1} padding={4}>                    
                    <> */}
                      <Radio
                        value={value}
                        checked={selectedMethod === value}
                        onChange={handleChange}
                      />
                      {(logos || []).map((src, index) => (
                        <img
                          key={index}
                          src={src.src}
                          alt={`Logo ${index}`}
                          style={{ height: 24, width: "auto", objectFit: "contain" }}
                        />
                      ))}
                      {/* </Box> */}
                    {/* </>
                  )} */}
                </Box>


              </Box>
                )
})}
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
}

