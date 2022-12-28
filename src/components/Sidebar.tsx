import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../CSS/Sidebar.css';
import Header from "./Header";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'react-hot-toast';
import { logout } from '../redux/actions/userActions';
import $ from 'jquery'
import { motion } from "framer-motion";

function Sidebar(props: any) {
  const [activeTab,setActiveTab]=useState(window.location.href)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const LogNotify = () => toast.success("Log-Out!");
  const [onHover,setOnHover]=useState(false)
  
  const LogOut = async () => {
    await dispatch(logout())
    await localStorage.removeItem("token")
    await localStorage.removeItem("archive")
    await localStorage.removeItem("embauch")
    await localStorage.removeItem("profile")
    await localStorage.removeItem("LoginUser")
    navigate('/')
    LogNotify()
  }
  useEffect(()=>{
    $(document).on('click','li',function(){
      $(this).addClass('active').siblings().removeClass('active')
      $(this).removeClass('active')
    })
  })

  const OnClickColorChange=(name:any)=>{  
    if(name === "Download"){
      navigate("/downloadCenter")
    }
    if(name === "Leads"){
      navigate("/LeadsCenter")
    }   if(name === "Center"){
      navigate("/JobAdsCenter")
    }
    if(name === "Com"){
      navigate("/commercialCenter")
    }
    setActiveTab(name)
  }

  return (
    <>
      <div className="container-fluid"  style={{ height: "100%",backgroundColor:"white",zIndex:9000000 }}>
        <div className="row" >
      
        {
          onHover ?
           <div className="col-xxl-3 col-xl-3 col-lg-3  col-md-3 col-xs-3 fixed pd-gutter pl-0"  style={{ height: "100vh",backgroundColor:"white" ,maxWidth:"21%"}}>
            <div
              className="d-flex flex-column sideBarBackG flex-shrink-0"
            >
              <Link
                to="/dashboard"
              >
                    <motion.div
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: 0.2 }}
                          variants={{
                            visible: { opacity: 1, x: 0 },
                            hidden: { opacity: 0, x: -50 }
                          }}  className="d-flex bottom-radius logoSet justify-content-center align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none"
                          >                <span>
                  <img
         src={require("../images/logo-header.svg").default} className="filter-logo" />
                </span>
                <img src={require("../images/LogoName.svg").default} className="filter-text" />
                </motion.div>
              </Link>
          
              <motion.ul
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: 0.3 }}
                          variants={{
                            visible: { opacity: 1, x: 0 },
                            hidden: { opacity: 0, x: -50 }
                          }} className="nav nav-pills flex-column sideBarBackG mb-auto text-className">
                <motion.li
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: 0.5 }}
                          variants={{
                            visible: { opacity: 1, x: 0 },
                            hidden: { opacity: 0, x: -50 }
                          }} className="nav-item active mt-1 sideBarBackG" onClick={()=>{setActiveTab("")}}>
                  <Link to="/dashboard" className="nav-link link-dark  pd013" aria-current="page">
                    <span className="pe-2">
                      <img src={require("../images/Shape.svg").default} />
                    </span>
                    Resume
                  </Link>
                </motion.li>
                <motion.div
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: 0.6 }}
                          variants={{
                            visible: { opacity: 1, x: 0 },
                            hidden: { opacity: 0, x: -50 }
                          }} className="accordion accordion-flush pt-1" id="accordionFlushExample">
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
                        <ul style={{paddingLeft:"0px",width:"100%"}} className="hello">
                            <li  className={window.location.href.includes("clientTodo") ? "sideBarBackGactive"  : "sideBarBackG"}>
                          <Link to="/clientTodo" className="nav-link link-dark  fontStylingBar">
                          <span className="pe-2">
                        <img src={require("../images/list-text.svg").default} />
                      </span>
                            To do / Non traité / Attente
                          </Link>
                        </li>
                          <li   className={window.location.href.includes("clientProgress") ? "sideBarBackGactive"  : "sideBarBackG"}>
                            <Link to="/clientProgress" className="nav-link link-dark  fontStylingBar">
                            <span className="pe-2">
                        <img src={require("../images/analytics.svg").default} />
                      </span>
                              En cours de recherche
                            </Link>
                          </li>
                          <li   className={window.location.href.includes("clientContract") ? "sideBarBackGactive"  : "sideBarBackG"}>
                            <Link to="/clientContract" className="nav-link link-dark  fontStylingBar">
                            <span className="pe-2">
                        <img src={require("../images/contractList.svg").default} />
                      </span>
                              Terminé / Contrat en cours
                            </Link>
                          </li> <li  className={window.location.href.includes("archived") ? "sideBarBackGactive"  : "sideBarBackG"}>
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
                          <li className={window.location.href.includes("todolist") ? "sideBarBackGactive"  : "sideBarBackG"}>
                            <Link to="/todolist" className="nav-link link-dark fontStylingBar">
                            <span className="pe-2">
                        <img src={require("../images/list-text.svg").default} />
                      </span>
                              En sommeil
                            </Link>
                          </li>
                          <li  className={window.location.href.includes("preSelected") ? "sideBarBackGactive"  : "sideBarBackG"}>
                            <Link to="/preSelected" className="nav-link link-dark fontStylingBar">
                            <span className="pe-2">
                        <img src={require("../images/todoList.svg").default} />
                      </span>
                      Preselected
                            </Link>
                          </li>
                          <li   className={window.location.href.includes("embauchlist") ? "sideBarBackGactive"  : "sideBarBackG"}>
                            <Link to="/embauchlist" className="nav-link link-dark fontStylingBar">
                            <span className="pe-2">
                        <img src={require("../images/contractList.svg").default} />
                      </span>Embauché
                           
                            </Link>
                          </li> <li  className={window.location.href.includes("archivedlist") ? "sideBarBackGactive"  : "sideBarBackG"}>
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
                        <ul style={{paddingLeft:"0px",width:"100%"}} >  <li className={window.location.href.includes("addNewSector") ? "sideBarBackGactive"  : "sideBarBackG"}>
                    <Link to="/addNewSector" className="nav-link link-dark fontStylingBar" aria-current="page">
                      <span className="pe-2">
                        <img src={require("../images/addsector.svg").default} />
                      </span>
                      Add New Sector
                    </Link>
                  </li>
                  <li className={window.location.href.includes("userList") ? "sideBarBackGactive"  : "sideBarBackG"}  onClick={(e)=>OnClickColorChange("User List")}>
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
                </motion.div>
                <motion.li
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: 0.8 }}
                          variants={{
                            visible: { opacity: 1, x: 0 },
                            hidden: { opacity: 0, x: -50 }
                          }} style={{border:"none",borderBottom:"0px",borderLeft:"0px",padding:"12px ",paddingLeft:"23px" }}    onClick={()=>OnClickColorChange("Download")}   className={window.location.href.includes("downloadCenter") ? "sideBarBackGactive"  : "cursor-pointer sideBarBackG"} >
                  <Link to="/downloadCenter" className="signOut" aria-current="page">
                    <span className="pe-2">
                      <img className="logoutImage" src={require("../images/telecharger.svg").default} />
                    </span>
                    Download Center
                    <Toaster
                      position="top-right"
                    />
                  </Link>
                </motion.li>
                <motion.li
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: 0.9 }}
                          variants={{
                            visible: { opacity: 1, x: 0 },
                            hidden: { opacity: 0, x: -50 }
                          }} style={{border:"none",borderBottom:"0px",borderLeft:"0px" ,padding:"12px",paddingLeft:"23px"}} onClick={()=>OnClickColorChange("Leads")} className={window.location.href.includes("LeadsCenter")  ? "sideBarBackGactive"  : "cursor-pointer sideBarBackG"}  >
                  <Link to="/LeadsCenter" className="signOut" aria-current="page"   >
                    <span className="pe-2">
                      <img className="logoutImage" src={require("../images/Leads.svg").default} />
                    </span>
                    Leads Center
                    <Toaster
                      position="top-right"
                    />
                  </Link>
                </motion.li>
                <motion.li
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: 0.10 }}
                          variants={{
                            visible: { opacity: 1, x: 0 },
                            hidden: { opacity: 0, x: -50 }
                          }} style={{border:"none",borderBottom:"0px",borderLeft:"0px" ,padding:"12px",paddingLeft:"23px"}}  onClick={()=>OnClickColorChange("Center")}  className={window.location.href.includes("JobAdsCenter")  ? "sideBarBackGactive"  : " cursor-pointer sideBarBackG"}  >
                  <Link to="/JobAdsCenter" className="signOut" aria-current="page"  >
                    <span className="pe-2">
                      <img className="logoutImage" src={require("../images/CombinedShape.svg").default} />
                    </span>
                    Job Ads Center
                    <Toaster
                      position="top-right"
                    />
                  </Link>
                </motion.li>
                <motion.li
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: 0.10 }}
                          variants={{
                            visible: { opacity: 1, x: 0 },
                            hidden: { opacity: 0, x: -50 }
                          }} style={{border:"none",borderBottom:"0px",borderLeft:"0px" ,padding:"12px",paddingLeft:"23px"}}  onClick={()=>OnClickColorChange("Com")}  className={window.location.href.includes("commercialCenter")  ? "sideBarBackGactive"  : " cursor-pointer sideBarBackG"}  >
                  <Link to="/commercialCenter" className="signOut" aria-current="page"  >
                    <span className="pe-2">
                      <img className="logoutImage" src={require("../images/comIcon.svg").default} />
                    </span>
                    Commercial Center
                    <Toaster
                      position="top-right"
                    />
                  </Link>
                </motion.li>
                <motion.li
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: 0.11 }}
                          variants={{
                            visible: { opacity: 1, x: 0 },
                            hidden: { opacity: 0, x: -50 }
                          }} style={{ borderTop: '1px solid #ffff',borderBottom:"0px",borderLeft:"0px" }} className="list-group-item sideBarBackG cursor-pointer" onClick={(e) => LogOut()}>
                  <Link to="/" className="signOut " aria-current="page">
                    <span className="pe-2">
                      <img className="logoutImage" src={require("../images/logout.svg").default} />
                    </span>
                    Sign Out
                    <Toaster
                      position="top-right"
                    />
                  </Link>
                </motion.li>

              </motion.ul>
            </div>
          </div> 
          :
    
          <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          variants={{
            visible: { opacity: 1, x: 0 },
            hidden: { opacity: 0, x: -50 }
          }}  className="col-xxl-2 col-xl-2 col-lg-2 sideBarBackG col-md-2 col-xs-2 fixed pd-gutter pl-0 " onHoverStart={()=>setOnHover(true)}   style={{ height: "100vh",maxWidth:"7%"}}>
         
              
                <div className="Logo p-1 d-flex align-items-center justify-content-center" style={{height:"70px",borderBottom:"1px solid #fff"}}>
             
                  <img
         src={require("../images/logo-header.svg").default} className="filter-logo" />
            
            </div>
            <ul className="ulStyleSideBar p-0">
              <li className=" d-flex align-items-center justify-content-center">
                <div className="activeDiv">
              <img style={{height:"25px",width:"35px"}} src={require("../images/Shape.svg").default} />
              </div>
              </li>
              <li className=" d-flex align-items-center justify-content-center">
                {window.location.href.includes("clientTodo") || window.location.href.includes("clientProgress") || window.location.href.includes("clientContract") || window.location.href.includes("archived")  ? 
  <div className={"activeDiv"}>
  <img style={{height:"25px",width:"35px"}} className="FilterMinibar" src={require("../images/CombinedShape.svg").default} />
  </div>
  :
  <div >
  <img style={{height:"25px",width:"35px"}}  src={require("../images/CombinedShape.svg").default} />
  </div>
                }
                  
              </li>
              <li className=" d-flex align-items-center justify-content-center">
                {
                  window.location.href.includes("todolist") || window.location.href.includes("preSelected") || window.location.href.includes("embauchlist") || window.location.href.includes("archivedlist")  ? 
                  <div className={"activeDiv"}>
              <img style={{height:"25px",width:"35px"}} className="FilterMinibar" src={require("../images/employeeicon.svg").default} />
              </div>

              :
              <div >
              <img style={{height:"25px",width:"35px"}} src={require("../images/employeeicon.svg").default} />
              </div>
                }
                
              </li>
              <li className=" d-flex align-items-center justify-content-center">
                {window.location.href.includes("addNewSector") || window.location.href.includes("userList") ?

<div className="activeDiv">
              <img style={{height:"25px",width:"35px"}} className="FilterMinibar" src={require("../images/settings.svg").default}  />
              </div>
:
<div className="">
              <img style={{height:"25px",width:"35px"}} src={require("../images/settings.svg").default}  />
              </div>

                }
                    
              </li>
              <li className=" d-flex align-items-center justify-content-center">
                {
                  window.location.href.includes("downloadCenter") ? 
                  <div className={ "activeDiv "}>
                  <img style={{height:"25px",width:"35px",}} className="FilterMinibar" src={require("../images/telecharger.svg").default}  />
                  </div>
                  :
                  <div className={""}>
                  <img style={{height:"25px",width:"35px",}} src={require("../images/telecharger.svg").default}  />
                  </div>

                }
                  
              </li>
              <li className=" d-flex align-items-center justify-content-center">
                {
                  window.location.href.includes("LeadsCenter") ?  

                  <div className={window.location.href.includes("LeadsCenter") ?   "activeDiv" :""}>
                  <img style={{height:"25px",width:"35px"}} className="FilterMinibar" src={require("../images/Leads.svg").default}  />
                  </div>
                  :

                  <div >
                  <img style={{height:"25px",width:"35px"}} src={require("../images/Leads.svg").default}  />
                  </div>
                }
                   
              </li>
              <li className=" d-flex align-items-center justify-content-center">
                {
                  window.location.href.includes("JobAdsCenter")  ?
                  <div className={"activeDiv"}>
                  <img style={{height:"25px",width:"35px"}} className="FilterMinibar" src={require("../images/CombinedShape.svg").default}  />
                  </div>  

                  :
                  <div className={""}>
                  <img style={{height:"25px",width:"35px"}} src={require("../images/CombinedShape.svg").default}  />
                  </div>
                }
                 
              </li>
              <li className=" d-flex align-items-center justify-content-center">
             { window.location.href.includes("commercialCenter") ?
                    <div className={"activeDiv "}>
              <img style={{height:"25px",width:"35px"}} className="FilterMinibar" src={require("../images/comIcon.svg").default }  />
              </div>
              :
              <div className={""}>
              <img style={{height:"25px",width:"35px"}} className="" src={  require("../images/comIcon.svg").default}  />
              </div>
             }
              </li>
              <li className="mt-1 d-flex align-items-center justify-content-center">
                    <div className={window.location.href.includes("/") ?   "" :""}>
              <img style={{height:"25px",width:"35px"}} src={require("../images/logout.svg").default} />
              </div>
              </li>
            </ul>
              

        </motion.div>
        }
          {/* <div className="col-xxl-3 col-xl-3 col-lg-3  col-md-3 col-xs-3 fixed pd-gutter pl-0" style={{ height: "100vh",backgroundColor:"white" ,maxWidth:"21%"}}>
            <div
              className="d-flex flex-column sideBarBackG flex-shrink-0"
            >
              <Link
                to="/dashboard"
              >
                    <motion.div
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: 0.2 }}
                          variants={{
                            visible: { opacity: 1, x: 0 },
                            hidden: { opacity: 0, x: -50 }
                          }}  className="d-flex bottom-radius logoSet justify-content-center align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none"
                          >                <span>
                  <img
         src={require("../images/logo-header.svg").default} className="filter-logo" />
                </span>
                <img src={require("../images/LogoName.svg").default} className="filter-text" />
                </motion.div>
              </Link>
          
              <motion.ul
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: 0.3 }}
                          variants={{
                            visible: { opacity: 1, x: 0 },
                            hidden: { opacity: 0, x: -50 }
                          }} className="nav nav-pills flex-column sideBarBackG mb-auto text-className">
                <motion.li
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: 0.5 }}
                          variants={{
                            visible: { opacity: 1, x: 0 },
                            hidden: { opacity: 0, x: -50 }
                          }} className="nav-item active mt-1 sideBarBackG" onClick={()=>{setActiveTab("")}}>
                  <Link to="/dashboard" className="nav-link link-dark  pd013" aria-current="page">
                    <span className="pe-2">
                      <img src={require("../images/Shape.svg").default} />
                    </span>
                    Resume
                  </Link>
                </motion.li>
                <motion.div
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: 0.6 }}
                          variants={{
                            visible: { opacity: 1, x: 0 },
                            hidden: { opacity: 0, x: -50 }
                          }} className="accordion accordion-flush pt-1" id="accordionFlushExample">
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
                        <ul style={{paddingLeft:"0px",width:"100%"}} className="hello">
                            <li  className={window.location.href.includes("clientTodo") ? "sideBarBackGactive"  : "sideBarBackG"}>
                          <Link to="/clientTodo" className="nav-link link-dark  fontStylingBar">
                          <span className="pe-2">
                        <img src={require("../images/list-text.svg").default} />
                      </span>
                            To do / Non traité / Attente
                          </Link>
                        </li>
                          <li   className={window.location.href.includes("clientProgress") ? "sideBarBackGactive"  : "sideBarBackG"}>
                            <Link to="/clientProgress" className="nav-link link-dark  fontStylingBar">
                            <span className="pe-2">
                        <img src={require("../images/analytics.svg").default} />
                      </span>
                              En cours de recherche
                            </Link>
                          </li>
                          <li   className={window.location.href.includes("clientContract") ? "sideBarBackGactive"  : "sideBarBackG"}>
                            <Link to="/clientContract" className="nav-link link-dark  fontStylingBar">
                            <span className="pe-2">
                        <img src={require("../images/contractList.svg").default} />
                      </span>
                              Terminé / Contrat en cours
                            </Link>
                          </li> <li  className={window.location.href.includes("archived") ? "sideBarBackGactive"  : "sideBarBackG"}>
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
                          <li className={window.location.href.includes("todolist") ? "sideBarBackGactive"  : "sideBarBackG"}>
                            <Link to="/todolist" className="nav-link link-dark fontStylingBar">
                            <span className="pe-2">
                        <img src={require("../images/list-text.svg").default} />
                      </span>
                              En sommeil
                            </Link>
                          </li>
                          <li  className={window.location.href.includes("preSelected") ? "sideBarBackGactive"  : "sideBarBackG"}>
                            <Link to="/preSelected" className="nav-link link-dark fontStylingBar">
                            <span className="pe-2">
                        <img src={require("../images/todoList.svg").default} />
                      </span>
                      Preselected
                            </Link>
                          </li>
                          <li   className={window.location.href.includes("embauchlist") ? "sideBarBackGactive"  : "sideBarBackG"}>
                            <Link to="/embauchlist" className="nav-link link-dark fontStylingBar">
                            <span className="pe-2">
                        <img src={require("../images/contractList.svg").default} />
                      </span>Embauché
                           
                            </Link>
                          </li> <li  className={window.location.href.includes("archivedlist") ? "sideBarBackGactive"  : "sideBarBackG"}>
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
                        <ul style={{paddingLeft:"0px",width:"100%"}} >  <li className={window.location.href.includes("addNewSector") ? "sideBarBackGactive"  : "sideBarBackG"}>
                    <Link to="/addNewSector" className="nav-link link-dark fontStylingBar" aria-current="page">
                      <span className="pe-2">
                        <img src={require("../images/addsector.svg").default} />
                      </span>
                      Add New Sector
                    </Link>
                  </li>
                  <li className={window.location.href.includes("userList") ? "sideBarBackGactive"  : "sideBarBackG"}  onClick={(e)=>OnClickColorChange("User List")}>
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
                </motion.div>
                <motion.li
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: 0.8 }}
                          variants={{
                            visible: { opacity: 1, x: 0 },
                            hidden: { opacity: 0, x: -50 }
                          }} style={{border:"none",borderBottom:"0px",borderLeft:"0px",padding:"12px ",paddingLeft:"23px" }}    onClick={()=>OnClickColorChange("Download")}   className={window.location.href.includes("downloadCenter") ? "sideBarBackGactive"  : "cursor-pointer sideBarBackG"} >
                  <Link to="/downloadCenter" className="signOut" aria-current="page">
                    <span className="pe-2">
                      <img className="logoutImage" src={require("../images/telecharger.svg").default} />
                    </span>
                    Download Center
                    <Toaster
                      position="top-right"
                    />
                  </Link>
                </motion.li>
                <motion.li
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: 0.9 }}
                          variants={{
                            visible: { opacity: 1, x: 0 },
                            hidden: { opacity: 0, x: -50 }
                          }} style={{border:"none",borderBottom:"0px",borderLeft:"0px" ,padding:"12px",paddingLeft:"23px"}} onClick={()=>OnClickColorChange("Leads")} className={window.location.href.includes("LeadsCenter")  ? "sideBarBackGactive"  : "cursor-pointer sideBarBackG"}  >
                  <Link to="/LeadsCenter" className="signOut" aria-current="page"   >
                    <span className="pe-2">
                      <img className="logoutImage" src={require("../images/Leads.svg").default} />
                    </span>
                    Leads Center
                    <Toaster
                      position="top-right"
                    />
                  </Link>
                </motion.li>
                <motion.li
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: 0.10 }}
                          variants={{
                            visible: { opacity: 1, x: 0 },
                            hidden: { opacity: 0, x: -50 }
                          }} style={{border:"none",borderBottom:"0px",borderLeft:"0px" ,padding:"12px",paddingLeft:"23px"}}  onClick={()=>OnClickColorChange("Center")}  className={window.location.href.includes("JobAdsCenter")  ? "sideBarBackGactive"  : " cursor-pointer sideBarBackG"}  >
                  <Link to="/JobAdsCenter" className="signOut" aria-current="page"  >
                    <span className="pe-2">
                      <img className="logoutImage" src={require("../images/CombinedShape.svg").default} />
                    </span>
                    Job Ads Center
                    <Toaster
                      position="top-right"
                    />
                  </Link>
                </motion.li>
                <motion.li
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: 0.10 }}
                          variants={{
                            visible: { opacity: 1, x: 0 },
                            hidden: { opacity: 0, x: -50 }
                          }} style={{border:"none",borderBottom:"0px",borderLeft:"0px" ,padding:"12px",paddingLeft:"23px"}}  onClick={()=>OnClickColorChange("Com")}  className={window.location.href.includes("commercialCenter")  ? "sideBarBackGactive"  : " cursor-pointer sideBarBackG"}  >
                  <Link to="/commercialCenter" className="signOut" aria-current="page"  >
                    <span className="pe-2">
                      <img className="logoutImage" src={require("../images/comIcon.svg").default} />
                    </span>
                    Commercial Center
                    <Toaster
                      position="top-right"
                    />
                  </Link>
                </motion.li>
                <motion.li
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: 0.11 }}
                          variants={{
                            visible: { opacity: 1, x: 0 },
                            hidden: { opacity: 0, x: -50 }
                          }} style={{ borderTop: '1px solid #ffff',borderBottom:"0px",borderLeft:"0px" }} className="list-group-item sideBarBackG cursor-pointer" onClick={(e) => LogOut()}>
                  <Link to="/" className="signOut " aria-current="page">
                    <span className="pe-2">
                      <img className="logoutImage" src={require("../images/logout.svg").default} />
                    </span>
                    Sign Out
                    <Toaster
                      position="top-right"
                    />
                  </Link>
                </motion.li>

              </motion.ul>
            </div>
          </div> */}
          <div className="col-xxl-9 col-lg-9 col-md-9 col-xs-9  scroll"  onMouseEnter={()=>setOnHover(false)} style={{ maxWidth:onHover ? "79%" : "93%"}}>
          <Header onHover={onHover} />
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
