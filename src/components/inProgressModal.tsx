import React from "react";

function InMoadal(){
    return(<>
    
    <div className="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg">
    <div className="modal-content padding-full">
      <div className="text-end">
    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
     
      <img className="modal-title pRight" src={require("../images/Move.svg").default} style={{width:"85%"}} id="staticBackdropLabel" />

     
      <div className="modal-body text-start">
    <span>  Qui est le client qui a embauché &#10100;candidat_Name&#10101; ?</span>
      <p>Who is the client who hired this person</p>
      <select className="form-select" aria-label="Default select example">
  <option selected>&#10100;client_List&#10101;</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
<img src={require('../images/Note.svg').default} style={{width:"93%"}} />
<div>
 
<div className="col-12 pt-3">
    <label className="lable-from">From date / A PARTIR DE </label>
    <div className="input-group date" id="datepicker">
        <input type="text" className="form-control" />
        <span className="input-group-append">
        <span className="input-group-text bg-white d-block">
        <i className="fa fa-calendar"></i>
        </span>
        </span>
    </div>
</div> 
</div>
<div className="col-12 pt-2">
  <label className="salaire">Salaire net de &#10100;candidat_name&#10101; / &#10100;candidat_name&#10101; net salary</label>
  <div>
    
  <div className="d-flex amount-fields">
                                    <span>€</span>
                                    <input type="number" name='turnover' placeholder='Amount' value={""} />
                                    <span>.00</span>
                                </div>
                              
    
  </div>
</div>
<div className="col-12 text-center pt-3">
  <div className="row ">
    <div className="col-3"></div>
    <div className="col-6">
    <button style={{borderRadius:"8px",backgroundColor:"#A461D8",width:"100%",padding:"13px",fontFamily: 'Inter',
fontStyle: "normal",
fontWeight: "700",
fontSize: "20px",
lineHeight: "16px",color:"white",border:"unset"}}>Move this person to in Progress status</button>
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
export default InMoadal;