import React,{useState,useEffect} from "react";
import Select, { StylesConfig } from "react-select";
import {Link} from "react-router-dom"
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ReactComponent as RatingStar } from "../images/RatingStar.svg";
import { ReactComponent as Empty } from "../images/emptyStar.svg";
import { ReactComponent as France } from "../images/france.svg";
import { ReactComponent as Switzer } from "../images/switzerland.svg";
import { ReactComponent as Romania } from "../images/romania.svg";
import { API_BASE_URL } from "../config/serverApiConfig";
import { ColourOption } from "../Selecteddata/data";
import ProfileLoader from "../components/Loader/ProfilesLoader" 
import { EditorState, convertToRaw } from "draft-js";
import chroma from "chroma-js";
import draftToHtml from "draftjs-to-html";
import {toast ,Toaster} from "react-hot-toast"

let CName=[]
export default function AddReaserch(){
  const [SelectContry]=useState([{
    value:"France",
    label:(<> <France
      style={{ paddingRight: "5px" }}
    /> France </>)
,
color: "#FF8B00",
name:"Contry"
  },{
    value:"Suisse",
    label:(<> <Switzer
      style={{ paddingRight: "5px" }}
    /> Suisse </>)
,
color: "#FF8B00",
name:"Contry"
  },{
    value:"Romania",
    label:(<> <Romania
      style={{ paddingRight: "5px" }}
    /> Romania </>),
    color: "#FF8B00",
    name:"Contry"

  }

])as any
  const [importanceOptions, setImportanceOptions] = useState([  {
    value: "Select Importance",
    label: "Select Importance",
    color: "#FF8B00",
    name:"importance"
  },
  {
    value: "0",
    label: (
      <>
        <RatingStar
          style={{ height: "25px", width: "25px", borderRadius: "30px" }}
        />{" "}
        <Empty
          style={{ height: "25px", width: "25px", borderRadius: "30px" }}
        />{" "}
        <Empty
          style={{ height: "25px", width: "25px", borderRadius: "30px" }}
        />{" "}
        <Empty
          style={{ height: "25px", width: "25px", borderRadius: "30px" }}
        />{" "}
        <Empty
          style={{ height: "25px", width: "25px", borderRadius: "30px" }}
        />
      </>
    ),
    color: "#FF8B00",
    name:"importance"
  },
  {
    value: "1",
    label: (
      <>
        <RatingStar
          style={{ height: "25px", width: "25px", borderRadius: "30px" }}
        />{" "}
        <RatingStar
          style={{ height: "25px", width: "25px", borderRadius: "30px" }}
        />{" "}
        <Empty
          style={{ height: "25px", width: "25px", borderRadius: "30px" }}
        />{" "}
        <Empty
          style={{ height: "25px", width: "25px", borderRadius: "30px" }}
        />{" "}
        <Empty
          style={{ height: "25px", width: "25px", borderRadius: "30px" }}
        />
      </>
    ),
    color: "#FF8B00",
    name:"importance"
  },
  {
    value: "2",
    label: (
      <>
        <RatingStar
          style={{ height: "25px", width: "25px", borderRadius: "30px" }}
        />{" "}
        <RatingStar
          style={{ height: "25px", width: "25px", borderRadius: "30px" }}
        />{" "}
        <RatingStar
          style={{ height: "25px", width: "25px", borderRadius: "30px" }}
        />{" "}
        <Empty
          style={{ height: "25px", width: "25px", borderRadius: "30px" }}
        />{" "}
        <Empty
          style={{ height: "25px", width: "25px", borderRadius: "30px" }}
        />
      </>
    ),
    color: "#FF8B00",
    name:"importance"
  },
  {
    value: "3",
    label: (
      <>
        <RatingStar
          style={{ height: "25px", width: "25px", borderRadius: "30px" }}
        />{" "}
        <RatingStar
          style={{ height: "25px", width: "25px", borderRadius: "30px" }}
        />{" "}
        <RatingStar
          style={{ height: "25px", width: "25px", borderRadius: "30px" }}
        />{" "}
        <RatingStar
          style={{ height: "25px", width: "25px", borderRadius: "30px" }}
        />{" "}
        <Empty
          style={{ height: "25px", width: "25px", borderRadius: "30px" }}
        />
      </>
    ),
    color: "#FF8B00",
    name:"importance"
  },
  {
    value: "4",
    label: (
      <>
        <RatingStar
          style={{ height: "25px", width: "25px", borderRadius: "30px" }}
        />{" "}
        <RatingStar
          style={{ height: "25px", width: "25px", borderRadius: "30px" }}
        />{" "}
        <RatingStar
          style={{ height: "25px", width: "25px", borderRadius: "30px" }}
        />{" "}
        <RatingStar
          style={{ height: "25px", width: "25px", borderRadius: "30px" }}
        />{" "}
        <RatingStar
          style={{ height: "25px", width: "25px", borderRadius: "30px" }}
        />
      </>
    ),
    color: "#FF8B00",
    name:"importance"
  },]) as any;

  
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
  const [clients, setClients] = useState([]);
  const [btnDS,setBtnDS]=useState(false)
  const [onEditorStateChange, setOnEditorStateChange] = useState()as any
  const [data,setData]=useState(
    {
      adCountryMarket :"", // string
      adNameFrench :"", // string
      adNameRomanian :"", // string
      adImportance :null, // number 
      adDescription:"", // string
      clients:[]
    }
  )

  useEffect(() => {
    if (clients.length == 0) {
      fetchClients()
        .then(result => {
          if (result.status) {
         
        CName=    result.data.map((el)=>{
         return { value:el._id,label:el.clientCompanyName + `-(${el.jobStatus})`,color:  '#FF8B00',name:"clientName"}            })
    }
    setClients([...CName])
        })
     
        .catch(err => {
          console.log(err)
        })
    }
  },[clients])

  const onInputChange = (e) => {
    if(e.target.name === "JobFrench"){
      setData({...data,adNameFrench:e.target.value})
  
    }
    if(e.target.name === "JobINRomanian"){
      setData({...data,adNameRomanian:e.target.value})
  
    }
  };

  const SelectOnChange=(e)=>{
 if(e.name === "Contry"){
  setData({...data,adCountryMarket:e.value})
 }
 else if (e.name === "importance"){
  setData({...data,adImportance:e.value})
}
else {
const ClF=  e.map((el)=>(
  el.value
))
setData({...data,clients:ClF})

}  
  }

  
  const fetchClients = () => {
    return fetch(API_BASE_URL + "getClients", {
      method: "GET",
      headers: {
        "Accept": 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
    })
      .then(red => red.json())
      .then(d => d)
      .catch(err => err)
  }

  const OnSubmit=()=>{
    setBtnDS(true)
     fetch(API_BASE_URL + "addAd",{
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
      setBtnDS(false)
      window.location.reload()
     },2000)
     }else{
      toast.success(res.message)
      setBtnDS(false)
     }
      
     })
     .catch(err=>err)
  }
 
    return(<>
    <Toaster     containerStyle={{zIndex:"999999999999999999"}}  position="top-right"/>
     <div className="container-fluid">
        <div className="row">
        <div className="col-12 mt-2" style={{background:"#ffff",borderRadius:"10px"}}>
                    <Link to='/JobAdsCenter' className="downLoadCenter p-1 d-flex">
                    <img src={require("../images/return.svg").default} />
                    <h3 className="pl-1 mb-0">add a new reaserch </h3>
                    </Link >
                </div>
                <div className="col-12 mt-2 p-1" style={{background:"#ffff",borderRadius:"10px"}}>
                 <div className="row">
                    <div className="col-4">
                        <label className="Form-styling" >select contry market (select) </label>
                        <Select
                                name="market"
                                closeMenuOnSelect={true}
                                placeholder="‎ ‎ ‎ ‎ ‎  ‎ Select contry market"
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={SelectOnChange}
                                options={SelectContry}
                                styles={colourStyles}
                                id="market_Contry"
                              />
                      <span className="text-small">Options are France; Suisse; Romania (select is enough) required*</span>
                    </div>
                    <div className="col-4">
                    <label className="Form-styling">Job name in french</label>
                    <input
                        type="text"
                        style={{fontSize:"12px"}} className="form-control nameTransform"
                        placeholder="Job Name in french"
                        id="JobName"
                        name="JobFrench"
                        onChange={onInputChange}
                        
                      />
                      <span className="text-small">Options are France; Suisse; Romania (select is enough) required*</span>

                    </div>
                    <div className="col-4">
                    <label className="Form-styling">Job name in romanian</label>
                    <input
                        type="text"
                        style={{fontSize:"12px"}} className="form-control nameTransform"
                        placeholder="Job Name in Romanian"
                        id="JobRoman"
                        name="JobINRomanian"
                        onChange={onInputChange}
                        
                      />
                      <span className="text-small">Options are France; Suisse; Romania (select is enough) required*</span>

                    </div>
                    <div className="col-4 mt-1">
                    <label className="Form-styling">importance </label>
                    <Select
                                name="ClientLicencePermis"
                                closeMenuOnSelect={true}
                                placeholder="‎ ‎ ‎ Select Importance"
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={SelectOnChange}
                                options={importanceOptions}
                                styles={colourStyles}
                                id="importance"
                              />
                    </div>
                    <div className="col-4 mt-1">
                        <label className="Form-styling">link a client to this ad (client selector) </label>
                        {clients.length > 0 ?

<Select 
options={clients}
onChange={SelectOnChange}
styles={colourStyles}
className="inProgress"
isMulti
placeholder="Link a client to this ad"
id="Clients"
/>

:
<div className="col-12">    <ProfileLoader  width ={150} height={100} fontSize={"12px"} fontWeight={"600"}  Title={"Please Wait!"}/>     </div>}   
                      <span className="text-small">Options are Facebook; TikTok; SEO; Google Ads; Ejob; Jooble; Olx; Public21; Income Call; Undefined; Taboola; Outbrain; Other; Snapchat; SMS lead (select is enough) required*</span>
                    </div>
               
             
                    <div className="col-12 d-grid mt-1">
                        <label className="Form-styling">text area for job descrption</label>
                        <div className="mb-1 " style={{border: "1px solid #e5e5e5",borderRadius:"10px"}}>
                        <Editor
//   editorState={editorState}
  toolbarClassName="toolbarClassName"
  wrapperClassName="wrapperClassName"
  editorClassName="editorClassName"
  
  
  onEditorStateChange={newState => {
    setOnEditorStateChange(newState)
    setData({...data,adDescription:draftToHtml(convertToRaw(newState.getCurrentContent()))})
}}
/>
</div>
                    </div>
                    <div className="col-12 d-flex justify-content-end mt-2">
                            <button className="BtnLeads" onClick={(e)=>OnSubmit()} disabled={btnDS}>
                            add this reaserch
                            </button>
                        
                    </div>
                 </div>
                    </div>
        </div>
    </div>
    </>)
}