import React, { useEffect, useState } from "react";
import "../../CSS/Canceled.css";
import ArchivedProfileCard from "../../components/ArchivedProfileCard";
import { API_BASE_URL } from "../../config/serverApiConfig";
import Loader from '../../components/Loader/loader'
import { colourOptions, ColourOption } from "../../Selecteddata/data";
import chroma from 'chroma-js'
import Select ,{StylesConfig }from 'react-select'
import ProfileLoader from "../../components/Loader/ProfilesLoader"
import toast,{Toaster} from 'react-hot-toast'
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import HideProfile from "../../components/Modal/HideProfileModalForArchived";
import ResetProfile from "../../components/Modal/RestProfileForArchived";
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
let FilterJob = [];
let LanguageFilter=[]
let ClientFL=[]
let SelectedClient=[]
function ArchivedList() {
 
    const {state}=useLocation()

  const [sectors, setSectors] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState([]);
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [filterData, setFilterData] = useState(state)as any;
  const [status, setStatus] = useState(Boolean);
  const [nameOptions, setNameOptions] = useState([])
  const [sectorOptions, setSectorOptions] = useState([]);
  const [jobOptions, setJobOptions] = useState([]);
  const [showMore, setShowMore] = useState(true)
  const [Clients,setClients]=useState([])
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
    console.log(jobs);
  }, [jobs]);
  useEffect(() => {
    console.log(sectors);
    let sectorops = sectors.map((asector) => {
      return { value: asector.sectorName, label: asector.sectorName, color: '#FF8B00' }
    })
    setSectorOptions([{value:"Select Sector",label:"Select Sector",color:"#ff8b00"},...sectorops]);

  }, [sectors])
   useEffect(() => {
    filterFunction()
  }
    , [selectedLanguages, selectedJob, selectedSector]);
 
    const fetchProfiles = async () => {
      return await fetch(API_BASE_URL + "allArchivedCandidats", {
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
  const fetchClients = async () => {
    return await fetch(API_BASE_URL + `getClientsForFilter`, {
      method: "GET",
      headers: {
        "Accept": 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
    })
      .then(resp => resp.json())
      .then(respData => respData)
      .catch(err => err)
  }
  useEffect(() => {
    if(LanguageOp.length == 0){
    setLangOp([{ value: 'Roumain', label: 'Roumain', color:  '#FF8B00' },
    { value: 'Français', label: 'Français', color:  '#FF8B00', },
    { value: 'Anglais', label: 'Anglais', color: '#FF8B00' },
    { value: 'Italien', label: 'Italien', color: '#FF8B00'  },
    { value: 'Russe', label: 'Russe', color: '#FF8B00' },
    { value: 'Espagnol', label: 'Espagnol', color: '#FF8B00'},
    { value: 'Autre', label: 'Autre', color: '#FF8B00' },
    { value: 'Suisse', label: 'Suisse', color: '#FF8B00' },])
    }
    if(Clients.length ==0){
      fetchClients().then((data)=>{
   let ClientOP:any= data.data.map((el)=>{
      return  { value: el, label:el, color: '#FF8B00' }
   })
   setClients([{value:"Select Client",label:"Select Client",color:"#ff8b00"},...ClientOP])
      })
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
  })
  const handleNameChange = (e: any) => {
    // console.log(e.target.value)
    SelectedName = []
    ClientFL=[]
    SelectedClient=[]
    LanguageFilter=[]
    setSelectedSector("")
    setSelectedJob([])
    if (e.value === "Select Name") {
      SelectedName = []
    filterFunction();
    } else if (e.value !== ""  && e.value!=="Select Name") {
      SelectedName = []
      let NameField = e.value;
      SelectedName.push(NameField)
    }
  };
  useEffect(()=>{
    setSelectedJob(FilterJob)

  },[selectedJob])
  const fetchAllJobs = async (sector: string) => {
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

  const handleSectorChange = (e: any) => {
    // console.log(e.target.value)
    SelectedName = []
    FilterJob = [];
    setSelectedJob([])
    LanguageFilter=[]
    ClientFL=[]
    SelectedClient=[]
    if  (e.value === "Select Sector") {
      setJobs([]);
      setSelectedSector("");
      setJobOptions([]);
      setLoader(true);

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

 

  const jobChange = async (jobval) => {
    let JobArr=[]
    jobval.map((el)=>{
     
     FilterJob.push(el.value)
  
    })
    filterFunction()
  } 

  const LanguageChange = async (lang) => {
 
setSelectedSector("")
SelectedName=[]
SelectedClient=[]

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
    console.log(LanguageFilter,"jee")
  }
  }

  
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
    // setLoader(false);
    // if (SelectedName.length > 0 ) {
    //   if (SelectedName.length > 0) {
       
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
    // }
    // if(SelectedClient.length >0){
    //   fetch(API_BASE_URL + `getCandidatsByClient/?clientCompanyName=${SelectedClient}`, {
    //     method: "GET",
    //     headers: {
    //       "Accept": 'application/json',
    //       "Authorization": "Bearer " + localStorage.getItem('token')
    //     },
    //   })
    //     .then(resp => resp.json())
    //     .then(respData => {
    //       respData.data.map((el)=>{
    //         ClientFL = el.employeesWorkingUnder.filter((el)=>{
    //           return el.candidatStatus == "Archived"
    //         })
    //       })
    //       {
    //        if( respData.status == false || ClientFL.length == 0 ){
           
    //         setLoader(true)
    //          setStatus(false)
    //        }else {
            
    //          setLoader(true)
    //          setStatus(true)
    //         setFilterData([...ClientFL])
    //         console.log([...ClientFL],"sab")
    //       }
    //     }
         
    //     })
    //             .catch(err => err)
    // }
    // if (
    //   selectedSector.length > 0 &&
    //   selectedJob.length == 0 &&
    //   selectedLanguages.length == 0
    // ) {
    //   fetch(
    //     `${API_BASE_URL}filterArchivedCandidatBySector/?sector=${selectedSector}`,
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
    //   selectedLanguages.length == 0
    // ) {
    //   console.log(FilterJob, "seletedjobss");
    //   await fetch(
    //     `${API_BASE_URL}filterArchivedSJ/?sector=${selectedSector}&jobs=${FilterJob}`,
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
    //   selectedLanguages.length > 0 &&
    //   selectedJob.length == 0
    // ) {
    //   await fetch(
    //     `${API_BASE_URL}filterArchivedSL/?sector=${selectedSector}&languages=${selectedLanguages}`,
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
    //   LanguageFilter.length > 0
    // ) {
    //   await fetch(
    //     `${API_BASE_URL}filterArchivedSJL/?sector=${selectedSector}&jobs=${FilterJob}&languages=${LanguageFilter}`,
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
    //   LanguageFilter.length > 0 &&
    //   selectedJob.length == 0 &&
    //   selectedSector.length == 0
    // ) {
    //   SelectedName=[]
    //   FilterJob=[]
    //   setSelectedSector("")  
    //   await fetch(
    //     `${API_BASE_URL}filterArchivedCandidatByLanguages/?languages=${LanguageFilter}`,
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
    // if (selectedSector.length === 0 && selectedJob.length === 0 && selectedLanguages.length === 0 && SelectedName.length === 0  && LanguageFilter.length ===0 && SelectedClient.length === 0 && FilterJob.length ===0 ) {
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



  const ClientChange=(e)=>{
    setSelectedSector("")
    LanguageFilter=[]
    if(e.value=="Select Client"){
      setSelectedSector("")
      LanguageFilter=[]
      SelectedName=[]
      ClientFL=[]
      SelectedClient=[]
      setClients([])
    }
    if(e.value){
     SelectedClient=[]
     SelectedClient.push(e.value)
     filterFunction();
  }

}
  const ResetFilters=()=>{

    setSectors([])
    setNameOptions([])
    SelectedName=[]
    LanguageFilter=[]
    setSelectedSector("")
    setSectorOptions([])
    setJobs([])
    setSelectedJob([])
    setLangOp([])
    setJobOptions([])
    ClientFL=[]
    setClients([])
    SelectedClient=[]
  toast.success("Filters Reset Successfully!")
    
  setTimeout(()=>{filterFunction()

  },1000)
    fetchAllSectors()
  }




  const navigate = useNavigate();
  const [hideProfile,setHideProfile]=useState(false)
  const [ResetModalProfile,setResetModalProfile]=useState(false)
  const [showArchiveModal, setShowArchiveModal] = useState(false)
  //  let data={state:filterData,path:"/archivedlist"}
  const candidatMotivationIcons = [{ icon: "😟", motivation: 'Disappointed' }, { icon: "🙁", motivation: 'Not Really' }, { icon: "😊", motivation: 'Like' }, { icon: "🥰", motivation: 'Great' }, { icon: "😍", motivation: 'Super Lovely' }];

  let data={profileData:filterData,path:"/archivedprofile"}
  const editCandidatProfile = () => {
    navigate("/editArchived", { state: data });
  };
  const viewFullProfile = () => {
      // navigate("/archivedprofile", { state: filterData })
      localStorage.setItem("archive", JSON.stringify(filterData))
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

    let start = new Date(filterData.candidatStartDate);
    let end = new Date(filterData.candidatEndDate);
 
  return (
    <>
     <Toaster position="top-right" containerStyle={{zIndex:"99999999999999999999999999"}} />
      <div className="container-fluid" style={{marginTop:"80px"}}>
        <div className="row pd">
               <div className="col-12 card-tops px-1" style={{ padding: "0px", marginBottom: "20px" }}>
            <div className="row text-start">
              <div className="card " style={{ padding: "15px 15px", borderRadius: "15px", marginBottom: "0px" }}>
                <div className="">
              <h1 className="fontStylingArchived">Candidats / Employes<span>Canceled/Archive</span></h1>
                 <p className="ArchivedChild">
                 Ici vous avez la liste des candidats ne travaillant<span> pas encore avec nous </span>
                  </p>
                  <p className="ArchivedChild">
                  Here you have the list of candidates who have been fired or
              archived
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 bg-white p-2 rounded001 mb-1">
            <div className="row ">
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                <p className="filtersLabel">Filtre by name</p>
                <div className="dropdown">
                  <div aria-labelledby="dropdownMenuButton1">
                    {
                      nameOptions.length > 0 ?
                        <Select
                          name="candidatName"
                          closeMenuOnSelect={true}
                          placeholder="‎ ‎ ‎ Select Un Candidat"
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
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                <p className="filtersLabel">Filtre Secteur d’activité</p>
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
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 JobPD">
                <p className="filtersLabel">Filtre selection métier / job</p>
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
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 pt-1">
                          <p className="filtersLabel">Filtre by Client</p>
                          <div className="dropdown">
                            <div aria-labelledby="dropdownMenuButton1">
                              {
                                Clients.length > 0?
                                 
                                <Select
                                name="ClientFilter"
                                closeMenuOnSelect={true}
                                placeholder="‎ ‎ ‎ Select Filtre by Client"
                                className="basic-multi-select"
                                classNamePrefix="select"
                                styles={colourStyles}
                                options={Clients}
                                onChange={ClientChange}
                              />
                                :
       <div className="">   <ProfileLoader  width={"64px"} height={"45px"} fontSize={"12px"} fontWeight={600} Title={""}/></div>
                              
                              }
                        
                            </div>
                          </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 pt-1">
                          <p className="filtersLabel ">Filtre Langues du candidat</p>
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
                    <div className="extraPadding">
                      <div className="col-12">
                        <div className="row justify-content-end">
                        <div className="col-2 d-flex justify-content-end">
                      {selectedSector.length > 0 || selectedJob.length > 0 || selectedLanguages.length > 0 || SelectedName.length > 0 || LanguageFilter.length>0 || SelectedClient.length > 0 ?

<p className="filterStyling  cursor-pointer mt-2" onClick={() => ResetFilters()}>Reset Filters</p>
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
                      <div className="col-2 d-flex justify-content-end">
                      {selectedSector.length > 0 || selectedJob.length > 0 || selectedLanguages.length > 0 || SelectedName.length > 0 || LanguageFilter.length>0  || SelectedClient.length > 0 ?

<p className="filterStyling  cursor-pointer mt-2" onClick={() => ResetFilters()}>Reset Filters</p>
: null
}
</div>
                        <div className="col-2 d-flex justify-content-end">
                          <p className="filterStyling pt-2 cursor-pointer" onClick={() => setShowMore(true)}>More Filters <img src={require("../../images/down.svg").default} /></p>
                        </div>
                      </div>
                    </div></div>
              }
            </div>
          </div>
       
         
            <>
        
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-1 pd-left">
                        <div className="card card-color mt-1 mb-0">
                <div className="card-upper cursor-pointer" onClick={()=>viewFullProfile()}>
                    <div className="col-4">
                        <img
                            src={require("../../images/card-men.svg").default}
                            className="card-img-top"
                            alt="..."
                        />
                    </div>
                    <div className="col-7 ArchivedCard pt-1 px-0" >
                    <p style={{width:"100%"}} className="text-dark mb-0"><b>{filterData.candidatName.length > 20 ? filterData.candidatName.slice(0, 21).toLocaleUpperCase() + "..." : filterData.candidatName.toLocaleUpperCase()}</b></p>
                    <p className="text-dark mb-0">{filterData.candidatAge ?  <p className="age00 ml-0 mb-0">Age : <b> {filterData.candidatAge}</b></p> : <b>Age Not Available!</b>}</p>
                        <div >  <p className="text-dark d-flex"> <b>{candidatMotivationIcons[filterData.candidatMotivation - 1].icon + " " + candidatMotivationIcons[filterData.candidatMotivation - 1].motivation}</b>
                        </p>
                        </div>
                        
                    </div>
                </div>
                <div className="col-12 ">
                        <div className="row cardColorRowArchived">

                      
                        <div className="col-6 ">
                   
                            <button className="ArchivedCardBtn p-0"><img src={require("../../images/ArchivedBtn.svg").default} /></button>
                        
                        </div>
                        <div className="col-6 d-flex justify-content-end mb-0 pd-00X1 form-group">
                        {
                                    filterData.candidatLicensePermis ?
                                        <div className="d-flex  justify-content-center align-items-center">
                                            <input type="checkbox" name="candidatLicensePermis" id="css" checked={filterData.candidatLicensePermis} />
                                            <label htmlFor="css" className="Licence mb-0">Have Licence</label>
                                        </div> :
                                       <div className="d-flex  justify-content-center align-items-center">
                                       <input type="checkbox" name="candidatLicensePermis" id="css" checked={filterData.candidatLicensePermis} />
                                       <label htmlFor="css" className="NoLicence mb-0">No Licence</label>
                                   </div>
                                }
                        </div>
                    </div>
                    </div>
                <div className="card-body pl-0">
                <div className="px-0  mb-1 ArchivedCardChildFonts" style={{marginLeft:"6px"}}>
                    {/* <p>Name:  <b>{filterData.candidatName}</b> </p> */}
                    {/* <p>Age: <b>{filterData.candidatAge}</b></p> */}
                    <p>Secteur: <b> {filterData.candidatActivitySector ?  filterData.candidatActivitySector.toLocaleUpperCase() : "No Sector!"}</b></p>
                    <p>Job: <b> {filterData.candidatJob ? filterData.candidatJob.toLocaleUpperCase() : "No Job!"}</b></p>
                    <p>Candidats age: <b>{filterData.candidatAge ? filterData.candidatAge +"years old" : "Age Not Available!"}</b></p>
                    <p>Langues:  <b>  {filterData.candidatLanguages ? filterData.candidatLanguages.length > 3 ? filterData.candidatLanguages.slice(0,3).join(", ") + "..." : filterData.candidatLanguages.join(", "): "No Langues Selected!"} </b></p>
                    <p>Phone Number:  <b>{filterData.candidatPhone}</b></p>
                    <p>Facebook URL:  <b>{filterData.candidatFBURL ? <a href={filterData.candidatFBURL} target="_blank" className="fbURL">View Facebook Profile.</a> : "No Facebook Profile!"}</b></p>
                    <p>Email: <b>{filterData.candidatEmail ? filterData.candidatEmail.length > 20 ? filterData.candidatEmail.slice(0, 22).toLocaleUpperCase() + "..." : filterData.candidatEmail.toLocaleUpperCase() : "No Email Provided!"}</b> </p>
                    <p className=" my-1"  style={{ color: date >= start && date <= end  ? "#3F76E2" : "#ca1313"}}><b>Ready for work: {date >= start && date <= end  ? filterData.candidatStartDate  + "  To  " + filterData.candidatEndDate :   "⚠️" + filterData.candidatStartDate +"  To  " + filterData.candidatEndDate } </b></p>
                    </div>
                    <div className="box-red pl-1">
                        <p> <b>REASON WHY CANCELED</b> : </p><span> {filterData.candidatArchived?.reason ? filterData.candidatArchived?.reason : "No Reason Specified!"}</span>

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
        <HideProfile props={filterData} closeModal={setHideProfile}  path={"/todolist"}/>
        :
        null
       }
        {
        ResetModalProfile?
        <ResetProfile props={filterData} closeModal={setResetModalProfile}  path={"/todolist"}/>
        :
        null
       }

                </div>
            </div>
                        </div>
                    
                  
            </>
       
        </div>
      </div>
    </>
  );
}
export default ArchivedList;
