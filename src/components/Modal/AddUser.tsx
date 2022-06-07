import React, { useState } from "react";
import '../../CSS/AddSector.css'
import {API_BASE_URL} from "../../config/serverApiConfig"
import { Toaster,toast } from 'react-hot-toast';

function UserAddModal({ closeModal }) {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [res,setResponse]=useState([])
 const data={
   emailAddress:emailAddress,
   password:password
 }
  // const AddNewUser = () => {
  //   alert(JSON.stringify(data));
  // };
  const AddSuccess=()=>toast("SuccessFully User Added !")
  const AddFailure=()=>toast("User Added Fail !")
  const saveUserData = async () => {
    return await fetch(API_BASE_URL + "signup", {
      method: "POST",
      headers: {
        "Accept": 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
      body: JSON.stringify({...data}),
    })
      .then(resp => resp.json())
      .then(reD =>{setResponse(reD);setTimeout(function () {
        window.location.href = "/userList";
        
      },
    1000
  );
  AddSuccess()
})
      .catch((err) =>{console.log(err); AddFailure()})
  }
console.log(res,"res")
  return (
    <>
    <Toaster position="top-center" />
      <div
        className="modal d-block"
        id="addJobModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ backgroundColor: "#00000052" }}
      >
       
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
              Add user
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={(e) => {
                  closeModal(false);
                }}
              ></button>
            </div>
            <div className="modal-body  text-start">
              <label className="form-label mb-0 fs-6">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                onChange={(e) => {
                  setEmailAddress(e.target.value);
                }}
                placeholder="Enter email..."
            autoComplete="off"
              />
              <div className="mt-2">
                <label
                  htmlFor="validationCustom02"
                  className="form-label mb-0 fs-6"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="validationCustom02"
                  className="form-control"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Enter password..."
                  autoComplete="off"
                />
              </div>
            </div>
           
            <div className="modal-footer">
                <div className="col-12">
                    <div className="row">
                        <div className="col-12">
                        <button
                type="button"
                className="btn btn-addUser"
                onClick={()=>saveUserData()}
              >
              Add an user
              </button>
                        </div>
                 
                    </div>
                </div>
             
            </div>
          </div>
      
        </div>
    
      </div>
    </>
  );
}
export default UserAddModal;
