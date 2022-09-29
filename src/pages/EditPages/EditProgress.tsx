import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../CSS/EditProgress.css";
import { useLocation } from "react-router-dom";
import { API_BASE_URL } from "../../config/serverApiConfig";
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
import ErrorLoader from '../../components/Loader/SearchBarError'

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
  candiatStatus: "In-Progress",
  candidateArchived: {
    reason: ""
  },
  lieu_mission:"",
  duree_mission:"",
  duree_hebdomadaire_mission:"",
  cmp_candidat:"",
  contract_date:"",
  company_contact_name:"",
  nr_inreg:"",
  serie_id:"",
  company_siret:"",
  companyAddress:"",
  numeroTFCandidat:"",
  companyVat:"",
  salaireBrut:"",
  salaireNet:"",
  diurnaTotalParJour:"",
  debutMissionDate:"",
  heurePerSemaine:"",
  duree_hebdomadaire:"",
  indemnisationJour:"",
  fin_mision:"",
  contractId:"",
}

interface State {
  profileData: any,
  path: any
}

function EditProgress() {

  const locationObject = useLocation();
  const { profileData, path } = locationObject.state as State;
  console.log(profileData);
  const navigate = useNavigate();
  const [data, setData] = useState(EmployeeDataFormat);
  const [profile, setProfile] = useState<any>(profileData);
  const [activitySectors, setActivitySectors] = useState([])
  const [selectedSector, setSelectedSector] = useState("")as any;
  const [formTouched, setFormTouched] = useState(false);
  const [candidatMotivation, setCandidatMotivation] = useState(profile.candidatMotivation);
  const [jobs, setJobs] = useState([]);
  const [period, setPeriod] = useState("");
  const [location, setLocation] = useState("");
  const [workDoneSample, setWorkDoneSample] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState(profile.candidatLanguages);
  const [workingFor, setWorkingFor] = useState(profile.candidatCurrentWork[0].workingFor);
  const [workingSince, setWorkingSince] = useState(profile.candidatCurrentWork[0].workingSince);
  const [salary, setSalary] = useState(profile.candidatCurrentWork[0].salary);
  const hiddenFileInput = React.useRef(null);
  const [candidatImage, setCandidatImage] = useState("");
  const [clients, setClients] = useState([]);
  const [UploadDownBtn,setUPDownState]= useState(false)
  const hiddenImageInput = React.useRef(null);
  const [Language, setLanguage] = useState([])
  const [workExperience, setWorkExperience] = useState(profile.candidatExperienceDetails.length > 0 ? [...profile.candidatExperienceDetails] : []);
  const [displayRow, setDisplayRow] = useState(false);
  const [periodModified, setPeriodModified] = useState(false);
  const [locationModified, setLocationModified] = useState(false);
  const [workDoneModified, setWorkDoneModified] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [Permis,setPermis]=useState(profile.candidatLicensePermis )
  const [Voyage,setVoyage]=useState(profile.candidatConduireEnFrance)
  const [sectorOptions, setSectorOptions] = useState([])as any;
  const [jobOptions, setJobOptions] = useState([]);
  const [contract_date,setcontract_date]=useState()as any
  const [debutMissionDate,setdebutMissionDate]=useState()as any
  const [fin_mision,setfin_mision]=useState()as any
  const [GetMonth,setMonth]=useState()as any
  const [GetMonth2,setMonth2]=useState()as any
  const [GetMonth3,setMonth3]=useState()as any

  const notifyDocumentUploadError = () => toast.error("Document Upload Failed! Please Try Again in few minutes.")
  const notifyDocumentUploadSuccess = () => toast.success("Document Uploaded Successfully!");

  const notifyCandidatEditSuccess = () => toast.success("Candidat Updated Successfully! View Candidat in In-Progress List.");

  const notifyCandidatEditError = () => toast.error("Cannot Edit Candidat! Please Try Again.");

  const notifyCandidatUntouched = () => toast.error("Cannot Edit This Candidat, Since No Data Changed!");


  useEffect(()=>{

    if(JSON.stringify(profile).includes(JSON.stringify(profile.candidatContract))){
    if(profile.candidatContract !== null){

    if(profile.candidatContract.contract_date){

   
          let tempdate =new Date(profile.candidatContract.contract_date)
          setMonth(tempdate.getMonth()+ 1)
          
        setcontract_date([tempdate.getFullYear() ,"0" + GetMonth,tempdate.getDate()].join("-"))
    }
    if(profile.candidatContract.debutMissionDate){
      let tempdate2 =new Date(profile.candidatContract.debutMissionDate)
      setMonth2(tempdate2.getMonth()+1)
      setdebutMissionDate([tempdate2.getFullYear() ,"0"+GetMonth2,tempdate2.getDate()].join("-"))
    }
    
    if(profile.candidatContract.fin_mision){
     let tempdate3 =new Date(profile.candidatContract.fin_mision)
      setMonth3(tempdate3.getMonth()+1)
      setfin_mision([tempdate3.getFullYear() ,"0"+GetMonth3,tempdate3.getDate()].join("-"))
    
    }

}}},)

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
    console.log(activitySectors);
    let sectorops = activitySectors.map((asector) => {
      return { value: asector.sectorName, label: asector.sectorName, color: '#FF8B00' }
    })

    setSectorOptions([...sectorops]);
  }, [activitySectors])
  
  useEffect(() => {
    console.log("workex-", workExperience)
    const wex = workExperience.filter((workex) => {
      return workex.period != "" && workex.location != "" && workex.workDoneSample != "";
    })
    console.log(wex);
    setData((prev) => ({ ...prev, ["candidatExperienceDetails"]: wex }));
  }, [workExperience])

  const editExperience = (e: any) => {
    e.preventDefault()
    console.log(workExperience)
    setWorkExperience([{ period: "", location: "", workDoneSample: "" }])
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
      .then(reD =>{
        setJobs([...reD.data])
        let jobN= reD.data.map((el)=>{
          return {value:el.jobName,label:el.jobName,color:"#FF8B00"}
        })
        setJobOptions([...jobN])
      })
      .catch(err => err)
  }

  const fetchClients = () => {
    return fetch(API_BASE_URL + "getClients", {
      method: "GET",
      headers: {
        "Accept": 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
    })
      .then(red => red.json())
      .then(d => d)
      .catch(err => err)
  }

  const addLanguages = (lang: string) => {
    setSelectedLanguages((prev) => ([...prev, lang]));
    setData((prev) => ({ ...prev, ['candidatLanguages']: [...selectedLanguages, lang] }));
  }

  const removeLanguages = (lang: string) => {
    setSelectedLanguages(selectedLanguages.filter((l) => l !== lang));
    setData((prev) => ({ ...prev, ['candidatLanguages']: [...selectedLanguages.filter((l) => l !== lang)] }));
  }

  const changeCandidatMotivation = (value: any) => {
    setData((prev) => ({ ...prev, ["candidatMotivation"]: value }));
    setCandidatMotivation(value);
  }

  const changeSectorSelection = async (sec: string) => {
    if (sec) {
      setSelectedSector(sec);
      await fetchAllJobs(sec)
      }
    let jobN= jobs.map((el)=>{
      return {value:el.jobName,label:el.jobName,color:"#FF8B00"}
    })
    setJobOptions([...jobN])

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
      window.open(API_BASE_URL + "uploads/" +candidatImage);
    }
  }
  const changeJobSelection = (value: string) => {
    setData((prev) => ({ ...prev, ["candidatJob"]: value }));
  }

  const onFormDataChange = (e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | any
  >) => {
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
    if (e.target.name === 'period')  {
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
    if (e.target.name === 'workingFor') {
      setWorkingFor(e.target.value);
      setData((prev) => ({ ...prev, ['candidatCurrentWork']: [{ workingFor: e.target.value, workingSince: workingSince, salary: salary }] }))
      return;
    }
    if (e.target.name === 'workingSince') {
      setWorkingSince(e.target.value);
      setData((prev) => ({ ...prev, ['candidatCurrentWork']: [{ workingFor: workingFor, workingSince: e.target.value, salary: salary }] }))
      return;
    }
    if (e.target.name === 'salary') {
      setSalary(e.target.value);
      setData((prev) => ({ ...prev, ['candidatCurrentWork']: [{ workingFor: workingFor, workingSince: workingSince, salary: e.target.value }] }));
      return;
    }
    if (e.target.name === 'candidatPhone2') {
      if (e.target.value) {
        setData((prev) => ({ ...prev, ['candidatAlternatePhone']: e.target.value }))
        return
      }
   
    }
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const updateCandidat = async (updatedData: any) => {
    return await fetch(API_BASE_URL + "editInProgressCandidat", {
      method: "POST",
      headers: {
        "Accept": 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
      body: updatedData
    })
      .then(reD => reD.json())
      .then(resD => resD)
      .catch(err => err)
  }

  const handleFileUpload = () => {
    hiddenFileInput.current.click();
  }

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formTouched) {
      const updatedData = {
        candidatId: profile._id,
        candidatName: data.candidatName != "" ? data.candidatName : profile.candidatName,
        candidatAge: data.candidatAge != 0 ? data.candidatAge : profile.candidatAge,
        candidatMotivation: data.candidatMotivation != 0 ? data.candidatMotivation : profile.candidatMotivation,
        candidatActivitySector: selectedSector != "" ? selectedSector : profile.candidatActivitySector,
        candidatJob: data.candidatJob != "" ? data.candidatJob : profile.candidatJob,
        candidatLanguages: data.candidatLanguages.length > 0 ? data.candidatLanguages : profile.candidatLanguages,
        candidatStartDate: data.candidatStartDate != "" ? data.candidatStartDate : profile.candidatStartDate,
        candidatEndDate: data.candidatEndDate != "" ? data.candidatEndDate : profile.candidatEndDate,
        candidatLicensePermis: Permis == true? true : false,        
        candidatConduireEnFrance: Voyage == true ? true : false,
        candidatSkills: data.candidatSkills != "" ? data.candidatSkills : profile.candidatSkills,
        candidatExperienceDetails: data.candidatExperienceDetails,
        candidatEmail: data.candidatEmail != "" ? data.candidatEmail : profile.candidatEmail,
        candidatPhone: data.candidatPhone != "" ? data.candidatPhone : profile.candidatPhone,
        candidatAddress: data.candidatAddress != "" ? data.candidatAddress : profile.candidatAddress,
        candidatFBURL: data.candidatFBURL != "" ? data.candidatFBURL : profile.candidatFBURL,
        candidatAlternatePhone :data.candidatAlternatePhone !="" ? data.candidatAlternatePhone : profile.candidatAlternatePhone,
        candidatYearsExperience: data.candidatYearsExperience != "" ? data.candidatYearsExperience : profile.candidatYearsExperience,
        candidatCurrentWork: [
          {
            workingFor: data.candidatCurrentWork[0].workingFor != "" ? data.candidatCurrentWork[0].workingFor : workingFor,
            workingSince: data.candidatCurrentWork[0].workingSince != "" ? data.candidatCurrentWork[0].workingSince : workingSince,
            salary: data.candidatCurrentWork[0].salary != "" ? data.candidatCurrentWork[0].salary : salary
          }
        ],
        lieu_mission: data.lieu_mission !="" ? data.lieu_mission : profile.candidatContract ? profile.candidatContract.lieu_mission : "" ,
        duree_mission: data.duree_mission != "" ? data.duree_mission : profile.candidatContract ? profile.candidatContract.duree_mission : "", 
        duree_hebdomadaire_mission: data.duree_hebdomadaire_mission !=""  ? data.duree_hebdomadaire_mission : profile.candidatContract ? profile.candidatContract.duree_hebdomadaire_mission : "",
        cmp_candidat: data.cmp_candidat != "" ? data.cmp_candidat : profile.candidatContract ? profile.candidatContract.cmp_candidat : "",
        contract_date:data.contract_date != "" ? data.contract_date : profile.candidatContract ? profile.candidatContract.contract_date : "",
        company_contact_name:data.company_contact_name != "" ? data.company_contact_name : profile.candidatContract ? profile.candidatContract.company_contact_name : "",
        nr_inreg:data.nr_inreg != "" ? data.nr_inreg : profile.candidatContract ? profile.candidatContract.nr_inreg : "",
        serie_id:data.serie_id !="" ? data.serie_id : profile.candidatContract ? profile.candidatContract.serie_id : "",
        company_siret:data.company_siret !="" ? data.company_siret : profile.candidatContract ? profile.candidatContract.company_siret : "",
        companyAddress:data.companyAddress !="" ? data.companyAddress : profile.candidatContract ? profile.candidatContract.companyAddress : "",
        numeroTFCandidat:data.numeroTFCandidat !="" ? data.numeroTFCandidat : profile.candidatContract ? profile.candidatContract.numeroTFCandidat : "",
        companyVat:data.companyVat !="" ? data.companyVat : profile.candidatContract ? profile.candidatContract.companyVat : "",
        salaireBrut:data.salaireBrut !="" ? data.salaireBrut : profile.candidatContract ? profile.candidatContract.salaireBrut : "",
        salaireNet:data.salaireNet !=""? data.salaireNet : profile.candidatContract ? profile.candidatContract.salaireNet : "",
        diurnaTotalParJour:data.diurnaTotalParJour !="" ? data.diurnaTotalParJour : profile.candidatContract ? profile.candidatContract.diurnaTotalParJour : "",
        debutMissionDate:data.debutMissionDate !="" ? data.debutMissionDate : profile.candidatContract ? profile.candidatContract.debutMissionDate : "",
        heurePerSemaine:data.heurePerSemaine !="" ? data.heurePerSemaine : profile.candidatContract ? profile.candidatContract.heurePerSemaine : "",
        duree_hebdomadaire:data.duree_hebdomadaire !="" ? data.duree_hebdomadaire : profile.candidatContract ? profile.candidatContract.duree_hebdomadaire : "",
        indemnisationJour:data.indemnisationJour != "" ? data.indemnisationJour : profile.candidatContract ? profile.candidatContract.indemnisationJour : "",
        fin_mision:data.fin_mision !="" ? data.fin_mision : profile.candidatContract ? profile.candidatContract.fin_mision : "",
        contractId:data.contractId !="" ? data.contractId : profile.candidatContract ? profile.candidatContract._id : null,
      }
      console.log(updatedData);
      let formdata = new FormData();
      formdata.append('image', candidatImage)
      formdata.append("data", JSON.stringify(updatedData))
      updateCandidat(formdata)
        .then(response => {
          if (response.status) {
            notifyCandidatEditSuccess();
            setTimeout(() => {
              navigate(path);
            }, 2000)
          } else {
            notifyCandidatEditError();
          }
        })
        .catch(err => {
          console.log(err)
          notifyCandidatEditError();

        })
    } else {
      notifyCandidatUntouched()
    }
  }
  
  const switchHandle=(checked,id,e)=>{

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


  const handleChange = (selectedOption) => {
    setFormTouched(true)
    let arr = []

    selectedOption.map((el) => {
      arr.push(el.value)
    })
    setLanguage(arr)
    setData({ ...data, candidatLanguages: arr })
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
          if (datares.data.status) {
     // setCandidatImage(datares.data.filename)
     notifyDocumentUploadSuccess()

     
            setTimeout(()=>{
              window.location.href = "/editInProgress"
            },2000)
          } else {
            notifyDocumentUploadError()
          }
        })
        .catch(err => { console.log(err) })
      return;
    }
  }

  useEffect(() => {
    if (clients.length == 0) {
      fetchClients()
        .then((result) => {
          if (result.status) {
            setClients([...result.data])
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  })

  useEffect(() => {
    if (activitySectors.length === 0) {
      fetchActivitySectors()
        .then(redata => {
          setActivitySectors([...redata.data]);
        })
        .catch(err => {
          console.log(err)
        })
    }

    if (jobs.length === 0 && selectedSector != "" ? selectedSector : profile.candidatActivitySector !== "") {
      fetchAllJobs(selectedSector != "" ? selectedSector : profile.candidatActivitySector !== "")
        .then((data) => {
          setJobs([...data.data])
        })
        .catch(err => {
          console.log(err)
        })
        
    }

    if (data.candidatLanguages.length == 0) {
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
  }, [activitySectors,selectedSector]);

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
    fetchCandidat(profile._id).then(resData => {
      setCandidatImage("")
      if (resData.status) {
        setProfile(resData.data)
      
        setCandidatImage(resData.data.candidatPhoto !== undefined ? resData.data.candidatPhoto?.documentName : "")
      
      }
    })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const handleSectorChange = (e: any) => {
    // console.log(e.target.value)

    if (e.value === "Select Un Secteur") {
      setJobs([]);
      setSelectedSector("");


    } else if (e.value !== '') {
      let sectorField = e.value;
      changeSectorSelection(sectorField)
      setData({...data,candidatActivitySector:sectorField})
      setFormTouched(true)
      setSelectedSector(sectorField)
    //   setJobOptions([]);
    }
}
const jobChange = async (jobval) => {
  // console.log(jobval)
  let JobArr=""as any
  JobArr=jobval.value
  setData({...data,candidatJob:JobArr})
  changeJobSelection(JobArr)
  setFormTouched(true)
}

  return (
    <>
      <Toaster position="top-right" containerStyle={{zIndex:"99999999999999999"}} />
      <div className="containet-fluid" style={{marginTop:"90px"}}>
        <div className="row">
          {/* <div className="col-12 top-pd text-center">
            <h1 style={{ textDecoration: "underline" }}>EDIT: {profile.candidatName}</h1>
          </div> */}
          <form className="form" onSubmit={onFormSubmit}>
            <div className="col-12">
            <div className="row EditTopHeaderColor">
            <div className="col-6  d-flex align-items-center">
                <Link to="/embauchprofile">
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
                <button type="button" className="btn  edit-btnCancel mr-1">
                  <img
                    style={{ width: "25%",marginRight:"5px" }}
                    src={require("../../images/multiply.svg").default}
                  />
                  <p className="mb-0 ">Cancel</p>
                </button>
              </Link>
              <button className="btn editBtnSave" type="submit">
                <img style={{ width: "16%",marginRight:"5px" }} src={require("../../images/savebtn.svg").default} />
                Save Profile
              </button>
</div>
            </div>
            </div>
            <div className="mt-1">
              <div className="col-12 p-1 bg-colorForEdit">
                <div className="row">
                  <div className="col-2 text-center">
                  {candidatImage !== "" ?
                      <img
                        // src={require("../images/menlogos.svg").default}
                        src={API_BASE_URL + "uploads/" + candidatImage}
                     className="imgEmbauch-upload-Download"
                      /> :
                    <img
                    src={require("../../images/menlogos.svg").default}
                   className="imgEmbauch-upload-Download"

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
                  <div className="col-6 card-xl">
                    <div className="row">
                      <div className="col-12">
                        <label className="LabelStylingEdits mb-0">Candidat Name</label>
                        <input style={{width:"71%"}} defaultValue={profile.candidatName} className="form-control" name="candidatName" onChange={onFormDataChange} />
                      </div>
                      <div className="col-12 pt-2">
                        <label className="LabelStylingEdits mb-0" >Candidat Age<span className="LabelStylingSpanEdits">(IN YEARS)</span></label>
                        <input style={{width:"71%"}} defaultValue={profile.candidatAge} name="candidatAge" className="form-control" onChange={onFormDataChange} />
                      </div>
                     
                    </div>
                  </div>
                  <div className="col-4 px-0 text-end end-class d-flex align-items-center justify-content-center">
                  <div className="text-center d-grid justify-content-end align-items-center pr-1">
                    <div className="text-end">
                    <button className="InProLargebtn">
                      <img src={require("../../images/thundermini.svg").default} />
                      IN PROGRESS
                    </button>
                    </div>
                    <p className="textinPro pl-5 pt-1">
                    Contrat en cours avec Interman
                  </p>
                  <p className="text-PREBtn-child">This candidate have active contract with us</p>
               
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
                                            closeMenuOnSelect={true}
                                            placeholder="‎ ‎ ‎ Select Un Secteur"
                                            defaultValue={{label:profile.candidatActivitySector,value:profile.candidatActivitySector,color:"#FE8700"}}
                                            styles={colourStyles}
                                            options={sectorOptions}
                                            onChange={handleSectorChange}
                                          
                                            />
                    </div>
                   
                  </div>
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                    <p className="Arial">Metier/Job</p>
                    <div className="dropdown">
                      <div aria-labelledby="dropdownMenuButton1">
                        {/* <select
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
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 ">
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
              <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-5 px-0 mt-3"><div className="d-flex"><label className="Permis ">Permis / Licence drive</label><span>    <Switch
                          className=""
                          onChange={switchHandle}
                         checked={Permis}
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
                        /></span></div></div>
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
              <div className="col-12 mt-1">
                <h3 className="Expérience">
                  Expérience du Candidat (fill only lines, higher = more recent)
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
                </div>
                <div className="col-12 editInprogressGround">
                  <div className="row">
                    <div className="col-5">
                      <p className="currentEMP mb-0">Current Employer</p>
                      <div className="dropdown">
                        <div aria-labelledby="dropdownMenuButton1">
                          <select className="form-select" style={{backgroundColor:"transparent",color:"white"}} name="workingFor"  onChange={onFormDataChange} defaultChecked>
                            <option  style={{color:"#000"}} >Select Un Client</option>
                            {
                              clients.length > 0 ?
                                clients.map((client) =>
                                  <option style={{color:"#000"}}  value={client.clientCompanyName} selected={profile.candidatCurrentWork[0].workingFor == client.clientCompanyName}>{client.clientCompanyName}</option>
                                ) : <option>No Clients/Job Leads Available!</option>
                            }
                         
                          </select>
                        </div>
                      </div>
                      <label className="shortNote">Please select the client with whom {profile.candidatName} is working with.</label>
                    </div>
                    <div className="col-6">
                      <p className="currentEMP mb-0">Current Salary</p>
                      <div className="d-flex">
                        <span className="AmountFieldSpan">€</span>
                        <input type="number" style={{borderRadius:"0px",backgroundColor:"transparent",color:"white"}} className="form-control" defaultValue={salary} name='salary' placeholder='Amount' onChange={onFormDataChange} />

                        <span className="AmountFieldSpan00">.00</span>
                      </div>
                    </div>
                  
                  </div>
                </div>
                <div className="col-6 mt-2">
                      <label className="FromDateEdit">FROM DATE / A PARTIR DE:</label>
                      <div className="input-group date" id="datepicker">
                        <input type="date" name="workingSince" defaultValue={workingSince} onChange={onFormDataChange} className="form-control" />
                      </div>
                    </div>
                    <div className="col-6 mt-2">
                      <label className="LabelStylingEdits"> Candidat Adress</label>
                      <input placeholder="Candidat Address" className="form-control" name="candidatAddress" defaultValue={profile.candidatAddress} onChange={onFormDataChange} />
                    </div>



                    
                   
                </div>
              </div>
            

            
            </div>
            <div className="col-12 Social-Card my-1">
              <div className='row  p-1'>
                {
                  JSON.stringify(profile).includes(JSON.stringify(profile.candidatContract)) ?
<>

                  <div className='col-4  d-grid '>
                                <label className="PDFFormlabel">Lieu Mission</label>
                                <input className='form-control inputStyling' defaultValue={profile.candidatContract ? profile.candidatContract.lieu_mission != "" ? profile.candidatContract.lieu_mission :"" : ""} name='lieu_mission' onChange={onFormDataChange} placeholder="‎ ‎ ‎ Lieu_Mission" />
                            </div>
                            <div className='col-4  d-grid ' >
                            <label className="PDFFormlabel">Durée Mission</label>
                            <input className='form-control inputStyling' defaultValue={profile.candidatContract ? profile.candidatContract.duree_mission != "" ? profile.candidatContract.duree_mission :"" :""} name='duree_mission' onChange={onFormDataChange}  placeholder="‎ ‎ ‎ Durée_Mission" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Durée Hebdomadaire Mission</label>
                            <input className='form-control inputStyling' defaultValue={profile.candidatContract ? profile.candidatContract.duree_hebdomadaire_mission != "" ? profile.candidatContract.duree_hebdomadaire_mission : "" : ""} name='duree_hebdomadaire_mission' onChange={onFormDataChange} placeholder="‎ ‎ ‎ Durée_Hebdomadaire_Mission"/>

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Candidate Job</label>
                            <input className='form-control inputStyling'  name='candidatJob' onChange={onFormDataChange} defaultValue={profile.candidatContract ? profile.candidatContract.candidatJob != "" ? profile.candidatContract.candidatJob : "" : ""} placeholder="‎ ‎ ‎ Candidate_Job" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">CMP CANDIDATE</label>
                            <input className='form-control inputStyling' defaultValue={profile.candidatContract ? profile.candidatContract.cmp_candidat !="" ? profile.candidatContract.cmp_candidat :""  :""}  name='cmp_candidat' onChange={onFormDataChange} placeholder="‎ ‎ ‎ CMP_CANDIDATE" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Contract Date</label>
                            <input className='form-control inputStyling'  type="date" defaultValue={profile.candidatContract ? profile.candidatContract.contract_date != "" ? contract_date : "" : ""} name='contract_date' onChange={onFormDataChange} placeholder="‎ ‎ ‎ Contract_date" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Company Contact Name</label>
                            <input  className='inputStylings wHCompany form-control' defaultValue={profile.candidatContract ? profile.candidatContract.company_contact_name != "" ? profile.candidatContract.company_contact_name : "" : ""} name='company_contact_name' onChange={onFormDataChange} placeholder="‎ ‎ ‎ Company_Contact_Name" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">NR INREG</label>
                            <input className='form-control inputStyling' defaultValue={profile.candidatContract ? profile.candidatContract.nr_inreg !="" ? profile.candidatContract.nr_inreg : "" : ""}  name='nr_inreg' onChange={onFormDataChange} placeholder="‎ ‎ ‎ NR_INREG" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">SERIE ID</label>
                            <input className='form-control inputStyling' defaultValue={profile.candidatContract ? profile.candidatContract.serie_id !=="" ? profile.candidatContract.serie_id :"" :""} name='serie_id' onChange={onFormDataChange} placeholder="‎ ‎ ‎ SERIE_ID" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Candidate Adress</label>
                            <input className='form-control inputStyling'  name='candidatAddress' onChange={onFormDataChange} defaultValue={profile.candidatContract ? profile.candidatContract.candidatAddress !=="" ? profile.candidatContract.candidatAddress : "" : ""} placeholder="‎ ‎ ‎ Candidate_Adress" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Company Siret</label>
                            <input className='form-control inputStyling' defaultValue={profile.candidatContract ? profile.candidatContract.company_siret !="" ? profile.candidatContract.company_siret : ""  : ""}  name='company_siret' onChange={onFormDataChange} placeholder="‎ ‎ ‎ Company_Siret" />

                            </div>


                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Numero TF Candidat</label>
                            <input className='form-control inputStyling'   name='numeroTFCandidat'  defaultValue={profile.candidatContract ? profile.candidatContract.numeroTFCandidat !="" ? profile.candidatContract.numeroTFCandidat : ""  : ""}  onChange={onFormDataChange} placeholder="‎ ‎ ‎ Numero TF Candidat" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Company Vat</label>
                            <input className='form-control inputStyling'  name='companyVat' onChange={onFormDataChange}  defaultValue={profile.candidatContract ? profile.candidatContract.companyVat !="" ? profile.candidatContract.companyVat : ""  : ""}   placeholder="‎ ‎ ‎ Company Vat" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Salaire Brut</label>
                            <input className='form-control inputStyling'   name='salaireBrut' onChange={onFormDataChange}  defaultValue={profile.candidatContract ? profile.candidatContract.salaireBrut !="" ? profile.candidatContract.salaireBrut : ""  : ""}  placeholder="‎ ‎ ‎ Salaire Brut" />

                            </div>


                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Salaire Net</label>
                            <input className='form-control inputStyling'  name='salaireNet' onChange={onFormDataChange}  defaultValue={profile.candidatContract ? profile.candidatContract.salaireNet !="" ? profile.candidatContract.salaireNet : ""  : ""}  placeholder="‎ ‎ ‎ Salaire_Net" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Diurna Total Par Jour</label>
                            <input className='form-control inputStyling'  name='diurnaTotalParJour' onChange={onFormDataChange}  defaultValue={profile.candidatContract ? profile.candidatContract.diurnaTotalParJour !="" ? profile.candidatContract.diurnaTotalParJour : ""  : ""}  placeholder="‎ ‎ ‎ Diurna Total Par Jour" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Debut Mision (Date)</label>
                            <input className='form-control inputStyling' type="date"  name='debutMissionDate' onChange={onFormDataChange}  defaultValue={profile.candidatContract ? profile.candidatContract.debutMissionDate !="" ? debutMissionDate : ""  : ""}  placeholder="‎ ‎ ‎ Debut Mision Date" />

                            </div>



                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Heure Par Semaine</label>
                            <input className='form-control inputStyling'  name='heurePerSemaine' onChange={onFormDataChange}  defaultValue={profile.candidatContract ? profile.candidatContract.heurePerSemaine !="" ? profile.candidatContract.heurePerSemaine : ""  : ""}  placeholder="‎ ‎ ‎ Heure Par Semaine" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Duree Hebdomadaire</label>
                            <input className='form-control inputStyling'  name='duree_hebdomadaire' onChange={onFormDataChange}  defaultValue={profile.candidatContract ? profile.candidatContract.duree_hebdomadaire !="" ? profile.candidatContract.duree_hebdomadaire : ""  : ""}   placeholder="‎ ‎ ‎ Duree Hebdomadaire" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">indemnisation jour</label>
                            <input className='form-control inputStyling'  name='indemnisationJour' onChange={onFormDataChange}  defaultValue={profile.candidatContract ? profile.candidatContract.indemnisationJour !="" ? profile.candidatContract.indemnisationJour : ""  : ""}  placeholder="‎ ‎ ‎ indemnisation jour" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Fin Mision</label>
                            <input className='form-control inputStyling'  type="date" name='fin_mision' onChange={onFormDataChange}  defaultValue={profile.candidatContract ? profile.candidatContract.fin_mision !="" ? fin_mision : ""  : ""}  placeholder="‎ ‎ ‎ indemnisation jour" />

                            </div>


                            <div className='col-12  d-grid '>
                            <label className="PDFFormlabel">Company Adress</label>
                            <textarea className='TextArea form-control' defaultValue={profile.candidatContract ? profile.candidatContract.companyAddress !=""? profile.candidatContract.companyAddress : "" : ""} name='companyAddress' onChange={onFormDataChange} placeholder='‎ ‎ ‎Company_Adress' ></textarea>
                            </div>
                        
    
                     </>
                     : 
                  <div className="col-12 d-flex justify-content-center pt-2">
                    <ErrorLoader  />
                    <p className="mb-0 ErrorSearchBox">
                    No Contract Available for this Candidat! Please add a New Contract.
                    </p>
                    </div>
                }
              
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
          </form>
        </div>
      </div>
    </>
  );
}
export default EditProgress;
