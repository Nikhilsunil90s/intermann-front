import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import {API_BASE_URL} from '../../config/serverApiConfig'

function DeleteUser({props, closeModal} ) {
  const [btnDisabled,setDisabled]=useState(false)

    const NotifySuccess=()=>toast("Deleted SuccessFully!!")
    const deleteUser = async () => {
      setDisabled(true)
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
           .then(data =>{console.log(data);setDisabled(false);setTimeout(function () {
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
            <h5 className="modal-title" id="exampleModalLabel" style={{
                            fontFamily: 'Poppins',
                            fontStyle: "normal",
                            fontWeight: "500",
                            fontSize: "18px",
                            lineHeight: "24px",
                            color: "#000000",
                      
                        }}>Delete User</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { closeModal(false) }}></button>
          </div>
          <div className="modal-body d-flex justify-content-center align-items-center" style={{height:"90px"}}>
          <h2 className=''  style={{
                            fontFamily: 'Poppins',
                            fontStyle: "normal",
                            fontWeight: "600",
                            fontSize: "22px",
                            lineHeight: "24px",
                            color: "#000000",
                      
                        }}>{props.emailAddress}</h2>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn" data-bs-dismiss="modal"  style={{backgroundColor: "transparent",
    borderRadius:"22px",

    color:'#3F76E2',border:"1px solid #3F76E2"}} onClick={() => { closeModal(false) }}>Cancel</button>
            <button type="button" className="btn" style={{backgroundColor: "#3F76E2",
    borderRadius:"22px",
    border:"0px",
    color:'#fff'}} disabled={btnDisabled} onClick={()=>deleteUser()}>Proceed</button>
          </div>
        </div>
      </div>
    </div>
  </>)
}
export default DeleteUser;