import { Link } from "react-router-dom";
import { useState } from "react";
import "../CSS/Embauch.css";
import StarRatings from 'react-star-ratings';
import ArchivedModal from "./Modal/ArchivedModal";
import { useNavigate } from "react-router-dom";
import Select from 'react-select'

const EmbaucheProfileCard = (props: any,{path}) => {
console.log(props,"ppr")
    const navigate = useNavigate();

    const [showArchiveModal, setShowArchiveModal] = useState(false)
    const CardOptions=[{
        value:"Edit Profile",label:"Edit Profile"
        },
        {value:"Archive",label:"Archive"
        }
     ]
     const [profile,setProfile]=useState(props.props ? props.props : props)
    const candidatMotivationIcons = [{ icon: "😟", motivation: 'Disappointed' }, { icon: "🙁", motivation: 'Not Really' }, { icon: "😊", motivation: 'Like' }, { icon: "🥰", motivation: 'Great' }, { icon: "😍", motivation: 'Super Lovely' }];
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
    console.log(e.value)
    }
    return (
        <>
            <div className="card card-color mb-0">
                <div className="card-upper cursor-pointer" onClick={()=>viewFullProfile()}>
                    <div className="col-4">
                        <img
                            src={require("../images/card-men.svg").default}
                            className="card-img-top"
                            alt="..."
                        />
                    </div>
                    <div className="col-7 EmbauchCard pt-1 px-0" >
                        <p><b>{profile.candidatName}</b></p>
                        <p><b> {profile.candidatAge}</b></p>
                        <div >  <p className="text-dark d-flex"> <b>{candidatMotivationIcons[profile.candidatMotivation - 1].icon + " " + candidatMotivationIcons[profile.candidatMotivation - 1].motivation}</b> 
                        </p>
                        </div> 
                        
                    </div>
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
                    <p className="mb-0"> <b>{profile.candidatAge ? profile.candidatAge +"years old" : "Age Not Available!"}</b></p>
                    <p className="mb-0">Secteur: <b> {profile.candidatActivitySector.toLocaleUpperCase()}</b></p>
                    <p className="mb-0">Job: <b> {profile.candidatJob.toLocaleUpperCase()}</b></p>
                    <p className="mb-0">Langues:  <b> {profile.candidatLanguages ? profile.candidatLanguages.join(", ") : "No Languages!"} </b></p>
                    <p className="mb-0">Phone Number:  <b>{profile.candidatPhone}</b></p>
                    <p className="mb-0">Facebook URL:  <b>{profile.candidatFBURL ? <a href={profile.candidatFBURL} target="_blank" className="fbURL">View Facebook Profile.</a> : "No Facebook Profile!"}</b></p>
                    <p className="mb-0">Email: <b>{profile.candidatEmail ? profile.candidatEmail : "No Email Provided!"}</b> </p>
                    <p className="todoCardbodyBlue mb-0 my-1">Ready for work:  {profile.candidatStartDate} To {profile.candidatEndDate} </p>
                    </div>
                 

                    {showArchiveModal ?
                        <ArchivedModal props={profile} closeModal={setShowArchiveModal}  path={"/embauchlist"} /> : null
                    }

                </div>
                <div className="box-purple">
                        <p className="mb-0"><b>Works At : {profile.candidatCurrentWork[0].workingFor}</b></p>
                        <p className="mb-0"><b>Since : {profile.candidatCurrentWork[0].workingSince}</b></p>
                        <p className="mb-0"><b>Salary :  {profile.candidatCurrentWork[0].salary} €</b></p>
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