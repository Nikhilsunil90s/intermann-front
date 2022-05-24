import React, { useState } from "react";
import '../../CSS/AddSector.css'
function UserAddModal({ closeModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let data = [
    {
      email,
      password,
    },
  ];
  const AddNewUser = () => {
    alert(JSON.stringify(data));
  };
  return (
    <>
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
                  setEmail(e.target.value);
                }}
                placeholder="Enter email..."
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
                onClick={AddNewUser}
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
