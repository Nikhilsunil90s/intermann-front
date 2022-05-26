import React, { useEffect, useState } from "react";
import "../../CSS/AddSector.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import RenameModal from "../../components/Modal/RenameModal";
function RenameSector() {
  const { state } = useLocation();
  useEffect(() => {
    console.log(state, "state");
  });

  const [data, setData] = useState<any>(state);
  const [renameModalData, setRenameModalData] = useState("");
  const [renameModal, setRenameModal] = useState(false);
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
                  <div className="col-12">
                    <div className="row">
                      <div className="col-4 d-flex align-item-center mt-2">
                        <Link to="/addNewSector">
                          <button
                            type="button"
                            className="btn"
                            style={{
                              backgroundColor: "#FE8700D9",
                              color: "#ffff",
                              fontWeight: "400",
                            }}
                          >
                            <img
                              src={require("../../images/return.svg").default}
                              style={{ marginRight: "5px" }}
                            />
                            Return to list of sectors
                          </button>
                        </Link>
                      </div>
                     
  <div className="col-8">
  <h1 className="list-001">
    List of jobs for {data[0].associatedSector}
  </h1>
</div>
 
                    
                    </div>
                  </div>

                  <div className="col-12 pt-3">
                    {/* {sectorsList.length > 0 ? sectorsList.map((sector) => */}

                    <div className="row">
                      <ul style={{ listStyle: "none" }}>
                      {
                         data?.map((e)=>(
                            <li className="pt-2">
                            <div className="col-12 pd-lr">
                              <div className="row">
                                <div className="col-6 text-start d-flex align-item-center">
                             <p className="A0012"> {e.jobName}</p>
                                </div>
                                <div className="col-6 text-end">
                                  <button className="btn btn-resume"
                                       onClick={()=>{ setRenameModal(true);
                                            setRenameModalData(
                                              e.associatedSector
                                            );
                                        } }>
                                    Rename
                                  </button>

                                  {renameModal ? (
                      <RenameModal
                        props={renameModalData}
                        closeModal={setRenameModal}
                      />
                    ) : null}     
                                </div>
                              </div>
                            </div>
                          </li>
                         ))}      
                      </ul>
                    </div>

                    <div className="col-12  pb-3">
                      <div className="row ">
                        <div className="col-12 text-center">
                          <button
                            className="btn btn-green"
                            //   onClick={()=>setAddModal(true)}
                          >
                            Add a job on {data[0].associatedSector}
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
export default RenameSector;
