import React from "react";

function OpenModal(){
    return(<>
    
    <div className="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg">
    <div className="modal-content padding-full">
      <div className="text-end">
    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
     
      <img className="modal-title pRight" src={require("../../images/Move {candidat_Name} to ARCHIVED.svg").default} style={{width:"85%"}} id="staticBackdropLabel" />

     
      <div className="modal-body text-start">
      <p style={{fontFamily: 'Poppins',
fontStyle: "normal",
fontWeight: "400",
fontSize: "16px",
lineHeight: "24px",
color: "#373A3C"}}>What is the reason of this archived ? Pourquoi &#10100;candidat_Name&#10101; is archived ? </p>
   <div className="col-12 text-center">    <textarea
                      id="w3review"
                      name="w3review"
                      style={{ height: "126px", width: "500px" }}
                    >
                    </textarea>
                    </div>
<div className="col-12 text-center pt-3">
  <div className="row ">
    <div className="col-3"></div>
    <div className="col-6">
    <button style={{borderRadius:"8px",backgroundColor:"#FF0000",width:"100%",padding:"13px",fontFamily: 'Inter',
fontStyle: "normal",
fontWeight: "700",
fontSize: "20px",
lineHeight: "16px",color:"white",border:"unset"}}>Move this person to in Archived status</button>
    </div>

    <div className="col-3"></div>
                             
    
  </div>
</div>
      </div>
    </div>
  </div>
</div>
    </>)
}
export default OpenModal;