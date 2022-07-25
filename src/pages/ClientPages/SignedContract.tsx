import React, { useEffect ,useState} from "react";
import {Link,useLocation} from "react-router-dom"
import StarRatings from 'react-star-ratings';
import "../../CSS/Client/ProgressCardClient.css";
import { API_BASE_URL } from "../../config/serverApiConfig";
import Loader from '../../components/Loader/loader'

function Signed(){
 const {state}=useLocation()
 const [profile,setProfile]=useState<any>(state)
 console.log(profile,"p")
    return(
        <>
             <div className="containet-fluid">
        <div className="row">
          <div className="col-12 top-pd text-center">
            <img
              src={require("../../images/ClientseePage.svg").default}
              style={{ width: "70%" }}
            />
          </div>
          <div className="col-6">
            <div className="stable">
              <Link to="/todolist">
              <button type="button" className="btn bg-Signed">
                  <img src={require("../../images/return.svg").default} />
                  Return to client list SIGNED CONTRACT
                </button>
              </Link>
            </div>
          </div>
          <div className="col-6  text-end ">
            <Link to="/editTodo">
              <button className="btn btn-bgb">
                <img src={require("../../images/Edit.svg").default} />
                Edit Profile
data.              </button>
            </Link>
          </div>
          <div className="bg-class">
            <div className="col-12 p-3 bg-color-card">
              <div className="row">
              <div
                  className="col-3     d-grid
    justify-content-center
    align-items-center  text-center"
                >
                  <div className="logo-bg">
                  <img
                      src={require("../../images/enterprise.svg").default}
                      style={{ backgroundColor: "transparent" }}
                    />
                 
                  </div>
                
                </div>
                <div className="col-5 card-xl">
                <p>Company : {profile.clientCompanyName}</p>
                  <p>Number of position : {profile.numberOfPosts}</p>
                  <p>Secteur : {profile.clientActivitySector}</p>
                  <p>Métier/Job : {profile.clientJob}</p>
                  <p style={{width:"145%"}}>Contact name : {profile.clientReferenceName}</p>
                </div>
                <div className="col-4 text-end ">
                  <div className="d-flex justify-content-end">
                  <button type="button" className="btn Signed" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
             <span style={{marginRight:"3px"}}><img src={require("../../images/Path.svg").default} /></span>     SIGNED CONTRACT
                    </button>
                  </div>
                  <p className="fw-bold">Lead en recherche active</p>
                  <p>Nous recehrchons activement </p>
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
                  <p>Contact Mail : {profile.clientEmail} </p>
                  <button className="btn btn-primary btn-email">
                    <span className="padding-email">
                      <img src={require("../../images/gmail.svg").default} />
                    </span>
                    Send Email
                  </button>
                </div>

                <div className="col-6">
                  <p>Company Phone :{profile.clientPhone}</p>
                  <button className="btn btn-whatsapp btn-see">
                    <span className="padding-email">
                      <img src={require("../../images/whatsapp.svg").default} />
                    </span>
                    Send What’s App
                  </button>
                  <p>Contact Phone : {profile.clientPhone} </p>
                  <button className="btn btn-whatsapp btn-see">
                    <span className="padding-email">
                      <img src={require("../../images/whatsapp.svg").default} />
                    </span>
                    Send What’s App
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 litle-box-green">
                <div className="row">
                    <div className="col-12">
                    <div className="ad-box-sizing">
              <p>
                Employees working for this client :
                {/* {profile?data..map((el)=>(
                                <div className="d-flex ps-2">
           
                                <img
                                  src={require("../../images/menlogos.svg").default}
                                  style={{ width: "7%" }}
                                />
                                <p style={{ fontSize: "6px" }}>
                                 {el.employeesWorkingUnder}
                                </p>
                              </div>
                ))
                } */}
                <div className="text-start">
                <p>Ads Spent on this client :{profile.jobTotalBudget}</p>
                </div>
              </p>
            </div>
                    </div>
                </div>
            </div>
            <div className="col-12">
              <div className="parent-p">
                <div className="d-flex">
                  <p>Company Adress </p>
                  <span>{profile.clientAddress}</span>
                </div>
                <div className="d-flex ">
                  <p className="">Langues </p>
                  <span className="">: {profile.clientLanguages}</span>
                </div>
                <div className="d-flex">
                  <p className="blue-text">Research for work : From </p>
                  <span className="blue-text">
                   {profile.jobStartDate} - To {profile.jobEndDate}
                  </span>
                </div>
                <div className="d-flex">
                  <p>Note </p>
                  <span>
                    : {profile.clientRequiredSkills}
                  </span>
                </div>
                <div className="d-flex pt-4">
                  <p className="text-dark">Potential Turnover CA</p>
                  <span className="text-dark">
                    :{profile.jobTotalBudget} €
                  </span>
                </div>
                <div className="d-flex">
                  <p className="text-dark">Salary by person </p>
                  <span className="text-dark">
                    :{profile.netSalary} €
                  </span>
                </div>
                <div>
                  <p>
                    Motivation:
                    <StarRatings
                      rating={profile.clientMotivation}
                      starRatedColor="#ffc107"
                      // changeRating={}
                      numberOfStars={5}
                      starDimension={"19px"}
                      starSpacing={"0px"}
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
                      numberOfStars={5}
                      starDimension={"19px"}
                      starSpacing={"0px"}
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
                      Par exemple : Contrat signé; Offre signé.... 
                    </p>
                    <span className="poppins">
                      PDF; Word; PNG; Excel etc ......
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-3 text-center">
                    <button type="button" className="btn btn-red">
                      Archive / Canceleld
                    </button>
                    <p className="italic-font">Si plus d’actualité</p>
                  </div>
                  <div className="col-3 text-center">
                    <button type="button" className="btn btn-black">
                      <img src={require("../../images/Edit.svg").default} />
                      Edit Profile
data.                    </button>
                    <p className="italic-font text-start">Editer le profil</p>
                  </div>
                  <div className="col-3 text-center">
                    <button type="button" className="btn btn-contract">
                      <img
                        src={require("../../images/contract-pg.svg").default}
                        style={{ paddingRight: "10px" }}
                      />
                      Créer offre
                    </button>
                    <p style={{ width: "106%" }}>Créer une offre avec Canva</p>
                  </div>
                  <div className="col-3">
                    <button type="button" className="btn btn-career">
                      <img
                        src={require("../../images/contractPage.svg").default}
                        style={{ paddingRight: "10px" }}
                      />
                      Créer contrat
                    </button>
                    <p style={{ width: "106%" }}>Créer un contrat avec Drive</p>
                  </div>
                  <div className="col-3 text-center">
                    <button type="button" className="btn btn-grille">
                      <img
                        src={require("../../images/salary.svg").default}
                        style={{ paddingRight: "10px" }}
                      />
                      Grille de prix
                    </button>
                    <p style={{ padding: "0px 30px", color: "#ff0000" }}>
                      Accès réstreint à Jeremy & Pat
                    </p>
                  </div>
                </div>
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
      </div></>
    )
}
export default Signed;