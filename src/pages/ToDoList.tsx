import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import "../CSS/CanEmpl.css";
import ToDoProfileCard from "../components/ToDoProfileCard";
import { API_BASE_URL } from "../config/serverApiConfig";
import { Toaster } from "react-hot-toast";
import Item from "../components/Loader/loader";


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

let FilterJob = [];
let newarr =[]
function ToDoList() {
  const [sectors, setSectors] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState([]);
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [Loader, setLoader] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [status, setStatus] = useState(Boolean);


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
    filterFunction();
  }, [selectedLanguages, selectedJob, selectedSector]);
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
      .then((reD) => setFilterData([...reD]))
      .catch((err) => err);
  };

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

  const handleSectorChange = (e: any) => {
    // console.log(e.target.value)

    FilterJob = [];
    setSelectedJob([])
    if (e.target.value === "Select Un Secteur") {
      setJobs([]);
      setSelectedSector("");
      setLoader(true);
     
    } else if (e.target.name === "candidatActivitySector") {
      let sectorField = e.target.value;
      setSelectedSector(sectorField);
    }

    fetchAllJobs(e.target.value)
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
        console.log(FilterJob.length,"index")
       console.log("not checked")
       FilterJob= FilterJob.filter((item)=>{return item !==job.jobName})
        console.log(FilterJob.length,"newarr")

        setSelectedJob(newarr)
        console.log(selectedJob,"else")
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
    setSelectedLanguages([])
  };

  const filterFunction = async () => {
    setLoader(false);
    if(selectedSector.length === 0 && selectedJob.length === 0 && selectedLanguages.length === 0){
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
          `${API_BASE_URL}filterToDoSJ/?sector=${selectedSector}&jobs=${selectedJob}`,
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
  };

  useEffect(() => {
    fetchProfiles();
  }, []);
 
  return (
    <>
      <Toaster position="top-right" />
      <div className="container-fluid">
        <div className="row pd ">
          <div className="col-12 text-center">
            <img
              src={require("../images/todo.svg").default}
              style={{ width: "70%" }}
            />
            <p className="text-family">
              Ici vous avez la liste des candidats ne travaillant
              <span> pas encore avec nous</span>
            </p>
            <p className="child-text">
              Vous devez toujours vous assurer d’avoir un maximum d’information
              sur cette liste et déplacer les candidats en archive si plus
              d’actualité
            </p>
            <p>
              You should always make sure you have as much information as
              possible on this list and move the candidates to the archive if
              the candidate is not serious.
            </p>
          </div>
          <div className="col-6">
            <p>Filtre Secteur d’activité</p>
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
                  <option value="Select Un Secteur">Select Un Secteur</option>
                  {sectors &&
                    sectors.map((sector) => (
                      <option value={sector.sectorName}>
                        <button className="dropdown-item">
                          {sector.sectorName}
                        </button>
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
                <span className="ps-2">Français</span>
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
          </div>
          <div className="col-6">
            <p>Filtre selection métier / job</p>
            <div className="box">
              <ul className="list-group">
                {jobs.length > 0 ? (jobs.map((job, index) => {
                  // console.log(selectedJob, "select");

                  return (
                    <li
                    className="job-ul list-group-item list-group-item-action"
                    onClick={(e)=>{HandleChecked(e,job);filterFunction()}} value={job.jobName}
                  > <span style={{color:"black",textAlign:"center",width:"100%",display:"flex",justifyContent:"space-between"}}>
                   {selectedJob.find((e) => e == job.jobName) ? (
                          <div className="tick"></div>
                      ) : null} 
                  <p>{job.jobName}</p></span>
                   
                  </li>
                  );
                })): (
                  <p>Please Select a Sector to view Jobs!</p>
                )}
                {/* // else { */}
                {/* //   return (
                    //     <li */}
                {/* //       className="job-ul list-group-item list-group-item-action"
                    //       onClick={() => {
                    //         handleJobFilter(job); */}
                {/* //       }}
                    //     >
                    //       <a href="#">{job.jobName}</a>
                    //     </li>
                    //   )

                    // } }) ) : 
                    // <p>Please Select a Sector to view Jobs!</p>} */}
                {/* {
                  jobs.length > 0 ? jobs.map((job) =>
                    <li className="job-ul list-group-item list-group-item-action" onClick={()=>{handleJobFilter(job)}}>

                      <a href="#">{job.jobName}</a>
                    </li>
                  ) : <p>Please Select a Sector to view Jobs!</p>
                } */}
              </ul>
            </div>
          </div>
          <hr className="new5" />
         {Loader ? 
                <>
                  {status ? 
                    filterData.length > 0 ? 
                      filterData.map((profile, index) => (
                        <div className="col-4 mt-2 pd-left">
                          <ToDoProfileCard data={profile} />
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
export default ToDoList;
