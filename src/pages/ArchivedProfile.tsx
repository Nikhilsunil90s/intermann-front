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
    const [Avance,setAvance]=useState(false)
    const [contract_date,setcontract_date]=useState()as any
    const [debutMissionDate,setdebutMissionDate]=useState()as any
    const [fin_mision,setfin_mision]=useState()as any
    const [GetMonth,setMonth]=useState()as any
    const [GetMonth2,setMonth2]=useState()as any
    const [documentList, setDocumentList] = useState([])as any;
    const [GetMonth3,setMonth3]=useState()as any
    const [docUploaded, setDocUploaded] = useState(false);
    const [CONTRACT_EMPLOYE_INTERMANN, setCONTRACT_EMPLOYE_INTERMANN] = useState() as any;
    const [Fiche_Medicale, setFiche_Medicale] = useState() as any;
    const [Assurance, setAssurance] = useState() as any;
    const [ID_CARD, setID_CARD] = useState() as any;
    const [Reges, setReges] = useState() as any;
    const [Fiche_mise_à_disposition, setFiche_mise_à_disposition] =
      useState() as any;


    const datenow=moment().format('YYYY-MM-DD')
  const [DocumentSignModal,setDocuSignModal]=useState(false)
    
    let date = new Date(datenow);
  
   let start = new Date(profile.candidatStartDate);
   let end = new Date(profile.candidatEndDate);

   
    let data={profileData:profile,path:"/archivedprofile"}
    const editCandidatProfile = () => {
      navigate("/editArchived", { state: data });
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
    
    useEffect(()=>{
      if(profile.candidatContract){
     
        let tempdate =new Date(profile.candidatContract.contract_date)
        setMonth(tempdate.getMonth()+ 1)
        let NewCdate=[tempdate.getFullYear() , GetMonth,tempdate.getDate()].join("-")
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
                window.location.href = "/archivedprofile"
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
           
             <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 pb-0 mt-2">
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
                    <p>Motivation : {candidatMotivationIcons[profile.candidatMotivation].icon + " " + candidatMotivationIcons[profile.candidatMotivation ].motivation} </p>
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
            </div>
            <div className="col-12 mt-2">
              <div className="row boxArchivedProfile">
                <div className="whyFont"><p>WHY THIS CANDIDATES HAVE BEEN ARCHIVED: <span> {profile?.candidatArchived?.reason}</span></p></div>
              </div>
            </div>
            
             <div className="col-12 mt-2 ">
              <div className="row justify-content-between">
              
                <div
                  className="col-7 Archived-Card px-1  scrollbar heightWidth"
                  id="style-3"
                  style={{ maxWidth: "56%", marginRight: "10px" }}
                >
                  <div className="Archived-CardMore force-overflow">
                  <div className="row ">
                      <div className="col-3 pr-0"  style={{maxWidth:"22%"}}> 
                      <p>Langues : </p>
                      </div><div className="col-9 px-0">
                      <span> {profile.candidatLanguages.length  ? profile.candidatLanguages.join(", ") : "✘ No Language!"}</span>
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
                      <span>{profile.candidatSkills ? profile.candidatSkills :"✘ No Skills!"}</span>
                    </div>
                    <div className="d-flex">
                      <p className="text-dark">Trouvé sur  : </p>
                      <span className="text-dark">
                        {profile.candidatJob ? profile.candidatJob :"✘ No Trouvé sur!"}
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
                  <p className="Span-Styling my-2 px-3">{profile.candidatFBURL ? "Facebook : " + profile.candidatFBURL : null}</p>
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
                    {profile.candidatPhone ?  " Phone :" + profile.candidatPhone : null}
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
                   {profile.candidatAlternatePhone !== "" || profile.cadidatAlternatePhone !== undefined ? "Phone 2 :" + profile.candidatAlternatePhone : null}
                  </p>
                  </div>
                 {
                    profile.candidatAlternatePhone ?
                    <a
                    href={`https://wa.me/${profile.candidatAlternatePhone}`}
                    target="_blank"
                  >
                  <button className="btn-whatsapp">
               
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
                 <p className="">Années d’expériance :</p>
                 <span> {profile.candidatYearsExperience ? profile.candidatYearsExperience : "✘ No "}years </span>
                </div>
               <div className="col-12 d-flex AddressEnteredBy">
                 <p className="">Ajouté par/Added by :</p>
                 <span> {profile.enteredBy ?profile.enteredBy :"✘ No Added by!"}</span>
                  
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
                  
                  <PDFGenerate props={profile}  LinkModal={setDocuSignModal}  closeModal={setPDFModal} path="/archivedprofile"/>
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
                 <Representance   props={profile}  closeModal={setRepresentance}    />

                  :
                  null
                }
                {
                  Avance ?
                  <AvanceModal  props={profile} closeModal={setAvance} />
                  :
                  null
                }

      <div className="col-12 Social-Card my-1">
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

