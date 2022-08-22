import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import StarRatings from 'react-star-ratings';
import "../../CSS/Client/ProgressCardClient.css";
import ArchivedClientModal from "../../components/Modal/ArchivedClientModal";
import { useNavigate } from "react-router-dom";
import {ReactComponent as Empty} from "../../images/emptyStar.svg";
import {ReactComponent as StarRating} from "../../images/RatingStar.svg";
import Switch from "react-switch";
import Select from "react-select";
import InProgressClientModal from "../../components/Modal/InProgressClientModal";
import {ReactComponent as TurnoFF} from "../../images/FatX.svg";
import {ReactComponent as TurnOn} from "../../images/base-switch_icon.svg";
import { API_BASE_URL } from "../../config/serverApiConfig";
import toast, { Toaster } from "react-hot-toast";
import SignedClientModal from "../../components/Modal/SignContractModal";
import Moment from 'react-moment';
import moment from 'moment';
let id=""
function ClientProgressCard(props: any) {

    const navigate = useNavigate();

  const notificationSwitch=()=>toast.success("Modification sauvegardée")


    const candidatImportanceIcons = [{ icon:<><StarRating  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /></>}, {icon:<><StarRating  style={{marginRight:"3px",width:"70%"}} /><StarRating  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /></>}, {icon:<><StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /></>}, {icon:<><StarRating   style={{marginRight:"3px",width:"70%"}} /> <StarRating style={{marginRight:"3px",width:"70%"}}/> <StarRating style={{marginRight:"3px",width:"70%"}} /> <StarRating style={{marginRight:"3px",width:"70%"}} /> <Empty style={{marginRight:"3px",width:"70%"}} /></>}, {icon:<><StarRating  style={{marginRight:"3px",width:"70%"}} /><StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /></>}]; 
    const candidatMotivationIcons = [{ icon:"No icon5", motivation: 'No Motivation' },{ icon:"😟", motivation: 'Disappointed' }, { icon:"🙁", motivation: 'Not Really' }, { icon:"😊", motivation: 'Like' }, { icon:"🥰", motivation: 'Great' }, { icon:"😍", motivation: 'Super Lovely' }];
    const [showArchiveModal, setShowArchiveModal] = useState(false)
    const [SISPI, setChecked] = useState(props.data.sispiDeclared);
    const [Agence, setAgence] = useState(props.data.agenceDeVoyage) as any;
    const [Assurance, setAssurance] = useState(props.data.assuranceFaite) as any;
    const [A1, setA1] = useState(props.data.A1selected) as any;
    const [Public, setPublic] = useState(props.data.publicityStarted) as any;
    const [Contrat, setContrat] = useState(props.data.contractSigned) as any;
    const [Signature, setSignature] = useState(props.data.signatureSent) as any;
    const [Offre, setOffre] = useState(props.data.offerSent) as any;
  const [showSignedModal, setShowSignedModal] = useState(false);
  const [DateInRange,setDateRange]=useState(false)as any

  const CardOption=[{
    value:"Edit Profile",label:"Edit Profile"
    },
    {value:"Move to signed",label:"Move to signed"
    },
    {value:"Archive",label:"Archive"
    }
 ]as any
    const editClientProfile = () => {
        navigate("/clientInProgressEdit", { state: props.data });
    }

    const viewFullProfile = () => {
        console.log(props.data)
        navigate("/clientInProgressProfile", { state: props.data });
    }


    const MoreOption=(e:any)=>{
        if(e.value=="Edit Profile"){
          editClientProfile()
        }
        if(e.value=="Move to signed"){
          setShowSignedModal(true)
        }
        if(e.value=="Archive"){
          setShowArchiveModal(true) 
        }
      console.log(e.value)
      }

      const SwitchChange = (checked: any, e: any, Name: any) => {
        id = e.data._id;
        if (Name === "offerSent") {
          if (checked === true) {
            setOffre(true);
            id = e.data._id;
            onChangeSwitches(id, Name, checked);
          notificationSwitch()
          }
          if (checked === false) {
           
            setOffre(false);
            onChangeSwitches(id, Name, checked);
          notificationSwitch()
          }
        }
        if (Name === "signatureSent") {
          if (checked === true) {
            setSignature(true);
            id = e.data._id;
    
            onChangeSwitches(id, Name, checked);
          notificationSwitch()
          }
          if (checked === false) {
           
            setSignature(false);
            onChangeSwitches(id, Name, checked);
          notificationSwitch()
          }
        }
        if (Name === "contractSigned") {
          if (checked === true) {
            setContrat(true);
            id = e.data._id;
    
            onChangeSwitches(id, Name, checked);
          notificationSwitch()
          }
          if (checked === false) {
           
            setContrat(false);
            onChangeSwitches(id, Name, checked);
          notificationSwitch()
          }
        }
        if (Name === "publicityStarted") {
          if (checked === true) {
            setPublic(true);
            id = e.data._id;
    
            onChangeSwitches(id, Name, checked);
          notificationSwitch()
          }
          if (checked === false) {
           
            setPublic(false);
            onChangeSwitches(id, Name, checked);
          notificationSwitch()
          }
        }
        if (Name === "A1selected") {
          if (checked === true) {
            setA1(true);
            id = e.data._id;
    
            onChangeSwitches(id, Name, checked);
          notificationSwitch()
          }
          if (checked === false) {
           
            setA1(false);
            onChangeSwitches(id, Name, checked);
          notificationSwitch()
          }
        }
        if (Name === "assuranceFaite") {
          if (checked === true) {
            setAssurance(true);
            id = e.data._id;
    
            onChangeSwitches(id, Name, checked);
          notificationSwitch()
          }
          if (checked === false) {
           
            setAssurance(false);
            onChangeSwitches(id, Name, checked);
          notificationSwitch()
          }
        }
        if (Name === "agenceDeVoyage") {
          if (checked === true) {
            setAgence(true);
            id = e.data._id;
    
            onChangeSwitches(id, Name, checked);
          notificationSwitch()
          }
          if (checked === false) {
           
            setAgence(false);
            onChangeSwitches(id, Name, checked);
          notificationSwitch()
          }
        }
        if (Name === "sispiDeclared") {
          if (checked === true) {
            setChecked(true);
            id = e.data._id;
    
            onChangeSwitches(id, Name, checked);
          notificationSwitch()
          }
          if (checked === false) {
           
            setChecked(false);
            onChangeSwitches(id, Name, checked);
          notificationSwitch()
          }
        }
      };
    
      const onChangeSwitches = async (id, AName, val) => {
        await fetch(
          `${API_BASE_URL}switchClientAttributes/?clientId=${id}&attribute=${AName}&value=${val}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
          .then((reD) => reD.json())
          .then((result) => result)
          .catch((err) => err);
      };
     

    const datenow=moment().format('YYYY-MM-DD')
    
       let date = new Date(datenow);
  
      let start = new Date(props.data.jobStartDate);
      let end = new Date(props.data.jobEndDate);
      
  

    return (
        <>
            <div className="card cardInPro p-0">
                <div className="d-flex cursor-pointer" onClick={viewFullProfile}>
                    <div className="col-3 px-0 d-flex justify-content-center">
                        <img
                            src={require("../../images/ClientCardPhoto.svg").default}
                            className="card-img-top widthIMG"
                            alt="..."
                        />
                    </div>
                    <div className="col-6 px-0 mt-1">
                    <p className="textClientCard" style={{width:"150%"}}><b>{props.data.clientCompanyName ? props.data.clientCompanyName.length > 20 ? props.data.clientCompanyName.toLocaleUpperCase().slice(0,29)+ "..." : props.data.clientCompanyName.toLocaleUpperCase(): "No CompanyName!"}</b></p>
                    <div >  <p  className="textClientCard" style={{height:"30px", background:"transparent"}}>Importance:
                             <b className="d-flex" style={{width:"37%",marginLeft:"3px",height:"43px"}}>{candidatImportanceIcons[props.data.clientImportance - 1]?.icon ? candidatImportanceIcons[props.data.clientImportance - 1]?.icon : "No Importance" }</b>

                        </p>
                        </div>
                        <div >  <p  className="textClientCard" style={{width:"130%"}}>Motivation :
                             <b style={{background:"transparent" , zIndex:"9"}}>{candidatMotivationIcons[props.data.clientMotivation]?.icon ?candidatMotivationIcons[props.data.clientMotivation]?.icon + candidatMotivationIcons[props.data.clientMotivation]?.motivation : "No Motivation!"}</b>
                        </p>
                        </div>
                        <div ><p  className="textClientCard">Num of position : <b>  {props.data.numberOfPosts ? props.data.numberOfPosts : "No Posts!"}</b> </p></div>
                 

                    </div>
                    <div className="col-3 px-0 d-flex align-items-center">
                    <button className="progressCardBtnClient"><img src={require("../../images/thundermini.svg").default} />In Progress</button>
                    </div>
                </div>
                <div className="col-12 d-flex align-items-center colorRecruting my-1 ">
                <p className="in-Recruting mb-0 " style={{ color: date >= start && date < end  ? "#A461D8" : "#ca1313"}}>Recruiting  :    {date >= start && date < end  ? "From " + props.data.jobStartDate  + "  To  " + props.data.jobEndDate :   "⚠️ From  " + props.data.jobStartDate +"  To  " + props.data.jobEndDate} </p>
                </div>
<div className="col-12 ">
    <div className="row pl-1">
                <div className="col-5 fontStylingCardDetails px-0 py-1">
                <p className="fontStylingCardP">Secteur : {props.data.clientActivitySector ? props.data.clientActivitySector.length > 15 ?  props.data.clientActivitySector.toLocaleUpperCase().slice(0,14)  + "..." : props.data.clientActivitySector.toLocaleUpperCase() : "No Sector!"} </p>
                    <p className="fontStylingCardP">Job : {props.data.clientJob ? props.data.clientJob.length > 15 ? props.data.clientJob.toLocaleUpperCase().slice(0,14) + "...": props.data.clientJob.toLocaleUpperCase() : "No Job!"}</p>
                    <p>Langues : <b> {props.data.clientLanguages.length ? props.data.clientLanguages : "No Langues!"}</b> </p>
                    <p>Phone :<b>{props.data.clientPhone.length ? props.data.clientPhone : "No Phone Number!"}</b> </p>
                    <p>Estimated CA :   <b>{props.data.jobTotalBudget ? props.data.jobTotalBudget + " €" : "N/A"}</b> </p>                

                </div>
                <div className="col-7 pl-1 fontStylingCardDetails px-0 pt-1">
                <p>Salary by person : <b>  {props.data.netSalary || props.data.salary_hours ? props.data.netSalary + "€" || props.data.salary_hours.salaryPerHour * props.data.salary_hours.hours  + " €" : "N/A"}</b> </p>
                    <p>Cl-Phone : <b>{props.data.clientPhone.length? props.data.clientPhone : "No Client Number!"}</b> </p>
                    <p>C-Name :  <b>{props.data.clientReferenceName ? props.data.clientReferenceName : "No Name!"}</b> </p>
                    <p>Contact :   <b>{props.data.clientReferenceNumber.length? props.data.clientReferenceNumber: "No Contact Number!"}</b> </p>
                </div>
                </div>
                </div>
                    <div className="Ads-box p-1">
                        <div className="">
                            <p  className="AdsFont mb-0">Ads Spent on this client:  {props.data.jobTotalBudget != 0 ? props.data.jobTotalBudget + " €" : "N/A"}  </p>
                            <p className="AdsFont mb-0">Num of position found :  {props.data.numberOfPosts}/5

                            </p>
                            <div className="col-12">
                    <div className="row p-1">
                    <div className="col-4 px-0 d-flex  justify-content-start">
              <div className="d-flex align-items-center ">
                <p className="switch-fontCard mb-0">Offre envoyé ?</p>

                <Switch
                  className="ml-left"
                  checked={Offre}
                  id="offerSent"
                  onChange={(checked, e, id) =>
                    SwitchChange(checked, props, id)
                  }
                  checkedHandleIcon={
                    <TurnOn
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-6px",
                      }}
                    />
                  }
                  height={19}
                  width={41}
                  uncheckedHandleIcon={
                    <TurnoFF
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-5px",
                      }}
                    />
                  }
                />
              </div>
            </div>
            <div className="col-5 px-0 d-flex  justify-content-center">
              <div className="d-flex align-items-center ">
                <p className="switch-fontCard mb-0">
                  Signature digitale envoyé ?
                </p>

                <Switch
                  checked={Signature}
                  id="signatureSent"
                  className="ml-left"
                  onChange={(checked, e, id) =>
                    SwitchChange(checked, props, id)
                  }
                  checkedHandleIcon={
                    <TurnOn
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-6px",
                      }}
                    />
                  }
                  height={19}
                  width={41}
                  uncheckedHandleIcon={
                    <TurnoFF
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-5px",
                      }}
                    />
                  }
                />
              </div>
            </div>
            <div className="col-2 d-flex px-0 justify-content-center ml-1">
              <div className="d-flex align-items-center ">
                <p className="switch-fontCard mb-0">A1 ?</p>

                <Switch
                  className="ml-left "
                  onChange={(checked, e, id) =>
                    SwitchChange(checked, props, id)
                  }
                  checked={A1}
                  id="A1selected"
                  checkedHandleIcon={
                    <TurnOn
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-6px",
                      }}
                    />
                  }
                  height={19}
                  width={41}
                  uncheckedHandleIcon={
                    <TurnoFF
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-5px",
                      }}
                    />
                  }
                />
              </div>
            </div>

            <div className="col-4 d-flex pt-0 px-0 justify-content-start">
              <div className="d-flex align-items-center ">
                <p className="switch-fontCard mb-0">Assurance faite ?</p>
                <Switch
                  className="ml-left "
                  onChange={(checked, e, id) =>
                    SwitchChange(checked, props, id)
                  }
                  checked={Assurance}
                  id="assuranceFaite"
                  checkedHandleIcon={
                    <TurnOn
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-6px",
                      }}
                    />
                  }
                  height={19}
                  width={41}
                  uncheckedHandleIcon={
                    <TurnoFF
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-5px",
                      }}
                    />
                  }
                />
              </div>
            </div>
            <div className="col-7 d-flex px-0 justify-content-start">
              <div className="d-flex align-items-center ">
                <p className="switch-fontCard mb-0">Client singé ?</p>
                <Switch
                  className="ml-left "
                  // onChange={switchHandle}
                  checked={Contrat}
                  onChange={(checked, e, id) =>
                    SwitchChange(checked, props, id)
                  }
                  id="contractSigned"
                  checkedHandleIcon={
                    <TurnOn
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-6px",
                      }}
                    />
                  }
                  height={19}
                  width={41}
                  uncheckedHandleIcon={
                    <TurnoFF
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-5px",
                      }}
                    />
                  }
                />
              </div>
            </div>
            <div className="col-5 px-0 d-flex justify-content-start">
              <div className="d-flex align-items-center ">
                <p className="switch-fontCard mb-0">Agence de voyage ok ?</p>
                <Switch
                  className="ml-left "
                  // onChange={switchHandle}
                  checked={Agence}
                  onChange={(checked, e, id) =>
                    SwitchChange(checked, props, id)
                  }
                  id="agenceDeVoyage"
                  checkedHandleIcon={
                    <TurnOn
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-6px",
                      }}
                    />
                  }
                  height={19}
                  width={41}
                  uncheckedHandleIcon={
                    <TurnoFF
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-5px",
                      }}
                    />
                  }
                />
              </div>
            </div>
            <div className="col-6 d-flex px-0  justify-content-start">
              <div className="d-flex align-items-center ">
                <p className="switch-fontCard mb-0">Publicité commencé ?</p>
                <Switch
                  className="ml-left "
                  // onChange={switchHandle}
                  checked={Public}
                  onChange={(checked, e, id) =>
                    SwitchChange(checked, props, id)
                  }
                  id="publicityStarted"
                  checkedHandleIcon={
                    <TurnOn
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-6px",
                      }}
                    />
                  }
                  height={19}
                  width={41}
                  uncheckedHandleIcon={
                    <TurnoFF
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-5px",
                      }}
                    />
                  }
                />
              </div>
            </div>

            <div className="col-5 d-flex  px-0">
              <div className="d-flex align-items-center ">
                <p className="switch-fontCard mb-0">SISPI déclaré ?</p>
                <Switch
                  className="ml-left "
                  // onChange={switchHandle}
                  checked={SISPI}
                  onChange={(checked, e, id) =>
                    SwitchChange(checked, props, id)
                  }
                  // defaultChecked={props.}
                  id="sispiDeclared"
                  checkedHandleIcon={
                    <TurnOn
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-6px",
                      }}
                    />
                  }
                  height={19}
                  width={41}
                  uncheckedHandleIcon={
                    <TurnoFF
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-5px",
                      }}
                    />
                  }
                />
              </div>
            </div>
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
                            <button className="btn btn-card" onClick={viewFullProfile}>
                                See Full Profile
                            </button>
                        </div>
                        </div> 
                        </div>
                        {showArchiveModal ?
                            <ArchivedClientModal props={props.data} closeModal={setShowArchiveModal} path={"/clientToDo"} /> : null
                        }
                            {showSignedModal ?
                      <SignedClientModal props={props.data} closeModal={setShowSignedModal} /> : null
                    }
                    </div></>
    )
}
export default ClientProgressCard