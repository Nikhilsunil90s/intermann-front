import { Link } from "react-router-dom";
import "../CSS/CanEmpl.css";
import StarRatings from 'react-star-ratings';
import ArchivedModal from "./../components/Modal/ArchivedModal";
import InProgressModal from "../components/Modal/InProgressModal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select,{StylesConfig} from 'react-select'
import ReadMoreReact from 'read-more-react';
import { API_BASE_URL } from "../config/serverApiConfig";

const PreSelectedCard = (props: any,) => {

    const navigate = useNavigate();
    let state = {profileData: props.data, path: '/preSelected'}
    const [showInProgressModal, setShowInProgressModal] = useState(false);
    const [showArchiveModal, setShowArchiveModal] = useState(false)
    const [ClientID,setClientID]=useState([])
 

    const candidatMotivationIcons = [{ icon: "😟", motivation: 'Disappointed' }, { icon: "🙁", motivation: 'Not Really' }, { icon: "😊", motivation: 'Like' }, { icon: "🥰", motivation: 'Great' }, { icon: "😍", motivation: 'Super Lovely' }];
    const CardOptions=[{
        value:"editProfile",label:"Edit Profile"
        },
        {value:"Move to In Progress",label:"Move to In Progress"
        },
        {value:"Archive",label:"Archive"
        }
     ]
   
    const editCandidatProfile = () => {
        navigate("/editPreSelected", { state: state });
    }

    const viewFullProfile = () => {
        // navigate("/preSelectedView", { state: props.data });
               localStorage.setItem('profile', JSON.stringify(props.data));
               window.open("/preSelectedView", "_blank")
    }


    const MoreOption=(e)=>{
      if(e.value==="editProfile"){
          editCandidatProfile()
      }
      if(e.value==="Move to In Progress"){
        setShowInProgressModal(true)
      }
      if(e.value==="Archive"){
        setShowArchiveModal(true) 
      }
    }


    return (
        <>
            <div className="card card-color mb-1">
                <div onClick={viewFullProfile} className="card-upper  cursor-pointer">
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 " style={{paddingLeft:"5px"}}>
                        <img
                            src={require("../images/card-men.svg").default}
                            className="card-img-top"
                            alt="..."
                        />
                    </div>
                    <div className="col-xxl-9 col-xl-8 col-md-8 col-lg-8 fontStylinForPrecards">
                        <p style={{width:"100%"}}  className="text-dark"><b>{props.data.candidatName.length > 20 ? props.data.candidatName.slice(0, 21).toLocaleUpperCase() + "..." : props.data.candidatName.toLocaleUpperCase()}</b></p>
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
               
                    <p className="preCard-Body ">Secteur : {props.data.candidatActivitySector.toLocaleUpperCase()}</p>
                    <p className="preCard-Body">Job : {props.data.candidatJob.toLocaleUpperCase()}</p> 
                <p className="preCard-Body-p">Candidats Age : <b>{props.data.candidatAge}</b></p> 
                    <p className="preCard-Body-p">Langues :  <b>{props.data.candidatLanguages ? props.data.candidatLanguages.length > 3 ? props.data.candidatLanguages.slice(0,3).join(", ") + "..." : props.data.candidatLanguages.join(", "): "No Langues Selected!"}</b>
                     </p>
                    <p className="preCard-Body-p">Phone Number : <b>{props.data.candidatPhone} </b></p>
                    <p className="preCard-Body-p">Facebook URL : <b>{props.data.candidatFBURL ? <a href={props.data.candidatFBURL} target="_blank" className="fbURL">View Facebook Profile.</a> : "No Facebook Profile!"}</b></p>
                    <p className="preCard-Body-p">Email :  <b> {props.data.candidatEmail ? props.data.candidatEmail.length > 20 ? props.data.candidatEmail.slice(0, 22).toLocaleUpperCase() + "..." : props.data.candidatEmail.toLocaleUpperCase() : "No Email Provided!"}</b></p>
                    <p className="preCard-Body-blue ">
                        Ready for work :<b>{props.data.candidatStartDate} To {props.data.candidatEndDate}</b>
                    </p>
                </div>
                <div className="col-12">
                 <div className="row preSelectedCommentBox">
                    <div className="col-12 preCard-Body ">Preselected for client : {props.data.candidatPreSelectedFor ? props.data.candidatPreSelectedFor.length > 2 ?props.data.candidatPreSelectedFor.map((el)=>{return el.clientId.clientCompanyName}).join(", "): props.data.candidatPreSelectedFor.map((el)=>(el.clientId.clientCompanyName)) : "No Client!"}</div>
                    <div className="col-12"><ReadMoreReact text={props.data.candidatPreSelectedFor[0] ? props.data.candidatPreSelectedFor[0].reasonForPreSelection : "No Reason Available!"}
            min={100}
            ideal={150}
            max={200}
            readMoreText={"....."}/></div>
                 </div>
                </div>
                <div className="my-1 px-1">
                  
                    <div className="col-12">
                        <div className="row">
                            <div className="col-6 px-0">
                            <Select
                    placeholder="More options"
                    options={CardOptions}
                    className="CardOptions"
                    onChange={MoreOption}
                    isSearchable={false}

                    
                 />
                            </div>
                            <div className="col-6 px-0 text-end">
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