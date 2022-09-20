import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../CSS/Client/Client_toDoEdit.css";
import { useLocation } from "react-router-dom";
import { API_BASE_URL } from "../../config/serverApiConfig";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import Select,{StylesConfig}  from "react-select"
import Switch from "react-switch"
import { ColourOption ,colourOptions} from "../../Selecteddata/data";
import chroma from "chroma-js"
import UploadDow from '../../components/Modal/SelectUploadDownload'
import RatingCmp from '../../components/AddClientRating/Rating'
import {ReactComponent as TurnoFF} from "../../images/FatX.svg";
import {ReactComponent as TurnOn} from "../../images/base-switch_icon.svg";
const ClientDataFormat = {
    clientCompanyName: "",
    clientEmail: "",
    clientPhone: "",
    clientAddress: "",
    clientActivitySector: "",
    clientJob: "",
    clientLanguages: [],
    clientReferenceName: "",
    clientReferenceNumber: "",
    clientRequiredSkills: "",
    numberOfPosts: "",
    clientPermis: false,
    clientMotivation: 0,
    jobStartDate: "",
    jobEndDate: "",
    jobTotalBudget: 0,
    netSalary: 0,
    clientImportance: 0,
    clientPhoto: {},
    enteredBy: "",
    jobStatus: "To-Do",
    clientReferenceEmail: "",
}
let Amountarr = "";
let Hours = "";
function ClientArchivedEdit() {

    const notifyClientEditSuccess = () => toast.success("Client Updated Successfully! View Client in To-Do Clients/Leads List.");

    const notifyClientEditError = () => toast.error("Cannot Edit This Candidat, Since No Data Changed!");

    const { state } = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState(ClientDataFormat);
    const [formTouched, setFormTouched] = useState(false);
    const [profile, setProfile] = useState<any>(state);
    const [activitySectors, setActivitySectors] = useState([])
    const [selectedSector, setSelectedSector] = useState("");
    const [jobs, setJobs] = useState([]);
    const [clientMotivation, setClientMotivation] = useState(profile.clientMotivation);
    const [selectedLanguages, setSelectedLanguages] = useState(profile.clientLanguages);
    const [clientImportance, setClientImportance] = useState(profile.clientImportance);
    const [clientImage, setClientImage] = useState("");
    const hiddenFileInput = React.useRef(null);
    const [imgSource, setImgSource] = useState("");
  const [sectorOptions, setSectorOptions] = useState([])as any;
  const [jobOptions, setJobOptions] = useState([]);
  const [StarRatings,setRatings]=useState(profile.clientImportance)
  const [Language, setLanguage] = useState([])
  const [showHour, setShowHour] = useState("");
  const [id, setID] = useState("");
  const hiddenImageInput = React.useRef(null);
  const [Permis,setPermis]=useState(profile.clientPermis)as any
  // const[clientImg,setClientImg]=useState(profile.clientPhoto.imageName)
  const [UploadBtn,setSelectUpload]= useState(false)
    const [SalaryH,setSalaryH]=useState([
      {
          value:"10000rs",id:"1",text:"35H"
      },
      {
          value:"20000rs",id:"2",text:"39H"
      },
      {
          value:"30000rs",id:"3",text:"40H"
      },
      {
          value:"40000rs",id:"4",text:"41H"
      },
      {
          value:"50000rs",id:"5",text:"42H"
      },
      {
          value:"60000rs",id:"6",text:"43H"
      },
      {
          value:"70000rs",id:"7",text:"44H"
      },
      {
          value:"80000rs",id:"8",text:"45H"
      },
    ])as any
  
 
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
 
  
    const RemoveHandling=()=>{
      setShowHour("")
      setID("")
    }
    const notifyPhotoUploadSuccess = () => toast.success("Client/Company Image Uploaded Successfully!");

    const notifyPhotoUploadError = () => toast.error("Cannot Upload Client/Company Image! Please Try Again.");

    const uploadImage = async (imagedata: any) => {
        return await fetch(API_BASE_URL + "uploadClientImage", {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: imagedata
        })
            .then(resp => resp.json())
            .then(respData => respData)
            .catch(err => err)
    }

    const fetchClient = async (clientId: any) => {
        return await fetch(API_BASE_URL + `getClientById/?clientId=${clientId}`, {
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

    useEffect(() => {
        console.log(profile._id, profile.clientPhoto)
        fetchClient(profile._id).then(resData => {
            console.log(resData)
            if (resData.status) {

                setImgSource(resData.data.clientPhoto.imageName)
            }
        })
            .catch(err => {
                console.log(err)
            })
    }, [state])


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


    const changeClientMotivation = (value: any) => {
        setData((prev) => ({ ...prev, ["clientMotivation"]: value }));
        setClientMotivation(value);
    }

    const changeClientImportance = (value: any) => {
        setData((prev) => ({ ...prev, ["clientImportance"]: value }));
        setClientImportance(value);
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
        setData((prev) => ({ ...prev, ["clientJob"]: value }));
    }

    const addLanguages = (lang: string) => {
        setSelectedLanguages((prev) => ([...prev, lang]));
        setData((prev) => ({ ...prev, ['clientLanguages']: [...selectedLanguages, lang] }));
    }

    const removeLanguages = (lang: string) => {
        setSelectedLanguages(selectedLanguages.filter((l) => l !== lang));
        setData((prev) => ({ ...prev, ['clientLanguages']: [...selectedLanguages.filter((l) => l !== lang)] }));
    }

    const updateClient = async (updatedData: any) => {
        console.log(updatedData)
        let headers = {
            "Accept": 'application/json',
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
        return await fetch(API_BASE_URL + "editToDoClient", {
            method: "POST",
            headers: headers,
            body: updatedData
        })
            .then(reD => reD.json())
            .then(resD => resD)
            .catch(err => err)
    }

    const handleFileUpload = () => {
        hiddenFileInput.current.click();
    }

    const onFormDataChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | any
        >
    ) => {
        console.log(e.target.name, e.target.value)
        setFormTouched(true);
        if (e.target.name === 'clientPhoto') {
            console.log("Check photo")
            const fileUploaded = e.target.files[0];
            setClientImage(fileUploaded);
            let formdata = new FormData();
            formdata.append('clientId', profile._id);
            formdata.append('image', fileUploaded);
            uploadImage(formdata).then((respdata) => {
                console.log(respdata);
                notifyPhotoUploadSuccess()
                setTimeout(() => {
                    window.location.href = "/archivedClientEditprofile"
                }, 1500)
            }).catch(err => {
                notifyPhotoUploadError()
                console.log(err);
            })
        }
        if (e.target.name === "clientActivitySector") {
            changeSectorSelection(e.target.value);
            return;
        }
        if (e.target.name === "clientJob") {
            changeJobSelection(e.target.value);
            return;
        }
        if (e.target.name === 'clientLanguages') {
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

        if (e.target.name === 'clientMotivation') {
            console.log(e.target.value);
            changeClientMotivation(e.target.value);
        }

        if (e.target.name === 'clientImportance') {
            console.log(e.target.value);
            changeClientImportance(e.target.value);
        }

        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }


    const switchHandle=(checked,id,e)=>{
      console.log(checked,id,e,"all")
  console.log(id,"checked")
  setFormTouched(true)
  if(e=="Permis"){
  if(checked === true){
        setPermis(true)
        setData({...data,clientPermis:true})
        setFormTouched(true)
      }
      if(checked === false){
        setPermis(false)
       setData({...data,clientPermis:false})
       setFormTouched(true)
      }
    }
   
    }

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data)
        if (formTouched) {
            const updatedData = {
                clientId: profile._id,
                clientName: data.clientCompanyName != "" ? data.clientCompanyName : profile.clientCompanyName,
                numberOfPosts: data.numberOfPosts != "" ? data.numberOfPosts : profile.numberOfPosts,
                clientMotivation: data.clientMotivation != 0 ? data.clientMotivation : profile.clientMotivation,
                clientImportance: data.clientImportance != 0 ? data.clientImportance : profile.clientImportance,
                clientActivitySector: selectedSector != "" ? selectedSector : profile.clientActivitySector,
                clientJob: data.clientJob != "" ? data.clientJob : profile.clientJob,
                clientLanguages: data.clientLanguages.length > 0 ? data.clientLanguages : profile.clientLanguages,
                jobStartDate: data.jobStartDate != "" ? data.jobStartDate : profile.jobStartDate,
                jobEndDate: data.jobEndDate != "" ? data.jobEndDate : profile.jobEndDate,
                clientPermis: data.clientPermis == true ? true : profile.clientPermis,
                clientRequiredSkills: data.clientRequiredSkills != "" ? data.clientRequiredSkills : profile.clientRequiredSkills,
                clientEmail: data.clientEmail != "" ? data.clientEmail : profile.clientEmail,
                clientPhone: data.clientPhone != "" ? data.clientPhone : profile.clientPhone,
                jobTotalBudget: data.jobTotalBudget != 0 ? data.jobTotalBudget : profile.jobTotalBudget,
                netSalary: data.netSalary != 0 ? data.netSalary : profile.netSalary,
                clientAddress: data.clientAddress != "" ? data.clientAddress : profile.clientAddress,
                clientReferenceName: data.clientReferenceName != "" ? data.clientReferenceName : profile.clientReferenceName,
                clientReferenceNumber: data.clientReferenceNumber != "" ? data.clientReferenceNumber : profile.clientReferenceNumber,
                clientReferenceEmail: data.clientReferenceEmail != "" ? data.clientReferenceEmail : profile.clientReferenceEmail
            }
            console.log(updatedData)
            let formdata = new FormData();
            formdata.append('image', clientImage)
            formdata.append("data", JSON.stringify(updatedData))
            updateClient(formdata).then(response => {
                console.log(response)
                if (response.status) {
                    notifyClientEditSuccess()
                    setTimeout(() => {
                        navigate("/clientToDo");
                    }, 2000)
                }
            })
                .catch(err => {
                    console.log(err)
                })
        } else {
            notifyClientEditError()
        }
    }

    
    const handleSectorChange = (e: any) => {
        // console.log(e.target.value)
    
  setJobOptions([])
        console.log(e)
        if (e.value === "Select Un Secteur") {
          setJobs([]);
          setSelectedSector("");
          setJobOptions([]);
    
        } else if (e.value !== '') {
          let sectorField = e.value;
          setSelectedSector(sectorField);
        //   setJobOptions([]);
        }
    }
    const HandleChangeH = (e: any) => {
      console.log(e.target.value);
      if (e.target.id === "1") {
        setShowHour("35");
        setID(e.target.id);
      }
      if (e.target.id === "2") {
        setShowHour("39");
        setID(e.target.id);
      }
      if (e.target.id === "3") {
        setShowHour("40");
        setID(e.target.id);
      }
      if (e.target.id === "4") {
        setShowHour("41");
        setID(e.target.id);
      }
      if (e.target.id === "5") {
        setShowHour("42");
        setID(e.target.id);
      }
      if (e.target.id === "6") {
        setShowHour("43");
        setID(e.target.id);
      }
      if (e.target.id === "7") {
        setShowHour("44");
        setID(e.target.id);
      }
      if (e.target.id === "8") {
        setShowHour("45");
        setID(e.target.id);
      }
    };
  
    const handleImageChange = (val) => {
      if (val === 'upload') {
        console.log("upload")
        handleImageUpload()
      } else if (val === 'Download') {
        console.log("download")
        // window.open(API_BASE_URL + candidatImage);
      }
    }
    const handleImageUpload = () => {
      hiddenImageInput.current.click();
    }
  


    useEffect(() => {
        // console.log(data, languages);
    }, [selectedLanguages])

    useEffect(() => {
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
        console.log(profile.clientActivitySector)
        if (jobs.length === 0 && profile.clientActivitySector !== "") {
            fetchAllJobs(profile.clientActivitySector)
                .then((data) => {
                    console.log(data);
                    setJobs([...data.data])
                })
                .catch(err => {
                    console.log(err)
                })
        }
        console.log(data);
    }, [])

    const jobChange = async (jobval) => {
        // console.log(jobval)
        let JobArr=[]as any
        jobval.map((el)=>{
         
         JobArr.push(el.value)
      
        })
        changeJobSelection(JobArr)
      }
      const handleChange = (selectedOption) => {
        console.log(`Option selected:`, selectedOption)
        let arr = []
    
        selectedOption.map((el) => {
          arr.push(el.value)
        })
        setLanguage(arr)
        console.log(Language, "language")
        setData({ ...data, clientLanguages: arr })
      }
  
    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
                containerStyle={{zIndex:"99999999999999999"}}
            />
          

<div className="container-fluid">
                <div className="row">
                <div className="col-12 top-pd mt-1">
            {/* <h1 style={{ textDecoration: 'underline' }}>CLIENT FILE: {profile.clientCompanyName}</h1> */}
         <div className="row">
          <div className="col-6">
            <div className="stable">
              <Link to="/archivedClientSeeprofile">
                <button type="button" className="btn FontStyle-TODOSEE">
                  <img src={require("../../images/return.svg").default} />
               Client File : {profile.clientCompanyName}
                </button>
              </Link>
            </div>
          </div>
          <div className="col-4 d-flex align-items-center justify-content-end">
            <Link to="/archived">
          <button className="btn bg-ClientCancel" style={{padding:"8px"}}>
                                    <img
                                        style={{ width: "25%" }}
                                        src={require("../../images/multiply.svg").default}
                                    />
                                    <p className="mb-0">Cancel</p>
                                </button>
                                </Link>
          </div>
          <div className="col-2 d-flex align-items-center justify-content-center pr-1 pl-0">
          {/* <Link to="/clientProgress" style={{ textDecoration: "none" }}> */}
                                <button className="btn btn-Clientsave" type="submit" style={{padding:"12px"}}>
                                <img src={require("../../images/ClientSave.svg").default} style={{marginRight:"5px"}} />
                                Save Profile
                            </button>
                            {/* </Link> */}
          </div>
          </div>
          </div>
                    
                    <form className="form px-0" onSubmit={onFormSubmit}>
                        <div className="">
                            <div className="col-12 p-2 Social-CardClient mt-1">
                                <div className="row">
                                    <div className="col-2  text-center">
                              
                              {/* {
                                clientImg ?
                                <img
                                src={API_BASE_URL + clientImg}
                               className="imgArchived-upload-download"
            
                              />  
                                : */}
                                <img
                                src={require("../../images/fullClientSee.svg").default}
                               className="imgArchived-upload-download"
            
                              />   
                              {/* } */}
                      

<button
 onClick={()=>{setSelectUpload(!UploadBtn);}}
className="SelectBtn"
type="button"
 ><img className="" src={require("../../images/select.svg").default} />
 {
  UploadBtn? 
  <UploadDow closeModal={setSelectUpload}  FunModal={handleImageChange} />
  :
  null
 }
  </button>
<input
                    type="file"
                    ref={hiddenImageInput}
                    onChange={onFormDataChange}
                    name="clientPhoto"
                    style={{ display: 'none' }}
                  />
                                    </div>
                                    <div className="col-5 card-xl">
                                        <div className="row">
                                            <div className="col-12 Edit-LabelsFonts">
                                                <label  >Company Name</label>
                                                <input className="form-control" name="clientCompanyName" defaultValue={profile.clientCompanyName} onChange={onFormDataChange} />
                                            </div>
                                            <div className="col-12 pt-2">
                                                <label className="Edit-LabelsFonts">Number of position</label>
                                                <input name="numberOfPosts" placeholder="Num Only" className="form-control" defaultValue={profile.numberOfPosts} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-5 d-grid align-items-center">
                  <div className="text-end ">
                  <div className="d-grid justify-content-end align-items-center">
                  <button className="ArchiveLargebtn pb-1 p-0"><img src={require("../../images/ArchivedBtn.svg").default} /></button>
                  </div>
               <div className="Lead-encore">
                  <p className="mb-0  pt-1">
                  Lead en recherche active
                  </p>
                  <p className="TODOclientChild">Nous recehrchons activement </p>
                  </div>
                  </div>
                {/* </div> */}
                </div>
                                </div>
                            </div>

                            <div className="col-12 Social-CardClient my-1 p-1">
                                <div className="row">
                                    <div className="col-4">
                                        <p className="LabelStylingEdits mb-0">Secteur d’Activité</p>
                                        <div className="dropdown">
                                            <Select
                                            options={sectorOptions}
                                            onChange={handleSectorChange}
                                            defaultValue={{label:profile.clientActivitySector,value:profile.clientActivitySector,color:"#FE8700"}}
                                            // styles={colourStyles}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            closeMenuOnSelect={true}
                                            placeholder="‎ ‎ ‎ Select Un Secteur"
                                            />
                                        </div>
                                      
                                    </div>
                                    <div className="col-4">
                                        <p className="LabelStylingEdits mb-0">Metier/Job</p>
                                        <div className="dropdown">
                                            <div aria-labelledby="dropdownMenuButton1">
                                            {jobOptions.length > 0 ?
                    <Select
                      name="jobName"
                      closeMenuOnSelect={true}
                      isMulti
                      placeholder="‎ ‎ ‎ Select"
                      className="basic-multi-select"
                      classNamePrefix="select"
                      defaultValue={{label:profile.clientJob,value:profile.clientJob,color:"#FE8700"}}
                      // defaultInputValue={{label:profile.clientJob,value:profile.clientJob,color:"#FE8700"}}
                      onChange={jobChange}
                      options={jobOptions}
                      // styles={colourStyles}
                    /> : <p>Select A Sector!</p>
                  
                  }
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div className="col-4 flex-grid">
                                            <label className= " LabelStylingEdits mb-0">Company Email</label>
                                            <input
                                                placeholder="Company email"
                                                className="form-control"
                                                name="clientEmail"
                                                defaultValue={profile.clientEmail ? profile.clientEmail : "No Email!" }
                                            />
                                        </div>
                                      
                                        <div className="col-12 mt-2">
                                            <div className="row">
                                                <div className="col-5">
                                                <label className="LabelStylingEdits mb-0">Candidat Motivation</label>
                    <span className="LabelStylingSpanEdits">(bigger number is more important)</span>
                                                </div>
                                                <div className="col-7">
                                                    <div className="d-flex">
                                                <label className="Form-styling d-flex">
                      Importance de ce client
                      <p className="LabelStylingSpanEdits mb-0">(bigger number is more important) </p>
                    </label>
                    </div>
                                                </div>
                                                <div className="col-5">
                                                    <div className="row">
                                                <div className="col-12 coverClass  px-0">
                      <div className="row">
                        <div className="col-3  d-flex flex-column text-center">
                          <div
                            className="text-center"
                            style={{ height: "35px" }}
                          >
                            
                            <input
                              type="radio"
                              name="clientMotivation"
                              value={1}
                              onChange={onFormDataChange}
                              id="r1"
                              defaultChecked={clientMotivation == 1}
                            />
                            <label htmlFor="r1" className="react">
                              <i data-icon="😟"></i>
                            </label>
                          </div>
                          <span className="font-Emoji">Dissapointed</span>
                        </div>
                        <div className="col-2 both p-0 d-flex flex-column text-center">
                          <div
                            className="text-center both"
                            style={{ height: "35px" }}
                          >
                            
                            <input
                              type="radio"
                              name="clientMotivation"
                              value={2}
                              onChange={onFormDataChange}
                              id="r2"
                              defaultChecked={clientMotivation == 2}

                            />
                            <label htmlFor="r2" className="react">
                              <i data-icon="🙁"></i>
                            </label>
                          </div>
                          <span className="font-Emoji">Not really</span>
                        </div>
                        <div className="col-2 p-0 d-flex flex-column text-center">
                          <div
                            className="text-center"
                            style={{ height: "35px" }}
                          >
                            
                            <input
                              type="radio"
                              name="clientMotivation"
                              value={3}
                              onChange={onFormDataChange}
                              id="r3"
                              defaultChecked={clientMotivation == 3}

                            />
                            <label htmlFor="r3" className="react">
                              <i data-icon="😊"></i>
                            </label>
                          </div>
                          <span className="font-Emoji">Like</span>
                        </div>
                        <div className="col-2 p-0 d-flex flex-column text-center">
                          <div
                            className="text-center"
                            style={{ height: "35px" }}
                          >
                            
                            <input
                              type="radio"
                              name="clientMotivation"
                              value={4}
                              onChange={onFormDataChange}
                              id="r4"
                              defaultChecked={clientMotivation == 4}

                            />
                            <label htmlFor="r4" className="react">
                              <i data-icon="🥰"></i>
                            </label>
                          </div>
                          <span className="font-Emoji">Great</span>
                        </div>
                        <div className="col-3 d-flex flex-column text-center">
                          <div
                            className="text-center"
                            style={{ height: "35px" }}
                          >
                            
                            <input
                              type="radio"
                              name="clientMotivation"
                              value={5}
                              onChange={onFormDataChange}
                              id="r5"
                              defaultChecked={clientMotivation == 5}

                            />
                            <label htmlFor="r5" className="react">
                              <i data-icon="😍"></i>
                            </label>
                          </div>
                          <span className="font-Emoji">Super lovely</span>
                        </div>
                      </div>
                    </div>
                                                </div>
                                                </div> 
                                                <div className="col-4">
                                                    <div className="row">
                                                    <div className="col-12 mt-1">

<RatingCmp  StarRatings={setRatings} StarR={StarRatings} FunC={changeClientImportance}/>
                    </div>
                                                    </div>
                                                    </div>   
                                                    
                                                    <div className="col-3 px-0 d-flex align-items-center">
                                                        <p className="mb-0 PermisDrive">Permis / Licence drive</p>
                                                        <Switch 
                                                         onChange={switchHandle}
                                                         checked={Permis}
                                                         defaultValue={Permis}
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
                                                    </div>
                                                            </div>
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
                        name="jobStartDate"
                        defaultValue={profile.jobStartDate}
                        onChange={onFormDataChange}
                        />
                        </div>
                  <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-6 mt-1">
                        <label className="FromDateEdit mb-0" >UNTIL DATE / Jusqu’à </label>
                        <input
                            type="date"
                            className="form-control"
                            name="jobEndDate"
                            defaultValue={profile.jobEndDate}
                            onChange={onFormDataChange}
                        />
                        </div>
                        <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5 mt-2">
                        <label className="LabelStylingEdits">Company phone number</label>
                      <input placeholder="Company Phone" className="form-control" name="clientPhone" defaultValue={profile.clientPhone ? profile.clientPhone : "No Phone!"} onChange={onFormDataChange} />
                      <p className="UnderChild">Use international format</p>
                        </div>
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 mt-2">
                      <label className="LabelStylingEdits " >Langues du candidat</label>
                        <div className="">
                        <Select
                          name="clientLanguages"
                          closeMenuOnSelect={false}
                          isMulti
                          placeholder=""
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={handleChange}
                          options={colourOptions}
                          // styles={colourStyles}
                           defaultValue={
                            profile.clientLanguages?.map((profil,i)=>(
                             {value:profil,label:profil,color:""}
                      
                            
    ))}
                        />
                        </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 mt-1">
                                            <label className="LabelStylingEdits mb-1">Contact in Company Email</label>
                                            <input
                                                // placeholder="Company Email Of Contact"
                                                className="form-control"
                                                name="clientEmail"
                                                defaultValue={profile.clientReferenceEmail}
                                                placeholder={profile.clientReferenceEmail ? profile.clientReferenceEmail : "No Company email!" }
                                            />
                                    
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 px-0 mt-1">
                        <label className="LabelStylingEdits mb-1">Contact in Company Phone Number</label>
                                            <input
                                                // placeholder="Company number"
                                                className="form-control"
                                                name="clientReferenceNumber"
                                                defaultValue={profile.clientReferenceNumber}
                                                placeholder={profile.clientReferenceNumber ? profile.clientReferenceNumber : "No Phone!" }

                                            />
                                            <p className="UnderChild">Use international format</p>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 mt-1 ">
                        <label className="LabelStylingEdits mb-1">Company Adress</label>
                                            <input
                                                // placeholder="Company Adress"
                                                className="form-control"
                                                name="clientAddress"
                                                defaultValue={profile.clientAddress}
                                                placeholder={profile.clientAddress ? profile.clientAddress : "No Adress!" }
                                            />
                                            <p className="UnderChild">Number only</p>
                    </div>
                    <div className="col-12 pt-1">
                                                <p className="LabelStylingEdits">Notes about this client</p>
                                                <textarea
                                                    id="skills"
                                                    name="clientRequiredSkills"
                                                    className="form-control"
                                                    defaultValue={profile.clientRequiredSkills}
                                                    rows={7}
                                                    placeholder={profile.clientRequiredSkills ? profile.clientRequiredSkills : "No Client Notes!"}
                                                ></textarea>
                                            </div>
                                            <div className="col-12 mt-1 ">
                       
                         
                       <div className='row p-1' >
                         <div className='col-4  d-grid '>
                             <label className="ClientPDFFormlabel">$ numero contrat</label>
                             <input className='form-control inputStyling'  name='lieu_mission'  placeholder="‎ ‎ ‎ $ numero contrat" />
                         </div>
                         <div className='col-4  d-grid ' >
                         <label className="ClientPDFFormlabel">$ initial Société client</label>
                         <input className='form-control inputStyling' name='duree_mission'   placeholder="‎ ‎ ‎ $ initial Société client" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ siret </label>
                         <input className='form-control inputStyling' name='duree_hebdomadaire_mission'  placeholder="‎ ‎ ‎$ siret"/>

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ numero TVA</label>
                         <input className='form-control inputStyling'  name='candidatJob' placeholder="‎ ‎ ‎ $ numero TVA" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ nom gérant</label>
                         <input className='form-control inputStyling'   name='cmp_candidat'  placeholder="‎ ‎ ‎ $ nom gérant" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ telephone gerant</label>
                         <input className='form-control inputStyling'   name='contract_date'  placeholder="‎ ‎ ‎ $ telephone gerant" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ metier en Roumain</label>
                         <input  className='inputStyling wHCompany form-control' name='company_contact_name'  placeholder="‎ ‎ ‎ $ metier en Roumain" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ metier en Français</label>
                         <input className='form-control inputStyling'  name='$ metier en Français'  placeholder="‎ ‎ ‎ $ metier en Français" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ date du debut de mission</label>
                         <input className='form-control inputStyling'  name='serie_id'  placeholder="‎ ‎ ‎ $ date du debut de mission" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ date de fin de mission</label>
                         <input className='form-control inputStyling'  name='candidatAddress'   placeholder="‎ ‎ ‎ $ date de fin de mission" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ prix en euro / heure selon contract</label>
                         <input className='form-control inputStyling'  name='company_siret'  placeholder="‎ ‎ ‎ $ prix en euro / heure selon contract" />

                         </div>


                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ SALAIRE EN EURO</label>
                         <input className='form-control inputStyling' name='SALAIRE EN EURO'  placeholder="‎ ‎ ‎ $ SALAIRE EN EURO" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ nombre d'heure négocie dans le contrat</label>
                         <input className='form-control inputStyling'  name='candidatAddress'  placeholder="‎ ‎ ‎ $ nombre d'heure négocie dans le contrat" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ numero de tel du travailleur 1</label>
                         <input className='form-control inputStyling'   name='company_siret'  placeholder="‎ ‎ ‎ $ numero de tel du travailleur 1" />

                         </div>
                         
                         <div className='col-4  d-grid '>
                            <label className="ClientPDFFormlabel">$ Nom Du Travailleur 1</label>
                            <input className='form-control inputStyling'   name='worker_name_1' onChange={onFormDataChange} placeholder="‎ ‎ ‎ $ numero de tel du travailleur 1" />

                            </div>

                          <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ nom du travailleur 2 </label>
                         <input className='form-control inputStyling' name='serie_id'  placeholder="‎ ‎ ‎ $ nom du travailleur 2 " />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ numero de tel du travailleur 2</label>
                         <input className='form-control inputStyling'  name='candidatAddress'   placeholder="‎ ‎ ‎ $ numero de tel du travailleur 2" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ nom du travailleur3</label>
                         <input className='form-control inputStyling'   name='company_siret'  placeholder="‎ ‎ ‎ $ nom du travailleur3" />

                         </div> <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ numero de tel du travailleur 3</label>
                         <input className='form-control inputStyling'  name='serie_id'  placeholder="‎ ‎ ‎ $ numero de tel du travailleur 3" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ nom du travailleur 4</label>
                         <input className='form-control inputStyling'  name='candidatAddress'  placeholder="‎ ‎ ‎ $ nom du travailleur 4" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ numero de tel du travailleur 4</label>
                         <input className='form-control inputStyling'  name='company_siret'  placeholder="‎ ‎ ‎ $ numero de tel du travailleur 4" />

                         </div> <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ nom du travailleur 5</label>
                         <input className='form-control inputStyling'  name='serie_id'  placeholder="‎ ‎ ‎$ nom du travailleur 5" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ numero de tel du travailleur 5</label>
                         <input className='form-control inputStyling'  name='candidatAddress'  placeholder="‎ ‎ ‎ $ numero de tel du travailleur 5" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ nom du travailleur 6</label>
                         <input className='form-control inputStyling'  name='company_siret'  placeholder="‎ ‎ ‎$ nom du travailleur 6" />

                         </div> <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ numero de tel du travailleur 6</label>
                         <input className='form-control inputStyling'  name='serie_id'  placeholder="‎ ‎ ‎ $ numero de tel du travailleur 6" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ nom du travailleur 7</label>
                         <input className='form-control inputStyling'  name='candidatAddress'  placeholder="‎ ‎ ‎$ nom du travailleur 7" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ numero de tel du travailleur 7</label>
                         <input className='form-control inputStyling'  name='company_siret'  placeholder="‎ ‎ ‎ $ numero de tel du travailleur 7" />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ nom du travailleur 8</label>
                         <input className='inputStyling form-control'  name='companyAddress'  placeholder='‎ ‎ ‎$ nom du travailleur 8'  />
                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ numero de tel du travailleur 8</label>
                         <input className='inputStyling form-control'  name='companyAddress'  placeholder='‎ ‎ ‎$ numero de tel du travailleur 8'  />
                         </div>
             
                      </div>
                      
                 
                 </div>
                                            <div className="col-12 mt-1">
                  <div className="row">
                    <p className="padding-bottom Form-styling pb-1">
                      Select salaries Hours
                    </p>
                    <div className="d-flex " id="dam_return">
                          
                            {
                                SalaryH.map((el)=>(
                        <div className="pr-1">
                             <button
                                    type="button"
                                    value={el.value}
                                    id={el.id}
                                    onClick={(e) => {
                                      HandleChangeH(e);
                                  
                                    }}
                                    style={{
                                      backgroundColor: id == el.id ? " #F4E7FF" : "",
                                      color: id == el.id ? "#A461D8" : "#979797",
                                    }}
                                    className="btn btnHPaid "
                                  >
                                   {el.text}
                                  </button>
                                 </div>
                                  )  )
                            }
                    </div>
                    <div className="col-5 mt-1">
                      <div
                        className="d-flex amount-fieldsModal"
                        style={{ width: "100%" }}
                      >
                        <span>€</span>
                        <input
                          style={{ marginBottom: "0px" }}
                          type="text"
                          id="dam"
                          className="form-control "
                          name="turnover"
                          placeholder="Amount"
                        />
                        <span>.00</span>
                      </div>
                    </div>
                    <div className="col-3 mt-1 px-1 ">
                      <button type="button" className="btn saveSalary" id="Hour">
                        Save Salary {showHour}H
                      </button>
                    </div>
                    <div className="col-4 mt-1 px-1">
                      <button type="button" onClick={()=>RemoveHandling()} className="btn RemoveSalary">
                        REMOVE Salary {showHour}H
                      </button>
                    </div>
                    <p className="paidHFontChild">
                      A remplir si possible, il faut selectionner les heures
                      négociées et mettre une valeur du salaire mensuel pour Xh
                    </p>
                  </div>
                </div>
                <div className="col-12 mt-1">
                  <div className="row">
                    <p className="padding-bottom Form-styling pb-1 mt-1">
                      taux horraire Hours
                    </p>
                    <div className="d-flex " id="dam_return">
                    
                    {
                                SalaryH.map((el)=>(
                        <div className="pr-1">
                             <button
                                    type="button"
                                    value={el.value}
                                    id={el.id}
                                    onClick={(e) => {
                                      HandleChangeH(e);
                                  
                                    }}
                                    style={{
                                      backgroundColor: id == el.id ? " #F4E7FF" : "",
                                      color: id == el.id ? "#A461D8" : "#979797",
                                    }}
                                    className="btn btnHPaid "
                                  >
                                   {el.text}
                                  </button>
                                 </div>
                                  )  )
                            }
                               
                     </div>
                    
                    <div className="col-5 mt-1">
                      <div
                        className="d-flex amount-fieldsModal"
                        style={{ width: "100%" }}
                      >
                        <span>€</span>
                        <input
                          style={{ marginBottom: "0px" }}
                          type="text"
                          id="dam"
                          className="form-control "
                          name="turnover"
                          placeholder="Amount"
                        />
                        <span>.00</span>
                      </div>
                    </div>
                    <div className="col-3 mt-1 px-1 ">
                      <button type="button" className="btn saveSalary" id="Hour">
                        Save Salary {showHour}H
                      </button>
                    </div>
                    <div className="col-4 mt-1 px-1">
                      <button type="button" onClick={()=>RemoveHandling()} className="btn RemoveSalary">
                        REMOVE Salary {showHour}H
                      </button>
                    </div>
                    <p className="paidHFontChild">
                      A remplir si possible, il faut selectionner les heures
                      négociées et mettre une valeur du salaire mensuel pour Xh
                    </p>
                  </div>
                  </div>
                </div>

                    </div>
                  
                   
              </div>
              <div className="col-6 pt-2 px-0 d-grid">
                                                        <label className="LabelStylingEdits">
                                                            Chiffre d’Affaire Potentiel / Potential turnover
                                                        </label>
                                                        <div>
                                                            <div
                                                                className="d-flex amount-fieldsModal"
                                                            >
                                                                <span>€</span>
                                                                <input
                                                                    style={{ marginBottom: "0px" }}
                                                                    type="number"
                                                                    className="form-control"
                                                                    name="jobTotalBudget"
                                                                    placeholder={profile.jobTotalBudget ? profile.jobTotalBudget : "Blank"}
                                                                    defaultValue={profile.jobTotalBudget}

                                                                    onChange={onFormDataChange}
                                                                />
                                                                <span>.00</span>
                                                            </div>
                                                            <label className="UnderChild">
                                                                Not mandatory / Potentiel CA généré par ce lead
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 px-0 mt-3">
                                    <div className="row justify-content-end">
                                        <div className="col-6 d-flex justify-content-end">
                                            <Link to="/archived" style={{ textDecoration: "none" }}>
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
export default ClientArchivedEdit;
