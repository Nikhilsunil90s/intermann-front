import React, { useEffect, useState, useRef } from "react";
import "../CSS/Header.css";
import HeaderSelect from "../../src/components/Modal/HeaderSelectModal";
import { API_BASE_URL } from "../config/serverApiConfig";
import SearchModal from "./Modal/GlobalSearchModal";
import ErrorBar from "../../src/components/Loader/SearchBarError";
import Profiles from "../components/Loader/SearchEmp";
import Cookies from "js-cookie";

let FilDataCName;
let FilDataCNName;
const Header = (props) => {
  const [ModalOpen, setModalOpen] = useState(false);
  const [value, setValue] = useState("");
  const [SearchOpen, setSearchOpen] = useState(false);
  const [filterData, setFilterData] = useState([]) as any;
  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [inputStatus, setInputStatus] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [Loadspinner, setLoadSpinner] = useState(false);
  const Modal = () => {
    if (ModalOpen == true) {
      setModalOpen(false);
    } else {
      setModalOpen(true);
    }
  };

  const ref = useRef();

  useOnClickOutside(ref, () => {
    setSearchOpen(false);
  });
  function useOnClickOutside(ref, handler) {
    useEffect(() => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [ref, handler, SearchOpen]);
  }

  const checkCandidatePhone = async (num: any) => {
    return await fetch(
      API_BASE_URL +
        `checkCandidatExists/?candidatPhone=${num.replace("+", "")}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("token"),
        },
      }
    )
      .then((resp) => resp.json())
      .then((reD) => reD)
      .catch((err) => err);
  };

  useEffect(() => {
    if (dataLength == 1) {
      if (data.length == 0) {
        fetchProfiles()
          .then((filteredresponse) => {
            setLoadSpinner(true);
            setData([...filteredresponse.data]);
            // setDataLength(filteredresponse.data.length)
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [data, dataLength]);

  const fetchProfiles = async () => {
    return await fetch(API_BASE_URL + "getProfiles", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
    })
      .then((resD) => resD.json())
      .then((reD) => reD)
      .catch((err) => err);
  };

  const NameSearch = (e) => {
    setSpinner(true);
    setSearchOpen(true);
    if (e == null) {
      setValue("");
      setSearchOpen(false);
      setInputStatus(false);
      // window.location.reload()
    } else if (e.target.value !== "" && e !== null) {
      setInputStatus(true);
      setValue(e.target.value);

      if (e.target.value) {
        setTimeout(() => {
          setSpinner(false);
        }, 600);
      }

      if (Number.isInteger(Number(e.target.value))) {
        const FilDataNo = data.filter((el) =>
        el.clientPhone !== undefined
          ? el.clientPhone.includes(e.target.value)
          : null
      );
        checkCandidatePhone(
          e.target.value.replace("+", "").replace(" ", "")
        ).then((res) => {
          if (res.status) {
            setFilterData([...res.data,...FilDataNo]);
            
          } else {
            // return;
            setFilterData([...FilDataNo]);

          }
        });
    
      }
      if (e.target.value) {
        FilDataCName = data.filter((el) => {
          if (el.clientCompanyName) {
            return (
              el.clientCompanyName
                .toString()
                .toUpperCase()
                .replaceAll(" ", "")
                .replaceAll("-", "") ==
              e.target.value
                .toString()
                .toUpperCase()
                .replaceAll(" ", "")
                .replaceAll("-", "")
            );
          }
        });
      }
      if (e.target.value) {
        FilDataCNName = data.filter((el) => {
          if (el.candidatName) {
            return (
              el.candidatName
                .toString()
                .toUpperCase()
                .replaceAll(" ", "")
                .replaceAll("-", "") ==
              e.target.value
                .toString()
                .toUpperCase()
                .replaceAll(" ", "")
                .replaceAll("-", "")
            );
          }
        });
      }
      if (e.target.value) {
        const FilData = data.filter((el) =>
          el.clientCompanyName
            ? el.clientCompanyName
                .toString()
                .toUpperCase()
                .replaceAll(" ", "")
                .replaceAll("-", "")
                .includes(
                  e.target.value
                    .toString()
                    .toUpperCase()
                    .replaceAll(" ", "")
                    .replaceAll("-", "")
                )
            : el.clientEmail
            ? el.clientEmail
                .toUpperCase()
                .includes(e.target.value.toUpperCase())
            : el.candidatName
            ? el.candidatName
                .toString()
                .toUpperCase()
                .replaceAll(" ", "")
                .replaceAll("-", "")
                .includes(
                  e.target.value
                    .toString()
                    .toUpperCase()
                    .replaceAll(" ", "")
                    .replaceAll("-", "")
                )
            : el.candidatEmail
            ? el.candidatEmail
                .toUpperCase()
                .includes(e.target.value.toUpperCase())
            : null
        );

        setFilterData([...FilDataCName, ...FilDataCNName, ...FilData]);
      }
    } else if (e.target.value == "") {
      setSearchOpen(false);
      setSpinner(false);
      setValue("");
    }
  };
  return (
    <>
      <div className="col-12 px-0 position">
        <div
          className="row m-0 mainRow"
          style={{ width: props.onClickBarOpenClose ? "" : "95%" }}
        >
          <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5">
            <div className="row">
              <div className="d-flex">
                <a
                  className="nav-link  p-0"
                  aria-current="page"
                  onClick={() => window.open("/addCustomer")}
                  style={{ backgroundColor: "none", marginRight: "10px" }}
                >
                  <button className="btn btn-1">ADD CLIENT</button>
                </a>

                <a
                  className="nav-link p-0"
                  onClick={() => window.open("/addCandidate")}
                >
                  <button className="btn btn-2"> Add Candidate</button>
                </a>
              </div>
            </div>
          </div>

          <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7">
            <div className="row text-end">
              <div className="d-flex justify-content-end">
                <div className="d-flex cursor-pointer" onClick={() => Modal()}>
                  <div className="HeaderModalSelect">
                    <img alt="..." src={require("../images/headerSelect.svg").default} />
                  </div>
                  <div className="d-flex justify-content-center align-items-center ml-1">
                    <img alt="..." src={require("../images/Vector-9.svg").default} />
                  </div>
                  {ModalOpen ? (
                    <HeaderSelect closeModal={setModalOpen} />
                  ) : null}
                </div>

                <div
                  className="d-flex mx-2"
                  style={{
                    background: "#F5F6F8",
                    border: "1px solid #ADADAD",
                    borderRadius: "26px",
                    width: "82%",
                  }}
                >
                  <div className="d-flex align-items-center pl-1">
                    <img alt="..." src={require("../images/searchIcon.svg").default} />
                  </div>

                  {inputStatus ? (
                    <>
                      {Loadspinner ? (
                        <input
                          style={{ border: "0px", background: "#F5F6F8" }}
                          defaultValue={value}
                          onChange={NameSearch}
                          className="searcInputbOx pl-1"
                          placeholder="Search, Name, Phone, Work, Jobs..."
                        />
                      ) : (
                        <div className="col-12 d-flex justify-content-center ">
                          <div
                            className="loadingSearchBar"
                            data-loading-text="PleaseWait.."
                          ></div>{" "}
                          <Profiles width={"50px"} height={"50px"} />
                        </div>
                      )}
                    </>
                  ) : (
                    <input
                      style={{ border: "0px", background: "#F5F6F8" }}
                      defaultValue=""
                      onClick={() => {
                        setDataLength(1);
                        setInputStatus(true);
                      }}
                      className="searcInputbOx pl-1"
                      placeholder="Search, Name, Phone, Work, Jobs..."
                    />
                  )}
                  {value ? (
                    <div
                      className="d-flex align-items-center px-1 clear cursor-pointer"
                      onClick={() => NameSearch(null)}
                    >
                      {spinner ? (
                        <div
                          className="spinner-border text-dark"
                          role="status"
                          style={{ width: "1rem", height: "1rem" }}
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        <b>X</b>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {SearchOpen ? (
        <div
          className={
            filterData.length > 0 ? "inputData p-1" : "NoinputData p-1"
          }
        >
          {filterData.length > 0 ? (
            filterData.map((el, i) => (
              <SearchModal
                props={el}
                closeModal={setSearchOpen}
                value={setInputStatus}
                Text={setValue}
                ReloadSearch={setDataLength}
                InputState={setLoadSpinner}
                Data={setData}
                key={i}
              />
            ))
          ) : (
            <div ref={ref} className="d-flex align-items-center">
              <ErrorBar />
              <p className="ErrorSearchBox mb-0">
                No Card ! Please Enter Valid Name.
              </p>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};
export default Header;
