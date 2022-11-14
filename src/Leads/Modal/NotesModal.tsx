import React,{useEffect,useRef,useState} from "react";
import toast from "react-hot-toast";
import {API_BASE_URL} from "../../config/serverApiConfig"
function NotesModal({closeModal,props,Notes,EditModal,deleteModal,setDelete}){
  const [btnDS,setBTNds]=useState(false)

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

    const DeleteNotes=()=>{
      setDelete("")
      if(Notes =="Leads"){
        if(props.leadNotes !== ""){
          closeModal(false)
          deleteModal(true)
        }else{
          setBTNds(false)
          toast.error("Please Add Notes!")
        }
      }else{
        if(props.agencyNotes !== ""){
          closeModal(false)
          deleteModal(true)
        }else{
          setBTNds(false)
          toast.error("Please Add Notes!")
        }
      }
    
    }
 

    return(
        <>
  <div className="modal d-block" style={{ backgroundColor: "#00000052" }} id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" style={{width:"795px"}}>
                <div className="modal-content">
                    <div className="modal-header p-0">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-8 px-0 clientArchivedModal-font">
                    <h2 className="modal-title  py-1 pRight" id="staticBackdropLabel">{Notes == "Leads" ? "Notes by " + Notes : "Notes by Agency"}</h2>
                    </div>
                    <div className="col-4 text-end d-flex align-items-center">
                    <button type="button" className="btn-close" onClick={() => closeModal(false)} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    </div>
                    </div>
                    </div>
                    <div className="modal-body scrollbarModal text-start" style={{height:"35vh"}}>
                     
                       <p className="mb-0" style={{
                            fontFamily: 'Poppins',
                            fontStyle: "normal",
                            fontWeight: "400",
                            fontSize: "12px",
                            lineHeight: "24px",
                            color: "#000000",
                      
                        }}>
                            {Notes === "Leads" ? props.leadNotes ? props.leadNotes : "✘✘No Notes!" : null}
                            {Notes === "Agency" ? props.agencyNotes ? props.agencyNotes : "✘✘No Notes!" : null}
                       </p>   </div>
                            <div className="col-12 text-center">
                                <div className="row justify-content-end py-1">
                                  
                                        <div className="col-4 d-grid">
                                        
<button className="btn" disabled={btnDS} onClick={()=>DeleteNotes()} style={{
                            fontFamily: 'Poppins',
                            fontStyle: "normal",
                            fontWeight: "700",
                            fontSize: "13px",
                            lineHeight: "20px",
                            color: "#E21B1B",
                            border:"2px solid #E21B1B",
                            borderRadius:"22px",marginTop:"5px"

                        }}><img src={require("../../images/Deletebucket.svg").default} /> Delete This Note</button>
                                        </div> <div className="col-4 d-grid">
                                    
<button disabled={btnDS} className="btn  btn-bgbClient d-flex justify-content-center align-items-center" onClick={()=>{closeModal(false);EditModal(true)}} style={{
                            fontFamily: 'Poppins',
                            fontStyle: "normal",
                            fontWeight: "700",
                            fontSize: "13px",
                            lineHeight: "18px",
                            borderRadius:"22px"

                        }}><img src={require("../../images/Edit.svg").default}  />Edit this Note</button>
                      

                                        </div>
                                      
                                  
                                    
                                


                                </div>
                         
                    </div>
               
                </div>
            </div>
        </div>
        </>
    )
}
export default NotesModal;