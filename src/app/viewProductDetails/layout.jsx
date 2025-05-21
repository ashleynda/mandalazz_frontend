import Navbar from '../../component/reusables/Navbar';
import Categories from '../../component/reusables/Categories';

export default function ViewLayout({ children }) {
  return (
    <>
      <Navbar />
      {/* <Categories /> */}
      <main>{children}</main>
    </>
  );
}
