import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header(props:any){
    const [activeTab,setActiveTab]=useState("All")
console.log(props)
    return(<>
{
    props.props == "header" ? 
<div className="container-fluid bg-white headerBoxInBilling"  >
        <div className="row p-1 ">
            
            <div className="col-8 d-flex align-items-center">
<p className="mb-0">BILLING CENTER</p>
            </div>
            <div className="col-4 d-flex justify-content-end">
              
          <Link className="btnHeaderInvoice" to={"/billing-Center/AddInvoice"}>Create New Invoice    </Link>
      
            </div>
        </div>
    </div>

    :
    <div className="container-fluid bg-white mt-1 headerBoxInBilling">
        <div className="row p-1 justify-content-center align-items-center">
            <div className="col-8 d-flex justify-content-center">
                
                  <button onClick={()=>setActiveTab("All")} className={`mx-1 ${activeTab == "All" ?  "ActiveTabs_22s" : "ActiveTabs_22" }`}>All</button>
                 <button  onClick={()=>setActiveTab("Paid")}  className={`mx-1 ${activeTab == "Paid" ?  "ActiveTabs_22s" : "ActiveTabs_22" }`}>Paid</button>
                <button  onClick={()=>setActiveTab("Unpaid")}  className={`mx-1 ${activeTab == "Unpaid" ?  "ActiveTabs_22s" : "ActiveTabs_22" }`}>Unpaid</button>
          
            </div>
            
        </div>
    </div>

}
    
    </>)
}