import React,{useState,useRef} from "react";
import format from "date-fns/format";
import { Calendar } from "react-date-range";
import { FileUploader } from "react-drag-drop-files";
import axios from 'axios'
import { API_BASE_URL } from "../../config/serverApiConfig";
import Switch from "react-switch";
import Select from "react-select";
import Cookies from 'js-cookie'
import {ReactComponent as TurnoFF} from "../../images/FatX.svg";
import {ReactComponent as TurnOn} from "../../images/base-switch_icon.svg";
import { useNavigate } from "react-router";
function  UploadFile(props){
  const navigate =useNavigate()
    const axiosInstance = axios.create({
        baseURL: API_BASE_URL,
      })
    const [Startopen, setStartOpen] = useState(false);
    const [data,setData]=useState({
        startDate:""
    })as any
    const [open, setOpen] = useState(false);
    const reftwo = useRef(null);
    const dateChangeStart =(date)=>{
        setData({...data,["startDate"]:format(date, "dd-MM-yyyy")})
        setOpen(false)
        setStartOpen(false)
    
      }

      const FilesUploads=(file)=>{
        const fileUploaded = file;
          let formdata = new FormData();
          formdata.append('candidatId', props?._id)
          formdata.append('document', fileUploaded)
        //   formdata.append('folderName', UploadName)
          axiosInstance.post("", formdata, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": "Bearer " +  Cookies.get("token")
            },
            onUploadProgress: data => {
              //Set the progress value to show the progress bar
            //   setProgress(Math.round((100 * data.loaded) / data.total))
            },
          })
          .then(resData => {
            if (resData.data.status) {
            //     setDeleteStatus(true)
            //   setProgress(0); 
            //   notifyDocumentUploadSuccess();
            } else {
          
            }
          })
          .catch(err => {
            console.log(err)
        
      
          })
        return;
      }
      const SwitchChange = (checked: any, e: any, Name: any) => {


      }
return(<>
        
   <div className="modal d-block" style={{ backgroundColor: "#00000052" }} id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
   <div   
    className="modal-dialog modal-lg" style={{width:"735px",marginTop:"29px"}}>
                <div className="modal-content">
                
                    {
                      props.uploadPdfModal.Manually ?

                      <div className="col-12 " style={{    borderBottom: "1px solid #80808047",padding:"10px"}}>
                      <div className="row justify-content-end">
                        <div className="col-8 d-flex align-items-center"><p className="mb-0"  style={{
                          fontFamily: 'Poppins',
                          fontStyle: "normal",
                          fontWeight: "500",
                          fontSize: "18px",
                          lineHeight: "24px",
                          color:"#000",
                          textTransform: "capitalize"

                      }}>add Offer manually</p></div>
                  <div className="col-4 text-end d-flex justify-content-end align-items-end">
                  <button type="button" className="btn-close p-1" onClick={() => props.setUploadPdfModal({...props.uploadPdfModal,Manually:false})} data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  
                  </div>
                  </div>  

                  :
                  <div className="col-12 " style={{    borderBottom: "1px solid #80808047",padding:"10px"}}>
                  <div className="row justify-content-end">
                    <div className="col-8 d-flex align-items-center"><p className="mb-0"  style={{
                      fontFamily: 'Poppins',
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "18px",
                      lineHeight: "24px",
                      color:"#000",
                      textTransform: "capitalize"

                  }}>generate offer cRM automaticly</p></div>
              <div className="col-4 text-end d-flex justify-content-end align-items-end">
              <button type="button" className="btn-close p-1" onClick={() => props.setUploadPdfModal({...props.uploadPdfModal,AddToCrm:false})} data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              
              </div>
              </div>  

                    }
                    <div className="modal-body text-start">
                        <div className="col-12 ">
                        {
                      props.uploadPdfModal.Manually ?

                                <div className="row ">
                                <div className="col-6">
                                <div className="d-grid">
                                    <label style={{
                            fontFamily: 'Poppins',
                            fontStyle: "normal",
                            fontWeight: "600",
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "#000000",
                      
                        }}>Company name</label>
                                    <input style={{
                            fontFamily: 'Poppins',
                            fontStyle: "normal",
                            fontWeight: "400",
                            fontSize: "13px",
                            lineHeight: "24px",
                            color: "#000000",
                      
                        }} placeholder="Company name" className="form-control fontsizeModal"/>
                                </div>
                            </div>
                            <div className="col-6">
                                <label style={{
                            fontFamily: 'Poppins',
                            fontStyle: "normal",
                            fontWeight: "600",
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "#000000",
                      
                        }}>When this offer have been made ?</label>
                                     <input
                               value={data.startDate === "" ? "dd/mm/yyyy" : data.startDate }
                                readOnly
                                style={{textTransform:"none"}}
                                className="dateSort"
                                onClick={() => setStartOpen((open) => !open)}
                                
                              />
                               <div ref={reftwo} className="rdrDateRangePickerWrapper ">
              {Startopen && (
                <Calendar
                  onChange={(item) => dateChangeStart(item)}
                  direction="vertical"
                  className="calendarElement "
                />
              )}
            </div>
            <div
              onClick={() => setStartOpen((open) => !open)}
              className="d-flex justify-content-end eventPos cursor-pointer  "
            >
              <img src={require("../../images/event.svg").default} />
            </div>
                            </div>

                            <div className="my-2 p-1" style={{ border: "1px solid #000",
    borderRadius: "16px"}}>
                            <div className="col-12 d-grid  justify-content-center align-items-center mb-0">
                      <div className="d-flex justify-content-center">
                        <img
                          src={require("../../images/docupload.svg").default}
                        />
                      </div>
                      <p
                        style={{
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: "500",
                          fontSize: "16px",
                          lineHeight: "24px",
                          color: "#92929D",
                        }}
                      >
                        Upload Pdf file
                      </p>
                 
                            </div>
                            <div  className="col-12 d-flex justify-content-center mt-2" >
                
                <img src={require("../../images/resume.svg").default} />
           
         
                <FileUploader 
                handleChange={FilesUploads}
                name="candidatDocuments"
                label={`Upload Pdf file`}
                />
         
            </div>
                     

                                </div>
                                <div className="col-12 my-2 d-flex align-items-center">
                                    <p className="mb-0 "   style={{
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: "500",
                          fontSize: "14px",
                          lineHeight: "24px",
                          color: "#000",
                          textTransform:"uppercase"
                                    }}
                                    >
           Is offer have been signed yet ?     
                  
              
</p>
<Switch
                  checked={true}
                  id="signatureSent"
                  className="ml-left"
                  onChange={(checked, e, id) =>
                    SwitchChange(checked, props, id)
                  }
                  checkedHandleIcon={
                    <TurnOn
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-6px",
                      }}
                    />
                  }
                  height={19}
                  width={41}
                  uncheckedHandleIcon={
                    <TurnoFF
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-5px",
                      }}
                    />}
                    />

                 
                                </div>
                                <div className="col-12 my-1">
                      <button  className="btn AddThisOffer">Add this offer</button>
                    </div>
                            </div>

                            :
                            <p className="py-2 px-4" style={{
                              fontFamily: 'Poppins',
                              fontStyle: "normal",
                              fontWeight: "600",
                              fontSize: "16px",
                              lineHeight: "24px",
                              color: "#000000",
                        
                          }}>Vous devez vous rendre sur le Commercial Center et rajouter un lead manuellement et ensuite cliquer sur Generate Offer</p> 
                    }
                    {
                                            props.uploadPdfModal.Manually ?

                                            null
                                            :
                                            <div className="col-12 my-1">
                                            <button  className="btn AddThisOffer" onClick={()=>navigate("/commercialCenter")}>go to commercial center</button>
                                          </div>
                    }
                    </div>
               </div>
                </div>
            </div>
        </div>
</>
)
}
export default UploadFile