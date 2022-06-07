import React from 'react'
import { ClassificationType } from "typescript";
import AddJobModal from "../../components/Modal/Add_Modal";
import Add_Sector from "../../components/Modal/Add_Sector";
import RenameModal from "../../components/Modal/RenameModal";
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
                    <div className="col-12 flex-wrap">
                        <h1 className="titleAdd">ADD users</h1>
                    </div>
                    <div className="col-12 vw-Box">
                        <div className="row">
                            <div className="col-12 bg-light">
                                <div className="row">
                                    <h1 className="list-001">List of users</h1>
                                    <div className="col-12 pt-3">
                                        {/* {sectorsList.length > 0 ? sectorsList.map((sector) => */}


{
                        allUsers.map((el)=>(
                            <div className="row">
<ul style={{ listStyle: "none" }}>
    <li className="pt-2">
        <div className="col-12 pd-lr">
            <div className="row">
                <div className="col-6 text-start d-flex align-item-center">
                 {el.emailAddress?
                            <p className="A0012">{el.emailAddress}</p>
                            :
                            <div className='d-flex justify-content-start'>
                            <div className="load"></div>
                            </div>
                 }
                   
                </div>
                <div className="col-6 text-end">

                            <button
                                className="btn btn-delete"   
                                onClick={(e)=>{setDeleteModal(true);setDeleteField(el)}}
                            >
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
                                 
                                        <div className="col-12  pb-3">
                                            <div className="row ">
                                                <div className="col-12 text-center">
                                                  
                                                    <button
                                                        className="btn btn-green"
                                                      onClick={()=>setAddModal(true)}
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
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserList;
