"use client";

import useSnackbarStore from '@/src/lib/store/useSnackbarStore';
import { Divider } from '@mui/material';
import React, { useState } from 'react';
import useChangePassword  from '../../lib/hooks/account/useChangePassword';

const SettingsPage = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { mutate: changePassword, isPending, error } = useChangePassword();
  const isFormEmpty = !oldPassword || !newPassword || !confirmPassword;
  const [errors, setErrors] = useState({ confirmPassword: '' });
  const { showSnackbar } = useSnackbarStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormEmpty) return;
    
    if (newPassword !== confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }
    const token = sessionStorage.getItem('authToken'); 


    changePassword({ oldPassword, newPassword, token }, {
      
      onSuccess: () => {
        showSnackbar({
          message: 'Password changed successfully!',
          type: 'success',
        });
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setErrors({ confirmPassword: '' });
      },
      onError: (error) => {
        showSnackbar({
          message: error.message || 'Failed to change password.',
          type: 'error',
        });
      }
    });
    console.log({ oldPassword, newPassword, token });
  };

   const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
    if (newPassword && value && newPassword !== value) {
      setErrors({ confirmPassword: 'Passwords do not match' });
    } else {
      setErrors({ confirmPassword: '' });
    }
  };

  return (
    <div className="max-w-4xl p-4 bg-white border-2 border-[#F2F4F7] mt-8 rounded-lg">
      <h1 className="text-lg font-bold mb-6 text-[#061410]">Settings</h1>
        <div className="-mx-4 md:-mx-4 hidden md:block mb-6">
          <Divider className="border-gray-200" />
        </div>
     
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-medium text-[#101828] mb-2">Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full px-3 py-2 border text-[#131735] border-gray-300 [#131735] text-rounded-lg text-sm placeholder:text-[#A1A2AE] placeholder:font-normal "
            placeholder="Enter Old Password"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#101828] mb-2">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300  text-[#131735] rounded-lg font-normal text-sm placeholder:text-[#A1A2AE] placeholder:font-normal"
            placeholder="Enter New Password"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#101828] mb-2">Re-enter New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 text-[#131735] rounded-lg font-normal text-sm placeholder:text-[#A1A2AE] placeholder:font-normal"
            placeholder="Re-enter New Password"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
          )}
        </div>
            <div className="-mx-6 md:-mx-4 hidden md:block">
              <Divider className="border-gray-200" />
            </div>
         
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isFormEmpty || isPending}
          className={`hidden sm:flex font-bold py-3 px-4 rounded-lg transition-colors text-base 
            ${isFormEmpty
                ? 'bg-[#26735B] text-white opacity-60 cursor-not-allowed' 
                : 'bg-[#26735B] hover:bg-emerald-700 text-white cursor-pointer'
            }`}
        >
          {/* Change Password */}
          {isPending ? 'Changing...' : 'Change Password'}
        </button>
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t sm:hidden">
          <button
            type='submit'
            disabled={isFormEmpty || isPending}
            className={`w-full text-white font-bold text-base px-8 py-3 rounded-lg transition-colors
               ${isFormEmpty
                ? 'bg-[#E8F4F0] text-[#26735B] cursor-not-allowed'
                : 'bg-[#26735B] hover:bg-emerald-700 text-white cursor-pointer'
            }`}
          >
            Change password
            
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;