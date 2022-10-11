import React, { useEffect, useState ,useRef,useCallback} from "react";
import { Link } from "react-router-dom";
import "../CSS/Dashboard.css";
import { API_BASE_URL } from "../config/serverApiConfig";
import { Toaster,toast } from "react-hot-toast";
import { useLocation } from "react-router";
function Dashboard() {
  const [toDoCandidatCount, setToDoCandidatCount] = useState(0);
  const [inProgressCandidatCount, setInProgressCandidatCount] = useState(0);
  const [preSelectedCount, setInPreselectedCount] = useState(0);
  const [archivedCandidatCount, setArchivedCandidatCount] = useState(0);
  const [toDoClientCount, setToDoClientCount] = useState(0);
  const [inProgressClientCount, setInProgressClientCount] = useState(0);
  const [signedClientCount, setSignedClientCount] = useState(0);
  const [archivedClientCount, setArchivedClientCount] = useState(0);
  const [loader, setLoader] = useState( false);


  const fetchCandidatCounts = async () => {
    return await fetch(API_BASE_URL + "getCounts", {
      method: "GET",
      headers: {
        "Accept": 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
    })
      .then(resd => resd.json())
      .then(d => d)
      .catch(err => {
        console.log(err)
      })
  }

  const fetchClientCounts = async () => {
    return await fetch(API_BASE_URL + "getLeadsCount", {
      method: "GET",
      headers: {
        "Accept": 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
    })
      .then(resd => resd.json())
      .then(d => d)
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    fetchCandidatCounts()
      .then((data) => {
        setToDoCandidatCount(data.toDoCount);
        setInProgressCandidatCount(data.inProgressCount);
        setArchivedCandidatCount(data.archivedCount);
        setInPreselectedCount(data.preSelectedCount)
        setLoader(true);
      })
      .catch(err => err)

    fetchClientCounts()
      .then((resp) => {
        setToDoClientCount(resp.toDoCount)
        setInProgressClientCount(resp.inProgressCount)
        setSignedClientCount(resp.signedCount)
        setArchivedClientCount(resp.archivedCount)
       
      })
      .catch(err => {
        console.log(err)
      })
  });

  return (
    <>
      <Toaster position="top-right" containerStyle={{zIndex:"999999999999999999"}}/>
      <div className="container-fluid px-0">
        
        <div className="row mx-0">
          <div className="col-12  card-tops mt-2" style={{padding:"0px",marginBottom:"20px"}}>
            <div className="card d-flex justify-content-center" style={{padding:"0px 15px",borderRadius:"10px",marginBottom:"0px",height:"77px"}}>
              {/* <div className="card-body "> */}
                <h2 className="card-Leads mb-0">Stats Leads / Clients</h2>
              {/* </div> */}
            </div>
          </div>

          <div className=" container-fluid">
            <section id="minimal-statistics">
              <div className="row">
 
                <div className="col-xl-4 col-xxl-4 col-md-6 col-sm-6 col-lg-4 ">
                <Link to="/clientTodo">
                  <div
                    className="card HoveRESTClassCardDash"
                    style={{ padding: "5px 10px", borderRadius: "10px" }}
                  >
                    <div className="card-content">
                      <div className="card-body">
                        <div className="row media d-flex">
                          <div className="col-6 align-self-center">
                            <img src={require("../images/Oval.svg").default} />
                          </div>
                          <div className="col-6 media-body text-right">
                            {loader ? (
                              <>
                                <h3 className="pt-1 NumberStyling text-end">

                                  {toDoClientCount}
                                </h3>
                              </>
                            ) : (
                              <>
                                <div className="d-flex justify-content-end">
                                  <div className="Das-loader"></div>
                                </div>
                              </>
                            )}
                          </div>
                          <div className="text-start">
                            <h3 className="fontStyling">
                              To Do / Non traité / Non signé
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </Link>
                </div>
             
               
                <div className="col-xl-4 col-xxl-4 col-md-6 col-sm-6 col-lg-4 cursor-pointer">
                  <Link to="/clientProgress">
                  <div
                    className="card HoveRESTClassCardDash"
                    style={{ padding: "5px 10px", borderRadius: "10px" }}
                  >
                    <div className="card-content">
                      <div className="card-body">
                        <div className="row media d-flex">
                          <div className="col-6 align-self-center">
                            <img src={require("../images/CardPre.svg").default} />
                          </div>
                          <div className="col-6 media-body text-right">
                          {loader? (<><h3 className="pt-1 NumberStyling text-end">{signedClientCount}</h3></>):(<> <div className="d-flex justify-content-end">
                                  <div className="Das-loader"></div>
                                </div></>)}
                          </div>
                          <div className="text-start">
                            <h3 className="fontStyling">
                            Recherche en cours / Proposal Signed
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </Link>
                </div>
               
                <div className="col-xl-4 col-xxl-4 col-md-6 col-sm-6 col-lg-4">
                <Link to="/clientContract">
                  <div
                    className="card HoveRESTClassCardDash"
                    style={{ padding: "5px 10px", borderRadius: "10px" }}
                  >
                    <div className="card-content">
                      <div className="card-body">
                        <div className="row media d-flex">
                          <div className="col-6 align-self-center">
                            <img src={require("../images/CardTick.svg").default} />
                          </div>
                          <div className="col-6 media-body text-right">
                          {loader? (<><h3 className="pt-1 NumberStyling text-end">{inProgressClientCount}</h3></>):(<> <div className="d-flex justify-content-end">
                                  <div className="Das-loader"></div>
                                </div></>)}
                          </div>
                          <div className="text-start">
                            <h3 className="fontStyling">
                            Contrat en cours / Done
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </Link>
                </div>
  
              
                <div className="col-xl-4 col-xxl-4 col-md-6 col-sm-6 col-lg-4">
                <Link to="/archived">
                  <div
                    className="card HoveRESTClassCardArchived"
                    style={{ padding: "5px 10px", borderRadius: "10px" }}
                  >
                    <div className="card-content">
                      <div className="card-body">
                        <div className="row media d-flex">
                          <div className="col-6 align-self-center">
                            <img src={require("../images/multiply.svg").default} />
                          </div>
                          <div className="col-6 media-body text-right">
                          {loader? (<><h3 className="pt-1 NumberStylingARchived text-end">{archivedClientCount}</h3></>):(<> <div className="d-flex justify-content-end">
                                  <div className="Das-loader"></div>
                                </div></>)}
                          </div>
                          <div className="text-start">
                            <h3 className="fontStyling">
                            Annulé / Archivé / Canceled
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </Link>
                </div>

                
  
              </div>
            </section>
          </div>



          <div className="col-12 card-tops " style={{padding:"0px",marginBottom:"20px"}}>
            <div className="card d-flex justify-content-center" style={{padding:"0px 15px",borderRadius:"10px",marginBottom:"0px",height:"77px"}}>
             
                <h2 className="card-Leads mb-0">Stats Candidats / Employees</h2>
             
            </div>
          </div>

          <div className=" container-fluid">
            <section id="minimal-statistics">
              <div className="row">
              
                <div className="col-xl-4 col-xxl-4 col-md-6 col-sm-6 col-lg-4 ">
                <Link to="/todolist">
                  <div
                    className="card HoveRESTClassCardDash mb-0"
                    style={{ padding: "5px 10px", borderRadius: "10px" }}
                  >
                    <div className="card-content">
                      <div className="card-body">
                        <div className="row media d-flex">
                          <div className="col-6 align-self-center">
                            <img src={require("../images/Oval.svg").default} />
                          </div>
                          <div className="col-6 media-body text-right">
                            {loader ? (
                              <>
                                <h3 className="pt-1 NumberStyling text-end">

                                  {toDoCandidatCount}
                                </h3>
                              </>
                            ) : (
                              <>
                                <div className="d-flex justify-content-end">
                                  <div className="Das-loader"></div>
                                </div>
                              </>
                            )}
                          </div>
                          <div className="text-start">
                            <h3 className="fontStyling">
                            En sommeil / To do
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </Link>
                </div>
                
                <div className="col-xl-4 col-xxl-4 col-md-6 col-sm-6 col-lg-4">
                  <Link to="/preSelected">
                  <div
                    className="card HoveRESTClassCardDash"
                    style={{ padding: "5px 10px", borderRadius: "10px" }}
                  >
                    <div className="card-content">
                      <div className="card-body">
                        <div className="row media d-flex">
                          <div className="col-6 align-self-center">
                            <img src={require("../images/Preselected.svg").default} />
                          </div>
                          <div className="col-6 media-body text-right">
                          {loader? (<><h3 className="pt-1 NumberStyling text-end">{preSelectedCount}</h3></>):(<> <div className="d-flex justify-content-end">
                                  <div className="Das-loader"></div>
                                </div></>)}
                          </div>
                          <div className="text-start">
                            <h3 className="fontStyling">
                            Selected / Pre Selected
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </Link>
                </div>
               
                <div className="col-xl-4 col-xxl-4 col-md-6 col-sm-6 col-lg-4" >
                <Link to="/embauchlist">
                  <div
                    className="card HoveRESTClassCardDash"
                    style={{ padding: "5px 10px", borderRadius: "10px" }}
                  >
                    <div className="card-content">
                      <div className="card-body">
                        <div className="row media d-flex">
                          <div className="col-6 align-self-center">
                            <img src={require("../images/CardTick.svg").default} />
                          </div>
                          <div className="col-6 media-body text-right">
                          {loader? (<><h3 className="pt-1 NumberStyling text-end">{inProgressCandidatCount}</h3></>):(<> <div className="d-flex justify-content-end">
                                  <div className="Das-loader"></div>
                                </div></>)}
                          </div>
                          <div className="text-start">
                            <h3 className="fontStyling">
                            Embauché / Work with us
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </Link> 
                </div>
 
             
                <div className="col-xl-4 col-xxl-4 col-md-6 col-sm-6 col-lg-4">
                <Link to="/archivedlist">
                  <div
                    className="card HoveRESTClassCardArchived"
                    style={{ padding: "5px 10px", borderRadius: "10px" }}
                  >
                    <div className="card-content">
                      <div className="card-body">
                        <div className="row media d-flex">
                          <div className="col-6 align-self-center">
                            <img src={require("../images/multiply.svg").default} />
                          </div>
                          <div className="col-6 media-body text-right">
                          {loader? (<><h3 className="pt-1 NumberStylingARchived text-end" >{archivedCandidatCount}</h3></>):(<> <div className="d-flex justify-content-end">
                                  <div className="Das-loader"></div>
                                </div></>)}
                          </div>
                          <div className="text-start">
                            <h3 className="fontStyling">
                            Archivé / Archived
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </Link>
                </div>
               
              </div>
            </section>
          </div>
          
        </div>
      </div>
    </>
  );
}
export default Dashboard;
