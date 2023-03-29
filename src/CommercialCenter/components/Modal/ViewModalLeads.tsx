import React from "react";

function ViewModal(props){
    return(<>
      <div className="modal d-block" style={{ backgroundColor: "#00000052" }} id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div   
      className="modal-dialog modal-lg" style={{width:"795px"}}>
                <div className="modal-content">
                    <div className="modal-header p-0">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-8 px-0 clientArchivedModal-font">
                    <h2 className="modal-title  py-1 pRight" id="staticBackdropLabel">{props.Notes == "Nos notes Internes" ? "Notes by " + "Agency" : "Note by Client" }</h2>
                    </div>
                    <div className="col-4 text-end d-flex align-items-center">
                    <button type="button" className="btn-close" onClick={() => props.closeModal(false)} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    </div>
                    </div>
                    </div>
                    <div className="modal-body scrollbarModal text-start" style={{height:"35vh"}}>
                     
                       <p className="mb-0" style={{
                            fontFamily: 'Poppins',
                            fontStyle: "normal",
                            fontWeight: "400",
                            fontSize: "15px",
                            lineHeight: "24px",
                            color: "#000000",
                            wordBreak:"break-all"
                      
                        }}>
                            {props.Notes === "Nos notes Internes" ? props.props.agencyNote ? props.props.agencyNote : "✘✘No Notes!" : null}
                            {props.Notes === "Note Client" ? props.props.companyNote ? props.props.companyNote : "✘✘No Notes!" : null}
                       </p>   </div>
                  
                </div>
            </div>
        </div>
    </>)
}
export default ViewModal;