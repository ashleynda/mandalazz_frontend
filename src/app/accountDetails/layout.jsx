import Navbar from '../../component/reusables/Navbar';
// import Categories from '../../../component/reusables/Categories';
import Footer from "../../component/reusables/Footer";


export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      {/* <Categories /> */}
      <main>{children}</main>
      <Footer />
    </>
  );
}
