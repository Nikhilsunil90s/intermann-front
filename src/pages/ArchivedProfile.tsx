import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { Link, useNavigate, useNavigationType } from 'react-router-dom'
import '../CSS/Archived.css'
import { useLocation } from "react-router-dom";
import {ReactComponent as Upload} from "../images/upload.svg"
import {ReactComponent as Download} from '../images/download.svg'
import Select from 'react-select'


const ArchivedProfile = () => {
 const navigate=useNavigate()
  const { state } = useLocation();
  const [profile, setProfile] = useState<any>(state);
  const candidatMotivationIcons = [{ icon: "😟", motivation: 'Disappointed' }, { icon: "🙁", motivation: 'Not Really' }, { icon: "😊", motivation: 'Like' }, { icon: "🥰", motivation: 'Great' }, { icon: "😍", motivation: 'Super Lovely' }];
  const uploadOption=[
    {value:"upload",label:<Upload />,},
    {value:"Download Image",label:<Download />} 
    ]


    const editCandidatProfile = () => {
      navigate("/editArchived", { state: profile });
    };
  // useEffect(() => {
  //   window.scroll({
  //     top: 0,
  //     left: 0,
  //     behavior: "smooth",
  //   });
  //   console.log(profile);
  // });

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 top-pd text-center">
            <h1 style={{ textDecoration: "underline" }}>CANDIDAT: {profile.candidatName}</h1>
          </div>
          {/* <div className="col-6">
            <div className="stable">
              <Link to="/archivedlist">
                <button type="button" className="btn bg-archive-btn">
                  <img src={require("../images/return.svg").default} />
                  Retrun to - Archived List Of candidates
                </button>
              </Link>
            </div>
          </div>
          <div className="col-6  text-end ">
            <Link to="/">
            </Link>
            <button className="btn btn-edit-bgb">
              <img src={require("../images/Edit.svg").default} />
              Edit Profile
            </button>
          </div> */}
             <div
            className="card "
            style={{
              padding: "0px 15px",
              borderRadius: "15px",
              marginBottom: "0px",
            }}
          >
            <div className="row text-start">
              <div className="col-6">
                <div className="stable">
                  <Link to="/archivedlist">
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
              <div className="col-6 text-end">
                <Link to="/editArchived">
                <button className="btn EditArchive" 
                onClick={editCandidatProfile}
                >
                  <img src={require("../images/Edit.svg").default} />
                  Edit Profile
                </button>
                </Link>
              </div>
            </div>
          </div>
            {/* <div className="col-12 p-3 bg-color-card">
              <div className="row">
                <div className="col-2 text-center ">
                  <img
                    src={require("../images/menlogos.svg").default}
                    style={{ width: "90%" }}
                  />

                  <button type="button" className="btn btn-upload">
                    UPLOAD PHOTO
                  </button>
                </div>
                <div className="col-5 card-xl">
                  <p>Name : {profile.candidatName}</p>
                  <p>Age : {profile.candidatAge}</p>
                  <div>

                    <p>
                      Motivation:
                      <StarRatings
                        rating={profile.candidatMotivation}
                        starRatedColor="#ffc107"
                        // changeRating={}
                        numberOfStars={profile.candidatMotivation}
                        starDimension={"19px"}
                        starSpacing={"1px"}
                        name="rating"
                      />
                    </p>
                  </div>
                  <p>Secteur : {profile.candidatActivitySector}</p>
                  <p>Métier/Job : {profile.candidatJob}</p>
                </div>
                <div className="col-5 text-end end-class">
                  <div>
                    <button type="button" className="btn btnArchive">
                      <span><img src={require("../images/multiplyyy.svg").default} /></span>
                      ARCHIVED
                    </button>
                  </div>
                  <p className="fw-bold">Candidat Archivé/Annulé/Viré</p>
                  <p>This candidate have been Archived</p>
                </div>
              </div>
            </div> */}
             <div className="col-12 ">
              <div className="row bg-ArchiveDetails">
                <div className="col-2 text-center ">
                  <img
                    src={require("../images/menlogos.svg").default}
                    style={{ width: "90%" }}
                  />
               
                  <Select
                          closeMenuOnSelect={true}
  options={uploadOption}
  className="upload"
/>
                </div>
                <div className="col-5 card-TodoProfile">
                  <div className="d-flex">
                    <p>
                     {profile.candidatName.toLocaleUpperCase()}|{profile.candidatAge}
                    </p>
                    <span className="card-xlSpan">(Age)</span>
                  </div>
                  <div>
                    <p className="d-flex mb-0">
                    <p>Motivation : {candidatMotivationIcons[profile.candidatMotivation - 1].icon + " " + candidatMotivationIcons[profile.candidatMotivation - 1].motivation} </p>
                    </p>
                  </div>
                  <p>Secteur : {profile.candidatActivitySector.toLocaleUpperCase()}</p>
                  <p className="" style={{ width: "150%" }}>
                    Métier/Job : {profile.candidatJob.toLocaleUpperCase()}
                  </p>
                </div>
                <div className="col-5 text-end end-class">
                  <div className="text-end ml-5">
                  <button className="ArchiveLargebtn p-0"><img src={require("../images/ArchivedBtn.svg").default} /></button>
                  </div>
                  <p className="fw-bold text-end pl-5 pt-1">
                  Candidat Archivé/Annulé/Viré
                  </p>
                  <p className="text-end">This candidate have archived</p>
                </div>
              </div>
            </div>
            <div className="col-12 mt-1">
              <div className="row boxArchivedProfile">
                <div className="whyFont"><p>WHY THIS CANDIDATES HAVE BEEN ARCHIVED: <span> {profile?.candidatArchived?.reason}</span></p></div>
              </div>
            </div>
            {/* <div className="col-12 social-box-size">
              <div className="row">
                <div className="col-6 text-center">
                  <p>Mail : {profile.candidatEmail}</p>
                  <button className="btn btn-email"> <a href="https://accounts.google.com/" target="_blank" >
                    <span className="padding-email">
                    <img src={require("../images/gmail.svg").default} />
                    </span>
                    See Profile
                    </a>
                  </button>
                  <p>Facebook : {profile.candidatFBURL}</p>
                  <button className="btn btn-primary btn-see">
                  <a href={profile.candidatFBURL} target="_blank" >
                    <span className="padding-email">
                      <img src={require("../images/facebook.svg").default} />
                    </span>
                    See Profile
                    </a>
                    </button>
                </div>

                <div className="col-6">
                  <p>Phone : {profile.candidatPhone}</p>
                  <button className="btn btn-whatsapp btn-see">
                  <a href={`https://wa.me/${profile.candidatPhone}`} target="_blank">
                    <span className="padding-email">
                      <img src={require("../images/whatsapp.svg").default} />
                    </span>
                    Send What’s App
                    </a>
                  </button>
                  <p> Phone 2 : {profile.candidatAlternatePhone} </p>
                  <button className="btn btn-whatsapp btn-see">
                  <a href={`https://wa.me/${profile.candidatAlternatePhone}`} target="_blank">
                    <span className="padding-email">
                      <img src={require("../images/whatsapp.svg").default} />
                    </span>
                    Send What’s App
                    </a>
                  </button>
                </div>
              </div>
            </div> */}
             <div className="col-12 mt-1 ">
              <div className="row justify-content-between">
              
                <div
                  className="col-6 Archived-Card px-1  scrollbar"
                  id="style-3"
                  style={{ maxWidth: "49%", marginRight: "10px" }}
                >
                  <div className="Archived-CardMore force-overflow">
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
                  className="col-6 Archived-Card text-center p-0"
                  style={{ maxWidth: "49%" }}
                >
                  <p className="Span-Styling pt-2 px-3">
                    Mail : {profile.candidatEmail ? profile.candidatEmail : "No Email Provided!"}
                  </p>
                  
                  <button className="btn btn-gmail">
                    <a
                      href="https://accounts.google.com/"
                      className="text-dark fw-bold"
                      target="_blank"
                    >
                      <span className="padding-email">
                        <img src={require("../images/gmail.svg").default} />
                      </span>
                      Send Email
                    </a>
                  </button>
                  <p className="Span-Styling mt-2 px-3">Facebook : {profile.candidatFBURL ? profile.candidatFBURL : "No Facebook URL!"}</p>
                  <a
                    href={profile.candidatFBURL}
                    target="_blank"
                    className="btn  btn-see"
                  >
                    <span className="padding-email">
                      <img
                        style={{ width: "8%" }}
                        src={require("../images/facebook.svg").default}
                      />
                    </span>
                    See Profile
                  </a>

                  <p className="Span-Styling mt-2 px-3">
                    Phone : {profile.candidatPhone ? profile.candidatPhone : "No Phone Number!"}
                  </p>
                  <button className="btn btn-whatsapp btn-see">
                    <a
                      href={`https://wa.me/${profile.candidatPhone}`}
                      target="_blank"
                    >
                      <span className="padding-email">
                        <img
                          style={{ width: "8%" }}
                          src={require("../images/whatsapp.svg").default}
                        />
                      </span>
                      Send What’s App
                    </a>
                  </button>
                  <p className="Span-Styling mt-2 px-3">
                    Phone 2 : {profile.candidatAlternatePhone ? profile.candidatAlternatePhone : "No AlternatePhone Number!"}
                  </p>
                  <button className="btn btn-whatsapp btn-see">
                    <a
                      href={`https://wa.me/${profile.candidatAlternatePhone}`}
                      target="_blank"
                    >
                      <span className="padding-email">
                        <img
                          style={{ width: "8%" }}
                          src={require("../images/whatsapp.svg").default}
                        />
                      </span>
                      Send What’s App
                    </a>
                  </button>
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
                  {profile.candidatExperienceDetails.length > 0 &&
                    profile.candidatExperienceDetails.map((detail) => (
                      <tr>
                        <td>{detail.period}</td>
                        <td>{detail.location}</td>
                        <td>{detail.workDoneSample}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="col-12 mt-1 p-1 Archived-Card">
              <div className="row">
                <div className="col-12 d-flex AnneesStyle">
                 <p className="">Années d’expériance :</p>
                 <span> {profile.candidatYearsExperience}years </span>
                </div>
               <div className="col-12 d-flex AddressEnteredBy">
                 <p className="">Ajouté par/Added by :</p>
                 <span> {profile.enteredBy}</span>
                  
                  </div>
                  <div className="col-12">
                 <p className="noteThis">Note : Who entred this candidates/employe on the database</p>
                  
                  </div>
              </div>
            </div>
            <div className="col-12 Archived-Card mt-1">
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
                    className="btn btn-ArchiveEditProfile"
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
                    className="btn btn-ArchiveCVManual"
                    onClick={editCandidatProfile}
                  >
                    <img src={require("../images/resume.svg").default} />
                    Créer CV Manuel
                  </button>
                  <p className="italic-fontStyle text-start">
                    Edit CV with Canva
                  </p>
                </div>
                <div className="col-3">
                     <button className="hideProfile">
                    <img src={require("../images/visibility.svg").default} />
                      Hide this profile</button>
                      <p className="italic-fontStyle text-start">Profile will be not deleted but hidded</p>
                </div>
                <div className="col-3">
                     <button className="restProfile">
                    <img src={require("../images/rest.svg").default} />
                    Reset this profile</button>
                    <p className="italic-fontStyle text-start">Profile will be reset to todo stage</p>
                </div>
                </div >
                </div>
       
      </div>
      </div>
    </>
  )
}

export default ArchivedProfile;

