import React ,{useState} from "react";

function AvanceModal ({props,closeModal}){
console.log(props,"props")
    const [Loader,setLoader]=useState(false)
    
    return(<>
    
    <div
        className="modal d-block"
        style={{ backgroundColor: "#00000052" }}
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" style={{maxWidth:"1026px"}}>
          <div className="modal-content" style={{width:"1025px"}}>
            <div className="modal-header">
              <h5 className="modal-title modalStylingfont" id="exampleModalLabel">
              Avance contract               </h5>
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
            <label className="ChildStylePreModal">candidate_name </label>
            <input className="form-control" defaultValue={props.candidatName} style={{fontSize:"12px",fontFamily:"Poppins"}} placeholder="candidate_name" name="DOCName" disabled />
            <span style={{fontFamily:"Poppins" ,fontSize:"9px",color: "#68B085"}}>Name of the candidate </span>
        </div>
        <div className="col-4">
        <label className="ChildStylePreModal">amount_avance</label>
            <input className="form-control" style={{fontSize:"12px",fontFamily:"Poppins"}} placeholder="amount_avance" name="DOCName" />
            <span style={{fontFamily:"Poppins" ,fontSize:"9px",color: "#68B085"}}>The amount that the worker request (Exemple: 1000lei)</span>
        </div>
        <div className="col-4">
        <label className="ChildStylePreModal"  >period _avance </label>
            <input className="form-control" style={{fontSize:"12px",fontFamily:"Poppins"}} placeholder="period _avance " name="DOCName" />
            <span style={{fontFamily:"Poppins" ,fontSize:"9px",color: "#68B085"}}>When this anvance will be deducted from salary (Exemple octombrie 2022) </span>
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
                        Generate Docusing
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
export default AvanceModal;;