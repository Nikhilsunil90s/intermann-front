import React, { useState, useEffect } from 'react';
import "../../CSS/AddClient.css";
import { Toaster, toast } from 'react-hot-toast';
import { API_BASE_URL } from '../config/serverApiConfig';

const ClientDataFormat = {
    clientCompanyName: "",
    clientEmail: "",
    clientPhone: "",
    clientAddress: "",
    clientActivitySector: "",
    clientJob: "",
    clientReferenceName: "",
    clientReferenceNumber: "",
    clientRequiredSkills: "",
    numberOfPosts: "",
    clientMotivation: 0,
    jobStartDate: "",
    jobEndDate: "",
    jobTotalBudget: "",
    netSalary: "",
    clientImportance: 0,
    enteredBy: "",
    jobStatus: "To-Do",
}

export default function AddClient() {

    const notifyClientAddSuccess = () => toast.success("Client Added Successfully! View Client in To-Do / Non - Traite / Attente List.");

    const notifyClientAddError = () => toast.error("Client Cannot Be Added! Please Try Again.");

    const notifyNameError = () => toast.error("Please Provide Candidat Name !");

    const notifyDateError = () => toast.error("Ajouter les dates pour valider cette fiche !");

    const notifyAddressError = () => toast.error("Please Provide Client Address !");

    const notifyPhoneError = () => toast.error("Please Provide Client Phone Number !");

    const notifyEmailError = () => toast.error("Please Provide Client Email !");



    const [disableButton, setDisableButton] = useState(false);
    const [data, setData] = useState(ClientDataFormat);
    const [activitySectors, setActivitySectors] = useState([]);
    const [jobs, setJobs] = useState([{ jobName: "", associatedSector: "", _id: "" }]);


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


    const onFormDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

        if (e.target.name === 'clientActivitySector') {
            console.log(e.target.name, e.target.value);
            changeSectorSelection(e.target.value);
        }
        if (e.target.name === "clientCompanyName") {
            let val = e.target.value.toLocaleUpperCase()
            console.log(val);
            setData((prev) => ({ ...prev, ["clientCompanyName"]: val }));
            return;
        }
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const saveClientData = async () => {
        return await fetch(API_BASE_URL + "addClient", {
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

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log("hello")
        setDisableButton(true);
        e.preventDefault();
        // setData((prev) => ({ ...prev, ['candidatExperienceDetails']: [] }));
        console.log(data);
        if (data.clientCompanyName == "") {
            notifyNameError()
            return false
        }
        if (data.jobStartDate == "") {
            notifyDateError()
            setDisableButton(false)

            return false;
        }
        if (data.clientAddress == "") {
            notifyAddressError()
            setDisableButton(false)
            return false;
        }
        if (data.jobEndDate == "") {
            setDisableButton(false)
            setData((prev) => ({ ...prev, ["jobEndDate"]: "2027-12-12" }));
            return false;
        }
        saveClientData().then(data => {
            console.log(data)
            if (data.status) {
                notifyClientAddSuccess()
                setTimeout(() => {
                    window.location.href = "/addCustomer";
                }, 2000)

            } else {
                notifyClientAddError()
                setTimeout(() => {
                    // window.location.href = "/addCustomer"
                }, 2000)
            }
        })
            .catch(err => {
                console.log(err)
            })
    };
    console.log()

    useEffect(() => {
        console.log(data)
    }, [data])
    return (
        <>
            <Toaster position="top-right" />
            <div className='p-2'>
                <div className="text-center py-3">
                    <span className='hero-title'>
                        <h3>ADD A CLIENT / LEAD</h3>
                    </span>
                </div>
                <div>
                    <form className="add-form form" onSubmit={()=>{onFormSubmit}}>
                        <div className="text-center">
                            <span>Attention : si un client demande deux métiers différents = il faut faire deux fois ce formulaire</span>
                            <br />
                            <p>Please note: if a client requests two different professions = this form must be completed twice</p>
                        </div>
                        <br />
                        <div className="d-flex flex-wrap justify-content-around">
                            <div className="col-md-6">
                                <div className="p-2">
                                    <label>Company Name</label>
                                    <input type="text" className="form-control" placeholder='Enter Company Name' name='clientCompanyName' value={data.clientCompanyName.toLocaleUpperCase()} onChange={onFormDataChange} />
                                    <span className='text-small'>* Mandatory, please add company name</span>
                                </div>
                                <div className="p-2">
                                    <label>Company Phone Number</label>
                                    <input type="text" className="form-control" placeholder='Enter Phone Number (+format)' name='clientPhone' value={data.clientPhone} onChange={onFormDataChange} />
                                    <span className="text-small">* Mandatory, please add phone client with +() . exemple : +33623167260</span>
                                </div>
                                <div className="p-2">
                                    <label>Secteur d’activité</label>
                                    <select name="clientActivitySector" className='form-select' required value={data.clientActivitySector} onChange={onFormDataChange}>
                                        <option>Select Un Secteur</option>
                                        {activitySectors.map((sector) =>
                                            <option value={sector.name} >{sector.sectorName}</option> // fetch from api
                                        )}
                                    </select>
                                    <span className="text-small">* Please select the sector of this client, you can add sector on the BO.</span>
                                </div>
                                <div className="p-2">
                                    <label>Nom du contact dans l’entreprise</label>
                                    <input type="text" className="form-control" placeholder='Contact Name' name='clientReferenceName' value={data.clientReferenceName} onChange={onFormDataChange} />
                                    <span className="text-small">* NOT Mandatory, please add contact person on this company.</span>
                                </div>
                                <div className="p-2">
                                    <label>Compétances demandées par client / Required skills</label>
                                    <textarea className="form-control" placeholder='Enter Skillset Required ... ' name='clientRequiredSkills' rows={4} value={data.clientRequiredSkills} onChange={onFormDataChange} style={{ overflow: 'hidden' }} ></textarea>
                                    <span className="text-small">* NOT mandatory, please add some special skills that the customer ask for this reasearch.</span>
                                </div>
                                <div className="p-2">
                                    <label>Motivation de ce client à travailler avec nous. </label>
                                    <ul style={{ listStyle: 'none' }}>
                                        <li><input type="radio" name="clientMotivation" value={1} onChange={onFormDataChange} /> 1 </li>
                                        <li><input type="radio" name="clientMotivation" value={2} onChange={onFormDataChange} /> 2 </li>
                                        <li><input type="radio" name="clientMotivation" value={3} onChange={onFormDataChange} /> 3 </li>
                                        <li><input type="radio" name="clientMotivation" value={4} onChange={onFormDataChange} /> 4 </li>
                                        <li><input type="radio" name="clientMotivation" value={5} onChange={onFormDataChange} /> 5 </li>
                                    </ul>
                                    <span className="text-small">* If we find the candidates, does he take it immediately? Or will he still need to think?</span>
                                </div>
                                <div className="p-2">
                                    <label>Chiffre d’affaire potentiel / Potential turnover</label>
                                    <div className="d-flex amount-fields">
                                        <span>€</span>
                                        <input type="text" className='form-control' name='jobTotalBudget' placeholder='Amount' value={data.jobTotalBudget} onChange={onFormDataChange} />
                                        <span>.00</span>
                                    </div>
                                    <span className="text-small">* Not mandatory / Potentiel CA généré par ce lead.</span>
                                </div>
                                <div className="p-2">
                                    <label>Salaire net du salarié / Employee's net salary</label>
                                    <div className="d-flex amount-fields">
                                        <span>€</span>
                                        <input type="text" className='form-control' name='netSalary' placeholder='Amount' value={data.netSalary} onChange={onFormDataChange} />
                                        <span>.00</span>
                                    </div>
                                    <span className="text-small">* Not mandatory / Potentiel CA généré par ce lead.</span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="p-2">
                                    <label>Client Email</label>
                                    <input type="email" className="form-control" placeholder='Enter Client Email' name='clientEmail' value={data.clientEmail} onChange={onFormDataChange} />
                                    <span className='text-small'>* Mandatory, please add client email</span>
                                </div>

                                <div className="p-2">
                                    <label>Company Address</label>
                                    <input type="text" className="form-control" placeholder='Enter Client Adress (address, zip, city, country)' name='clientAddress' value={data.clientAddress} onChange={onFormDataChange} />
                                    <span className="text-small">* Mandatory, Enter client adress (address, zip, city, country)</span>
                                </div>

                                <div className="p-2">
                                    <label>Métier / Job</label>
                                    <select name="clientJob" className='form-select' onChange={onFormDataChange} >
                                        <option>Select Un Job</option>
                                        {
                                            jobs.map((job) =>
                                                <option value={job.jobName}>
                                                    {job.jobName}
                                                </option>
                                            )
                                        }

                                    </select>
                                    <span className="text-small">* Please select the job of this client, you can add job on the BO.</span>
                                </div>

                                <div className="p-2">
                                    <label>Téléphone du contact dans l’entreprise</label>
                                    <input type="text" className="form-control" placeholder='Phone number (+format)' name='clientReferenceNumber' value={data.clientReferenceNumber} onChange={onFormDataChange} />
                                    <span className="text-small">* NOT Mandatory, please add phone number of our contact in  this company if there is one, if not we will use company number.</span>
                                </div>

                                <div className="p-2">
                                    <label>Nombre de poste recherché / Number of post that the client needs</label>
                                    <input type="text" className="form-control" name='numberOfPosts' placeholder='Enter Number of Posts...' value={data.numberOfPosts} onChange={onFormDataChange} />
                                    <span className="text-small">* Please select the job of this client, you can add job on the BO.</span>
                                </div>

                                <div className="p-2">
                                    <div className="card card-body">
                                        <label className='fw-bold px-2'>Quand ce client a besoin du(des) travailleur détaché  / When this client needs the posted worker</label>
                                        <br />
                                        <label className='fw-bold px-2'>From date / A PARTIR DE </label>
                                        <input type="date" className="form-control" name='jobStartDate' value={data.jobStartDate} onChange={onFormDataChange} />
                                        <br />
                                        <label className="fw-bold px-2">UNTIL DATE / Jusqu’à </label>
                                        <input type="date" className="form-control" name='jobEndDate' value={data.jobEndDate} onChange={onFormDataChange} />
                                        <span className="text-small">* Please select the job of this client, you can add job on the BO.</span>
                                    </div>
                                </div>

                                <div className="p-2">
                                    <label>Importance de ce client </label>
                                    <ul style={{ listStyle: 'none' }}>
                                        <li><input type="radio" name="clientImportance" value={1} onChange={onFormDataChange} /> 1 </li>
                                        <li><input type="radio" name="clientImportance" value={2} onChange={onFormDataChange} /> 2 </li>
                                        <li><input type="radio" name="clientImportance" value={3} onChange={onFormDataChange} /> 3 </li>
                                        <li><input type="radio" name="clientImportance" value={4} onChange={onFormDataChange} /> 4 </li>
                                        <li><input type="radio" name="clientImportance" value={5} onChange={onFormDataChange} /> 5 </li>
                                    </ul>
                                    <p>
                                        Est ce qu’il travaille déjà avec nous ? Does he already work with us? <br />
                                        Est ce qu’il est bien noté ? Is it well rated (finance score) ? <br />
                                        Est ce que la société est importante ? <br />
                                        Is the company big?Est ce qu’on a une bonne relation avec lui ? <br />
                                        Do we have a good relationship with him?
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <label>Ce client a été rentré par : / This customer was entered by </label>
                                <input type="text" name="enteredBy" placeholder='Entered By...' className='form-control' value={data.enteredBy} onChange={onFormDataChange} />
                                <span className="text-small">Exemple : Jeremy Roggy; Patrick Bueno; TDR. Who entered this customer on the database </span>
                            </div>

                            <div className="col-md-12 col-12 py-4">
                                <div className="submit-btn-hold p-1 mx-auto d-flex">
                                    <button className="btn btn-dark" type='submit' disabled={disableButton}>Ajouter ce Client / Add this Customer</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
