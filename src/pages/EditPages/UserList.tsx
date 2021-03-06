import React from 'react'
import "../../CSS/AddSector.css";
import { useState, useEffect } from "react";
import UserAddModal from '../../components/Modal/AddUser';
import {API_BASE_URL} from '../../config/serverApiConfig'
import { Toaster,toast } from 'react-hot-toast';
import DeleteUser from '../../components/Modal/DeletedUser';

function UserList(){
    const [AddModal, setAddModal] = useState(false)
    const [deleteModal,setDeleteModal]=useState(false)
    const [fields,setDeleteField]=useState({
        _id:"",
        emailAddress:"",
        password:""
    })
    const [allUsers,setAllusers]=useState([{
        emailAddress:"",
        password:"",
        _id:"",
}])
   
        const getAllUsers = async () => {
        fetch(API_BASE_URL + "allusers", {
           method: "GET",
           headers: {
               "Accept": 'application/json',
               'Content-Type': 'application/json',
               "Authorization": "Bearer " + localStorage.getItem('token')
           },
        }).then((result) => result.json())
      .then((respD) =>{setAllusers([...respD.data])})
      .catch((err) => {
       return err;
  })
       }
 useEffect(()=>{
    getAllUsers()
 },[])
  console.log(allUsers)       
       
    
    // }

    // useEffect(() => {
    //     getSectors().then((resp) => {
    //         console.log(resp.data);
    //         setSectorsList([...resp.data]);
    //     }).catch(err => {
    //         console.log(err)
    //     });
    // }, [])
    return(
        <>
 <div className="container">
                <div className="row">
                    <div className="col-12 vw-UserBox">
                        <div className="row">
                            <div className="col-12">
                                <div className="row Top-UserHeading">
                                    <div className='col-6 d-flex align-items-center'>
                                    <h1 className="list-0012 mb-0 ml-1">Users List</h1>
                                    </div>
                                    <div className='col-6  text-end'>
                                    <button
                                                        className="btn btn-AddUser"
                                                      onClick={()=>setAddModal(true)}
                                                    >
                                                     + ??? Add an user
                                                    </button>
                                    </div>
                                    </div>
                                    </div>
                                    <div className="col-12 bg-ListOfUsers pt-1">
                                        {/* {sectorsList.length > 0 ? sectorsList.map((sector) => */}


{
                        allUsers.map((el)=>(
                            <div className="row">
<ul style={{ listStyle: "none" }}>
    <li className="Radius-Border">
        <div className="col-12 pd-Userlr">
            <div className="row">
                <div className="col-6 text-start d-flex align-item-center">
                 {el.emailAddress?
                            <p className="A0012">Email:??? {el.emailAddress} ??? -??? Password:??? ........</p>
                            :
                            <div className='d-flex justify-content-start'>
                            <div className="load"></div>
                            </div>
                 }
                   
                </div>
                <div className="col-6 d-flex justify-content-end">

                            <button
                                className="btn btn-delete"   
                                onClick={(e)=>{setDeleteModal(true);setDeleteField(el)}}
                            >
                                <img src={require("../../images/Deletebucket.svg").default} />
                               Delete User
                            </button>
                        </div>
            </div>
        </div>
    </li>
    </ul>
</div>
         ))
       
        }
                        {
deleteModal?
    <DeleteUser props={fields}  closeModal={setDeleteModal} />
    : null
}
   

                                        {/* ) : */}
                                        {/* <p>
                                        No Sectors Available Yet, <br></br>
                                        Start By Adding A New Sector !
                                    </p> */}
                                        {/* } */}
                                        {

                                            AddModal?
                                                <UserAddModal closeModal={setAddModal} />
                                                : null
                                        }
                                    </div>
                                </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserList;
