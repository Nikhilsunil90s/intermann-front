import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { API_BASE_URL } from "../config/serverApiConfig";
import ErrorLoader from "../components/Loader/SearchBarError";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import {toast,Toaster} from "react-hot-toast"
import Cookies from 'js-cookie'


function GdocumentCandidatePage() {
  const { id } = useParams();
  console.log(id);
  // const {state}= useLocation()
  const [documentList, setDocumentList] = useState([])as any;
  const [profile, setProfile] = useState() as any;
    const [CONTRACT_EMPLOYE_INTERMANN, setCONTRACT_EMPLOYE_INTERMANN] = useState() as any;
    const [Fiche_Medicale, setFiche_Medicale] = useState() as any;
    const [Assurance, setAssurance] = useState() as any;
    const [ID_CARD, setID_CARD] = useState() as any;
    const [Reges, setReges] = useState() as any;
    const [factures_payes, setfactures_payes] = useState() as any;
    const [factures_impayes, setfactures_impayes] = useState() as any;
    const [Fiche_mise_à_disposition, setFiche_mise_à_disposition] =
      useState() as any;
    const [progress, setProgress] = useState<any>(0);
    const [docUploaded, setDocUploaded] = useState(false);
    const notifyDocumentUploadSuccess = () =>
    toast.success("Document Uploaded Successfully!");
    const axiosInstance = axios.create({
      baseURL: API_BASE_URL,
    });

  useEffect(() => {
    fetchCandidat(id).then((resData) => {
        if (resData.status == true) {
          setProfile(resData.data)
          console.log(resData.data);
        setDocumentList([...resData.data?.candidatDocuments,...resData.data?.candidatLinks]);
        // setLinksList(resData.data?.candidatLinks);
        //   resData.data.map((el) => {
            // setProfile(el);

        //   });
        } else {
          return false;
        }
      })

      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const ViewDownloadFiles = (documentName: any) => {
    window.open(documentName);
  };


  useEffect(() => {
    // documentList.map((el) => {
        profile?.candidatDocuments?.map((el)=>{
   
            if (
              JSON.stringify(el.folderName ? el.folderName : null).includes(
                JSON.stringify("Reges") 
              )
            ) {
              setReges([el]);
            }
            if (
              JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("CONTRACT")))            
             {
              setCONTRACT_EMPLOYE_INTERMANN([el]);
            }
            if (
            el.folderName =="BULETIN_/_ID_CARD"
              )     {
               console.log(el,"el")
              setID_CARD([el]);
            }
            if (
              JSON.stringify(el.folderName ? el.folderName : null).includes(
                JSON.stringify("Fiche_Medicale")
              ) 
            ) {
              setFiche_Medicale([el]);
            }
            if (
              JSON.stringify(el.folderName ? el.folderName : null).includes(
                JSON.stringify("Assurance")
              ) 
          
            ) {
              setAssurance([el]);
            }
            if (
              JSON.stringify(el.folderName ? el.folderName : null).includes(
                JSON.stringify("Fiche_mise_à_disposition")
              
              )
            ) {
              setFiche_mise_à_disposition([el]);
            }
            if (
              JSON.stringify(el.folderName ? el.folderName : null).includes(
                JSON.stringify("factures_payes")
              ) 
            ) {
              setfactures_payes([el]);
            } if (
              JSON.stringify(el.folderName ? el.folderName : null).includes(
                JSON.stringify("factures_impayes") 
              ) 
            ) {
              setfactures_impayes([el]);
            }
    
  })
  },[profile]);


  useEffect(() => {
      
        profile?.candidatLinks?.map((Link) => {
            if (
              JSON.stringify(Link.folder ? Link.folder : null).includes(
                JSON.stringify("Reges"))
            ) {
              setReges([Link]);
            }
            if (
               JSON.stringify(Link.folder ? Link.folder : null).includes(JSON.stringify("CONTRACT"))
              )
             {
              setCONTRACT_EMPLOYE_INTERMANN([Link]);
            }
            if (
              Link.folder =="BULETIN_/_ID_CARD"
              )     {
               
              setID_CARD([Link]);
            }
            if (
              JSON.stringify(Link.folder ? Link.folder : null).includes(
                JSON.stringify("Fiche_Medicale")
            )) {
              setFiche_Medicale([Link]);
            }
            if (   JSON.stringify(Link.folder ? Link.folder : null).includes(
                JSON.stringify("Assurance")
              )
            ) {
              setAssurance([Link]);
            }
            if (
             JSON.stringify(Link.folder ? Link.folder : null).includes(
                JSON.stringify("Fiche_mise_à_disposition")
              )
            ) {
              setFiche_mise_à_disposition([Link]);
            }
            if (
             JSON.stringify(Link.folder? Link.folder : null).includes(
                JSON.stringify("factures_payes")
              )
            ) {
              setfactures_payes([Link]);
            } if (
                JSON.stringify(Link.folder ? Link.folder : null).includes(
                JSON.stringify("factures_impayes")
              )
            ) {
              setfactures_impayes([Link]);
            }

  })
  },[profile]);



  const fetchCandidat = async (CandidateID: any) => {
    return await fetch(API_BASE_URL + `getCandidatDetailsById/?candidatId=${CandidateID}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((respData) => respData)
      .catch((err) => err);
  };


  const FilesUploads=(file)=>{
    setDocUploaded(true);
    const fileUploaded = file;
    let formdata = new FormData();
    formdata.append("clientId", profile._id);
    formdata.append("document", fileUploaded);
    formdata.append("folderName", "rapport_activite");
    axiosInstance
      .post("uploadClientDocuments", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + Cookies.get("token"),
        },
        onUploadProgress: (data) => {
          setDocUploaded(true);
          //Set the progress value to show the progress bar
          setProgress(Math.round((100 * data.loaded) / data.total));
        },
      })
      .then((resData) => {
        if (resData.data.status) {
          setDocUploaded(true);
          setProgress(0);
          notifyDocumentUploadSuccess();
          setTimeout(()=>{
            window.location.reload()
          },2000)
        } else {
       
          setDocUploaded(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setDocUploaded(false);
        toast.error("File Not Uploaded!")
      });
  
  }



  return (
    <>
    <Toaster position="top-right" />
      <div className="container-fluied bg-ContractPage">
        <div className="row">
          <div className="col-12 d-flex justify-content-center p-1 mt-2">
            <span>
              <img
                src={require("../images/logo-header.svg").default}
                className="filter-logo"
                style={{ width: "150%" }}
              />
            </span>
            <img
              src={require("../images/LogoName.svg").default}
              className="filter-text LogoIntermann"
              style={{ paddingLeft: "30px" }}
            />
          </div>
          <div
            className="col-12 text-center mt-2"
            style={{ padding: "0px 50px 0px 50px" }}
          >
            {" "}
            <p className="retrouverez mb-0 ">
              Ceci est votre espace client Intermann, vous y retrouverez toute
              la documentation nécéssaire à jour en cas de controle.
            </p>
            <p className="mb-0 necessaryDoc">
              This is your customer area, you will find all the necessary
              up-to-date documentation there in the event of an inspection.
            </p>
          </div>
          <div className="col-12 px-3 mt-2 mb-1">
            <div className="row Social-CardClient p-1">
              <div className="col-md-3 col-sm-12  d-flex align-items-center justify-content-center">
             
                  <img
                    src={require("../images/representant.png")}
                    className="representant"
                  />

               
               
              </div>
              <div className="col-md-9 col-sm-12 d-grid align-items-center ">
                <p className="mb-0 cardPDFDetails">
                  Votre représentant : Jeremy Roggy
                <br/>
INTERMANN WORK S.R.L <br/>
 VAT : RO44515629 <br/>
+40 770 504 158</p>
             </div>
            </div>
          </div>
       
          <div className="col-12 px-3 mb-1 ">
            <div className="row Social-CardClient p-1">
              <div className="col-md-4 col-sm-12 justify-content-center d-flex align-items-center">
                <p className="mb-0 CLIntermann">CONTRACT EMPLOYE x Intermann</p>
              </div>
            <div className="col-md-8 col-sm-12">
                <div className="row justify-content-end">
                  {
                   CONTRACT_EMPLOYE_INTERMANN ?
                    documentList?.map((el)=>(
                        JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("CONTRACT"))  ?
                    <>    <div className="col-md-6 col-sm-12 mb-1">
                       <div className="row PDFcardBG cursor-pointer" onClick={() =>
                                ViewDownloadFiles(el.url ? el.url : el.link)
                              }>
                          <div className="col-2 px-0 d-flex align-items-center">
                            <img
                              style={{ width: "73%" }}
                              src={require("../images/newresume.svg").default}
                            />
                          </div>
                          <div className="col-8 px-0 d-flex align-items-center cursor-pointer"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={el.originalName}>
                            <p className="mb-0 contractEMPStyle">{el.originalName.length > 30 ? el.originalName.slice(0, 32) + "..." : el.originalName }</p>
                          </div>
                          <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer" >
                            <img
                              style={{ width: "73%" }}
                              src={require("../images/dowcard.svg").default}
                            />
                          </div>
                          </div>
                        </div>
                      </>
                        
                         : 
                         JSON.stringify(el.folder ? el.folder : null).includes(JSON.stringify("CONTRACT")) ?

                         <>    
                         <div className="col-md-6 col-sm-12 mb-1">
                              <div className="row PDFcardBG cursor-pointer" onClick={() =>
                                      ViewDownloadFiles(el.link)
                                    }>
                               <div className="col-2 px-0 d-flex align-items-center">
                                 <img
                                   style={{ width: "73%" }}
                                   src={require("../images/newresume.svg").default}
                                 />
                               </div>
                               <div className="col-8 px-0 d-flex align-items-center cursor-pointer"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={el.link}>
                                 <p className="mb-0 contractEMPStyle">{el.link.length > 30 ? el.link.slice(0,32) + "..." : el.link}</p>
                               </div>
                               <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer" >
                                 <img
                                   style={{ width: "73%" }}
                                   src={require("../images/dowcard.svg").default}
                                 />
                               </div>
                               </div>
                         </div>
                         </>
                         :

                       null

                    )
                    )
                    :
                   <p className="d-flex  justify-content-center align-items-center mb-0"     style={{
                  fontFamily: 'Poppins',
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#000000"
              }}> <ErrorLoader />No Documents Uploaded!</p>
                    
                    
                }
           
              </div>
              </div>
            </div>
          </div>
          <div className="col-12 px-3 mb-1 ">
            <div className="row Social-CardClient p-1">
              <div className="col-md-4 col-sm-12 justify-content-center d-flex align-items-center">
                <p className="mb-0 CLIntermann">
                ID CARD x Intermann
                </p>
              </div>
              <div className="col-md-8 col-sm-12">
                <div className="row justify-content-end">
                {
                   ID_CARD ?
                   documentList?.map((el)=>(
                       JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("BULETIN_/_ID_CARD")) ?
                   <>    <div className="col-md-6 col-sm-12 mb-1">
                       <div className="row PDFcardBG cursor-pointer" onClick={() =>
                                ViewDownloadFiles(el.url)
                              }>
                         <div className="col-2 px-0 d-flex align-items-center">
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/newresume.svg").default}
                           />
                         </div>
                         <div className="col-8 px-0 d-flex align-items-center cursor-pointer"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={el.originalName}>
                           <p className="mb-0 contractEMPStyle">{el.originalName.length > 30 ? el.originalName.slice(0, 32) + "..." : el.originalName}</p>
                         </div>
                         <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer" >
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/dowcard.svg").default}
                           />
                         </div>
                         </div>
                       </div>
                     </>
                     :
                       JSON.stringify(el.folder ? el.folder : null).includes(JSON.stringify("BULETIN_/_ID_CARD")) ?

                       <>    
                       <div className="col-md-6 col-sm-12 mb-1">
                            <div className="row PDFcardBG cursor-pointer" onClick={() =>
                                    ViewDownloadFiles(el.link)
                                  }>
                             <div className="col-2 px-0 d-flex align-items-center">
                               <img
                                 style={{ width: "73%" }}
                                 src={require("../images/newresume.svg").default}
                               />
                             </div>
                             <div className="col-8 px-0 d-flex align-items-center cursor-pointer"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={el.link}>
                               <p className="mb-0 contractEMPStyle">{el.link.length > 30 ? el.link.slice(0,32) + "..." : el.link}</p>
                             </div>
                             <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer" >
                               <img
                                 style={{ width: "73%" }}
                                 src={require("../images/dowcard.svg").default}
                               />
                             </div>
                             </div>
                       </div>
                       </>
                       
                          :
                          null
                   )
                   )
                   :
                  <p className="d-flex  justify-content-center align-items-center mb-0"     style={{
                  fontFamily: 'Poppins',
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#000000"
              }}> <ErrorLoader />No Documents Uploaded!</p>
                   
                   
               }
           
              </div>
              </div>
            </div>
          </div>{" "}
          <div className="col-12 px-3 mb-1 ">
            <div className="row Social-CardClient p-1">
              <div className="col-md-4 col-sm-12 justify-content-center d-flex align-items-center">
                <p className="mb-0 CLIntermann">FICHE MEDICALE</p>
              </div>
              <div className="col-md-8 col-sm-12">
                <div className="row justify-content-end">
                {
                   Fiche_Medicale ?
                   documentList?.map((el)=>(
                       JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("Fiche_Medicale")) ?
                   <>    <div className="col-md-6 col-sm-12  mb-1">
                       <div className="row PDFcardBG cursor-pointer" onClick={() =>
                                ViewDownloadFiles(el.url)
                              }>
                         <div className="col-2 px-0 d-flex align-items-center">
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/newresume.svg").default}
                           />
                         </div>
                         <div className="col-8 px-0 d-flex align-items-center cursor-pointer"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={el.originalName}>
                           <p className="mb-0 contractEMPStyle">{el.originalName.length > 30 ? el.originalName.slice(0,32) + "..." : el.originalName}</p>
                         </div>
                         <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer" >
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/dowcard.svg").default}
                           />
                         </div>
                         </div>
                       </div>
                     </>
                            :
                            JSON.stringify(el.folder ? el.folder : null).includes(JSON.stringify("Fiche_Medicale")) ?
     
                            <>    
                            <div className="col-md-6 col-sm-12 mb-1">
                                 <div className="row PDFcardBG cursor-pointer" onClick={() =>
                                         ViewDownloadFiles(el.link)
                                       }>
                                  <div className="col-2 px-0 d-flex align-items-center">
                                    <img
                                      style={{ width: "73%" }}
                                      src={require("../images/newresume.svg").default}
                                    />
                                  </div>
                                  <div className="col-8 px-0 d-flex align-items-center cursor-pointer"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={el.link}>
                                    <p className="mb-0 contractEMPStyle">{el.link.length > 30 ? el.link.slice(0,32) + "..." : el.link}</p>
                                  </div>
                                  <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer" >
                                    <img
                                      style={{ width: "73%" }}
                                      src={require("../images/dowcard.svg").default}
                                    />
                                  </div>
                                  </div>
                            </div>
                            </>
                            
                               :
                               null
                   )
                   )
                   :
                  <p className="d-flex  justify-content-center align-items-center mb-0"     style={{
                  fontFamily: 'Poppins',
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#000000"
              }}> <ErrorLoader />No Documents Uploaded!</p>
                   
               }
           
           
              </div>
              </div>
            </div>
          </div>{" "}
          <div className="col-12 px-3 mb-1 ">
            <div className="row Social-CardClient p-1">
              <div className="col-md-4 col-sm-12 justify-content-center d-flex align-items-center">
                <p className="mb-0 CLIntermann">ASSURANCE</p>
              </div>
              <div className="col-md-8 col-sm-12">
                <div className="row justify-content-end">
                {
                   Assurance ?
                   documentList?.map((el)=>(
                       JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("Assurance")) ?
                   <>    <div className="col-md-6 col-sm-12 mb-1">
                        <div className="row PDFcardBG cursor-pointer" onClick={() =>
                                ViewDownloadFiles(el.url)
                              }>
                         <div className="col-2 px-0 d-flex align-items-center">
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/newresume.svg").default}
                           />
                         </div>
                         <div className="col-8 px-0 d-flex align-items-center cursor-pointer"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={el.originalName}>
                           <p className="mb-0 contractEMPStyle">{el.originalName.length > 30 ? el.originalName.slice(0,32) + "..." : el.originalName}</p>
                         </div>
                         <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer" >
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/dowcard.svg").default}
                           />
                         </div>
                         </div>
                       </div>
                     </>
                          :
                          JSON.stringify(el.folder ? el.folder : null).includes(JSON.stringify("Assurance")) ?
     
                          <>    
                          <div className="col-md-6 col-sm-12 mb-1">
                               <div className="row PDFcardBG cursor-pointer" onClick={() =>
                                       ViewDownloadFiles(el.link)
                                     }>
                                <div className="col-2 px-0 d-flex align-items-center">
                                  <img
                                    style={{ width: "73%" }}
                                    src={require("../images/newresume.svg").default}
                                  />
                                </div>
                                <div className="col-8 px-0 d-flex align-items-center cursor-pointer"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={el.link}>
                                  <p className="mb-0 contractEMPStyle">{el.link.length > 30 ? el.link.slice(0,32) + "..." : el.link}</p>
                                </div>
                                <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer" >
                                  <img
                                    style={{ width: "73%" }}
                                    src={require("../images/dowcard.svg").default}
                                  />
                                </div>
                                </div>
                          </div>
                          </>
                          
                             :
                             null
                   )
                   )
                   :
                  <p className="d-flex  justify-content-center align-items-center mb-0"     style={{
                  fontFamily: 'Poppins',
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#000000"
              }}> <ErrorLoader />No Documents Uploaded!</p>
                   
                   
               } 
           
              </div>
              </div>
            </div>
          </div>{" "}
          <div className="col-12 px-3 mb-1 ">
            <div className="row Social-CardClient p-1">
              <div className="col-md-4 col-sm-12 justify-content-center d-flex align-items-center">
                <p className="mb-0 CLIntermann">REGES</p>
              </div>
              <div className="col-md-8 col-sm-12">
                <div className="row justify-content-end">
                {
                   Reges ?
                   documentList?.map((el)=>(
                       JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("Reges")) ?
                   <>    <div className="col-md-6 col-sm-12 mb-1">
                       <div className="row PDFcardBG cursor-pointer" onClick={() =>
                                ViewDownloadFiles(el.url)
                              }>
                         <div className="col-2 px-0 d-flex align-items-center">
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/newresume.svg").default}
                           />
                         </div>
                         <div className="col-8 px-0 d-flex align-items-center cursor-pointer"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={el.originalName}>
                           <p className="mb-0 contractEMPStyle">{el.originalName.length > 30 ? el.originalName.slice(0,32) + "..." : el.originalName}</p>
                         </div>
                         <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer" >
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/dowcard.svg").default}
                           />
                         </div>
                         </div>
                       </div>
                     </>
                          :
                          JSON.stringify(el.folder ? el.folder : null).includes(JSON.stringify("Reges")) ?
     
                          <>    
                          <div className="col-md-6 col-sm-12 mb-1">
                               <div className="row PDFcardBG cursor-pointer" onClick={() =>
                                       ViewDownloadFiles(el.link)
                                     }>
                                <div className="col-2 px-0 d-flex align-items-center">
                                  <img
                                    style={{ width: "73%" }}
                                    src={require("../images/newresume.svg").default}
                                  />
                                </div>
                                <div className="col-8 px-0 d-flex align-items-center cursor-pointer"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={el.link}>
                                  <p className="mb-0 contractEMPStyle">{el.link.length > 30 ? el.link.slice(0,32) + "..." : el.link}</p>
                                </div>
                                <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer" >
                                  <img
                                    style={{ width: "73%" }}
                                    src={require("../images/dowcard.svg").default}
                                  />
                                </div>
                                </div>
                          </div>
                          </>
                          
                             :
                             null
                   )
                   )
                   :
                  <p className="d-flex  justify-content-center align-items-center mb-0"     style={{
                  fontFamily: 'Poppins',
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#000000"
              }}> <ErrorLoader />No Documents Uploaded!</p>
                   
               }
            
              </div>
              </div>
            </div>
          </div>{" "}
          <div className="col-12 px-3 mb-1 ">
            <div className="row Social-CardClient p-1">
              <div className="col-md-4 col-sm-12 justify-content-center d-flex align-items-center">
                <p className="mb-0 CLIntermann">FICHE MISE A DISPOSITION</p>
              </div>
              <div className="col-md-8 col-sm-12">
                <div className="row justify-content-end">
                {
                   Fiche_mise_à_disposition ?
                   documentList?.map((el)=>(
                       JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("Fiche_mise_à_disposition")) ?
                   <>    <div className="col-md-6 col-sm-12 mb-1">
                        <div className="row PDFcardBG cursor-pointer" onClick={() =>
                                ViewDownloadFiles(el.url)
                              }>
                         <div className="col-2 px-0 d-flex align-items-center">
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/newresume.svg").default}
                           />
                         </div>
                         <div className="col-8 px-0 d-flex align-items-center cursor-pointer"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={el.originalName}>
                           <p className="mb-0 contractEMPStyle">{el.originalName.length > 30 ? el.originalName.slice(0,32) + "..." : el.originalName}</p>
                         </div>
                         <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer" >
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/dowcard.svg").default}
                           />
                         </div>
                         </div>
                       </div>
                     </>
                          :
                          JSON.stringify(el.folder ? el.folder : null).includes(JSON.stringify("Fiche_mise_à_disposition")) ?
     
                          <>    
                          <div className="col-md-6 col-sm-12 mb-1">
                               <div className="row PDFcardBG cursor-pointer" onClick={() =>
                                       ViewDownloadFiles(el.link)
                                     }>
                                <div className="col-2 px-0 d-flex align-items-center">
                                  <img
                                    style={{ width: "73%" }}
                                    src={require("../images/newresume.svg").default}
                                  />
                                </div>
                                <div className="col-8 px-0 d-flex align-items-center cursor-pointer"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={el.link}>
                                  <p className="mb-0 contractEMPStyle">{el.link.length > 30 ? el.link.slice(0,32) + "..." : el.link}</p>
                                </div>
                                <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer" >
                                  <img
                                    style={{ width: "73%" }}
                                    src={require("../images/dowcard.svg").default}
                                  />
                                </div>
                                </div>
                          </div>
                          </>
                          
                             :
                             null
                   )
                   )
                   :
                  <p className="d-flex  justify-content-center align-items-center mb-0"     style={{
                  fontFamily: 'Poppins',
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#000000"
              }}> <ErrorLoader />No Documents Uploaded!</p>
                   
               }
              </div>
              </div>
            </div>
          </div>
          <div className="col-12 px-3 mb-1 ">
            <div className="row Social-CardClient p-1">
              <div className="col-md-4 col-sm-12 justify-content-center d-flex align-items-center">
                <p className="mb-0 CLIntermann">FACTURES PAYES</p>
              </div>
              <div className="col-md-8 col-sm-12">
                <div className="row justify-content-end">
                {
                   factures_payes ?
                   documentList?.map((el)=>(
                       JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("factures_payes")) ?
                   <>    <div className="col-md-6 col-sm-12 mb-1">
                        <div className="row PDFcardBG cursor-pointer" onClick={() =>
                                ViewDownloadFiles(el.url)
                              }>
                         <div className="col-2 px-0 d-flex align-items-center">
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/newresume.svg").default}
                           />
                         </div>
                         <div className="col-8 px-0 d-flex align-items-center cursor-pointer"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={el.originalName}>
                           <p className="mb-0 contractEMPStyle">{el.originalName.length > 30 ? el.originalName.slice(0,32) + "..." : el.originalName}</p>
                         </div>
                         <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer" >
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/dowcard.svg").default}
                           />
                         </div>
                         </div>
                       </div>
                     </>
                          :
                          JSON.stringify(el.folder ? el.folder : null).includes(JSON.stringify("factures_payes")) ?
     
                          <>    
                          <div className="col-md-6 col-sm-12 mb-1">
                               <div className="row PDFcardBG cursor-pointer" onClick={() =>
                                       ViewDownloadFiles(el.link)
                                     }>
                                <div className="col-2 px-0 d-flex align-items-center">
                                  <img
                                    style={{ width: "73%" }}
                                    src={require("../images/newresume.svg").default}
                                  />
                                </div>
                                <div className="col-8 px-0 d-flex align-items-center cursor-pointer"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={el.link}>
                                  <p className="mb-0 contractEMPStyle">{el.link.length > 30 ? el.link.slice(0,32) + "..." : el.link}</p>
                                </div>
                                <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer" >
                                  <img
                                    style={{ width: "73%" }}
                                    src={require("../images/dowcard.svg").default}
                                  />
                                </div>
                                </div>
                          </div>
                          </>
                          
                             :
                             null
                   )
                   )
                   :
                  <p className="d-flex  justify-content-center align-items-center mb-0"     style={{
                  fontFamily: 'Poppins',
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#000000"
              }}> <ErrorLoader />No Documents Uploaded!</p>
                   
               }
              </div>
              </div>
            </div>
          </div>
          <div className="col-12 px-3 mb-1 ">
            <div className="row Social-CardClient p-1">
              <div className="col-md-4 col-sm-12 justify-content-center d-flex align-items-center">
                <p className="mb-0 CLIntermann">FACTURES IMPAYES</p>
              </div>
              <div className="col-md-8 col-sm-12">
                <div className="row justify-content-end">
                {
                  factures_impayes ?
                   documentList?.map((el)=>(
                       JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("factures_impayes")) ?
                   <>    <div className="col-md-6 col-sm-12 mb-1">
                        <div className="row PDFcardBG cursor-pointer" onClick={() =>
                                ViewDownloadFiles(el.url)
                              }>
                         <div className="col-2 px-0 d-flex align-items-center">
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/newresume.svg").default}
                           />
                         </div>
                         <div className="col-8 px-0 d-flex align-items-center cursor-pointer"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={el.originalName}>
                           <p className="mb-0 contractEMPStyle">{el.originalName.length > 30 ? el.originalName.slice(0,32) + "..." : el.originalName}</p>
                         </div>
                         <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer" >
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/dowcard.svg").default}
                           />
                         </div>
                         </div>
                       </div>
                     </>
                          :
                          JSON.stringify(el.folder ? el.folder : null).includes(JSON.stringify("factures_impayes")) ?
     
                          <>    
                          <div className="col-md-6 col-sm-12 mb-1">
                               <div className="row PDFcardBG cursor-pointer" onClick={() =>
                                       ViewDownloadFiles(el.link)
                                     }>
                                <div className="col-2 px-0 d-flex align-items-center">
                                  <img
                                    style={{ width: "73%" }}
                                    src={require("../images/newresume.svg").default}
                                  />
                                </div>
                                <div className="col-8 px-0 d-flex align-items-center cursor-pointer"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={el.link}>
                                  <p className="mb-0 contractEMPStyle">{el.link.length > 30 ? el.link.slice(0,32) + "..." : el.link}</p>
                                </div>
                                <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer" >
                                  <img
                                    style={{ width: "73%" }}
                                    src={require("../images/dowcard.svg").default}
                                  />
                                </div>
                                </div>
                          </div>
                          </>
                          
                             :
                             null
                   )
                   )
                   :
                  <p className="d-flex  justify-content-center align-items-center mb-0"     style={{
                  fontFamily: 'Poppins',
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#000000"
              }}> <ErrorLoader />No Documents Uploaded!</p>
                   
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
export default GdocumentCandidatePage;
