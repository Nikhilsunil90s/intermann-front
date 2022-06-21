import { Link } from "react-router-dom";
import "../CSS/CanEmpl.css";
import ArchivedModal from "./Modal/ArchivedModal";
import InProgressModal from "./Modal/InProgressModal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select,{StylesConfig} from 'react-select'
import chroma from 'chroma-js';


const ToDoProfileCard = (props: any,{path}) => {

    const navigate = useNavigate();

    const [showInProgressModal, setShowInProgressModal] = useState(false);
    const [showArchiveModal, setShowArchiveModal] = useState(false)
 
  
    const candidatMotivationIcons = [{ icon: "😟", motivation: 'Disappointed' }, { icon: "🙁", motivation: 'Not Really' }, { icon: "😊", motivation: 'Like' }, { icon: "🥰", motivation: 'Great' }, { icon: "😍", motivation: 'Super Lovely' }];
    const editCandidatProfile = () => {
        navigate("/editToDo", { state: props.data });
    }

    const viewFullProfile = () => {
        navigate("/todoprofile", { state: props.data });
    }
    const MoreOption=(e:any)=>{
      if(e.value=="Edit Profile"){
          editCandidatProfile()
      }
      if(e.value=="moveProgress"){
        setShowInProgressModal(true)
      }
      if(e.value==="Archive"){
        setShowArchiveModal(true) 
      }
    console.log(e.value)
    }
   
    // const EmojiHandler=()=>{
    //     if(props.data.candidatMotivation===1){
    //        return setDissapointed(true)
    //     }
    //      if(props.data.candidatMotivation===2){
    //       return  setNotreally(true)
    //     }
    //   if (props.data.candidatMotivation===3){
    //       return  setLike(true)
    //     }
    //       if (props.data.candidatMotivation===4){
    //    return     setGreat(true)
    //     }
    //    if(props.data.candidatMotivation===5){
    //        return setSuperlovely(true)
    //     }
    // }
    return (
        <>
            <div className="card card-color">
                <div className="card-upper">
                    <div className="col-3">
                        <img
                            src={require("../images/card-men.svg").default}
                            className="card-img-top"
                            alt="..."
                        />
                    </div>
                    <div className="col-8 fontStylinForcards">
                    <p className="text-dark"><b>{props.data.candidatName.length > 20 ? props.data.candidatName.slice(0, 21).toLocaleUpperCase() + "..." : props.data.candidatName.toLocaleUpperCase()}</b></p>
                        <p className="text-dark"><b>{props.data.candidatAge ? props.data.candidatAge : "Age Not Available!"}</b></p>
                        <div >  <p className="text-dark d-flex"> <b>{candidatMotivationIcons[props.data.candidatMotivation - 1].icon + " " + candidatMotivationIcons[props.data.candidatMotivation - 1].motivation}</b>
                        </p>
                        </div>
                       
                    </div>
                   
                </div>

                <div className="card-body">
                <div className="col-12 ">
                        <div className="row cardColorRow">

                      
                        <div className="col-6 pd-00X1">
                        <Link to='#'>
                            <button className="todo p-0"><img src={require("../images/briefcase.svg").default} /></button>
                        </Link>
                        </div>
                        <div className="col-6 d-flex justify-content-end mb-0 pd-00X1 form-group">
                        {
                                    props.data.candidatLicensePermis ?
                                        <div className="d-flex  justify-content-center align-items-center">
                                            <input type="checkbox" name="candidatLicensePermis" id="css" checked={props.data.candidatLicensePermis} />
                                            <label htmlFor="css" className="Licence">Have Licence</label>
                                        </div> :
                                       <div className="d-flex  justify-content-center align-items-center">
                                       <input type="checkbox" name="candidatLicensePermis" id="css" checked={props.data.candidatLicensePermis} />
                                       <label htmlFor="css" className="NoLicence">No Licence</label>
                                   </div>
                                }
                        </div>
                    </div>
                    </div>
                    <p>Name : <b>{props.data.candidatName.toLocaleUpperCase()}</b></p>
                    <p>Age : <b>{props.data.candidatAge ? props.data.candidatAge : "Age Not Available!"}</b></p>
                    <p>Motivation : <b>{candidatMotivationIcons[props.data.candidatMotivation - 1].icon + " " + candidatMotivationIcons[props.data.candidatMotivation - 1].motivation}</b> </p>
                    <p>Secteur : <b>{props.data.candidatActivitySector.toLocaleUpperCase()}</b></p>

                    <p>Job : <b>{props.data.candidatJob.toLocaleUpperCase()}</b> </p>
                    <p>Langues : <b>{props.data.candidatLanguages.length > 0 ? props.data.candidatLanguages.join(", ") : "No Langues Selected!"}</b>
                    </p>
                    <p>Phone Number : <b>{props.data.candidatPhone}</b> </p>
                    <p>Facebook URL : <b>{props.data.candidatFBURL ? <a href={props.data.candidatFBURL} target="_blank" className="fbURL">View Facebook Profile.</a> : "No Facebook Profile!"}</b></p>
                    <p>Email : <b>{props.data.candidatEmail ? props.data.candidatEmail : "No Email Provided!"}</b> </p>
                    <p className="blue">
                        Ready for work : From {props.data.candidatStartDate} To {props.data.candidatEndDate}
                    </p>
                   
                </div>
                <div className="card-body">
                  
                    <div className="col-12 mt-2">
                        <div className="row">
                            <div className="col-6">
                                <select className="selectOption firstoption" onChange={MoreOption}>
                                    <option  value="" disabled selected hidden>
                                        More options
                                    </option>
                                    <option value="editProfile">

                                        Edit Profile

                                    </option>
                                    <option value="moveProgress"  >

                                        Move to In Progress

                                    </option>
                                    <option value="Archive">

                                        Archive

                                    </option>
                                </select>
                 
                            </div>
                            <div className="col-6 text-center">
                                <button className="btn btn-dark btn-card" onClick={viewFullProfile}>
                                    See Full Profile
                                </button>
                            </div>
                            {showInProgressModal ?
                                <InProgressModal props={props.data} closeModal={setShowInProgressModal} /> : null
                            }
                            {showArchiveModal ?
                                <ArchivedModal props={props.data} closeModal={setShowArchiveModal} path={"/todolist"} /> : null
                            }
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ToDoProfileCard;