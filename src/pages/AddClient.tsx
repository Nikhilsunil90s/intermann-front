import React, { useState,useEffect } from 'react';
import "../CSS/AddClient.css";

export default function AddClient() {

    const [data, setData] = useState(fakeDataFormat);
    const onFormDataChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
        setData(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data);
    }

    useEffect(()=>{
  
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
    })
    return (
        <div className='p-2'>
            <div className="text-center py-3">
                <span className='hero-title'>
                    <h3>ADD A CLIENT / LEAD</h3>
                </span>
            </div>
            <div>
                <form className="add-form form" onSubmit={onFormSubmit}>
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
                                <input type="text" className="form-control" placeholder='Enter Company Name' name='companyName' required value={data.companyName} onChange={onFormDataChange} />
                                <span className='text-small'>* Mandatory, please add company name</span>
                            </div>
                            <div className="p-2">
                                <label>Company Phone Number</label>
                                <input type="text" className="form-control" placeholder='Enter Phone Number (+format)' name='companyNumber' required value={data.companyNumber} onChange={onFormDataChange} />
                                <span className="text-small">* Mandatory, please add phone client with +() . exemple : +33623167260</span>
                            </div>
                            <div className="p-2">
                                <label>Secteur d’activité</label>
                                <select name="sector" className='form-select' required value={data.sector} onChange={onFormDataChange}>
                                    <option value="Logisitque">Logisitque</option>
                                </select>
                                <span className="text-small">* Please select the sector of this client, you can add sector on the BO.</span>
                            </div>
                            <div className="p-2">
                                <label>Nom du contact dans l’entreprise</label>
                                <input type="text" className="form-control" placeholder='Contact Name' name='companyContactName' value={data.companyContactName} onChange={onFormDataChange} />
                                <span className="text-small">* NOT Mendatory, please add contact person on this company.</span>
                            </div>
                            <div className="p-2">
                                <label>Compétances demandées par client / Required skills</label>
                                <textarea className="form-control" placeholder='Note' name='skills' rows={4} value={data.skills} onChange={onFormDataChange} ></textarea>
                                <span className="text-small">* NOT mendatory, please add some special skills that the customer ask for this reasearch.</span>
                            </div>
                            <div className="p-2">
                                <label>Motivation de ce client à travailler avec nous(bigger number is more important) </label>
                                <ul style={{ listStyle: 'none' }}>
                                    <li><input type="radio" name="immediateClient" value={1} onChange={onFormDataChange} /> 1 </li>
                                    <li><input type="radio" name="immediateClient" value={2} onChange={onFormDataChange} /> 2 </li>
                                    <li><input type="radio" name="immediateClient" value={3} onChange={onFormDataChange} /> 3 </li>
                                    <li><input type="radio" name="immediateClient" value={4} onChange={onFormDataChange} /> 4 </li>
                                    <li><input type="radio" name="immediateClient" value={5} onChange={onFormDataChange} /> 5 </li>
                                </ul>
                                <span className="text-small">* If we find the candidates, does he take it immediately? Or will he still need to think?</span>
                            </div>
                            <div className="p-2">
                                <label>Chiffre d’affaire potentiel / Potential turnover</label>
                                <div className="d-flex amount-fields">
                                    <span>€</span>
                                    <input type="number" name='turnover' placeholder='Amount' value={data.turnover} onChange={onFormDataChange} />
                                    <span>.00</span>
                                </div>
                                <span className="text-small">* Not mendatory / Potentiel CA généré par ce lead.</span>
                            </div>
                            <div className="p-2">
                                <label>Salaire net du salarié / Employee's net salary</label>
                                <div className="d-flex amount-fields">
                                    <span>€</span>
                                    <input type="number" name='salary' placeholder='Amount' value={data.salary} onChange={onFormDataChange} />
                                    <span>.00</span>
                                </div>
                                <span className="text-small">* Not mendatory / Potentiel CA généré par ce lead.</span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="p-2">
                                <label>Client Email</label>
                                <input type="email" className="form-control" placeholder='Enter Client Name' name='clientEmail' value={data.clientEmail} onChange={onFormDataChange} />
                                <span className='text-small'>* Mandatory, please add client email</span>
                            </div>

                            <div className="p-2">
                                <label>Company Address</label>
                                <input type="text" className="form-control" placeholder='Enter client adress (address, zip, city, country)' name='companyAddress' value={data.companyAddress} onChange={onFormDataChange} />
                                <span className="text-small">* Mandatory, Enter client adress (address, zip, city, country)</span>
                            </div>

                            <div className="p-2">
                                <label>Métier / Job</label>
                                <select name="job" className='form-select' value={data.job} onChange={onFormDataChange} >
                                    <option value="Préparateur de commande">Préparateur de commande</option>
                                </select>
                                <span className="text-small">* Please select the job of this client, you can add job on the BO.</span>
                            </div>

                            <div className="p-2">
                                <label>Téléphone du contact dans l’entreprise</label>
                                <input type="text" className="form-control" placeholder='Phone number (+format)' name='companyContactNumber' value={data.companyContactNumber} onChange={onFormDataChange} />
                                <span className="text-small">* NOT Mendatory, please add phone number of our contact in  this company if there is one, if not we will use company number.</span>
                            </div>

                            <div className="p-2">
                                <label>Nombre de poste recherché / Number of post that the client needs</label>
                                <input type="number" className="form-control" min={0} name='postCount' value={data.postCount} onChange={onFormDataChange} />
                                <span className="text-small">* Please select the job of this client, you can add job on the BO.</span>
                            </div>

                            <div className="p-2">
                                <div className="card card-body">
                                    <label className='fw-bold'>Quand ce client a besoin du(des) travailleur détaché  / When this client needs the posted worker</label>
                                    <br />
                                    <label className='fw-bold'>From date / A PARTIR DE </label>
                                    <input type="date" className="form-control" name='fromDate' value={data.fromDate} onChange={onFormDataChange} />
                                    <br />
                                    <label className="fw-bold">UNTIL DATE / Jusqu’à </label>
                                    <input type="date" className="form-control" name='toDate' value={data.toDate} onChange={onFormDataChange} />
                                    <span className="text-small">* Please select the job of this client, you can add job on the BO.</span>
                                </div>
                            </div>

                            <div className="p-2">
                                <label>Importance de ce client (bigger number is more important) </label>
                                <ul style={{ listStyle: 'none' }}>
                                    <li><input type="radio" name="importanceClient" value={1} onChange={onFormDataChange} /> 1 </li>
                                    <li><input type="radio" name="importanceClient" value={2} onChange={onFormDataChange} /> 2 </li>
                                    <li><input type="radio" name="importanceClient" value={3} onChange={onFormDataChange} /> 3 </li>
                                    <li><input type="radio" name="importanceClient" value={4} onChange={onFormDataChange} /> 4 </li>
                                    <li><input type="radio" name="importanceClient" value={5} onChange={onFormDataChange} /> 5 </li>
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
                            <input type="text" name="enteredBy" placeholder='Contact' className='form-control' value={data.enteredBy} onChange={onFormDataChange} />
                            <span className="text-small">Exemple : Jeremy Roggy; Patrick Bueno; TDR. Who entred this customer on the database </span>
                        </div>
                        
                        <div className="col-md-12 col-12 py-4">
                            <div className="submit-btn-hold p-1 mx-auto d-flex">
                                <button className="btn btn-dark" type='submit'>Ajouter ce client / Add this customer</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

const fakeDataFormat = {
    companyName: '',
    companyNumber: '',
    clientEmail: '',
    companyAddress: '',
    sector: '',
    companyContactName: '',
    companyContactNumber: '',
    skills: '',
    immediateClient: '',
    turnover: 0,
    salary: 0,
    job: '',
    postCount: 1,
    fromDate: '',
    toDate: '',
    importanceClient: '',
    enteredBy: ''
}