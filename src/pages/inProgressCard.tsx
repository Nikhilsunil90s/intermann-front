import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import "../CSS/inProgressCard.css";
// import { InModal } from '../components/InProgressModal';

function ProgressCard() {
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true)
  }

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false)
  }


  return (
    <>
      <div className="containet-fluid">
        <div className="row">
          <div className="col-12 top-pd text-center">
            <img
              src={require("../images/ProgressCard.svg").default}
              style={{ width: "70%" }}
            />
          </div>
          <div className="col-6">
            <div className="stable">
              <Link to="/dashboard">
                <button type="button" className="btn bg-Progress-btn">
                  <img src={require("../images/return.svg").default} />
                  Retrun IN PROGRESS list candidates
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
                  <p>Name : &#10100;Candidats_name&#10101;</p>
                  <p>Age : &#10100;Candidats_age&#10101;</p>
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
                  <p>Secteur : &#10100;Candidats_Sector&#10101;</p>
                  <p>Métier/Job : &#10100; Candidats_Metier&#10101;</p>
                </div>
                <div className="col-5 text-end end-class">
                  <div>

                    <button type="button" className="btn btn-in-progress" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                      IN PROGRESS
                    </button>

                  </div>
                  <p className="fw-bold">Contrat en cours avec Intermann</p>
                  <p>This candidate have active contract with us</p>
                </div>
              </div>
            </div>
            <div className="col-12 boxProgress">
              <div className="row">
                <div className="col-4 d-flex justify-content-center">
                  <div className="workFont"><p>WORK FOR </p>: <span>&#10100;client_Name&#10101;</span></div>
                </div>
                <div className="col-4 d-flex justify-content-center">
                  <div className="workFont"><p>Since </p>: <span>&#10100;date&#10101;</span></div>
                </div>
                <div className="col-4 d-flex justify-content-center">
                  <div className="workFont"><p>Salary  </p>: <span>&#10100;price €&#10101;</span></div>
                </div>

                <div className="d-flex justify-content-center"><button className="btn customerBtn"><span><img src={require("../images/littleeye.svg").default} /></span>CUSTOMER PROFIL</button></div>



              </div>
            </div>
            <div className="col-12 social-box-size">
              <div className="row">
                <div className="col-6 text-center">
                  <p>Mail : &#10100; Candidat_email&#10101;</p>
                  <button className="btn btn-email">
                    <span className="padding-email">
                      <img src={require("../images/gmail.svg").default} />
                    </span>
                    Send Email
                  </button>
                  <p>Facebook : </p>
                  <button className="btn btn-primary btn-see">
                    <span className="padding-email">
                      <img src={require("../images/facebook.svg").default} />
                    </span>
                    See Profile
                  </button>
                </div>

                <div className="col-6">
                  <p>Phone : Candidat_Phone</p>
                  <button className="btn btn-whatsapp btn-see">
                    <span className="padding-email">
                      <img src={require("../images/whatsapp.svg").default} />
                    </span>
                    Send What’s App
                  </button>
                  <p> Phone 2 : Candidat_Phone2 </p>
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
                  <span> &#10100; Candidats_Langues&#10101;</span>
                </div>
                <div className="d-flex ">
                  <p className="blue-text">Ready for work :</p>
                  <span className="blue-text">
                    From &#10100;date&#10101; - To &#10100;date&#10101;
                  </span>
                </div>
                <div className="d-flex">
                  <p>Permis :</p>
                  <span>&#10100;Boolean_Permis/License_Drive&#10101;</span>
                </div>
                <div className="d-flex">
                  <p>Voyage en voiture :</p>
                  <span>&#10100;Boolean_Voyage_voiture&#10101;</span>
                </div>
                <div className="d-flex">
                  <p>Skills/note: </p>
                  <span>
                    &#10100;candidate_skills&#10101; Lorem Ipsum is simply dummy
                    text of the printing and typesetting industry. Lorem Ipsum
                    has been the industry's standard dummy text ever since the
                    1500s, when an unknown printer took a galley of type and
                    scrambled it to make a type specimen book.
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
                      Période Exemple Janvier 2020 à Janvier 2021
                    </th>
                    <th scope="col">Lieu de travail  Exemple Paris</th>
                    <th scope="col">
                      Travail effectué  Exemple : Facadier Isolateur
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Text Area</td>
                    <td>Text Area</td>
                    <td>Text Area</td>
                  </tr>
                  <tr>
                    <td>Text Area</td>
                    <td>Text Area</td>
                    <td>Text Area</td>
                  </tr>
                  <tr>
                    <td>Text Area</td>
                    <td>Text Area</td>
                    <td>Text Area</td>
                  </tr>
                  <tr>
                    <td>Text Area</td>
                    <td>Text Area</td>
                    <td>Text Area</td>
                  </tr>
                  <tr>
                    <td>Text Area</td>
                    <td>Text Area</td>
                    <td>Text Area</td>
                  </tr>
                </tbody>
              </table>
              <div className="d-flex align-center child-p pt-3">
                <p>Années d’expériance : </p>
                <span>&#10100;Candidate_experiance years&#10101;</span>
              </div>
              <div className="d-flex align-center child-p">
                <p>Ajouté par/Added by :</p>
                <span> &#10100;Added_by&#10101;</span>
              </div>

              <p className="f-text">
                Note : Who entred this candidates/employe on the database
              </p>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-3 text-center">
                  <button type="button" className="btn btn-red">
                    Archive / Cancelled
                                 </button>
                  <p className="italic-font">Si embauché</p>
                </div>
                <div className="col-3 text-center">
                  <button type="button" className="btn btn-black">
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
export default ProgressCard;
