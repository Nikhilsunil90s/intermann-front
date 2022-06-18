import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import "../CSS/CanEmpl.css";
import ToDoProfileCard from "../components/ToDoProfileCard";
import { API_BASE_URL } from "../config/serverApiConfig";
import { Toaster } from "react-hot-toast";
import Loader from "../components/Loader/loader";


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
let MotivationArr=[]
let LicencePermisArr=[]
let DateArr=[]
function ToDoList() {
  const [sectors, setSectors] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState([]);
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [status, setStatus] = useState(Boolean);
  const [SelectDropDown,setSelectDropDown]=useState([])
  const [showMore,setShowMore]=useState(false)
  const [Motivation,setMotivation]=useState([
    {
      value:"1",label:"😔 Dissapointed"
    },{
      value:"2",label:"🙁 Not really"
    },{
      value:"3",label:"😊 Like"
    },{
      value:"4",label:"🥰 Great"
    },{
      value:"5",label:"😍 Superlovely"
    }
  ])
  const [LicensePermis,setLicensePermis]=useState(Boolean)as any
  const [selectByName,setSelectName]=useState([])


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
  }, [selectedLanguages, selectedJob, selectedSector,Motivation]);
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
      .then((reD) => {setFilterData([...reD]);setSelectDropDown([...reD])})
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
  const handleNameChange = (e: any) => {
    // console.log(e.target.value)
    SelectedName=[]
    MotivationArr=[]
    LicencePermisArr=[]
    setSelectedSector("")
    setSelectedJob([])
    if (e.target.value === "Select Un Name") {
      SelectedName=[]
     
    } else if (e.target.name === "candidatActivityName") {
      SelectedName=[]
      MotivationArr=[]
      let NameField = e.target.value;
     SelectedName.push(NameField)
      console.log(MotivationArr,"Name")
    }
  };

  const HandelLicence=(e)=>{
    LicencePermisArr=[]
    SelectedName=[]
    setSelectedSector("")
    MotivationArr=[]
    console.log(e.target.value)
    LicencePermisArr.push(e.target.value)
    filterFunction()
  }

  const handleMotivationChange = (e: any) => {
    // console.log(e.target.value)
    MotivationArr=[]
    LicencePermisArr=[]
    setSelectedSector("")
    SelectedName=[]
    if (e.target.value === "Select Un Secteur") {
      setJobs([]);
      setSelectedSector("");
      setLoader(true);
     
    } else if (e.target.name === "candidatActivityMotivation") {
      MotivationArr=[]
      let sectorField = e.target.value;
      
      console.log(sectorField,"motivation")
      MotivationArr.push(sectorField)
     filterFunction()
      // setSelectedSector(sectorField);
    }
  };

  const handleSectorChange = (e: any) => {
    // console.log(e.target.value)
    SelectedName=[]
    MotivationArr=[]
    LicencePermisArr=[]
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
        // console.log("hello")
          FilterJob.push(job.jobName);
          setSelectedJob(FilterJob);
    }
      else {
        if(FilterJob.length===1){
          FilterJob=[]
        }
        // console.log(FilterJob.length,"index")
      //  console.log("not checked")
       FilterJob= FilterJob.filter((item)=>{return item !==job.jobName})
        console.log(FilterJob.length,"newarr")

        setSelectedJob(FilterJob)
        // console.log(selectedJob,"else")
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
    
    if(SelectedName.length>0 || MotivationArr.length>0 || LicencePermisArr.length>0 || DateArr.length>0){
      if(SelectedName.length>0){
        LicencePermisArr=[]
        fetch(`${API_BASE_URL}getCandidats/?candidatName=${SelectedName}`,{
        
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
      if(MotivationArr.length>0){
        setFilterData([])
        SelectedName=[]
        fetch(`${API_BASE_URL}getCandidats/?candidatMotivation=${MotivationArr}`,{
        
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
      if(DateArr.length>0){
        LicencePermisArr=[]
        MotivationArr=[]
        SelectedName=[]
        setSelectedSector("")
        fetch(`${API_BASE_URL}getCandidats/?createdAt=${DateArr}`,{
        
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
      if(LicencePermisArr.length>0){
        setFilterData([])
        SelectedName=[]
        MotivationArr=[]
        fetch(`${API_BASE_URL}getCandidats/?candidatLicensePermis=${LicencePermisArr}`,{
        
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
     if(selectedSector.length === 0 && selectedJob.length === 0 && selectedLanguages.length === 0 && SelectedName.length===0 && MotivationArr.length===0 && LicencePermisArr.length===0 && DateArr.length===0){
      {
        setLoader(true)
        setStatus(true)
        fetchProfiles()
      }
    }
  };
  const onDateChange=(e)=>{
     DateArr=[]
     let SelectedDate=[]
     SelectedDate=e.target.value
     DateArr.push(SelectedDate)
     filterFunction()
  }
console.log(SelectDropDown,"SelectDropDown") 
  // useEffect(() => {
  //   fetchProfiles();
  // }, []);
 
  return (
    <>
      <Toaster position="top-right" />
      <div className="container-fluid">
        <div className="row pd ">
           
             <div className="col-12 card-tops px-1 mt-2" style={{padding:"0px",marginBottom:"20px"}}>
          <div className="row text-start">
          <div className="card " style={{padding:"15px 15px",borderRadius:"15px",marginBottom:"0px"}}>
              <div className="">
              <img
              src={require("../images/Stats.svg").default}
              style={{ width: "70%" ,marginBottom:"10px"}}
            />
                <p className="child-text">
                Ici vous avez la liste des candidats ne travaillant pas encore avec nous 
            </p>
            <p className="child-text">
            Vous devez toujours vous assurer d’avoir un maximum d’information sur cette liste et déplacer les candidats en archive si plus d’actualité 
            </p>
              </div>
            </div>
          </div>
          </div>
          <div className="col-12 bg-white p-2 rounded001">
            <div className="row">
           <div className="col-4">
            <p className="FiltreName">Filtre by name</p>
            <div className="dropdown">
              <div aria-labelledby="dropdownMenuButton1">
                <select
                  name="candidatActivityName"
                  className="form-select"
                  onChange={handleNameChange}
                  onClick={() => {
                    // setSelectedJob([]);
                    filterFunction();
                  }}
                >
                  <option value="Select Un Name" className="fadeClass001">Select</option>
                  {SelectDropDown &&
                    SelectDropDown.map((Name) => (
                      <option value={Name.candidatName}>
                        <button className="dropdown-item">
                          {Name.candidatName}
                        </button>
                      </option>
                    ))}
                </select>
              </div>
            </div>
            </div>
          <div className="col-4">
            <p className="FiltreName">Filtre Secteur d’activité</p>
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
                  <option value="Select Un Secteur" className="fadeClass001">Select Un Secteur</option>
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
            </div>
            <div className="col-4">
            <p className="FiltreName">Filtre selection métier / job</p>
            <div className="box">
              <ul className="list-group">
                {jobs.length > 0 ? (jobs.map((job, index) => {
                  // console.log(selectedJob, "select");

                  return (
                    <li
                    className="job-ul list-group-item list-group-item-action p-0"
                    onClick={(e)=>{HandleChecked(e,job);filterFunction()}} value={job.jobName}
                  > <span style={{color:"black",textAlign:"center",width:"100%",display:"flex",justifyContent:"space-between"}}>
                   {selectedJob.find((e) => e == job.jobName) ? (
                          <div className="tick"></div>
                      ) : null} 
                  <p className="">{job.jobName}</p></span>
                   
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
          {
            showMore?
            <>
            <div className="col-12 pt-1">
            <div className="row">
            <div className="col-4 pt-1">
        <p className="FiltreName">Filtre by motivation</p>
        <div className="dropdown">
          <div aria-labelledby="dropdownMenuButton1">
            <select
              name="candidatActivityMotivation"
              className="form-select"
              onChange={handleMotivationChange}
              // onClick={() => {
              //   // setSelectedJob([]);
              //   filterFunction();
              // }}
            >
              <option value="Select Un Secteur" className="fadeClass001">Select</option>
              {Motivation &&
                Motivation.map((Motivation) => (
                  <option value={Motivation.value}>
                    <button className="dropdown-item">
                      {Motivation.label}
                    </button>
                  </option>
                ))}
            </select>
          </div>
        </div>
        </div>
        <div className="col-4 pt-1">
        <p className="FiltreName">Filter by date</p>
        <div className="dropdown">
          <div aria-labelledby="dropdownMenuButton1">
                          <input
                              type="date"
                              className="form-control"
                              name="candidatStartDate"
                                // value={data.candidatStartDate}
                                onChange={onDateChange}
                                
                              />
                            </div>
                          </div>
        </div>
        <div className="col-4 pt-1">
        <p className="FiltreName">Filter by driver licence</p>
        <div className="dropdown">
          <div aria-labelledby="dropdownMenuButton1">
            <select
              name=""
              className="form-select"
              // onChange={handleSectorChange}
              onChange={HandelLicence}
            >
              <option value="Select Un Secteur" className="fadeClass001">Have licence</option>
             <option value="true" onChange={HandelLicence}>true</option>
             <option value="false" onChange={HandelLicence}>false</option>
            </select>
          </div>
        </div>
        </div>
        
              </div>
            </div>
            <div className="extraPadding" onClick={()=>setShowMore(false)}>
            <div className="col-12">
       <div className="row justify-content-end">
<div className="col-4 d-flex justify-content-end">    <p  className="filterStyling pt-2">Less Filters <img src={require("../images/downup.svg").default}  /></p>
</div>
         </div>
        </div>
           </div>
            </>
            
            :
            <div className="extraPadding" onClick={()=>setShowMore(true)}> <div className="col-12">
            <div className="row justify-content-end">
            <div className="col-4 d-flex justify-content-end">      <p className="filterStyling pt-2">More Filters <img src={require("../images/down.svg").default}  /></p>
            </div>
              </div>
             </div></div>
          }
        
          <div>
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
          </div>
          </div>
          <hr className="new5" />
         {loader ? 
                <>
                  {status ? 
                    filterData.length > 0 ? 
                      filterData.map((profile, index) => (
                        <div className="col-4  pd-left">
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
