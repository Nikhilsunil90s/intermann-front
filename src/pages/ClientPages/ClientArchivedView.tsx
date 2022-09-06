import React,{useState,useEffect} from "react";
import {Link} from "react-router-dom"
import StarRatings from 'react-star-ratings';
import "../../CSS/Client/ClientSeepage.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UploadDow from '../../components/Modal/SelectUploadDownload'
import Switch from "react-switch";
import {ReactComponent as Empty} from "../../images/emptyStar.svg";
import {ReactComponent as StarRating} from "../../images/RatingStar.svg";
import axios from "axios";
import { Toaster, toast } from 'react-hot-toast';
import { ProgressBar } from "react-bootstrap";
import ProfileLoader from "../../components/Loader/ProfilesLoader";
import RenameDoc from '../../components/Modal/RenameDoc_ModalClient'
import ReadMoreReact from 'read-more-react';
import PreModalClient from "../../components/Modal/preSelectedModalForClient"
import { API_BASE_URL } from "../../config/serverApiConfig";
import CLintHide from "../../components/Modal/HideClientProfile"
import ClientREST from "../../components/Modal/ClientREStProfile"
import PDFModalClient from "../../components/Modal/PDFGenerateclientModal"
import moment from 'moment'


let RenameData=[]
function ArchivedViewPage(){
  const { state } = useLocation();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<any>(state)
  const [UploadBtn,setSelectUpload]= useState(false)
  const hiddenImageInput = React.useRef(null);
  const [candidatDocument, setCandidatDocument] = useState("");
  const [progress, setProgress] = useState<any>(0);
  const [docUploaded, setDocUploaded] = useState(false);
  const [documentList, setDocumentList] = useState([]);
  const [ClientImage, setClientImage] = useState(profile.clientPhoto && profile.clientPhoto?.documentName !== undefined ? profile.clientPhoto?.documentName : "");
  const hiddenFileInput = React.useRef(null);
  const [RenameDocStatus,setRenameDocStatus]=useState(false)
  const [showPreSelectedModal, setShowInPreSelectedModal] = useState(false);
  const [PreSelectedData,setPreSelected]=useState([])
  const [HideProfile,setHideProfile]=useState(false)
  const [RESTprofile,setREStProfile]=useState(false)
  const [PDFModal,setPDFModal]=useState(false)

  const datenow=moment().format('YYYY-MM-DD')
    
  let date = new Date(datenow);

 let start = new Date(profile.jobStartDate);
 let end = new Date(profile.jobEndDate);
 
 useEffect(()=>{
  setProfile(state)
},[state])

  const candidatImportanceIcons = [{ icon:<><StarRating  style={{marginRight:"3px",width:"100%"}} /> <Empty  style={{marginRight:"3px",width:"100%"}} /> <Empty  style={{marginRight:"3px",width:"100%"}} /> <Empty  style={{marginRight:"3px",width:"100%"}} /> <Empty  style={{marginRight:"3px",width:"100%"}} /></>}, {icon:<><StarRating  style={{marginRight:"3px",width:"100%"}} /><StarRating  style={{marginRight:"3px",width:"100%"}} /> <Empty  style={{marginRight:"3px",width:"100%"}} /> <Empty  style={{marginRight:"3px",width:"100%"}} /> <Empty  style={{marginRight:"3px",width:"100%"}} /></>}, {icon:<><StarRating  style={{marginRight:"3px",width:"100%"}} /> <StarRating  style={{marginRight:"3px",width:"100%"}} /> <StarRating  style={{marginRight:"3px",width:"100%"}} /> <Empty  style={{marginRight:"3px",width:"100%"}} /> <Empty  style={{marginRight:"3px",width:"100%"}} /></>}, {icon:<><StarRating   style={{marginRight:"3px",width:"100%"}} /> <StarRating style={{marginRight:"3px",width:"100%"}}/> <StarRating style={{marginRight:"3px",width:"100%"}} /> <StarRating style={{marginRight:"3px",width:"100%"}} /> <Empty style={{marginRight:"3px",width:"100%"}} /></>}, {icon:<><StarRating  style={{marginRight:"3px",width:"100%"}} /><StarRating  style={{marginRight:"3px",width:"100%"}} /> <StarRating  style={{marginRight:"3px",width:"100%"}} /> <StarRating  style={{marginRight:"3px",width:"100%"}} /> <StarRating  style={{marginRight:"3px",width:"100%"}} /></>}]; 

  const candidatMotivationIcons = [{ icon:"😟", motivation: 'Disappointed' }, { icon:"🙁", motivation: 'Not Really' }, { icon:"😊", motivation: 'Like' }, { icon:"🥰", motivation: 'Great' }, { icon:"😍", motivation: 'Super Lovely' }];
  const handleImageChange = (val) => {
    if (val === 'upload') {
      console.log("upload")
      handleImageUpload()
    }  if (val === 'Download') {
      console.log("download")
      window.open(API_BASE_URL +"uploads/"+ ClientImage);
    }
  }
  const handleImageUpload = () => {
    hiddenImageInput.current.click();
  }

  const editClientProfile = () => {
    navigate("/clientInProgressEdit", { state: profile });
  }


   // DOC Upload //\

   const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
  })
  // NOTIFY // 

  const notifyDocumentUploadError = () => toast.error("Document Upload Failed! Please Try Again in few minutes.")
  const notifyDocumentDeleteError = () => toast.error("Document Not Removed! Please Try Again in few minutes.")

  const notifyDocumentUploadSuccess = () => toast.success("Document Uploaded Successfully!");
  const notifyDocumentDeleteSuccess = () => toast.success("Document Removed Successfully!");
 
  //END //


  const renameDocument = (docId: any, docName: any ,originalName:any) => {
    // setRenameDoc(true);

    RenameData=[
      docId,
      docName,
      profile._id,
      originalName
    ]
    // renameCandidatDocument(docId, docName, profile._id).then(resData => {
    //   console.log(resData)
    //   setRenameDoc(false);
    // }).catch(err => {
    //   console.log(err)
    // })
  }


  const fileChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | any
    >
  ) => {
    if (e.target.name === 'clientPhoto') {
      console.log(e.target.files,"e.target.files")
      console.log(e.target.files[0],"e.target.files[]")
      const fileUploaded = e.target.files[0]
      let formdata = new FormData();
      formdata.append('clientId', profile._id)
      formdata.append('image', fileUploaded)
      axiosInstance.post("uploadClientImage", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": "Bearer " + localStorage.getItem('token')
        }
      })
        .then(datares => {
          console.log(datares)
          if (datares.data.status) {
            
    //  setClientImage(datares.data.filename)
     notifyDocumentUploadSuccess()

     
            setTimeout(()=>{
              window.location.href = "/archivedClientSeeprofile"
            },2000)
          } else {
            notifyDocumentUploadError()
          }
        })
        .catch(err => { console.log(err) })
      return;
    }
    if (e.target.name === 'clientDocuments') {
      const fileUploaded = e.target.files[0];
      setCandidatDocument(fileUploaded)
      let formdata = new FormData();
      formdata.append('clientId', profile._id)
      formdata.append('document', fileUploaded)
      axiosInstance.post("uploadClientDocuments", formdata, {
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
          console.log(resData.data.status,"resData.data.status")
          if (resData.data.status) {
            console.log(resData.data,"resData")
            setDocUploaded(true);
            setProgress(0); 
            notifyDocumentUploadSuccess();
          } else {
            console.log(resData)
            setDocUploaded(false);
          }
        })
        .catch(err => {
          console.log(err)
          setDocUploaded(false);

        })
      return;
    }
  }

  useEffect(() => {
    console.log(profile._id,"id")
    console.log(documentList,"doc")
    fetchCandidat(profile._id).then(resData => {
      console.log(resData)

      if (resData.status == true) {
        resData.data.map((el)=>{
          setDocumentList(el.clientDocuments)
        })
       
        // setClientImage(resData.data.candidatPhoto !== undefined ? resData.data.candidatPhoto?.documentName : "")
        setDocUploaded(false);
      } else {
        setDocumentList([...documentList])
        setDocUploaded(false);
      }
    })
      .catch(err => {
        console.log(err)
      })
  }, [docUploaded])
 
  console.log("doc",documentList)

  const  ViewDownloadFiles =( documentName:any)=>{
    window.open(API_BASE_URL + "uploads/" + documentName)
   }


   const fetchCandidat = async (clientId: any) => {
    return await fetch(API_BASE_URL + `getClientById/?clientId=${clientId}`, {
      method: "GET",
      headers: {
        "Accept": 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
    })
      .then(resp => resp.json())
      .then(respData => respData)
      .catch(err => err)
  }


   const handleFileUpload = () => {
    hiddenFileInput.current.click();
  }

  // const removeRecommendation = (rId: any) => {

  //   console.log(recommendations);
  //   let filteredRecommendations = recommendations.filter((recomm) => {
  //     return recomm._id !== rId;
  //   })
  //   console.log(filteredRecommendations)
  //   setRecommendations([...filteredRecommendations])
  //   setLoader(true);
  // }

  const deleteDocument = async (docId: any, docName: any) => {
    await deleteCandidatDocument(docId, docName, profile._id).then(resData => {
      console.log(resData);
      if (resData.status) {
        notifyDocumentDeleteSuccess()
        setDocumentList([...documentList.filter((doc) => {
          return doc.documentName !== docName
        })])
      } else {
        notifyDocumentDeleteError()
      }
    }).catch(err => {
      console.log(err)
    })
  }


  

 const deleteCandidatDocument = async (docId: any, docName: any, clientId: any) => {
  let headers = {
    "Accept": 'application/json',
    "Authorization": "Bearer " + localStorage.getItem('token')
  }
  return await fetch(API_BASE_URL + `deleteClientDocument/?documentId=${docId}&documentName=${docName}&clientId=${clientId}`, {
    method: "GET",
    headers: headers
  })
    .then(reD => reD.json())
    .then(resD => resD)
    .catch(err => err)
}

console.log(ClientImage,"img")


  //END //


    return(
      <>
    <Toaster position="top-right" containerStyle={{zIndex:"9999999999999999999999"}}  />
      <div className="container-fluid " >
        <div className="row  mt-1">
          <div className="col-12 top-pd mt-2">
            {/* <div className="col-12 top-pd text-center">
              <h1 style={{ textDecoration: 'underline' }}>CLIENT FILE: {profile.clientCompanyName}</h1>
            </div> */}
          <div className="row">
          <div className="col-8">
            <div className="stable">
              <Link to="/clientProgress">
                <button type="button" className="btn FontStyle-TODOSEE">
                  <img src={require("../../images/return.svg").default} />
                  Client File : {profile.clientCompanyName.toLocaleUpperCase()}
                </button>
              </Link>
            </div>
          </div>
          <div className="col-4  d-flex align-items-center justify-content-end text-end pr-2">
            {/* <Link to="/clientInProgressEdit"> */}
              <button className="btn btn-bgbClient" onClick={()=>editClientProfile()}>
                <img src={require("../../images/Edit.svg").default} />
                Edit Profile
              </button>
            {/* </Link> */}
          </div>
          </div>
          </div>
          <div className="px-0">
          <div className="col-12 my-1 py-1 ClientSEE-TopDetails">
              <div className="row">
                <div className="col-2 pr-0 text-center">
              <div className="">
            {
              ClientImage !=="" ?
              <img
              src={API_BASE_URL + "uploads/" +ClientImage}
             className="imgArchived-upload-download"

            />

            :
            <img
            src={require("../../images/fullClientSee.svg").default}
           className="imgArchived-upload-download"

          />

            }
                  </div>
      
<button
 onClick={()=>{setSelectUpload(!UploadBtn);}}
className="SelectBtn"
 ><img className="" src={require("../../images/select.svg").default} />
 {
  UploadBtn? 
  <UploadDow closeModal={setSelectUpload}  FunModal={handleImageChange} />
  :
  null
 }
  </button>
<input
                    type="file"
                    ref={hiddenImageInput}
                    onChange={fileChange}
                    name="clientPhoto"
                    style={{ display: 'none' }}
                  />
                  </div>

                {/* <button type="button" className="btn btn-upload">
                    UPLOAD PHOTO
                  </button> */}
                <div className="col-6 ClientSEEPtags">
                <div className="d-flex">
                    <p>
                    Company : {profile.clientCompanyName.toLocaleUpperCase()}|{profile.candidatAge ? profile.candidatAge : "No "}
                    </p>
                    <span className="card-xlSpan">(Age)</span>
                  </div>
                  <p>Number of Positions :{profile.numberOfPosts ? profile.numberOfPosts : "No Posts!"}</p>

                  <p>Secteur : {profile.clientActivitySector ? profile.clientActivitySector : "No Sector"}</p>
                  <p>Métier/Job : {profile.clientJob ? profile.clientJob : "No Job!"}</p>
                  <p style={{ width: "120%" }}>
                    Contact Name : {profile.clientReferenceName ? profile.clientReferenceName.toLocaleUpperCase() : "No Contact Name!" }
                  </p>
                </div>
                {/* <div className="col-4 text-end end-class d-grid justify-content-center align-items-center"> */}
                <div className="col-4 d-grid align-items-center">
                  <div className="text-end ">
                  <div className="d-grid justify-content-end align-items-center">
                  <button className="ArchiveLargebtn pb-1 p-0"><img src={require("../../images/ArchivedBtn.svg").default} /></button>
                  </div>
               <div className="Lead-encore">
                  <p className="mb-0  pt-1">
                  Lead en recherche active
                  </p>
                  <p className="TODOclientChild">Nous recehrchons activement </p>
                  </div>
                  </div>
                {/* </div> */}
                </div>
              </div>
            </div>
        
            <div className="col-12 pt-1 py-0 mb-1">
              <div className="row justify-content-between">
                <div
                  className="col-xxl-5 col-xl-5 col-md-5 col-lg-5 Social-Card text-center p-1 Social-cardDiv"
                  style={{ maxWidth: "49%" }}
                >
                  <div className="d-flex">
                  <p className="Span-StylingClient text-start pt-2 pb-1 my-1">
                  {profile.clientEmail ? "Company Mail :" + profile.clientEmail : null}
                  </p>
                  </div>
                  {
                    profile.clientEmail ?
                    <button className="btn-TODOgmail">
                    <a
                      href="https://accounts.google.com/"
                      className="text-dark fw-bold"
                      target="_blank"
                    >
                      <span className="padding-email">
                        <img style={{width:"8%"}}  src={require("../../images/gmail.svg").default} />
                      </span>
                      Send Email
                    </a>
                  </button>
                  :
               null
                  }
                 
                  <div className="d-flex">
                  <p className="Span-StylingClient text-start pt-2 pb-1 my-1"> {profile.clientEmail ?"Contact :" + profile.clientEmail : null}</p></div>
               
               {
                profile.clientEmail ?
                <a
                href={profile.clientEmail}
                target="_blank"
                className="btn  fw-bold btn-TODOgmail"
              >
                <span className="padding-email">
                  <img
                    src={require("../../images/gmail.svg").default}
                  />
                </span>
                Send Email
              </a>

              :
             null
               }
                

                  <div className="d-flex">
                  <p className="Span-StylingClient text-start pt-2 pb-1 my-1">
                   {profile.clientPhone ? "Company Phone :" + profile.clientPhone : null}
                  </p>
                  </div>
                  {
                    profile.clientPhone ?
                    <a
                    href={`https://wa.me/${profile.clientPhone}`}
                    target="_blank"
                  >
                <button className="btn-whatsapp my-1">
              
                    <span className="padding-email">
                      <img
                        style={{ width: "8%" }}
                        src={require("../../images/whatsapp.svg").default}
                      />
                    </span>
                    Send What’s App
                </button>
                </a>
:
null
                  }


                  <div className="d-flex">
                  <p className="Span-StylingClient text-start pt-2 pb-1 my-1">
                   {profile.clientReferenceNumber ? "Contact Phone :" + profile.clientReferenceNumber : null}
                  </p>
                  </div>
                  {
                  profile.clientReferenceNumber !=""  ? 
                    <a
                    href={`https://wa.me/${profile.clientReferenceNumber}`}
                    target="_blank"
                  >
                <button className="btn-whatsapp my-1">
 
                    <span className="padding-email">
                      <img
                        style={{ width: "8%" }}
                        src={require("../../images/whatsapp.svg").default}
                      />
                    </span>
                    Send What’s App
                </button>
                </a>

                :
               null

                  }
          

                </div>
                <div
                  className="col-xxl-8 col-xl-8 col-lg-8 col-md-7 Social-Card p-1 detailsCardClientSee scrollbar Social-btnS"
                  id="style-3"
                  style={{ maxWidth: "49%", }}
                >
                  <div className="Todo-ClinetCardMore force-overflow">
                  <div className="d-flex">
                    <div className="d-flex" >
                  
                  <p className="CompanyAddres">Company Adress 
                  </p> 
                  
                  <span className="Todo-ClinetCardMore-span">:{profile.clientAddress ? profile.clientAddress :"No Address!"}</span>
                 
                   </div>
               
                </div>
                <div className="d-flex align-items-center ">
                      <p className="blue-text">Ready for work :</p>
                      <span className="bluetextCardSee"style={{ color: date >= start && date <= end  ? "#3F76E2" : "#ca1313"}}>{date >= start && date <= end  ? profile.jobStartDate  + "  To  " + profile.jobEndDate :   "⚠️" + profile.jobStartDate +  "  To  "  + profile.jobEndDate}
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <p>Langues : </p>
                      <span className="Todo-ClinetCardMore-span">  {profile.clientLanguages.length
                            
                            ? profile.clientLanguages.join(", ")
                            : "No Langues!"} </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <p>Voyage en voiture :</p>
                      <span className="Todo-ClinetCardMore-span">
                        {profile.candidatConduireEnFrance ? "Yes" : "No"}
                      </span>
                    </div>
                   
                    <div className="d-flex">
                      <p className="ClientN">Client Note:</p>
                      <span  className="Todo-ClinetCardMore-span" style={{textDecoration:"none",width:"390px"}}>{profile.clientRequiredSkills != "" ? profile.clientRequiredSkills : "Not Available!"}</span> 
                      
                    </div>
                    <div className="d-flex align-items-center">
                  <p className="text-dark">Potential Turnover CA</p>
                 <span className="Todo-ClinetCardMore-span">
                    :  {profile.jobTotalBudget!=null ? profile.jobTotalBudget +"€" : "No Budget!"} 
                  </span>
                </div>
                <div className="d-flex align-items-center">
                      <p className="text-dark">Salary by person </p>
                      <span className="Todo-ClinetCardMore-span">
                        : {profile.salary_hours.length !=0 ? profile.salary_hours.map((el)=>{return el.salaryPerHour}).slice(0,1) :"No Salary"} €
                      </span>
                    </div>
                    <div className="d-flex ">
                      <p className="text-dark">Salaire net du salarié  :  </p>
                      <span className="Todo-ClinetCardMore-span">
                       
                       {
                       profile.salary_hours.length !== 0? 
                       profile.salary_hours.map((el)=>(
                        <div className="d-flex">
                            {el.hours}H =    <span>{el.hours * el.salaryPerHour + "€"}</span>
                        </div>
                   
                      )
                      )
                      :
                      "No Salaire!" }
                      </span>
                    </div>
                    <div className="d-flex ">
                      <p className="text-dark">Taux horraire :</p>
                      <span className="Todo-ClinetCardMore-span">
                      {
                       profile.rate_hours.length !== 0? 
                       profile.rate_hours.map((el)=>(
                        <div className="d-flex">
                             {el.hours}H  =   <span>{el.hours * el.ratePerHour + "€"}</span>
                        </div>
                   
                      )
                      )
                      :
                      "No horraire!" }
                      </span>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>


            <div className="col-12 ArchivedBoxAds">
              <div className="row py-2">
                <div className="col-6 ">
                  <p className="StylingArchivedAds mb-0">Ads Spent on this client : {profile.jobTotalBudget}</p>
                </div>
                <div className="col-12">
                  <p className="StylingArchivedAdss">WHY THIS LEAD/CLIENT HAVE BEEN ARCHIVED : {profile.clientArchived.reason} </p>
                </div>
              </div>
            </div>

              {/* <div className="col-12 pt-4">
                <div className="row">
                  <div className="col-5 pdf-btn">
                    <img src={require("../../images/doc.svg").default} />
                    <span>Add document about this client </span>
                  </div>
                </div>
              </div> */}
              {/* <div className="col-12"> */}
                {/* <div className="row">
                  <div className="col-6 mb-3">
                    <p className="poppins">
                      Par exemple : Contrat signé; Offre signé.... 
                    </p>
                    <span className="poppins">
                      PDF; Word; PNG; Excel etc ......
                    </span>
                  </div>
                </div>
              </div> */}
                    <div className="col-12 Social-CardClient my-1 p-1">
              <div className="row">
                <div className="col-6">
                <div className="ClientFontMotivationsStyling">
                    
                
                  {/* <p>
                    Importance:
                    <StarRatings
                      rating={profile.clientImportance}
                      starRatedColor="#ffc107"
                      // changeRating={}
                      numberOfStars={profile.clientImportance}
                      starDimension={"19px"}
                      starSpacing={"1px"}
                      name="rating"
                    />
                  </p> */}
<p  className="d-flex align-items-center mb-0" style={{height:"30px", background:"transparent"}}>Importance :
                             <b className="d-flex align-items-center" style={{width:"25%",marginLeft:"5px"}}>{candidatImportanceIcons[profile.clientImportance - 1]?.icon ? candidatImportanceIcons[profile.clientImportance - 1]?.icon : "No Importance" }</b>

                        </p>
                        <p  className="mb-0 pt-1" style={{width:"130%"}}>Motivation :
                             <b style={{background:"transparent" , zIndex:"9999"}}>{candidatMotivationIcons[profile.clientMotivation - 1]?.icon + " " + candidatMotivationIcons[profile.clientMotivation - 1]?.motivation ? candidatMotivationIcons[profile.clientMotivation != 0 ? profile.clientMotivation  - 1 :  profile.clientMotivation ]?.icon + " " + candidatMotivationIcons[profile.clientMotivation !=0 ? profile.clientMotivation - 1 : profile.clientMotivation ]?.motivation : "No Motivation!"}</b>
                        </p>
               
                <div className="d-flex align-items-center">
                  <p style={{ marginBottom: "0px" }}>Ajouté par/Added by :</p>
                  <span className="ClientFontMotivationsStylingS" style={{ marginBottom: "0px" }}>
                    {profile.enteredBy}
                  </span>
                </div>
                <div >
                  <p className="clientNote">Note : Who entred this lead on the database</p>
                </div>
              </div>
              </div>
              <div className="col-6 d-flex  justify-content-end align-items-center">
                <button className="pdf-btn" onClick={handleFileUpload}>
                    <img src={require("../../images/doc.svg").default} className="docImg" />
                    <span>Add document about this client </span>
                    </button>
                  </div>
                  <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={fileChange}
                    name="clientDocuments"
                    style={{ display: 'none' }}
                  />
              </div>
              </div>
              <div className="col-12 Social-CardClient p-1">
                <div className="row">
              
                <div className="col-3  text-center">
                     <button className="hideProfile" onClick={()=>setHideProfile(true)}>
                    <img src={require("../../images/visibility.svg").default} />
                      Hide this profile</button>
                      <p className="italic-fontStyle text-center">Profile will be not deleted but hidded</p>
                </div>
                <div className="col-3 text-center">
                     <button className="restProfile" onClick={()=>setREStProfile(true)}>
                    <img src={require("../../images/rest.svg").default} />
                    Reset this profile</button>
                    <p className="italic-fontStyle text-center">Profile will be reset to todo stage</p>
                </div>
                <div className="col-4 text-center">
                  <button
                    type="button"
                    className="btn btn-careerClient"
                    onClick={(e)=>setPDFModal(true)}
                  >
                    <span>
                      <img
                        style={{ paddingRight: "10px" }}
                        src={require("../../images/doc.svg").default}
                      />
                    </span>
                    Générér un contrat
                  </button>
                  <p style={{ width: "106%" }} className="btn-Down text-center">
                  Créer un contrat avec le logiciel CRM
                  </p>
                </div>
                  
                  </div>
                  
            
                
                  
                      
                  
                  </div>
                  <div className="col-12 Social-CardClient mt-1 ">
                       
                         
                       <div className='row p-1' >
                         <div className='col-4  d-grid '>
                             <label className="ClientPDFFormlabel">$ numero contrat</label>
                             <input className='form-control inputStyling'  name='lieu_mission'  placeholder="‎ ‎ ‎ $ numero contrat" />
                         </div>
                         <div className='col-4  d-grid ' >
                         <label className="ClientPDFFormlabel">$ initial Société client</label>
                         <input className='form-control inputStyling' name='duree_mission'   placeholder="‎ ‎ ‎ $ initial Société client" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ siret </label>
                         <input className='form-control inputStyling' name='duree_hebdomadaire_mission'  placeholder="‎ ‎ ‎$ siret"/>

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ numero TVA</label>
                         <input className='form-control inputStyling'  name='candidatJob' placeholder="‎ ‎ ‎ $ numero TVA" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ nom gérant</label>
                         <input className='form-control inputStyling'   name='cmp_candidat'  placeholder="‎ ‎ ‎ $ nom gérant" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ telephone gerant</label>
                         <input className='form-control inputStyling'   name='contract_date'  placeholder="‎ ‎ ‎ $ telephone gerant" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ metier en Roumain</label>
                         <input  className='inputStyling wHCompany form-control' name='company_contact_name'  placeholder="‎ ‎ ‎ $ metier en Roumain" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ metier en Français</label>
                         <input className='form-control inputStyling'  name='$ metier en Français'  placeholder="‎ ‎ ‎ $ metier en Français" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ date du debut de mission</label>
                         <input className='form-control inputStyling'  name='serie_id'  placeholder="‎ ‎ ‎ $ date du debut de mission" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ date de fin de mission</label>
                         <input className='form-control inputStyling'  name='candidatAddress'   placeholder="‎ ‎ ‎ $ date de fin de mission" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ prix en euro / heure selon contract</label>
                         <input className='form-control inputStyling'  name='company_siret'  placeholder="‎ ‎ ‎ $ prix en euro / heure selon contract" />

                         </div>


                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ SALAIRE EN EURO</label>
                         <input className='form-control inputStyling' name='SALAIRE EN EURO'  placeholder="‎ ‎ ‎ $ SALAIRE EN EURO" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ nombre d'heure négocie dans le contrat</label>
                         <input className='form-control inputStyling'  name='candidatAddress'  placeholder="‎ ‎ ‎ $ nombre d'heure négocie dans le contrat" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ numero de tel du travailleur 1</label>
                         <input className='form-control inputStyling'   name='company_siret'  placeholder="‎ ‎ ‎ $ numero de tel du travailleur 1" />

                         </div> <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ nom du travailleur 2 </label>
                         <input className='form-control inputStyling' name='serie_id'  placeholder="‎ ‎ ‎ $ nom du travailleur 2 " />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ numero de tel du travailleur 2</label>
                         <input className='form-control inputStyling'  name='candidatAddress'   placeholder="‎ ‎ ‎ $ numero de tel du travailleur 2" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ nom du travailleur3</label>
                         <input className='form-control inputStyling'   name='company_siret'  placeholder="‎ ‎ ‎ $ nom du travailleur3" />

                         </div> <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ numero de tel du travailleur 3</label>
                         <input className='form-control inputStyling'  name='serie_id'  placeholder="‎ ‎ ‎ $ numero de tel du travailleur 3" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ nom du travailleur 4</label>
                         <input className='form-control inputStyling'  name='candidatAddress'  placeholder="‎ ‎ ‎ $ nom du travailleur 4" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ numero de tel du travailleur 4</label>
                         <input className='form-control inputStyling'  name='company_siret'  placeholder="‎ ‎ ‎ $ numero de tel du travailleur 4" />

                         </div> <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ nom du travailleur 5</label>
                         <input className='form-control inputStyling'  name='serie_id'  placeholder="‎ ‎ ‎$ nom du travailleur 5" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ numero de tel du travailleur 5</label>
                         <input className='form-control inputStyling'  name='candidatAddress'  placeholder="‎ ‎ ‎ $ numero de tel du travailleur 5" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ nom du travailleur 6</label>
                         <input className='form-control inputStyling'  name='company_siret'  placeholder="‎ ‎ ‎$ nom du travailleur 6" />

                         </div> <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ numero de tel du travailleur 6</label>
                         <input className='form-control inputStyling'  name='serie_id'  placeholder="‎ ‎ ‎ $ numero de tel du travailleur 6" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ nom du travailleur 7</label>
                         <input className='form-control inputStyling'  name='candidatAddress'  placeholder="‎ ‎ ‎$ nom du travailleur 7" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ numero de tel du travailleur 7</label>
                         <input className='form-control inputStyling'  name='company_siret'  placeholder="‎ ‎ ‎ $ numero de tel du travailleur 7" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ nom du travailleur 8</label>
                         <input className='inputStyling form-control'  name='companyAddress'  placeholder='‎ ‎ ‎$ nom du travailleur 8'  />
                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ numero de tel du travailleur 8</label>
                         <input className='inputStyling form-control'  name='companyAddress'  placeholder='‎ ‎ ‎$ numero de tel du travailleur 8'  />
                         </div>
             
                      </div>
                      
                 
                 </div>
                  <div className="col-12 Social-CardClient my-1 ">
              <div className="row p-1">
              <div className="row" style={{ marginRight: '1px' }}>
                    {
                      documentList.length > 0  ?
                        documentList.map((doc, index) =>
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
                                    <img src={require("../images/dowBtn.svg").default} />
                                    {doc.originalName.length > 10 ? doc.originalName.slice(0, 11) + "..." : doc.originalName}
                                  </button>
                                } */}
                                     <button className="btnDownload" onClick={()=>ViewDownloadFiles( doc.documentName)}>
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
<p className="text-center">No Documents Uploaded!</p>
   
                    }
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
                          {
                            RenameDocStatus? 
                            <RenameDoc  props={RenameData} closepreModal={setRenameDocStatus}  path={"/todoprofile"}/>
                            :
                            null
                          }
                {showPreSelectedModal?
                  <PreModalClient 
                   props={PreSelectedData}
                   closepreModal={setShowInPreSelectedModal}
                   clientProps={profile}
                  />
                  :
                  null

                  }
                      {PDFModal ?
<PDFModalClient props={profile} closeModal={setPDFModal}  />
:
null
                  }
                      {
        HideProfile ?
<CLintHide  props={profile} closeModal={setHideProfile} path={"/clientToDo"} />
        :
        null
      }
      {
        RESTprofile ?
        <ClientREST props={profile} closeModal={setREStProfile} path={"/clientToDo"}  />
        :
        null
      }
                  </div>
                
              </div>
            </div>
            </div>
          </div>
      </div>
    </>
    )
}
export default ArchivedViewPage;