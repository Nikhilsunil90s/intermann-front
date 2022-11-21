import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/Candidatefile.css";
import { useLocation } from "react-router-dom";
import InProgressModal from "../components/Modal/InProgressModal";
import ArchivedModal from "../components/Modal/ArchivedModal";
import { useNavigate } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { API_BASE_URL } from '../config/serverApiConfig';
import { Toaster, toast } from 'react-hot-toast';
import UploadDow from '../components/Modal/SelectUploadDownload'
import PDFGenerate from '../components/Modal/PDFGenerateModal'
import moment from "moment";
import ErrorLoader from "../components/Loader/SearchBarError";
import ResetProfile from "../components/Modal/RestProfileForArchived";
import DOCUSIGNModalCandidate from '../components/Modal/DOCUSIGNModalCandidate'
import { Tabs, Tab } from "react-tabs-scrollable";
import PDFBoxCandidate from "../components/PDFboxBothSide/PDFBoxCandidate";
import Representance from "../components/Modal/RepresentanceModalCandidate";
import AvanceModal from "../components/Modal/AvanceModalCandidate";
import CandidateContract from "../components/CandidateComponents/CandidateContract";
import DocumLink from "../components/Modal/CandidateRepresentModal/LinkModal"

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
})
let UploadName = "";
let clDoc;
let Links ;
function PreSelectedView() {
  const navigate = useNavigate();
  const profileData = JSON.parse(localStorage.getItem("profile"));
  const { state } = useLocation();
  const [profile, setProfile] = useState<any>(state ? state : profileData);
  const [PDFModal,setPDFModal]=useState(false)
  const [Data,setData]=useState(profileData)
  const [showInProgressModal, setShowInProgressModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const candidatMotivationIcons = [{ icon: "", motivation: 'No Motivation!' },{ icon: "😟", motivation: 'Disappointed' }, { icon: "🙁", motivation: 'Not Really' }, { icon: "😊", motivation: 'Like' }, { icon: "🥰", motivation: 'Great' }, { icon: "😍", motivation: 'Super Lovely' }];
  const hiddenFileInput = React.useRef(null);
  const [candidatDocument, setCandidatDocument] = useState("");
  const [progress, setProgress] = useState<any>(0);
  const [representance,setRepresentance]=useState(false)
  const [Avance,setAvance]=useState(false)
  const [ReAvance,setReAvance]=useState("")
  const [docUploaded, setDocUploaded] = useState(false);
  const [documentList, setDocumentList] = useState([]);
  const [candidatImage, setCandidatImage] = useState(profile.candidatPhoto && profile.candidatPhoto?.url !== undefined ? profile.candidatPhoto?.url : "");
  const hiddenImageInput = React.useRef(null);
  const [UploadBtn,setSelectUpload]= useState(false)
  const datenow=moment().format('YYYY-MM-DD')
  const [DocumentSignModal,setDocuSignModal]=useState(false)
  const [ResetModalProfile,setResetModalProfile]=useState(false)
  const [CONTRACT_EMPLOYE_INTERMANN, setCONTRACT_EMPLOYE_INTERMANN] = useState() as any;
  const [Fiche_Medicale, setFiche_Medicale] = useState() as any;
  const [Assurance, setAssurance] = useState() as any;
  const [ID_CARD, setID_CARD] = useState() as any;
  const [Reges, setReges] = useState() as any;
  const [Fiche_mise_à_disposition, setFiche_mise_à_disposition] =
    useState() as any;
    const [DocuLink,setDocuLink]=useState(false)
    const [repID,setRepId]=useState("")
 const notifyDocumentUploadError = () => toast.error("Document Upload Failed! Please Try Again in few minutes.")
 const notifyDocumentDeleteError = () => toast.error("Document Not Removed! Please Try Again in few minutes.")
 const notifyDocumentUploadSuccess = () => toast.success("Document Uploaded Successfully!");
 const notifyDocumentDeleteSuccess = () => toast.success("Document Removed Successfully!");

  let data={profileData:profile ,path:"/preSelectedView"}

  const showCustomerProfile =(data)=>{
    localStorage.setItem("profile", JSON.stringify(data));
    window.open("/clientSignedGlobalCard", "_blank");
}

const [startStatus]=useState(profile.candidatStartDate !== undefined ? profile.candidatStartDate.slice(0,4).includes("-") : null)
const [endStatus]=useState(profile.candidatEndDate !== undefined ?profile.candidatEndDate.slice(0,4).includes("-") : null)
const [startDate,setStartDate]=useState()as any
const [EndDate,setEndDate]=useState()as any

function padTo2DigitsCH(num) {
  return num.toString().padStart(2, "0");
}

// console.log(props.data.jobStartDate.slice(0,4).includes("-"))

function formatDateCha(date) {
  return [
    padTo2DigitsCH(date.getDate()),
    padTo2DigitsCH(date.getMonth() + 1),
    date.getFullYear(),
  ].join("/");
}


let date = new Date(datenow);

let start = new Date(profile.candidatStartDate);
let end = new Date(profile.candidatEndDate);

useEffect(()=>{
  if(startStatus){
    setStartDate(profile.candidatStartDate)
  }else{
    let data=formatDateCha(start)
    setStartDate(data.replaceAll("/","-"))
    

  }
  if(endStatus){
    setEndDate(profile.candidatEndDate)
  }else{
    let data=formatDateCha(end)
    setEndDate(data.replaceAll("/","-"))
    

  }
 })

     // Notification // 
const notifyMoveSuccess = () => toast.success("Moved Archived Successfully!");
const notifyMoveError = () => toast.error("Not Moved..");
  //    End   // 

  const fileChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | any
    >
  ) => {

    if (e.target.name === 'candidatPhoto') {
      const fileUploaded = e.target.files[0]
      let formdata = new FormData();
      formdata.append('candidatId', profile._id)
      formdata.append('image', fileUploaded)
      axiosInstance.post("uploadCandidatImage", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": "Bearer " + localStorage.getItem('token')
        }
      })
        .then(datares => {
          if (datares.data.status) {
            notifyDocumentUploadSuccess()
            // setCandidatImage(datares.data.filename)
            setTimeout(()=>{
              window.location.href = "/preSelectedView"
            },2000)
            
          } else {
            notifyDocumentUploadError()
          }
        })
        .catch(err => { console.log(err) })
      return;
    }
 
  }
  const handleImageChange = (val) => {
    if (val == 'upload') {
      handleImageUpload()
    } else if (val == 'Download') {
      window.open(candidatImage);
    }
  }
  const handleImageUpload = () => {
    hiddenImageInput.current.click();
  }
  const editCandidatProfile = () => {
    navigate("/editPreSelected", { state: data });
  };
  const handleFileUpload = () => {
    hiddenFileInput.current.click();
  }
  // const renameDocument = (docId: any, docName: any) => {
  //   setRenameDoc(true);
  //   renameCandidatDocument(docId, docName, profile._id).then(resData => {
  //     console.log(resData)
  //     setRenameDoc(false);
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }
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

    
    useEffect(() => {
    fetchCandidat(profile._id).then(resData => {
      setCandidatImage("")
      if (resData.status) {
        setProfile(resData.data)
        setCandidatImage(resData.data.candidatPhoto !== undefined ? resData.data.candidatPhoto?.url : "")
        setDocUploaded(false);
      } else {
        setDocUploaded(false);
      }
    })
      .catch(err => {
        console.log(err)
      })
  }, [docUploaded])

  const fetchCandidat = async (candidatId: any) => {
    return await fetch(API_BASE_URL + `getCandidatById/?candidatId=${candidatId}`, {
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

  
  return (
    <>
      <Toaster position="top-right" containerStyle={{ zIndex: '99999999999' }} />
      <div className="container-fluid">
        <div className="row pt-1 pr-1">
          <div
            className="card mt-2 mb-0"
         
          >
            <div className="row text-start topCandidateHeaderPre">
              <div className="col-6 d-flex align-items-center">
                <div className="stable">
                  <Link to="/preSelected">
                    <button
                      type="button"
                      className="btn d-flex align-items-center p-0"
                    >
                      <img src={require("../images/return.svg").default} />
                      <h2 className="card-Leads mb-0"> Candidate Profile</h2>
                    </button>
                  </Link>
                </div>
              </div>
              <div className="col-6 d-flex align-items-center justify-content-end">
                <button className="btn-bgblack mt-0" onClick={editCandidatProfile}>
                  <img src={require("../images/Edit.svg").default} />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 pb-0 mt-1">
              <div className="row bg-todoTodoDetails mt-0">
                <div className="col-xxl-2 col-xl-2 col-md-2 col-sm-2 text-center ">
   
                     {candidatImage !== "" ?
                      <img
                        // src={require("../images/menlogos.svg").default}
                        src={candidatImage}
                     className="img-upload-Download"
                      />
                      :
                    <img
                      src={require("../images/menlogos.svg").default}
                     className="img-upload-Download"
                    />
                  }
<button
 onClick={()=>{setSelectUpload(!UploadBtn);}}
className="SelectBtn"
 ><img className="" src={require("../images/select.svg").default} />
 {
  UploadBtn? 
  <UploadDow  closeModal={setSelectUpload}  FunModal={handleImageChange} />
  :
  null
 }
 </button>
<input
                    type="file"
                    ref={hiddenImageInput}
                    onChange={fileChange}
                    name="candidatPhoto"
                    style={{ display: 'none' }}
                  />

                </div>
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 card-preProfile">
                  <div className="d-flex">
                    <p>
                      Name : {profile.candidatName.toLocaleUpperCase()}|{profile.candidatAge}
                    </p>
                    <span className="card-xlSpan">(Age)</span>
                  </div>
                  <div>
                    <div className="d-flex mb-0">
                    <p>Motivation : <b>{profile.candidatMotivation ?candidatMotivationIcons[profile.candidatMotivation].icon + " " + candidatMotivationIcons[profile.candidatMotivation].motivation : "✘✘!"}</b> </p>
                    </div>
                  </div>
                  <p>Secteur : {profile.candidatActivitySector ? profile.candidatActivitySector.toLocaleUpperCase() : "✘✘No Sector!"}</p>
                  <p className="" style={{ width: "150%" }}>
                    Métier/Job :{profile.candidatJob ? profile.candidatJob.toLocaleUpperCase() : "✘✘No Jobs!"}
                  </p>
                </div>
                <div className="col-4 px-0 text-end end-class">
                  <div className="text-center d-grid justify-content-end align-items-center mt-2 pr-1">
                    <div className="text-end">
                    <button className="preLargebtn">
                      <img src={require("../images/preselectedCard.svg").default} />
                      PRE SELECTED
                    </button>
                    </div>
                    <p className="fw-bold textPRE-end pl-5 pt-1">
                  Selectionné pour un client
                  </p>
                  <p className="text-PREBtn-child">This candidate have been selected for a client</p>
               
                  </div>
              
                </div>
              </div>
            </div>
           <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 pb-0 px-1 pt-1">
            <div className="row preColorRowSelected p-2">
            {Data?.candidatPreSelectedFor.map((el,i)=>(
               el.clientId?
               <>
            <p>Selected  For  client : {el.clientId.clientCompanyName.toLocaleUpperCase()}</p>
 

  <div className="col-8 pt-1 px-1"  >
<p className="CommentSelection">{el.reasonForPreSelection ? el.reasonForPreSelection : "This Client Has No Reason!"} </p>
  </div>
  <div className="col-4 d-flex justify-content-end align-items-center" >
<button  className="btn customerProfil" onClick={(e)=>showCustomerProfile(el.clientId)}><img src={require("../images/eyeProfil.svg").default}   />CUSTOMER PROFIL</button>
  </div>
  </>
  :
null
 )
 )

 }             
            </div>
           </div>
           
           
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-12-md pb-0 pt-1 px-1">
              <div className="row justify-content-between">
              
                <div
                  className="col-7 Social-Card px-1  scrollbarpree heightWidth"
                  id="style-3"
                  style={{ maxWidth: "57%" }}
                >
                  <div className="pre-CardMore force-overflow">
                    <div className="row">
                    <div className="d-flex align-items-center"  > 
                      <p>Langues  </p>
                      <span className="Todo-CardMore-span">:  {profile.candidatLanguages.length  ? profile.candidatLanguages.join(", ") : "✘✘No Language!"}</span>
                      </div>
                    </div>
                    <div className="d-flex ">
                      <p className="blue-text">Ready for work :</p>
                      <span className="" style={{ color: date >= start && date <= end  ? "#3F76E2" : "#ca1313"}}>
                      {profile.candidatStartDate ? date >= start && date <= end  ?" 📆" + startDate  + "  To  " + EndDate :   "⚠️" + startDate +"  To  " + EndDate : "✘ No Dates!"} 
                      
                
                      </span>
                    </div>
                    <div className="d-flex">
                      <p>Permis :</p>
                      <span>
                        {profile.candidatLicensePermis ? `✔ Yes` : "✘ No"}
                      </span>
                    </div>
                    <div className="d-flex">
                      <p>Voyage en voiture :</p>
                      <span>
                        {profile.candidatConduireEnFrance ? `✔ Yes` : "✘ No"}
                      </span>
                    </div>
                   
                    <div className="d-flex">
                      <p>Skills/note: </p>
                      <span>{profile.candidatSkills ? profile.candidatSkills : "✘✘No Skills!"}</span>
                    </div>
                    <div className="d-flex">
                      <p className="text-dark">Trouvé sur  : </p>
                      <span className="text-dark">
                      {profile.candidatJob ? profile.candidatJob : "✘✘No Trouvé!"}
                      </span>
                    </div>
                   
                  </div>
                </div>
                <div
                  className="col-xxl-5 col-xl-5 col-md-5 col-lg-5 Social-Card text-center p-1 heightWidth"
                  style={{ maxWidth: "49%" }}
                >
                  <div className="text-start px-1">
                  <p className="Span-Styling pt-2 my-1">
                  {profile.candidatEmail ? "Mail :" + profile.candidatEmail : null}
                  </p>
                  </div>
                  {
                    profile.candidatEmail ?       <button className=" btn-gmail my-1">
                    <a
                     href={`mailto:${profile.candidatEmail}`}

                      className="text-dark fw-bold"
                      target="_blank"
                    >
                      <span className="padding-email">
                        <img  src={require("../images/gmail.svg").default} />
                      </span>
                      Send Email
                    </a>
                  </button> : 
                  null
                  }
                <div className="text-start px-1">
                  <p className="Span-Styling my-2 px-3"> {profile.candidatFBURL ? "Facebook  :" + profile.candidatFBURL : null}</p>
                  </div>
                  {
profile.candidatFBURL ?
<a
href={profile.candidatFBURL}
target="_blank"
className="btn btn-Facebookpresee my-1"
>
<span className="padding-email">
  <img
    style={{ width: "4%" }}
    src={require("../images/facebook.svg").default}
  />
</span>
See Profile
</a>  :
null

                  }
            
            <div className="text-start px-1">
                  <p className="Span-Styling my-2 px-3">
                  {profile.candidatPhone ? "Phone :" + profile.candidatPhone : null}
                  </p>
                  </div>
                  {
                  profile.candidatPhone ?

                      <a
                      href={`https://wa.me/${profile.candidatPhone}`}
                      target="_blank"
                    >
                    <button className="btn-whatsapp mt-1 mb-1">
                  
                      <span className="padding-email">
                        <img
                          style={{ width: "8%" }}
                          src={require("../images/whatsapp.svg").default}
                        />
                      </span>
                      Send What’s App
                  </button>
                  </a>

                  :
            
              null
                  }
               <div className="text-start px-1">
                  <p className="Span-Styling mt-2 mb-1 px-3">
                  {profile.candidatAlternatePhone ? " Phone 2 :" + profile.candidatAlternatePhone : null}
                  </p>
                  </div>
                 {
                    profile.candidatAlternatePhone ?
                    <a
                    href={`https://wa.me/${profile.candidatAlternatePhone}`}
                    target="_blank"
                  >
                  <button className="btn-whatsapp btn-see">
               
                    <span className="padding-email">
                      <img
                        style={{ width: "8%" }}
                        src={require("../images/whatsapp.svg").default}
                      />
                    </span>
                    Send What’s App
                </button>
                </a>

                  :
              null
                 }

                </div>
              </div>
            </div>
           

            <div className="col-xxl-12 col-xl-12 col-lg-12 col-12-md pb-0 pt-1 px-1 Social-Card mt-1">
              <h3 className="exp">Expérience du Candidat </h3>
              <table className="table table-bordered border-dark">
                <thead>
                  <tr>
                    <th scope="col">
                      Période Exemple Janvier 2020 à Janvier 2021
                    </th>
                    <th scope="col">Lieu de travail Exemple Paris</th>
                    <th scope="col">
                      Travail effectué Exemple : Facadier Isolateur
                    </th>
                  </tr>
                </thead>
                <tbody>
                {
                    profile.candidatExperienceDetails.length > 0 &&
                      profile.candidatExperienceDetails[0].period != "" ?
                      (profile.candidatExperienceDetails.map((detail,i) =>
                        <tr key={i}>
                          <td key={i}>{detail.period}</td>
                          <td key={i}>{detail.location}</td>
                          <td key={i}>{detail.workDoneSample}</td>
                        </tr>
                      )
                      ) : (
                        <tr>
                          <td colSpan={3} className="text-center">
                          <b className="d-flex align-items-center justify-content-center my-1"><ErrorLoader />No Experience Details Available!</b>

                            <button className="btn btn-sm text-light btn-dark" onClick={editCandidatProfile}>Edit Candidat To Add Experience Details!</button>
                          </td>
                        </tr>
                      )
                  }
                </tbody>
              </table>
            </div>
            <div className="col-12 mt-1 p-1 Social-Card">
              <div className="row">
                <div className="col-12 d-flex AnneesStyle">
                 <p className="">Années d’expériance :</p>
                 <span> {profile.candidatYearsExperience ? profile.candidatYearsExperience + "years" : "✘✘!"} </span>
                </div>
                <div className="col-12 d-flex AddressEnteredBy">
                 <p className="">Adresse : </p>
                 <span> {profile.candidatAddress ? profile.candidatAddress : "✘✘No Address!"}</span>
                </div><div className="col-12 d-flex AddressEnteredBy">
                 <p className="">Ajouté par/Added by :</p>
                 <span> {profile.enteredBy}</span>
                  
                  </div>
                  <div className="col-12">
                 <p className="noteThis">Note : Who entred this candidates/employe on the database</p>
                  
                  </div>
              </div>
            </div>
        
            <div className="col-12 Social-Card mt-1">
              <div className="row p-1 ">
              <div className="col-3 px-0 text-center">
                  <button
                    type="button"
                    className="btn btn-pre-EditProfile"
                    onClick={editCandidatProfile}
                  >
                    <img src={require("../images/Edit.svg").default} />
                    Edit Profile
                  </button>
                  <p className="italic-fontStyle text-start">Editer le profil</p>
                </div>
                <div className="col-3 px-0 text-center">
                  <button
                    type="button"
                    className="btn btn-pre-Archived"
                    onClick={() => setShowArchiveModal(true)}
                  >
                    Archive / Canceled
                  </button>
                  <p className="italic-fontStyle text-start ">Si plus d’actualité</p>
                  {showArchiveModal ?
                    <ArchivedModal
                      props={profile.candidatName}
                      closeModal={setShowArchiveModal}
                      path={"/todolist"}
                    />
                   : null}
                </div>
            
                <div className="col-3 px-0 text-center">
              
                        <a
                    type="button"
                    className="btn btn-pre-CVManual  d-flex align-items-center justify-content-center"
                    href="https://www.canva.com/design/DAFA1_f9AmA/ZBNOgKbj-tCDJa9QRj9kNA/edit"
                    target="_blank"
                  >
                    <img src={require("../images/resume.svg").default} />
                    Créer CV Manuel
                  </a>
                  <p className="italic-fontStyle text-start">
                    Edit CV with Canva
                  </p>
                </div>
          <div className="col-3 px-0 text-center">
                  <button type="button" className="btn btn-pre-CVManual" onClick={() => setShowInProgressModal(true)}>
                    Move to In Progress
                  </button>
                  {showInProgressModal ?
                    <InProgressModal props={profile} closeModal={setShowInProgressModal} /> : null
                  }
                      {
                  PDFModal ?
                 <PDFGenerate props={profile} LinkModal={setDocuSignModal}  closeModal={setPDFModal} path="/preSelected"/>
                  : 
                  null
                }   
                {
                  ResetModalProfile?
                  <ResetProfile props={profile} closeModal={setResetModalProfile}  path={"/todolist"}/>
                  :
                  null
                 }
                   {
                  representance ? 
                 <Representance   props={profile}  closeModal={setRepresentance}  rePid={setRepId}  LinkModal={setDocuLink} setReAvance={setReAvance} />

                  :
                  null
                }
                {
                  Avance ?
                  <AvanceModal  props={profile} closeModal={setAvance} rePid={setRepId} LinkModal={setDocuLink}  setReAvance={setReAvance}/>
                  :
                  null
                }
                  {DocuLink ?
                  <DocumLink   props={profile} closeModal={setDocuLink} id={repID} ReAvance={ReAvance}   />
    
                  :
                  null
                  }
              
                  <p className="italic-fontStyle">Si embaché pour un client en cours de recherche</p>
                </div>
                <div className="col-4 px-0 text-center">
                <button
                    type="button"
                    onClick={()=>setPDFModal(true)}
                    className="btn text-white btn-pre-moveProgress"
                  >
                    <img src={require("../images/resume.svg").default} />
                    Générér un contrat
                  </button>
                  <p className="italic-fontStyle text-center">
                  Pour Adrian, générer un contrat pour un candidat
                  </p>
                </div>
                <div className="col-4 px-0 text-start">
                <button
                    type="button"
                    onClick={()=>setRepresentance(true)}
                    className="btn text-white btn-pre-moveProgress"
                  >
                    <img src={require("../images/resume.svg").default} />
                    Générer représentance
                  </button>
                 
                </div>
                <div className="col-3 px-0">
                     <button className="restProfile" onClick={()=>setResetModalProfile(true)} style={{width:"100%"}}>
                    <img src={require("../images/rest.svg").default} />
                    To-Do</button>
                    <p className="italic-fontStyle text-center">Profile will be reset to todo stage</p>
                </div>
                <div className="col-3 px-0 text-center">
                <button
                    type="button"
                    onClick={()=>setAvance(true)}
                    className="btn text-white btn-pre-moveProgress"
                  >
                    <img src={require("../images/resume.svg").default} />
                    Générer Avance
                  </button>
                
                </div>
                </div>
              </div>
              <div className="col-12 Social-Card mt-1">
              <div className='row  p-1'>
              {
                  JSON.stringify(profile).includes(JSON.stringify(profile.candidatContract)) ?
                  <>

<CandidateContract  props={profile} path={"/editPreSelected"}   />

                      
                            </>
                                   : 
                                   <div className="col-12 d-flex justify-content-center align-items-center py-2">
                                     <ErrorLoader  />
                                     <p className="mb-0 ErrorSearchBox">
                                     ✘ No Contract Available for this Candidat! Please add a New Contract ✘
                                     </p>
                                     </div>
                                 }
                  
</div>
              </div>
              < >
<PDFBoxCandidate  props={profile}  value={setProfile}  />

</>

                         <div className="col-12 Social-Card mt-1">
                         <div className="row alertMessage align-items-center py-1">
                <Tabs
                  rightBtnIcon={">"}
                  hideNavBtns={false}
                  leftBtnIcon={"<"}
                  showTabsScroll={false}
                  tabsScrollAmount={5}
                  className="alertMessage"
                  activeTab
                >
                  {CONTRACT_EMPLOYE_INTERMANN ? null : (
                    <Tab className="redColorStyling">
                      ⚠️ CONTRACT EMPLOYE INTERMANN IS MISSING / MANQUANT
                    </Tab>
                  )}
                  {ID_CARD ? null : (
                    <Tab className="redColorStyling">
                      ⚠️ ID CARD IS MISSING / MANQUANT
                    </Tab>
                  )}
                  {Fiche_Medicale ? null : (
                    <Tab className="redColorStyling">
                      ⚠️FICHE MEDICALE IS MISSING / MANQUANT
                    </Tab>
                  )}
                  {Assurance ? null : (
                    <Tab className="redColorStyling">
                      ⚠️ ASSURANCE IS MISSING / MANQUANT
                    </Tab>
                  )}
                  {Reges ? null : (
                    <Tab className="redColorStyling">
                      ⚠️ REGES IS MISSING / MANQUANT
                    </Tab>
                  )}
                  {Fiche_mise_à_disposition ? null : (
                    <Tab className="redColorStyling">
                      ⚠️ FICHE MISE A DISPOSITION IS MISSING / MANQUANT
                    </Tab>
                  )}
                 </Tabs>
              </div>
              {
                            DocumentSignModal ? 
                            <DOCUSIGNModalCandidate props={profile} closeModal={setDocuSignModal} />
                  
                            :
                            null
                  
                          }
            </div>
          
       </div>
      </div>
    </>
  );
}
export default PreSelectedView;
