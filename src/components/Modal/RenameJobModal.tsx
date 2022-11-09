import React, { useState } from 'react';
import { API_BASE_URL } from '../../config/serverApiConfig';
import { toast } from "react-hot-toast";

function RenameJobModal({ sector, closeModal,jobName }) {
    const [newJobName, setNewJobName] = useState("");
    const [btnDisabled,setBtnDisabled]=useState(false)

console.log(jobName,"jobName")
    const notifyJobRenameSuccess = () => toast.success("Job Renamed Successfully!");
    const notifyJobRenameError = () => toast.error("Cannot Be Renamed! Please Try Again.");
    const notifyJobBlankError = () => toast.error("Job Name Can't Be Blank.");

    const handleJobNameChange = (e: any) => {
        if (e.target.value != "") {
            setNewJobName(e.target.value);
        } else {
            notifyJobBlankError()
        }
    }

    const sendNewNameToDB = () => {
        return fetch(API_BASE_URL + "updateJob", {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify({
                currentJobName: jobName,
                currentSectorName: sector,
                newName: newJobName
            })
        })
            .then(resp => resp.json())
            .then(resD => resD)
            .catch(err => err);
    }

    const saveNewJobName = () => {
        setBtnDisabled(true)
        if (newJobName != "") {
            sendNewNameToDB().then(data => {
                if (data.status) {
                    notifyJobRenameSuccess();
                    setTimeout(() => {
                       setBtnDisabled(false)
                        window.location.href = "/addNewSector";
                    }, 2000)
                } else {
                    setBtnDisabled(false)
                    notifyJobRenameError();
                }
            })
                .catch(err => {
                    console.log(err)
                })
        } else {
            notifyJobBlankError();
        }

    }

    return (<>
        <div className="modal d-block" id="renameModal" style={{ backgroundColor: "#00000052" }} aria-labelledby="exampleModalLabel" aria-hidden="true" >
            <div className="modal-dialog" style={{maxWidth:"577px"}}>
                <div className="modal-content">
                    <div className="modal-header">
                        <div className='col-12'>
                            <div className='row'>
                                <div className='col-10 text-start'>
                        <h5 className="modal-title" id="exampleModalLabel" style={{
                            fontFamily: 'Poppins',
                            fontStyle: "normal",
                            fontWeight: "500",
                            fontSize: "18px",
                            lineHeight: "24px",
                            color: "#000000",
                      
                        }}>Rename Job - {jobName.toUpperCase()}</h5></div><div className='col-2 text-end'>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => closeModal(false)}></button>
                        </div>
                        </div>
                        </div></div>
                    <div className="modal-body text-center">
                        <input type="text" name="jobName" onChange={handleJobNameChange} className='form-control' required placeholder={'Enter New Name for Job - ' + jobName} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn "  style={{backgroundColor: "transparent",
    borderRadius:"22px",

    color:'#3F76E2',border:"1px solid #3F76E2"}} data-bs-dismiss="modal" onClick={() => closeModal(false)}>Cancel</button>
                        <button type="button" className="btn"  style={{backgroundColor: "#3F76E2",
    borderRadius:"22px",
    border:"0px",
    color:'#fff'}}  disabled={btnDisabled} onClick={saveNewJobName}>Save Changes To Job Name</button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default RenameJobModal;