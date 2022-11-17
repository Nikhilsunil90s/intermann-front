import React,{useState,useEffect} from 'react';
import { Link } from "react-router-dom";
import "../CSS/Canceled.css";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'
import HideProfile from "../components/Modal/HideProfileModalForArchived";
import ResetProfile from "../components/Modal/RestProfileForArchived";
import moment from 'moment';

const ArchivedProfileCard = (props: any) => {
    const navigate = useNavigate();
    const [hideProfile,setHideProfile]=useState(false)
    const [ResetModalProfile,setResetModalProfile]=useState(false)
    const [candidatMotivationIcons,setMotivation] = useState([{ icon: "", motivation: 'No Motivation!' },{ icon: "😟", motivation: 'Disappointed' }, { icon: "🙁", motivation: 'Not Really' }, { icon: "😊", motivation: 'Like' }, { icon: "🥰", motivation: 'Great' }, { icon: "😍", motivation: 'Super Lovely' }]);
    const [startStatus]=useState(props.props.candidatStartDate !== undefined ? props.props.candidatStartDate.slice(0,4).includes("-") : null)
    const [endStatus]=useState(props.props.candidatEndDate !== undefined ?props.props.candidatEndDate.slice(0,4).includes("-") : null)
   const [startDate,setStartDate]=useState()as any
    const [EndDate,setEndDate]=useState()as any

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
            <div className="card card-color mt-1 mb-0 HoveRESTClassCardA">
                <div className="card-upper cursor-pointer" onClick={()=>viewFullProfile()}>
                    <div className="col-4">
                    {
                           props.props.candidatPhoto && props.props.candidatPhoto?.url !== undefined ?
                        <img
                            src={props.props.candidatPhoto?.url}
                            className="card-img-top-Progress"
                            alt="..."
                            style={{border:"3px solid #E21B1B",margin:"10px 0px 8px 0px"}}
                        />
                        :
                        <img
                        src={require("../images/card-men.svg").default}
                        className="card-img-top"
                        alt="..."
                    />
                    }
                    </div>
                    <div className="col-7 ArchivedCard pt-1 px-1" >
                    <p style={{width:"100%"}} className="text-dark mb-0" data-bs-toggle="tooltip" data-bs-placement="bottom" title={props.props.candidatName.toLocaleUpperCase()}><b>{props.props.candidatName.length > 15 ? props.props.candidatName.slice(0, 16).toLocaleUpperCase() + "..." : props.props.candidatName.toLocaleUpperCase()}</b></p>
                    <div className="text-dark mb-0">{props.props.candidatAge ?  <p className="age00 ml-0 mb-0"><b>Age :  {props.props.candidatAge}</b></p> : <b>✘ Age Not Available!</b>}</div>
                        <div >  <p className="text-dark d-flex"> <b>{props.props.candidatMotivation ?props.props.candidatMotivation == 0 ? candidatMotivationIcons[props.props.candidatMotivation ].icon +" "+ candidatMotivationIcons[props.props.candidatMotivation].motivation :  candidatMotivationIcons[props.props.candidatMotivation].icon +" "+ candidatMotivationIcons[props.props.candidatMotivation].motivation : "✘No Motivation!"}</b>
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
                                            <input type="checkbox" name="candidatLicensePermis" id="css" defaultChecked={props.props.candidatLicensePermis} />
                                            <label htmlFor="css" className="Licence mb-0">Have Licence</label>
                                        </div> :
                                       <div className="d-flex  justify-content-center align-items-center">
                                       <input type="checkbox" name="candidatLicensePermis" id="css" defaultChecked={props.props.candidatLicensePermis} />
                                       <label htmlFor="css" className="NoLicence mb-0">No Licence</label>
                                   </div>
                                }
                        </div>
                    </div>
                    </div>
                <div className="card-todoBody pl-0">
                <div className="px-0  mb-1 " style={{marginLeft:"6px"}}>
                    {/* <p>Name:  <b>{props.props.candidatName}</b> </p> */}
                    {/* <p>Age: <b>{props.props.candidatAge}</b></p> */}
                    <p className='ArchivedCardChildFonts mb-0'>Secteur: <b> {props.props.candidatActivitySector ?  props.props.candidatActivitySector.toLocaleUpperCase() : "✘ No Sector!"}</b></p>
                    <p className='ArchivedCardChildFonts mb-0'>Job: <b> {props.props.candidatJob ? props.props.candidatJob.toLocaleUpperCase() : "✘ No Job!"}</b></p>
                    <p className='ArchivedCardChildFonts mb-0'>Candidats age: <b>{props.props.candidatAge ? props.props.candidatAge +"years old" : "✘ Age Not Available!"}</b></p>
                    <p className='ArchivedCardChildFonts mb-0'>Langues:  <b>  {props.props.candidatLanguages.length ? props.props.candidatLanguages.length > 3 ? props.props.candidatLanguages.slice(0,3).join(", ") + "..." : props.props.candidatLanguages.join(", "): "✘ No Langues Selected!"} </b></p>
                    <p className='ArchivedCardChildFonts mb-0'>Phone Number:  <b>{props.props.candidatPhone ? props.props.candidatPhone : "✘ No Phone!"}</b></p>
                    <p className='ArchivedCardChildFonts mb-0'>Facebook URL:  <b>{props.props.candidatFBURL ? <a href={props.props.candidatFBURL} target="_blank" className="fbURL">View Facebook Profile.</a> : "✘ No Facebook Profile!"}</b></p>
                    <p className='ArchivedCardChildFonts mb-0'>Email: <b>{props.props.candidatEmail ? props.props.candidatEmail.length > 20 ? props.props.candidatEmail.slice(0, 22).toLocaleUpperCase() + "..." : props.props.candidatEmail.toLocaleUpperCase() : "✘ No Email Provided!"}</b> </p>
                    <p className="todoCardbodyBlue py-1" style={{ color: date >= start && date <= end  ? "#3F76E2" : "#ca1313"}}>
                        Ready for work : {props.props.candidatStartDate  !== undefined ?  date >= start && date <= end  ? " 📆" +startDate  + "  To  " + EndDate :   "⚠️" + startDate +"  To  " + EndDate : "✘No Dates!"} 
                    </p>
                
                    </div>
                    <div className="box-red pl-1">
                        <p> <b>REASON WHY CANCELED</b> : </p><span> {props.props.candidatArchived?.reason ? props.props.candidatArchived?.reason : "✘ No Reason Specified!"}</span>

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
