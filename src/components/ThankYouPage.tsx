import React from "react";
import Thankyou from "../components/Loader/ThankYou"
function ThankYouPage(){

return(
    <>
    <div className="container-fluid" style={{background:"#ffff"}}>
        <div className="row">
            <div className="col-12 d-flex justify-content-center align-items-center" style={{height:"100vh",width:"100vh"}}>
          <Thankyou />
            </div>
        </div>
    </div>
    </>
)

}
export default ThankYouPage;