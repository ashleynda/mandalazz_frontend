import Image from 'next/image';
import cream from '../../assets/cream.png';
import rectangle from '../../assets/Rectangle 2.png'

const HeroSection = () => {
  return (
    <div className="pt-[40px]">
      <div className="relative flex flex-col items-center text-center mt-8">
        {/* Image for the Hero Section */}
        <Image 
          src={cream} 
          alt="hero" 
          className="w-[1750px] h-[440px] object-cover rounded-3xl mx-auto"
          width={1750}
          height={440}
        />
        {/* Overlay Text with rectangle image */}
        <p className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 text-white text-6xl font-bold text-left">
          All the right <br />
          <span className="relative inline-block">
            fashion accessories
            <Image
              src={rectangle}
              alt="line"
              className="absolute top-full left-0 -translate-y-1/2 w-full"
              width={1750} // or specify exact size of the line image
              height={10}  // height of the rectangle line
            />
          </span>
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
