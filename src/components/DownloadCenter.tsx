import React, { useState, useEffect } from "react";
import "../CSS/Canceled.css";
import { Tabs, Tab } from "react-tabs-scrollable";
import { API_BASE_URL } from "../config/serverApiConfig";
import Loader from "./Loader/loader";
import Error from "./Loader/SearchBarError";
import { Toaster, toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function DownloadCenter() {
  const [activeTab, setActiveTab] = React.useState(0) as any;
  const [candidateContracts, setCandidateContracts] = useState([]);
  const [ClientContracts, setClientContracts] = useState([]);
  const [representance, setRepresentance] = useState([]);
  const [Avance, setAvance] = useState([]);
  const [AllProfiles, setAllProfiles] = useState([]);
  const [Status, setStatus] = useState(false);
  const [deleteCanContract, setdeleteCanContract] = useState(false);
  const [btnDS, setBtnDS] = useState({
    active: false,
    activeId: "",
    deleteId: "",
  });
  const [tabItems] = useState([
    {
      text: "Contrat Employés",
      value: "CONTRACT",
    },
    {
      text: "Contrat Clients",
      value: "Contrat_Clients",
    },
    {
      text: "Avances Employes",
      value: "Avances_Employes",
    },
    {
      text: "Représentance",
      value: "Représentance",
    },
  ]) as any;

  const fetchCandidatContracts = async () => {
    return await fetch(API_BASE_URL + `getCandidatSignedContracts`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((resp) => resp.json())
      .then((respData) => respData)
      .catch((err) => err);
  };

  const fetchContract = async (path, id) => {
    setBtnDS({ ...btnDS, active: true, activeId: id });
    return await fetch(API_BASE_URL + path, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((respData) => {
        if (respData.status) {
          setBtnDS({ ...btnDS, active: false, activeId: "" });
          window.open(API_BASE_URL + respData.filepath.replace("/app/", ""));
        } else {
          toast.error("Something Went Wrong, Please Try Again!");
        }
      })
      .catch((err) => err);
  };

  const fetchCandidatRepresentance = async () => {
    return await fetch(API_BASE_URL + `getSignedRepresentences`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((resp) => resp.json())
      .then((respData) => respData)
      .catch((err) => err);
  };

  const fetchCandidatAvance = async () => {
    return await fetch(API_BASE_URL + `getSignedAvances`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((resp) => resp.json())
      .then((respData) => respData)
      .catch((err) => err);
  };
  const fetchClientsContracts = async () => {
    return await fetch(API_BASE_URL + `getClientSignedContracts`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((resp) => resp.json())
      .then((respData) => respData)
      .catch((err) => err);
  };

  const deleteClientsContracts = async (id: any, CId) => {
    setBtnDS({ ...btnDS, active: true, deleteId: id });
    return await fetch(
      API_BASE_URL + `deleteClientContract/?clientId=${id}&contractId=${CId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((resp) => resp.json())
      .then((respData) => {
        toast.success("Contrat Client Removed Successfully!");
        setdeleteCanContract(true);
        setBtnDS({ ...btnDS, active: false, deleteId: "" });
      })
      .catch((err) => {
        toast.error("Contrat Client Not Removed!");
        setBtnDS({ ...btnDS, active: false, deleteId: "" });
      });
  };
  const deleteCandiateContracts = async (id: any, CId) => {
    setBtnDS({ ...btnDS, active: false, deleteId: CId });

    return await fetch(
      API_BASE_URL +
        `deleteCandidatContract/?candidatId=${id}&contractId=${CId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((resp) => resp.json())
      .then((respData) => {
        toast.success("Contrat Employé Removed Successfully!");
        setBtnDS({ ...btnDS, active: false, deleteId: "" });

        setdeleteCanContract(true);
      })
      .catch((err) => {
        toast.error("Contrat Employé Not Removed!");
        setBtnDS({ ...btnDS, active: false, deleteId: "" });
      });
  };

  const deleteRepresentance = async (id: any) => {
    setBtnDS({ ...btnDS, active: false, deleteId: id });
    return await fetch(
      API_BASE_URL + `deleteRepresentence/?representenceId=${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((resp) => resp.json())
      .then((respData) => {
        toast.success("Représentance Removed Successfully!");
        setdeleteCanContract(true);
        setBtnDS({ ...btnDS, active: false, deleteId: "" });
      })
      .catch((err) => {
        toast.error("Représentance Not Removed!");
        setBtnDS({ ...btnDS, active: false, deleteId: "" });
      });
  };
  const deleteAvance = async (id: any) => {
    setBtnDS({ ...btnDS, active: false, deleteId: id });
    return await fetch(API_BASE_URL + `deleteAvance/?avanceId=${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((resp) => resp.json())
      .then((respData) => {
        toast.success("Avance Removed Successfully!");
        setdeleteCanContract(true);
        setBtnDS({ ...btnDS, active: false, deleteId: "" });
      })
      .catch((err) => {
        toast.error("Avance Not Removed!");
        setBtnDS({ ...btnDS, active: false, deleteId: "" });
      });
  };
  useEffect(() => {
    fetchCandidatContracts().then((res) => {
      if (res.status) {
        setCandidateContracts([...res.data]);
        setTimeout(() => {
          setStatus(true);
        }, 2000);
        setdeleteCanContract(false);
        if (activeTab === 0) {
          setAllProfiles([...res.data]);
          setTimeout(() => {
            setStatus(true);
          }, 2000);
        }
      } else {
        setTimeout(() => {
          setStatus(true);
        }, 2000);
        if (activeTab === 0) {
          setAllProfiles([]);
          setCandidateContracts([]);
        }
      }
    });
    fetchClientsContracts().then((res) => {
      if (res.status) {
        setClientContracts([...res.data]);
        setdeleteCanContract(false);

        if (activeTab === 1) {
          setAllProfiles([...res.data]);
          setTimeout(() => {
            setStatus(true);
          }, 2000);
        }
      } else {
        setTimeout(() => {
          setStatus(true);
        }, 2000);
        if (activeTab === 1) {
          setAllProfiles([]);
          setClientContracts([]);
        }
      }
    });
    fetchCandidatRepresentance().then((res) => {
      if (res.status) {
        setRepresentance([...res.data]);
        console.log(...res.data);
        setdeleteCanContract(false);

        if (activeTab === 3) {
          setAllProfiles([...res.data]);
          setTimeout(() => {
            setStatus(true);
          }, 2000);
        }
      } else {
        setTimeout(() => {
          setStatus(true);
        }, 2000);
        if (activeTab === 3) {
          setAllProfiles([]);
          setRepresentance([]);
        }
      }
    });
    fetchCandidatAvance().then((res) => {
      if (res.status) {
        setAvance([...res.data]);
        console.log(...res.data);
        setdeleteCanContract(false);

        if (activeTab === 2) {
          setAllProfiles([...res.data]);
          setTimeout(() => {
            setStatus(true);
          }, 2000);
        }
      } else {
        setTimeout(() => {
          setStatus(true);
        }, 2000);
        if (activeTab === 2) {
          setAllProfiles([]);
          setAvance([]);
        }
      }
    });
  }, [deleteCanContract]);
  function padTo2DigitsCH(num) {
    return num.toString().padStart(2, "0");
  }
  function formatDateCha(date) {
    return [
      padTo2DigitsCH(date.getDate()),
      padTo2DigitsCH(date.getMonth() + 1),
      date.getFullYear(),
    ].join("/");
  }

  const onTabClick = (e, index: any) => {
    setActiveTab(index);
    if (index === 0) {
      setAllProfiles(candidateContracts.filter((el) => el));
    }
    if (index === 1) {
      setAllProfiles(ClientContracts.filter((el) => el));
    }
    if (index === 2) {
      setAllProfiles(Avance.filter((el) => el));
    }
    if (index === 3) {
      setAllProfiles(representance.filter((el) => el));
    }
  };
  return (
    <>
      <Toaster
        position="top-right"
        containerStyle={{ zIndex: "999999999999999999" }}
      />
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-12 mt-2"
            style={{ background: "#ffff", borderRadius: "10px" }}
          >
            <div className="downLoadCenter p-1 ">
              <h3 className="">DOWNLOAD CENTER</h3>
              <p className="mb-0">
                DOWNLOAD DOCUMENT SIGNED BY DOCUSIGN WITH CRM
              </p>
            </div>
          </div>
          <div
            className="col-12 mt-1 tabsClass"
            style={{
              background: "#E8E8E8",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            <Tabs
              activeTab={activeTab}
              onTabClick={onTabClick}
              rightBtnIcon={">"}
              hideNavBtns={false}
              leftBtnIcon={"<"}
              showTabsScroll={false}
              tabsScrollAmount={7}
            >
              {tabItems.map((el, i) => (
                <Tab key={i}>{el.text}</Tab>
              ))}
            </Tabs>
          </div>
          <div
            className="col-12 mb-2"
            style={{
              background: "#ffff",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
          >
            <div className="row p-1">
              {Status ? (
                AllProfiles.length > 0 ? (
                  AllProfiles.map((el, i) => (
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.3 }}
                      variants={{
                        visible: { opacity: 1, x: 0 },
                        hidden: { opacity: 0, x: -50 },
                      }}
                      className="col-12 mt-1"
                      style={{ background: "#fe87001f", borderRadius: "10px" }}
                      key={i}
                    >
                      <div className="row p-1 align-items-center">
                        <div className="col-10 px-0">
                          <p className="ContractListFont mb-0">
                            {el.candidatName
                              ? el.candidatName
                              : el.initial_client_company
                              ? el.initial_client_company
                              : el.candidat_name}{" "}
                            {el.amount_avance
                              ? `- Amount : ${el.amount_avance + " €"}`
                              : null}{" "}
                            - Generated :{" "}
                            <b>
                              {el.contract_generated_on
                                ? el.contract_generated_on.slice(3, 5) > "12"
                                  ? el.contract_generated_on.slice(3, 5) +
                                    "-" +
                                    el.contract_generated_on.slice(0, 2) +
                                    "-" +
                                    el.contract_generated_on.slice(6, 10)
                                  : el.contract_generated_on
                                : el.generated_on}{" "}
                            </b>{" "}
                            Signed :{" "}
                            <b>
                              {el.contract_signed_on
                                ? el.contract_signed_on
                                : el.contract_signed_on
                                ? el.contract_signed_on
                                : el.signed_on}
                            </b>
                          </p>
                        </div>
                        <div className="col-2 px-0 ">
                          <div className="row d-flex justify-content-evenly">
                            <button
                              className="col-6 px-0 RoundDiv cursor-pointer"
                              id="delete"
                              style={{ border: "0px" }}
                              disabled={btnDS.active}
                              onClick={(e) =>
                                el.candidatName
                                  ? deleteCandiateContracts(
                                      el.candidatId,
                                      el._id
                                    )
                                  : el.clientId
                                  ? deleteClientsContracts(el.clientId, el._id)
                                  : el.signed_representence_url
                                  ? deleteRepresentance(el._id)
                                  : deleteAvance(el._id)
                              }
                            >
                              {btnDS.active ? (
                                btnDS.deleteId === el._id ? (
                                  <div className="d-flex justify-content-center align-items-center">
                                    <span className="filterLeadsLoader" />
                                  </div>
                                ) : (
                                  <img
                                    src={
                                      require("../images/Deletebucket.svg")
                                        .default
                                    }
                                  />
                                )
                              ) : (
                                <img
                                  src={
                                    require("../images/Deletebucket.svg")
                                      .default
                                  }
                                />
                              )}
                            </button>

                            <button
                              disabled={btnDS.active}
                              className={`col-6 px-0 RoundDiv cursor-pointer `}
                              key={i}
                              style={{ border: "none" }}
                              onClick={(e) =>
                                // window.open(el.signed_contract_url ?  el.signed_contract_url  : el.signed_representence_url ? el.signed_representence_url : el.signed_avance_url)
                                fetchContract(
                                  el.candidatName
                                    ? `getSignedCandidatContract/?contractId=${el._id}`
                                    : el.clientId
                                    ? `getSignedClientContract/?contractId=${el._id}`
                                    : el.signed_representence_url
                                    ? `getSignedRepresentence/?id=${el._id}`
                                    : `getSignedAvance/?id=${el._id}`,
                                  el._id
                                )
                              }
                            >
                              {btnDS.active ? (
                                btnDS.activeId === el._id ? (
                                  <div className="d-flex justify-content-center align-items-center">
                                    <span className="filterLeadsLoader" />
                                  </div>
                                ) : (
                                  <img
                                    src={
                                      require("../images/dowBtn.svg").default
                                    }
                                  />
                                )
                              ) : (
                                <img
                                  src={require("../images/dowBtn.svg").default}
                                />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-12 d-flex justify-content-center align-items-center ErrorSearchBox my-1 ">
                    {activeTab === 0 || activeTab === 1 ? (
                      <>
                        <Error /> <span> ✘ No Contract Available ✘</span>
                      </>
                    ) : (
                      <>
                        <Error /> <span> ✘ No data yet ✘</span>
                      </>
                    )}
                  </div>
                )
              ) : (
                <div className="col-12 d-flex justify-content-center align-items-center">
                  <Loader />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
