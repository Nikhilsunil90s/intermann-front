import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/Sidebar.css";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { logout } from "../redux/actions/userActions";
import $ from "jquery";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { GetRoute } from "./ApisFunction/FunctionsApi";
import useCountDown from 'react-countdown-hook';
import { API_BASE_URL } from "../config/serverApiConfig";
import ReleaseVersionBanner from "./ReleaseVersionBanner/releaseVersionBanner";

function Sidebar(props: any) {
  const [onHover, setOnHover] = useState({
    miniBar: false,
    SideBar: false,
  });
  const initialTime = 10 * 1000; // initial time in milliseconds, defaults to 60000
  const interval = 1000; // interval to change remaining time amount, defaults to 1000

  const [timeLeft, { start, pause, resume, reset }] = useCountDown(initialTime, interval);
  // React.useEffect(() => {
  //   start();
  // }, []);
    
  const restart = React.useCallback(() => {
    // you can start existing timer with an arbitrary value
    // if new value is not passed timer will start with initial value
    const newTime = 20 * 1000;
    start(newTime);
  }, []);
  const LoginUser = JSON.parse(localStorage.getItem("LoginUser"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LogNotify = () => toast.success("Log-Out!");
  const [onClickBarOpenClose, setOnClickBarOpen] = useState(true);

  const [releaseVersionAlert, setReleaseVersionAlert] = useState(false);
  const [storedVersion, setStoredVersion] = useState(JSON.parse(localStorage.getItem('versionData')) || null)

  useEffect(() => {
    const checkReleaseVersion = async () => {
      let versionResponse = await fetch(API_BASE_URL + 'check-heroku-updates')
      let versionData = await versionResponse.json();

      if (storedVersion !== null && JSON.stringify(storedVersion) === JSON.stringify(versionData)) {
        console.log("Version Data Not Changed - ", storedVersion, versionData);
        setReleaseVersionAlert(false);
      } else {
        localStorage.setItem('versionData', JSON.stringify(versionData));
        console.log("Version Data Changed - ", storedVersion, versionData);
        setReleaseVersionAlert(true);
      }
    }

    checkReleaseVersion()
  }, [])



  const LogOut = async () => {
    await dispatch(logout());
    await Cookies.remove("token");
    await localStorage.removeItem("token");
    await localStorage.removeItem("archive");
    await localStorage.removeItem("embauch");
    await localStorage.removeItem("profile");
    await localStorage.removeItem("LoginUser");
    navigate("/");
    LogNotify();
  };
  let login = Cookies.get("token");
  let token = localStorage.getItem("token");

  // const checkHerokuUpdates=async()=>{
  //  await GetRoute("check-heroku-updates").then((res)=>{
  //     if(res.logout_and_refresh){
  //        dispatch(logout());
  //        Cookies.remove("token");
  //        localStorage.removeItem("token");
  //        localStorage.removeItem("archive");
  //        localStorage.removeItem("embauch");
  //        localStorage.removeItem("profile");
  //        localStorage.removeItem("LoginUser");
  //       LogNotify();
  //       window.location.href = "/"
  //     }
  //   }).catch(err=>console.log(err))
  // }
 

  // if(timeLeft === 0){
  //   restart()
  //   checkHerokuUpdates()
  // }


  useEffect(() => {
    if (token) {
      LogOut();
    }
    if (!login) {
      LogOut();
    }
  }, [login]);

  // console.log(state?.login?.user)
  useEffect(() => {
    $(document).on("click", "li", function () {
      $(this).addClass("active").siblings().removeClass("active");
      $(this).removeClass("active");
    });
  });

  const OnClickColorChange = (name: any) => {
    if (name === "Download") {
      navigate("/downloadCenter");
    }
    if (name === "Leads") {
      navigate("/LeadsCenter");
    }
    if (name === "Center") {
      navigate("/JobAdsCenter");
    }
    if (name === "Com") {
      navigate("/commercialCenter");
    }
    if (name === "bill") {
      navigate("/billing-center");
    }
    if (name === "offer") {
      navigate("/offerCenter");
    }
  
  };

  return (
    <>
      <Toaster position="top-right" />
      {
            releaseVersionAlert ? <ReleaseVersionBanner versionAlert={setReleaseVersionAlert} message={"A New Version for Intermann CRM has been released. Please Click on the Button on Right to update your CRM!"}/> : null
      }
      <div
        className="container-fluid"
        style={{ height: "100%", backgroundColor: "white", zIndex: 9000000 }}
      >
        <div className="row">
          {onClickBarOpenClose ? (
            <div
              className="col-xxl-3 col-xl-3 col-lg-3  col-md-3 col-xs-3 fixed pd-gutter pl-0 sidebarScroll"
              style={{
                height: "100vh",
                backgroundColor: "white",
                maxWidth: "21%",
              }}
            >
              <div className="d-flex flex-column sideBarBackG flex-shrink-0">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setOnClickBarOpen(false);
                    setOnHover({ ...onHover, miniBar: false });
                  }}
                >
                  <img alt="..." 
                    src={require("../images/close.png")}
                    className="closeClick"
                  />
                </div>
                <Link to="/dashboard">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    variants={{
                      visible: { opacity: 1, x: 0 },
                      hidden: { opacity: 0, x: -50 },
                    }}
                    className="d-flex bottom-radius logoSet justify-content-center align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none"
                  >
                    <span>
                      <img alt="..." 
                        src={require("../images/logo-header.svg").default}
                        className="filter-logo"
                      />
                    </span>
                    <img alt="..." 
                      src={require("../images/LogoName.svg").default}
                      className="filter-text"
                    />
                  </motion.div>
                </Link>
                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  variants={{
                    visible: { opacity: 1, x: 0 },
                    hidden: { opacity: 0, x: -50 },
                  }}
                  className="nav nav-pills flex-column sideBarBackG mb-auto text-className"
                >
                  <motion.li
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    variants={{
                      visible: { opacity: 1, x: 0 },
                      hidden: { opacity: 0, x: -50 },
                    }}
                    className="nav-item active mt-1 sideBarBackG"
                  
                  >
                    <Link
                      to="/dashboard"
                      className="nav-link link-dark  pd013"
                      aria-current="page"
                    >
                      <span className="pe-2">
                        <img   alt="..." src={require("../images/Shape.svg").default} />
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
                      hidden: { opacity: 0, x: -50 },
                    }}
                    className="accordion accordion-flush pt-1"
                    id="accordionFlushExample"
                  >
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="flush-headingTwo">
                        <button
                          className="accordion-button sideBarBackG sideBarBackG collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseTwo"
                          aria-expanded="false"
                          aria-controls="#flush-collapseTwo"
                        >
                          <span className="pe-2">
                            <img alt="..." 
                              src={
                                require("../images/CombinedShape.svg").default
                              }
                            />
                          </span>
                          Customers / Clients
                        </button>
                      </h2>
                      <div
                        id="flush-collapseTwo"
                        className="accordion-collapse collapse "
                        aria-labelledby="flush-headingTwo"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="">
                          <ul
                            style={{ paddingLeft: "0px", width: "100%" }}
                            className="hello"
                          >
                            <li
                              className={
                                window.location.href.includes("clientTodo")
                                  ? "sideBarBackGactive"
                                  : "sideBarBackG"
                              }
                            >
                              <Link
                                to="/clientTodo"
                                className="nav-link link-dark  fontStylingBar"
                              >
                                <span className="pe-2">
                                  <img alt="..." 
                                    className={
                                      window.location.href.includes(
                                        "clientTodo"
                                      )
                                        ? "FilterMinibar"
                                        : ""
                                    }
                                    src={
                                      require("../images/list-text.svg").default
                                    }
                                  />
                                </span>
                                To do / Non traité / Attente
                              </Link>
                            </li>
                            <li
                              className={
                                window.location.href.includes("clientProgress")
                                  ? "sideBarBackGactive"
                                  : "sideBarBackG"
                              }
                            >
                              <Link
                                to="/clientProgress"
                                className="nav-link link-dark  fontStylingBar"
                              >
                                <span className="pe-2">
                                  <img alt="..." 
                                    className={
                                      window.location.href.includes(
                                        "clientProgress"
                                      )
                                        ? "FilterMinibar"
                                        : ""
                                    }
                                    src={
                                      require("../images/analytics.svg").default
                                    }
                                  />
                                </span>
                                En cours de recherche
                              </Link>
                            </li>
                            <li
                              className={
                                window.location.href.includes("clientContract")
                                  ? "sideBarBackGactive"
                                  : "sideBarBackG"
                              }
                            >
                              <Link
                                to="/clientContract"
                                className="nav-link link-dark  fontStylingBar"
                              >
                                <span className="pe-2">
                                  <img alt="..." 
                                    className={
                                      window.location.href.includes(
                                        "clientContract"
                                      )
                                        ? "FilterMinibar"
                                        : ""
                                    }
                                    src={
                                      require("../images/contractList.svg")
                                        .default
                                    }
                                  />
                                </span>
                                Terminé / Contrat en cours
                              </Link>
                            </li>
                            <li
                              className={
                                window.location.href.includes("archived")
                                  ? "sideBarBackGactive"
                                  : "sideBarBackG"
                              }
                            >
                              <Link
                                to="/archived"
                                className="nav-link link-dark fontStylingBar"
                              >
                                <span className="pe-2">
                                  <img alt="..." 
                                    className={
                                      window.location.href.includes("archived")
                                        ? "FilterMinibar"
                                        : ""
                                    }
                                    src={
                                      require("../images/archivedList.svg")
                                        .default
                                    }
                                  />
                                </span>
                                Annulé / Archivé
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="flush-headingThree">
                        <button
                          className="accordion-button sideBarBackG collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseThree"
                          aria-expanded="false"
                          aria-controls="flush-collapseThree"
                        >
                          <span className="pe-2">
                            <img alt="..." 
                              src={
                                require("../images/employeeicon.svg").default
                              }
                            />
                          </span>
                          Candidats / Worker
                        </button>
                      </h2>
                      <div
                        id="flush-collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="flush-headingThree"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="">
                          <ul style={{ paddingLeft: "0px", width: "100%" }}>
                            <li
                              className={
                                window.location.href.includes("todolist")
                                  ? "sideBarBackGactive"
                                  : "sideBarBackG"
                              }
                            >
                              <Link
                                to="/todolist"
                                className="nav-link link-dark fontStylingBar"
                              >
                                <span className="pe-2">
                                  <img alt="..." 
                                    className={
                                      window.location.href.includes("todolist")
                                        ? "FilterMinibar"
                                        : ""
                                    }
                                    src={
                                      require("../images/list-text.svg").default
                                    }
                                  />
                                </span>
                                To do /  Candidats Potentiels
                              </Link>
                            </li>
                            <li
                              className={
                                window.location.href.includes("preSelected")
                                  ? "sideBarBackGactive"
                                  : "sideBarBackG"
                              }
                            >
                              <Link
                                to="/preSelected"
                                className="nav-link link-dark fontStylingBar"
                              >
                                <span className="pe-2">
                                  <img alt="..." 
                                    className={
                                      window.location.href.includes(
                                        "preSelected"
                                      )
                                        ? "FilterMinibar"
                                        : ""
                                    }
                                    src={
                                      require("../images/todoList.svg").default
                                    }
                                  />
                                </span>
                                Preselected
                              </Link>
                            </li>
                            <li
                              className={
                                window.location.href.includes("embauchlist")
                                  ? "sideBarBackGactive"
                                  : "sideBarBackG"
                              }
                            >
                              <Link
                                to="/embauchlist"
                                className="nav-link link-dark fontStylingBar"
                              >
                                <span className="pe-2">
                                  <img alt="..." 
                                    className={
                                      window.location.href.includes(
                                        "embauchlist"
                                      )
                                        ? "FilterMinibar"
                                        : ""
                                    }
                                    src={
                                      require("../images/contractList.svg")
                                        .default
                                    }
                                  />
                                </span>
                                Embauché / Hired 
                              </Link>
                            </li>
                            <li
                              className={
                                window.location.href.includes("archivedlist")
                                  ? "sideBarBackGactive"
                                  : "sideBarBackG"
                              }
                            >
                              <Link
                                to="/archivedlist"
                                className="nav-link link-dark fontStylingBar"
                              >
                                <span className="pe-2">
                                  <img alt="..." 
                                    className={
                                      window.location.href.includes(
                                        "archivedlist"
                                      )
                                        ? "FilterMinibar"
                                        : ""
                                    }
                                    src={
                                      require("../images/archivedList.svg")
                                        .default
                                    }
                                  />
                                </span>
                                Archivé / Deleted 
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="flush-headingOne">
                        <button
                          className="accordion-button sideBarBackG collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseOne"
                          aria-expanded="false"
                          aria-controls="flush-collapseOne"
                        >
                          <span className="pe-2">
                            <img alt="..." 
                              src={require("../images/settings.svg").default}
                            />
                          </span>
                          Manage
                        </button>
                      </h2>
                      <div
                        id="flush-collapseOne"
                        className="accordion-collapse collapse "
                        aria-labelledby="flush-headingOne"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="">
                          <ul style={{ paddingLeft: "0px", width: "100%" }}>
                            <li
                              className={
                                window.location.href.includes("addNewSector")
                                  ? "sideBarBackGactive"
                                  : "sideBarBackG"
                              }
                            >
                              <Link
                                to="/addNewSector"
                                className="nav-link link-dark fontStylingBar"
                                aria-current="page"
                              >
                                <span className="pe-2">
                                  <img alt="..." 
                                    className={
                                      window.location.href.includes(
                                        "addNewSector"
                                      )
                                        ? "FilterMinibar"
                                        : ""
                                    }
                                    src={
                                      require("../images/addsector.svg").default
                                    }
                                  />
                                </span>
                                Add New Sector
                              </Link>
                            </li>
                            <li
                              className={
                                window.location.href.includes("userList")
                                  ? "sideBarBackGactive"
                                  : "sideBarBackG"
                              }
                              onClick={(e) => OnClickColorChange("User List")}
                            >
                              <Link
                                to="/userList"
                                className="nav-link link-dark fontStylingBar"
                                aria-current="page"
                              >
                                <span className="pe-2">
                                  <img alt="..." 
                                    className={
                                      window.location.href.includes("userList")
                                        ? "FilterMinibar"
                                        : ""
                                    }
                                    src={
                                      require("../images/adduser.svg").default
                                    }
                                  />
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
                      hidden: { opacity: 0, x: -50 },
                    }}
                    style={{
                      border: "none",
                      borderBottom: "0px",
                      borderLeft: "0px",
                      padding: "12px ",
                      paddingLeft: "23px",
                    }}
                    onClick={() => OnClickColorChange("Download")}
                    className={
                      window.location.href.includes("downloadCenter")
                        ? "sideBarBackGactive"
                        : "cursor-pointer sideBarBackG"
                    }
                  >
                    <Link
                      to="/downloadCenter"
                      className="signOut"
                      aria-current="page"
                    >
                      <span className="pe-2">
                        <img alt="..." 
                          className={
                            window.location.href.includes("downloadCenter")
                              ? "FilterMinibar logoutImage"
                              : "logoutImage"
                          }
                          src={require("../images/telecharger.svg").default}
                        />
                      </span>
                      Download Center
                    </Link>
                  </motion.li>
                  <motion.li
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.9 }}
                    variants={{
                      visible: { opacity: 1, x: 0 },
                      hidden: { opacity: 0, x: -50 },
                    }}
                    style={{
                      border: "none",
                      borderBottom: "0px",
                      borderLeft: "0px",
                      padding: "12px",
                      paddingLeft: "23px",
                    }}
                    onClick={() => OnClickColorChange("Leads")}
                    className={
                      window.location.href.includes("LeadsCenter")
                        ? "sideBarBackGactive"
                        : "cursor-pointer sideBarBackG"
                    }
                  >
                    <Link
                      to="/LeadsCenter"
                      className="signOut"
                      aria-current="page"
                    >
                      <span className="pe-2">
                        <img alt="..." 
                          className={
                            window.location.href.includes("LeadsCenter")
                              ? "FilterMinibar logoutImage"
                              : "logoutImage"
                          }
                          src={require("../images/Leads.svg").default}
                        />
                      </span>
                      Leads Center
                    </Link>
                  </motion.li>
                  <motion.li
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    variants={{
                      visible: { opacity: 1, x: 0 },
                      hidden: { opacity: 0, x: -50 },
                    }}
                    style={{
                      border: "none",
                      borderBottom: "0px",
                      borderLeft: "0px",
                      padding: "12px",
                      paddingLeft: "23px",
                    }}
                    onClick={() => OnClickColorChange("Center")}
                    className={
                      window.location.href.includes("JobAdsCenter")
                        ? "sideBarBackGactive"
                        : " cursor-pointer sideBarBackG"
                    }
                  >
                    <Link
                      to="/JobAdsCenter"
                      className="signOut"
                      aria-current="page"
                    >
                      <span className="pe-2">
                        <img alt="..." 
                          className={
                            window.location.href.includes("JobAdsCenter")
                              ? "FilterMinibar logoutImage"
                              : "logoutImage"
                          }
                          src={require("../images/CombinedShape.svg").default}
                        />
                      </span>
                      Job Ads Center
                    </Link>
                  </motion.li>
                  <motion.li
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    variants={{
                      visible: { opacity: 1, x: 0 },
                      hidden: { opacity: 0, x: -50 },
                    }}
                    style={{
                      border: "none",
                      borderBottom: "0px",
                      borderLeft: "0px",
                      padding: "12px",
                      paddingLeft: "23px",
                    }}
                    onClick={() => OnClickColorChange("Com")}
                    className={
                      window.location.href.includes("commercialCenter")
                        ? "sideBarBackGactive"
                        : " cursor-pointer sideBarBackG"
                    }
                  >
                    <Link
                      to="/commercialCenter"
                      className="signOut"
                      aria-current="page"
                    >
                      <span className="pe-2">
                        <img alt="..." 
                          className={
                            window.location.href.includes("commercialCenter")
                              ? "FilterMinibar logoutImage"
                              : "logoutImage"
                          }
                          src={require("../images/comIcon.svg").default}
                        />
                      </span>
                      Commercial Center
                    </Link>
                  </motion.li>
                  <motion.li
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.8 }}
                    variants={{
                      visible: { opacity: 1, x: 0 },
                      hidden: { opacity: 0, x: -50 },
                    }}
                    style={{
                      border: "none",
                      borderBottom: "0px",
                      borderLeft: "0px",
                      padding: "12px ",
                      paddingLeft: "23px",
                    }}
                    onClick={() => OnClickColorChange("kine-center")}
                    className={
                      window.location.href.includes("kine-center")
                        ? "sideBarBackGactive"
                        : "cursor-pointer sideBarBackG"
                    }
                  >
                    <a
                      href="https://docs.google.com/spreadsheets/d/1H5CClpD-iddzYeoUg6OtoXgJCPJQDymUsNtGMNh9XGs/edit#gid=0"
                      target="_blank"
                      className="signOut"
                      aria-current="page"
                    >
                      <span className="pe-2">
                        <img alt="..." 
                          className={
                            window.location.href.includes("kine-center")
                              ? "FilterMinibar logoutImage"
                              : "logoutImage"
                          }
                          src={require("../images/kine-center.svg").default}
                        />
                      </span>
                      Kiné Center
                    </a>
                  </motion.li>
                  {LoginUser?.username === "Test" ? (
                    <motion.li
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.1 }}
                      variants={{
                        visible: { opacity: 1, x: 0 },
                        hidden: { opacity: 0, x: -50 },
                      }}
                      style={{
                        border: "none",
                        borderBottom: "0px",
                        borderLeft: "0px",
                        padding: "12px",
                        paddingLeft: "23px",
                      }}
                      onClick={() => OnClickColorChange("bill")}
                      className={
                        window.location.href.includes("billing")
                          ? "sideBarBackGactive"
                          : " cursor-pointer sideBarBackG"
                      }
                    >
                      <Link
                        to="/billing-center"
                        className="signOut"
                        aria-current="page"
                      >
                        <span className="pe-2">
                          <img alt="..." 
                            width={"24px"}
                            src={require("../images/billingCenter.svg").default}
                            className={`${
                              window.location.href.includes("billing")
                                ? "FilterMinibar"
                                : ""
                            }`}
                          />
                        </span>
                        Billing Center
                      </Link>
                    </motion.li>
                  ) : null}
                  <motion.li
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    variants={{
                      visible: { opacity: 1, x: 0 },
                      hidden: { opacity: 0, x: -50 },
                    }}
                    style={{
                      border: "none",
                      borderBottom: "0px",
                      borderLeft: "0px",
                      padding: "12px",
                      paddingLeft: "23px",
                    }}
                    onClick={() => OnClickColorChange("offer")}
                    className={
                      window.location.href.includes("offerCenter")
                        ? "sideBarBackGactive"
                        : " cursor-pointer sideBarBackG"
                    }
                  >
                    <Link
                      to="/offerCenter"
                      className="signOut"
                      aria-current="page"
                    >
                      <span className="pe-2">
                        <img alt="..." 
                          className={
                            window.location.href.includes("offerCenter")
                              ? "FilterMinibar logoutImage"
                              : "logoutImage"
                          }
                          src={require("../images/discount.svg").default}
                        />
                      </span>
                      Offer Center
                    </Link>
                  </motion.li>
                  <motion.li
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.8 }}
                    variants={{
                      visible: { opacity: 1, x: 0 },
                      hidden: { opacity: 0, x: -50 },
                    }}
                    style={{
                      border: "none",
                      borderBottom: "0px",
                      borderLeft: "0px",
                      padding: "12px ",
                      paddingLeft: "23px",
                    }}
                    onClick={() => OnClickColorChange("document-generator")}
                    className={
                      window.location.href.includes("document-generator")
                        ? "sideBarBackGactive"
                        : "cursor-pointer sideBarBackG"
                    }
                  >
                    <Link
                      to="/document-generator"
                      className="signOut"
                      aria-current="page"
                    >
                      <span className="pe-2">
                        <img alt="..." 
                          className={
                            window.location.href.includes("document-generator")
                              ? "FilterMinibar logoutImage"
                              : "logoutImage"
                          }
                          src={require("../images/doc-generator.svg").default}
                        />
                      </span>
                      Document Generator
                    </Link>
                  </motion.li>
                  <motion.li
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.11 }}
                    variants={{
                      visible: { opacity: 1, x: 0 },
                      hidden: { opacity: 0, x: -50 },
                    }}
                    style={{
                      borderTop: "1px solid #ffff",
                      borderBottom: "0px",
                      borderLeft: "0px",
                    }}
                    className="list-group-item sideBarBackG cursor-pointer"
                    onClick={(e) => LogOut()}
                  >
                    <Link to="/" className="signOut " aria-current="page">
                      <span className="pe-2">
                        <img alt="..." 
                          className="logoutImage"
                          src={require("../images/logout.svg").default}
                        />
                      </span>
                      Sign Out
                    </Link>
                  </motion.li>
                </motion.ul>
              </div>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              variants={{
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: -50 },
              }}
              className="col-xxl-2 col-xl-2 col-lg-2 sideBarBackG col-md-2 col-xs-2 fixed pd-gutter pl-0 sidebarScroll mb-3"
              style={{ height: "100vh", maxWidth: "7%" }}
            >
              {onHover.miniBar ? (
                <div
                  className="cursor-pointer Logo p-1 d-flex align-items-center justify-content-center"
                  style={{ height: "70px", borderBottom: "1px solid #fff" }}
                  onClick={() => setOnClickBarOpen(true)}
                  onMouseLeave={() =>
                    setOnHover({ ...onHover, miniBar: false })
                  }
                >
                  <img alt="..." 
                    src={require("../images/menu.png")}
                    className="filter-logo"
                    style={{ width: "38px" }}
                  />
                </div>
              ) : (
                <div
                  className="Logo p-1 d-flex align-items-center justify-content-center"
                  style={{ height: "70px", borderBottom: "1px solid #fff" }}
                  onMouseEnter={() => setOnHover({ ...onHover, miniBar: true })}
                >
                  <img alt="..." 
                    src={require("../images/logo-header.svg").default}
                    className="filter-logo"
                  />
                </div>
              )}

              <ul className="ulStyleSideBar p-0">
                <li className=" d-flex align-items-center justify-content-center">
                  <div className="activeDiv">
                    <img alt="..." 
                      style={{ height: "25px", width: "35px" }}
                      src={require("../images/Shape.svg").default}
                    />
                  </div>
                </li>
                <li
                  className=" d-flex align-items-center justify-content-center"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  title="Client Section"
                >
                  {window.location.href.includes("clientTodo") ||
                  window.location.href.includes("clientProgress") ||
                  window.location.href.includes("clientContract") ||
                  window.location.href.includes("archived") ? (
                    <div className={"activeDiv"}>
                      <img alt="..." 
                        style={{ height: "25px", width: "35px" }}
                        className="FilterMinibar"
                        src={require("../images/CombinedShape.svg").default}
                      />
                    </div>
                  ) : (
                    <div>
                      <Link to={"/clientTodo"}>
                        <img alt="..." 
                          style={{ height: "25px", width: "35px" }}
                          src={require("../images/CombinedShape.svg").default}
                        />
                      </Link>
                    </div>
                  )}
                  {/* <div className="btnSideBarCollapse cursor-pointer" onClick={()=>setOnClickBarOpen(true)}>▶</div> */}
                </li>
                <li
                  className=" d-flex align-items-center justify-content-center"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  title="Candidats Section"
                >
                  {window.location.href.includes("todolist") ||
                  window.location.href.includes("preSelected") ||
                  window.location.href.includes("embauchlist") ||
                  window.location.href.includes("archivedlist") ? (
                    <div className={"activeDiv"}>
                      <img alt="..." 
                        style={{ height: "25px", width: "35px" }}
                        className="FilterMinibar"
                        src={require("../images/employeeicon.svg").default}
                      />
                    </div>
                  ) : (
                    <div>
                      <Link to={"/todolist"}>
                        <img alt="..." 
                          style={{ height: "25px", width: "35px" }}
                          src={require("../images/employeeicon.svg").default}
                        />
                      </Link>
                    </div>
                  )}
                </li>
                <li
                  className=" d-flex align-items-center justify-content-center"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  title="Manage"
                >
                  {window.location.href.includes("addNewSector") ||
                  window.location.href.includes("userList") ? (
                    <div className="activeDiv">
                      <img alt="..." 
                        style={{ height: "25px", width: "35px" }}
                        className="FilterMinibar"
                        src={require("../images/settings.svg").default}
                      />
                    </div>
                  ) : (
                    <div className="">
                      <Link to={"/addNewSector"}>
                        <img alt="..." 
                          style={{ height: "25px", width: "35px" }}
                          src={require("../images/settings.svg").default}
                        />
                      </Link>
                    </div>
                  )}
                </li>
                <li
                  className=" d-flex align-items-center justify-content-center"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  title="Download Center"
                >
                  {window.location.href.includes("downloadCenter") ? (
                    <div className={"activeDiv "}>
                      <img alt="..." 
                        style={{ height: "25px", width: "35px" }}
                        className="FilterMinibar"
                        src={require("../images/telecharger.svg").default}
                      />
                    </div>
                  ) : (
                    <div className={""}>
                      <Link to={"/downloadCenter"}>
                        <img alt="..." 
                          style={{ height: "25px", width: "35px" }}
                          src={require("../images/telecharger.svg").default}
                        />
                      </Link>
                    </div>
                  )}
                </li>
                <li
                  className=" d-flex align-items-center justify-content-center"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  title="Leads Center"
                >
                  {window.location.href.includes("LeadsCenter") ? (
                    <div
                      className={
                        window.location.href.includes("LeadsCenter")
                          ? "activeDiv"
                          : ""
                      }
                    >
                      <img alt="..." 
                        style={{ height: "25px", width: "35px" }}
                        className="FilterMinibar"
                        src={require("../images/Leads.svg").default}
                      />
                    </div>
                  ) : (
                    <div>
                      <Link to={"/LeadsCenter"}>
                        <img alt="..." 
                          style={{ height: "25px", width: "35px" }}
                          src={require("../images/Leads.svg").default}
                        />
                      </Link>
                    </div>
                  )}
                </li>
                <li
                  className=" d-flex align-items-center justify-content-center"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  title="Job Ads Center"
                >
                  {window.location.href.includes("JobAdsCenter") ? (
                    <div className={"activeDiv"}>
                      <img alt="..." 
                        style={{ height: "25px", width: "35px" }}
                        className="FilterMinibar"
                        src={require("../images/CombinedShape.svg").default}
                      />
                    </div>
                  ) : (
                    <div className={""}>
                      <Link to={"/JobAdsCenter"}>
                        <img alt="..." 
                          style={{ height: "25px", width: "35px" }}
                          src={require("../images/CombinedShape.svg").default}
                        />
                      </Link>
                    </div>
                  )}
                </li>
                <li
                  className=" d-flex align-items-center justify-content-center"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  title="Commercial Center"
                >
                  {window.location.href.includes("commercialCenter") ? (
                    <div className={"activeDiv "}>
                      <img alt="..." 
                        style={{ height: "25px", width: "35px" }}
                        className="FilterMinibar"
                        src={require("../images/comIcon.svg").default}
                      />
                    </div>
                  ) : (
                    <div className={""}>
                      <Link to={"/commercialCenter"}>
                        <img alt="..." 
                          style={{ height: "25px", width: "35px" }}
                          className=""
                          src={require("../images/comIcon.svg").default}
                        />
                      </Link>
                    </div>
                  )}
                </li>
                <li
                  className=" d-flex align-items-center justify-content-center"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  title="Kiné Center"
                >
                  {window.location.href.includes("kine-center") ? (
                    <div className={"activeDiv "}>
                      <img alt="..." 
                        style={{ height: "25px", width: "35px" }}
                        className="FilterMinibar"
                        src={require("../images/kine-center.svg").default}
                      />
                    </div>
                  ) : (
                    <div className={""}>
                      <a href={"https://docs.google.com/spreadsheets/d/1H5CClpD-iddzYeoUg6OtoXgJCPJQDymUsNtGMNh9XGs/edit#gid=0"} target="_blank">
                        <img alt="..." 
                          style={{ height: "25px", width: "35px" }}
                          className=""
                          src={require("../images/kine-center.svg").default}
                        />
                      </a>
                    </div>
                  )}
                </li>
                {LoginUser?.username === "Test" ? (
                  <li className=" d-flex align-items-center justify-content-center">
                    {window.location.href.includes("billing") ? (
                      <div className={"activeDiv "}>
                        <img alt="..." 
                          style={{ height: "26px", width: "26px" }}
                          className="FilterMinibar"
                          src={require("../images/billingCenter.svg").default}
                        />
                      </div>
                    ) : (
                      <div className={""}>
                        <Link to={"/billing-center"}>
                          <img alt="..." 
                            style={{ height: "26px", width: "26px" }}
                            className=""
                            src={require("../images/billingCenter.svg").default}
                          />
                        </Link>
                      </div>
                    )}
                  </li>
                ) : null}
                <li
                  className=" d-flex align-items-center justify-content-center"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  title="Commercial Center"
                >
                  {window.location.href.includes("offerCenter") ? (
                    <div className={"activeDiv "}>
                      <img alt="..." 
                        style={{ height: "25px", width: "35px" }}
                        className="FilterMinibar"
                        src={require("../images/discount.svg").default}
                      />
                    </div>
                  ) : (
                    <div className={""}>
                      <Link to={"/offerCenter"}>
                        <img alt="..." 
                          style={{ height: "25px", width: "35px" }}
                          className=""
                          src={require("../images/discount.svg").default}
                        />
                      </Link>
                    </div>
                  )}
                </li>
                <li className="mt-2 mb-5 d-flex align-items-center justify-content-center">
                  <div
                    onClick={() => LogOut()}
                    className={window.location.href.includes("/") ? "" : ""}
                  >
                    <Link to={"/"}>
                      <img alt="..." 
                        style={{ height: "25px", width: "35px" }}
                        src={require("../images/logout.svg").default}
                      />
                    </Link>
                  </div>
                </li>
              </ul>
            </motion.div>
          )}

          <div
            className="col-xxl-9 col-lg-9 col-md-9 col-xs-9 overX  scroll"
            style={{ maxWidth: onClickBarOpenClose ? "79%" : "93%" }}
          >
            <Header onClickBarOpenClose={onClickBarOpenClose} />
            <section style={{ marginTop: "60px" }}>{props.children}</section>
          </div>
        </div>
      </div>
    </>
  );
}
export default Sidebar;
