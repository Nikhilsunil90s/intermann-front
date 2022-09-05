import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import "../../CSS/preSelected.css";
import { API_BASE_URL } from "../../config/serverApiConfig";
import {toast, Toaster } from "react-hot-toast";
import Loader from "../../components/Loader/loader";
import Select, { GroupBase, StylesConfig } from "react-select";
import { colourOptions, ColourOption } from "../../Selecteddata/data";
import chroma from 'chroma-js';
import ProfileLoader from "../../components/Loader/ProfilesLoader"
import { Console } from "console";
import moment from 'moment'
import { useLocation,useNavigate } from "react-router-dom";
import ArchivedModal from "./../../components/Modal/ArchivedModal";
import InProgressModal from "../../components/Modal/InProgressModal";
import ReadMoreReact from 'read-more-react';

declare namespace JSX {
    interface IntrinsicElements {
      "lottie-player": any;
    }
  }
  declare global {
    namespace JSX {
      interface IntrinsicElements {
        lable: React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLElement>,
          HTMLElement
        >;
      }
    }
  }
  let emailArr=[]
  let SelectedName = []
  let FilterJob = [];
  let MotivationArr = []
  let LicencePermisArr = []
  let DateArr=[]
  let contactArr=[]
  let LanguageFilter=[]as any
function Preselected(){

    const {state}=useLocation()
 
          const [sectors, setSectors] = useState([]);
          const [jobs, setJobs] = useState([]);
          const [selectedJob, setSelectedJob] = useState([]);
          const [selectedSector, setSelectedSector] = useState("");
          const [sectorOptions, setSectorOptions] = useState([]);
          const [jobOptions, setJobOptions] = useState([]);
          const [selectedLanguages, setSelectedLanguages] = useState([]);
          const [loader, setLoader] = useState(false);
          const [filterData, setFilterData] = useState(state)as any;
          const [status, setStatus] = useState(Boolean);
          const [nameOptions, setNameOptions] = useState([])                        
          const [showMore, setShowMore] = useState(true)
          const [statusProfiles,setStatusProfile]=useState(false)
          const [email,setEmail]=useState([])
          const [LanguageOp,setLangOp]=useState([])
          const [licenceOptions, setLicenseOptions] = useState([])
        
          const [motivationOptions, setMotivationOptions] = useState([])
          const [ContactOptions,setContactOptions]=useState([])
          const [LicensePermis, setLicensePermis] = useState([]) as any
          const [selectByName, setSelectName] = useState([])
        

       useEffect(()=>{
        setFilterData(state)
       },[state])

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
        
          const EmailFilter=()=>{
            return fetch(`${API_BASE_URL}getCandidats/?candidatEmail=${emailArr}&candidatStatus=Pre-Selected`, {
         
               method: "GET",
               headers: {
                 Accept: "application/json",
                 "Content-Type": "application/json",
                 Authorization: "Bearer " + localStorage.getItem("token"),
               },
             })
               .then(reD => reD.json())
               .then(result => result)
               .catch((err) => err);
           }

          useEffect(() => {
            if (sectors.length == 0) {
              fetchAllSectors()
                .then((data) => {
                  // console.log(data.data);
                  setSectors([...data.data]);
                })
                .catch((err) => {
                  // console.log(err);
                });
            }
  
            let jobResults = jobs.map(ajob => {
              return { value: ajob.jobName, label: ajob.jobName, color: '#FF8B00' }
            })
            setJobOptions([...jobResults]);
            console.log(jobs);
          }, [jobs]);


          const DateFilter=()=>{
            fetch(`${API_BASE_URL}getCandidats/?candidatStartDate=${DateArr}&candidatStatus=Pre-Selected`, {
        
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
              .then((reD) => reD.json())
              .then((result) =>{
               if(result.total === 0){
            setLoader(true) 
            setStatus(false)
               }else{
             setFilterData([...result.data]) ; setLoader(true); setStatus(true)
             }   })
              .catch((err) => err);
          }

          const ContactFilter=()=>{
            return fetch(`${API_BASE_URL}getCandidatsByPhoneNumber/?phoneNumber=${contactArr}&candidatStatus=Pre-Selected`, {
         
               method: "GET",
               headers: {
                 Accept: "application/json",
                 "Content-Type": "application/json",
                 Authorization: "Bearer " + localStorage.getItem("token"),
               },
             })
               .then(reD => reD.json())
               .then(result => result)
               .catch((err) => err);
           }

          useEffect(() => {
            console.log(sectors);
            let sectorops = sectors.map((asector) => {
              return { value: asector.sectorName, label: asector.sectorName, color: '#FF8B00' }
            })
        
            setSectorOptions([...sectorops]);
          }, [sectors])
        
          useEffect(() => {
            filterFunction();
          }, [selectedLanguages, selectedJob, selectedSector, motivationOptions]);
        
          const fetchAllSectors = async () => {
            return await fetch(API_BASE_URL + "fetchAllSectors", {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
              .then((resp) => resp.json())
              .then((respData) => respData)
              .catch((err) => err);
          };
          // console.log(selectedJob, "selectedjob");
          const fetchAllJobs = async (sector: string) => {
            if (sector === "Select Un Secteur") {
              return {
                data: [],
              };
            }
            return await fetch(API_BASE_URL + `fetchAllJobs/?sector=${sector}`, {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
              .then((resD) => resD.json())
              .then((reD) => reD)
              .catch((err) => err);
          };
        
          const fetchProfiles = async () => {
            return await fetch(API_BASE_URL + "allPreSelectedCandidats", {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
              .then((resD) => resD.json())
              .then((reD) => reD)
              .catch((err) => err);
          };
        
        useEffect(()=>  {
         
            if (nameOptions.length == 0 && statusProfiles===true) {
              fetchProfiles().then((profilesResult) => {
                console.log(profilesResult.data,"profilesResult")
                if(profilesResult.data.length>0){ 
                let nameops = profilesResult.data.map((pro) => {
                  console.log(pro,"pro")
                  return { value: pro.candidatName, label: pro.candidatName, color: '#FF8B00' }
                })
                setNameOptions([{value:"Select Name",label:"Select Name",color:"#ff8b00"},...nameops])
            }})
              .catch(err => {
                console.log(err)
              })
            }
           else if(nameOptions.length == 0 && statusProfiles===false)
              {
                fetchProfiles().then((profilesResult) => {
                 if(profilesResult.status===false){
                  setStatusProfile(profilesResult.status)
                  setNameOptions([{ value: "", label: "No Name", color: "#ff8b00" }])
                 }
                 if(profilesResult.status===true){
                  setStatusProfile(profilesResult.status)
                 }
                }
           ) } 
                 
              }

        )
        useEffect(()=>{
          if(motivationOptions.length == 0){
           setMotivationOptions([{
              value: "Select Motivations", label: "Select Motivations", color: '#FF8B00'
            },   {
              value: "1", label: "😟", color: '#FF8B00'
            }, {
              value: "2", label: "🙁", color: '#FF8B00'
            }, {
              value: "3", label: "😊", color: '#FF8B00'
            }, {
              value: "4", label: "🥰", color: '#FF8B00'
            }, {
              value: "5", label: "😍", color: '#FF8B00'
            }])
          }
          if(LicensePermis.length == 0){
           setLicensePermis([
              {
                value: "Select Licence", label: "Select Licence", color: '#FF8B00'
              }, {
                value: "true", label: "Have Licence", color: '#FF8B00'
              },
              {
                value: "false", label: "No Licence", color: '#FF8B00'
              }
            ])
          }
          if(LanguageOp.length == 0){
            setLangOp([{ value: 'Roumain', label: 'Roumain', color:  '#FF8B00' },
            { value: 'Français', label: 'Français', color:  '#FF8B00', },
            { value: 'Anglais', label: 'Anglais', color: '#FF8B00' },
            { value: 'Italien', label: 'Italien', color: '#FF8B00'  },
            { value: 'Russe', label: 'Russe', color: '#FF8B00' },
            { value: 'Espagnol', label: 'Espagnol', color: '#FF8B00'},
            { value: 'Autre', label: 'Autre', color: '#FF8B00' },
            { value: 'Suisse', label: 'Suisse', color: '#FF8B00' },
          ])
            }
          if (email.length == 0) {
            let emailops=[]as any
            fetchProfiles().then((profileResult) => {
              console.log(profileResult,"profileResult")
              profileResult.data.filter((item) => {
                if(item.candidatEmail){
               emailops.push({ value: item.candidatEmail, label: item.candidatEmail, color: '#FF8B00' })
                }
            })
               setEmail([  {
                value: "Select email", label: "Select Email", color: '#FF8B00'
              },...emailops])
              console.log(emailops,"emailops")
            })
              console.log([...email],"email")
            }
            if (ContactOptions.length == 0) {
              let ContactOp =[]as any
              fetchProfiles().then((profileResult) => {
                profileResult.data.filter((item) => {
                  if(item.candidatPhone){
                    ContactOp.push({ value: item.candidatPhone, label: item.candidatPhone, color: '#FF8B00' })
                  }
              })
                 setContactOptions([  {
                  value: "Select Contact", label: "Select Contact", color: '#FF8B00'
                },...ContactOp])
                console.log(ContactOp,"ContactOp")
              })
                console.log([...email],"email")
              }
        })
          const fetchProfilesForAJob = async (jobName: string) => {
            return await fetch(API_BASE_URL + "fetchProfilesForAJob", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
              body: JSON.stringify({ jobName: jobName }),
            })
              .then((reD) => reD.json())
              .then((result) => result)
              .catch((err) => err);
          };
        
          const handleNameChange = (e: any) => {
            // console.log(e.target.value)
            SelectedName = []
            MotivationArr = []
            emailArr=[]
            contactArr=[]
            LanguageFilter=[]
            LicencePermisArr = []
            setSelectedSector("")
            setSelectedJob([])
            if (e.value === "Select Name") {
              SelectedName = []
              filterFunction();
            } else if (e.value !== ""  && e.value!=="Select Name") {
              SelectedName = []
              MotivationArr = []
              let NameField = e.value;
              SelectedName.push(NameField)
            }
          };
          const HandelLicence = (e) => {
            LicencePermisArr = []
            SelectedName = []
            emailArr=[]
            contactArr=[]
            LanguageFilter=[]
            setSelectedSector("")
            MotivationArr = []
            console.log(e.value)
            if(e.value=="Select Licence"){
              LicencePermisArr=[]
              filterFunction()
            }
            if(e.value !=="" && e.value !=="Select Licence"){
            LicencePermisArr.push(e.value)
            filterFunction()

                }  
              }
              const handleMotivationChange = (e: any) => {
              // console.log(e.target.value)
              MotivationArr = []
              emailArr=[]
              contactArr=[]
              LanguageFilter=[]
              LicencePermisArr = []
              setSelectedSector("")
              SelectedName = []
              if (e.value === "Select Motivations") {
                MotivationArr = []
                filterFunction()
          
              } else if (e.value !== "" && e.value !== "Select Motivations") {
                MotivationArr = []
                let sectorField = e.value;
          
                console.log(sectorField, "motivation")
                MotivationArr.push(sectorField)
                filterFunction()
                // setSelectedSector(sectorField);
              }
            };

            const LanguageChange = async (lang) => {
 
              setSelectedSector("")
              SelectedName=[]
              LicencePermisArr = []
                  // console.log(jobval)
                  let LangArr=[]
                  if(lang.value == "Select Language"){
                   LangArr=[]
                  filterFunction()
                  }
                  if(lang.vlaue !== "" && lang.value !== "Select Language"){
                  lang.map((el)=>{
                   
                     LangArr.push(el.value)
                
                  })
                  LanguageFilter=LangArr
                  filterFunction()
                }
                }
          
          const handleSectorChange = (e: any) => {
            // console.log(e.target.value)
            SelectedName = []
            MotivationArr = []
            emailArr=[]
            contactArr=[]
            LanguageFilter=[]
            LicencePermisArr = []
            FilterJob = [];
            setSelectedJob([])
            console.log(e)
            if (e.value === "Select Sector") {
              setJobs([]);
              setSelectedSector("");
              setJobOptions([]);
            filterFunction()
        
            }  else if (e.value !== '' && e.value !== "Select Sector") {
              let sectorField = e.value;
              setSelectedSector(sectorField);
              setJobOptions([]);
            }
        
            fetchAllJobs(e.value)
              .then((data) => {
                // console.log(data);
                setJobs([...data.data]);
              })
              .catch((err) => {
                // console.log(err);
              });
          };
        
          useEffect(() => {
            setSelectedJob(FilterJob)
           
          }, [selectedJob])
        
  
        
          const getSelectedLanguage = (e: any) => {
            if (e.target.checked) {
              addLanguages(e.target.value);
            } else {
              removeLanguages(e.target.value);
            }
          };
        
          const addLanguages = (lang: string) => {
            setSelectedLanguages((prev) => [...prev, lang]);
          };
        
          const removeLanguages = (lang: string) => {
            setSelectedLanguages(selectedLanguages.filter((l) => l !== lang));
            setSelectedLanguages([])
          };
        
          const filterFunction = async () => {
            setLoader(false);
        
//             if (SelectedName.length > 0 || MotivationArr.length > 0 || LicencePermisArr.length > 0 || emailArr.length > 0 || contactArr.length > 0 || DateArr.length > 0) {
//               if (emailArr.length > 0) {
//                 setFilterData([])
//                 SelectedName = []
//                 MotivationArr = []
//                 LicencePermisArr=[]
//                 setSelectedSector("")
//                 DateArr=[]
        
//                 EmailFilter().then((data)=>{
//                   if(data.total === 0){
//                     setLoader(true) 
//                     setStatus(false)
//                        }else{
//                      setFilterData([...data.data]) ; setLoader(true); setStatus(true)
//                      }  
//                 })
//                 .catch((err)=>err)
//               }
//               if (DateArr.length > 0) {
//                 setFilterData([])
//                 SelectedName = []
//                 MotivationArr = []
//                 LicencePermisArr=[]
//                 setSelectedSector("")
                
//                 DateFilter()
//               }
//               if (contactArr.length > 0) {
//                 setFilterData([])
//         SelectedName = []
//         MotivationArr = []
//         LicencePermisArr=[]
//         setSelectedSector("")
//         DateArr=[]
//         emailArr=[]
//         ContactFilter().then((data)=>{
//           if(data.data.length == 0){
//             setLoader(true) 
//             setStatus(false)
//                }else{
//              setFilterData([...data.data]) ; setLoader(true); setStatus(true)
//              }  
//         })
//         .catch((err)=>err)
//       }
    
            
//               if (SelectedName.length > 0) {
//                 LicencePermisArr = []
//                 fetch(`${API_BASE_URL}getCandidats/?candidatName=${SelectedName}&candidatStatus=Pre-Selected`, {
        
//                   method: "GET",
//                   headers: {
//                     Accept: "application/json",
//                     "Content-Type": "application/json",
//                     Authorization: "Bearer " + localStorage.getItem("token"),
//                   },
//                 })
//                   .then((reD) => reD.json())
//                   .then((result) => {
//                     if(  result.total == 0){
//                       setLoader(true) 
//                       setStatus(false)
//                      } if(result.total != 0){
//                        setLoader(true)
//                        setStatus(true)
//                        setFilterData([...result.data]);
//                      }
//                     // setStatus(result.status);
//                   })
//                   .catch((err) => err);
//                 setLoader(true);
//               }
//               if (MotivationArr.length > 0) {
//                 setFilterData([])
//                 SelectedName = []
//                 fetch(`${API_BASE_URL}getCandidats/?candidatMotivation=${MotivationArr}&candidatStatus=Pre-Selected`, {
        
//                   method: "GET",
//                   headers: {
//                     Accept: "application/json",
//                     "Content-Type": "application/json",
//                     Authorization: "Bearer " + localStorage.getItem("token"),
//                   },
//                 })
//                   .then((reD) => reD.json())
//                   .then((result) => {
//                       if(  result.total == 0){
//                      setLoader(true) 
//                      setStatus(false)
//                     } if(result.total != 0){
//                       setLoader(true)
//                       setStatus(true)
//                       setFilterData([...result.data]);

//                     }
//                     // setStatus(result.status);
//                   })
//                   .catch((err) => err);
//                 setLoader(true);
//               }
//               if (LicencePermisArr.length > 0) {
//                 setFilterData([])
//                 SelectedName = []
//                 MotivationArr = []
//                 fetch(`${API_BASE_URL}getCandidats/?candidatLicensePermis=${LicencePermisArr}&candidatStatus=Pre-Selected`, {
        
//                   method: "GET",
//                   headers: {
//                     Accept: "application/json",
//                     "Content-Type": "application/json",
//                     Authorization: "Bearer " + localStorage.getItem("token"),
//                   },
//                 })
//                   .then((reD) => reD.json())
//                   .then((result) => {
//                     if(  result.total == 0){
//                       setLoader(true) 
//                       setStatus(false)
//                      } if(result.total != 0){
//                        setLoader(true)
//                        setStatus(true)
//                        setFilterData([...result.data]);
//                      }
//                     // setStatus(result.status);
//                   })
//                   .catch((err) => err);
//                 setLoader(true);
//               }
//             }
//             if (
//               selectedSector.length > 0 &&
//               selectedJob.length == 0 &&
//               selectedLanguages.length == 0
//             ) {
//               fetch(
//                 `${API_BASE_URL}getCandidats/?candidatActivitySector=${selectedSector}&candidatStatus=Pre-Selected`,
//                 {
//                   method: "GET",
//                   headers: {
//                     Accept: "application/json",
//                     "Content-Type": "application/json",
//                     Authorization: "Bearer " + localStorage.getItem("token"),
//                   },
//                 }
//               )
//                 .then((reD) => reD.json())
//                 .then((result) => {
//                   if(  result.total == 0){
//                     setLoader(true) 
//                     setStatus(false)
//                    } if(result.total != 0){
//                      setLoader(true)
//                      setStatus(true)
//                      setFilterData([...result.data]);
//                    }
//                 })
//                 .catch((err) => err);
//               setLoader(true);
//             }
        
//             if (
//               selectedSector.length > 0 &&
//               FilterJob.length > 0 &&
//               selectedLanguages.length == 0
//             ) {
//               await fetch(
//                 `${API_BASE_URL}getCandidats/?candidatActivitySector=${selectedSector}&jobs=${FilterJob}&candidatStatus=Pre-Selected`,
//                 {
//                   method: "GET",
//                   headers: {
//                     Accept: "application/json",
//                     "Content-Type": "application/json",
//                     Authorization: "Bearer " + localStorage.getItem("token"),
//                   },
//                 }
//               )
//                 .then((reD) => reD.json())
//                 .then((result) => {
//                   if(  result.total == 0){
//                     setLoader(true) 
//                     setStatus(false)
//                    } if(result.total != 0){
//                      setLoader(true)
//                      setStatus(true)
//                      setFilterData([...result.data]);
//                    }
//                 })
//                 .catch((err) => err);
//               setLoader(true);
        
        
        
//             }
        
        
//             if (
//               selectedSector.length > 0 &&
//               selectedLanguages.length > 0 &&
//               selectedJob.length == 0
//             ) {
//               await fetch(
//                 `${API_BASE_URL}getCandidats/?sector=${selectedSector}&languages=${selectedLanguages}&candidatStatus=Pre-Selected`,
//                 {
//                   method: "GET",
//                   headers: {
//                     Accept: "application/json",
//                     "Content-Type": "application/json",
//                     Authorization: "Bearer " + localStorage.getItem("token"),
//                   },
//                 }
//               )
//                 .then((reD) => reD.json())
//                 .then((result) => {
//                   if(  result.total == 0){
//                     setLoader(true) 
//                     setStatus(false)
//                    } if(result.total != 0){
//                      setLoader(true)
//                      setStatus(true)
//                      setFilterData([...result.data]);
//                    }
//                 })
//                 .catch((err) => err);
//               setLoader(true);
//             }
//             if (
//               selectedSector.length == 0 &&
//               selectedJob.length == 0 &&
//               LanguageFilter.length > 0
//             ) {
//               await fetch(
//                 `${API_BASE_URL}filterPreSelectedCandidatByLanguages/?languages=${LanguageFilter}`,
//                 {
//                   method: "GET",
//                   headers: {
//                     Accept: "application/json",
//                     "Content-Type": "application/json",
//                     Authorization: "Bearer " + localStorage.getItem("token"),
//                   },
//                 }
//               )
//                 .then((reD) => reD.json())
//                 .then((result) => {
//                   if(result.length > 0){
//                     setLoader(true)
//                     setStatus(true)
//                 setFilterData([...result.data]);
//              }
//             if(result.status == false){
//               setLoader(true)
//               setStatus(false)
//             }
//             })
//                 .catch((err) => err);
//             }
//             if (selectedSector.length === 0 && selectedJob.length === 0 && LanguageFilter.length === 0 && SelectedName.length === 0 && MotivationArr.length === 0 && LicencePermisArr.length === 0 && emailArr.length === 0 && contactArr.length === 0 && DateArr.length === 0) {
              

//                 fetchProfiles().then(filteredresponse => {
//                   if(filteredresponse.data.length > 0){
                   
//                   console.log(filteredresponse.status,"fisponse.statu")
// setStatusProfile(filteredresponse.status)
// console.log(statusProfiles,"filteredresponse.status")

//                   setFilterData([...filteredresponse.data])
//                   setLoader(true)
//                 setStatus(true)
//                   }
//                 if(filteredresponse.status==false){
//               return   setLoader(true),setStatus(false)

                
//                   }

//                 }
//                 )
//                   .catch(err => {
//                     console.log(err);
//                   })
              
//             }
          };
        
          const jobChange = async (jobval) => {
          jobval.map((el)=>{
            filterData.push(el.value)
          })
          filterFunction()

          }
          const onDateChange=(e:any)=>{
            DateArr=[]
            emailArr=[]
            SelectedName=[]
            setSelectedSector("")
            MotivationArr=[]
            LicencePermisArr=[]
            emailArr=[]
            contactArr=[]
            LanguageFilter=[]
            let SelectedDate=[]
            console.log(e.target.value)
            SelectedDate=e.target.value
            DateArr.push(SelectedDate)
            filterFunction()
         }
         
         const handleEmailChange=(e:any)=>{
          SelectedName = []
          MotivationArr = []
          LanguageFilter=[]
          LicencePermisArr = []
          FilterJob = [];
          setSelectedJob([])
          setSelectedSector("")
          emailArr=[]
          DateArr=[]
          contactArr=[]
          if (e.value === "Select email") {
          emailArr=[]
          filterFunction()
      
          } else if (e.value !== '' && e.value !== "Select email") {
                emailArr = e.value;
          }
        }

        const handleContactChange=(e:any)=>{
          SelectedName = []
          LanguageFilter=[]
          MotivationArr = []
          LicencePermisArr = []
          FilterJob = [];
          setSelectedJob([])
          setSelectedSector("")
          emailArr=[]
          contactArr=[]
          if (e.value === "Select Contact") {
            contactArr=[]
       
      
          } else if (e.value !== '' && e.value !== "Select Contact") {
            console.log(e.value,"contact")
                contactArr = e.value;
                filterFunction()
          }
        }

 const RestFilters=()=>{
  setSectors([])
  setNameOptions([])
  SelectedName=[]
  setSelectedSector("")
  setSectorOptions([])
  setJobs([])
  setSelectedJob([])
  setJobOptions([])
  setMotivationOptions([])
  MotivationArr=[]
  contactArr=[]
   DateArr=[]
   setLicensePermis([])
   setLangOp([])
   LanguageFilter=[]
   setContactOptions([])
   emailArr=[]
   setEmail([])
   LicencePermisArr=[]
   setLicenseOptions([])
   setEmail([])
   setContactOptions([])
   toast.success("Filters Reset Successfully!")
  fetchAllSectors()
  setTimeout(()=>{
    filterFunction()
  },1000)

}



const navigate = useNavigate();
    let StateNavigate = {profileData:filterData, path: '/preSelected'}
    const [showInProgressModal, setShowInProgressModal] = useState(false);
    const [showArchiveModal, setShowArchiveModal] = useState(false)
 

    const candidatMotivationIcons = [{ icon: "😟", motivation: 'Disappointed' }, { icon: "🙁", motivation: 'Not Really' }, { icon: "😊", motivation: 'Like' }, { icon: "🥰", motivation: 'Great' }, { icon: "😍", motivation: 'Super Lovely' }];
    const CardOptions=[{
        value:"editProfile",label:"Edit Profile"
        },
        {value:"Move to In Progress",label:"Move to In Progress"
        },
        {value:"Archive",label:"Archive"
        }
     ]
   
    const editCandidatProfile = () => {
        navigate("/editPreSelected", { state: StateNavigate });
    }

    const viewFullProfile = () => {
        // navigate("/preSelectedView", { state:filterData });
               localStorage.setItem('profile', JSON.stringify(filterData));
               window.open("/preSelectedView", "_blank")
    }


    const MoreOption=(e)=>{
      if(e.value==="editProfile"){
          editCandidatProfile()
      }
      if(e.value==="Move to In Progress"){
        setShowInProgressModal(true)
      }
      if(e.value==="Archive"){
        setShowArchiveModal(true) 
      }
    }


    const datenow=moment().format('YYYY-MM-DD')
    
    let date = new Date(datenow);

   let start = new Date(filterData.candidatStartDate);
   let end = new Date(filterData.candidatEndDate);

 return(
    <>
    <Toaster containerStyle={{zIndex:"999999999999999999999999"}} position="top-right" />
      <div className="container-fluid">
        <div className="row pd ">
           
             <div className="col-12 card-pre-tops px-1 mt-2" style={{padding:"0px",marginBottom:"20px"}}>
          <div className="row text-start">
          <div className="card" style={{padding:"15px 15px",borderRadius:"15px",marginBottom:"0px"}}>
              <div className="">
              {/* <img
              src={require("../../images/Stats.svg").default}
              style={{ width: "70%" ,marginBottom:"10px"}}
            /> */}
               <div className="d-flex topHeading">  <h2 className="">candidats / employes</h2> <span className="topBluetext"> Preselected</span></div>
                <p className="h-child-text">
                  Vous devez toujours vous assurer d’avoir un maximum d’information sur cette liste et déplacer les candidats en archive si plus d’actualité 
            </p>
              </div>
            </div>
          </div>
          </div>
          <div className="col-12 bg-white p-2 rounded001 mb-3">
            <div className="row ">
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                <p className="FiltreName">Filtre by name</p>
                <div className="dropdown">
                  <div aria-labelledby="dropdownMenuButton1">
                    {
                      nameOptions.length > 0 ?
                        <Select
                          name="candidatName"
                          closeMenuOnSelect={true}
                          placeholder="‎ ‎ ‎ Select Un Candidat"
                          className="basic-multi-select preSelect"
                          classNamePrefix="select"
                          onChange={handleNameChange}
                          options={nameOptions}
                          styles={colourStyles}
                       /> :   <div className="">   <ProfileLoader  width={"64px"} height={"45px"} fontSize={"12px"} fontWeight={600} Title={""}/></div>
                                            }
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                <p className="FiltreName">Filtre Secteur d’activité</p>
                <div className="dropdown">
                  <div aria-labelledby="dropdownMenuButton1">
                    {sectorOptions.length > 0 ?
                      <Select
                        name="candidatActivitySector"
                        closeMenuOnSelect={true}
                        placeholder="‎ ‎ ‎ Select Un Secteur"
                        className="basic-multi-select preSelect"
                        classNamePrefix="select"
                        onChange={handleSectorChange}
                        options={sectorOptions}
                        styles={colourStyles}
                      /> : <p>Select Un Secteur!</p>
                    }
                    {/* <select
                      name="candidatActivitySector"
                      className="form-select"
                      onChange={handleSectorChange}
                      onClick={() => {
                        setSelectedJob([]);
                        filterFunction();
                      }}
                    >
                      <option value="Select Un Secteur" className="fadeClass001">Select Un Secteur</option> */}
                    {/* {sectors &&
                        sectors.map((sector) => (
                          <option value={sector.sectorName}>
                            <button className="dropdown-item">
                              {sector.sectorName}
                            </button>
                          </option>
                        ))} */}
                    {/* </select> */}
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 m-query">
                <p className="FiltreName">Filtre selection métier / job</p>
                <div>
                  {jobOptions.length > 0 ?
                    <Select
                      name="jobName"
                      closeMenuOnSelect={true}
                      isMulti
                      placeholder="‎ ‎ ‎ Select"
                      className="basic-multi-select preSelect"
                      classNamePrefix="select"
                      onChange={jobChange}
                      options={jobOptions}
                      styles={colourStyles}
                    /> : <p>Select A Sector!</p>
                  }
                </div>
              </div>
              {
                showMore ?
                  <>
                    <div className="col-12 pt-1">
                      <div className="row">
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 pt-1">
                          <p className="FiltreName">Filtre by Motivation</p>
                          <div className="dropdown">
                            <div aria-labelledby="dropdownMenuButton1">
                              {/* <select
                                name="candidatActivityMotivation"
                                className="form-select"
                                onChange={handleMotivationChange}
                              // onClick={() => {
                              //   // setSelectedJob([]);
                              //   filterFunction();
                              // }}
                              >
                                <option value="Select Un Secteur" className="fadeClass001">Select</option>
                                {motivation &&
                                  Motivation.map((Motivation) => (
                                    <option value={Motivation.value}>
                                      <button className="dropdown-item">
                                        {Motivation.label}
                                      </button>
                                    </option>
                                  ))}
                              </select> */}
                              <Select
                                name="candidatMotivation"
                                closeMenuOnSelect={true}
                                placeholder="‎ ‎ ‎ Select Motivation du Candidat"
                                className="basic-multi-select preSelect"
                                classNamePrefix="select"
                                onChange={handleMotivationChange}
                                options={motivationOptions}
                                styles={colourStyles}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 pt-1">
        <p className="FiltreName">Filter by date</p>
        <div className="dropdown">
          <div aria-labelledby="dropdownMenuButton1">
                          <input
                              type="date"
                              className="form-control"
                              name="candidatStartDate"
                                // value={data.candidatStartDate}
                                onChange={onDateChange}
                                
                              />
                            </div>
                          </div>
        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 pt-1">
                          <p className="FiltreName">Filter by driver licence</p>
                          <div className="dropdown">
                            <div aria-labelledby="dropdownMenuButton1">
                              {/* <select
                                name=""
                                className="form-select"
                                // onChange={handleSectorChange}
                                onChange={HandelLicence}
                              >
                                <option value="Select Un Secteur" className="fadeClass001" selected disabled hidden>Have licence</option>
                                <option value="true" onChange={HandelLicence}>Have Licence</option>
                                <option value="false" onChange={HandelLicence}>Doesn't Have Licence</option>
                              </select> */}
                            {LicensePermis.length != 0 ?

<Select
name="candidatLicencePermis"
closeMenuOnSelect={true}
placeholder="‎ ‎ ‎ Select Licence Permis"
className="basic-multi-select preSelect"
classNamePrefix="select"
onChange={HandelLicence}
options={LicensePermis}
styles={colourStyles}
/>
                           :
                           <div >   <ProfileLoader  width={"64px"} height={"45px"} fontSize={"12px"} fontWeight={600} Title={""}/></div>

                            }
                        
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-xxl-4 col-xl-4 col-lg-4 pt-2">
                          <p className="FiltreName">Filtre by email</p>
                          <div className="dropdown">
                            <div aria-labelledby="dropdownMenuButton1">
                            {email.length>0?
                              <Select
                                name="candiatEmail"
                                closeMenuOnSelect={true}
                                placeholder="‎ ‎ ‎ ‎ ‎  ‎ yourmail@mail.com"
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={handleEmailChange}
                                options={email}
                                styles={colourStyles}
                              />
  :
                        <div >   <ProfileLoader  width={"64px"} height={"45px"} fontSize={"12px"} fontWeight={600} Title={""}/></div>
                            }
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-xxl-4 col-xl-4 col-lg-4 pt-2">
                          <p className="FiltreName">Filtre by contact</p>
                          <div className="dropdown">
                            <div aria-labelledby="dropdownMenuButton1">
                              {/* <select
                                name=""
                                className="form-select"
                                // onChange={handleSectorChange}
                                onChange={HandelLicence}
                              >
                                <option value="Select Un Secteur" className="fadeClass001" selected disabled hidden>Have licence</option>
                                <option value="true" onChange={HandelLicence}>Have Licence</option>
                                <option value="false" onChange={HandelLicence}>Doesn't Have Licence</option>
                              </select> */}
                             {
ContactOptions.length>0 ?
<Select
name="candidatPhone"
closeMenuOnSelect={true}
placeholder="‎ ‎ ‎ ‎ ‎  ‎ Candidat's Phone Number"
className="basic-multi-select"
classNamePrefix="select"
onChange={handleContactChange}
options={ContactOptions}
styles={colourStyles}
/>
:
<div >   <ProfileLoader  width={"64px"} height={"45px"} fontSize={"12px"} fontWeight={600} Title={""}/></div>
                             }
                         
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-xxl-4 col-xl-4 col-lg-4 pt-2">
                          <p className="FiltreName">Filtre By Language</p>
                          <div className="dropdown">
                            <div aria-labelledby="dropdownMenuButton1">
                              {/* <select
                                name=""
                                className="form-select"
                                // onChange={handleSectorChange}
                                onChange={HandelLicence}
                              >
                                <option value="Select Un Secteur" className="fadeClass001" selected disabled hidden>Have licence</option>
                                <option value="true" onChange={HandelLicence}>Have Licence</option>
                                <option value="false" onChange={HandelLicence}>Doesn't Have Licence</option>
                              </select> */}
        {
                        LanguageOp.length > 0 ?
                        <Select
                        name="candidatLanguages"
                        closeMenuOnSelect={false}
                        isMulti
                        placeholder="‎ ‎ ‎Select Langues"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={LanguageChange}
                        options={LanguageOp}
                        styles={colourStyles}
                      /> 
                      : 
       <div className="">   <ProfileLoader  width={"64px"} height={"45px"} fontSize={"12px"} fontWeight={600} Title={""}/></div>

                      }
                      
                         
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="extraPadding">
                      <div className="col-12">
                        <div className="row justify-content-end">
                        <div className="col-2 d-flex align-items-center justify-content-end">
                        {selectedSector.length > 0 || selectedJob.length > 0 || LanguageFilter.length > 0 || SelectedName.length > 0 || MotivationArr.length > 0 || LicencePermisArr.length > 0 || DateArr.length > 0  || emailArr.length >0 || contactArr.length > 0 || LanguageFilter.length > 0?

                          <p className="filterStyling  cursor-pointer mt-2" onClick={() => RestFilters()}>Reset Filters</p>
                          : null
                        }
                        </div>
                          <div className="col-2 d-flex justify-content-end">
                            <p className="filterStyling pt-2 cursor-pointer" onClick={() => setShowMore(false)}>Less Filters <img src={require("../../images/downup.svg").default} /></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>

                  :
                  <div className="extraPadding">
                    <div className="col-12">
                      <div className="row justify-content-end">
                      <div className="col-2 d-flex align-items-center justify-content-end">
                        {selectedSector.length > 0 || selectedJob.length > 0 || selectedLanguages.length > 0 || SelectedName.length > 0 || MotivationArr.length > 0 || LicencePermisArr.length > 0 || DateArr.length > 0 || emailArr.length > 0 || contactArr.length > 0  || LanguageFilter.length > 0 ?

                          <p className="filterStyling  cursor-pointer mt-2" onClick={() => RestFilters()}>Reset Filters</p>
                          : null
                        }
                        </div>
                        <div className="col-2 d-flex justify-content-end">
                          <p className="filterStyling pt-2 cursor-pointer" onClick={() => setShowMore(true)}>More Filters <img src={require("../../images/down.svg").default} /></p>
                        </div>
                      </div>
                    </div></div>
              }
            </div>
          </div>
       
       
                   
                        <div className="col-md-6 col-xxl-4  col-xl-4 col-lg-4 pd-left">
                        <div className="card card-color mb-1">
                <div onClick={viewFullProfile} className="card-upper  cursor-pointer">
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 " style={{paddingLeft:"5px"}}>
                        <img
                            src={require("../../images/card-men.svg").default}
                            className="card-img-top"
                            alt="..."
                        />
                    </div>
                    <div className="col-xxl-9 col-xl-8 col-md-8 col-lg-8 fontStylinForPrecards">
                        <p style={{width:"100%"}}  className="text-dark" data-bs-toggle="tooltip" data-bs-placement="bottom" title={filterData.candidatName.toLocaleUpperCase()}><b>{filterData.candidatName.length > 20 ?filterData.candidatName.slice(0, 21).toLocaleUpperCase() + "..." :filterData.candidatName.toLocaleUpperCase()}</b></p>
                        <p className="text-dark"><b>{filterData.candidatAge ?filterData.candidatAge : "Age Not Available!"}</b></p>
                        <div >  <p className="text-dark d-flex"><b>{candidatMotivationIcons[filterData.candidatMotivation - 1].icon + " " + candidatMotivationIcons[filterData.candidatMotivation - 1].motivation}</b>
                        </p>
                        </div>
                       
                    </div>
                   
                </div>
                <div className="col-12 ">
                        <div className="row cardPreSelectedColorRow">

                      
                        <div className="col-6 pd-00X11">
                        <Link to='#'>
                            <button className="preStylingO11 p-0"><img src={require("../../images/preselectedCard.svg").default} />    PRE SELECTED</button>
                        </Link>
                        </div>
                        <div className="col-6 d-flex justify-content-end mb-0 pd-00P1 form-group">
                        {
                                   filterData.candidatLicensePermis ?
                                        <div className="d-flex  justify-content-center align-items-center">
                                            <input type="checkbox" name="candidatLicensePermis" id="css" checked={filterData.candidatLicensePermis} />
                                            <label htmlFor="css" className="Licence">Have Licence</label>
                                        </div> :
                                        <div className="d-flex  justify-content-center align-items-center">
                                            <input type="checkbox" name="candidatLicensePermis" id="css" checked={filterData.candidatLicensePermis} />
                                            <label htmlFor="css" className="NoLicence">No Licence</label>
                                        </div>
                                }
                        </div>
                    </div>
                    </div>
                <div className="card-todoBody py-1" style={{paddingLeft:"5px"}}>
               
                    <p className="preCard-Body  ">Secteur : {filterData.candidatActivitySector ? filterData.candidatActivitySector.toLocaleUpperCase() : "No Sector!"}</p>
                    <p className="preCard-Body">Job : {filterData.candidatJob ?filterData.candidatJob.toLocaleUpperCase() : "No Job!"}</p> 
                <p className="preCard-Body-p">Candidats Age : <b>{filterData.candidatAge}</b></p> 
                    <p className="preCard-Body-p">Langues :  <b>{filterData.candidatLanguages ?filterData.candidatLanguages.length > 3 ?filterData.candidatLanguages.slice(0,3).join(", ") + "..." :filterData.candidatLanguages.join(", "): "No Langues Selected!"}</b>
                     </p>
                    <p className="preCard-Body-p">Phone Number : <b>{filterData.candidatPhone} </b></p>
                    <p className="preCard-Body-p">Facebook URL : <b>{filterData.candidatFBURL ? <a href={filterData.candidatFBURL} target="_blank" className="fbURL">View Facebook Profile.</a> : "No Facebook Profile!"}</b></p>
                    <p className="preCard-Body-p">Email :  <b> {filterData.candidatEmail ?filterData.candidatEmail.length > 20 ?filterData.candidatEmail.slice(0, 22).toLocaleUpperCase() + "..." :filterData.candidatEmail.toLocaleUpperCase() : "No Email Provided!"}</b></p>
                    <p className="preCard-Body-blue " style={{ color: date >= start && date <= end  ? "#3F76E2" : "#ca1313"}}>
                        Ready for work :<b>{date >= start && date <= end  ?filterData.candidatStartDate  + "  To  " +filterData.candidatEndDate :   "⚠️" +filterData.candidatStartDate +"  To  " +filterData.candidatEndDate} </b>
                    </p>
                </div>
                <div className="col-12">
                 <div className="row preSelectedCommentBox">
                    <div className="col-12 preCard-Body ">Preselected for client : {filterData.candidatPreSelectedFor ?filterData.candidatPreSelectedFor.length > 2 ?filterData.candidatPreSelectedFor.map((el)=>{return el.clientId.clientCompanyName}).join(", "):filterData.candidatPreSelectedFor.map((el)=>(el.clientId.clientCompanyName)) : "No Client!"}</div>
                    <div className="col-12"><ReadMoreReact text={filterData.candidatPreSelectedFor[0] ?filterData.candidatPreSelectedFor[0].reasonForPreSelection : "No Reason Available!"}
            min={100}
            ideal={150}
            max={200}
            readMoreText={"....."}/></div>
                 </div>
                </div>
                <div className="my-1 px-1">
                  
                    <div className="col-12">
                        <div className="row">
                            <div className="col-6 px-0">
                            <Select
                    placeholder="More options"
                    options={CardOptions}
                    className="CardOptions"
                    onChange={MoreOption}
                    isSearchable={false}

                    
                 />
                            </div>
                            <div className="col-6 px-0 text-end">
                            <button className="btn btn-SeePreCard" onClick={viewFullProfile}>
                            See Full Profile
                        </button>
                        </div>
                        {showInProgressModal ?
                            <InProgressModal props={filterData} closeModal={setShowInProgressModal} /> : null
                        }
                        {showArchiveModal ?
                            <ArchivedModal props={filterData} closeModal={setShowArchiveModal} path={"/todolist"} /> : null
                        }
</div>
                    </div>

                </div>
            </div>
                        </div>
                     
        </div>
      </div>
    </>
 )
}
export default Preselected;