import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../CSS/Client/Client_toDoEdit.css";
import { useLocation } from "react-router-dom";
import { API_BASE_URL } from "../../config/serverApiConfig";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


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


    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className="container-fluid">
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
                                    <div className="col-3 text-end end-class">
                                        <div className="text-center">
                                        <div>
                      <button type="button" className="btn d-flex btnArchive"
                      >

                        <span><img src={require("../../images/multiplyyy.svg").default} /></span>
                        ARCHIVED
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
            </div>
        </>
    );
}
export default ClientArchivedEdit;
