import React from 'react';
import { useState, useEffect } from "react";
import {  toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/serverApiConfig';
import Cookies from "js-cookie"
function SectorModal() {

  const notifySectorAddSuccess = () => toast("Sector Added Successfully!", {
    
  });

  const notifySectorAddFailure = () => toast("Sector Already Exists", {
   
  })

  const navigate = useNavigate();

  const [sector, setSector] = useState("");
  const [jobsList, setJobsList] = useState([{ jobName: "", associatedSector: "" }]);
  const [showSaveSectorBtn, setSaveSectorBtn] = useState(false);
  const [showJobAdders, setShowJobAdders] = useState(false);
  const [disableSectorInput, setDisableSectorInput] = useState(false);
  const [btnDisabled,setDisabled]=useState(false)

  const checkSectorExistence = async (sector: String) => {
    return await fetch(API_BASE_URL + "checkSectorExistence/?sector=" + sector, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + Cookies.get('token')
      }
    })
      .then(result => result.json())
      .then(resultData => resultData)
      .catch(err => err)
  }

  const saveSector = () => {
    setSector(sector);
    checkSectorExistence(sector).then(resD => {
      if (resD.status) {
        setSaveSectorBtn(false);
        setShowJobAdders(true);
        setDisableSectorInput(true);
      } else {
        notifySectorAddFailure();
      }

    })
      .catch(err => {
        console.log(err)
      })
  }

  const handleSectorInputChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value);
    console.log(jobsList);

    if (value != "") {
      setSaveSectorBtn(true);
      setSector(value);
      setJobsList([{ jobName: "", associatedSector: value }])
    }
  }

  const handleJobInputChange = (e: any, index: number) => {
    const { name, value } = e.target;
    console.log(name, index, value);
    const JobList = [...jobsList];

    JobList[index][name] = value;
    setJobsList(JobList);
  }

  const handleJobAdd = (jobname: string) => {
    setJobsList([...jobsList, { jobName: jobname, associatedSector: sector }])
  }

  const sendSectorToDB = async () => {
    return await fetch(API_BASE_URL + "saveNewSector", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + Cookies.get('token')
      },
      body: JSON.stringify({
        sectorName: sector,
        jobs: jobsList
      })
    })
      .then(resp => resp.json())
      .then(respD => respD)
      .catch(err => console.log(err))
  }

  const addSector = async () => {
    setDisabled(true)
    sendSectorToDB().then(resp => {
      console.log(resp)
      if (resp.status) {
        notifySectorAddSuccess();
        setDisabled(false)
        window.location.href = "/addNewSector"
      }
    }).catch(err => {
      console.log(err)
      notifySectorAddFailure();
    });
  }

  return (<>
    <div className="modal fade mt-12" id="sectorModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title AddNewFont" id="exampleModalLabel">Add New Sector</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body text-center">
            <p>Add New Sector</p>
            <input type="text" name='sectorName' className='form-control' disabled={disableSectorInput} placeholder='Enter Sector Name ...'
              value={sector}
              onChange={(e) => handleSectorInputChange(e)}
            />
            {showSaveSectorBtn && <button type='button' className='btn btn-primary mt-2' onClick={saveSector}>Save Sector Name</button>}
          </div>
          <div className="modal-body text-center">
            {showJobAdders && jobsList.map((job, index) =>
              <div key={index} className="jobs">
                <input name='jobName' type="text" className='form-control' placeholder={'Enter Job Name in Sector -  ' + sector}
                  onChange={(e) => { handleJobInputChange(e, index) }}
                />
                <br></br>
                {
                  jobsList.length - 1 === index &&
                  <button type="button" className="btn btn-primary" onClick={(e) => handleJobAdd(job.jobName)}>Save & Add Other Job</button>
                }
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary " data-bs-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-primary" disabled={btnDisabled} onClick={addSector}>Add The Sector</button>
          </div>
        </div>
      </div>
    </div>
  </>)
}
export default SectorModal;