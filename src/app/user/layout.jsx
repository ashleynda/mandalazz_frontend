import RegNavbar from "@/src/component/reusables/RegNavBar"
import { ReactNode } from "react";


const page =({ children })=>{
    return(
        <div>
          <RegNavbar />
          <div>
            {children}
          </div>
        </div>
    )
}
export default page


  
