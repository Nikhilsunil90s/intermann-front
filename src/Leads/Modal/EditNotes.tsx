import React,{useEffect,useRef} from "react";

function NotesEditModal({closeModal}){




    
    const onchange=(val:any)=>{
        if (val == 'ROUMAIN') {
              window.open("https://www.intermann.ro/")
             } 
             if (val == 'FRANCAIS') {
               window.open("https://www.intermann.fr/")
               
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
            <div className="modal-dialog modal-lg" style={{width:"795px"}}>
                <div className="modal-content">
                    <div className="modal-header p-0">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-8 px-0 clientArchivedModal-font">
                    <h2 className="modal-title  py-1 pRight" id="staticBackdropLabel">Notes by Agency</h2>
                    </div>
                    <div className="col-4 text-end d-flex align-items-center">
                    <button type="button" className="btn-close" onClick={() => closeModal(false)} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    </div>
                    </div>
                    </div>
                    <div className="modal-body text-start">
                    <textarea  style={{fontSize:"12px",height:"40vh"}}  className="form-control nameTransform" placeholder="Notes">

</textarea>
                            <div className="col-12 text-center mt-1">
                                <div className="row justify-content-end">
                                  
                                        <div className="col-4 d-grid">
                                        
<button className="btn" style={{
                            fontFamily: 'Poppins',
                            fontStyle: "normal",
                            fontWeight: "700",
                            fontSize: "13px",
                            lineHeight: "20px",
                            color: "#E21B1B",
                            border:"2px solid #E21B1B",
                            borderRadius:"22px",marginTop:"5px"

                        }}><img style={{paddingRight:"5px"}} src={require("../../images/Deletebucket.svg").default} /> Delete This Note</button>
                                        </div> <div className="col-4 d-grid">
                                                                  
<button className="btn  btn-bgbClient d-flex justify-content-center align-items-center" style={{
                            fontFamily: 'Poppins',
                            fontStyle: "normal",
                            fontWeight: "700",
                            fontSize: "13px",
                            lineHeight: "18px",
                            borderRadius:"22px",
                            color:"#ffff"
                           ,backgroundColor:"#489767" 

                        }}><img style={{paddingRight:"5px"}} src={require("../../images/diskette.svg").default} />   Update This Note</button>

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
export default NotesEditModal;