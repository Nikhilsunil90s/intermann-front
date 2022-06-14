import React, { useState,useEffect } from 'react';
import "../../CSS/AddClient.css";
import Select from 'react-select';
import Multiselect from 'multiselect-react-dropdown';

export default function AddClient() {
    const [permis,setPermis]=useState(false)
    const [permisNo,setPermisNo]=useState(false)
    const [Voyage,setVoyage]=useState(false)
    const [VoyageNo,setVoyageNo]=useState(false)

    let options = [
        { value: 'Roumain',name:'candidatLanguages',lable:'Roumain' },
        { value: 'Français',name:'candidatLanguages',lable:'Français' }
      ]as any;

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
        <div className="container-fluid px-3">
        <div className="row">
             <div className="col-12 card-tops px-1 mt-2" style={{padding:"0px",marginBottom:"20px"}}>
               <div className="row text-start">
               <div className="card " style={{padding:"0px 15px",borderRadius:"15px",marginBottom:"0px"}}>
                   <div className="card-body">
                     <h2 className="card-Leads">ADD A CLIENT / LEAD</h2>
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
                <label className="Form-styling" htmlFor="validationCustom01">CLIENT Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter candidats name"
                  id="validationCustom01"
                  name="CLIENTName"
                  required
                 
                  onChange={onFormDataChange}
                />
                 <div className="valid-feedback">
      Looks good!
    </div>
                <span className="text-small">
                  Mandatory, please add company CLIENT
                </span>
              </div>
            </div>
            <div className="col-4">
            <div className="p-1">
                <label className="Form-styling">CLIENT Email</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter email"
                  name="CLIENTEmail"
              
                  onChange={onFormDataChange}
                />
                <span className="text-small">

                  NOT Mandatory, please add email CLIENT
                </span>
              </div>
              </div>
              <div className="col-4">
              <div className="p-1">
           <label className="Form-styling">CLIENT Phone Number</label>
           <input
             type="text"
             className="form-control"
             placeholder="Enter Phone Number (+format)"
             name="candidatPhone"
             required
             value=""
             onChange={onFormDataChange}
           />
           <span className="text-small">
             NOT Mandatory, please add phone CLIENT with +() . exemple :
             +33623167260
           </span>
         </div>
              </div>
            <div className="col-4">
            <div className="p-1">
                <label className="Form-styling">CLIENT Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter CLIENT adress (address, zip, city, country)"
                  name="CLIENTAddress"
                  value=""
                  onChange={onFormDataChange}
                />
                <span className="text-small">
                  Mandatory, Enter CLIENT adress (address, zip, city, country)
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
                  {/* {activitySectors.map((sector) =>
                    <option value={sector.name} >{sector.sectorName}</option> // fetch from api
                  )} */}
                </select>
                <span className="text-small">
                  Please select the sector of this CLIENT, you can add sector on
                  the BO.
                </span>
              </div>
            </div>
            <div className="col-4">
            <div className="p-1">
                <label className="Form-styling">Métier / Job</label>
                <select
                  name="CLIENTJob"
                  className="form-select"
                  onChange={onFormDataChange}
                >
                  {/* {
                    jobs.map((job) =>
                      <option value={job.jobName}>
                        {job.jobName}
                      </option>
                    )
                  } */}

                </select>
                <span className="text-small">

                  Please select the job of this CLIENT, you can add job on the
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
                  name="CLIENTFBURL"
                  value=""
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
                  name="CLIENTAlternatePhone"
                  value=""
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
                <label className="Form-styling">CLIENT Age </label>
                <input
                  type="number"
                  className="form-control"
                  name="CLIENTAge"
                  placeholder="42"
                  value=""
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
                  name="CLIENTSkills"
                  rows={4}
                  value=""
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
                  Motivation de ce CLIENT à travailler avec nous
                </label><span className="Form-styling fs-6">(bigger number
                  is more important)</span>
                <ul style={{ listStyle: "none" }}>
                  <li>
                    <input
                      type="radio"
                      name="CLIENTMotivation"
                      value={1}
                      onChange={onFormDataChange}
                    />
                    1
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="CLIENTMotivation"
                      value={2}
                      onChange={onFormDataChange}
                    />
                    2
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="CLIENTMotivation"
                      value={3}
                      onChange={onFormDataChange}
                    />
                    3
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="CLIENTMotivation"
                      value={4}
                      onChange={onFormDataChange}
                    />
                    4
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="CLIENTMotivation"
                      value={5}
                      onChange={onFormDataChange}
                    />
                    5
                  </li>
                </ul>
            </div>
           </div>
           <div className="col-6">
              <div className="p-1">
                <p className="padding-bottom Form-styling" >Langues du CLIENT</p>
                <div>
                  <input type="checkbox" onClick={()=>onFormDataChange} id="language" name="candidatLanguages" value="Roumain" />
                  <span className="ps-2" >Roumain</span>
                </div>
                <div>
                  <input type="checkbox" name="candidatLanguages" id="language" onClick={()=>onFormDataChange} value="Francais" />
                  <span className="ps-2">Français</span>
                </div>
                <div>
                  <input type="checkbox" name="candidatLanguages" id="language" onClick={()=>onFormDataChange} value="Anglais" />
                  <span className="ps-2">Anglais</span>
                </div>
                <div>
                  <input type="checkbox" name="candidatLanguages" id="language" onClick={()=>onFormDataChange} value="Italien" />
                  <span className="ps-2">Italien</span>
                </div>
                <div>
                  <input type="checkbox" name="candidatLanguages" id="language" onClick={()=>onFormDataChange} value="Russe" />
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
  name={options}
  defaultValue={options}
  value={options}
  options={options}
  onChange={()=>onFormDataChange}
  isMulti
/>
<Multiselect
options={options}
onSelect={()=>onFormDataChange}// Options to display in the dropdown
 // Function will trigger on select event
 // Function will trigger on remove event
displayValue="value" // Property name to display in the dropdown options
/>

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
                 Quand ce CLIENT a besoin de travailler When this CLIENT
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
                 name="CLIENTStartDate"
                 value=""
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
                 name="CLIENTEndDate"
                 value=""
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
                Expérience du CLIENT (fill only lines, higher = more recent)
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
                  CLIENT
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="CLIENTYearsExperience"
                  placeholder="33"
          
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
                  <input type="checkbox" name="candidatFetes" id="fete" value="Easter" onClick={()=>onFormDataChange} />
                  <span className="ps-2">Easter</span>
                </div>
                <div>
                  <input type="checkbox" name="candidatFetes" id="fete" value="Noel"onClick={()=>onFormDataChange} />
                  <span className="ps-2">Noel</span>
                </div>
                <div>
                  <input type="checkbox" name="candidatFetes" id="fete" value="Summer"onClick={()=>onFormDataChange} />
                  <span className="ps-2">Summer</span>
                </div>
                <div>
                  <input type="checkbox" name="candidatFetes" id="fete" value="Autre"onClick={()=>onFormDataChange} />
                  <span className="ps-2">Autre / Other</span>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <label className="Form-styling">
                Ce CLIENT a été rentré par : / This customer was entered by
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
                  Ajouter ce CLIENT / Add this CLIENT
                </button>
              </div>
            </div>
          </div>
        </form>
        </div>
      </div>
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