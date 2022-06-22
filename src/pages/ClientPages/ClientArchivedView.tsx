import React from "react";
import {Link} from "react-router-dom"
import StarRatings from 'react-star-ratings';
import "../../CSS/Client/ClientSeepage.css";


function ArchivedViewPage(){
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
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
              <button type="button" className="btn bg-return ">
                  <img src={require("../../images/return1.svg").default} />
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
              </button>
            </Link>
          </div>
          <div className="bg-class">
            <div className="col-12 p-3 bg-color-card">
              <div className="row">
                <div
                  className="col-3     d-grid
    justify-content-center
    align-items-center  text-center "
                >
                  <div className="logo-bg">
                
                    <img
                      src={require("../../images/enterprise.svg").default}
                
                    />
                  </div>
                  <button type="button" className="btn btn-upload">
                    UPLOAD PHOTO
                  </button>
                </div>
                <div className="col-5 Archived-XL">
                <p>Company : &#10100;Company_name&#10101;</p>
                  <p>Number of position : &#10100;Number&#10101;</p>
                  <p>Secteur : &#10100;client_Sector&#10101;</p>
                  <p>Métier/Job : &#10100;Client_Metier_Job&#10101;</p>
                  <p style={{width:"175%"}} className="text-white">Contact name : &#10100;Contact_Name_In_Company&#10101; </p>
                </div>
                <div className="col-4 text-end end-class">
                  <div>
                  <button type="button" className="btn ArchivedBtnLarge" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
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
                  <p>Company Mail : &#10100; Candidat_email&#10101;</p>
                  <button className="btn btn-email">
                    <span className="padding-email">
                      <img src={require("../../images/gmail.svg").default} />
                    </span>
                    Send Mail
                  </button>
                  <p>Contact Mail : &#10100;Candidat_email&#10101; </p>
                  <button className="btn btn-primary btn-email">
                    <span className="padding-email">
                      <img src={require("../../images/gmail.svg").default} />
                    </span>
                    Send Email
                  </button>
                </div>

                <div className="col-6">
                  <p>Company Phone : &#10100;Company_Phone&#10101;</p>
                  <button className="btn btn-whatsapp btn-see">
                    <span className="padding-email">
                      <img src={require("../../images/whatsapp.svg").default} />
                    </span>
                    Send What’s App
                  </button>
                  <p>Contact Phone : &#10100;Candidat_Phone&#10101; </p>
                  <button className="btn btn-whatsapp btn-see">
                    <span className="padding-email">
                      <img src={require("../../images/whatsapp.svg").default} />
                    </span>
                    Send What’s App
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 litle-box-redBox">
                <div className="row">
                    <div className="col-12">
                   
                <div className="text-start ArchivedSpent">
                <p>Ads Spent on this client : ❴ad_Spent❵</p>
                </div>
                <p className="classFont">WHY THIS LEAD/CLIENT HAVE BEEN ARCHIVED : <span className="text-white">&#10100;Reason_deleted&#10101; Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s </span></p>
      
                    </div>
                </div>
            </div>
            <div className="col-12">
              <div className="parent-p">
                <div className="d-flex">
                  <p>Company Adress :</p>
                  <span>&#10100; Company_Adress&#10101;</span>
                </div>
                <div className="d-flex ">
                  <p className="">Langues </p>
                  <span className="">: &#10100;Clients_Langues&#10101;</span>
                </div>
                <div className="d-flex">
                  <p className="blue-text">Research for work : From </p>
                  <span className="blue-text">
                    &#10100;date&#10101; - To &#10100;date&#10101;
                  </span>
                </div>
                <div className="d-flex">
                  <p>Note </p>
                  <span>
                    : &#10100;Client_Note&#10101; Lorem Ipsum is simply dummy
                    text of the printing and typesetting industry. Lorem Ipsum
                    has been the industry's standard dummy text ever since the
                    1500s, when an unknown printer took a galley of type and
                    scrambled it to make a type specimen book. Lorem Ipsum is
                    simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500s, when an unknown printer took a galley of
                    type and scrambled it to make a type specimen book.
                  </span>
                </div>
                <div className="d-flex pt-4">
                  <p className="text-dark">Potential Turnover CA</p>
                  <span className="text-dark">
                    :&#10100;Amont_turnover&#10101; €
                  </span>
                </div>
                <div className="d-flex">
                  <p className="text-dark">Salary by person </p>
                  <span className="text-dark">
                    :&#10100;Amont_Salary&#10101; €
                  </span>
                </div>
                <div>
                  <p>
                    Motivation:
                    <StarRatings
                      rating={5}
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
                      rating={5}
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
                    &#10100;Added_by&#10101;
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
                    <button type="button" className="btn btn-black">
                      <img src={require("../../images/Edit.svg").default} />
                      Edit Profile
                    </button>
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
                  <div className="col-3">
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
export default ArchivedViewPage;