import React, { useState } from 'react';
import {  toast } from 'react-hot-toast';
import { API_BASE_URL } from '../../config/serverApiConfig';

function RenameModal({ props, closeModal }) {

    const [newSectorName, setNewSectorName] = useState("");

    const notifySectorRenameSuccess = () => toast("Sector Renamed Successfully! You can Add More Jobs to this Sector", {
      
    });
    const notifySectorRenameError = () => toast("Cannot Be Renamed! Please Try Again.", {
      
    });

    const notifyGeneralError = () => toast("Sector Rename Failed! Please Try Again.", {
      
    });

    const handleSectorNameChange = (e: any) => {
        setNewSectorName(e.target.value);
    }

    const sendNewNameToDB = () => {
        return fetch(API_BASE_URL + "updateSector", {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify({
                currentName: props,
                newName: newSectorName
            })
        })
            .then(resp => resp.json())
            .then(resD => resD)
            .catch(err => err);
    }

    const saveNewSectorName = () => {
        sendNewNameToDB().then(data => {
            console.log(data)
            if (data.status) {
                notifySectorRenameSuccess();
                window.location.href = "/addNewSector";
            } else {
                notifySectorRenameError();
            }
        })
            .catch(err => {
                console.log(err)
            })
    }

    return (<>
        <div className="modal d-block"   style={{ backgroundColor: "#00000052" }} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title AddNewFont" id="exampleModalLabel">Rename Sector - {props}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => closeModal(false)}></button>
                    </div>
                    <div className="modal-body text-center">
                        <input type="text" name="sectorName" onChange={handleSectorNameChange} className='form-control' placeholder={'Enter New Name for Sector - ' + props} />
                    </div>
                    <div className="modal-footer">
                        <div className='col-12'>
                            <div className='row justify-content-end'>
                                <div className='col-3'>
                        <button type="button" className="btn btn-job-list" data-bs-dismiss="modal" onClick={() => closeModal(false)}>Cancel</button>
                                </div>
                                <div className='col-9'>
                        <button type="button" className="btn  btn-resume" onClick={saveNewSectorName}>Save Changes To Sector Name</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default RenameModal;