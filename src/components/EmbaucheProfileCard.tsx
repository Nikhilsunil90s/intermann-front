import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
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
    const [startStatus]=useState(props.props.candidatStartDate !== undefined ? props.props.candidatStartDate.slice(0,4).includes("-") : null)
    const [endStatus]=useState(props.props.candidatEndDate !== undefined ?props.props.candidatEndDate.slice(0,4).includes("-") : null)
    const [startDate,setStartDate]=useState()as any
    const [EndDate,setEndDate]=useState()as any
  
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

    function padTo2DigitsCH(num) {
        return num.toString().padStart(2, "0");
      }
    
      // console.log(props.props.jobStartDate.slice(0,4).includes("-"))
    
      function formatDateCha(date) {
        return [
          padTo2DigitsCH(date.getDate()),
          padTo2DigitsCH(date.getMonth() + 1),
          date.getFullYear(),
        ].join("/");
      }
      const datenow = moment().format("YYYY-MM-DD");
    
      let date = new Date(datenow);
    
      let start = new Date(props.props.candidatStartDate);
      let end = new Date(props.props.candidatEndDate);
    
      useEffect(()=>{
        if(startStatus){
          setStartDate(props.props.candidatStartDate)
        }else{
          let data=formatDateCha(start)
          setStartDate(data.replaceAll("/","-"))
          
      
        }
        if(endStatus){
          setEndDate(props.props.candidatEndDate)
        }else{
          let data=formatDateCha(end)
          setEndDate(data.replaceAll("/","-"))
          
      
        }
       })

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
                    <div className="text-dark EmbauchCard mb-0">{profile.candidatAge !=="" ?  <p className="age00 ml-0 mb-0"> <b  style={{marginLeft:"10px"}}>Age :  {profile.candidatAge}</b></p> : <p className="mb-0 age00"><b className="notAvailable">✘ Age Not Available!</b></p>}</div>
                        <div >  <p className="text-dark d-flex"> <b>{profile.candidatMotivation !== undefined ? candidatMotivationIcons[profile.candidatMotivation ].icon + " " + candidatMotivationIcons[profile.candidatMotivation ].motivation : "✘No Motivation!"}</b> 
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
                    <p style={{width:"100%"}}  className="text-dark mb-0"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={profile.candidatName.toLocaleUpperCase()}><b className="TopTodoTitle">{profile.candidatName.length > 20 ? profile.candidatName.slice(0, 21).toLocaleUpperCase() + "..." : profile.candidatName.toLocaleUpperCase()}</b></p>
                    <div className="text-dark mb-0">{profile.candidatAge ?  <p className=" ml-0 mb-0"> <b className="TopTodoTitle" style={{marginLeft:"10px "}}>Age :  {profile.candidatAge}</b></p> : <p className=" mb-0"> <b className="TopTodoTitle" >Age : ✘!</b></p>}</div>
                    <div >  <p className="text-dark d-flex mb-0"> <b>{profile.candidatMotivation ?profile.candidatMotivation  == 0 ? candidatMotivationIcons[profile.candidatMotivation].icon +" "+ candidatMotivationIcons[profile.candidatMotivation].motivation :  candidatMotivationIcons[profile.candidatMotivation].icon +" "+ candidatMotivationIcons[profile.candidatMotivation].motivation : "✘No Motivation!"}</b>
       </p>
       </div>
                
                        </div>
                        </>
                  }
                
               </div>
                <div className="col-12 ">
                        <div className="row cardColorRowEmbaunch" style={{height:"49px"}}>

                      
                        <div className="col-8 d-flex align-items-center">
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
                        Ready for work : {profile.candidatStartDate !== undefined  ? date >= start && date <= end  ?" 📆" + startDate  + "  To  " + EndDate :   "⚠️" + startDate+"  To  " + EndDate : "✘No Dates! "} 
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
                        <p className="mb-0 workAt">Works At : {profile.candidatCurrentWork[0].workingFor ? profile.candidatCurrentWork[0].workingFor.length > 20 ? profile.candidatCurrentWork[0].workingFor.slice(0, 25).toLocaleUpperCase() + "...." : profile.candidatCurrentWork[0].workingFor.toLocaleUpperCase() : "✘ No Working"}</p>
                        <p className="mb-0 workAt">Since : {profile.candidatCurrentWork[0].workingSince ?profile.candidatCurrentWork[0].workingSince : "✘ No Since"}</p>
                        <p className="mb-0 workAt" >Salary :  {profile.candidatCurrentWork[0].salary ? profile.candidatCurrentWork[0].salary + "€": "✘ No Salary!"}</p>
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