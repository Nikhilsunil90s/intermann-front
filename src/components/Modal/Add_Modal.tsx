import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/serverApiConfig';


function AddJobModal({ props, closeModal ,path}) {

  const notifyJobAddSuccess = () => toast("Job Added Successfully! You can Add More Jobs to this Sector", {
    
  });
  const notifyJobAddError = () => toast("Job Already Exists! Please Add another.", {
 
  });

  const notifyGeneralError = () => toast("Job Add Failed! Please Try Again.", {
    
  });


  const [jobName, setJobName] = useState("");

  const checkJobExistence = async () => {
    return await fetch(API_BASE_URL + `checkJobExistence/?sector=${props}&job=` + jobName, {
      method: "GET",
      headers: {
        "Accept": 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
    })
      .then(resp => resp.json())
      .then(data => data)
      .catch(err => err)
  }

  const handleJobInputChange = (e: any) => {
    console.log(e.target.value);
    setJobName(e.target.value);
  }

  const checkandaddJob = () => {
    checkJobExistence().then(resD => {
      console.log(resD)
      if (resD.status) {
        notifyJobAddSuccess()
        window.location.href = path;
      } else {
        notifyJobAddError()
        window.location.href = path;

      }
    })
      .catch(err => {
        console.log(err)
        notifyGeneralError();
        window.location.href =path;

      })
  }

  return (<>
    <div className="modal d-block" id="addJobModal" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ backgroundColor: "#00000052" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title AddNewFont" id="exampleModalLabel">Add A Job To Sector - {props.toUpperCase()}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { closeModal(false) }}></button>
          </div>
          <div className="modal-body text-center">
            <label className='labelJobTitle'>Enter A Job Title</label>
            <input type="text" name="jobName" className='form-control' onChange={handleJobInputChange} placeholder='Enter A Job...' />
          </div>
          <div className="modal-footer">
            <div className='col-12'>
              <div className='row justify-content-end'>
                <div className='col-4 pr-0'>
            <button type="button" className="btn btn-job-list" data-bs-dismiss="modal" onClick={() => { closeModal(false) }}>Cancel</button>
                </div>
                <div className='col-4 pr-0'>
            <button type="button" className="btn btn-job" onClick={checkandaddJob}>Add Job</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}
export default AddJobModal;