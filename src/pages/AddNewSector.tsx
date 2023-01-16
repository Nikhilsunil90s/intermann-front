import React from "react";
import { ClassificationType } from "typescript";
import AddJobModal from "../components/Modal/Add_Modal";
import Add_Sector from "../components/Modal/Add_Sector";
import RenameModal from "../components/Modal/RenameModal";
import "../CSS/AddSector.css";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config/serverApiConfig";
import { Link,useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function AddSector() {
  const [jobModalData, setJobModalData] = useState("");
  const [jobModal, setJobModal] = useState(false);
  const [renameModalData, setRenameModalData] = useState("");
  const [renameModal, setRenameModal] = useState(false);
  const [sectorsList, setSectorsList] = useState([
    {
      sectorName: "",
      jobs: [{ jobName: "", associatedSector: "" }],
    },
  ]);

  const Navigate=useNavigate()
  
  const jobName=(jobs:any)=>{
      Navigate("/joblist",{state:jobs})
  }


  const getSectors = async () => {
    return fetch(API_BASE_URL + "fetchAllSectors", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((result) => result.json())
      .then((respD) => respD)
      .catch((err) => {
        return err;
      });
  };

  useEffect(() => {
    getSectors()
      .then((resp) => {
        setSectorsList([...resp.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-12 my-3">
            <div className="row">
              <div className="col-12 bg-light">
                <div className="row  py-1" >
                  <div className="col-6 text-start"> <h1 className="list-001 mb-0">List of Sectors</h1></div>
                  <div className="col-6"> <div className="row ">
                        <div className="col-12 text-end">
                          <Add_Sector />
                          <button
                            className="btn AddNEwSector"
                            data-bs-toggle="modal"
                            data-bs-target="#sectorModal"
                          >
                           + Add A New Sector
                          </button>
                        </div>
                      </div></div>
                  </div>
                  </div>
                  <div className="col-12" style={{backgroundColor:"#ffffffb0"}}>
                    {sectorsList.length > 0 ? (
                      sectorsList.map((sector) => (
                        <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        variants={{
                          visible: { opacity: 1, y: 0 },
                          hidden: { opacity: 0, y: -50 }
                        }} className="row">
                          <ul style={{ listStyle: "none" }}>
                            <li className="pt-2">
                              <div className="col-12 pd-lr">
                                <div className="row">
                                  <div className="col-6 text-start d-flex align-item-center">
                                    <p className="A0012">{sector.sectorName.length>0? (<>{sector.sectorName}</>):
                              (  <>  <div className="d-flex justify-content-center">
                              <div className="load"></div>
                            </div> </> )   }</p>
                                  </div>
                                  <div className="col-6">
                                    <div className="row">
                                      <div className="col-4 pr-0 text-end">
                                        {/* <Link to="/joblist"> */}
                                          <button
                                            className="btn btn-job-list"
                                            onClick={() => {
                                                jobName(sector?.jobs)
                                            }}
                                          >
                                            Job list
                                          </button>
                                        {/* </Link> */}
                                      </div>
                                      <div className="col-4  text-end">
                                        <button
                                          className="btn btn-job"
                                          onClick={() => {
                                            setJobModal(true);
                                            setJobModalData(sector?.sectorName);
                                          }}
                                        >
                                       +   Add job
                                        </button>
                                      </div>
                                      <div className="col-4  text-end">
                                        <button
                                          className="btn btn-resume"
                                          onClick={() => {
                                            setRenameModal(true);
                                            setRenameModalData(
                                                sector?.sectorName
                                            );
                                          }}
                                        >
                                         <img src={require("../images/editResume.svg").default} /> Rename
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </motion.div>
                      ))
                    ) : (
                      <>
                        <div className="d-flex justify-content-center">
                          <div className="loader"></div>
                        </div>
                      </>
                    )}
                    {jobModal ? (
                      <AddJobModal
                        props={jobModalData}
                        closeModal={setJobModal}
                        path="/addNewSector"
                      />
                    ) : null}
                    {renameModal ? (
                      <RenameModal
                        props={renameModalData}
                        closeModal={setRenameModal}
                      />
                    ) : null}
                 
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddSector;
