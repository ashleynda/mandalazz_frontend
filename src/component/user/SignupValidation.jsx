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
        <h2 className="text-lg font-bold text-[#000000]">Account Created!</h2>
        <p className="text-xs font-normal text-[#667085]">
          You have successfully created your account.<br />
          We’ve sent a verification link to your email. Please click<br />
          the link to verify your email.
        </p>
      </div>
    </>
  )
}

export default SignupValidation;
