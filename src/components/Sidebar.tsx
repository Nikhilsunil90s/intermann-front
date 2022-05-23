import React from "react";
import { Link } from "react-router-dom";
import '../CSS/Sidebar.css';
import Header from "./Header";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
                <li>
                  <Link to="/addNewSector" className="nav-link" aria-current="page">
                    <span className="pe-2">
                      <img src={require("../images/Shape.svg").default} />
                    </span>
                    Add New Sector
                  </Link>
                </li>
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <span className="pe-2">
                          <img src={require("../images/Combine.svg").default} />
                        </span>
                        Leads  / Clients
                      </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
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
                    <h2 className="accordion-header" id="headingTwo">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        <span className="pe-2">
                          <img src={require("../images/employeeicon.svg").default} />
                        </span>
                        Candidats / Employés
                      </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
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
                    <ToastContainer
                      position="top-right"
                      autoClose={50000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
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
