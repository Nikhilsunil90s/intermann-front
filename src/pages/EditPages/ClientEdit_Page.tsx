import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../CSS/Client/Client_toDoEdit.css";
import { useLocation } from "react-router-dom";
import { API_BASE_URL } from "../../config/serverApiConfig";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import Select, { GroupBase, StylesConfig } from "react-select";
import chroma from 'chroma-js';
import { ColourOption ,colourOptions} from "../../Selecteddata/data";
import RatingCmp from "../../components/AddClientRating/Rating";
import Switch  from "react-switch";
import $ from "jquery";
import UploadDow from '../../components/Modal/SelectUploadDownload'
import {ReactComponent as TurnoFF} from "../../images/FatX.svg";
import {ReactComponent as TurnOn} from "../../images/base-switch_icon.svg";
import ErrorLoader from "../../components/Loader/SearchBarError";

let Amountarr = "";
let Hours = "";
const ClientDataFormat = {
    clientCompanyName: "",
    clientEmail: "",
    clientPhone: "",
    clientAddress: "",
    clientActivitySector: "",
    clientJob: "",
    clientLanguages: [],
    salary_hours:[],
    rate_hours :[],
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
    numero_contract :"",
    initial_client_company : "",
    siret :"",
    numero_tva : "",
    nom_gerant :  "",
    telephone_gerant  : "",
    metier_en_roumain : "",
    metier_en_francais : "",
    debut_date : "",
    date_fin_mission : "",
    prix_per_heure : "",
    salaire_euro :  "",
    nombre_heure :  "",
    worker_number_1 : "",
    worker_name_1 : "",
    worker_number_2 : "",
    worker_name_2 :"",
    worker_number_3 : "",
    worker_name_3 :  "",
    worker_number_4 : "",
    worker_name_4 :  "",
    worker_number_5 : "",
    worker_name_5 :"",
    worker_number_6 : "",
    worker_name_6 : "",
    worker_number_7 : "",
    worker_name_7 :  "",
    worker_number_8 : "",
    worker_name_8 :  "",
    contractId:"",
    poste_du_gerant:"",
}

const SalaryTotal = []as any
const SalaryTotalcheck = []as any
const TauxH=[]
let arr = []as any
let Tauxarr=[]as any

interface State {
  state: any,
  path: any
}

function ClientTodoEdit() {

    const notifyClientEditSuccess = () => toast.success("Client Updated Successfully! View Client in To-Do Clients/Leads List.");

    const notifyClientEditError = () => toast.error("Cannot Edit This Candidat, Since No Data Changed!");

    const locationObject = useLocation();
    console.log(locationObject.state);
    const { state, path } = locationObject.state as State;
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
  const [UploadBtn,setSelectUpload]= useState(false)
  const [salary,setSalary_hours] =useState({
    hours:"",
    salaryPerHour:""
  })as any
  const [rateHours,setrate_hours] =useState({
    hours:"",
    ratePerHour:""
  })as any
  const [taxHours,setHours]=useState("")
  const [taxHoursID,setHoursId]=useState("")
  const [disableSalary , setDisableSalary]=useState(false)
  const [checkBooleanValue , setcheckBooleanValue]=useState(Boolean)as any
  const [Permis,setPermis]=useState(profile.clientPermis)as any

  useEffect(()=>{
    // setData({...data,rate_hours:Tauxarr})
    // setData({...data,salary_hours:ClientDataFormat.salary_hours})
    ClientDataFormat.salary_hours=arr
    ClientDataFormat.rate_hours=Tauxarr
  
  },[Tauxarr,SalaryTotal]) 

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

  const RemoveHandling=(e,showHour)=>{
    let SalaryFData =[]
    let TauxHour=[]
    if(e.target.id=="salary"){
   
      SalaryFData= ClientDataFormat.salary_hours.filter(el=>{
      return   el.hours !== showHour ;
     })
     if(SalaryFData.length !=0){
       arr=[]
       ClientDataFormat.salary_hours=[]
       SalaryFData.filter(el=>{
         setcheckBooleanValue(el.hours.includes(showHour))
           console.log(checkBooleanValue)
         
         })
           if(checkBooleanValue === false){
           
           arr.push(...SalaryFData)
           ClientDataFormat.salary_hours.push(...arr)
           toast.success(`Removed ${showHour}H Salary!`)
           return true
   
         }
         return false
     }
    
     }
     if(e.target.name=="TauxHours"){
    
       TauxHour= ClientDataFormat.rate_hours.filter(el=>{
         return   el.hours !== taxHours ;
        })
        if(TauxHour.length !=0){
          
          ClientDataFormat.rate_hours=[]
          TauxHour.filter(el=>{
            setcheckBooleanValue(el.hours.includes(taxHours))
              console.log(checkBooleanValue)
            })
              if(checkBooleanValue === false){
              
             
              ClientDataFormat.rate_hours.push(...TauxHour)
              toast.success(`Removed ${taxHours}H Taux!`)
              console.log(ClientDataFormat,"clientdata")
              return true
      
            }
            return false
        }
       
     }
     
     } 


     
const onSubmitRates=(e)=>{
 setFormTouched(true)
  if(e.target.name==="salaryH"){

      if(salary.hours !== "" && salary.salary_hours !== ""){
      SalaryTotal.push(salary)
      const FilterSalary=  SalaryTotal.filter(el=>{
        const duplicate = arr.includes(el) ;
        if(duplicate == false){
        console.log(duplicate,"duplic")
          arr.push(el)
         ClientDataFormat.salary_hours=arr
       
          toast.success("Salary Saved!")
          return true
        }
     
       return false
      }
      )}


   
  }
    
  
  if(e.target.name==="tauxH"){
    if(rateHours.hours !== "" && rateHours.rate_hours !== ""){
      TauxH.push(rateHours)
          const FilterTaux = TauxH.filter(el=>{
            const duplicate = Tauxarr.includes(el)
            if(!duplicate){
              Tauxarr.push(el)
              
              toast.success("Taux Horraire Saved!")
              return true
            }
            return false
          })
        
          
      

  }
}

}

const onInputChange=(val)=>{
  if(val.target.name==="salary_hours"){
    setSalary_hours({...salary,salaryPerHour:val.target.value})
  }
  if(val.target.name==="turnover"){
    setrate_hours({...rateHours,ratePerHour:val.target.value})
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
         setHours("35");
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
              resData.data.map((el)=>{
                setImgSource(el.clientPhoto.documentName)

              })
            }
        })
            .catch(err => {
                console.log(err)
            })
    }, [state])
    useEffect(() => {
        console.log(activitySectors);
        let sectorops = activitySectors.map((asector) => {
          return { value: asector.sectorName, label: asector.sectorName, color: '#FF8B00' }
        })
    
        setSectorOptions([...sectorops]);
      }, [activitySectors])

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
        setRatings(value)
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
    const changeJobSelection = (value) => {
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
    const handleSectorChange = (e: any) => {
        console.log(e.value)
    
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

        setData((prev) => ({ ...prev, [e.target.name] : e.target.value }));
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
    

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data)
        if (formTouched) {
            const updatedData = {
              salary_hours:data.salary_hours.length > 0 ? data.salary_hours :profile.salary_hours,
              rate_hours :data.rate_hours.length > 0 ? data.rate_hours : profile.rate_hours,
              clientPermis: data.clientPermis == true ? true : profile.clientPermis,
                clientId: profile._id,
                clientName: data.clientCompanyName !== "" ? data.clientCompanyName : profile.clientCompanyName,
                numberOfPosts: data.numberOfPosts !== "" ? data.numberOfPosts : profile.numberOfPosts,
                clientMotivation: data.clientMotivation !== 0 ? data.clientMotivation : profile.clientMotivation,
                clientImportance: data.clientImportance !== 0 ? data.clientImportance : profile.clientImportance,
                clientActivitySector: selectedSector !== "" ? selectedSector : profile.clientActivitySector,
                clientJob: data.clientJob !== "" ? data.clientJob : profile.clientJob,
                clientLanguages: data.clientLanguages.length > 0? data.clientLanguages : profile.clientLanguages,
                jobStartDate: data.jobStartDate !== "" ? data.jobStartDate : profile.jobStartDate,
                jobEndDate: data.jobEndDate !== "" ? data.jobEndDate : profile.jobEndDate,
                clientRequiredSkills: data.clientRequiredSkills !== "" ? data.clientRequiredSkills : profile.clientRequiredSkills,
                clientEmail: data.clientEmail !== "" ? data.clientEmail : profile.clientEmail,
                clientPhone: data.clientPhone !== "" ? data.clientPhone : profile.clientPhone,
                jobTotalBudget: data.jobTotalBudget !== 0 ? data.jobTotalBudget : profile.jobTotalBudget,
                netSalary: data.netSalary !== 0 ? data.netSalary : profile.netSalary,
                clientAddress: data.clientAddress !== "" ? data.clientAddress : profile.clientAddress,
                clientReferenceName: data.clientReferenceName !== "" ? data.clientReferenceName : profile.clientReferenceName,
                clientReferenceNumber: data.clientReferenceNumber !== "" ? data.clientReferenceNumber : profile.clientReferenceNumber,
                clientReferenceEmail: data.clientReferenceEmail !== "" ? data.clientReferenceEmail : profile.clientReferenceEmail,
                numero_contract : data.numero_contract !== "" ? data.numero_contract : profile.clientContract ? profile.clientContract.numero_contract !== "" ? profile.clientContract.numero_contract :"" :"",
                initial_client_company : data.initial_client_company !== "" ? data.initial_client_company : profile.clientContract ? profile.clientContract.initial_client_company !== "" ? profile.clientContract.initial_client_company : "" : "",

                siret : data.siret !== "" ? data.siret : profile.clientContract ? profile.clientContract.siret !== "" ? profile.clientContract.siret : "" : "",
                numero_tva :  data.numero_tva !== "" ? data.numero_tva : profile.clientContract ? profile.clientContract.numero_tva !== "" ? profile.clientContract.numero_tva : "" : "",
                nom_gerant :   data.nom_gerant !== "" ? data.nom_gerant : profile.clientContract ? profile.clientContract.nom_gerant !== "" ? profile.clientContract.nom_gerant : "" : "",
                telephone_gerant  :  data.telephone_gerant !== "" ? data.telephone_gerant : profile.clientContract ? profile.clientContract.telephone_gerant !== "" ? profile.clientContract.telephone_gerant : "" : "",
                metier_en_roumain :  data.metier_en_roumain !== "" ? data.metier_en_roumain : profile.clientContract ? profile.clientContract.metier_en_roumain !== "" ? profile.clientContract.metier_en_roumain : "" : "",
                metier_en_francais :  data.metier_en_francais !== "" ? data.metier_en_francais : profile.clientContract ? profile.clientContract.metier_en_francais !== "" ? profile.clientContract.metier_en_francais : "" : "",
                debut_date :  data.debut_date !== "" ? data.debut_date : profile.clientContract ? profile.clientContract.debut_date !== "" ? profile.clientContract.debut_date : "" : "",
                date_fin_mission :  data.date_fin_mission !== "" ? data.date_fin_mission : profile.clientContract ? profile.clientContract.date_fin_mission !== "" ? profile.clientContract.date_fin_mission : "" : "",
                prix_per_heure :  data.prix_per_heure !== "" ? data.prix_per_heure : profile.clientContract ? profile.clientContract.prix_per_heure !== "" ? profile.clientContract.prix_per_heure : "" : "",
                salaire_euro :   data.salaire_euro !== "" ? data.salaire_euro : profile.clientContract ? profile.clientContract.salaire_euro !== "" ? profile.clientContract.salaire_euro : "" : "",
                nombre_heure :   data.nombre_heure !== "" ? data.nombre_heure : profile.clientContract ? profile.clientContract.nombre_heure !== "" ? profile.clientContract.nombre_heure : "" : "",
                worker_number_1 :  data.worker_number_1 !== "" ? data.worker_number_1 : profile.clientContract ? profile.clientContract.worker_number_1 !== "" ? profile.clientContract.worker_number_1 : "" : "",
                worker_name_1 :  data.worker_name_1 !== "" ? data.worker_name_1 : profile.clientContract ? profile.clientContract.worker_name_1 !== "" ? profile.clientContract.worker_name_1 : "" : "",
                worker_number_2 :  data.worker_number_2 !== "" ? data.worker_number_2 : profile.clientContract ? profile.clientContract.worker_number_2 !== "" ? profile.clientContract.worker_number_2 : "" : "",
                worker_name_2 : data.worker_name_2 !== "" ? data.worker_name_2 : profile.clientContract ? profile.clientContract.worker_name_2 !== "" ? profile.clientContract.worker_name_2 : "" : "",
                worker_number_3 :  data.worker_number_3 !== "" ? data.worker_number_3 : profile.clientContract ? profile.clientContract.worker_number_3 !== "" ? profile.clientContract.worker_number_3 : "" : "",
                worker_name_3 :   data.worker_name_3 !== "" ? data.worker_name_3 : profile.clientContract ? profile.clientContract.worker_name_3 !== "" ? profile.clientContract.worker_name_3 : "" : "",
                worker_number_4 :  data.worker_number_4 !== "" ? data.worker_number_4 : profile.clientContract ? profile.clientContract.worker_number_4 !== "" ? profile.clientContract.worker_number_4 : "" : "",
                worker_name_4 :   data.worker_name_4 !== "" ? data.worker_name_4 : profile.clientContract ? profile.clientContract.worker_name_4 !== "" ? profile.clientContract.worker_name_4 : "" : "",
                worker_number_5 :  data.worker_number_5 !== "" ? data.worker_number_5 : profile.clientContract ? profile.clientContract.worker_number_5 !== "" ? profile.clientContract.worker_number_5 : "" : "",
                worker_name_5 : data.worker_name_5 !== "" ? data.worker_name_5 : profile.clientContract ? profile.clientContract.worker_name_5 !== "" ? profile.clientContract.worker_name_5 : "" : "",
                worker_number_6 :  data.worker_number_6 !== "" ? data.worker_number_6 : profile.clientContract ? profile.clientContract.worker_number_6 !== "" ? profile.clientContract.worker_number_6 : "" : "",
                worker_name_6 :  data.worker_name_6 !== "" ? data.worker_name_6 : profile.clientContract ? profile.clientContract.worker_name_6 !== "" ? profile.clientContract.worker_name_6 : "" : "",
                worker_number_7 :  data.worker_number_7 !== "" ? data.worker_number_7 : profile.clientContract ? profile.clientContract.worker_number_7 !== "" ? profile.clientContract.worker_number_7 : "" : "",
                worker_name_7 :   data.worker_name_7 !== "" ? data.worker_name_7 : profile.clientContract ? profile.clientContract.worker_name_7 !== "" ? profile.clientContract.worker_name_7 : "" : "",
                worker_number_8 :  data.worker_number_8 !== "" ? data.worker_number_8 : profile.clientContract ? profile.clientContract.worker_number_8 !== "" ? profile.clientContract.worker_number_8 : "" : "",
                worker_name_8 :   data.worker_name_8 !== "" ? data.worker_name_8 : profile.clientContract ? profile.clientContract.worker_name_8 !== "" ? profile.clientContract.worker_name_8 : "" : "",
                contractId: profile.clientContract ? profile.clientContract.contractId !== "" ? profile.clientContract.contractId : null : null,
                poste_du_gerant: data.poste_du_gerant !== "" ? data.poste_du_gerant : profile.clientContract ? profile.clientContract.poste_du_gerant !== "" ? profile.clientContract.poste_du_gerant : "" : "",
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
                        navigate(path);
                    }, 2000)
                }
                else{
                  toast.error("Client Change Failed!")
                }
            })
                .catch(err => {
                    console.log(err)
                })
        } else {
            notifyClientEditError()
        }


    }

    const handleImageChange = (val) => {
      if (val === 'upload') {
        console.log("upload")
        handleImageUpload()
      } else if (val === 'Download') {
        console.log("download")
        window.open(API_BASE_URL + "uploads/" + imgSource);
      }
    }
    const handleImageUpload = () => {
      hiddenImageInput.current.click();
    }


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
        let jobResults = jobs.map(ajob => {
            return { value: ajob.jobName, label: ajob.jobName, color: '#FF8B00' }
          })
          setJobOptions([...jobResults]);
          console.log(jobs);
    }, [jobs])

    const jobChange = async (jobval) => {
        // console.log(jobval)
        setFormTouched(true)
        let JobArr=[]as any
        jobval.map((el)=>{
         
         JobArr.push(el.value)
      
        })
        changeJobSelection(JobArr)
      }
      const handleChangeLanguage = (selectedOption) => {
        console.log(`Option selected:`, selectedOption)
        let arr = []
       setFormTouched(true)
        selectedOption.map((el) => {
          arr.push(el.value)
        })
        setLanguage(arr)
        console.log(Language, "language")
        setData({ ...data, clientLanguages: arr })
      }

      console.log(API_BASE_URL + "uploads/" + imgSource,"clie")
    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
                containerStyle={{zIndex:"99999999999999"}}
            />
            <div className="container-fluid">
                <div className="row">
                <form className="form px-0" onSubmit={onFormSubmit}>
                <div className="col-12 top-pd mt-1">
            {/* <h1 style={{ textDecoration: 'underline' }}>CLIENT FILE: {profile.clientCompanyName}</h1> */}
         <div className="row">
          <div className="col-6">
            <div className="stable">
              <Link to="/clientTodo">
                <button type="button" className="btn FontStyle-TODOSEE">
                  <img src={require("../../images/return.svg").default} />
               Client File : {profile.clientCompanyName}
                </button>
              </Link>
            </div>
          </div>
          <div className="col-4 d-flex align-items-center justify-content-end">
          <Link to={path} style={{ textDecoration: "none" }}><button className="btn bg-ClientCancel" type="button">
                                    <img
                                        style={{ width: "25%" }}
                                        src={require("../../images/multiply.svg").default}
                                    />
                                    <p className="mb-0">Cancel</p>
                                </button>
                                </Link>
          </div>
          <div className="col-2 d-flex align-items-center justify-content-center pr-1 pl-0">
          {/* <Link to={path} style={{ textDecoration: "none" }}> */}
                                <button className="btn btn-Clientsave" type="submit">
                                <img src={require("../../images/ClientSave.svg").default} style={{marginRight:"5px"}} />
                                Save Profile
                            </button>
                            {/* </Link> */}
          </div>
          </div>
          </div>
                    
                  
                        <div className="">
                            <div className="col-12 p-2 Social-CardClient mt-1">
                                <div className="row">
                                    <div className="col-2  text-center">
                       
                               {
                                imgSource ?
                                <img
                                src={API_BASE_URL + "uploads/" + imgSource}
                               className="img-uploadTodo-Download"
            
                              />  
                                :
                                <img
                                src={require("../../images/fullClientSee.svg").default}
                               className="img-uploadTodo-Download"
                              />           
                              } 
                            

<button
 onClick={()=>{setSelectUpload(!UploadBtn);}} type="button"
className="SelectBtn"
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
                                                <input name="numberOfPosts" onChange={onFormDataChange} placeholder="Num Only" className="form-control" defaultValue={profile.numberOfPosts} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-5 d-grid align-items-center">
                  <div className="text-end ml-5">
                    <button className="ClientEditStylebtn">
                      <img src={require("../../images/briefcase2.svg").default} />
                    </button>
               <div className="Lead-pas">
                  <p className="mb-0  pt-1">
                  Lead pas encore traité
                  </p>
                  <p className="TODOclientChild">Ce lead est en sommeil, pas traité</p>
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
       {jobOptions.length > 0 ?
                    <Select
                      name="jobName"
                      id="clientJob"
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
                                                onChange={onFormDataChange}
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
                                                        id="Permis"                                                        checkedHandleIcon={
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
                          onChange={handleChangeLanguage}
                          options={colourOptions}
                          styles={colourStyles}
                           defaultValue={
                        profile.clientLanguages?.map((profil,i)=>(
                       { value:profil ,label:profil ,color:"#FE8700"}
                      
                            
    ))}
                        />
                        </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 mt-1">
                                            <label className="LabelStylingEdits mb-1">Contact in Company Email</label>
                                            <input
                                                // placeholder="Company Email Of Contact"
                                                className="form-control"
                                                name="clientReferenceEmail"
                                                defaultValue={profile.clientReferenceEmail}
                                                placeholder={profile.clientReferenceEmail ? profile.clientReferenceEmail : "No Company email!" }
                                                onChange={onFormDataChange}
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
                                                 onChange={onFormDataChange}
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
                                                onChange={onFormDataChange}
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
                                                    onChange={onFormDataChange}
                                                ></textarea>
                                            </div>
                                            <div className="col-12  mt-1 ">
                       
                         {
                          profile.clientContract ?
                         
                       <div className='row p-1' >
                         <div className='col-4  d-grid '>
                             <label className="ClientPDFFormlabel">$ numero contrat</label>
                             <input className='form-control inputStyling'      onChange={onFormDataChange}  name='numero_contract'  placeholder={profile.clientContract ? profile.clientContract.numero_contract ? profile.clientContract.numero_contract :"Input Not Available!" :"Input Not Available!"} />
                         </div>
                         <div className='col-4  d-grid ' >
                         <label className="ClientPDFFormlabel">$ initial Société client</label>
                         <input className='form-control inputStyling'     onChange={onFormDataChange} name='initial_client_company'   placeholder={ profile.clientContract ? profile.clientContract.initial_client_company !== "" ? profile.clientContract.initial_client_company : "Input Not Available!" : "Input Not Available!"} />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ siret </label>
                         <input className='form-control inputStyling'     onChange={onFormDataChange} name='siret'  placeholder={ profile.clientContract ? profile.clientContract.siret !== "" ? profile.clientContract.siret : "Input Not Available!" : "Input Not Available!"}/>

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ numero TVA</label>
                         <input className='form-control inputStyling'      onChange={onFormDataChange} name='numero_tva' placeholder={ profile.clientContract ? profile.clientContract.numero_tva !== "" ? profile.clientContract.numero_tva : "Input Not Available!" : "Input Not Available!"} />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ nom gérant</label>
                         <input className='form-control inputStyling'       onChange={onFormDataChange} name='nom_gerant'  placeholder={profile.clientContract ? profile.clientContract.nom_gerant !== "" ? profile.clientContract.nom_gerant : "Input Not Available!" : "Input Not Available!"} />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ telephone gerant</label>
                         <input className='form-control inputStyling'       onChange={onFormDataChange} name='telephone_gerant'  placeholder={profile.clientContract ? profile.clientContract.telephone_gerant !== "" ? profile.clientContract.telephone_gerant : "Input Not Available!" : "Input Not Available!"} />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ metier en Roumain</label>
                         <input  className='inputStyling wHCompany form-control'     onChange={onFormDataChange} name='metier_en_roumain'  placeholder={profile.clientContract ? profile.clientContract.metier_en_roumain !== "" ? profile.clientContract.metier_en_roumain : "Input Not Available!" : "Input Not Available!"} />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ metier en Français</label>
                         <input className='form-control inputStyling'      onChange={onFormDataChange} name='metier_en_francais'  placeholder={profile.clientContract ? profile.clientContract.metier_en_francais !== "" ? profile.clientContract.metier_en_francais : "Input Not Available!" : "Input Not Available!"}/>

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ date du debut de mission</label>
                         <input className='form-control inputStyling'  type="date"    onChange={onFormDataChange} name='debut_date'  defaultValue={profile.clientContract ? profile.clientContract.debut_date !== "" ? profile.clientContract.debut_date : "Input Not Available!" : "Input Not Available!"} />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ date de fin de mission</label>
                         <input className='form-control inputStyling'      onChange={onFormDataChange} name='date_fin_mission' type="date"  defaultValue={profile.clientContract ? profile.clientContract.date_fin_mission !== "" ? profile.clientContract.date_fin_mission : "Input Not Available!" : "Input Not Available!"} />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ prix en euro / heure selon contract</label>
                         <input className='form-control inputStyling'      onChange={onFormDataChange} name='prix_per_heure'  placeholder={profile.clientContract ? profile.clientContract.prix_per_heure !== "" ? profile.clientContract.prix_per_heure : "Input Not Available!" : "Input Not Available!"} />

                         </div>


                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ SALAIRE EN EURO</label>
                         <input className='form-control inputStyling'     onChange={onFormDataChange} name='salaire_euro'  placeholder={profile.clientContract ? profile.clientContract.salaire_euro !== "" ? profile.clientContract.salaire_euro : "Input Not Available!" : "Input Not Available!"} />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ nombre d'heure négocie dans le contrat</label>
                         <input className='form-control inputStyling'      onChange={onFormDataChange} name='nombre_heure'  placeholder={profile.clientContract ? profile.clientContract.nombre_heure !== "" ? profile.clientContract.nombre_heure : "Input Not Available!" : "Input Not Available!"} />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ numero de tel du travailleur 1</label>
                         <input className='form-control inputStyling'       onChange={onFormDataChange} name='worker_number_1'  placeholder={profile.clientContract ? profile.clientContract.worker_number_1 !== "" ? profile.clientContract.worker_number_1 : "Input Not Available!" : "Input Not Available!"} />

                         </div> 
                         <div className='col-4  d-grid '>
                            <label className="ClientPDFFormlabel">$ Nom Du Travailleur 1</label>
                            <input className='form-control inputStyling'       onChange={onFormDataChange} name='worker_name_1' placeholder={profile.clientContract ? profile.clientContract.worker_name_1 !== "" ? profile.clientContract.worker_name_1 : "Input Not Available!" : "Input Not Available!"} />

                            </div>
                         
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ nom du travailleur 2 </label>
                         <input className='form-control inputStyling'     onChange={onFormDataChange} name='worker_number_2'  placeholder={ profile.clientContract ? profile.clientContract.worker_number_2 !== "" ? profile.clientContract.worker_number_2 : "Input Not Available!" : "Input Not Available!"} />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ numero de tel du travailleur 2</label>
                         <input className='form-control inputStyling'      onChange={onFormDataChange} name='worker_name_2'   placeholder={profile.clientContract ? profile.clientContract.worker_name_2 !== "" ? profile.clientContract.worker_name_2 : "Input Not Available!" : "Input Not Available!"} />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ nom du travailleur3</label>
                         <input className='form-control inputStyling'       onChange={onFormDataChange} name='worker_number_3'  placeholder={ profile.clientContract ? profile.clientContract.worker_number_3 !== "" ? profile.clientContract.worker_number_3 : "Input Not Available!" : "Input Not Available!"} />

                         </div> <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ numero de tel du travailleur 3</label>
                         <input className='form-control inputStyling'      onChange={onFormDataChange} name='worker_name_3'  placeholder={profile.clientContract ? profile.clientContract.worker_name_3 !== "" ? profile.clientContract.worker_name_3 : "Input Not Available!" : "Input Not Available!"} />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ nom du travailleur 4</label>
                         <input className='form-control inputStyling'      onChange={onFormDataChange} name='worker_number_4'  placeholder={profile.clientContract ? profile.clientContract.worker_number_4 !== "" ? profile.clientContract.worker_number_4 : "Input Not Available!" : "Input Not Available!"} />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ numero de tel du travailleur 4</label>
                         <input className='form-control inputStyling'      onChange={onFormDataChange} name='worker_name_4'  placeholder={profile.clientContract ? profile.clientContract.worker_name_4 !== "" ? profile.clientContract.worker_name_4 : "Input Not Available!" : "Input Not Available!"} />

                         </div> <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ nom du travailleur 5</label>
                         <input className='form-control inputStyling'      onChange={onFormDataChange} name='worker_number_5'  placeholder={profile.clientContract ? profile.clientContract.worker_number_5 !== "" ? profile.clientContract.worker_number_5 : "Input Not Available!" : "Input Not Available!"} />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ numero de tel du travailleur 5</label>
                         <input className='form-control inputStyling'      onChange={onFormDataChange} name='worker_name_5'  placeholder={profile.clientContract ? profile.clientContract.worker_name_5 !== "" ? profile.clientContract.worker_name_5 : "Input Not Available!" : "Input Not Available!"} />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ nom du travailleur 6</label>
                         <input className='form-control inputStyling'      onChange={onFormDataChange} name='worker_number_6'  placeholder={profile.clientContract ? profile.clientContract.worker_number_6 !== "" ? profile.clientContract.worker_number_6 : "Input Not Available!" : "Input Not Available!"} />

                         </div> <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ numero de tel du travailleur 6</label>
                         <input className='form-control inputStyling'      onChange={onFormDataChange} name='worker_name_6'  placeholder={profile.clientContract ? profile.clientContract.worker_name_6 !== "" ? profile.clientContract.worker_name_6 : "Input Not Available!" : "Input Not Available!"} />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ nom du travailleur 7</label>
                         <input className='form-control inputStyling'      onChange={onFormDataChange} name='worker_number_7'  placeholder={profile.clientContract ? profile.clientContract.worker_number_7 !== "" ? profile.clientContract.worker_number_7 : "Input Not Available!" : "Input Not Available!"} />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ numero de tel du travailleur 7</label>
                         <input className='form-control inputStyling'      onChange={onFormDataChange} name='worker_name_7'  placeholder={profile.clientContract ? profile.clientContract.worker_name_7 !== "" ? profile.clientContract.worker_name_7 : "Input Not Available!" : "Input Not Available!"} />

                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ nom du travailleur 8</label>
                         <input className='inputStyling form-control'      onChange={onFormDataChange} name='worker_number_8'  placeholder={profile.clientContract ? profile.clientContract.worker_number_8 !== "" ? profile.clientContract.worker_number_8 : "Input Not Available!" : "Input Not Available!"}  />
                         </div>
                         <div className='col-4  d-grid '>
                         <label className="ClientPDFFormlabel">$ numero de tel du travailleur 8</label>
                         <input className='inputStyling form-control'      onChange={onFormDataChange} name='worker_name_8'  placeholder={ profile.clientContract ? profile.clientContract.worker_name_8 !== "" ? profile.clientContract.worker_name_8 : "Input Not Available!" : "Input Not Available!"}  />
                         </div>
                         <div className="col-4  d-grid ">
                    <label className="ClientPDFFormlabel">
                      $ Poste du Gerant
                    </label>
                    <input
                      className="inputStyling form-control"
                      name="poste_du_gerant"
                      onChange={onFormDataChange}
                      placeholder={profile.clientContract ? profile.clientContract.poste_du_gerant !== "" ? profile.clientContract.poste_du_gerant : "Input Not Available!" : "Input Not Available!" }
                    />
                  </div>
             
                      </div>


:
<div className="col-12 d-flex justify-content-center align-items-center py-2">
<ErrorLoader  />
<p className="mb-0 ErrorSearchBox">
No Contract Available for this To-Do Client! Please add a New Contract.
</p>
</div>
}
                 
                 </div>
                 <div className="col-12 mt-1 ">
                  <div className="row">
                    <p className="padding-bottom Form-styling pb-1">
                      Select salaries Hours
                    </p>
                    <div className="mediaQuery d-flex " id="dam_return">
                
                      <div className="pr-1">
                        <button
                          type="button"
                       
                          id="1"
                          onClick={(e) => {
                            HandleChangeH(e);
                        
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
                            HandleChangeH(e);
                        
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
                            HandleChangeH(e);
                        
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
                            HandleChangeH(e);
                        
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
                            HandleChangeH(e);
                        
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
                            HandleChangeH(e);
                        
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
                            HandleChangeH(e);
                        
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
                            HandleChangeH(e);
                        
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
                        <input type="text" className='form-control placeHolder' disabled={disableSalary} 
                          defaultValue={profile.salary_hours ? profile.salary_hours.map((el)=>(el.salaryPerHour))[0] : "0"}
                        name='salary_hours' placeholder='Amount'   onChange={onInputChange} />
                        <span>.00</span>
                      </div>
                    </div>
                    <div className="col-3 mt-1 px-1 ">
                      <button type="button" className="btn saveSalary" name="salaryH" id="Hour" onClick={(e)=>{onSubmitRates(e);}}>
                        Save Salary {showHour}H
                      </button>
                    </div>
                    <div className="col-4 mt-1 px-1">
                      <button type="button" onClick={(e)=>RemoveHandling(e,showHour)} id="salary" className="btn RemoveSalary">
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
                    <div className="mediaQuery d-flex">
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
                          defaultValue={profile.rate_hours ? profile.rate_hours.map((el)=>(el.ratePerHour))[0] : "0"}
                          // disabled={disableTaux}
                        />
                        <span>.00</span>
                      </div>
                    </div>
                    <div className="col-3 mt-1 px-0">
                      <button type="button" className="btn SaveTAUX" name="tauxH" onClick={(e)=>{onSubmitRates(e)}}>
                        Save TAUX HORRAIRE {taxHours} H
                      </button>
                    </div>
                    <div className="col-4 mt-1 px-1">
                      <button type="button" className="btn RemoveSalary" name="TauxHours" onClick={(e)=>RemoveHandling(e,showHour)}>
                        REMOVE Salary {taxHours}H
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
export default ClientTodoEdit;
