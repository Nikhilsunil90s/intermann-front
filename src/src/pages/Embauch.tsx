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
let FilterJob = [];
function Embauch() {
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
  useEffect(() => {
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
    setSelectedSector("")
    setSelectedJob([])
    if (e.value === "Select Name") {
      SelectedName = []
    filterFunction();
    }    else if (e.value !== "" && e.value!=="Select Name") {
      SelectedName = []
      let NameField = e.value;
      SelectedName.push(NameField)
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
    setSelectedJob([])
    console.log(e)
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

  // useEffect(()=>{
  //   setSelectedJob(FilterJob)

  // },[selectedJob])

  const filterFunction = async () => {
    setLoader(false);
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
    if (
      selectedSector.length > 0 &&
      selectedJob.length == 0 &&
      selectedLanguages.length == 0
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
      selectedLanguages.length > 0
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
    if (selectedSector.length === 0 && selectedJob.length === 0 && selectedLanguages.length === 0 && SelectedName.length === 0 ) {
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
 
  const jobChange = async (jobval) => {
    // console.log(jobval)
    let JobArr=[]
    jobval.map((el)=>{
     
     JobArr.push(el.value)
  
    })
    FilterJob=JobArr
    filterFunction()
    console.log(FilterJob,"jee")
  }
  // useEffect(() => {
  //   window.scroll({
  //     top: 0,
  //     left: 0,
  //     behavior: 'smooth'
  //   });
  // })

  return (
    <>
      <Toaster position="top-right" />
      <div className="container-fluid mt-1">
        <div className="row pd">
          <div className="col-12 card-tops px-1 mt-1" style={{ padding: "0px", marginBottom: "20px" }}>
            <div className="row text-start">
              <div className="card " style={{ padding: "15px 15px", borderRadius: "15px", marginBottom: "0px" }}>
                <div className="">
              <h1 className="fontStylingEmbauche">Candidats / Employes <span>Embauch?? / In Progress</span></h1>
                 <p className="embauchChild ">
                 Ici vous avez la liste des candidats ne travaillant <span>pas encore avec nous</span> 
                  </p>
                  <p className="embauchChild mb-0">
                  Vous devez toujours vous assurer d???avoir un maximum d???information sur cette liste et d??placer les candidats en archive si plus d???actualit?? 
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-6">
            <p>Filtre Secteur d???activit??</p>
            <div className="dropdown">
              <div aria-labelledby="dropdownMenuButton1">
                <select
                  name="candidatActivitySector"
                  className="form-select"
                  onChange={handleSectorChange}
                  onClick={() => {
                    setSelectedJob([]);
                    filterFunction();
                  }}
                >
                  <option>Select Un Secteur</option>
                  {sectors &&
                    sectors.map((sector) => (
                      <option value={sector.sectorName}>
                        <a className="dropdown-item" href="#">
                          {sector.sectorName}
                        </a>
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <p className="last-child">Filtre Langues du candidat</p>
            <div>
              <div>
                <input
                  type="checkbox"
                  name="language"
                  value="Roumain"
                  onClick={getSelectedLanguage}
                />
                <span className="ps-2">Roumain</span>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="language"
                  value="Francais"
                  onClick={getSelectedLanguage}
                />
                <span className="ps-2">Fran??ais</span>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="language"
                  value="Anglais"
                  onClick={getSelectedLanguage}
                />
                <span className="ps-2">Anglais</span>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="language"
                  value="Italien"
                  onClick={getSelectedLanguage}
                />
                <span className="ps-2">Italien</span>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="language"
                  value="Russe"
                  onClick={getSelectedLanguage}
                />
                <span className="ps-2">Russe</span>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="language"
                  value="Espagnol"
                  onClick={getSelectedLanguage}
                />
                <span className="ps-2">Espagnol</span>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="language"
                  value="Autre"
                  onClick={getSelectedLanguage}
                />
                <span className="ps-2">Autre</span>
              </div>
            </div>
          </div> */}
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
                          placeholder="??? ??? ??? Select Un Candidat"
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={handleNameChange}
                          options={nameOptions}
                          styles={colourStyles}
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
              <div className="col-lg-4 col-md-6 col-sm-6 mb-1">
                <p className="filtersLabel">Filtre Secteur d???activit??</p>
                <div className="dropdown">
                  <div aria-labelledby="dropdownMenuButton1">
                    {sectorOptions.length > 0 ?
                      <Select
                        name="candidatActivitySector"
                        closeMenuOnSelect={true}
                        placeholder="??? ??? ??? Select Un Secteur"
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
              <div className="col-lg-4 col-md-6 col-sm-6">
                <p className="filtersLabel">Filtre selection m??tier / job</p>
                <div>
                  {jobOptions.length > 0 ?
                    <Select
                      name="jobName"
                      closeMenuOnSelect={true}
                      isMulti
                      placeholder="??? ??? ??? Select"
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
                              <Select
                                name="ClientFilter"
                                closeMenuOnSelect={true}
                                placeholder="??? ??? ??? Select Motivation du Candidat"
                                className="basic-multi-select"
                                classNamePrefix="select"
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
          {/* <div className="col-6">
            <p>Filtre selection m??tier / job</p>
            <div className="box">
              <ul className="list-group">
                {jobs.length > 0 ? (
                  jobs.map((job) => (
                   
                    <li
                    className="job-ul list-group-item list-group-item-action"
                    onClick={(e)=>{HandleChecked(e,job);filterFunction()}} value={job.jobName}
                  > <span style={{color:"black",textAlign:"center",width:"100%",display:"flex",justifyContent:"space-between"}}>
                   {selectedJob.find((e) => e == job.jobName) ? (
                          <div className="tick"></div>
                      ) : null} 
                  <p>{job.jobName}</p></span>
                   
                  </li>
                  ))
                ) : (
                  <p>Please Select a Sector to view Jobs!</p>
                )}
              </ul>
            </div>
          </div> */}
            {Loader ? 
                <>
                  {status ? 
                    filterData.length > 0 ? 
                      filterData.map((profile, index) => (
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 mt-1  pr-0">
                          <EmbaucheProfileCard path={false} props={profile}  />
                        </div>
                      ))
                     : 
                      <div className="col-12">
                        <div className="row d-flex justify-content-center">
                          <Item />
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
                <Item />
              </div>
            </div>
          }
        </div>
      </div>
    </>
  );
}
export default Embauch;
