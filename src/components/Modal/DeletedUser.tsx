import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import {API_BASE_URL} from '../../config/serverApiConfig'

function DeleteUser({props, closeModal} ) {
    const NotifySuccess=()=>toast("Deleted SuccessFully!!")
    const deleteUser = async () => {
        let userid=props._id
        fetch(`${API_BASE_URL}deleteuser/`, {
           method: "POST",
           headers: {
               "Accept": 'application/json',
               'Content-Type': 'application/json',
               "Authorization": "Bearer " + localStorage.getItem('token')
           },
           body: JSON.stringify({
             userid
          })
       })
           .then(result => result.json())
           .then(data =>{console.log(data);setTimeout(function () {
            window.location.href = "/userList";
            
          },
        1000
      );  
      NotifySuccess()  
    })
           .catch(err => {
               return err;
           })
       } 
  return (<>
  <Toaster position='top-center' />
    <div className="modal d-block" id="addJobModal" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ backgroundColor: "#00000052" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header text-center">
            <h5 className="modal-title" id="exampleModalLabel">Delete User</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { closeModal(false) }}></button>
          </div>
          <div className="modal-body text-center">
          <h2>{props.emailAddress}</h2>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { closeModal(false) }}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={()=>deleteUser()}>Proceed</button>
          </div>
        </div>
      </div>
    </div>
  </>)
}
export default DeleteUser;