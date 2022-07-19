import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarRatings from 'react-star-ratings';
import "../../CSS/Client/ClientTodo.css";
import ClientToDoCard from "../../pages/ClientPages/ClientTodoCard";
import { Toaster } from 'react-hot-toast';
import Loader from "../../components/Loader/loader";
import { API_BASE_URL } from '../../config/serverApiConfig';
import { colourOptions, ColourOption } from "../../Selecteddata/data";
import SelectLoader from "../../components/Loader/selectLoader"
import chroma from 'chroma-js';
import Select, { GroupBase, StylesConfig } from "react-select";
import {ReactComponent as RatingStar} from "../../images/RatingStar.svg"
import {ReactComponent as Empty} from "../../images/emptyStar.svg"
import Switch from "react-switch";

declare namespace JSX {
  interface IntrinsicElements {
    "lottie-player": any;
  }
}
let SelectedName = []
let FilterJob = [];
let MotivationArr = []
let OthersFilterArr = []
let DateArr=[]
let Importance=[]
function ClientToDoList() {

  const [loader,setLoader] = useState(true);
  const [sectors,setSectors] = useState([]);
  const [jobs,setJobs] = useState([]);
  const [selectedJob,setSelectedJob] = useState([]);
  const [nameOptions, setNameOptions] = useState([])   
  const [sectorOptions, setSectorOptions] = useState([]);
  const [jobOptions, setJobOptions] = useState([]);
  const [EmailCheck,setEmailCheck] = useState(false)
  const [PhoneNumberMissing,setMissing]=useState(false)
  const [selectedSector,setSelectedSector] = useState("");
  const [selectedLanguages,setSelectedLanguages] = useState([]);
  const [filterData,setFilterData] = useState([]);
  const [status,setStatus] = useState(Boolean);
  const [showMore, setShowMore] = useState(false)
  const [optionsOthersFilter, setLicenseOptions] = useState([
    {
      value: "Offre envoyé", label: "Offre envoyé ?", color: '#FF8B00'
    },
    {
      value: "Signature digitale envoyé ?", label: "Signature digitale envoyé ?", color: '#FF8B00'
    },
    {
      value: "Contrat singé ?", label: "Contrat singé ?", color: '#FF8B00'
    },
    {
      value: "Publicité commencé ?", label: "Publicité commencé ?", color: '#FF8B00'
    },
    {
      value: "A1 ?", label: "A1 ?", color: '#FF8B00'
    },
    {
      value: "Assurance faite ?", label: "Assurance faite ?", color: '#FF8B00'
    },
    {
      value: "Agence de voyage ok ?", label: "Agence de voyage ok ?", color: '#FF8B00'
    },
    {
      value: "SISPI déclaré ?", label: "SISPI déclaré ?", color: '#FF8B00'
    }
  ])
  const [motivationOptions, setMotivationOptions] = useState([
    {
      value: "1", label: "Dissapointed", color: '#FF8B00'
    }, {
      value: "2", label: "Not really", color: '#FF8B00'
    }, {
      value: "3", label: "Like", color: '#FF8B00'
    }, {
      value: "4", label: "Great", color: '#FF8B00'
    }, {
      value: "5", label: "Superlovely", color: '#FF8B00'
    }
  ])
  const [importanceOptions, setImportanceOptions] = useState([
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
    }
  ])as any
  console.log(status)
  console.log(selectedSector,selectedJob,"allfield")
 
 
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


  const MissingHandler=(checked,e,id)=>{
    console.log(id,"id")
    if(id=="EmailMissing"){
    setEmailCheck(checked)
    }
    if(id=="PhoneNumberMissing"){
      setMissing(checked)
    }
  }

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

    setSectorOptions([...sectorops]);
  }, [sectors])
 
  useEffect(() => {
    filterFunction();
  }, [selectedLanguages, selectedJob, selectedSector]);
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
    SelectedName = []
    Importance=[]
    MotivationArr = []
    OthersFilterArr = []
    setSelectedSector("")
    setSelectedJob([])
    if (e.value === "Select Un Name") {
      SelectedName = []

    }
    else if (e.value !== "") {
      SelectedName = []
      MotivationArr = []
      let NameField = e.value;
      SelectedName.push(NameField)
    }
  };

  const HandelOthers = (e) => {
    SelectedName = []
    setSelectedSector("")
    Importance=[]
    MotivationArr = []
    FilterJob=[]
    console.log(e.value)
    OthersFilterArr.push(e.value)
    filterFunction()
  }
  const handleMotivationChange = (e: any) => {
    // console.log(e.target.value)
    MotivationArr = []
    Importance=[]
    OthersFilterArr = []
    setSelectedSector("")
    SelectedName = []
    if (e.value === "Select Motivation") {
      MotivationArr = []
      filterFunction()
      setLoader(true);

    } else if (e.value !== "") {
      MotivationArr = []
      let sectorField = e.value;

      console.log(sectorField, "motivation")
      MotivationArr.push(sectorField)
      filterFunction()
      // setSelectedSector(sectorField);
    }
  };

  const fetchProfiles = async () => {
    return await fetch(API_BASE_URL + "allToDoClients", {
      method: "GET",
      headers: {
        "Accept": 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    })
      .then(resD => resD.json())
      .then((reD) => reD)
      .catch(err => err)
  }
 const importanceHandel=(e)=>{
  SelectedName = []
  setSelectedSector("")
  MotivationArr = []
  FilterJob=[]
  Importance=[]
   Importance.push(e.value)
 }

  

  const handleSectorChange = (e: any) => {
    // console.log(e.target.value)

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

    } else if (e.value !== '') {
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
  }
    else {
      if(FilterJob.length===1){
        FilterJob=[]
      }
     FilterJob= FilterJob.filter((item)=>{return item !==job.jobName})
      setSelectedJob(FilterJob)
     
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

  const filterFunction = async () => {
    setLoader(false);
    setStatus(false)
    if(selectedSector.length === 0 && selectedJob.length === 0 && selectedLanguages.length === 0){
      setLoader(true)
      setStatus(true)
      fetchProfiles().then((res)=>setFilterData([...res]))
      .catch(err => {
        console.log(err);
      })
    }
    if (
      selectedSector.length > 0 &&
      selectedJob.length == 0 &&
      selectedLanguages.length == 0
    ) {
      fetch(
        `${API_BASE_URL}filterToDoClientBySector/?sector=${selectedSector}`,
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
        .then(result => {
          setFilterData([...result.data])      
        setStatus(result.status)
      })
        .catch((err) => err);
      setLoader(true);
    }
   
    if (
      selectedSector.length > 0 &&
       FilterJob.length > 0 &&
      selectedLanguages.length == 0
    ) {
    
        await fetch(
          `${API_BASE_URL}filterToDoClientSJ/?sector=${selectedSector}&jobs=${selectedJob}`,
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
            setFilterData([...result.data]);      
          setStatus(result.status)
          
          })
          .catch((err) => err);
        setLoader(true);  

    }
  

    if (
      selectedSector.length > 0 &&
      selectedLanguages.length > 0 &&
      selectedJob.length == 0
    ) {
      await fetch(
        `${API_BASE_URL}filterToDoClientSL/?sector=${selectedSector}&languages=${selectedLanguages}`,
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
          setFilterData([...result.data]);      
          setStatus(result.status)
        
        })
        .catch((err) => err);
      setLoader(true);
    }
    if (
      selectedSector.length > 0 &&
      selectedJob.length > 0 &&
      selectedLanguages.length > 0
    ) {
      await fetch(
        `${API_BASE_URL}filterToDoClientSJL/?sector=${selectedSector}&jobs=${selectedJob}&languages=${selectedLanguages}`,
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
          setFilterData([...result.data]);      
          setStatus(result.status)
        
        })
        .catch((err) => err);
      setLoader(true);
    }

    if (
      selectedLanguages.length > 0 &&
      selectedJob.length == 0 &&
      selectedSector.length == 0
    ) {
      await fetch(
        `${API_BASE_URL}filterToDoClientByLanguages/?languages=${selectedLanguages}`,
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
          setFilterData([...result.data]);      
          setStatus(result.status)
        
        })
        .catch((err) => err);
      setLoader(true);
    }
  };

  useEffect(() => {
    if (nameOptions.length == 0) {
      fetchProfiles().then((profilesResult) => {
        let nameops = profilesResult.map((pro) => {
          return { value: pro.clientCompanyName, label: pro.clientCompanyName, color: '#FF8B00' }
        })
        console.log(nameops,"console")
        setNameOptions([...nameops])
      }).catch(err => {
        console.log(err)
      })
    }
    console.log(nameOptions," console.log()")
  }, []);
 
  const jobChange = async (jobval) => {
    // console.log(jobval)
    let JobArr=[]
    jobval.map((el)=>{
     
     JobArr.push(el.value)
  
    })
    FilterJob=JobArr
    filterFunction()
  }
  return (
    <>
      <Toaster position="top-right" />
      <div className="container-fluid">
        <div className="row pd ">
          <div className="col-12 text-center">
            <div className="row text-start">
            <div className="card " style={{ padding: "15px 15px", borderRadius: "15px", marginBottom: "0px" }}>
            <div className="">
         <p className="ClientTOPFamily">Clients / Lead <span> List To Do</span></p>
         <p className="child-text mb-0">Ici vous avez la liste des sociétés qui font une  <b> demande pas encore traité</b></p>
         <p className="child-text">Vous devez toujours vous assurer d’avoir un maximum d’information sur cette liste et déplacer les leads en archive si plus d’actualité </p>
            </div>
            </div>
            </div>
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
                          placeholder="‎ ‎ ‎ Select Un Candidat"
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={handleNameChange}
                          options={nameOptions}
                          styles={colourStyles}
                        /> :<SelectLoader />
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
                              <Select
                                name="candidatMotivation"
                                closeMenuOnSelect={true}
                                placeholder="‎ ‎ ‎ Select Motivation du Candidat"
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={handleMotivationChange}
                                options={motivationOptions}
                                styles={colourStyles}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 pt-1">
        <p className="FiltreName">Filtre by Importance</p>
        <div className="dropdown">
                            <div aria-labelledby="dropdownMenuButton1">
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
                            </div>
                          </div>
        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 pt-1">
                          <p className="FiltreName">Filter by other options</p>
                          <div className="dropdown">
                            <div aria-labelledby="dropdownMenuButton1">
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
                             <p className="missing">Phone number missing</p>
                             <Switch onChange={MissingHandler} id="PhoneNumberMissing"  checked={PhoneNumberMissing}/>
                              </div>
                              <div className="col-4 d-flex  align-items-center">
                             <p className="missing">Email missing</p>
                             <Switch onChange={MissingHandler} id="EmailMissing" checked={EmailCheck}/>
                              
                              </div>
                            </div>
                          </div>
                          <div className="col-4 d-flex justify-content-end">
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
                        <div className="col-4 d-flex justify-content-end">
                          <p className="filterStyling pt-2 cursor-pointer" onClick={() => setShowMore(true)}>More Filters <img src={require("../../images/down.svg").default} /></p>
                        </div>
                      </div>
                    </div></div>
              }
            </div>
          </div>
        
        
          {loader ?
            <>
              {status ?
                filterData.length > 0 ?
                  filterData.map((profile, index) => 

                     { 
                      if(EmailCheck===true && !profile.clientEmail ){
                          return (

                            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 pd-left">
                              
                              <ClientToDoCard data={profile} />
                            </div>
                            )
                        
       
                      }
                      else if(EmailCheck===false && profile.clientEmail){
                        return (

                          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 pd-left">
                            
                            <ClientToDoCard data={profile} />
                          </div>
                          )
                      }
 } )
                  :
                  <div className="col-12">
                    <div className="row d-flex justify-content-center">
                      <Loader />
                    </div>
                  </div>

                :
                <p className="text-center">
                  No Profiles in Candidat To-Do! Please Add New Candidats.
                </p>
              }
            </>
            :
            <div className="col-12">
              <div className="row d-flex justify-content-center">
                <Loader />
              </div>
            </div>
          }
        </div>
      </div>
    </>
  );
}
export default ClientToDoList;
