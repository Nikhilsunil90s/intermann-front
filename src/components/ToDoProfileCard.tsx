import { Link } from "react-router-dom";
import "../CSS/CanEmpl.css";
import ArchivedModal from "./Modal/ArchivedModal";
import InProgressModal from "./Modal/InProgressModal";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import Select,{StylesConfig} from 'react-select'
import chroma from 'chroma-js';


const ToDoProfileCard = (props: any,{path}) => {

    const navigate = useNavigate();

    const [showInProgressModal, setShowInProgressModal] = useState(false);
    const [showArchiveModal, setShowArchiveModal] = useState(false)
    const CardOptions=[{
   value:"Edit Profile",label:"Edit Profile"
   },
   {value:"Move to In Progress",label:"Move to In Progress"
   },
   {value:"Archive",label:"Archive"
   }
]
   let state ={profileData:props.data,path:"/todolist"}

    const candidatMotivationIcons = [{ icon: "😟", motivation: 'Disappointed' }, { icon: "🙁", motivation: 'Not Really' }, { icon: "😊", motivation: 'Like' }, { icon: "🥰", motivation: 'Great' }, { icon: "😍", motivation: 'Super Lovely' }];
   
    const editCandidatProfile = () => {
        navigate("/editToDo", { state: state});
    }

    const viewFullProfile = () => {
        // navigate("/todoprofile", { state: props.data });
        localStorage.setItem('profile', JSON.stringify(props.data));
        window.open("/todoprofile", "_blank")
    }
    const MoreOption=(e:any)=>{
      if(e.value=="Edit Profile"){
          editCandidatProfile()
      }
      if(e.value=="Move to In Progress"){
        setShowInProgressModal(true)
      }
      if(e.value=="Archive"){
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
            <div className="card card-color mb-1 px-0">
                <div onClick={viewFullProfile} className="card-upper cursor-pointer">
                    <div className="col-4">
                        <img
                            src={require("../images/card-men.svg").default}
                            className="card-img-top"
                            alt="..."
                        />
                    </div>
                    <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-8 fontStylinForcards">
                    <p className="text-dark mb-0"><b>{props.data.candidatName.length > 20 ? props.data.candidatName.slice(0, 21).toLocaleUpperCase() + "..." : props.data.candidatName.toLocaleUpperCase()}</b></p>
                        <p className="text-dark mb-0">{props.data.candidatAge ?  <p className="age00 mb-0">Age : <b> {props.data.candidatAge}</b></p> : <b>Age Not Available!</b>}</p>
                        <div >  <p className="text-dark d-flex mb-0"> <b>{candidatMotivationIcons[props.data.candidatMotivation - 1].icon + " " + candidatMotivationIcons[props.data.candidatMotivation - 1].motivation}</b>
                        </p>
                        </div>
                       
                   
                </div>
                </div>
                <div className="col-12 ">
                        <div className="row cardColorRow">

                      
                        <div className="col-6 pd-00X1">
                        <Link to='#'>
                            <button className="todo p-0"><img src={require("../images/briefcase.svg").default} /></button>
                        </Link>
                        </div>
                        <div className="col-6 d-flex justify-content-end mb-0 pd-00X1 px-0 form-group">
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
  
                <div className="card-todoBody" style={{paddingLeft:"5px"}}>
{/*                
                    <p className="todoCardbody">Name : <b>{props.data.candidatName.toLocaleUpperCase()}</b></p>
                    <p className="todoCardbody">Age : <b>{props.data.candidatAge ? props.data.candidatAge : "Age Not Available!"}</b></p> */}
                    {/* <p className="todoCardbody">Motivation : <b>{candidatMotivationIcons[props.data.candidatMotivation - 1].icon + " " + candidatMotivationIcons[props.data.candidatMotivation - 1].motivation}</b> </p> */}
                    <p className="todoCardbody mb-0"><b>Secteur : {props.data.candidatActivitySector.toLocaleUpperCase()}</b></p>

                    <p className="todoCardbody mb-0"><b>Job : {props.data.candidatJob.toLocaleUpperCase()}</b> </p>
                    <p className="todoCardbody-p mb-0">Langues : <b>{props.data.candidatLanguages.length > 0 ? props.data.candidatLanguages.join(", ") : "No Langues Selected!"}</b>
                    </p>
                    <p className="todoCardbody-p mb-0">Phone Number : <b>{props.data.candidatPhone}</b> </p>
                    <p className="todoCardbody-p mb-0">Facebook URL : <b>{props.data.candidatFBURL ? <a href={props.data.candidatFBURL} target="_blank" className="fbURL">View Facebook Profile.</a> : "No Facebook Profile!"}</b></p>
                    <p className="todoCardbody-p mb-0">Email : <b>{props.data.candidatEmail ? props.data.candidatEmail : "No Email Provided!"}</b> </p>
                    <p className="todoCardbodyBlue py-1">
                        Ready for work : {props.data.candidatStartDate} To {props.data.candidatEndDate}
                    </p>
                    </div>
            
                <div className="card-bodyTodo mb-1 py-0" >
                    <div className=""  style={{padding:"0px 5px"}}>
                    <div className="col-xxl-12 col-xl-12 col-md-12 col-lg-12 py-0 px-0 mt-0">
                        <div className="row">
                            <div className="col-xxl-6 col-xl-6 col-md-6 col-lg-6">
                                {/* <select className="selectOption firstoption" onChange={MoreOption}>
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
                                </select> */}
                 <Select
                    placeholder="More options"
                    options={CardOptions}
                    className="CardOptions AllMoreOp"
                    onChange={MoreOption}
                    isSearchable={false}
                 />
                            </div>
                            <div className="col-xxl-6 col-xl-6 col-md-6 col-lg-6  text-end pl-0">
                                <button className="btn btn-dark btn-viewprofile-card" onClick={viewFullProfile}>
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
            </div>
        </>
    )
}

export default ToDoProfileCard;