import React from "react";

export default function Header(props:any){
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
         <button className="btn btnHeaderInvoice">Create New Invoice</button>
            </div>
        </div>
    </div>

    :
    <div className="container-fluid bg-white mt-1 headerBoxInBilling">
        <div className="row p-1 ">
            
        </div>
    </div>

}
    
    </>)
}