import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
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

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
})

let RenameData=[]
function ProgressCard() {
  // console.log(localStorage.getItem("profile"),"poiu")
 const  profileData = JSON.parse(localStorage.getItem("embauch"))

  const { state } = useLocation();
 const navigate = useNavigate()

  // const profileData = ||"");
 
  // const profileData=async()=>{
   
  //   console.log(await JSON.parse(await localStorage.getItem("embauch")))
  // }
  

  const [loader, setLoader] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [profile, setProfile] = useState<any>( state ? state :profileData );
  const [showInProgressModal, setShowInProgressModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const candidatMotivationIcons = [{ icon: "😟", motivation: 'Disappointed' }, { icon: "🙁", motivation: 'Not Really' }, { icon: "😊", motivation: 'Like' }, { icon: "🥰", motivation: 'Great' }, { icon: "😍", motivation: 'Super Lovely' }];
  const [documentList, setDocumentList] = useState([]);
  const hiddenFileInput = React.useRef(null);
  const [candidatDocument, setCandidatDocument] = useState("");
  const [progress, setProgress] = useState<any>(0);
  const [docUploaded, setDocUploaded] = useState(false);
  const [renameDoc, setRenameDoc] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [candidatImage, setCandidatImage] = useState(profile.candidatPhoto && profile.candidatPhoto?.documentName !== undefined ? profile.candidatPhoto?.documentName : "");
  const [RenameDocStatus,setRenameDocStatus]=useState(false)
  const hiddenImageInput = React.useRef(null);
  const [UploadBtn,setSelectUpload]= useState(false)
  const [clientProfile, setClientProfile] = useState()as any;
  const [PDFModal,setPDFModal]=useState(false)


  let data = {profileData:profile,path:"/embauchprofile"}
    const editCandidatProfile = () => {
      navigate("/editInProgress", { state: data });
    };

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
    fetchClientProfile(profile.candidatCurrentWork[0].workingFor)
      .then(result => {
        if (result.status) {
          setClientProfile(result.data)
        }
      })
      .catch(err => {
        console.log(err)
      })
    console.log(profile);
  }, [profile]);
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
    console.log(profile._id,"id")
    console.log(documentList,"doc")
    fetchCandidat(profile._id).then(resData => {
      console.log(resData)

      setCandidatImage("")
      if (resData.status) {
        setProfile(resData.data)
        setDocumentList([...resData.data.candidatDocuments])
        setCandidatImage(resData.data.candidatPhoto !== undefined ? resData.data.candidatPhoto?.documentName : "")
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
      window.open(API_BASE_URL + candidatImage);
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
          console.log(datares)
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
            console.log(resData.data)
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
    console.log(originalName,"originalName")
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
  const handleFileUpload = () => {
    hiddenFileInput.current.click();
  }
  const  ViewDownloadFiles =( documentName:any)=>{
    window.open(API_BASE_URL + documentName)
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
  console.log(profile,"profile")
  const showCustomerProfile =(data:any)=>{
      localStorage.setItem("embauch", JSON.stringify(data));
      window.open("/clientSignedView", "_blank");
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
                        src={API_BASE_URL + candidatImage}
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
                      Name : {profile.candidatName.toLocaleUpperCase()}|{profile.candidatAge}
                    </p>
                    <span className="card-xlSpan">(Age)</span>
                  </div>
                  <div>
                    <p className="d-flex mb-0">
                    <p>Motivation : <b>{candidatMotivationIcons[profile.candidatMotivation - 1].icon + " " + candidatMotivationIcons[profile.candidatMotivation - 1].motivation}</b> </p>
                    </p>
                  </div>
                  <p>Secteur : {profile.candidatActivitySector.toLocaleUpperCase()}</p>
                  <p className="" style={{ width: "150%" }}>
                    Métier/Job :{profile.candidatJob.toLocaleUpperCase()}
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
               <div className="col-8">
                <div className="row">
                  <div className="col-12 ">
                 <div className="row"><div className="col-2 px-0"><b className="workFont"><p className="">WORK FOR </p></b></div> <div className="col-9 px-0"> <b><span className="workFont">: {profile.candidatCurrentWork[0].workingFor}</span></b></div></div>
                </div>
                <div className="col-12 px-0 d-flex justify-content-start">
                  <div className="workFont"><b className="d-flex"><p>Since </p>: <span>{profile.candidatCurrentWork[0].workingSince}</span></b></div>
                </div>
                <div className="col-12 px-0 d-flex justify-content-start">
                  <div className="workFont"><b className="d-flex"><p>Salary  </p>: <span>{profile.candidatCurrentWork[0].salary + " "}</span>€</b></div>
                </div>
                </div>
                
              </div>
              <div className="col-4 d-flex justify-content-end align-items-center">
                <div className="d-flex justify-content-center"><button className="btn customerBtnEmbauch" onClick={(e)=>showCustomerProfile(clientProfile)}> <span><img src={require("../images/eyeProfil.svg").default} /></span>CUSTOMER PROFIL</button></div>
                </div>

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
                      <span> {profile.candidatLanguages ? profile.candidatLanguages.join(", ") : "No Language!"}</span>
                      </div>
                    </div>
                    <div className="d-flex ">
                      <p className="EmbauchFull-CardMoreSpan">Ready for work :</p>
                      <span className="EmbauchFull-CardMoreSpan">
                        {profile.candidatStartDate} -{profile.candidatEndDate}
                      </span>
                    </div>
                    <div className="d-flex">
                      <p>Permis :</p>
                      <span>
                        {profile.candidatLicensePermis ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="d-flex">
                      <p>Voyage en voiture :</p>
                      <span>
                        {profile.candidatConduireEnFrance ? "Yes" : "No"}
                      </span>
                    </div>
                   
                    <div className="d-flex">
                      <p>Skills/note: </p>
                      <span>{profile.candidatSkills}</span>
                    </div>
                    <div className="d-flex">
                      <p className="text-dark">Trouvé sur  : </p>
                      <span className="text-dark">
                        {profile.candidatJob}
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
                    Mail : {profile.candidatEmail ? profile.candidatEmail : "No Email Provided!"}
                  </p>
                  </div>
                  {
                    profile.candidatEmail ?       <button className=" btn-gmail my-1">
                    <a
                      href="https://accounts.google.com/"
                      className="text-dark fw-bold"
                      target="_blank"
                    >
                      <span className="padding-email">
                        <img  src={require("../images/gmail.svg").default} />
                      </span>
                      Send Email
                    </a>
                  </button> : 
                      <button className="btn-gmail my-1">
                      <a
                        href="https://accounts.google.com/"
                        className="text-dark fw-bold"
                        target="_blank"
                      >
                        <span className="padding-email">
                          <img src={require("../images/gmail.svg").default}  style={{ width: "8%" }} />
                        </span>
                        No Email !
                      </a>
                    </button>
                  }
                <div className="text-start px-1">
                  <p className="Span-Styling my-2 px-3">Facebook : {profile.candidatFBURL ? profile.candidatFBURL : "No Facebook URL!"}</p>
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
<button
className="btn btn-Facebookpresee my-1"
>
<span className="padding-email">
  <img
    style={{ width: "4%" }}
    src={require("../images/facebook.svg").default}
  />
</span>
No FB URL!
</button> 

                  }
            
            <div className="text-start px-1">
                  <p className="Span-Styling my-2 px-3">
                    Phone : {profile.candidatPhone ? profile.candidatPhone : "No Phone Number!"}
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
            
                  <button className="btn-whatsapp mt-1 mb-1">
                
                    <span className="padding-email">
                      <img
                        style={{ width: "8%" }}
                        src={require("../images/whatsapp.svg").default}
                      />
                    </span>
                    No Phone Number!
                </button>
                  }
               <div className="text-start px-1">
                  <p className="Span-Styling mt-2 mb-1 px-3">
                    Phone 2 : {profile.candidatAlternatePhone ? profile.candidatAlternatePhone : "No AlternatePhone Number!"}
                  </p>
                  </div>
                 {
                    profile.cadidatAlternatePhone ?
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
                
                  <button className="btn-whatsapp mt-1 mb-1">
             
                    <span className="padding-email">
                      <img
                        style={{ width: "8%" }}
                        src={require("../images/whatsapp.svg").default}
                      />
                    </span>
                    No Phone Number!
                
                </button>
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
                            <p>No Experience Details Available!</p>
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
                 <span> {profile.candidatYearsExperience}years </span>
                </div>
                <div className="col-12 d-flex AddressEnteredBy">
                 <p className="">Adresse : </p>
                 <span> {profile.candidatAddress}</span>
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
                  
                  <PDFGenerate props={profile}  closeModal={setPDFModal} path="/embauchprofile"/>
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
         
                  </div>
              
                </div>
                <div className="col-12 Social-Card mt-1">
                <div className='row justify-content-between p-1'>
                            <div className='col-4  d-grid text-start'>
                                <label className="PDFFormlabel">Lieu_Mission</label>
                                <input className='form-control inputStylingForView' value={profile.candidatContract ?profile.candidatContract.lieu_mission : "inputs Not Available!"}  placeholder="‎ ‎ ‎ Lieu_Mission" />
                            </div>
                            <div className='col-4  d-grid text-start' >
                            <label className="PDFFormlabel">Durée_Mission</label>
                            <input className='form-control inputStylingForView' value={profile.candidatContract ?profile.candidatContract.duree_mission : "inputs Not Available!"}  placeholder="‎ ‎ ‎ Durée_Mission" />

                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel  d-flex align-items-start ">Durée_Hebdomadaire_Mission</label>
                            <input className='form-control inputStylingForView'value={profile.candidatContract ?profile.candidatContract.duree_hebdomadaire_mission : "inputs Not Available!"} placeholder="‎ ‎ ‎ Durée_Hebdomadaire_Mission"/>

                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel">Candidate_Job</label>
                            <input className='form-control inputStylingForView' value={profile.candidatContract ?profile.candidatContract.candidatJob : "inputs Not Available!"} placeholder="‎ ‎ ‎ Candidate_Job" />

                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel">CMP_CANDIDATE</label>
                            <input className='form-control inputStylingForView'value={profile.candidatContract ?profile.candidatContract.cmp_candidat : "inputs Not Available!"}  placeholder="‎ ‎ ‎ CMP_CANDIDATE" />

                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel">Contract_date</label>
                            <input className='form-control inputStylingForView'value={profile.candidatContract ?profile.candidatContract.contract_date : "inputs Not Available!"}  placeholder="‎ ‎ ‎ Contract_date" />

                            </div>
                            <div className='col-4  d-grid text-start'>
                                                      <label className="PDFFormlabel d-flex align-items-start ">Company_Contact_Name</label>
                            

                            <input className='form-control inputStylingForView'value={profile.candidatContract ?profile.candidatContract.company_contact_name : "inputs Not Available!"} placeholder="‎ ‎ ‎ Company_Contact_Name" />
                            
                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel">NR_INREG</label>
                            <input className='form-control inputStylingForView'value={profile.candidatContract ?profile.candidatContract.nr_inreg : "inputs Not Available!"}  placeholder="‎ ‎ ‎ NR_INREG" />

                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel">SERIE_ID</label>
                            <input className='form-control inputStylingForView'value={profile.candidatContract ?profile.candidatContract.serie_id : "inputs Not Available!"}  placeholder="‎ ‎ ‎ SERIE_ID" />

                            </div>
                            
                            <div className='col-6  d-grid text-start'>
                            <label className="PDFFormlabel">Candidate_Adress</label>
                            <input className='form-control inputStylingForView'value={profile.candidatContract ?profile.candidatContract.candidatAddress : "inputs Not Available!"}  placeholder="‎ ‎ ‎ Candidate_Adress" />

                            </div>
                            <div className='col-6  d-grid text-start'>
                            <label className="PDFFormlabel">Company_Siret</label>
                            <input className='form-control inputStylingForView'value={profile.candidatContract ?profile.candidatContract.company_siret : "inputs Not Available!"}  placeholder="‎ ‎ ‎ Company_Siret" />

                            </div>
                            <div className='col-12  d-grid text-start'>
                            <label className="PDFFormlabel">Company_Adress</label>
                            <textarea className='TextArea form-control'value={profile.candidatContract ?profile.candidatContract.companyAddress : "inputs Not Available!"} placeholder='‎ ‎ ‎Company_Adress'></textarea>
                            </div>
                  
</div>
              </div>
                <div className="col-12 Social-Card mt-1 mb-2">
              <div className="row justify-content-center">
                <div className="col-12 d-flex justify-content-center">
                  <button className="CandidateCV" onClick={handleFileUpload}>
                    <div className="col-8" >
                      <img src={require("../images/Upload+text.svg").default} />
                    </div>
                  </button>
                  <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={fileChange}
                    name="candidatDocuments"
                    style={{ display: 'none' }}
                  />
                </div>
             
                <div className="col-12 mb-1">
                  <div className="row">

                    <div className="col-6  pr-0 mb-1">
                      <p className="candidatecVs pt-2">Candidate CV & Other Document</p>
                    </div>
                  </div>
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
                            
                                     <button className="btnDownload" onClick={()=>ViewDownloadFiles( doc.documentName)}>
                                    <img src={require("../images/dowBtn.svg").default} />
                                    {doc.originalName.length > 10 ? doc.originalName.slice(0, 11) + "..." : doc.originalName}
                                  </button>
                              </div>
                              <div className="col-2  d-flex align-item-end justify-content-end">
                                <img
                                  src={require("../images/editSvg.svg").default}
                                  style={{ width: "20px", marginRight: "5px", cursor: 'pointer' }}
                                  // onClick={() => renameDocument(doc._id, doc.documentName)}
                                  onClick={()=>{setRenameDocStatus(true);renameDocument(doc._id,doc.documentName,doc.originalName)}}
                                />
                                <img
                                  src={require("../images/Primaryfill.svg").default}
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
                          
                          {
                            RenameDocStatus? 
                            <RenameDoc  props={RenameData} closepreModal={setRenameDocStatus} path={"/embauchprofile"} />
                            :
                            null
                          }
     </div>     </div>
     </div>
                </div>
          </div>
        </div>
    </>
  );
}

export default ProgressCard;
