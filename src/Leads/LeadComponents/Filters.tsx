// import React, { useState, useEffect, useRef } from "react";
// import Select, { StylesConfig } from "react-select";
// import { ColourOption } from "../../Selecteddata/data";
// import chroma from "chroma-js";
// import { API_BASE_URL } from "../../config/serverApiConfig";
// import { DateRange } from "react-date-range";
// import { toast } from "react-hot-toast";
// import format from "date-fns/format";
// import { addDays } from "date-fns";

// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";
// import { dataURLFileLoader } from "react-doc-viewer";
// import { isNonNullExpression } from "typescript";

// function Filters({
//   LeadsCard,
//   market,
//   setLeads,
//   statusLeads,
//   update,
//   setprecontacted,
//   setcontacted,
//   setFilterState,
//   page,
//   setSkipLeads,
//   setLength,
//   length
// }) {
//   let CaNam = [] as any;
//   let Contact = [] as any;
//   let Email = [] as any;
//   const [range, setRange] = useState([
//     {
//       startDate: new Date(),
//       endDate: addDays(new Date(), 7),
//       key: "selection",
//     },
//   ]);
//   const [dateCheck, setDateCheck] = useState(false);
//   const [applyBtn, setApplyBtn] = useState(false);
//   const [jobNames, setJobName] = useState([]);
//   const [Data, setData] = useState() as any;
//   const [CanName, setCanName] = useState([]);
//   const [ContactOp, setContactOp] = useState([]);
//   const [emailOp, setemailOp] = useState([]);
//   // const [length ,setLengt]=useState([])
//   const colourStyles: StylesConfig<ColourOption, true> = {
//     control: (styles) => ({ ...styles, backgroundColor: "white" }),
//     option: (styles, { data, isDisabled, isFocused, isSelected }) => {
//       const color = chroma(data.color);
//       return {
//         ...styles,
//         backgroundColor: isDisabled
//           ? undefined
//           : isSelected
//           ? data.color
//           : isFocused
//           ? color.alpha(0.1).css()
//           : undefined,
//         color: isDisabled
//           ? "#ccc"
//           : isSelected
//           ? chroma.contrast(color, "white") > 2
//             ? "white"
//             : "black"
//           : data.color,
//         cursor: isDisabled ? "not-allowed" : "default",

//         ":active": {
//           ...styles[":active"],
//           backgroundColor: !isDisabled
//             ? isSelected
//               ? data.color
//               : color.alpha(0.3).css()
//             : undefined,
//         },
//       };
//     },
//     multiValue: (styles, { data }) => {
//       const color = chroma(data.color);
//       return {
//         ...styles,
//         backgroundColor: color.alpha(0.1).css(),
//       };
//     },
//     multiValueLabel: (styles, { data }) => ({
//       ...styles,
//       color: data.color,
//     }),
//     multiValueRemove: (styles, { data }) => ({
//       ...styles,
//       color: data.color,
//       ":hover": {
//         backgroundColor: data.color,
//         color: "white",
//       },
//     }),
//   };

//   // useEffect(()=>{
//   //   setfromPerson([])
//   // setQUALIFIED([])
//   // setCONTACTED([])
//   // setPrecontacted([])
//   // setJobName([])
//   // setContactOp([])
//   // setemailOp([])
//   // setCanName([])
//   // setDateCheck(false)
//   // setData()

//   // },[market])

//   useEffect(()=>{

//     if(Data !== undefined &&  length.length === 0){
//       setApplyBtn(true);
//       fetch(API_BASE_URL + "filterLeads", {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + localStorage.getItem("token"),
//         },
//         body: JSON.stringify(Data),
//       })
//         .then((res) => res.json())
//         .then((res) => {
//           if (res.status) {
            
//             setApplyBtn(false);
//             setprecontacted(res.notPreContactedCount);
//             setcontacted(res.notContactedCount);
    
//            setFilterState(false)
//             setLeads([...res.data]);
//             setLength([...res.data])
         
//             setDateCheck(false);
//           } else {
            

//             setApplyBtn(false);
//             setprecontacted(res.notPreContactedCount);
//            setFilterState(false)
//             setcontacted(res.notContactedCount);
//             setLeads([]);
//             setLength([])
          

//           }
//         })
//         .catch((err) => err);
//     }
//   },[length])

//   const [fromPerson, setfromPerson] = useState([]);

//   const [QUALIFIED, setQUALIFIED] = useState([]);
//   const [CONTACTED, setCONTACTED] = useState([]);
//   const [Precontacted, setPrecontacted] = useState([]);

//   // open close
//   const [open, setOpen] = useState(false);
//   // get the target element to toggle
//   const refOne = useRef(null);

//   const fetchJobName = async (market) => {
//     await fetch(API_BASE_URL + `allAds/?market=${market}`, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         Authorization: "Bearer " + localStorage.getItem("token"),
//       },
//     })
//       .then((red) => red.json())
//       .then((res) => {
//         if (res.status) {
//           if (res.total > 0) {
//             const JobFl = res.data.map((el) => {
//               return {
//                 value: el.adNameFrench + "/" + el.adNameRomanian,
//                 label:
//                   el.adNameFrench.toLocaleUpperCase() +
//                   "/" +
//                   el.adNameRomanian.toLocaleUpperCase(),
//                 color: "#FF8B00",
//                 name: "adName",
//               };
//             });

//             setJobName([...JobFl]);
//           } else {
//             setJobName([]);
//           }
//         } else {
//           setJobName([]);
//         }
//       })
//       .catch((err) => err);
//   };

//   useEffect(() => {
//     // event listeners
//     fetchJobName(market);
//     if (LeadsCard.length > 0) {
//       LeadsCard.map((el) => {
//         if (el.leadCandidatName) {
//           CaNam.push({
//             value: el.leadCandidatName,
//             label: el.leadCandidatName.toUpperCase(),
//             name: "leadCandidatName",
//             color: "#FF8B00",
//           });
//         }
//         if (el.phoneNumber) {
//           Contact.push({
//             value: el.phoneNumber,
//             label: el.phoneNumber,
//             name: "phoneNumber",
//             color: "#FF8B00",
//           });
//         }
//         if (el.email) {
//           Email.push({
//             value: el.email,
//             label: el.email,
//             name: "email",
//             color: "#FF8B00",
//           });
//         }
//         setContactOp([
//           {
//             value: "No",
//             label: "Select Contact",
//             name: "phoneNumber",
//             color: "#FF8B00",
//           },
//           ...Contact,
//         ]);
//         setCanName([
//           {
//             value: "No",
//             label: "Select Candidate",
//             name: "leadCandidatName",
//             color: "#FF8B00",
//           },
//           ...CaNam,
//         ]);
//         setemailOp([
//           {
//             value: "No",
//             label: "Select Email",
//             name: "email",
//             color: "#FF8B00",
//           },
//           ...Email,
//         ]);
//       });
//     } else {
//       setContactOp([
//         {
//           value: "No",
//           label: "No Contact",
//           name: "phoneNumber",
//           color: "#FF8B00",
//         },
//       ]);
//       setCanName([
//         {
//           value: "No",
//           label: "No Candidate",
//           name: "leadCandidatName",
//           color: "#FF8B00",
//         },
//       ]);
//       setemailOp([
//         { value: "No", label: "No Email", name: "email", color: "#FF8B00" },
//       ]);
//     }

//     if (fromPerson.length === 0) {
//       setfromPerson([
//         {
//           value: "TikTok",
//           label: "TikTok",
//           name: "leadSource",
//           color: "#FF8B00",
//         },
//         {
//           value: "Facebook",
//           label: "Facebook",
//           name: "leadSource",
//           color: "#FF8B00",
//         },
//         {
//           value: "Google Ads",
//           label: "Google Ads",
//           name: "leadSource",
//           color: "#FF8B00",
//         },
//         {
//           value: "Bing Ads",
//           label: "Bing Ads",
//           name: "leadSource",
//           color: "#FF8B00",
//         },
//         {
//           value: "Linkedin",
//           label: "Linkedin",
//           name: "leadSource",
//           color: "#FF8B00",
//         },
//         {
//           value: "Snapchat",
//           label: "Snapchat",
//           name: "leadSource",
//           color: "#FF8B00",
//         },
//         {
//           value: "SEO website",
//           label: "SEO website",
//           name: "leadSource",
//           color: "#FF8B00",
//         },
//         {
//           value: "Jooble",
//           label: "Jooble",
//           name: "leadSource",
//           color: "#FF8B00",
//         },
//         { value: "OLX", label: "OLX", name: "leadSource", color: "#FF8B00" },
//         {
//           value: "PUBLIC24",
//           label: "PUBLIC24",
//           name: "leadSource",
//           color: "#FF8B00",
//         },
//         {
//           value: "EJobs",
//           label: "EJobs",
//           name: "leadSource",
//           color: "#FF8B00",
//         },
//         {
//           value: "BestJobs",
//           label: "BestJobs",
//           name: "leadSource",
//           color: "#FF8B00",
//         },
//       ]);
//     }
//     if (QUALIFIED.length === 0) {
//       setQUALIFIED([
//         { value: "0", label: "?", name: "leadQualified", color: "#FF8B00" },
//         { value: "1", label: "😟", name: "leadQualified", color: "#FF8B00" },
//         { value: "2", label: "🙁", name: "leadQualified", color: "#FF8B00" },
//         { value: "3", label: "😊", name: "leadQualified", color: "#FF8B00" },
//         { value: "4", label: "🥰", name: "leadQualified", color: "#FF8B00" },
//         { value: "5", label: "😍", name: "leadQualified", color: "#FF8B00" },
//       ]);
//     }
//     if (CONTACTED.length === 0) {
//       setCONTACTED([
//         {
//           value: "Phone Closed",
//           label: "Phone Closed",
//           name: "leadContactedByAgency",
//           color: "#FF8B00",
//         },
//         {
//           value: "Recall",
//           label: "Recall",
//           name: "leadContactedByAgency",
//           color: "#FF8B00",
//         },
//         {
//           value: "Yes",
//           label: "Yes",
//           name: "leadContactedByAgency",
//           color: "#FF8B00",
//         },
//         {
//           value: "Not Interested",
//           label: "Not Interested",
//           name: "leadContactedByAgency",
//           color: "#FF8B00",
//         },
//         {
//           value: "No",
//           label: "Not Yet",
//           name: "leadContactedByAgency",
//           color: "#FF8B00",
//         },
//       ]);
//     }

//     if (Precontacted.length === 0) {
//       setPrecontacted([
//         {
//           value: "Not Interested",
//           label: "Not Interested",
//           name: "leadPreContacted",
//           color: "#FF8B00",
//         },
//         {
//           value: "Interested",
//           label: "Interested",
//           name: "leadPreContacted",
//           color: "#FF8B00",
//         },
//         {
//           value: "No",
//           label: "Not Yet",
//           name: "leadPreContacted",
//           color: "#FF8B00",
//         },
//       ]);
//     }
//   }, [LeadsCard, market]);

//   const dateChange = (date) => {
//     setRange([date.selection]);
//     console.log(date.selection);
//     setData({
//       ...Data,
//       ["startDate"]: format(date.selection.startDate, "yyyy-MM-dd"),
//       ["endDate"]: format(date.selection.endDate, "yyyy-MM-dd"),
//     });
//   };

//   useEffect(() => {
//     // event listeners

//     document.addEventListener("keydown", hideOnEscape, true);
//     document.addEventListener("click", hideOnClickOutside, true);
//   }, []);

//   // hide dropdown on ESC press
//   const hideOnEscape = (e) => {
//     // console.log(e.key)
//     if (e.key === "Escape") {
//       setOpen(false);
//     }
//   };

//   // Hide on outside click
//   const hideOnClickOutside = (e) => {
//     // console.log(refOne.current)
//     // console.log(e.target)
//     if (refOne.current && !refOne.current.contains(e.target)) {
//       setOpen(false);
//     }
//   };
//   const FilterChange = (e: any) => {
//     setData({ ...Data, [e.name]: e.value, leadCountryMarket: market });
//   };
//   const JobFilterChange = (e: any) => {
//     let Jb = [];
//     e.map((el) => {
//       Jb.push(el.value);
//     });
//     setData({ ...Data, adName: Jb.toString(), leadCountryMarket: market });
//   };

//   const OnClickDataChange = (e) => {
//     if (e.target.name === "ApplyFil") {
//       if (Data !== undefined) {
//         setApplyBtn(true);
//         fetch(API_BASE_URL + "filterLeads", {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + localStorage.getItem("token"),
//           },
//           body: JSON.stringify(Data),
//         })
//           .then((res) => res.json())
//           .then((res) => {
//             if (res.status) {
//               statusLeads(true);
//               setApplyBtn(false);
//               setprecontacted(res.notPreContactedCount);
//               setcontacted(res.notContactedCount);
//               toast.success("Filter Leads Found Successfully!");
//              setFilterState(false)
//               setLeads([...res.data]);
//               setDateCheck(false);
//               setTimeout(()=>{
//                 setLength([])
//               },2000)
//             } else {
//               statusLeads(true);
//               toast.error("Sorry No Results found!");
//               setApplyBtn(false);
//               setprecontacted(res.notPreContactedCount);
//              setFilterState(false)
//               setcontacted(res.notContactedCount);
//               setLeads([]);
//             }
//           })
//           .catch((err) => err);
//       } else {
//         toast.error("Please Select Any Filter!");
//       }
//     } else {
//       toast.success("Filters Reset Successfully!");
//       setData();
//       update(true);
//       statusLeads(true);
//       setfromPerson([]);
//       setQUALIFIED([]);
//       setCONTACTED([]);
//       setPrecontacted([]);
//       setLeads([]);
//       setDateCheck(false);
//       setJobName([]);
//       setContactOp([]);
//       setemailOp([]);
//       setCanName([]);
//       setFilterState(true)

//     }
//   };
//   return (
//     <>
//       <div className="row">
//         <div className="col-4">
//           <label style={{ fontSize: "14px" }} className="Form-styling">
//             FILTER BY QUALIFIED
//           </label>
//           {QUALIFIED.length > 0 ? (
//             <Select
//               name="market"
//               closeMenuOnSelect={true}
//               placeholder="‎  ‎ ‎  ‎ FILTER BY QUALIFIED"
//               className="basic-multi-select placeHolderLead"
//               classNamePrefix="select"
//               onChange={FilterChange}
//               options={QUALIFIED}
//               styles={colourStyles}
//             />
//           ) : (
//             <>
//               {" "}
//               <div className="spinner-grow text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-secondary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-success" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-danger" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-warning" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-dark" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//             </>
//           )}
//         </div>
//         <div className="col-4">
//           <label style={{ fontSize: "14px" }} className="Form-styling">
//             FILTER BY SOURCE
//           </label>
//           {fromPerson.length > 0 ? (
//             <Select
//               name="market"
//               closeMenuOnSelect={true}
//               placeholder="‎  ‎ ‎  ‎ FILTER BY SOURCE"
//               className="basic-multi-select placeHolderLead"
//               classNamePrefix="select"
//               onChange={FilterChange}
//               options={fromPerson}
//               styles={colourStyles}
//             />
//           ) : (
//             <>
//               {" "}
//               <div className="spinner-grow text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-secondary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-success" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-danger" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-warning" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-dark" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//             </>
//           )}
//         </div>
//         <div className="col-4">
//           <label style={{ fontSize: "14px" }} className="Form-styling">
//             Filter CONTACTED BY AGENCY ONLY
//           </label>
//           {CONTACTED.length > 0 ? (
//             <Select
//               name="market"
//               closeMenuOnSelect={true}
//               placeholder="‎  ‎ ‎  ‎ FILTER CONTACTED BY AGENCY ONLY"
//               className="basic-multi-select placeHolderLead"
//               classNamePrefix="select"
//               onChange={FilterChange}
//               options={CONTACTED}
//               styles={colourStyles}
//             />
//           ) : (
//             <>
//               {" "}
//               <div className="spinner-grow text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-secondary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-success" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-danger" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-warning" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-dark" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//             </>
//           )}
//         </div>
//         <div className="col-4 mt-1">
//           <label style={{ fontSize: "14px" }} className="Form-styling">
//             FILTER PRECONTACTED ONLY
//           </label>
//           {Precontacted.length > 0 ? (
//             <Select
//               name="market"
//               closeMenuOnSelect={true}
//               placeholder="‎  ‎ ‎  ‎ FILTER PRECONTACTED ONLY"
//               className="basic-multi-select placeHolderLead"
//               classNamePrefix="select"
//               onChange={FilterChange}
//               options={Precontacted}
//               styles={colourStyles}
//             />
//           ) : (
//             <>
//               {" "}
//               <div className="spinner-grow text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-secondary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-success" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-danger" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-warning" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-dark" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//             </>
//           )}
//         </div>
//         <div className="col-4 mt-1">
//           <label style={{ fontSize: "14px" }} className="Form-styling">
//             FILTER BY JOB
//           </label>
//           {jobNames.length > 0 ? (
//             <Select
//               name="market"
//               closeMenuOnSelect={true}
//               placeholder="‎  ‎ ‎  ‎ FILTER BY JOB"
//               className="basic-multi-select placeHolderLead"
//               classNamePrefix="select"
//               onChange={JobFilterChange}
//               isMulti
//               options={jobNames}
//               styles={colourStyles}
//             />
//           ) : (
//             <>
//               {" "}
//               <div className="spinner-grow text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-secondary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-success" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-danger" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-warning" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-dark" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//             </>
//           )}
//         </div>
//         <div className="col-4 mt-1">
//           <label style={{ fontSize: "14px" }} className="Form-styling">
//             Sort by Date
//           </label>
//           <div className="">
//             <input
//               value={`${format(range[0].startDate, "dd/MM/yyyy")} to ${format(
//                 range[0].endDate,
//                 "dd/MM/yyyy"
//               )}`}
//               readOnly
//               className="dateSort"
//               onClick={() => setOpen((open) => !open)}
//             />

//             <div ref={refOne} className="rdrDateRangePickerWrapper">
//               {open && (
//                 <DateRange
//                   onChange={(item) => dateChange(item)}
//                   editableDateInputs={true}
//                   moveRangeOnFirstSelection={false}
//                   ranges={range}
//                   months={1}
//                   direction="vertical"
//                   className="calendarElement"
//                 />
//               )}
//             </div>
//             <div
//               onClick={() => setOpen((open) => !open)}
//               className="d-flex justify-content-end eventPos"
//             >
//               <img src={require("../../images/event.svg").default} />
//             </div>
//           </div>
//         </div>
//         <div className="col-4">
//           <label style={{ fontSize: "14px" }} className="Form-styling">
//             Filter by Candidate Name
//           </label>
//           {CanName.length > 0 ? (
//             <Select
//               name="market"
//               closeMenuOnSelect={true}
//               placeholder="‎  ‎ ‎  ‎ Filter by Candidate Name"
//               className="basic-multi-select placeHolderLead"
//               classNamePrefix="select"
//               onChange={FilterChange}
//               options={CanName}
//               styles={colourStyles}
//             />
//           ) : (
//             <>
//               {" "}
//               <div className="spinner-grow text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-secondary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-success" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-danger" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-warning" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-dark" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//             </>
//           )}
//         </div>
//         <div className="col-4">
//           <label style={{ fontSize: "14px" }} className="Form-styling">
//             FILTER BY Phone Number
//           </label>
//           {ContactOp.length > 0 ? (
//             <Select
//               name="market"
//               closeMenuOnSelect={true}
//               placeholder="‎  ‎ ‎  ‎ FILTER BY Phone Number"
//               className="basic-multi-select placeHolderLead"
//               classNamePrefix="select"
//               onChange={FilterChange}
//               options={ContactOp}
//               styles={colourStyles}
//             />
//           ) : (
//             <>
//               {" "}
//               <div className="spinner-grow text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-secondary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-success" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-danger" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-warning" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-dark" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//             </>
//           )}
//         </div>
//         <div className="col-4">
//           <label style={{ fontSize: "14px" }} className="Form-styling">
//             Filter by Email
//           </label>
//           {emailOp.length > 0 ? (
//             <Select
//               name="market"
//               closeMenuOnSelect={true}
//               placeholder="‎  ‎ ‎  ‎ Filter by Email"
//               className="basic-multi-select placeHolderLead"
//               classNamePrefix="select"
//               onChange={FilterChange}
//               options={emailOp}
//               styles={colourStyles}
//             />
//           ) : (
//             <>
//               {" "}
//               <div className="spinner-grow text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-secondary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-success" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-danger" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-warning" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <div className="spinner-grow text-dark" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//             </>
//           )}
//         </div>
//         <div className="col-12 mt-2">
//           <div className="row justify-content-end">
//             <div className="col-2">
//               {" "}
//               <button
//                 className="ApplyFiltersBtn"
//                 name="ApplyFil"
//                 onClick={(e) => OnClickDataChange(e)}
//                 disabled={applyBtn}
//               >
//                 Apply
//               </button>
//             </div>
//             {Data !== undefined ? (
//               <div className="col-2">
//                 {" "}
//                 <button
//                   className="RESETfilters"
//                   onClick={(e) => OnClickDataChange(e)}
//                 >
//                   Reset
//                 </button>
//               </div>
//             ) : null}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// export default Filters;



import React, { useState, useEffect, useRef } from "react";
import Select, { StylesConfig } from "react-select";
import { ColourOption } from "../../Selecteddata/data";
import chroma from "chroma-js";
import { API_BASE_URL } from "../../config/serverApiConfig";
import { DateRange } from "react-date-range";
import { toast } from "react-hot-toast";
import format from "date-fns/format";
import { addDays } from "date-fns";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
function Filters({
  LeadsCard,
  market,
  setLeads,
  statusLeads,
  update,
  setprecontacted,
  setcontacted,
  setFilter,
  filter,
  setFilterActive,setDatA}) {
  let CaNam = [] as any;
  let Contact = [] as any;
  let Email = [] as any;
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [dateCheck, setDateCheck] = useState(false);
  const [applyBtn, setApplyBtn] = useState(false);
  const [jobNames, setJobName] = useState([]);
  const [Data, setData] = useState() as any;
  const [CanName, setCanName] = useState([]);
  const [ContactOp, setContactOp] = useState([]);
  const [emailOp, setemailOp] = useState([]);
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

  // useEffect(()=>{
  //   setfromPerson([])
  // setQUALIFIED([])
  // setCONTACTED([])
  // setPrecontacted([])
  // setJobName([])
  // setContactOp([])
  // setemailOp([])
  // setCanName([])
  // setDateCheck(false)
  // setData()

  // },[market])

  const [fromPerson, setfromPerson] = useState([]);

  const [QUALIFIED, setQUALIFIED] = useState([]);
  const [CONTACTED, setCONTACTED] = useState([]);
  const [Precontacted, setPrecontacted] = useState([]);

  // open close
  const [open, setOpen] = useState(false);
  // get the target element to toggle
  const refOne = useRef(null);

  const fetchJobName = async (market) => {
    await fetch(API_BASE_URL + `allAds/?market=${market}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((red) => red.json())
      .then((res) => {
        if (res.status) {
          if (res.total > 0) {
            const JobFl = res.data.map((el) => {
              return {
                value: el.adNameFrench + "/" + el.adNameRomanian,
                label:
                  el.adNameFrench.toLocaleUpperCase() +
                  "/" +
                  el.adNameRomanian.toLocaleUpperCase(),
                color: "#FF8B00",
                name: "adName",
              };
            });

            setJobName([...JobFl]);
          } else {
            setJobName([]);
          }
        } else {
          setJobName([]);
        }
      })
      .catch((err) => err);
  };

  useEffect(()=>{

    if(Data !== undefined && filter === true){
      setApplyBtn(true);
      setFilterActive(true)
      fetch(API_BASE_URL + "filterLeads", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(Data),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status) {
            setApplyBtn(false);
            setprecontacted(res.notPreContactedCount);
            setcontacted(res.notContactedCount);
            setLeads([...res.data]);
            setFilterActive(true)
            setFilter(false)
          } else {
            setApplyBtn(false);
            setprecontacted(res.notPreContactedCount);
            setFilterActive(true)
            setcontacted(res.notContactedCount);
            setLeads([]);
            setFilter(false)
          }
        })
        .catch((err) => err);
    }
  },[filter])
  useEffect(() => {
    // event listeners
    fetchJobName(market);
    if (LeadsCard.length > 0) {
      LeadsCard.map((el) => {
        if (el.leadCandidatName) {
          CaNam.push({
            value: el.leadCandidatName,
            label: el.leadCandidatName.toUpperCase(),
            name: "leadCandidatName",
            color: "#FF8B00",
          });
        }
        if (el.phoneNumber) {
          Contact.push({
            value: el.phoneNumber,
            label: el.phoneNumber,
            name: "phoneNumber",
            color: "#FF8B00",
          });
        }
        if (el.email) {
          Email.push({
            value: el.email,
            label: el.email,
            name: "email",
            color: "#FF8B00",
          });
        }
        setContactOp([
          {
            value: "No",
            label: "Select Contact",
            name: "phoneNumber",
            color: "#FF8B00",
          },
          ...Contact,
        ]);
        setCanName([
          {
            value: "No",
            label: "Select Candidate",
            name: "leadCandidatName",
            color: "#FF8B00",
          },
          ...CaNam,
        ]);
        setemailOp([
          {
            value: "No",
            label: "Select Email",
            name: "email",
            color: "#FF8B00",
          },
          ...Email,
        ]);
      });
    } else {
      setContactOp([
        {
          value: "No",
          label: "No Contact",
          name: "phoneNumber",
          color: "#FF8B00",
        },
      ]);
      setCanName([
        {
          value: "No",
          label: "No Candidate",
          name: "leadCandidatName",
          color: "#FF8B00",
        },
      ]);
      setemailOp([
        { value: "No", label: "No Email", name: "email", color: "#FF8B00" },
      ]);
    }

    if (fromPerson.length === 0) {
      setfromPerson([
        {
          value: "TikTok",
          label: "TikTok",
          name: "leadSource",
          color: "#FF8B00",
        },
        {
          value: "Facebook",
          label: "Facebook",
          name: "leadSource",
          color: "#FF8B00",
        },
        {
          value: "Google Ads",
          label: "Google Ads",
          name: "leadSource",
          color: "#FF8B00",
        },
        {
          value: "Bing Ads",
          label: "Bing Ads",
          name: "leadSource",
          color: "#FF8B00",
        },
        {
          value: "Linkedin",
          label: "Linkedin",
          name: "leadSource",
          color: "#FF8B00",
        },
        {
          value: "Snapchat",
          label: "Snapchat",
          name: "leadSource",
          color: "#FF8B00",
        },
        {
          value: "SEO website",
          label: "SEO website",
          name: "leadSource",
          color: "#FF8B00",
        },
        {
          value: "Jooble",
          label: "Jooble",
          name: "leadSource",
          color: "#FF8B00",
        },
        { value: "OLX", label: "OLX", name: "leadSource", color: "#FF8B00" },
        {
          value: "PUBLIC24",
          label: "PUBLIC24",
          name: "leadSource",
          color: "#FF8B00",
        },
        {
          value: "EJobs",
          label: "EJobs",
          name: "leadSource",
          color: "#FF8B00",
        },
        {
          value: "BestJobs",
          label: "BestJobs",
          name: "leadSource",
          color: "#FF8B00",
        },
      ]);
    }
    if (QUALIFIED.length === 0) {
      setQUALIFIED([
        { value: "0", label: "?", name: "leadQualified", color: "#FF8B00" },
        { value: "1", label: "😟", name: "leadQualified", color: "#FF8B00" },
        { value: "2", label: "🙁", name: "leadQualified", color: "#FF8B00" },
        { value: "3", label: "😊", name: "leadQualified", color: "#FF8B00" },
        { value: "4", label: "🥰", name: "leadQualified", color: "#FF8B00" },
        { value: "5", label: "😍", name: "leadQualified", color: "#FF8B00" },
      ]);
    }
    if (CONTACTED.length === 0) {
      setCONTACTED([
        {
          value: "Phone Closed",
          label: "Phone Closed",
          name: "leadContactedByAgency",
          color: "#FF8B00",
        },
        {
          value: "Recall",
          label: "Recall",
          name: "leadContactedByAgency",
          color: "#FF8B00",
        },
        {
          value: "Yes",
          label: "Yes",
          name: "leadContactedByAgency",
          color: "#FF8B00",
        },
        {
          value: "Not Interested",
          label: "Not Interested",
          name: "leadContactedByAgency",
          color: "#FF8B00",
        },
        {
          value: "Not Yet",
          label: "Not Yet",
          name: "leadContactedByAgency",
          color: "#FF8B00",
        },
      ]);
    }

    if (Precontacted.length === 0) {
      setPrecontacted([
        {
          value: "Not Interested",
          label: "Not Interested",
          name: "leadPreContacted",
          color: "#FF8B00",
        },
        {
          value: "Interested",
          label: "Interested",
          name: "leadPreContacted",
          color: "#FF8B00",
        },
        {
          value: "Not Yet",
          label: "Not Yet",
          name: "leadPreContacted",
          color: "#FF8B00",
        },
      ]);
    }
  }, [LeadsCard, market]);

  const dateChange = (date) => {
    setRange([date.selection]);
    console.log(date.selection);
    setData({
      ...Data,
      ["startDate"]: format(date.selection.startDate, "yyyy-MM-dd"),
      ["endDate"]: format(date.selection.endDate, "yyyy-MM-dd"),
    });
  };

  useEffect(() => {
    // event listeners

    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Hide on outside click
  const hideOnClickOutside = (e) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };
  const FilterChange = (e: any) => {
    setData({ ...Data, [e.name]: e.value, leadCountryMarket: market });
  };
  const JobFilterChange = (e: any) => {
    let Jb = [];
    e.map((el) => {
      Jb.push(el.value);
    });
    setData({ ...Data, adName: Jb.toString(), leadCountryMarket: market });
  };

  const OnClickDataChange = (e) => {
    if (e.target.name === "ApplyFil") {
      if (Data !== undefined) {
        setApplyBtn(true);
      setFilterActive(true)
        fetch(API_BASE_URL + "filterLeads", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(Data),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.status) {
              statusLeads(true);
      setFilterActive(true)
      setDatA(Data)
              setApplyBtn(false);
              setprecontacted(res.notPreContactedCount);
              setcontacted(res.notContactedCount);
              toast.success("Filter Leads Found Successfully!");
              setLeads([...res.data]);
              
              setDateCheck(false);
            } else {
              statusLeads(true);
      setFilterActive(true)
      setDatA(Data)
              toast.error("Sorry No Results found!");
              setApplyBtn(false);
              setprecontacted(res.notPreContactedCount);
              setcontacted(res.notContactedCount);

              setLeads([]);
            }
          })
          .catch((err) => err);
      } else {
        toast.error("Please Select Any Filter!");
      }
    } else {
      toast.success("Filters Reset Successfully!");
      setData();
      setDatA()
      update(true);
      setFilterActive(false)
      statusLeads(false);
      setfromPerson([]);
      setQUALIFIED([]);
      setCONTACTED([]);
      setPrecontacted([]);
      setLeads([]);
      setDateCheck(false);
      setJobName([]);
      setContactOp([]);
      setemailOp([]);
      setCanName([]);
    }
  };
  return (
    <>
      <div className="row">
        <div className="col-4">
          <label style={{ fontSize: "14px" }} className="Form-styling">
            FILTER BY QUALIFIED
          </label>
          {QUALIFIED.length > 0 ? (
            <Select
              name="market"
              closeMenuOnSelect={true}
              placeholder="‎  ‎ ‎  ‎ FILTER BY QUALIFIED"
              className="basic-multi-select placeHolderLead"
              classNamePrefix="select"
              onChange={FilterChange}
              options={QUALIFIED}
              styles={colourStyles}
            />
          ) : (
            <>
              {" "}
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </>
          )}
        </div>
        <div className="col-4">
          <label style={{ fontSize: "14px" }} className="Form-styling">
            FILTER BY SOURCE
          </label>
          {fromPerson.length > 0 ? (
            <Select
              name="market"
              closeMenuOnSelect={true}
              placeholder="‎  ‎ ‎  ‎ FILTER BY SOURCE"
              className="basic-multi-select placeHolderLead"
              classNamePrefix="select"
              onChange={FilterChange}
              options={fromPerson}
              styles={colourStyles}
            />
          ) : (
            <>
              {" "}
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </>
          )}
        </div>
        <div className="col-4">
          <label style={{ fontSize: "14px" }} className="Form-styling">
            Filter CONTACTED BY AGENCY ONLY
          </label>
          {CONTACTED.length > 0 ? (
            <Select
              name="market"
              closeMenuOnSelect={true}
              placeholder="‎  ‎ ‎  ‎ FILTER CONTACTED BY AGENCY ONLY"
              className="basic-multi-select placeHolderLead"
              classNamePrefix="select"
              onChange={FilterChange}
              options={CONTACTED}
              styles={colourStyles}
            />
          ) : (
            <>
              {" "}
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </>
          )}
        </div>
        <div className="col-4 mt-1">
          <label style={{ fontSize: "14px" }} className="Form-styling">
            FILTER PRECONTACTED ONLY
          </label>
          {Precontacted.length > 0 ? (
            <Select
              name="market"
              closeMenuOnSelect={true}
              placeholder="‎  ‎ ‎  ‎ FILTER PRECONTACTED ONLY"
              className="basic-multi-select placeHolderLead"
              classNamePrefix="select"
              onChange={FilterChange}
              options={Precontacted}
              styles={colourStyles}
            />
          ) : (
            <>
              {" "}
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </>
          )}
        </div>
        <div className="col-4 mt-1">
          <label style={{ fontSize: "14px" }} className="Form-styling">
            FILTER BY JOB
          </label>
          {jobNames.length > 0 ? (
            <Select
              name="market"
              closeMenuOnSelect={true}
              placeholder="‎  ‎ ‎  ‎ FILTER BY JOB"
              className="basic-multi-select placeHolderLead"
              classNamePrefix="select"
              onChange={JobFilterChange}
              isMulti
              options={jobNames}
              styles={colourStyles}
            />
          ) : (
            <>
              {" "}
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </>
          )}
        </div>
        <div className="col-4 mt-1">
          <label style={{ fontSize: "14px" }} className="Form-styling">
            Sort by Date
          </label>
          <div className="">
            <input
              value={`${format(range[0].startDate, "dd/MM/yyyy")} to ${format(
                range[0].endDate,
                "dd/MM/yyyy"
              )}`}
              readOnly
              className="dateSort"
              onClick={() => setOpen((open) => !open)}
            />

            <div ref={refOne} className="rdrDateRangePickerWrapper">
              {open && (
                <DateRange
                  onChange={(item) => dateChange(item)}
                  editableDateInputs={true}
                  moveRangeOnFirstSelection={false}
                  ranges={range}
                  months={1}
                  direction="vertical"
                  className="calendarElement"
                />
              )}
            </div>
            <div
              onClick={() => setOpen((open) => !open)}
              className="d-flex justify-content-end eventPos"
            >
              <img src={require("../../images/event.svg").default} />
            </div>
          </div>
        </div>
        <div className="col-4">
          <label style={{ fontSize: "14px" }} className="Form-styling">
            Filter by Candidate Name
          </label>
          {CanName.length > 0 ? (
            <Select
              name="market"
              closeMenuOnSelect={true}
              placeholder="‎  ‎ ‎  ‎ Filter by Candidate Name"
              className="basic-multi-select placeHolderLead"
              classNamePrefix="select"
              onChange={FilterChange}
              options={CanName}
              styles={colourStyles}
            />
          ) : (
            <>
              {" "}
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </>
          )}
        </div>
        <div className="col-4">
          <label style={{ fontSize: "14px" }} className="Form-styling">
            FILTER BY Phone Number
          </label>
          {ContactOp.length > 0 ? (
            <Select
              name="market"
              closeMenuOnSelect={true}
              placeholder="‎  ‎ ‎  ‎ FILTER BY Phone Number"
              className="basic-multi-select placeHolderLead"
              classNamePrefix="select"
              onChange={FilterChange}
              options={ContactOp}
              styles={colourStyles}
            />
          ) : (
            <>
              {" "}
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </>
          )}
        </div>
        <div className="col-4">
          <label style={{ fontSize: "14px" }} className="Form-styling">
            Filter by Email
          </label>
          {emailOp.length > 0 ? (
            <Select
              name="market"
              closeMenuOnSelect={true}
              placeholder="‎  ‎ ‎  ‎ Filter by Email"
              className="basic-multi-select placeHolderLead"
              classNamePrefix="select"
              onChange={FilterChange}
              options={emailOp}
              styles={colourStyles}
            />
          ) : (
            <>
              {" "}
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </>
          )}
        </div>
        <div className="col-12 mt-2">
          <div className="row justify-content-end">
            <div className="col-2">
              {" "}
              <button
                className="glow-on-hover mr-2"
                style={{width:"100%",height:"40px"}}
                name="ApplyFil"
                onClick={(e) => OnClickDataChange(e)}
                disabled={applyBtn}
              >
                Apply
              </button>
            </div>
            {Data !== undefined ? (
              <div className="col-2">
                {" "}
                <button
                  className="RESETfilters"
                  onClick={(e) => OnClickDataChange(e)}
                >
                  Reset
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
export default Filters;