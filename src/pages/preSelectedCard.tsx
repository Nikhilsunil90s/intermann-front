import { Link } from "react-router-dom";
import "../CSS/CanEmpl.css";
import StarRatings from 'react-star-ratings';
import ArchivedModal from "./../components/Modal/ArchivedModal";
import InProgressModal from "../components/Modal/InProgressModal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select,{StylesConfig} from 'react-select'


const PreSelectedCard = (props: any,{path}) => {

    const navigate = useNavigate();

    const [showInProgressModal, setShowInProgressModal] = useState(false);
    const [showArchiveModal, setShowArchiveModal] = useState(false)
    const candidatMotivationIcons = [{ icon: "😟", motivation: 'Disappointed' }, { icon: "🙁", motivation: 'Not Really' }, { icon: "😊", motivation: 'Like' }, { icon: "🥰", motivation: 'Great' }, { icon: "😍", motivation: 'Super Lovely' }];
    const CardOptions=[{
        value:"Edit Profile",label:"Edit Profile"
        },
        {value:"moveProgress",label:"moveProgress"
        },
        {value:"Archive",label:"Archive"
        }
     ]

    const editCandidatProfile = () => {
        navigate("/editToDo", { state: props.data });
    }

    const viewFullProfile = () => {
        navigate("/preSelectedView", { state: props.data });
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
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 ">
                        <img
                            src={require("../images/card-men.svg").default}
                            className="card-img-top"
                            alt="..."
                        />
                    </div>
                    <div className="col-xxl-8 col-xl-8 col-md-8 col-lg-8 fontStylinForPrecards">
                        <p className="text-dark"><b>{props.data.candidatName.length > 20 ? props.data.candidatName.slice(0, 21).toLocaleUpperCase() + "..." : props.data.candidatName.toLocaleUpperCase()}</b></p>
                        <p className="text-dark"><b>{props.data.candidatAge ? props.data.candidatAge : "Age Not Available!"}</b></p>
                        <div >  <p className="text-dark d-flex"><b>{candidatMotivationIcons[props.data.candidatMotivation - 1].icon + " " + candidatMotivationIcons[props.data.candidatMotivation - 1].motivation}</b>
                        </p>
                        </div>
                       
                    </div>
                   
                </div>
                <div className="col-12 ">
                        <div className="row cardPreSelectedColorRow">

                      
                        <div className="col-6 pd-00X11">
                        <Link to='#'>
                            <button className="preStylingO11 p-0"><img src={require("../images/preselectedCard.svg").default} />    PRE SELECTED</button>
                        </Link>
                        </div>
                        <div className="col-6 d-flex justify-content-end mb-0 pd-00P1 form-group">
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
                <div className="card-body CardDetails">
               
                    <p className="preCard-Body">Secteur : {props.data.candidatActivitySector.toLocaleUpperCase()}</p>
                    <p className="preCard-Body">Job :{props.data.candidatJob.toLocaleUpperCase()}</p> 
                <p>Candidats Age : <b>{props.data.candidatAge}</b></p> 
                    <p>Langues :  <b>{props.data.candidatLanguages.length > 0 ? props.data.candidatLanguages.join(", ") : "No Langues Selected!"}</b>
                     </p>
                    <p>Phone Number : <b>{props.data.candidatPhone} </b></p>
                    <p>Facebook URL : <b>{props.data.candidatFBURL ? <a href={props.data.candidatFBURL} target="_blank" className="fbURL">View Facebook Profile.</a> : "No Facebook Profile!"}</b></p>
                    <p>Email : <b>{props.data.candidatEmail ? props.data.candidatEmail : "No Email Provided!"}</b></p>
                    <p className="blue">
                        Ready for work : From <b>{props.data.candidatStartDate} To {props.data.candidatEndDate}</b>
                    </p>
                </div>
                <div className="col-12 ">
                 <div className="row preSelectedCommentBox">
                    <div className="col-12 preCard-Body">Preselected for client : {props.data.candidatName}</div>
                    <div className="col-12">Comment about selection : Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt </div>
                 </div>
                </div>
                <div className="card-body">
                  
                    <div className="col-12 mt-1">
                        <div className="row">
                            <div className="col-6 px-0">
                            <Select
                    placeholder="More options"
                    options={CardOptions}
                    className="CardOptions"
                    onChange={MoreOption}
                    
                 />
                            </div>
                            <div className="col-6 px-0 text-center">
                            <button className="btn btn-SeePreCard" onClick={viewFullProfile}>
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

export default PreSelectedCard;