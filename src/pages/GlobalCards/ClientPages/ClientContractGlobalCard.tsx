import React, { useEffect, useState } from "react";
import "../../../CSS/inProgressCard.css";
import ClientContractCard from "../../ClientPages/ClientContractCard";
import { API_BASE_URL } from "../../../config/serverApiConfig";
import Loader from '../../../components/Loader/loader'
import { ColourOption } from "../../../Selecteddata/data";
import Select, {StylesConfig } from "react-select";
import SelectLoader from "../../../components/Loader/selectLoader"
import chroma from 'chroma-js';
import {ReactComponent as RatingStar} from "../../../images/RatingStar.svg"
import {ReactComponent as Empty} from "../../../images/emptyStar.svg"
import Switch from "react-switch";
import  ProfileLoader from "../../../components/Loader/ProfilesLoader"
import {ReactComponent as TurnoFF} from "../../../images/FatX.svg";
import {ReactComponent as TurnOn} from "../../../images/base-switch_icon.svg";
import toast, { Toaster } from 'react-hot-toast';
import {ReactComponent as StarRating} from "../../../images/RatingStar.svg";
import moment from 'moment';
import {useLocation,useNavigate} from 'react-router-dom'
import ArchivedClientModal from "../../../components/Modal/ArchivedClientModal";


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
 function ClientContract() {
 
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
        value: "1", label: "😟", color: '#FF8B00'
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

  useEffect(() => {
    console.log(sectors);
    let sectorops = sectors.map((asector) => {
      return { value: asector.sectorName, label: asector.sectorName, color: '#FF8B00' }
    })

    setSectorOptions([{value:"Select Un Secteur",label:"Select Un Secteur",color:'#FF8B00'},...sectorops]);
  }, [sectors])
  useEffect(() => {
    filterFunction();
  }, [selectedLanguages, selectedJob, selectedSector]);
  const fetchProfiles = async () => {
    return await fetch(API_BASE_URL + "allSignedClients", {
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

  const filterFunction = async () => {
    setLoader(false);

//     if(selectedSector.length === 0 && selectedJob.length === 0 && selectedLanguages.length === 0 && SelectedName.length == 0 && MotivationArr.length == 0 && Importance.length == 0 &&       OthersFilterArr.length ==0 &&   email == false && phone == false  ){
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
//         `${API_BASE_URL}filterClients/?clientMotivation=${MotivationArr}&jobStatus=Signed Contract`,
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
//           `${API_BASE_URL}filterClients/?clientActivitySector=${selectedSector}&jobStatus=Signed Contract`,
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
//           `${API_BASE_URL}filterClients/?clientJob=${FilterJob}&jobStatus=Signed Contract`,
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
//         `${API_BASE_URL}filterClients/?clientCompanyName=${SelectedName}&jobStatus=Signed Contract`,
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
//          `${API_BASE_URL}filterClients/?clientImportance=${Importance}&jobStatus=Signed Contract`,
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
//         `${API_BASE_URL}filterClientsByMissingEmailOrPhone/?field=email&status=Signed Contract`,
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
//         `${API_BASE_URL}filterClientsByMissingEmailOrPhone/?field=phone&status=Signed Contract`,
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
//         `${API_BASE_URL}filterClientsByAttributes/?filters=${OthersFilterArr.toString()}&status=Signed Contract`,
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

  const handleNameChange = (e: any) => {
    // console.log(e.target.value)
    SelectedName = []
    email=false;
    phone=false
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
      setSelectedSector(e.value);
      setJobOptions([]);
      filterFunction()
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

  const handleMotivationChange = (e: any) => {
    // console.log(e.target.value)
    MotivationArr = []
    email=false;
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
  email=false;
  phone=false
  setSelectedSector("")
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
      email=false;
      phone=false
      setSelectedSector("")
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
      setJobs([])
      setSelectedSector("")
      FilterJob = [];
      MotivationArr = []
      OthersFilterArr = []
      Importance=[]
      setImportanceOptions([])
      setImportanceOptions([])
      setSectorOptions([])
      email=false;
      phone=false
      setSectors([])
      setSelectedJob([])
      toast.success("Filters Reset Successful!")
      fetchAllSectors()
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


    const navigate = useNavigate();

    const candidatImportanceIcons = [{ icon:<><StarRating  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /></>}, {icon:<><StarRating  style={{marginRight:"3px",width:"70%"}} /><StarRating  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /></>}, {icon:<><StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /> <Empty  style={{marginRight:"3px",width:"70%"}} /></>}, {icon:<><StarRating   style={{marginRight:"3px",width:"70%"}} /> <StarRating style={{marginRight:"3px",width:"70%"}}/> <StarRating style={{marginRight:"3px",width:"70%"}} /> <StarRating style={{marginRight:"3px",width:"70%"}} /> <Empty style={{marginRight:"3px",width:"70%"}} /></>}, {icon:<><StarRating  style={{marginRight:"3px",width:"70%"}} /><StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /> <StarRating  style={{marginRight:"3px",width:"70%"}} /></>}]; 
    const candidatMotivationIcons = [{ icon:"no icon", motivation: 'no motivation' },{ icon:"😟", motivation: 'Disappointed' }, { icon:"🙁", motivation: 'Not Really' }, { icon:"😊", motivation: 'Like' }, { icon:"🥰", motivation: 'Great' }, { icon:"😍", motivation: 'Super Lovely' }];
    const [showArchiveModal, setShowArchiveModal] = useState(false)
  const CardOption=[{
    value:"Edit Profile",label:"Edit Profile"
    },
  
    {value:"Archive",label:"Archive"
    }
  ]as any
  
  const viewFullProfile = (data) => {
    localStorage.setItem("embauch", JSON.stringify(data));
    window.open("/embauchprofile", "_blank");
  };
  
    const editClientProfile = () => {
        navigate("/ClientContractEditprofile", { state: filterData });
    }
    const MoreOption=(e:any)=>{
        if(e.value=="Edit Profile"){
          editClientProfile()
        }
        if(e.value=="Archive"){
          setShowArchiveModal(true) 
        }
      console.log(e.value)
      }
  
  
  
    const SeeFullProfile=()=>{
      navigate("/clientSigned", { state: filterData});
    }
    console.log(filterData,"profile")
  
  
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
          <div className="d-flex topinPHeading"> <h2 className="">clients / lead </h2> <span className="topSignedtext">signed contract </span></div>
          <p className="Inchild-text mb-0">
          Ici vous avez la liste des sociétés qui font une  
               <span className="fw-bolder" style={{textDecoration:"underline",marginLeft:"5px"}}> demande pas encore traité</span>
            </p>
            <p className="InPopinsText">
            Vous devez toujours vous assurer d’avoir un maximum d’information sur cette liste et déplacer les leads en archive si plus d’actualité </p>

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
                          name="ClientName"
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
                        name="ClientActivitySector"
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
                              name="ClientMotivation"
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
                            name="ClientLicencePermis"
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
                              name="ClientLicencePermis"
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
                      {selectedSector.length > 0 || selectedJob.length > 0 || selectedLanguages.length > 0 || SelectedName.length > 0 || MotivationArr.length > 0 || SelectedName.length > 0 || Importance.length > 0 || OthersFilterArr.length > 0 || email == true || phone == true  ?
                          <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-3 d-flex align-items-center justify-content-end">

<p className="filterStyling  cursor-pointer mt-2" onClick={() => RestFilters()}>Reset Filters</p>
</div>: null
} 
                          <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-3 d-flex justify-content-end">
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
                      {selectedSector.length > 0 || selectedJob.length > 0 || selectedLanguages.length > 0 || SelectedName.length > 0 || MotivationArr.length > 0 || SelectedName.length > 0 || Importance.length > 0 || OthersFilterArr.length > 0 || email == true || phone == true ?
                      <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-3d-flex align-items-center justify-content-end">
<p className="filterStyling  cursor-pointer mt-2" onClick={() => RestFilters()}>Reset Filters</p>
</div>: null
}  
                        <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-3 d-flex justify-content-end">
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
                <div className="d-flex cursor-pointer" onClick={SeeFullProfile}>
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
                             <b style={{background:"transparent" , zIndex:"9"}}>{candidatMotivationIcons[filterData.clientMotivation]?.icon + " " + candidatMotivationIcons[filterData.clientMotivation]?.motivation}</b>
                        </p>
                        </div>
                        <div ><p  className="textClientCard">Num of position : <b>  {filterData.numberOfPosts ? filterData.numberOfPosts : "No Posts!"}</b> </p></div>
                 

                    </div>
                    <div className="col-4 px-0 d-flex justify-content-center align-items-center">
                    <button className="SignedClientBtn"><img  src={require("../../../images/tickClientBtn.svg").default} /> SIGNED CONTRACT</button>
                    </div>
                </div>
                <div className="col-12 d-flex align-items-center textSignedClient my-1 ">
                <p className=" mb-0 " style={{ color: date >= start && date <= end  ? "#489767" : "#ca1313"}}>Recruiting  :    {date >= start && date <= end  ? "From " + filterData.jobStartDate  + "  To  " + filterData.jobEndDate :   "⚠️ From  " + filterData.jobStartDate +"  To  " + filterData.jobEndDate} </p>
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
                <p>E-Mail : <b>{filterData.clientEmail ? filterData.clientEmail.length > 20 ?  filterData.clientEmail.slice(0,21) + "..." : filterData.clientEmail : "No Email!"}</b> </p>
                    <p>Cl-Phone : <b>{filterData.clientPhone.length? filterData.clientPhone : "No Client Number!"}</b> </p>
                    <p>C-Name :  <b>{filterData.clientReferenceName ? filterData.clientReferenceName : "No Name!"}</b> </p>
                    <p>Contact :   <b>{filterData.clientReferenceNumber.length? filterData.clientReferenceNumber: "No Contact Number!"}</b> </p>
                </div>
                </div>
                </div>
                    <div className="SignedClientBox p-1">
                        <div className="">
                            <p  className="AdsFont mb-0">Ads Spent on this client:  {filterData.jobTotalBudget != 0 ? filterData.jobTotalBudget + " €" : "N/A"}  </p>
                            <p className="AdsFont mb-0">Employees working for this client :
                            </p>
                            <div className="col-12">
                    <div className="row">
                    
              
           {
            filterData.employeesWorkingUnder != null && filterData.employeesWorkingUnder != [] ?
            filterData.employeesWorkingUnder.map((el)=>(
              <div className="col-4 pr-0">
                                       <div className="d-flex align-items-center cursor-pointer" onClick={(e)=>viewFullProfile(el)}>
                   
                                    <img
                                      src={require("../../../images/menSigned.svg").default}
                                      style={{ width: "15%" }}
                                    />
                                    <p style={{ fontSize: "8px",marginLeft:"5px" }} className="mb-0 " >
                                     {el.candidatName}
                                    </p>
                                  </div>

                                  </div>
                    ))
                    
                    :
              <div className="col-4 pr-0">
                    <div className="d-flex align-items-center">
                    <img
                    src={require("../../../images/menSigned.svg").default}
                    style={{ width: "15%" }}
                  />
                  <p style={{ fontSize: "8px",marginLeft:"5px" }} className="mb-0 ">
                 No Candidat!
                  </p>
                  </div>
                  </div>
                
           }
                                
                
                    
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
                            <button className="btn btn-card" onClick={SeeFullProfile}>
                                See Full Profile
                            </button>
                        </div>
                        </div> 
                        </div>
                        {showArchiveModal ?
                            <ArchivedClientModal props={filterData} closeModal={setShowArchiveModal} path={"/clientToDo"} /> : null
                        }
                            
                    </div>
                      </div>
                 
          </>
        </div>
      </div>
    </>
  );
}
export default ClientContract;

