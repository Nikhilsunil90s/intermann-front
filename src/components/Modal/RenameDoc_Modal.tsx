import React,{useEffect, useState} from "react";
import '../../CSS/PreModal.css'
import Select,{StylesConfig} from 'react-select'
import { ColourOption, colourOptions, colourOptionsFetes, fromPerson } from '../../Selecteddata/data';
import chroma from 'chroma-js';
import { Toaster, toast } from "react-hot-toast";
import { API_BASE_URL } from "../../config/serverApiConfig";

function RenameDoc({props,closepreModal}) {
  const notifyCandidatMovedSuccess = () => toast.success("Document Name Changed Successfully!");
  const notifyCandidatMovedError = () => toast.error("Document Name Not Change Please Try Again.");

  const [NewName, setNewName] = useState("");
  const onDataChange = (e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | any
  >) => {
    // debugger
    console.log(e.target.value)
    setNewName(e.target.value);
  }
 
  const renameCandidatDocument = async () => {
    let headers = {
      "Accept": 'application/json',
      "Authorization": "Bearer " + localStorage.getItem('token')
    }
    return await fetch(API_BASE_URL + `renameDocument/?documentId=${props[0]}&documentName=${NewName}&candidatId=${props[2]}`, {
      method: "GET",
      headers: headers
    })
      .then(reD => reD.json())
      .then(resD => resD.status === true ? notifyCandidatMovedSuccess : notifyCandidatMovedError()
      )
      .catch(err => err )
  }

  return (
    <>
    

      <div
        className="modal d-block"
        style={{ backgroundColor: "#00000052" }}
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content" style={{width:"670px"}}>
            <div className="modal-header">
              <h5 className="modal-title modalStylingfont" id="exampleModalLabel">
              Re-Name <span> DOCUMENT </span>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              onClick={()=>{closepreModal(false)}}
              ></button>
            </div>
            <div className="modal-body">

<p className="ChildStylePreModal">Document Name : <span className="text-success"> {props[1]}</span></p>
<div >           </div>
                              <p className="ChildStylePreModal mt-2">Enter new Name..</p>
<div><div className="form-floating">
 <div className="col-8 pl-0"> <input className="form-control" onChange={onDataChange} name="DOCName" placeholder="DOC New Name.." id="floatingTextarea2"/></div>
  <label htmlFor="floatingTextarea2" placeholder="{client_List}"></label>
</div></div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn preSelectedStageBtn"  onClick={renameCandidatDocument}>
             Save New Name.
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default RenameDoc;
