import StarRatings from 'react-star-ratings';
import { Link } from "react-router-dom";
import "../CSS/Canceled.css";
import { useNavigate } from 'react-router-dom';


const ArchivedProfileCard = (props: any) => {

    const navigate = useNavigate();

    const viewFullProfile = () => {
        navigate("/archivedprofile", { state: props.props })
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
                        <button className="Archived">Archived</button>

                    </div>
                </div>

                <div className="card-body">
                    <p>Name:  <b>{props.props.candidatName}</b> </p>
                    <p>Age: <b>{props.props.candidatAge}</b></p>
                    <p>Secteur: <b>{props.props.candidatActivitySector}</b></p>
                    <p>Job : <b>{props.props.candidatJob}</b> </p>
                    <p>Langues : <b>{props.props.candidatLanguages.join(", ")} </b></p>
                    <p>Phone Number : <b>{props.props.candidatPhone} </b></p>
                    <p>Facebook URL : <b><a className='fbURL' href='#'>{props.props.candidatFBURL}</a></b> </p>
                    <p>Email : <b>{props.props.candidatEmail}</b> </p>
                    <p className="blue">Ready for work : From {props.props.candidatStartDate} To {props.props.candidatEndDate} </p>
                    <span>
                        <input type="checkbox" />
                    </span>
                    Permise
                    <div className="box-red">
                        <p>  REASON WHY CANCELED : <span> {props.props.candidatArchived?.reason ? props.props.candidatArchived?.reason : "No Reason Specified!"}</span></p>

                    </div>
                    <div className='text-center'>
                        <button className="btn btn-card" onClick={viewFullProfile}>
                            See Full Profile
                        </button>
                        <button className="btn btn-cardRight1">
                            Edit Profile
                        </button>
                    </div>

                </div>
            </div>
        </>
    )

}

export default ArchivedProfileCard;
