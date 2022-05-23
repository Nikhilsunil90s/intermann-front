import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import "../CSS/Canceled.css";
import ArchivedProfileCard from "../components/ArchivedProfileCard";
import { API_BASE_URL } from "../config/serverApiConfig";

function ArchivedList() {

  const [sectors, setSectors] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [defaultCard, setDefaultCard] = useState(false)

  const fetchProfiles = async () => {
    return await fetch(API_BASE_URL + "allArchivedCandidats", {
      method: "GET",
      headers: {
        "Accept": 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    })
      .then(resD => resD.json())
      .then(reD => setProfiles(reD))
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
    fetchAllJobs(e.target.value).then(data => {
      console.log(data)
      setJobs([...data.data])
    })
      .catch(err => {
        console.log(err)
      })
  }

  const handleJobFilter = (e: any) => {
    let jobFilter = e.target.text;
    const filteredProfiles = profiles.filter((profile) => {
      return profile.candidatJob == jobFilter
    })
    console.log(filteredProfiles);
    setFilteredProfiles([...filteredProfiles]);
    setDefaultCard(true)
  }


  useEffect(() => {
    if (profiles.length == 0) {
      fetchProfiles()
        .then(data => {
          console.log(data)
          // setProfiles([...data])
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


  useEffect(() => {

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  })
  return (
    <>
      <div className="container-fluid">
        <div className="row pd">
          <div className="col-12 text-center">
            <img src={require("../images/archive.svg").default} style={{ width: "70%" }} />
            <p className="text-family">
              Ici vous avez la liste des candidats qui ont été virés ou archivés
            </p>
            <p className="child-text">
              Here you have the list of candidates who have been fired or archived
            </p>
          </div>
          <div className="col-6">
            <p>Filtre Secteur d’Activité</p>
            <div className="dropdown">
              <div aria-labelledby="dropdownMenuButton1">
                <select name="candidatActivitySector" className="form-select" onChange={handleSectorChange}>
                  <option>Select Sectors</option>
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
                <input type="checkbox" />
                <span className="ps-2">Roumain</span>
              </div>
              <div>
                <input type="checkbox" />
                <span className="ps-2">Français</span>
              </div>
              <div>
                <input type="checkbox" />
                <span className="ps-2">Anglais</span>
              </div>
              <div>
                <input type="checkbox" />
                <span className="ps-2">Italien</span>
              </div>
              <div>
                <input type="checkbox" />
                <span className="ps-2">Russe</span>
              </div>
              <div>
                <input type="checkbox" />
                <span className="ps-2">Espagnol</span>
              </div>
              <div>
                <input type="checkbox" />
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
                    <li className="job-ul list-group-item list-group-item-action" onClick={handleJobFilter}>

                      <a href="#">{job.jobName}</a>
                    </li>
                  ) : <p>Please Select a Sector to view Jobs!</p>
                }
              </ul>
            </div>
          </div>
          <hr className="new5" />
          {profiles.length > 0 ?
            profiles.map((profile) => (
              <div className="col-4 pd-left">
                <ArchivedProfileCard props={profile} />
              </div>
            ))
            :

            <p className="text-center">No Profiles in Candidat Archived!</p>


          }

        </div>
      </div>
    </>
  );
}
export default ArchivedList;
