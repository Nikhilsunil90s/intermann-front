import React,{useState,useEffect} from "react";
import {Link} from "react-router-dom"
import StarRatings from 'react-star-ratings';
import "../../CSS/Client/ClientSeepage.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UploadDow from '../../components/Modal/SelectUploadDownload'
import Switch from "react-switch";
import {ReactComponent as Empty} from "../../images/emptyStar.svg";
import {ReactComponent as StarRating} from "../../images/RatingStar.svg";

function ArchivedViewPage(){
  const { state } = useLocation();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<any>(state)
  const [UploadBtn,setSelectUpload]= useState(false)
  const [hideProfile,setHideProfile]=useState(false)
  const [ResetModalProfile,setResetModalProfile]=useState(false)
  const hiddenImageInput = React.useRef(null);
  const [SISPI, setChecked] = useState(false);
  const [Agence,setAgence]=useState(false)
  const [Assurance,setAssurance]=useState(false)
  const [A1,setA1]=useState(false)
  const [Public,setPublic]=useState(false)
  const [Contrat,setContrat]=useState(false)
  const [Signature,setSignature]=useState(false)
  const [Offre,setOffre]=useState(false)
  const candidatImportanceIcons = [{ icon:<><StarRating  style={{marginRight:"3px",width:"100%"}} /> <Empty  style={{marginRight:"3px",width:"100%"}} /> <Empty  style={{marginRight:"3px",width:"100%"}} /> <Empty  style={{marginRight:"3px",width:"100%"}} /> <Empty  style={{marginRight:"3px",width:"100%"}} /></>}, {icon:<><StarRating  style={{marginRight:"3px",width:"100%"}} /><StarRating  style={{marginRight:"3px",width:"100%"}} /> <Empty  style={{marginRight:"3px",width:"100%"}} /> <Empty  style={{marginRight:"3px",width:"100%"}} /> <Empty  style={{marginRight:"3px",width:"100%"}} /></>}, {icon:<><StarRating  style={{marginRight:"3px",width:"100%"}} /> <StarRating  style={{marginRight:"3px",width:"100%"}} /> <StarRating  style={{marginRight:"3px",width:"100%"}} /> <Empty  style={{marginRight:"3px",width:"100%"}} /> <Empty  style={{marginRight:"3px",width:"100%"}} /></>}, {icon:<><StarRating   style={{marginRight:"3px",width:"100%"}} /> <StarRating style={{marginRight:"3px",width:"100%"}}/> <StarRating style={{marginRight:"3px",width:"100%"}} /> <StarRating style={{marginRight:"3px",width:"100%"}} /> <Empty style={{marginRight:"3px",width:"100%"}} /></>}, {icon:<><StarRating  style={{marginRight:"3px",width:"100%"}} /><StarRating  style={{marginRight:"3px",width:"100%"}} /> <StarRating  style={{marginRight:"3px",width:"100%"}} /> <StarRating  style={{marginRight:"3px",width:"100%"}} /> <StarRating  style={{marginRight:"3px",width:"100%"}} /></>}]; 

  const candidatMotivationIcons = [{ icon:"😟", motivation: 'Disappointed' }, { icon:"🙁", motivation: 'Not Really' }, { icon:"😊", motivation: 'Like' }, { icon:"🥰", motivation: 'Great' }, { icon:"😍", motivation: 'Super Lovely' }];
  const handleImageChange = (val) => {
    if (val === 'upload') {
      console.log("upload")
      handleImageUpload()
    } else if (val === 'Download') {
      console.log("download")
      // window.open(API_BASE_URL + candidatImage);
    }
  }
  const handleImageUpload = () => {
    hiddenImageInput.current.click();
  }

  const editClientProfile = () => {
    navigate("/archivedClientEditprofile", { state: profile });
  }

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
    return(
      <>
      <div className="container-fluid ">
        <div className="row  mt-1">
          <div className="col-12 top-pd mt-2">
            {/* <div className="col-12 top-pd text-center">
              <h1 style={{ textDecoration: 'underline' }}>CLIENT FILE: {profile.clientCompanyName}</h1>
            </div> */}
          <div className="row">
          <div className="col-8">
            <div className="stable">
              <Link to="/clientProgress">
                <button type="button" className="btn FontStyle-TODOSEE">
                  <img src={require("../../images/return.svg").default} />
                  Client File : {profile.clientCompanyName}
                </button>
              </Link>
            </div>
          </div>
          <div className="col-4  d-flex align-items-center justify-content-end text-end pr-2">
            {/* <Link to="/clientInProgressEdit"> */}
              <button className="btn btn-bgbClient" onClick={()=>editClientProfile()}>
                <img src={require("../../images/Edit.svg").default} />
                Edit Profile
              </button>
            {/* </Link> */}
          </div>
          </div>
          </div>
          <div className="px-0">
          <div className="col-12 my-1 py-1 ClientSEE-TopDetails">
              <div className="row">
                <div className="col-2 pr-0 text-center">
              <div className="">
              <img
                    src={require("../../images/fullClientSee.svg").default}
                   className="imgArchived-upload-download"

                  />
                  </div>
                  {/* <Select
                          closeMenuOnSelect={true}
  // onChange={handleChange}
  // components={ {SingleValue: customSingleValue } }
  options={uploadOption}
  className="upload-Client"
  // defaultValue={uploadOption[0]}
/> */}
<button
 onClick={()=>{setSelectUpload(!UploadBtn);}}
className="SelectBtn"
 ><img className="" src={require("../../images/select.svg").default} />
 {
  UploadBtn? 
  <UploadDow closeModal={setSelectUpload}  FunModal={handleImageChange} />
  :
  null
 }
  </button>
<input
                    type="file"
                    ref={hiddenImageInput}
                    // onChange={fileChange}
                    name="candidatPhoto"
                    style={{ display: 'none' }}
                  />
                  </div>

                {/* <button type="button" className="btn btn-upload">
                    UPLOAD PHOTO
                  </button> */}
                <div className="col-6 ClientSEEPtags">
                <div className="d-flex">
                    <p>
                    Company : {profile.clientCompanyName.toLocaleUpperCase()}|{profile.candidatAge ? profile.candidatAge : "No "}
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
                  <div className="text-end ">
                  <div className="d-grid justify-content-end align-items-center">
                  <button className="ArchiveLargebtn pb-1 p-0"><img src={require("../../images/ArchivedBtn.svg").default} /></button>
                  </div>
               <div className="Lead-encore">
                  <p className="mb-0  pt-1">
                  Lead en recherche active
                  </p>
                  <p className="TODOclientChild">Nous recehrchons activement </p>
                  </div>
                  </div>
                {/* </div> */}
                </div>
              </div>
            </div>
            <div className="col-12 mt-2 Social-CardClient p-1">
                  <div className="row px-1">
                    <div className="col-xxl-2 col-xl-2 col-lg-2  col-md-6 d-flex px-0 justify-content-start">
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
                    <div className="col-xxl-3 col-xl-3 col-lg-3  col-md-6 d-flex px-0 justify-content-center">
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
                    <div className="col-xxl-2 col-xl-2 col-lg-2  col-md-5 d-flex px-0 pt-1 justify-content-end ml-1">
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
                    <div className="col-xxl-3 col-xl-3 col-lg-3  col-md-6 d-flex px-0 pt-1 justify-content-end">
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
                    <div className="col-xxl-1 col-xl-1 col-lg-1  col-md-4 d-flex px-0 pt-1 justify-content-center ml-1">
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
                    <div className="col-xxl-3 col-xl-3 col-lg-3  col-md-6 d-flex pt-1 px-0 justify-content-start">
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
                    <div className="col-xxl-3 col-xl-3 col-lg-3  col-md-6 d-flex pt-1 px-0 justify-content-start">
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
                    <div className="col-xxl-3 col-xl-3 col-lg-3  col-md-6 d-flex pt-1 px-0 ">
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
                  className="col-xxl-5 col-xl-5 col-md-5 col-lg-5 Social-Card text-center p-1 Social-cardDiv"
                  style={{ maxWidth: "49%" }}
                >
                  <div className="d-flex">
                  <p className="Span-StylingClient text-start pt-2 pb-1 my-1">
                 Company Mail : {profile.clientEmail ? profile.clientEmail : "No Email Provided!"}
                  </p>
                  </div>
                  {
                    profile.clientEmail ?
                    <button className="btn-TODOgmail">
                    <a
                      href="https://accounts.google.com/"
                      className="text-dark fw-bold"
                      target="_blank"
                    >
                      <span className="padding-email">
                        <img style={{width:"8%"}}  src={require("../../images/gmail.svg").default} />
                      </span>
                      Send Email
                    </a>
                  </button>
                  :
                  <button className="btn-TODOgmail">
               
                    <span className="padding-email">
                      <img style={{width:"8%"}}  src={require("../../images/gmail.svg").default} />
                    </span>
                    No Email !
                </button>
                  }
                 
                  <div className="d-flex">
                  <p className="Span-StylingClient text-start pt-2 pb-1 my-1">Contact : {profile.clientEmail ? profile.clientEmail : "No Email!"}</p></div>
               
               {
                profile.clientEmail ?
                <a
                href={profile.clientEmail}
                target="_blank"
                className="btn  fw-bold btn-TODOgmail"
              >
                <span className="padding-email">
                  <img
                    src={require("../../images/gmail.svg").default}
                  />
                </span>
                Send Email
              </a>

              :
              <button
              className="btn  fw-bold btn-TODOgmail"
            >
              <span className="padding-email">
                <img
                  src={require("../../images/gmail.svg").default}
                />
              </span>
              No Email !
            </button>
               }
                

                  <div className="d-flex">
                  <p className="Span-StylingClient text-start pt-2 pb-1 my-1">
                  Company Phone : {profile.clientPhone ? profile.clientPhone : "No Phone Number!"}
                  </p>
                  </div>
                  {
                    profile.clientPhone ?
                    <a
                    href={`https://wa.me/${profile.clientPhone}`}
                    target="_blank"
                  >
                <button className="btn-whatsapp my-1">
              
                    <span className="padding-email">
                      <img
                        style={{ width: "8%" }}
                        src={require("../../images/whatsapp.svg").default}
                      />
                    </span>
                    Send What’s App
                </button>
                </a>
:
<button className="btn-whatsapp my-1">
              
<span className="padding-email">
  <img
    style={{ width: "8%" }}
    src={require("../../images/whatsapp.svg").default}
  />
</span>
No What’s App !
</button>
                  }


                  <div className="d-flex">
                  <p className="Span-StylingClient text-start pt-2 pb-1 my-1">
                  Contact Phone : {profile.clientReferenceNumber ? profile.clientReferenceNumber : "No Number!"}
                  </p>
                  </div>
                  {
                    profile.clientReferenceNumber ? 
                    <a
                    href={`https://wa.me/${profile.clientReferenceNumber}`}
                    target="_blank"
                  >
                <button className="btn-whatsapp my-1">
 
                    <span className="padding-email">
                      <img
                        style={{ width: "8%" }}
                        src={require("../../images/whatsapp.svg").default}
                      />
                    </span>
                    Send What’s App
                </button>
                </a>

                :
                <button className="btn-whatsapp my-1">
 
                <span className="padding-email">
                  <img
                    style={{ width: "8%" }}
                    src={require("../../images/whatsapp.svg").default}
                  />
                </span>
                No What’s App !
            </button>

                  }
          

                </div>
                <div
                  className="col-xxl-8 col-xl-8 col-lg-8 col-md-7 Social-Card p-1 detailsCardClientSee scrollbar Social-btnS"
                  id="style-3"
                  style={{ maxWidth: "49%", }}
                >
                  <div className="Todo-ClinetCardMore force-overflow">
                  <div className="d-flex">
                    <div className="d-flex" >
                  
                  <p className="CompanyAddres">Company Adress 
                  </p> 
                  
                  <span className="Todo-ClinetCardMore-span">:{profile.clientAddress}</span>
                 
                   </div>
               
                </div>
                <div className="d-flex align-items-center ">
                      <p className="blue-text">Ready for work :</p>
                      <span className="bluetextCardSee">
                      {profile.jobStartDate != "" ? profile.jobStartDate : "___"} To{profile.jobEndDate != "" ? profile.jobEndDate : "___"}
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <p>Langues : </p>
                      <span className="Todo-ClinetCardMore-span"> {profile.clientLanguages[0] ? profile.clientLanguages[0].join(", ") : "No Langues!"}</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <p>Voyage en voiture :</p>
                      <span className="Todo-ClinetCardMore-span">
                        {profile.candidatConduireEnFrance ? "Yes" : "No"}
                      </span>
                    </div>
                   
                    <div className="d-flex">
                      <p className="ClientN">Client Note:</p>
                      <span  className="Todo-ClinetCardMore-span" style={{textDecoration:"none",width:"390px"}}>{profile.clientRequiredSkills != "" ? profile.clientRequiredSkills : "Not Available!"}</span> 
                      
                    </div>
                    <div className="d-flex align-items-center">
                  <p className="text-dark">Potential Turnover CA</p>
                 <span className="Todo-ClinetCardMore-span">
                    : {profile.jobTotalBudget} €
                  </span>
                </div>
                <div className="d-flex align-items-center">
                  <p className="text-dark">Salary by person </p>
                 <span className="Todo-ClinetCardMore-span">
                    : {profile.netSalary} €
                  </span>
                </div>
                <div className="d-flex align-items-center">
                  <p className="text-dark">Salaire net du salarié </p>
                 <span className="Todo-ClinetCardMore-span">
                    : {profile.SalaryH ? profile.SalaryH: "No Hours!"} 
                  </span>
                </div>
                <div className="d-flex align-items-center">
                  <p className="text-dark">Taux horraire</p>
                 <span className="Todo-ClinetCardMore-span">
                    :  {profile.SalaryH ? profile.SalaryH: "No Hours!"} 
                  </span>
                </div>
                   
                  </div>
                </div>
              </div>
            </div>


            <div className="col-12 ArchivedBoxAds">
              <div className="row py-2">
                <div className="col-6 ">
                  <p className="StylingArchivedAds mb-0">Ads Spent on this client : {profile.jobTotalBudget}</p>
                </div>
                <div className="col-12">
                  <p className="StylingArchivedAdss">WHY THIS LEAD/CLIENT HAVE BEEN ARCHIVED : {profile.clientArchived.reason} </p>
                </div>
              </div>
            </div>

              {/* <div className="col-12 pt-4">
                <div className="row">
                  <div className="col-5 pdf-btn">
                    <img src={require("../../images/doc.svg").default} />
                    <span>Add document about this client </span>
                  </div>
                </div>
              </div> */}
              {/* <div className="col-12"> */}
                {/* <div className="row">
                  <div className="col-6 mb-3">
                    <p className="poppins">
                      Par exemple : Contrat signé; Offre signé.... 
                    </p>
                    <span className="poppins">
                      PDF; Word; PNG; Excel etc ......
                    </span>
                  </div>
                </div>
              </div> */}
                    <div className="col-12 Social-CardClient my-1 p-1">
              <div className="row">
                <div className="col-6">
                <div className="ClientFontMotivationsStyling">
                    
                
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
                             <b className="d-flex align-items-center" style={{width:"25%",marginLeft:"5px"}}>{candidatImportanceIcons[profile.clientImportance - 1]?.icon ? candidatImportanceIcons[profile.clientImportance - 1]?.icon : "No Importance" }</b>

                        </p>
                        <p  className="mb-0 pt-1" style={{width:"130%"}}>Motivation :
                             <b style={{background:"transparent" , zIndex:"9999"}}>{candidatMotivationIcons[profile.clientMotivation - 1]?.icon + " " + candidatMotivationIcons[profile.clientMotivation - 1]?.motivation ? candidatMotivationIcons[profile.clientMotivation != 0 ? profile.clientMotivation  - 1 :  profile.clientMotivation ]?.icon + " " + candidatMotivationIcons[profile.clientMotivation !=0 ? profile.clientMotivation - 1 : profile.clientMotivation ]?.motivation : "No Motivation!"}</b>
                        </p>
               
                <div className="d-flex align-items-center">
                  <p style={{ marginBottom: "0px" }}>Ajouté par/Added by :</p>
                  <span className="ClientFontMotivationsStylingS" style={{ marginBottom: "0px" }}>
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
              
                <div className="col-3  text-center">
                     <button className="hideProfile" onClick={()=>setHideProfile(true)}>
                    <img src={require("../../images/visibility.svg").default} />
                      Hide this profile</button>
                      <p className="italic-fontStyle text-center">Profile will be not deleted but hidded</p>
                </div>
                <div className="col-3 text-center">
                     <button className="restProfile" onClick={()=>setResetModalProfile(true)}>
                    <img src={require("../../images/rest.svg").default} />
                    Reset this profile</button>
                    <p className="italic-fontStyle text-center">Profile will be reset to todo stage</p>
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
    )
}
export default ArchivedViewPage;