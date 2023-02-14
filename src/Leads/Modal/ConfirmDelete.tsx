import React,{useEffect,useRef,useState} from "react";
import { API_BASE_URL } from "../../config/serverApiConfig";
import {toast} from "react-hot-toast"
import { motion } from "framer-motion";
import Cookies from 'js-cookie'

function NotesDeleteModal({props,closeModal,update,Load,Notes,LeadsDelete,setDelete,setFilter}){
  const [btnDS,setBTNds]=useState(false)
  const DeleteNotes=()=>{

  let data={
    leadId:props._id,
  }
  if(LeadsDelete  === "Delete"){
  // Load(false)
 fetch(API_BASE_URL + `deleteLead`,{
   method: "POST",
   headers: {
     "Accept": 'application/json',
     'Content-Type': 'application/json',
     "Authorization": "Bearer " + Cookies.get('token')
   },
   body:JSON.stringify(data)
 })
   .then(red => red.json())
   .then(resData => {
      if(resData.status){
        toast.success(resData.message)
        // Lead([])
        update(true)
        setDelete("")
setTimeout(()=>{
  Load(true)
},2000)
      }else{
      //  Update(true)
       toast.error(resData.message)

      }
   })
   .catch(err => err)

  }else{
    fetch(Notes == "Leads" ? API_BASE_URL +"deleteLeadNotes" :API_BASE_URL +`deleteAgencyNotes`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
      body:JSON.stringify(data)
    })
    .then((res)=>res.json())
    .then(res=>{
      if(res.status){
        update(true)
        setBTNds(false)
        Load(true)
        toast.success(res.message)
          closeModal(false)
      
      }else{
        setBTNds(false)    
        toast.success(res.message)
      
      }
    })
    .catch(err=>err)
  }
 
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
                        }}  className="modal-dialog modal-lg" style={{width:"505px",marginTop:"100px"}}>
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
                            fontSize: "18px",
                            lineHeight: "24px",
                            color:"#000"

                        }}>Do you really want to delete this{LeadsDelete  === "Delete" ?  " Lead?": " note?"}</p>
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