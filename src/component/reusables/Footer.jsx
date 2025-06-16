import Image from 'next/image';
import logo from "../../assets/logo.png";
import facebook from "../../assets/facebook.png";
import twitter from "../../assets/twitter.png";
import instagram from "../../assets/instagram.png";

const Footer = () => {
  return (
    <footer className="bg-[#0B261F] border-t border-gray-200 py-8 px-8">
      <div className="w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Logo and Address Section */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left md:text-center">
          <Image src={logo} alt="Company Logo" className="h-10 mb-4" width={100} height={40} />
          <p className="text-sm text-white text-left font-normal">
            17 Sapphire Street, Commerce Plaza, Suite 401, Metroville, New York.
          </p>
          <div className="flex space-x-4 mt-6 justify-center sm:justify-start">
            <a
              href="#"
              className="hover:text-gray-900 p-2 rounded-full border border-gray-200"
            >
              <Image src={facebook} alt="facebook" width={20} height={20} />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 p-2 rounded-full border border-gray-200"
            >
              <Image src={twitter} alt="twitter" width={20} height={20} />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 p-2 rounded-full border border-gray-200"
            >
              <Image src={instagram} alt="instagram" width={20} height={20} />
            </a>
          </div>
        </div>

        {/* Company Links */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <h3 className="text-white text-base font-medium mb-4">Company</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-white text-sm font-normal hover:text-yellow-800">Partnerships</a></li>
            <li><a href="#" className="text-white text-sm font-normal hover:text-yellow-800">Terms of Use</a></li>
            <li><a href="#" className="text-white text-sm font-normal hover:text-yellow-800">Privacy Policy</a></li>
            <li><a href="#" className="text-white text-sm font-normal hover:text-yellow-800">Careers</a></li>
          </ul>
        </div>

        {/* Resources Links */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <h3 className="text-white text-base font-medium mb-4">Resources</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-white text-sm font-normal hover:text-yellow-800">Blog</a></li>
            <li><a href="#" className="text-white text-sm font-normal hover:text-yellow-800">Events</a></li>
            <li><a href="#" className="text-white text-sm font-normal hover:text-yellow-800">Reports & Publications</a></li>
          </ul>
        </div>

        {/* Contact Links */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <h3 className="text-white text-base font-medium mb-4">Contact</h3>
          <p className="text-white text-sm font-normal md:text-base">+234-0-0099098</p>
          <p className="text-white text-sm font-normal md:text-base">contact@whatnow.com</p>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-green-200 mt-8 pt-4 text-center text-sm text-gray-500">
        © 2025 by --------
      </div>
    </footer>
  );
};

export default Footer;
