import React ,{useState,useEffect} from "react";
import { API_BASE_URL } from "../../config/serverApiConfig";
import {toast} from "react-hot-toast"
import LoaderS from "../../components/Loader/loader"
import Cookies from 'js-cookie'

function AvanceModal ({props,closeModal,LinkModal,rePid,setReAvance}){
console.log(props,"props")
    const [Loader,setLoader]=useState(false)
    const [amount,setAmount]=useState("")
    const [data,setData]=useState({
      avanceId:null,
      candidat:props._id,
      candidatName:props.candidatName,
      amount_avance: "",
      period_avance:""
    })

    useEffect(()=>{
      GetFields().then((resD)=>{
        if(resD.status){
          setAmount(resD.data.amount_avance) 
          setData({...data,period_avance:resD.data.period_avance,amount_avance:resD.data.amount_avance,candidat:props._id,candidatName:props.candidatName,avanceId:resD.data._id})
          rePid(resD.data._id)
          console.log(data,"data")
          setLoader(false)
         }else{
          setLoader(false)
         }
      })
    },[])
    
   const  GetFields= async()=>{
    setLoader(true)
   let headers = {
     "Accept": 'application/json',
     "Authorization": "Bearer " +  Cookies.get('token')
   }
   return await fetch(API_BASE_URL + `getCandidatAvance/?candidatId=${props._id}`, {
     method: "GET",
     headers: headers
   })
     .then(reD => reD.json())
     .then(resD => resD)
     .catch((err)=>err)
   }

    const OnFormChange=(e)=>{
     if(e.target.name === "amount_avance"){
      setData({...data,amount_avance:e.target.value})
     }
     if(e.target.name === "period _avance"){
      setData({...data,period_avance:e.target.value})
     }
      console.log(data,"data")
    }

    const OnSubmitForm=(e)=>{
      setLoader(true)
      if(e.target.name === "pdfGenerate"){
        fetch(API_BASE_URL + "generateAvance", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " +  Cookies.get("token"),
          },
          body: JSON.stringify(data),
        })
          .then((resp) => resp.json())
          .then((reD) =>{if(reD.status){
            toast.success(reD.message)
            setTimeout(()=>{
              setLoader(false)
              closeModal(false)
              window.open(API_BASE_URL + reD.filePath.replace("/app/",""))
      
            },2000)
          }else{
            setLoader(false)
          }
          })
          .catch((err) => err);

      }
      if(e.target.name === "Docu"){
        
        fetch(API_BASE_URL + "saveAvance", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("token"),
          },
          body: JSON.stringify(data),
        })
          .then((resp) => resp.json())
          .then((reD) =>{if(reD.status){
            toast.success(reD.message)
            setLoader(false)
            rePid(reD.avanceid)
            setReAvance("Avance")
            closeModal(false)
            LinkModal(true)
          }else{
            setLoader(false)
          }
          })
          .catch((err) => err);


      }

    }

console.log(amount,"amo")


    return(<>
    
    <div
        className="modal d-block"
        style={{ backgroundColor: "#00000052" }}
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" style={{maxWidth:"1026px"}}>
          <div className="modal-content" style={{width:"1025px"}}>
            <div className="modal-header">
              <h5 className="modal-title modalStylingfont" id="exampleModalLabel">
              Avance contract               </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              onClick={()=>{closeModal(false)}}
              ></button>
            </div>
            <div className="modal-body">
<div className="col-12">
    <div className={Loader ? "row justify-content-center"  :"row"}>
      {
        Loader ?
      <LoaderS    />
        :
<>
        <div className="col-4">
        <label className="ChildStylePreModal">candidate_name </label>
        <input className="form-control" defaultValue={props.candidatName} style={{fontSize:"12px",fontFamily:"Poppins"}} placeholder="candidate_name" name="DOCName" disabled />
        <span style={{fontFamily:"Poppins" ,fontSize:"9px",color: "#68B085"}}>Name of the candidate </span>
    </div>
    <div className="col-4">
    <label className="ChildStylePreModal">amount_avance</label>
        <input className="form-control" defaultValue={data.amount_avance !=="" ? data.amount_avance  : "" } onChange={OnFormChange} style={{fontSize:"12px",fontFamily:"Poppins"}} placeholder="amount_avance" name="amount_avance" />
        <span style={{fontFamily:"Poppins" ,fontSize:"9px",color: "#68B085"}}>The amount that the worker request (Exemple: 1000lei)</span>
    </div>
    <div className="col-4">
    <label className="ChildStylePreModal"  >period _avance </label>
        <input className="form-control" defaultValue={data.period_avance !=="" ? data.period_avance  : "" } style={{fontSize:"12px",fontFamily:"Poppins"}} placeholder="period _avance" name="period _avance" onChange={OnFormChange} />
        <span style={{fontFamily:"Poppins" ,fontSize:"9px",color: "#68B085"}}>When this anvance will be deducted from salary (Exemple octombrie 2022) </span>
    </div>
    </>
      }
       
     
    </div>
</div>
<div >           </div>
<div></div>
            </div>
            <div className="modal-footer">
                <div className="col-12">
                    <div className="row justify-content-end">
                        <div className="col-3 ">
                        <button type="button" onClick={(e)=>{OnSubmitForm(e)}} className="btn preSelectedStageBtn" name="pdfGenerate"  style={{width:"100%",background:"#3F76E2"}} disabled={Loader}>
                        Generate the PDF
              </button>
                        </div>
                        <div className="col-4">
                        <button type="button" className="btn preSelectedStageBtn" onClick={(e)=>OnSubmitForm(e)} name="Docu"  style={{width:"100%",background:"#032339"}}>
                        Generate Docusing
              </button>
                        </div>
                    </div>
                </div>
            
            </div>
          </div>
        </div>
      </div>
    </>)
}
export default AvanceModal;;