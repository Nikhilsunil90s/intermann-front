import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { Link ,useNavigate} from "react-router-dom";
import "../CSS/inProgressCard.css";
import { useLocation } from 'react-router-dom';
import {ReactComponent as Upload} from "../images/upload.svg"
import {ReactComponent as Download} from '../images/download.svg'
import InProgressModal from "../components/Modal/InProgressModal";
import ArchivedModal from "../components/Modal/ArchivedModal";
import Select from 'react-select'
import FileUploadProgress from "react-fileupload-progress";

function ProgressCard() {

  const { state } = useLocation();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [profile, setProfile] = useState<any>(state);
  const [showInProgressModal, setShowInProgressModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const candidatMotivationIcons = [{ icon: "😟", motivation: 'Disappointed' }, { icon: "🙁", motivation: 'Not Really' }, { icon: "😊", motivation: 'Like' }, { icon: "🥰", motivation: 'Great' }, { icon: "😍", motivation: 'Super Lovely' }];
  const uploadOption=[
    {value:"upload",label:<Upload />,},
    {value:"Download Image",label:<Download />} 
    ]
    const navigate = useNavigate()
    const editCandidatProfile = () => {
      navigate("/editToDo", { state: profile });
    };

  // useEffect(() => {
  //   window.scroll({
  //     top: 0,
  //     left: 0,
  //     behavior: "smooth",
  //   });
  //   console.log(profile,"hello");
  // });


  return (
    <>
      <div className="containet-fluid">
        <div className="row">
          <div className="col-12 top-pd text-center">
            <h1 style={{ textDecoration: "underline" }}>
              CANDIDAT: {profile.candidatName}
            </h1>
          </div>

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
                  <Link to="/embauchlist">
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
                <Link to="/editInProgress">
                <button className="btn btn-bgb" 
                // onClick={editCandidatProfile}
                >
                  <img src={require("../images/Edit.svg").default} />
                  Edit Profile
                </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 ">
              <div className="row bg-todoTodoDetails">
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
                      Name : {profile.candidatName.toLocaleUpperCase()}|{profile.candidatAge}
                    </p>
                    <span className="card-xlSpan">(Age)</span>
                  </div>
                  <div>
                    <p className="d-flex">
                    <p>Motivation : <b>{candidatMotivationIcons[profile.candidatMotivation - 1].icon + " " + candidatMotivationIcons[profile.candidatMotivation - 1].motivation}</b> </p>
                    </p>
                  </div>
                  <p>Secteur : {profile.candidatActivitySector.toLocaleUpperCase()}</p>
                  <p className="" style={{ width: "150%" }}>
                    Métier/Job :{profile.candidatJob.toLocaleUpperCase()}
                  </p>
                </div>
                <div className="col-5 text-end end-class">
                  <div className="text-center ml-5">
                  <button className="InProLargebtn p-0"><img src={require("../images/thundermini.svg").default} />IN PROGRESS</button>
                  </div>
                  <p className="fw-bold text-center pl-5 pt-1">
                  Contrat en cours avec Interman
                  </p>
                  <p className="text-center">This candidate have active contract with us</p>
                </div>
              </div>
            </div>
            <div className="col-12 boxProgress mt-1">
              <div className="row">
               <div className="col-6">
                <div className="row">
                  <div className="col-12 d-flex justify-content-start">
                  <div className="workFont d-flex"><b className="d-flex"><p>WORK FOR </p>: <span>{profile.candidatCurrentWork[0].workingFor}</span></b></div>
                </div>
                <div className="col-12 d-flex justify-content-start">
                  <div className="workFont"><b className="d-flex"><p>Since </p>: <span>{profile.candidatCurrentWork[0].workingSince}</span></b></div>
                </div>
                <div className="col-12 d-flex justify-content-start">
                  <div className="workFont"><b className="d-flex"><p>Salary  </p>: <span>{profile.candidatCurrentWork[0].salary + " "}</span>€</b></div>
                </div>
                </div>
                
              </div>
              <div className="col-6 d-flex justify-content-end align-items-center">
                <div className="d-flex justify-content-center"><button className="btn customerBtnEmbauch"><span><img src={require("../images/eyeProfil.svg").default} /></span>CUSTOMER PROFIL</button></div>
                </div>

                </div>
              
            </div>
            <div className="col-12 mt-1 ">
              <div className="row justify-content-between">
              
                <div
                  className="col-6 Social-Card px-1  scrollbar"
                  id="style-3"
                  style={{ maxWidth: "49%", marginRight: "10px" }}
                >
                  <div className="Todo-CardMore force-overflow">
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
                  className="col-6 Social-Card text-center p-0"
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
           
          <div className="col-12  p-2 Social-Card mt-2">
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
            <div className="col-12 mt-1 p-1 Social-Card">
              <div className="row">
                <div className="col-12 d-flex AnneesStyle">
                 <p className="">Années d’expériance :</p>
                 <span> {profile.candidatYearsExperience}years </span>
                </div>
                <div className="col-12 d-flex AddressEnteredBy">
                 <p className="">Adresse : </p>
                 <span> {profile.candidatAddress}</span>
                </div><div className="col-12 d-flex AddressEnteredBy">
                 <p className="">Ajouté par/Added by :</p>
                 <span> {profile.enteredBy}</span>
                  
                  </div>
                  <div className="col-12">
                 <p className="noteThis">Note : Who entred this candidates/employe on the database</p>
                  
                  </div>
              </div>
            </div>
            <div className="col-12 Social-Card mt-1">
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
                    className="btn btn-Archived"
                    onClick={() => setShowArchiveModal(true)}
                  >
                    Archive / Canceled
                  </button>
                  <p className="italic-fontStyle text-start ">Si plus d’actualité</p>
                  {showArchiveModal ? (
                    <ArchivedModal
                      props={profile.candidatName}
                      closeModal={setShowArchiveModal}
                      path={"/todolist"}
                    />
                  ) : null}
                </div>
                <div className="col-3 text-center">
                  <Link to="/editInProgress">
                  <button
                    type="button"
                    className="btn btn-EditProfile"
                    onClick={editCandidatProfile}
                  >
                    <img src={require("../images/Edit.svg").default} />
                    Edit Profile
                  </button>
                  </Link>
                  <p className="italic-fontStyle text-start">Editer le profil</p>
                </div>
                <div className="col-3 text-center">
                  <button
                    type="button"
                    className="btn btn-CVManual"
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

                </div>
                </div >
                </div>
                <div className="col-12 Social-Card mt-1 ">
                  <div className="row p-1 justify-content-between">
         
                  <div className="col-6 CandidateCV">
                  <div className="row p-2">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-3 d-flex justify-content-end">
                          <img
                            style={{ width: "50%" }}
                            src={require("../images/CandidateCv.svg").default}
                          />
                        </div>
                        <div className="col-9 px-0">
                          <p className="mb-0 UploadCandidat">
                            Upload Candidate CV Made by candidate{" "}
                          </p>
                          <p className="mb-0 dropFile">
                            Drop your file here or browse
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="pt-1 px-3">
                      <FileUploadProgress
                        key="ex1"
                        onProgress={(e, request, progress) => {
                          console.log("progress", e, request, progress);
                        }}
                        onLoad={(e, request) => {
                          console.log("load", e, request);
                        }}
                        onError={(e, request) => {
                          console.log("error", e, request);
                        }}
                        onAbort={(e, request) => {
                          console.log("abort", e, request);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-6 CandidateCV">
                  <div className="row p-2">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-3 d-flex justify-content-end">
                          <img
                            style={{ width: "50%" }}
                            src={require("../images/CandidateCv.svg").default}
                          />
                        </div>
                        <div className="col-9 px-0">
                          <p className="mb-0 UploadCandidat">
                            Upload Candidate CV Made by candidate{" "}
                          </p>
                          <p className="mb-0 dropFile">
                            Drop your file here or browse
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="pt-1 px-3">
                      <FileUploadProgress
                        key="ex1"
                        onProgress={(e, request, progress) => {
                          console.log("progress", e, request, progress);
                        }}
                        onLoad={(e, request) => {
                          console.log("load", e, request);
                        }}
                        onError={(e, request) => {
                          console.log("error", e, request);
                        }}
                        onAbort={(e, request) => {
                          console.log("abort", e, request);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <p className="candidatecVs pt-2">Candidate CVs</p>
                  <div className="row CardClassDownload mt-1">
                    <div className="col-4 d-flex align-items-center ">
                      <p className="download-font mb-0">Jhon-smith-cv.pdf</p>
                    </div>
                    <div className="col-6">
                      <button className="btnDownload">
                        <img src={require("../images/dowBtn.svg").default} />
                        Jhon-smith-cv.pdf
                      </button>
                    </div>
                    <div className="col-2  d-flex align-item-end justify-content-end">
                      <img
                        src={require("../images/Primaryfill.svg").default}
                        style={{ width: "20px" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <p className="candidatecVs pt-2">Candidate CVs</p>
                  <div className="row CardClassDownload mt-1">
                    <div className="col-4 d-flex align-items-center ">
                      <p className="download-font mb-0">Jhon-smith-cv.pdf</p>
                    </div>
                    <div className="col-6">
                      <button className="btnDownload">Jhon-smith-cv.pdf</button>
                    </div>
                    <div className="col-2 px-0 d-flex align-item-end justify-content-end">
                      <img
                        src={require("../images/Primaryfill.svg").default}
                        style={{ width: "20px" }}
                      />
                    </div>
                  </div>
                </div>
         
          
              </div>
            </div>
            <div className="col-12 Social-Card mt-1">
              <div className="row p-1 justify-content-between">
                <div className="col-6 CandidateCV">
                  <div className="row p-2">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-3 d-flex justify-content-end">
                          <img
                            style={{ width: "50%" }}
                            src={require("../images/CandidateCv.svg").default}
                          />
                        </div>
                        <div className="col-9 px-0">
                          <p className="mb-0 UploadCandidat">
                            Upload Passport / ID{" "}
                          </p>
                          <p className="mb-0 dropFile">
                            Drop your file here or browse
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="pt-1 px-3">
                      <FileUploadProgress
                        key="ex1"
                        onProgress={(e, request, progress) => {
                          console.log("progress", e, request, progress);
                        }}
                        onLoad={(e, request) => {
                          console.log("load", e, request);
                        }}
                        onError={(e, request) => {
                          console.log("error", e, request);
                        }}
                        onAbort={(e, request) => {
                          console.log("abort", e, request);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-6 CandidateCV">
                  <div className="row p-2">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-3 d-flex justify-content-end">
                          <img
                            style={{ width: "50%" }}
                            src={require("../images/CandidateCv.svg").default}
                          />
                        </div>
                        <div className="col-9 px-0">
                          <p className="mb-0 UploadCandidat">
                            Upload Candidate A1 Document
                          </p>
                          <p className="mb-0 dropFile">
                            Drop your file here or browse
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="pt-1 px-3">
                      <FileUploadProgress
                        key="ex1"
                        onProgress={(e, request, progress) => {
                          console.log("progress", e, request, progress);
                        }}
                        onLoad={(e, request) => {
                          console.log("load", e, request);
                        }}
                        onError={(e, request) => {
                          console.log("error", e, request);
                        }}
                        onAbort={(e, request) => {
                          console.log("abort", e, request);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <p className="candidatecVs pt-2">Candidate Passport / ID </p>
                  <div className="row CardClassDownload mt-1">
                    <div className="col-4 d-flex align-items-center ">
                      <p className="download-font mb-0">Jhon-smith-cv.pdf</p>
                    </div>
                    <div className="col-6">
                      <button className="btnDownload">
                        <img src={require("../images/dowBtn.svg").default} />
                        Jhon-smith-cv.pdf
                      </button>
                    </div>
                    <div className="col-2 px-0 d-flex align-item-end justify-content-end">
                      <img
                        src={require("../images/Primaryfill.svg").default}
                        style={{ width: "20px" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <p className="candidatecVs pt-2">Candidate A1 Document</p>
                  <div className="row CardClassDownload mt-1">
                    <div className="col-4 d-flex align-items-center ">
                      <p className="download-font mb-0">Jhon-smith-cv.pdf</p>
                    </div>
                    <div className="col-6">
                      <button className="btnDownload">Jhon-smith-cv.pdf</button>
                    </div>
                    <div className="col-2 px-0 d-flex align-item-end justify-content-end">
                      <img
                        src={require("../images/Primaryfill.svg").default}
                        style={{ width: "20px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 Social-Card mt-1">
              <div className="row p-1 justify-content-between">
                <div className="col-6 CandidateCV">
                  <div className="row p-2">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-3 d-flex justify-content-end">
                          <img
                            style={{ width: "50%" }}
                            src={require("../images/CandidateCv.svg").default}
                          />
                        </div>
                        <div className="col-9 px-0">
                          <p className="mb-0 UploadCandidat">
                            Upload Passport / ID{" "}
                          </p>
                          <p className="mb-0 dropFile">
                            Drop your file here or browse
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="pt-1 px-3">
                      <FileUploadProgress
                        key="ex1"
                        onProgress={(e, request, progress) => {
                          console.log("progress", e, request, progress);
                        }}
                        onLoad={(e, request) => {
                          console.log("load", e, request);
                        }}
                        onError={(e, request) => {
                          console.log("error", e, request);
                        }}
                        onAbort={(e, request) => {
                          console.log("abort", e, request);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-6 CandidateCV">
                  <div className="row p-2">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-3 d-flex justify-content-end">
                          <img
                            style={{ width: "50%" }}
                            src={require("../images/CandidateCv.svg").default}
                          />
                        </div>
                        <div className="col-9 px-0">
                          <p className="mb-0 UploadCandidat">
                            Upload Candidate A1 Document
                          </p>
                          <p className="mb-0 dropFile">
                            Drop your file here or browse
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="pt-1 px-3">
                      <FileUploadProgress
                        key="ex1"
                        onProgress={(e, request, progress) => {
                          console.log("progress", e, request, progress);
                        }}
                        onLoad={(e, request) => {
                          console.log("load", e, request);
                        }}
                        onError={(e, request) => {
                          console.log("error", e, request);
                        }}
                        onAbort={(e, request) => {
                          console.log("abort", e, request);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <p className="candidatecVs pt-2">Candidate Other Document</p>
                  <div className="row CardClassDownload mt-1">
                    <div className="col-4 d-flex align-items-center ">
                      <p className="download-font mb-0">Jhon-smith-cv.pdf</p>
                    </div>
                    <div className="col-6">
                      <button className="btnDownload">
                        <img src={require("../images/dowBtn.svg").default} />
                        Jhon-smith-cv.pdf
                      </button>
                    </div>
                    <div className="col-2 px-0 d-flex align-item-end justify-content-end">
                      <img
                        src={require("../images/Primaryfill.svg").default}
                        style={{ width: "20px" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="row mt-4 CardClassDownload mt-1">
                    <div className="col-4 d-flex align-items-center ">
                      <p className="download-font mb-0">Jhon-smith-cv.pdf</p>
                    </div>
                    <div className="col-6">
                      <button className="btnDownload">Jhon-smith-cv.pdf</button>
                    </div>
                    <div className="col-2 px-0 d-flex align-item-end justify-content-end">
                      <img
                        src={require("../images/Primaryfill.svg").default}
                        style={{ width: "20px" }}
                      />
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

export default ProgressCard;
