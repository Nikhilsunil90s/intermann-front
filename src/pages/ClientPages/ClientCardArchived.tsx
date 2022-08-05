import React,{useState} from "react";
import StarRatings from "react-star-ratings";
import {Link} from 'react-router-dom'
import "../../CSS/Client/ProgressCardClient.css";
import {ReactComponent as Empty} from "../../images/emptyStar.svg";
import {ReactComponent as StarRating} from "../../images/RatingStar.svg";
import Select from "react-select";
import ArchivedClientModal from "../../components/Modal/ArchivedClientModal";
import { useNavigate } from "react-router-dom";
import ReadMoreReact from 'read-more-react';
import CLintHide from "../../components/Modal/HideClientProfile"
import ClientREST from "../../components/Modal/ClientREStProfile"
function ClientCardArchived(props:any){
    const navigate = useNavigate();
    const [showArchiveModal, setShowArchiveModal] = useState(false)
    const [HideProfile,setHideProfile]=useState(false)
    const [RESTprofile,setREStProfile]=useState(false)
    const CardOption=[{
        value:"Edit Profile",label:"Edit Profile"
        },
        {value:"Archive",label:"Archive"
        }, {value:"Reset Profile",label:"Reset Profile"}
        ,{value:"Hide This Profile",label:"Hide This Profile"}
     ]as any
     const editClientProfile = () => {
        navigate("/clientInProgressEdit", { state: props.data });
    }
    const viewFullProfile = () => {
        console.log(props.data)
        navigate("/archivedClientSeeprofile", { state: props.data });
    }

     const MoreOption=(e:any)=>{
        if(e.value=="Edit Profile"){
          editClientProfile()
        }
        if(e.value=="Reset Profile"){
            setREStProfile(true)
        }
        if(e.value=="Hide This Profile"){
            setHideProfile(true)
        }
        if(e.value=="Archive"){
          setShowArchiveModal(true) 
        }
      console.log(e.value)
      }

console.log(props)
const candidatImportanceIcons = [{ icon:<><StarRating  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /></>}, {icon:<><StarRating  style={{marginRight:"3px",width:"70%"}} /><StarRating  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /></>}, {icon:<><StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /></>}, {icon:<><StarRating   style={{marginRight:"3px",width:"70%"}} /> <StarRating style={{marginRight:"3px",width:"70%"}}/> <StarRating style={{marginRight:"3px",width:"70%"}} /> <StarRating style={{marginRight:"3px",width:"70%"}} /> <Empty style={{marginRight:"3px",width:"70%"}} /></>}, {icon:<><StarRating  style={{marginRight:"3px",width:"70%"}} /><StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /></>}]; 
const candidatMotivationIcons = [{ icon:"😟", motivation: 'Disappointed' }, { icon:"🙁", motivation: 'Not Really' }, { icon:"😊", motivation: 'Like' }, { icon:"🥰", motivation: 'Great' }, { icon:"😍", motivation: 'Super Lovely' }];
  
  
  return(<>
       <div className="card cardInPro p-0">
                <div className="d-flex cursor-pointer" onClick={viewFullProfile}>
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
                    <div className="col-3 d-flex align-items-center">
                    <button className="ArchiveLargebtn pb-1 p-0"><img src={require("../../images/ArchivedBtn.svg").default} /></button>
                    </div>
                
                </div>
                <div className="col-12 d-flex align-items-center colorARecruting my-1 ">
                <p className="A-Recruting mb-0 ">Recruiting  :From {props.data.jobStartDate != "" ? props.data.jobStartDate : "___"} To {props.data.jobEndDate != "" ? props.data.jobEndDate : "___"} </p>
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
                <p>Salary by person : <b>  {props.data.netSalary || props.data.salary_hours ? props.data.netSalary + "€" || props.data.salary_hours.salaryPerHour * props.data.salary_hours.hours  + " €" : "N/A"}</b> </p>
                    <p>Cl-Phone : <b>{props.data.clientPhone.length? props.data.clientPhone : "No Client Number!"}</b> </p>
                    <p>C-Name :  <b>{props.data.clientReferenceName ? props.data.clientReferenceName : "No Name!"}</b> </p>
                    <p>C-phone :   <b>{props.data.clientReferenceNumber.length? props.data.clientReferenceNumber: "No Contact Number!"}</b> </p>
                </div>
                </div>
                </div>
                <div className="">
            <div className="colorARecruting p-1">
                    <p className="AdsFont">Ads Spent on this client: {props.data.jobTotalBudget}€  </p>
                    <p className="AdsFont">Reason archived :<ReadMoreReact text={props.data.clientArchived.reason ? props.data.clientArchived.reason : "No Reason!"}
            min={0}
            ideal={50}
            max={120}
            readMoreText={"....."}/> 
                         </p>
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
      {
        HideProfile ?
<CLintHide  props={props.data} closeModal={setHideProfile} path={"/clientToDo"} />
        :
        null
      }
      {
        RESTprofile ?
        <ClientREST props={props.data} closeModal={setREStProfile} path={"/clientToDo"}  />
        :
        null
      }
                        {showArchiveModal ?
                            <ArchivedClientModal props={props.data} closeModal={setShowArchiveModal} path={"/clientToDo"} /> : null
                        }
            </div></div>
    </>)
}
export default ClientCardArchived;