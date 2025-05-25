import RegNavbar from "@/src/component/reusables/RegNavBar"
import { ReactNode } from "react";


export default function verifyLayout({ children }) {
  return (
    <>
      <RegNavbar />
      <main>{children}</main>
    </>
  );
}