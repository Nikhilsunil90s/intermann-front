import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { Link } from 'react-router-dom'
import '../CSS/Archived.css'
import { useLocation } from "react-router-dom";

const ArchivedProfile = () => {

  const { state } = useLocation();
  const [profile, setProfile] = useState<any>(state);

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    console.log(profile);
  });

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 top-pd text-center">
            <h1 style={{ textDecoration: "underline" }}>CANDIDAT: {profile.candidatName}</h1>
          </div>
          <div className="col-6">
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
            <button className="btn btn-edit-bgb">
              <img src={require("../images/Edit.svg").default} />
              Edit Profile
            </button>
          </div>
          <div className="bg-class">
            <div className="col-12 p-3 bg-color-card">
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
            </div>
            <div className="col-12 boxArchive">
              <div className="row">
                <div className="ArcFont"><p>WHY THIS CANDIDATES HAVE BEEN ARCHIVED: <span> {profile?.candidatArchived?.reason}</span></p></div>
              </div>
            </div>
            <div className="col-12 social-box-size">
              <div className="row">
                <div className="col-6 text-center">
                  <p>Mail : {profile.candidatEmail}</p>
                  <button className="btn btn-email">
                    <span className="padding-email">
                      <img src={require("../images/gmail.svg").default} />
                    </span>
                    Send Email
                  </button>
                  <p>Facebook : {profile.candidatFBURL}</p>
                  <button className="btn btn-primary btn-see">
                    <span className="padding-email">
                      <img src={require("../images/facebook.svg").default} />
                    </span>
                    See Profile
                  </button>
                </div>

                <div className="col-6">
                  <p>Phone : {profile.candidatPhone}</p>
                  <button className="btn btn-whatsapp btn-see">
                    <span className="padding-email">
                      <img src={require("../images/whatsapp.svg").default} />
                    </span>
                    Send What’s App
                  </button>
                  <p> Phone 2 : {profile.candidatAlternatePhone} </p>
                  <button className="btn btn-whatsapp btn-see">
                    <span className="padding-email">
                      <img src={require("../images/whatsapp.svg").default} />
                    </span>
                    Send What’s App
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="parent-p">
                <div className="d-flex">
                  <p>Langues : </p>
                  <span> {profile.candidatLanguages.join(", ")}</span>
                </div>
                <div className="d-flex ">
                  <p className="blue-text">Ready for work :</p>
                  <span className="blue-text">
                    From {profile.candidatStartDate} - To {profile.candidatEndDate}
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
            <div className="col-12 pt-4">
              <h3 className="exp">Expérience du candidat </h3>
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
                <p>Années d’expériance : </p>
                <span>{profile.candidatYearsExperience}</span>
              </div>
              <div className="d-flex align-center child-p">
                <p>Ajouté par/Added by :</p>
                <span> {profile.enteredBy}</span>
              </div>

              <p className="f-text">
                Note : Who entred this candidates/employe on the database
              </p>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-3 text-center">
                  <button className="btn btn-black">
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
  )
}

export default ArchivedProfile;

