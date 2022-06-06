import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import "../CSS/CanEmpl.css";
import ToDoProfileCard from "../components/ToDoProfileCard";
import { API_BASE_URL } from "../config/serverApiConfig";
import { Toaster } from "react-hot-toast";
import Item from "../components/Loader/loader";
import Loader from "../components/Loader/loader";
import Multiselect from "multiselect-react-dropdown";
import { profile } from "console";
import { type } from "os";

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

let arr = [];
let newarr =[]
function ToDoList() {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [onChangesecter, setChange] = useState([]);
  const [viewFilteredProfiles, setViewFilteredProfiles] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState([]);
  const [defaultCard, setDefault] = useState(false);
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [sectorField, setSectorField] = useState([]);
  const [showCard, setshowCard] = useState(false);
  const [allProfile, setallProfile] = useState(false);
  const [jobFilterdata, setjobFilterdata] = useState([]);
  const [Loader, setLoader] = useState(false);

  const [filterData, setFilterData] = useState([]);
  const [status, setStatus] = useState(Boolean);
  const [unSelected, setunSelected] = useState([]);
  const [check,setCheck]=useState(false)
  // console.log(newArr,"arrayaa")
  // setTimeout(function () {
  //   setLoader(true);
  // }, 3000);
  // console.log(selectedJob,"selected")
  // console.log(arr.concat(), "arr");


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
      .then((reD) => reD)
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

    arr = [];
    setSelectedJob([])
    if (e.target.value === "Select Un Secteur") {
      setJobs([]);
      setSelectedSector("");
      setLoader(true);
      setallProfile(true);
    } else if (e.target.name === "candidatActivitySector") {
      let sectorField = e.target.value;
      setSectorField(sectorField);
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

  // const handleJobFilter = (job: any) => {

  //   // setSelectedJob([])
  //   //     let jobFilter = job.jobName;
  //   // setSelectedJob(jobFilter);

  //   if(!selectedJob.includes(job.jobName)){
  //     arr.push(job.jobName)
  //     setSelectedJob(arr)
  //     // console.log((selectedJob.concat().toString),"arr")
  //     console.log(selectedJob.toString(),"new arr")
  //   }

  //   // else{
  //   //   let jobFilter = job.jobName;
  //   // setSelectedJob(jobFilter);
  //   // }
  // };
  // console.log(selectedLanguages.length, "length");
  // const handleJobFilter = (job: any) => {
  //   if(!(selectedJob.includes(job.jobName)) && !(arr.includes(job.jobName))){
  //     arr.push(job.jobName);
  //     setSelectedJob(arr);
  //     // console.log(selectedJob, "new arr");
  //   }
  //   else {
    
  // //  let newarr= selectedJob.filter((item,i)=>{unChecked(item,job.jobName)})
  //     // setSelectedJob(newarr)
  //   }
  //   };
  useEffect(()=>{
    setSelectedJob(arr)

  },[selectedJob])
    const HandleChecked=(e:any,job:any,index)=>{
      // arr=[]
   if(e.target.checked){
      if(!arr.find((e) => e == job.jobName)){
        console.log("hello")
          arr.push(job.jobName);
          setSelectedJob(arr);
        console.log(selectedJob,"selectedjobif")
       setCheck(false)
      }
    }
      else {
        if(arr.length===1){
          arr=[]
        }
        console.log(arr.length,"index")
       console.log("not checked")
    newarr= arr.filter((item)=>{return item !==job.jobName})
        console.log(arr.length,"newarr")

        setSelectedJob(newarr)
        // setSelectedJob(unSelected)
        console.log(selectedJob,"else")
        // console.log(unSelected,"unselected")
        setCheck(true)
      } 
    }
    // const unChecked=(item,job)=>{
    //   console.log(item,job,"hello")
     //  arr=[]

      //  return selectedJob.indexOf(item)=== i
    // }

  const getSelectedLanguage = (e: any) => {
    if (e.target.checked) {
      addLanguages(e.target.value);
      setDefault(true);
    } else {
      removeLanguages(e.target.value);
      setDefault(false);
    }
  };

  const addLanguages = (lang: string) => {
    setSelectedLanguages((prev) => [...prev, lang]);
  };

  const removeLanguages = (lang: string) => {
    setSelectedLanguages(selectedLanguages.filter((l) => l !== lang));
  };

  const filterFunction = async () => {
    setLoader(false);
    setallProfile(false);
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
      setallProfile(false);
    }
   
    if (
      selectedSector.length > 0 &&
       selectedJob.length > 0 &&
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
        setallProfile(false);
      

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
      setallProfile(false);
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
      setallProfile(false);
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
      setallProfile(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);
  useEffect(() => {
    if (profiles.length == 0) {
      setallProfile(false);
      fetchProfiles()
        .then((data) => {
          // console.log(data, "data");
          setProfiles([...data]);
          setLoader(true);
          setallProfile(true);
          
        })
        .catch((err) => {
          // console.log(err);
          setallProfile(false);
        });
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
  }, [jobs]);
  // const handleCheck = (e) => {
  //   var updatedList = [...selectedJob];
  //   if (e.target.checked) {
  //     updatedList = [...selectedJob, e.target.value];
  //   } else {
  //     updatedList.splice(selectedJob.indexOf(e.target.value), 1);
  //   }
  //   setSelectedJob(updatedList);
  // };

  const checkedItems = selectedJob.length
    ? selectedJob.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";
  var isChecked = (item) =>
    selectedJob.includes(item) ? "selectedJob-item" : "not-checked-item";
  // console.log(profiles, "allprofile");
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
                {jobs.map((job, index) => {
                  // console.log(selectedJob, "select");

                  return (
                    <li
                      className="job-ul list-group-item list-group-item-action"
                      // onClick={(e) => {
                      //   handleJobFilter(job);
                      //   filterFunction();
                      // }}
                      // value={job.jobName}
                    >
                      {/* <lable className="d-flex align-item-center">
                        {selectedJob.find((e) => e == job.jobName) ? (
                          <span>
                            <div className="tick"></div>
                          </span>
                        ) : null}
                        <div className="jobClass">
                          <span>{job.jobName}</span>
                        </div>
                      </lable> */}
                      <input type="checkbox" onClick={(e)=>{HandleChecked(e,job,index);filterFunction()}} value={job.jobName} /><span>{job.jobName}</span>
                    </li>
                  );
                })}
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

          {/* {Loader ?
            <>
              {allProfile ?
                profiles.map((el) => (
                  <div className="col-4 mt-2 pd-left">
                    <ToDoProfileCard data={el} />
                  </div>
                ))
                :
                <>
                  {status ?
                    filterData.map((profile, index) => (
                      <div className="col-4 mt-2 pd-left">
                        <ToDoProfileCard data={profile} />
                      </div>
                    ))
                    :
                    <p className="text-center">
                      No Profiles in Candidat To-Do! Please Add New Candidats.
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
          } */}

          {Loader ? (
            <>
              {allProfile ? (
                profiles.map((profile) => (
                  <div className="col-4 mt-2 pd-left">
                    <ToDoProfileCard data={profile} />
                  </div>
                ))
              ) : (
                <>
                  {status ? (
                    filterData.length > 0 ? (
                      filterData.map((profile, index) => (
                        <div className="col-4 mt-2 pd-left">
                          <ToDoProfileCard data={profile} />
                        </div>
                      ))
                    ) : (
                      <div className="col-12">
                        <div className="row d-flex justify-content-center">
                          <Item />
                        </div>
                      </div>
                    )
                  ) : (
                    <p className="text-center">
                      No Profiles in Candidat To-Do! Please Add New Candidats.
                    </p>
                  )}
                </>
              )}
            </>
          ) : (
            <div className="col-12">
              <div className="row d-flex justify-content-center">
                <Item />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default ToDoList;
