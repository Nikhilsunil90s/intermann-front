import React, { useState } from "react";
import toast from "react-hot-toast";
import $ from "jquery"

function DownloadGmail(props: any) {
  const [copied,setCopied]=useState(false)
  const [steps,setSteps]=useState({
    step1:false,
    step2:false
  })
  function copyToClipboard(element:any) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
    setCopied(true)
    toast.success("Copied successfully !!")
  }

  const nextStep=()=>{
    if(steps.step1){
        setSteps({step1:false,step2:true})
    }else{
        setSteps({step1:true,step2:false})

    }
  }
  return (
    <>
      <div
        className="modal d-block"
        style={{ backgroundColor: "#00000052" }}
        id="staticBackdrop2"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" style={{ width: "795px" }}>
          <div className="modal-content">
            <div className="modal-header p-0">
              <div className="col-12">
                <div className="row">
                  <div className="col-8 px-0 clientArchivedModal-font ">
                    <h2
                      className="modal-title  py-1 pRight text-capitalize"
                      id="staticBackdropLabel"
                      
                    >{
                        steps.step1 === false && steps.step2 == false   ? 
                     "Copiez ce texte dans votre ordinateur"
                     :
                     steps.step1 ?
                     "Download the file"  
                       :
                       "Open GMAIL"


                    }
                      
                    </h2>
                  </div>
                  <div className="col-4 text-end d-flex align-items-center">
                    <button
                      type="button"
                      onClick={() =>
                        props.setDownloadMailModal({
                          ...props.downloadMailModal,
                          status: false,
                          content: "",
                          filePath:""
                        })
                      }
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal-body scrollbarModal text-start"
              style={{ height: "78vh" }}
            >
              <div className="col-12" style={{ background: steps.step1 === false && steps.step2 == false   ?  "#D9D9D9"  :
                     steps.step1 == false ? "#fff" :"#fff"}}>
              {
                        steps.step1 === false && steps.step2 == false   ? 
                        <p
                        className=""
                        id="p1"
                        style={{
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: 600,
                          fontSize: "16px",
                          lineHeight: "24px",
                          /* or 150% */
      
                          display: "flex",
                          alignItems: "flex-end",
                          letterSpacing: "2px",
                          color: "#000000",
                        }}
                      >
                        {props.props.content}
                      </p>
                     :
                     steps.step1 ?
                     <p
                     className="d-flex alig-items-center justify-content-center"
                     id="p1"
                     style={{
                       fontFamily: "Poppins",
                       fontStyle: "normal",
                       fontWeight: 600,
                       fontSize: "16px",
                       lineHeight: "24px",
                       /* or 150% */
                       height:"63vh",
                       display: "flex",
                       alignItems: "center",
                       letterSpacing: "2px",
                       color: "#000000",
                     }}
                   >
                     Merci de télécharger le fichier PDF à envoyer au client 
                     </p>
                       :
                       <div className="row justify-content-center align-items-center" style={{height:"70vh"}}>
                       <div className="col-6">
                       <a
                    //    onClick={()=>nextStep()}
                    target="_blank"
                    href={"http://www.gmail.com"}
              
                         className=""
                         style={{
                            width:"100%",
                           background: "#FE8700",
                           fontFamily: "Poppins",
                           fontStyle: "normal",
                           fontWeight: 600,
                           fontSize: "24px",
                           lineHeight: "24px",
                           /* identical to box height, or 71% */
   
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "center",
                           textDecorationLine: "underline",
                           textTransform: "capitalize",
                           color: " #FFFFFF",
                           border: "none",
                           height: "90px",
                          
                         }}
                       >Click here to open Gmail
                       </a>
</div>
</div>

                    }
             
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-6">
                   
                   {
                        steps.step1 === false && steps.step2 == false   ?   <button
                        className=""
                        id="content"
                        onClick={(e) =>
                    
                          copyToClipboard('#p1')}
                          disabled={copied}
                        style={{
                          background:copied  ? "#355240" :"#489767",
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: 600,
                          fontSize: "24px",
                          lineHeight: "24px",
                          /* identical to box height, or 71% */
  
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textDecorationLine: "underline",
                          textTransform: "capitalize",
                          color: " #FFFFFF",
                          border: "none",
                          height: "50px",
                          width: "80%",
                        }}
                      >  📜 copy text
</button>
                        :
                        steps.step1  ?
                        <button
                        className=""
                        id="content"
                        onClick={(e) => window.open(props.props.filePath)
                             }
                        //   disabled={copied}
                        style={{
                          background:copied  ? "#355240" :"#489767",
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: 600,
                          fontSize: "24px",
                          lineHeight: "24px",
                          /* identical to box height, or 71% */
  
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textDecorationLine: "underline",
                          textTransform: "capitalize",
                          color: " #FFFFFF",
                          border: "none",
                          height: "50px",
                          width: "80%",
                        }}
                      >
                      📥 Download PDF
                      </button>
                        :
null

                   }


                  </div>
                  {
                    steps.step2 ?
                    null
                    :
                    <div className="col-6 d-flex justify-content-end">
                    <button
                    onClick={()=>nextStep()}
                      className=""
                      style={{
                        background: "#FE8700",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: 600,
                        fontSize: "24px",
                        lineHeight: "24px",
                        /* identical to box height, or 71% */

                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textDecorationLine: "underline",
                        textTransform: "capitalize",
                        color: " #FFFFFF",
                        border: "none",
                        height: "50px",
                        width: "80%",
                      }}
                    >
                      ➡️ next step
                    </button>
                  </div>
                  }
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default DownloadGmail;
