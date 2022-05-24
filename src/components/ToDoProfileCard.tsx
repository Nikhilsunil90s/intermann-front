import { Link } from "react-router-dom";
import "../CSS/CanEmpl.css";
import StarRatings from 'react-star-ratings';
import ArchivedModal from "./ArchivedModal";
import InProgressModal from "./Modal/InProgressModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const ToDoProfileCard = (props: any,{ notifyMoveSuccess, notifyMoveError}) => {

    const navigate = useNavigate();

    const [showInProgressModal, setShowInProgressModal] = useState(false);
    const [showArchiveModal, setShowArchiveModal] = useState(false)

    const editCandidatProfile = () => {
        navigate("/editToDo", { state: props.data });
    }

    const viewFullProfile = () => {
        navigate("/todoprofile", { state: props.data });
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
                        <p>{props.data.candidatName}</p>
                        <p>{props.data.candidatAge}</p>
                        <div >  <p>Motivation:
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
                        <Link to='#'>
                            <button className="todo">TO DO</button>
                        </Link>
                    </div>
                </div>

                <div className="card-body">
                    <p>Name : {props.data.candidatName}</p>
                    <p>Age : {props.data.candidatAge}</p>
                    <p>Motivation : {props.data.candidatMotivation} </p>
                    <p>Secteur : {props.data.candidatActivitySector}</p>

                    <p>Job : {props.data.candidatJob} </p>
                    <p>Langues : {props.data.candidatLanguages.join(", ")} </p>
                    <p>Phone Number : {props.data.candidatPhone} </p>
                    <p>Facebook URL : <a href="#" className="fbURL">{props.data.candidatFBURL}</a> </p>
                    <p>Email : {props.data.candidatEmail} </p>
                    <p className="blue">
                        Ready for work : From {props.data.candidatStartDate} To {props.data.candidatEndDate}
                    </p>
                </div>
                <div className="card-body">
                    <div>
                        <input type="checkbox" name="candidatLicensePermis" checked={props.data.candidatLicensePermis} /> Permis
                    </div>
                    <div className="col-12 mt-2">
                        <div className="row">
                            <div className="col-6 text-center">
                            <button className="btn btn-card" onClick={viewFullProfile}>
                            See Full Profile
                        </button>
                        </div>
                        <div className="col-6">
                        <button onClick={editCandidatProfile} className="btn btn-cardRight1">
                            Edit Profile
                        </button>
                            </div>
                        <div className="col-6 text-center">                      
                        <button className="btn btn-cardLeft" onClick={() => { setShowInProgressModal(true) }} >
                            Move to In Progress
                        </button>
                        </div>
                        {showInProgressModal ?
                            <InProgressModal props={props.data} closeModal={setShowInProgressModal} /> : null
                        }
                        <div className="col-6">                      
                        <button className="btn btn-cardRight" onClick={() => { setShowArchiveModal(true) }} data-bs-toggle="modal" data-bs-target="#staticBackdrop2">
                            Archive
                        </button>
                        </div>
                        {showArchiveModal ?
                            <ArchivedModal props={props.data} closeModal={setShowArchiveModal}  /> : null
                        }
</div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ToDoProfileCard;