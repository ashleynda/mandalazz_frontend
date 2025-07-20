import Navbar from '../../component/reusables/Navbar';
import Categories from '../../component/reusables/Categories';
import Footer from '@/src/component/reusables/Footer';
// import SideBar from '../../component/reusables/SideBar';
import SideBar from '../../component/reusables/SideBar';

export default function dashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <Categories />
      <div className="flex">
        <div className='hidden md:block'>
        <SideBar />
        </div>
      <main className='flex-1 p-6'>
        {children}
      </main>
      </div>
      <div className="hidden md:block">
        <Footer />
      </div>
    </>
  );
}
