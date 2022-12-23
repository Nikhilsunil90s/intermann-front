import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/Candidatefile.css";
import { useLocation } from "react-router-dom";
import ArchivedModal from "../components/Modal/ArchivedModal";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import PreModal from "../components/Modal/preSelectedModal";
import ProfileLoader from "../components/Loader/ProfilesLoader";
import { API_BASE_URL } from '../config/serverApiConfig';
import { Toaster, toast } from 'react-hot-toast';
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import ReadMoreReact from 'read-more-react';
import UploadDow from '../components/Modal/SelectUploadDownload'
import PDFGenerate from '../components/Modal/PDFGenerateModal'
import moment from 'moment'
import ErrorLoader from "../components/Loader/SearchBarError";
import DOCUSIGNModalCandidate from '../components/Modal/DOCUSIGNModalCandidate'
import PDFBoxCandidate from "../components/PDFboxBothSide/PDFBoxCandidate";
import InProgressModal from "../components/Modal/InProgressModal";
import Representance from "../components/Modal/RepresentanceModalCandidate";
import AvanceModal from "../components/Modal/AvanceModalCandidate";
import CandidateContract from "../components/CandidateComponents/CandidateContract";
import DocumLink from "../components/Modal/CandidateRepresentModal/LinkModal"
import { Tabs, Tab } from "react-tabs-scrollable";
import ViewPageDetailsBox from '../components/CandidateComponents/ViewPageDetailsBox'
import SocialButtons from '../components/CandidateComponents/ViewPageSocialButtons'
import { motion } from "framer-motion";

interface State {
  profileData: any,
  path: any,
  UserID:any
}
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
})

function ToDoProfile() {
  const notifyDocumentUploadSuccess = () => toast.success("Document Uploaded Successfully!");
  const profileData = JSON.parse(localStorage.getItem("profile"));

  const notifyDocumentUploadError = () => toast.error("Document Upload Failed! Please Try Again in few minutes.")
  const notifyDocumentDeleteError = () => toast.error("Document Not Removed! Please Try Again in few minutes.")

  const navigate = useNavigate();
  const { state} = useLocation();

  const [profile, setProfile] = useState<any>(state ? state : profileData);

  const [showPreSelectedModal, setShowInPreSelectedModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const candidatMotivationIcons = [{ icon: "", motivation: 'No Motivation!' },{ icon: "😟", motivation: 'Disappointed' }, { icon: "🙁", motivation: 'Not Really' }, { icon: "😊", motivation: 'Like' }, { icon: "🥰", motivation: 'Great' }, { icon: "😍", motivation: 'Super Lovely' }];
  const hiddenFileInput = React.useRef(null);
  const [recommendations, setRecommendations] = useState([]);
  const [candidatContactOne, setCandidatContactOne] = useState(profile.candidatPhone != "" ? profile.candidatPhone.split(" ").join("") : "");
  const [loader, setLoader] = useState(false);
  const hiddenImageInput = React.useRef(null);
  const [representance,setRepresentance]=useState(false)
  const [Avance,setAvance]=useState(false)
  const [docUploaded, setDocUploaded] = useState(false);
  const [candidatImage, setCandidatImage] = useState(profile.candidatPhoto && profile.candidatPhoto?.url !== undefined ? profile.candidatPhoto?.url : "");
  const [UploadBtn,setSelectUpload]= useState(false)
  const [showInProgressModal, setShowInProgressModal] = useState(false);
  const [PDFModal,setPDFModal]=useState(false)
  const [DocumentSignModal,setDocuSignModal]=useState(false)
  const [DocuLink,setDocuLink]=useState(false)
  const [ReAvance,setReAvance]=useState("")
  const [repID,setRepId]=useState("")
  const [CONTRACT_EMPLOYE_INTERMANN, setCONTRACT_EMPLOYE_INTERMANN] = useState() as any;
  const [Fiche_Medicale, setFiche_Medicale] = useState() as any;
  const [Assurance, setAssurance] = useState() as any;
  const [ID_CARD, setID_CARD] = useState() as any;
  const [Reges, setReges] = useState() as any;
  const [Fiche_mise_à_disposition, setFiche_mise_à_disposition] =
    useState() as any;
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
    const datenow = moment().format("YYYY-MM-DD");
  
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

 useEffect(()=>{
      setProfile(state ? state : profileData)
    
      if(Client.length == 0){
        fetchProfilesClients().then((res)=>setClients([...res]))
      }
},[state])


const [Client,setClients]=useState([])as any


const fetchProfilesClients = async () => {
  return await fetch(API_BASE_URL + "allToDoClients", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((resD) => resD.json())
    .then(res => res)
    .catch((err) => err);
};


  let data={profileData:profile ,path:"/todolist/todoprofile"}

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

 const removeRecommendation = (rId: any) => {

  let filteredRecommendations = recommendations.filter((recomm) => {
    return recomm._id !== rId;
  })
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
    navigate("/todolist/editToDo", { state: data });
  };
  const handleImageUpload = () => {
    hiddenImageInput.current.click();
  }

  const handleFileUpload = () => {
    hiddenFileInput.current.click();
  }
  
  const handleImageChange = (val) => {
    if (val === 'upload') {
      handleImageUpload()
    } else if (val === 'Download') {
      window.open(candidatImage);
    }
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
          if (datares.data.status) {
     // setCandidatImage(datares.data.filename)
     notifyDocumentUploadSuccess()

     
            setTimeout(()=>{
              window.location.href = "/todolist/todoprofile"
            },2000)
          } else {
            notifyDocumentUploadError()
          }
        })
        .catch(err => { console.log(err) })
      return;
    }
    if (e.target.name === 'candidatDocuments') {
 }
}
  useEffect(() => {
    setProfile((prev) => ({ ...prev, ["clients"]: [...recommendations] }));
    setLoader(false);
  }, [recommendations])

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


  useEffect(() => {
    setLoader(true);
    fetchRecommendations(profile.candidatActivitySector)
      .then(respData => {
        if (respData.status) {
          setRecommendations([...respData.data]);
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
            <motion.div
  initial={{ scale: 0 }}
  animate={{ rotate:0, scale:1}}
  transition={{
    type: "spring",
    stiffness: 120,
    damping: 50
  }}  className="row bg-todoTodoDetails mt-0">
                <div className="col-xxl-2 col-xl-2 col-md-2 col-sm-2 text-center ">
                {candidatImage !== "" ?
                
                      <img
                        // src={require("../images/menlogos.svg").default}
                        src={candidatImage}
                     className="img-uploadTodo-Download"
                      />
                  //   <ReactRoundedImage
                  //   image={candidatImage}
                  //   roundedColor="#b3e0ff"
                  //   imageWidth="130"
                  //   imageHeight="130"
                  //   roundedSize="13"
                  //   borderRadius="70"
                  //   hoverColor="#1abeff"
                  // />
                      :

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
                      Name : {profile.candidatName.toLocaleUpperCase()}|{profile.candidatAge ?  profile.candidatAge : "0" }
                    </p>
                    <span className="card-xlSpan">(Age)</span>
                  </div>
                  <div>
                    <div className="d-flex mb-0">
                    <p>Motivation : <b>{profile.candidatMotivation ? candidatMotivationIcons[profile.candidatMotivation ].icon + " " + candidatMotivationIcons[profile.candidatMotivation ].motivation : "✘ No Motivation!"}</b> </p>
                    </div>
                  </div>
                  <p>Secteur : {profile.candidatActivitySector ? profile.candidatActivitySector.toLocaleUpperCase() : "No Sector!"}</p>
                  <p className="" style={{ width: "150%" }}>
                    Métier/Job :{profile.candidatJob ? profile.candidatJob.toLocaleUpperCase() : "No Job!"}
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
              </motion.div>
            

            <div className="col-xxl-12 col-xl-12 col-lg-12 col-12-md  pt-1 px-0">
              <div className="row justify-content-between">
              <motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  transition={{ duration: 0.7, delay: 0.5 }}
  variants={{
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: 50 }
  }}

                  className="col-xxl-5 col-xl-5 col-md-5 col-lg-5 Social-Card text-center p-1 Social-btns"
                  style={{ maxWidth: "49%" }}
                >
              <SocialButtons  props={profile}         />
                  
                </motion.div>
                {/* Details Box */}
                <motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  transition={{ duration: 0.7, delay: 0.5 }}
  variants={{
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -50 }
  }}

                  className="col-xxl-8 col-xl-8 col-lg-8 col-md-7 Social-Card px-1 detailsCardClientSee scrollbar heightWidth Social-btnsTwo"
                  id="style-3"
                >
             <ViewPageDetailsBox  props={profile} startDate={startDate}    EndDate={EndDate}    />
                </motion.div>
                {/* End Box */}
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
                        <tr key={detail}>
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
            <div className="col-12 mt-1 pd-00x12 Social-Card">
              <div className="row">
                <div className="col-12 d-flex AnneesStyle">
                 <p className="">Années d’expériance :</p>
                 <span> {profile.candidatYearsExperience ? profile.candidatYearsExperience +"years" : "✘✘!"} </span>
                </div>
                <div className="col-12 d-flex AddressEnteredBy">
                 <p className="">Adresse  </p>
                 <span className="text-capitalize"> :  {profile.candidatAddress ? profile.candidatAddress : "✘✘No Address!"}</span>
                </div><div className="col-12 d-flex AddressEnteredBy">
                 <p className="">Ajouté par/Added by</p>
                 <span>: {profile.enteredBy}</span>
                  
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
                      <div className="row p-1  m-1 Social-Card client-Card" style={{height:"330px"}} key={recommendation}>
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
                          <div className="mb-0 FontStylingCardtext styledNotes">
                          {recommendation.clientRequiredSkills !== "" ? <div style={{height:"100px"}}>  <ReadMoreReact text={recommendation.clientRequiredSkills}
            min={0}
            ideal={50}
            max={150}
            readMoreText={"....."}/></div>  : <p style={{height:"100px"}} className="mb-0 FontStylingCardtext">No Notes/Skills Available!</p>}
                          </div>
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
                    className="btn-EditProfile"
                    onClick={editCandidatProfile}
                  >
                    <img src={require("../images/Edit.svg").default} />
                    Edit Profile
                  </button>
              
                </div>
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
                <div className="col-3 px-0 text-center">
                <button
                    type="button"
                    className="btn text-white btn-CVManual"
                    onClick={() => setShowInProgressModal(true)}
                  >
                    Move to In Progress
                  </button>
                 
                </div>
                <div className="col-4 px-0 text-start">
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
                    onClick={()=>{setRepresentance(true)}}
                    className="btn text-white btn-pre-moveProgress"
                  >
                    <img src={require("../images/resume.svg").default} />
                    Générer représentance
                  </button>
                 
                </div> <div className="col-3 px-0 text-center">
                <button
                    type="button"
                    onClick={()=>setAvance(true)}
                    className="btn text-white btn-pre-moveProgress"
                  >
                    <img src={require("../images/resume.svg").default} />
                    Générer Avance
                  </button>
                
                </div>
                {
                  PDFModal ?
                  
                  <PDFGenerate props={profile}   LinkModal={setDocuSignModal}  closeModal={setPDFModal} path="/todolist/todoprofile" />
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
                </div>
                </div>
              <div className="col-12 Social-Card mt-1">
              <div className='row  p-1'>
              {
                  JSON.stringify(profile).includes(JSON.stringify(profile.candidatContract)) ?
                  <>

                  <CandidateContract  props={profile} path={"/editToDo"}   />
                            {/* <div className='col-4  d-grid text-start'>
                                <label className="PDFFormlabel">Lieu_Mission</label>
                                <input className='form-control inputStylingForView'  onClick={editCandidatProfile} value={profile.candidatContract ? profile.candidatContract.lieu_mission ? profile.candidatContract.lieu_mission: "input Not Available!" : "input Not Available!"}  placeholder="‎ ‎ ‎ Lieu_Mission" />
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
                            </div> */}
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
<PDFBoxCandidate  props={profile}  value={setProfile}   />

</>
                      
              </div>
              {DocuLink ?
              <DocumLink   props={profile} closeModal={setDocuLink} id={repID} ReAvance={ReAvance}   />

              :
              null
              }
              {
                            DocumentSignModal ? 
                            <DOCUSIGNModalCandidate props={profile} closeModal={setDocuSignModal} />
                  
                            :
                            null
                  
                          } 
                           {showInProgressModal ?
                            <InProgressModal props={profile} closeModal={setShowInProgressModal} /> : null 
                          }
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
export default ToDoProfile;
