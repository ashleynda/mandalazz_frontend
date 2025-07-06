'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Image from 'next/image'
import RegNavbar from '../reusables/RegNavBar'
import check from '../../assets/check.png'

const SignupValidation = () => {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      // Redirect to login page after 3 seconds
      router.push('/verify') // Replace '/login' with your actual login route
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <>
      <RegNavbar />
        <div className="border p-6 md:p-8 rounded shadow-md w-[343px] md:w-full max-h-[287px] overflow-hidden max-w-md mx-auto mt-60 text-center">
            <Image
                src={check}
                alt="check icon"
                width={86}
                height={86}
                className="rounded-t-lg mb-4 mx-auto"
            />
            <h2 className="text-lg font-bold text-[#000000]">Order Successful!</h2>
            <p className="text-xs font-normal text-[#667085]">
                You order was placed successfully. We will<br />
                reach out to you to make the delivery.
            </p>
            <button className='bg-[#26735B] text-white text-base font-bold rounded-lg'>
                Okay
            </button>
        </div>
    </>
  )
}

export default SignupValidation;
