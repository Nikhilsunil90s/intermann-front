import React, { useState } from "react";
import '../../CSS/AddSector.css'
import {API_BASE_URL} from "../../config/serverApiConfig"
import { Toaster,toast } from 'react-hot-toast';
import Cookies from "js-cookie"

function EditUserModal({ closeModal }) {
  const [emailAddress, setEmailAddress] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [res,setResponse]=useState([])
  const [btnDisabled,setDisabled]=useState(false)

 const data={
  emailAddress:emailAddress,
   password:password,
   username:userName

 }
  // const AddNewUser = () => {
  //   alert(JSON.stringify(data));
  // };
  const AddSuccess=()=>toast("SuccessFully User Added !")
  const AddFailure=()=>toast("User Added Fail !")
  const saveUserData = async () => {
    setDisabled(true)
    return await fetch(API_BASE_URL + "signup", {
      method: "POST",
      headers: {
        "Accept": 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " +  Cookies.get('token')
      },
      body: JSON.stringify({...data}),
    })
      .then(resp => resp.json())
      .then(reD =>{setResponse(reD);setDisabled(false);setTimeout(function () {
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
       
        <div className="modal-dialog" style={{maxWidth:"740px"}}>
          <div className="modal-content" style={{width:"900px"}}>
            <div className="modal-header">
              <h5 className="modal-title Add-ModalUserStyle" id="exampleModalLabel">
              Edit user
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
            <div className="modal-body d-flex  text-start mt-1">
            {/* <div className="col-12">
              <div className="row">
              <div className="col-4">
              <label className="form-label fontStylingLabel mb-0 fs-6">User Name</label>
            <input
                type="email"
                name="name"
                className="form-control"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                placeholder="Enter user Name..."
            autoComplete="off"
              />
              </div>
                <div className="col-4">
              <label className="form-label fontStylingLabel mb-0 fs-6">User Email</label>
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
              </div>
              <div className="col-4">
                <label
                  htmlFor="validationCustom02"
                  className="form-label mb-0 fontStylingLabel"
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
           <div className="col-12 text-center">
            <div className="modal-footer">
                <div className="col-12 mt-2">
                    <div className="row justify-content-end">
                    <div className="col-4 text-end">
                        <button
                        disabled={btnDisabled}
                type="button"
                className="btn btn-addUser"
                style={{border:"1px solid #3F76E2",background:"transparent",color:"#3F76E2"}}
                onClick={()=>closeModal(false)}
              >
            Cancel
              </button>
                        </div>
                        <div className="col-4 text-end">
                        <button
                        disabled={btnDisabled}
                type="button"
                className="btn btn-addUser"
                style={{background:"#3F76E2",padding:"13px 63px"}}
                onClick={()=>saveUserData()}
              >
             Add New User
              </button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
                </div> */}
      <p className="Add-ModalUserStyle"> Work-In-Progress</p>

            </div>
          </div>
      
        </div>
    
      </div>
    </>
  );
}
export default EditUserModal;
