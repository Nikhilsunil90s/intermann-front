import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import "../../CSS/EditTodo.css";
import { useLocation } from "react-router-dom";
import { API_BASE_URL } from '../../config/serverApiConfig';
import toast, { Toaster } from 'react-hot-toast';

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
  candidatEndDate: "",
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

function EditDo() {

  const { state } = useLocation();
  const [data, setData] = useState(EmployeeDataFormat);
  const [formTouched, setFormTouched] = useState(false);
  const [profile, setProfile] = useState<any>(state);
  const [activitySectors, setActivitySectors] = useState([])
  const [selectedSector, setSelectedSector] = useState("");
  const [jobs, setJobs] = useState([]);
  const [period, setPeriod] = useState("");
  const [location, setLocation] = useState("");
  const [workDoneSample, setWorkDoneSample] = useState("");
  const [experienceChanged, setExperienceChanged] = useState(false);
  const [candidatMotivation, setCandidatMotivation] = useState(profile.candidatMotivation);
  const [selectedLanguages, setSelectedLanguages] = useState(profile.candidatLanguages);

  const  notifyCandidatEditSuccess=() =>toast.success('Successfully toasted!')
const    notifyCandidatEditError=()=> toast.error("This didn't work.")
  // const notifyCandidatEditError = () => toast("Candidat Cannot Be Added! Please Try Again.", {
  //   position: toast.POSITION.TOP_RIGHT,
  //   className: 'toast-error',
  //   progressClassName: 'error-progress-bar',
  //   autoClose: 4000
  // });

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

  const onFormDataChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | any
    >
  ) => {
    console.log(e.target.name, e.target.value)
    setFormTouched(true);
    if (e.target.name === "candidatActivitySector") {
      changeSectorSelection(e.target.value);
      return;
    }
    if (e.target.name === "candidatJob") {
      changeJobSelection(e.target.value);
    }
    if (e.target.name === 'candidatMotivation ') {
      console.log(e.target.value);
      changeCandidatMotivation(e.target.value);
    }
    if (e.target.name === 'candidatLanguages') {
      if (e.target?.checked) {
        addLanguages(e.target.value);
        console.log(selectedLanguages)
        return
      } else {
        removeLanguages(e.target.value);
        console.log(selectedLanguages)

        return
      }
    }
    if (e.target.name === 'period') {
      setPeriod(e.target.value);
      setData((prev) => ({ ...prev, ['candidatExperienceDetails']: [{ period: e.target.value, location: location, workDoneSample: workDoneSample }] }))
      return
    }
    if (e.target.name === 'location') {
      console.log(e.target.defaultValue);
      setLocation(e.target.value);
      setData((prev) => ({ ...prev, ['candidatExperienceDetails']: [{ period: period, location: e.target.value, workDoneSample: workDoneSample }] }))
      return
    }
    if (e.target.name === 'workDoneSample') {
      setWorkDoneSample(e.target.value);
      setData((prev) => ({ ...prev, ['candidatExperienceDetails']: [{ period: period, location: location, workDoneSample: e.target.value }] }))
      return
    }
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const addLanguages = (lang: string) => {
    setSelectedLanguages((prev) => ([...prev, lang]));
    setData((prev) => ({ ...prev, ['candidatLanguages']: [...selectedLanguages, lang] }));
  }

  const removeLanguages = (lang: string) => {
    setSelectedLanguages(selectedLanguages.filter((l) => l !== lang));
    setData((prev) => ({ ...prev, ['candidatLanguages']: [...selectedLanguages.filter((l) => l !== lang)] }));
  }

  useEffect(() => {
    // console.log(data, languages);
  }, [selectedLanguages])

  const changeCandidatMotivation = (value: any) => {
    setData((prev) => ({ ...prev, ["candidatMotivation"]: value }));
    setCandidatMotivation(value);
  }

  const changeSectorSelection = async (sec: string) => {
    if (sec) {
      setSelectedSector(sec);
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

  const changeJobSelection = (value: string) => {
    setData((prev) => ({ ...prev, ["candidatJob"]: value }));
  }

  useEffect(() => {
    // console.log(profile)
    if (activitySectors.length === 0) {
      fetchActivitySectors()
        .then(redata => {
          console.log(redata);
          setActivitySectors([...redata.data]);
        })
        .catch(err => {
          console.log(err)
        })
    }

    if (jobs.length === 0) {
      fetchAllJobs(profile.candidatActivitySector)
        .then((data) => {
          console.log(data);
          setJobs([...data.data])
        })
        .catch(err => {
          console.log(err)
        })
    }

    if (data.candidatLanguages.length == 0) {
      console.log(selectedLanguages);
      setData((prev) => ({ ...prev, ["candidatLanguages"]: selectedLanguages }));
    }

    if (period == "") {
      profile.candidatExperienceDetails.map((detail) => {
        setPeriod(detail.period)
        setLocation(detail.location)
        setWorkDoneSample(detail.workDoneSample)
        setData((prev) => ({ ...prev, ['candidatExperienceDetails']: [{ period: detail.period, location: detail.location, workDoneSample: detail.workDoneSample }] }))
      })
    }
    console.log(data);
  });

  const updateCandidat = async (updatedData: any) => {
    return await fetch(API_BASE_URL + "editToDoCandidat", {
      method: "POST",
      headers: {
        "Accept": 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
      body: JSON.stringify(updatedData)
    })
      .then(reD => reD.json())
      .then(resD => resD)
      .catch(err => err)
  }

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formTouched, data);
    if (formTouched) {
      const updatedData = {
        candidatId: profile._id,
        candidatName: data.candidatName != "" ? data.candidatName : profile.candidatName,
        candidatAge: data.candidatAge != 0 ? data.candidatAge : profile.candidatAge,
        candidatMotivation: data.candidatMotivation != 0 ? data.candidatMotivation : profile.candidatMotivation,
        candidatActivitySector: selectedSector != "" ? selectedSector : profile.candidatActivitySector,
        candidatJob: data.candidatJob != "" ? data.candidatJob : profile.candidatJob,
        candidatLanguages: data.candidatLanguages != [] ? data.candidatLanguages : profile.candidatLanguages,
        candidatStartDate: data.candidatStartDate != "" ? data.candidatStartDate : profile.candidatStartDate,
        candidatEndDate: data.candidatEndDate != "" ? data.candidatEndDate : profile.candidatEndDate,
        candidatLicensePermis: data.candidatLicensePermis ? data.candidatLicensePermis : profile.candidatLicensePermis,
        candidatConduireEnFrance: data.candidatConduireEnFrance ? data.candidatConduireEnFrance : profile.candidatConduireEnFrance,
        candidatSkills: data.candidatSkills != "" ? data.candidatSkills : profile.candidatSkills,
        candidatExperienceDetails: data.candidatExperienceDetails,
        candidatEmail: data.candidatEmail != "" ? data.candidatEmail : profile.candidatEmail,
        candidatPhone: data.candidatPhone != "" ? data.candidatPhone : profile.candidatPhone,
        candidatAddress: data.candidatAddress != "" ? data.candidatAddress : profile.candidatAddress,
        candidatFBURL: data.candidatFBURL != "" ? data.candidatFBURL : profile.candidatFBURL,
        candidatYearsExperience: data.candidatYearsExperience != "" ? data.candidatYearsExperience : profile.candidatYearsExperience,
        candidatPhoto: data.candidatPhoto != "" ? data.candidatPhoto : ""
      }
      console.log(updatedData)
      updateCandidat(updatedData)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });

      notifyCandidatEditSuccess()
       } else {
      notifyCandidatEditError()
    }

  }

  return (
    <>
    <Toaster
  position="top-right"
  reverseOrder={false}
/>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 top-pd text-center">
            <h1 style={{ textDecoration: "underline" }}>EDIT: {profile.candidatName}</h1>
          </div>

          <div className="col-12 d-flex justify-content-end text-end ">
            <Link to="/todolist" style={{ textDecoration: "none" }}>
              <button className="btn bg-red">
                <img
                  style={{ width: "25%" }}
                  src={require("../../images/multiply.svg").default}
                />
                <p>Cancel</p>
              </button>

            </Link>

            <button className="btn btn-save">
              <img src={require("../../images/check.svg").default} />
              Save
            </button>
          </div>
          <form className="form" onSubmit={onFormSubmit}>
            <div className="bg-class">
              <div className="col-12 p-3 bg-color-card">
                <div className="row">
                  <div className="col-2 text-center ">
                    <img
                      src={require("../../images/menlogos.svg").default}
                      style={{ width: "90%" }}
                    />

                    <button type="button" className="btn btn-upload">
                      UPLOAD PHOTO
                    </button>
                  </div>
                  <div className="col-5 card-xl">
                    <div className="row">
                      <div className="col-12 flex-grid">
                        <label>Candidat Name</label>
                        <input defaultValue={profile.candidatName} className="form-control" name="candidatName" onChange={onFormDataChange} />
                      </div>
                      <div className="col-12 flex-grid pt-3">
                        <label>Candidat Age</label>
                        <input defaultValue={profile.candidatAge} name="candidatAge" className="form-control" onChange={onFormDataChange} />
                      </div>
                      <div className="col-12 flex-grid pt-3">
                        <label>Candidat Motivation</label>
                        <div className="d-flex">
                          <div>
                            <input
                              className="form-check-input"
                              type="radio"
                              name="candidatMotivation"
                              value={1}
                              defaultChecked={candidatMotivation == 1}
                              onChange={onFormDataChange}
                            />
                            <span className="ps-1">1</span>
                          </div>
                          <div className="ps-3">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="candidatMotivation"
                              value={2}
                              onChange={onFormDataChange}
                              defaultChecked={candidatMotivation == 2}

                            />
                            <span className="ps-1">2</span>
                          </div>
                          <div className="ps-3">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="candidatMotivation"
                              value={3}
                              onChange={onFormDataChange}
                              defaultChecked={candidatMotivation == 3}
                            />
                            <span className="ps-1">3</span>
                          </div>
                          <div className="ps-3">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="candidatMotivation"
                              value={4}
                              onChange={onFormDataChange}
                              defaultChecked={candidatMotivation == 4}

                            />
                            <span className="ps-1">4</span>
                          </div>
                          <div className="ps-3">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="candidatMotivation"
                              value={5}
                              onChange={onFormDataChange}
                              defaultChecked={candidatMotivation == 5}

                            /><span className="ps-1">5</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-5 text-end end-class">
                    <div>
                      <button type="button" className="btn btn-gray">
                        TO DO
                      </button>
                    </div>
                    <p className="fw-bold">En recherche de contrat</p>
                    <p>This candidate is looking for a job</p>
                  </div>
                </div>
              </div>

              <div className="col-12 ">
                <div className="row">
                  <div className="col-6">
                    <p className="Arial">Secteur d’Activité</p>
                    <div className="dropdown">
                      <select className="form-select" name="candidatActivitySector" onChange={onFormDataChange}>
                        {activitySectors.map((sector) =>
                          <option defaultValue={sector.sectorName} selected={profile.candidatActivitySector == sector.sectorName}>{sector.sectorName}</option> // fetch from api
                        )}
                      </select>
                    </div>
                    <p className="last-child">Langues du Candidat</p>
                    <div>
                      <div>
                        <input type="checkbox" name="candidatLanguages" className="form-check-input" value="Roumain" defaultChecked={profile.candidatLanguages.indexOf("Roumain") > -1} onChange={onFormDataChange} />
                        <span className="ps-2">Roumain</span>
                      </div>
                      <div>
                        <input type="checkbox" name="candidatLanguages" className="form-check-input" value="Francais" defaultChecked={profile.candidatLanguages.indexOf("Francais") > -1} onChange={onFormDataChange} />
                        <span className="ps-2">Français</span>
                      </div>
                      <div>
                        <input type="checkbox" name="candidatLanguages" className="form-check-input" value="Anglais" defaultChecked={profile.candidatLanguages.indexOf("Anglais") > -1} onChange={onFormDataChange} />
                        <span className="ps-2">Anglais</span>
                      </div>
                      <div>
                        <input type="checkbox" name="candidatLanguages" className="form-check-input" value="Italien" defaultChecked={profile.candidatLanguages.indexOf("Italien") > -1} onChange={onFormDataChange} />
                        <span className="ps-2">Italien</span>
                      </div>
                      <div>
                        <input type="checkbox" name="candidatLanguages" className="form-check-input" value="Russe" defaultChecked={profile.candidatLanguages.indexOf("Russe") > -1} onChange={onFormDataChange} />
                        <span className="ps-2">Russe</span>
                      </div>
                      <div>
                        <input type="checkbox" name="candidatLanguages" className="form-check-input" value="Espagnol" defaultChecked={profile.candidatLanguages.indexOf("Espagnol") > -1} onChange={onFormDataChange} />
                        <span className="ps-2">Espagnol</span>
                      </div>
                      <div>
                        <input type="checkbox" name="candidatLanguages" className="form-check-input" value="Autre" defaultChecked={profile.candidatLanguages.indexOf("Autre") > -1} onChange={onFormDataChange} />
                        <span className="ps-2">Autre</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <p className="Arial">Metier/Job</p>
                    <div className="dropdown">
                      <div aria-labelledby="dropdownMenuButton1">
                        <select
                          name="candidatJob"
                          className="form-select"
                          onChange={onFormDataChange}
                        >
                          {
                            jobs.map((job) =>
                              <option defaultValue={profile.candidatJob} selected={profile.candidatJob === job.jobName}>
                                {job.jobName}
                              </option>
                            )
                          }
                        </select>
                      </div>
                    </div>
                    <div className="pt-2">
                      <div className="card card-body">
                        <label className="fw-bold">
                          Quand ce candidat a besoin de travailler When this
                          candidate is ready to work with us
                        </label>
                        <br />
                        <label className="fw-bold">
                          From date / A PARTIR DE
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          name="candidatStartDate"
                          defaultValue={profile.candidatStartDate}
                          onChange={onFormDataChange}
                        />
                        <br />
                        <label className="fw-bold">UNTIL DATE / Jusqu’à </label>
                        <input
                          type="date"
                          className="form-control"
                          name="candidatEndDate"
                          defaultValue={profile.candidatEndDate}
                          onChange={onFormDataChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 pt-4 d-flex">
                    <div className="row">
                      <div className="col-6 ">
                        <p>Permis / Licence drive</p>
                        <div>
                          <input type="radio" name="candidatLicensePermis" value="true" className="form-check-input" defaultChecked={profile.candidatLicensePermis === true} onChange={onFormDataChange} />
                          <span>Yes</span>
                        </div>
                        <div>
                          <input type="radio" name="candidatLicensePermis" value="false" className="form-check-input" defaultChecked={profile.candidatLicensePermis === false} onChange={onFormDataChange} />
                          <span>No</span>
                        </div>
                      </div>
                      <div className="col-6">
                        <p>Voyage en voiture vers France ?</p>
                        <div>
                          <input type="radio" name="candidatConduireEnFrance" value="true" className="form-check-input" defaultChecked={profile.candidatConduireEnFrance === true} onChange={onFormDataChange} />
                          <span>Yes</span>
                        </div>
                        <div>
                          <input type="radio" name="candidatConduireEnFrance" value="true" className="form-check-input" defaultChecked={profile.candidatConduireEnFrance === false} onChange={onFormDataChange} />
                          <span>No</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6 ">
                      <p className="Arial">
                        Skills / Notes Compétances (will be displayed on CV)
                      </p>
                      <textarea
                        id="skills"
                        name="candidatSkills"
                        className="form-control"
                        style={{ height: "126px", width: "420px" }}
                        defaultValue={profile.candidatSkills}
                        onChange={onFormDataChange}
                      >
                      </textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 pt-4">
                <h3 className="exp">
                  Expérience du candidat
                </h3>
                <table className="table table-bordered border-dark">
                  <thead>
                    <tr>
                      <th scope="col">
                        Période (Exemple Janvier 2020 à Janvier 2021)
                      </th>
                      <th scope="col">Lieu de Travail (Exemple Paris)</th>
                      <th scope="col">
                        Travail effectué Exemple (Facadier Isolateur)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      profile.candidatExperienceDetails.length > 0 &&
                      profile.candidatExperienceDetails.map((detail) =>
                        <tr>
                          <td>
                            <input type="text" name="period" className="form-control" defaultValue={detail.period} onChange={onFormDataChange} />
                          </td>
                          <td>
                            <input type="text" name="location" className="form-control" defaultValue={detail.location} onChange={onFormDataChange} />
                          </td>
                          <td>
                            <input type="text" name="workDoneSample" className="form-control" defaultValue={detail.workDoneSample} onChange={onFormDataChange} />
                          </td>
                        </tr>
                      )

                    }
                  </tbody>
                </table>

                <div className="col-12">
                  <div className="row">
                    <div className="col-6 pt-1 flex-grid">
                      <label>Candidat email</label>
                      <input placeholder="Candidat Email" className="form-control" name="candidatEmail" defaultValue={profile.candidatEmail} onChange={onFormDataChange} />
                    </div>
                    <div className="col-6 pt-3 flex-grid">
                      <label>Candidat phone number</label>
                      <input placeholder="Candidat Phone" className="form-control" name="candidatPhone" defaultValue={profile.candidatPhone} onChange={onFormDataChange} />
                      <p className="child-label">Use international format</p>
                    </div>
                    <div className="col-6 pt-3 flex-grid">
                      <label>Candidat Adress</label>
                      <input placeholder="Candidat Address" className="form-control" name="candidatAddress" defaultValue={profile.candidatAddress} onChange={onFormDataChange} />
                    </div>
                    <div className="col-6 pt-1 flex-grid">
                      <label>Candidat Facebook</label>
                      <input placeholder="Candidat Facebook Profile" className="form-control" name="candidatFBURL" defaultValue={profile.candidatFBURL} onChange={onFormDataChange} />
                    </div>
                    <div className="col-6 pt-3 flex-grid">
                      <label>Candidat Experience in Years</label>
                      <input placeholder="Candidat Experience" className="form-control" name="candidatYearsExperience" defaultValue={profile.candidatYearsExperience} onChange={onFormDataChange} />
                      <p className="child-label">Number only</p>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="row">
                    <div className="col-6 d-flex">
                      <Link to="/todolist" style={{ textDecoration: "none" }}>

                        <button type="button" className="btn bg-red">
                          <img
                            style={{ width: "25%" }}
                            src={require("../../images/multiply.svg").default}
                          />
                          <p>Cancel</p>
                        </button>
                      </Link>
                      <button className="btn btn-save" type="submit">
                        <img src={require("../../images/check.svg").default} />
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditDo;
