import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import "../../CSS/Client/ClientSeepage.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InProgressClientModal from "../../components/Modal/InProgressClientModal";
import ArchivedClientModal from "../../components/Modal/ArchivedClientModal";

function ClientSee() {

  const navigate = useNavigate();
  const { state } = useLocation();
  const [profile, setProfile] = useState<any>(state)
  const [showInProgressModal, setShowInProgressModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false)
  const [documentsList, setDocumentsList] = useState([]);

  const editClientProfile = () => {
    navigate("/clientToDoEdit", { state: profile });
  }


  // useEffect(() => {
  //   window.scroll({
  //     top: 0,
  //     left: 0,
  //     behavior: "smooth",
  //   });
  //   console.log(profile)
  // });
  return (
    <>
      <div className="containet-fluid">
        <div className="row">
          <div className="col-12 top-pd text-center">
            <h1 style={{ textDecoration: 'underline' }}>CLIENT FILE: {profile.clientCompanyName}</h1>
          </div>
          <div className="col-6">
            <div className="stable">
              <Link to="/clientTodo">
                <button type="button" className="btn bg-btn">
                  <img src={require("../../images/return.svg").default} />
                  Return to Client TO DO List
                </button>
              </Link>
            </div>
          </div>
          <div className="col-6  text-end ">
            <button className="btn btn-bgb" onClick={editClientProfile}>
              <img src={require("../../images/Edit.svg").default} />
              Edit Profile
            </button>
          </div>
          <div className="bg-class">
            <div className="col-12 p-3 bg-color-card">
              <div className="row">
              <div className="logo-bg">
                  <img
                      src={require("../../images/enterprise.svg").default}
                      style={{ backgroundColor: "transparent" }}
                    />
                 
                  </div>
                {/* <button type="button" className="btn btn-upload">
                    UPLOAD PHOTO
                  </button> */}
                <div className="col-5 card-xl">
                  <p>Company : {profile.clientCompanyName}</p>
                  <p>Number of Positions : {profile.numberOfPosts}</p>

                  <p>Secteur : {profile.clientActivitySector}</p>
                  <p>Métier/Job : {profile.clientJob}</p>
                  <p style={{ width: "145%" }}>
                    Contact Name : {profile.clientReferenceName}
                  </p>
                </div>
                <div className="col-4 text-end end-class">
                  <div>
                    <button type="button" className="btn btn-gray">
                      TO DO
                    </button>
                  </div>
                  <p className="fw-bold">Lead pas encore traité</p>
                  <p>Ce lead est en sommeil, pas traité</p>
                </div>
              </div>
            </div>

            <div className="col-12 box-size">
              <div className="row">
                <div className="col-6 text-center">
                  <p>Company Mail : {profile.clientEmail}</p>
                  <button className="btn btn-email">
                    <span className="padding-email">
                      <img src={require("../../images/gmail.svg").default} />
                    </span>
                    Send Mail
                  </button>
                  <p>Contact Mail :  {profile.clientEmail}</p>
                  <button className="btn btn-primary btn-email">
                    <span className="padding-email">
                      <img src={require("../../images/gmail.svg").default} />
                    </span>
                    Send Email
                  </button>
                </div>

                <div className="col-6">
                  <p>Company Phone : {profile.clientPhone}</p>
                  <button className="btn btn-whatsapp btn-see">
                    <span className="padding-email">
                      <img src={require("../../images/whatsapp.svg").default} />
                    </span>
                    Send What’s App
                  </button>
                  <p>Contact Phone : {profile.clientReferenceNumber} </p>
                  <button className="btn btn-whatsapp btn-see">
                    <span className="padding-email">
                      <img src={require("../../images/whatsapp.svg").default} />
                    </span>
                    Send What’s App
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="parent-p">
                <div className="d-flex">
                  <p>Company Adress </p>
                  <span>: {profile.clientAddress}</span>
                </div>
                <div className="d-flex ">
                  <p className="">Langues </p>
                  <span className="">: {profile.clientLanguages}</span>
                </div>
                <div className="d-flex">
                  <p className="blue-text">Research for work</p>
                  <span className="blue-text">
                    :   From {profile.jobStartDate != "" ? profile.jobStartDate : "___"} To {profile.jobEndDate != "" ? profile.jobEndDate : "___"}
                  </span>
                </div>
                <div className="d-flex">
                  <p>Note </p>
                  <span>
                    : {profile.clientRequiredSkills != "" ? profile.clientRequiredSkills : "Not Available!"}
                  </span>
                </div>
                <div className="d-flex pt-4">
                  <p className="text-dark">Potential Turnover CA</p>
                  <span className="text-dark">
                    :  {profile.jobTotalBudget}  €
                  </span>
                </div>
                <div className="d-flex">
                  <p className="text-dark">Salary by person </p>
                  <span className="text-dark">
                    :  {profile.netSalary}  €
                  </span>
                </div>
                <div>
                  <p>
                    Motivation:
                    <StarRatings
                      rating={profile.clientMotivation}
                      starRatedColor="#ffc107"
                      // changeRating={}
                      numberOfStars={profile.clientMotivation}
                      starDimension={"19px"}
                      starSpacing={"1px"}
                      name="rating"
                    />
                  </p>
                </div>
                <div>
                  <p>
                    Importance:
                    <StarRatings
                      rating={profile.clientImportance}
                      starRatedColor="#ffc107"
                      // changeRating={}
                      numberOfStars={profile.clientImportance}
                      starDimension={"19px"}
                      starSpacing={"1px"}
                      name="rating"
                    />
                  </p>
                </div>

                <div className="d-flex">
                  <p style={{ marginBottom: "0px" }}>Ajouté par/Added by :</p>
                  <span style={{ marginBottom: "0px" }}>
                    {profile.enteredBy}
                  </span>
                </div>
              </div>

              <p className="f-text text-dark">
                Note : Who entred this candidates/employe on the database
              </p>
              <div className="col-12 pt-4">
                <div className="row">
                  <div className="col-5 pdf-btn">
                    <img src={require("../../images/doc.svg").default} />
                    <span>Add document about this client </span>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-6 mb-3">
                    <p className="poppins">
                      Par exemple : Contrat signé; Offre signé...
                    </p>
                    <span className="poppins">
                      PDF; Word; PNG; Excel etc ...
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-3 text-center">
                    <button type="button" className="btn btn-move">
                      Move to in Progress
                    </button>
                    {showInProgressModal ?
                      <InProgressClientModal props={profile} closeModal={setShowInProgressModal} /> : null
                    }
                    <p className="italic-font">Si on lance les recherches</p>
                  </div>
                  <div className="col-3 text-center">
                    <button type="button" className="btn btn-red">
                      Archive / Canceleld
                    </button>
                    {showArchiveModal ?
                      <ArchivedClientModal props={profile} closeModal={setShowArchiveModal} path={"/clientToDoProfile"} /> : null
                    }
                    <p className="italic-font">Si plus d’actualité</p>
                  </div>
                  <div className="col-3 text-center">
                    <button type="button" className="btn btn-black" onClick={editClientProfile}>
                      <img src={require("../../images/Edit.svg").default} />
                      Edit Profile
                    </button>
                    <p className="italic-font text-start">Editer le Profil</p>
                  </div>
                  <div className="col-3 text-center">
                    <a href="https://www.canva.com/design/DAFA2NwkHSw/p4I45NInV69YG9HKrS3TGw/edit" target="_blank" type="button" className="btn btn-contract">
                      <img
                        src={require("../../images/contract-pg.svg").default}
                        style={{ paddingRight: "10px" }}
                      />
                      Créer Offre
                    </a>
                    <p style={{ width: "106%" }}>Créer une Offre avec Canva</p>
                  </div>
                  <div className="col-3">
                    <a href="https://drive.google.com/drive/folders/1MqR9nDBLtpl_xMCmVGmcy5g0T3noPhgZ" target="_blank" type="button" className="btn btn-career">
                      <span>
                        <img
                          src={require("../../images/contractPage.svg").default}
                        />
                      </span>

                      Créer Contrat
                    </a>
                    <p style={{ width: "106%" }}>Créer un contrat avec Drive</p>
                  </div>
                  <div className="col-3">
                    <a href="https://docs.google.com/spreadsheets/d/14xzXy9FD5V7ASYfYZg1kPmHSGvPqr4APfIWP_S9r_tI/edit#gid=0" target="_blank" type="button" className="btn btn-grille">
                      <img
                        src={require("../../images/salary.svg").default}
                        style={{ paddingRight: "10px" }}
                      />
                      Grille de prix
                    </a>
                    <p style={{ padding: "0px 30px", color: "#ff0000" }}>
                      Accès réstreint à Jeremy & Pat
                    </p>
                  </div>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-5 pdf-store">
                        <div className="col-12">
                          <div className="row">
                            <div className="col-7">
                              <p>Documentname.pdf</p>
                            </div>
                            <div className="col-3">
                              <img
                                src={
                                  require("../../images/download-file.svg")
                                    .default
                                }
                              />
                            </div>
                            <div className="col-2">
                              <img
                                src={require("../../images/delete.svg").default}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="row">
                            <div className="col-7">
                              <p>Documentname.pdf</p>
                            </div>
                            <div className="col-3">
                              <img
                                src={
                                  require("../../images/download-file.svg")
                                    .default
                                }
                              />
                            </div>
                            <div className="col-2">
                              <img
                                src={require("../../images/delete.svg").default}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="row">
                            <div className="col-7">
                              <p>Documentname.pdf</p>
                            </div>
                            <div className="col-3">
                              <img
                                src={
                                  require("../../images/download-file.svg")
                                    .default
                                }
                              />
                            </div>
                            <div className="col-2">
                              <img
                                src={require("../../images/delete.svg").default}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="row">
                            <div className="col-7">
                              <p>Documentname.pdf</p>
                            </div>
                            <div className="col-3">
                              <img
                                src={
                                  require("../../images/download-file.svg")
                                    .default
                                }
                              />
                            </div>
                            <div className="col-2">
                              <img
                                src={require("../../images/delete.svg").default}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="row">
                            <div className="col-7">
                              <p>Documentname.pdf</p>
                            </div>
                            <div className="col-3">
                              <img
                                src={
                                  require("../../images/download-file.svg")
                                    .default
                                }
                              />
                            </div>
                            <div className="col-2">
                              <img
                                src={require("../../images/delete.svg").default}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
export default ClientSee;
