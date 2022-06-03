import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import "../CSS/Embauch.css";
import EmbaucheProfileCard from "../components/EmbaucheProfileCard";
import { API_BASE_URL } from "../config/serverApiConfig";
import toast, { Toaster } from "react-hot-toast";
import Item from "../components/Loader/loader";
import Loader from "../components/Loader/loader";

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
function Embauch() {
  // const [sectors, setSectors] = useState([]);
  // const [jobs, setJobs] = useState([]);
  // const [profiles, setProfiles] = useState([]);
  // const [filteredProfiles, setFilteredProfiles] = useState([]);
  // const [defaultCard, setDefault] = useState(false)
  // const [viewFilteredProfiles, setViewFilteredProfiles] = useState([]);
  // const [selectedSector, setSelectedSector] = useState("");
  // const [onChangesecter, setChange] = useState([]);
  // const [selectedJob, setSelectedJob] = useState("");
  // const [selectedLanguages, setSelectedLanguages] = useState([]);
  // const [sectorField,setSectorField]=useState([])
  // const [showCard,setshowCard]=useState(false)
  // const [jobFilterdata,setjobFilterdata]=useState([])
  // const [Loader ,setLoader]=useState(true)

  // const [allProfile, setallProfile] = useState(false);
  // const [filterData, setFilterData] = useState([])
  // const [status, setStatus] = useState(Boolean)
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
  const [unSelected, setunSelected] = useState<Boolean>(false);
  setTimeout(function () {
    setLoader(true);
  }, 3000);

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
    arr = [];
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
  const handleJobFilter = (job: any) => {
    if (!(selectedJob.includes(job.jobName)) && !(arr.includes(job.jobName))) {
      arr.push(job.jobName);
      setSelectedJob(arr);
      console.log(selectedJob, "new arr");
    }
    else {
    
   let newarr= selectedJob.filter((item)=>{unChecked(item,job.jobName)})
      setSelectedJob(newarr)
    }
    };
   const unChecked=(item,job)=>{
     console.log(item,job,"hello")
    return item!==job.jobName
  
   }
  const filterFunction = async () => {
    setLoader(false);
    setallProfile(false);
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
      setallProfile(false);
    }
    if (
      selectedSector.length > 0 &&
      selectedJob.length > 0 &&
      selectedLanguages.length == 0
    ) {
      console.log(selectedJob, "seletedjobss");
      await fetch(
        `${API_BASE_URL}filterInProgressSJ/?sector=${selectedSector}&jobs=${selectedJob}`,
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
      setallProfile(false);
    }
    if (
      selectedSector.length > 0 &&
      selectedJob.length > 0 &&
      selectedLanguages.length > 0
    ) {
      await fetch(
        `${API_BASE_URL}filterInProgressSJL/?sector=${selectedSector}&jobs=${selectedJob}&languages=${selectedLanguages}`,
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
        `${API_BASE_URL}filterInProgressCandidatByLanguages/?languages=${selectedLanguages}`,
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
  const getSelectedLanguage = (e: any) => {
    if (e.target.checked) {
      addLanguages(e.target.value);
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

  useEffect(() => {
    fetchProfiles();
  }, []);

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

  // useEffect(() => {
  //   window.scroll({
  //     top: 0,
  //     left: 0,
  //     behavior: 'smooth'
  //   });
  // })
  useEffect(() => {}, []);

  return (
    <>
      <Toaster position="top-right" />
      <div className="container-fluid">
        <div className="row ">
          <div className="col-12 text-center">
            <img
              src={require("../images/embauché.svg").default}
              style={{ width: "70%", paddingTop: "30px" }}
            />
            <p className="text-family">
              Ici vous avez la liste des candidats qui travaillant
              <span>
                {" "}
                déjà chez nous, il sont donc lier à un contrat dans la liste
                lead
              </span>
            </p>
            <p className="child-text">
              Vous devez toujours vous assurer d’avoir un maximum d’information
              sur chaque personne, y compris son rib, ses coordonnées etc...
            </p>
            <p>
              Here you have the list of candidates who are already working with
              us, so they are linked to a contract in the lead list,ensure that
              you have as much information as possible about each person
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
                {jobs.length > 0 ? (
                  jobs.map((job) => (
                    <li
                      className="job-ul list-group-item list-group-item-action"
                      onClick={(e) => {
                        handleJobFilter(job);
                        filterFunction();
                      }}
                      value={job.jobName}
                    >
                      <lable className="d-flex align-item-center">
                        {selectedJob.find((e) => e == job.jobName) ? (
                          <span>
                            <div className="tick"></div>
                          </span>
                        ) : null}
                        <div className="jobClass">
                          <span>{job.jobName}</span>
                        </div>
                      </lable>
                    </li>
                  ))
                ) : (
                  <p>Please Select a Sector to view Jobs!</p>
                )}
              </ul>
            </div>
          </div>
          <hr className="new5" />
          {Loader ? (
            <>
              {allProfile ? (
                profiles.map((profile) => (
                  <div className="col-4 mt-2 pd-left">
                    <EmbaucheProfileCard path={false} props={profile} />
                  </div>
                ))
              ) : (
                <>
                  {status ? (
                    filterData.map((profile, index) => (
                      <div className="col-4 mt-2 pd-left">
                        <EmbaucheProfileCard path={false} props={profile} />
                      </div>
                    ))
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

          {/* {defaultCard?
             <>
              {
                showCard?
              <>              {
                    defaultCard?
                  onChangesecter.length>0?
                  onChangesecter.map((profile)=>(
                 
                    <div className="col-4 pd-left">
                      <EmbaucheProfileCard path={false} props={profile} />
                  </div>
                  ))
                  :
                  viewFilteredProfiles.length > 0
                  ? viewFilteredProfiles.map((filteredProfile) => (
                    <div className="col-4 pd-left">
                     <EmbaucheProfileCard path={false} props={filteredProfile}   />
                    </div>
                  ))
                  :
                  <p className="text-center">No Profiles in Candidat To-Do! Please Add New Candidats.</p>
                :
                    profiles.map((profile) => (
                      <div className="col-4 pd-left">
                        <EmbaucheProfileCard path={false} props={profile}  />
                      </div>
                    ))  
                
                }
                </>
                :
                <>
                {
                 filteredProfiles.length>0?
                 filteredProfiles.map((profile)=>(
                   <div className="col-4 mt-2 pd-left">
                   <EmbaucheProfileCard  path={false} props={profile} />
                 </div>
                 ))
               : 
               jobFilterdata.length>0?
               jobFilterdata.map((profile)=>(
                <div className="col-4 mt-2 pd-left">
                <EmbaucheProfileCard path={false} props={profile}  />
              </div>
              ))
              :
               <p className="text-center">No Profiles in Candidat To-Do! Please Add New Candidats.</p>
               }
                 </>
                }
          </>:
          profiles.length>0?
               profiles.map((profile) => (
                <div className="col-4 pd-left">
                  <EmbaucheProfileCard path={false} props={profile}  />
                </div>
           ))  
            :
            <>{
              load?
              <div className="col-12">
              <div className="row d-flex justify-content-center">
            <Item /> 
           </div>
            </div>
              :
              <p className="text-center">No Profiles in Candidat To-Do! Please Add New Candidats.</p>
            }
            </> } */}
        </div>
      </div>
    </>
  );
}
export default Embauch;
