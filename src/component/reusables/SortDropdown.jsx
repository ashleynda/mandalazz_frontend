import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
// import { getSortedProducts } from "@/api/getSortedProducts"; // Adjust import path

export default function SortDropdown({ onSortChange }) {
  const [selected, setSelected] = useState("Newest Arrivals");
  const [open, setOpen] = useState(false);

  const options = [
    { label: "Newest Arrivals", value: "newest" },
    { label: "Price: Low to High", value: "priceLow" },
    { label: "Price: High to Low", value: "priceHigh" },
    { label: "Popularity", value: "popularity" },
  ];

//   useEffect(() => {
//     const fetchSorted = async () => {
//       try {
//         const data = await getSortedProducts(sortBy, token);
//         setProducts(data);
//         console.log("Sorted products:", data);
//       } catch (err) {
//         console.error("Error fetching sorted products:", err);
//       }
//     };

//     if (token) {
//       fetchSorted();
//     }
//   }, [sortBy, token]);
 const handleSelect = (option) => {
    setSelected(option.label);
    setOpen(false);
    onSortChange(option.value);
  }

  return (
    <div className="flex items-center gap-2 text-sm font-medium text-[#344054]">
      <span className="text-base font-normal text-[#061410]">Sort by:</span>
      <div className="relative inline-block">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between gap-2 w-[205px] text-[#344054] bg-white border border-gray-300 rounded-md px-5 py-1.5 shadow-sm hover:bg-gray-50"
        >
          {selected}
          <ChevronDown className="w-4 h-4 text-[#344054]" />
        </button>

        {open && (
          <div className="absolute z-10 mt-1 w-[200px] bg-white border border-gray-200 rounded-md shadow-lg">
            {options.map((option) => (
            //     <div
            //   key={option.value}
            //   onClick={() => handleSelect(option)}
            //   className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            // >
            //   {option.label}
            // </div>

              <label
                key={option.value}
                className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 border-b border-gray-200 last:border-b-0"
              >
                <input
                  type="checkbox"
                  checked={selected === option.label}
                  onChange={() => handleSelect(option)}
                  className="form-checkbox accent-[#172314] rounded"
                />
                <span className="text-[13px] font-normal text-[#172314] text-nowrap">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

