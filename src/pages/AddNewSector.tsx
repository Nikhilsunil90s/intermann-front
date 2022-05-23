import React from "react";
import { ClassificationType } from "typescript";
import AddJobModal from "../components/Modal/Add_Modal";
import Add_Sector from "../components/Modal/Add_Sector";
import RenameModal from "../components/Modal/RenameModal";
import "../CSS/AddSector.css";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config/serverApiConfig";

function AddSector() {

    const [jobModalData, setJobModalData] = useState("")
    const [jobModal, setJobModal] = useState(false)
    const [renameModalData, setRenameModalData] = useState("")
    const [renameModal, setRenameModal] = useState(false)
    const [sectorsList, setSectorsList] = useState([{
        sectorName: "",
        jobs: [
            { jobName: "", associatedSector: "" }
        ]
    }])

    const getSectors = async () => {
        return fetch(API_BASE_URL + "fetchAllSectors", {
            method: "GET",
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
        })
            .then(result => result.json())
            .then(respD => respD)
            .catch(err => {
                return err;
            })
    }

    useEffect(() => {
        getSectors().then((resp) => {
            console.log(resp.data);
            setSectorsList([...resp.data]);
        }).catch(err => {
            console.log(err)
        });
    }, [])
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 flex-wrap">
                        <h1 className="titleAdd">ADD SECTOR/JOB</h1>
                    </div>
                    <div className="col-12 vw-Box">
                        <div className="row">
                            <div className="col-12 bg-light">
                                <div className="row">
                                    <h1 className="list-001">List of Sectors</h1>
                                    <div className="col-12 pt-3">
                                        {sectorsList.length > 0 ? sectorsList.map((sector) =>

                                            <div className="row">
                                                <ul style={{ listStyle: "none" }}>
                                                    <li className="pt-2">
                                                        <div className="col-12 pd-lr">
                                                            <div className="row">
                                                                <div className="col-5 text-start d-flex align-item-center">
                                                                    <p className="A0012">{sector.sectorName}</p>
                                                                </div>
                                                                <div className="col-6">
                                                                    <div className="row">
                                                                        <div className="col-10 text-end">

                                                                            <button
                                                                                className="btn btn-job"
                                                                                onClick={() => { setJobModal(true); setJobModalData(sector?.sectorName) }}
                                                                            >
                                                                                Add job
                                                                            </button>



                                                                        </div>
                                                                        <div className="col-2 text-start">
                                                                            <button
                                                                                className="btn btn-resume"
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#renameModal"
                                                                                onClick={() => { setRenameModal(true); setRenameModalData(sector?.sectorName) }}
                                                                            >
                                                                                Rename
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        ) : <p>
                                            No Sectors Available Yet, <br></br>
                                            Start By Adding A New Sector !
                                        </p>}
                                        {

                                            jobModal ?
                                                <AddJobModal props={jobModalData} closeModal={setJobModal} />
                                                : null
                                        }
                                        {
                                            renameModal ?
                                                <RenameModal props={renameModalData} closeModal={setRenameModal} /> : null
                                        }
                                        <div className="col-12  pb-3">
                                            <div className="row ">
                                                <div className="col-12 text-center">
                                                    <Add_Sector />
                                                    <button
                                                        className="btn btn-green"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#sectorModal"
                                                    >
                                                        Add A New Sector
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
    );
}
export default AddSector;
