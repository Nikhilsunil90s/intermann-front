import React,{useEffect,useRef,useState} from "react";
import { API_BASE_URL } from "../../../config/serverApiConfig";
import {toast} from "react-hot-toast"
import { motion } from "framer-motion";
import Cookies from "js-cookie"
function DeleteLeadModal(props){
  const [btnDS]=useState(false)
 
  const DeleteNotes=async()=>{
    await fetch(API_BASE_URL+ `deleteCommercialLead/?id=${props.props._id}` ,
    {
      method: "GET",
      headers: {
        "Accept": 'application/json',
        "Authorization": "Bearer " + Cookies.get('token')
      }
    }
    )
    .then((res)=>res.json())
    .then(res=>{
      if(res.status){
     toast.success(res.message)
     props.update(true)
     props.closeModal(false)
      }else{
     toast.success(res.message)
      }
    })
    .catch(err => err)
  }
    const ref = useRef();

    useOnClickOutside(ref, () => props.closeModal(false));
  
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
   <div   
    className="modal-dialog modal-lg" style={{width:"505px",marginTop:"100px",top:"15%"}}>
                <div className="modal-content">
                    <div className="col-12">
                        <div className="row justify-content-end">
                          
                    <div className="col-4 text-end d-flex justify-content-end align-items-end">
                    <button type="button" className="btn-close p-1" onClick={() => props.closeModal(false)} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    
                    </div>
                    </div>
                    <div className="modal-body text-start">
                        <div className="col-12 d-flex justify-content-center align-items-center" style={{height:"15vh"}}>
     <p className="mb-0 "  style={{
                            fontFamily: 'Poppins',
                            fontStyle: "normal",
                            fontWeight: "500",
                            fontSize: "18px",
                            lineHeight: "24px",
                            color:"#000"

                        }}>Do you really want to delete this Lead !!</p>
                        </div>

                            <div className="col-12 text-center mt-1">
                                <div className="row justify-content-end">
                                  
                                        <div className="col-3 d-grid pr-1">
                                        
<button className="btn" disabled={btnDS} onClick={()=>DeleteNotes()} style={{
                            fontFamily: 'Poppins',
                            fontStyle: "normal",
                            fontWeight: "700",
                            fontSize: "13px",
                            lineHeight: "20px",
                            color: "#E21B1B",
                            border:"2px solid #E21B1B",
                            borderRadius:"22px",marginTop:"5px"

                        }}>Yes</button>
                                        </div> <div className="col-3 d-grid">
                                                                  
<button onClick={()=>props.closeModal()} className="btn  btn-bgbClient d-flex justify-content-center align-items-center" style={{
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
            </div>
        </div>
        </>
    )
}
export default DeleteLeadModal;