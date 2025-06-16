"use client";

import { useRouter } from "next/navigation";
import useVerifyMutation from "../../lib/hooks/useVerifyMutation";
import { useEffect, useRef, useState } from "react";
import { Button } from '@mui/material';

export default function Verify() {
    const router = useRouter();
    const [otp, setOtp] = useState(['']);
    const inputRefs = useRef([]);
    const [email, setEmail] = useState('');
    const {
        mutate: verifyEmail,
        isPending: isLoading,
        error: verifyEmailError,
    } = useVerifyMutation();

        useEffect(() => {
        const storedEmail = sessionStorage.getItem("email");
        if (storedEmail) {
            setEmail(storedEmail);
        } else {
            // Optional: redirect or show message if email is missing
            console.error("No email found in sessionStorage.");
        }
    }, []);

    const handleChange = (index, value) => {
        if (!/^\d*$/.test(value)) return; // allow only numbers

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        const pastedData = e.clipboardData.getData('Text').slice(0, 6).split('');
        if (pastedData.length === 6) {
            setOtp(pastedData);
        }
    };

    const isOtpValid = otp.every((digit) => digit !== '');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isOtpValid || isLoading) return;

        const token = otp.join('');

        verifyEmail(
            { email, token },
            {
                onSuccess: () => {
                    console.log('Verification successful!');
                    // navigate or show success toast
                    router.push('/products');
                },
                onError: (error) => {
                    console.error(error);
                },
            }
        );
    };

    const handleResendCode = () => {
        // TODO: trigger resend code logic
        console.log('Resend code...');
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div   className="flex flex-col gap-4 w-[343px] md:w-full bg-white mx-auto border-2 border-[#E4E7EC] shadow-none rounded-lg p-6 md:p-8 mt-30 md:mt-60">
                {/* // className="flex flex-col justify-center h-[calc(70vh-115px)] w-[343px] md:w-full md:overflow-y-auto gap-4 mt-[45px] border border-[#E4E7EC] bg-white"> */}
                    <h1 className="text-3xl font-bold text-start text-[#191818]">Verify Your Email</h1>
                    <p className="text-sm font-normal text-[#212221]">
                        Enter the 6-digit verification code sent to your email
                    </p>

                    <div className="flex justify-center items-center mb-6 gap-2">
                        {[0, 1, 2].map((index) => (
                            <div key={index} className="w-10">
                                <input
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    value={otp[index]}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={index === 0 ? handlePaste : undefined}
                                    placeholder="0"
                                    style={{ color: otp[index] ? '#212221' : '#BABABA' }}
                                    className="w-full h-12 text-center text-2xl font-bold border rounded focus:border-[#D7D7D7] focus:ring-1 focus:ring-[#D7D7D7] outline-none"
                                    maxLength={1}
                                    inputMode="numeric"
                                    aria-label={`Digit ${index + 1} of verification code`}
                                />
                            </div>
                        ))}
                        <span className="text-[#D7D7D7] font-bold text-lg">-</span>
                        {[3, 4, 5].map((index) => (
                            <div key={index} className="w-10">
                                <input
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    value={otp[index]}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    placeholder="0"
                                    style={{ color: otp[index] ? '#212221' : '#BABABA' }}
                                    className="w-full h-12 text-center text-2xl font-bold border rounded focus:border-[#D7D7D7] focus:ring-1 focus:ring-[#D7D7D7] outline-none"
                                    maxLength={1}
                                    inputMode="numeric"
                                    aria-label={`Digit ${index + 1} of verification code`}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-4">
                        <button
                            className={`w-full h-[37px] rounded-4xl text-sm font-extrabold ${isOtpValid ? 'bg-[#26735B] hover:bg-[#E04800]' : 'bg-[#D7D7D7]'
                                } text-white`}
                            type="submit"
                            disabled={!isOtpValid || isLoading}
                        >
                            {isLoading ? 'Verifying...' : 'Verify'}
                        </button>

                        <p className="text-sm font-normal text-[#212221] text-center">
                            Didn't get the code?{' '}
                            <span
                                className="underline text-[#26735B] text-sm font-bold cursor-pointer"
                                onClick={handleResendCode}
                            >
                                send again
                            </span>
                        </p>

                        {verifyEmailError && (
                            <p className="text-red-600 text-sm text-center font-medium">
                                {verifyEmailError.message}
                            </p>
                        )}
                    </div>
                </div>
            </form>
        </>
    )
};