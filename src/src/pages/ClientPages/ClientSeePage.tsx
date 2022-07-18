import React, { useEffect,useState } from "react";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import "../../CSS/Client/ClientSeepage.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import InProgressClientModal from "../../components/Modal/InProgressClientModal";
import ArchivedClientModal from "../../components/Modal/ArchivedClientModal";
import {ReactComponent as Empty} from "../../images/emptyStar.svg";
import {ReactComponent as StarRating} from "../../images/RatingStar.svg";
import {ReactComponent as Upload} from "../../images/upload.svg"
import {ReactComponent as Download} from '../../images/download.svg'
import Switch from "react-switch";
import Select from "react-select"

function ClientSee() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [profile, setProfile] = useState<any>(state)
  const [showInProgressModal, setShowInProgressModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false)
  const [SISPI, setChecked] = useState(false);
  const [Agence,setAgence]=useState(false)
  const [Assurance,setAssurance]=useState(false)
  const [A1,setA1]=useState(false)
  const [Public,setPublic]=useState(false)
  const [Contrat,setContrat]=useState(false)
  const [Signature,setSignature]=useState(false)
  const [Offre,setOffre]=useState(false)
  const [documentsList, setDocumentsList] = useState([]);
  const uploadOption=[
    {value:"upload",label:<Upload />,},
    {value:"Download Image",label:<Download />} 
    ]

  const editClientProfile = () => {
    navigate("/clientToDoEdit", { state: profile });
  }
 const candidatImportanceIcons = [{ icon:<><StarRating style={{marginRight:"5px"}} /> <Empty style={{marginLeft:"5px"}} /> <Empty /> <Empty /> <Empty /></>}, {icon:<><StarRating /><StarRating /> <Empty /> <Empty /> <Empty /></>}, {icon:<><StarRating /> <StarRating /> <StarRating /> <Empty /> <Empty /></>}, {icon:<><StarRating /> <StarRating /> <StarRating /> <StarRating /> <Empty /></>}, {icon:<><StarRating /><StarRating /> <StarRating /> <StarRating /> <StarRating /></>}]; 
  const candidatMotivationIcons = [{ icon:"😟", motivation: 'Disappointed' }, { icon:"🙁", motivation: 'Not Really' }, { icon:"😊", motivation: 'Like' }, { icon:"🥰", motivation: 'Great' }, { icon:"😍", motivation: 'Super Lovely' }];
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const switchHandle = (event,id,e) => {
    if(e==="Offre"){
      setOffre(event)
    }
    if(e==="Signature"){
          setSignature(event)
    }
    if(e==="Contrat"){
      setContrat(event)
  }  
  if(e==="Public"){
    setPublic(event)
  } 
   if(e==="A1"){
    setA1(event)
  }
  if(e==="Assurance"){
    setAssurance(event)
  }
  if(e==="Agence"){
    setAgence(event)
  }
  if(e==="SISPI"){
    setChecked(event)
  }     
   };
  return (
    <>
      <div className="containet-fluid">
        <div className="row">
          <div className="col-12 top-pd mt-1">
            {/* <h1 style={{ textDecoration: 'underline' }}>CLIENT FILE: {profile.clientCompanyName}</h1> */}
         <div className="row">
          <div className="col-6">
            <div className="stable">
              <Link to="/clientTodo">
                <button type="button" className="btn FontStyle-TODOSEE">
                  <img src={require("../../images/return.svg").default} />
               Client File : {profile.clientCompanyName}
                </button>
              </Link>
            </div>
          </div>
          <div className="col-6  text-end pr-2">
            <button className="btn btn-bgb" onClick={editClientProfile}>
              <img src={require("../../images/Edit.svg").default} />
              Edit Profile
            </button>
          </div>
          </div>
          </div>
          <div className="px-0">
            <div className="col-12 my-1 py-1 ClientSEE-TopDetails">
              <div className="row">
                <div className="col-2 pr-0 text-center">
              <div className="logo-bg">
                  <img
                      src={require("../../images/enterprise.svg").default}
                      style={{ backgroundColor: "transparent" }}
                    />
                  </div>
                  <Select
                          closeMenuOnSelect={true}
  // onChange={handleChange}
  // components={ {SingleValue: customSingleValue } }
  options={uploadOption}
  className="upload-Client"
  // defaultValue={uploadOption[0]}
/>
                  </div>

                {/* <button type="button" className="btn btn-upload">
                    UPLOAD PHOTO
                  </button> */}
                <div className="col-6 ClientSEEPtags">
                <div className="d-flex">
                    <p>
                    Company : {profile.clientCompanyName.toLocaleUpperCase()}|{profile.candidatAge}
                    </p>
                    <span className="card-xlSpan">(Age)</span>
                  </div>
                  <p>Number of Positions : {profile.numberOfPosts}</p>

                  <p>Secteur : {profile.clientActivitySector}</p>
                  <p>Métier/Job : {profile.clientJob}</p>
                  <p style={{ width: "120%" }}>
                    Contact Name : {profile.clientReferenceName}
                  </p>
                </div>
                {/* <div className="col-4 text-end end-class d-grid justify-content-center align-items-center"> */}
                <div className="col-4 d-grid align-items-center">
                  <div className="text-end ml-5">
                    <button className="ClientSEEBtnStyle">
                      <img src={require("../../images/briefcase2.svg").default} />
                    </button>
               <div className="Lead-encore">
                  <p className="mb-0  pt-1">
                  Lead pas encore traité
                  </p>
                  <p className="">Ce lead est en sommeil, pas traité</p>
                  </div>
                  </div>
                {/* </div> */}
                </div>
              </div>
            </div>
            <div className="col-12 mt-2 Social-CardClient p-1">
                  <div className="row px-1">
                    <div className="col-2 d-flex px-0 justify-content-start">
                      <div className="d-flex align-items-center ">
                        <p className="fontSizeReactSwitch mb-0">
                          Offre envoyé ?
                        </p>
                        <Switch
                          className="ml-left"
                          onChange={switchHandle}
                          // onClick={(e)=>switchHandle(e)}
                          checked={Offre}
                          id="Offre"
                        />
                      </div>
                    </div>
                    <div className="col-3 d-flex px-0 justify-content-center">
                      <div className="d-flex align-items-center ">
                        <p className="fontSizeReactSwitch mb-0">
                          Signature digitale envoyé ?
                        </p>
                        <Switch
                          className="ml-left"
                          onChange={switchHandle}
                          checked={Signature}
                          id="Signature"
                        />
                      </div>
                    </div>
                    <div className="col-2 d-flex px-0 justify-content-end ml-1">
                      <div className="d-flex align-items-center ">
                        <p className="fontSizeReactSwitch mb-0">
                          Contrat singé ?
                        </p>
                        <Switch
                          className="ml-left"
                          onChange={switchHandle}
                          checked={Contrat}
                          id="Contrat"
                        />
                      </div>
                    </div>
                    <div className="col-3 d-flex px-0 justify-content-end">
                      <div className="d-flex align-items-center ">
                        <p className="fontSizeReactSwitch mb-0">
                          Publicité commencé ?
                        </p>
                        <Switch
                          className="ml-left"
                          onChange={switchHandle}
                          checked={Public}
                          id="Public"
                        />
                      </div>
                    </div>
                    <div className="col-1 d-flex px-0 justify-content-center ml-1">
                      <div className="d-flex align-items-center ">
                        <p className="fontSizeReactSwitch mb-0">A1 ?</p>
                        <Switch
                          className="ml-left"
                          onChange={switchHandle}
                          checked={A1}
                          id="A1"
                        />
                      </div>
                    </div>
                    <div className="col-3 d-flex pt-1 px-0 justify-content-start">
                      <div className="d-flex align-items-center ">
                        <p className="fontSizeReactSwitch mb-0">
                          Assurance faite ?
                        </p>
                        <Switch
                          className="ml-left"
                          onChange={switchHandle}
                          checked={Assurance}
                          id="Assurance"
                        />
                      </div>
                    </div>
                    <div className="col-3 d-flex pt-1 px-0 justify-content-start">
                      <div className="d-flex align-items-center ">
                        <p className="fontSizeReactSwitch mb-0">
                          Agence de voyage ok ?
                        </p>
                        <Switch
                          className="ml-left"
                          onChange={switchHandle}
                          checked={Agence}
                          id="Agence"
                        />
                      </div>
                    </div>
                    <div className="col-3 d-flex pt-1 px-0 ">
                      <div className="d-flex align-items-start ">
                        <p className="fontSizeReactSwitch mb-0">
                          SISPI déclaré ?
                        </p>
                        <Switch
                          className="ml-left"
                          onChange={switchHandle}
                          checked={SISPI}
                          id="SISPI"
                        />
                      </div>
                    </div>
            </div>
            </div>
            <div className="col-12 pt-1 py-0 mb-1">
              <div className="row justify-content-between">
                <div
                  className="col-6 Social-CardClient text-center py-0"
                  style={{ maxWidth: "49%" }}
                >
                  <p className="ClientSpan-Styling pt-2 px-3">
                 Company Mail : {profile.clientEmail ? profile.clientEmail : "No Email Provided!"}
                  </p>
                  
                  <button className="btn btn-Clientgmail">
                    <a
                      href="https://accounts.google.com/"
                      className="text-dark fw-bold"
                      target="_blank"
                    >
                      <span className="padding-email">
                        <img src={require("../../images/gmail.svg").default} />
                      </span>
                      Send Email
                    </a>
                  </button>
                  <p className="ClientSpan-Styling mt-2 px-3">Contact : {profile.clientEmail ? profile.clientEmail : "No Email!"}</p>
                  <a
                    href={profile.clientEmail}
                    target="_blank"
                    className="btn  fw-bold btn-Clientgmail"
                  >
                    <span className="padding-email">
                      <img
                        src={require("../../images/gmail.svg").default}
                      />
                    </span>
                    Send Email
                  </a>

                  <p className="ClientSpan-Styling mt-2 px-3">
                  Company Phone : {profile.clientPhone ? profile.clientPhone : "No Phone Number!"}
                  </p>
                  <button className="btn Client-Whatsapp btn-see">
                    <a
                      href={`https://wa.me/${profile.clientPhone}`}
                      target="_blank"
                    >
                      <span className="padding-email">
                        <img
                          style={{ width: "8%" }}
                          src={require("../../images/whatsapp.svg").default}
                        />
                      </span>
                      Send What’s App
                    </a>
                  </button>
                  <p className="ClientSpan-Styling mt-2 px-3">
                  Contact Phone : {profile.clientReferenceNumber ? profile.clientReferenceNumber : "No Number!"}
                  </p>
                  <button className="btn Client-Whatsapp btn-see">
                    <a
                      href={`https://wa.me/${profile.clientReferenceNumber}`}
                      target="_blank"
                    >
                      <span className="padding-email">
                        <img
                          style={{ width: "8%" }}
                          src={require("../../images/whatsapp.svg").default}
                        />
                      </span>
                      Send What’s App
                    </a>
                  </button>
                </div>
                <div
                  className="col-6 Social-CardClient px-1  scrollbar"
                  id="style-3"
                  style={{ maxWidth: "49%", marginRight: "10px" }}
                >
                  <div className="Todo-CardMore force-overflow">
                  <div className="d-flex">
                  <p>Company Adress </p>
                  <span>:{profile.clientAddress}</span>
                </div>
                <div className="d-flex ">
                      <p className="blue-text">Ready for work :</p>
                      <span className="blue-text">
                      {profile.jobStartDate != "" ? profile.jobStartDate : "___"} To{profile.jobEndDate != "" ? profile.jobEndDate : "___"}
                      </span>
                    </div>
                    <div className="d-flex">
                      <p>Langues : </p>
                      <span> {profile.clientLanguages ? profile.clientLanguages.join(", ") : "No Langues!"}</span>
                    </div>
                    <div className="d-flex">
                      <p>Voyage en voiture :</p>
                      <span>
                        {profile.candidatConduireEnFrance ? "Yes" : "No"}
                      </span>
                    </div>
                   
                    <div className="d-flex">
                      <p>Client Note: </p>
                      <span>{profile.clientRequiredSkills != "" ? profile.clientRequiredSkills : "Not Available!"}</span>
                    </div>
                    <div className="d-flex">
                  <p className="text-dark">Potential Turnover CA</p>
                  <span className="text-dark">
                    : {profile.jobTotalBudget} €
                  </span>
                </div>
                <div className="d-flex">
                  <p className="text-dark">Salary by person </p>
                  <span className="text-dark">
                    : {profile.netSalary} €
                  </span>
                </div>
                <div className="d-flex">
                  <p className="text-dark">Salaire net du salarié </p>
                  <span className="text-dark">
                    : {profile.SalaryH ? profile.SalaryH: "No Hours!"} 
                  </span>
                </div>
                <div className="d-flex">
                  <p className="text-dark">Taux horraire</p>
                  <span className="text-dark">
                    :  {profile.SalaryH ? profile.SalaryH: "No Hours!"} 
                  </span>
                </div>
                   
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 mt-1">
              <div className="row">
                <Carousel responsive={responsive}>
                  <div className="Social-CardClient">
                    <div className="col-12">
                      <div className="row p-1 justify-content-around">
                        <div className="col-3">
                          <img
                            src={
                              require("../../images/Card-ImageStar.svg").default
                            }
                          />
                        </div>
                        <div className="col-9 d-flex align-items-center">
                          <p className="mb-0 FontMatchedStyle">Candidate Name</p>
                        </div>
                        <div className="col-12">
                          <p className="mb-0 FontStylingCardtext">
                            Secteur : &#10100;Client_Sector&#10101;
                          </p>
                        </div>
                        <div className="col-12">
                          <p className="mb-0 FontStylingCardtext">
                            Job : &#10100;Candidats_Job&#10101;
                          </p>
                        </div>
                        <div className="col-12 mb-1">
                          <p className="mb-0 FontStylingCardtext">Note :</p>
                          <p className="mb-0 FontStylingCardtext">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard.
                          </p>
                        </div>
                        <div className="col-5 px-0">
<button className="btnMatched">Matched</button>
                        </div>
                        <div className="col-5  px-0">
                        <button className="btnNotMatched">Not Matched</button>
</div>
                      </div>
                    </div>
                  </div>
                </Carousel>
              </div>
            </div>
            <div className="col-12 Social-CardClient my-1">
              <div className="row">
                <div className="col-6">
                <div className="ClientFontMotivationsStyling">
                  {/* <p>
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
                  </p> */}
                     <p  className="mb-0 pt-1" style={{width:"130%"}}>Motivation :
                             <b style={{background:"transparent" , zIndex:"9999"}}>{candidatMotivationIcons[profile.clientMotivation - 1]?.icon + " " + candidatMotivationIcons[profile.clientMotivation - 1]?.motivation ? candidatMotivationIcons[profile.clientMotivation - 1]?.icon + " " + candidatMotivationIcons[profile.clientMotivation - 1]?.motivation : "No Motivation!"}</b>
                        </p>
                
                  {/* <p>
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
                  </p> */}
<p  className="d-flex align-items-center mb-0" style={{height:"30px", background:"transparent"}}>Importance :
                             <b className="d-flex align-items-center" style={{width:"20%",marginLeft:"5px"}}>{candidatImportanceIcons[profile.clientImportance - 1]?.icon ? candidatImportanceIcons[profile.clientImportance - 1]?.icon : "No Importance" }</b>

                        </p>
               
                <div className="d-flex align-items-center">
                  <p style={{ marginBottom: "0px" }}>Ajouté par/Added by :</p>
                  <span style={{ marginBottom: "0px" }}>
                    {profile.enteredBy}
                  </span>
                </div>
                <div >
                  <p className="clientNote">Note : Who entred this lead on the database</p>
                </div>
              </div>
              </div>
              <div className="col-6 d-flex justify-content-end align-items-center">
                <button className="pdf-btn">
                    <img src={require("../../images/doc.svg").default} className="docImg" />
                    <span>Add document about this client </span>
                    </button>
                  </div>
              </div>
              </div>
              <div className="col-12 Social-CardClient p-1">
                <div className="row">
                <div className="col-3 text-center">
                    <button type="button" className="btn btn-BlackEdit" onClick={editClientProfile}>
                      <img  style={{ paddingRight: "10px" }} src={require("../../images/Edit.svg").default} />
                      Edit Profile
                    </button>
                    <p className="text-start btn-Down">Editer le Profil</p>
                  </div>
                  <div className="col-3 text-center">
                    <a href="https://www.canva.com/design/DAFA2NwkHSw/p4I45NInV69YG9HKrS3TGw/edit" target="_blank" type="button" className="btn btn-contractClient">
                      <img
                        src={require("../../images/doc.svg").default}
                        style={{ paddingRight: "10px" }}
                      />
                      Créer Offre
                    </a>
                    <p style={{ width: "106%" }} className="btn-Down text-start">Créer une Offre avec Canva</p>
                  </div>
                  <div className="col-3 text-center">
                    <button type="button" className="btn btn-ArchivedClient">
                      Archive / Canceleld
                    </button>
                    {showArchiveModal ?
                      <ArchivedClientModal props={profile} closeModal={setShowArchiveModal} path={"/clientToDoProfile"} /> : null
                    }
                    <p className="btn-Down text-start">Si plus d’actualité</p>
                  </div>
                  <div className="col-3">
                    <a href="https://docs.google.com/spreadsheets/d/14xzXy9FD5V7ASYfYZg1kPmHSGvPqr4APfIWP_S9r_tI/edit#gid=0" target="_blank" type="button" className="btn btn-grilleClient">
                      <img
                        src={require("../../images/salary.svg").default}
                        style={{ paddingRight: "10px" }}
                      />
                      Grille de prix
                    </a>
                    <p className="btn-Down text-start">
                      Accès réstreint à Jeremy & Pat
                    </p>
                  </div>
                  <div className="col-3 text-center">
                    <button type="button" className="btn btn-moveClient">
                      Move to in Progress
                    </button>
                    {showInProgressModal ?
                      <InProgressClientModal props={profile} closeModal={setShowInProgressModal} /> : null
                    }
                    <p className="btn-Down text-start">Si on lance les recherches</p>
                  </div>

              
   
                  <div className="col-3">
                    <a href="https://drive.google.com/drive/folders/1MqR9nDBLtpl_xMCmVGmcy5g0T3noPhgZ" target="_blank" type="button" className="btn btn-careerClient">
                      <span>
                        <img  style={{ paddingRight: "10px" }}
                          src={require("../../images/doc.svg").default}
                        />
                      </span>

                      Créer Contrat
                    </a>
                    <p style={{ width: "106%" }} className="btn-Down text-start">Créer un contrat avec Drive</p>
                  </div>
                  </div>
</div>
                  <div className="col-12 Social-CardClient mt-1">
                    <div className="row p-1">
                      <div className="col-6 ">
                        <div className="col-12">
                        <div className="row CardClassDownload mt-1 mx-0 ">
                    <div className="col-4 d-flex align-items-center ">
                      <p className="download-font mb-0">Jhon-smith-cv.pdf</p>
                    </div>
                    <div className="col-6">
                      <button className="btnDownload">
                        <img src={require("../../images/dowBtn.svg").default} />
                        Jhon-smith-cv.pdf
                      </button>
                    </div>
                    <div className="col-2  d-flex align-item-end justify-content-end">
                    <img
                        src={require("../../images/editSvg.svg").default}
                        style={{ width: "20px",marginRight:"5px" }}
                      />
                      <img
                        src={require("../../images/Primaryfill.svg").default}
                        style={{ width: "20px" }}
                      />
                    </div>
                  </div>
                  </div>
                  <div className="col-12">
                        <div className="row CardClassDownload mt-1 mx-0 ">
                    <div className="col-4 d-flex align-items-center ">
                      <p className="download-font mb-0">Jhon-smith-cv.pdf</p>
                    </div>
                    <div className="col-6">
                      <button className="btnDownload">
                        <img src={require("../../images/dowBtn.svg").default} />
                        Jhon-smith-cv.pdf
                      </button>
                    </div>
                    <div className="col-2  d-flex align-item-end justify-content-end">
                    <img
                        src={require("../../images/editSvg.svg").default}
                        style={{ width: "20px",marginRight:"5px" }}
                      />
                      <img
                        src={require("../../images/Primaryfill.svg").default}
                        style={{ width: "20px" }}
                      />
                    </div>
                  </div>
                  </div>
                  <div className="col-12">
                        <div className="row CardClassDownload mt-1 mx-0 ">
                    <div className="col-4 d-flex align-items-center ">
                      <p className="download-font mb-0">Jhon-smith-cv.pdf</p>
                    </div>
                    <div className="col-6">
                      <button className="btnDownload">
                        <img src={require("../../images/dowBtn.svg").default} />
                        Jhon-smith-cv.pdf
                      </button>
                    </div>
                    <div className="col-2  d-flex align-item-end justify-content-end">
                    <img
                        src={require("../../images/editSvg.svg").default}
                        style={{ width: "20px",marginRight:"5px" }}
                      />
                      <img
                        src={require("../../images/Primaryfill.svg").default}
                        style={{ width: "20px" }}
                      />
                    </div>
                  </div>
                  </div>
                      </div>
                      <div className="col-6 ">
                        <div className="col-12">
                        <div className="row CardClassDownload mt-1 mx-0 ">
                    <div className="col-4 d-flex align-items-center ">
                      <p className="download-font mb-0">Jhon-smith-cv.pdf</p>
                    </div>
                    <div className="col-6">
                      <button className="btnDownload">
                        <img src={require("../../images/dowBtn.svg").default} />
                        Jhon-smith-cv.pdf
                      </button>
                    </div>
                    <div className="col-2  d-flex align-item-end justify-content-end">
                    <img
                        src={require("../../images/editSvg.svg").default}
                        style={{ width: "20px",marginRight:"5px" }}
                      />
                      <img
                        src={require("../../images/Primaryfill.svg").default}
                        style={{ width: "20px" }}
                      />
                    </div>
                  </div>
                  </div>
                  <div className="col-12">
                        <div className="row CardClassDownload mt-1 mx-0 ">
                    <div className="col-4 d-flex align-items-center ">
                      <p className="download-font mb-0">Jhon-smith-cv.pdf</p>
                    </div>
                    <div className="col-6">
                      <button className="btnDownload">
                        <img src={require("../../images/dowBtn.svg").default} />
                        Jhon-smith-cv.pdf
                      </button>
                    </div>
                    <div className="col-2  d-flex align-item-end justify-content-end">
                    <img
                        src={require("../../images/editSvg.svg").default}
                        style={{ width: "20px",marginRight:"5px" }}
                      />
                      <img
                        src={require("../../images/Primaryfill.svg").default}
                        style={{ width: "20px" }}
                      />
                    </div>
                  </div>
                  </div>
                  <div className="col-12">
                        <div className="row CardClassDownload mt-1 mx-0 ">
                    <div className="col-4 d-flex align-items-center ">
                      <p className="download-font mb-0">Jhon-smith-cv.pdf</p>
                    </div>
                    <div className="col-6">
                      <button className="btnDownload">
                        <img src={require("../../images/dowBtn.svg").default} />
                        Jhon-smith-cv.pdf
                      </button>
                    </div>
                    <div className="col-2  d-flex align-item-end justify-content-end">
                    <img
                        src={require("../../images/editSvg.svg").default}
                        style={{ width: "20px",marginRight:"5px" }}
                      />
                      <img
                        src={require("../../images/Primaryfill.svg").default}
                        style={{ width: "20px" }}
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
    </>
  );
}
export default ClientSee;
