import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from '../../config/serverApiConfig';
import { toast } from "react-hot-toast";

function RenameJobModal({ props, closeModal }) {
    const [newJobName, setNewJobName] = useState("");

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
                currentJobName: props.jobName,
                currentSectorName: props.associatedSector,
                newName: newJobName
            })
        })
            .then(resp => resp.json())
            .then(resD => resD)
            .catch(err => err);
    }

    const saveNewJobName = () => {
        if (newJobName != "") {
            sendNewNameToDB().then(data => {
                if (data.status) {
                    notifyJobRenameSuccess();
                    setTimeout(() => {
                        window.location.href = "/addNewSector";
                    }, 2000)
                } else {
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
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Rename Job - {props.jobName}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => closeModal(false)}></button>
                    </div>
                    <div className="modal-body text-center">
                        <input type="text" name="jobName" onChange={handleJobNameChange} className='form-control' required placeholder={'Enter New Name for Job - ' + props.jobName} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => closeModal(false)}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={saveNewJobName}>Save Changes To Job Name</button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default RenameJobModal;