import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../config/serverApiConfig";
import { Tabs, Tab } from "react-tabs-scrollable";
import axios from 'axios'
import {toast ,Toaster} from "react-hot-toast"
import RenameDoc from '../../components/Modal/RenameDoc_Modal'
import { FileUploader } from "react-drag-drop-files";
import { ProgressBar } from "react-bootstrap";
import Share from "../../components/Loader/Share"
import ProfileLoader from "../../components/Loader/ProfilesLoader";

let RenameData=[]
let UploadName ="";
let UploadTextBtn="";
function PDFBoxCandidate({props,value}){
    const axiosInstance = axios.create({
        baseURL: API_BASE_URL,
      })
      const [profile,setProfile]=useState()as any
      const [RenameDocStatus,setRenameDocStatus]=useState(false)
      const [activeTab, setActiveTab] = React.useState(1) as any;
      const [documentList, setDocumentList] = useState([])as any;
      const [ListLink, setListLink] = useState([])as any;
      const [DriveLink,setDriveLink]=useState("")
  const [progress, setProgress] = useState<any>(0);
  const [DeleteStatus, setDeleteStatus] = useState(false);

  const [docUploaded, setDocUploaded] = useState(false);

    const [tabItems, setTabitems] = useState([
      {
        text: "CONTRACT EMPLOYE INTERMANN",
        value: "CONTRACT",
      },
      {
        text: "ID CARD",
        value: "BULETIN_/_ID_CARD",
      },
      {
        text: "FICHE MEDICALE",
        value: "Fiche_Medicale",
      },
      {
        text: "ASSURANCE",
        value: "Assurance",
      },
      {
        text: "REGES",
        value: "Reges",
      },
      {
        text: "FICHE MISE A DISPOSITION",
        value: "Fiche_mise_à_disposition",
      },
      {
        text: "FACTURES PAYES",
        value: "factures_payes",
      },
      {
        text: "FACTURES IMPAYES",
        value: "factures_impayes",
      },
     
    ]) as any;
  
       
   const notifyDocumentUploadSuccess = () => toast.success("Document Uploaded Successfully!");
   const notifyDocumentDeleteSuccess = () => toast.success("Document Removed Successfully!");
  const notifyDocumentDeleteError = () => toast.error("Document Not Removed! Please Try Again in few minutes.")
   

      const renameDocument = (docId: any, docName: any ,originalName:any) => {

        if(originalName=="LinkEdit"){
          RenameData=[
            docId,
            docName,
            originalName,
      
          ]
        }else{
          RenameData=[
            docId,
            docName,
            profile._id,
            originalName
          ]
        }
        // renameCandidatDocument(docId, docName, profile._id).then(resData => {
        //   console.log(resData)
        //   setRenameDoc(false);
        // }).catch(err => {
        //   console.log(err)
        // })
      }


      useEffect(()=>{
        fetchCandidat(props._id)
      },[DeleteStatus])
      
const onTabClick = (e, index: any) => {
    setActiveTab(index);
    const FolderName = tabItems.filter((el, i) => i == index);
  
    FolderName.map((el) => {
      UploadName = el.value;
      UploadTextBtn = el.text;
    });
  
  
    setListLink(profile?.candidatLinks.filter((el) => el.folder == UploadName))
    setDocumentList( profile?.candidatDocuments.filter((el) => el.folderName == UploadName));
  };
  
  
      

      useEffect(() => {
        const FolderName = tabItems.filter((el, i) => i == activeTab);
      if(UploadName == "" ){
        FolderName.map((el) => {
          UploadName = el.value;
          UploadTextBtn = el.text;
        });
      
      
      }
    
       ;
       setListLink(props?.candidatLinks.filter((el) => el.folder == UploadName))

          setDocumentList(props.candidatDocuments.filter((el) => (el.folderName == UploadName)));
       
      
      },[props]);

      const fetchCandidat = async (candidatId: any) => {
        await  fetch(API_BASE_URL + `getCandidatById/?candidatId=${candidatId}`, {
          method: "GET",
          headers: {
            "Accept": 'application/json',
            "Authorization": "Bearer " + localStorage.getItem('token')
          },
        })
          .then(resp => resp.json())
          .then((respData) => 
            respData.status ?
            dataHandle(respData.data)

           :
           null
         
          )
          .catch(err => err)
      }

      const dataHandle=(el)=>{
        setProfile(el)
        setDocumentList(el.candidatDocuments?.filter((el) => el.folderName == UploadName))
        setListLink(el?.candidatLinks.filter((el) => el.folder == UploadName))
        value(el)
        setDeleteStatus(false)
      }
      const FilesUploads=(file)=>{
        const fileUploaded = file;
          let formdata = new FormData();
          formdata.append('candidatId', props?._id)
          formdata.append('document', fileUploaded)
          formdata.append('folderName', UploadName)
          axiosInstance.post("uploadCandidatDocuments", formdata, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": "Bearer " + localStorage.getItem('token')
            },
            onUploadProgress: data => {
              //Set the progress value to show the progress bar
              setProgress(Math.round((100 * data.loaded) / data.total))
            },
          })
          .then(resData => {
            if (resData.data.status) {
                setDeleteStatus(true)
              setProgress(0); 
              notifyDocumentUploadSuccess();
            } else {
              setDocUploaded(false);
            }
          })
          .catch(err => {
            console.log(err)
            setDocUploaded(false);
      
          })
        return;
      }
      


      const deleteCandidatDocument = async (docId: any, docName: any, candidatId: any) => {
        let headers = {
          "Accept": 'application/json',
          "Authorization": "Bearer " + localStorage.getItem('token')
        }
        return await fetch(API_BASE_URL + `deleteDocument/?documentId=${docId}&documentName=${docName}&candidatId=${candidatId}`, {
          method: "GET",
          headers: headers
        })
          .then(reD => reD.json())
          .then(resD => resD)
          .catch(err => err)
      }
      const deleteDocument = async (docId: any, docName: any) => {
        await deleteCandidatDocument(docId, docName, profile._id).then(resData => {
          if (resData.status) {
            notifyDocumentDeleteSuccess()
            setDocumentList([...documentList.filter((docN) => (docN.documentName !== resData.doc))])
          } else {
            notifyDocumentDeleteError()
          }
        }).catch(err => {
          console.log(err)
        })
      }


      const  ViewDownloadFiles =( documentName:any)=>{
        window.open(documentName)
       }
      



    //     Link     //

       
 let Data={
    candidatId:props._id,
    link:DriveLink,
    folder:UploadName
  }as any
  
   const LinktoDrive = async (updatedData: any) => {
    console.log(updatedData)
    let headers = {
      "Accept": 'application/json',
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + localStorage.getItem('token')
    }
    return await fetch(API_BASE_URL + "addCandidatLink", {
      method: "POST",
      headers: headers,
      body:JSON.stringify(updatedData),
    })
      .then(reD => reD.json())
      .then(resD => resD)
      .catch(err => err)
  }
  
   const onDriveLinkChange=(e)=>{
    if(e.target.name =="inputDrive"){
      setDriveLink(e.target.value)
      
    }
    
    if(e.target.name =="DriveLinkSubmit"){
      let Check = isValidUrl(DriveLink)
      if(Check){
        // setLinkDoc([...Links])
        LinktoDrive(Data).then((resD)=>{toast.success(resD.message);setDeleteStatus(true)})
      }else{
        return toast.error("Please Enter Valid Url!")
      }
     
      
  
      console.log(isValidUrl(DriveLink));
    }
  }
      // const urlPattern = new RegExp(DriveLink);
  const isValidUrl = urlString=> {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
  return !!urlPattern.test(urlString);
  }
    
  
  const deleteCandidatLink = (Id : any) => {
    let Data={
      candidatId:profile._id,
     linkId:Id,
    }
       let headers = {
         "Accept": 'application/json',
         'Content-Type': 'application/json',
         "Authorization": "Bearer " + localStorage.getItem('token')
       }
      fetch(API_BASE_URL + "removeCandidatLink", {
         method: "POST",
         headers: headers,
         body: JSON.stringify(Data),
       })
         .then(reD => reD.json())
         .then(resD =>{toast.success(resD.message);setDeleteStatus(true)})
         .catch(err => toast.error("Link Not Removed! Please Try Again in few minutes."))
     };
  
  
  
    return(
        <>
          <div className="col-12 Social-Card mt-1">
             <div className="row px-1 pt-1 pb-0">
             <div className="col-4 d-flex align-items-center  px-0">
              <div className="d-flex">  <p className="DocShareLink mb-0">
                   Share this link with the client <br />
                    Patager ce lien avec le client
                  </p><div className="d-flex justify-content-center align-items-center " style={{paddingLeft:"5px"}}> <Share width={25} /><b className="pl-1"> :</b></div></div>  
                </div>
                <div className="col-8 DocShareLinkBackground p-1 pl-0">
                <Link
                    className="LinkStyling"
                    to={`/candidateDocumentbox/${props?.candidatName}/${props?._id}`}
                    target="_blank"
                  >
                   
                    {API_BASE_URL +
                      `candidateDocumentbox/${props?.candidatName.replaceAll(
                        " ",
                        "%20"
                      )}/` +
                      props._id}
                  </Link>
                </div>
                <div className="col-12 my-2 px-0">
                  <Tabs
                    activeTab={activeTab}
                    onTabClick={onTabClick}
                    rightBtnIcon={">"}
                    hideNavBtns={false}
                    leftBtnIcon={"<"}
                    showTabsScroll={false}
                    tabsScrollAmount={2}
                  >
                    {/* generating an array to loop through it  */}
                    {tabItems.map((el, i) => (
                      <Tab key={i}>{el.text}</Tab>
                    ))}
                  </Tabs>
                </div>
                <div className="row pt-0 pb-1" style={{ marginRight: '1px' }}>
                    {
                      documentList.length > 0  ?
                        documentList.map((doc, index) =>
                        doc.originalName ?
                          <div className="col-6 mx-0">
                            <div className="row CardClassDownload mt-1 mx-0">
                              <div className="col-4 d-flex align-items-center ">
                                <p className="download-font mb-0">{doc.originalName}</p>
                              </div>
                              <div className="col-6 text-center">
                                {/* {progress > 0 && progress < 100  ?
                                  <ProgressBar className="mt-1" now={progress} label={`${progress}%`} />
                                  :
                                  <button className="btnDownload">
                                    <img src={require("../../images/dowBtn.svg").default} />
                                    {doc.originalName.length > 10 ? doc.originalName.slice(0, 11) + "..." : doc.originalName}
                                  </button>
                                } */}
                                     <button className="btnDownload" onClick={()=>ViewDownloadFiles( doc.url)}>
                                    <img src={require("../../images/dowBtn.svg").default} />
                                    {doc.originalName.length > 10 ? doc.originalName.slice(0, 11) + "..." : doc.originalName}
                                  </button>
                              </div>
                              <div className="col-2  d-flex align-item-end justify-content-end">
                                <img
                                  src={require("../../images/editSvg.svg").default}
                                  style={{ width: "20px", marginRight: "5px", cursor: 'pointer' }}
                                  // onClick={() => renameDocument(doc._id, doc.documentName)}
                                  onClick={()=>{setRenameDocStatus(true);renameDocument(doc._id, doc.documentName,doc.originalName)}}
                                />
                                <img
                                  src={require("../../images/Primaryfill.svg").default}
                                  style={{ width: "20px", cursor: 'pointer' }}
                                  onClick={() => deleteDocument(doc._id, doc.documentName)}
                                />
                              </div>
                            </div>
                          </div>
                          :
                          null
                        ) :
                        progress > 0 && progress < 100 && documentList.length == 0?
                        <div className="col-6 mx-0">
                        <div className="row CardClassDownload p-0 mt-1 mx-0">
                          <div className="col-4 pr-0 d-flex align-items-center ">
                        <ProfileLoader width={"90"} height={"56px"} fontSize={"12px"} fontWeight={600} Title={"Uploading!"}/>
                          </div>
                          <div className="col-6 text-center  mb-0" style={{marginTop:"21px"}}>
                              <ProgressBar className="mb-0" now={progress} label={`${progress}%`} />
                          </div>
                          <div className="col-2  d-flex align-item-end justify-content-end">
                            <img
                              src={require("../../images/editSvg.svg").default}
                              style={{ width: "20px", marginRight: "5px", cursor: 'pointer' }}
                              // onClick={() => renameDocument(doc._id, doc.documentName)}
                            />
                            <img
                              src={require("../../images/Primaryfill.svg").default}
                              style={{ width: "20px", cursor: 'pointer' }}
                              // onClick={() => deleteDocument(doc._id, doc.documentName)}
                            />
                          </div>
                        </div>
                      </div>
                      :  
                      ListLink.length > 0 ? 
                      null 
                      :
                      <div className="d-grid  justify-content-center align-items-center mb-0">
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
                        {UploadTextBtn} file not Uploaded Yet
                      </p>
                    </div>
   
                    }
                        <>
                    {
                      ListLink.map((Link, index) => (
                        ListLink.length > 0 ?
                       
                          <div className="col-6 mx-0">
                            <div className="row CardClassDownload mt-1 mx-0">
                            <div
                              className="col-4 d-flex align-items-center cursor-pointer"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title={Link.link}
                            >
                              <p className="download-font mb-0">
                                {Link.displayName ? Link.displayName: Link.link.length > 30
                                  ? Link.link.slice(0, 28) + "..."
                                  : Link.link}
                              </p>
                            </div>
                            <div className="col-6 text-center">
                              {/* {progress > 0 && progress < 100  ?
                                    <ProgressBar className="mt-1" now={progress} label={`${progress}%`} />
                                    :
                                    <button className="btnDownload">
                                      <img src={require("../../images/dowBtn.svg").default} />
                                      {Link.originalName.length > 10 ? Link.originalName.slice(0, 11) + "..." : Link.originalName}
                                    </button>
                                  } */}
                              <button
                                name="btnDownloadLink"
                                className="btnDownload"
                                onClick={(e) =>
                                  ViewDownloadFiles(Link.link)
                                }
                              >
                                <img
                                  src={require("../../images/dowBtn.svg").default}
                                />
                                {Link.link.length > 10
                                  ? Link.link.slice(0, 11) + "..."
                                  : Link.link}
                              </button>
                            </div>
                            <div className="col-2  d-flex align-item-end justify-content-end">
                            <img
                                  src={require("../../images/editSvg.svg").default}
                                  style={{ width: "20px", marginRight: "5px", cursor: 'pointer' }}
                                  // onClick={() => renameDocument(doc._id, doc.documentName)}
                                  onClick={()=>{setRenameDocStatus(true);renameDocument(Link._id,Link.link,"LinkEdit")}}
                                />
                              <img
                                src={
                                  require("../../images/Primaryfill.svg").default
                                }
                                style={{ width: "20px", cursor: "pointer" }}
                                onClick={() =>
                                  deleteCandidatLink(Link._id)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        
                      
                      :
                      null
                      )
                      )
                     }
                    
                    </>
    {progress > 0 && progress < 100 && documentList.length > 0 ?
                        <div className="col-6 mx-0">
                        <div className="row CardClassDownload p-0 mt-1 mx-0">
                          <div className="col-4 pr-0 d-flex align-items-center ">
                        <ProfileLoader width={"90"} height={"56px"} fontSize={"12px"} fontWeight={600} Title={"Uploading!"}/>
                          </div>
                          <div className="col-6 text-center  mb-0" style={{marginTop:"21px"}}>
                              <ProgressBar className="mb-0" now={progress} label={`${progress}%`} />
                          </div>
                          <div className="col-2  d-flex align-item-end justify-content-end">
                            <img
                              src={require("../../images/editSvg.svg").default}
                              style={{ width: "20px", marginRight: "5px", cursor: 'pointer' }}
                            />
                            <img
                              src={require("../../images/Primaryfill.svg").default}
                              style={{ width: "20px", cursor: 'pointer' }}
                            />
                          </div>
                        </div>
                      </div>
                        :
                      
                 null 
                  

                          }
                         <div className="col-12 d-flex justify-content-center mt-2" >
                
                <img src={require("../../images/resume.svg").default} />
           
         
                <FileUploader 
                handleChange={FilesUploads}
                name="candidatDocuments"
                label={`Upload ${UploadTextBtn} file Now`}
                />
         
            </div>
                                        
              
                  </div>
              </div>    {
                            RenameDocStatus? 
                            <RenameDoc  props={RenameData} closepreModal={setRenameDocStatus} status={setDeleteStatus} />
                            :
                            null
                          } 

             </div>
             <div
              className="col-12 Social-CardClient mb-1 mt-1"
              style={{ padding: "13px 26px" }}
            >
              <div className="row">
             <div className="col-3 px-0" style={{fontFamily: 'Poppins',
fontStyle: "normal",
fontWeight: "500",
fontSize: "14px",
lineHeight: "21px",
color: "#000000",
display:"flex",
alignItems:"center"}}><p className="mb-0">ORADD AN EXTERNAL LINK 
(GOOGLE DRIVE) :</p></div>
             <div className="col-5 px-0"><input name="inputDrive" placeholder="WWW.XXXXXX.COM" onChange={onDriveLinkChange} style={{background:"#D3D6DB",borderRadius:"20px",width:"100%",height:"100%",border:"0px",paddingLeft:"10px",paddingRight:"10px",fontFamily: 'Poppins',
fontStyle: "normal",
fontWeight: "500",
fontSize: "14px",}} /></div>
             <div className="col-4"><button name="DriveLinkSubmit" onClick={(e)=>{onDriveLinkChange(e)}} className="LinkAsDocument">add this link as document</button></div>
             </div>
              </div>
        
        </>
    )
}
export default PDFBoxCandidate;