import React, { useEffect ,useState} from "react";
import "../../CSS/inProgressCard.css";
import ClientCardArchived from "./ClientCardArchived";
import { API_BASE_URL } from "../../config/serverApiConfig";
import Loader from '../../components/Loader/loader'
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
let FilterJob=[]
export default function ClientArchived() {
  // useEffect(() => {
  //   window.scroll({
  //     top: 0,
  //     left: 0,
  //     behavior: "smooth",
  //   });
  // });
  const [loader,setLoader] = useState(true);
  const [sectors,setSectors] = useState([]);
  const [jobs,setJobs] = useState([]);
  const [selectedJob,setSelectedJob] = useState([]);
  const [defaultCard,setDefault] = useState(false)
  const [selectedSector,setSelectedSector] = useState("");
  const [selectedLanguages,setSelectedLanguages] = useState([]);
  const [filterData,setFilterData] = useState([]);
  const [status,setStatus] = useState(Boolean);
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
  }, [jobs])

  useEffect(() => {
    filterFunction();
  }, [selectedLanguages, selectedJob, selectedSector]);
 console.log(filterData,"data")
    const fetchProfiles = async () => {
      return await fetch(API_BASE_URL + "allArchivedClients", {
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
  const handleSectorChange = (e: any) => {
    // console.log(e.target.value)

    FilterJob = [];
    setSelectedJob([])
    if (e.target.value === "Select Un Secteur") {
      setSelectedSector("");
      filterFunction()
      setJobs([]);
      setLoader(true);
     
    } else if (e.target.name === "clientActivitySector") {
      let sectorField = e.target.value;
      setSelectedSector(sectorField);
      filterFunction()
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
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((resD) => resD.json())
      .then((reD) => reD)
      .catch((err) => err);
  };

  const HandleChecked=(e:any,job:any)=>{
    // FilterJob=[]
    if(!FilterJob.find((e) => e == job.jobName)){
      console.log("hello")
        FilterJob.push(job.jobName);
        setSelectedJob(FilterJob);
        filterFunction()
  }
    else {
      if(FilterJob.length===1){
        FilterJob=[]
      }
     FilterJob= FilterJob.filter((item)=>{return item !==job.jobName})
      setSelectedJob(FilterJob)
      filterFunction()

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
  };
  const filterFunction = async () => {
    setLoader(false);
    setStatus(false)
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
        `${API_BASE_URL}filterArchivedClientBySector/?sector=${selectedSector}`,
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
        `${API_BASE_URL}filterArchivedClientSJ/?sector=${selectedSector}&jobs=${selectedJob}`,
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
        `${API_BASE_URL}filterArchivedClientSL/?sector=${selectedSector}&languages=${selectedLanguages}`,
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
        `${API_BASE_URL}filterArchivedClientSJL/?sector=${selectedSector}&jobs=${selectedJob}&languages=${selectedLanguages}`,
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
        `${API_BASE_URL}filterArchivedClientByLanguages/?languages=${selectedLanguages}`,
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
         <div className="container-fluid">
        <div className="row ">
          <div className="col-12 text-center">
            <img src={require("../../images/Archived.svg").default} style={{ width: "70%", paddingTop: "30px" }} />
            <p className="text-family">
            Ici vous avez la liste des soci??t??s qui font une sur lesquelles nous avons  <span className="fw-bolder">annul?? la recherhce et donc archiv??</span>  et qui ont des employ??s ?? nous chez eux
              <span> d??j?? chez nous, il sont donc lier ?? un contrat dans la liste lead</span>
            </p>
            <p>
            Here you have the list of companies that make an on which we have canceled the search and therefore archived     </p>
          </div>
          <div className="col-6">
            <p>Filtre Secteur d???activit??</p>
            <div className="dropdown">
              <div aria-labelledby="dropdownMenuButton1">
              <select
                  name="clientActivitySector"
                  className="form-select"
                  onChange={handleSectorChange}
                >
                  <option value="Select Sectors">Select Sectors</option>
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
                <span className="ps-2">Fran??ais</span>
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
            <p>Filtre selection m??tier / job</p>
            <div className="box">
            <ul className="list-group">
              {jobs.length > 0 ? (
                  jobs.map((job) => (
                   
                      <li
                      className="job-ul list-group-item list-group-item-action"
                      onClick={(e)=>{HandleChecked(e,job)}} value={job.jobName}
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
          </div>
          <hr className="new5" />
          <>
          {loader ? 
                <>
                  {filterData.length > 0 ? 
                  status ? 
                      filterData.map((profile, index) => (
                        <div className="col-4 mt-2 pd-left">
                          <ClientCardArchived  data={profile}  />
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

