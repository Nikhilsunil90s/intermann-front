import { Link } from "react-router-dom";
import "../../CSS/Client/ClientTodo.css";
import StarRatings from 'react-star-ratings';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InProgressClientModal from "../../components/Modal/InProgressClientModal";
import ArchivedClientModal from "../../components/Modal/ArchivedClientModal";
import {ReactComponent as Empty} from "../../images/emptyStar.svg";
import {ReactComponent as StarRating} from "../../images/RatingStar.svg";
import Switch from "react-switch";
import Select from "react-select";

const ClientToDoCard = (props: any) => {

    const navigate = useNavigate();

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
    {value:"moveProgress",label:"moveProgress"
    },
    {value:"Archive",label:"Archive"
    }
 ]as any
 const candidatImportanceIcons = [{ icon:<><StarRating  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /></>}, {icon:<><StarRating  style={{marginRight:"3px",width:"70%"}} /><StarRating  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /></>}, {icon:<><StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /></>}, {icon:<><StarRating   style={{marginRight:"3px",width:"70%"}} /> <StarRating style={{marginRight:"3px",width:"70%"}}/> <StarRating style={{marginRight:"3px",width:"70%"}} /> <StarRating style={{marginRight:"3px",width:"70%"}} /> <Empty style={{marginRight:"3px",width:"70%"}} /></>}, {icon:<><StarRating  style={{marginRight:"3px",width:"70%"}} /><StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /></>}]; 

 const candidatMotivationIcons = [{ icon:"😟", motivation: 'Disappointed' }, { icon:"🙁", motivation: 'Not Really' }, { icon:"😊", motivation: 'Like' }, { icon:"🥰", motivation: 'Great' }, { icon:"😍", motivation: 'Super Lovely' }];
   console.log(props.data,"props.data")
    const editClientProfile = () => {
        navigate("/clientToDoEdit", { state: props.data });
    }

    const viewFullProfile = () => {
        console.log(props.data)
        navigate("/clientToDoProfile", { state: props.data });
    }

    const MoreOption=(e:any)=>{
      debugger
      if(e.value=="Edit Profile"){
        editClientProfile()
      }
      if(e.value=="moveProgress"){
        setShowInProgressModal(true)
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

    // useEffect(() => {
    //     console.log(props.data)
    // })
   return (
        <>
            <div className="card cardTODO pr-0">
                <div className="d-flex">
                    <div className="col-3 px-0 d-flex justify-content-center">
                        <img
                            src={require("../../images/ClientCardPhoto.svg").default}
                            className="cardTODO-img"
                            alt="..."
                        />
                    </div>
                    <div className="col-4 px-0 mt-1">
                        <p className="textClientCard" style={{width:"130%"}}><b>{props.data.clientCompanyName ? props.data.clientCompanyName : "No CompanyName!"}</b></p>
                <p  className="textClientCard" style={{width:"130%"}}>Motivation :
                             <b style={{background:"transparent" , zIndex:"9"}}>{candidatMotivationIcons[props.data.clientMotivation]?.icon + " " + candidatMotivationIcons[props.data.clientMotivation]?.motivation ? candidatMotivationIcons[props.data.clientMotivation]?.icon + " " + candidatMotivationIcons[props.data.clientMotivation]?.motivation : "No Motivation!"}</b>
                        </p>
                         <div >  <p  className="textClientCard" style={{height:"30px", background:"transparent",width:"120%"}}>Importance :
                             <b className="d-flex" style={{width:"44%",marginLeft:"5px"}}>{candidatImportanceIcons[props.data.clientImportance - 1]?.icon ? candidatImportanceIcons[props.data.clientImportance - 1]?.icon : "No Importance" }</b>

                        </p>
                        </div>
                        <div ><p  className="textClientCard">Num of position : <b>  {props.data.numberOfPosts ? props.data.numberOfPosts : "No Posts!"}</b> </p></div>
                    </div>
                    <div className="col-5 text-end d-flex align-items-start justify-content-end">
                    <Link to='#'>
                            <button className="todoClient mt-2"><img src={require("../../images/briefcase.svg").default} /></button>
                        </Link>
                    </div>
                </div>
                <div className="col-12">
                    <div className="row color-rowClientCard ">
                     <p>Recruiting  : From {props.data.jobStartDate != "" ? props.data.jobStartDate : "___"} To {props.data.jobEndDate != "" ? props.data.jobEndDate : "___"} </p>
                    </div>
                </div>
<div className="col-12">
    <div className="row pxbody">
                <div className="col-5 fontStylingCardDetails px-0 py-1">
                    <p className="fontStylingCardP">Secteur : {props.data.clientActivitySector ? props.data.clientActivitySector : "No Sector!"} </p>
                    <p className="fontStylingCardP">Job :  {props.data.clientJob ? props.data.clientJob : "No Job!"}</p>
                    <p>Langues : <b> {props.data.clientLanguages.length ? props.data.clientLanguages : "No Langues!"}</b> </p>
                    <p>Phone :<b>{props.data.clientPhone.length ? props.data.clientPhone : "No Phone Number!"}</b> </p>
                    <p>Estimated CA :   <b>{props.data.jobTotalBudget ? props.data.jobTotalBudget + " €" : "N/A"}</b> </p>                

                </div>
                <div className="col-7 fontStylingCardDetails px-0 pt-1">
                <p>Salary by person : <b>{props.data.netSalary ? props.data.netSalary + " €" : "N/A"}</b> </p>
                <p>E-Mail : <b>{props.data.clientEmail.length? props.data.clientEmail : "No Email!"}</b> </p>
                    <p>Client Phone : <b>{props.data.clientPhone.length? props.data.clientPhone : "No Client Number!"}</b> </p>
                    <p>Contact Name :  <b>{props.data.clientReferenceName ? props.data.clientReferenceName : "No Name!"}</b> </p>
                    <p>Contact phone :   <b>{props.data.clientReferenceNumber.length? props.data.clientReferenceNumber: "No Contact Number!"}</b> </p>
                </div>
                </div>
</div>
<div className="col-12">
                    <div className="row color-rowClientCard p-1">
                    <div className="col-4 pr-0 d-flex  justify-content-start">
                      <div className="d-flex align-items-center ">
                        <p className="switch-fontCard mb-0">
                          Offre envoyé ?
                        </p>
                        <Switch
                          className="ml-left miniSwitch"
                          onChange={switchHandle}
                          // onClick={(e)=>switchHandle(e)}
                          checked={Offre}
                          id="Offre"
                        />
                      </div>
                    </div>
                    <div className="col-5 px-0 d-flex  justify-content-center">
                      <div className="d-flex align-items-center ">
                        <p className="switch-fontCard mb-0">
                          Signature digitale envoyé ?
                        </p>
                        <Switch
                          className="ml-left miniSwitch"
                          onChange={switchHandle}
                          checked={Signature}
                          id="Signature"
                        />
                      </div>
                    </div>
                    <div className="col-2 d-flex px-0 justify-content-center ml-1">
                      <div className="d-flex align-items-center ">
                        <p className="switch-fontCard mb-0">A1 ?</p>
                        <Switch
                          className="ml-left miniSwitch"
                          onChange={switchHandle}
                          checked={A1}
                          id="A1"
                        />
                      </div>
                    </div>
                   
                    <div className="col-5 d-flex pt-0 px-0 justify-content-center">
                      <div className="d-flex align-items-center ">
                        <p className="switch-fontCard mb-0">
                          Assurance faite ?
                        </p>
                        <Switch
                          className="ml-left miniSwitch"
                          onChange={switchHandle}
                          checked={Assurance}
                          id="Assurance"
                        />
                      </div>
                    </div>
                    <div className="col-7 d-flex px-0 justify-content-start">
                      <div className="d-flex align-items-center ">
                        <p className="switch-fontCard mb-0">
                          Contrat singé ?
                        </p>
                        <Switch
                          className="ml-left miniSwitch"
                          onChange={switchHandle}
                          checked={Contrat}
                          id="Contrat"
                        />
                      </div>
                    </div>
                    <div className="col-6 d-flex justify-content-start">
                      <div className="d-flex align-items-center ">
                        <p className="switch-fontCard mb-0">
                          Agence de voyage ok ?
                        </p>
                        <Switch
                          className="ml-left miniSwitch"
                          onChange={switchHandle}
                          checked={Agence}
                          id="Agence"
                        />
                      </div>
                    </div>
                    <div className="col-6 d-flex px-0  justify-content-start">
                      <div className="d-flex align-items-center ">
                        <p className="switch-fontCard mb-0">
                          Publicité commencé ?
                        </p>
                        <Switch
                          className="ml-left miniSwitch"
                          onChange={switchHandle}
                          checked={Public}
                          id="Public"
                        />
                      </div>
                    </div>
        
                    <div className="col-5 d-flex  ">
                      <div className="d-flex align-items-center ">
                        <p className="switch-fontCard mb-0">
                          SISPI déclaré ?
                        </p>
                        <Switch
                          className="ml-left miniSwitch"
                          onChange={switchHandle}
                          checked={SISPI}
                          id="SISPI"
                        />
                      </div>
                    </div>
                    </div>
                </div>
                <div className=" col-12 d-flex justify-content-end my-1">
                   <div className="row">
                   <div className="col-6 text-center">
                   <Select
                          options={CardOption}
                          className="CardOptions AllMoreOp"
                          onChange={MoreOption}
                          placeholder="More options"
                        />
            
                        </div> 
                      
                        <div className="col-6 px-0 text-center">
                            <button className="btn btn-SEEFULLprofile" onClick={viewFullProfile}>
                                See Full Profile
                            </button>
                        </div>
                     
                    </div>
                </div>
            </div>
            {showInProgressModal ?
                            <InProgressClientModal props={props.data} closeModal={setShowInProgressModal} /> : null
                        }
                     
                        {showArchiveModal ?
                            <ArchivedClientModal props={props.data} closeModal={setShowArchiveModal} path={"/clientToDo"} /> : null
                        }
        </>
    )
}

export default ClientToDoCard;