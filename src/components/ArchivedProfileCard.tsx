import React,{useState} from 'react';
import StarRatings from 'react-star-ratings';
import { Link } from "react-router-dom";
import "../CSS/Canceled.css";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'
import ArchivedModal from "./Modal/ArchivedModal";
import HideProfile from "../components/Modal/HideProfileModalForArchived";
import ResetProfile from "../components/Modal/RestProfileForArchived";
import moment from 'moment';

const ArchivedProfileCard = (props: any) => {
    console.log(props,"props")
    const navigate = useNavigate();
    const [hideProfile,setHideProfile]=useState(false)
    const [ResetModalProfile,setResetModalProfile]=useState(false)
    const [showArchiveModal, setShowArchiveModal] = useState(false)
    //  let data={state:props.props,path:"/archivedlist"}
    const [candidatMotivationIcons,setMotivation] = useState([{ icon: "", motivation: 'No Motivation!' },{ icon: "😟", motivation: 'Disappointed' }, { icon: "🙁", motivation: 'Not Really' }, { icon: "😊", motivation: 'Like' }, { icon: "🥰", motivation: 'Great' }, { icon: "😍", motivation: 'Super Lovely' }]);


    let data={profileData:props.props,path:"/archivedprofile"}
    const editCandidatProfile = () => {
      navigate("/editArchived", { state: data });
    };
    const viewFullProfile = () => {
        // navigate("/archivedprofile", { state: props.props })
        localStorage.setItem("archive", JSON.stringify(props.props))
        window.open("/archivedprofile","_blank")
    }
    const CardOptions=[{
        value:"Edit Profile",label:"Edit Profile"
        },
        {value:"Reset Profile",label:"Reset Profile"
        },
        {value:"Hide This Profile",label:"Hide This Profile"
        }
     ]

     const MoreOption=(e:any)=>{
        if(e.value=="Edit Profile"){
     editCandidatProfile()
        }
        if(e.value=="Reset Profile"){
            setResetModalProfile(true) 
        }
        if(e.value=="Hide This Profile"){
            setHideProfile(true) 
          }
      console.log(e.value)
      }


      const datenow=moment().format('YYYY-MM-DD')
      let date = new Date(datenow);

      let start = new Date(props.props.candidatStartDate);
      let end = new Date(props.props.candidatEndDate);
   

    return (
        <>
            <div className="card card-color mt-1 mb-0">
                <div className="card-upper cursor-pointer" onClick={()=>viewFullProfile()}>
                    <div className="col-4">
                        <img
                            src={require("../images/card-men.svg").default}
                            className="card-img-top"
                            alt="..."
                        />
                    </div>
                    <div className="col-7 ArchivedCard pt-1 px-0" >
                    <p style={{width:"100%"}} className="text-dark mb-0" data-bs-toggle="tooltip" data-bs-placement="bottom" title={props.props.candidatName.toLocaleUpperCase()}><b>{props.props.candidatName.length > 15 ? props.props.candidatName.slice(0, 18).toLocaleUpperCase() + "..." : props.props.candidatName.toLocaleUpperCase()}</b></p>
                    <p className="text-dark mb-0">{props.props.candidatAge ?  <p className="age00 ml-0 mb-0">Age : <b> {props.props.candidatAge}</b></p> : <b>Age Not Available!</b>}</p>
                        <div >  <p className="text-dark d-flex"> <b>{props.props.candidatMotivation == 0 ? candidatMotivationIcons[props.props.candidatMotivation ].icon +" "+ candidatMotivationIcons[props.props.candidatMotivation].motivation :  candidatMotivationIcons[props.props.candidatMotivation].icon +" "+ candidatMotivationIcons[props.props.candidatMotivation].motivation}</b>
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
                <div className="px-0  mb-1 ArchivedCardChildFonts" style={{marginLeft:"6px"}}>
                    {/* <p>Name:  <b>{props.props.candidatName}</b> </p> */}
                    {/* <p>Age: <b>{props.props.candidatAge}</b></p> */}
                    <p>Secteur: <b> {props.props.candidatActivitySector ?  props.props.candidatActivitySector.toLocaleUpperCase() : "No Sector!"}</b></p>
                    <p>Job: <b> {props.props.candidatJob ? props.props.candidatJob.toLocaleUpperCase() : "No Job!"}</b></p>
                    <p>Candidats age: <b>{props.props.candidatAge ? props.props.candidatAge +"years old" : "Age Not Available!"}</b></p>
                    <p>Langues:  <b>  {props.props.candidatLanguages.length ? props.props.candidatLanguages.length > 3 ? props.props.candidatLanguages.slice(0,3).join(", ") + "..." : props.props.candidatLanguages.join(", "): "No Langues Selected!"} </b></p>
                    <p>Phone Number:  <b>{props.props.candidatPhone ? props.props.candidatPhone : "No Phone!"}</b></p>
                    <p>Facebook URL:  <b>{props.props.candidatFBURL ? <a href={props.props.candidatFBURL} target="_blank" className="fbURL">View Facebook Profile.</a> : "No Facebook Profile!"}</b></p>
                    <p>Email: <b>{props.props.candidatEmail ? props.props.candidatEmail.length > 20 ? props.props.candidatEmail.slice(0, 22).toLocaleUpperCase() + "..." : props.props.candidatEmail.toLocaleUpperCase() : "No Email Provided!"}</b> </p>
                    <p className=" my-1"  style={{ color: date >= start && date <= end  ? "#3F76E2" : "#ca1313"}}><b>Ready for work: {date >= start && date <= end  ? props.props.candidatStartDate  + "  To  " + props.props.candidatEndDate :   "⚠️" + props.props.candidatStartDate +"  To  " + props.props.candidatEndDate } </b></p>
                    </div>
                    <div className="box-red pl-1">
                        <p> <b>REASON WHY CANCELED</b> : </p><span> {props.props.candidatArchived?.reason ? props.props.candidatArchived?.reason : "No Reason Specified!"}</span>

                    </div>
                    <div className='col-12 mt-1'>
                    <div className='row'>
                        <div className='col-6 text-center'>
                        <Select
                    placeholder="More options"
                    options={CardOptions}
                    className="CardOptions AllMoreOp"
                    onChange={MoreOption} 
                 />
                        </div>
                        <div className='col-6 text-end'>
                        <button className="btn btn-card" onClick={viewFullProfile}>
                            See Full Profile
                        </button>
                        </div>
                        
                                            </div>
                    </div>
                    {
        hideProfile?
        <HideProfile props={props.props} closeModal={setHideProfile}  path={"/todolist"}/>
        :
        null
       }
        {
        ResetModalProfile?
        <ResetProfile props={props.props} closeModal={setResetModalProfile}  path={"/todolist"}/>
        :
        null
       }

                </div>
            </div>
        </>
    )

}

export default ArchivedProfileCard;
