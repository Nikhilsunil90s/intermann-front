import React, { useState } from "react";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../config/serverApiConfig";
import "../../CSS/Client/ArchivedCardClient.css"
import Cookies from "js-cookie"

function SalaryAdsEdit({name,closeModal,details}) {
    const [ResetLoader, setResetLoader] = useState(false);
    const [newSalary, setNewSalary] = useState("");

    const notifyMoveSuccess = () => toast.success(`${name} Change Successfully!`);
    const notifyMoveError = () => toast.error(`${name} Cannot Change! Please Try Again.`);

    const OnInputChange =(e:any)=>{
        if(name === "Salary"){
        setNewSalary(e.target.value)
        }
        if(name==="Ads Spent"){
            setNewSalary(e.target.value)
        }
    }


    const SalaryEdit = async () => {
        setResetLoader(true)
        let data = {
            candidatId:details.Canid,
            currentWorkId:details.currentWorkId, 
            currentSalary:details.CurrentSalary,
            newSalary:newSalary
        }
        console.log(data);
        return await fetch(API_BASE_URL + "changeEmployeeSalary", {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + Cookies.get('token')
            },
            body: JSON.stringify(data),
        })
            .then(resp => resp.json())
            .then(reD => (reD))
            .catch(err => err)
    }

    const AdsEdit = async () => {
        setResetLoader(true)
        let data = {
            clientId:details.clientId,
            currentBudget:details.currentBudget, 
            newBudget:newSalary
        }
        console.log(data);
     
        return await fetch(API_BASE_URL + "changeBudget", {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + Cookies.get('token')
            },
            body: JSON.stringify(data),
        })
            .then(resp => resp.json())
            .then(reD => (reD))
            .catch(err => err)
    }

    const sendResetRequest = () => {  
      if(name === "Salary"){
          SalaryEdit().then((resdata) => {
            console.log(resdata)
            notifyMoveSuccess();
            closeModal(false);
            setResetLoader(false)
            setTimeout(function () {
               window.location.reload()
            }, 2000);
           

        })
            .catch(err => {
                console.log(err)
                notifyMoveError();
                setResetLoader(false)
            })
        }
      if(name === "Ads Spent"){
        AdsEdit().then((resdata) => {
            console.log(resdata)
            notifyMoveSuccess();
            closeModal(false);
            setResetLoader(false)
            setTimeout(function () {
               window.location.reload()
            }, 2000);
           

        })
            .catch(err => {
                console.log(err)
                notifyMoveError();
                setResetLoader(false)
            })

      }
    }

    return (<>

        <div className="modal d-block" style={{ backgroundColor: "#00000052" }} id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header p-0">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-8 px-0 clientArchivedModal-font">
                    <h2 className="modal-title  py-1 pRight" id="staticBackdropLabel"><span className="" style={{color:"#489767",marginLeft:"5px"}}>Change {name} Amount</span> </h2>
                    </div>
                    <div className="col-4 text-end d-flex align-items-center">
                    <button type="button" className="btn-close" onClick={() => closeModal(false)} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    </div>
                    </div>
                    </div>
                    <div className="modal-body text-start">
                       <div className="col-12"><div className="row"><div className="col-6"> <p style={{
                            fontFamily: 'Poppins',
                            fontStyle: "normal",
                            fontWeight: "700",
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "#000000",
                            display:"flex",
                            alignItems:"center"

                        }}>
                         Current {name}: <span style={{width:"65%",paddingLeft:"5px"}}><input style={{ fontFamily: 'Poppins',
                            fontStyle: "normal",
                            fontWeight: "700",
                            fontSize: "15px",width: "100%",
    height: "40px",
    borderRadius:"20px",
    border:"1px solid #d1d1d1",
    paddingLeft:"10px"}} defaultValue={name === "Salary" ? details.CurrentSalary+"€" : details.currentBudget +"€"} disabled /></span> 
                        </p>
                        </div>
                        <div className="col-6"> <p style={{
                            fontFamily: 'Poppins',
                            fontStyle: "normal",
                            fontWeight: "700",
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "#000000",
                            display:"flex",
                            alignItems:"center"
                        }}>
                         New {name}: <span style={{ width:"65%",paddingLeft:"5px"}}><input onChange={OnInputChange} style={{fontFamily: 'Poppins',
                            fontStyle: "normal",
                            fontWeight: "700",
                            fontSize: "15px",width: "100%",
    height: "40px",
    borderRadius:"20px",
    border:"1px solid #d1d1d1",
    paddingLeft:"10px"}}   /></span> 
                        </p>
                        </div>
                        </div>
                        </div>
                            <div className="col-12 text-center mt-1">
                                <div className="row justify-content-end">
                                   
                                            <div  className="col-5 d-flex justify-content-end">
                                        <button
                                        disabled={ResetLoader}
                                        onClick={sendResetRequest}
                                         className="btnHide-ArchivedModal d-flex justify-content-center "
                                         style={{backgroundColor:"#489767",width:"70%",padding:"0px",height:"46px"}}
                                        >{ResetLoader ?   <div className="RESTloader " >Loading...</div>   : null} Save New {name}</button>
                                    </div>
                                    </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default SalaryAdsEdit;