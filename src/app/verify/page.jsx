import Verify from "@/src/component/user/Verify";
import { Suspense } from "react";


const page=()=>{
    return(
        <div className="flex-1 flex items-start justify-center md:pt-0 pt-[70px] overflow-auto">
          <Suspense fallback={<div>Loading...</div>}>
            <Verify />
          </Suspense>
        </div>
    )
}
export default page