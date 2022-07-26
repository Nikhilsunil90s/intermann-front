import { Link,useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../../CSS/Client/ProgressCardClient.css";
import ArchivedClientModal from "../../components/Modal/ArchivedClientModal";
import Switch from "react-switch";
import Select from "react-select";
import {ReactComponent as Empty} from "../../images/emptyStar.svg";
import {ReactComponent as StarRating} from "../../images/RatingStar.svg";

function ClientContractCard(props:any) {
  console.log(props)
  const navigate = useNavigate();
  const candidatImportanceIcons = [{ icon:<><StarRating  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /></>}, {icon:<><StarRating  style={{marginRight:"3px",width:"70%"}} /><StarRating  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /></>}, {icon:<><StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /></>}, {icon:<><StarRating   style={{marginRight:"3px",width:"70%"}} /> <StarRating style={{marginRight:"3px",width:"70%"}}/> <StarRating style={{marginRight:"3px",width:"70%"}} /> <StarRating style={{marginRight:"3px",width:"70%"}} /> <Empty style={{marginRight:"3px",width:"70%"}} /></>}, {icon:<><StarRating  style={{marginRight:"3px",width:"70%"}} /><StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /></>}]; 
  const candidatMotivationIcons = [{ icon:"😟", motivation: 'Disappointed' }, { icon:"🙁", motivation: 'Not Really' }, { icon:"😊", motivation: 'Like' }, { icon:"🥰", motivation: 'Great' }, { icon:"😍", motivation: 'Super Lovely' }];
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
const CardOption=[{
  value:"Edit Profile",label:"Edit Profile"
  },

  {value:"Archive",label:"Archive"
  }
]as any
  const editClientProfile = () => {
      navigate("/ClientContractEditprofile", { state: props.data });
  }
  const MoreOption=(e:any)=>{
      if(e.value=="Edit Profile"){
        editClientProfile()
      }
      if(e.value=="Archive"){
        setShowArchiveModal(true) 
      }
    console.log(e.value)
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
  }

  const SeeFullProfile=()=>{
    navigate("/clientSigned", { state: props.data});
  }
  return (
    <>
<div className="card cardInPro p-0">
                <div className="d-flex">
                    <div className="col-3 px-0 d-flex justify-content-center">
                        <img
                            src={require("../../images/ClientCardPhoto.svg").default}
                            className="card-img-top widthIMG"
                            alt="..."
                        />
                    </div>
                    <div className="col-5 px-0 mt-1">
                    <p className="textClientCard" style={{width:"150%"}}><b>{props.data.clientCompanyName ? props.data.clientCompanyName.length > 20 ? props.data.clientCompanyName.toLocaleUpperCase().slice(0,29)+ "..." : props.data.clientCompanyName.toLocaleUpperCase(): "No CompanyName!"}</b></p>
                    <div >  <p  className="textClientCard" style={{height:"30px", background:"transparent"}}>Importance:
                             <b className="d-flex" style={{width:"37%",marginLeft:"3px",height:"43px"}}>{candidatImportanceIcons[props.data.clientImportance - 1]?.icon ? candidatImportanceIcons[props.data.clientImportance - 1]?.icon : "No Importance" }</b>

                        </p>
                        </div>
                        <div >  <p  className="textClientCard" style={{width:"130%"}}>Motivation :
                             <b style={{background:"transparent" , zIndex:"9"}}>{candidatMotivationIcons[props.data.clientMotivation - 1]?.icon + " " + candidatMotivationIcons[props.data.clientMotivation - 1]?.motivation ? candidatMotivationIcons[props.data.clientMotivation - 1]?.icon + " " + candidatMotivationIcons[props.data.clientMotivation - 1]?.motivation : "No Motivation!"}</b>
                        </p>
                        </div>
                        <div ><p  className="textClientCard">Num of position : <b>  {props.data.numberOfPosts ? props.data.numberOfPosts : "No Posts!"}</b> </p></div>
                 

                    </div>
                    <div className="col-4 px-0 d-flex justify-content-center align-items-center">
                    <button className="SignedClientBtn"><img  src={require("../../images/tickClientBtn.svg").default} /> SIGNED CONTRACT</button>
                    </div>
                </div>
                <div className="col-12 d-flex align-items-center textSignedClient my-1 ">
                <p className=" mb-0 ">Recruiting  :From {props.data.jobStartDate != "" ? props.data.jobStartDate : "___"} To {props.data.jobEndDate != "" ? props.data.jobEndDate : "___"} </p>
                </div>
<div className="col-12 ">
    <div className="row pl-1">
                <div className="col-5 fontStylingCardDetails px-0 py-1">
                <p className="fontStylingCardP">Secteur : {props.data.clientActivitySector ? props.data.clientActivitySector.length > 20 ? props.data.clientActivitySector.toLocaleUpperCase().slice(0, 15) + "..." :props.data.clientActivitySector.toLocaleUpperCase() : "No Sector!"} </p>
                    <p className="fontStylingCardP">Job :  {props.data.clientJob ? props.data.clientJob.length > 20 ?  props.data.clientJob.toLocaleUpperCase().slice(0,15) + "..." : props.data.clientJob.toLocaleUpperCase() : "No Job!"}</p>
                    <p>Langues : <b> {props.data.clientLanguages.length ? props.data.clientLanguages : "No Langues!"}</b> </p>
                    <p>Phone :<b>{props.data.clientPhone.length ? props.data.clientPhone : "No Phone Number!"}</b> </p>
                    <p>Estimated CA :   <b>{props.data.jobTotalBudget ? props.data.jobTotalBudget + " €" : "N/A"}</b> </p>                

                </div>
                <div className="col-7 pl-1 fontStylingCardDetails px-0 pt-1">
                <p>Salary by person : <b>{props.data.netSalary ? props.data.netSalary + " €" : "N/A"}</b> </p>
                <p>E-Mail : <b>{props.data.clientEmail ? props.data.clientEmail.length > 20 ?  props.data.clientEmail.slice(0,21) + "..." : props.data.clientEmail : "No Email!"}</b> </p>
                    <p>Cl-Phone : <b>{props.data.clientPhone.length? props.data.clientPhone : "No Client Number!"}</b> </p>
                    <p>C-Name :  <b>{props.data.clientReferenceName ? props.data.clientReferenceName : "No Name!"}</b> </p>
                    <p>Contact :   <b>{props.data.clientReferenceNumber.length? props.data.clientReferenceNumber: "No Contact Number!"}</b> </p>
                </div>
                </div>
                </div>
                    <div className="SignedClientBox p-1">
                        <div className="">
                            <p  className="AdsFont mb-0">Ads Spent on this client:  {props.data.jobTotalBudget != 0 ? props.data.jobTotalBudget + " €" : "N/A"}  </p>
                            <p className="AdsFont mb-0">Employees working for this client :
                            </p>
                            <div className="col-12">
                    <div className="row">
                    
              
           {
            props.data.employeesWorkingUnder != null && props.data.employeesWorkingUnder != [] ?
            props.data.employeesWorkingUnder.map((el)=>(
              <div className="col-4 pr-0">
                                       <div className="d-flex align-items-center">
                   
                                    <img
                                      src={require("../../images/menSigned.svg").default}
                                      style={{ width: "15%" }}
                                    />
                                    <p style={{ fontSize: "8px",marginLeft:"5px" }} className="mb-0 ">
                                     {el.candidatName}
                                    </p>
                                  </div>

                                  </div>
                    ))
                    
                    :
              <div className="col-4 pr-0">
                    <div className="d-flex align-items-center">
                    <img
                    src={require("../../images/menSigned.svg").default}
                    style={{ width: "15%" }}
                  />
                  <p style={{ fontSize: "8px",marginLeft:"5px" }} className="mb-0 ">
                 No Candidat!
                  </p>
                  </div>
                  </div>
                
           }
                                
                
                    
                </div>
                        </div>
                        </div>
                    </div>
<div className="col-12 d-flex justify-content-end my-1">
                    <div className="row ">
                    <div className="col-6 text-center">
                    <Select
                          options={CardOption}
                          className="CardOptions AllMoreOp"
                          onChange={MoreOption}
                          placeholder="More options"
                        />
            </div>
                        <div className="col-6 text-center">
                            <button className="btn btn-card" onClick={SeeFullProfile}>
                                See Full Profile
                            </button>
                        </div>
                        </div> 
                        </div>
                        {showArchiveModal ?
                            <ArchivedClientModal props={props.data} closeModal={setShowArchiveModal} path={"/clientToDo"} /> : null
                        }
                            
                    </div>
    </>
  );
}
export default ClientContractCard;
