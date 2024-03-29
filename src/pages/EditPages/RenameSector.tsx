import React, { useEffect, useState } from "react";
import "../../CSS/AddSector.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import RenameModal from "../../components/Modal/RenameJobModal";
import AddJobModal from "../../components/Modal/Add_Modal";

function RenameSector() {
  const { state } = useLocation();

  const [jobModalData, setJobModalData] = useState("");
  const [jobModal, setJobModal] = useState(false);
  const [data, setData] = useState<any>(state);
  const [renameModalData, setRenameModalData] = useState("");
  const [jobName, setjobName] = useState("");
  const [renameModal, setRenameModal] = useState(false);
  return (
    <>
      <div className="container">
        <div className="row">
          {/* <div className="col-12 flex-wrap">
            <h1 className="titleAdd">ADD SECTOR/JOB</h1>
          </div> */}

          <div className="col-12 mt-2">
            <div className="row">
              <div className="col-12 bg-light">
                <div className="row">
                  <div className="col-8  px-0 d-flex align-item-center py-1">
                    <Link to="/addNewSector">
                      <button type="button" className="btn list-001">
                        <img alt="..."
                          src={require("../../images/return.svg").default}
                          style={{ marginRight: "5px" }}
                        />
                        List of jobs for {data[0].associatedSector}
                      </button>
                    </Link>
                  </div>

                  <div className="col-4 py-1">
                    <button
                      className="btn AddNEwSector"
                      onClick={() => {
                        setJobModal(true);
                        setJobModalData(data[0].associatedSector);
                      }}
                    >
                      + Add a job on {data[0].associatedSector}
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="col-12 pt-1"
                style={{
                  backgroundColor: "#ffffffb0",
                  borderRadius: "0px 0px 10px 10px",
                }}
              >
                {/* {sectorsList.length > 0 ? sectorsList.map((sector) => */}

                <div className="row">
                  <ul style={{ listStyle: "none" }}>
                    {data?.map((e) => (
                      <li className="pt-2">
                        <div className="col-12 pd-lr">
                          <div className="row">
                            <div className="col-9 text-start d-flex align-item-center">
                              <p className="A0012"> {e.jobName}</p>
                            </div>
                            <div className="col-3 text-end">
                              <button
                                className="btn btn-resume"
                                onClick={() => {
                                  setRenameModal(true);
                                  setRenameModalData(e.associatedSector);
                                  setjobName(e.jobName);
                                }}
                              >
                                <img alt="..."
                                  src={
                                    require("../../images/editResume.svg")
                                      .default
                                  }
                                />{" "}
                                Rename
                              </button>
                              {renameModal ? (
                                <RenameModal
                                  sector={renameModalData}
                                  jobName={jobName}
                                  closeModal={setRenameModal}
                                />
                              ) : null}{" "}
                              {jobModal ? (
                                <AddJobModal
                                  props={jobModalData}
                                  closeModal={setJobModal}
                                  path="/addNewSector"
                                />
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="col-12  pb-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default RenameSector;
