import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import StarRatings from 'react-star-ratings';
import "../../CSS/Client/ProgressCardClient.css";
import ArchivedClientModal from "../../components/Modal/ArchivedClientModal";
import { useNavigate } from "react-router-dom";


function ClientProgressCard(props: any) {

    const navigate = useNavigate();

    const [showInProgressModal, setShowInProgressModal] = useState(false);
    const [showArchiveModal, setShowArchiveModal] = useState(false)

    const editClientProfile = () => {
        navigate("/clientInProgressEdit", { state: props.data });
    }

    const viewFullProfile = () => {
        console.log(props.data)
        navigate("/clientInProgressProfile", { state: props.data });
    }

    useEffect(() => {
        console.log(props.data);
    }, [])

    return (
        <>
            <div className="card card-color">
                <div className="card-upper">
                    <div className="col-4">
                        <img
                            src={require("../../images/card-men.svg").default}
                            className="card-img-top"
                            alt="..."
                        />
                    </div>
                    <div className="col-7 ">
                        <p>{props.data.clientCompanyName}</p>
                        <div >  <p>Motivation:
                            <StarRatings
                                rating={props.data.clientMotivation}
                                starRatedColor="#ffc107"
                                // changeRating={}
                                numberOfStars={props.data.clientMotivation}
                                starDimension={'11px'}
                                starSpacing={'1px'}
                                name='rating'
                            />
                        </p>
                        </div>
                        <div >  <p>Importance :
                            <StarRatings
                                rating={props.data.clientImportance}
                                starRatedColor="#ffc107"
                                // changeRating={}
                                numberOfStars={props.data.clientImportance}
                                starDimension={'11px'}
                                starSpacing={'1px'}
                                name='rating'
                            />
                        </p>
                        </div>
                        <div ><p>Num of Position(s): {props.data.numberOfPosts} </p></div>
                        <button className="progressCard">IN PROGRESS</button>

                    </div>
                </div>

                <div className="card-body">
                    <p>Secteur :{" "}{props.data.clientActivitySector}</p>
                    <p>Job : {" "}{props.data.clientJob}</p>
                    <p>Langues : {" "}{props.data.clientLanguages.length > 1 ? props.data.clientLanguages.join(", ") : props.data.clientLanguages} </p>
                    <p>Phone Number : {" "}{props.data.clientPhone} </p>

                    <p className="blue">Recruiting  :From {props.data.jobStartDate != "" ? props.data.jobStartDate : "___"} To {props.data.jobEndDate != "" ? props.data.jobEndDate : "___"} </p>
                    <p>Estimated CA : {" "} {props.data.jobTotalBudget != 0 ? props.data.jobTotalBudget + " €" : "N/A"}</p>
                    <p>Salary by Person : {" "} {props.data.netSalary != 0 ? props.data.netSalary + " €" : "N/A"} </p>
                    <p>Client Phone : {" "}{props.data.clientPhone} </p>
                    <p>Contact Name :  {" "}{props.data.clientReferenceName != "" ? props.data.clientReferenceName : "No Reference Available!"} </p>
                    <p>Contact Phone :   {" "}{props.data.clientReferenceNumber != "" ? props.data.clientReferenceNumber : "No Reference Available!"} </p>
                    <span style={{ fontSize: "13px" }}>
                        <input type="checkbox" />
                        Permise
                    </span>

                    <div className="padding">
                        <div className="ads-box">
                            <p>Ads Spent on this client: {" "} {props.data.jobTotalBudget != 0 ? props.data.jobTotalBudget + " €" : "N/A"}  </p>
                            <p>Num of position found : {" "} {props.data.numberOfPosts}/5

                            </p>
                        </div>
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
                            <button className="btn btn-cardLeftSigned" onClick={() => { setShowInProgressModal(true) }} >
                                Move to Signed
                            </button>
                        </div>

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
            </div></>
    )
}
export default ClientProgressCard