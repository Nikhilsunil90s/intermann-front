import React, { useEffect, useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import "../CSS/inProgressCard.css";
import { useLocation } from 'react-router-dom';
import {ReactComponent as Upload} from "../images/upload.svg"
import {ReactComponent as Download} from '../images/download.svg'
import InProgressModal from "../components/Modal/InProgressModal";
import ArchivedModal from "../components/Modal/ArchivedModal";
import Select from 'react-select'
import { ProgressBar } from "react-bootstrap";
import { API_BASE_URL } from '../config/serverApiConfig';
import axios from "axios";
import { Toaster, toast } from 'react-hot-toast';
import ProfileLoader from "../components/Loader/ProfilesLoader";
import RenameDoc from '../components/Modal/RenameDoc_Modal'
import UploadDow from '../components/Modal/SelectUploadDownload'
import PDFGenerate from '../components/Modal/PDFGenerateModal'
import moment from "moment";
import ResetProfile from "../components/Modal/RestProfileForArchived";
import ErrorLoader from "../components/Loader/SearchBarError";
import DOCUSIGNModalCandidate from '../components/Modal/DOCUSIGNModalCandidate'
import Share from "../components/Loader/Share"
import { Tabs, Tab } from "react-tabs-scrollable";
import { FileUploader } from "react-drag-drop-files";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
})
let UploadName = "";
let clDoc;
let UploadTextBtn = "";
let RenameData=[]
let Links ;
function ProgressCard() {
  // console.log(localStorage.getItem("profile"),"poiu")
 const  profileData = JSON.parse(localStorage.getItem("embauch"))

  const { state } = useLocation();
 const navigate = useNavigate()



  const [loader, setLoader] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [profile, setProfile] = useState<any>( state ? state : profileData );
  const [showInProgressModal, setShowInProgressModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const candidatMotivationIcons = [{ icon: "", motivation: 'No Motivation!' }, { icon: "😟", motivation: 'Disappointed' }, { icon: "🙁", motivation: 'Not Really' }, { icon: "😊", motivation: 'Like' }, { icon: "🥰", motivation: 'Great' }, { icon: "😍", motivation: 'Super Lovely' }];
  const [documentList, setDocumentList] = useState([]);
  const hiddenFileInput = React.useRef(null);
  const [candidatDocument, setCandidatDocument] = useState("");
  const [progress, setProgress] = useState<any>(0);
  const [docUploaded, setDocUploaded] = useState(false);
  const [renameDoc, setRenameDoc] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [candidatImage, setCandidatImage] = useState(profile.candidatPhoto && profile.candidatPhoto?.url !== undefined ? profile.candidatPhoto?.url : "");
  const [RenameDocStatus,setRenameDocStatus]=useState(false)
  const hiddenImageInput = React.useRef(null);
  const [UploadBtn,setSelectUpload]= useState(false)
  const [clientProfile, setClientProfile] = useState()as any;
  const [PDFModal,setPDFModal]=useState(false)
  const [contract_date,setcontract_date]=useState()as any
  const [debutMissionDate,setdebutMissionDate]=useState()as any
  const [fin_mision,setfin_mision]=useState()as any
  const [GetMonth,setMonth]=useState()as any
  const [GetMonth2,setMonth2]=useState()as any
  const [GetMonth3,setMonth3]=useState()as any
  const [ResetModalProfile,setResetModalProfile]=useState(false)
  const [DocumentSignModal,setDocuSignModal]=useState(false)
  const [activeTab, setActiveTab] = React.useState(1) as any;
  const [CONTRACT_EMPLOYE_INTERMANN, setCONTRACT_EMPLOYE_INTERMANN] = useState() as any;
  const [Fiche_Medicale, setFiche_Medicale] = useState() as any;
  const [Assurance, setAssurance] = useState() as any;
  const [ID_CARD, setID_CARD] = useState() as any;
  const [Reges, setReges] = useState() as any;
  const [Fiche_mise_à_disposition, setFiche_mise_à_disposition] =
    useState() as any;
    const [DriveLink,setDriveLink]=useState("")
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
   
  ]) as any;

  const datenow=moment().format('YYYY-MM-DD')
    
  let date = new Date(datenow);

 let start = new Date(profile.candidatStartDate);
 let end = new Date(profile.candidatEndDate);
  
 useEffect(()=>{
     setProfile(state ? state : profileData)
},[state])


  let data = {profileData:profile,path:"/embauchprofile"}
    const editCandidatProfile = () => {
      navigate("/editInProgress", { state: data });
    };

    
    
 useEffect(() => {
  profile.candidatDocuments.map((el) => {
    if (
      JSON.stringify(el.folderName ? el.folderName : null).includes(
        JSON.stringify("Reges")
      )
    ) {
      setReges([el]);
    }
    if (
      JSON.stringify(el.folderName ? el.folderName : null).includes(
        JSON.stringify("CONTRACT_EMPLOYE_INTERMANN")
      )
    ) {
      setCONTRACT_EMPLOYE_INTERMANN([el]);
    }
    if (
      JSON.stringify(el.folderName ? el.folderName : null).includes(
        JSON.stringify("BULETIN_/_ID_CARD")
      )
    ) {
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
  });
}, [profile.candidatDocuments, documentList]);

const onTabClick = (e, index: any) => {
  setActiveTab(index);
  const FolderName = tabItems.filter((el, i) => i == index);

  FolderName.map((el) => {
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
  FolderName.map((el) => {
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
  // useEffect(() => {
  //   window.scroll({
  //     top: 0,
  //     left: 0,
  //     behavior: "smooth",
  //   });
  //   console.log(profile,"hello");
  // });
  const notifyDocumentUploadError = () => toast.error("Document Upload Failed! Please Try Again in few minutes.")
  const notifyDocumentDeleteError = () => toast.error("Document Not Removed! Please Try Again in few minutes.")
  const notifyDocumentUploadSuccess = () => toast.success("Document Uploaded Successfully!");
  const notifyDocumentDeleteSuccess = () => toast.success("Document Removed Successfully!");
  useEffect(() => {
    if(clientProfile === undefined){
    if(clientProfile){
      return
    }
    else{
      fetchClientProfile(profile.candidatCurrentWork[0].workingFor)
      .then(result => {
        if (result.status) {
          setClientProfile(result.data)

    }
        }
    )}
 }    

 
  }, []);


  useEffect(() => {    
    setLoader(true);
    fetchRecommendations(profile.candidatActivitySector)
      .then(respData => {
        if (respData.status) {
          setRecommendations([...respData.data]);
          setClientList([...respData.data]);
          setLoader(true);
        } else {
          setRecommendations([])
          setLoader(false);

        }
      })
      .catch(err => {
        console.log(err)
      })
  }, [state])
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
  const handleImageUpload = () => {
    hiddenImageInput.current.click();
  }
  const handleImageChange = (val) => {
    if (val === 'upload') {
      handleImageUpload()
    } else if (val === 'Download') {
      window.open(candidatImage);
    }
  }
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
  const fetchClientProfile = async (name: string) => {
    return await fetch(API_BASE_URL + `getClientByName/?clientCompanyName=${name}`, {
      method: "GET",
      headers: {
        "Accept": 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    })
      .then(resD => resD.json())
      .then(reD => reD)
      .catch(err => err)
  }


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
              window.location.href = "/embauchprofile"
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
  const fetchRecommendations = async (candidatSector: string) => {
    return await fetch(API_BASE_URL + `clientRecommendations/?candidatSector=${candidatSector}`, {
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

  const renameDocument = (docId: any, docName: any ,originalName:any) => {
    setRenameDoc(true);

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
  const handleFileUpload = () => {
    hiddenFileInput.current.click();
  }
  const  ViewDownloadFiles =( documentName:any)=>{
    window.open(documentName.replace("http","https"))
   }

  //  const showCustomerProfile = async () => {
  //   console.log(clientProfile)
  //   if (Object.values(clientProfile).includes("To-Do")) {
  //     navigate("/clientToDoProfile", { state: clientProfile })
  //   } else if (Object.values(clientProfile).includes("In-Progress")) {
  //     navigate("/clientInProgressProfile", { state: clientProfile })
  //   } else if (Object.values(clientProfile).includes("Signed Contract")) {
  //     navigate("/clientSigned", { state: clientProfile })
  //   } else if (Object.values(clientProfile).includes("Archived")) {
  //     // navigate("/clientSigned", { state: clientProfile })
  //     window.location.href=`/clientSigned?id=${clientProfile._id}`
  //   }
  // }
  const showCustomerProfile =(data:any)=>{
      localStorage.setItem("profile", JSON.stringify(data));
      window.open("/clientSignedGlobalCard", "_blank");
  }
  

  
 let Data={
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


  const onDriveLinkChange=(e)=>{
    if(e.target.name =="inputDrive"){
      setDriveLink(e.target.value)
      
    }
    
    if(e.target.name =="DriveLinkSubmit"){
      let Check = isValidUrl(DriveLink)
      if(Check){
        // setLinkDoc([...Links])
        LinktoDrive(Data).then((resD)=>{toast.success(resD.message);setTimeout(()=>{window.location.reload()},2000)})
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


  return (
    <>
           <Toaster position="top-right" containerStyle={{ zIndex: '99999999999' }} />
      <div className="containet-fluid px-1">
        <div className="row pt-1  px-1">
          <div
            className="card mt-2 mb-0"
         
          >
            <div className="row topCandidateHeader">
              <div className="col-6 d-flex align-items-center">
                <div className="stable">
                  <Link to="/embauchlist">
                    <button
                      type="button"
                      className="btn d-flex align-items-center"
                    >
                      <img src={require("../images/return.svg").default} />
                      <h2 className="card-Leads mb-0"> Candidate Profile</h2>
                    </button>
                  </Link>
                </div>
              </div>
              <div className="col-6 d-flex align-items-center justify-content-end">
                {/* <Link to="/editInProgress"> */}
                <button className="btn btn-EDITbgb" 
                onClick={editCandidatProfile}
                >
                  <img src={require("../images/Edit.svg").default} />
                  Edit Profile
                </button>
                {/* </Link> */}
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
                     className="imgEmbauch-upload-Download"
                      /> :
                    <img
                    src={require("../images/menlogos.svg").default}
                   className="imgEmbauch-upload-Download"

                  />
                    // 
                  }
               {/* <Select
                          closeMenuOnSelect={true}
                          onChange={handleImageChange}
  options={uploadOption}
  className="Todoupload"

/> */}
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
                      Name : {profile.candidatName.toLocaleUpperCase()}|{profile.candidatAge ?profile.candidatAge : "No Age"}
                    </p>
                    <span className="card-xlSpan">(Age)</span>
                  </div>
                  <div>
                    <p className="d-flex mb-0">
                    <p>Motivation : <b>{candidatMotivationIcons[profile.candidatMotivation ].icon + " " + candidatMotivationIcons[profile.candidatMotivation ].motivation}</b> </p>
                    </p>
                  </div>
                  <p>Secteur : {profile.candidatActivitySector ? profile.candidatActivitySector.toLocaleUpperCase() : "No Secteur!"}</p>
                  <p className="" style={{ width: "150%" }}>
                    Métier/Job :{profile.candidatJob ? profile.candidatJob.toLocaleUpperCase() : "No Job!"}
                  </p>
                </div>
                <div className="col-4 px-0 text-end end-class d-flex align-items-center justify-content-center">
                  <div className="text-center d-grid justify-content-end align-items-center pr-1">
                    <div className="text-end">
                    <button className="InProLargebtn">
                      <img src={require("../images/thundermini.svg").default} />
                      IN PROGRESS
                    </button>
                    </div>
                    <p className="textinPro pl-5 pt-1">
                    Contrat en cours avec Interman
                  </p>
                  <p className="text-PREBtn-child">This candidate have active contract with us</p>
               
                  </div>
              
                </div>
              </div>
            </div>
            <div className="col-12 boxProgress mt-1">
              <div className="row">
                {
                 profile.candidatCurrentWork[0].workingFor !== "" || profile.candidatCurrentWork[0].workingSince !== "" ||  profile.candidatCurrentWork[0].salary !== " " ?

                 <> <div className="col-8">
                  <div className="row">
                    <div className="col-12 ">
                   <div className="row"><div className="col-2 px-0"><b className="workFont"><p className="">WORK FOR </p></b></div> <div className="col-9 px-0"> <b><span className="workFont">: {profile.candidatCurrentWork[0].workingFor}</span></b></div></div>
                  </div>
                  <div className="col-12 px-0 d-flex justify-content-start">
                    <div className="workFont"><b className="d-flex"><p>Since </p>: <span>{profile.candidatCurrentWork[0].workingSince ? profile.candidatCurrentWork[0].workingSince : "✘No Since!"}</span></b></div>
                  </div>
                  <div className="col-12 px-0 d-flex justify-content-start">
                    <div className="workFont"><b className="d-flex"><p>Salary  </p>: <span>{profile.candidatCurrentWork[0].salary + "✘No "}</span>€</b></div>
                  </div>
                  </div>
                  
                </div>
                <div className="col-4 d-flex justify-content-end align-items-center">
                  <div className="d-flex justify-content-center"><button className="btn customerBtnEmbauch" onClick={(e)=>showCustomerProfile(clientProfile)}> <span><img src={require("../images/eyeProfil.svg").default} /></span>CUSTOMER PROFIL</button></div>
                  </div>
                  </>
                  :
                  
                <p className="d-flex  justify-content-center align-items-center mb-0"     style={{
                  fontFamily: 'Poppins',
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#000000"
              }}>  <ErrorLoader />No data available for Client yet !</p>
                }
              
                </div>
              
            </div>
           
             <div className="col-xxl-12 col-xl-12 col-lg-12 col-12-md pb-0 pt-1 px-1">
              <div className="row justify-content-between">
              
                <div
                  className="col-7 Social-Card px-1  scrollbarpree scrollbar  heightWidth"
                  id="style-3"
                  style={{ maxWidth: "57%" }}
                >
                  <div className="EmbauchFull-CardMore force-overflow">
                    <div className="row ">
                      <div className="col-3 pr-0"  style={{maxWidth:"22%"}}> 
                      <p>Langues : </p>
                      </div><div className="col-9 px-0">
                      <span> {profile.candidatLanguages.length ? profile.candidatLanguages.join(", ") : "✘ No Language!"}</span>
                      </div>
                    </div>
                    <div className="d-flex ">
                      <p className="EmbauchFull-CardMoreSpan"  style={{color: "#3F76E2"}} >Ready for work :</p>
                      <span className="EmbauchFull-CardMoreSpan"  style={{ color: date >= start && date <= end  ? "#3F76E2" : "#ca1313"}}>
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
                      <span>{profile.candidatSkills ? profile.candidatSkills :"✘ No Skills!"}</span>
                    </div>
                    <div className="d-flex">
                      <p className="text-dark">Trouvé sur  : </p>
                      <span className="text-dark">
                        {profile.candidatJob ? profile.candidatJob : "✘ No Trouvé sur!"}
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
                  <p className="Span-Styling my-2 px-3"> {profile.candidatFBURL ? "Facebook :" + profile.candidatFBURL : null}</p>
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
                  {profile.candidatAlternatePhone != "" ?" Phone 2 :" + profile.candidatAlternatePhone : null}
                  </p>
                  </div>
                 {
                    profile.candidatAlternatePhone != "" ?
                    <a
                    href={`https://wa.me/${profile.candidatAlternatePhone}`}
                    target="_blank"
                  >
                  <button className="btn-whatsapp ">
               
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
          <div className="col-12  p-2 Social-Card mt-2">
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
                      (profile.candidatExperienceDetails.map((detail) =>
                        <tr>
                          <td>{detail.period}</td>
                          <td>{detail.location}</td>
                          <td>{detail.workDoneSample}</td>
                        </tr>
                      )
                      ) : (
                      
                        <tr className="">
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
                 <span> {profile.candidatAddress ? profile.candidatAddress :"✘ No Adresse!"}</span>
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
              <div className="row p-1 justify-content-between">
              
               
                <div className="col-xxl-3 px-0 col-lg-3 col-md-4 col-sm-4 text-center">
                  <button
                    type="button"
                    className="btn btn-ArchivedEmbauch"
                    onClick={() => setShowArchiveModal(true)}
                  >
                    Archive / Canceled
                  </button>
                  <p className="italic-fontStyle text-start ">Si plus d’actualité</p>
                  {showArchiveModal ? (
                    <ArchivedModal
                      props={profile}
                      closeModal={setShowArchiveModal}
                      path={"/todolist"}
                    />
                  ) : null}
                         {
                  PDFModal ?
                  
                  <PDFGenerate props={profile}  LinkModal={setDocuSignModal} closeModal={setPDFModal} path="/embauchprofile"/>
                  : 
                  null
                }  {
                  ResetModalProfile?
                  <ResetProfile props={profile} closeModal={setResetModalProfile}  path={"/todolist"}/>
                  :
                  null
                 }
                </div>
                <div className="col-xxl-3 px-0 col-lg-3 col-md-4 col-sm-4 text-center">
                  <button
                    type="button"
                    className="btn btn-EditProfileEmbauch"
                    onClick={editCandidatProfile}
                  >
                    <img src={require("../images/Edit.svg").default} />
                    Edit Profile
                  </button>
                  <p className="italic-fontStyle text-center">Editer le profil</p>
                </div>
                <div className="col-xxl-3 col-lg-3 col-md-4 col-sm-4 px-0 text-center">
                  <a
                    type="button"
                    className="btn btn-CVManualEmbauch"
                    href="https://www.canva.com/design/DAFA1_f9AmA/ZBNOgKbj-tCDJa9QRj9kNA/edit"
                    target="_blank"
                  >
                    <img src={require("../images/resume.svg").default} />
                    Créer CV Manuel
                  </a>
                  <p className="italic-fontStyle text-center">
                    Edit CV with Canva
                  </p>
                </div>
                <div className="col-3 px-0 text-center">
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
                 <div className="row p-1" >
                  <div className="col-4">
                  <label className="PDFFormlabel">IBAN EURO</label>
                                <input className='form-control inputStylingForView' value={profile.iban_euro}  onClick={editCandidatProfile}  placeholder="‎ ‎ ‎ youmail@gmail.com" />
                 
                  </div>
                  <div className="col-4">
                  <label className="PDFFormlabel">BANK NAME EURO</label>
                                <input className='form-control inputStylingForView' value={profile.bankName_euro}  onClick={editCandidatProfile}  placeholder="‎ ‎ ‎ BANK NAME EURO" />
                 
                  </div>
                  <div className="col-4">
                  <label className="PDFFormlabel">IBAN RON/LEI</label>
                                <input className='form-control inputStylingForView' value={profile.iban_ron_lei}     onClick={editCandidatProfile}  placeholder="‎ ‎ ‎ IBAN RON/LEI" />
                 
                  </div>
                  <div className="col-4">
                  <label className="PDFFormlabel">BANK NAME LEI</label>
                                <input className='form-control inputStylingForView' value={profile.bankName_lei}   onClick={editCandidatProfile}  placeholder="‎ ‎ ‎ BANK NAME LEI" />
                 
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
                                <input className='form-control inputStylingForView'  onClick={editCandidatProfile} value={profile.candidatContract ?profile.candidatContract.lieu_mission ? profile.candidatContract.lieu_mission: "input Not Available!" : "input Not Available!"}  placeholder="‎ ‎ ‎ Lieu_Mission" />
                            </div>
                            <div className='col-4  d-grid text-start' >
                            <label className="PDFFormlabel">Durée_Mission</label>
                            <input className='form-control inputStylingForView'  onClick={editCandidatProfile} value={profile.candidatContract ?profile.candidatContract.duree_mission ? profile.candidatContract.duree_mission  : "input Not Available!" : "input Not Available!"}  placeholder="‎ ‎ ‎ Durée_Mission" />

                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel  d-flex align-items-start ">Durée_Hebdomadaire_Mission</label>
                            <input className='form-control inputStylingForView' onClick={editCandidatProfile} value={profile.candidatContract ?profile.candidatContract.duree_hebdomadaire_mission? profile.candidatContract.duree_hebdomadaire_mission  : "input Not Available!" : "input Not Available!"} placeholder="‎ ‎ ‎ Durée_Hebdomadaire_Mission"/>

                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel">Candidate_Job</label>
                            <input className='form-control inputStylingForView'  onClick={editCandidatProfile} value={profile.candidatContract ?profile.candidatContract.candidatJob ? profile.candidatContract.candidatJob : "input Not Available!" : "input Not Available!"} placeholder="‎ ‎ ‎ Candidate_Job" />

                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel">CMP_CANDIDATE</label>
                            <input className='form-control inputStylingForView' onClick={editCandidatProfile} value={profile.candidatContract ?profile.candidatContract.cmp_candidat? profile.candidatContract.cmp_candidat : "input Not Available!" : "input Not Available!"}  placeholder="‎ ‎ ‎ CMP_CANDIDATE" />

                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel">Contract_date</label>
                            <input className='form-control inputStylingForView' type="date"  onClick={editCandidatProfile} value={profile.candidatContract ?profile.candidatContract.contract_date ? contract_date : "input Not Available!" : "input Not Available!"}  placeholder="‎ ‎ ‎ Contract_date" />

                            </div>
                            <div className='col-4  d-grid text-start'>
                                                      <label className="PDFFormlabel d-flex align-items-start ">Company_Contact_Name</label>
                            

                            <input className='form-control inputStylingForView' onClick={editCandidatProfile} value={profile.candidatContract ?profile.candidatContract.company_contact_name ? profile.candidatContract.company_contact_name : "input Not Available!" : "input Not Available!"} placeholder="‎ ‎ ‎ Company_Contact_Name" />
                            
                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel">NR_INREG</label>
                            <input className='form-control inputStylingForView' onClick={editCandidatProfile} value={profile.candidatContract ?profile.candidatContract.nr_inreg ? profile.candidatContract.nr_inreg : "input Not Available!" : "input Not Available!"}  placeholder="‎ ‎ ‎ NR_INREG" />

                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel">SERIE_ID</label>
                            <input className='form-control inputStylingForView' onClick={editCandidatProfile} value={profile.candidatContract ?profile.candidatContract.serie_id ? profile.candidatContract.serie_id: "input Not Available!" : "input Not Available!"}  placeholder="‎ ‎ ‎ SERIE_ID" />

                            </div>
                            
                            <div className='col-4 d-grid text-start'>
                            <label className="PDFFormlabel">Candidate_Adress</label>
                            <input className='form-control inputStylingForView' onClick={editCandidatProfile} value={profile.candidatContract ?profile.candidatContract.candidatAddress ? profile.candidatContract.candidatAddress : "input Not Available!" : "input Not Available!"}  placeholder="‎ ‎ ‎ Candidate_Adress" />

                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel">Company_Siret</label>
                            <input className='form-control inputStylingForView'  onClick={editCandidatProfile} value={profile.candidatContract ?profile.candidatContract.company_siret ? profile.candidatContract.company_siret : "input Not Available!": "input Not Available!"}  placeholder="‎ ‎ ‎ Company_Siret" />

                            </div>
                            
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Numero TF Candidat</label>
                            <input className='form-control inputStyling'  name='Numero_TF_Candidat'  onClick={editCandidatProfile} value={profile.candidatContract ?profile.candidatContract.numeroTFCandidat ? profile.candidatContract.numeroTFCandidat : "input Not Available!": "input Not Available!"}  placeholder="‎ ‎ ‎ Numero TF Candidat" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Company Vat</label>
                            <input className='form-control inputStyling'  name='Company_Vat'  onClick={editCandidatProfile} value={profile.candidatContract ?profile.candidatContract.companyVat ? profile.candidatContract.companyVat : "input Not Available!": "input Not Available!"}   placeholder="‎ ‎ ‎ Company Vat" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Salaire Brut</label>
                            <input className='form-control inputStyling'   name='Salaire_Brut'  onClick={editCandidatProfile} value={profile.candidatContract ?profile.candidatContract.salaireBrut ? profile.candidatContract.salaireBrut : "input Not Available!": "input Not Available!"} placeholder="‎ ‎ ‎ Salaire Brut" />

                            </div>


                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Salaire Net</label>
                            <input className='form-control inputStyling'  name='Salaire_Net'  onClick={editCandidatProfile} value={profile.candidatContract ?profile.candidatContract.salaireNet ? profile.candidatContract.salaireNet : "input Not Available!": "input Not Available!"}  placeholder="‎ ‎ ‎ Salaire_Net" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Diurna Total Par Jour</label>
                            <input className='form-control inputStyling'  name='Diurna_Total_Par_Jour'  onClick={editCandidatProfile} value={profile.candidatContract ?profile.candidatContract.diurnaTotalParJour ? profile.candidatContract.diurnaTotalParJour : "input Not Available!": "input Not Available!"}  placeholder="‎ ‎ ‎ Diurna Total Par Jour" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Debut Mision (Date)</label>
                            <input className='form-control inputStyling' type="date"  name='Debut Mision Date'  onClick={editCandidatProfile} value={profile.candidatContract ? profile.candidatContract.debutMissionDate ? debutMissionDate : "input Not Available!": "input Not Available!"}  placeholder="‎ ‎ ‎ Debut Mision Date" />

                            </div>



                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Heure Par Semaine</label>
                            <input className='form-control inputStyling'  name='Heure_Par_Semaine'  onClick={editCandidatProfile} value={profile.candidatContract ?profile.candidatContract.heurePerSemaine ? profile.candidatContract.heurePerSemaine : "input Not Available!": "input Not Available!"}  placeholder="‎ ‎ ‎ Heure Par Semaine" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Duree Hebdomadaire</label>
                            <input className='form-control inputStyling'  name='Duree_Hebdomadaire'  onClick={editCandidatProfile} value={profile.candidatContract ?profile.candidatContract.duree_hebdomadaire ? profile.candidatContract.duree_hebdomadaire : "input Not Available!": "input Not Available!"}   placeholder="‎ ‎ ‎ Duree Hebdomadaire" />

                            </div>
                            <div className='col-4  d-grid'>
                            <label className="PDFFormlabel">indemnisation jour</label>
                            <input className='form-control inputStyling'  name='indemnisation_jour'  onClick={editCandidatProfile} value={profile.candidatContract ?profile.candidatContract.indemnisationJour ? profile.candidatContract.indemnisationJour : "input Not Available!": "input Not Available!"}  placeholder="‎ ‎ ‎ indemnisation jour" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Fin Mision</label>
                            <input className='form-control inputStyling'  type="date" name='fin_mision'  onClick={editCandidatProfile} value={profile.candidatContract ? profile.fin_mision !="" ? fin_mision : "input Not Available!": "input Not Available!"}  placeholder="‎ ‎ ‎ indemnisation jour" />

                            </div>

                            <div className='col-12  d-grid text-start'>
                            <label className="PDFFormlabel">Company_Adress</label>
                            <textarea className='TextAreaPage form-control' onClick={editCandidatProfile} value={profile.candidatContract ?profile.candidatContract.companyAddress ? profile.candidatContract.companyAddress : "input Not Available!": "input Not Available!"} placeholder='‎ ‎ ‎Company_Adress'></textarea>
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
                       
                          <div className="col-6 mx-0">
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
                            <RenameDoc  props={RenameData} closepreModal={setRenameDocStatus}  path={"/embauchprofile"}/>
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

export default ProgressCard;
