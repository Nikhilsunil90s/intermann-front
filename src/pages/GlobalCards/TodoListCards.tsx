import React, { useEffect, useState } from "react";
import "../../CSS/CanEmpl.css";
import ToDoProfileCard from "../../components/ToDoProfileCard";
import { API_BASE_URL } from "../../config/serverApiConfig";
import { Toaster ,toast} from "react-hot-toast";
import Loader from "../../components/Loader/loader";
import Select, { StylesConfig } from "react-select";
import chroma from 'chroma-js';
import { ColourOption } from "../../Selecteddata/data";
import ProfileLoader from "../../components/Loader/ProfilesLoader"
import {useLocation,useNavigate} from 'react-router-dom'
import moment from 'moment'
import PreSelectedModal from "../../components/Modal/preSelectedModal"
import ArchivedModal from "../../components/Modal/ArchivedModal";

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
let FilterJob = [];
let MotivationArr = []
let LicencePermisArr = []
let DateArr=[]
let emailArr=[]
let contactArr=[]
let OthersFilterArr = []
let LanguageFilter=[]
function ToDoList() {
 

  // Notification // 
const notifyMoveSuccess = () => toast.success("Moved Archived Successfully!");
const notifyMoveError = () => toast.error("Not Moved..");
  //    End   // 
   
  const {state} = useLocation()
  const [sectors, setSectors] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState([]);
  const [selectedSector, setSelectedSector] = useState("");
  const [sectorOptions, setSectorOptions] = useState([])as any;
  const [jobOptions, setJobOptions] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [filterData, setFilterData] = useState(state)as any;
  const [status, setStatus] = useState(Boolean);
  const [nameOptions, setNameOptions] = useState([])as any                      
  const [showMore, setShowMore] = useState(true)
  const [email,setEmail]=useState([])
  
  const [licenceOptions, setLicenseOptions] = useState([

  ])

  const [motivationOptions, setMotivationOptions] = useState([

  ])
  const [ContactOptions,setContactOptions]=useState([])
  const [LanguageOp,setLangOp]=useState([])

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
      fetchAllSectors()
        .then((data) => {
          // console.log(data.data);
          setSectors([...data.data]);
        })
        .catch((err) => {
          // console.log(err);
        });
    }
    let jobResults = jobs.map(ajob => {
      return { value: ajob.jobName, label: ajob.jobName, color: '#FF8B00' }
    })
    setJobOptions([...jobResults]);

  }, [jobs]);

  useEffect(() => {
      let sectorops = sectors.map((asector) => {
      return { value: asector.sectorName, label: asector.sectorName, color: '#FF8B00' }
    })

    setSectorOptions([{value:"Select Sector",label:"Select Sector",color:"#ff8b00"},...sectorops]);
  }, [sectors])

  useEffect(() => {
    filterFunction();
  }, [selectedLanguages, selectedJob, selectedSector, motivationOptions]);

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
  // console.log(selectedJob, "selectedjob");
  const fetchAllJobs = async (sector: string) => {
    if (sector === "Select Un Secteur") {
      return {
        data: [],
      };
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
  const DateFilter=()=>{
    fetch(`${API_BASE_URL}getCandidats/?candidatStartDate=${DateArr}`, {

      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((reD) => reD.json())
      .then((result) =>{
       if(result.total === 0){
    setLoader(true) 
    setStatus(false)
       }else{
     setFilterData([...result.data]) ; setLoader(true); setStatus(true)
     }   })
      .catch((err) => err);
  }
  const EmailFilter=()=>{
   return fetch(`${API_BASE_URL}getCandidats/?candidatEmail=${emailArr}`, {

      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(reD => reD.json())
      .then(result => result)
      .catch((err) => err);
  }
  const ContactFilter=()=>{
    return fetch(`${API_BASE_URL}getCandidatsByPhoneNumber/?phoneNumber=${contactArr}`, {
 
       method: "GET",
       headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: "Bearer " + localStorage.getItem("token"),
       },
     })
       .then(reD => reD.json())
       .then(result => result)
       .catch((err) => err);
   }
  const fetchProfiles = async () => {
    return await fetch(API_BASE_URL + "allToDoCandidats", {
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

  useEffect(() => {
    if(licenceOptions.length == 0){
      setLicenseOptions([    {
        value: "Select Licence", label: "Select Licence", color: '#FF8B00'
      },
      {
        value: "true", label: "Have Licence", color: '#FF8B00'
      },
      {
        value: "false", label: "No Licence", color: '#FF8B00'
      }])
    }
    if(LanguageOp.length == 0){
      setLangOp([{ value: 'Roumain', label: 'Roumain', color:  '#FF8B00' },
      { value: 'Français', label: 'Français', color:  '#FF8B00', },
      { value: 'Anglais', label: 'Anglais', color: '#FF8B00' },
      { value: 'Italien', label: 'Italien', color: '#FF8B00'  },
      { value: 'Russe', label: 'Russe', color: '#FF8B00' },
      { value: 'Espagnol', label: 'Espagnol', color: '#FF8B00'},
      { value: 'Autre', label: 'Autre', color: '#FF8B00' },
      { value: 'Suisse', label: 'Suisse', color: '#FF8B00' },
    ])
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
    if (nameOptions.length == 0) {
      fetchProfiles().then((profilesResult) => {
        let nameops = profilesResult.map((pro) => {
          return { value: pro.candidatName, label: pro.candidatName, color: '#FF8B00' }
        })
        setNameOptions([{value:"Select Name",label:"Select Name",color:"#ff8b00"},...nameops])
      }).catch(err => {
        console.log(err)
      })
    }
    if (email.length == 0) {
      let emailops=[]as any
      fetchProfiles().then((profileResult) => {
        profileResult.filter((item) => {
          if(item.candidatEmail){
         emailops.push({ value: item.candidatEmail, label: item.candidatEmail, color: '#FF8B00' })
          }
      })
         setEmail([  {
          value: "Select email", label: "Select Email", color: '#FF8B00'
        },...emailops])
      })
      }
      if (ContactOptions.length == 0) {
        let ContactOp =[]as any
        fetchProfiles().then((profileResult) => {
          profileResult.filter((item) => {
            if(item.candidatPhone){
              ContactOp.push({ value: item.candidatPhone, label: item.candidatPhone, color: '#FF8B00' })
            }
        })
           setContactOptions([  {
            value: "Select Contact", label: "Select Contact", color: '#FF8B00'
          },...ContactOp])
        })
        }
    
  } )

  const fetchProfilesForAJob = async (jobName: string) => {
    return await fetch(API_BASE_URL + "fetchProfilesForAJob", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ jobName: jobName }),
    })
      .then((reD) => reD.json())
      .then((result) => result)
      .catch((err) => err);
  };

  const handleNameChange = (e: any) => {
    // console.log(e.target.value)
    SelectedName = []
    DateArr=[]
    emailArr=[]
    LanguageFilter=[]
    contactArr=[]
    MotivationArr = []
    LicencePermisArr = []
    setSelectedSector("")
    setSelectedJob([])
    if (e.value === "Select Name") {
      SelectedName = []
    filterFunction();
    }
    else if (e.value !== "" && e.value!=="Select Name") {
      SelectedName = []
      MotivationArr = []
      let NameField = e.value;
      SelectedName.push(NameField)
    }
  };

  const HandelLicence = (e) => {
    LicencePermisArr = []
    SelectedName = []
    emailArr=[]
    LanguageFilter=[]
    contactArr=[]
    DateArr=[]
    setSelectedSector("")
    MotivationArr = []
    if(e.value=="Select Licence"){
      LicencePermisArr=[]
      filterFunction()
    }
    if(e.value !=="" && e.value !=="Select Licence"){
    LicencePermisArr.push(e.value)
    filterFunction()
    }
  }
 
  const handleMotivationChange = (e: any) => {
    // console.log(e.target.value)
    MotivationArr = []
    LicencePermisArr = []
    LanguageFilter=[]
    setSelectedSector("")
    emailArr=[]
    DateArr=[]
    FilterJob=[]
    contactArr=[]
    if (e.value === "Select Motivations") {
      MotivationArr = []
      filterFunction()

    } else if (e.value !== "" && e.value !== "Select Motivations") {
      MotivationArr = []
      let sectorField = e.value;
      MotivationArr.push(sectorField)
      filterFunction()
      // setSelectedSector(sectorField);
    }
  };

  const handleSectorChange = (e: any) => {
    // console.log(e.target.value)
    SelectedName = []
    LanguageFilter=[]
    MotivationArr = []
    LicencePermisArr = []
    FilterJob = [];
    DateArr=[]
    setSelectedJob([])
    emailArr=[]
    contactArr=[]
    if (e.value === "Select Sector") {
      setJobs([]);
      setSelectedSector("");
      setJobOptions([]);
    filterFunction()

    } else if (e.value !== '' && e.value !== "Select Sector") {
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

  const handleEmailChange=(e:any)=>{
    SelectedName = []
    MotivationArr = []
    LanguageFilter=[]
    LicencePermisArr = []
    FilterJob = [];
    setSelectedJob([])
    setSelectedSector("")
    emailArr=[]
    DateArr=[]
    contactArr=[]
    if (e.value === "Select email") {
    emailArr=[]
    filterFunction()

    } else if (e.value !== '' && e.value !== "Select email") {
          emailArr = e.value;
    }
  }

  const handleContactChange=(e:any)=>{
    SelectedName = []
    LanguageFilter=[]
    MotivationArr = []
    LicencePermisArr = []
    FilterJob = [];
    setSelectedJob([])
    setSelectedSector("")
    emailArr=[]
    DateArr=[]
    contactArr=[]
    if (e.value === "Select Contact") {
      contactArr=[]
    filterFunction()

    } else if (e.value !== '' && e.value !== "Select Contact") {
          contactArr = e.value;
    }
  }


  useEffect(() => {
    setSelectedJob(FilterJob)

  }, [selectedJob])



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
    setSelectedLanguages([])
  };

  const filterFunction = async () => {
    // setLoader(false);

    // if (SelectedName.length > 0 || MotivationArr.length > 0 || LicencePermisArr.length > 0 || DateArr.length>0 || emailArr.length > 0 || contactArr.length > 0) {
    //   if (SelectedName.length > 0 && MotivationArr.length == 0 && LicencePermisArr.length == 0 && DateArr.length==0 && emailArr.length ==0 && contactArr.length ==0) {
    //     LicencePermisArr = []
    //     fetch(`${API_BASE_URL}getCandidats/?candidatName=${SelectedName}`, {

    //       method: "GET",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + localStorage.getItem("token"),
    //       },
    //     })
    //       .then((reD) => reD.json())
    //       .then((result) => {
    //         {
    //           // setFilterData([...result.data]);
    //           // console.log(result,"result")
    //           setFilterData([...result.data]);
    //         }
    //         // setStatus(result.status);
    //       })
    //       .catch((err) => err);
    //     setLoader(true);
    //   }
    //   if (SelectedName.length == 0 && MotivationArr.length > 0 && LicencePermisArr.length == 0 && DateArr.length == 0 && emailArr.length ==0  && contactArr.length ==0) {
    //     setFilterData([])
    //     SelectedName = []
    //     fetch(`${API_BASE_URL}getCandidats/?candidatMotivation=${MotivationArr}`, {

    //       method: "GET",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + localStorage.getItem("token"),
    //       },
    //     })
    //       .then((reD) => reD.json())
    //       .then((result) => {
    //      {
    //           // setFilterData([...result.data]);

    //           setFilterData([...result.data]);
    //         }
    //         // setStatus(result.status);
    //       })
    //       .catch((err) => err);
    //     setLoader(true);
    //   }
    //   if (LicencePermisArr.length > 0 && MotivationArr.length == 0 && SelectedName.length  == 0 && DateArr.length == 0 && emailArr.length ==0  && contactArr.length ==0) {
    //     setFilterData([])
    //     SelectedName = []
    //     MotivationArr = []
    //     fetch(`${API_BASE_URL}getCandidats/?candidatLicensePermis=${LicencePermisArr}`, {

    //       method: "GET",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + localStorage.getItem("token"),
    //       },
    //     })
    //       .then((reD) => reD.json())
    //       .then((result) => {
    //         {
    //           setFilterData([...result.data]);
    //         }
    //       })
    //       .catch((err) => err);
    //     setLoader(true);
    //   }
    //   if (DateArr.length > 0 && SelectedName.length == 0 && MotivationArr.length == 0 && LicencePermisArr.length == 0 && emailArr.length ==0  && contactArr.length ==0) {
    //     setFilterData([])
    //     SelectedName = []
    //     MotivationArr = []
    //     LicencePermisArr=[]
    //     setSelectedSector("")
        
    //     DateFilter()
    //   }
    //   if (emailArr.length > 0 && DateArr.length == 0 && SelectedName.length == 0 && MotivationArr.length == 0 && LicencePermisArr.length == 0  && contactArr.length ==0) {
    //     setFilterData([])
    //     SelectedName = []
    //     MotivationArr = []
    //     LicencePermisArr=[]
    //     setSelectedSector("")
    //     DateArr=[]

    //     EmailFilter().then((data)=>{
    //       if(data.total === 0){
    //         setLoader(true) 
    //         setStatus(false)
    //            }else{
    //          setFilterData([...data.data]) ; setLoader(true); setStatus(true)
    //          }  
    //     })
    //     .catch((err)=>err)
    //   }
    //   if (contactArr.length > 0 && emailArr.length == 0 && DateArr.length == 0 && SelectedName.length == 0 && MotivationArr.length == 0 && LicencePermisArr.length == 0  ) {
    //     setFilterData([])
    //     SelectedName = []
    //     MotivationArr = []
    //     LicencePermisArr=[]
    //     setSelectedSector("")
    //     DateArr=[]
    //     emailArr=[]
    //     ContactFilter().then((data)=>{
    //       if(data.total === 0){
    //         setLoader(true) 
    //         setStatus(false)
    //            }else{
    //          setFilterData([...data.data]) ; setLoader(true); setStatus(true)
    //          }  
    //     })
    //     .catch((err)=>err)
    //   }
    // }
    // if (
    //   selectedSector.length > 0 &&
    //   selectedJob.length == 0 &&
    //   LanguageFilter.length == 0
    // ) {
    //   fetch(
    //     `${API_BASE_URL}filterToDoCandidatBySector/?sector=${selectedSector}`,
    //     {
    //       method: "GET",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + localStorage.getItem("token"),
    //       },
    //     }
    //   )
    //     .then((reD) => reD.json())
    //     .then((result) => {
    //       {
    //         setFilterData([...result.data]);
    //       }
    //       setStatus(result.status);
    //     })
    //     .catch((err) => err);
    //   setLoader(true);
    // }

    // if (
    //   selectedSector.length > 0 &&
    //   FilterJob.length > 0 &&
    //   LanguageFilter.length == 0
    // ) {
    //   await fetch(
    //     `${API_BASE_URL}filterToDoSJ/?sector=${selectedSector}&jobs=${FilterJob}`,
    //     {
    //       method: "GET",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + localStorage.getItem("token"),
    //       },
    //     }
    //   )
    //     .then((reD) => reD.json())
    //     .then((result) => {
    //     if(result.length > 0){
    //       setLoader(true)
    //       setStatus(true)
    //         setFilterData([...result.data]);
    //       }
    //       if(result.status == false){
    //         setLoader(true)
    //         setStatus(false);
    //       }
    //     })
    //     .catch((err) => err);



    // }
    // if (
    //   LanguageFilter.length > 0 &&
    //   selectedJob.length == 0 &&
    //   selectedSector.length == 0
    // ) {
    //   await fetch(
    //     `${API_BASE_URL}filterToDoCandidatByLanguages/?languages=${LanguageFilter}`,
    //     {
    //       method: "GET",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + localStorage.getItem("token"),
    //       },
    //     }
    //   )
    //     .then((reD) => reD.json())
    //     .then((result) => {
    //       if(result.length > 0){
    //         setLoader(true)
    //         setStatus(true)
    //           setFilterData([...result.data]);
    //         }
    //         if(result.length == 0){
    //           setLoader(true)
    //           setStatus(false);
    //   }  })
    //     .catch((err) => err);
    // }

    // if (selectedSector.length === 0 && selectedJob.length === 0 && selectedLanguages.length === 0 && SelectedName.length === 0 && MotivationArr.length === 0 && LicencePermisArr.length === 0 && DateArr.length === 0 && emailArr.length == 0 && contactArr.length == 0 && FilterJob.length == 0 && LanguageFilter.length == 0) {
    //   {
    //     setLoader(true)
    //     setStatus(true)
    //     fetchProfiles().then(filteredresponse => {
    //       setFilterData([...filteredresponse])
    //     })
    //       .catch(err => {
    //         console.log(err);
    //       })
    //   }
    // }
  };

  const jobChange = async (jobval) => {
    // console.log(jobval)
    jobval.map((el)=>{
      FilterJob.push(el.value)
    })
    filterFunction()
  }
  const onDateChange=(e:any)=>{
    LanguageFilter=[]
    DateArr=[]
    SelectedName=[]
    emailArr=[]
    FilterJob=[]
    contactArr=[]
    setSelectedSector("")
    LicencePermisArr=[]
    MotivationArr=[]
    if(e.target.name==="candidatStartDate"){
    let SelectedDate=[]
    SelectedDate=e.target.value
    DateArr.push(SelectedDate)
    filterFunction()
    }
 }
 const LanguageChange = async (lang) => {
  DateArr=[]
  setSelectedSector("")
  SelectedName=[]
  LicencePermisArr=[]
  OthersFilterArr = []
    FilterJob=[]
    emailArr=[]
  contactArr=[]
  MotivationArr=[]
      // console.log(jobval)
      let LangArr=[]
      if(lang.value == "Select Language"){
       LangArr=[]
      filterFunction()
      }
      if(lang.vlaue !== "" && lang.value !== "Select Language"){
      lang.map((el)=>{
       
         LangArr.push(el.value)
    
      })
      LanguageFilter=LangArr
      filterFunction()
    }
    }

 const RestFilters=()=>{
  setSectors([])
  setNameOptions([])
  SelectedName=[]
  setSelectedSector("")
  setSectorOptions([])
  setJobs([])
  setSelectedJob([])
  setJobOptions([])
  setMotivationOptions([])
  MotivationArr=[]
  LanguageFilter=[]
  setLangOp([])
   DateArr=[]
   LicencePermisArr=[]
   OthersFilterArr = []
   setLicenseOptions([])
   setLangOp([])
   emailArr=[]
   setEmail([])
   contactArr=[]
   setContactOptions([])
   toast.success("Filters Reset Successfully!")
  fetchAllSectors()
  setTimeout(()=>{
    filterFunction()
  },1000)
}




const navigate = useNavigate();
const [showInProgressModal, setShowInProgressModal] = useState(false);
const [showArchiveModal, setShowArchiveModal] = useState(false)
const [Client,setClients]=useState([])as any
const CardOptions=[{
value:"Edit Profile",label:"Edit Profile"
},
{value:"move to pre selected",label:"Move to PreSelected"
},
{value:"Archive",label:"Archive"
}


]

const fetchProfilesClients = async () => {
return await fetch(API_BASE_URL + "allToDoClients", {
  method: "GET",
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
})
  .then((resD) => resD.json())
  .then(res => setClients([...res]))
  .catch((err) => err);
};




const [candidatMotivationIcons,setMotivation] = useState([{ icon: "no", motivation: 'no' },{ icon: "😟", motivation: 'Disappointed' }, { icon: "🙁", motivation: 'Not Really' }, { icon: "😊", motivation: 'Like' }, { icon: "🥰", motivation: 'Great' }, { icon: "😍", motivation: 'Super Lovely' }]);


 const editCandidatProfile = () => {
     navigate("/editToDo", { state: filterData});
 }

 const viewFullProfile = () => {

     // navigate("/todoprofile", { state: filterData });
     localStorage.setItem('profile', JSON.stringify(filterData));
     window.open("/todoprofile", "_blank")
 }


 const datenow=moment().format('YYYY-MM-DD')
 
 let date = new Date(datenow);

let start = new Date(filterData.candidatStartDate);
let end = new Date(filterData.candidatEndDate);



 const MoreOption=(e:any)=>{
   if(e.value=="Edit Profile"){
       editCandidatProfile()
   }
   if(e.value=="move to pre selected"){
     fetchProfilesClients() 
    setShowInProgressModal(true)
   }
   if(e.value=="Archive"){
     setShowArchiveModal(true) 
   }
 }
  return (
    <>
           <Toaster position="top-right" containerStyle={{ zIndex: '99999999999' }} />

      <div className="container-fluid">
        <div className="row pd ">

          <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 card-tops px-1 mt-1 " style={{ padding: "0px", marginBottom: "20px" }}>
            <div className="row text-start">
              <div className="card mdquery" style={{ padding: "15px 15px", borderRadius: "10px", marginBottom: "0px" }}>
                <div className="d-flex topHeading"> <h2 className="">candidats / employes</h2> <span className="topBluetext">list to do / En Sommeil</span></div>
                  <p className="h-child-text d-flex mb-0">
                    Ici vous avez la liste des candidats ne travaillant pas encore avec nous
                  </p>
                  <p className="h-child-text mb-0">
                    Vous devez toujours vous assurer d’avoir un maximum d’information sur cette liste et déplacer les candidats en archive si plus d’actualité
                  </p>
              </div>
            </div>
          </div>
          <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 bg-white p-2 rounded001 mdquery mb-2">
            <div className="row ">
              <div className="col-md-6 col-xxl-4 col-xl-4 col-lg-4 ">
                <p className="FiltreName">Filtre by name</p>
                <div className="dropdown">
                  <div aria-labelledby="dropdownMenuButton1">
                    {
                      nameOptions.length > 0 ?
                        <Select
                          name="candidatName"
                          closeMenuOnSelect={true}
                          placeholder="‎ ‎ ‎ ‎ ‎ ‎Select Un Candidat"
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={handleNameChange}
                          options={nameOptions}
                          styles={colourStyles}
                          isClearable={false}
                      
                          
                          
                        /> :  
                                           <div className="">   <ProfileLoader  width={"64px"} height={"45px"} fontSize={"12px"} fontWeight={600} Title={""}/></div>

                                            }
                    {/* <select
                      name="candidatActivityName"
                      className="form-select"
                      onChange={handleNameChange}
                      onClick={() => {
                        // setSelectedJob([]);
                        filterFunction();
                      }}
                    >
                      <option value="Select Un Name" className="fadeClass001">Select</option>
                      {nameOptions &&
                        SelectDropDown.map((Name) => (
                          <option value={Name.candidatName}>
                            <button className="dropdown-item">
                              {Name.candidatName}
                            </button>
                          </option>
                        ))}
                    </select> */}
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xxl-4 col-xl-4 col-lg-4">
                <p className="FiltreName">Filtre Secteur d’activité</p>
                <div className="dropdown">
                  <div aria-labelledby="dropdownMenuButton1">
                  {sectorOptions.length > 0 ?
                      <Select
                        name="candidatActivitySector"
                        closeMenuOnSelect={true}
                        placeholder="‎ ‎ ‎‎ ‎ ‎Select Un Secteur"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleSectorChange}
                        options={sectorOptions}
                        styles={colourStyles}
                      /> : <p>Select Un Secteur!</p>
                    }
                    {/* <select
                      name="candidatActivitySector"
                      className="form-select"
                      onChange={handleSectorChange}
                      onClick={() => {
                        setSelectedJob([]);
                        filterFunction();
                      }}
                    >
                      <option value="Select Un Secteur" className="fadeClass001">Select Un Secteur</option> */}
                    {/* {sectors &&
                        sectors.map((sector) => (
                          <option value={sector.sectorName}>
                            <button className="dropdown-item">
                              {sector.sectorName}
                            </button>
                          </option>
                        ))} */}
                    {/* </select> */}
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xxl-4 col-xl-4 col-lg-4 pt-1101">
                <p className="FiltreName">Filtre selection métier / job</p>
                <div>
                  {jobOptions.length > 0 ?
                    <Select
                      name="jobName"
                      closeMenuOnSelect={true}
                      isMulti
                      placeholder="‎ ‎ ‎ ‎ ‎ ‎Select"
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={jobChange}
                      options={jobOptions}
                      styles={colourStyles}
                    /> : <p className="FiltreName mt-1">Select A Sector!</p>
                  }
                </div>
              </div>
              {
                showMore ?
                  <>
                    <div className="col-12 pt-1">
                      <div className="row">
                        <div className="col-md-6 col-xxl-4 col-xl-4 col-lg-4 pt-1">
                          <p className="FiltreName">Filtre by Motivation</p>
                          <div className="dropdown">
                            <div aria-labelledby="dropdownMenuButton1">
                              {/* <select
                                name="candidatActivityMotivation"
                                className="form-select"
                                onChange={handleMotivationChange}
                              // onClick={() => {
                              //   // setSelectedJob([]);
                              //   filterFunction();
                              // }}
                              >
                                <option value="Select Un Secteur" className="fadeClass001">Select</option>
                                {motivation &&
                                  Motivation.map((Motivation) => (
                                    <option value={Motivation.value}>
                                      <button className="dropdown-item">
                                        {Motivation.label}
                                      </button>
                                    </option>
                                  ))}
                              </select> */}
                              {
                                motivationOptions.length > 0 ?
                                <Select
                                name="candidatMotivation"
                                closeMenuOnSelect={true}
                                placeholder="‎ ‎ ‎ ‎ ‎ ‎Select Motivation du Candidat"
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={handleMotivationChange}
                                options={motivationOptions}
                                styles={colourStyles}
                              />
                              :
                        <div >   <ProfileLoader  width={"64px"} height={"45px"} fontSize={"12px"} fontWeight={600} Title={""}/></div>
                              }
                        
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-xxl-4 col-xl-4 col-lg-4 pt-1">
        <p className="FiltreName">Filter by date</p>
                          {/* <input
                              type="date"
                              className="form-control"
                              name="candidatStartDate"
                                // value={data.candidatStartDate}
                                onClick={onDateChange}
                                
                              /> */}
                        <input type="date"  className="form-control inputDate"
                              name="candidatStartDate"   onChange={onDateChange} />
        </div>
                        <div className="col-md-6 col-xxl-4 col-xl-4 col-lg-4 pt-1">
                          <p className="FiltreName">Filter by driver licence</p>
                          <div className="dropdown">
                            <div aria-labelledby="dropdownMenuButton1">
                              {/* <select
                                name=""
                                className="form-select"
                                // onChange={handleSectorChange}
                                onChange={HandelLicence}
                              >
                                <option value="Select Un Secteur" className="fadeClass001" selected disabled hidden>Have licence</option>
                                <option value="true" onChange={HandelLicence}>Have Licence</option>
                                <option value="false" onChange={HandelLicence}>Doesn't Have Licence</option>
                              </select> */}
                             {
                              licenceOptions.length > 0 ?
                              <Select
                              name="candidatLicencePermis"
                              closeMenuOnSelect={true}
                              placeholder="‎ ‎ ‎ ‎ ‎  ‎ Select Licence Permis"
                              className="basic-multi-select"
                              classNamePrefix="select"
                              onChange={HandelLicence}
                              options={licenceOptions}
                              styles={colourStyles}
                            />
                            : 
                        <div >   <ProfileLoader  width={"64px"} height={"45px"} fontSize={"12px"} fontWeight={600} Title={""}/></div>

                             }
                       
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-xxl-4 col-xl-4 col-lg-4 pt-2">
                          <p className="FiltreName">Filtre by email</p>
                          <div className="dropdown">
                            <div aria-labelledby="dropdownMenuButton1">
                            {email.length>0?
                              <Select
                                name="candiatEmail"
                                closeMenuOnSelect={true}
                                placeholder="‎ ‎ ‎ ‎ ‎  ‎ yourmail@mail.com"
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={handleEmailChange}
                                options={email}
                                styles={colourStyles}
                              />
  :
                        <div >   <ProfileLoader  width={"64px"} height={"45px"} fontSize={"12px"} fontWeight={600} Title={""}/></div>
                            }
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-xxl-4 col-xl-4 col-lg-4 pt-2">
                          <p className="FiltreName">Filtre by contact</p>
                          <div className="dropdown">
                            <div aria-labelledby="dropdownMenuButton1">
                        
                             {
ContactOptions.length>0 ?
<Select
name="candidatPhone"
closeMenuOnSelect={true}
placeholder="‎ ‎ ‎ ‎ ‎  ‎ Candidat's Phone Number"
className="basic-multi-select"
classNamePrefix="select"
onChange={handleContactChange}
options={ContactOptions}
styles={colourStyles}
/>
:
<div >   <ProfileLoader  width={"64px"} height={"45px"} fontSize={"12px"} fontWeight={600} Title={""}/></div>
                             }
                         
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-xxl-4 col-xl-4 col-lg-4 pt-2">
                          <p className="FiltreName">Filtre By Language</p>
                          <div className="dropdown">
                            <div aria-labelledby="dropdownMenuButton1">
                              {/* <select
                                name=""
                                className="form-select"
                                // onChange={handleSectorChange}
                                onChange={HandelLicence}
                              >
                                <option value="Select Un Secteur" className="fadeClass001" selected disabled hidden>Have licence</option>
                                <option value="true" onChange={HandelLicence}>Have Licence</option>
                                <option value="false" onChange={HandelLicence}>Doesn't Have Licence</option>
                              </select> */}
        {
                        LanguageOp.length > 0 ?
                        <Select
                        name="candidatLanguages"
                        closeMenuOnSelect={false}
                        isMulti
                        placeholder="‎ ‎ ‎Select Langues"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={LanguageChange}
                        options={LanguageOp}
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
                        <div className="col-2 d-flex align-items-center justify-content-end">
                        {selectedSector.length > 0 || selectedJob.length > 0 || selectedLanguages.length > 0 || SelectedName.length > 0 || MotivationArr.length > 0 || LicencePermisArr.length > 0 || DateArr.length > 0 || emailArr.length > 0 || contactArr.length > 0 || LanguageFilter.length > 0?

                          <p className="filterStyling  cursor-pointer mt-2" onClick={() => RestFilters()}>Reset Filters</p>
                          : null
                        }
                        </div>
                          <div className="col-2 d-flex justify-content-end">
                            <p className="filterStyling pt-2 cursor-pointer" onClick={() => setShowMore(false)}>Less Filters <img src={require("../../images/downup.svg").default} /></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>

                  :
                  <div className="extraPadding">
                    <div className="col-12">
                      <div className="row justify-content-end">
                      <div className="col-2 d-flex align-items-center justify-content-end">
                      {selectedSector.length === 0 || selectedJob.length === 0 || selectedLanguages.length === 0 || SelectedName.length === 0 || MotivationArr.length === 0 || LicencePermisArr.length === 0 || DateArr.length === 0 || emailArr.length == 0 || contactArr.length == 0 || LanguageFilter.length == 0?

<p className="filterStyling  cursor-pointer mt-2" onClick={() => RestFilters()}>Reset Filters</p>
: null
}   </div>
                        <div className="col-2 d-flex justify-content-end">
                          <p className="filterStyling pt-2 cursor-pointer" onClick={() => setShowMore(true)}>More Filters <img src={require("../../images/down.svg").default} /></p>
                        </div>
                      </div>
                    </div></div>
              }
            </div>
          </div>

                
                    <div className="col-md-6 col-xxl-4  col-xl-4 col-lg-4 col-sm-6 pl-0">
                    <div className="card card-color mb-1 px-0">
                <div onClick={viewFullProfile} className="card-upper cursor-pointer">
                    <div className="col-4">
                        <img
                            src={require("../../images/card-men.svg").default}
                            className="card-img-top"
                            alt="..."
                        />
                    </div>
                    <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-8 fontStylinForcards">
                    <p style={{width:"100%"}}  className="text-dark mb-0"><b>{filterData.candidatName.length > 20 ? filterData.candidatName.slice(0, 21).toLocaleUpperCase() + "..." : filterData.candidatName.toLocaleUpperCase()}</b></p>
                        <p className="text-dark mb-0">{filterData.candidatAge ?  <p className="age00 mb-0">Age : <b> {filterData.candidatAge}</b></p> : <b>Age Not Available!</b>}</p>
                        <div >  <p className="text-dark d-flex mb-0"> <b>{filterData.candidatMotivation ==0 ? candidatMotivationIcons[filterData.candidatMotivation + 1].icon +" "+ candidatMotivationIcons[filterData.candidatMotivation + 1].motivation :  candidatMotivationIcons[filterData.candidatMotivation].icon +" "+ candidatMotivationIcons[filterData.candidatMotivation].motivation}</b>
                        </p>
                        </div>
                       
                   
                </div>
                </div>
                <div className="col-12 ">
                        <div className="row cardColorRow">

                      
                        <div className="col-6 pd-00X1">
                    
                            <button className="todo p-0"><img src={require("../../images/briefcase.svg").default} /></button>
                        
                        </div>
                        <div className="col-6 d-flex justify-content-end mb-0 pd-00X1 px-0 form-group">
                        {
                                    filterData.candidatLicensePermis ?
                                        <div className="d-flex  justify-content-center align-items-center">
                                            <input type="checkbox" name="candidatLicensePermis" id="css" checked={filterData.candidatLicensePermis} />
                                            <label htmlFor="css" className="Licence">Have Licence</label>
                                        </div> :
                                       <div className="d-flex  justify-content-center align-items-center">
                                       <input type="checkbox" name="candidatLicensePermis" id="css" checked={filterData.candidatLicensePermis} />
                                       <label htmlFor="css" className="NoLicence">No Licence</label>
                                   </div>
                                }
                        </div>
                    </div>
                    </div>
  
                <div className="card-todoBody" style={{paddingLeft:"5px"}}>
{/*                
                    <p className="todoCardbody">Name : <b>{filterData.candidatName.toLocaleUpperCase()}</b></p>
                    <p className="todoCardbody">Age : <b>{filterData.candidatAge ? filterData.candidatAge : "Age Not Available!"}</b></p> */}
                    {/* <p className="todoCardbody">Motivation : <b>{candidatMotivationIcons[filterData.candidatMotivation - 1].icon + " " + candidatMotivationIcons[filterData.candidatMotivation - 1].motivation}</b> </p> */}
                    <p className="todoCardbody mb-0"><b>Secteur : {filterData.candidatActivitySector ?  filterData.candidatActivitySector.toLocaleUpperCase() : "No Sector!"}</b></p>

                    <p className="todoCardbody mb-0"><b>Job : {filterData.candidatJob ? filterData.candidatJob.toLocaleUpperCase() : "No Job!"}</b> </p>
                    <p className="todoCardbody-p mb-0">Langues : <b>{filterData.candidatLanguages.length !== 0 ? filterData.candidatLanguages.length > 3 ? filterData.candidatLanguages.slice(0,3).join(", ") + "...":  filterData.candidatLanguages.join(", ") : "No Langues Selected!"}</b>
                    </p>
                    <p className="todoCardbody-p mb-0">Phone Number : <b>{filterData.candidatPhone}</b> </p>
                    <p className="todoCardbody-p mb-0">Facebook URL : <b>{filterData.candidatFBURL ? <a href={filterData.candidatFBURL} target="_blank" className="fbURL">View Facebook Profile</a> : "No Facebook Profile!"}</b></p>
                    <p className="preCard-Body-p">Email :  <b> {filterData.candidatEmail ? filterData.candidatEmail.length > 20 ? filterData.candidatEmail.slice(0, 22).toLocaleUpperCase() + "..." : filterData.candidatEmail.toLocaleUpperCase() : "No Email Provided!"}</b></p>
                    <p className="todoCardbodyBlue py-1" style={{ color: date >= start && date <= end  ? "#3F76E2" : "#ca1313"}}>
                        Ready for work : {date >= start && date <= end  ? filterData.candidatStartDate  + "  To  " + filterData.candidatEndDate :   "⚠️" + filterData.candidatStartDate +"  To  " + filterData.candidatEndDate} 
                    </p>
                    </div>
            
                <div className="card-bodyTodo mb-1 py-0" >
                    <div className=""  style={{padding:"0px 5px"}}>
                    <div className="col-xxl-12 col-xl-12 col-md-12 col-lg-12 py-0 px-0 mt-0">
                        <div className="row">
                            <div className="col-xxl-6 col-xl-6 col-md-6 col-lg-6">
                                {/* <select className="selectOption firstoption" onChange={MoreOption}>
                                    <option  value="" disabled selected hidden>
                                        More options
                                    </option>
                                    <option value="editProfile">

                                        Edit Profile

                                    </option>
                                    <option value="moveProgress"  >

                                        Move to In Progress

                                    </option>
                                    <option value="Archive">

                                        Archive

                                    </option>
                                </select> */}
                 <Select
                    placeholder="More options"
                    options={CardOptions}
                    className="CardOptions AllMoreOp"
                    onChange={MoreOption}
                    isSearchable={false}
                 />
                            </div>
                            <div className="col-xxl-6 col-xl-6 col-md-6 col-lg-6  text-end pl-0">
                                <button className="btn btn-dark btn-viewprofile-card" onClick={viewFullProfile}>
                                    See Full Profile
                                </button>
                            </div>
                            {showInProgressModal ?
                                <PreSelectedModal props={filterData} closepreModal={setShowInProgressModal} /> : null
                            }
                            {showArchiveModal ?
                                <ArchivedModal props={filterData} closeModal={setShowArchiveModal} path={"/todolist"}  /> : null
                            }
                        </div>
                    </div>
                    </div>
                </div>
            </div>
   
                    </div>
                 
        </div>
      </div>
    </>
  );
}
export default ToDoList;
