import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { API_BASE_URL } from "../../config/serverApiConfig";


function InProgressModal({ props, closeModal }) {
  console.log(props)

  const [workingFor, setWorkingFor] = useState("")
  const [workingSince, setWorking] = useState("")
  const [salary, setSalary] = useState("")
  const [candidatId, setCandidateID] = useState(props._id)

  let data = {
    workingFor, workingSince, salary, candidatId
  }
  const notify = () => toast("Moved to In-Progress Successfully!");

  const saveModalData = async () => {
    console.log(data)
    return await fetch(API_BASE_URL + "moveToInProgress", {
      method: "POST",
      headers: {
        "Accept": 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
      body: JSON.stringify(data),
    })
      .then(resp => resp.json())
      .then(reD => { { console.log(reD) } })
      .catch(err => err)
  }

  const saveFormData = () => {
    console.log(data);
    saveModalData()
      .then((resp) => {
        console.log(resp)
        notify()
      })
      .catch(err => {
        console.log(err)
      })
  }
  const onFormDataChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | any
    >
  ) => {
    if (e.target.name === 'clientName') {
      console.log(e.target.name, e.target.value);
      setWorkingFor(e.target.value);
    }
    else if (e.target.name === "date") {
      console.log(e.target.name, e.target.value);
      setWorking(e.target.value)
    }
    else if (e.target.name === "turnover") {
      console.log(e.target.value)
      setSalary(e.target.value)
    }
  }

  return (<>

    <div className="modal d-block" style={{ backgroundColor: "#00000052" }} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel">
      <div className="modal-dialog modal-lg">
        <div className="modal-content padding-full">
          <div className="text-end">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { closeModal(false) }}></button>
          </div>
          <h2 className="modal-title pRight" id="staticBackdropLabel">Move {props.candidatName} to <span className="col-spl">IN-PROGRESS</span> </h2>
          <form onSubmit={() => { saveFormData(); return false }}>
            <div className="modal-body text-start">
              <span>  Qui est le client qui a embauché {props.candidatName} ?</span>
              <select className="form-select" name="clientName" onChange={onFormDataChange} aria-label="Default select example">
                <option>Select Un Client</option>
                <option value="1">Client One</option>
                <option value="2">Client Two</option>
                <option value="3">Client Three</option>
              </select>
              <div className="mt-3"><span className="note-spl">NOTE: </span> <span> This action will automatically move this Candidat to status - </span> <span className="col-spl">In Progress</span> </div>
              <div>

                <div className="col-12 pt-3">
                  <label className="lable-from">FROM DATE / A PARTIR DE:</label>
                  <div className="input-group date" id="datepicker">
                    <input type="date" name="date" onChange={onFormDataChange} className="form-control" />
                  </div>
                </div>
              </div>
              <div className="col-12 pt-2">
                <label className="salaire">Salaire Net de {props.candidatName} / {props.candidatName} Net Salary: </label>
                <div>

                  <div className="d-flex amount-fields">
                    <span>€</span>
                    <input type="number" className="form-control" name='turnover' placeholder='Amount' onChange={onFormDataChange} />
                    <span>.00</span>
                  </div>


                </div>
              </div>
              <div className="col-12 text-center pt-3">
                <div className="row ">
                  <div className="col-3"></div>
                  <div className="col-6">
                    <button
                      style={{
                        borderRadius: "8px", backgroundColor: "#A461D8", width: "100%", padding: "13px", fontFamily: 'Inter',
                        fontStyle: "normal",
                        fontWeight: "700",
                        fontSize: "20px",
                        lineHeight: "16px", color: "white", border: "unset"
                      }}
                    >Move {props.candidatName} to In-Progress status</button>
                  </div>

                  <div className="col-3"></div>
                  <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />

                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>)
}
export default InProgressModal;