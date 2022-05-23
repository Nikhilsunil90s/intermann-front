import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import "../CSS/inProgressCard.css";
import { useLocation } from 'react-router-dom';

function ProgressCard() {

  const { state } = useLocation();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [profile, setProfile] = useState<any>(state);

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true)
  }

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false)
  }


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
      <div className="containet-fluid">
        <div className="row">
          <div className="col-12 top-pd text-center">
            <h1 style={{ textDecoration: "underline" }}>CANDIDAT: {profile.props.candidatName}</h1>
          </div>
          <div className="col-6">
            <div className="stable">
              <Link to="/embauchlist">
                <button type="button" className="btn bg-Progress-btn">
                  <img src={require("../images/return.svg").default} />
                  Return to - IN PROGRESS list of candidates
                </button>
              </Link>
            </div>
          </div>
          <div className="col-6  text-end ">
            <Link to="/editInProgress">
              <button className="btn btn-edit-bgb">
                <img src={require("../images/Edit.svg").default} />
                Edit Profile
              </button>
            </Link>

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
                  <p>Name : <b>{profile.props.candidatName}</b></p>
                  <p>Age : <b>{profile.props.candiatAge}</b></p>
                  <div>

                    <p>
                      Motivation:
                      <StarRatings
                        rating={profile.props.candidatMotivation}
                        starRatedColor="#ffc107"
                        // changeRating={}
                        numberOfStars={profile.props.candidatMotivation}
                        starDimension={"19px"}
                        starSpacing={"1px"}
                        name="rating"
                      />
                    </p>
                  </div>
                  <p>Secteur : <b>{profile.props.candidatActivitySector}</b></p>
                  <p>Métier/Job : <b>{profile.props.candidatJob}</b></p>
                </div>
                <div className="col-5 text-end end-class">
                  <div>

                    <button type="button" className="btn btn-in-progress">
                      IN PROGRESS
                    </button>
                    {/* <div className="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                      <div className="modal-dialog modal-lg">
                        <div className="modal-content padding-full">
                          <div className="text-end">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div className="">
                            <img className="modal-title pRight" src={require("../images/Move.svg").default} style={{ width: "98%" }} id="staticBackdropLabel" />

                          </div>
                          <div className="modal-body text-start">
                            <span>  Qui est le client qui a embauché &#10100;candidat_Name&#10101; ?</span>
                            <p>Who is the client who hired this person</p>
                            <select className="form-select" aria-label="Default select example">
                              <option selected>&#10100;client_List&#10101;</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                            <img src={require('../images/Note.svg').default} style={{ width: "93%" }} />
                            <div>

                              <div className="col-12 pt-3">
                                <label className="lable-from">From date / A PARTIR DE </label>
                                <div className="input-group date" id="datepicker">
                                  <input type="text" className="form-control" />
                                  <span className="input-group-append">
                                    <span className="input-group-text bg-white d-block">
                                      <i className="fa fa-calendar"></i>
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 pt-2">
                              <label className="salaire">Salaire net de &#10100;candidat_name&#10101; / &#10100;candidat_name&#10101; net salary</label>
                              <div>
                                <div><img /></div>
                                <div><input type="text" /></div>
                                <div></div>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                  <p className="fw-bold">Contrat en cours avec Intermann</p>
                  <p>This candidate have active contract with us</p>
                </div>
              </div>
            </div>
            <div className="col-12 boxProgress">
              <div className="row">
                <div className="col-4 d-flex justify-content-center">
                  <div className="workFont"><p>WORK FOR </p>: <span>{profile.props.candidatCurrentWork[0].workingFor}</span></div>
                </div>
                <div className="col-4 d-flex justify-content-center">
                  <div className="workFont"><p>Since </p>: <span>{profile.props.candidatCurrentWork[0].workingSince}</span></div>
                </div>
                <div className="col-4 d-flex justify-content-center">
                  <div className="workFont"><p>Salary  </p>: <span>{profile.props.candidatCurrentWork[0].salary + " "}</span>€</div>
                </div>

                <div className="d-flex justify-content-center"><button className="btn customerBtn"><span><img src={require("../images/littleeye.svg").default} /></span>CUSTOMER PROFIL</button></div>



              </div>
            </div>
            <div className="col-12 social-box-size">
              <div className="row">
                <div className="col-6 text-center">
                  <p>Mail: {profile.props.candidatEmail}</p>
                  <button className="btn btn-email">
                    <span className="padding-email">
                      <img src={require("../images/gmail.svg").default} />
                    </span>
                    Send Email
                  </button>
                  <p>Facebook: {profile.props.candidatFBURL}</p>
                  <button className="btn btn-primary btn-see">
                    <span className="padding-email">
                      <img src={require("../images/facebook.svg").default} />
                    </span>
                    See Profile
                  </button>
                </div>

                <div className="col-6">
                  <p>Phone : {profile.props.candidatPhone}</p>
                  <button className="btn btn-whatsapp btn-see">
                    <span className="padding-email">
                      <img src={require("../images/whatsapp.svg").default} />
                    </span>
                    Send What’s App
                  </button>
                  <p> Phone 2 : {profile.props.candidatAlternatePhone}</p>
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
                  <span> {profile.props.candidatLanguages.join(", ")}</span>
                </div>
                <div className="d-flex ">
                  <p className="blue-text">Ready for work :</p>
                  <span className="blue-text">
                    From {profile.props.candidatStartDate} - To {profile.props.candidatEndDate}
                  </span>
                </div>
                <div className="d-flex">
                  <p>Permis :</p>
                  <span>{profile.props.candidatLicensePermis ? "Yes" : "No"}</span>
                </div>
                <div className="d-flex">
                  <p>Voyage en voiture :</p>
                  <span>{profile.props.candidatConduireEnFrance ? "Yes" : "No"}</span>
                </div>
                <div className="d-flex">
                  <p>Skills/note: </p>
                  <span>
                    {profile.props.candidatSkills}
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
                    <th scope="col">Lieu de Travail (Exemple Paris)</th>
                    <th scope="col">
                      Travail Effectué (Exemple : Facadier Isolateur)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    profile.props.candidatExperienceDetails.length > 0 &&
                    profile.props.candidatExperienceDetails.map((detail) =>
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
                <span>{profile.props.candidatYearsExperience}</span>
              </div>
              <div className="d-flex align-center child-p">
                <p>Ajouté par/Added by :</p>
                <span> {profile.props.enteredBy}</span>
              </div>

              <p className="f-text">
                Note : Who entered this candidates/employe on the database
              </p>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-3 text-center">
                  <button type="button" className="btn btn-red">
                    Archive / Cancel
                  </button>
                </div>
                <div className="col-3 text-center">
                  <button type="button" className="btn btn-black">
                    <img src={require("../images/Edit.svg").default} />
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProgressCard;
