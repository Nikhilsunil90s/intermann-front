import React, { useState } from "react";
import { useNavigate } from "react-router";
import parse from 'html-react-parser';
import { API_BASE_URL } from "../../config/serverApiConfig";
import {toast ,Toaster} from "react-hot-toast"
import DeleteModal from '../../JobAdsCenter/Components/modal/ConfirmDeleteModal'
import Cookies from "js-cookie"

export default function JobsCard({bg,props,setUpdateField}){
  const navigate = useNavigate()
 let Text =props.adDescription ;
const [btnDS,setbtnDS]=useState(false)
const [deleteModal ,setModal]=useState(false)
 const  ModifyAdStatus=async(e,id)=>{
    // setUpdateField()
    setbtnDS(true)
    if(e.target.name==="MoveInActive"){
        return    await fetch(API_BASE_URL + `modifyAdStatus/?adId=${id}&currentStatus=${bg}`,{
            method: "GET",
            headers: {
              "Accept": 'application/json',
              'Content-Type': 'application/json',
              "Authorization": "Bearer " + Cookies.get('token')
            },
          })
            .then(red => red.json())
            .then(resData =>{
              if(resData.status){
                  setUpdateField(true)
          setbtnDS(false)
      
                  toast.success(resData.message)
              }else{
                  toast.success(resData.message)
                  setbtnDS(false)
      
              }
            })
            .catch(err => err)
    }else{
        return    await fetch(API_BASE_URL + `deleteAd/?adId=${id}`,{
            method: "GET",
            headers: {
              "Accept": 'application/json',
              'Content-Type': 'application/json',
              "Authorization": "Bearer " + Cookies.get('token')
            },
          })
            .then(red => red.json())
            .then(resData =>{
              if(resData.status){
                  setUpdateField(true)
          setbtnDS(false)
      
                  toast.success(resData.message)
              }else{
                  toast.success(resData.message)
                  setbtnDS(false)
      
              }
            })
            .catch(err => err)
    }

    }

    const EditCard =()=>{
        navigate("/JobAdsCenter/EditPage",{state:props})
    }
    return(<>
    <div className="row  px-1 py-1 jobCardBox" style={{background:bg == "Active"? "#EDF7FF" : "#FFE0E0"}}>
        <div className="col-4 bgW" style={{background:bg === "Active" ? "#fff" : "#F3F3F3"}}>{"#"+props._id.slice(props._id.length - 5).toUpperCase()}</div>
        <div className="col-4 bgW cursor-pointer"  style={{background:bg === "Active" ? "#fff" : "#F3F3F3"}}  data-bs-toggle="tooltip" data-bs-placement="bottom" title={props.adNameFrench.toLocaleUpperCase()+ "/" + props.adNameRomanian.toLocaleUpperCase()}> {props.adNameFrench !== "" ? props.adNameFrench.length > 6 ?  props.adNameFrench.slice(0,6).toLocaleUpperCase() + ".." : props.adNameFrench.toLocaleUpperCase() : "no"}/{props.adNameRomanian !== "" ?  props.adNameRomanian.length > 5 ?  props.adNameRomanian.slice(0,4).toLocaleUpperCase() + ".." : props.adNameRomanian.toLocaleUpperCase(): "no"}</div>
        <div className="col-4 bgW"  style={{background:bg === "Active" ? "#fff" : "#F3F3F3"}}> x leads aquired</div>
        <div className="col-7 bgWH " style={{background:bg === "Active" ? "#fff" : "#F3F3F3"}} >Importance:{props.adImportance === 0 ? "⭐" :props.adImportance === 1 ? "⭐⭐" : props.adImportance === 2 ? "⭐⭐⭐"  : props.adImportance === 3 ? "⭐⭐⭐⭐":  "⭐⭐⭐⭐⭐" } </div> 
        <div className="col-4 bgWH " style={{background:bg === "Active" ? "#fff" : "#F3F3F3"}} >Price by lead : {props.leadPriceForAd ? props.leadPriceForAd : "0"}€</div>
        <div className="col-12 mt-1 jobCardContentScroll" ><p className="mb-0 CardcontantText d-grid">{parse(Text)}</p></div>
<div className="col-12 mt-1">
    <div className="row">
<div className="col-4 px-0 d-flex justify-content-end"><button className=" EditJobAd"  onClick={()=>EditCard()}>Edit This Ad</button></div>
    <div className="col-6 d-flex justify-content-end"><button className=" EditJobAd " name="MoveInActive" onClick={(e)=>{ModifyAdStatus(e,props._id)}} disabled={btnDS} style={{background:"#fff" ,color:"#000",width:"100%",border:"1px solid #CCCCCC"}}>Move to {bg == "Active" ? "InActive" : "Active"}</button></div>
    <div className="col-2 pl-0"><button className="deleteAd" onClick={(e)=>{setModal(true)}} ><img   src={require("../../images/Deletebucket.svg").default}  /></button></div>
    </div>
    </div>
    {
      deleteModal ?
      <DeleteModal  props={props} closeModal={setModal}  updateFields={setUpdateField}/>
      :
      null
    }
    </div>
    </>)
}