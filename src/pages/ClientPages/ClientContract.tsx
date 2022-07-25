import React, { useEffect, useState } from "react";
import "../../CSS/inProgressCard.css";
import ClientContractCard from "../ClientPages/ClientContractCard";
import { API_BASE_URL } from "../../config/serverApiConfig";
import Loader from '../../components/Loader/loader'
import { ColourOption } from "../../Selecteddata/data";
import Select, {StylesConfig } from "react-select";
import SelectLoader from "../../components/Loader/selectLoader"
import chroma from 'chroma-js';
import {ReactComponent as RatingStar} from "../../images/RatingStar.svg"
import {ReactComponent as Empty} from "../../images/emptyStar.svg"
import Switch from "react-switch";
import  ProfileLoader from "../../components/Loader/ProfilesLoader"

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
 function ClientContract() {
  // const [loader, setLoader] = useState(true);
  // const [nameOptions, setNameOptions] = useState([])   
  // const [sectorOptions, setSectorOptions] = useState([]);
  // const [sectors, setSectors] = useState([]);
  // const [jobs, setJobs] = useState([]);
  // const [selectedJob, setSelectedJob] = useState([]);
  // const [defaultCard, setDefault] = useState(false)
  // const [selectedSector, setSelectedSector] = useState("");
  // const [selectedLanguages, setSelectedLanguages] = useState([]);
  // const [filterData, setFilterData] = useState([]);
  // const [status, setStatus] = useState(Boolean);
  // const [jobOptions, setJobOptions] = useState([]);
  // const [EmailCheck,setEmailCheck] = useState(false)
  // const [PhoneNumberMissing,setMissing]=useState(false)
  // const [showMore, setShowMore] = useState(false)
  // const [motivationOptions, setMotivationOptions] = useState([])
  // const [optionsOthersFilter, setOtherOptions] = useState([])
  // const [importanceOptions, setImportanceOptions] = useState([])as any

 
  const [sectors, setSectors] = useState([]);
  const [nameOptions, setNameOptions] = useState([])   
  const [sectorOptions, setSectorOptions] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState([]);
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [loader, setLoader] = useState(true);
  const [filterData, setFilterData] = useState([]);
  const [status,setStatus]=useState(Boolean)
  const [jobOptions, setJobOptions] = useState([]);
  const [EmailCheck,setEmailCheck] = useState(false)
  const [PhoneNumberMissing,setMissing]=useState(false)
  const [showMore, setShowMore] = useState(false)
  const [motivationOptions, setMotivationOptions] = useState([])
  const [optionsOthersFilter, setOtherOptions] = useState([])
  const [importanceOptions, setImportanceOptions] = useState([])as any


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
      setOtherOptions([{
        value: "Select Others", label: "Select Others", color: '#FF8B00'
      },
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
      .then((reD) => setFilterData([...reD]))
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
    setStatus(false)
    if (selectedSector.length === 0 && selectedJob.length === 0 && selectedLanguages.length === 0) {
      setLoader(true)
      setStatus(true)
      fetchProfiles()
    }
    if (
      selectedSector.length > 0 &&
      selectedJob.length == 0 &&
      selectedLanguages.length == 0
    ) {
      fetch(
        `${API_BASE_URL}filterSignedClientBySector/?sector=${selectedSector}`,
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
      selectedLanguages.length == 0
    ) {
      console.log(FilterJob, "seletedjobss");
      await fetch(
        `${API_BASE_URL}filterSignedClientSJ/?sector=${selectedSector}&jobs=${selectedJob}`,
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
        `${API_BASE_URL}filterSignedClientSL/?sector=${selectedSector}&languages=${selectedLanguages}`,
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
        `${API_BASE_URL}filterSignedClientSJL/?sector=${selectedSector}&jobs=${selectedJob}&languages=${selectedLanguages}`,
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
        `${API_BASE_URL}filterSignedClientByLanguages/?languages=${selectedLanguages}`,
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
    const importanceHandel=(e)=>{
      SelectedName = []
      setSelectedSector("")
      MotivationArr = []
      FilterJob=[]
      Importance=[]
       Importance.push(e.value)
     }
    
     const HandelOthers = (e) => {
      SelectedName = []
      setSelectedSector("")
      Importance=[]
      MotivationArr = []
      FilterJob=[]
      console.log(e.value)
      let OtherF=[]
     OtherF.push(e.value)
      console.log(OtherF,"other")
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
      FilterJob = [];
      MotivationArr = []
      OthersFilterArr = []
      Importance=[]
      setImportanceOptions([])
      setImportanceOptions([])
      setSectorOptions([])
      setSectors([])
      setSelectedJob([])
      fetchAllSectors()
      filterFunction()
     }
    const MissingHandler=(checked,e,id)=>{
      console.log(id,"id")
      if(id=="EmailMissing"){
      setEmailCheck(checked)
      }
      if(id=="PhoneNumberMissing"){
        setMissing(checked)
      }
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




  return (
    <>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-12 p-1 text-center topHeaderClient mt-2">
          <div className="d-flex topinPHeading"> <h2 className="">clients / lead  </h2> <span className="topSignedtext">in progress</span></div>
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
                              placeholder="‎ ‎ ‎ Select Motivation du Candidat"
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
                             <p className="missing">Phone number missing</p>
                             <Switch onChange={MissingHandler} id="PhoneNumberMissing"  checked={PhoneNumberMissing}/>
                              </div>
                              <div className="col-4 d-flex  align-items-center">
                             <p className="missing">Email missing</p>
                             <Switch onChange={MissingHandler} id="EmailMissing" checked={EmailCheck}/>
                              
                              </div>
                            </div>
                          </div>
                          <div className="col-2 d-flex align-items-center justify-content-end">
                      {selectedSector.length > 0 || selectedJob.length > 0 || selectedLanguages.length > 0 || SelectedName.length > 0 || MotivationArr.length > 0 || SelectedName.length > 0 || Importance.length > 0 || OthersFilterArr.length > 0 ?

<p className="filterStyling  cursor-pointer mt-2" onClick={() => RestFilters()}>Reset Filters</p>
: null
}   </div>
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
                      {selectedSector.length > 0 || selectedJob.length > 0 || selectedLanguages.length > 0 || SelectedName.length > 0 || MotivationArr.length > 0 || SelectedName.length > 0 || Importance.length > 0 || OthersFilterArr.length > 0 ?

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
          <>
            {loader ?
              <>
                {filterData.length > 0 ?
                  status ?
                    filterData.map((profile, index) => (
                      <div className="col-4 mt-2 pd-left">
                        <ClientContractCard data={profile} />
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
          </>
        </div>
      </div>
    </>
  );
}
export default ClientContract;

