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
import FileUploadProgress from "react-fileupload-progress";
import Select from "react-select";
import {ReactComponent as Upload} from "../images/upload.svg"
import {ReactComponent as Download} from '../images/download.svg'
import axios from "axios";
import { API_BASE_URL } from '../config/serverApiConfig';
import { ProgressBar } from "react-bootstrap";
import { Toaster, toast } from 'react-hot-toast';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
})

function PreSelectedView() {
  const navigate = useNavigate();
  const profileData = JSON.parse(localStorage.getItem("profile"));
  const { state } = useLocation();
  const [profile, setProfile] = useState<any>(state ? state : profileData);
  const [showInProgressModal, setShowInProgressModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const candidatMotivationIcons = [{ icon: "😟", motivation: 'Disappointed' }, { icon: "🙁", motivation: 'Not Really' }, { icon: "😊", motivation: 'Like' }, { icon: "🥰", motivation: 'Great' }, { icon: "😍", motivation: 'Super Lovely' }];
  const hiddenFileInput = React.useRef(null);
  const [candidatContactOne, setCandidatContactOne] = useState(profile.candidatPhone != "" ? profile.candidatPhone.split(" ").join("") : "");
  const [candidatContactTwo, setCandidatContactTwo] = useState(profile.candidatAlternatePhone != "" ? profile.candidatAlternatePhone.split(" ").join("") : "");
  const [candidatDocument, setCandidatDocument] = useState("");
  const [progress, setProgress] = useState<any>(0);
  const [docUploaded, setDocUploaded] = useState(false);
  const [documentList, setDocumentList] = useState([]);
  const [renameDoc, setRenameDoc] = useState(false);

  
 const uploadOption=[
 {value:"upload",label:<Upload />,},
 {value:"Download Image",label:<Download />} 
 ]
 const notifyDocumentUploadError = () => toast.error("Document Upload Failed! Please Try Again in few minutes.")
 const notifyDocumentDeleteError = () => toast.error("Document Not Removed! Please Try Again in few minutes.")
 const notifyDocumentUploadSuccess = () => toast.success("Document Uploaded Successfully!");
 const notifyDocumentDeleteSuccess = () => toast.success("Document Removed Successfully!");
  // const [Dissapointed, setDissapointed] = useState(false);
  // const [Notreally, setNotreally] = useState(false);
  // const [Like, setLike] = useState(false);
  // const [Great, setGreat] = useState(false);
  // const [Superlovely, setSuperlovely] = useState(false);
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
            window.location.href = "/todoprofile"
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
  const editCandidatProfile = () => {
    navigate("/editToDo", { state: profile });
  };
  const handleFileUpload = () => {
    hiddenFileInput.current.click();
  }
  const handleFileChange = (e: any) => {
    const fileUploaded = e.target.files[0];
    console.log(fileUploaded);
  }
  const renameCandidatDocument = async (docId: any, docName: any, candidatId: any) => {
    let headers = {
      "Accept": 'application/json',
      "Authorization": "Bearer " + localStorage.getItem('token')
    }
    return await fetch(API_BASE_URL + `renameDocument/?documentId=${docId}&documentName=${docName}&candidatId=${candidatId}`, {
      method: "GET",
      headers: headers
    })
      .then(reD => reD.json())
      .then(resD => resD)
      .catch(err => err)
  }
  const renameDocument = (docId: any, docName: any) => {
    setRenameDoc(true);
    renameCandidatDocument(docId, docName, profile._id).then(resData => {
      console.log(resData)
      setRenameDoc(false);
    }).catch(err => {
      console.log(err)
    })
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
  return (
    <>
      <Toaster position="top-right" containerStyle={{ zIndex: '99999999999' }} />
      <div className="container-fluid">
        <div className="row pr-1">
          {/* <div className="col-12 top-pd text-center">
            <h1 style={{ textDecoration: "underline" }}>
              CANDIDAT: {profile.candidatName}
            </h1>
          </div> */}

          <div
            className="card mt-2 mb-0"
         
          >
            <div className="row text-start topCandidateHeaderPre">
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
                    <img
                      src={require("../images/menlogos.svg").default}
                     className="img-upload-Download"
                    />
               <Select
                          closeMenuOnSelect={true}
                          // onChange={handleImageChange}
  options={uploadOption}
  className="Todoupload"

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
 
                <div className="col-8 p-0">
                <p>Selected  For  client : </p>
<p className="CommentSelection">Comment about selection : Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt </p>
                </div>
                <div className="col-4 d-flex justify-content-end align-items-center">
<button  className="btn customerProfil"><img src={require("../images/eyeProfil.svg").default}/>CUSTOMER PROFIL</button>
                </div>
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
                    <div className="d-flex">
                      <p>Langues : </p>
                      <span> {profile.candidatLanguages.join(", ")}</span>
                    </div>
                    <div className="d-flex ">
                      <p className="blue-text">Ready for work :</p>
                      <span className="blue-text">
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
                      (profile.candidatExperienceDetails.map((detail) =>
                        <tr>
                          <td>{detail.period}</td>
                          <td>{detail.location}</td>
                          <td>{detail.workDoneSample}</td>
                        </tr>
                      )
                      ) : (
                        <tr>
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
                {/* <div className="col-3 text-center">
                  <button type="button" className="btn btn-move" onClick={() => setShowInProgressModal(true)}>
                    Move to In Progress
                  </button>
                  {showInProgressModal ?
                    <InProgressModal props={profile} closeModal={setShowInProgressModal} /> : null
                  }
                  <p className="italic-font">Si embauché</p>
                </div> */}
               
                <div className="col-3 text-center">
                  <button
                    type="button"
                    className="btn btn-pre-Archived"
                    onClick={() => setShowArchiveModal(true)}
                  >
                    Archive / Canceled
                  </button>
                  <p className="italic-fontStyle text-start ">Si plus d’actualité</p>
                  {showArchiveModal ? (
                    <ArchivedModal
                      props={profile.candidatName}
                      closeModal={setShowArchiveModal}
                      path={"/todolist"}
                    />
                  ) : null}
                </div>
                <div className="col-3 text-center">
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
                <div className="col-3 text-center">
                  <button
                    type="button"
                    className="btn btn-pre-CVManual"
                    onClick={editCandidatProfile}
                  >
                    <img src={require("../images/resume.svg").default} />
                    Créer CV Manuel
                  </button>
                  <p className="italic-fontStyle text-start">
                    Edit CV with Canva
                  </p>
                </div>
          <div className="col-3 text-center">
                  <button type="button" className="btn btn-pre-moveProgress" onClick={() => setShowInProgressModal(true)}>
                    Move to In Progress
                  </button>
                  {showInProgressModal ?
                    <InProgressModal props={profile} closeModal={setShowInProgressModal} /> : null
                  }
                  <p className="italic-fontStyle">Si embaché pour un client en cours de recherche</p>
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
                      documentList.length > 0 ?
                        documentList.map((doc, index) =>
                          <div className="col-6 mx-0">
                            <div className="row CardClassDownload mt-1 mx-0">
                              <div className="col-4 d-flex align-items-center ">
                                <p className="download-font mb-0">{doc.originalName}</p>
                              </div>
                              <div className="col-6 text-center">
                                {progress > 0 && docUploaded ?
                                  <ProgressBar className="mt-1" now={progress} label={`${progress}%`} />
                                  :
                                  <button className="btnDownload">
                                    <img src={require("../images/dowBtn.svg").default} />
                                    {doc.originalName.length > 10 ? doc.originalName.slice(0, 11) + "..." : doc.originalName}
                                  </button>
                                }
                              </div>
                              <div className="col-2  d-flex align-item-end justify-content-end">
                                <img
                                  src={require("../images/editSvg.svg").default}
                                  style={{ width: "20px", marginRight: "5px", cursor: 'pointer' }}
                                  onClick={() => renameDocument(doc._id, doc.documentName)}
                                />
                                <img
                                  src={require("../images/Primaryfill.svg").default}
                                  style={{ width: "20px", cursor: 'pointer' }}
                                  onClick={() => deleteDocument(doc._id, doc.documentName)}
                                />
                              </div>
                            </div>
                          </div>
                        ) : <p className="text-center">No Documents Uploaded!</p>
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
export default PreSelectedView;
