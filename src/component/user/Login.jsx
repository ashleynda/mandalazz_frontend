'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import RegNavbar from '../reusables/RegNavBar'
import useLoginMutation from '../../lib/hooks/Auth/useLoginMutation'
import useLoginStore from '../../lib/store/useLoginStore'
import { LoadingButton } from '@mui/lab';
import { CircularProgress } from '@mui/material';
import useSnackbarStore from '../../lib/store/useSnackbarStore';

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { formData, setFormData, errors, setErrors } = useLoginStore();
  const loginMutation = useLoginMutation();
  const { showSnackbar } = useSnackbarStore();

  // const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({})

  const validateForm = () => {
    const newErrors = { ...errors };

    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return;
    setLoading(true);

    loginMutation.mutate({ email, password }, {
      onSuccess: (data) => {
        console.log('Login successful:', data)
        const token = data?.message?.token;
        if (token) {
          sessionStorage.setItem('authToken', token);
          sessionStorage.setItem("userEmail", email);
          showSnackbar({ message: 'Login successful', severity: 'success' });
          // router.push('/products')
          setTimeout(() => {
            router.push('/products');
          }, 3000);
        }
        setLoading(false);
      },
      onError: (error) => {
        console.error('Login failed:', error)
        setErrors({ ...errors, general: 'Email or password is incorrect' });
        showSnackbar({ message: 'Login failed. Please check your credentials.', severity: 'error' });
        setLoading(false);
      },
    })
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  //   if (!validateForm()) return

  //   try {
  //     const response = await fetch('https://mandalazz-copy-production.up.railway.app/api/user/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email, password }),
  //     })

  //     if (!response.ok) {
  //       const errorData = await response.json()
  //       setErrors({ ...errors, general: 'Email or password is incorrect' }); // Set the general error
  //       return
  //     }

  //     const data = await response.json()
  //     console.log('Login successful:', data)
  //     // Example: router.push('/dashboard')
  //   } catch (error) {
  //     console.error('An error occurred:', error)
  //     setErrors({ ...errors, general: 'An error occurred during login.' }); // Handle unexpected errors
  //   }
  // }

  const handleSignup = () => {
    router.push('/signup')
  }

  const handleReset = () => {
    router.push('/resetPassword')
  }

  const checkFormValidity = () => {
    return (
      email.trim() !== '' &&
      password.trim() !== ''
    );
  };


  return (
    <>
      {/* <RegNavbar /> */}
      <div className="flex min-h-screen items-center justify-center gap-4 px-4 sm:px-6 md:px-8">
        <div className='w-full max-w-md bg-white p-6 rounded-xl shadow-lg'>

          <h1 className="text-lg font-bold text-[#000000]">Sign Into your Account</h1>
          <p className="text-xs text-[#667085] font-normal mb-6">Enter your email and password to login.</p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 
            "
          // max-w-md mx-auto border rounded shadow-none p-4 sm:p-6 md:p-8
          >

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className='text-sm font-medium text-gray-700'>Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter Email Address"
                className="border border-gray-300 p-2 rounded-md text-[#131735] placeholder-[#A1A2AE] placeholder:text-sm placeholder:font-normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>} */}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Password"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 pr-10 text-sm text-[#131735] placeholder-[#A1A2AE] focus:outline-none focus:ring-2 focus:ring-[#26735B] placeholder:text-sm placeholder:font-normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  {showPassword ? '🙈' : '👁️'}
                </span>
              </div>
              {/* {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>} */}
              {errors.general && <div className="text-[#F04438] text-xs font-medium">{errors.general}</div>}
            </div>

            <div>
              <p className="text-xs font-medium text-[#26735B] cursor-pointer" onClick={handleReset}>Forgot Password?</p>
            </div>

            <div className="flex flex-col gap-4 mt-4">
              {/* <button
                type="submit"
                className="bg-[#26735B] text-white px-4 py-2 rounded-lg w-full cursor-pointer hover:bg-[#1f5a4a] transition-colors duration-200"
              >
                Sign In
              </button> */}
              <LoadingButton
                loading={loading}
                loadingIndicator={<CircularProgress size={24} />}
                variant="contained"
                sx={{
                  backgroundColor: '#26735B', // Set the background color
                  '&:hover': {
                    backgroundColor: '#1f5f4a', // Set a darker color on hover (optional)
                  },
                }}
                // onClick={handleClick}
                type='submit'
                className='px-4 py-2 rounded-lg w-full transition-all duration-200 bg-[#26735B] text-white cursor-pointer'
                disabled={!checkFormValidity()}
              >
                Sign In
              </LoadingButton>
              <p className="text-sm font-normal text-black text-center">
                Don&apos;t have an account?{' '}
                <span
                  onClick={handleSignup}
                  className="text-[#26735B] cursor-pointer font-bold text-sm"
                >
                  Sign Up
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login;
