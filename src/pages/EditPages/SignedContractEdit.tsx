import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../CSS/Client/Client_toDoEdit.css";
import { useLocation } from "react-router-dom";
import { API_BASE_URL } from "../../config/serverApiConfig";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import Select, {StylesConfig } from "react-select";
import UploadDow from '../../components/Modal/SelectUploadDownload'
import Switch from "react-switch";
import RatingCmp from '../../components/AddClientRating/Rating'
import chroma from "chroma-js"
import { ColourOption ,colourOptions} from "../../Selecteddata/data";
import $ from "jquery";
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


function ClientSignedEdit() {

    const notifyClientEditSuccess = () => toast.success("Client Updated Successfully! View Client in To-Do Clients/Leads List.");

    const notifyClientEditError = () => toast.error("Cannot Edit This Candidat, Since No Data Changed!");

    const { state } = useLocation();
    const navigate = useNavigate();
    // const [data, setData] = useState(ClientDataFormat);
    // const [formTouched, setFormTouched] = useState(false);
    // const [profile, setProfile] = useState<any>(state);
    // const [activitySectors, setActivitySectors] = useState([])
    // const [selectedSector, setSelectedSector] = useState("");
    // const [jobs, setJobs] = useState([]);
    // const [clientMotivation, setClientMotivation] = useState(profile.clientMotivation);
    // const [selectedLanguages, setSelectedLanguages] = useState(profile.clientLanguages);
    // const [clientImportance, setClientImportance] = useState(profile.clientImportance);
    // const [clientImage, setClientImage] = useState("");
    // const hiddenFileInput = React.useRef(null);
    // const [imgSource, setImgSource] = useState("");
    // const [Permis,setPermis]=useState(profile.candidatLicensePermis )
    // const [Voyage,setVoyage]=useState(profile.candidatConduireEnFrance)
    // const [sectorOptions, setSectorOptions] = useState([])as any;
    // const [jobOptions, setJobOptions] = useState([]);
  
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
  const [UploadBtn,setSelectUpload]= useState(false)
  // const[clientImg,setClientImg]=useState(profile.clientPhoto.imageName ? profile.clientPhoto.imageName : "")
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
      console.log(profile,"pro")
      useEffect(() => {
        $(document).ready(function () {
          $("#dam_return button").click(function () {
            Amountarr = $(this).val().toString();
            var input = $("#dam");
            input.val(Amountarr);
          });
        });
        console.log(Hours, "hr");
      });
      
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
                    window.location.href = "/clientToDoEdit"
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
                clientLanguages: data.clientLanguages != [] ? data.clientLanguages : profile.clientLanguages,
                jobStartDate: data.jobStartDate != "" ? data.jobStartDate : profile.jobStartDate,
                jobEndDate: data.jobEndDate != "" ? data.jobEndDate : profile.jobEndDate,
                clientPermis: data.clientPermis ? data.clientPermis : profile.clientPermis,
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
                        navigate("/clientContract");
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
  const jobChange = async (jobval) => {
    // console.log(jobval)
    let JobArr=[]as any
    jobval.map((el)=>{
     
     JobArr.push(el.value)
  
    })
    changeJobSelection(JobArr)
  }

    const RemoveHandling=()=>{
        setShowHour("")
        setID("")
      }
    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
                containerStyle={{zIndex:"99999999999999999"}}
            />
            {/* <div className="container-fluid">
                <div className="row">
                    <div className="col-12 top-pd text-center">
                        <h1 style={{ textDecoration: "underline" }}>EDIT FILE: {profile.clientCompanyName}</h1>
                    </div>
                    <form className="form" onSubmit={onFormSubmit}>

                        <div className="col-12 d-flex justify-content-end text-end ">
                            <Link to="/clientTodo" style={{ textDecoration: "none" }}>
                                <button className="btn bg-red">
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
                        <div className="bg-class">
                            <div className="col-12 p-3 bg-color-card">
                                <div className="row">
                                    <div className="col-3 text-center">
                                        <img
                                            src={imgSource != "" ? API_BASE_URL + imgSource : require("../../images/menlogos.svg").default}
                                            style={{ width: "90%" }}
                                        />

                                        <button type="button" onClick={handleFileUpload} className="btn btn-upload">
                                            {
                                                imgSource ?

                                                    "MODIFIER PHOTO" : "UPLOAD PHOTO"
                                            }
                                        </button>
                                        <input
                                            type="file"
                                            ref={hiddenFileInput}
                                            name="clientPhoto"
                                            onChange={onFormDataChange}
                                            style={{ display: 'none' }}
                                        />
                                    </div>
                                    <div className="col-5 card-xl">
                                        <div className="row">
                                            <div className="col-12 flex-grid">
                                                <label>Company Name</label>
                                                <input className="form-control" name="clientCompanyName" defaultValue={profile.clientCompanyName} onChange={onFormDataChange} />
                                            </div>
                                            <div className="col-12 flex-grid pt-3">
                                                <label>Number of position</label>
                                                <input name="numberOfPosts" className="form-control" defaultValue={profile.numberOfPosts} />
                                                <label className="fw-normal">Number only</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-3 text-end end-class" style={{width:"315px"}}>
                                        <div className="text-center">
                                        <div className="justify-content-end">
                    <button type="button" className="btn Signed" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{padding:"10px 15px"}}>
                      <span style={{ marginRight: "3px" }}><img src={require("../../images/Path.svg").default} /></span>     SIGNED CONTRACT
                    </button>
                    <p className="fw-bold mx-2">Lead pas encore traité</p>
                  <p className="mx-2">Ce lead est en sommeil, pas traité</p>
                  </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 ">
                                <div className="row">
                                    <div className="col-6">
                                        <p className="Arial">Secteur d’Activité</p>
                                        <div className="dropdown">
                                            <select
                                                className="form-select"
                                                name="clientActivitySector"
                                                onChange={onFormDataChange}
                                            >
                                                <option>Select Un Secteur</option>

                                                {activitySectors.map((sector) =>
                                                    <option defaultValue={sector.sectorName} selected={profile.clientActivitySector == sector.sectorName}>{sector.sectorName}</option> // fetch from api
                                                )}
                                            </select>
                                        </div>
                                        <p className="last-child">Langues du Client</p>
                                        <div>
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    name="clientLanguages"
                                                    className="form-check-input"
                                                    value="Roumain"
                                                    defaultChecked={profile.clientLanguages.indexOf("Roumain") > -1} onChange={onFormDataChange}
                                                />
                                                <span className="ps-2">Roumain</span>
                                            </div>
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    name="clientLanguages"
                                                    className="form-check-input"
                                                    value="Francais"
                                                    defaultChecked={profile.clientLanguages.indexOf("Francais") > -1} onChange={onFormDataChange}
                                                />
                                                <span className="ps-2">Français</span>
                                            </div>
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    name="clientLanguages"
                                                    className="form-check-input"
                                                    value="Anglais"
                                                    defaultChecked={profile.clientLanguages.indexOf("Anglais") > -1} onChange={onFormDataChange}
                                                />
                                                <span className="ps-2">Anglais</span>
                                            </div>
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    name="clientLanguages"
                                                    className="form-check-input"
                                                    value="Italien"
                                                    defaultChecked={profile.clientLanguages.indexOf("Italien") > -1} onChange={onFormDataChange}
                                                />
                                                <span className="ps-2">Italien</span>
                                            </div>
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    name="clientLanguages"
                                                    className="form-check-input"
                                                    value="Russe"
                                                    defaultChecked={profile.clientLanguages.indexOf("Russe") > -1} onChange={onFormDataChange}
                                                />
                                                <span className="ps-2">Russe</span>
                                            </div>
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    name="clientLanguages"
                                                    className="form-check-input"
                                                    value="Espagnol"
                                                    defaultChecked={profile.clientLanguages.indexOf("Espagnol") > -1} onChange={onFormDataChange}
                                                />
                                                <span className="ps-2">Espagnol</span>
                                            </div>
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    name="clientLanguages"
                                                    className="form-check-input"
                                                    value="Autre"
                                                    defaultChecked={profile.clientLanguages.indexOf("Autre") > -1} onChange={onFormDataChange}
                                                />
                                                <span className="ps-2">Autre</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <p className="Arial">Metier/Job</p>
                                        <div className="dropdown">
                                            <div aria-labelledby="dropdownMenuButton1">
                                                <select
                                                    name="clientJob"
                                                    onChange={onFormDataChange}
                                                    className="form-select"
                                                >
                                                    <option>Select Un Job</option>
                                                    {
                                                        jobs.map((job) =>
                                                            <option defaultValue={profile.clientJob} selected={profile.clientJob == job.jobName}>
                                                                {job.jobName}
                                                            </option>
                                                        )
                                                    }
                                                </select>

                                            </div>
                                        </div>
                                        <div className="pt-2">
                                            <div className="card " style={{ padding: "15px" }}>
                                                <label className="fw-bold">
                                                    Quand ce client a besoin du(des) travailleur détaché  / When this client needs the posted worker
                                                </label>
                                                <br />
                                                <label className="fw-bold">
                                                    From date / A PARTIR DE
                                                </label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    name="jobStartDate"
                                                    defaultValue={profile.jobStartDate}
                                                    onChange={onFormDataChange}

                                                />
                                                <br />
                                                <label className="fw-bold">UNTIL DATE / Jusqu’à </label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    name="jobEndDate"
                                                    defaultValue={profile.jobEndDate}
                                                    onChange={onFormDataChange}

                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-6 flex-grid pt-3">
                                                <div className="row">
                                                    <label>Client Motivation</label>
                                                    <div className="d-flex">
                                                        <div>
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="clientMotivation"
                                                                value={1}
                                                                onChange={onFormDataChange}
                                                                defaultChecked={clientMotivation == 1}
                                                            />
                                                            <span className="ps-1">1</span>
                                                        </div>
                                                        <div className="ps-3">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="clientMotivation"
                                                                value={2}
                                                                onChange={onFormDataChange}
                                                                defaultChecked={clientMotivation == 2}

                                                            />
                                                            <span className="ps-1">2</span>
                                                        </div>
                                                        <div className="ps-3">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="clientMotivation"
                                                                value={3}
                                                                onChange={onFormDataChange}
                                                                defaultChecked={clientMotivation == 3}
                                                            />
                                                            <span className="ps-1">3</span>
                                                        </div>
                                                        <div className="ps-3">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="clientMotivation"
                                                                value={4}
                                                                onChange={onFormDataChange}
                                                                defaultChecked={clientMotivation == 4}
                                                            />
                                                            <span className="ps-1">4</span>
                                                        </div>
                                                        <div className="ps-3">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="clientMotivation"
                                                                value={5}
                                                                onChange={onFormDataChange}
                                                                defaultChecked={clientMotivation == 5}
                                                            />
                                                            <span className="ps-1">5</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-6 pt-1">
                                                        <label>Client importance</label>
                                                        <div className="d-flex">
                                                            <div>
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    value={1}
                                                                    name="clientImportance"
                                                                    defaultChecked={clientImportance == 1}
                                                                    onChange={onFormDataChange}
                                                                />
                                                                <span className="ps-1">1</span>
                                                            </div>
                                                            <div className="ps-3">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name="clientImportance"
                                                                    value={2}
                                                                    defaultChecked={clientImportance == 2}
                                                                    onChange={onFormDataChange}
                                                                />
                                                                <span className="ps-1">2</span>
                                                            </div>
                                                            <div className="ps-3">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name="clientImportance"
                                                                    value={3}
                                                                    defaultChecked={clientImportance == 3}
                                                                    onChange={onFormDataChange}
                                                                />
                                                                <span className="ps-1">3</span>
                                                            </div>
                                                            <div className="ps-3">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name="clientImportance"
                                                                    value={4}
                                                                    defaultChecked={clientImportance == 4}
                                                                    onChange={onFormDataChange}
                                                                />
                                                                <span className="ps-1">4</span>
                                                            </div>
                                                            <div className="ps-3">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name="clientImportance"
                                                                    value={5}
                                                                    defaultChecked={clientImportance == 5}
                                                                    onChange={onFormDataChange}
                                                                />
                                                                <span className="ps-1">5</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 ">
                                                        <p className="mb-0 fw-bolder">
                                                            Permis / Licence drive
                                                        </p>
                                                        <div>
                                                            <input
                                                                type="radio"
                                                                name="clientPermis"
                                                                value="true"
                                                                className="form-check-input"
                                                                defaultChecked={profile.clientPermis === true}
                                                                onChange={onFormDataChange}
                                                            />
                                                            <span>Yes(B)</span>
                                                        </div>
                                                        <div>
                                                            <input
                                                                type="radio"
                                                                name="clientPermis"
                                                                value="false"
                                                                className="form-check-input"
                                                                defaultChecked={profile.clientPermis === false}
                                                                onChange={onFormDataChange}
                                                            />
                                                            <span>No</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 pt-2 d-grid">
                                                        <label className="salaire">
                                                            Chiffre d’Affaire Potentiel / Potential turnover
                                                        </label>
                                                        <div>
                                                            <div
                                                                className="d-flex amount-fields"
                                                            >
                                                                <span>€</span>
                                                                <input
                                                                    style={{ marginBottom: "0px" }}
                                                                    type="number"
                                                                    className="form-control"
                                                                    name="jobTotalBudget"
                                                                    placeholder="Amount"
                                                                    defaultValue={profile.jobTotalBudget}
                                                                    onChange={onFormDataChange}
                                                                />
                                                                <span>.00</span>
                                                            </div>
                                                            <label className="fw-normal">
                                                                Not mandatory / Potentiel CA généré par ce lead
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 pt-2 d-grid">
                                                        <label className="salaire">
                                                            Salaire net du salarié / Employee's net salary
                                                        </label>
                                                        <div>
                                                            <div
                                                                className="d-flex amount-fields"
                                                            >
                                                                <span>€</span>
                                                                <input
                                                                    style={{ marginBottom: "0px" }}
                                                                    type="number"
                                                                    className="form-control"
                                                                    name="netSalary"
                                                                    placeholder="Amount"
                                                                    defaultValue={profile.netSalary}
                                                                    onChange={onFormDataChange}
                                                                />
                                                                <span>.00</span>
                                                            </div>
                                                            <label className="fw-normal">
                                                                Not mandatory / Potentiel CA généré par ce lead
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-6 pt-3">
                                                <p className="Arial">Notes about this client</p>
                                                <textarea
                                                    id="skills"
                                                    name="clientRequiredSkills"
                                                    className="form-control"
                                                    defaultValue={profile.clientRequiredSkills}
                                                    rows={7}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 pt-2">
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-6 pt-3 flex-grid">
                                            <label>Company Email</label>
                                            <input
                                                placeholder="Company email"
                                                className="form-control"
                                                name="clientEmail"
                                                defaultValue={profile.clientEmail}
                                            />
                                        </div>
                                        <div className="col-6 pt-2 flex-grid">
                                            <label>Company Phone</label>
                                            <input
                                                placeholder="Company phone"
                                                className="form-control"
                                                name="clientPhone"
                                                defaultValue={profile.clientPhone}

                                            />
                                            <p className="child-label">Use international format</p>
                                        </div>
                                        <div className="col-6 pt-1 flex-grid">
                                            <label>Contact in Company Email</label>
                                            <input
                                                placeholder="Company Email Of Contact"
                                                className="form-control"
                                                name="clientEmail"
                                                defaultValue={profile.clientReferenceEmail}

                                            />
                                        </div>
                                        <div className="col-6 pt-1 flex-grid">
                                            <label>Contact in Company Phone Number</label>
                                            <input
                                                placeholder="Company number"
                                                className="form-control"
                                                name="clientReferenceNumber"
                                                defaultValue={profile.clientReferenceNumber}
                                            />
                                            <p className="child-label">Use international format</p>
                                        </div>
                                        <div className="col-6 pt-1 flex-grid">
                                            <label>Company Adress</label>
                                            <input
                                                placeholder="Company Adress"
                                                className="form-control"
                                                name="clientAddress"
                                                defaultValue={profile.clientAddress}
                                            />
                                            <p className="child-label">Number only</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-6 d-flex">
                                            <Link to="/clientToDo" style={{ textDecoration: "none" }}>
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
            </div> */}
            <div className="container-fluid">
                <div className="row">
                <div className="col-12 top-pd mt-2">
            {/* <h1 style={{ textDecoration: 'underline' }}>CLIENT FILE: {profile.clientCompanyName}</h1> */}
         <div className="row">
          <div className="col-6">
            <div className="stable">
              <Link to="/clientContract">
                <button type="button" className="btn FontStyle-TODOSEE">
                  <img src={require("../../images/return.svg").default} />
               Client File : {profile.clientCompanyName}
                </button>
              </Link>
            </div>
          </div>
          <div className="col-4 d-flex align-items-center justify-content-end">
          <Link to="/clientContract">
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
          {/* <Link to="/clientContract" style={{ textDecoration: "none" }}> */}
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
                             className="imgEmbauch-upload-Download"
          
                            />  
                              : */}
                              <img
                              src={require("../../images/fullClientSee.svg").default}
                             className="imgSigned-upload-Download"
                            />      
                            {/* }                  */}

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
                  <button className="SignedLargebtn">
                      <img src={require("../../images/tickClientBtn.svg").default} />
                      SIGNED CONTRACT
                    </button>
               <div className="Lead-encore">
                  <p className="mb-0  pt-1">
                  Contrat signé  avec le client
                  </p>
                  <p className="TODOclientChild">Nous recehrchons activement </p>
                  </div>
                  </div>
                {/* </div> */}
                </div>
                                </div>
                            </div>

                            <div className="col-12 Social-CardClient mt-1 p-1 mb-2">
                                <div className="row">
                                    <div className="col-4">
                                        <p className="LabelStylingEdits mb-0">Secteur d’Activité</p>
                                        <div className="dropdown">
                                            <Select
                                            options={sectorOptions}
                                            onChange={handleSectorChange}
                                            defaultValue={{label:profile.clientActivitySector,value:profile.clientActivitySector,color:"#FE8700"}}
                                            styles={colourStyles}
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
                      styles={colourStyles}
                    /> 
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
                                                        checked
                                                        onChange={null}
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
                          styles={colourStyles}
                           defaultValue={
                            profile.clientLanguages?.map((profil,i)=>(
                             {value:profil[i],label:profil[i],color:""}
                      
                            
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
                                            <Link to="/clientContract" style={{ textDecoration: "none" }}>
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
export default ClientSignedEdit;
