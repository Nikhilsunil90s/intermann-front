import { Link } from "react-router-dom";
import "../../CSS/Client/ClientTodo.css";
import StarRatings from 'react-star-ratings';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InProgressClientModal from "../../components/Modal/InProgressClientModal";
import ArchivedClientModal from "../../components/Modal/ArchivedClientModal";


const ClientToDoCard = (props: any) => {

    const navigate = useNavigate();

    const [showInProgressModal, setShowInProgressModal] = useState(false);
    const [showArchiveModal, setShowArchiveModal] = useState(false)

   console.log(props.data,"props.data")
    const editClientProfile = () => {
        navigate("/clientToDoEdit", { state: props.data });
    }

    const viewFullProfile = () => {
        console.log(props.data)
        navigate("/clientToDoProfile", { state: props.data });
    }

    // useEffect(() => {
    //     console.log(props.data)
    // })

   return (
        <>
            <div className="card card-color-client">
                <div className="card-upper">
                    <div className="col-4">
                        <img
                            src={require("../../images/card-men.svg").default}
                            className="card-img-top"
                            alt="..."
                        />
                    </div>
                    <div className="col-7 ">
                        <p><b>{props.data.clientCompanyName}</b></p>
                        <div >  <p>Motivation : 
                            <StarRatings
                                rating={props.data.clientMotivation}
                                starRatedColor="#ffc107"
                                // changeRating={}
                                numberOfStars={props.data.clientMotivation}
                                starDimension={'9px'}
                                starSpacing={'1px'}
                                name='rating'
                            />
                        </p>
                        </div> <div >  <p>Importance :
                            <StarRatings
                                rating={props.data.clientImportance}
                                starRatedColor="#ffc107"
                                // changeRating={}
                                numberOfStars={props.data.clientImportance}
                                starDimension={'9px'}
                                starSpacing={'1px'}
                                name='rating'
                            />
                        </p>
                        </div>
                        <div ><p>Num of position : <b>{props.data.numberOfPosts}</b> </p></div>
                        <Link to='#'>
                            <button className="todo">TO DO</button>
                        </Link>
                    </div>
                </div>

                <div className="card-body ">
                    <p>Secteur : <b>{props.data.clientActivitySector}</b> </p>
                    <p>Job :  <b>{props.data.clientJob}</b></p>
                    <p>Langues : <b>{props.data.clientLanguages}</b> </p>
                    <p>Phone Number :<b>{props.data.clientPhone}</b> </p>

                    <p className="blue">Recruiting  :From {props.data.jobStartDate != "" ? props.data.jobStartDate : "___"} To {props.data.jobEndDate != "" ? props.data.jobEndDate : "___"} </p>
                    <p>Estimated CA :   <b>{props.data.jobTotalBudget ? props.data.jobTotalBudget + " €" : "N/A"}</b> </p>

                    <p>Salary by person : <b>{props.data.netSalary ? props.data.netSalary + " €" : "N/A"}</b> </p>
                    <p>Client Email : <b>{props.data.clientEmail}</b> </p>
                    <p>Client Phone : <b>{props.data.clientPhone}</b> </p>
                    <p>Contact Name :  <b>{props.data.clientReferenceName}</b> </p>
                    <p>Contact phone :   <b>{props.data.clientReferenceNumber}</b> </p>

                </div>
                <div className="padding">
                    <div>
                        <input type="checkbox" /> Permis
                    </div>
                    <div className="row">
                        <div className="col-6 text-center">
                            <button className="btn btn-card" onClick={viewFullProfile}>
                                See Full Profile
                            </button>
                        </div>
                        <div className="col-6 text-center">
                            <button onClick={editClientProfile} className="btn btn-cardRightOne">
                                Edit Profile
                            </button>
                        </div>
                        <div className="col-6 text-center">
                            <button className="btn btn-cardLeft" onClick={() => { setShowInProgressModal(true) }} >
                                Move to In Progress
                            </button>
                        </div>
                        {showInProgressModal ?
                            <InProgressClientModal props={props.data} closeModal={setShowInProgressModal} /> : null
                        }
                        <div className="col-6 text-center">
                            <button className="btn btn-cardRight" onClick={() => { setShowArchiveModal(true) }} data-bs-toggle="modal" data-bs-target="#staticBackdrop2">
                                Archive
                            </button>
                        </div>
                        {showArchiveModal ?
                            <ArchivedClientModal props={props.data} closeModal={setShowArchiveModal} path={"/clientToDo"} /> : null
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClientToDoCard;