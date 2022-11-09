import React,{useState} from "react";
import Select, { StylesConfig } from "react-select";
import {Link} from "react-router-dom"
import { ColourOption } from "../Selecteddata/data";
import chroma from "chroma-js";
import { ReactComponent as France } from "../images/france.svg";
import { ReactComponent as Switzer } from "../images/switzerland.svg";
import { ReactComponent as Romania } from "../images/romania.svg";
import {API_BASE_URL} from "../config/serverApiConfig"
import {toast ,Toaster} from "react-hot-toast"
function AddLeads(){
  const [SelectContry]=useState([{
    value:"France",
    label:(<> <France
      style={{ paddingRight: "5px" }}
    /> France </>)
,
color: "#FF8B00",
name:"leadCountryMarket"
  },{
    value:"Suisse",
    label:(<> <Switzer
      style={{ paddingRight: "5px" }}
    /> Suisse </>)
,
color: "#FF8B00",
name:"leadCountryMarket"
  },{
    value:"Romania",
    label:(<> <Romania
      style={{ paddingRight: "5px" }}
    /> Romania </>),
    color: "#FF8B00",
    name:"leadCountryMarket"

  }

])as any

const [jobNames,setJobName]=useState([])

const [fromPerson]=useState ([ {value: 'TikTok', label: 'TikTok',name:"leadSource", color:  '#FF8B00' },
{  value: 'Facebook', label: 'Facebook', name:"leadSource", color:  '#FF8B00', },
{value: 'Google Ads', label: 'Google Ads',name:"leadSource", color: '#FF8B00' },
{value: 'Bing Ads', label: 'Bing Ads',name:"leadSource", color: '#FF8B00'  },
{  value: 'Linkedin', label: 'Linkedin', name:"leadSource", color:  '#FF8B00', },
{value: 'Sanpchat', label: 'Sanpchat',name:"leadSource", color: '#FF8B00' },
])
  const [selectJobInput,setJobInput]=useState()as any
  const [data,setData]=useState({
    leadCountryMarket:"",
    leadCandidatName:"",
    phoneNumber:"",
    leadSource:"",
    adName:"",
    email:"",
    leadPrice:"",
    leadNotes:""
  })
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
              
                               
            return {value:el.adNameFrench+  "/" + el.adNameRomanian , label: el.adNameFrench.toLocaleUpperCase()+ "/" + el.adNameRomanian.toLocaleUpperCase() ,  color: "#FF8B00",name:"adName"}
                
              
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
    setData({...data,[e.target.name]:e.target.value})
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
   setTimeout(()=>{
    window.location.reload()
   },2000)
   }else{
    toast.success(res.message)
   }
    
   })
   .catch(err=>err)
}
    return(<>
    <Toaster     containerStyle={{zIndex:"999999999999999999"}}  position="top-right"/>
     <div className="container-fluid">
        <div className="row">
        <div className="col-12 mt-2" style={{background:"#ffff",borderRadius:"10px"}}>
                    <Link to='/LeadsCenter' className="downLoadCenter p-1 d-flex">
                    <img src={require("../images/return.svg").default} />
                    <h3 className="pl-1 mb-0">ADD LEAD FEATURE</h3>
                    </Link >
                </div>
                <div className="col-12 mt-2 p-1" style={{background:"#ffff",borderRadius:"10px"}}>
                 <div className="row">
                    <div className="col-4">
                        <label className="Form-styling" >Country market </label>
                      
                        <Select
                                name="leadCountryMarket"
                                closeMenuOnSelect={true}
                                placeholder="‎ ‎ ‎ ‎ ‎  ‎ Select contry market"
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={onSelectChange}
                                options={SelectContry}
                                styles={colourStyles}
                              />
                      <span className="text-small">Options are France; Suisse; Romania (select is enough) required*</span>
                    </div>
                    <div className="col-4">
                    <label className="Form-styling">Name </label>
                    <input
                        type="text"
                        style={{fontSize:"12px"}} className="form-control nameTransform"
                        placeholder="Name"
                        id="validationCustom01"
                        name="leadCandidatName"
                        onChange={onInputFormChange}

                      />
                      <span className="text-small">Options are France; Suisse; Romania (select is enough) required*</span>

                    </div>
                    <div className="col-4">
                    <label className="Form-styling">Phone Number </label>
                    <input
                        type="text"
                        style={{fontSize:"12px"}} className="form-control nameTransform"
                        placeholder="Phone Number"
                        id="validationCustom01"
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
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={onSelectChange}
                                options={fromPerson}
                                styles={colourStyles}
                              />
                       
                      <span className="text-small">Options are Facebook; TikTok; SEO; Google Ads; Ejob; Jooble; Olx; Public21; Income Call; Undefined; Taboola; Outbrain; Other; Snapchat; SMS lead (select is enough) required*</span>
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
                                name="adName"
                                closeMenuOnSelect={true}
                                placeholder="‎ ‎ ‎ ‎ ‎  ‎ Job Name"
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={onSelectChange}
                                options={jobNames}
                                styles={colourStyles}
                              />
                              :
                              <input type={"text"} name="adName"  style={{fontSize:"12px"}} 
                        onChange={onInputFormChange}
                        className="form-control nameTransform" placeholder="Job Name" />
                            }
                          
                          </div>
                      </div>
                    </div>
                  
                      <span className="text-small pl-1">Select input or give the option to text input; required*</span>

                    </div>
                    <div className="col-4 mt-1">
                    <label className="Form-styling">Email </label>
                    <input
                        type="text"
                        style={{fontSize:"12px"}} className="form-control nameTransform"
                        placeholder="Email"
                        id="validationCustom01"
                        name="email"
                        onChange={onInputFormChange}
                      
                      />
                    </div>
                    <div className="col-4 mt-1">
                <label style={{ fontSize: "14px" }} className="Form-styling">
                Lead Price in euro
                </label>
                <input
                  name="leadPrice"
                  placeholder="Lead Price"
                  className="form-control nameTransform"
                  onChange={onInputFormChange}
                  style={{fontSize:"12px"}}
                />
              </div>
                    <div className="col-12 d-grid mt-1">
                        <label className="Form-styling">Notes By Leads</label>
                        <textarea name="leadNotes"  style={{fontSize:"12px"}}
                        onChange={onInputFormChange}
                        className="form-control nameTransform" placeholder="Notes">

                        </textarea>
                    </div>
                    <div className="col-12 d-flex justify-content-end mt-2">
                            <button className="BtnLeads" onClick={()=>onSubmit()}>
                              SUBMIT NOW
                            </button>
                        
                    </div>
                 </div>
                    </div>
        </div>
    </div>
    </>)
}
export default AddLeads;