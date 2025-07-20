'use client';

import React from 'react';
import SearchResultsSkeleton from '../skeletons/SearchResultsSkeleton';



const SearchDropdown = ({
  searchTerm,
  isLoading,
  results,
  getFirstAvailableColor,
  getFirstAvailableSize,
  handleOptions,
  setSearchTerm,
  setResults,
  variant = 'desktop'
}) => {
  if (!searchTerm) return null;

  if (isLoading) return <SearchResultsSkeleton count={5} />;

  if (results.length === 0) {
    return (
      <div
        className={`${
          variant === 'mobile'
            ? 'mt-2 w-full px-2'
            : 'absolute mt-1 w-full'
        } bg-white border border-gray-200 shadow-lg rounded-md text-center p-3 text-sm text-gray-500 z-[10000]`}
      >
        No products found for "{searchTerm}"
      </div>
    );
  }

  return (
    <div
      className={`${
        variant === 'mobile'
          ? 'mt-2 w-full px-2'
          : 'absolute mt-1 w-full'
      } bg-white border border-gray-200 shadow-lg rounded-md max-h-[300px] overflow-y-auto z-[10000]`}
    >
      {results.map((product) => {
        const firstColor = getFirstAvailableColor(product);
        const firstSize = getFirstAvailableSize(product);
        return (
          <div
            key={product.id}
            className="px-4 py-2 text-[#061410] hover:bg-gray-100 cursor-pointer text-sm"
            onClick={() => {
              if (!firstColor || !firstSize) {
                console.error("Missing color or size", {
                  color: firstColor,
                  size: firstSize,
                  variations: product.variations,
                });
                return;
              }
              setSearchTerm('');
              setResults([]);
              handleOptions(product._id, firstColor, firstSize);
            }}
          >
            {product.name}
          </div>
        );
      })}
    </div>
  );
};

export default SearchDropdown;
