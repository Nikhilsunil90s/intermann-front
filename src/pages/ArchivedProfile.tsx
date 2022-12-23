import React, { useEffect, useState } from "react";
import { Link, useNavigate, useNavigationType } from 'react-router-dom'
import '../CSS/Archived.css'
import { useLocation } from "react-router-dom";
import { API_BASE_URL } from '../config/serverApiConfig';
import axios from "axios";
import HideProfile from "../components/Modal/HideProfileModalForArchived";
import ResetProfile from "../components/Modal/RestProfileForArchived";
import { Toaster, toast } from 'react-hot-toast';
import UploadDow from '../components/Modal/SelectUploadDownload'
import PDFGenerate from '../components/Modal/PDFGenerateModal'
import moment from "moment";
import ErrorLoader from "../components/Loader/SearchBarError";
import DOCUSIGNModalCandidate from '../components/Modal/DOCUSIGNModalCandidate'
import { Tabs, Tab } from "react-tabs-scrollable";
import Representance from "../components/Modal/RepresentanceModalCandidate";
import AvanceModal from "../components/Modal/AvanceModalCandidate";
import PDFBoxCandidate from "../components/PDFboxBothSide/PDFBoxCandidate";
import CandidateContract from "../components/CandidateComponents/CandidateContract";
import DocumLink from "../components/Modal/CandidateRepresentModal/LinkModal"
import ViewPageDetailsBox from '../components/CandidateComponents/ViewPageDetailsBox'
import SocialButtons from '../components/CandidateComponents/ViewPageSocialButtons'
import { motion } from "framer-motion";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
})

const ArchivedProfile = () => {
  const profileData=JSON.parse(localStorage.getItem("archive"))
 const navigate=useNavigate()
  const { state } = useLocation();

  const [profile, setProfile] = useState<any>(state ? state : profileData);
  const [hideProfile,setHideProfile]=useState(false)
  const [ResetModalProfile,setResetModalProfile]=useState(false)
  const candidatMotivationIcons = [{ icon: "", motivation: 'No Motivation!' },{ icon: "😟", motivation: 'Disappointed' }, { icon: "🙁", motivation: 'Not Really' }, { icon: "😊", motivation: 'Like' }, { icon: "🥰", motivation: 'Great' }, { icon: "😍", motivation: 'Super Lovely' }];
  const hiddenImageInput = React.useRef(null);
  const [UploadBtn,setSelectUpload]= useState(false)
    const [candidatImage, setCandidatImage] = useState(profile.candidatPhoto && profile.candidatPhoto?.url !== undefined ? profile.candidatPhoto?.url : "");
    const [PDFModal,setPDFModal]=useState(false)
    const [representance,setRepresentance]=useState(false)
  const [ReAvance,setReAvance]=useState("")
  const [Avance,setAvance]=useState(false)
    const [docUploaded, setDocUploaded] = useState(false);
    const [CONTRACT_EMPLOYE_INTERMANN, setCONTRACT_EMPLOYE_INTERMANN] = useState() as any;
    const [Fiche_Medicale, setFiche_Medicale] = useState() as any;
    const [Assurance, setAssurance] = useState() as any;
    const [ID_CARD, setID_CARD] = useState() as any;
    const [Reges, setReges] = useState() as any;
    const [Fiche_mise_à_disposition, setFiche_mise_à_disposition] =
      useState() as any;
      const [DocuLink,setDocuLink]=useState(false)
      const [repID,setRepId]=useState("")

    const datenow=moment().format('YYYY-MM-DD')
  const [DocumentSignModal,setDocuSignModal]=useState(false)
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

   
    let data={profileData:profile,path:"/archivedlist/archivedprofile"}
    const editCandidatProfile = () => {
      navigate("/archivedlist/editArchived", { state: data });
    };

    useEffect(()=>{

         setProfile(state ? state : profileData)

     
   },[state])
   
   const notifyDocumentUploadSuccess = () => toast.success("Document Uploaded Successfully!");
   const notifyDocumentDeleteSuccess = () => toast.success("Document Removed Successfully!");
  const notifyDocumentDeleteError = () => toast.error("Document Not Removed! Please Try Again in few minutes.")
   

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
}, [profile.candidatDocuments]);

    const notifyDocumentUploadError = () => toast.error("Document Upload Failed! Please Try Again in few minutes.")

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
                window.location.href = "/archivedlist/archivedprofile"
              },2000)
            
            } else {
              notifyDocumentUploadError()
            }
          })
          .catch(err => { console.log(err) })
        return;
      }
   
    }
    useEffect(() => {
      fetchCandidat(profile._id).then(resData => {  
        setCandidatImage("")
        if (resData.status) {
          setProfile(resData.data)
        
          setCandidatImage(resData.data.candidatPhoto !== undefined ? resData.data.candidatPhoto?.url : "")
        
        }
      })
        .catch(err => {
          console.log(err)
        })
    }, [])

 


  return (
    <>
      <Toaster position="top-right" containerStyle={{ zIndex: '99999999999' }} />
      <div className="container-fluid " style={{marginTop:"80px"}}>
        <div className="row px-1">
             <div
            className="card mt-2 marginTopCard mb-0"
        
          >
            <div className="row topCandidateHeader">
              <div className="col-6  d-flex align-items-center">
                <div className="stable">
                  <Link to="/archivedlist">
                    <button
                      type="button"
                      className="btn d-flex align-items-center pd-none"
                    >
                      <img src={require("../images/return.svg").default} />
                      <h2 className="card-Leads mb-0"> Candidate Profile</h2>
                    </button>
                  </Link>
                </div>
              </div>
              <div className="col-6  d-flex align-items-center justify-content-end">
                {/* <Link to="/editArchived"> */}
                <button className="btn EditArchive" 
                onClick={editCandidatProfile}
                >
                  <img src={require("../images/Edit.svg").default} />
                  Edit Profile
                </button>
                {/* </Link> */}
              </div>
            </div>
          </div>
           
          <motion.div
  initial={{ scale: 0 }}
  animate={{ rotate:0, scale:1}}
  transition={{
    type: "spring",
    stiffness: 120,
    damping: 50
  }}
  className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 pb-0 mt-2">
              <div className="row bg-ArchiveDetails mt-0">
                <div className="col-xxl-2 col-xl-2 col-md-2 col-sm-2 text-center">
                {candidatImage !== "" ?
                   
                      <img
                        // src={require("../images/menlogos.svg").default}
                        src={candidatImage}
                     className="imgArchived-upload-download"
                      /> :
                    <img
                    src={require("../images/menlogos.svg").default}
                   className="imgArchived-upload-download"

                  />
              
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
<input                     type="file"
                    ref={hiddenImageInput}
                    onChange={fileChange}
                    name="candidatPhoto"
                    style={{ display: 'none' }}
                  />
                </div>
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 card-TodoProfile">
                  <div className="d-flex">
                    <p>
                     {profile.candidatName.toLocaleUpperCase()}|{profile.candidatAge ? profile.candidatAge :"No"}
                    </p>
                    <span className="card-xlSpan">(Age)</span>
                  </div>
                  <div>
                    <div className="d-flex mb-0">
                    <p>Motivation : <b>{profile.candidatMotivation !== undefined ? candidatMotivationIcons[profile.candidatMotivation].icon + " " + candidatMotivationIcons[profile.candidatMotivation ].motivation : "No Motivation!"} </b></p>
                    </div>
                  </div>
                  <p>Secteur : {profile.candidatActivitySector ? profile.candidatActivitySector.toLocaleUpperCase() : "No Secteur!"}</p>
                  <p className="" style={{ width: "150%" }}>
                    Métier/Job : {profile.candidatJob ? profile.candidatJob.toLocaleUpperCase() :"No Job!"}
                  </p>
                </div>
                <div className="col-4 px-0 text-end end-class align-items-center justify-content-end pt-1 pr-2">
                  <div className="d-grid justify-content-end align-items-center pb-1">
                  <button className="ArchiveLargebtn pb-1 p-0"><img src={require("../images/ArchivedBtn.svg").default} /></button>
                  </div>
                  <p className="textinPro text-end pl-5 ">
                  Candidat Archivé/Annulé/Viré
                  </p>
                  <p className="text-PREBtn-child pb-1">This candidate have archived</p>

                 
                </div>
              </div>
            </motion.div>
            <div className="col-12 mt-2">
              <div className="row boxArchivedProfile">
                <div className="whyFont"><p>WHY THIS CANDIDATES HAVE BEEN ARCHIVED: <span> {profile?.candidatArchived?.reason}</span></p></div>
              </div>
            </div>
            
             <div className="col-12 mt-2 ">
              <div className="row justify-content-between">
              {/* detailBox */}
              <motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  transition={{ duration: 0.7, delay: 0.5 }}
  variants={{
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: 50 }
  }}
                  className="col-7 Archived-Card px-1  scrollbar heightWidth"
                  id="style-3"
                  style={{ maxWidth: "56%", marginRight: "10px" }}
                >
             <ViewPageDetailsBox  props={profile} startDate={startDate}    EndDate={EndDate}    />
                </motion.div>
              {/* detailBox */}

              <motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  transition={{ duration: 0.7, delay: 0.5 }}
  variants={{
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -50 }
  }}
                  className="col-xxl-5 col-xl-5 col-md-5 col-lg-5 Social-Card text-center p-1 heightWidth"
                  style={{ maxWidth: "49%" }}
                >
                 <SocialButtons   props={profile}    />
                </motion.div>
              </div>
            </div>
            <div className="col-12  p-2 Archived-Card mt-2">
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
            <div className="col-12 mt-2 p-1 Archived-Card">
              <div className="row">
                <div className="col-12 d-flex AnneesStyle">
                 <p className="">Années d’expériance </p>
                 <span>: {profile.candidatYearsExperience ? profile.candidatYearsExperience : "0"}years </span>
                </div>
               <div className="col-12 d-flex AddressEnteredBy">
                 <p className="">Ajouté par/Added by </p>
                 <span className="text-capitalize">: {profile.enteredBy ?profile.enteredBy :"✘ No Added by!"}</span>
                  
                  </div>
                  <div className="col-12">
                 <p className="noteThis">Note : Who entred this candidates/employe on the database</p>
                  
                  </div>
              </div>
            </div>
            <div className="col-12 Archived-Card mt-2">
              <div className="row p-1 justify-content-between">
              <div className="col-3 px-0 text-center">
                  <button
                    type="button"
                    className="btn btn-ArchiveEditProfile"
                    onClick={editCandidatProfile}
                  >
                    <img src={require("../images/Edit.svg").default} />
                    Edit Profile
                  </button>
                  <p className="italic-fontStyle text-center">Editer le profil</p>
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
                  <p className="italic-fontStyle text-center">
                    Edit CV with Canva
                  </p>
                </div>
                <div className="col-3 px-0 text-center">
                     <button className="hideProfile" onClick={()=>setHideProfile(true)}>
                    <img src={require("../images/visibility.svg").default} />
                      Hide this profile</button>
                      <p className="italic-fontStyle text-center">Profile will be not deleted but hidded</p>
                </div>
                <div className="col-3 px-0">
                     <button className="restProfile" onClick={()=>setResetModalProfile(true)}>
                    <img src={require("../images/rest.svg").default} />
                    Reset this profile</button>
                    <p className="italic-fontStyle text-center">Profile will be reset to todo stage</p>
                </div>
                <div className="col-12">
                  <div className="row">
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
                <div className="col-4 pl-1 px-0 text-start">
                <button
                    type="button"
                    onClick={()=>setRepresentance(true)}
                    className="btn text-white btn-pre-moveProgress"
                  >
                    <img src={require("../images/resume.svg").default} />
                    Générer représentance
                  </button>
                 
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
                
                </div >
                </div>

                {
                  PDFModal ?
                  
                  <PDFGenerate props={profile}  LinkModal={setDocuSignModal}  closeModal={setPDFModal} path="/archivedlist/archivedprofile"/>
                  : 
                  null
                }
       {
        hideProfile?
        <HideProfile props={profile} closeModal={setHideProfile}  path={"/todolist"}/>
        :
        null
       }
        {
        ResetModalProfile?
        <ResetProfile props={profile} closeModal={setResetModalProfile}  path={"/todolist"}/>
        :
        null
       } {
        DocumentSignModal ? 
        <DOCUSIGNModalCandidate props={profile} closeModal={setDocuSignModal} />

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
              
      <div className="col-12 Social-Card my-1">
              <div className='row  p-1'>
                            {
                  JSON.stringify(profile).includes(JSON.stringify(profile.candidatContract)) ?
                  <>
                  <CandidateContract  props={profile} path={"/archivedlist/editArchived"}   />
                         
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
  )
}

export default ArchivedProfile;

