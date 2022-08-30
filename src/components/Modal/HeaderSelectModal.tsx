import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { API_BASE_URL } from "../../config/serverApiConfig";
import "../../CSS/Client/ArchivedCardClient.css"
import $ from 'jquery'

function UploadDow({ closeModal }) {

    const onchange=(val:any)=>{
        if (val == 'ROUMAIN') {
              window.open("https://www.intermann.ro/")
             } 
             if (val == 'FRANCAIS') {
               window.open("https://www.intermann.fr/")
               
             }
    }

 
    return (<>

        <div className="modal d-flex HeaderModalContainer"   data-target='#deleteModal'  id="myModal"   aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog HeaderWidthModal">
                <div className="modal-content">
                    <div className="modal-body HeaderWidthModal text-start">
                        <button
                         style={{
                           backgroundColor:"transparent",
                           border:"0px",
                           width: "100%",
                           height: "35px",
                           textAlign:"left"
                        }}
                        className="hoverbtnS"
                  
                      onClick={()=>{onchange("ROUMAIN");closeModal(false);}}
                        >
                  <p className="VoirLESite mb-0 ml-1">VOIR LE SITE ROUMAIN</p>
                       </button>
                       <button 
                      onClick={()=>{onchange("FRANCAIS");closeModal(false);}}
                        style={{
                        marginTop:"10px",
                        backgroundColor:"transparent",
                        border:"0px",
                        width: "100%",
                     height:"35px",
                     textAlign:"left"
                        
                        }}
                        className="hoverbtnS"
                        >
          <p className="VoirLESite mb-0 ml-1">VOIR LE SITE FRANCAIS</p>
                       </button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default UploadDow;