import React from 'react'
import { ClassificationType } from "typescript";
import AddJobModal from "../../components/Modal/Add_Modal";
import Add_Sector from "../../components/Modal/Add_Sector";
import RenameModal from "../../components/Modal/RenameModal";
import "../../CSS/AddSector.css";
import { useState, useEffect } from "react";
import UserAddModal from '../../components/Modal/AddUser';

function UserList(){
    const [AddModal, setAddModal] = useState(false)
    const [sectorsList, setSectorsList] = useState([{
        email:"",
        password:""
    }])
    // const getSectors = async () => {
    //     return fetch(API_BASE_URL + "fetchAllSectors", {
    //         method: "GET",
    //         headers: {
    //             "Accept": 'application/json',
    //             'Content-Type': 'application/json',
    //             "Authorization": "Bearer " + localStorage.getItem('token')
    //         },
    //     })
    //         .then(result => result.json())
    //         .then(respD => respD)
    //         .catch(err => {
    //             return err;
    //         })
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
                                        {sectorsList.length > 0 ? sectorsList.map((sector) =>

<div className="row">
<ul style={{ listStyle: "none" }}>
    <li className="pt-2">
        <div className="col-12 pd-lr">
            <div className="row">
                <div className="col-6 text-start d-flex align-item-center">
                    <p className="A0012">&#10100;email&#10101;</p>
                    <p className="A0012">&#10100;password&#10101;</p>
                </div>
                <div className="col-6 text-end">
                            <button
                                className="btn btn-delete"
                                data-bs-toggle="modal"
                                data-bs-target="#renameModal"
                            >
                               Delete User
                            </button>
                        </div>
            </div>
        </div>
    </li>
</ul>
</div>
                                        ) :
                                        <p>
                                        No Sectors Available Yet, <br></br>
                                        Start By Adding A New Sector !
                                    </p>
                                        }
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
