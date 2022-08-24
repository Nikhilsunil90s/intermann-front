import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import "../../CSS/EditTodo.css";
import { useLocation } from "react-router-dom";
import { API_BASE_URL } from '../../config/serverApiConfig';
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import UploadDow from '../../components/Modal/SelectUploadDownload'
import axios from "axios";
import Switch from "react-switch";
import { ColourOption, colourOptions, colourOptionsFetes, fromPerson } from '../../Selecteddata/data';
import chroma from 'chroma-js';
import Select, {StylesConfig } from "react-select";
import {ReactComponent as TurnoFF} from "../../images/FatX.svg";
import {ReactComponent as TurnOn} from "../../images/base-switch_icon.svg";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
})

const EmployeeDataFormat = {
  candidatName: "",
  candidatEmail: "",
  candidatPhone: "",
  candidatAddress: "",
  candidatActivitySector: "",
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
  candidatPhoto: {},
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

interface State {
  profileData: any,
  path: any
}

function EditDo() {

  const navigate = useNavigate();

  const locationObject = useLocation();
  console.log(locationObject.state);
  const { profileData, path } = locationObject.state as State;
  console.log(profileData);
  const notifyDocumentUploadError = () => toast.error("Document Upload Failed! Please Try Again in few minutes.")
  const notifyDocumentUploadSuccess = () => toast.success("Document Uploaded Successfully!");


  const [data, setData] = useState(EmployeeDataFormat);
  const [formTouched, setFormTouched] = useState(false);
  const [profile, setProfile] = useState<any>(profileData);
  const [activitySectors, setActivitySectors] = useState([])
  const [selectedSector, setSelectedSector] = useState("");
  const [jobs, setJobs] = useState([]);
  const [period, setPeriod] = useState("");
  const [location, setLocation] = useState("");
  const [workDoneSample, setWorkDoneSample] = useState("");
  const [experienceChanged, setExperienceChanged] = useState(false);
  const [candidatMotivation, setCandidatMotivation] = useState(profile.candidatMotivation);
  const [selectedLanguages, setSelectedLanguages] = useState(profile.candidatLanguages);
  const [candidatImage, setCandidatImage] = useState("");
  const hiddenFileInput = React.useRef(null);
  const [displayRow, setDisplayRow] = useState(false);
  const [workExperience, setWorkExperience] = useState(profile.candidatExperienceDetails.length > 0 ? [...profile.candidatExperienceDetails] : []);
  const [allowEditExperience, setAllowEditExperience] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [periodModified, setPeriodModified] = useState(false);
  const [locationModified, setLocationModified] = useState(false);
  const [workDoneModified, setWorkDoneModified] = useState(false);
  const [UploadDownBtn,setUPDownState]= useState(false)
  const [Permis,setPermis]=useState(profile.candidatLicensePermis )
  const [Voyage,setVoyage]=useState(profile.candidatConduireEnFrance)
  const hiddenImageInput = React.useRef(null);
  const [Language, setLanguage] = useState([])
  const [sectorOptions, setSectorOptions] = useState([])as any;
  const [jobOptions, setJobOptions] = useState([]);
 


  const editExperience = (e: any) => {
    e.preventDefault()
    setAllowEditExperience(true);
    console.log(workExperience)
    setWorkExperience([{ period: "", location: "", workDoneSample: "" }])
  }

  
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

  const notifyCandidatEditSuccess = () => toast.success("Candidat Updated Successfully! View Candidat in To-Do List.");

  const notifyCandidatEditError = () => toast.error("Cannot Edit Candidat! Please Try Again.");

  const switchHandle=(checked,id,e)=>{
    console.log(checked,id,e,"all")
console.log(checked,"checked")
setFormTouched(true)
if(e=="Permis"){
if(checked === true){

      setPermis(true)
      setData({...data,candidatLicensePermis:true})
      setFormTouched(true)
    }
    if(checked === false){
      setPermis(false)
     setData({...data,candidatLicensePermis:false})
     setFormTouched(true)
    }
  }
    if(e=="Voyage"){
      if(checked == true){

        setVoyage(true)
     setData({...data,candidatConduireEnFrance:true})
      }
if(checked == false){
 
  setVoyage(false)
  setData({...data,candidatConduireEnFrance:false})
}
    }
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

  const fetchAllJobs = async (sector: string) => {
    return await fetch(API_BASE_URL + `fetchAllJobs/?sector=${sector}`, {
      method: "GET",
      headers: {
        "Accept": 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    }).then(resD => resD.json())
      .then(reD => {
        setJobs([...reD.data])
        let jobN= reD.data.map((el)=>{
          return {value:el.jobName,label:el.jobName,color:"#FF8B00"}
        })
        setJobOptions([...jobN])
      })
      .catch(err => err)
  }
  const handleImageUpload = () => {
    hiddenImageInput.current.click();
  }
  const handleImageChange = (val) => {
    if (val === 'upload') {
      console.log("upload")
      handleImageUpload()
    } else if (val === 'Download') {
      console.log("download")
      window.open(API_BASE_URL + "uploads/" + candidatImage);
    }
  }
  const onFormDataChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | any
    >
  ) => {
    console.log(e.target.name, e.target.value)
    setFormTouched(true);
    if (e.target.name === 'candidatPhoto') {
      console.log("Check photo")
      const fileUploaded = e.target.files[0];
      setCandidatImage(fileUploaded);
      // setData((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
      return;
    }
    if (e.target.name === "candidatActivitySector") {
      changeSectorSelection(e.target.value);
      return;
    }
    if (e.target.name === "candidatJob") {
      changeJobSelection(e.target.value);
      return;
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
      if (e.target.value) {
        setPeriodModified(true);
        setDisplayRow(true);
      }
      setData((prev) => ({ ...prev, ['candidatExperienceDetails']: [{ period: e.target.value, location: location, workDoneSample: workDoneSample }] }))
      return
    }
    if (e.target.name === 'location') {
      console.log(e.target.defaultValue);
      setLocation(e.target.value);
      if (e.target.value) {
        setLocationModified(true);
        setDisplayRow(true);
      }
      setData((prev) => ({ ...prev, ['candidatExperienceDetails']: [{ period: period, location: e.target.value, workDoneSample: workDoneSample }] }))
      return
    }
    if (e.target.name === 'workDoneSample') {
      setWorkDoneSample(e.target.value);
      if (e.target.value) {
        setWorkDoneModified(true);
        setDisplayRow(true);
      }
      setData((prev) => ({ ...prev, ['candidatExperienceDetails']: [{ period: period, location: location, workDoneSample: e.target.value }] }))
      return
    }
    if (e.target.name === 'candidatPhone2') {
      if (e.target.value) {
        setData((prev) => ({ ...prev, ['candidatAlternatePhone']: e.target.value }))
        return
      }
   
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
     fetchAllJobs(sec)
    }
    let jobN= jobs.map((el)=>{
      return {value:el.jobName,label:el.jobName,color:"#FF8B00"}
    })
    setJobOptions([...jobN])

  }

  const changeJobSelection = (value) => {
    setData((prev) => ({ ...prev, ["candidatJob"]: value }));
    setFormTouched(true)
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
    console.log(profile.candidatActivitySector)
    if (jobs.length === 0 && selectedSector != "" ? selectedSector : profile.candidatActivitySector !== "") {
      fetchAllJobs(selectedSector !== "" ? selectedSector : profile.candidatActivitySector)
        .then((data) => {
          console.log(data);
          setJobs([...data.data])
        })
        .catch(err => {
          console.log(err)
        })
        console.log(data);
        let jobResults = jobs.map(ajob => {
            return { value: ajob.jobName, label: ajob.jobName, color: '#FF8B00' }
          })
          setJobOptions([...jobResults]);
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
  },[selectedSector]);


  const addWorkExperience = (e: any) => {
    e.preventDefault();
    console.log(period, location, workDoneSample);
    if (period == "") {
      return
    }

    if (periodModified || locationModified || workDoneModified) {
      setWorkExperience([{  }])
    }

    setWorkExperience([...workExperience, { period: period, location: location, workDoneSample: workDoneSample }]);
    setDisplayRow(true);
    console.log(data)
  }

  const cancelWorkExperience = () => {
    const wex = workExperience.filter((workex, index) => {
      return workex.period != "" && index != workExperience.length
    })
    console.log(wex);
    setWorkExperience([...wex])
    setDisplayRow(false);
    setInputDisabled(true);
  }

  useEffect(() => {
    console.log("workex-", workExperience)
    const wex = workExperience.filter((workex) => {
      return workex.period != "" && workex.location != "" && workex.workDoneSample != "";
    })
    console.log(wex);
    setData((prev) => ({ ...prev, ["candidatExperienceDetails"]: wex }));
  }, [workExperience])

  const updateCandidat = async (updatedData: any) => {
    console.log(updatedData)
    let headers = {
      "Accept": 'application/json',
      "Authorization": "Bearer " + localStorage.getItem('token')
    }
    return await fetch(API_BASE_URL + "editToDoCandidat", {
      method: "POST",
      headers: headers,
      body: updatedData
    })
      .then(reD => reD.json())
      .then(resD => resD)
      .catch(err => err)
  }

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formTouched, data,"data1");
    if (formTouched == true) {
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
        candidatLicensePermis: Permis==true ? true : false,
        candidatConduireEnFrance: Voyage==true ? true : false,
        candidatSkills: data.candidatSkills != "" ? data.candidatSkills : profile.candidatSkills,
        candidatExperienceDetails: data.candidatExperienceDetails,
        candidatEmail: data.candidatEmail != "" ? data.candidatEmail : profile.candidatEmail,
        candidatPhone: data.candidatPhone != "" ? data.candidatPhone : profile.candidatPhone,
        candidatAddress: data.candidatAddress != "" ? data.candidatAddress : profile.candidatAddress,
        candidatFBURL: data.candidatFBURL != "" ? data.candidatFBURL : profile.candidatFBURL,
        candidatAlternatePhone :data.candidatAlternatePhone !="" ? data.candidatAlternatePhone : profile.candidatAlternatePhone,
        candidatYearsExperience: data.candidatYearsExperience != "" ? data.candidatYearsExperience : profile.candidatYearsExperience,
      }
      console.log(updatedData)
      // fileData.append('data', JSON.stringify(updatedData))
      let formdata = new FormData();
      formdata.append('image', candidatImage)
      formdata.append("data", JSON.stringify(updatedData))
      updateCandidat(formdata)
        .then(response => {
          if (response.status) {
            notifyCandidatEditSuccess()
            setTimeout(() => {
              navigate(path);
            }, 2000)
          }else{
            toast.error("Candidat Change Failed!")
        }
        })
        .catch(err => {
          console.log(err);
          notifyCandidatEditError()
        });
    } else {
      notifyCandidatEditError()
    }
  }
  const fileChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | any
    >
  ) => {
    if (e.target.name === 'candidatPhoto') {
      console.log(e.target.files,"e.target.files")
      console.log(e.target.files[0],"e.target.files[]")
      const fileUploaded = e.target.files[0]
      let formdata = new FormData();
      formdata.append('candidatId', profile._id)
      formdata.append('image', fileUploaded)
      axiosInstance.post("uploadCandidatImage", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": "Bearer " + localStorage.getItem('token')
        }
      })
        .then(datares => {
          console.log(datares)
          if (datares.data.status) {
            
            console.log(datares.data.status,"datares.data.status")
     // setCandidatImage(datares.data.filename)
     notifyDocumentUploadSuccess()

     
            setTimeout(()=>{
              window.location.href = "/editToDo"
            },2000)
          } else {
            notifyDocumentUploadError()
          }
        })
        .catch(err => { console.log(err) })
      return;
    }
  }
  const handleChange = (selectedOption) => {
    setFormTouched(true)
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
  const fetchCandidat = async (candidatId: any) => {
    return await fetch(API_BASE_URL + `getCandidatById/?candidatId=${candidatId}`, {
      method: "GET",
      headers: {
        "Accept": 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
    })
      .then(resp => resp.json())
      .then(respData => respData)
      .catch(err => err)
  }

  useEffect(() => {
    console.log(activitySectors);
    let sectorops = activitySectors.map((asector) => {
      return { value: asector.sectorName, label: asector.sectorName, color: '#FF8B00' }
    })

    setSectorOptions([...sectorops]);
  }, [activitySectors])

  useEffect(() => {
    console.log(profile._id,"id")
    fetchCandidat(profile._id).then(resData => {
      console.log(resData)

      setCandidatImage("")
      if (resData.status) {
        setProfile(resData.data)
        console.log(resData.data.candidatPhoto)
        setCandidatImage(resData.data.candidatPhoto !== undefined ? resData.data.candidatPhoto?.documentName : "")
      }
    })
      .catch(err => {
        console.log(err)
      })
  }, [])
  const handleSectorChange = (e: any) => {
    // console.log(e.target.value)

    console.log(e)
    if (e.value === "Select Un Secteur") {
      setJobs([]);
      setSelectedSector("");


    } else if (e.value !== '') {
      let sectorField = e.value;
      changeSectorSelection(sectorField)
      setData({...data,candidatActivitySector:sectorField})
    //   setJobOptions([]);
    setFormTouched(true)
    }
}
const jobChange = async (jobval) => {
  // console.log(jobval)
  let JobArr=""as any
  // jobval.map((el)=>{
   
  //  JobArr.push(el.value)

  // })
  JobArr=jobval.value
  setData({...data,candidatJob:JobArr})
  changeJobSelection(JobArr)
}

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerStyle={{ zIndex: '99999999999' }}
      />
      <div className="container-fluid" style={{marginTop:"90px"}}>
        <div className="row">
          {/* <div className="col-12 top-pd text-center">
            <h1 style={{ textDecoration: "underline" }}>EDIT: {profile.candidatName}</h1>
          </div> */}

          <form className="form" onSubmit={onFormSubmit}>
            <div className="col-12 ">
              <div className="row EditTopHeaderColor">
                <div className="col-6  d-flex align-items-center">
                <Link to="/todoprofile">
                    <button
                      type="button"
                      className="btn d-flex align-items-center p-0"
                    >
                      <img src={require("../../images/return.svg").default} />
                      <h2 className="card-Leads mb-0 pl-1"> Edit File : {profile.candidatName}</h2>
                    </button>
                  </Link>
                </div>
                <div className="col-6 d-flex justify-content-end align-items-center">
              <Link to={path} style={{ textDecoration: "none" }}>
                <button className="btn edit-btnCancel mr-1" type="button">
                  <img
                    style={{ width: "25%",marginRight:"5px" }}
                    src={require("../../images/multiply.svg").default}
                  />
                  <p className="mb-0 ">Cancel</p>
                </button>

              </Link>
              <button className="btn editBtnSave" type="submit">
                <img  style={{ width: "16%",marginRight:"5px" }} src={require("../../images/savebtn.svg").default} />
                Save Profile
              </button>
              </div>
              </div>
            </div>
            <div className="mt-1">
              <div className="col-12  p-1 bg-colorForEdit">
                <div className="row">
                  <div className="col-2 text-center ">
                  {candidatImage !== "" ?
                      <img
                        // src={require("../images/menlogos.svg").default}
                        src={API_BASE_URL + "uploads/" + candidatImage}
                     className="img-uploadTodo-Download"
                      /> :
                    <img
                      src={require("../../images/menlogos.svg").default}
                     className="img-uploadTodo-Download"
                    />
                    // 
                  }
               
<button
type="button"
 onClick={()=>{setUPDownState(!UploadDownBtn);}}
className="SelectBtn"
 ><img className="" src={require("../../images/select.svg").default} />
 {
  UploadDownBtn? 
  <UploadDow closeModal={setUPDownState}  FunModal={handleImageChange} />
  :
  null
 }
 </button>
<input
                    type="file"
                    ref={hiddenImageInput}
                    onChange={fileChange}
                    name="candidatPhoto"
                    style={{ display: 'none' }}
                  />
                  </div>
                  <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-6 card-xl">
                    <div className="row">
                      <div className="col-12">
                        <label className="LabelStylingEdits mb-0">Candidat Name</label>
                        <input style={{width:"71%"}} defaultValue={profile.candidatName} className="form-control" name="candidatName" onChange={onFormDataChange} />
                      </div>
                      <div className="col-12 topPdInput pt-2">
                        <label className="LabelStylingEdits mb-0" >Candidat Age<span className="LabelStylingSpanEdits">(IN YEARS)</span></label>
                        <input style={{width:"71%"}} defaultValue={profile.candidatAge} name="candidatAge" className="form-control" onChange={onFormDataChange} />
                      </div>
                     
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 d-flex align-items-center  text-end end-class" style={{paddingRight:"20px"}}>
                  <div className="text-center d-grid justify-content-end">
                    <div className="text-center">
                    <button className="todoBtnStyle">
                      <img style={{width:"8%"}} src={require("../../images/briefcase2.svg").default} />
                    </button>
                    </div>
                    <p className="fw-boldEn text-center  pl-0 pt-1" style={{marginRight:"10px"}}>
                    En recherche de contrat
                  </p>
                  </div>
              
                </div>
                </div>
              </div>

              <div className="col-12 mt-1 px-1 p mb-2">
                <div className="row bg-colorForEdit pt-1 px-1 pb-1">
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                    <label className="LabelStylingEdits mb-0" >Secteur d’Activité</label>
                    <div className="dropdown">
                      {/* <select className="form-select" name="candidatActivitySector" onChange={onFormDataChange}>
                        <option>Select Un Secteur</option>

                        {activitySectors.map((sector) =>
                          <option defaultValue={sector.sectorName} selected={profile.candidatActivitySector == sector.sectorName}>{sector.sectorName}</option> // fetch from api
                        )}
                      </select> */}
                          <Select
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            isMulti={false}
                                            closeMenuOnSelect={true}
                                            placeholder="‎ ‎ ‎ Select Un Secteur"
                                         
                                            options={sectorOptions}
                                            onChange={handleSectorChange}
                                            defaultValue={{value:profile.candidatActivitySector,label:profile.candidatActivitySector,color:"#FE8700"}  }
                                            styles={colourStyles}
                                            />
                    </div>
                   
                  </div>
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                    <label className="LabelStylingEdits mb-0" >Metier/Job</label>
                    <div className="dropdown">
                      <div aria-labelledby="dropdownMenuButton1">
                        {/* <select
                          name="candidatJob"
                          className="form-select"
                          onChange={onFormDataChange}
                        >
                          <option>Select Un Job</option>
                          {
                            jobs.map((job) =>
                              <option defaultValue={profile.candidatJob} selected={profile.candidatJob == job.jobName}>
                                {job.jobName}
                              </option>
                            )
                          }
                        </select> */}
                         
                          <Select
                      name="jobName"
                      closeMenuOnSelect={true}
                      isMulti={false}
                      placeholder="‎ ‎ ‎ Select"
                      className="basic-multi-select"
                      classNamePrefix="select"
                      defaultValue={{label:profile.candidatJob,value:profile.candidatJob,color:"#FE8700"}}
                      // defaultInputValue={{label:profile.clientJob,value:profile.clientJob,color:"#FE8700"}}
                      onChange={jobChange}
                      options={jobOptions}
                      styles={colourStyles}
                    />
                    
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 topPdInput">
                      <label className="LabelStylingEdits mb-0"> Candidat Email</label>
                      <input placeholder="Candidat Email" className="form-control" name="candidatEmail" defaultValue={profile.candidatEmail} onChange={onFormDataChange} />
                    </div>
                    <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-12 mt-3 pr-0">
              
                    <label className="LabelStylingEdits mb-0">Candidat Motivation</label>
                    <span className="LabelStylingSpanEdits">(bigger number is more important)</span>
                    <div className="coverClass  px-0">
                       
                          
                       <ul className="ul-Styling"><li>
                                                   <div className="text-center" style={{ height: "35px" }}>   <input
                                                     type="radio"
                                                     name="candidatMotivation"
                                                     value={1}
                              defaultChecked={candidatMotivation == 1}
                                                     onChange={onFormDataChange}
                                                     id="r1"
                                                   />     <label htmlFor="r1" className="react " >
                                                       <i data-icon="😟" >
                                                         </i>
                                                     </label>
                                                     <p className="m-0 font-Emoji">Dissapointed</p>
                                                     </div>
                                                     </li>
                                       <li>
                       
                                                   <div className=" both" style={{ height: "35px" }}>  <input
                                                     type="radio"
                                                     name="candidatMotivation"
                                                     value={2}
                              defaultChecked={candidatMotivation == 2}
                                                     onChange={onFormDataChange}
                                                     id="r2"
                                                   /> <label htmlFor="r2" style={{marginInline:"10px"}} className="react text-start">
                                                       <i data-icon="🙁" ></i>
                       
                                                     </label>
                                                     <p className="m-0 font-Emoji">Not really</p>
                                                   </div>
                                                   
                                                   </li><li>
                                               
                                                   <div className="text-center" style={{ height: "35px" }}>  <input
                                                     type="radio"
                                                     name="candidatMotivation"
                                                     value={3}
                              defaultChecked={candidatMotivation == 3}
                                                     onChange={onFormDataChange}
                                                     id="r3"
                                                   />     <label htmlFor="r3" className="react">
                                                       <i data-icon="😊"></i>
                                                     </label>
                                                     <p className="m-0 font-Emoji">Like</p>
                                                     </div>
                                                     </li><li>
                                               
                                                   <div className="text-center" style={{ height: "35px" }} >  <input
                                                     type="radio"
                                                     name="candidatMotivation"
                                                     value={4}
                              defaultChecked={candidatMotivation == 4}
                                                     onChange={onFormDataChange}
                                                     id="r4"
                                                   /><label htmlFor="r4" className="react">
                                                       <i data-icon="🥰"></i>
                                                     </label>
                                                     <p className="m-0 font-Emoji">Great</p>
                                                     </div>
                                                     </li>
                                        <li>
                                                   <div className="text-center" style={{ height: "35px" }}>  <input
                                                     type="radio"
                                                     name="candidatMotivation"
                                                     value={5}
                              defaultChecked={candidatMotivation == 5}
                                                     onChange={onFormDataChange}
                                                     id="r5"
                                                   /> <label htmlFor="r5" className="react text-start">
                                                       <i data-icon="😍"  style={{width:"35px"}}></i>
                                                     </label>
                                                   <p className="m-0  font-Emoji">Super lovely</p>
                       
                                                   </div>
                       
                                                  
                                                   </li>
                                                   </ul>
                    </div>
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-5 px-0 mt-3"><div className="d-flex"><label className="Permis ">Permis / Licence drive</label><span>   
                       <Switch
                          className=""
                          onChange={switchHandle}
                         checked={Permis}
                         value={Permis}
                          id="Permis"
                          checkedHandleIcon={
                            <TurnOn
                              style={{
                                position: "absolute",
                                width: "31px",
                                height: "25px",
                                top: "-3px",
                                left: "-6px",
                              }}
                            />
                          }
                          height={22}
                          width={48}
                          uncheckedHandleIcon={
                            <TurnoFF
                              style={{
                                position: "absolute",
                                width: "27px",
                                height: "26px",
                                top: "-3px",
                                left: "-3px",
                              }}
                            />
                          }
                        />
                        </span></div></div>
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-7  pr-0  mt-3">
                    <div className="d-flex"><label className="Permis" style={{width:"64%"}}>Voyage en voiture vers France ?</label><span>    <Switch
                          className=""
                          onChange={switchHandle}
                         checked={Voyage}
                          id="Voyage"
                          checkedHandleIcon={
                            <TurnOn
                              style={{
                                position: "absolute",
                                width: "31px",
                                height: "25px",
                                top: "-3px",
                                left: "-6px",
                              }}
                            />
                          }
                          height={22}
                          width={48}
                          uncheckedHandleIcon={
                            <TurnoFF
                              style={{
                                position: "absolute",
                                width: "27px",
                                height: "26px",
                                top: "-3px",
                                left: "-3px",
                              }}
                            />
                          }
                        /></span></div>
                    </div>
                  <div className="col-12 pt-4 d-flex">
                    <div className="row">
                        <label className="LabelStylingEdits mb-0" >
                          Quand ce candidat a besoin de travailler When this
                          candidate is ready to work with us
                        </label>
                        <br />
                        <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-6 mt-1">
                        <label className="FromDateEdit mb-0" >
                          From date / A PARTIR DE
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          name="candidatStartDate"
                          defaultValue={profile.candidatStartDate}
                          onChange={onFormDataChange}
                        />
                        </div>
                  <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-6 mt-1">
                        <label className="FromDateEdit mb-0" >UNTIL DATE / Jusqu’à </label>
                        <input
                          type="date"
                          className="form-control"
                          name="candidatEndDate"
                          defaultValue={profile.candidatEndDate}
                          onChange={onFormDataChange}
                        />
                        </div>
                        <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5 mt-2">
                        <label className="LabelStylingEdits"> Candidat phone number</label>
                      <input placeholder="Candidat Phone" className="form-control" name="candidatPhone" defaultValue={profile.candidatPhone} onChange={onFormDataChange} />
                      <p className="child-label">Use international format</p>
                        </div>
                        <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7 mt-2">
                      <label className="LabelStylingEdits " >Langues du candidat</label>
                        <div className="">
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
                          defaultValue={profile.candidatLanguages.map((el)=>{
                            return {value:el,label:el,color:"#FE8700"}
  })}
                        />
                        </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 mt-1">
                        <label className="LabelStylingEdits">Candidat phone number 2</label>
                      <input placeholder="Candidat Phone Number" className="form-control" name="candidatPhone2" defaultValue={profile.candidatAlternatePhone}   onChange={onFormDataChange} />
                      <p className="child-label">Use international format</p>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 mt-1">
                        <label className="LabelStylingEdits">Candidat Facebook</label>
                        <input placeholder="Candidat Facebook Profile" className="form-control" name="candidatFBURL" defaultValue={profile.candidatFBURL} onChange={onFormDataChange} />
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 mt-1 ">
                      <label className="LabelStylingEdits"> Candidat Experience in Years</label>
                      <input placeholder="Number only" className="form-control" name="candidatYearsExperience" defaultValue={profile.candidatYearsExperience} onChange={onFormDataChange} />
                    </div>
                    </div>
                  
                   
              </div>
              <div className="col-12 mt-1 ">
                 <h3 className="Expérience">
                  Expérience du candidat (fill only lines, higher = more recent)
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
                      workExperience.length > 0 ? (
                        workExperience.map((detail, index) =>
                          <tr>
                            <td>
                              <input type="text" disabled={index < workExperience.length - 1 || inputDisabled} name="period" placeholder="Years" className="form-control" defaultValue={index == workExperience.length - 1 && index != 0 ? null : detail.period} onChange={onFormDataChange} />
                            </td>
                            <td>
                              <input type="text" disabled={index < workExperience.length - 1 || inputDisabled} name="location" placeholder="Location" className="form-control" defaultValue={index == workExperience.length - 1 && index != 0 ? null : detail.location} onChange={onFormDataChange} />
                            </td>
                            <td>
                              <input type="text" disabled={index < workExperience.length - 1 || inputDisabled} name="workDoneSample" placeholder="Work Done Sample" className="form-control" defaultValue={index == workExperience.length - 1 && index != 0 ? null : detail.workDoneSample} onChange={onFormDataChange} />
                            </td>
                          </tr>
                        )
                      ) : (
                        <tr>
                          <td colSpan={3} className="text-center">
                            <p>No Experience Details Available!</p>
                            <button className="btn btn-primary" onClick={editExperience}>Click to Add Candidat Experience Details!</button>
                          </td>
                        </tr>
                      )
                    }
                    {
                      displayRow ?
                        (
                          <tr>
                            <td colSpan={3}>
                              <div className="row w-100">
                                <div className="col-6 text-center">
                                  <button className="btn btn-warning" onClick={addWorkExperience}>Save & Add More</button>
                                </div>
                                <div className="col-6 text-center">
                                  <button className="btn btn-danger" onClick={cancelWorkExperience}>Cancel</button>
                                </div>
                              </div>
                            </td>

                          </tr>

                        ) : null
                    }
                  </tbody>
                </table>
                <div className="col-12 mt-1 px-0">
                      <label className="LabelStylingEdits mb-0"> Candidat Adress</label>
                      <input placeholder="Candidat Address" className="form-control" name="candidatAddress" defaultValue={profile.candidatAddress} onChange={onFormDataChange} />
                    </div>
                    <div className="col-12 px-0 mt-2">
                    <p className="LabelStylingEdits mb-0">
                        Skills / Notes Compétances (will be displayed on CV)
                      </p>
                      <textarea
                        id="skills"
                        name="candidatSkills"
                        className="form-control"
                        defaultValue={profile.candidatSkills}
                        onChange={onFormDataChange}
                        rows={4}
                        style={{ overflow: 'hidden' }}
                      >
                      </textarea>
                </div>
               
               
                </div>

                  </div>
                </div>
                <div className="col-12 Social-Card mt-1">
              <div className='row  p-1'>
                            <div className='col-4  d-grid text-start'>
                                <label className="PDFFormlabel">Lieu_Mission</label>
                                <input className='form-control inputStylingForView' value={profile.candidatContract ?profile.candidatContract.lieu_mission ? profile.candidatContract.lieu_mission: "input Not Available!" : "input Not Available!"}  placeholder="‎ ‎ ‎ Lieu_Mission" />
                            </div>
                            <div className='col-4  d-grid text-start' >
                            <label className="PDFFormlabel">Durée_Mission</label>
                            <input className='form-control inputStylingForView' value={profile.candidatContract ?profile.candidatContract.duree_mission ? profile.candidatContract.duree_mission  : "input Not Available!" : "input Not Available!"}  placeholder="‎ ‎ ‎ Durée_Mission" />

                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel  d-flex align-items-start ">Durée_Hebdomadaire_Mission</label>
                            <input className='form-control inputStylingForView'value={profile.candidatContract ?profile.candidatContract.duree_hebdomadaire_mission? profile.candidatContract.duree_hebdomadaire_mission  : "input Not Available!" : "input Not Available!"} placeholder="‎ ‎ ‎ Durée_Hebdomadaire_Mission"/>

                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel">Candidate_Job</label>
                            <input className='form-control inputStylingForView' value={profile.candidatContract ?profile.candidatContract.candidatJob ? profile.candidatContract.candidatJob : "input Not Available!" : "input Not Available!"} placeholder="‎ ‎ ‎ Candidate_Job" />

                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel">CMP_CANDIDATE</label>
                            <input className='form-control inputStylingForView'value={profile.candidatContract ?profile.candidatContract.cmp_candidat? profile.candidatContract.cmp_candidat : "input Not Available!" : "input Not Available!"}  placeholder="‎ ‎ ‎ CMP_CANDIDATE" />

                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel">Contract_date</label>
                            <input className='form-control inputStylingForView' value={profile.candidatContract ?profile.candidatContract.contract_date ? profile.candidatContract.contract_date : "input Not Available!" : "input Not Available!"}  placeholder="‎ ‎ ‎ Contract_date" />

                            </div>
                            <div className='col-4  d-grid text-start'>
                                                      <label className="PDFFormlabel d-flex align-items-start ">Company_Contact_Name</label>
                            

                            <input className='form-control inputStylingForView'value={profile.candidatContract ?profile.candidatContract.company_contact_name ? profile.candidatContract.company_contact_name : "input Not Available!" : "input Not Available!"} placeholder="‎ ‎ ‎ Company_Contact_Name" />
                            
                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel">NR_INREG</label>
                            <input className='form-control inputStylingForView'value={profile.candidatContract ?profile.candidatContract.nr_inreg ? profile.candidatContract.nr_inreg : "input Not Available!" : "input Not Available!"}  placeholder="‎ ‎ ‎ NR_INREG" />

                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel">SERIE_ID</label>
                            <input className='form-control inputStylingForView'value={profile.candidatContract ?profile.candidatContract.serie_id ? profile.candidatContract.serie_id: "input Not Available!" : "input Not Available!"}  placeholder="‎ ‎ ‎ SERIE_ID" />

                            </div>
                            
                            <div className='col-4 d-grid text-start'>
                            <label className="PDFFormlabel">Candidate_Adress</label>
                            <input className='form-control inputStylingForView'value={profile.candidatContract ?profile.candidatContract.candidatAddress ? profile.candidatContract.candidatAddress : "input Not Available!" : "input Not Available!"}  placeholder="‎ ‎ ‎ Candidate_Adress" />

                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel">Company_Siret</label>
                            <input className='form-control inputStylingForView'value={profile.candidatContract ?profile.candidatContract.company_siret ? profile.candidatContract.company_siret : "input Not Available!": "input Not Available!"}  placeholder="‎ ‎ ‎ Company_Siret" />

                            </div>
                            
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Numero TF Candidat</label>
                            <input className='form-control inputStyling'  name='Numero_TF_Candidat'  placeholder="‎ ‎ ‎ Numero TF Candidat" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Company Vat</label>
                            <input className='form-control inputStyling'  name='Company_Vat'   placeholder="‎ ‎ ‎ Company Vat" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Salaire Brut</label>
                            <input className='form-control inputStyling'   name='Salaire_Brut'  placeholder="‎ ‎ ‎ Salaire Brut" />

                            </div>


                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Salaire Net</label>
                            <input className='form-control inputStyling'  name='Salaire_Net'  placeholder="‎ ‎ ‎ Salaire_Net" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Diurna Total Par Jour</label>
                            <input className='form-control inputStyling'  name='Diurna_Total_Par_Jour'  placeholder="‎ ‎ ‎ Diurna Total Par Jour" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Debut Mision (Date)</label>
                            <input className='form-control inputStyling' type="date"  name='Debut Mision Date'  placeholder="‎ ‎ ‎ Debut Mision Date" />

                            </div>



                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Heure Par Semaine</label>
                            <input className='form-control inputStyling'  name='Heure_Par_Semaine'  placeholder="‎ ‎ ‎ Heure Par Semaine" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Duree Hebdomadaire</label>
                            <input className='form-control inputStyling'  name='Duree_Hebdomadaire'   placeholder="‎ ‎ ‎ Duree Hebdomadaire" />

                            </div>
                            <div className='col-4  d-grid'>
                            <label className="PDFFormlabel">indemnisation jour</label>
                            <input className='form-control inputStyling'  name='indemnisation_jour'  placeholder="‎ ‎ ‎ indemnisation jour" />

                            </div>

                            <div className='col-12  d-grid text-start'>
                            <label className="PDFFormlabel">Company_Adress</label>
                            <textarea className='TextAreaPage form-control'value={profile.candidatContract ?profile.candidatContract.companyAddress ? profile.candidatContract.companyAddress : "input Not Available!": "input Not Available!"} placeholder='‎ ‎ ‎Company_Adress'></textarea>
                            </div>
                            <div className="col-12 px-0 mt-3">
                  <div className="row justify-content-end">
                    <div className="col-6 d-flex justify-content-end">
                      <Link to={path} style={{ textDecoration: "none" }}>

                        <button type="button" className="btn edit-btnCancel mr-1">
                          <img
                            style={{ width: "25%" }}
                            src={require("../../images/multiply.svg").default}
                          />
                          <p className="mb-0" style={{marginLeft:"5px"}}>Cancel</p>
                        </button>
                      </Link>
                      <button className="btn editBtnSave mb-0" type="submit">
                        <img style={{marginRight:"5px"}} src={require("../../images/savebtn.svg").default} />
                        Save Profile
                      </button>
                    </div>
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
