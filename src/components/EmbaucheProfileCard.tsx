import { Link } from "react-router-dom";
import { useState } from "react";
import "../CSS/Embauch.css";
import ArchivedModal from "./Modal/ArchivedModal";
import { useNavigate } from "react-router-dom";
import Select from 'react-select'
import moment from "moment";
import ResetProfile from "../components/Modal/RestProfileForArchived";


const EmbaucheProfileCard = (props: any) => {
const navigate = useNavigate();

    const [showArchiveModal, setShowArchiveModal] = useState(false)
    const [ResetModalProfile,setResetModalProfile]=useState(false)

    const CardOptions=[{
        value:"Edit Profile",label:"Edit Profile"
        },
        {value:"Archive",label:"Archive"
        }
        ,
        {value:"RESET-to-Todo",label:"RESET-to-Todo"
        }
     ]
     const [profile,setProfile]=useState(props.props ? props.props : props)
    const candidatMotivationIcons = [{ icon: "", motivation: 'No Motivation!' },{ icon: "😟", motivation: 'Disappointed' }, { icon: "🙁", motivation: 'Not Really' }, { icon: "😊", motivation: 'Like' }, { icon: "🥰", motivation: 'Great' }, { icon: "😍", motivation: 'Super Lovely' }];
    const viewFullProfile=()=>{
     localStorage.setItem('embauch', JSON.stringify(props.props));
     window.open("/embauchprofile" ,"_blank")
    }
    let data = {profileData:props.props,path:"/embauchlist"}
    const editCandidatProfile = () => {
      navigate("/editInProgress", { state: data});
    };
    const MoreOption=(e:any)=>{
      if(e.value=="Edit Profile"){
          editCandidatProfile()
      }
      if(e.value=="Archive"){
        setShowArchiveModal(true) 
      }
      if(e.value==="RESET-to-Todo"){
        setResetModalProfile(true) 
      }

    }

    const datenow=moment().format('YYYY-MM-DD')
    
    let date = new Date(datenow);

   let start = new Date(profile.candidatStartDate);
   let end = new Date(profile.candidatEndDate);

    return (
        <>
            <div className="card card-color mb-0 HoveRESTClassCardIn">
                <div className="card-upper cursor-pointer" onClick={()=>viewFullProfile()}>
                {
                           profile.candidatPhoto && profile.candidatPhoto?.url !== undefined ?
               <>     <div className="col-4">
                        <img
                            src={profile.candidatPhoto?.url}
                            className="card-img-top-Progress"
                            alt="..."
                        />
                    </div>
                    <div className="col-7 EmbauchCard pt-1 px-0" >
                    <p style={{width:"100%"}}  className="text-dark mb-0"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={profile.candidatName.toLocaleUpperCase()}><b>{profile.candidatName.length > 20 ? profile.candidatName.slice(0, 21).toLocaleUpperCase() + "..." : profile.candidatName.toLocaleUpperCase()}</b></p>
                    <p className="text-dark mb-0">{profile.candidatAge ?  <p className="age00 ml-0 mb-0"> <b>Age :  {profile.candidatAge}</b></p> : <b>✘ Age Not Available!</b>}</p>
                        <div >  <p className="text-dark d-flex"> <b>{candidatMotivationIcons[profile.candidatMotivation ].icon + " " + candidatMotivationIcons[profile.candidatMotivation ].motivation}</b> 
                        </p>
                        </div> 
                    
                    </div>
                </>
                :
                  
                <> <div className="col-4">
                        <img
                            src={require("../images/card-men.svg").default}
                            className="card-img-top"
                            alt="..."
                        />
                    </div>
                    <div className="col-7 EmbauchCard pt-1 px-0" >
                    <p style={{width:"100%"}}  className="text-dark mb-0"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={profile.candidatName.toLocaleUpperCase()}><b>{profile.candidatName.length > 20 ? profile.candidatName.slice(0, 21).toLocaleUpperCase() + "..." : profile.candidatName.toLocaleUpperCase()}</b></p>
                    <p className="text-dark mb-0">{profile.candidatAge ?  <p className="age00 ml-0 mb-0"> <b>Age :  {profile.candidatAge}</b></p> : <b>✘ Age Not Available!</b>}</p>
                        <div >  <p className="text-dark d-flex"> <b>{candidatMotivationIcons[profile.candidatMotivation ].icon + " " + candidatMotivationIcons[profile.candidatMotivation ].motivation}</b> 
                        </p>
                        </div> 
                
                        </div>
                        </>
                  }
                
               </div>
                <div className="col-12 ">
                        <div className="row cardColorRowEmbaunch">

                      
                        <div className="col-8">
                        <Link to='#'>
                            <button className="EmbaucheCardBtn p-0"><img src={require("../images/thundermini.svg").default} />IN PROGRESS</button>
                        </Link>
                        </div>
                    </div>
                    </div>
                <div className="card-bodyEmbauch pl-0 " style={{marginLeft:"5px"}}>
                    <div className="pr-0 EmbauchCardChildFonts">
                    {/* <p>Name: {profile.candidatName}</p> */}
                    <p className="mb-0"> <b>{profile.candidatAge ? profile.candidatAge +"years old" : "✘ Age Not Available!"}</b></p>
                    <p className="mb-0">Secteur: <b> {profile.candidatActivitySector ?  profile.candidatActivitySector.toLocaleUpperCase() : "✘ No Sector!"}</b></p>
                    <p className="mb-0">Job: <b>{profile.candidatJob ? profile.candidatJob.toLocaleUpperCase() : "✘ No Job!"}</b></p>
                    <p className="mb-0">Langues:  <b> {profile.candidatLanguages.length ? profile.candidatLanguages.length > 3 ? profile.candidatLanguages.slice(0,3).join(", ") + "..." : profile.candidatLanguages.join(", ") : "✘ No Langues Selected!"} </b></p>
                    <p className="mb-0">Phone Number:  <b>{profile.candidatPhone ? profile.candidatPhone : "✘ No Phone!"}</b></p>
                    <p className="mb-0">Facebook URL:  <b>{profile.candidatFBURL ? <a href={profile.candidatFBURL} target="_blank" className="fbURL">View Facebook Profile.</a> : "✘ No Facebook Profile!"}</b></p>
                    <p className="preCard-Body-p">Email :  <b> {profile.candidatEmail ? profile.candidatEmail.length > 20 ? profile.candidatEmail.slice(0, 22).toLocaleUpperCase() + "..." : profile.candidatEmail.toLocaleUpperCase() : "✘ No Email Provided!"}</b></p>
                    <h6 className="todoCardbodyBlue mb-0 my-1" style={{ color: date >= start && date <= end  ? "#3F76E2" : "#ca1313"}}>
                        Ready for work : {date >= start && date <= end  ?" 📆" + profile.candidatStartDate  + "  To  " + profile.candidatEndDate :   "⚠️" + profile.candidatStartDate +"  To  " + profile.candidatEndDate } 
                    </h6>
                    </div>
                 

                    {showArchiveModal ?
                        <ArchivedModal props={profile} closeModal={setShowArchiveModal}  path={"/embauchlist"} /> : null
                    }     {
                        ResetModalProfile?
                        <ResetProfile props={props.props} closeModal={setResetModalProfile}  path={"/todolist"}/>
                        :
                        null
                       }

                </div>
                <div className="box-purple">
                        <p className="mb-0"><b>Works At : {profile.candidatCurrentWork[0].workingFor ? profile.candidatCurrentWork[0].workingFor.length > 20 ? profile.candidatCurrentWork[0].workingFor.slice(0, 25).toLocaleUpperCase() + "...." : profile.candidatCurrentWork[0].workingFor : "✘ No Working"}</b></p>
                        <p className="mb-0"><b>Since : {profile.candidatCurrentWork[0].workingSince ?profile.candidatCurrentWork[0].workingSince : "✘ No Since"}</b></p>
                        <p className="mb-0"><b>Salary :  {profile.candidatCurrentWork[0].salary ? profile.candidatCurrentWork[0].salary + "€": "✘ No Salary!"} </b></p>
                    </div>
                    <div className="col-12 my-1">
                    <div className="row">
                    <div className="col-6 text-center">
                        <Select
                    placeholder="More options"
                    options={CardOptions}
                    className="CardOptions AllMoreOp"
                    onChange={MoreOption} 
                    isSearchable={false}
                 
                 />
                     </div>
                        <div className="col-6 text-end">
                        <button className="btn btn-card" onClick={()=>viewFullProfile()}>
                            See Full Profile
                        </button>
                        </div>
                    </div></div>
               
  
            </div>
        </>
    )
}

export default EmbaucheProfileCard;