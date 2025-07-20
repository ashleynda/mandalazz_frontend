'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import RegNavbar from '../reusables/RegNavBar'
import useLoginMutation from '../../lib/hooks/Auth/useLoginMutation'
import useLoginStore from '../../lib/store/useLoginStore'

import { Button, CircularProgress } from '@mui/material';
import useResetPasswordMutation from '../../lib/hooks/Auth/useRestPassword'


const NewPassword= () => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(''); // or get this via router/query/props
  const [token, setToken] = useState(''); // same as above
  const [errors, setErrors] = useState({});

  const { mutate, isPending } = useResetPasswordMutation();

  const checkFormValidity = () =>
    email.trim() !== '' &&
    token.trim() !== '' &&
    newPassword.trim() !== '' &&
    confirmPassword.trim() !== '' &&
    newPassword === confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if (newPassword !== confirmPassword) {
      setErrors({ general: 'Passwords do not match' });
      return;
    }

    mutate(
      { email, token, newPassword },
      {
        onSuccess: (data) => {
          console.log('Password reset successful', data);
          router.push('/login'); // or wherever you want to redirect
        },
        onError: (error) => {
          setErrors({ general: error.message });
        },
      }
    );
  };


  return (
    <>
      {/* <RegNavbar /> */}
      <div className="flex min-h-screen items-center justify-center gap-4 px-4 sm:px-6 md:px-8">
        <div className='w-full max-w-md bg-white p-6 rounded-xl shadow-lg'>

          <h1 className="text-lg font-bold text-[#000000]">Reset Password</h1>
          <p className="text-xs text-[#667085] font-normal mb-6">Please create a new password.</p>
        
          <form
            // onSubmit={handleSubmit}
            className="flex flex-col gap-4 
            "
            // max-w-md mx-auto border rounded shadow-none p-4 sm:p-6 md:p-8
          >          

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className='text-sm font-medium text-gray-700'>New Password</label>
              <input
                id="new password"
                type="new password"
                placeholder="Enter New Password"
                className="border border-gray-300 p-2 rounded-md text-[#131735] placeholder-[#A1A2AE]"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {/* {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>} */}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Password"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 pr-10 text-sm text-[#131735] placeholder-[#A1A2AE] focus:outline-none focus:ring-2 focus:ring-[#26735B]"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  {showPassword ? '🙈' : '👁️'}
                </span>
              </div>
              {/* {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>} */}
              {errors.general && <div className="text-red-500 text-sm">{errors.general}</div>}
            </div>

          

            <div className="flex flex-col gap-4 mt-4">
              {/* <button
                type="submit"
                className="bg-[#26735B] text-white px-4 py-2 rounded-lg w-full cursor-pointer hover:bg-[#1f5a4a] transition-colors duration-200"
              >
                Sign In
              </button> */}
              <Button
              loading={isPending}
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
          </Button>
              
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default NewPassword;
