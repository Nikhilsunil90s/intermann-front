import React,{useEffect,useRef,useState} from "react";
import { API_BASE_URL } from "../../../config/serverApiConfig";
import {toast} from "react-hot-toast"
import { motion } from "framer-motion";

function NotesDeleteModal({props,closeModal,updateFields}){
  const [btnDS,setBTNds]=useState(false)
  console.log(props,"props")
  const DeleteNotes=()=>{
     fetch(API_BASE_URL + `deleteAd/?adId=${props._id}`,{
        method: "GET",
        headers: {
          "Accept": 'application/json',
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + localStorage.getItem('token')
        },
      })
        .then(red => red.json())
        .then(resData =>{
          if(resData.status){
            updateFields(true)
               closeModal(false)
               setBTNds(false)
              toast.success(resData.message)
          }else{
              toast.success(resData.message)
             
               setBTNds(false)
               
          }
        })
        .catch(err => err)
 
  }
    const ref = useRef();

    useOnClickOutside(ref, () => closeModal(false));
  
    function useOnClickOutside(ref, handler) {
      useEffect(
        () => {
          const listener = (event) => {
            // Do nothing if clicking ref's element or descendent elements
            if (!ref.current || ref.current.contains(event.target)) {
              return;
            }
            handler(event);
          };
          document.addEventListener("mousedown", listener);
          document.addEventListener("touchstart", listener);
          return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
          };
        },
        // Add ref and handler to effect dependencies
        // It's worth noting that because the passed-in handler is a new ...
        // ... function on every render that will cause this effect ...
        // ... callback/cleanup to run every render. It's not a big deal ...
        // ... but to optimize you can wrap handler in useCallback before ...
        // ... passing it into this hook.
        [ref, handler]
      );
    }
 

    return(
        <>
    <div className="modal d-block" style={{ backgroundColor: "#00000052" }} id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <motion.div   
    initial={{ scale: 0 }}
                        animate={{ rotate:0, scale:1}}
                        transition={{
                          type: "spring",
                          stiffness: 190,
                          damping: 50
                        }} className="modal-dialog modal-lg" style={{width:"700px",marginTop:"100px"}}>
                <div className="modal-content">
                    <div className="col-12">
                        <div className="row justify-content-end">
                          
                    <div className="col-4 text-end d-flex justify-content-end align-items-end">
                    <button type="button" className="btn-close p-1" onClick={() => closeModal(false)} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    
                    </div>
                    </div>
                    <div className="modal-body text-start">
                        <div className="col-12 d-flex justify-content-center align-items-center" style={{height:"15vh"}}>
     <p className="mb-0 "  style={{
                            fontFamily: 'Poppins',
                            fontStyle: "normal",
                            fontWeight: "500",
                            fontSize: "19px",
                            lineHeight: "24px",
                            color:"#000"

                        }}>Do you really want to delete this {props.adNameFrench !=="" ? props.adNameFrench.toLocaleUpperCase() : "" }/ {props.adNameRomanian !=="" ? props.adNameRomanian.toLocaleUpperCase() : ""} Ad/Research ?</p>
                        </div>

                            <div className="col-12 text-center mt-1">
                                <div className="row justify-content-end">
                                  
                                        <div className="col-3 d-grid pr-1">
                                        
<button className="btn" disabled={btnDS} onClick={()=>DeleteNotes()} style={{
                            fontFamily: 'Poppins',
                            fontStyle: "normal",
                            fontWeight: "700",
                            fontSize: "13px",
                            lineHeight: "29px",
                            color: "#E21B1B",
                            border:"2px solid #E21B1B",
                            borderRadius:"22px",marginTop:"5px"

                        }}><img style={{marginRight:"5px"}}  src={require("../../../images/Deletebucket.svg").default}  />Yes</button>
                                        </div> <div className="col-3 d-grid">
                                                                  
<button onClick={()=>closeModal()} className="btn  btn-bgbClient d-flex justify-content-center align-items-center" style={{
                            fontFamily: 'Poppins',
                            fontStyle: "normal",
                            fontWeight: "700",
                            fontSize: "13px",
                            lineHeight: "18px",
                            borderRadius:"22px"

                        }}>No</button>

                                        </div>
                                      
                                  
                                    
                                


                                </div>
                            </div>
                    </div>
               
                </div>
            
        </motion.div>
        </div>
        </>
    )
}
export default NotesDeleteModal;