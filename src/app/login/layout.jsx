import RegNavbar from "@/src/component/reusables/RegNavBar"

export default function UserLayout({ children }) {
  return (
    <div>
      <RegNavbar />
      <main>{children}</main>
    </div>
  );
}




  
