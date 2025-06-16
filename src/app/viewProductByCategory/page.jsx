import { Suspense } from "react";
import ViewProductsByCategory from "../../component/product/ViewByCategory"

const page=()=>{
    return(
         <Suspense fallback={<div>Loading...</div>}>    
            <ViewProductsByCategory />  
          
        </Suspense>
    )
}
export default page