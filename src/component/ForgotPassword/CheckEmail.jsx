"use client";

import Image from "next/image";
import tab from "../../assets/tab-1 1.png";
import { useEffect, useState } from "react";


const CheckEmail = () => {
     const [email, setEmail] = useState("");

    useEffect(() => {
        const storedEmail = sessionStorage.getItem("email");
        if (storedEmail) setEmail(storedEmail);
    }, []);
    return (
        <>
            <div className="border bg-white p-4 py-6 md:p-8 rounded shadow-md w-[343px] md:w-full max-h-[287px] overflow-hidden max-w-md mx-auto mt-60 text-center">
            <Image
                src={tab}
                alt="confirm icon"
                width={86}
                height={86}
                className="rounded-t-lg mb-4 mx-auto"
            />
            <h2 className="text-lg font-bold text-[#000000]">Check your email</h2>
            <p className="text-xs font-semibold text-[#667085]">
                A link to reset your password has been sent to <br/>
                {email}
            </p>
            </div>
      </>
    );
}

export default CheckEmail;