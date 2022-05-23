import React, { useEffect, useState } from "react";
import StarRatings from 'react-star-ratings';
import "../CSS/Embauch.css";
import EmbaucheProfileCard from "../components/EmbaucheProfileCard";
import { API_BASE_URL } from "../config/serverApiConfig";

function Embauch() {

  const [sectors, setSectors] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [defaultCard, setDefault] = useState(false)
  const [viewFilteredProfiles, setViewFilteredProfiles] = useState([]);
  const [selectedSector, setSelectedSector] = useState("");
  const [onChangesecter, setChange] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [sectorField,setSectorField]=useState([])
  const [showCard,setshowCard]=useState(false)


  const fetchProfiles = async () => {
    return await fetch(API_BASE_URL + "allInProgressCandidats", {
      method: "GET",
      headers: {
        "Accept": 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    })
      .then(resD => resD.json())
      .then(reD => reD)
      .catch(err => err)
  }

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

  const handleSectorChange = (e: any) => {
    console.log(e.target.value);
    setSelectedSector(e.target.value);
    if (e.target.value === "Select Un Secteur") {
      return setDefault(false);
    }
   else if(e.target.name==="candidatActivitySector"){
        let sectorField=e.target.value;
    setSectorField(sectorField)
    const onChangesecter = profiles.filter((profile) => {
      return profile.candidatActivitySector == sectorField
    })
    setChange([...onChangesecter]);
    setDefault(true)
    console.log(onChangesecter,"hellooo")
    console.log(sectorField,"field")
    setshowCard(true)
    }
    fetchAllJobs(e.target.value).then(data => {
      console.log(data)
      setJobs([...data.data])
    })
    .catch(err => {
      console.log(err)
    })

    
   
  }
  const handleJobFilter = (job:any) => {
    console.log(job.jobName,"jobname")
   
    let jobFilter = job.jobName;
    setSelectedJob(jobFilter);
    const filteredProfiles = profiles.filter((profile) => {
      return profile.candidatJob == jobFilter
    })
    console.log(filteredProfiles,"dfgdfdf");
    setFilteredProfiles([...filteredProfiles]);
    setDefault(true);
    setshowCard(false)
  }
  const getSelectedLanguage = (e: any) => {
    if (e.target.checked) {
      addLanguages(e.target.value);
    } else {
      removeLanguages(e.target.value);
      setDefault(false);
    }
  }
  const addLanguages = (lang: string) => {
    setSelectedLanguages((prev) => ([...prev, lang]));
  }

  const removeLanguages = (lang: string) => {
    setSelectedLanguages(selectedLanguages.filter((l) => l !== lang));
  }
  useEffect(() => {
    console.log(selectedLanguages, selectedJob, selectedSector);
    if (selectedLanguages.length > 0) {
      let result = [];
      profiles.map((profile) => {
        selectedLanguages.map((selectedLanguage) => {
          if (profile.candidatLanguages.includes(selectedLanguage) && !(result.includes(profile))) {
            result.push(profile)
          }
        })
      })
      console.log(result);
      setFilteredProfiles([...result]);
      setDefault(true);
    }

  }, [selectedLanguages])

  useEffect(() => {
    setViewFilteredProfiles([...filteredProfiles]);
  }, [filteredProfiles])

  useEffect(() => {
    fetchProfiles();
  }, []);


  useEffect(() => {
    if (profiles.length == 0) {
      fetchProfiles()
        .then(data => {
          console.log(data)
          setProfiles([...data])
        })
        .catch(err => {
          console.log(err)
        })
    }
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

  // useEffect(() => {
  //   window.scroll({
  //     top: 0,
  //     left: 0,
  //     behavior: 'smooth'
  //   });
  // })



  return (
    <>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-12 text-center">
            <img src={require("../images/embauché.svg").default} style={{ width: "70%", paddingTop: "30px" }} />
            <p className="text-family">
              Ici vous avez la liste des candidats qui travaillant
              <span> déjà chez nous, il sont donc lier à un contrat dans la liste lead</span>
            </p>
            <p className="child-text">
              Vous devez toujours vous assurer d’avoir un maximum d’information sur chaque personne, y compris son rib, ses coordonnées etc...
            </p>
            <p>
              Here you have the list of candidates who are already working with us, so they are linked to a contract in the lead list,ensure that you have as much information as possible about each person
            </p>
          </div>
          <div className="col-6">
            <p>Filtre Secteur d’activité</p>
            <div className="dropdown">
              <div aria-labelledby="dropdownMenuButton1">
                <select name="candidatActivitySector" className="form-select" onChange={handleSectorChange}>
                  <option>Select Un Secteur</option>
                  {
                    sectors && sectors.map((sector) =>
                      <option value={sector.sectorName}>
                        <a className="dropdown-item" href="#">
                          {sector.sectorName}
                        </a>
                      </option>
                    )
                  }

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
                {
                  jobs.length > 0 ? jobs.map((job) =>
                    <li className="job-ul list-group-item list-group-item-action" onClick={()=>{handleJobFilter(job)}}>

                      <a href="#">{job.jobName}</a>
                    </li>
                  ) : <p>Please Select a Sector to view Jobs!</p>
                }
              </ul>
            </div>
          </div>
          <hr className="new5" />
             {defaultCard?
             <>
              {
                showCard?
              <>              {
                    defaultCard?
                  onChangesecter.length>0?
                  onChangesecter.map((profile)=>(
                 
                    <div className="col-4 pd-left">
                      <EmbaucheProfileCard props={profile} />
                  </div>
                  ))
                  :
                  viewFilteredProfiles.length > 0
                  ? viewFilteredProfiles.map((filteredProfile) => (
                    <div className="col-4 pd-left">
                     <EmbaucheProfileCard props={filteredProfile} />
                    </div>
                  ))
                  :
                  <p className="text-center">No Profiles in Candidat To-Do! Please Add New Candidats.</p>
                :
                    profiles.map((profile) => (
                      <div className="col-4 pd-left">
                        <EmbaucheProfileCard props={profile} />
                      </div>
                    ))  
                
                }
                </>
                :
                <>
                {
                   filteredProfiles.length>0?
                   filteredProfiles.map((filteredProfiles)=>(
                     <div className="col-4 pd-left">
                      <EmbaucheProfileCard props={filteredProfiles} />
                   </div>
                   ))
                 : <p className="text-center">No Profiles in Candidat To-Do! Please Add New Candidats.</p>
                 }
                 </>
                }
          </>:
               profiles.map((profile) => (
                <div className="col-4 pd-left">
                  <EmbaucheProfileCard props={profile} />
                </div>
              ))  
               }
        </div>
      </div>
    </>
  );
}
export default Embauch;
