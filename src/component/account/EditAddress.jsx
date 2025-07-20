"use client";

import React, { useEffect, useState } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { useAddressById, useUpdateAddress } from '../../lib/hooks/account/useEditAddress';
import useSnackbarStore from '../../lib/store/useSnackbarStore';
import { useParams, useRouter } from 'next/navigation';
import { Divider } from '@mui/material';
import { useCreateAddress } from '@/src/lib/hooks/useCreateAddress';

export default function EditAddressForm() {
  const { id } = useParams();
  const isEditMode = Boolean(id)
  const { data, isLoading, isError } = useAddressById(id);
  const { mutate: updateAddress, isPending } = useUpdateAddress()
  const { showSnackbar } = useSnackbarStore();
  const router = useRouter();
  const { mutate: createAddress, isPending: isCreating } = useCreateAddress();


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    alternatePhoneNumber: '',
    streetAddress: '',
    landmark: '',
    city: '',
    lga: '',
    state: '',
    isDefault: false,
  });

  const [dropdownOpen, setDropdownOpen] = useState({
    lga: false,
    state: false
  });

  const nigerianStates = [
    'Lagos', 'Abuja', 'Kano', 'Rivers', 'Oyo', 'Kaduna', 'Edo', 'Delta', 'Ogun'
  ];

  const lagosLGAs = [
    'Eti-Osa', 'Ikeja', 'Lagos Island', 'Lagos Mainland', 'Surulere', 'Alimosho', 'Agege', 'Ikorodu'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDropdownSelect = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setDropdownOpen(prev => ({
      ...prev,
      [field]: false
    }));
  };

  useEffect(() => {
    if (isEditMode && data?.message.address) {
      const address = data.message.address;
      setFormData({
        firstName: address.firstName || '',
        lastName: address.lastName || '',
        phoneNumber: address.phoneNumber || '',
        alternatePhoneNumber: address.alternatePhoneNumber || '',
        streetAddress: address.address || '',
        landmark: address.landmark || '',
        city: address.city || '',
        lga: address.lga || '',
        state: address.state || '',
        isDefault: address.isDefault || false,
      });
    }
  }, [data, isEditMode]);

  useEffect(() => {
  if (!isEditMode) {
    setFormData({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      alternatePhoneNumber: '',
      streetAddress: '',
      landmark: '',
      city: '',
      lga: '',
      state: '',
      isDefault: false,
    });
  }
}, [isEditMode]);



  const handleSubmit = () => {
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      alternatePhoneNumber: formData.alternatePhoneNumber,
      address: formData.streetAddress,
      landmark: formData.landmark,
      city: formData.city,
      lga: formData.lga,
      state: formData.state,
      isDefault: formData.isDefault,
    };

    if(isEditMode) {
    updateAddress({ id, payload }, {
      onSuccess: (res) => {
        showSnackbar({ message: 'Edit saved successfully', severity: 'success' });
        router.push('/dashboard/address-book');
      },
      onError: (err) => {
        showSnackbar({ message: 'Failed to update address', severity: 'error' });
      }
    });
      } else {
    // Create a new address
    createAddress(payload, {
      onSuccess: () => {
        showSnackbar({ message: 'Address created successfully', severity: 'success' });
        router.push('/dashboard/address-book');
      },
      onError: (err) => {
        showSnackbar({ message: err.message || 'Failed to create address', severity: 'error' });
      }
    });
  }

  };

  return (
    <>
      {/* <div className="bg-white border-b border-gray-200 px-6 py-4"> */}
      <div className="flex items-center gap-3 sm:hidden mt-6" onClick={() => router.back('/dashboard/address-book')}>
        <button className="p-1 hover:bg-gray-100 rounded">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-center text-[#3E3C3C] text-sm font-normal">Delivery Addresses</h1>
      </div>
      {/* </div> */}
      <div className="h-[calc(100vh-110px)] md:h-[calc(100vh-320px)] w-full bg-gray-50 md:mt-14 mt-4 rounded-lg">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-gray-900">Address</h1>
          </div>
        </div>

        {/* Form */}
        <div className="px-6 py-4 ">
          <div className="w-full max-w-screen-xl mx-auto space-y-4 pb-24">
            {/* <div className="space-y-6"> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#101828] mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  disabled={isEditMode}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-[#131735] text-sm font-normal transition-colors ${isEditMode ? "bg-gray-200" : ""}`}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#101828] mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  disabled={isEditMode}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-[#131735] text-sm font-normal transition-colors ${isEditMode ? "bg-gray-200" : ""}`}
                />
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#101828] mb-2">
                  Phone Number
                </label>
                <div className="flex">
                  <div className="flex items-center px-3 py-2 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg">
                    <span className="w-4 h-3 bg-green-500 rounded-sm mr-2"></span>
                    <span className="text-sm text-gray-600">+234</span>
                    <ChevronDown className="w-4 h-4 text-gray-400 ml-1" />
                  </div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg text-[#131735] text-sm font-normal transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#101828] mb-2">
                  Alternate Phone Number (Optional)
                </label>
                <div className="flex">
                  <div className="flex items-center px-3 py-2 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg">
                    <span className="w-4 h-3 bg-green-500 rounded-sm mr-2"></span>
                    <span className="text-sm text-gray-600">+234</span>
                    <ChevronDown className="w-4 h-4 text-gray-400 ml-1" />
                  </div>
                  <input
                    type="tel"
                    name="alternatePhoneNumber"
                    value={formData.alternatePhoneNumber}
                    onChange={handleInputChange}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg text-[#131735] text-sm font-normal transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Street Address */}
            <div>
              <label className="block text-xs font-medium text-[#101828] mb-2">
                Street Address
              </label>
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#131735] text-sm font-normal transition-colors"
              />
            </div>

            {/* Landmark and City */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#101828] mb-2">
                  Landmark (Optional)
                </label>
                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#131735] text-sm font-normal transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#101828] mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#131735] text-sm font-normal transition-colors"
                />
              </div>
            </div>

            {/* LGA and State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-xs font-medium text-[#101828] mb-2">
                  LGA (Local Government Area)
                </label>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(prev => ({ ...prev, lga: !prev.lga }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#131735] text-sm font-normal transition-colors text-left flex items-center justify-between"
                >
                  <span className="text-gray-900">{formData.lga}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                {dropdownOpen.lga && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                    {lagosLGAs.map((lga) => (
                      <button
                        key={lga}
                        type="button"
                        onClick={() => handleDropdownSelect('lga', lga)}
                        className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                      >
                        {lga}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative">
                <label className="block text-xs font-medium text-[#101828] mb-2">
                  State
                </label>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(prev => ({ ...prev, state: !prev.state }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#131735] text-sm font-normal transition-colors text-left flex items-center justify-between"
                >
                  <span className="text-gray-900">{formData.state}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                {dropdownOpen.state && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                    {nigerianStates.map((state) => (
                      <button
                        key={state}
                        type="button"
                        onClick={() => handleDropdownSelect('state', state)}
                        className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                      >
                        {state}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Default Address Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isDefault"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleInputChange}
                className="w-4 h-4 accent-[#26735B] bg-gray-100 border-gray-300 hover:border-gray-300 hover:shadow-none"
              />
              <label htmlFor="isDefault" className="text-sm font-medium text-[#171C26] cursor-pointer">
                Set as default address
              </label>
            </div>
            {/* <Divider className='w-full mb-6' /> */}
            <div className="-mx-6 md:-mx-30 hidden md:block">
              <Divider className="border-gray-200" />
            </div>




            {/* Submit Button */}
            <div className=" hidden sm:block ">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isCreating || isPending}
                className=" bg-[#26735B] hover:bg-emerald-800 text-white font-medium px-8 py-3 rounded-lg transition-colors "
              >
               {/* {isEditMode ? 'Save Changes' : "Add"} */}
                {isCreating || isPending
    ? 'Saving...'
    : isEditMode
      ? 'Save Changes'
      : "+ Add"}
              </button>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t sm:hidden">
              <button
                onClick={handleSubmit}
                className="w-full bg-[#26735B] hover:bg-emerald-700 text-white font-bold text-base px-8 py-3 rounded-lg transition-colors"
                disabled={isCreating || isPending}
              >
                {/* {isEditMode ? 'Save Changes' : "Add"} */}
                 {isCreating || isPending
                ? 'Saving...'
                : isEditMode
                  ? 'Save Changes'
                  : "+ Add"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}