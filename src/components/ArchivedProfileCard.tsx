import React,{useState} from 'react';
import StarRatings from 'react-star-ratings';
import { Link } from "react-router-dom";
import "../CSS/Canceled.css";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'
import ArchivedModal from "./Modal/ArchivedModal";



const ArchivedProfileCard = (props: any) => {
    const candidatMotivationIcons = [{ icon: "😟", motivation: 'Disappointed' }, { icon: "🙁", motivation: 'Not Really' }, { icon: "😊", motivation: 'Like' }, { icon: "🥰", motivation: 'Great' }, { icon: "😍", motivation: 'Super Lovely' }];
    const navigate = useNavigate();
    const [showArchiveModal, setShowArchiveModal] = useState(false)
    
    const viewFullProfile = () => {
        navigate("/archivedprofile", { state: props.props })
    }
    const CardOptions=[{
        value:"Edit Profile",label:"Edit Profile"
        },
        {value:"Archive",label:"Archive"
        }
     ]

     const MoreOption=(e:any)=>{
        if(e.value=="Edit Profile"){
            viewFullProfile()
        }
        if(e.value=="Archive"){
          setShowArchiveModal(true) 
        }
      console.log(e.value)
      }

    return (
        <>
            <div className="card card-color mt-1">
                <div className="card-upper cursor-pointer" onClick={()=>viewFullProfile()}>
                    <div className="col-4">
                        <img
                            src={require("../images/card-men.svg").default}
                            className="card-img-top"
                            alt="..."
                        />
                    </div>
                    <div className="col-7 ArchivedCard pt-1 px-0" >
                        <p><b>{props.props.candidatName}</b></p>
                        <p><b> {props.props.candidatAge}</b></p>
                        <div >  <p className="text-dark d-flex"> <b>{candidatMotivationIcons[props.props.candidatMotivation - 1].icon + " " + candidatMotivationIcons[props.props.candidatMotivation - 1].motivation}</b>
                        </p>
                        </div>
                        
                    </div>
                </div>
                <div className="col-12 ">
                        <div className="row cardColorRowArchived">

                      
                        <div className="col-6 ">
                        <Link to='#'>
                            <button className="ArchivedCardBtn p-0"><img src={require("../images/ArchivedBtn.svg").default} /></button>
                        </Link>
                        </div>
                        <div className="col-6 d-flex justify-content-end mb-0 pd-00X1 form-group">
                        {
                                    props.props.candidatLicensePermis ?
                                        <div className="d-flex  justify-content-center align-items-center">
                                            <input type="checkbox" name="candidatLicensePermis" id="css" checked={props.props.candidatLicensePermis} />
                                            <label htmlFor="css" className="Licence mb-0">Have Licence</label>
                                        </div> :
                                       <div className="d-flex  justify-content-center align-items-center">
                                       <input type="checkbox" name="candidatLicensePermis" id="css" checked={props.props.candidatLicensePermis} />
                                       <label htmlFor="css" className="NoLicence mb-0">No Licence</label>
                                   </div>
                                }
                        </div>
                    </div>
                    </div>
                <div className="card-body pl-0">
                <div className="pr-0 pl-1 mb-1 ArchivedCardChildFonts">
                    {/* <p>Name:  <b>{props.props.candidatName}</b> </p> */}
                    {/* <p>Age: <b>{props.props.candidatAge}</b></p> */}
                    <p>Secteur: <b> {props.props.candidatActivitySector.toLocaleUpperCase()}</b></p>
                    <p>Job: <b> {props.props.candidatJob.toLocaleUpperCase()}</b></p>
                    <p>Candidats age: <b>{props.props.candidatAge ? props.props.candidatAge +"years old" : "Age Not Available!"}</b></p>
                    <p>Langues:  <b> {props.props.candidatLanguages.join(", ")} </b></p>
                    <p>Phone Number:  <b>{props.props.candidatPhone}</b></p>
                    <p>Facebook URL:  <b>{props.props.candidatFBURL ? <a href={props.props.candidatFBURL} target="_blank" className="fbURL">View Facebook Profile.</a> : "No Facebook Profile!"}</b></p>
                    <p>Email: <b>{props.props.candidatEmail ? props.props.candidatEmail : "No Email Provided!"}</b> </p>
                    <p className="blue my-1">Ready for work:  {props.props.candidatStartDate} To {props.props.candidatEndDate} </p>
                    </div>
                    <div className="box-red">
                        <p> <b>REASON WHY CANCELED</b> : </p><span> {props.props.candidatArchived?.reason ? props.props.candidatArchived?.reason : "No Reason Specified!"}</span>

                    </div>
                    <div className='col-12 mt-1'>
                    <div className='row'>
                        <div className='col-6 text-center'>
                        <Select
                    placeholder="More options"
                    options={CardOptions}
                    className="CardOptions"
                    onChange={MoreOption} 
                 />
                        </div>
                        <div className='col-6 text-center'>
                        <button className="btn btn-card" onClick={viewFullProfile}>
                            See Full Profile
                        </button>
                        </div>
                        
                                            </div>
                    </div>
                 

                </div>
            </div>
        </>
    )

}

export default ArchivedProfileCard;
