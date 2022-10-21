import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/Candidatefile.css";
import { useLocation } from "react-router-dom";
import InProgressModal from "../components/Modal/InProgressModal";
import ArchivedModal from "../components/Modal/ArchivedModal";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { API_BASE_URL } from '../config/serverApiConfig';
import { ProgressBar } from "react-bootstrap";
import { Toaster, toast } from 'react-hot-toast';
import ProfileLoader from "../components/Loader/ProfilesLoader";
import RenameDoc from '../components/Modal/RenameDoc_Modal'
import UploadDow from '../components/Modal/SelectUploadDownload'
import PDFGenerate from '../components/Modal/PDFGenerateModal'
import moment from "moment";
import ErrorLoader from "../components/Loader/SearchBarError";
import ResetProfile from "../components/Modal/RestProfileForArchived";
import DOCUSIGNModalCandidate from '../components/Modal/DOCUSIGNModalCandidate'
import ReactRoundedImage from "react-rounded-image";
import { Tabs, Tab } from "react-tabs-scrollable";
import { FileUploader } from "react-drag-drop-files";
import Share from "../components/Loader/Share"

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
})
let RenameData=[]
let UploadName = "";
let clDoc;
let UploadTextBtn = "";
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
  const [docUploaded, setDocUploaded] = useState(false);
  const [documentList, setDocumentList] = useState([]);
  const [renameDoc, setRenameDoc] = useState(false);
  const [RenameDocStatus,setRenameDocStatus]=useState(false)
  const [candidatImage, setCandidatImage] = useState(profile.candidatPhoto && profile.candidatPhoto?.url !== undefined ? profile.candidatPhoto?.url : "");
  const hiddenImageInput = React.useRef(null);
  const [UploadBtn,setSelectUpload]= useState(false)
  const [contract_date,setcontract_date]=useState()as any
  const [debutMissionDate,setdebutMissionDate]=useState()as any
  const [fin_mision,setfin_mision]=useState()as any
  const [GetMonth,setMonth]=useState()as any
  const [GetMonth2,setMonth2]=useState()as any
  const datenow=moment().format('YYYY-MM-DD')
  const [GetMonth3,setMonth3]=useState()as any
  const [DocumentSignModal,setDocuSignModal]=useState(false)
  const [ResetModalProfile,setResetModalProfile]=useState(false)
  const [activeTab, setActiveTab] = React.useState(1) as any;
  const [CONTRACT_EMPLOYE_INTERMANN, setCONTRACT_EMPLOYE_INTERMANN] = useState() as any;
  const [Fiche_Medicale, setFiche_Medicale] = useState() as any;
  const [Assurance, setAssurance] = useState() as any;
  const [ID_CARD, setID_CARD] = useState() as any;
  const [Reges, setReges] = useState() as any;
  const [DriveLink,setDriveLink]=useState("")
  const [Fiche_mise_à_disposition, setFiche_mise_à_disposition] =
    useState() as any;
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
 const notifyDocumentUploadError = () => toast.error("Document Upload Failed! Please Try Again in few minutes.")
 const notifyDocumentDeleteError = () => toast.error("Document Not Removed! Please Try Again in few minutes.")
 const notifyDocumentUploadSuccess = () => toast.success("Document Uploaded Successfully!");
 const notifyDocumentDeleteSuccess = () => toast.success("Document Removed Successfully!");
  // const [Dissapointed, setDissapointed] = useState(false);
  // const [Notreally, setNotreally] = useState(false);
  // const [Like, setLike] = useState(false);
  // const [Great, setGreat] = useState(false);
  // const [Superlovely, setSuperlovely] = useState(false);
  let data={profileData:profile ,path:"/preSelectedView"}

  const showCustomerProfile =(data)=>{
    localStorage.setItem("profile", JSON.stringify(data));
    window.open("/clientSignedGlobalCard", "_blank");
}

let date = new Date(datenow);

let start = new Date(profile.candidatStartDate);
let end = new Date(profile.candidatEndDate);
 
const onTabClick = (e, index: any) => {
  setActiveTab(index);
  const FolderName = tabItems.filter((el, i) => i == index);

  FolderName.map((el,i) => {
    UploadName = el.value;
    UploadTextBtn = el.text;
  });

  clDoc = profile.candidatDocuments.filter((el) => el.folderName == UploadName);
  Links = profile.candidatLinks.filter((el) => el.folder == UploadName);
  setDocumentList([...clDoc,...Links]);
};
useEffect(() => {
  const FolderName = tabItems.filter((el, i) => i == activeTab);
if(UploadName == "" ){
  FolderName.map((el,i) => {
    UploadName = el.value;
    UploadTextBtn = el.text;
  });


}

if(profile.candidatDocuments.length > 0 && documentList.length == 0 || profile.candidatLinks.length > 0  && documentList.length == 0  ){
  clDoc = profile.candidatDocuments.filter((el) => (el.folderName == UploadName));
  Links = profile.candidatLinks.filter((el) => el.folder == UploadName);
    setDocumentList([...clDoc,...Links]);
 } 
});


const FilesUploads=(file)=>{
  const fileUploaded = file;
  setCandidatDocument(fileUploaded)
    let formdata = new FormData();
    formdata.append('candidatId', profile._id)
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
        setDocUploaded(true);
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
let DataLink={
  candidatId:profile._id,
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
      LinktoDrive(DataLink).then((resD)=>{toast.success(resD.message);setTimeout(()=>{window.location.reload()},2000)})
    }else{
      return toast.error("Please Enter Valid Url!")
    }
   
    

    console.log(isValidUrl(DriveLink));
  }
}

const isValidUrl = urlString=> {
  var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
return !!urlPattern.test(urlString);
}

useEffect(()=>{
  if(profile.candidatContract){
 
        let tempdate =new Date(profile.candidatContract.contract_date)
        setMonth(tempdate.getMonth()+ 1)
        let NewCdate=[tempdate.getFullYear() ,"0" + GetMonth,tempdate.getDate()].join("-")
      setcontract_date(NewCdate)

    let tempdate2 =new Date(profile.candidatContract.debutMissionDate)
    setMonth2(tempdate2.getMonth()+1)
      let NewMDate=  [tempdate2.getFullYear() ,"0"+GetMonth2,tempdate2.getDate()].join("-")
      setdebutMissionDate(NewMDate)
  
  

   let tempdate3 =new Date(profile.candidatContract.fin_mision)
    setMonth3(tempdate3.getMonth()+1)
    let FormatNewDate=[tempdate3.getFullYear() ,"0"+GetMonth3,tempdate3.getDate()].join("-")
    setfin_mision(FormatNewDate)
  


}},)

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
    if (e.target.name === 'candidatDocuments') {
      const fileUploaded = e.target.files[0];
      setCandidatDocument(fileUploaded)
      let formdata = new FormData();
      formdata.append('candidatId', profile._id)
      formdata.append('document', fileUploaded)
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
  const renameDocument = (docId: any, docName: any,originalName:any) => {
    setRenameDoc(true);
    console.log(originalName,"originalName")
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

    
    useEffect(() => {
    fetchCandidat(profile._id).then(resData => {
      setCandidatImage("")
      if (resData.status) {
        setProfile(resData.data)
        clDoc = profile.candidatDocuments.filter((el) => el.folderName == UploadName);
        Links = profile.candidatLinks.filter((el) => el.folder == UploadName);
        setDocumentList([...clDoc,...Links]);
        setCandidatImage(resData.data.candidatPhoto !== undefined ? resData.data.candidatPhoto?.url : "")
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

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const  ViewDownloadFiles =( documentName:any)=>{
    window.open(documentName)
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
         .then(resD =>{toast.success(resD.message);setTimeout(()=>{ window.location.reload()},2000)})
         .catch(err => toast.error("Link Not Removed! Please Try Again in few minutes."))
     };
  
  
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
                    <p>Motivation : <b>{candidatMotivationIcons[profile.candidatMotivation].icon + " " + candidatMotivationIcons[profile.candidatMotivation].motivation}</b> </p>
                    </div>
                  </div>
                  <p>Secteur : {profile.candidatActivitySector ? profile.candidatActivitySector.toLocaleUpperCase() : "No Sector!"}</p>
                  <p className="" style={{ width: "150%" }}>
                    Métier/Job :{profile.candidatJob ? profile.candidatJob.toLocaleUpperCase() : "No Jobs!"}
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
            <p>Selected  For  client : {el.clientId.clientCompanyName}</p>
 

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
                      <div className="col-3 pr-0" style={{maxWidth:"22%"}}>
                      <p>Langues : </p>
                      </div>
                    <div className="col-9 px-0">
                    <span className="Todo-CardMore-span"> {profile.candidatLanguages.length != 0 ? profile.candidatLanguages.join(", ") : "✘ No Langues!"}</span>
                    </div>
                    </div>
                    <div className="d-flex ">
                      <p className="blue-text">Ready for work :</p>
                      <span className="" style={{ color: date >= start && date <= end  ? "#3F76E2" : "#ca1313"}}>
                      {date >= start && date <= end  ?" 📆" + profile.candidatStartDate  + "  To  " + profile.candidatEndDate :   "⚠️" + profile.candidatStartDate +"  To  " + profile.candidatEndDate} 
                      
                
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
                      <span>{profile.candidatSkills ? profile.candidatSkills : "✘ No Skills!"}</span>
                    </div>
                    <div className="d-flex">
                      <p className="text-dark">Trouvé sur  : </p>
                      <span className="text-dark">
                      {profile.candidatJob ? profile.candidatJob : "✘ No Trouvé!"}
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
                  {profile.candidatAlternatePhone ?" Phone 2 :" + profile.candidatAlternatePhone : null}
                  </p>
                  </div>
                 {
                    profile.candidatAlternatePhone != "" ?
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
                 <span> {profile.candidatYearsExperience ? profile.candidatYearsExperience : "✘ No "}years </span>
                </div>
                <div className="col-12 d-flex AddressEnteredBy">
                 <p className="">Adresse : </p>
                 <span> {profile.candidatAddress ? profile.candidatAddress : "✘ No Address!"}</span>
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
                  <button type="button" className="btn btn-pre-moveProgress" onClick={() => setShowInProgressModal(true)}>
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
                <div className="col-3 px-0">
                     <button className="restProfile" onClick={()=>setResetModalProfile(true)} style={{width:"100%"}}>
                    <img src={require("../images/rest.svg").default} />
                    To-Do</button>
                    <p className="italic-fontStyle text-center">Profile will be reset to todo stage</p>
                </div>
                </div>
              </div>
              <div className="col-12 Social-Card mt-1">
              <div className='row  p-1'>
              {
                  JSON.stringify(profile).includes(JSON.stringify(profile.candidatContract)) ?
                  <>
                            <div className='col-4  d-grid text-start'>
                                <label className="PDFFormlabel">Lieu_Mission</label>
                                <input className='form-control inputStylingForView'  onClick={editCandidatProfile} defaultValue={profile.candidatContract ?profile.candidatContract.lieu_mission ? profile.candidatContract.lieu_mission: "input Not Available!" : "input Not Available!"}  placeholder="‎ ‎ ‎ Lieu_Mission" />
                            </div>
                            <div className='col-4  d-grid text-start' >
                            <label className="PDFFormlabel">Durée_Mission</label>
                            <input className='form-control inputStylingForView'  onClick={editCandidatProfile} defaultValue={profile.candidatContract ?profile.candidatContract.duree_mission ? profile.candidatContract.duree_mission  : "input Not Available!" : "input Not Available!"}  placeholder="‎ ‎ ‎ Durée_Mission" />

                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel  d-flex align-items-start ">Durée_Hebdomadaire_Mission</label>
                            <input className='form-control inputStylingForView' onClick={editCandidatProfile} defaultValue={profile.candidatContract ?profile.candidatContract.duree_hebdomadaire_mission? profile.candidatContract.duree_hebdomadaire_mission  : "input Not Available!" : "input Not Available!"} placeholder="‎ ‎ ‎ Durée_Hebdomadaire_Mission"/>

                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel">Candidate_Job</label>
                            <input className='form-control inputStylingForView'  onClick={editCandidatProfile} defaultValue={profile.candidatContract ?profile.candidatContract.candidatJob ? profile.candidatContract.candidatJob : "input Not Available!" : "input Not Available!"} placeholder="‎ ‎ ‎ Candidate_Job" />

                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel">CMP_CANDIDATE</label>
                            <input className='form-control inputStylingForView' onClick={editCandidatProfile} defaultValue={profile.candidatContract ?profile.candidatContract.cmp_candidat? profile.candidatContract.cmp_candidat : "input Not Available!" : "input Not Available!"}  placeholder="‎ ‎ ‎ CMP_CANDIDATE" />

                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel">Contract_date</label>
                            <input className='form-control inputStylingForView' type="date"  onClick={editCandidatProfile} defaultValue={profile.candidatContract ?profile.candidatContract.contract_date ? contract_date : "input Not Available!" : "input Not Available!"}  placeholder="‎ ‎ ‎ Contract_date" />

                            </div>
                            <div className='col-4  d-grid text-start'>
                                                      <label className="PDFFormlabel d-flex align-items-start ">Company_Contact_Name</label>
                            

                            <input className='form-control inputStylingForView' onClick={editCandidatProfile} defaultValue={profile.candidatContract ?profile.candidatContract.company_contact_name ? profile.candidatContract.company_contact_name : "input Not Available!" : "input Not Available!"} placeholder="‎ ‎ ‎ Company_Contact_Name" />
                            
                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel">NR_INREG</label>
                            <input className='form-control inputStylingForView' onClick={editCandidatProfile} defaultValue={profile.candidatContract ?profile.candidatContract.nr_inreg ? profile.candidatContract.nr_inreg : "input Not Available!" : "input Not Available!"}  placeholder="‎ ‎ ‎ NR_INREG" />

                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel">SERIE_ID</label>
                            <input className='form-control inputStylingForView' onClick={editCandidatProfile} defaultValue={profile.candidatContract ?profile.candidatContract.serie_id ? profile.candidatContract.serie_id: "input Not Available!" : "input Not Available!"}  placeholder="‎ ‎ ‎ SERIE_ID" />

                            </div>
                            
                            <div className='col-4 d-grid text-start'>
                            <label className="PDFFormlabel">Candidate_Adress</label>
                            <input className='form-control inputStylingForView' onClick={editCandidatProfile} defaultValue={profile.candidatContract ?profile.candidatContract.candidatAddress ? profile.candidatContract.candidatAddress : "input Not Available!" : "input Not Available!"}  placeholder="‎ ‎ ‎ Candidate_Adress" />

                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel">Company_Siret</label>
                            <input className='form-control inputStylingForView'  onClick={editCandidatProfile} defaultValue={profile.candidatContract ?profile.candidatContract.company_siret ? profile.candidatContract.company_siret : "input Not Available!": "input Not Available!"}  placeholder="‎ ‎ ‎ Company_Siret" />

                            </div>
                            
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Numero TF Candidat</label>
                            <input className='form-control inputStyling'  name='Numero_TF_Candidat'  onClick={editCandidatProfile} defaultValue={profile.candidatContract ?profile.candidatContract.numeroTFCandidat ? profile.candidatContract.numeroTFCandidat : "input Not Available!": "input Not Available!"}  placeholder="‎ ‎ ‎ Numero TF Candidat" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Company Vat</label>
                            <input className='form-control inputStyling'  name='Company_Vat'  onClick={editCandidatProfile} defaultValue={profile.candidatContract ?profile.candidatContract.companyVat ? profile.candidatContract.companyVat : "input Not Available!": "input Not Available!"}   placeholder="‎ ‎ ‎ Company Vat" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Salaire Brut</label>
                            <input className='form-control inputStyling'   name='Salaire_Brut'  onClick={editCandidatProfile} defaultValue={profile.candidatContract ?profile.candidatContract.salaireBrut ? profile.candidatContract.salaireBrut : "input Not Available!": "input Not Available!"} placeholder="‎ ‎ ‎ Salaire Brut" />

                            </div>


                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Salaire Net</label>
                            <input className='form-control inputStyling'  name='Salaire_Net'  onClick={editCandidatProfile} defaultValue={profile.candidatContract ?profile.candidatContract.salaireNet ? profile.candidatContract.salaireNet : "input Not Available!": "input Not Available!"}  placeholder="‎ ‎ ‎ Salaire_Net" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Diurna Total Par Jour</label>
                            <input className='form-control inputStyling'  name='Diurna_Total_Par_Jour'  onClick={editCandidatProfile} defaultValue={profile.candidatContract ?profile.candidatContract.diurnaTotalParJour ? profile.candidatContract.diurnaTotalParJour : "input Not Available!": "input Not Available!"}  placeholder="‎ ‎ ‎ Diurna Total Par Jour" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Debut Mision (Date)</label>
                            <input className='form-control inputStyling' type="date"  name='Debut Mision Date'  onClick={editCandidatProfile} defaultValue={profile.candidatContract ? profile.candidatContract.debutMissionDate ? debutMissionDate : "input Not Available!": "input Not Available!"}  placeholder="‎ ‎ ‎ Debut Mision Date" />

                            </div>



                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Heure Par Semaine</label>
                            <input className='form-control inputStyling'  name='Heure_Par_Semaine'  onClick={editCandidatProfile} defaultValue={profile.candidatContract ?profile.candidatContract.heurePerSemaine ? profile.candidatContract.heurePerSemaine : "input Not Available!": "input Not Available!"}  placeholder="‎ ‎ ‎ Heure Par Semaine" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Duree Hebdomadaire</label>
                            <input className='form-control inputStyling'  name='Duree_Hebdomadaire'  onClick={editCandidatProfile} defaultValue={profile.candidatContract ?profile.candidatContract.duree_hebdomadaire ? profile.candidatContract.duree_hebdomadaire : "input Not Available!": "input Not Available!"}   placeholder="‎ ‎ ‎ Duree Hebdomadaire" />

                            </div>
                            <div className='col-4  d-grid'>
                            <label className="PDFFormlabel">indemnisation jour</label>
                            <input className='form-control inputStyling'  name='indemnisation_jour'  onClick={editCandidatProfile} defaultValue={profile.candidatContract ?profile.candidatContract.indemnisationJour ? profile.candidatContract.indemnisationJour : "input Not Available!": "input Not Available!"}  placeholder="‎ ‎ ‎ indemnisation jour" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Fin Mision</label>
                            <input className='form-control inputStyling'  type="date" name='fin_mision'  onClick={editCandidatProfile} defaultValue={profile.candidatContract ? profile.fin_mision !="" ? fin_mision : "input Not Available!": "input Not Available!"}  placeholder="‎ ‎ ‎ indemnisation jour" />

                            </div>

                            <div className='col-12  d-grid text-start'>
                            <label className="PDFFormlabel">Company_Adress</label>
                            <textarea className='TextAreaPage form-control' onClick={editCandidatProfile} defaultValue={profile.candidatContract ?profile.candidatContract.companyAddress ? profile.candidatContract.companyAddress : "input Not Available!": "input Not Available!"} placeholder='‎ ‎ ‎Company_Adress'></textarea>
                            </div>
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
                    to={`/candidateDocumentbox/${profile.candidatName}/${profile._id}`}
                    target="_blank"
                  >
                   
                    {API_BASE_URL +
                      `candidateDocumentbox/${profile.candidatName.replaceAll(
                        " ",
                        "%20"
                      )}/` +
                      profile._id}
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
                    tabsScrollAmount={7}
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
                        <div className="col-6 mx-0" key={index}>
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
                                     <button className="btnDownload" onClick={()=>ViewDownloadFiles( doc.url)}>
                                    <img src={require("../images/dowBtn.svg").default} />
                                    {doc.originalName.length > 10 ? doc.originalName.slice(0, 11) + "..." : doc.originalName}
                                  </button>
                              </div>
                              <div className="col-2  d-flex align-item-end justify-content-end">
                                <img
                                  src={require("../images/editSvg.svg").default}
                                  style={{ width: "20px", marginRight: "5px", cursor: 'pointer' }}
                                  // onClick={() => renameDocument(doc._id, doc.documentName)}
                                  onClick={()=>{setRenameDocStatus(true);renameDocument(doc._id, doc.documentName,doc.originalName)}}
                                />
                                <img
                                  src={require("../images/Primaryfill.svg").default}
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
                              src={require("../images/editSvg.svg").default}
                              style={{ width: "20px", marginRight: "5px", cursor: 'pointer' }}
                              // onClick={() => renameDocument(doc._id, doc.documentName)}
                            />
                            <img
                              src={require("../images/Primaryfill.svg").default}
                              style={{ width: "20px", cursor: 'pointer' }}
                              // onClick={() => deleteDocument(doc._id, doc.documentName)}
                            />
                          </div>
                        </div>
                      </div>
                      :  
                      <div className="d-grid  justify-content-center align-items-center mb-0">
                      <div className="d-flex justify-content-center">
                        <img
                          src={require("../images/docupload.svg").default}
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
                      documentList.map((Link, index) => (
                        Link.link && Link._id?
                       
                          <div className="col-6 mx-0" key={index}>
                          <div className="row CardClassDownload mt-1 mx-0">
                            <div
                              className="col-4 d-flex align-items-center cursor-pointer"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title={Link.link}
                            >
                              <p className="download-font mb-0">
                                {Link.link.length > 30
                                  ? Link.link.slice(0, 28) + "..."
                                  : Link.link}
                              </p>
                            </div>
                            <div className="col-6 text-center">
                              {/* {progress > 0 && progress < 100  ?
                                    <ProgressBar className="mt-1" now={progress} label={`${progress}%`} />
                                    :
                                    <button className="btnDownload">
                                      <img src={require("../images/dowBtn.svg").default} />
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
                                  src={require("../images/dowBtn.svg").default}
                                />
                                {Link.link.length > 10
                                  ? Link.link.slice(0, 11) + "..."
                                  : Link.link}
                              </button>
                            </div>
                            <div className="col-2  d-flex align-item-end justify-content-end">
                            
                              <img
                                src={
                                  require("../images/Primaryfill.svg").default
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
                              src={require("../images/editSvg.svg").default}
                              style={{ width: "20px", marginRight: "5px", cursor: 'pointer' }}
                            />
                            <img
                              src={require("../images/Primaryfill.svg").default}
                              style={{ width: "20px", cursor: 'pointer' }}
                            />
                          </div>
                        </div>
                      </div>
                        :
                      
                 null 
                  

                          }
                         <div className="col-12 d-flex justify-content-center mt-2" >
                
                <img src={require("../images/resume.svg").default} />
           
                {/* <input
                  type="file"
                  ref={hiddenFileInput}
                  onChange={fileChange}
                  name="candidatDocuments"
                  style={{ display: "none" }}
                /> */}
                <FileUploader 
                handleChange={FilesUploads}
                name="candidatDocuments"
                label={`Upload ${UploadTextBtn} file Now`}
                />
         
            </div>
                          {
                            RenameDocStatus? 
                            <RenameDoc  props={RenameData} closepreModal={setRenameDocStatus}  path={"/preSelectedView"}/>
                            :
                            null
                          }   {
                            DocumentSignModal ? 
                            <DOCUSIGNModalCandidate props={profile} closeModal={setDocuSignModal} />
                  
                            :
                            null
                  
                          }
                
              
                  </div>
              </div>

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
            </div>
          
       </div>
      </div>
    </>
  );
}
export default PreSelectedView;
