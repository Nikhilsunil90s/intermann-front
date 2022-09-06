import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import "../CSS/Embauch.css";
import EmbaucheProfileCard from "../components/EmbaucheProfileCard";
import { API_BASE_URL } from "../config/serverApiConfig";
import toast, { Toaster } from "react-hot-toast";
import Item from "../components/Loader/loader";
import Select ,{StylesConfig }from 'react-select'
import chroma from 'chroma-js'
import SelectLoader from "../components/Loader/selectLoader"
import { colourOptions, ColourOption } from "../Selecteddata/data";
import ProfileLoader from "../components/Loader/ProfilesLoader"
import set from "date-fns/set";
import ErrorLoader from '../components/Loader/SearchBarError'
import Error404Loader from '../components/Loader/404Error'


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
let FilterJob = []as any;
let ClientFL=[]
let LanguageFilter=[]
let SelectedClient=[]
let LicencePermisArr = []as any
function Embauch() {

// Notification // 
const notifyMoveSuccess = () => toast.success("Moved Archived Successfully!");
const notifyMoveError = () => toast.error("Not Moved..");
  //    End   // 

  const [sectors, setSectors] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState([]);
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [Loader, setLoader] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [status, setStatus] = useState(Boolean);
  const [nameOptions, setNameOptions] = useState([])
  const [sectorOptions, setSectorOptions] = useState([]);
  const [jobOptions, setJobOptions] = useState([]);
  const [showMore, setShowMore] = useState(true)
  const [Clients,setClients]=useState([])
  const [LanguageOp,setLangOp]=useState([])
  const [licenceOptions, setLicenseOptions] = useState([])
  const [dateLoader,setdateLoader]=useState(false)
  const [filterLoader ,setFetchingLoader  ]=useState(true)
  const [cardTotallength,setTotalLength]=useState(0)
  let [page, setPage] = useState(0);
  const [LoaderTime,setLoaderTime]=useState(false)

  



  
  const loadMoreHandle = (i) => {
    let bottom =i.target.scrollHeight - i.target.clientHeight - i.target.scrollTop < 10;
    console.log(bottom,"bottom")
    if (bottom) {
      if(cardTotallength > page &&selectedSector.length === 0 && selectedJob.length === 0 && selectedLanguages.length === 0 && SelectedName.length === 0 && SelectedClient.length === 0 && LanguageFilter.length === 0 && LicencePermisArr.length ===0){
        setPage(page + 20);
        setFetchingLoader(false)
        fetchProfileS(page);
        setLoader(true);

    
      }
      
       
    }
}

const LoaderFun=()=>{

    setTimeout(()=>{
      setLoaderTime(true)
     },15000)
  }

//   useEffect(() => {
//     fetchProfileS(page);
// }, [page]);



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
    if(Clients.length ==0){
      let ClientOP =[]
      fetchClients().then((data)=>{
        ClientOP = data.data.map((el)=>{
      return  { value: el, label:el, color: '#FF8B00' }
   })

   setClients([{value:"Select Client",label:"Select Client",color:"#ff8b00"},...ClientOP])
      })
    }
    if(dateLoader == false){
      setTimeout(()=>{
        setdateLoader(true)

      },1000)
    }
    if(LanguageOp.length == 0){
      setTimeout(()=>{
      setLangOp([{ value: 'Roumain', label: 'Roumain', color:  '#FF8B00' },
      { value: 'Français', label: 'Français', color:  '#FF8B00', },
      { value: 'Anglais', label: 'Anglais', color: '#FF8B00' },
      { value: 'Italien', label: 'Italien', color: '#FF8B00'  },
      { value: 'Russe', label: 'Russe', color: '#FF8B00' },
      { value: 'Espagnol', label: 'Espagnol', color: '#FF8B00'},
      { value: 'Autre', label: 'Autre', color: '#FF8B00' },
      { value: 'Suisse', label: 'Suisse', color: '#FF8B00' },
    ])},1000)
      }
      if(licenceOptions.length == 0){
        setTimeout(()=>{
        setLicenseOptions([    {
          value: "Select Licence", label: "Select Licence", color: '#FF8B00'
        },
        {
          value: "true", label: "Have Licence", color: '#FF8B00'
        },
        {
          value: "false", label: "No Licence", color: '#FF8B00'
        }])
      },1000)
      }
 
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
setTimeout(()=>{
    setSectorOptions([{value:"Select Sector",label:"Select Sector",color:"#ff8b00"},...sectorops]);
  },1000)
  }, [sectors])
  useEffect(() => {
    filterFunction();
  }, [selectedLanguages, selectedJob, selectedSector]);

  const fetchProfiles = async () => {
    return await fetch(API_BASE_URL + "allInProgressCandidats", {
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
  
  const fetchProfileS = async (page) => {
    return await fetch(API_BASE_URL + `inProgressCandidats/?skip=${page}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((resD) => resD.json())
      .then((reD) => 
      
      {
       
        if(cardTotallength > page){
          setFetchingLoader(false)
        let resultArr = [...filterData,...reD]
        setFilterData([...resultArr])
      
      }
      if(cardTotallength < page){
        setFetchingLoader(true)
        return true
      }
      if(filterData.length === 0){
        setFetchingLoader(true)
        setFilterData([...reD])



  }
      }
      )
      .catch((err) => err);
  };



  useEffect(() => {
    if (nameOptions.length == 0) {
      fetchProfiles().then((profilesResult) => {
        if(cardTotallength === 0){
          setTotalLength(profilesResult.length)
        }
        let nameops = profilesResult.map((pro) => {
          return { value: pro.candidatName, label: pro.candidatName, color: '#FF8B00' }
        })
        setNameOptions([{value:"Select Name",label:"Select Name",color:"#ff8b00"},...nameops])
      }).catch(err => {
        console.log(err)
      })
    }
  })

  const HandelLicence = (e) => {
    LicencePermisArr = []
    SelectedName = []
    SelectedClient = []
    LanguageFilter=[]
    setSelectedSector("")
    console.log(e.value)
    if(e.value=="Select Licence"){
      LicencePermisArr=[]
      filterFunction()
    }
    if(e.value !=="" && e.value !=="Select Licence"){
    LicencePermisArr.push(e.value)
    filterFunction()
    }
  }   

  const handleNameChange = (e: any) => {
    // console.log(e.target.value)
    SelectedName = []
    LanguageFilter=[]
    LicencePermisArr = []
    setSelectedSector("")
    setSelectedJob([])
    ClientFL=[]
    SelectedClient=[]
    setFilterData([])
    if (e.value === "Select Name") {
      SelectedName = []
    filterFunction();
    }    else if (e.value !== "" && e.value!=="Select Name") {
      SelectedName = []
      let NameField = e.value;
      SelectedName.push(NameField)
      filterFunction();
    }
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

  const handleSectorChange = (e: any) => {
    // console.log(e.target.value)
    SelectedName = []
    FilterJob = [];
    LanguageFilter=[]

  
    LicencePermisArr = []
    ClientFL=[]
    SelectedClient=[]
      setSelectedSector("");
      setSelectedJob([])
    console.log(e)
    if (e.value === "Select Sector") {
      setJobs([]);
      setSelectedSector("");
      setJobOptions([]);
    filterFunction()

    } else if (e.value !== '' && e.value !== "Select Sector") {
    debugger;
       
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

  // useEffect(()=>{
  //   setSelectedJob(FilterJob)

  // },[selectedJob])

  const filterFunction = async () => {
    setLoader(false);
    setLoaderTime(false)
    setFetchingLoader(true)
   if (SelectedName.length > 0 ) {
      if (SelectedName.length > 0) {
       
        fetch(`${API_BASE_URL}getCandidats/?candidatName=${SelectedName}`, {

          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
          .then((reD) => reD.json())
          .then((result) => {
            {
              // setFilterData([...result.data]);
              // console.log(result,"result")
              setFilterData([...result.data]);
            }
            // setStatus(result.status);
          })
          .catch((err) => err);
        setLoader(true);
      }
    }
    if(SelectedClient.length > 0){
      fetch(API_BASE_URL + `getCandidatsByClient/?clientCompanyName=${SelectedClient}`, {
           method: "GET",
           headers: {
             "Accept": 'application/json',
             "Authorization": "Bearer " + localStorage.getItem('token')
           },
         })
           .then(resp => resp.json())
           .then(respData => {
             respData.data.map((el)=>{
               ClientFL = el.employeesWorkingUnder.filter((el)=>{
                 return el.candidatStatus == "In-Progress"
               })
             })
             {
              if( respData.status == false || ClientFL.length == 0 ){
              
               setLoader(true)
                setStatus(false)
              }else {
               
                setLoader(true)
                setStatus(true)
               setFilterData([...ClientFL])
             }
           }
            
           })
                   .catch(err => err)
       }
      
       if(LicencePermisArr.length > 0 ){
        setFilterData([])
        SelectedName = []
        setLoaderTime(false)
        fetch(`${API_BASE_URL}getCandidats/?candidatLicensePermis=${LicencePermisArr}&candidatStatus=In-Progress`, {

          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
          .then((reD) => reD.json())
          .then((result) => {
            if(result.total === 0){
              setLoader(true) 
              setStatus(false)
                 }else{
               setFilterData([...result.data]) ; setLoader(true); setStatus(true)
               } 
          })
          .catch((err) => err);
        setLoader(true);
       }
    
    if (
      selectedSector.length > 0 &&
      FilterJob.length == 0 &&
      LanguageFilter.length == 0
    ) {
   
      fetch(
        `${API_BASE_URL}filterInProgressCandidatBySector/?sector=${selectedSector}`,
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
        .then((result) => {
          if(result.status == true){
            setLoader(true)
            setStatus(true)
            setFilterData([...result.data]);
          }
          if(result.status == false){
            setLoader(true)
            setFetchingLoader(false)
            setStatus(false)
            setFilterData([])
          }
          
        })
        .catch((err) => err);

     
    }
    if (
      selectedSector.length > 0 &&
      FilterJob.length > 0 &&
      selectedLanguages.length == 0
    ) {
      await fetch(
        `${API_BASE_URL}filterInProgressSJ/?sector=${selectedSector}&jobs=${FilterJob}`,
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
        .then((result) => {
          if(result.status == true){
            setLoader(true);
            setStatus(true);
            setFilterData([...result.data]);
          }
          if(result.status == false){
            setLoader(true);
            setStatus(false);
          } 
        })
        .catch((err) => err);

     
    }

    if (
      selectedSector.length > 0 &&
      selectedLanguages.length > 0 &&
      selectedJob.length == 0
    ) {
      await fetch(
        `${API_BASE_URL}filterInProgressSL/?sector=${selectedSector}&languages=${selectedLanguages}`,
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
        .then((result) => {
          {
            setFilterData([...result.data]);
          }
          setStatus(result.status);
        })
        .catch((err) => err);
      setLoader(true);
     
    }
    if (
      selectedSector.length > 0 &&
      FilterJob.length > 0 &&
      selectedLanguages.length === 0
    ) {
      await fetch(
        `${API_BASE_URL}filterInProgressSJL/?sector=${selectedSector}&jobs=${FilterJob}&languages=${selectedLanguages}`,
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
        .then((result) => {
          {
            setFilterData([...result.data]);
          }
          setStatus(result.status);
        })
        .catch((err) => err);
      setLoader(true);
     
    }
    if (
      LanguageFilter.length > 0 &&
      selectedJob.length == 0 &&
      selectedSector.length == 0
    ) {
      await fetch(
        `${API_BASE_URL}filterInProgressCandidatByLanguages/?languages=${LanguageFilter}`,
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
        .then((result) => {
          {
            setFilterData([...result.data]);
          }
          setStatus(result.status);
        })
        .catch((err) => err);
      setLoader(true);

    }
    if (selectedSector.length === 0 && selectedJob.length === 0 && selectedLanguages.length === 0 && SelectedName.length === 0 && SelectedClient.length === 0 && LanguageFilter.length === 0 && LicencePermisArr.length ===0) {
      {
        setLoader(true)
        setStatus(true)
        fetchProfileS(page)
          .catch(err => {
            console.log(err);
          })
      }
    }
  
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
    setSelectedLanguages([])
  };

  useEffect(() => {
    fetchProfiles();
  }, []);
  const LanguageChange = async (lang) => {
 
    setSelectedSector("")
    SelectedName=[]
    LicencePermisArr = []
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
      if(LanguageFilter.length == 0){
        filterFunction()
      }
      }
 
  const jobChange = (jobval) => {
    let Arr=[]
    jobval.map((el)=>{
          Arr.push(el.value)
      })
      FilterJob=Arr
        filterFunction()
  }
 

  const ClientChange=(e)=>{
    setSelectedSector("")
    LanguageFilter=[]
    SelectedName=[]
    LicencePermisArr = []
     if(e.value){
      SelectedClient=[]
      SelectedClient.push(e.value)
      filterFunction();
     }

    // setFilterData([...ClientFL])

  }

console.log(filterData,"filter")
  
 const RestFilters=()=>{
  setSectors([])
  setNameOptions([])
  SelectedName=[]
  setSelectedSector("")
  setdateLoader(false)
  LicencePermisArr = []
  setSectorOptions([])
  setLicenseOptions([])
  setSelectedJob([])
  setJobOptions([])
  setLangOp([])
  ClientFL=[]
  setClients([])
  SelectedClient=[]
  toast.success("Filters Reset Successfully!")
  fetchAllSectors()
 setTimeout(()=>{
  filterFunction()
},1000)

}

  return (
    <>
      <Toaster position="top-right" containerStyle={{zIndex:"99999999999999999999999999"}} />
      <div className="container-fluid mt-1 cardScrollBar" onScroll={loadMoreHandle}>
        <div className="row pd">
          <div className="col-12 card-tops px-1 mt-1" style={{ padding: "0px", marginBottom: "20px" }}>
            <div className="row text-start">
              <div className="card " style={{ padding: "15px 15px", borderRadius: "15px", marginBottom: "0px" }}>
                <div className="">
              <h1 className="fontStylingEmbauche">Candidats / Employes <span>Embauché / In Progress</span></h1>
                 <p className="embauchChild ">
                 Ici vous avez la liste des candidats ne travaillant <span>pas encore avec nous</span> 
                  </p>
                  <p className="embauchChild mb-0">
                  Vous devez toujours vous assurer d’avoir un maximum d’information sur cette liste et déplacer les candidats en archive si plus d’actualité 
                  </p>
                </div>
              </div>
            </div>
          </div>
        
             <div className="col-12 bg-white p-2 rounded001 mb-1">
            <div className="row ">
              <div className="col-lg-4 col-md-6 col-sm-6">
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
              <div className="col-lg-4 col-md-6 col-sm-6 mb-1">
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
                      /> : 
                      
                      <div className="">   <ProfileLoader  width={"64px"} height={"45px"} fontSize={"12px"} fontWeight={600} Title={""}/></div>

                    }
                   
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
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
                    <div className="col-12 pt-1">
                      <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-6 pt-1">
                          <p className="filtersLabel">Filtre by Client</p>
                          <div className="dropdown">
                            <div aria-labelledby="dropdownMenuButton1">
                            {Clients.length > 0 ?
                              <Select
                                name="ClientFilter"
                                closeMenuOnSelect={true}
                                placeholder="‎ ‎ ‎Filter by Client"
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
                        <div className="col-md-6 col-xxl-4 col-xl-4 col-lg-4 pt-1">
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
                      </div>
                    </div>
                    <div className="extraPadding">
                      <div className="col-12">
                        <div className="row justify-content-end">
                        <div className="col-2 d-flex justify-content-end">
                      {selectedSector.length > 0 || selectedJob.length > 0 || selectedLanguages.length > 0 || SelectedName.length > 0 || SelectedClient.length > 0 || LanguageFilter.length > 0 || LicencePermisArr.length > 0 ?

<p className="filterStyling  cursor-pointer mt-2" onClick={() => RestFilters()}>Reset Filters</p>
: null
}
</div>

                          <div className="col-2 d-flex justify-content-end">
                            <p className="filterStyling pt-2 cursor-pointer" onClick={() => setShowMore(false)}>Less Filters <img src={require("../images/downup.svg").default} /></p>
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
                      {selectedSector.length > 0 || selectedJob.length > 0 || selectedLanguages.length > 0 || SelectedName.length > 0 || SelectedClient.length > 0 || LanguageFilter.length > 0  || LicencePermisArr.length > 0 ?

<p className="filterStyling  cursor-pointer mt-2" onClick={() => RestFilters()}>Reset Filters</p>
: null
}
</div>

                        <div className="col-2 d-flex justify-content-end">
                          <p className="filterStyling pt-2 cursor-pointer" onClick={() => setShowMore(true)}>More Filters <img src={require("../images/down.svg").default} /></p>
                        </div>
                      </div>
                    </div></div>
              }
            </div>
          </div>
         
            {Loader ? 
                <>
                  {status ? 
                    filterData.length > 0 ? 
                      filterData.map((profile, index) => (
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 mt-1  pr-0">
                          <EmbaucheProfileCard path={false} props={profile}  NottifySuccess={notifyMoveSuccess} NottifyErr={notifyMoveError}  />
                        </div>
                      ))
             
                     : 
                      <div className="col-12">
                        <div className="row d-flex justify-content-center">
                        <>{LoaderTime ?  <Error404Loader /> : <> <Item />{LoaderFun()}</>}</>
                        </div>
                      </div>
                    
                  : 
                
                     <div className="col-12 d-flex justify-content-center align-items-center">
                     <ErrorLoader />
                     <p className="ErrorSearchBox mb-0">
                     No Profiles in Candidat Embauch! Please Add New Candidats.
                     </p>
                     </div>
                  }
            </>
          : 
            <div className="col-12">
              <div className="row d-flex justify-content-center">
                <Item />
              </div>
            </div>
          }

<> {filterLoader ? status ?  null : <Item /> : null}</>
        </div>
      </div>
    </>
  );
}
export default Embauch;
