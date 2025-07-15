"use client";

import { useRouter } from "next/navigation";
import RegNavbar from "../reusables/RegNavBar";
import { useState } from "react";
import useForgotPasswordMutation from "../../lib/hooks/Auth/useForgotPassword";


const ResetPassword = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const forgotPassword = useForgotPasswordMutation();
    
   
   const handleSubmit = async (e) => {
  e.preventDefault();

  forgotPassword.mutate(
    { email },
    {
      onSuccess: (data) => {
        console.log('Success:', data);
        alert('Password reset link sent to your email!');
        router.push('/checkEmai')
      },
      onError: (error) => {
        console.error('Error:', error);
        alert(error.message || 'An error occurred. Please try again.');
      },
    }
  );
};



    const handleSignin = () => {
        router.push('/login')
    }
  return (
    <>
        {/* <RegNavbar /> */}
        <div className="mt-44 px-4 sm:px-6 md:px-8">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-md bg-white mx-auto border-2 border-[#E4E7EC] shadow-none rounded-lg p-6 md:p-8"
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
            {/* <button
              type="submit"
              disabled={!email}
              className={`px-4 py-2 rounded-lg w-full transition-colors ${
                email ? "bg-[#26735B] text-white" : "bg-[#D0D5DD] text-white cursor-not-allowed"
              }`}
            >
              Reset Password
            </button> */}
             <button
              type="submit"
              disabled={!email || forgotPassword.isLoading}
              className={`px-4 py-2 rounded-lg w-full transition-colors ${
                email && !forgotPassword.isLoading
                  ? "bg-[#26735B] text-white"
                  : "bg-[#D0D5DD] text-white cursor-not-allowed"
              }`}
            >
              {forgotPassword.isLoading ? "Sending..." : "Reset Password"}
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