import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import "../CSS/Candidatefile.css";
import { useLocation } from "react-router-dom";
import InProgressModal from "../components/Modal/InProgressModal";
import ArchivedModal from "../components/Modal/ArchivedModal";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Select from "react-select";
import {ReactComponent as Upload} from "../images/upload.svg"
import {ReactComponent as Download} from '../images/download.svg'
import PreModal from "../components/Modal/preSelectedModal";
import ProfileLoader from "../components/Loader/ProfilesLoader";
import SelectedLoader from "../components/Loader/selectLoader";
import { API_BASE_URL } from '../config/serverApiConfig';
import { Toaster, toast } from 'react-hot-toast';
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { ProgressBar } from "react-bootstrap";
import ReadMoreReact from 'read-more-react';
import RenameDoc from '../components/Modal/RenameDoc_Modal'
import UploadDow from '../components/Modal/SelectUploadDownload'
import PDFGenerate from '../components/Modal/PDFGenerateModal'

interface State {
  profileData: any,
  path: any
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
})
 
let RenameData=[]
function ToDoProfile() {


  const notifyDocumentUploadSuccess = () => toast.success("Document Uploaded Successfully!");
  const notifyDocumentDeleteSuccess = () => toast.success("Document Removed Successfully!");
 
  const profileData = JSON.parse(localStorage.getItem("profile"));


  const notifyDocumentUploadError = () => toast.error("Document Upload Failed! Please Try Again in few minutes.")
  const notifyDocumentDeleteError = () => toast.error("Document Not Removed! Please Try Again in few minutes.")

  const navigate = useNavigate();
  const { state } = useLocation();


  const [profile, setProfile] = useState<any>(state? state : profileData);
  const [showPreSelectedModal, setShowInPreSelectedModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const candidatMotivationIcons = [{ icon: "no", motivation: 'no' },{ icon: "😟", motivation: 'Disappointed' }, { icon: "🙁", motivation: 'Not Really' }, { icon: "😊", motivation: 'Like' }, { icon: "🥰", motivation: 'Great' }, { icon: "😍", motivation: 'Super Lovely' }];
  const hiddenFileInput = React.useRef(null);
  const [recommendations, setRecommendations] = useState([]);
  const [candidatContactOne, setCandidatContactOne] = useState(profile.candidatPhone != "" ? profile.candidatPhone.split(" ").join("") : "");
  const [candidatContactTwo, setCandidatContactTwo] = useState(profile.candidatAlternatePhone != "" ? profile.candidatAlternatePhone.split(" ").join("") : "");
  const [inputField,setinputField]=useState(true)
  const [loader, setLoader] = useState(false);
  const hiddenImageInput = React.useRef(null);
  const [documentList, setDocumentList] = useState([]);
  const [renameDoc, setRenameDoc] = useState(false);
  const [candidatDocument, setCandidatDocument] = useState("");
  const [progress, setProgress] = useState<any>(0);
  const [docUploaded, setDocUploaded] = useState(false);
  const [candidatImage, setCandidatImage] = useState(profile.candidatPhoto && profile.candidatPhoto?.documentName !== undefined ? profile.candidatPhoto?.documentName : "");
  const [clientList, setClientList] = useState([]);
  const [UploadBtn,setSelectUpload]= useState(false)
  const [RenameDocStatus,setRenameDocStatus]=useState(false)
  const [PDFModal,setPDFModal]=useState(false)

  let data={profileData:profile ,path:"/todoprofile"}


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
 const removeRecommendation = (rId: any) => {

  console.log(recommendations);
  let filteredRecommendations = recommendations.filter((recomm) => {
    return recomm._id !== rId;
  })
  console.log(filteredRecommendations)
  setRecommendations([...filteredRecommendations])
  setLoader(true);
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
  const editCandidatProfile = () => {
    navigate("/editToDo", { state: data });
  };
  const handleImageUpload = () => {
    hiddenImageInput.current.click();
  }

  const handleFileUpload = () => {
    hiddenFileInput.current.click();
  }
  
  const handleImageChange = (val) => {
    if (val === 'upload') {
      console.log("upload")
      handleImageUpload()
    } else if (val === 'Download') {
      console.log("download")
      window.open(API_BASE_URL + candidatImage);
    }
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
  const fileChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | any
    >
  ) => {
    if (e.target.name === 'candidatPhoto') {
      console.log(e.target.files,"e.target.files")
      console.log(e.target.files[0],"e.target.files[]")
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
            
            console.log(datares.data.status,"datares.data.status")
     // setCandidatImage(datares.data.filename)
     notifyDocumentUploadSuccess()

     
            setTimeout(()=>{
              window.location.href = "/todoprofile"
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
    setProfile((prev) => ({ ...prev, ["clients"]: [...recommendations] }));
    setLoader(false);
  }, [recommendations])

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
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
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
  window.open(API_BASE_URL + documentName)
 }
  return (
    <>
      <Toaster position="top-right" containerStyle={{ zIndex: '99999999999' }} />
      <div className="containet-fluid">
        <div className="row mx-0 paddingForLarge">
          {/* <div className="col-12 top-pd text-center">
            <h1 style={{ textDecoration: "underline" }}>
              CANDIDAT: {profile.candidatName}
            </h1>
          </div> */}

          <div
            className="card mt-2 mb-0"
            
          >
            <div className="row text-start topCandidateHeader" >
              <div className="col-6 d-flex align-items-center">
                <div className="stable">
                  <Link to="/todolist">
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
                <button className="btn-bgblack" onClick={editCandidatProfile}>
                  <img src={require("../images/Edit.svg").default} />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

   
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 p-1">
              <div className="row bg-todoTodoDetails mt-0">
                <div className="col-xxl-2 col-xl-2 col-md-2 col-sm-2 text-center ">
                {candidatImage !== "" ?
                      <img
                        // src={require("../images/menlogos.svg").default}
                        src={API_BASE_URL + candidatImage}
                     className="img-uploadTodo-Download"
                      /> :
                    <img
                      src={require("../images/menlogos.svg").default}
                     className="img-uploadTodo-Download"
                    />
                    // 
                  }
               
<button
 onClick={()=>{setSelectUpload(!UploadBtn);}}
className="SelectBtn"
 ><img className="" src={require("../images/select.svg").default} />
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
                    name="candidatPhoto"
                    style={{ display: 'none' }}
                  />
                </div>
                <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7 col-sm-7 card-TodoProfile">
                  <div className="d-flex">
                    <p>
                      Name : {profile.candidatName.toLocaleUpperCase()}|{profile.candidatAge}
                    </p>
                    <span className="card-xlSpan">(Age)</span>
                  </div>
                  <div>
                    <p className="d-flex mb-0">
                    <p>Motivation : <b>{candidatMotivationIcons[profile.candidatMotivation ].icon + " " + candidatMotivationIcons[profile.candidatMotivation ].motivation}</b> </p>
                    </p>
                  </div>
                  <p>Secteur : {profile.candidatActivitySector.toLocaleUpperCase()}</p>
                  <p className="" style={{ width: "150%" }}>
                    Métier/Job :{profile.candidatJob.toLocaleUpperCase()}
                  </p>
                </div>
                <div className="col-3  text-end end-class" style={{paddingRight:"20px"}}>
                  <div className="text-center d-grid justify-content-end align-items-center mt-2">
                    <div className="text-center">
                    <button className="todoBtnStyle">
                      <img style={{width:"8%"}} src={require("../images/briefcase2.svg").default} />
                    </button>
                    </div>
                    <p className="fw-boldEn text-center  pl-0 pt-1" style={{marginRight:"10px"}}>
                    En recherche de contrat
                  </p>
                  </div>
              
                </div>
              </div>
            

            <div className="col-xxl-12 col-xl-12 col-lg-12 col-12-md  pt-1 px-0">
              <div className="row justify-content-between">
                <div
                  className="col-xxl-5 col-xl-5 col-md-5 col-lg-5 Social-Card text-center p-1 Social-btns"
                  style={{ maxWidth: "49%" }}
                ><div className="text-start px-1">
                  <p className="Span-Styling pt-2 pb-1 px-3 my-1">
                    Mail : {profile.candidatEmail ? profile.candidatEmail : "No Email Provided!"}
                  </p>
                  </div>
                  {
                    profile.candidatEmail != undefined ?
                    <a
                    href="https://accounts.google.com/"
                    className="text-dark fw-bold"
                    target="_blank"
                  >
                  <button className="btn-TODOgmail my-1">
                   
                      <span className="" >
                        <img style={{width:"8%"}} src={require("../images/gmail.svg").default} />
                      </span>
                      Send Email
                  </button>
                  </a>

                  :
                  <a>
                  <button className="btn-TODOgmail my-1" >
                    <span className="">
                      <img style={{width:"8%",marginRight:"5px"}} src={require("../images/gmail.svg").default} />
                    </span>
                    No Email !  
                </button>
                </a>

                  }
<div className="text-start px-1">
                  <p className="Span-Styling my-2 px-3 ">Facebook : {profile.candidatFBURL ? profile.candidatFBURL : "No Facebook URL!"}</p>
                  </div>
                  {
                    profile.candidatFBURL != "" ?
                  <a
                    href={profile.candidatFBURL}
                    target="_blank"
  
                  >
                    <button className=" btn-facebook my-1">
                    <span className="">
                      <img style={{width:"5%",marginRight:"5px"}}
                        src={require("../images/facebook.svg").default}
                      />
                    </span>
                    See Profile
                    </button>
                  </a>
                  :
                  <button className="btn-facebook my-1">
                  <a>
                    <span className="">
                      <img style={{width:"5%",marginRight:"5px"}}  src={require("../images/facebook.svg").default} />
                    </span>
                    No FB URL!
                  </a>
                </button>
}
<div className="text-start px-1">
                  <p className="Span-Styling my-2 px-3 pt-1  my-1">
                    Phone : {profile.candidatPhone ? profile.candidatPhone : "No Phone Number!"}
                  </p>
                  </div>
                  {
                    candidatContactOne != "" ?
                    <a
                      href={`https://wa.me/${profile.candidatPhone}`}
                      target="_blank"
                    >
                                        <button className=" btn-whatsapp my-1"   >
                      <span className="">
                        <img 
                          style={{ width: "8%",marginRight:"5px" }}
                          src={require("../images/whatsapp.svg").default}
                        />
                      </span>
                      Send What’s App
</button>

                    </a>
                    :
                    <button className=" btn-whatsapp my-1" style={{fontSize:"12px",padding:"15px 20px"}}>
                    <a>
                      <span className="">
                        <img style={{width:"8%",marginRight:"5px"}} src={require("../images/whatsapp.svg").default} />
                      </span>
                      No Phone Number!
                    </a>
                  </button>
}
<div className="text-start px-1">
                  <p className="Span-Styling my-2 ">
                    Phone 2 : {profile.candidatAlternatePhone ? profile.candidatAlternatePhone : "No AlternatePhone Number!"}
                  </p>
                  </div>
                  {
                    candidatContactTwo != "" ?
                    <a
                      href={`https://wa.me/${profile.candidatAlternatePhone}`}
                      target="_blank"
                    >
                  <button className=" btn-whatsapp my-1" >

                      <span className="">
                        <img style={{width:"8%",marginRight:"5px"}}
   
                          src={require("../images/whatsapp.svg").default}
                        />
                      </span>
                      Send What’s App
                  </button>

                    </a>
                    :
                    <button className="btn-whatsapp my-1">
                    <a>
                      <span className="">
                        <img style={{width:"8%",marginRight:"5px"}}  src={require("../images/whatsapp.svg").default } />
                      </span>
                      No Phone Number!
                    </a>
                  </button>
}
                </div>
                <div
                  className="col-xxl-8 col-xl-8 col-lg-8 col-md-7 Social-Card px-1 detailsCardClientSee scrollbar heightWidth Social-btnsTwo"
                  id="style-3"
                >
                  <div className="Todo-CardMore force-overflow">
                  <div className="row ">
                      <div className="col-3 pr-0"  style={{maxWidth:"22%"}}> 
                      <p>Langues : </p>
                      </div><div className="col-9 px-0">
                      <span className="Todo-CardMore-span">  {profile.candidatLanguages ? profile.candidatLanguages.join(", ") : "No Language!"}</span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <p className="blue-text">Ready for work :</p>
                      <span className="bluetextCardSee">
                        {profile.candidatStartDate} -{profile.candidatEndDate}
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <p>Permis :</p>
                      <span className="Todo-CardMore-span">
                        {profile.candidatLicensePermis ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <p>Voyage en voiture :</p>
                      <span className="Todo-CardMore-span">
                        {profile.candidatConduireEnFrance ? "Yes" : "No"}
                      </span>
                    </div>
                   
                    <div className="d-flex align-items-center">
                    <div className="d-flex">  <p>Skills/note: </p> <span className="Todo-CardMore-span">{profile.candidatSkills ? profile.candidatSkills : "No Skills!"}</span></div>
                     
                    </div>
                    <div className="d-flex align-items-center">
                      <p className="text-dark">Trouvé sur  : </p>
                      <span className="text-dark Todo-CardMore-span">
                        {profile.candidatJob ? profile.candidatJob : "No Trouvé!"}
                      </span>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 px-0  p-2 Social-Card mt-2">
              <h3 className="experience">Expérience du Candidat </h3>
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
            <div className="col-12 mt-1 pd-00x12 Social-Card">
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
                 <p className="noteThis mb-0">Note : Who entred this candidates/employe on the database</p>
                  
                  </div>
              </div>
            </div>
            <div className="mt-1" style={{ display: 'grid' }}>
              <Carousel responsive={responsive}>
                {
                  recommendations && recommendations.length > 0 ?
                    recommendations.map(recommendation => (
                      <div className="row p-1  m-1 Social-Card client-Card" style={{height:"330px"}}>
                        <div className="col-3">
                          <img 
                            src={
                              require("../images/Card-ImageStar.svg").default
                            }
                          />
                        </div>
                        <div className="col-9 d-flex align-items-center">
                          <p className="mb-0 FontMatchedStyle" style={{ marginTop: '-15px' }}>
                            <b>{recommendation.clientCompanyName.length > 20 ? recommendation.clientCompanyName.slice(0, 21).toLocaleUpperCase() + "..." : recommendation.clientCompanyName.toLocaleUpperCase()}</b>
                          </p>
                        </div>

                          <p className="mb-0 FontStylingCardtext">
                            Secteur : <b>{recommendation.clientActivitySector !== "" ? recommendation.clientActivitySector.toLocaleUpperCase() : "Sector Not Selected!"}</b>
                          </p>
                      

                          <p className="mb-0 FontStylingCardtext">
                            Job : <b>{recommendation.clientJob !== "" ? recommendation.clientJob.toLocaleUpperCase() : "Job Not Selected!"}</b>
                          </p>
                      
                        <div className="col-12 mb-1">
                          <p className="mb-0 FontStylingCardtext">Notes:</p>
                          <p className="mb-0 FontStylingCardtext styledNotes">
                          {recommendation.clientRequiredSkills !== "" ? <div style={{height:"100px"}}>  <ReadMoreReact text={recommendation.clientRequiredSkills}
            min={0}
            ideal={50}
            max={150}
            readMoreText={"....."}/></div>  : <p style={{height:"100px"}} className="mb-0 FontStylingCardtext">No Notes/Skills Available!</p>}
                          </p>
                        </div>
                        <div className="col-6 text-center d-flex align-items-center justify-content-center px-0">
                          <button className="btnMatched" onClick={() => setShowInPreSelectedModal(true)}>Matched</button>
                        
                        </div>
                        <div className="col-6 text-center d-flex align-items-center px-0">
                          <button className="btnNotMatched" onClick={() => removeRecommendation(recommendation._id)}>Not Matched</button>
                        </div>
                      </div>


                    ))
                    :
                    loader ?
                      <div className="col-12 mx-auto">
                        <ProfileLoader width={"300px"} height={"300px"} fontSize={"22px"} fontWeight={700} Title={"Loading.."}/>
                      </div> : 
                      <div className="Social-Card m-1 text-center">No More Client Recommendations!</div>
            
}
              </Carousel>
            </div>
            <div className="col-12 Social-Card mt-1">
              <div className="row p-1 justify-content-between">
                {/* <div className="col-3 text-center">
                  <button type="button" className="btn btn-move" onClick={() => setShowInProgressModal(true)}>
                    Move to In Progress
                  </button>
                  {showInProgressModal ?
                    <InProgressModal props={profile} closeModal={setShowInProgressModal} /> : null
                  }
                  <p className="italic-font">Si embauché</p>
                </div> */}
                <div className="col-3 px-0 text-center">
                  <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        className=" btn-preSelected"
        onClick={() => setShowInPreSelectedModal(true)}
      >
      Move to Preselected
      </button>
                  {showPreSelectedModal?
                  <PreModal 
                   props={profile}
                   closepreModal={setShowInPreSelectedModal}
                   client={null}
                  />
                  :
                  null

                  }
                  <p className="italic-fontStyle text-center">
                    Si vous le préselectionné pour un client en cours de
                    recherche
                  </p>
                </div>
                <div className="col-3 px-0 text-center">
                  <button
                    type="button"
                    className="btn-Archived"
                    onClick={() => setShowArchiveModal(true)}
                  >
                    Archive / Canceled
                  </button>
                  {showArchiveModal ? (
                    <ArchivedModal
                      props={profile}
                      closeModal={setShowArchiveModal}
                      path={"/todolist"}
                      
                    />
                  ) : null}
                </div>
                <div className="col-3 px-0 text-center">
                  <button
                    type="button"
                    className="btn-EditProfile"
                    onClick={editCandidatProfile}
                  >
                    <img src={require("../images/Edit.svg").default} />
                    Edit Profile
                  </button>
              
                </div>
                <div className="col-3 px-0 text-center">
                <a
                    type="button"
                    href="https://www.canva.com/design/DAFA1_f9AmA/ZBNOgKbj-tCDJa9QRj9kNA/edit"
                    target="_blank"
                    className="btn text-white btn-CVManual"
                  >
                    <img src={require("../images/resume.svg").default} />
                    Créer CV Manuel
                  </a>
                  <p className="italic-fontStyle text-center">
                    Edit CV with Canva
                  </p>
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
                {
                  PDFModal ?
                  
                  <PDFGenerate   closeModal={setPDFModal} />
                  : 
                  null
                }
                </div>
                </div>
              <div className="col-12 Social-Card mt-1">
              <div className='row justify-content-between p-1'>
                            <div className='col-4  d-grid text-start'>
                                <label className="PDFFormlabel">Lieu_Mission</label>
                                <input className='form-control inputStylingForView'  placeholder="‎ ‎ ‎ Lieu_Mission" />
                            </div>
                            <div className='col-4  d-grid text-start' >
                            <label className="PDFFormlabel">Durée_Mission</label>
                            <input className='form-control inputStylingForView'  placeholder="‎ ‎ ‎ Durée_Mission" />

                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel  d-flex align-items-start ">Durée_Hebdomadaire_Mission</label>
                            <input className='form-control inputStylingForView' placeholder="‎ ‎ ‎ Durée_Hebdomadaire_Mission"/>

                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel">Candidate_Job</label>
                            <input className='form-control inputStylingForView'  placeholder="‎ ‎ ‎ Candidate_Job" />

                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel">CMP_CANDIDATE</label>
                            <input className='form-control inputStylingForView'  placeholder="‎ ‎ ‎ CMP_CANDIDATE" />

                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel">Contract_date</label>
                            <input className='form-control inputStylingForView'  placeholder="‎ ‎ ‎ Contract_date" />

                            </div>
                            <div className='col-4  d-grid text-start'>
                                                      <label className="PDFFormlabel d-flex align-items-start ">Company_Contact_Name</label>
                            

                            <input className='form-control inputStylingForView' placeholder="‎ ‎ ‎ Company_Contact_Name" />
                            
                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel">NR_INREG</label>
                            <input className='form-control inputStylingForView'  placeholder="‎ ‎ ‎ NR_INREG" />

                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel">SERIE_ID</label>
                            <input className='form-control inputStylingForView'  placeholder="‎ ‎ ‎ SERIE_ID" />

                            </div>
                            <div className='col-6  d-grid text-start'>
                            <label className="PDFFormlabel">Candidate_Adress</label>
                            <input className='form-control inputStylingForView'  placeholder="‎ ‎ ‎ Candidate_Adress" />

                            </div>
                            <div className='col-6  d-grid text-start'>
                            <label className="PDFFormlabel">Company_Siret</label>
                            <input className='form-control inputStylingForView'  placeholder="‎ ‎ ‎ Company_Siret" />

                            </div>
                            <div className='col-12  d-grid text-start'>
                            <label className="PDFFormlabel">Company_Adress</label>
                            <textarea className='TextArea form-control' placeholder='‎ ‎ ‎Company_Adress'></textarea>
                            </div>
                  
</div>
              </div>
             
                         <div className="col-12 Social-Card mt-1">
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
                                {/* {progress > 0 && progress < 100  ?
                                  <ProgressBar className="mt-1" now={progress} label={`${progress}%`} />
                                  :
                                  <button className="btnDownload">
                                    <img src={require("../images/dowBtn.svg").default} />
                                    {doc.originalName.length > 10 ? doc.originalName.slice(0, 11) + "..." : doc.originalName}
                                  </button>
                                } */}
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
                            <RenameDoc  props={RenameData} closepreModal={setRenameDocStatus}  path={"/todoprofile"}/>
                            :
                            null
                          }
                
              
                  </div>
                </div>


              </div>
            </div>
              </div>
            </div>
      </div>
   
    </>
  );
}
export default ToDoProfile;
