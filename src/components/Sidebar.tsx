import React from "react";
import { Link } from "react-router-dom";
import '../CSS/Sidebar.css';
import Header from "./Header";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'react-hot-toast';
import { logout } from '../redux/actions/userActions'
function Sidebar(props: any) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const LogNotify = () => toast("Log-Out!");
  const LogOut = async () => {
    await dispatch(logout())
    await localStorage.removeItem("token")

    navigate("/")
    LogNotify()
  }
  return (
    <>
      <div className="container-fluid">
        <div className="row  bg-side" style={{ height: "100vh" }}>
          <div className="col-lg-3 col-md-3 col-xs-3 fixed pd-gutter" style={{ height: "100vh" }}>
            <div
              className="d-flex flex-column flex-shrink-0 pt-3 "
            >
              <Link
                to="/dashboard"
                className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
              ><span>
                  <img src={require("../images/logo-header.svg").default} />
                </span>
                <img src={require("../images/LogoName.svg").default} />
              </Link>
              <hr />
              <ul className="nav nav-pills flex-column mb-auto text-className">
                <li className="nav-item">
                  <Link to="#" className="nav-link" aria-current="page">
                    <span className="pe-2">
                      <img src={require("../images/Shape.svg").default} />
                    </span>
                    Résumé
                  </Link>
                </li>
                 
                <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingOne">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span className="pe-2">
                          <img src={require("../images/Combine.svg").default} />
                        </span>
                        Manage
                      </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse " aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                      <div className="accordion-body">
                        <ul>  <li>
                    <Link to="/addNewSector" className="nav-link" aria-current="page">
                      <span className="pe-2">
                        <img src={require("../images/addsector.svg").default} />
                      </span>
                      Add New Sector
                    </Link>
                  </li>
                  <li>
                    <Link to="/userList" className="nav-link" aria-current="page">
                      <span className="pe-2">
                        <img src={require("../images/adduser.svg").default} />
                      </span>
                     User List
                    </Link>
                  </li>
                  </ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingTwo">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="#flush-collapseTwo">
                        <span className="pe-2">
                          <img src={require("../images/Combine.svg").default} />
                        </span>
                        Leads  / Clients
                      </button>
                    </h2>
                    <div id="flush-collapseTwo" className="accordion-collapse collapse " aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                      <div className="accordion-body">
                        <ul>  <li>
                          <Link to="/clientTodo" className="nav-link link-dark">

                            To do / Non traité / Attente
                          </Link>
                        </li>
                          <li>
                            <Link to="/clientProgress" className="nav-link link-dark">

                              En cours de recherche
                            </Link>
                          </li>
                          <li>
                            <Link to="/clientContract" className="nav-link link-dark">
                              Terminé / Contrat en cours
                            </Link>
                          </li> <li>
                            <Link to="/archived" className="nav-link link-dark">Annulé / Archivé
                            </Link>
                          </li></ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingThree">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                        <span className="pe-2">
                          <img src={require("../images/employeeicon.svg").default} />
                        </span>
                        Candidats / Employés
                      </button>
                    </h2>
                    <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                      <div className="accordion-body">
                        <ul>
                          <li>
                            <Link to="/todolist" className="nav-link link-dark">
                              En sommeil
                            </Link>
                          </li>
                          <li>
                            <Link to="/embauchlist" className="nav-link link-dark">Embauché
                            </Link>
                          </li> <li>
                            <Link to="/archivedlist" className="nav-link link-dark">
                              Archivé
                            </Link>
                          </li></ul>
                      </div>
                    </div>
                  </div>

                </div>
                <li className="nav-item text-center Log-Out" onClick={(e) => LogOut()}>
                  <Link to="/" className="nav-link" aria-current="page">
                    <span className="pe-2">
                      <img className="logoutImage" src={require("../images/logout.svg").default} />
                    </span>
                    Log Out
                    <Toaster
                      position="top-right"
                    />
                  </Link>
                </li>

              </ul>
            </div>
          </div>
          <div className="col-lg-9 col-md-9 col-xs-9 scroll">
            <Header />
            <section style={{ marginTop: "60px" }}>
              {props.children}
            </section >
          </div>
        </div>
      </div>

    </>
  );
}
export default Sidebar;
