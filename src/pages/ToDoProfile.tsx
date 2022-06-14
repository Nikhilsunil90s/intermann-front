import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import "../CSS/Candidatefile.css";
import { useLocation } from 'react-router-dom';
import InProgressModal from "../components/Modal/InProgressModal";
import ArchivedModal from "../components/Modal/ArchivedModal";
import { useNavigate } from "react-router-dom";

function ToDoProfile() {

  const navigate = useNavigate();
  const { state } = useLocation();
  const [profile, setProfile] = useState<any>(state)
  const [showInProgressModal, setShowInProgressModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false)

  const editCandidatProfile = () => {
    navigate("/editToDo", { state: profile });
  }


  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });

  return (
    <>
      <div className="containet-fluid">
        <div className="row">
          <div className="col-12 top-pd text-center">
            <h1 style={{ textDecoration: "underline" }}>CANDIDAT: {profile.candidatName}</h1>
          </div>
        
             
               <div className="card " style={{padding:"0px 15px",borderRadius:"15px",marginBottom:"0px"}}>
               <div className="row text-start">
                     <div className="col-6">
                 <div className="stable">
              <Link to="/todolist">
                <button type="button" className="btn d-flex align-items-center">
                  <img src={require("../images/return.svg").default} />
                <h2 className="card-Leads mb-0">  Candidate Profile</h2>
                </button>
              </Link>
            </div>
            </div>
            <div className="col-6 text-end">
            <button className="btn btn-bgb" onClick={editCandidatProfile}>
              <img src={require("../images/Edit.svg").default} />
              Edit Profile
            </button>
            </div>
                   
                 </div>
               </div>        
               
          <div className="">
                <div className="col-12 p-0">
                  <div className="row bg-class">
                <div className="col-2 text-center ">
                  <img
                    src={require("../images/menlogos.svg").default}
                    style={{ width: "90%" }}
                  />
                  <select className="image-select">
                  <option>Upload Image</option>
                  <option>Download Image</option>
                  </select>
                </div>
                <div className="col-5 card-xl">
                  <div className="d-flex">
                  <p>Name : {profile.candidatName}|{profile.candidatAge}</p> <span className="card-xlSpan">(Age)</span>
                  </div>
                  <div>

                    <p>
                      Motivation:
                      <StarRatings
                        rating={profile.candidatMotivation}
                        starRatedColor="#ffc107"
                        // changeRating={}
                        numberOfStars={profile.candidatMotivation}
                        starDimension={"19px"}
                        starSpacing={"0px"}
                        name="rating"
                      />
                    </p>
                  </div>
                  <p>Secteur : {profile.candidatActivitySector}</p>
                  <p  className="">Métier/Job : {profile.candidatJob}</p>
                </div>
                <div className="col-5 text-end end-class">
                  <div>
                    <button type="button" className="btn btn-gray">
                      TO DO
                    </button>
                  </div>
                  <p className="fw-bold">En recherche de contrat</p>
                  <p>This candidate is looking for a job</p>
                </div>
              </div>
            </div>
            
            <div className="col-12 box-size bg-class">
              <div className="row">
                <div className="col-6 text-center">
                  <p>Mail : {profile.candidatEmail}</p>
                  <button className="btn btn-email">
                    <a href="https://accounts.google.com/" target="_blank">
                    <span className="padding-email">
                      <img src={require("../images/gmail.svg").default} />
                    </span>  
                    Send Email
                    </a>
                  </button>
                  <p>Facebook : </p>
                  <a href={profile.candidatFBURL} target="_blank" className="btn btn-primary btn-see">
                    <span className="padding-email">
                      <img src={require("../images/facebook.svg").default} />
                    </span>
                    See Profile
                  </a>
              
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
                <div className="col-6">
              <div className="parent-p">
                <div className="d-flex">
                  <p>Langues : </p>
                  <span> {profile.candidatLanguages.join(", ")}</span>
                </div>
                <div className="d-flex ">
                  <p className="blue-text">Ready for work :</p>
                  <span className="blue-text">
                    From: {profile.candidatStartDate} - To: {profile.candidatEndDate}
                  </span>
                </div>
                <div className="d-flex">
                  <p>Permis :</p>
                  <span>{profile.candidatLicensePermis ? "Yes" : "No"}</span>
                </div>
                <div className="d-flex">
                  <p>Voyage en voiture :</p>
                  <span>{profile.candidatConduireEnFrance ? "Yes" : "No"}</span>
                </div>
                <div className="d-flex">
                  <p>Skills/note: </p>
                  <span>
                    {profile.candidatSkills}
                  </span>
                </div>
              </div>
            </div>
              </div>
            </div>
           
            <div className="col-12 pt-4">
              <h3 className="exp">Expérience du Candidat </h3>
              <table className="table table-bordered border-dark">
                <thead>
                  <tr>
                    <th scope="col">
                      Période (Exemple Janvier 2020 à Janvier 2021)
                    </th>
                    <th scope="col">Lieu de travail (Exemple Paris)</th>
                    <th scope="col">
                      Travail effectué (Exemple : Facadier Isolateur)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    profile.candidatExperienceDetails.length > 0 &&
                    profile.candidatExperienceDetails.map((detail) =>
                      <tr>
                        <td>{detail.period}</td>
                        <td>{detail.location}</td>
                        <td>{detail.workDoneSample}</td>
                      </tr>
                    )

                  }

                </tbody>
              </table>
              <div className="d-flex align-center child-p pt-3">
                <p>Années d’Expériance : </p>
                <span>{profile.candidatYearsExperience}</span>
              </div>
              <div className="d-flex align-center child-p">
                <p>Ajouté par/Added by :</p>
                <span> {profile.enteredBy}</span>
              </div>

              <p className="f-text">
                Note : Who entred this candidat/employe on the database
              </p>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-3 text-center">
                  <button type="button" className="btn btn-move" onClick={() => setShowInProgressModal(true)}>
                    Move to In Progress
                  </button>
                  {showInProgressModal ?
                    <InProgressModal props={profile} closeModal={setShowInProgressModal} /> : null
                  }
                  <p className="italic-font">Si embauché</p>
                </div>
                <div className="col-3 text-center">
                  <button type="button" className="btn btn-red" onClick={() => setShowArchiveModal(true)}>
                    Archive / Canceled
                  </button>
                  {showArchiveModal ?
                    <ArchivedModal props={profile.candidatName} closeModal={setShowArchiveModal} path={"/todolist"} /> : null
                  }
                  <p className="italic-font">Si embauché</p>
                </div>
                <div className="col-3 text-center">
                  <button type="button" className="btn btn-black" onClick={editCandidatProfile}>
                    <img src={require("../images/Edit.svg").default} />
                    Edit Profile
                  </button>
                  <p className="italic-font text-start">Editer le profil</p>
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
