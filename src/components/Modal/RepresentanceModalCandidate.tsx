import React from "react";

function Representance ({props,closeModal}){
console.log(props,"props")
    return(<>
    
    <div
        className="modal d-block"
        style={{ backgroundColor: "#00000052" }}
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" style={{maxWidth:"809px"}}>
          <div className="modal-content" style={{width:"870px"}}>
            <div className="modal-header">
              <h5 className="modal-title modalStylingfont" id="exampleModalLabel">
              Générer représentance               </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              onClick={()=>{closeModal(false)}}
              ></button>
            </div>
            <div className="modal-body">
<div className="col-12">
    <div className="row">
        <div className="col-4">
            <label className="ChildStylePreModal">candidate_birthday_date</label>
            <input className="form-control" type={"date"} style={{fontSize:"12px",fontFamily:"Poppins"}} placeholder="candidate_birthday_date" name="DOCName" />
        </div>
        <div className="col-4">
        <label className="ChildStylePreModal">candidate_birth_city</label>
            <input className="form-control" style={{fontSize:"12px",fontFamily:"Poppins"}} placeholder="candidate_birth_city" name="DOCName" />
        </div>
        <div className="col-4">
        <label className="ChildStylePreModal"  >debut_mission</label>
            <input className="form-control" style={{fontSize:"12px",fontFamily:"Poppins"}} placeholder="debut_mission" name="DOCName" />
        </div>
        <div className="col-4 mt-1">
        <label className="ChildStylePreModal">fin_mission</label>
            <input className="form-control" style={{fontSize:"12px",fontFamily:"Poppins"}} placeholder="fin_mission" name="DOCName" />
        </div>
        <div className="col-4 mt-1">
        <label className="ChildStylePreModal">company_adress</label>
            <input className="form-control" style={{fontSize:"12px",fontFamily:"Poppins"}} placeholder="company_adress" name="DOCName" />
        </div>
    </div>
</div>
<div >           </div>
<div></div>
            </div>
            <div className="modal-footer">
                <div className="col-12">
                    <div className="row justify-content-end">
                        <div className="col-3 ">
                        <button type="button" className="btn preSelectedStageBtn"  style={{width:"100%",background:"#3F76E2"}} >
                        Generate the PDF
              </button>
                        </div>
                        <div className="col-4">
                        <button type="button" className="btn preSelectedStageBtn"  style={{width:"100%",background:"#032339"}}>
                        DOCUSIGN DOC
              </button>
                        </div>
                    </div>
                </div>
            
            </div>
          </div>
        </div>
      </div>
    </>)
}
export default Representance;;