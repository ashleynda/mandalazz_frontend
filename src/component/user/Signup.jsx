'use client'; // Only needed if using the App Router (app/signup/page.tsx)

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RegNavbar from '../reusables/RegNavBar';
import { LoadingButton } from '@mui/lab';
import { CircularProgress } from '@mui/material';
import useSignupStore from '../../lib/store/useSignupStore';
import useSignupMutation from '../../lib/hooks/Auth/useSignupMutation';
// import RegNavbar from '@/components/reusables/RegNavbar'; // adjust the path to your project structure





const Signup = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { formData, setFormData, errors, setErrors } = useSignupStore();
  const signupMutation = useSignupMutation();
  // const {
  //   formData,
  //   errors,
  //   isLoading,
  //   setFormData,
  //   setErrors,
  //   setIsLoading,
  // } = useSignupStore();

  // const [formData, setFormData] = useState<FormData>({
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   password: '',
  // });

  // const [errors, setErrors] = useState<FormErrors>({
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   password: '',
  // });

  const [showPassword, setShowPassword] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      valid = false;
    } else {
      newErrors.firstName = '';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      valid = false;
    } else {
      newErrors.lastName = '';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    } else {
      newErrors.email = '';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    } else {
      newErrors.password = '';
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    signupMutation.mutate(formData, {
      onSuccess: () => {
         console.log('Signup successful!');
        router.push('/validation');
        sessionStorage.setItem("email", formData.email); 
      },
      onError: (error) => {
        alert(error.message);
      },
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validate()) return;
  //   setIsLoading(true);

  //   try {
  //     const response = await fetch('https://mandalazz-copy-production.up.railway.app/api/user/register', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(formData),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       alert('Registration failed: ' + errorData.message);
  //       return;
  //     }

  //     alert('Registration successful!');
  //     router.push('/signup-validation');
  //   } catch (error) {
  //     alert('An error occurred during registration.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleChange = (e) => {
    setFormData( [e.target.name], e.target.value );
    console.log(formData);
    console.log(e.target.name, e.target.value);
  };
  

  const handleSignIn = () => {
    router.push('/login');
  };

  
  const handleClick = () => {
    setLoading(true);

    // Simulate a request with a timeout
    setTimeout(() => {
      setLoading(false);
      // You can put the code you want to execute after the loading is done here
    }, 2000); // Example: 2 seconds of loading
  };

  const checkFormValidity = () => {
    return (
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.password.trim() !== ''
    );
  };

  return (
    <>
        {/* <RegNavbar /> */}
<div className="flex min-h-screen items-center justify-center px-4">
  <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
    <h1 className="text-xl font-semibold text-[#101828] mb-1">Create An Account</h1>
    <p className="text-sm text-[#667085] mb-6">Enter your details to create an account.</p>

    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="firstName" className="text-sm font-medium text-gray-700">Full Name</label>
        <input
          name="firstName"
          placeholder="Enter First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="mt-1 w-full border text-[#131735] placeholder-[#A1A2AE] border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#26735B]  placeholder:text-sm placeholder:font-normal"
        />
        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
      </div>

      <div>
        <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</label>
        <input
          name="lastName"
          placeholder="Enter Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="mt-1 w-full text-[#131735] placeholder-[#A1A2AE] border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#26735B] placeholder:text-sm placeholder:font-normal"
        />
        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
        <input
          name="email"
          type="email"
          placeholder="Enter Email Address"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 w-full text-[#131735] placeholder-[#A1A2AE] border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#26735B]  placeholder:text-sm placeholder:font-normal"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
        <div className="relative">
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 w-full text-[#131735] placeholder-[#A1A2AE] border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#26735B]  placeholder:text-sm placeholder:font-normal"
          />
           <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 cursor-pointer"
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
        </div>
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>

      {/* Submit */}
      <div>
      {/* <button type="submit" disabled={signupMutation.isPending}>
        {signupMutation.isPending ? 'Loading...' : 'Sign Up'}
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
            Sign Up
        </LoadingButton>
      </div>

      <p className="text-sm mt-4 text-center text-gray-600">
        Already have an account?{' '}
        <span
          className="text-[#26735B] font-semibold cursor-pointer"
          onClick={handleSignIn}
        >
          Sign In
        </span>
      </p>
    </form>
  </div>
</div>

    
    </>
  );
};

export default Signup;
