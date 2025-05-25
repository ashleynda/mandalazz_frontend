import RegNavbar from "@/src/component/reusables/RegNavBar"
import { ReactNode } from "react";

// export default function UserLayout({ children }) {
//   return (
//     <div>
//       <RegNavbar />
//       <main>{children}</main>
//     </div>
//   );
// }
// src/app/user/signup/layout.jsx

export default function validationLayout({ children }) {
  return (
    <>
      <RegNavbar />
      <main>{children}</main>
    </>
  );
}
