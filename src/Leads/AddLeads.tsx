import React,{useEffect, useState} from "react";
import Select, { StylesConfig } from "react-select";
import {Link} from "react-router-dom"
import { ColourOption } from "../Selecteddata/data";
import chroma from "chroma-js";
import { ReactComponent as France } from "../images/france.svg";
import { ReactComponent as Switzer } from "../images/switzerland.svg";
import { ReactComponent as Romania } from "../images/romania.svg";
import {API_BASE_URL} from "../config/serverApiConfig"
import {toast ,Toaster} from "react-hot-toast"
import $ from "jquery"
import { FileUploader } from "react-drag-drop-files";
import { ProgressBar } from "react-bootstrap";
import axios from 'axios'
import ProfileLoader from "../components/Loader/ProfilesLoader";
import { motion } from "framer-motion";
import CSVModal from "./Modal/CSVModal";

function AddLeads(){
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
  })
  const [confirmModal,setConfirmModal]=useState(false)
  const [ConfirmModalMessage,setConfirmModalMessage]=useState("")as any
  const [CustomForm,setCustomForm]=useState(false)
  const [CsvUploadForm,setCsvUploadForm]=useState(false)
  const [SelectFormSide,setSelectFormSide] = useState(true)
  const [statusCSV,setCSVstatus]=useState(false)
 const notifyDocumentUploadSuccess = () => toast.success("Document Uploaded Successfully!");
  const [SelectContry]=useState([{
    value:"FRANCE",
    label:(<> <France
      style={{ paddingRight: "5px" }}
    /> France </>)
,
color: "#FF8B00",
name:"leadCountryMarket"
  },{
    value:"SUISSE",
    label:(<> <Switzer
      style={{ paddingRight: "5px" }}
    /> Suisse </>)
,
color: "#FF8B00",
name:"leadCountryMarket"
  },{
    value:"ROMANIA",
    label:(<> <Romania
      style={{ paddingRight: "5px" }}
    /> Romania </>),
    color: "#FF8B00",
    name:"leadCountryMarket"

  }

])as any

useEffect(()=>{
  $('div.market').each(function(i){
    $(this).attr('id' , 'market' );  
});
})

useEffect(()=>{
  $('div.source').each(function(i){
    $(this).attr('id' , 'source' + (i+1));  
});
})
useEffect(()=>{
  $('div.lead').each(function(i){
    $(this).attr('id' , 'lead' + (i+1)); 
});
})

const [jobNames,setJobName]=useState([])

const [fromPerson]=useState ([ {value: 'TikTok', label: 'TikTok',name:"leadSource", color:  '#FF8B00' },
{  value: 'Facebook', label: 'Facebook', name:"leadSource", color:  '#FF8B00', },
{value: 'Google Ads', label: 'Google Ads',name:"leadSource", color: '#FF8B00' },
{value: 'Bing Ads', label: 'Bing Ads',name:"leadSource", color: '#FF8B00'  },
{  value: 'Linkedin', label: 'Linkedin', name:"leadSource", color:  '#FF8B00', },
{value: 'Snapchat', label: 'Snapchat',name:"leadSource", color: '#FF8B00' },
{value: 'SEO website', label: 'SEO website',name:"leadSource", color: '#FF8B00' },{value: 'Jooble', label: 'Jooble',name:"leadSource", color: '#FF8B00' },{value: 'OLX', label: 'OLX',name:"leadSource", color: '#FF8B00' },{value: 'PUBLIC24', label: 'PUBLIC24',name:"leadSource", color: '#FF8B00' },{value: 'EJobs', label: 'EJobs',name:"leadSource", color: '#FF8B00' },{value: 'BestJobs', label: 'BestJobs',name:"leadSource", color: '#FF8B00' },
])
  const [selectJobInput,setJobInput]=useState()as any
  const [btnDS,setBtnDS]=useState(false)
  const [progress, setProgress] = useState<any>(0);
  const [data,setData]=useState({
    leadCountryMarket:"",
    leadCandidatName:"",
    phoneNumber:"",
    leadSource:"",
    ad:"",
    email:"",
    leadPrice:"",
    leadNotes:""
  })
  const [fileUploaded,setFileUploadFile] = useState(null)
  const [JobName,setJobNameAd]=useState({
    ad:""
  })
  const FilesUploads=(file)=>{
    setFileUploadFile(file)
  }
  
  const onCSVFile=()=>{
    setBtnDS(true)
    let formdata = new FormData();
    formdata.append('leadscsv', fileUploaded)
    formdata.append('jobName',JobName.ad)
    formdata.append('countryName', data.leadCountryMarket.toUpperCase())
      axiosInstance.post("addLeadsViaCSV", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": "Bearer " + localStorage.getItem('token')
        },
        onUploadProgress: data => {
          //Set the progress value to show the progress bar
          setProgress(Math.round((100 * data.loaded) / data.total))
        },
      })
      .then(resData => {
        if (resData.data.status) {
          setProgress(0); 
          setConfirmModalMessage(resData.data.message)
          setConfirmModal(true)
          notifyDocumentUploadSuccess();
          setBtnDS(false)
          setCSVstatus(true)
        } else {
          setBtnDS(false);
          setConfirmModal(true)
          setConfirmModalMessage(resData.data.message)
          setCSVstatus(false)
        }
      })
      .catch(err => {
        console.log(err)
        setBtnDS(false);
  
      })
    return;
    
  }

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

  const fetchJobName = async (market) => {
    await   fetch(API_BASE_URL + `allAds/?market=${market}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(red => red.json())
      .then(res => {
          if(res.status){
            if(res.total > 0){
            const JobFl=  res.data.map((el)=>{           
            return {value:{adId:el._id,adName:el.adNameFrench+  "/" + el.adNameRomanian }, label: el._id.slice(el._id.length - 5).toUpperCase() + "-" + el.adNameFrench.toLocaleUpperCase()+ "/" + el.adNameRomanian.toLocaleUpperCase() ,  color: "#FF8B00",name:"ad"}
                
              
              }
    )
    
      setJobName([...JobFl])        }else{
        setJobName([])
      }
          }else{
            setJobName([])
          }
      })
      .catch(err => err)
  }

 

  const onInputFormChange=(e)=>{
    if(e.target.name=== "phoneNumber"){
      let val =e.target.value
    if(JSON.stringify(val).includes("+")){
       setData({...data,[e.target.name]:e.target.value})
    }else{
      setData({...data,[e.target.name]:"+" + e.target.value})
    }
   
    }else if(e.target.name=== "leadPrice"){
      setData({...data,[e.target.name]:e.target.value})
    }else if(e.target.name === "ad"){
      setJobNameAd({...jobNames,ad:e.target.value})
    setData({...data,[e.target.name]:{adId:null,adName:e.target.value}})

    }else{

      setData({...data,[e.target.name]:e.target.value})
  
      }
  }
  const onSelectChange=(e)=>{
    if(e.name === "leadCountryMarket"){
      fetchJobName(e.value)
       setData({...data,[e.name]:e.value})
    }else{
      setData({...data,[e.name]:e.value})
    }
  }

const onSubmit=()=>{
  setBtnDS(true)
  if(data.leadCandidatName === ""){
    toast.error("Please Add Candidate Name!")
  setBtnDS(false)

  }else if(data.leadSource === ""){
    toast.error("Please Add Source!")
  setBtnDS(false)
   
  }
  else if(data.leadCountryMarket === ""){
    toast.error("Please Add Country market!")
  setBtnDS(false)

  }else if(data.leadPrice === ""){
    toast.error("Please Add Euro!")
  setBtnDS(false)
    
  }
  else{
    fetch(API_BASE_URL + "addLead",{
      method: "POST",
      headers: {
        "Accept": 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
      body:JSON.stringify(data)
     })
     .then(res=>res.json())
     .then(res=>{if(res.status){
     toast.success(res.message)
     setBtnDS(false)
     setTimeout(()=>{
      window.location.reload()
     },2000)
     }else{
      toast.error(res.message)
      setBtnDS(false)
     }
      
     })
     .catch(err=>err)
  }

}
    return(<>
    <Toaster     containerStyle={{zIndex:"999999999999999999"}}  position="top-right"/>
     <div className="container-fluid">
        <div className="row">
        <div className="col-12 mt-2" style={{background:"#ffff",borderRadius:"10px"}}>
          <div className="row">
            <div className="col-6">
                    <Link to='/LeadsCenter' className="downLoadCenter p-1 d-flex">
                    <img src={require("../images/return.svg").default} />
                    <h3 className="pl-1 mb-0">ADD LEAD FEATURE</h3>
                    </Link >
                </div>
                <div className="col-6 d-flex align-items-center justify-content-end ">
                  {
                    SelectFormSide ?
                    null :
                    CustomForm ? 
                  <button className="glow-on-hover"  onClick={()=>{setCustomForm(false);setCsvUploadForm(true)}}><img className="filter-green" src={require("../images/switchIcon.svg").default} /> Switch To CSV</button>
                    :
                  <button className="glow-on-hover" onClick={()=>{setCsvUploadForm(false) ;setCustomForm(true)}}><img className="filter-green" src={require("../images/switchIcon.svg").default} /> Switch To Lead Form</button>

                  }
                </div>
                </div>
                </div>
               {
                SelectFormSide ? 
        
   <div className="col-12 mt-2  d-flex justify-content-center align-items-center" style={{borderRadius:"10px",height:"68vh" ,width:"100vw"}} >

    <div className="row justify-content-evenly" style={{width:"100vw"}}>
    <motion.div
  initial={{ scale: 0 }}
  animate={{ rotate: 360, scale:1}}
  transition={{
    type: "spring",
    stiffness: 50,
    damping: 15
  }}
  className="col-4"
  whileHover={{ scale: 1.4 }} whileTap={{ scale: 0.8 }} 
>
    <div className="cursor-pointer d-flex align-items-center justify-content-center AddLeadsFormSelect" onClick={()=>{setSelectFormSide(false); setCustomForm(true)}}  >
      <p className="mb-0 align-items-center">Add Lead Custom Form <img  src={require("../images/nextFwd.png")}  style={{width:"25px",marginLeft:"5px"}}  /></p>
</div>
</motion.div>

<motion.div
  initial={{ scale: 0 }}
  animate={{ rotate:-360, scale:1 }}
  transition={{
    type: "spring",
    stiffness:50,
    damping: 15
  }}
  className="col-4"
  whileHover={{ scale: 1.4 }} whileTap={{ scale: 0.8 }} 
>
<div className=" cursor-pointer d-flex align-items-center justify-content-center AddLeadsFormSelect" onClick={()=>{setSelectFormSide(false);setCsvUploadForm(true)}}  >
<p className="mb-0 align-items-center">Upload CSV<img  src={require("../images/nextFwd.png")}  style={{width:"25px",marginLeft:"5px"}}  /></p>

</div>
</motion.div>

</div>
    </div>
 
                    :

                null
               }
                {
                  CustomForm ?
                  <motion.div
                  initial={{ scale: 0 }}
                  animate={{ rotate: 0, scale:1}}
                  transition={{
                    type: "spring",
                    stiffness: 30,
                    damping: 15
                  }} className="col-12 mt-2 p-1" style={{background:"#ffff",borderRadius:"10px"}}>
                  <div className="row">
                     <div className="col-4">
                         <label className="Form-styling">Country market </label>
                       
                         <Select
                                 name="leadCountryMarket"
                                 closeMenuOnSelect={true}
                                 placeholder="‎ ‎ ‎ ‎ ‎  ‎ Select contry market"
                                 className="basic-multi-select market"
                                 classNamePrefix="select"
                                 onChange={onSelectChange}
                                 options={SelectContry}
                                 styles={colourStyles}
                                 
                               />
                       <span className="text-small pl-1">Options are France; Suisse; Romania (select is enough) required*</span>
                     </div>
                     <div className="col-4">
                     <label className="Form-styling">Candidate Name </label>
                     <input
                         type="text"
                         style={{fontSize:"12px"}} className="form-control nameTransform"
                         placeholder="Candidate Name"
                         id="Candidate_Name"
                         name="leadCandidatName"
                         onChange={onInputFormChange}
                          required
                       />
                       <span className="text-small pl-1">Required*</span>
 
                     </div>
                     <div className="col-4">
                     <label className="Form-styling">Phone Number </label>
                     <input
                         type="text"
                         style={{fontSize:"12px"}} className="form-control nameTransform"
                         placeholder="Phone Number"
                         id="phone_Number"
                         name="phoneNumber"
                         onChange={onInputFormChange}
                         
                       />
                     </div>
                     <div className="col-4 mt-1">
                         <label className="Form-styling">Source </label>
                         <Select
                                 name="leadSource"
                                 closeMenuOnSelect={true}
                                 placeholder="‎ ‎ ‎ ‎ ‎  ‎ e.g. Facebook, TikTok. SEO..."
                                 className="basic-multi-select source"
                                 classNamePrefix="select"
                                 onChange={onSelectChange}
                                 options={fromPerson}
                                 styles={colourStyles}
                               inputId="leadSource"
                               />
                        
                       <span className="text-small pl-1">Options are Facebook; TikTok; SEO; Google Ads; Ejob; Jooble; Olx; Public21; Income Call; Undefined; Taboola; Outbrain; Other; Snapchat; SMS lead (select is enough) required*</span>
                     </div>
                     <div className="col-4 mt-1">
                     <label className="Form-styling">Job Name </label>
                     <div className="col-12">
                       <div className="row">
                         <div className="col-6">
                           <div className="row">
                             <div className="col-2 pl-0 d-flex align-items-center ColorInput">
                         <input type={"radio"} name="jobName" value="true" className="yesNoRadio" onClick={()=>setJobInput(true)} /></div>  <div className="col-10 px-0"><span className="SelectJobAccording">Select job according to job center(active or inactive ads)</span></div>
                         </div> </div>
                       
                         <div className="col-6">
                         <div className="row">
                             <div className="col-2 pl-0 d-flex align-items-center ColorInput">
                         <input type={"radio"} name="jobName" value="false" className="yesNoRadio" onClick={()=>setJobInput(false)} /></div><div className="col-10 px-0"><span className="SelectJobAccording">Custom free text input(Text input no limitation) </span></div>
                          </div>
                          
                           </div>
                           <div className="col-12">
                             {
                               selectJobInput === undefined ?
                               <input type={"text"}   style={{fontSize:"12px"}} className="form-control nameTransform"  placeholder={selectJobInput === undefined ? "Please Select Job Options." : null}  disabled/> 
                               :
                               selectJobInput === true ?
 <Select
                                 name="ad"
                                 closeMenuOnSelect={true}
                                 placeholder="‎ ‎ ‎ ‎ ‎  ‎ Job Name"
                                 className="basic-multi-select lead"
                                 classNamePrefix="select"
                                 onChange={onSelectChange}
                                 options={jobNames}
                                 styles={colourStyles}
                                 inputId="ad"
                               />
                               :
                               <input type={"text"} name="ad"  id="Job_Name" style={{fontSize:"12px"}} 
                         onChange={onInputFormChange}
                         className="form-control nameTransform" placeholder="Job Name" />
                             }
                           
                           </div>
                       </div>
                     </div>
                     </div>
                     <div className="col-4 mt-1">
                     <label className="Form-styling">Email </label>
                     <input
                         type="text"
                         style={{fontSize:"12px"}} className="form-control nameTransform"
                         placeholder="Email"
                         id="email"
                         name="email"
                         onChange={onInputFormChange}
                       
                       />
                     </div>
                     <div className="col-4 mt-1">
                 <label style={{ fontSize: "14px" }} className="Form-styling">
                 Lead Price in euro
                 </label>
                 <input
                 type={"number"}
                   name="leadPrice"
                   placeholder="Num Only."
                   className="form-control nameTransform"
                   onChange={onInputFormChange}
                   value={data.leadPrice}
                   style={{fontSize:"12px"}}
                   id="Lead_Price"
                 />
                       <span className="text-small pl-1">The price we paid for this lead, not required Exemple 12,30</span>
 
               </div>
                     <div className="col-12 d-grid mt-1">
                         <label className="Form-styling">Notes By Leads</label>
                         <textarea name="leadNotes"  style={{fontSize:"12px"}}
                         onChange={onInputFormChange}
                         className="form-control nameTransform" placeholder="Notes" id="Notes_Leads">
                       
                         </textarea>
                     </div>
                     <div className="col-12 d-flex justify-content-end mt-2">
                             <button className="BtnLeads" onClick={()=>onSubmit()} style={{background:btnDS ?  "#3d393935" : "#000"}} disabled={btnDS}>
                               SUBMIT NOW
                             </button>
                         
                     </div>
                  </div>
                     </motion.div>
                  :
                  null
                }

                {
                  CsvUploadForm ?
                 
                  <motion.div
                  initial={{ scale: 0 }}
                  animate={{ rotate: 0, scale:1}}
                  transition={{
                    type: "spring",
                    stiffness: 30,
                    damping: 15
                  }} className="col-12 my-2 p-1" style={{background:"#ffff",borderRadius:"10px",height:"79vh" ,width:"100vw"}}>
                  <div className="row d-grid justify-content-center">
                    <div className="col-12 ">
                      <div className="row justify-content-center">
                     <div className="col-7">
                         <label className="Form-styling">Country market </label>
                       
                         <Select
                                 name="leadCountryMarket"
                                 closeMenuOnSelect={true}
                                 placeholder="‎ ‎ ‎ ‎ ‎  ‎ Select contry market"
                                 className="basic-multi-select market"
                                 classNamePrefix="select"
                                 onChange={onSelectChange}
                                 options={SelectContry}
                                 styles={colourStyles}
                                 
                               />
                       <span className="text-small pl-1">Options are France; Suisse; Romania (select is enough) required*</span>
                     </div>
                    </div>
                    </div>
                    <div className="col-12 ">
                      <div className="row justify-content-center">
                     <div className="col-7 mt-1">
                     <label className="Form-styling">Job Name </label>
                     <div className="col-12">
                       <div className="row">
                         <div className="col-6">
                           <div className="row">
                             <div className="col-2 pl-0 d-flex align-items-center ColorInput">
                         <input type={"radio"} name="jobName" value="true" className="yesNoRadio" onClick={()=>setJobInput(true)} /></div>  <div className="col-10 px-0"><span className="SelectJobAccording">Select job according to job center(active or inactive ads)</span></div>
                         </div> </div>
                       
                         <div className="col-6">
                         <div className="row">
                             <div className="col-2 pl-0 d-flex align-items-center ColorInput">
                         <input type={"radio"} name="jobName" value="false" className="yesNoRadio" onClick={()=>setJobInput(false)} /></div><div className="col-10 px-0"><span className="SelectJobAccording">Custom free text input(Text input no limitation) </span></div>
                          </div>
                          
                           </div>
                           <div className="col-12">
                             {
                               selectJobInput === undefined ?
                               <input type={"text"}   style={{fontSize:"12px"}} className="form-control nameTransform"  placeholder={selectJobInput === undefined ? "Please Select Job Options." : null}  disabled/> 
                               :
                               selectJobInput === true ?
 <Select
                                 name="ad"
                                 closeMenuOnSelect={true}
                                 placeholder="‎ ‎ ‎ ‎ ‎  ‎ Job Name"
                                 className="basic-multi-select lead"
                                 classNamePrefix="select"
                                 onChange={onSelectChange}
                                 options={jobNames}
                                 styles={colourStyles}
                                 inputId="ad"
                               />
                               :
                               <input type={"text"} name="ad"  id="Job_Name" style={{fontSize:"12px"}} 
                         onChange={onInputFormChange}
                         className="form-control nameTransform" placeholder="Job Name" />
                             }
                           
                           </div>
                       </div>
                     </div>
                     </div>
                     </div>
                     </div>
                     <div className="col-12">
                     <div className="row justify-content-center pt-0 pb-1" style={{ marginRight: '1px' }}>
                 
    {progress > 0 && progress < 100  ?
                        <div className="col-7 mx-0">
                        <div className="row CardClassDownload p-0 mt-1 mx-0">
                          <div className="col-4 pr-0 d-flex align-items-center ">
                        <ProfileLoader width={"90"} height={"56px"} fontSize={"12px"} fontWeight={600} Title={"Uploading!"}/>
                          </div>
                          <div className="col-8 text-center  mb-0" style={{marginTop:"21px"}}>
                              <ProgressBar className="mb-0" now={progress} label={`${progress}%`} />
                          </div>
                        
                        </div>
                      </div>
                        :
                      
                 null 
                  

                          }
                         <div className="col-12 d-flex justify-content-center mt-3" >
                <FileUploader 
                handleChange={FilesUploads}
                name="candidatDocuments"
                label={`Upload CSV file Now`}
                />
         
            </div>
                                        
              
                  </div>

                      </div>
                     <div className="col-12 d-flex justify-content-center mt-2">
                             <button className="BtnLeads"style={{background:btnDS ?  "#3d393935" : "#000"}} onClick={()=>onCSVFile()} disabled={btnDS}>
                               SUBMIT NOW
                             </button>
                         
                     </div>
                  </div>
                     </motion.div>

                      
                  :
                  null
                }
              {
                confirmModal ?
                <CSVModal  props={ConfirmModalMessage} closeModal={setConfirmModal} status={statusCSV} />
                :
                null
              }
               
        </div>
    </div>
    </>)
}
export default AddLeads;