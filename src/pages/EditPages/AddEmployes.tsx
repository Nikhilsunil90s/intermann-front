import React, { useState, useEffect } from "react";
import "../../CSS/Employes.css";
import { Toaster, toast } from 'react-hot-toast';
import { API_BASE_URL } from "../../config/serverApiConfig";
import Select, { GroupBase, StylesConfig } from "react-select";
import chroma from 'chroma-js';
import { ColourOption, colourOptions, colourOptionsFetes, fromPerson } from '../../Selecteddata/data';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
// import  DateRangePicker from 'react-bootstrap-daterangepicker/dist/index.es';
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
  candidatComingFrom: [],
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

let FilterJob = []
export default function Employes() {

  const [data, setData] = useState(EmployeeDataFormat);
  const [jobs, setJobs] = useState([{ jobName: "", associatedSector: "", _id: "" }]);
  const [activitySectors, setActivitySectors] = useState([]);
  const [languages, setLangauges] = useState([]);
  const [fetes, setFetes] = useState([]);
  const [period, setPeriod] = useState("");
  const [location, setLocation] = useState("");
  const [workDoneSample, setWorkDoneSample] = useState("");
  const [Language, setLanguage] = useState([])
  const [showMessage, setShowMessage] = useState(false);
  const [FetesData, setFetesData] = useState([])
  const [person, setPerson] = useState([])
  const [showError, setShowError] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [displayRow, setDisplayRow] = useState(false);
  const [workExperience, setWorkExperience] = useState([{
    period: "",
    location: "",
    workDoneSample: ""
  }]);
  
  

  const colourStyles: StylesConfig<ColourOption, true> = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
            ? data.color
            : isFocused
              ? color.alpha(0.1).css()
              : undefined,
        color: isDisabled
          ? '#ccc'
          : isSelected
            ? chroma.contrast(color, 'white') > 2
              ? 'white'
              : 'black'
            : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default',

        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ':hover': {
        backgroundColor: data.color,
        color: 'white',
      },
    }),
  };
  // Notifications //

  const notifyCandidatAddSuccess = () => toast.success("Candidat Added Successfully! View Candidat in To-Do List.");

  const notifyCandidatAddError = () => toast.error("Candidat Cannot Be Added! Please Try Again.");

  const notifyNameError = () => toast.error("Please Provide Candidat Name !");

  const notifyDateError = () => toast.error("Ajouter les dates pour valider cette fiche !");

  const notifyAddressError = () => toast.error("Please Provide Candidat Address !");

  const wherePerson = (selectedOption) => {
    let PersonFromarr = []

    selectedOption.map((el) => {
      PersonFromarr.push(el.value)
    })
    setData({ ...data, candidatComingFrom: PersonFromarr })
  }

  const handleChange = (selectedOption) => {
    console.log(`Option selected:`, selectedOption)
    let arr = []

    selectedOption.map((el) => {
      arr.push(el.value)
    })
    setLanguage(arr)
    console.log(Language, "language")
    setData({ ...data, candidatLanguages: arr })
  }
  const FetesDate = (selectedOption: any) => {
    let FetesArr = []
    selectedOption?.map((el) => {
      FetesArr.push(el.value)
    })


    setData({ ...data, candidatFetes: FetesArr })
  }

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

  const checkCandidatName = async (name: any) => {
    return await fetch(API_BASE_URL + `checkCandidatName/?candidatName=${name}`, {
      method: 'GET',
      headers: {
        "Accept": 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
    })
      .then(resp => resp.json())
      .then(reD => reD)
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

  const addWorkExperience = (e: any) => {
    e.preventDefault();
    console.log(period, location, workDoneSample);
    if (period == "") {
      return
    }

    setWorkExperience([...workExperience, { period: period, location: location, workDoneSample: workDoneSample }]);

    setDisplayRow(true);
    console.log(data)
  }

  const cancelWorkExperience = () => {
    const wex = workExperience.filter((workex) => {
      return workex.period != ""
    })
    console.log(wex);
    setWorkExperience([...wex])
    setDisplayRow(false);
    setInputDisabled(true);
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
    if (e.target.name === "candidatName") {
      console.log(e.target.value)
      checkCandidatName(e.target.value.toLocaleUpperCase())
        .then(resData => {
          console.log(resData);
          if (resData.status) {
            setShowError(true);
          } else {
            setShowError(false);
          }
        })
        .catch(err => {
          console.log(err);
        })
      let val = e.target.value.toLocaleUpperCase()
      setData((prev) => ({ ...prev, ["candidatName"]: val }));
      return;
    }
    if (e.target.name === 'candidatMotivation') {
      changeSectorSelection(e.target.value);
      setShowMessage(true)
      setTimeout(() => {
        setShowMessage(false);
      }, 2500)
    }
    if (e.target.name === 'candidatLanguages') {
      if (e.target?.value) {
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
      if (e.target.value) {
        setDisplayRow(true);
      }
      return
    }
    if (e.target.name === 'candidatFetes') {
      if (e.target?.value) {
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


  useEffect(() => {
    console.log("workex-", workExperience)
    const wex = workExperience.filter((workex) => {
      return workex.period != "" && workex.location != "" && workex.workDoneSample != "";
    })
    console.log(wex);
    setData((prev) => ({ ...prev, ["candidatExperienceDetails"]: wex }));
  }, [workExperience])

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
    if (data.candidatName == "") {
      notifyNameError()
      return false
    }
    if (data.candidatStartDate == "") {
      notifyDateError()
      return false;
    }
    if (data.candidatAddress == "") {
      notifyAddressError()
      return false;
    }
    if (data.candidatEndDate == "") {
      setData((prev) => ({ ...prev, ["candidatEndDate"]: "2027-12-12" }));
      return false;
    }
    console.log(data);
    saveCandidatData().then(data => {
      console.log(data)
      if (data.status) {
        notifyCandidatAddSuccess()
        setTimeout(() => {
          window.location.href = "/addCandidate";
        }, 2000)

      } else {
        notifyCandidatAddError()
      }
    })
      .catch(err => {
        console.log(err)
      })
  };
  // const handleSelect=(ranges)=>{
  const   handleEvent=(event:any, picker:any)=> {
      console.log(picker.startDate);
    }
  const   handleCallback=(start:any, end:any, label:any)=> {
      console.log(start, end, label);
    }
  
  // console.log(format(new Date(ranges), 'yyyy/dd/MM'));
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  // }
  const selectionRange = {
    startDate: new Date(),
    endDate: "",
    key: 'selection',
  }

  return (
    <> <Toaster position="bottom-right" />
      <div className="container-fluid px-3">
        <div className="row">
          <div className="col-12 card-tops px-1 mt-2" style={{ padding: "0px", marginBottom: "20px" }}>
            <div className="row text-start">
              <div className="card " style={{ padding: "0px 15px", borderRadius: "15px", marginBottom: "0px" }}>
                <div className="card-body">
                  <h2 className="card-Leads">Add a Candidat / Employes</h2>
                </div>
              </div>
            </div>

          </div>

          <div className="col-12 p-0">
            <div className="row px-1 pb-1">
              <form className="add-form form needs-validation p-0" name="contact-form" onSubmit={onFormSubmit} noValidate>
                <div className="d-flex flex-wrap justify-content-around">
                  <div className="col-4">
                    <div className="p-1">
                      <label className="Form-styling" htmlFor="validationCustom01">Candidat Name</label>
                      <input
                        type="text"
                        className="form-control nameTransform"
                        placeholder="Enter candidats name"
                        id="validationCustom01"
                        name="candidatName"
                        required
                        value={data.candidatName.toLocaleUpperCase()}
                        onChange={onFormDataChange}
                      />
                      <div className="valid-feedback">
                        Looks good!
                      </div>
                      <span className="text-small">
                        Mandatory, please add company candidat
                      </span>
                      {
                        showError ?
                          <p style={{ color: 'red', overflow: 'hidden' }}>
                            Attention ! Un autre profil avec le meme nom existe déjà !
                          </p> : null
                      }
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-1">
                      <label className="Form-styling">Candidate Email</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter email"
                        name="candidatEmail"
                        value={data.candidatEmail}
                        onChange={onFormDataChange}
                      />
                      <span className="text-small">

                        NOT Mandatory, please add email candidat
                      </span>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-1">
                      <label className="Form-styling">Candidats Phone Number</label>
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
                  </div>
                  <div className="col-4">
                    <div className="p-1">
                      <label className="Form-styling">Candidate Address</label>
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
                  </div>
                  <div className="col-4">
                    <div className="p-1">
                      <label className="Form-styling">Secteur d’Activité</label>
                      <select
                        name="candidatActivitySector"
                        className="form-select "
                        required
                        onChange={onFormDataChange}
                      >
                        <option>Select Un Secteur</option>
                        {activitySectors.map((sector) =>
                          <option value={sector.name} >{sector.sectorName}</option> // fetch from api
                        )}
                      </select>
                      <span className="text-small">
                        Please select the sector of this candidat, you can add sector on
                        the BO.
                      </span>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-1">
                      <label className="Form-styling">Métier / Job</label>
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
                  </div>
                  <div className="col-4">
                    <div className="p-1">
                      <label className="Form-styling">Facebook profile</label>
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
                  </div>
                  <div className="col-4">
                    <div className="p-1">
                      <label className="Form-styling">Other phone number</label>
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
                  </div>
                  <div className="col-4">
                    <div className="p-1">
                      <label className="Form-styling">Candidat Age </label>
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
                  </div>
                  <div className="col-12">
                    <div className="p-1">
                      <label className="Form-styling">
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
                  </div>
                  <div className="col-6">
                    <div className="p-1">
                      <label className="Form-styling">
                        Motivation de ce candidat à travailler avec nous
                      </label>
                      <div className="col-12 coverClass  px-0">
                        <div className="row">
                          <div className="col-3  d-flex flex-column text-center">

                            <div className="text-center" style={{ height: "35px" }}>   <input
                              type="radio"
                              name="candidatMotivation"
                              value={1}
                              onChange={onFormDataChange}
                              id="r1"
                            />     <label htmlFor="r1" className="react" >
                                <i data-icon="😟"></i>
                              </label></div>
                            <span className="font-Emoji">Dissapointed</span>
                          </div>
                          <div className="col-2 both p-0 d-flex flex-column text-center">

                            <div className="text-center both" style={{ height: "35px" }}>  <input
                              type="radio"
                              name="candidatMotivation"
                              value={2}
                              onChange={onFormDataChange}
                              id="r2"
                            /> <label htmlFor="r2" className="react">
                                <i data-icon="🙁"></i>

                              </label>
                            </div>
                            <span className="font-Emoji">Not really</span>
                          </div>
                          <div className="col-2 p-0 d-flex flex-column text-center">

                            <div className="text-center" style={{ height: "35px" }}>  <input
                              type="radio"
                              name="candidatMotivation"
                              value={3}
                              onChange={onFormDataChange}
                              id="r3"
                            />     <label htmlFor="r3" className="react">
                                <i data-icon="😊"></i>

                              </label></div><span className="font-Emoji">Like</span>
                          </div>
                          <div className="col-2 p-0 d-flex flex-column text-center">

                            <div className="text-center" style={{ height: "35px" }} >  <input
                              type="radio"
                              name="candidatMotivation"
                              value={4}
                              onChange={onFormDataChange}
                              id="r4"
                            /><label htmlFor="r4" className="react">
                                <i data-icon="🥰"></i>
                              </label></div><span className="font-Emoji">Great</span>
                          </div>
                          <div className="col-3 d-flex flex-column text-center">

                            <div className="text-center" style={{ height: "35px" }}>  <input
                              type="radio"
                              name="candidatMotivation"
                              value={5}
                              onChange={onFormDataChange}
                              id="r5"
                            /> <label htmlFor="r5" className="react">
                                <i data-icon="😍"></i>
                              </label>
                            </div>
                            <span className="font-Emoji">Super lovely</span>
                          </div>
                        </div>
                        {showMessage ?
                          <h5 className="Form-styling mt-1">
                            Note: If we find the candidates, does he take it immediately? Or
                            will he still need to think?
                          </h5> : null}
                      </div>

                    </div>
                  </div>
                  <div className="col-6">
                    <div className="p-1">
                      <p className="padding-bottom Form-styling" >Langues du candidat</p>

                      <div className="pt-1">
                        <Select
                          name="candidatLanguages"
                          closeMenuOnSelect={false}
                          isMulti
                          placeholder="Select"
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={handleChange}
                          options={colourOptions}
                          styles={colourStyles}
                        />
                        </div>
                    </div>
                  </div>
                  <div className="col-6 p-1">
                    <p className="padding-bottom Form-styling">From where come this person</p>

                    <Select
                      name="candidatComingFrom"
                      closeMenuOnSelect={false}
                      isMulti
                      placeholder="Select"
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={wherePerson}
                      options={fromPerson}
                      styles={colourStyles}
                    />

                  </div>


                  <div className="col-6">

                    <div className="row p-1 d-flex">
                      <div className="col-6 ">
                        <p className="Form-styling"> Permis / Licence drive</p>
                        <div className="d-flex radiobtn">

                          <ul className="d-flex permis-UL p-0">
                            <li className="permis-LI">
                              <input type="radio" id="f-option" name="candidatLicensePermis" value="true" onChange={onFormDataChange} />
                              <label htmlFor="f-option"><p className="text-white">Yes</p></label>
                              <div className="check"></div>

                            </li>
                            <li className="permis-LI mx-1">
                              <input type="radio" id="t-option" name="candidatLicensePermis" value="false" onChange={onFormDataChange} />
                              <label htmlFor="t-option"><p className="text-white">No</p></label>

                              <div className="check"><div className="inside"></div></div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-6">
                        <p className="Form-styling">Voyage en voiture vers France ?</p>
                        <ul className="d-flex ul-check p-0">
                          <li className="li-check">
                            <input type="radio" id="e-option" name="candidatConduireEnFrance" value="false" onChange={onFormDataChange} />
                            <label htmlFor="e-option"><p className="text-white">Yes</p></label>
                            <div className="check"></div>

                          </li>
                          <li className="li-check">
                            <input type="radio" id="s-option" name="candidatConduireEnFrance" value="false" onChange={onFormDataChange} />
                            <label htmlFor="s-option"><p className="text-white">No</p></label>

                            <div className="check"><div className="inside"></div></div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="row">
                      <div className="col-6">
                        <label className="fw-bold Form-styling">
                          Quand ce candidat a besoin de travailler / When this candidate
                          is ready to work with us
                        </label>
                      </div>
                      <div className="col-12">
                        <div className="row">
                          <div className="col-6">
                            <div className="p-1">
                              <label className="fw-bold Form-styling">FROM DATE / A PARTIR DE </label>
                              <input
                                type="date"
                                className="form-control"
                                name="candidatStartDate"
                                value={data.candidatStartDate}
                                onChange={onFormDataChange}
                                
                              />
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="p-1">
                              <label className="fw-bold Form-styling">UNTIL DATE / Jusqu’à </label>
                              <input
                                type="date"
                                className="form-control"
                                name="candidatEndDate"
                                value={data.candidatEndDate}
                                onChange={onFormDataChange}
                                
                              />
                              {/* <input type="text"  name="datefilter" value="" /> */}
                                {/* <Calendar
        date={new Date()}
        onChange={handleSelect}
        ranges={[selectionRange]}
      /> */}
   {/* <DateRangePicker onEvent={handleEvent} onCallback={handleCallback} /> */}
        {/* <input /> */}
      {/* </DateRangePicker>; */}

                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>

                  <div className="col-12 pt-1">
                    <p className="Form-styling">
                      Expérience du Candidat
                    </p>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">Période (Exemple Janvier 2020 à Janvier 2021)</th>
                          <th scope="col">Lieu de Travail (Exemple Paris)</th>
                          <th scope="col">Travail Effectué (Exemple : Facadier Isolateur)</th>
                          {/* <th scope="col">Action</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {
                          workExperience.length > 0 && workExperience.map((workex, index) => (
                            <tr key={index}>
                              <td>
                                <input type="text" disabled={index < workExperience.length - 1 || inputDisabled} name="period" className="form-control" placeholder="Years" onChange={onFormDataChange} />
                              </td>
                              <td>
                                <input type="text" disabled={index < workExperience.length - 1 || inputDisabled} name="location" className="form-control" placeholder="Work Location" onChange={onFormDataChange} />
                              </td>
                              <td>
                                <input type="text" disabled={index < workExperience.length - 1 || inputDisabled} name="workDoneSample" className="form-control" placeholder="Work Done Sample" onChange={onFormDataChange} />
                              </td>
                              {/* <td>
                      <button className="btn btn-warning">Add More</button>
                    </td> */}
                            </tr>
                          ))
                        }
                        {
                          displayRow ?
                            (
                              <tr>
                                <td colSpan={3}>
                                  <div className="row w-100">
                                    <div className="col-6 text-center">
                                      <button className="btn btn-sm" style={{ backgroundColor: "#fe8700", color: 'white' }} onClick={addWorkExperience}>Save & Add More</button>
                                    </div>
                                    <div className="col-6 text-center">
                                      <button className="btn btn-sm" style={{ backgroundColor: "#032339", color: 'white' }} onClick={cancelWorkExperience}>Cancel</button>
                                    </div>
                                  </div>
                                </td>

                              </tr>

                            ) : null
                        }
                      </tbody>
                    </table>
                  </div>
                  <div className="col-6">
                    <div className="p-1">
                      <label className="Form-styling">
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
                    <div className="p-1">
                      <p className="padding-bottom Form-styling">
                        Fetes/date pour lequel il veux impérativement rentrer
                      </p>
                      <div className="pt-1">
                        <Select
                          name="candidatFetes"
                          options={colourOptionsFetes}
                          styles={colourStyles}
                          onChange={FetesDate}
                          placeholder="Select"
                          className="basic-multi-select"
                          classNamePrefix="select"
                          isMulti
                          closeMenuOnSelect={false}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <label className="Form-styling">
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
                  <div className="col-md-12 py-4 d-flex justify-content-center px-2">
                    <button className="btn btn-dark text-light  btn-stylingEnd" type="submit" >
                      Ajouter ce candidat / Add this candidate
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>)
}