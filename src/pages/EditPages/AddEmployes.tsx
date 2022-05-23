import React, { useState, useEffect } from "react";
import "../../CSS/Employes.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from "../../config/serverApiConfig";

const EmployeeDataFormat = {
  candidatName: "",
  candidatEmail: "",
  candidatPhone: "",
  candidatAddress: "",
  candidatActivitySector: {
    sectorName: "",
    jobs: []
  },
  candidatJob: "",
  candidatFBURL: "",
  candidatAlternatePhone: "",
  candidatSkills: "",
  candidatAge: 0,
  candidatMotivation: 0,
  candidatLanguages: [],
  candidatLicensePermis: false,
  candidatConduireEnFrance: false,
  candidatStartDate: "",
  candidatEndDate: 1,
  candidatYearsExperience: "",
  candidatFetes: [],
  candidatPhoto: "",
  candidatExperienceDetails: [{
    period: "",
    location: "",
    workDoneSample: ""
  }],
  candidatCurrentWork: [
    {
      workingFor: "",
      workingSince: "",
      salary: ""
    }
  ],
  enteredBy: "",
  candiatStatus: "To-Do",
  candidateArchived: {
    reason: ""
  }
}


export default function Employes() {

  const notifyCandidatAddSuccess = () => toast("Candidat Added Successfully! View Candidat in To-Do List.", {
    autoClose: 4000
  });

  const notifyCandidatAddError = () => toast("Candidat Cannot Be Added! Please Try Again.", {
    autoClose: 4000
  });

  const [data, setData] = useState(EmployeeDataFormat);
  const [jobs, setJobs] = useState([{ jobName: "", associatedSector: "", _id: "" }]);
  const [activitySectors, setActivitySectors] = useState([]);
  const [languages, setLangauges] = useState([]);
  const [fetes, setFetes] = useState([]);
  const [period, setPeriod] = useState("");
  const [location, setLocation] = useState("");
  const [workDoneSample, setWorkDoneSample] = useState("");

  useEffect(() => {
    if (activitySectors.length == 0) {
      fetchActivitySectors()
        .then(reData => {
          setActivitySectors([...reData.data])
        })
        .catch(err => console.log(err))
    }
  })

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

  const fetchActivitySectors = async () => {
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

  const saveCandidatData = async () => {
    return await fetch(API_BASE_URL + "addCandidat", {
      method: "POST",
      headers: {
        "Accept": 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
      body: JSON.stringify(data),
    })
      .then(resp => resp.json())
      .then(reD => reD)
      .catch(err => err)
  }

  const onFormDataChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | any
    >
  ) => {
    if (e.target.name === 'candidatActivitySector') {
      console.log(e.target.name, e.target.value);
      changeSectorSelection(e.target.value);
    }
    if (e.target.name === 'candidatLanguages') {
      if (e.target?.checked) {
        addLanguages(e.target.value);
        return
      } else {
        removeLanguages(e.target.value);
        return
      }
    }
    if (e.target.name === 'period') {
      setPeriod(e.target.value);
      return
    }
    if (e.target.name === 'location') {
      setLocation(e.target.value);
      return
    }
    if (e.target.name === 'workDoneSample') {
      setWorkDoneSample(e.target.value);
      setData((prev) => ({ ...prev, ['candidatExperienceDetails']: [{ period: period, location: location, workDoneSample: e.target.value }] }))
      return
    }
    if (e.target.name === 'candidatFetes') {
      if (e.target?.checked) {
        addFetes(e.target.value)
        return
      } else {
        removeFetes(e.target.value)
        return
      }
    }
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  useEffect(() => {
    // console.log(period, location, workDoneSample, data);
  }, [period, location, workDoneSample])

  const addFetes = (fete: string) => {
    setFetes((prev) => ([...prev, fete]))
    setData((prev) => ({ ...prev, ['candidatFetes']: [...fetes, fete] }));
  }

  const removeFetes = (fete: string) => {
    setFetes(fetes.filter((f) => f !== fete))
    setData((prev) => ({ ...prev, ['candidatFetes']: [...fetes.filter((f) => f !== fete)] }));
  }

  useEffect(() => {
    // console.log(data, fetes);
  }, [fetes])

  const addLanguages = (lang: string) => {
    setLangauges((prev) => ([...prev, lang]));
    setData((prev) => ({ ...prev, ['candidatLanguages']: [...languages, lang] }));
  }

  const removeLanguages = (lang: string) => {
    setLangauges(languages.filter((l) => l !== lang));
    setData((prev) => ({ ...prev, ['candidatLanguages']: [...languages.filter((l) => l !== lang)] }));
  }

  useEffect(() => {
    // console.log(data, languages);
  }, [languages])

  const changeSectorSelection = async (sec: string) => {
    if (sec) {
      await fetchAllJobs(sec)
        .then(data => {
          console.log(data.data)
          setJobs([...data.data]);
        })
        .catch(err => {
          console.log(err);
        })
      console.log(jobs);
    }

  }

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setData((prev) => ({ ...prev, ['candidatExperienceDetails']: [] }));
    console.log(data);
    saveCandidatData().then(data => {
      console.log(data)
      if (data.status) {
        notifyCandidatAddSuccess()
        window.location.href = "/addCandidate"
      } else {
        notifyCandidatAddError()
        window.location.href = "/addCandidate"
      }
    })
      .catch(err => {
        console.log(err)
      })
  };

  return (
    <div className="p-2">
      <div className="text-center py-3">
        <span className="hero-title">
          <h3>ADD A CANDIDATE / EMPLOYE</h3>
        </span>
      </div>
      <div>
        <form className="add-form form" onSubmit={onFormSubmit}>
          <div className="d-flex flex-wrap justify-content-around">
            <div className="col-md-6">
              <div className="p-2">
                <label>Candidat Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter candidats name"
                  name="candidatName"
                  required
                  value={data.candidatName}
                  onChange={onFormDataChange}
                />
                <span className="text-small">
                  Mandatory, please add company candidat
                </span>
              </div>
              <div className="p-2">
                <label>Candidats Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Phone Number (+format)"
                  name="candidatPhone"
                  required
                  value={data.candidatPhone}
                  onChange={onFormDataChange}
                />
                <span className="text-small">
                  NOT Mandatory, please add phone candidat with +() . exemple :
                  +33623167260
                </span>
              </div>
              <div className="p-2">
                <label>Secteur d’Activité</label>
                <select
                  name="candidatActivitySector"
                  className="form-select"
                  required
                  onChange={onFormDataChange}
                >
                  {activitySectors.map((sector) =>
                    <option value={sector.name} >{sector.sectorName}</option> // fetch from api
                  )}
                </select>
                <span className="text-small">
                  Please select the sector of this candidat, you can add sector on
                  the BO.
                </span>
              </div>
              <div className="p-2">
                <label>Facebook profile</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Facebook link"
                  name="candidatFBURL"
                  value={data.candidatFBURL}
                  onChange={onFormDataChange}
                />
                <span className="text-small">

                  NOT Mendatory, please add contact person on this company.
                </span>
              </div>
              <div className="p-2">
                <label>
                  Skills / Notes Compétances (will be displayed on CV)
                </label>
                <textarea
                  className="form-control"
                  placeholder="Note"
                  name="candidatSkills"
                  rows={4}
                  value={data.candidatSkills}
                  onChange={onFormDataChange}
                ></textarea>
                <span className="text-small">

                  NOT mandatory, please add some special skills that the
                  customer asks for this reasearch.
                </span>
              </div>
              <div className="p-2">
                <label>
                  Motivation de ce candidat à travailler avec nous(bigger number
                  is more important)
                </label>
                <ul style={{ listStyle: "none" }}>
                  <li>
                    <input
                      type="radio"
                      name="candidatMotivation"
                      value={1}
                      onChange={onFormDataChange}
                    />
                    1
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="candidatMotivation"
                      value={2}
                      onChange={onFormDataChange}
                    />
                    2
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="candidatMotivation"
                      value={3}
                      onChange={onFormDataChange}
                    />
                    3
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="candidatMotivation"
                      value={4}
                      onChange={onFormDataChange}
                    />
                    4
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="candidatMotivation"
                      value={5}
                      onChange={onFormDataChange}
                    />
                    5
                  </li>
                </ul>
                <span className="text-small">
                  If we find the candidates, does he take it immediately? Or
                  will he still need to think?
                </span>
              </div>
              <div className="p-2 d-flex">
                <div className="col-6">
                  <p>Permis / Licence drive</p>
                  <div>
                    <input type="radio" name="candidatLicensePermis" value="true" onChange={onFormDataChange} />
                    <span>Yes (B)</span>
                  </div>
                  <div>

                    <input type="radio" name="candidatLicensePermis" value="false" onChange={onFormDataChange} />
                    <span>No</span>
                  </div>
                </div>
                <div className="col-6">
                  <p>Voyage en voiture vers France ?</p>
                  <div>
                    <input type="radio" name="candidatConduireEnFrance" value="true" onChange={onFormDataChange} />
                    <span>Yes</span>
                  </div>
                  <div>

                    <input type="radio" name="candidatConduireEnFrance" value="false" onChange={onFormDataChange} />
                    <span>No</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-2">
                <label>Candidate Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  name="candidatEmail"
                  value={data.candidatEmail}
                  onChange={onFormDataChange}
                />
                <span className="text-small">

                  NOT Mandatory, please add email candidats
                </span>
              </div>

              <div className="p-2">
                <label>Candidate Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter candidat adress (address, zip, city, country)"
                  name="candidatAddress"
                  value={data.candidatAddress}
                  onChange={onFormDataChange}
                />
                <span className="text-small">
                  Mandatory, Enter candidat adress (address, zip, city, country)
                </span>
              </div>

              <div className="p-2">
                <label>Métier / Job</label>
                <select
                  name="candidatJob"
                  className="form-select"
                  onChange={onFormDataChange}
                >
                  {
                    jobs.map((job) =>
                      <option value={job.jobName}>
                        {job.jobName}
                      </option>
                    )
                  }

                </select>
                <span className="text-small">

                  Please select the job of this candidat, you can add job on the
                  BO.
                </span>
              </div>

              <div className="p-2">
                <label>Other phone number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone number (+format)"
                  name="candidatAlternatePhone"
                  value={data.candidatAlternatePhone}
                  onChange={onFormDataChange}
                />
                <span className="text-small">

                  NOT Mandatory, please add phone number of our contact in this
                  company if there is one, if not we will use company number.
                </span>
              </div>

              <div className="p-2">
                <label>Candidat Age </label>
                <input
                  type="number"
                  className="form-control"
                  name="candidatAge"
                  placeholder="42"
                  value={data.candidatAge}
                  onChange={onFormDataChange}

                />
                <span className="text-small">NOT Mandatory, NUMBER ONLY</span>
              </div>
              <div className="p-2">
                <p className="padding-bottom">Langues du candidat</p>
                <div>
                  <input type="checkbox" onClick={onFormDataChange} id="language" name="candidatLanguages" value="Roumain" />
                  <span className="ps-2" >Roumain</span>
                </div>
                <div>
                  <input type="checkbox" name="candidatLanguages" id="language" onClick={onFormDataChange} value="Francais" />
                  <span className="ps-2">Français</span>
                </div>
                <div>
                  <input type="checkbox" name="candidatLanguages" id="language" onClick={onFormDataChange} value="Anglais" />
                  <span className="ps-2">Anglais</span>
                </div>
                <div>
                  <input type="checkbox" name="candidatLanguages" id="language" onClick={onFormDataChange} value="Italien" />
                  <span className="ps-2">Italien</span>
                </div>
                <div>
                  <input type="checkbox" name="candidatLanguages" id="language" onClick={onFormDataChange} value="Russe" />
                  <span className="ps-2">Russe</span>
                </div>
                <div>
                  <input type="checkbox" name="candidatLanguages" id="language" onChange={onFormDataChange} value="Espagnol" />
                  <span className="ps-2">Espagnol</span>
                </div>
                <div>
                  <input type="checkbox" name="candidatLanguages" id="language" onChange={onFormDataChange} value="Autre" />
                  <span className="ps-2">Autre</span>
                </div>
              </div>

              <div className="p-2">
                <div className="card card-body">
                  <label className="fw-bold">
                    Quand ce candidat a besoin de travailler When this candidate
                    is ready to work with us
                  </label>
                  <br />
                  <label className="fw-bold">From date / A PARTIR DE </label>
                  <input
                    type="date"
                    className="form-control"
                    name="candidatStartDate"
                    value={data.candidatStartDate}
                    onChange={onFormDataChange}
                  />
                  <br />
                  <label className="fw-bold">UNTIL DATE / Jusqu’à </label>
                  <input
                    type="date"
                    className="form-control"
                    name="candidatEndDate"
                    value={data.candidatEndDate}
                    onChange={onFormDataChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <p>
                Expérience du candidat (fill only lines, higher = more recent)
              </p>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Période (Exemple Janvier 2020 à Janvier 2021)</th>
                    <th scope="col">Lieu de travail (Exemple Paris)</th>
                    <th scope="col">Travail effectué (Exemple : Facadier Isolateur)</th>
                    {/* <th scope="col">Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input type="text" name="period" required className="form-control" placeholder="Years" onChange={onFormDataChange} />
                    </td>
                    <td>
                      <input type="text" name="location" required className="form-control" placeholder="Work Location" onChange={onFormDataChange} />
                    </td>
                    <td>
                      <input type="text" name="workDoneSample" required className="form-control" placeholder="Work Done Sample" onChange={onFormDataChange} />
                    </td>
                    {/* <td>
                      <button className="btn btn-warning">Add More</button>
                    </td> */}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-6">
              <div className="p-2">
                <label>
                  Total années d’expérience / Total experiance in years of this
                  candidate
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="candidatYearsExperience"
                  placeholder="33"
                  value={data.candidatYearsExperience}
                  onChange={onFormDataChange}

                />
                <span className="text-small">NOT Mendatory, NUMBER ONLY</span>
              </div>
            </div>
            <div className="col-6">
              <div className="p-2">
                <p className="padding-bottom">
                  Fetes/date pour lequel il veux impérativement rentrer
                </p>

                <div>
                  <input type="checkbox" name="candidatFetes" id="fete" value="Easter" onClick={onFormDataChange} />
                  <span className="ps-2">Easter</span>
                </div>
                <div>
                  <input type="checkbox" name="candidatFetes" id="fete" value="Noel" onClick={onFormDataChange} />
                  <span className="ps-2">Noel</span>
                </div>
                <div>
                  <input type="checkbox" name="candidatFetes" id="fete" value="Summer" onClick={onFormDataChange} />
                  <span className="ps-2">Summer</span>
                </div>
                <div>
                  <input type="checkbox" name="candidatFetes" id="fete" value="Autre" onClick={onFormDataChange} />
                  <span className="ps-2">Autre / Other</span>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <label>
                Ce candidat a été rentré par : / This customer was entered by
              </label>
              <input
                type="text"
                name="enteredBy"
                placeholder="Entered By: "
                className="form-control"
                value={data.enteredBy}
                onChange={onFormDataChange}
              />
              <span className="text-small">
                Exemple : Jeremy Roggy; Patrick Bueno; TDR. Who entred this
                customer on the database
              </span>
            </div>
            <div className="col-md-12 col-12 py-4">
              <div className="submit-btn-hold p-1 mx-auto d-flex">
                <button className="btn btn-dark" type="submit">
                  Ajouter ce candidat / Add this candidate
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>)
}