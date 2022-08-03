import React, { useState, useEffect } from "react";
import "../../CSS/AddClient.css";
import Select, { StylesConfig } from "react-select";
import Switch from "react-switch";
import RatingCmp from "../../components/AddClientRating/Rating";
import { Toaster, toast } from 'react-hot-toast';
import { API_BASE_URL } from '../../config/serverApiConfig';
import {
  NumberOfPost,
  ColourOption,
  optionsOfSEO,
  COFAC,
} from "../../Selecteddata/data";
import chroma from "chroma-js";
import $ from "jquery";
import {ReactComponent as TurnoFF} from "../../images/FatX.svg";
import {ReactComponent as TurnOn} from "../../images/base-switch_icon.svg";

let Amountarr = "";
let Hours = "";
declare global {
  namespace JSX {
    interface IntrinsicElements {
      Rating: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}



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
  salary_hours:{
    hours:"",
    salaryPerHour: ""
  },
  rate_hours :{ hours:"",ratePerHour: "" },
  numberOfPosts: "",
  clientMotivation: 0,
  jobStartDate: "",
  jobEndDate: "",
  jobTotalBudget: "",
  netSalary: "",
  clientImportance: 0,
  enteredBy: "",
  jobStatus: "To-Do",
  note_cofac:"",
  leadOrigin:"",
  offerSent :false,
        signatureSent :false,
        contractSigned:false,
        publicityStarted:false,
        A1selected:false,
        assuranceFaite:false,
        agenceDeVoyage:false,
        sispiDeclared:false,
}


export default function AddClient(props) {
  const SwitchChange = (checked: any, e: any, Name: any) => {
console.log(Name,"checkd")
    if (Name === "offerSent") {
      if (checked === true) {
        setOffre(true);
    setData({...data,offerSent:checked})
       
      }
      if (checked === false) {
        setOffre(false);
    setData({...data,offerSent:checked})
       
      }
    }
    if (Name === "signatureSent") {
      if (checked === true) {
        setSignature(true);
        setData({...data,signatureSent:checked})
      }
      if (checked === false) {
        setSignature(false);
        setData({...data,signatureSent:checked})
       
      }
    }
    if (Name === "contractSigned") {
      if (checked === true) {
        setContrat(true);
        setData({...data,contractSigned:checked})
    

       
      }
      if (checked === false) {
        setContrat(false);
        setData({...data,contractSigned:checked})
       
      }
    }
    if (Name === "publicityStarted") {
      if (checked === true) {
        setPublic(true);
        setData({...data,publicityStarted:checked})
    

       
      }
      if (checked === false) {
        setPublic(false);
        setData({...data,publicityStarted:checked})
       
      }
    }
    if (Name === "A1selected") {
      if (checked === true) {
        setA1(true);
        setData({...data,A1selected:checked})
      }
      if (checked === false) {
        setA1(false);
        setData({...data,A1selected:checked})
       
      }
    }
    if (Name === "assuranceFaite") {
      if (checked === true) {
        setAssurance(true);
    
        setData({...data,assuranceFaite:checked})

       
      }
      if (checked === false) {
        setAssurance(false);
        setData({...data,assuranceFaite:checked})
       
      }
    }
    if (Name === "agenceDeVoyage") {
      if (checked === true) {
        setAgence(true);
    
        setData({...data,agenceDeVoyage:checked})

       
      }
      if (checked === false) {
        setAgence(false);
        setData({...data,agenceDeVoyage:checked})
       
      }
    }
    if (Name === "sispiDeclared") {
      if (checked === true) {
        setChecked(true);
        setData({...data,sispiDeclared:checked})
      }
      if (checked === false) {
        setChecked(false);
        setData({...data,sispiDeclared:checked})
      }
    }
  };

// Notify //

const notifyClientAddSuccess = () => toast.success("Client Added Successfully! View Client in To-Do / Non - Traite / Attente List.");

const notifyClientAddError = () => toast.error("Client Cannot Be Added! Please Try Again.");

const notifyNameError = () => toast.error("Please Provide Candidat Name !");

const notifyDateError = () => toast.error("Ajouter les dates pour valider cette fiche !");

const notifyAddressError = () => toast.error("Please Provide Client Address !");

const notifyPhoneError = () => toast.error("Please Provide Client Phone Number !");

const notifyEmailError = () => toast.error("Please Provide Client Email !");

//  END  //


const [disableButton, setDisableButton] = useState(false);
const [data, setData] = useState(ClientDataFormat);
const [activitySectors, setActivitySectors] = useState([]);
const [sectorOption,setSectorOptions]=useState([])
const [jobs, setJobs] = useState([{ jobName: "", associatedSector: "", _id: "" }]);
const [matched, setMatched] = useState(false);
  const [showHour, setShowHour] = useState("");
  const [id, setID] = useState("");
  const [StarRatings,setRatings]=useState([])
  const [jobOptions, setJobOptions] = useState([])
  const [selectedSector, setSelectedSector] = useState("");
  const [Language, setLanguage] = useState([])
  const [SISPI, setChecked] = useState(false);
  const [Agence, setAgence] = useState(false);
  const [Assurance, setAssurance] = useState(false);
  const [A1, setA1] = useState(false);
  const [Public, setPublic] = useState(false);
  const [Contrat, setContrat] = useState(false);
  const [Signature, setSignature] = useState(false);
  const [Offre, setOffre] = useState(false);
  const [taxHours,setHours]=useState("")
  const [taxHoursID,setHoursId]=useState("")
  const [salary,setSalary_hours] =useState({
    hours:"",
    salaryPerHour:""
  })
  const [rateHours,setrate_hours] =useState({
    hours:"",
    ratePerHour:""
  })as any

  const RemoveHandling=(e)=>{
 if(e.target.name=="Salary"){
  setShowHour("")
    setID("")
    setSalary_hours( { hours:"",
    salaryPerHour:""})
 }
  if(e.target.name=="TauxHours"){
    setHours("")
    setHoursId("")
    setrate_hours({
      hours:"",
      ratePerHour:""
    })
  }
  
  }
  const HandleChange = (e: any) => {
    console.log(e.target.value);
    if (e.target.id === "1") {
      setShowHour("35");
      setID(e.target.id);
      setSalary_hours({...salary,hours:"35"})
    }
    if (e.target.id === "2") {
      setShowHour("39");
      setID(e.target.id);
      setSalary_hours({...salary,hours:"39"})

    }
    if (e.target.id === "3") {
      setShowHour("40");
      setSalary_hours({...salary,hours:"40"})
      setID(e.target.id);
    }
    if (e.target.id === "4") {
      setShowHour("41");
      setID(e.target.id);
      setSalary_hours({...salary,hours:"41"})

    }
    if (e.target.id === "5") {
      setShowHour("42");
      setSalary_hours({...salary,hours:"42"})
      setID(e.target.id);
    }
    if (e.target.id === "6") {
      setShowHour("43");
      setSalary_hours({...salary,hours:"43"})
      setID(e.target.id);
    }
    if (e.target.id === "7") {
      setShowHour("44");
      setID(e.target.id);
      setSalary_hours({...salary,hours:"44"})

    }
    if (e.target.id === "8") {
      setShowHour("45");
      setID(e.target.id);
      setSalary_hours({...salary,hours:"45"})
    }
  };

  const TauxHandleChange = (e: any) => {
    console.log(e.target.value);
    if (e.target.id === "1") {
      setShowHour("35");
      setHoursId(e.target.id);
      setrate_hours({...rateHours,hours:"35"})
      // setData({...data.salary_hours.hours:...salary.hours})
    }
    if (e.target.id === "2") {
      setHours("39");
      setHoursId(e.target.id);
      setrate_hours({...rateHours,hours:"39"})

    }
    if (e.target.id === "3") {
      setHours("40");
      setHoursId(e.target.id);
      setrate_hours({...rateHours,hours:"40"})

    }
    if (e.target.id === "4") {
      setHours("41");
      setHoursId(e.target.id);
      setrate_hours({...rateHours,hours:"41"})

    }
    if (e.target.id === "5") {
      setHours("42");
      setHoursId(e.target.id);
      setrate_hours({...rateHours,hours:"42"})

    }
    if (e.target.id === "6") {
      setHours("43");
      setHoursId(e.target.id);
      setrate_hours({...rateHours,hours:"43"})

    }
    if (e.target.id === "7") {
      setHours("44");
      setHoursId(e.target.id);
      setrate_hours({...rateHours,hours:"44"})

    }
    if (e.target.id === "8") {
      setHours("45");
      setHoursId(e.target.id);
      setrate_hours({...rateHours,hours:"45"})

    }
  };

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
 
  


  const changeSectorSelection = async (sec: string) => {
    if (sec) {
      setSelectedSector(sec)
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
    if(sectorOption.length == 0){
      let sectorops = activitySectors.map((asector) => {
        return { value: asector.sectorName, label: asector.sectorName, color: '#FF8B00' }
      })
  
      setSectorOptions([...sectorops]);
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

// const checkClient = async (clientName: string, jobName: string) => {
//     return await fetch(API_BASE_URL + `getClientByNameAndJob/?clientName=${clientName}&jobName=${jobName}`, {
//         method: "GET",
//         headers: {
//             "Accept": 'application/json',
//             'Content-Type': 'application/json',
//             "Authorization": "Bearer " + localStorage.getItem('token')
//         }
//     }).then(resD => resD.json())
//         .then(reD => reD)
//         .catch(err => err)
// }



const RatingFun=(val)=>{
  setData({...data,clientImportance:val})
}
const onFormDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

    if (e.target.name === 'clientActivitySector') {
        console.log(e.target.name, e.target.value);
        changeSectorSelection(e.target.value);
    }
    // if (e.target.name === "clientCompanyName") {
    //     let clientName = e.target.value;
  
    //     let val = e.target.value.toLocaleUpperCase()
    //     console.log(val);
    //     checkClient(clientName).then(da => {
    //         console.log(da);
    //         if (da.status) {
    //             setMatched(true);
    //         } else {
    //             setMatched(false);
    //         }
    //     }).catch(err => {
    //         console.log(err)
    //     })
    //     setData((prev) => ({ ...prev, ["clientCompanyName"]: val }));
    //     return;
    // }
    // if (e.target.name === "clientJob") {
    //     let clientName = data.clientCompanyName;
    //     let jobName = e.target.value;
    //     checkClient(clientName, jobName).then(da => {
    //         console.log(da);
    //         if (da.status) {
    //             setMatched(true);
    //         } else {
    //             setMatched(false);
    //         }
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }

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


const NoteCofac=(e)=>{
console.log(e.value,"value")
let NoteCofac=""
NoteCofac=e.value
setData({...data,note_cofac:NoteCofac})
}

const onSubmitRates=(e)=>{
  if(e.target.name==="salaryH"){
  setData({...data,salary_hours:salary})
  }
  if(e.target.name==="tauxH"){
    setData({...data,rate_hours:rateHours})
  }
}

const onInputChange=(val)=>{
  if(val.target.name==="salary_hours"){
    setSalary_hours({...salary,salaryPerHour:val.target.value})
  }
  if(val.target.name==="turnover"){
    setrate_hours({...setrate_hours,ratePerHour:val.target.value})
  }
}

const NumberOfPOST=(Num)=>{
  let Posts=""
  Posts=Num.value
  setData({...data,numberOfPosts:Posts})
}

const SEOlead=(SEO)=>{
setData({...data,leadOrigin:SEO.value})
}

const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
            setDisableButton(false)
            setTimeout(() => {
                // window.location.href = "/addCustomer"
            }, 2000)
        }
    })
        .catch(err => {
            console.log(err)
        })
};

useEffect(() => {
    console.log(data)
}, [data])
   

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
  if (jobs.length === 0 ) {
      fetchAllJobs(selectedSector)
          .then((data) => {
              console.log(data);
              setJobs([...data.data])
          })
          .catch(err => {
              console.log(err)
          })
  }
  console.log(data);
  let jobResults = jobs.map(ajob => {
      return { value: ajob.jobName, label: ajob.jobName, color: '#FF8B00' }
    })
    setJobOptions([...jobResults]);
    console.log(jobs,"jobs");
}, [jobs])

const jobChange = async (jobval) => {
// console.log(jobval)
let JobArr=""as any

 JobArr=jobval.value

setData({...data,clientJob:JobArr})

// changeJobSelection(JobArr)
}
const handleChange = (selectedOption) => {
console.log(`Option selected:`, selectedOption)
let arr = []

selectedOption.map((el) => {
  arr.push(el.value)
})
setLanguage(arr)
console.log(Language, "language")
// setData({ ...data,clientLanguages: arr })
}

useEffect(() => {
console.log(activitySectors);
let sectorops = activitySectors.map((asector) => {
  return { value: asector.sectorName, label: asector.sectorName, color: '#FF8B00' }
})

setSectorOptions([...sectorops]);
}, [activitySectors])
  const colourStyles: StylesConfig<ColourOption, true> = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
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
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
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
      ":hover": {
        backgroundColor: data.color,
        color: "white",
      },
    }),
  };

  const handleSectorChange = (e: any) => {
    setJobOptions([])
    console.log(e)
    if (e.value === "Select Un Secteur") {
      setJobs([]);
      setSelectedSector("");
      setJobOptions([]);
    } else if (e.value !== '') {
      let sectorField = e.value;
      changeSectorSelection(sectorField)
      setData({...data,clientActivitySector:sectorField})
      console.log(selectedSector,"selected")
    }
}
  return (
    <>
    <Toaster position="top-right" containerStyle={{zIndex:"999999999999999999999999999"}} />
    <div className="container-fluid px-2">
      <div className="row">
        <div
          className="col-12 card-tops px-1 mt-2"
          style={{ padding: "0px", marginBottom: "20px" }}
        >
          <div className="row text-start">
            <div
              className="card "
              style={{
                padding: "0px 15px",
                borderRadius: "15px",
                marginBottom: "0px",
              }}
            >
              <div className="card-body">
                <h2 className="card-Leads">ADD A CLIENT / LEAD</h2>
                <p className="fonStylingPtag">
                  Attention : si un client demande deux métiers différents = il
                  faut faire deux fois ce formulaire
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 p-0">
          <div className="row px-1 pb-1">
            <form
              className="add-form form needs-validation p-0"
              name="contact-form"
              onSubmit={onFormSubmit}
            >
              <div className="d-flex flex-wrap justify-content-around">
                <div className="col-4">
                  <div className="p-1">
                    <label className="Form-styling">Company name</label>
                    <input
                      type="text"
                      className="form-control placeHolder"
                      placeholder="Enter Company Name"
                      id="validationCustom01"
                      name="clientCompanyName"
                      value={data.clientCompanyName.toLocaleUpperCase()} onChange={onFormDataChange}
                    />
                    <span className="text-small">
                      Mendatory, please add company client
                    </span>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-1">
                    <label className="Form-styling">CLIENT Email</label>
                    <input
                      type="text"
                      className="form-control placeHolder"
                      placeholder="Enter Client Email"
                      name="clientEmail"
                      value={data.clientEmail} onChange={onFormDataChange}
                    />
                    <span className="text-small">
                      Mendatory, please add client email address
                    </span>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-1">
                    <label className="Form-styling">Company Phone number</label>
                    <input
                      type="text"
                      className="form-control placeHolder"
                      placeholder="Enter Phone Number (+format)"
                      name="clientPhone"
                      value={data.clientPhone} onChange={onFormDataChange}
                    />
                    <span className="text-smallOG">
                      Important Value, please add phone number
                    </span>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-1">
                    <label className="Form-styling">Company adress</label>
                    <input type="text" className="form-control placeHolder" placeholder='Enter Client Adress (address, zip, city, country)' name='clientAddress' value={data.clientAddress} onChange={onFormDataChange} />
                    <span className="text-smallOG">Important value</span>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-1">
                    <label className="Form-styling">Secteur d’Activité</label>
                    <Select
                                            options={sectorOption}
                                            onChange={handleSectorChange}
                                            styles={colourStyles}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            closeMenuOnSelect={true}
                                            placeholder="‎ ‎ ‎ Select Un Secteur"
                                            />
                    <span className="text-small">
                      Please select the sector of this client, you can add
                      sector on the BO
                    </span>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-1">
                    <label className="Form-styling">Métier / Job</label>
                    {jobOptions.length > 0 ?   <Select
                      name="jobName"
                      closeMenuOnSelect={true}
                      placeholder="‎ ‎ ‎ Select"
                      className="basic-multi-select"
                      classNamePrefix="select"
                      // defaultValue={{label:profile.clientJob,value:profile.clientJob,color:"#FE8700"}}
                      // defaultInputValue={{label:profile.clientJob,value:profile.clientJob,color:"#FE8700"}}
                      onChange={jobChange}
                      options={jobOptions}
                      styles={colourStyles}
                    />: <p>Select A Sector!</p>
}
                    <span className="text-small">
                      Please select the job of this client, you can add job on
                      the BO
                    </span>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-1">
                    <label className="Form-styling">
                      Nom du contact dans l’entreprise
                    </label>
                    <input type="text" className="form-control placeHolder" placeholder='Contact Name' name='clientReferenceName' value={data.clientReferenceName} onChange={onFormDataChange} />
                    <span className="text-smallOG">
                      NOT Mendatory, please add contact person on this company.
                    </span>
                  </div>
                </div>
                <div className="col-4 pt-1">
                  <div className="">
                    <label className="Form-styling" style={{ width: "105%" }}>
                      Téléphone du contact dans l’entreprise
                    </label>
                    <input type="text" className="form-control placeHolder" placeholder='Phone number (+format)' name='clientReferenceNumber' value={data.clientReferenceNumber} onChange={onFormDataChange} />
                    <span className="text-smallOG">
                      Important Value, please add phone number of our contact in
                      this company if there is one, if not we will use company
                      number
                    </span>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-1">
                    <label className="Form-styling">
                      Nombre de poste recherché
                    </label>
                    {/* <input
                  type="number"
                  className="form-control placeHolder"
                  name="ClientAge"
                  placeholder="42"
               
                  onChange={onFormDataChange}

                /> */}
                    <Select
                      name="NumberOfPosts"
                      closeMenuOnSelect={true}
                      placeholder="Select value from 1  to 35"
                      className="basic-select"
                      classNamePrefix="select"
                      onChange={NumberOfPOST}
                      options={NumberOfPost}
                      styles={colourStyles}
                    />
                    <span className="text-small">
                      Select the number of workers that this customer need
                    </span>
                  </div>
                </div>
                <div className="col-12">
                  <div className="p-1">
                    <label className="Form-styling">
                      Skills / Notes Compétances (will be displayed on CV)
                    </label>
                    <textarea className="form-control placeHolder" placeholder='Enter Skillset Required ... ' name='clientRequiredSkills' rows={4} value={data.clientRequiredSkills} onChange={onFormDataChange} style={{ overflow: 'hidden' }} ></textarea>
                    <span className="text-smallOG">
                      NOT mandatory, please add some special skills that the
                      customer asks for this reasearch.
                    </span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-1">
                    <label className="Form-styling">
                      Motivation de ce CLIENT à travailler avec nous
                    </label>
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
                            />
                            <label htmlFor="r5" className="react">
                              <i data-icon="😍"></i>
                            </label>
                          </div>
                          <span className="font-Emoji">Super lovely</span>
                        </div>
                      </div>
                      {/* {showMessage ?
                          <h5 className="Form-styling mt-1">
                            Note: If we find the candidates, does he take it immediately? Or
                            will he still need to think?
                          </h5> : null} */}
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="">
                    <label className="Form-styling d-grid">
                      Importance de ce client
                      <p className="mb-0">(bigger number is more important) </p>
                    </label>
                    <div className="col-12">
                      {/* <ReactStars
                        count={5}
                        color="#E7E7E7"
                        onChange={ratingChanged}
                        size={50}
                        emptyIcon={
                          <div>
                            <i className="far fa-star"></i>
                          </div>
                        }
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#FFB608"
                      /> */}
                      
{/* <div className="star-rating">
  <input type="radio" id="5-stars" name="rating" value="5" />
  <label htmlFor="5-stars" className="star"><Empty /></label>
  <input type="radio" id="4-stars" name="rating" value="4" />
  <label htmlFor="4-stars" className="star"><Empty /></label>
  <input type="radio" id="3-stars" name="rating" value="3" />
  <label htmlFor="3-stars" className="star"><Empty /></label>
  <input type="radio" id="2-stars" name="rating" value="2" />
  <label htmlFor="2-stars" className="star"><Empty /></label>
  <input type="radio" id="1-star" name="rating" value="1" />
  <label htmlFor="1-star" className="star"><Empty /></label>
</div> */}
{/* <Rating
  emptySymbol={<img style={{marginLeft:"10px"}} src={require("../../images/emptyStar.svg").default} />}
  fullSymbol={<img style={{marginLeft:"10px"}} src={require("../../images/RatingStar.svg").default} />}
  placeholderRating={0}
  
/> */}
<RatingCmp  StarRatings={setRatings} StarR={StarRatings} FunC={RatingFun}/>
                    </div>
                  </div>
                </div>
                <div className="col-5 p-1">
                  <p className="padding-bottom Form-styling mb-1">NOTE COFAC</p>

                  <Select
                    name="candidatComingFrom"
                    closeMenuOnSelect={true}
                    placeholder="0"
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={NoteCofac}
                    options={COFAC}
                    styles={colourStyles}
                  />
                  <label className="paidHFontChild">
                    Si possible (0 si non déterminé)
                  </label>
                </div>
                <div className="col-5 py-1  mr-3">
                  <p className="padding-bottom Form-styling mb-1">
                    Provenance du lead
                  </p>
                  <Select
                    name="candidatComingFrom"
                    closeMenuOnSelect={true}
                    placeholder="SEO"
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={SEOlead}
                    options={optionsOfSEO}
                    styles={colourStyles}
                  />
                </div>

                <div className="col-12">
                  <div className="row">
                    <label className="fw-bold Form-styling mt-1 mb-0">
                      Quand ce CLIENT a besoin de travailler When this CLIENT is
                      ready to work with us
                    </label>
                    <div className="col-6">
                      <div className="p-1">
                        <label className="fromDate">
                          From date / A PARTIR DE
                        </label>
                        <input type="date" className="form-control" name='jobStartDate' value={data.jobStartDate} onChange={onFormDataChange} />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="p-1">
                        <label className="fromDate">
                          UNTIL DATE / Jusqu’à
                        </label>
                        <input type="date" className="form-control" name='jobEndDate' value={data.jobEndDate} onChange={onFormDataChange} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 mt-1">
                  <div className="row">
                    <p className="padding-bottom Form-styling pb-1">
                      Select salaries Hours
                    </p>
                    <div className="d-flex " id="dam_return">
                
                      <div className="pr-1">
                        <button
                          type="button"
                       
                          id="1"
                          onClick={(e) => {
                            HandleChange(e);
                        
                          }}
                          style={{
                            backgroundColor: id == "1" ? " #F4E7FF" : "",
                            color: id == "1" ? "#A461D8" : "#979797",
                          }}
                          className="btn btnHPaid "
                        >
                          35H
                        </button>
                      </div>
                      <div className="pr-1">
                        <button
                          type="button"
                        
                          id="2"
                          onClick={(e) => {
                            HandleChange(e);
                        
                          }}
                          style={{
                            backgroundColor: id == "2" ? " #F4E7FF" : "",
                            color: id == "2" ? "#A461D8" : "#979797",
                          }}
                          className="btn btnHPaid "
                        >
                          39H
                        </button>
                      </div>
                      <div className="pr-1">
                        <button
                          type="button"
                         
                          id="3"
                          onClick={(e) => {
                            HandleChange(e);
                        
                          }}
                          style={{
                            backgroundColor: id == "3" ? " #F4E7FF" : "",
                            color: id == "3" ? "#A461D8" : "#979797",
                          }}
                          className="btn btnHPaid "
                        >
                          40H
                        </button>
                      </div>
                      <div className="pr-1">
                        <button
                          type="button"
                        
                          id="4"
                          onClick={(e) => {
                            HandleChange(e);
                        
                          }}
                          style={{
                            backgroundColor: id == "4" ? " #F4E7FF" : "",
                            color: id == "4" ? "#A461D8" : "#979797",
                          }}
                          className="btn btnHPaid "
                        >
                          41H
                        </button>
                      </div>
                      <div className="pr-1">
                        <button
                          type="button"
                         
                          id="5"
                          onClick={(e) => {
                            HandleChange(e);
                        
                          }}
                          style={{
                            backgroundColor: id == "5" ? " #F4E7FF" : "",
                            color: id == "5" ? "#A461D8" : "#979797",
                          }}
                          className="btn btnHPaid "
                        >
                          42H
                        </button>
                      </div>
                      <div className="pr-1">
                        <button
                          type="button"
                          
                          id="6"
                          onClick={(e) => {
                            HandleChange(e);
                        
                          }}
                          style={{
                            backgroundColor: id == "6" ? " #F4E7FF" : "",
                            color: id == "6" ? "#A461D8" : "#979797",
                          }}
                          className="btn btnHPaid "
                        >
                          43H
                        </button>
                      </div>
                      <div className="pr-1">
                        <button
                          type="button"
                          id="7"
                          onClick={(e) => {
                            HandleChange(e);
                        
                          }}
                          style={{
                            backgroundColor: id == "7" ? " #F4E7FF" : "",
                            color: id == "7" ? "#A461D8" : "#979797",
                          }}
                          className="btn btnHPaid "
                        >
                          44H
                        </button>
                      </div>
                      <div className="pr-1">
                        <button
                          type="button"
                        
                          id="8"
                          onClick={(e) => {
                            HandleChange(e);
                        
                          }}
                          style={{
                            backgroundColor: id == "8" ? " #F4E7FF" : "",
                            color: id == "8" ? "#A461D8" : "#979797",
                          }}
                          className="btn btnHPaid "
                        >
                          45H
                        </button>
                      </div>
                    </div>
                    <div className="col-5 mt-1">
                      <div
                        className="d-flex amount-fieldsModal"
                        style={{ width: "100%" }}
                      >
                        <span>€</span>
                        <input type="text" className='form-control placeHolder' name='salary_hours' placeholder='Amount'   onChange={onInputChange} />
                        <span>.00</span>
                      </div>
                    </div>
                    <div className="col-3 mt-1 px-1 ">
                      <button type="button" className="btn saveSalary" name="salaryH" id="Hour" onClick={(e)=>onSubmitRates(e)}>
                        Save Salary {showHour}H
                      </button>
                    </div>
                    <div className="col-4 mt-1 px-1">
                      <button type="button" onClick={(e)=>RemoveHandling(e)} name="Salary" className="btn RemoveSalary">
                        REMOVE Salary {showHour}H
                      </button>
                    </div>
                    <p className="paidHFontChild">
                      A remplir si possible, il faut selectionner les heures
                      négociées et mettre une valeur du salaire mensuel pour Xh
                    </p>
                  </div>
                </div>
                <div className="col-12">
                <p className="padding-bottom Form-styling pb-1 mt-2">
                      taux horraire Hours
                    </p>
                  <div className="row">
                    <div className=" d-flex">
                      <div className="pr-1">
                        <button type="button"
                          id="1"
                          onClick={(e) => {
                            TauxHandleChange(e);
                        
                          }}
                          style={{
                            backgroundColor: taxHoursID == "1" ? " #F4E7FF" : "",
                            color: taxHoursID == "1" ? "#A461D8" : "#979797",
                          }} className="btn btnHPaid ">
                          35H
                        </button>
                      </div>
                      <div className="pr-1">
                        <button type="button" 
                          id="2"
                          onClick={(e) => {
                            TauxHandleChange(e);
                        
                          }}
                          style={{
                            backgroundColor: taxHoursID == "2" ? " #F4E7FF" : "",
                            color: taxHoursID == "2" ? "#A461D8" : "#979797",
                          }}
                          className="btn btnHPaid ">
                          39H
                        </button>
                      </div>
                      <div className="pr-1">
                        <button type="button"
                          id="3"
                          onClick={(e) => {
                            TauxHandleChange(e);
                        
                          }}
                          style={{
                            backgroundColor: taxHoursID == "3" ? " #F4E7FF" : "",
                            color: taxHoursID == "3" ? "#A461D8" : "#979797",
                          }} className="btn btnHPaid ">
                          40H
                        </button>
                      </div>
                      <div className="pr-1">
                        <button type="button"
                          id="4"
                          onClick={(e) => {
                            TauxHandleChange(e);
                        
                          }}
                          style={{
                            backgroundColor: taxHoursID == "4" ? " #F4E7FF" : "",
                            color: taxHoursID == "4" ? "#A461D8" : "#979797",
                          }} className="btn btnHPaid ">
                          41H
                        </button>
                      </div>
                      <div className="pr-1">
                        <button type="button" 
                          id="5"
                          onClick={(e) => {
                            TauxHandleChange(e);
                        
                          }}
                          style={{
                            backgroundColor: taxHoursID == "5" ? " #F4E7FF" : "",
                            color: taxHoursID == "5" ? "#A461D8" : "#979797",
                          }} className="btn btnHPaid ">
                          42H
                        </button>
                      </div>
                      <div className="pr-1">
                        <button type="button" 
                          id="6"
                          onClick={(e) => {
                            TauxHandleChange(e);
                        
                          }}
                          style={{
                            backgroundColor: taxHoursID == "6" ? " #F4E7FF" : "",
                            color: taxHoursID == "6" ? "#A461D8" : "#979797",
                          }} className="btn btnHPaid ">
                          43H
                        </button>
                      </div>
                      <div className="pr-1">
                        <button type="button" 
                          id="7"
                          onClick={(e) => {
                            TauxHandleChange(e);
                        
                          }}
                          style={{
                            backgroundColor: taxHoursID == "7" ? " #F4E7FF" : "",
                            color: taxHoursID == "7" ? "#A461D8" : "#979797",
                          }} className="btn btnHPaid ">
                          44H
                        </button>
                      </div>
                      <div className="pr-1">
                        <button type="button"
                          id="8"
                          onClick={(e) => {
                            TauxHandleChange(e);
                        
                          }}
                          style={{
                            backgroundColor: taxHoursID == "8" ? " #F4E7FF" : "",
                            color: taxHoursID == "8" ? "#A461D8" : "#979797",
                          }} className="btn btnHPaid ">
                          45H
                        </button>
                      </div>
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
                          className="form-control placeHolder"
                          name="turnover"
                          placeholder="Amount"
                          onChange={onInputChange}
                        />
                        <span>.00</span>
                      </div>
                    </div>
                    <div className="col-3 mt-1 px-0">
                      <button type="button" className="btn SaveTAUX" name="tauxH" onClick={(e)=>onSubmitRates(e)}>
                        Save TAUX HORRAIRE {taxHours} H
                      </button>
                    </div>
                    <div className="col-4 mt-1 px-1">
                      <button type="button" className="btn RemoveSalary" name="TauxHours" onClick={(e)=>RemoveHandling(e)}>
                        REMOVE Salary {taxHours}H
                      </button>
                    </div>
                    <p className="paidHFontChild">
                      A remplir si possible, il faut selectionner les heures
                      négociées et mettre une valeur du salaire mensuel pour Xh
                    </p>
                  </div>
                </div>
                <div className="col-12 mt-1">
                  <p className="Form-styling  ">
                    CA Potentiel / Potential Turnonver
                  </p>
                  <div
                    className="d-flex amount-fieldsModal mt-0 pt-0"
                    style={{ width: "40%" }}
                  >
                    <span>€</span>
                    <input type="text" className='form-control' name='jobTotalBudget' placeholder='Amount' value={data.jobTotalBudget} onChange={onFormDataChange} />
                    <span>.00</span>
                  </div>
                  <p className="paidHFontChild">
                    A remplir si possible, c’est le CA qu’on peut réaliser avec
                    ce client
                  </p>
                </div>
                <div className="col-12">
                  <div className="row">
                    <div className="col-md-6">
                      <label className="Form-styling mb-0">
                        Ce client a été rentré par : / This customer was entered
                        by
                      </label>
                      <input type="text" name="enteredBy" placeholder='Entered By...' className='form-control' value={data.enteredBy} onChange={onFormDataChange} />
                      <span className="text-small">
                        Exemple : Jeremy Roggy; Patrick Bueno; TDR .... Who
                        entred this customer on the database
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-12 mt-2 ">
                  <div className="row bg-Switch">
                    <div className="col-2 d-flex px-0 justify-content-start">
                      <div className="d-flex align-items-center ">
                        <p className="fontSizeReactSwitch mb-0">
                          Offre envoyé ?
                        </p>
                        <Switch
                          className="ml-left"
                          onChange={(checked,e,id)=>SwitchChange(checked,e,id)}
                          // onClick={(e)=>(checked,e)=>SwitchChange()(e)}
                          checked={Offre}
                          id="offerSent"
                 checkedHandleIcon={<TurnOn style={{position:"absolute",width:"31px",height:"25px",top:"-3px",left:"-6px"}} />} height={22} width={48} uncheckedHandleIcon={<TurnoFF style={{position:"absolute",width:"27px",height:"26px",top:"-3px",left:"-3px"}}/>}  
                        />
                      </div>
                    </div>
                    <div className="col-3 d-flex px-0 justify-content-center">
                      <div className="d-flex align-items-center ">
                        <p className="fontSizeReactSwitch mb-0">
                          Signature digitale envoyé ?
                        </p>
                        <Switch
                          className="ml-left"
                          onChange={(checked,e,id)=>SwitchChange(checked,e,id)}
                          checked={Signature}
                          id="signatureSent"
                                       checkedHandleIcon={<TurnOn style={{position:"absolute",width:"31px",height:"25px",top:"-3px",left:"-6px"}} />} height={22} width={48} uncheckedHandleIcon={<TurnoFF style={{position:"absolute",width:"27px",height:"26px",top:"-3px",left:"-3px"}}/>}  />

                      </div>
                    </div>
                    <div className="col-2 d-flex px-0 justify-content-end ml-1">
                      <div className="d-flex align-items-center ">
                        <p className="fontSizeReactSwitch mb-0">
                          Contrat singé ?
                        </p>
                        <Switch
                          className="ml-left"
                          onChange={(checked,e,id)=>SwitchChange(checked,e,id)}
                          checked={Contrat}
                          id="contractSigned"
                                       checkedHandleIcon={<TurnOn style={{position:"absolute",width:"31px",height:"25px",top:"-3px",left:"-6px"}} />} height={22} width={48} uncheckedHandleIcon={<TurnoFF style={{position:"absolute",width:"27px",height:"26px",top:"-3px",left:"-3px"}}/>}  />

                      </div>
                    </div>
                    <div className="col-3 d-flex px-0 justify-content-end">
                      <div className="d-flex align-items-center ">
                        <p className="fontSizeReactSwitch mb-0">
                          Publicité commencé ?
                        </p>
                        <Switch
                          className="ml-left"
                          onChange={(checked,e,id)=>SwitchChange(checked,e,id)}
                          checked={Public}
                          id="publicityStarted"
                                       checkedHandleIcon={<TurnOn style={{position:"absolute",width:"31px",height:"25px",top:"-3px",left:"-6px"}} />} height={22} width={48} uncheckedHandleIcon={<TurnoFF style={{position:"absolute",width:"27px",height:"26px",top:"-3px",left:"-3px"}}/>}  />

                      </div>
                    </div>
                    <div className="col-1 d-flex px-0 justify-content-center ml-1">
                      <div className="d-flex align-items-center ">
                        <p className="fontSizeReactSwitch mb-0" style={{width:"22px"}}>A1 ?</p>
                        <Switch
                          className="ml-left"
                          onChange={(checked,e,id)=>SwitchChange(checked,e,id)}
                          checked={A1}
                          id="A1selected"
                                       checkedHandleIcon={<TurnOn style={{position:"absolute",width:"31px",height:"25px",top:"-3px",left:"-6px"}} />} height={22} width={48} uncheckedHandleIcon={<TurnoFF style={{position:"absolute",width:"27px",height:"26px",top:"-3px",left:"-3px"}}/>}  />

                      </div>
                    </div>
                    <div className="col-3 d-flex pt-1 px-0 justify-content-start">
                      <div className="d-flex align-items-center ">
                        <p className="fontSizeReactSwitch mb-0">
                          Assurance faite ?
                        </p>
                        <Switch
                          className="ml-left"
                          onChange={(checked,e,id)=>SwitchChange(checked,e,id)}
                          checked={Assurance}
                          id="assuranceFaite"
                                       checkedHandleIcon={<TurnOn style={{position:"absolute",width:"31px",height:"25px",top:"-3px",left:"-6px"}} />} height={22} width={48} uncheckedHandleIcon={<TurnoFF style={{position:"absolute",width:"27px",height:"26px",top:"-3px",left:"-3px"}}/>}  />

                      </div>
                    </div>
                    <div className="col-3 d-flex pt-1 px-0 justify-content-start">
                      <div className="d-flex align-items-center ">
                        <p className="fontSizeReactSwitch mb-0">
                          Agence de voyage ok ?
                        </p>
                        <Switch
                          className="ml-left"
                          onChange={(checked,e,id)=>SwitchChange(checked,e,id)}
                          checked={Agence}
                          id="agenceDeVoyage"
                                       checkedHandleIcon={<TurnOn style={{position:"absolute",width:"31px",height:"25px",top:"-3px",left:"-6px"}} />} height={22} width={48} uncheckedHandleIcon={<TurnoFF style={{position:"absolute",width:"27px",height:"26px",top:"-3px",left:"-3px"}}/>}  />

                      </div>
                    </div>
                    <div className="col-3 d-flex pt-1 px-0 ">
                      <div className="d-flex align-items-start ">
                        <p className="fontSizeReactSwitch mb-0">
                          SISPI déclaré ?
                        </p>
                        <Switch
                          className="ml-left"
                          onChange={(checked,e,id)=>SwitchChange(checked,e,id)}
                          checked={SISPI}
                          id="sispiDeclared"
                                       checkedHandleIcon={<TurnOn style={{position:"absolute",width:"31px",height:"25px",top:"-3px",left:"-6px"}} />} height={22} width={48} uncheckedHandleIcon={<TurnoFF style={{position:"absolute",width:"27px",height:"26px",top:"-3px",left:"-3px"}}/>}  />

                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-12 py-4">
                  <div className="row">
                    <div className="col-8">
                      <button className="btn btn-CLIENTSB px-4" type="submit">
                        Ajouter ce CLIENT / Add this CLIENT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

