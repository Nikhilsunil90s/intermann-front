import React, { useState, useEffect } from "react";
import "../../CSS/Employes.css";
import { Toaster, toast } from 'react-hot-toast';
import { API_BASE_URL } from "../../config/serverApiConfig";
import Select from "react-select"
import Multiselect from "multiselect-react-dropdown"
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

let FilterJob=[]
export default function Employes() {
  
  const [data, setData] = useState(EmployeeDataFormat);
  const [jobs, setJobs] = useState([{ jobName: "", associatedSector: "", _id: "" }]);
  const [activitySectors, setActivitySectors] = useState([]);
  const [languages, setLangauges] = useState([]);
  const [fetes, setFetes] = useState([]);
  const [period, setPeriod] = useState("");
  const [location, setLocation] = useState("");
  const [workDoneSample, setWorkDoneSample] = useState("");
  const [Fetesdate,setFetesdate]=useState([
   
])as any;

  const [permis,setPermis]=useState(false)
  const [permisNo,setPermisNo]=useState(false)
  const [Voyage,setVoyage]=useState(false)
  const [VoyageNo,setVoyageNo]=useState(false)
  const [Language,setLanguage]=useState([
    {
      value:"Easter "
    },
    {
      value:"Noel"
    }
    ,{
      value:"Summer"
    },{
      value:"Autre / Other"
    }
  ])as any

  // Notifications //
  const notifyCandidatAddSuccess = () => toast.success("Candidat Added Successfully! View Candidat in To-Do List.");
  const notifyCandidatAddError = () => toast.error("Candidat Cannot Be Added! Please Try Again.");
  const notifyShortError=()=>toast.error("Phone Number is less than 10")
  const notifyMoreError=()=>toast.error("Phone Number is More than 10")
  const notifyEmptyError=()=>toast.error("Please enter full input fields")
  // End   //
  const HandleChecked=(e:any)=>{
    // FilterJob=[]
    if(!FilterJob.find((e) => e == 0)){
      console.log("hello")
        FilterJob.push();
        setLanguage(FilterJob);
  }
    else {
      if(FilterJob.length===1){
        FilterJob=[]
      }
      console.log(FilterJob.length,"index")
     console.log("not checked")
     FilterJob= FilterJob.filter((item)=>{return item !==0})
      console.log(FilterJob.length,"newarr")

      setLanguage(FilterJob)
      // console.log(selectedJob,"else")
    } 
  }
  useEffect(()=>{

  },[Language])

  let options = [
    { value:'Roumain' ,lable:'Roumain'},
    { value:'Françai' ,lable:'Françai'}
  ]as any;
  
  
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
 const FetesDate=(e)=>{
  console.log(e)
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
      setData((prev) => ({ ...prev, ['candidatExperienceDetails']: [{ period: period, location: location, workDoneSample: e.target.value }] }))
      return
    }
    if (e.target.name === 'candidatFetes') {
      if (e.target?.value) {
        alert("hello")
        addFetes(e.target.value)
        return
      // } else {
      //   removeFetes(e.target.value)
      //   return
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
    if(data.candidatName==""){
      notifyEmptyError()
      return false   
    }
    if(data.candidatPhone.length<10){
      notifyShortError()
      return false
    }
    if(data.candidatPhone.length>10){
      notifyMoreError()
      return false
    }
       saveCandidatData().then(data => {
      console.log(data,"resp")
      if (data.status===true) {
        notifyCandidatAddSuccess()
        // window.history.pushState({},"","/addCandidate")
        e.preventDefault()
        setData(EmployeeDataFormat)
        window.scroll({
              top: 0,
              left: 0,
              behavior: 'smooth'
            });
        setJobs([{ jobName: "", associatedSector: "", _id: "" }])
        setLangauges([])
        setLocation("")
        setWorkDoneSample("")
        setActivitySectors([])
        setFetes([])
        setPeriod("")
      }
       else if(data.status===false){
        notifyCandidatAddError()
        // window.location.href = "/addCandidate"
      }
    })
      .catch(err => {
        console.log(err)
      })
  };

  return (
    <> <Toaster position="top-right"/>
    <div className="container-fluid px-3">
   <div className="row">
        <div className="col-12 card-tops px-1 mt-2" style={{padding:"0px",marginBottom:"20px"}}>
          <div className="row text-start">
          <div className="card " style={{padding:"0px 15px",borderRadius:"15px",marginBottom:"0px"}}>
              <div className="card-body">
                <h2 className="card-Leads">Add a candidats / employes</h2>
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
                  className="form-control"
                  placeholder="Enter candidats name"
                  id="validationCustom01"
                  name="candidatName"
                  required
                  value={data.candidatName}
                  onChange={onFormDataChange}
                />
                 <div className="valid-feedback">
      Looks good!
    </div>
                <span className="text-small">
                  Mandatory, please add company candidat
                </span>
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

                  NOT Mandatory, please add email candidats
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
                </label><span className="Form-styling fs-6">(bigger number
                  is more important)</span>
                <ul className="coverClass d-flex px-0" style={{ listStyle: "none" }}>
                  <li>
                    <input
                      type="radio" 
                      name="candidatMotivation"
                      value={1}
                      onChange={onFormDataChange}
                      id="r1"
                    />
                  <label htmlFor="r1" className="react" >
<i data-icon="🙂"></i>
<span className="font-Emoji">Dissapointed</span>
</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="candidatMotivation"
                      value={2}
                      onChange={onFormDataChange}
                      id="r2"
                    />
                 <label htmlFor="r2" className="react">
<i data-icon="🙁"></i>
<span className="font-Emoji">Not really</span>
</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="candidatMotivation"
                      value={3}
                      onChange={onFormDataChange}
                      id="r3"
                    />
                  <label htmlFor="r3" className="react">
<i data-icon="😊"></i>
<span className="font-Emoji">Like</span>
</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="candidatMotivation"
                      value={4}
                      onChange={onFormDataChange}
                      id="r4"
                    />
                  <label htmlFor="r4" className="react">
<i data-icon="🥰"></i>
<span className="font-Emoji">Great</span>
</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="candidatMotivation"
                      value={5}
                      onChange={onFormDataChange}
                      id="r5"
                    />
                 <label htmlFor="r5" className="react">
<i data-icon="😍"></i>
<span className="font-Emoji">Super lovely</span>
</label>
                  </li>
                </ul>
              
</div>
           </div>
           <div className="col-6">
              <div className="p-1">
                <p className="padding-bottom Form-styling" >Langues du candidat</p>
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
              </div>
              <div className="col-6">
            <Select
  name="candidatLanguages"
  options={options}
  onChange={HandleChecked}
  defaultValue={options[0]}
  className="basic-multi-select"
  classNamePrefix="select"
  isMulti
/>
{/* <Multiselect  options={Language} displayValue={LanguageName} /> */}



              </div>
              <div className="col-6">
              <h2 className="text-small">
                  If we find the candidates, does he take it immediately? Or
                  will he still need to think?
                </h2>
         
              <div className="p-1 d-flex">
                <div className="col-6 ">
                  <p className="Form-styling"> Permis / Licence drive</p>
                  <div className="d-flex"> 
                 <button type="button" className="radioBtn" onClick={()=>setPermis(!permis)}><input type="radio" name="candidatLicensePermis" value="true" onChange={onFormDataChange} checked={permis} />Yes</button>
                 <button type="button" className="radioBtnNo mx-1" onClick={()=>setPermisNo(!permisNo)} ><input type="radio" name="candidatLicensePermis"  value="false" onChange={onFormDataChange} checked={permisNo} />No</button>
       
                  </div>
                </div>
                <div className="col-6">
                  <p className="Form-styling">Voyage en voiture vers France ?</p>
                  <div className="d-flex">
                <button type="button" className="radioBtn" onClick={()=>setVoyage(!Voyage)}>  <input type="radio" name="candidatConduireEnFrance" value="true" onChange={onFormDataChange} checked={Voyage}/>Yes</button>
              <button type="button" className="radioBtnNo mx-1" onClick={()=>setVoyageNo(!VoyageNo)}>    <input type="radio" name="candidatConduireEnFrance" value="false" onChange={onFormDataChange} checked={VoyageNo}/>No</button>
                    
                  </div>
                </div>
              </div>
              </div>
            
           <div className="col-12">
             <div className="row">
             <div className="col-6">
              <label className="fw-bold Form-styling">
                 Quand ce candidat a besoin de travailler When this candidate
                 is ready to work with us
               </label>
              </div>
               <div className="col-12">
                 <div className="row">
                   <div className="col-6">
                   <div className="p-1">
               
              
               <label className="fw-bold Form-styling">From date / A PARTIR DE </label>
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
               </div>
                   </div>
                 </div>
               </div>
            
             </div>
            
              </div>
             
            <div className="col-12 pt-1">
              <p className="Form-styling">
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
                <select name="candidatFetes" >
                  {
                    Language.map((el)=>(
                      <option value={el.value} onClick={(e)=>FetesDate(e)}>{el.value}</option>
                    ))
                  }
                </select>
              </div>
              <ul className="list-group">
                {Fetesdate.length > 0 ? (
                  Fetesdate.map((Fetes) => (
                   
                    <li
                    className="job-ul list-group-item list-group-item-action"
                    value={Fetes}
                  > <span style={{color:"black",textAlign:"center",width:"100%",display:"flex",justifyContent:"space-between"}}>
                   {/* {selectedJob.find((e) => e == Fetes) ? (
                          <div className="tick"></div>
                      ) : null}  */}
                  <p>{Fetes}</p></span>
                   
                  </li>
                  ))
                ) : (
                  <p>Please Select a Sector to view Jobs!</p>
                )}
              </ul>
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
      </div>
      </div>
    </div>
    </>)
}