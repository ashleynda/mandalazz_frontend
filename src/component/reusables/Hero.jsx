// import Image from 'next/image';
// import cream from '../../assets/cream.png';
// import rectangle from '../../assets/Rectangle 2.png'

// const HeroSection = () => {
//   return (
//     <div className="pt-[40px]">
//       <div className="relative flex flex-col items-center text-center mt-8">
//         {/* Image for the Hero Section */}
//         <Image 
//           src={cream} 
//           alt="hero" 
//           className="w-[343px] md:w-[1750px] h-[440px] object-cover rounded-3xl mx-auto"
//           width={1750}
//           height={440}
//         />
//         {/* Overlay Text with rectangle image */}
//         <p className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 text-white text-[20px] md:text-6xl font-bold text-left">
//           All the right <br />
//           <span className="relative inline-block">
//             fashion accessories
//             <Image
//               src={rectangle}
//               alt="line"
//               className="absolute top-full left-0 -translate-y-1/2 w-full"
//               width={1750} // or specify exact size of the line image
//               height={10}  // height of the rectangle line
//             />
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;

import Image from 'next/image';
import cream from '../../assets/cream.png';
import rectangle from '../../assets/Rectangle 2.png';

const HeroSection = () => {
  return (
    <div className="pt-10 px-4 md:px-8 lg:px-16">
      <div className="relative flex flex-col items-center text-center mt-8">
        {/* Hero Image */}
        <Image 
          src={cream} 
          alt="hero" 
          className="w-full max-w-[1750px] h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-3xl mx-auto"
          priority
        />

        {/* Overlay Text */}
        <p className="absolute top-1/2 left-1/4 px-4 -translate-x-1/2 -translate-y-1/2 
        text-white text-xl md:text-5xl lg:text-6xl font-bold text-left hidden md:block">
          All the right <br />
          <span className="relative inline-block">
            fashion accessories
            <Image
              src={rectangle}
              alt="line"
              className="absolute top-full left-0 mt-1 w-full"
              width={500} // actual width will scale with text
              height={10}
            />
          </span>
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
// 'use client';

// import Image from 'next/image';
// import cream from '../../assets/cream.png';
// import rectangle from '../../assets/Rectangle 2.png';

// const HeroSection = () => {
//   return (
//     <div className="pt-10 px-4">
//       <div className="relative flex flex-col items-center text-center mt-8">
//         {/* Hero Background Image */}
//         <Image
//           src={cream}
//           alt="hero"
//           className="w-full max-w-[1200px] h-[200px] md:h-[440px] object-cover rounded-3xl mx-auto"
//           width={1200}
//           height={440}
//         />

//         {/* Overlay Text with Rectangle underline */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[18px] md:text-6xl font-bold text-center md:text-left w-full px-4 max-w-[1000px]">
//           <p>
//             All the right <br />
//             <span className="relative inline-block">
//               fashion accessories
//               <Image
//                 src={rectangle}
//                 alt="underline"
//                 className="absolute top-full left-0 translate-y-1 w-full max-w-[300px] md:max-w-full"
//                 width={600}
//                 height={10}
//               />
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;

