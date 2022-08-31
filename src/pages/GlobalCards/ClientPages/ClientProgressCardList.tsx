import React, { useEffect, useState } from "react";
import "../../../CSS/inProgressCard.css";
import { API_BASE_URL } from "../../../config/serverApiConfig";
import toast, { Toaster } from 'react-hot-toast';
import { ColourOption } from "../../../Selecteddata/data";
import Select, {StylesConfig } from "react-select";
import chroma from 'chroma-js';
import {ReactComponent as RatingStar} from "../../../images/RatingStar.svg"
import {ReactComponent as Empty} from "../../../images/emptyStar.svg"
import Switch from "react-switch";
import  ProfileLoader from "../../../components/Loader/ProfilesLoader"
import {ReactComponent as TurnoFF} from "../../../images/FatX.svg";
import {ReactComponent as TurnOn} from "../../../images/base-switch_icon.svg";
import {useLocation,useNavigate} from 'react-router-dom'
import {ReactComponent as StarRating} from "../../../images/RatingStar.svg";
import SignedClientModal from "../../../components/Modal/SignContractModal";
import ArchivedClientModal from "../../../components/Modal/ArchivedClientModal";
import moment from 'moment';


declare namespace JSX {
  interface IntrinsicElements {
    "lottie-player": any;
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
 let id=""
 function ClientProgressCardList() {
  const {state} = useLocation()
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

useEffect(()=>{
  setFilterData(state)
},[state])
  
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
    if (sectors.length == 0) {
      fetchAllSectors()
        .then((data) => {
          // console.log(data.data);
          setSectors([...data.data]);
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  }, [jobs]);
  useEffect(() => {
    if (nameOptions.length == 0) {
      fetchProfiles().then((profilesResult) => {
        let nameops = profilesResult.map((pro) => {
          return { value: pro.clientCompanyName, label: pro.clientCompanyName, color: '#FF8B00' }
        })
        console.log(nameops,"console")
        setNameOptions([{value:"Select Name",label :"Select Name" ,color:"#FF8B00"},...nameops])
      }).catch(err => {
        console.log(err)
      })
    }
    if(optionsOthersFilter.length == 0){
      setOtherOptions([{
        value: "Select Others", label: "Select Others", color: '#FF8B00'
      },
      {
        value: "offerSent", label: "Offre envoyé ?", color: '#FF8B00'
      },
      {
        value: "signatureSent", label: "Signature digitale envoyé ?", color: '#FF8B00'
      },
      {
        value: "contractSigned", label: "Client Signe ?", color: '#FF8B00'
      },
      {
        value: "publicityStarted", label: "Publicité commencé ?", color: '#FF8B00'
      },
      {
        value: "A1selected", label: "A1 ?", color: '#FF8B00'
      },
      {
        value: "assuranceFaite", label: "Assurance faite ?", color: '#FF8B00'
      },
      {
        value: "agenceDeVoyage", label: "Agence de voyage ok ?", color: '#FF8B00'
      },
      {
        value: "sispiDeclared", label: "SISPI déclaré ?", color: '#FF8B00'
      }])
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

  });
 
  console.log(status,"status")
  useEffect(() => {
    filterFunction();
  }, [selectedLanguages, selectedJob, selectedSector]);

  const fetchProfiles = async () => {
    return await fetch(API_BASE_URL + "allInProgressClients", {
      method: "GET",
      headers: {
        "Accept": 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    })
      .then((resD) => resD.json())
      .then((reD) => reD)
      .catch(err => err)
  }

  const fetchAllSectors = async () => {
    return await fetch(API_BASE_URL + "fetchAllSectors", {
      method: "GET",
      headers: {
        "Accept": 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    })
      .then(resp => resp.json())
      .then(respData => respData)
      .catch(err => err)
  }

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
        "Accept": 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    }).then(resD => resD.json())
      .then(reD => reD)
      .catch(err => err)
  }
  const handleNameChange = (e: any) => {
    // console.log(e.target.value)
    email=false;
    phone=false
    SelectedName = []
    Importance=[]
    MotivationArr = []
    OthersFilterArr = []
    setSelectedSector("")
    setSelectedJob([])
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
    email=false;
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
  useEffect(()=>{
    setSelectedJob(FilterJob)

  },[selectedJob])

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
  const getSelectedLanguage = (e: any) => {
    if (e.target.checked) {
      addLanguages(e.target.value);
    } else {
      removeLanguages(e.target.value);
    }
  }
  const addLanguages = (lang: string) => {
    setSelectedLanguages((prev) => ([...prev, lang]));
  }

  const removeLanguages = (lang: string) => {
    setSelectedLanguages(selectedLanguages.filter((l) => l !== lang));
    setSelectedLanguages([])
  }
  const handleMotivationChange = (e: any) => {
    // console.log(e.target.value)
    email=false;
    phone=false
    MotivationArr = []
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
    setSelectedSector("")
    email=false;
    phone=false
    MotivationArr = []
    FilterJob=[]
    Importance=[]
    if(e.value=="Select Importance"){
      Importance=[]
      setImportanceOptions([])
    }
    else if(e.value!= "Select Importance"){
      Importance.push(e.value)
      filterFunction();
    }
     
   }
  
   const HandelOthers = (e) => {
    SelectedName = []
    setSelectedSector("")
    email=false;
    phone=false
    Importance=[]
    MotivationArr = []
    FilterJob=[]
    console.log(e.value)
    let OthersF=[]
    e.map((el)=>{
      OthersF.push(el.value)
    })
    OthersFilterArr=OthersF
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

  const filterFunction = async () => {
    setLoader(false);
 
//     if(selectedSector.length === 0 && selectedJob.length === 0 && selectedLanguages.length === 0 && SelectedName.length == 0 && MotivationArr.length == 0 && Importance.length == 0 &&   OthersFilterArr.length ==0 && email == false && phone == false ){
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
//         `${API_BASE_URL}filterClients/?clientMotivation=${MotivationArr}&jobStatus=In-Progress`,
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
//           `${API_BASE_URL}filterClients/?clientActivitySector=${selectedSector}&jobStatus=In-Progress`,
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
//       selectedSector.length === 0 &&
//        FilterJob.length > 0 &&
//       selectedLanguages.length == 0
//     ) {
    
//         await fetch(
//           `${API_BASE_URL}filterClients/?clientJob=${FilterJob}&jobStatus=In-Progress`,
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
//         `${API_BASE_URL}filterClients/?clientCompanyName=${SelectedName}&jobStatus=In-Progress`,
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
//          `${API_BASE_URL}filterClients/?clientImportance=${Importance}&jobStatus=In-Progress`,
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
//              setStatus(false)
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
//         `${API_BASE_URL}filterClientsByMissingEmailOrPhone/?field=email&status=In-Progress`,
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
//         `${API_BASE_URL}filterClientsByMissingEmailOrPhone/?field=phone&status=In-Progress`,
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
//         `${API_BASE_URL}filterClientsByAttributes/?filters=${OthersFilterArr.toString()}&status=In-Progress`,
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
  const jobChange = async (jobval) => {
    // console.log(jobval)
    let JobArr=[]
    setSelectedSector("")
    jobval.map((el)=>{
     
      FilterJob.push(el.value)
  
    })
    console.log(FilterJob,"fl")
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
    email=false;
    phone=false
    fetchAllSectors()
    toast.success("Filters Reset Successful!")
    setTimeout(()=>{
      filterFunction()
    },1000)
  
   }





   
   const navigate = useNavigate();

   const notificationSwitch=()=>toast.success("Modification sauvegardée")
 
 
     const candidatImportanceIcons = [{ icon:<><StarRating  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /></>}, {icon:<><StarRating  style={{marginRight:"3px",width:"70%"}} /><StarRating  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /></>}, {icon:<><StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /></>}, {icon:<><StarRating   style={{marginRight:"3px",width:"70%"}} /> <StarRating style={{marginRight:"3px",width:"70%"}}/> <StarRating style={{marginRight:"3px",width:"70%"}} /> <StarRating style={{marginRight:"3px",width:"70%"}} /> <Empty style={{marginRight:"3px",width:"70%"}} /></>}, {icon:<><StarRating  style={{marginRight:"3px",width:"70%"}} /><StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /></>}]; 
     const candidatMotivationIcons = [{ icon:"No icon5", motivation: 'No Motivation' },{ icon:"😟", motivation: 'Disappointed' }, { icon:"🙁", motivation: 'Not Really' }, { icon:"😊", motivation: 'Like' }, { icon:"🥰", motivation: 'Great' }, { icon:"😍", motivation: 'Super Lovely' }];
     const [showArchiveModal, setShowArchiveModal] = useState(false)
     const [SISPI, setChecked] = useState(filterData.sispiDeclared);
     const [Agence, setAgence] = useState(filterData.agenceDeVoyage) as any;
     const [Assurance, setAssurance] = useState(filterData.assuranceFaite) as any;
     const [A1, setA1] = useState(filterData.A1selected) as any;
     const [Public, setPublic] = useState(filterData.publicityStarted) as any;
     const [Contrat, setContrat] = useState(filterData.contractSigned) as any;
     const [Signature, setSignature] = useState(filterData.signatureSent) as any;
     const [Offre, setOffre] = useState(filterData.offerSent) as any;
   const [showSignedModal, setShowSignedModal] = useState(false);
   const [DateInRange,setDateRange]=useState(false)as any
 
   const CardOption=[{
     value:"Edit Profile",label:"Edit Profile"
     },
     {value:"Move to signed",label:"Move to signed"
     },
     {value:"Archive",label:"Archive"
     }
  ]as any
     const editClientProfile = () => {
         navigate("/clientInProgressEdit", { state: filterData });
     }
 
     const viewFullProfile = () => {
         console.log(filterData)
         navigate("/clientInProgressProfile", { state: filterData });
     }
 
 
     const MoreOption=(e:any)=>{
         if(e.value=="Edit Profile"){
           editClientProfile()
         }
         if(e.value=="Move to signed"){
           setShowSignedModal(true)
         }
         if(e.value=="Archive"){
           setShowArchiveModal(true) 
         }
       console.log(e.value)
       }
 
       const SwitchChange = (checked: any, e: any, Name: any) => {
         id = e.data._id;
         if (Name === "offerSent") {
           if (checked === true) {
             setOffre(true);
             id = e.data._id;
             onChangeSwitches(id, Name, checked);
           notificationSwitch()
           }
           if (checked === false) {
            
             setOffre(false);
             onChangeSwitches(id, Name, checked);
           notificationSwitch()
           }
         }
         if (Name === "signatureSent") {
           if (checked === true) {
             setSignature(true);
             id = e.data._id;
     
             onChangeSwitches(id, Name, checked);
           notificationSwitch()
           }
           if (checked === false) {
            
             setSignature(false);
             onChangeSwitches(id, Name, checked);
           notificationSwitch()
           }
         }
         if (Name === "contractSigned") {
           if (checked === true) {
             setContrat(true);
             id = e.data._id;
     
             onChangeSwitches(id, Name, checked);
           notificationSwitch()
           }
           if (checked === false) {
            
             setContrat(false);
             onChangeSwitches(id, Name, checked);
           notificationSwitch()
           }
         }
         if (Name === "publicityStarted") {
           if (checked === true) {
             setPublic(true);
             id = e.data._id;
     
             onChangeSwitches(id, Name, checked);
           notificationSwitch()
           }
           if (checked === false) {
            
             setPublic(false);
             onChangeSwitches(id, Name, checked);
           notificationSwitch()
           }
         }
         if (Name === "A1selected") {
           if (checked === true) {
             setA1(true);
             id = e.data._id;
     
             onChangeSwitches(id, Name, checked);
           notificationSwitch()
           }
           if (checked === false) {
            
             setA1(false);
             onChangeSwitches(id, Name, checked);
           notificationSwitch()
           }
         }
         if (Name === "assuranceFaite") {
           if (checked === true) {
             setAssurance(true);
             id = e.data._id;
     
             onChangeSwitches(id, Name, checked);
           notificationSwitch()
           }
           if (checked === false) {
            
             setAssurance(false);
             onChangeSwitches(id, Name, checked);
           notificationSwitch()
           }
         }
         if (Name === "agenceDeVoyage") {
           if (checked === true) {
             setAgence(true);
             id = e.data._id;
     
             onChangeSwitches(id, Name, checked);
           notificationSwitch()
           }
           if (checked === false) {
            
             setAgence(false);
             onChangeSwitches(id, Name, checked);
           notificationSwitch()
           }
         }
         if (Name === "sispiDeclared") {
           if (checked === true) {
             setChecked(true);
             id = e.data._id;
     
             onChangeSwitches(id, Name, checked);
           notificationSwitch()
           }
           if (checked === false) {
            
             setChecked(false);
             onChangeSwitches(id, Name, checked);
           notificationSwitch()
           }
         }
       };
     
       const onChangeSwitches = async (id, AName, val) => {
         await fetch(
           `${API_BASE_URL}switchClientAttributes/?clientId=${id}&attribute=${AName}&value=${val}`,
           {
             method: "GET",
             headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
               Authorization: "Bearer " + localStorage.getItem("token"),
             },
           }
         )
           .then((reD) => reD.json())
           .then((result) => result)
           .catch((err) => err);
       };
      
 
     const datenow=moment().format('YYYY-MM-DD')
     
        let date = new Date(datenow);
   
       let start = new Date(filterData.jobStartDate);
       let end = new Date(filterData.jobEndDate);
       
   
  return (
    <>
      <Toaster position="top-right"  containerStyle={{zIndex:"999999999999999999999"}}/>

      <div className="container-fluid" style={{marginTop:"70px"}}>
        <div className="row ">
          <div className="col-12 text-center p-1 topHeaderClient mt-2">
          <div className="d-flex topinPHeading"> <h2 className="">clients / lead  </h2> <span className="topinProgresstext">in progress</span></div>
            <p className="Inchild-text mb-0">
              Ici vous avez la liste des sociétés sur lesquelles nous avons
              <span className="fw-bolder"> une recherche active en cours.</span>
            </p>
            <p className="InPopinsText mb-0">
              Nous dépensons de l’argent et du temps pour toutes les sociétés dans cette liste. Si la recherche n’est plus d’actu alors l’archiver        </p>
          </div>
          {/* <div className="col-12 topHeaderClient mt-1 p-1">
            <div className="row">
          <div className="col-6">
            <p>Filtre Secteur d’activité</p>
            <div className="dropdown">
              <div aria-labelledby="dropdownMenuButton1">
                <select name="clientActivitySector" className="form-select" onChange={handleSectorChange} >
                  <option value="Select Un Secteur">Select Un Secteur</option>
                  {
                    sectors && sectors.map((sector) =>
                      <option value={sector.sectorName}>
                        <a className="dropdown-item" href="#">
                          {sector.sectorName}
                        </a>
                      </option>
                    )
                  }

                </select>
              </div>
            </div>
            <p className="last-child">Filtre Langues du candidat</p>
            <div>
              <div>
                <input type="checkbox" name="language" value="Roumain" onClick={getSelectedLanguage} />
                <span className="ps-2">Roumain</span>
              </div>
              <div>
                <input type="checkbox" name="language" value="Francais" onClick={getSelectedLanguage} />
                <span className="ps-2">Français</span>
              </div>
              <div>
                <input type="checkbox" name="language" value="Anglais" onClick={getSelectedLanguage} />
                <span className="ps-2">Anglais</span>
              </div>
              <div>
                <input type="checkbox" name="language" value="Italien" onClick={getSelectedLanguage} />
                <span className="ps-2">Italien</span>
              </div>
              <div>
                <input type="checkbox" name="language" value="Russe" onClick={getSelectedLanguage} />
                <span className="ps-2">Russe</span>
              </div>
              <div>
                <input type="checkbox" name="language" value="Espagnol" onClick={getSelectedLanguage} />
                <span className="ps-2">Espagnol</span>
              </div>
              <div>
                <input type="checkbox" name="language" value="Autre" onClick={getSelectedLanguage} />
                <span className="ps-2">Autre</span>
              </div>
            </div>
          </div>
          <div className="col-6">
            <p>Filtre selection métier / job</p>
            <div className="box">
              <ul className="list-group">
                {
                  jobs.length > 0 ? jobs.map((job) =>
                    <li className="job-ul list-group-item list-group-item-action" value={job.jobName} onClick={(e)=>{HandleChecked(e,job)}}>

<span style={{color:"black",textAlign:"center",width:"100%",display:"flex",justifyContent:"space-between"}}>
                   {selectedJob.find((e) => e == job.jobName) ? (
                          <div className="tick"></div>
                      ) : null} 
                  <p>{job.jobName}</p></span>
                    </li>
                  ) : <p>Please Select a Sector to view Jobs!</p>
                }
              </ul>
            </div>
          </div>
          </div>
          </div> */}
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
                      placeholder="‎ ‎ ‎ Select jobs"
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
                          {selectedSector.length > 0 || selectedJob.length > 0 || selectedLanguages.length > 0 || SelectedName.length > 0 || MotivationArr.length > 0 || SelectedName.length > 0 || Importance.length > 0 || OthersFilterArr.length > 0 ||   phone ===true ||
                        email ===true ?
                          <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-3 d-flex align-items-center justify-content-end">

<p className="filterStyling  cursor-pointer mt-2" onClick={() => RestFilters()}>Reset Filters</p>
</div>: null
} 
                          <div className="col-2 d-flex justify-content-end">
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
                      {selectedSector.length > 0 || selectedJob.length > 0 || selectedLanguages.length > 0 || SelectedName.length > 0 || MotivationArr.length > 0 || SelectedName.length > 0 || Importance.length > 0 || OthersFilterArr.length > 0 ||   phone === true ||
                        email == true ?
                          <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-3 d-flex align-items-center justify-content-end">

<p className="filterStyling  cursor-pointer mt-2" onClick={() => RestFilters()}>Reset Filters</p>
</div>: null
} 
                        <div className="col-2 d-flex justify-content-end">
                          <p className="filterStyling pt-2 cursor-pointer" onClick={() => setShowMore(true)}>More Filters <img src={require("../../../images/down.svg").default} /></p>
                        </div>
                      </div>
                    </div></div>
              }
            </div>
          </div>
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
                    <div className="col-6 px-0 mt-1">
                    <p className="textClientCard" style={{width:"150%"}} data-bs-toggle="tooltip" data-bs-placement="bottom" title={filterData.clientCompanyName.toLocaleUpperCase()}><b>{filterData.clientCompanyName ? filterData.clientCompanyName.length > 20 ? filterData.clientCompanyName.toLocaleUpperCase().slice(0,29)+ "..." : filterData.clientCompanyName.toLocaleUpperCase(): "No CompanyName!"}</b></p>
                    <div >  <p  className="textClientCard" style={{height:"30px", background:"transparent"}}>Importance:
                             <b className="d-flex" style={{width:"37%",marginLeft:"3px",height:"43px"}}>{candidatImportanceIcons[filterData.clientImportance - 1]?.icon ? candidatImportanceIcons[filterData.clientImportance - 1]?.icon : "No Importance" }</b>

                        </p>
                        </div>
                        <div >  <p  className="textClientCard" style={{width:"130%"}}>Motivation :
                             <b style={{background:"transparent" , zIndex:"9"}}>{candidatMotivationIcons[filterData.clientMotivation]?.icon ?candidatMotivationIcons[filterData.clientMotivation]?.icon + candidatMotivationIcons[filterData.clientMotivation]?.motivation : "No Motivation!"}</b>
                        </p>
                        </div>
                        <div ><p  className="textClientCard">Num of position : <b>  {filterData.numberOfPosts ? filterData.numberOfPosts : "No Posts!"}</b> </p></div>
                 

                    </div>
                    <div className="col-3 px-0 d-flex align-items-center">
                    <button className="progressCardBtnClient"><img src={require("../../../images/thundermini.svg").default} />In Progress</button>
                    </div>
                </div>
                <div className="col-12 d-flex align-items-center colorRecruting my-1 ">
                <p className="in-Recruting mb-0 " style={{ color: date >= start && date < end  ? "#A461D8" : "#ca1313"}}>Recruiting  :    {date >= start && date < end  ? "From " + filterData.jobStartDate  + "  To  " + filterData.jobEndDate :   "⚠️ From  " + filterData.jobStartDate +"  To  " + filterData.jobEndDate} </p>
                </div>
<div className="col-12 ">
    <div className="row pl-1">
                <div className="col-5 fontStylingCardDetails px-0 py-1">
                <p className="fontStylingCardP">Secteur : {filterData.clientActivitySector ? filterData.clientActivitySector.length > 15 ?  filterData.clientActivitySector.toLocaleUpperCase().slice(0,14)  + "..." : filterData.clientActivitySector.toLocaleUpperCase() : "No Sector!"} </p>
                    <p className="fontStylingCardP">Job : {filterData.clientJob ? filterData.clientJob.length > 15 ? filterData.clientJob.toLocaleUpperCase().slice(0,14) + "...": filterData.clientJob.toLocaleUpperCase() : "No Job!"}</p>
                    <p>Langues : <b> {filterData.clientLanguages.length ? filterData.clientLanguages : "No Langues!"}</b> </p>
                    <p>Phone :<b>{filterData.clientPhone.length ? filterData.clientPhone : "No Phone Number!"}</b> </p>
                    <p>Estimated CA :   <b>{filterData.jobTotalBudget ? filterData.jobTotalBudget + " €" : "N/A"}</b> </p>                

                </div>
                <div className="col-7 pl-1 fontStylingCardDetails px-0 pt-1">
                <p>Salary by person : <b>  {filterData.netSalary || filterData.salary_hours ? filterData.netSalary + "€" || filterData.salary_hours.salaryPerHour * filterData.salary_hours.hours  + " €" : "N/A"}</b> </p>
                    <p>Cl-Phone : <b>{filterData.clientPhone.length? filterData.clientPhone : "No Client Number!"}</b> </p>
                    <p>C-Name :  <b>{filterData.clientReferenceName ? filterData.clientReferenceName : "No Name!"}</b> </p>
                    <p>Contact :   <b>{filterData.clientReferenceNumber.length? filterData.clientReferenceNumber: "No Contact Number!"}</b> </p>
                </div>
                </div>
                </div>
                    <div className="Ads-box p-1">
                        <div className="">
                            <p  className="AdsFont mb-0">Ads Spent on this client:  {filterData.jobTotalBudget != 0 ? filterData.jobTotalBudget + " €" : "N/A"}  </p>
                            <p className="AdsFont mb-0">Num of position found :  {filterData.numberOfPosts}/5

                            </p>
                            <div className="col-12">
                    <div className="row p-1">
                    <div className="col-4 px-0 d-flex  justify-content-start">
              <div className="d-flex align-items-center ">
                <p className="switch-fontCard mb-0">Offre envoyé ?</p>

                <Switch
                  className="ml-left"
                  checked={Offre}
                  id="offerSent"
                  onChange={(checked, e, id) =>
                    SwitchChange(checked, filterData, id)
                  }
                  checkedHandleIcon={
                    <TurnOn
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-6px",
                      }}
                    />
                  }
                  height={19}
                  width={41}
                  uncheckedHandleIcon={
                    <TurnoFF
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-5px",
                      }}
                    />
                  }
                />
              </div>
            </div>
            <div className="col-5 px-0 d-flex  justify-content-center">
              <div className="d-flex align-items-center ">
                <p className="switch-fontCard mb-0">
                  Signature digitale envoyé ?
                </p>

                <Switch
                  checked={Signature}
                  id="signatureSent"
                  className="ml-left"
                  onChange={(checked, e, id) =>
                    SwitchChange(checked, filterData, id)
                  }
                  checkedHandleIcon={
                    <TurnOn
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-6px",
                      }}
                    />
                  }
                  height={19}
                  width={41}
                  uncheckedHandleIcon={
                    <TurnoFF
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-5px",
                      }}
                    />
                  }
                />
              </div>
            </div>
            <div className="col-2 d-flex px-0 justify-content-center ml-1">
              <div className="d-flex align-items-center ">
                <p className="switch-fontCard mb-0">A1 ?</p>

                <Switch
                  className="ml-left "
                  onChange={(checked, e, id) =>
                    SwitchChange(checked, filterData, id)
                  }
                  checked={A1}
                  id="A1selected"
                  checkedHandleIcon={
                    <TurnOn
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-6px",
                      }}
                    />
                  }
                  height={19}
                  width={41}
                  uncheckedHandleIcon={
                    <TurnoFF
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-5px",
                      }}
                    />
                  }
                />
              </div>
            </div>

            <div className="col-4 d-flex pt-0 px-0 justify-content-start">
              <div className="d-flex align-items-center ">
                <p className="switch-fontCard mb-0">Assurance faite ?</p>
                <Switch
                  className="ml-left "
                  onChange={(checked, e, id) =>
                    SwitchChange(checked, filterData, id)
                  }
                  checked={Assurance}
                  id="assuranceFaite"
                  checkedHandleIcon={
                    <TurnOn
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-6px",
                      }}
                    />
                  }
                  height={19}
                  width={41}
                  uncheckedHandleIcon={
                    <TurnoFF
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-5px",
                      }}
                    />
                  }
                />
              </div>
            </div>
            <div className="col-7 d-flex px-0 justify-content-start">
              <div className="d-flex align-items-center ">
                <p className="switch-fontCard mb-0">Client singé ?</p>
                <Switch
                  className="ml-left "
                  // onChange={switchHandle}
                  checked={Contrat}
                  onChange={(checked, e, id) =>
                    SwitchChange(checked, filterData, id)
                  }
                  id="contractSigned"
                  checkedHandleIcon={
                    <TurnOn
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-6px",
                      }}
                    />
                  }
                  height={19}
                  width={41}
                  uncheckedHandleIcon={
                    <TurnoFF
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-5px",
                      }}
                    />
                  }
                />
              </div>
            </div>
            <div className="col-5 px-0 d-flex justify-content-start">
              <div className="d-flex align-items-center ">
                <p className="switch-fontCard mb-0">Agence de voyage ok ?</p>
                <Switch
                  className="ml-left "
                  // onChange={switchHandle}
                  checked={Agence}
                  onChange={(checked, e, id) =>
                    SwitchChange(checked, filterData, id)
                  }
                  id="agenceDeVoyage"
                  checkedHandleIcon={
                    <TurnOn
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-6px",
                      }}
                    />
                  }
                  height={19}
                  width={41}
                  uncheckedHandleIcon={
                    <TurnoFF
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-5px",
                      }}
                    />
                  }
                />
              </div>
            </div>
            <div className="col-6 d-flex px-0  justify-content-start">
              <div className="d-flex align-items-center ">
                <p className="switch-fontCard mb-0">Publicité commencé ?</p>
                <Switch
                  className="ml-left "
                  // onChange={switchHandle}
                  checked={Public}
                  onChange={(checked, e, id) =>
                    SwitchChange(checked, filterData, id)
                  }
                  id="publicityStarted"
                  checkedHandleIcon={
                    <TurnOn
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-6px",
                      }}
                    />
                  }
                  height={19}
                  width={41}
                  uncheckedHandleIcon={
                    <TurnoFF
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-5px",
                      }}
                    />
                  }
                />
              </div>
            </div>

            <div className="col-5 d-flex  px-0">
              <div className="d-flex align-items-center ">
                <p className="switch-fontCard mb-0">SISPI déclaré ?</p>
                <Switch
                  className="ml-left "
                  // onChange={switchHandle}
                  checked={SISPI}
                  onChange={(checked, e, id) =>
                    SwitchChange(checked, filterData, id)
                  }
                  // defaultChecked={filterData.}
                  id="sispiDeclared"
                  checkedHandleIcon={
                    <TurnOn
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-6px",
                      }}
                    />
                  }
                  height={19}
                  width={41}
                  uncheckedHandleIcon={
                    <TurnoFF
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-5px",
                      }}
                    />
                  }
                />
              </div>
            </div>
                    </div>
                </div>
                        </div>
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
                        {showArchiveModal ?
                            <ArchivedClientModal props={filterData} closeModal={setShowArchiveModal} path={"/clientToDo"} /> : null
                        }
                            {showSignedModal ?
                      <SignedClientModal props={filterData} closeModal={setShowSignedModal} /> : null
                    }
                    </div>
                        </div>
        </div>
      </div>
    </>
  );
}
export default ClientProgressCardList;
