import React,{useEffect,useRef} from "react";

function NotesModal({closeModal}){




    
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
                    <div className="modal-body scrollbarModal text-start" style={{height:"35vh"}}>
                     
                       <p className="mb-0" style={{
                            fontFamily: 'Poppins',
                            fontStyle: "normal",
                            fontWeight: "400",
                            fontSize: "12px",
                            lineHeight: "24px",
                            color: "#000000",
                      
                        }}>
                            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            
                            "
                       </p>   </div>
                            <div className="col-12 text-center">
                                <div className="row justify-content-end py-1">
                                  
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

                        }}><img src={require("../../images/Deletebucket.svg").default} /> Delete This Note</button>
                                        </div> <div className="col-4 d-grid">
                                                                  
<button className="btn  btn-bgbClient d-flex justify-content-center align-items-center" style={{
                            fontFamily: 'Poppins',
                            fontStyle: "normal",
                            fontWeight: "700",
                            fontSize: "13px",
                            lineHeight: "18px",
                            borderRadius:"22px"

                        }}><img src={require("../../images/Edit.svg").default} />Edit this Note</button>

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