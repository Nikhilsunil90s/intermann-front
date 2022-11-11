import React,{useEffect, useState} from "react";
import format from 'date-fns/format'
import NotesModal from "../Modal/NotesModal";
import ConfirmDelete from "../Modal/ConfirmDelete";
import NotesEditModal from "../Modal/EditNotes";
import {API_BASE_URL} from "../../config/serverApiConfig"
import toast, { Toaster } from "react-hot-toast";
let NewCdate;
function LeadList({props,Update,Load,Lead,length}){
  const LoginUser=JSON.parse(localStorage.getItem("LoginUser"))
  const [LoginUserS,setLoginUser]=useState(LoginUser)
  const [NoteModal,setNotesModal] =useState(false)
  const [NoteEditModal,setNoteEditsModal] =useState(false)
  const [NoteDeleteModal,setNotesDeleteModal] =useState(false)
  const [LeadNotes,setLeadsNote]=useState("")

  const [LeadeCreateDate,setLeadeCreateDate]=useState()as any
  var today =props.createdAt.slice(0,10);
useEffect(()=>{
  if(today){
    let tempdate =new Date(today)
      let Month= tempdate.getMonth()+1
     NewCdate=[tempdate.getDate(),Month,tempdate.getFullYear()].join("-")
    setLeadeCreateDate(NewCdate)
  }
},[])

const AddToCRM=(date)=>{
  fetch(API_BASE_URL + `addLeadToCRM`,
  {
  method: "POST",
  headers: {
      "Accept": 'application/json',
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + localStorage.getItem('token')
  },
  body: JSON.stringify(date),
}
  )
  .then((res)=>res.json())
  .then(res=>{
    if(res.status){
      toast.success(res.message)
      Lead([])
       Update(true)
setTimeout(()=>{
  Load(true)
},2000)
    }else{
      toast.error(res.message)
    }
  })
  .catch(err => err)
}
 

const PreContact=(id,status)=>{
  fetch(API_BASE_URL + `changePreContactedStatus/?userId=${LoginUserS._id}&leadId=${id}&status=${status}`,
  {
    method: "GET",
    headers: {
      "Accept": 'application/json',
      "Authorization": "Bearer " + localStorage.getItem('token')
    }
  }
  )
  .then((res)=>res.json())
  .then(res=>{
    if(res.status){
      toast.success(res.message)
    }else{
      toast.error(res.message)
    }
  })
  .catch(err => err)
}
const ContAgency=(id,status)=>{
  fetch(API_BASE_URL + `changeLeadContactedStatus/?userId=${LoginUserS._id}&leadId=${id}&status=${status}`,
  {
    method: "GET",
    headers: {
      "Accept": 'application/json',
      "Authorization": "Bearer " + localStorage.getItem('token')
    }
  }
  )
  .then((res)=>res.json())
  .then(res=>{
    if(res.status){
      toast.success(res.message)
    }else{
      toast.error(res.message)
    }
  })
  .catch(err => err)
}
const QUALIFIED=(id,status)=>{
  fetch(API_BASE_URL + `changeQualifiedValue/?userId=${LoginUserS._id}&leadId=${id}&value=${status}`,
  {
    method: "GET",
    headers: {
      "Accept": 'application/json',
      "Authorization": "Bearer " + localStorage.getItem('token')
    }
  }
  )
  .then((res)=>res.json())
  .then(res=>{
    if(res.status){
      toast.success(res.message)
    }else{
      toast.error(res.message)
    }
  })
  .catch(err => err)
}

const OnChangeRadio=(e,id)=>{
     if(e.target.name=== `preContact${length}`){
      
      PreContact(id,e.target.value)
     }
     if(e.target.name=== `CAgency${length}`){
      
      ContAgency(id,e.target.value)
     }
     if(e.target.name=== `QUALIFIED${length}`){
      
       QUALIFIED(id,e.target.value)
     }
     if(e.target.name === `Added_to_CRM${length}`){
       
     }
}

const AddToCrm=()=>{
  let data={
    leadId :props._id, 
    candidatName:props.leadCandidatName,
     candidatEmail:props.email ? props.email :"", 
     candidatPhone:props.phoneNumber ? props.phoneNumber :"",
      leadNotes:props.leadNotes ? props.leadNotes : "", 
      agencyNotes:""
  }
AddToCRM(data)
}
     
const   DeleteLeads=async(Id)=>{
  let data={
    leadId:Id
  }
  // Load(false)
 await fetch(API_BASE_URL + `deleteLead`,{
   method: "POST",
   headers: {
     "Accept": 'application/json',
     'Content-Type': 'application/json',
     "Authorization": "Bearer " + localStorage.getItem('token')
   },
   body:JSON.stringify(data)
 })
   .then(red => red.json())
   .then(resData => {
      if(resData.status){
        toast.success(resData.message)
        // Lead([])
       Update(true)
setTimeout(()=>{
  Load(true)
},2000)
      }else{
      //  Update(true)
       toast.error(resData.message)

      }
   })
   .catch(err => err)
 }

    return(<>
    <Toaster  position="top-right"   containerStyle={{zIndex:"30443330099555"}}   />
    <div className="row px-1 mt-1" style={{width:"135%"}}>
     <div className="col-12 lead_Created"><div className="row"><div className="col-7"><p className="mb-0 "><img  src={require("../../images/calendar.png")} style={{width:"12px",marginRight:"4px"}} />Lead Created on {LeadeCreateDate}</p></div><div className="col-5 d-flex justify-content-end align-items-center"><button className="AddToCrm mb-0" onClick={()=>AddToCrm()}>add to crm</button><button className="deleteAd mx-1" onClick={()=>DeleteLeads(props._id)} ><img   src={require("../../images/Deletebucket.svg").default}  /></button></div>

     </div></div>
     <div className="col-12">
        <div className="row">
            <div className="col-8">
                <div className="row justify-content-between">
             <div className="col-2 leadBox">
                <p className="mb-0">{props.adName ? props.adName.toLocaleUpperCase() : "✘✘!"}</p>
             </div>
             <div className="col-2 leadBox">
                <p className="mb-0">{props.leadSource ? props.leadSource  : ""}</p>
             </div>
             <div className="col-2 leadBox">
                <p className="mb-0">{props.leadCandidatName ? props.leadCandidatName.toLocaleUpperCase()  : "✘✘!"}</p>
             </div>
             <div className="col-3 leadBox d-grid">
                <p className="mb-0">{props.phoneNumber ? props.phoneNumber : "✘✘!"}</p>
                <a href={`https://wa.me/${props.phoneNumber}`} target="_blank" className="BlueLink">Send What’s app</a>
             </div>
             <div className="col-3 leadBox " style={{maxWidth:"23%"}}>
                <p className="mb-0">{props.email ? props.email : "✘✘!"}</p>
              
             </div>
            </div>
            </div>
            <div className="col-4 d-grid leadBoxX">
                <h5 className="mb-0">Notes by Leads</h5>
                <p>{props.leadNotes ? props.leadNotes : "✘✘No Notes!"}</p>
                <button onClick={()=>{setLeadsNote("Leads");setNotesModal(true)}} className="BlueLink">Click Here to View More</button>
            </div>
        </div>
     </div>
     <div className="col-12 leadBottom">
     <div className="row">
        <div className="col-8">
          <div className="row">
            <div className="col-4 d-grid PrECONTACTED">
              <p className="mb-0 ">PrECONTACTED</p>
              <span>(BY Dana)</span>
              <div className="row PrECONTACTEDInput mt-1" >
                <div className="col-3 pr-0 d-flex justify-content-center align-items-center " ><input type={"radio"} className="cursor-pointer"  name={`preContact${length}`} value={"No"} onChange={(e)=>OnChangeRadio(e,props._id)} defaultChecked={props.leadPreContacted === "No" ? true : false } /><p className="my-0" style={{paddingLeft:"2px"}}>No</p></div>
                <div className="col-4 px-0 d-flex justify-content-center align-items-center"> <input type={"radio"} className="cursor-pointer"   name={`preContact${length}`} value={"Interested"} onChange={(e)=>OnChangeRadio(e,props._id)} defaultChecked={props.leadPreContacted === "Interested" ? true : false } /><p className="my-0" style={{paddingLeft:"2px"}}>Interested</p></div>
                <div className="col-5 px-0 d-flex justify-content-center align-items-center"> <input type={"radio"} className="cursor-pointer"  name={`preContact${length}`} value={"Not Interested"} onChange={(e)=>OnChangeRadio(e,props._id)}  defaultChecked={props.leadPreContacted === "Not Interested" ? true : false } /><p className="my-0" style={{paddingLeft:"2px"}}>Not Interested</p></div>
              </div>
            </div>
            <div className="col-4 d-grid PrECONTACTED">
              <p className="mb-0 ">Contacted by Agency</p>
              <span>(BY Benjamin)</span>
              <div className="row PrECONTACTEDInput mt-1">
                <div className="col-2 pr-0 d-flex justify-content-center align-items-center " ><input type={"radio"} className="cursor-pointer" name={`CAgency${length}`} defaultChecked={props.leadContactedByAgency== "No" ? true : false} onChange={(e)=>OnChangeRadio(e,props._id)} value="No"/><p className="my-0" style={{paddingLeft:"2px"}}>No</p></div>
                <div className="col-2 px-0 d-flex justify-content-end align-items-center"> <input type={"radio"} className="cursor-pointer" name={`CAgency${length}`} defaultChecked={props.leadContactedByAgency== "Yes" ? true : false} onChange={(e)=>OnChangeRadio(e,props._id)} value="Yes"/><p className="my-0" style={{paddingLeft:"2px"}}>Yes</p></div>
                <div className="col-3 px-0 d-flex justify-content-end align-items-center"> <input type={"radio"} className="cursor-pointer" name={`CAgency${length}`} defaultChecked={props.leadContactedByAgency== "Recall" ? true : false} onChange={(e)=>OnChangeRadio(e,props._id)} value="Recall"/><p className="my-0" style={{paddingLeft:"2px"}}>Recall</p></div>
                <div className="col-5 px-0 d-flex justify-content-center align-items-center"> <input type={"radio"} className="cursor-pointer" name={`CAgency${length}`} defaultChecked={props.leadContactedByAgency== "Phone Closed" ? true : false} onChange={(e)=>OnChangeRadio(e,props._id)} value="Phone Closed"/><p className="my-0" style={{paddingLeft:"2px"}}>Phone Closed</p></div>
              </div>
            </div>
            <div className="col-4 d-grid PrECONTACTED ">
                <div className="row">
                    <div className="col-6" style={{
    borderRight: "1px solid #ffff"
                    }}>
              <p className="mb-0 ">Added to CRM</p>
              <div className="row PrECONTACTEDInput mt-1 " style={{height:"74%"}}>
                <div className="col-4 pr-0  d-flex justify-content-center align-items-center " ><input type={"radio"}  name={`Added_to_CRM${length}`} onChange={(e)=>OnChangeRadio(e,props._id)}  className="cursor-pointer yesNoRadio"  defaultChecked={props.leadAddedToCRM === false ? true : false}/><p className="my-0" style={{paddingLeft:"2px"}}>No</p></div>
                <div className="col-8  d-flex justify-content-start align-items-center"> <input type={"radio"} name={`Added_to_CRM${length}`}  onChange={(e)=>OnChangeRadio(e,props._id)}  className="cursor-pointer yesNoRadio" defaultChecked={props.leadAddedToCRM === true ? true : false} /><p className="my-0" style={{paddingLeft:"2px"}}>Yes</p></div>
                            </div>
            </div>
            <div className="col-6 pr-2">
              <p className="mb-0 ">QUALIFIED</p>
              <div className="row PrECONTACTEDInput mt-2">
                <div className="col-4 pr-0 d-flex justify-content-start align-items-center " ><input type={"radio"} className="cursor-pointer" name={`QUALIFIED${length}`} onChange={(e)=>OnChangeRadio(e,props._id)} defaultChecked={props.leadQualified === 0  ? true : false} value={"0"} /><p className="my-0" style={{paddingLeft:"2px"}}>?</p></div>
                <div className="col-4 d-flex justify-content-start align-items-center"> <input type={"radio"} className="cursor-pointer" name={`QUALIFIED${length}`} onChange={(e)=>OnChangeRadio(e,props._id)} defaultChecked={props.leadQualified === 1 ? true : false} value={"1"} /><p className="my-0" style={{paddingLeft:"2px"}}>😟</p></div>
                <div className="col-4 d-flex justify-content-start align-items-center"> <input type={"radio"} className="cursor-pointer" name={`QUALIFIED${length}`} onChange={(e)=>OnChangeRadio(e,props._id)} defaultChecked={props.leadQualified === 2 ? true : false} value={"2"} /><p className="my-0" style={{paddingLeft:"2px"}}>😊</p></div>
                <div className="col-4 d-flex justify-content-start align-items-center" style={{marginTop:"5px"}}> <input type={"radio"} className="cursor-pointer" name={`QUALIFIED${length}`} onChange={(e)=>OnChangeRadio(e,props._id)} defaultChecked={props.leadQualified === 3 ? true : false} value={"3"} /><p className="my-0" style={{paddingLeft:"2px"}}>🥰</p></div>
                <div className="col-4 d-flex justify-content-start align-items-center" style={{marginTop:"5px"}}> <input type={"radio"} className="cursor-pointer" name={`QUALIFIED${length}`} onChange={(e)=>OnChangeRadio(e,props._id)} defaultChecked={props.leadQualified === 4 ? true : false} value={"4"} /><p className="my-0" style={{paddingLeft:"2px"}}>😍</p></div>

                       </div>
            </div>
            </div>
            </div>
          </div>
        </div>
        <div className="col-4 d-grid NotesAgency">
        <p className="mb-0">Notes by Agency</p>
        <span className="mb-0">{props.agencyNotes !=="" ? props.agencyNotes : "✘✘No Notes!"}</span>
        <button  onClick={()=>{setLeadsNote("Agency");props.agencyNotes !=="" ? setNotesModal(true) : setNoteEditsModal(true)}} className="BlueLink d-flex" style={{background:"transparent",border:"0px"}}>Click Here to View More</button>
        </div>
     </div>
     </div>
    </div>
    {NoteEditModal ?
            <NotesEditModal closeModal={setNoteEditsModal} props={props} update={Update} Load={Load} deleteModal={setNotesDeleteModal} Notes={LeadNotes} />
:
null

    }
      {
            NoteModal?

            <NotesModal  closeModal={setNotesModal} props={props} EditModal={setNoteEditsModal}  deleteModal={setNotesDeleteModal} Notes={LeadNotes}  /> 
                       :
            null
          }
              {NoteDeleteModal ?
                   <ConfirmDelete closeModal={setNotesDeleteModal} props={props}  update={Update}  Load={Load}  Notes={LeadNotes}   />
          
:
null

    }
    
    <div className="row">
        
        </div>    
    </>)
}
export default LeadList;