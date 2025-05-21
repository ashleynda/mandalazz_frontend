"use client";

import { useRouter } from "next/navigation";
import RegNavbar from "../reusables/RegNavBar";
import { useState } from "react";


const ResetPassword = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    
   
    const handleSubmit = (e) => {
        e.preventDefault();
    
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        const raw = JSON.stringify({
            email: email // Use the email state value
        });
    
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
    
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/forgot-password`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to send reset password email");
                }
                return response.text();
            })
            .then((result) => {
                console.log("Success:", result);
                alert("Password reset link sent to your email!");
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("An error occurred. Please try again.");
            });
    };


    const handleSignin = () => {
        router.push('/user/login')
    }
  return (
    <>
        <RegNavbar />
        <div className="mt-44 px-4 sm:px-6 md:px-8">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-md mx-auto border rounded shadow-none p-4 sm:p-6 md:p-8"
        >
          <div>
            <h1 className="text-lg font-bold text-[#000000]">Reset Password</h1>
            <p className="text-xs text-[#667085] font-normal">A password rest link will be sent to your email address.</p>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter Email Address"
              className="border p-2 rounded-md text-[#131735] placeholder-[#A1A2AE]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <button
              type="submit"
              disabled={!email}
              className={`px-4 py-2 rounded-lg w-full transition-colors ${
                email ? "bg-[#26735B] text-white" : "bg-[#D0D5DD] text-white cursor-not-allowed"
              }`}
            >
              Reset Password
            </button>
            <p className="text-sm font-normal text-black text-center">
              Remember your password?{" "}
              <span
                onClick={handleSignin}
                className="text-[#26735B] cursor-pointer font-bold text-sm"
              >
                Sign In
              </span>
            </p>
          </div>
        </form>
      </div>

    </>
  );
}

export default ResetPassword;