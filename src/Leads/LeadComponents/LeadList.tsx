import React,{useEffect, useState} from "react";
import format from 'date-fns/format'
import NotesModal from "../Modal/NotesModal";
import ConfirmDelete from "../Modal/ConfirmDelete";
import NotesEditModal from "../Modal/EditNotes";
import {API_BASE_URL} from "../../config/serverApiConfig"
import toast, { Toaster } from "react-hot-toast";
let NewCdate;
function LeadList({props,Update,Load,Lead}){
  const [NoteModal,setNotesModal] =useState(false)
  const [NoteEditModal,setNoteEditsModal] =useState(false)
  const [NoteDeleteModal,setNotesDeleteModal] =useState(false)

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


     
const   DeleteLeads=async(Id)=>{
  let data={
    leadId:Id
  }
  Load(false)
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
        Lead([])
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
 
console.log(LeadeCreateDate)
    return(<>
    <Toaster  position="top-right"   containerStyle={{zIndex:"30443330099555"}}   />
    <div className="row px-1 mt-1" style={{width:"135%"}}>
     <div className="col-12 lead_Created"><div className="row"><div className="col-7"><p className="mb-0 "><img  src={require("../../images/calendar.png")} style={{width:"12px",marginRight:"4px"}} />Lead Created on {LeadeCreateDate}</p></div><div className="col-5 d-flex justify-content-end align-items-center"><button className="AddToCrm mb-0">add to crm</button><button className="deleteAd mx-1" onClick={()=>DeleteLeads(props._id)} ><img   src={require("../../images/Deletebucket.svg").default}  /></button></div>

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
             <div className="col-3 leadBox">
                <p className="mb-0">{props.phoneNumber ? props.phoneNumber : "✘✘!"}</p>
             </div>
             <div className="col-3 leadBox d-grid">
                <p className="mb-0">{props.email ? props.email : "✘✘!"}</p>
                <span className="BlueLink">Send What’s app</span>
             </div>
            </div>
            </div>
            <div className="col-4 d-grid leadBoxX">
                <h5 className="mb-0">Notes by Leads</h5>
                <p>{props.leadNotes ? props.leadNotes : "✘✘!"}</p>
                <a href="" className="BlueLink">Click Here to View More</a>
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
              <div className="row PrECONTACTEDInput mt-1">
                <div className="col-3 pr-0 d-flex justify-content-center align-items-center " ><input type={"radio"} /><p className="my-0" style={{paddingLeft:"2px"}}>No</p></div>
                <div className="col-4 px-0 d-flex justify-content-center align-items-center"> <input type={"radio"} /><p className="my-0" style={{paddingLeft:"2px"}}>Interested</p></div>
                <div className="col-5 px-0 d-flex justify-content-center align-items-center"> <input type={"radio"} /><p className="my-0" style={{paddingLeft:"2px"}}>Not Interested</p></div>
              </div>
            </div>
            <div className="col-4 d-grid PrECONTACTED">
              <p className="mb-0 ">Contacted by Agency</p>
              <span>(BY Benjamin)</span>
              <div className="row PrECONTACTEDInput mt-1">
                <div className="col-2 pr-0 d-flex justify-content-center align-items-center " ><input type={"radio"} /><p className="my-0" style={{paddingLeft:"2px"}}>No</p></div>
                <div className="col-2 px-0 d-flex justify-content-end align-items-center"> <input type={"radio"} /><p className="my-0" style={{paddingLeft:"2px"}}>Yes</p></div>
                <div className="col-3 px-0 d-flex justify-content-end align-items-center"> <input type={"radio"} /><p className="my-0" style={{paddingLeft:"2px"}}>Recall</p></div>
                <div className="col-5 px-0 d-flex justify-content-center align-items-center"> <input type={"radio"} /><p className="my-0" style={{paddingLeft:"2px"}}>Phone Closed</p></div>
              </div>
            </div>
            <div className="col-4 d-grid PrECONTACTED ">
                <div className="row">
                    <div className="col-6" style={{
    borderRight: "1px solid #ffff"
                    }}>
              <p className="mb-0 ">Added to CRM</p>
              <div className="row PrECONTACTEDInput mt-1 " style={{height:"74%"}}>
                <div className="col-4 pr-0  d-flex justify-content-center align-items-center " ><input type={"radio"} name="Added_to_CRM" value="no" className="yesNoRadio" /><p className="my-0" style={{paddingLeft:"2px"}}>No</p></div>
                <div className="col-8  d-flex justify-content-start align-items-center"> <input type={"radio"} name="Added_to_CRM"  value="yes" className="yesNoRadio" /><p className="my-0" style={{paddingLeft:"2px"}}>Yes</p></div>
                            </div>
            </div>
            <div className="col-6 pr-2">
              <p className="mb-0 ">QUALIFIED</p>
              <div className="row PrECONTACTEDInput mt-2">
                <div className="col-4 pr-0 d-flex justify-content-start align-items-center " ><input type={"radio"} /><p className="my-0" style={{paddingLeft:"2px"}}>?</p></div>
                <div className="col-4 d-flex justify-content-start align-items-center"> <input type={"radio"} /><p className="my-0" style={{paddingLeft:"2px"}}>😟</p></div>
                <div className="col-4 d-flex justify-content-start align-items-center"> <input type={"radio"} /><p className="my-0" style={{paddingLeft:"2px"}}>😊</p></div>
                <div className="col-4 d-flex justify-content-start align-items-center" style={{marginTop:"5px"}}> <input type={"radio"} /><p className="my-0" style={{paddingLeft:"2px"}}>🙁</p></div>
                <div className="col-4 d-flex justify-content-start align-items-center" style={{marginTop:"5px"}}> <input type={"radio"} /><p className="my-0" style={{paddingLeft:"2px"}}>🥰</p></div>
                <div className="col-4 d-flex justify-content-start align-items-center" style={{marginTop:"5px"}}> <input type={"radio"} /><p className="my-0" style={{paddingLeft:"2px"}}>😍</p></div>

                       </div>
            </div>
            </div>
            </div>
          </div>
        </div>
        <div className="col-4 d-grid NotesAgency">
        <p className="mb-0">Notes by Agency</p>
        <span className="mb-0">This is an example note, This is an example note This is an example note, This is an example note....</span>
        <button  onClick={()=>{setNotesModal(true)}} className="BlueLink d-flex" style={{background:"transparent",border:"0px"}}>Click Here to View More</button>
        </div>
     </div>
     </div>
    </div>
    {NoteEditModal ?
            <NotesEditModal closeModal={setNoteEditsModal}  />
:
null

    }
      {
            NoteModal?

            <NotesModal  closeModal={setNotesModal} /> 
                       :
            null
          }
              {NoteDeleteModal ?
                   <ConfirmDelete closeModal={setNotesDeleteModal}  />
          
:
null

    }
    
    <div className="row">
        
        </div>    
    </>)
}
export default LeadList;