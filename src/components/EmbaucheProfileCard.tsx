import { Link } from "react-router-dom";
import { useState } from "react";
import "../CSS/Embauch.css";
import StarRatings from 'react-star-ratings';
import ArchivedModal from "./ArchivedModal";
import { useNavigate } from "react-router-dom";

const EmbaucheProfileCard = (props: any) => {

    const navigate = useNavigate();

    const [data, setData] = useState([props])
    const [showArchiveModal, setShowArchiveModal] = useState(false)


    const viewFullProfile = () => {
        navigate("/embauchprofile", { state: props });
    }

    return (
        <>
            <div className="card card-color mt-3">
                <div className="card-upper">
                    <div className="col-4">
                        <img
                            src={require("../images/card-men.svg").default}
                            className="card-img-top"
                            alt="..."
                        />
                    </div>
                    <div className="col-7 ">
                        <p>Name: {props.props.candidatName}</p>
                        <p>Age: {props.props.candidatAge}</p>
                        <div >  <p>Motivation:
                            <StarRatings
                                rating={props.props.candidatMotivation}
                                starRatedColor="#ffc107"
                                // changeRating={}
                                numberOfStars={props.props.candidatMotivation}
                                starDimension={'11px'}
                                starSpacing={'1px'}
                                name='rating'
                            />
                        </p>
                        </div>
                        <button className="embauch">EMBAUCHé</button>

                    </div>
                </div>

                <div className="card-body">
                    <p>Name: {props.props.candidatName}</p>
                    <p>Age: {props.props.candidatAge}</p>
                    <p>Secteur:  {props.props.candidatActivitySector}</p>
                    <p>Job:  {props.props.candidatJob} </p>
                    <p>Langues:  {props.props.candidatLanguages.join(", ")} </p>
                    <p>Phone Number:  {props.props.candidatPhone}</p>
                    <p>Facebook URL:  <a href="#" className="fbURL">{props.props.candidatFBURL}</a></p>
                    <p>Email:  {props.props.candidatEmail}</p>
                    <p className="blue">Ready for work:  {props.props.candidatStartDate} To {props.props.candidatEndDate} </p>
                    <span>
                        <input type="checkbox" name="candidatLicensePermis" checked={props.props.candidatLicensePermis} />
                    </span>
                    Permise
                    <div className="box-gray">
                        <p>Works At <small>: {props.props.candidatCurrentWork[0].workingFor}</small></p>
                        <p>Since <small>: {props.props.candidatCurrentWork[0].workingSince}</small></p>
                        <p>Salary <small>:  {props.props.candidatCurrentWork[0].salary} €</small></p>
                    </div>
                  <div className="col-12">
                    <div className="row">
                        <div className="col-6 text-center">
                        <button className="btn btn-card" onClick={viewFullProfile}>
                            See Full Profile
                        </button>
                        </div>
                     <div className="col-6 text-center">
                     <button className="btn btn-cardRight1">
                            Edit Profile
                        </button>
                     </div>
                      <div className="col-12 text-center">
                      <button className="btn btn-cardRight" onClick={() => { setShowArchiveModal(true) }}>
                            Archive
                        </button>
                      </div>
                    
                    </div></div>

                    {showArchiveModal ?
                        <ArchivedModal props={props.props} closeModal={setShowArchiveModal} /> : null
                    }

                </div>
            </div>
        </>
    )
}

export default EmbaucheProfileCard;