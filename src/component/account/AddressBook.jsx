"use client";

import React, { useEffect, useState } from 'react';
import { User, MapPin, Phone, Edit, Trash2, ArrowLeft, Plus } from 'lucide-react';
import { useUserAddresses } from '../../lib/hooks/account/useGetAddresses';
import { useRouter } from 'next/navigation';
import AddressCardSkeleton from '../skeletons/AddressCardSkeleton';
import { Divider } from '@mui/material';

export default function AddressBook() {
  const { data: fetchAddresses, isLoading, isError } = useUserAddresses();
  console.log("Fetched Addresses:", fetchAddresses);
  const [addresses, setAddresses] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (fetchAddresses?.message?.addresses) {
      setAddresses(fetchAddresses.message.addresses);
    }
  }, [fetchAddresses]);


  const handleSetDefault = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const handleDelete = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleEdit = (id) => {
    console.log('Edit address:', id);
    router.push(`/dashboard/address-book/edit/${id}`);
  };

  const handleCreateNewAddress = () => {
    router.push(`/dashboard/address-book/add`);
  }


  if (isError || !Array.isArray(fetchAddresses?.message?.addresses)) {
    return <p>Failed to load addresses</p>;
  }


  return (
    <>
      <div className="flex items-center gap-3 sm:hidden mt-6 ">
        <button className="p-1 hover:bg-gray-100 rounded">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-center text-[#3E3C3C] text-sm font-normal">Delivery Addresses</h1>
      </div>

      <div className=" bg-[#FFFFFF] min-h-screen rounded-sm mt-4 md:mt-14 max-w-full overflow-y-auto">
        <div className='flex justify-between md:py-4 px-5'>
          <h1 className="text-lg font-bold text-[#3E3C3C] px-4 py-2">Addresses</h1>
          <button className='hidden sm:flex bg-[#26735B] text-center items-center gap-2 px-4 py-2 text-xs font-bold text-[#FFFFFF] rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer' onClick={handleCreateNewAddress}>
            <Plus />
            Add New Address
          </button>
        </div>
        <Divider className="mb-6 w-full" />
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t sm:hidden">
          <button
            className="w-full bg-[#26735B] hover:bg-emerald-700 text-white font-bold text-base px-8 py-3 rounded-lg cursor-pointer transition-colors" onClick={handleCreateNewAddress}
          >
            + Add New Address
          </button>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(3)].map((_, i) => (
              <AddressCardSkeleton key={i} />
            ))}
          </div>
        ) :
          addresses.length === 0 ? (
            <p className="text-gray-600">No addresses found. Please add an address.</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-6 pb-24 py-4">

              {addresses.map((address) => (
                <div key={address._id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  {/* Name */}
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-4 h-4 text-[#343330]" />
                    <span className="font-bold text-base text-[#000000] capitalize">{address.firstName} {address.lastName}</span>
                  </div>

                  <div className="flex items-start gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-[#343330] mt-0.5 flex-shrink-0" />
                    <span className="text-[#3E3C3C] text-sm font-normal leading-relaxed">{address.address}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Phone className="w-4 h-4 text-[#343330]" />
                    <span className="text-[#3E3C3C] text-sm font-normal">{address.phoneNumber}</span>
                  </div>
                  <Divider className="mb-2 w-full" />
                  <div className='flex items-center gap-2 justify-between mt-6'>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`default-${address.id}`}
                        checked={address.isDefault}
                        onChange={() => handleSetDefault(address.id)}
                        className="w-4 h-4 accent-[#26735B] bg-gray-100 border-gray-300 hover:border-gray-300 hover:shadow-none"
                      />
                      <label
                        htmlFor={`default-${address.id}`}
                        className="text-sm font-medium text-[#171C26] cursor-pointer"
                      >
                        Set as default address
                      </label>
                    </div>

                    {/* Action Buttons */}
                    <div className="hidden sm:flex gap-2">
                      <button
                        key={address._id}
                        onClick={() => handleEdit(address._id)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(address.id)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                    <div className='flex gap-2'>
                      <button
                        onClick={() => handleEdit(address._id)}
                        className="sm:hidden gap-2 px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(address.id)}
                        className="sm:hidden p-2 gap-2 px-4 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </>
  );
}