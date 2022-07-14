import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { API_BASE_URL } from "../../config/serverApiConfig";
import "../../CSS/Client/ArchivedCardClient.css"
import {ReactComponent as Upload} from "../../images/upload.svg"
import {ReactComponent as Download} from '../../images/download.svg'
import axios from "axios";

function UploadDow({ closeModal ,FunModal}) {
    const onchange=(val:any)=>{
        if (val == 'upload') {
               FunModal(val)
             } 
             if (val == 'Download') {
    
               FunModal(val)
             }
    }
    return (<>

        <div className="modal d-flex UploadModalContainer"  id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog UploadModal">
                <div className="modal-content">
                    <div className="modal-body UploadSelect text-start">
                        <button style={{
                           backgroundColor:"transparent",
                           border:"0px",
                           width: "100%",
                           height: "35px"
                        }}
                  
                      onClick={()=>{onchange("upload");closeModal(false);}}
                        >
                   <Upload />
                       </button>
                       <button 
                      onClick={()=>{onchange("Download");closeModal(false);}}
                        style={{
                        marginTop:"10px",
                        backgroundColor:"transparent",
                        border:"0px",
                        width: "100%",
                     height:"35px"
                        }}>
                   <Download />
                       </button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default UploadDow;