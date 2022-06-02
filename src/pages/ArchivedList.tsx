import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import "../CSS/Canceled.css";
import ArchivedProfileCard from "../components/ArchivedProfileCard";
import { API_BASE_URL } from "../config/serverApiConfig";
import Item from '../components/Loader/loader'

function ArchivedList() {
  const [sectors, setSectors] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [defaultCard, setDefaultCard] = useState(false);
  const [viewFilteredProfiles, setViewFilteredProfiles] = useState([]);
  const [onChangesecter, setChange] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [sectorField, setSectorField] = useState([]);
  const [showCard, setshowCard] = useState(false);
  const [selectedSector, setSelectedSector] = useState("");
  const [FilterLanguage,setFilterLanguage]=useState()
  const [jobFilterdata,setjobFilterdata]=useState([])
  const [Loader, setLoader] = useState(false);
  const [filterData, setFilterData] = useState([])
  const [status, setStatus] = useState(Boolean)
  const [allProfile, setallProfile] = useState(true);

  setTimeout(function(){
    setLoader(false)
   }, 2000);
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
  const handleSectorChange = (e: any) => {
    console.log(e.target.value);
    setSelectedSector(e.target.value);
    if (e.target.value === "Select Un Secteur") {
      return false
    }
    else if (e.target.name === "candidatActivitySector") {
      let sectorField = e.target.value;
      setSectorField(sectorField)
    }

    fetchAllJobs(e.target.value)
      .then((data) => {
        console.log(data);
        setJobs([...data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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

  const handleJobFilter = (job: any) => {
    // arr=[]
    let jobFilter = job.jobName;
    setSelectedJob(jobFilter);
    // if(!selectedJob.includes(job.jobName)){
    //   arr.push(job.jobName)
    // }
    // setSelectedJob(arr)
  };
  const getSelectedLanguage = (e: any) => {
    if (e.target.checked) {
      addLanguages(e.target.value);
    } else {
      removeLanguages(e.target.value);
      setDefaultCard(false);
    }
  }
  const addLanguages = (lang: string) => {
    setSelectedLanguages((prev) => ([...prev, lang]));
  }

  const removeLanguages = (lang: string) => {
    setSelectedLanguages(selectedLanguages.filter((l) => l !== lang));
  }
const filterFunction = async () => {
  setLoader(false)
  if (selectedSector.length > 0 && selectedJob.length == 0) {
    const onChangesecter = profiles.filter((profile) => {
      return profile.candidatActivitySector == sectorField

    })

   
    if (onChangesecter.length <= 0) {
      setStatus(false)
    }
    setFilterData([...onChangesecter]);
     setLoader(true)
    setallProfile(false)
    setStatus(true)
   return false
  }
      if (selectedSector.length > 0 &&  selectedLanguages.length > 0) {
    await fetch(`${API_BASE_URL}filterArchivedSL/?sector=${selectedSector}&languages=${selectedLanguages}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),


      },
    })
      .then((reD) => reD.json())
      .then((result) => { { setFilterData([...result.data]) }; setStatus(result.status); })
      .catch((err) => err);
    setallProfile(false)
    
    return false
  };
  if (selectedSector.length > 0 && selectedJob.length > 0 && selectedLanguages.length > 0) {
    await fetch(`${API_BASE_URL}filterArchivedSJL/?sector=${selectedSector}&jobs=${selectedJob}&languages=${selectedLanguages}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),


      },
    })
      .then((reD) => reD.json())
      .then((result) => { { setFilterData([...result.data]) }; setStatus(result.status); })
      .catch((err) => err);
    setallProfile(false)
    return false
  };

  if (selectedSector.length > 0 && selectedJob.length > 0) {
    await fetch(`${API_BASE_URL}filterArchivedSJ/?sector=${selectedSector}&jobs=${selectedJob}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),


      },
    })
      .then((reD) => reD.json())
      .then((result) => { { setFilterData([...result.data]) }; setStatus(result.status); })
      .catch((err) => err);
    setallProfile(false)
    return false
  }
  if (selectedLanguages.length > 0) {
    await fetch(`${API_BASE_URL}filterArchivedCandidatByLanguages/?languages=${selectedLanguages}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),


      },
    })
      .then((reD) => reD.json())
      .then((result) => { { setFilterData([...result.data]) }; setStatus(result.status); })
      .catch((err) => err);
    setallProfile(false)
    return false
  }
}
useEffect(() => {
  fetchProfiles();
}, []);
console.log(status,"srtayusdhf")
  useEffect(() => {
    if (profiles.length == 0) {
      setallProfile(false)
      setLoader(true)
      fetchProfiles()
        .then((data) => {
          console.log(data);
          setProfiles([...data])
          setallProfile(true)
          setLoader(false)
          setStatus(true)
         
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (sectors.length == 0) {
      setshowCard(false)
      fetchAllSectors()
        .then((data) => {
          console.log(data.data);
          setSectors([...data.data]);
        
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [jobs]);
console.log("profile",profiles)
  // useEffect(() => {

  //   window.scroll({
  //     top: 0,
  //     left: 0,
  //     behavior: 'smooth'
  //   });
  // })
  console.log(filteredProfiles,"filter")
  return (
    <>
      <div className="container-fluid">
        <div className="row pd">
          <div className="col-12 text-center">
            <img
              src={require("../images/archive.svg").default}
              style={{ width: "70%" }}
            />
            <p className="text-family">
              Ici vous avez la liste des candidats qui ont été virés ou archivés
            </p>
            <p className="child-text">
              Here you have the list of candidates who have been fired or
              archived
            </p>
          </div>
          <div className="col-6">
            <p>Filtre Secteur d’Activité</p>
            <div className="dropdown">
              <div aria-labelledby="dropdownMenuButton1">
                <select
                  name="candidatActivitySector"
                  className="form-select"
                  onChange={handleSectorChange}
                >
                  <option>Select Sectors</option>
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
                {jobs.length > 0 ? (
                  jobs.map((job) => (
                    <li
                      className="job-ul list-group-item list-group-item-action"
                      onClick={() => handleJobFilter(job)}
                    >
                      <a href="#">{job.jobName}</a>
                    </li>
                  ))
                ) : (
                  <p>Please Select a Sector to view Jobs!</p>
                )}
              </ul>
            </div>
          </div>
          <hr className="new5" />
          {!Loader?
            <>
              {allProfile ?
                profiles.map((profile) => (
                  <div className="col-4 mt-2 pd-left">
                   <ArchivedProfileCard props={profile} />
                  </div>
                ))
                :
                <>
                  {status ?
                    filterData.map((profile, index) => (
                      <div className="col-4 mt-2 pd-left">
                        <ArchivedProfileCard props={profile} />
                      </div>
                    ))
                    :
                    <p className="text-center">
                      No Profiles in Candidat Archived! Please Add New Candidats.
                    </p>
                  }
                </>
              }
            </>
             :
            <div className="col-12">
              <div className="row d-flex justify-content-center">
                <Item />
              </div>
            </div>
          } 
          {/* {defaultCard ? (
            <>
              {showCard ? (
                <>
                
                  {defaultCard ? (
                    onChangesecter.length > 0 ? (
                      onChangesecter.map((profile) => (
                        <div className="col-4 pd-left">
                          <ArchivedProfileCard props={profile} />
                        </div>
                      ))
                    ) : viewFilteredProfiles.length > 0 ? (
                      viewFilteredProfiles.map((filteredProfile) => (
                        <div className="col-4 pd-left">
                          <ArchivedProfileCard props={filteredProfile} />
                        </div>
                      ))
                    ) : (
                      <p className="text-center">
                        No Profiles in Candidat To-Do! Please Add New Candidats.
                      </p>
                    )
                  ) : (
                    profiles.map((profile) => (
                      <div className="col-4 pd-left">
                        <ArchivedProfileCard props={profile} />
                      </div>
                    ))
                  )}
                </>
              ) : (
                <>
                     {
                 filteredProfiles.length>0?
                 filteredProfiles.map((filteredProfiles)=>(
                   <div className="col-4 mt-2 pd-left">
                   <ArchivedProfileCard data={filteredProfiles}   />
                 </div>
                 ))
               : 
               jobFilterdata.length>0?
               jobFilterdata.map((jobFilterdata)=>(
                <div className="col-4 mt-2 pd-left">
                <ArchivedProfileCard data={jobFilterdata}   />
              </div>
              ))
              :
               <p className="text-center">No Profiles in Candidat To-Do! Please Add New Candidats.</p>
               }
                </>
              )}
            </>
          ) : 
            profiles.length>0?
            profiles.map((profile) => (
              <div className="col-4 pd-left">
                <ArchivedProfileCard props={profile} />
              </div>
            ))
          
          :
          load?
          <div className="col-12">
          <div className="row  d-flex justify-content-center">  
        <Item /> 
       </div>
        </div>
        : <p className="text-center">No Profiles in Candidat To-Do! Pl</p>
        } */}
        </div>
      </div>
    </>
  );
}
export default ArchivedList;
