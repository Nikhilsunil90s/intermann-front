import { Link } from "react-router-dom";
import "../CSS/CanEmpl.css";
import StarRatings from 'react-star-ratings';
import ArchivedModal from "./Modal/ArchivedModal";
import InProgressModal from "./Modal/InProgressModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const ToDoProfileCard = (props: any,{path}) => {

    const navigate = useNavigate();

    const [showInProgressModal, setShowInProgressModal] = useState(false);
    const [showArchiveModal, setShowArchiveModal] = useState(false)

    const editCandidatProfile = () => {
        navigate("/editToDo", { state: props.data });
    }

    const viewFullProfile = () => {
        navigate("/todoprofile", { state: props.data });
    }
    const MoreOption=(e)=>{
      if(e.target.value==="editProfile"){
          editCandidatProfile()
      }
      if(e.target.value==="moveProgress"){
        setShowInProgressModal(true)
      }
      if(e.target.value==="Archive"){
        setShowArchiveModal(true) 
      }
    }

    return (
        <>
            <div className="card card-color">
                <div className="card-upper">
                    <div className="col-4">
                        <img
                            src={require("../images/card-men.svg").default}
                            className="card-img-top"
                            alt="..."
                        />
                    </div>
                    <div className="col-7 ">
                        <p className="text-dark">{props.data.candidatName}</p>
                        <p className="text-dark">{props.data.candidatAge}</p>
                        <div >  <p className="text-dark">Motivation:
                            <StarRatings
                    
                                rating={props.data.candidatMotivation}
                                starRatedColor="#ffc107"
                                // changeRating={}
                                numberOfStars={props.data.candidatMotivation}
                                starDimension={'9px'}
                                starSpacing={'1px'}
                                name='rating'
                            />
                        </p>
                        </div>
                       
                    </div>
                   
                </div>

                <div className="card-body">
                <div className="col-12 ">
                        <div className="row cardColorRow">

                      
                        <div className="col-6 pd-00X1">
                        <Link to='#'>
                            <button className="todo"><img src={require("../images/briefcase.svg").default} /></button>
                        </Link>
                        </div>
                        <div className="col-6 d-flex justify-content-end mb-0 pd-00X1 form-group">
                            <form >
                        <div className="d-flex  justify-content-center align-items-center ">
                        <input type="checkbox" name="candidatLicensePermis"  id="css" checked={props.data.candidatLicensePermis} className="" /><label htmlFor="css" className="Licence">Have Licence</label>
                    </div></form>
                        </div>
                    </div>
                    </div>
                    <p>Name : {props.data.candidatName}</p>
                    <p>Age : {props.data.candidatAge}</p>
                    <p>Motivation : {props.data.candidatMotivation} </p>
                    <p>Secteur : {props.data.candidatActivitySector}</p>

                    <p>Job : {props.data.candidatJob} </p> 
                    <p>Langues : {props.data.candidatLanguages}
                     </p>
                    <p>Phone Number : {props.data.candidatPhone} </p>
                    <p>Facebook URL : <a href="#" className="fbURL">{props.data.candidatFBURL}</a> </p>
                    <p>Email : {props.data.candidatEmail} </p>
                    <p className="blue">
                        Ready for work : From {props.data.candidatStartDate} To {props.data.candidatEndDate}
                    </p>
                </div>
                <div className="card-body">
                  
                    <div className="col-12 mt-2">
                        <div className="row">
                            <div className="col-6">
                                <select className="selectOption firstoption" onChange={MoreOption}>
                                    <option>
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
                            <button className="btn btn-card" onClick={viewFullProfile}>
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