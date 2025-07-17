"use client";

import { Divider } from '@mui/material';
import React, { useState } from 'react';

const SettingsPage = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password change logic here
    console.log('Password change submitted');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white border-2 border-blue-400">
      <h1 className="text-xl font-semibold mb-6">Settings</h1>
      <Divider className='mb-6 w-full' /> 
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Old Password Field */}
        <div>
          <label className="block text-xs font-medium text-[#101828] mb-2">Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 [#131735] text-rounded-lg text-sm placeholder:text-[#A1A2AE] placeholder:font-normal "
            placeholder="Enter Old Password"
          />
        </div>

        {/* New Password Field */}
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

        {/* Re-enter New Password Field */}
        <div>
          <label className="block text-xs font-medium text-[#101828] mb-2">Re-enter New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 text-[#131735] rounded-lg font-normal text-sm placeholder:text-[#A1A2AE] placeholder:font-normal"
            placeholder="Re-enter New Password"
          />
        </div>
         <Divider className='mb-6 w-full' /> 
        {/* Submit Button */}
        <button
          type="submit"
          className="text bg-[#26735B] hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors text-base mt-8"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;