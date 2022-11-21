import React from "react";
// import React, { useEffect, useState } from "react";

// import "../CSS/CanEmpl.css";
// import Select, { StylesConfig } from "react-select";
// import chroma from 'chroma-js';
// import { ColourOption } from "../../Selecteddata/data";
// import { API_BASE_URL } from "../../config/serverApiConfig";

// let SelectedName = []
// let FilterJob = [];
// let MotivationArr = []
// let LicencePermisArr = []
// let DateArr=[]
// let emailArr=[]
// let contactArr=[]
// let OthersFilterArr = []
// let LanguageFilter=[]
// const  FiltersCandidate=()=>{

//     const [Allprofiles,setAllProfiles]=useState([])

//     const [sectors, setSectors] = useState([]);
//     const [jobs, setJobs] = useState([]);
//     const [selectedJob, setSelectedJob] = useState([]);
//     const [selectedSector, setSelectedSector] = useState("");
//     const [sectorOptions, setSectorOptions] = useState([])as any;
//     const [jobOptions, setJobOptions] = useState([]);
//     const [selectedLanguages, setSelectedLanguages] = useState([]);
//     const [loader, setLoader] = useState(false);
//     const [filterData, setFilterData] = useState([])as any;
//     const [status, setStatus] = useState(Boolean);
//     const [nameOptions, setNameOptions] = useState([])as any                      
//     const [showMore, setShowMore] = useState(true)
//     const [email,setEmail]=useState([])
//     const [dateLoader,setdateLoader]=useState(false)
//     const [LoaderTime,setLoaderTime]=useState(false)
//     const [licenceOptions, setLicenseOptions] = useState([])
//     let [page, setPage] = useState(0);
//     const [motivationOptions, setMotivationOptions] = useState([])
//     const [ContactOptions,setContactOptions]=useState([])
//     const [LanguageOp,setLangOp]=useState([])
//     const [filterLoader ,setFetchingLoader  ]=useState(true)
//     const [cardTotallength,setTotalLength]=useState(0)
//     const [sectorName,setSectorName]=useState("")
//     const [JobName,setJobName]=useState([])as any
//     const fetchProfiles = async () => {
//         return await fetch(API_BASE_URL + "allToDoCandidats", {
//           method: "GET",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + localStorage.getItem("token"),
//           },
//         })
//           .then((resD) => resD.json())
//           .then((reD) => reD)
//           .catch((err) => err);
//       };


         

//     useEffect(() => {

  
//         if(dateLoader == false){
//           setTimeout(()=>{
//           setdateLoader(true)
//           },1000)
//         }
//         if(licenceOptions.length == 0){
//           setTimeout(()=>{
//           setLicenseOptions([    {
//             value: "Select Licence", label: "Select Licence", color: '#FF8B00'
//           },
//           {
//             value: "true", label: "Have Licence", color: '#FF8B00'
//           },
//           {
//             value: "false", label: "No Licence", color: '#FF8B00'
//           }])
//           },1000)}
        
//         if(LanguageOp.length == 0){
//           setTimeout(()=>{
//           setLangOp([{ value: 'Roumain', label: 'Roumain', color:  '#FF8B00' },
//           { value: 'Français', label: 'Français', color:  '#FF8B00', },
//           { value: 'Anglais', label: 'Anglais', color: '#FF8B00' },
//           { value: 'Italien', label: 'Italien', color: '#FF8B00'  },
//           { value: 'Russe', label: 'Russe', color: '#FF8B00' },
//           { value: 'Espagnol', label: 'Espagnol', color: '#FF8B00'},
//           { value: 'Autre', label: 'Autre', color: '#FF8B00' },
//           { value: 'Suisse', label: 'Suisse', color: '#FF8B00' },
//         ])
//           },1000)
//         }
//         if(motivationOptions.length == 0){
//           setTimeout(()=>{
//             setMotivationOptions([    {
//               value: "Select Motivations", label: "Select Motivations", color: '#FF8B00'
//             },
//             {
//               value: "1", label: "😟", color: '#FF8B00'
//             }, {
//               value: "2", label: "🙁", color: '#FF8B00'
//             }, {
//               value: "3", label: "😊", color: '#FF8B00'
//             }, {
//               value: "4", label: "🥰", color: '#FF8B00'
//             }, {
//               value: "5", label: "😍", color: '#FF8B00'
//             }])
//           },1000)
    
//         }
//         if (nameOptions.length == 0) {
//           fetchProfiles().then((profilesResult) => {
//             let nameops = profilesResult.map((pro) => {
//               return { value: pro.candidatName, label: pro.candidatName.toLocaleUpperCase(), color: '#FF8B00' }
//             })
//             setNameOptions([{value:"Select Name",label:"Select Name",color:"#ff8b00"},...nameops])
//           }).catch(err => {
//             console.log(err)
//           })
//         }
//         if (email.length == 0) {
//           let emailops=[]as any
//           fetchProfiles().then((profileResult) => {
//             profileResult.filter((item) => {
//               if(cardTotallength === 0){
//                 setTotalLength(profileResult.length)
//               }
//               if(item.candidatEmail){
//              emailops.push({ value: item.candidatEmail, label: item.candidatEmail.toLocaleUpperCase(), color: '#FF8B00' })
//               }
//           })
//              setEmail([  {
//               value: "Select email", label: "Select Email", color: '#FF8B00'
//             },...emailops])
//           })
//           }
//           if (ContactOptions.length == 0) {
//             let ContactOp =[]as any
//             fetchProfiles().then((profileResult) => {
//               profileResult.filter((item) => {
//                 if(item.candidatPhone){
//                   ContactOp.push({ value: item.candidatPhone, label: item.candidatPhone, color: '#FF8B00' })
//                 }
//             })
//                setContactOptions([  {
//                 value: "Select Contact", label: "Select Contact", color: '#FF8B00'
//               },...ContactOp])
//             })
//             }
//       } )
    


//     const colourStyles: StylesConfig<ColourOption, true> = {
//         control: (styles) => ({ ...styles, backgroundColor: 'white' }),
//         option: (styles, { data, isDisabled, isFocused, isSelected }) => {
//           const color = chroma(data.color);
//           return {
//             ...styles,
//             backgroundColor: isDisabled
//               ? undefined
//               : isSelected
//                 ? data.color
//                 : isFocused
//                   ? color.alpha(0.1).css()
//                   : undefined,
//             color: isDisabled
//               ? '#ccc'
//               : isSelected
//                 ? chroma.contrast(color, 'white') > 2
//                   ? 'white'
//                   : 'black'
//                 : data.color,
//             cursor: isDisabled ? 'not-allowed' : 'default',
    
//             ':active': {
//               ...styles[':active'],
//               backgroundColor: !isDisabled
//                 ? isSelected
//                   ? data.color
//                   : color.alpha(0.3).css()
//                 : undefined,
//             },
//           };
//         },
//         multiValue: (styles, { data }) => {
//           const color = chroma(data.color);
//           return {
//             ...styles,
//             backgroundColor: color.alpha(0.1).css(),
//           };
//         },
//         multiValueLabel: (styles, { data }) => ({
//           ...styles,
//           color: data.color,
//         }),
//         multiValueRemove: (styles, { data }) => ({
//           ...styles,
//           color: data.color,
//           ':hover': {
//             backgroundColor: data.color,
//             color: 'white',
//           },
//         }),
//       };
    

//       const 
    
// return(<>
        
//     <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 bg-white p-2 rounded001 mdquery mb-2">
//             <div className="row ">
//               <div className="col-md-6 col-xxl-4 col-xl-4 col-lg-4 ">
//                 <p className="FiltreName">Filtre by name</p>
//                 <div className="dropdown">
//                   <div aria-labelledby="dropdownMenuButton1">
//                     {
//                       nameOptions.length > 0 ?
//                         <Select
//                           name="candidatName"
//                           closeMenuOnSelect={true}
//                           placeholder="‎ ‎ ‎ ‎ ‎ ‎Select Un Candidat"
//                           className="basic-multi-select"
//                           classNamePrefix="select"
//                           onChange={handleNameChange}
//                           options={nameOptions}
//                           styles={colourStyles}
//                           isClearable={false}
                      
                          
                          
//                         /> :  
//          <>                                <div className="spinner-grow text-primary" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-secondary" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-success" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-danger" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-warning" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-dark" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div></>

//                                             }
//                     {/* <select
//                       name="candidatActivityName"
//                       className="form-select"
//                       onChange={handleNameChange}
//                       onClick={() => {
//                         // setSelectedJob([]);
//                         filterFunction();
//                       }}
//                     >
//                       <option value="Select Un Name" className="fadeClass001">Select</option>
//                       {nameOptions &&
//                         SelectDropDown.map((Name) => (
//                           <option value={Name.candidatName}>
//                             <button className="dropdown-item">
//                               {Name.candidatName}
//                             </button>
//                           </option>
//                         ))}
//                     </select> */}
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-6 col-xxl-4 col-xl-4 col-lg-4">
//                 <p className="FiltreName">Filtre Secteur d’activité</p>
//                 <div className="dropdown">
//                   <div aria-labelledby="dropdownMenuButton1">
//                   {sectorOptions.length > 0 ?
//                       <Select
//                         name="candidatActivitySector"
//                         closeMenuOnSelect={true}
//                         placeholder="‎ ‎ ‎‎ ‎ ‎Select Un Secteur"
//                         className="basic-multi-select"
//                         classNamePrefix="select"
//                         onChange={handleSectorChange}
//                         options={sectorOptions}
//                         styles={colourStyles}
//                    /> :                <>                            <div className="spinner-grow text-primary" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-secondary" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-success" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-danger" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-warning" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-dark" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div></>

//                     }
//                     {/* <select
//                       name="candidatActivitySector"
//                       className="form-select"
//                       onChange={handleSectorChange}
//                       onClick={() => {
//                         setSelectedJob([]);
//                         filterFunction();
//                       }}
//                     >
//                       <option value="Select Un Secteur" className="fadeClass001">Select Un Secteur</option> */}
//                     {/* {sectors &&
//                         sectors.map((sector) => (
//                           <option value={sector.sectorName}>
//                             <button className="dropdown-item">
//                               {sector.sectorName}
//                             </button>
//                           </option>
//                         ))} */}
//                     {/* </select> */}
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-6 col-xxl-4 col-xl-4 col-lg-4 pt-1101">
//                 <p className="FiltreName">Filtre selection métier / job</p>
//                 <div>
//                   {jobOptions.length > 0 ?
//                     <Select
//                       name="jobName"
//                       closeMenuOnSelect={true}
//                       isMulti
//                       placeholder="‎ ‎ ‎ ‎ ‎ ‎Select"
//                       className="basic-multi-select"
//                       classNamePrefix="select"
//                       onChange={jobChange}
//                       options={jobOptions}
//                       styles={colourStyles}
//                     /> : <p className="FiltreName mt-1">Select A Sector!</p>
//                   }
//                 </div>
//               </div>
//               {
//                 showMore ?
//                   <>
//                     <div className="col-12 pt-1">
//                       <div className="row">
//                         <div className="col-md-6 col-xxl-4 col-xl-4 col-lg-4 pt-1">
//                           <p className="FiltreName">Filtre by Motivation</p>
//                           <div className="dropdown">
//                             <div aria-labelledby="dropdownMenuButton1">
//                               {/* <select
//                                 name="candidatActivityMotivation"
//                                 className="form-select"
//                                 onChange={handleMotivationChange}
//                               // onClick={() => {
//                               //   // setSelectedJob([]);
//                               //   filterFunction();
//                               // }}
//                               >
//                                 <option value="Select Un Secteur" className="fadeClass001">Select</option>
//                                 {motivation &&
//                                   Motivation.map((Motivation) => (
//                                     <option value={Motivation.value}>
//                                       <button className="dropdown-item">
//                                         {Motivation.label}
//                                       </button>
//                                     </option>
//                                   ))}
//                               </select> */}
//                               {
//                                 motivationOptions.length > 0 ?
//                                 <Select
//                                 name="candidatMotivation"
//                                 closeMenuOnSelect={true}
//                                 placeholder="‎ ‎ ‎ ‎ ‎ ‎Select Motivation du Candidat"
//                                 className="basic-multi-select"
//                                 classNamePrefix="select"
//                                 onChange={handleMotivationChange}
//                                 options={motivationOptions}
//                                 styles={colourStyles}
//                               />
//                               :
//                           <> 
//      <div className="spinner-grow text-primary" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-secondary" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-success" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-danger" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-warning" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-dark" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div></>
//                               }
                        
//                             </div>
//                           </div>
//                         </div>
//                         <div className="col-md-6 col-xxl-4 col-xl-4 col-lg-4 pt-1">
//         <p className="FiltreName">Filter by date</p>
//                           {/* <input
//                               type="date"
//                               className="form-control"
//                               name="candidatStartDate"
//                                 // value={data.candidatStartDate}
//                                 onClick={onDateChange}
                                
//                               /> */}
//                               { dateLoader ?
//  <input type="date"  className="form-control inputDate"
//  name="candidatStartDate"   onChange={onDateChange} />
//  :
//    <> 
//      <div className="spinner-grow text-primary" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-secondary" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-success" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-danger" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-warning" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-dark" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div></>

//                               }
                       
//         </div>
//                         <div className="col-md-6 col-xxl-4 col-xl-4 col-lg-4 pt-1">
//                           <p className="FiltreName">Filter by driver licence</p>
//                           <div className="dropdown">
//                             <div aria-labelledby="dropdownMenuButton1">
//                               {/* <select
//                                 name=""
//                                 className="form-select"
//                                 // onChange={handleSectorChange}
//                                 onChange={HandelLicence}
//                               >
//                                 <option value="Select Un Secteur" className="fadeClass001" selected disabled hidden>Have licence</option>
//                                 <option value="true" onChange={HandelLicence}>Have Licence</option>
//                                 <option value="false" onChange={HandelLicence}>Doesn't Have Licence</option>
//                               </select> */}
//                              {
//                               licenceOptions.length > 0 ?
//                               <Select
//                               name="candidatLicencePermis"
//                               closeMenuOnSelect={true}
//                               placeholder="‎ ‎ ‎ ‎ ‎  ‎ Select Licence Permis"
//                               className="basic-multi-select"
//                               classNamePrefix="select"
//                               onChange={HandelLicence}
//                               options={licenceOptions}
//                               styles={colourStyles}
//                             />
                          
//                             : 
//                           <> 
//      <div className="spinner-grow text-primary" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-secondary" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-success" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-danger" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-warning" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-dark" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div></>

//                              }
                       
//                             </div>
//                           </div>
//                         </div>
//                         <div className="col-md-6 col-xxl-4 col-xl-4 col-lg-4 pt-2">
//                           <p className="FiltreName">Filtre by email</p>
//                           <div className="dropdown">
//                             <div aria-labelledby="dropdownMenuButton1">
//                             {email.length>0?
//                               <Select
//                                 name="candiatEmail"
//                                 closeMenuOnSelect={true}
//                                 placeholder="‎ ‎ ‎ ‎ ‎  ‎ yourmail@mail.com"
//                                 className="basic-multi-select"
//                                 classNamePrefix="select"
//                                 onChange={handleEmailChange}
//                                 options={email}
//                                 styles={colourStyles}
//                               />
//   :
//                           <> 
//      <div className="spinner-grow text-primary" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-secondary" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-success" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-danger" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-warning" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-dark" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div></>
//                             }
//                             </div>
//                           </div>
//                         </div>
//                         <div className="col-md-6 col-xxl-4 col-xl-4 col-lg-4 pt-2">
//                           <p className="FiltreName">Filtre by contact</p>
//                           <div className="dropdown">
//                             <div aria-labelledby="dropdownMenuButton1">
                        
//                              {
// ContactOptions.length>0 ?
// <Select
// name="candidatPhone"
// closeMenuOnSelect={true}
// placeholder="‎ ‎ ‎ ‎ ‎  ‎ Candidat's Phone Number"
// className="basic-multi-select"
// classNamePrefix="select"
// onChange={handleContactChange}
// options={ContactOptions}
// styles={colourStyles}
// />
// :
//   <> 
//      <div className="spinner-grow text-primary" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-secondary" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-success" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-danger" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-warning" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-dark" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div></>
//                              }
                         
//                             </div>
//                           </div>
//                         </div>
//                         <div className="col-md-6 col-xxl-4 col-xl-4 col-lg-4 pt-2">
//                           <p className="FiltreName">Filtre By Language</p>
//                           <div className="dropdown">
//                             <div aria-labelledby="dropdownMenuButton1">
//                               {/* <select
//                                 name=""
//                                 className="form-select"
//                                 // onChange={handleSectorChange}
//                                 onChange={HandelLicence}
//                               >
//                                 <option value="Select Un Secteur" className="fadeClass001" selected disabled hidden>Have licence</option>
//                                 <option value="true" onChange={HandelLicence}>Have Licence</option>
//                                 <option value="false" onChange={HandelLicence}>Doesn't Have Licence</option>
//                               </select> */}
//         {
//                         LanguageOp.length > 0 ?
//                         <Select
//                         name="candidatLanguages"
//                         closeMenuOnSelect={false}
//                         isMulti
//                         placeholder="‎ ‎ ‎Select Langues"
//                         className="basic-multi-select"
//                         classNamePrefix="select"
//                         onChange={LanguageChange}
//                         options={LanguageOp}
//                         styles={colourStyles}
//                       /> 
//                       : 
//                       <> 
//      <div className="spinner-grow text-primary" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-secondary" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-success" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-danger" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-warning" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div>
// <div className="spinner-grow text-dark" role="status">
//   <span className="visually-hidden">Loading...</span>
// </div></>

//                       }
                      
                         
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="extraPadding">
//                       <div className="col-12">
//                         <div className="row justify-content-end">
//                         <div className="col-2 d-flex align-items-center justify-content-end">
//                         {selectedSector.length > 0 || selectedJob.length > 0 || selectedLanguages.length > 0 || SelectedName.length > 0 || MotivationArr.length > 0 || LicencePermisArr.length > 0 || DateArr.length > 0 || emailArr.length > 0 || contactArr.length > 0 || LanguageFilter.length > 0?

//                           <p className="filterStyling  cursor-pointer mt-2 HoveRESTClass" onClick={() => RestFilters()}>Reset Filters</p>
//                           : null
//                         }
//                         </div>
//                           <div className="col-2 d-flex justify-content-end">
//                             <p className="filterStyling pt-2 cursor-pointer" onClick={() => setShowMore(false)}>Less Filters <img src={require("../images/downup.svg").default} /></p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </>

//                   :
//                   <div className="extraPadding">
//                     <div className="col-12">
//                       <div className="row justify-content-end">
//                       <div className="col-2 d-flex align-items-center justify-content-end">
//                       {selectedSector.length > 0 || selectedJob.length > 0 || selectedLanguages.length > 0 || SelectedName.length > 0 || MotivationArr.length > 0 || LicencePermisArr.length > 0 || DateArr.length > 0 || emailArr.length > 0 || contactArr.length > 0 || LanguageFilter.length > 0?

// <p className="filterStyling HoveRESTClass cursor-pointer mt-2" onClick={() => RestFilters()}>Reset Filters</p>
// : null
// }   </div>
//                         <div className="col-2 d-flex justify-content-end">
//                           <p className="filterStyling pt-2 cursor-pointer" onClick={() => setShowMore(true)}>More Filters <img src={require("../images/down.svg").default} /></p>
//                         </div>
//                       </div>
//                     </div></div>
//               }
//             </div>
//           </div>
          


 
//         </>)
// }