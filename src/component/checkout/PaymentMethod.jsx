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
                  justifyContent="space-between"
                  alignItems="flex-start"
                  border={1}
                  borderColor={isSelected ? "#26735B" : "#e5e7eb"}
                  borderRadius={2}
                  p={2}
                  mb={2}
                  sx={{
                    "&:hover": { backgroundColor: "#f9fafb" },
                    borderRadius: "8px",
                    padding: "16px",
                    boxShadow: isSelected ? "none" : "0px 2px 6px 0px #00000014",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedMethod(value)} // 🔥 this makes it interactive
                >
                  <Box className="flex flex-col w-full">
                    <Typography fontWeight={600}>{title}</Typography>

                    <Typography variant="body2" color="text.secondary"  >
                      {description}
                    </Typography>

                  </Box>
                  {/* <Box display="flex" flexDirection="column" height="101px" >
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
                  </Box> */}
                  <Box display="flex" flexDirection="column" alignItems="flex-end" height="101px">
                    <Radio
                      value={value}
                      checked={selectedMethod === value}
                      onChange={handleChange}
                      sx={{ display: "none" }} // hide default radio
                    />
                    {isSelected ? (
                      <Box
                        sx={{
                          height: 24,
                          width: 24,
                          borderRadius: 1,
                          backgroundColor: "#26735B",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          height: 24,
                          width: 24,
                          borderRadius: 1,
                          border: "2px solid #D1D5DB",
                        }}
                      />
                    )}
                    {(logos || []).map((src, index) => (
                      <img
                        key={index}
                        src={src.src}
                        alt={`Logo ${index}`}
                        style={{ height: 24, width: "auto", objectFit: "contain", marginTop: 20 }}
                      />
                    ))}
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

