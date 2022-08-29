import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../CSS/Sidebar.css';
import Header from "./Header";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'react-hot-toast';
import { logout } from '../redux/actions/userActions';
import $ from 'jquery'
function Sidebar(props: any) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const LogNotify = () => toast.success("Log-Out!");
  
  const LogOut = async () => {
    await dispatch(logout())
    await localStorage.removeItem("token")
    await localStorage.removeItem("archive")
    await localStorage.removeItem("embauch")
    await localStorage.removeItem("profile")
    navigate('/')
    LogNotify()
  }
  useEffect(()=>{
    $(document).on('click','li',function(){
      $(this).addClass('active').siblings().removeClass('active')
      $(this).removeClass('active')
    })
  })
  return (
    <>
      <div className="container-fluid"  style={{ height: "100%",backgroundColor:"white",zIndex:9000000 }}>
        <div className="row" >
          
          <div className="col-xxl-3 col-xl-3 col-lg-3  col-md-3 col-xs-3 fixed pd-gutter pl-0" style={{ height: "100vh",backgroundColor:"white" }}>
            <div
              className="d-flex flex-column sideBarBackG flex-shrink-0"
            >
              <Link
                to="/dashboard"
                className="d-flex bottom-radius logoSet align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none"
              >
                <span>
                  <img src={require("../images/logo-header.svg").default} className="filter-logo" />
                </span>
                <img src={require("../images/LogoName.svg").default} className="filter-text" />
              </Link>
          
              <ul className="nav nav-pills flex-column sideBarBackG mb-auto text-className">
                <li className="nav-item active mt-1 sideBarBackG">
                  <Link to="/dashboard" className="nav-link link-dark  pd013" aria-current="page">
                    <span className="pe-2">
                      <img src={require("../images/Shape.svg").default} />
                    </span>
                    Resume
                  </Link>
                </li>
                <div className="accordion accordion-flush pt-1" id="accordionFlushExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingTwo">
                      <button className="accordion-button sideBarBackG sideBarBackG collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="#flush-collapseTwo">
                        <span className="pe-2">
                          <img src={require("../images/CombinedShape.svg").default} />
                        </span>
                        Leads  / Clients
                      </button>
                    </h2>
                    <div id="flush-collapseTwo" className="accordion-collapse collapse " aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                      <div className="">
                        <ul style={{paddingLeft:"0px",width:"100%"}} className="hello">  <li className="sideBarBackG">
                          <Link to="/clientTodo" className="nav-link link-dark  fontStylingBar">
                          <span className="pe-2">
                        <img src={require("../images/list-text.svg").default} />
                      </span>
                            To do / Non traité / Attente
                          </Link>
                        </li>
                          <li className="sideBarBackG">
                            <Link to="/clientProgress" className="nav-link link-dark  fontStylingBar">
                            <span className="pe-2">
                        <img src={require("../images/analytics.svg").default} />
                      </span>
                              En cours de recherche
                            </Link>
                          </li>
                          <li className="sideBarBackG">
                            <Link to="/clientContract" className="nav-link link-dark  fontStylingBar">
                            <span className="pe-2">
                        <img src={require("../images/contractList.svg").default} />
                      </span>
                              Terminé / Contrat en cours
                            </Link>
                          </li> <li className="sideBarBackG">
                            <Link to="/archived" className="nav-link link-dark fontStylingBar"> <span className="pe-2">
                        <img src={require("../images/archivedList.svg").default} />
                      </span>Annulé / Archivé
                            </Link>
                          </li></ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingThree">
                      <button className="accordion-button sideBarBackG collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                        <span className="pe-2">
                          <img src={require("../images/employeeicon.svg").default} />
                        </span>
                        Candidats / Employés
                      </button>
                    </h2>
                    <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                      <div className="">
                        <ul style={{paddingLeft:"0px",width:"100%"}}>
                          <li className="sideBarBackG">
                            <Link to="/todolist" className="nav-link link-dark fontStylingBar">
                            <span className="pe-2">
                        <img src={require("../images/list-text.svg").default} />
                      </span>
                              En sommeil
                            </Link>
                          </li>
                          <li className="sideBarBackG">
                            <Link to="/preSelected" className="nav-link link-dark fontStylingBar">
                            <span className="pe-2">
                        <img src={require("../images/todoList.svg").default} />
                      </span>
                      Preselected
                            </Link>
                          </li>
                          <li className="sideBarBackG">
                            <Link to="/embauchlist" className="nav-link link-dark fontStylingBar">
                            <span className="pe-2">
                        <img src={require("../images/contractList.svg").default} />
                      </span>Embauché
                           
                            </Link>
                          </li> <li className="sideBarBackG">
                            <Link to="/archivedlist" className="nav-link link-dark fontStylingBar">
                            <span className="pe-2">
                        <img src={require("../images/archivedList.svg").default} />
                      </span>
                              Archivé
                            </Link>
                          </li></ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingOne">
                      <button className="accordion-button sideBarBackG collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span className="pe-2">
                          <img src={require("../images/settings.svg").default} />
                        </span>
                        Manage
                      </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse " aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                      <div className="">
                        <ul style={{paddingLeft:"0px",width:"100%"}} >  <li className="sideBarBackG">
                    <Link to="/addNewSector" className="nav-link link-dark fontStylingBar" aria-current="page">
                      <span className="pe-2">
                        <img src={require("../images/addsector.svg").default} />
                      </span>
                      Add New Sector
                    </Link>
                  </li>
                  <li className="sideBarBackG">
                    <Link to="/userList" className="nav-link link-dark fontStylingBar" aria-current="page">
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
                </div>
                <li style={{ border: '0px' }} className="list-group-item sideBarBackG" onClick={(e) => LogOut()}>
                  <Link to="/" className="signOut" aria-current="page">
                    <span className="pe-2">
                      <img className="logoutImage" src={require("../images/logout.svg").default} />
                    </span>
                    Sign Out
                    <Toaster
                      position="top-right"
                    />
                  </Link>
                </li>

              </ul>
            </div>
          </div>
          <div className="col-xxl-9 col-lg-9 col-md-9 col-xs-9  scroll">
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
