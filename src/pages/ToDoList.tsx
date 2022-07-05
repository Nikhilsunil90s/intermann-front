import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import "../CSS/CanEmpl.css";
import ToDoProfileCard from "../components/ToDoProfileCard";
import { API_BASE_URL } from "../config/serverApiConfig";
import { Toaster } from "react-hot-toast";
import Loader from "../components/Loader/loader";
import Select, { GroupBase, StylesConfig } from "react-select";
import chroma from 'chroma-js';
import { colourOptions, ColourOption } from "../Selecteddata/data";
import SelectLoader from "../components/Loader/selectLoader"

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
function ToDoList() {

  const [sectors, setSectors] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState([]);
  const [selectedSector, setSelectedSector] = useState("");
  const [sectorOptions, setSectorOptions] = useState([])as any;
  const [jobOptions, setJobOptions] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [status, setStatus] = useState(Boolean);
  const [nameOptions, setNameOptions] = useState([])                        
  const [showMore, setShowMore] = useState(true)
  const [email,setEmail]=useState([])
  const [licenceOptions, setLicenseOptions] = useState([
    {
      value: "true", label: "Have Licence", color: '#FF8B00'
    },
    {
      value: "false", label: "No Licence", color: '#FF8B00'
    }
  ])

  const [motivationOptions, setMotivationOptions] = useState([
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
    }
  ])
  const [ContectOptions,setContectOptions]=useState([
    {
      value: "0987656783456", label: "0987656783456", color: '#FF8B00'
    }, 
  ])


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

    setSectorOptions([...sectorops]);
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
    if (nameOptions.length == 0) {
      fetchProfiles().then((profilesResult) => {
        let nameops = profilesResult.map((pro) => {
          return { value: pro.candidatName, label: pro.candidatName, color: '#FF8B00' }
        })
        setNameOptions([...nameops])
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
         setEmail(emailops)
        console.log(emailops,"emailops")
      })
        console.log([...email],"email")
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
    MotivationArr = []
    LicencePermisArr = []
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

  const HandelLicence = (e) => {
    LicencePermisArr = []
    SelectedName = []
    setSelectedSector("")
    MotivationArr = []
    console.log(e.value)
    LicencePermisArr.push(e.value)
    filterFunction()
  }

  const handleMotivationChange = (e: any) => {
    // console.log(e.target.value)
    MotivationArr = []
    LicencePermisArr = []
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

  const handleSectorChange = (e: any) => {
    // console.log(e.target.value)
    SelectedName = []
    MotivationArr = []
    LicencePermisArr = []
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
    setLoader(false);

    if (SelectedName.length > 0 || MotivationArr.length > 0 || LicencePermisArr.length > 0 || DateArr.length>0) {
      if (SelectedName.length > 0 && MotivationArr.length == 0 && LicencePermisArr.length == 0 && DateArr.length==0) {
        LicencePermisArr = []
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
      if (SelectedName.length == 0 && MotivationArr.length > 0 && LicencePermisArr.length == 0 && DateArr.length == 0) {
        setFilterData([])
        SelectedName = []
        fetch(`${API_BASE_URL}getCandidats/?candidatMotivation=${MotivationArr}`, {

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
      if (LicencePermisArr.length > 0 && MotivationArr.length == 0 && SelectedName.length  == 0 && DateArr.length == 0) {
        setFilterData([])
        SelectedName = []
        MotivationArr = []
        fetch(`${API_BASE_URL}getCandidats/?candidatLicensePermis=${LicencePermisArr}`, {

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
      if (DateArr.length > 0 && SelectedName.length == 0 && MotivationArr.length == 0 && LicencePermisArr.length == 0 ) {
        setFilterData([])
        SelectedName = []
        MotivationArr = []
        LicencePermisArr=[]
        setSelectedSector("")
        
        DateFilter()
      }
      // if (DateArr.length > 0 && SelectedName.length > 0 && MotivationArr.length > 0 && LicencePermisArr.length > 0 ) {
      //   fetch(`${API_BASE_URL}getCandidats/?candidatLicensePermis=${LicencePermisArr}?candidatMotivation=${MotivationArr}?candidatName=${SelectedName}?candidatStartDate=${DateArr}`, {

      //     method: "GET",
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "application/json",
      //       Authorization: "Bearer " + localStorage.getItem("token"),
      //     },
      //   })
      //     .then((reD) => reD.json())
      //     .then((result) => {
      //       {
      //         // setFilterData([...result.data]);
      //         // console.log(result,"result")
      //         setFilterData([...result.data]);
      //       }
      //       // setStatus(result.status);
      //     })
      //     .catch((err) => err);
      //   setLoader(true);
      // }
    }
    
    if (
      selectedSector.length > 0 &&
      selectedJob.length == 0 &&
      selectedLanguages.length == 0
    ) {
      fetch(
        `${API_BASE_URL}filterToDoCandidatBySector/?sector=${selectedSector}`,
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
      selectedLanguages.length == 0
    ) {
      await fetch(
        `${API_BASE_URL}filterToDoSJ/?sector=${selectedSector}&jobs=${FilterJob}`,
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
      selectedLanguages.length > 0 &&
      selectedJob.length == 0
    ) {
      await fetch(
        `${API_BASE_URL}filterToDoSL/?sector=${selectedSector}&languages=${selectedLanguages}`,
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
      selectedJob.length > 0 &&
      selectedLanguages.length > 0
    ) {
      await fetch(
        `${API_BASE_URL}filterToDoSJL/?sector=${selectedSector}&jobs=${selectedJob}&languages=${selectedLanguages}`,
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
      selectedLanguages.length > 0 &&
      selectedJob.length == 0 &&
      selectedSector.length == 0
    ) {
      await fetch(
        `${API_BASE_URL}filterToDoCandidatByLanguages/?languages=${selectedLanguages}`,
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
    if (selectedSector.length === 0 && selectedJob.length === 0 && selectedLanguages.length === 0 && SelectedName.length === 0 && MotivationArr.length === 0 && LicencePermisArr.length === 0 && DateArr.length === 0) {
      {
        setLoader(true)
        setStatus(true)
        fetchProfiles().then(filteredresponse => {
          setFilterData([...filteredresponse])
        })
          .catch(err => {
            console.log(err);
          })
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
  const onDateChange=(e:any)=>{
    DateArr=[]
    if(e.target.name==="candidatStartDate"){
    let SelectedDate=[]
    SelectedDate=e.target.value
    DateArr.push(SelectedDate)
    console.log(DateArr,"hey")
    filterFunction()
    }
 }

  return (
    <>
      <Toaster position="top-right" />
      <div className="container-fluid">
        <div className="row pd ">

          <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 card-tops px-1 mt-1 " style={{ padding: "0px", marginBottom: "20px" }}>
            <div className="row text-start">
              <div className="card mdquery" style={{ padding: "15px 15px", borderRadius: "10px", marginBottom: "0px" }}>
                <div className="">
                  <img
                    src={require("../images/Stats.svg").default}
                    style={{ width: "70%", marginBottom: "10px" }}
                  />
                  <p className="h-child-text d-flex mb-0">
                    Ici vous avez la liste des candidats ne travaillant pas encore avec nous
                  </p>
                  <p className="h-child-text mb-0">
                    Vous devez toujours vous assurer d’avoir un maximum d’information sur cette liste et déplacer les candidats en archive si plus d’actualité
                  </p>
                </div>
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
                        /> :<SelectLoader />
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
                    /> : <p>Select A Sector!</p>
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
                                onChange={HandelLicence}
                                options={email}
                                styles={colourStyles}
                              />
                              :<SelectLoader />
                            }
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-xxl-4 col-xl-4 col-lg-4 pt-2">
                          <p className="FiltreName">Filtre by contact</p>
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
                              <Select
                                name="candidatPhone"
                                closeMenuOnSelect={true}
                                placeholder="‎ ‎ ‎ ‎ ‎  ‎ Candidat's Phone Number"
                                className="basic-multi-select"
                                classNamePrefix="select"
                                // onChange={HandelLicence}
                                options={ContectOptions}
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
                          <div className="col-4 d-flex justify-content-end">
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
                        <div className="col-4 d-flex justify-content-end">
                          <p className="filterStyling pt-2 cursor-pointer" onClick={() => setShowMore(true)}>More Filters <img src={require("../images/down.svg").default} /></p>
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
                  filterData.map((profile, index) => (
                    <div className="col-md-6 col-xxl-3 pl-0 col-xl-4 col-lg-4 ">
                      <ToDoProfileCard data={profile} />
                    </div>
                  ))
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
export default ToDoList;
