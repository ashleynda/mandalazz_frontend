import RegNavbar from "@/src/component/reusables/RegNavBar"

// export default function UserLayout({ children }) {
//   return (
//     <div>
//       <RegNavbar />
//       <main>{children}</main>
//     </div>
//   );
// }
// src/app/user/signup/layout.jsx

export default function SignupLayout({ children }) {
  return (
    <>
      <RegNavbar />
      <main>{children}</main>
    </>
  );
}




  
