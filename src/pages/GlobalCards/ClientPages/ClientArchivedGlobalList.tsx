import React, { useEffect ,useState} from "react";
import "../../../CSS/inProgressCard.css";
import { API_BASE_URL } from "../../../config/serverApiConfig";
import Loader from '../../../components/Loader/loader'
import { ColourOption } from "../../../Selecteddata/data";
import Select, {StylesConfig } from "react-select";
import SelectLoader from "../../../components/Loader/selectLoader"
import chroma from 'chroma-js';
import {ReactComponent as RatingStar} from "../../../images/RatingStar.svg"
import {ReactComponent as Empty} from "../../../images/emptyStar.svg"
import {ReactComponent as StarRating} from "../../../images/RatingStar.svg";
import Switch from "react-switch";
import  ProfileLoader from "../../../components/Loader/ProfilesLoader"
import {ReactComponent as TurnoFF} from "../../../images/FatX.svg";
import {ReactComponent as TurnOn} from "../../../images/base-switch_icon.svg";
import toast, { Toaster } from 'react-hot-toast';
import ArchivedClientModal from "../../../components/Modal/ArchivedClientModal";
import { useNavigate } from "react-router-dom";
import ReadMoreReact from 'read-more-react';
import CLintHide from "../../../components/Modal/HideClientProfile"
import ClientREST from "../../../components/Modal/ClientREStProfile"
import moment from "moment"
import { useLocation } from "react-router";


declare global {
  namespace JSX {
    interface IntrinsicElements {
      Item: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
declare global {
  namespace JSX {
    interface IntrinsicElements {
      lable: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
let SelectedName = []
let Importance=[]
let MotivationArr = []
let OthersFilterArr = []
 let FilterJob=[]
 let email=false;
 let phone=false;
export default function ClientArchived() {

  const {state}=useLocation() 

  const [sectors, setSectors] = useState([]);
  const [nameOptions, setNameOptions] = useState([])   
  const [sectorOptions, setSectorOptions] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState([]);
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [loader, setLoader] = useState(true);
  const [filterData, setFilterData] = useState(state)as any;
  const [status,setStatus]=useState(Boolean)
  const [jobOptions, setJobOptions] = useState([]);
  const [showMore, setShowMore] = useState(true)
  const [motivationOptions, setMotivationOptions] = useState([])
  const [optionsOthersFilter, setOtherOptions] = useState([])
  const [importanceOptions, setImportanceOptions] = useState([])as any


  const NotifySuccess =()=>toast.success("Filters Reset Successful!")
  const colourStyles: StylesConfig<ColourOption, true> = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
            ? data.color
            : isFocused
              ? color.alpha(0.1).css()
              : undefined,
        color: isDisabled
          ? '#ccc'
          : isSelected
            ? chroma.contrast(color, 'white') > 2
              ? 'white'
              : 'black'
            : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default',

        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ':hover': {
        backgroundColor: data.color,
        color: 'white',
      },
    }),
  };

  useEffect(() => {
    if (sectors.length == 0) {
      fetchAllSectors().then(data => {
        console.log(data.data);
        setSectors([...data.data]);
      })
        .catch(err => {
          console.log(err);
        })
    }
    let jobResults = jobs.map(ajob => {
      return { value: ajob.jobName, label: ajob.jobName, color: '#FF8B00' }
    })
    setJobOptions([...jobResults]);
    console.log(jobs);
  }, [jobs])
  useEffect(() => {
    console.log(sectors);
    let sectorops = sectors.map((asector) => {
      return { value: asector.sectorName, label: asector.sectorName, color: '#FF8B00' }
    })

    setSectorOptions([{value:"Select Un Secteur",label:"Select Un Secteur",color:'#FF8B00'},...sectorops]);
  }, [sectors])
 

  useEffect(() => {
    if (nameOptions.length === 0) {
      fetchProfiles().then((profilesResult) => {
        let nameops = profilesResult?.map((pro) => {
         return  { value: pro.clientCompanyName, label: pro.clientCompanyName, color: '#FF8B00'}
        })
        setNameOptions([{value:"Select Name",label :"Select Name" ,color:"#FF8B00"},...nameops])
      }).catch(err => {
        console.log(err)
      })
    }
    if(optionsOthersFilter.length == 0){
      setOtherOptions([
        {
          value: "Select Others",
          label: "Select Others",
          color: "#FF8B00",
        },
        {
          value: "offerSent",
          label: "Offre envoyé ?",
          color: "#FF8B00",
        },
        {
          value: "signatureSent",
          label: "Signature digitale envoyé ?",
          color: "#FF8B00",
        },
        {
          value: "contractSigned",
          label: "Client Signe ?",
          color: "#FF8B00",
        },
        {
          value: "publicityStarted",
          label: "Publicité commencé ?",
          color: "#FF8B00",
        },
        {
          value: "A1selected",
          label: "A1 ?",
          color: "#FF8B00",
        },
        {
          value: "assuranceFaite",
          label: "Assurance faite ?",
          color: "#FF8B00"
        },
        {
          value: "agenceDeVoyage",
          label: "Agence de voyage ok ?",
          color: "#FF8B00",
        },
        {
          value: "sispiDeclared",
          label: "SISPI déclaré ?",
          color: "#FF8B00",
        },
      ]);
    }
    if(importanceOptions.length == 0){
  setImportanceOptions([
    {
      value: "Select Importance", label:"Select Importance", color: '#FF8B00'
    },
    {
    value: "1", label: <><RatingStar style={{height:"25px",width:"25px",borderRadius:"30px"}} /> <Empty style={{height:"25px",width:"25px",borderRadius:"30px"}} /> <Empty style={{height:"25px",width:"25px",borderRadius:"30px"}} /> <Empty style={{height:"25px",width:"25px",borderRadius:"30px"}} /> <Empty style={{height:"25px",width:"25px",borderRadius:"30px"}} /></>, color: '#FF8B00'
  }, {
        value: "2", label:  <><RatingStar style={{height:"25px",width:"25px",borderRadius:"30px"}} /> <RatingStar style={{height:"25px",width:"25px",borderRadius:"30px"}} /> <Empty style={{height:"25px",width:"25px",borderRadius:"30px"}} /> <Empty style={{height:"25px",width:"25px",borderRadius:"30px"}} /> <Empty style={{height:"25px",width:"25px",borderRadius:"30px"}} /></>, color: '#FF8B00'
      }, {
        value: "3", label: <><RatingStar style={{height:"25px",width:"25px",borderRadius:"30px"}} /> <RatingStar style={{height:"25px",width:"25px",borderRadius:"30px"}} /> <RatingStar style={{height:"25px",width:"25px",borderRadius:"30px"}} /> <Empty style={{height:"25px",width:"25px",borderRadius:"30px"}} /> <Empty style={{height:"25px",width:"25px",borderRadius:"30px"}} /></>, color: '#FF8B00'
      }, {
        value: "4", label:  <><RatingStar style={{height:"25px",width:"25px",borderRadius:"30px"}} /> <RatingStar style={{height:"25px",width:"25px",borderRadius:"30px"}} /> <RatingStar style={{height:"25px",width:"25px",borderRadius:"30px"}} /> <RatingStar style={{height:"25px",width:"25px",borderRadius:"30px"}} /> <Empty style={{height:"25px",width:"25px",borderRadius:"30px"}} /></>, color: '#FF8B00'
      }, {
        value: "5", label:  <><RatingStar style={{height:"25px",width:"25px",borderRadius:"30px"}} /> <RatingStar style={{height:"25px",width:"25px",borderRadius:"30px"}} /> <RatingStar style={{height:"25px",width:"25px",borderRadius:"30px"}} /> <RatingStar style={{height:"25px",width:"25px",borderRadius:"30px"}} /> <RatingStar style={{height:"25px",width:"25px",borderRadius:"30px"}} /></>, color: '#FF8B00'
      }])
    }
    if(motivationOptions.length == 0){
      setMotivationOptions([    {
        value: "Select Motivations", label: "Select Motivations", color: '#FF8B00'
      },
      {
        value: "1", label: "😔", color: '#FF8B00'
      }, {
        value: "2", label: "🙁", color: '#FF8B00'
      }, {
        value: "3", label: "😊", color: '#FF8B00'
      }, {
        value: "4", label: "🥰", color: '#FF8B00'
      }, {
        value: "5", label: "😍", color: '#FF8B00'
      }])
          }

  },[nameOptions]);

  useEffect(() => {
    filterFunction();
  }, [selectedLanguages, selectedJob, selectedSector]);
 console.log(filterData,"data")
    const fetchProfiles = async () => {
      return await fetch(API_BASE_URL + "allArchivedClients", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((resD) => resD.json())
        .then((reD) =>  reD)
        .catch((err) => err);
    };
  const fetchAllSectors = async () => {
    return await fetch(API_BASE_URL + "fetchAllSectors", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((resp) => resp.json())
      .then((respData) => respData)
      .catch((err) => err);
  };

  useEffect(()=>{
    setSelectedJob(FilterJob)

  },[selectedJob])
  const fetchAllJobs = async (sector: string) => {
    if (sector === "Select Un Secteur") {
      // return {
      //   data: []
      // }
      setSelectedSector("")
      setSelectedJob([])
    }
    return await fetch(API_BASE_URL + `fetchAllJobs/?sector=${sector}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((resD) => resD.json())
      .then((reD) => reD)
      .catch((err) => err);
  };

  const HandleChecked=(e:any,job:any)=>{
    // FilterJob=[]
    if(!FilterJob.find((e) => e == job.jobName)){
      console.log("hello")
        FilterJob.push(job.jobName);
        setSelectedJob(FilterJob);
        filterFunction()
  }
    else {
      if(FilterJob.length===1){
        FilterJob=[]
      }
     FilterJob= FilterJob.filter((item)=>{return item !==job.jobName})
      setSelectedJob(FilterJob)
      filterFunction()

    } 
  }


  const handleNameChange = (e: any) => {
    // console.log(e.target.value)
    SelectedName = []
    Importance=[]
    MotivationArr = []
    OthersFilterArr = []
    setSelectedSector("")
    setSelectedJob([])
    email=false
    phone=false
    if (e.value === "Select Name") {
      SelectedName = []
      filterFunction()
    }
    else if (e.value !== "Select Name") {
      SelectedName = []
      MotivationArr = []
      let NameField = e.value;
      SelectedName.push(NameField)
    }
  };

  const handleSectorChange = (e: any) => {
    // console.log(e.target.value)
    email=false
    phone=false
    SelectedName = []
    MotivationArr = []
    OthersFilterArr = []
    FilterJob = [];
    setSelectedJob([])
    console.log(e)
    if (e.value === "Select Un Secteur") {
      setJobs([]);
      setSelectedSector("");
      setJobOptions([]);
      setLoader(true);

    } else if (e.value !== 'Select Un Secteur') {
      let sectorField = e.value;
      setSelectedSector(sectorField);
      setJobOptions([]);
    }

    fetchAllJobs(e.value)
      .then((data) => {
        // console.log(data);
        setJobs([...data.data]);
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  
  const getSelectedLanguage = (e: any) => {
    if (e.target.checked) {
      addLanguages(e.target.value);
    } else {
      removeLanguages(e.target.value);
      }
  };
  const addLanguages = (lang: string) => {
    setSelectedLanguages((prev) => [...prev, lang]);
  };

  const removeLanguages = (lang: string) => {
    setSelectedLanguages(selectedLanguages.filter((l) => l !== lang));
  };
  const filterFunction = async () => {
    setLoader(false);

//     if(selectedSector.length === 0 && selectedJob.length === 0 && selectedLanguages.length === 0 && SelectedName.length == 0 && MotivationArr.length == 0 && Importance.length == 0 ){
//       setLoader(true)
//       setStatus(true)
//       fetchProfiles().then((res)=>setFilterData([...res]))
//       .catch(err => {
//         console.log(err);
//       })
//     }
//     if (
//       MotivationArr.length > 0
//     ) {
//       fetch(
//         `${API_BASE_URL}filterClients/?clientMotivation=${MotivationArr}&jobStatus=Archived`,
//         {
//           method: "GET",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + localStorage.getItem("token"),
//           },
//         }
//       )
//         .then((reD) => reD.json())
//         .then(result => {
//           if(result.total == 0){
//             setLoader(true)
// setStatus(false)
//           }
//           else if(result.total > 0){
//             setFilterData([...result.data]);      
//             setLoader(true)
//             setStatus(true)
//           }
//       })
//         .catch((err) => err);
//       setLoader(true);
//     }
   
//     if (
//       selectedSector.length > 0 &&
//        FilterJob.length == 0 &&
//       selectedLanguages.length == 0
//     ) {
    
//         await fetch(
//           `${API_BASE_URL}filterClients/?clientActivitySector=${selectedSector}&jobStatus=Archived`,
//           {
//             method: "GET",
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json",
//               Authorization: "Bearer " + localStorage.getItem("token"),
//             },
//           }
//         )
//           .then((reD) => reD.json())
//           .then((result) => {
//             if(result.total == 0){
//               setLoader(true)
//   setStatus(false)
//             }
//             else if(result.total > 0){
//               setFilterData([...result.data]);      
//               setLoader(true)
//               setStatus(true)
//             }
          
//           })
//           .catch((err) => err);
//         setLoader(true);  

//     }
//     if (
//       selectedSector.length > 0 &&
//        FilterJob.length > 0 &&
//       selectedLanguages.length == 0
//     ) {
    
//         await fetch(
//           `${API_BASE_URL}filterClients/?clientJob=${FilterJob}&jobStatus=Archived`,
//           {
//             method: "GET",
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json",
//               Authorization: "Bearer " + localStorage.getItem("token"),
//             },
//           }
//         )
//           .then((reD) => reD.json())
//           .then((result) => {
//           if(result.total == 0){
//             setLoader(true)
// setStatus(false)
//           }
//           else if(result.total > 0){
//             setFilterData([...result.data]);      
//             setLoader(true)
//             setStatus(true)
//           }
          
//           })
//           .catch((err) => err);
//         setLoader(true);  

//     }

//     if (
//      SelectedName.length > 0
//     ) {
//       await fetch(
//         `${API_BASE_URL}filterClients/?clientCompanyName=${SelectedName}&jobStatus=Archived`,
//         {
//           method: "GET",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + localStorage.getItem("token"),
//           },
//         }
//       )
//         .then((reD) => reD.json())
//         .then((result) => {
//           if(result.total == 0){
//             setLoader(true)
// setStatus(false)
//           }
//           else if(result.total > 0){
//             setFilterData([...result.data]);      
//             setLoader(true)
//             setStatus(true)
//           }
        
//         })
//         .catch((err) => err);
      
//     }
//     if (
//         Importance.length > 0
//      ) {
//        await fetch(
//          `${API_BASE_URL}filterClients/?clientImportance=${Importance}&jobStatus=Archived`,
//          {
//            method: "GET",
//            headers: {
//              Accept: "application/json",
//              "Content-Type": "application/json",
//              Authorization: "Bearer " + localStorage.getItem("token"),
//            },
//          }
//        )
//          .then((reD) => reD.json())
//          .then((result) => {
//            if(result.total == 0){
//              setLoader(true)
//  setStatus(false)
//            }
//            else if(result.total > 0){
//              setFilterData([...result.data]);      
//              setLoader(true)
//              setStatus(true)
//            }
         
//          })
//          .catch((err) => err);
       
//      }
//      if(email === true){
//       await fetch(
//         `${API_BASE_URL}filterClientsByMissingEmailOrPhone/?field=email&status=Archived`,
//         {
//           method: "GET",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + localStorage.getItem("token"),
//           },
//         }
//       )
//         .then((reD) => reD.json())
//         .then((result) => {
//           if (result.status == false) {
//             setLoader(true);
//             setStatus(false);
//           } else if (result.status == true) {
//             setFilterData([...result.data]);
//             setLoader(true);
//             setStatus(true);
//           }
//         })
//         .catch((err) => err);
//     }
//     if(phone === true){
//       await fetch(
//         `${API_BASE_URL}filterClientsByMissingEmailOrPhone/?field=phone&status=Archived`,
//         {
//           method: "GET",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + localStorage.getItem("token"),
//           },
//         }
//       )
//         .then((reD) => reD.json())
//         .then((result) => {
//           if (result.status == false) {
//             setLoader(true);
//             setStatus(false);
//           } else if (result.status == true) {
//             setFilterData([...result.data]);
//             setLoader(true);
//             setStatus(true);
//           }
//         })
//         .catch((err) => err);
//     }
//     if(OthersFilterArr.length > 0){
//       await fetch(
//         `${API_BASE_URL}filterClientsByAttributes/?filters=${OthersFilterArr.toString()}&status=Archived`,
//         {
//           method: "GET",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + localStorage.getItem("token"),
//           },
//         }
//       )
//         .then((reD) => reD.json())
//         .then((result) => {
//           if (result.status == false) {
//             setLoader(true);
//             setStatus(false);
//           } else if (result.status == true) {
//             setFilterData([...result.data]);
//             setLoader(true);
//             setStatus(true);
//           }
//         })
//         .catch((err) => err);
//     }
  };
  const handleMotivationChange = (e: any) => {
    // console.log(e.target.value)
    MotivationArr = []
    email=false
    phone=false
    Importance=[]
    OthersFilterArr = []
    setSelectedSector("")
    SelectedName = []
    if (e.value === "Select Motivation") {
      MotivationArr = []
      filterFunction()
      setLoader(true);

    } else if (e.value !== "Select Motivation") {
      MotivationArr = []
      let MField = e.value;

      console.log(MField, "motivation")
      MotivationArr.push(MField)
      filterFunction()
      // setSelectedSector(sectorField);
    }
  };
  const importanceHandel=(e)=>{
    SelectedName = []
    email=false
    phone=false
    setSelectedSector("")
    OthersFilterArr=[]
    MotivationArr = []
    FilterJob=[]
    Importance=[]
    if(e.value=="Select Importance"){
      Importance=[]
    }
    else if(e.value!= "Select Importance"){
      Importance.push(e.value)
      filterFunction();
    }
     
   }
  
   const HandelOthers = (e) => {
    SelectedName = []
    email=false
    phone=false
    setSelectedSector("")
    Importance=[]
    MotivationArr = []
    FilterJob=[]
    console.log(e.value)
    e.map((el)=>{
      OthersFilterArr.push(el.value)
    })
    filterFunction()
  }
  const MissingHandler = (checked, e, id) => {
    console.log(id, "id");
    if (id == "EmailMissing") {
      if (checked == true) {
       email=true
        filterFunction()
      }
      if (checked == false) {
       email=false
        filterFunction()
      }
    }
    if (id == "PhoneNumberMissing") {
      if (checked == true) {
       phone=true
        filterFunction()
        console.log(phone, "Phone");
      }
      if (checked == false) {
       phone=false
        filterFunction()
        console.log(phone, "hone");
      }
    }
  };
  const jobChange = async (jobval) => {
    // console.log(jobval)
    let JobArr=[]
    jobval.map((el)=>{
     
     JobArr.push(el.value)
  
    })
    FilterJob=JobArr
    filterFunction()
  }

  const RestFilters=()=>{
    setNameOptions([])
    SelectedName = []
    setMotivationOptions([])
    setOtherOptions([])
    setSelectedSector("")
    setJobs([])
    FilterJob = [];
    MotivationArr = []
    OthersFilterArr = []
    Importance=[]
    setImportanceOptions([])
    setImportanceOptions([])
    setSectorOptions([])
    setSectors([])
    setSelectedJob([])
    email=false
    phone=false
    fetchAllSectors()
    NotifySuccess()
    setTimeout(()=>{
      filterFunction()
    },1000)
  
   }







   const navigate = useNavigate();
   const [showArchiveModal, setShowArchiveModal] = useState(false)
   const [HideProfile,setHideProfile]=useState(false)
   const [RESTprofile,setREStProfile]=useState(false)
   const CardOption=[{
       value:"Edit Profile",label:"Edit Profile"
       },
      {value:"Reset Profile",label:"Reset Profile"}
       ,{value:"Hide This Profile",label:"Hide This Profile"}
    ]as any
    const editClientProfile = () => {
       navigate("/clientInProgressEdit", { state: filterData});
   }
   const viewFullProfile = () => {
       console.log(filterData)
       navigate("/archivedClientSeeprofile", { state: filterData});
   }

    const MoreOption=(e:any)=>{
       if(e.value=="Edit Profile"){
         editClientProfile()
       }
       if(e.value=="Reset Profile"){
           setREStProfile(true)
       }
       if(e.value=="Hide This Profile"){
           setHideProfile(true)
       }
       if(e.value=="Archive"){
         setShowArchiveModal(true) 
       }
     console.log(e.value)
     }


const candidatImportanceIcons = [{ icon:<><StarRating  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /></>}, {icon:<><StarRating  style={{marginRight:"3px",width:"70%"}} /><StarRating  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /></>}, {icon:<><StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /></>}, {icon:<><StarRating   style={{marginRight:"3px",width:"70%"}} /> <StarRating style={{marginRight:"3px",width:"70%"}}/> <StarRating style={{marginRight:"3px",width:"70%"}} /> <StarRating style={{marginRight:"3px",width:"70%"}} /> <Empty style={{marginRight:"3px",width:"70%"}} /></>}, {icon:<><StarRating  style={{marginRight:"3px",width:"70%"}} /><StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /></>}]; 
const candidatMotivationIcons = [{ icon:"No Icon", motivation: 'No Motivation' },{ icon:"😟", motivation: 'Disappointed' }, { icon:"🙁", motivation: 'Not Really' }, { icon:"😊", motivation: 'Like' }, { icon:"🥰", motivation: 'Great' }, { icon:"😍", motivation: 'Super Lovely' }];
 
 
const datenow=moment().format('YYYY-MM-DD')
   
let date = new Date(datenow);

let start = new Date(filterData.jobStartDate);
let end = new Date(filterData.jobEndDate);




  return (
    <>
      <Toaster position="top-right"  containerStyle={{zIndex:"999999999999999999999"}}/>
         <div className="container-fluid" style={{marginTop:"70px"}}>
        <div className="row ">
          <div className="col-12 p-1 text-center topHeaderClient mt-2">
          <div className="d-flex topinPHeading"> <h2 className="">clients / lead  </h2> <span className="topArchivedtext">Archived</span></div>

            <p className="Inchild-text mb-0">
            Ici vous avez la liste des sociétés qui font une sur lesquelles nous avons<span className="fw-bolder" style={{marginLeft:"5px"}}>annulé la recherhce et donc archivé
            </span>
            </p>
          </div>
          <div className="col-12 bg-white p-2 rounded001 mt-1 mb-3">
            <div className="row ">
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                <p className="FiltreName">Filtre by name</p>
                <div className="dropdown">
                  <div aria-labelledby="dropdownMenuButton1">
                    {
                      nameOptions.length > 0 ?
                        <Select
                          name="candidatName"
                          closeMenuOnSelect={true}
                          placeholder="‎ ‎ ‎ Select Un Client"
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={handleNameChange}
                          options={nameOptions}
                          styles={colourStyles}
                        /> :
                        <div className="">   <ProfileLoader  width={"64px"} height={"45px"} fontSize={"12px"} fontWeight={600} Title={""}/></div>
                                            }
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                <p className="FiltreName">Filtre Secteur d’activité</p>
                <div className="dropdown">
                  <div aria-labelledby="dropdownMenuButton1">
                    {sectorOptions.length > 0 ?
                      <Select
                        name="candidatActivitySector"
                        closeMenuOnSelect={true}
                        placeholder="‎ ‎ ‎ Select Un Secteur"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleSectorChange}
                        options={sectorOptions}
                        styles={colourStyles}
                      /> : <p>Select Un Secteur!</p>
                    }
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 px-120">
                <p className="FiltreName">Filtre selection métier / job</p>
                <div>
                  {jobOptions.length > 0 ?
                    <Select
                      name="jobName"
                      closeMenuOnSelect={true}
                      isMulti
                      placeholder="‎ ‎ ‎ Select"
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={jobChange}
                      options={jobOptions}
                      styles={colourStyles}
                    /> : <p>Select A Sector!</p>
                  }
                </div>
              </div>
              {
                showMore ?
                  <>
                    <div className="col-12 ">
                      <div className="row">
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 pt-1">
                          <p className="FiltreName">Filtre by Motivation</p>
                          <div className="dropdown">
                            <div aria-labelledby="dropdownMenuButton1">
                            {
                              motivationOptions.length > 0 ?
                              <Select
                              name="candidatMotivation"
                              closeMenuOnSelect={true}
                              placeholder="‎ ‎ ‎ Select Motivation du Client"
                              className="basic-multi-select"
                              classNamePrefix="select"
                              onChange={handleMotivationChange}
                              options={motivationOptions}
                              styles={colourStyles}
                            />
                            :
                        <div className="">   <ProfileLoader  width={"64px"} height={"45px"} fontSize={"12px"} fontWeight={600} Title={""}/></div>

                            }
                         
                            </div>
                          </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 pt-1">
        <p className="FiltreName">Filtre by Importance</p>
        <div className="dropdown">
                            <div aria-labelledby="dropdownMenuButton1">
                           {
                            importanceOptions.length > 0 ?
                            <Select
                            name="candidatLicencePermis"
                            closeMenuOnSelect={true}
                            placeholder="‎ ‎ ‎ Select Licence Permis"
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={importanceHandel}
                            options={importanceOptions}
                            styles={colourStyles}
                          />
                          :
                        <div className="">   <ProfileLoader  width={"64px"} height={"45px"} fontSize={"12px"} fontWeight={600} Title={""}/></div>

                           }
                           
                            </div>
                          </div>
        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 pt-1">
                          <p className="FiltreName">Filter by other options</p>
                          <div className="dropdown">
                            <div aria-labelledby="dropdownMenuButton1">
                            {
                              optionsOthersFilter.length > 0 ?
                              <Select
                              name="candidatLicencePermis"
                              closeMenuOnSelect={true}
                              isMulti={true}
                              placeholder="‎ ‎ ‎ Select Licence Permis"
                              className="basic-multi-select"
                              classNamePrefix="select"
                              onChange={HandelOthers}
                              options={optionsOthersFilter}
                              styles={colourStyles}
                            />
                            :
                        <div className="">   <ProfileLoader  width={"64px"} height={"45px"} fontSize={"12px"} fontWeight={600} Title={""}/></div>
                            }
                      
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                    <div className="extraPadding">
                      <div className="col-12">
                        <div className="row justify-content-end">
                        <div className="col-12 mt-1">
                          <div className="row">
                            <div className="col-4 d-flex  align-items-center">
                             <p className="missing mb-0">Phone number missing</p>
                             <Switch onChange={MissingHandler} id="PhoneNumberMissing"  checked={phone}
                         checkedHandleIcon={<TurnOn style={{position:"absolute",width:"35px",height:"28px",top:"-3px",left:"-7px"}} />} height={24} width={52} uncheckedHandleIcon={<TurnoFF style={{position:"absolute",width:"35px",height:"28px",top:"-3px",left:"-6px"}} />} 
                             />
                              </div>
                              <div className="col-4 d-flex  align-items-center">
                             <p className="missing mb-0">Email missing</p>
                             <Switch onChange={MissingHandler} id="EmailMissing" checked={email}
                         checkedHandleIcon={<TurnOn style={{position:"absolute",width:"35px",height:"28px",top:"-3px",left:"-7px"}} />} height={24} width={52} uncheckedHandleIcon={<TurnoFF style={{position:"absolute",width:"35px",height:"28px",top:"-3px",left:"-6px"}} />} 
                            />
                              
                              </div>
                            </div>
                          </div>
                         
                      {selectedSector.length > 0 || selectedJob.length > 0 || selectedLanguages.length > 0 || SelectedName.length > 0 || MotivationArr.length > 0 || SelectedName.length > 0 || Importance.length > 0 || OthersFilterArr.length > 0 || email==true ||
    phone==true ?
 <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-4  d-flex align-items-center justify-content-end">
<p className="filterStyling  cursor-pointer mt-2" onClick={() => RestFilters()}>Reset Filters</p>
</div>
: null

}   
                          <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-4  d-flex justify-content-end">
                            <p className="filterStyling pt-2 cursor-pointer" onClick={() => setShowMore(false)}>Less Filters <img src={require("../../../images/downup.svg").default} /></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>

                  :
                  <div className="extraPadding">
                    <div className="col-12">
                      <div className="row justify-content-end">
                      {selectedSector.length > 0 || selectedJob.length > 0 || selectedLanguages.length > 0 || SelectedName.length > 0 || MotivationArr.length > 0 || SelectedName.length > 0 || Importance.length > 0 || OthersFilterArr.length > 0  || email == true || phone == true ? 
                      <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-4 d-flex align-items-center justify-content-end">
<p className="filterStyling  cursor-pointer mt-2" onClick={() => RestFilters()}>Reset Filters</p>
</div>
: null
}  
                        <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-4 d-flex justify-content-end">
                          <p className="filterStyling pt-2 cursor-pointer" onClick={() => setShowMore(true)}>More Filters <img src={require("../../../images/down.svg").default} /></p>
                        </div>
                      </div>
                    </div></div>
              }
            </div>
          </div>
          <>
       
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12  pd-left">
                        <div className="card cardInPro p-0">
                <div className="d-flex cursor-pointer" onClick={viewFullProfile}>
                    <div className="col-3 px-0 d-flex justify-content-center">
                        <img
                            src={require("../../../images/ClientCardPhoto.svg").default}
                            className="card-img-top widthIMG"
                            alt="..."
                        />
                    </div>
                    <div className="col-5 px-0 mt-1">
                    <p className="textClientCard" style={{width:"150%"}} data-bs-toggle="tooltip" data-bs-placement="bottom" title={filterData.clientCompanyName.toLocaleUpperCase()}><b>{filterData.clientCompanyName ? filterData.clientCompanyName.length > 20 ? filterData.clientCompanyName.toLocaleUpperCase().slice(0,29)+ "..." : filterData.clientCompanyName.toLocaleUpperCase(): "No CompanyName!"}</b></p>
                    <div >  <p  className="textClientCard" style={{height:"30px", background:"transparent"}}>Importance:
                             <b className="d-flex" style={{width:"37%",marginLeft:"3px",height:"43px"}}>{candidatImportanceIcons[filterData.clientImportance - 1]?.icon ? candidatImportanceIcons[filterData.clientImportance - 1]?.icon : "No Importance" }</b>

                        </p>
                        </div>
                        <div >  <p  className="textClientCard" style={{width:"130%"}}>Motivation :
                             <b style={{background:"transparent" , zIndex:"9"}}>{candidatMotivationIcons[filterData.clientMotivation].icon + " " + candidatMotivationIcons[filterData.clientMotivation]?.motivation}</b>
                        </p>
                        </div>
                        <div ><p  className="textClientCard">Num of position : <b>  {filterData.numberOfPosts ? filterData.numberOfPosts : "No Posts!"}</b> </p></div>
                 

                    </div>
                    <div className="col-3 d-flex align-items-center">
                    <button className="ArchiveLargebtn pb-1 p-0"><img src={require("../../../images/ArchivedBtn.svg").default} /></button>
                    </div>
                
                </div>
                <div className="col-12 d-flex align-items-center colorARecruting my-1 ">
                <p className="A-Recruting mb-0 " style={{ color: date >= start && date <= end  ? "#E21B1B" : "#ca1313"}}>Recruiting  :    {date >= start && date < end  ? "From  " + filterData.jobStartDate  + "  To  " + filterData.jobEndDate :   "⚠️ From  " + filterData.jobStartDate +"  To  " + filterData.jobEndDate}</p>
                </div>
                <div className="col-12 ">
    <div className="row pl-1">
                <div className="col-5 fontStylingCardDetails px-0 py-1">
                <p className="fontStylingCardP">Secteur : {filterData.clientActivitySector ? filterData.clientActivitySector.length > 20 ? filterData.clientActivitySector.toLocaleUpperCase().slice(0, 15) + "..." :filterData.clientActivitySector.toLocaleUpperCase() : "No Sector!"} </p>
                    <p className="fontStylingCardP">Job :  {filterData.clientJob ? filterData.clientJob.length > 20 ?  filterData.clientJob.toLocaleUpperCase().slice(0,15) + "..." : filterData.clientJob.toLocaleUpperCase() : "No Job!"}</p>
                    <p>Langues : <b> {filterData.clientLanguages.length ? filterData.clientLanguages : "No Langues!"}</b> </p>
                    <p>Phone :<b>{filterData.clientPhone.length ? filterData.clientPhone : "No Phone Number!"}</b> </p>
                    <p>Estimated CA :   <b>{filterData.jobTotalBudget ? filterData.jobTotalBudget + " €" : "N/A"}</b> </p>                

                </div>
                <div className="col-7 pl-1 fontStylingCardDetails px-0 pt-1">
                <p>Salary by person : <b>  {filterData.netSalary || filterData.salary_hours ? filterData.netSalary + "€" || filterData.salary_hours.salaryPerHour * filterData.salary_hours.hours  + " €" : "N/A"}</b> </p>
                    <p>Cl-Phone : <b>{filterData.clientPhone.length? filterData.clientPhone : "No Client Number!"}</b> </p>
                    <p>C-Name :  <b>{filterData.clientReferenceName ? filterData.clientReferenceName : "No Name!"}</b> </p>
                    <p>C-phone :   <b>{filterData.clientReferenceNumber.length? filterData.clientReferenceNumber: "No Contact Number!"}</b> </p>
                </div>
                </div>
                </div>
                <div className="">
            <div className="colorARecruting p-1">
                    <p className="AdsFont">Ads Spent on this client: {filterData.jobTotalBudget}€  </p>
                    <p className="AdsFont">Reason archived :<ReadMoreReact text={filterData.clientArchived.reason ? filterData.clientArchived.reason : "No Reason!"}
            min={0}
            ideal={50}
            max={120}
            readMoreText={"....."}/> 
                         </p>
                    </div>
                    <div className="col-12 d-flex justify-content-end my-1">
                    <div className="row ">
                    <div className="col-6 text-center">

                    <Select
                          options={CardOption}
                          className="CardOptions AllMoreOp"
                          onChange={MoreOption}
                          placeholder="More options"
                        />
                    </div>

          
                        <div className="col-6 text-center">
                            <button className="btn btn-card" onClick={viewFullProfile}>
                                See Full Profile
                            </button>
                        </div>
                        </div> 
                        </div>
      {
        HideProfile ?
<CLintHide  props={filterData} closeModal={setHideProfile} path={"/clientToDo"} />
        :
        null
      }
      {
        RESTprofile ?
        <ClientREST props={filterData} closeModal={setREStProfile} path={"/clientToDo"}  />
        :
        null
      }
                        {showArchiveModal ?
                            <ArchivedClientModal props={filterData} closeModal={setShowArchiveModal} path={"/clientToDo"} /> : null
                        }
            </div></div>
                        </div>
                     
                 
            </>
        </div>
      </div>
    </>
  );
}

