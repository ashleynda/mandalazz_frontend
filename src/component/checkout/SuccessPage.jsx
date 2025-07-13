// 'use client'

// import { useRouter } from 'next/navigation'
// import { useEffect } from 'react'
// import Image from 'next/image'
// import RegNavbar from '../reusables/RegNavBar'
// import check from '../../assets/check.png'

// const SignupValidation = () => {
//   const router = useRouter()

//   // useEffect(() => {
//   //   const timer = setTimeout(() => {
//   //     // Redirect to login page after 3 seconds
//   //     router.push('/verify') // Replace '/login' with your actual login route
//   //   }, 3000)

//   //   return () => clearTimeout(timer)
//   // }, [router])

//   return (
//     <>
//       <RegNavbar />
//         <div className="border p-6 md:p-8 rounded shadow-md w-[343px] md:w-full max-h-[287px] overflow-hidden max-w-md mx-auto mt-60 text-center">
//             <Image
//                 src={check}
//                 alt="check icon"
//                 width={86}
//                 height={86}
//                 className="rounded-t-lg mb-4 mx-auto"
//             />
//             <h2 className="text-lg font-bold text-[#000000]">Order Successful!</h2>
//             <p className="text-xs font-normal text-[#667085]">
//                 You order was placed successfully. We will<br />
//                 reach out to you to make the delivery.
//             </p>
//             <button className='bg-[#26735B] text-white text-base font-bold rounded-lg'>
//                 Okay
//             </button>
//         </div>
//     </>
//   )
// }

// export default SignupValidation;

'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import RegNavbar from '../reusables/RegNavBar'
import check from '../../assets/check.png'
import useSnackbarStore from "@/src/lib/store/useSnackbarStore";

const OrderSuccess = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { showSnackbar } = useSnackbarStore()
  const [isVerifying, setIsVerifying] = useState(true)
  const [paymentStatus, setPaymentStatus] = useState(null)

  useEffect(() => {
    // Check if this is a return from payment gateway
    const reference = searchParams.get('reference')
    const trxref = searchParams.get('trxref')
    const status = searchParams.get('status')
    
    if (reference || trxref) {
      // This is a return from Paystack
      verifyPayment(reference || trxref)
    } else {
      // Direct navigation (e.g., from payment on delivery)
      setIsVerifying(false)
      setPaymentStatus('success')
    }
  }, [searchParams])

  const verifyPayment = async (reference) => {
    try {
      const token = sessionStorage.getItem("authToken")
      
      if (!token) {
        showSnackbar({ message: "Session expired. Please login again.", severity: "error" })
        router.push('/login')
        return
      }

      // Replace with your actual payment verification endpoint
      const response = await fetch(`/api/verify-payment/${reference}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      
      if (response.ok && data.status === 'success') {
        setPaymentStatus('success')
        showSnackbar({ 
          message: "Payment verified successfully!", 
          severity: "success" 
        })
      } else {
        setPaymentStatus('failed')
        showSnackbar({ 
          message: "Payment verification failed. Please contact support.", 
          severity: "error" 
        })
      }
    } catch (error) {
      console.error('Payment verification error:', error)
      setPaymentStatus('failed')
      showSnackbar({ 
        message: "Unable to verify payment. Please contact support.", 
        severity: "error" 
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const handleOkayClick = () => {
    // Navigate to orders page or home page
    router.push('/orders') // or wherever you want to redirect
  }

  if (isVerifying) {
    return (
      <>
        <RegNavbar />
        <div className="border p-6 md:p-8 rounded shadow-md w-[343px] md:w-full max-h-[287px] overflow-hidden max-w-md mx-auto mt-60 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#26735B] mx-auto mb-4"></div>
          <h2 className="text-lg font-bold text-[#000000]">Verifying Payment...</h2>
          <p className="text-xs font-normal text-[#667085]">
            Please wait while we verify your payment.
          </p>
        </div>
      </>
    )
  }

  if (paymentStatus === 'failed') {
    return (
      <>
        <RegNavbar />
        <div className="border p-6 md:p-8 rounded shadow-md w-[343px] md:w-full max-h-[287px] overflow-hidden max-w-md mx-auto mt-60 text-center">
          <div className="w-[86px] h-[86px] bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-[#000000]">Payment Failed!</h2>
          <p className="text-xs font-normal text-[#667085] mb-4">
            Your payment could not be verified.<br />
            Please contact support or try again.
          </p>
          <button 
            onClick={() => router.push('/checkout')}
            className='bg-[#26735B] text-white text-base font-bold rounded-lg px-6 py-2'
          >
            Try Again
          </button>
        </div>
      </>
    )
  }

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
        <p className="text-xs font-normal text-[#667085] mb-4">
          Your order was placed successfully. We will<br />
          reach out to you to make the delivery.
        </p>
        <button 
          onClick={handleOkayClick}
          className='bg-[#26735B] text-white text-base font-bold rounded-lg px-6 py-2'
        >
          Okay
        </button>
      </div>
    </>
  )
}

export default OrderSuccess;
