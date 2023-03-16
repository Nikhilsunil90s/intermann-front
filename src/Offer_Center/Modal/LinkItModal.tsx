import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
import { colourStyles } from "../../BILLING-CENTER/Functions/ReactSelect";
import { GetRoute } from "../../components/ApisFunction/FunctionsApi";

function LinkItModal(props) {

  console.log(props)
  const [client, setClient] = useState([]);
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    if (client.length === 0) {
      GetRoute("getProfiles").then((res) => {
        let cl = [];
        if (res.status) {
          res.data.map((el) => {
            if (el.clientEmail) {
              cl.push({
                value: el._id,
                label: el.clientCompanyName.toUpperCase(),
                name: "client",
                color: "#FF8B00",
              });
            }
          });
        }
        setClient([...cl]);
      });
    }
    if (leads.length == 0) {
      GetRoute("getAllCommercialLeads").then((res) => {
        let leads = [];
        if (res.status) {
          res.data.map((el) => {
            if (el.companyName) {
              leads.push({
                value: el._id,
                label: el.companyName,
                name: "leads",
                color: "#FF8B00",
              });
            }
          });
        }
        setLeads([...leads]);
      });
    }
  }, [client]);

  return (
    <>
      <div
        className="modal d-block"
        style={{ backgroundColor: "#00000052" }}
        id="staticBackdrop2"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg"
          style={{ width: "875px", marginTop: "29px" }}
        >
          <div className="modal-content">
            <div
              className="col-12 "
              style={{ borderBottom: "1px solid #80808047", padding: "10px" }}
            >
              <div className="row justify-content-end">
                <div className="col-8 d-flex align-items-center">
                  <p
                    className="mb-0"
                    style={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "18px",
                      lineHeight: "24px",
                      color: "#000",
                      textTransform: "capitalize",
                    }}
                  >
                    Link this offer to a client{" "}
                  </p>
                </div>
                <div className="col-4 text-end d-flex justify-content-end align-items-end">
                  <button
                    type="button"
                    className="btn-close p-1"
                    onClick={() => props.closeModel(false)}
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
              </div>
            </div>

            <div className="modal-body text-start">
              <div className="col-12 ">
              
                 { props.props.offer_mode !=="commercial center" ?
                    <div className="row ">
                  <div className="col-5">
                    <div className="d-grid">
                      <label
                        style={{
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: "16px",
                          lineHeight: "24px",
                          color: "#000000",
                        }}
                      >
                        Select lead in commercial center
                      </label>
                      {leads.length > 0 ? (
                        <Select
                          name="candidatName"
                          closeMenuOnSelect={true}
                          placeholder="‎ ‎ ‎ ‎ ‎ ‎Select lead in commercial center"
                          className="basic-multi-select"
                          classNamePrefix="select"
                          //   onChange={handleNameChange}
                          options={leads}
                          styles={colourStyles}
                          isClearable={false}
                        />
                      ) : (
                        <div
                          className="d-flex align-items-center"
                          style={{ height: "50px" }}
                        >
                          {" "}
                          <div
                            className="spinner-grow text-primary"
                            role="status"
                          >
                            <span
                              className="visually-hidden"
                              style={{ height: "28px", width: "28px" }}
                            >
                              Loading...
                            </span>
                          </div>
                          <div
                            className="spinner-grow text-secondary"
                            role="status"
                          >
                            <span
                              className="visually-hidden"
                              style={{ height: "28px", width: "28px" }}
                            >
                              Loading...
                            </span>
                          </div>
                          <div
                            className="spinner-grow text-success"
                            role="status"
                          >
                            <span
                              className="visually-hidden"
                              style={{ height: "28px", width: "28px" }}
                            >
                              Loading...
                            </span>
                          </div>
                          <div
                            className="spinner-grow text-danger"
                            role="status"
                          >
                            <span
                              className="visually-hidden"
                              style={{ height: "28px", width: "28px" }}
                            >
                              Loading...
                            </span>
                          </div>
                          <div
                            className="spinner-grow text-warning"
                            role="status"
                          >
                            <span
                              className="visually-hidden"
                              style={{ height: "28px", width: "28px" }}
                            >
                              Loading...
                            </span>
                          </div>
                          <div className="spinner-grow text-dark" role="status">
                            <span
                              className="visually-hidden"
                              style={{ height: "28px", width: "28px" }}
                            >
                              Loading...
                            </span>
                          </div>
                        </div>
                      )}{" "}
                      <span
                        style={{
                          fontFamily: "Inter",
                          fontStyle: "normal",
                          fontWeight: "400",
                          fontSize: "12px",
                          lineHeight: "29px",
                          color: "#000000",
                        }}
                      >
                        This action will link this offer to commercial center
                      </span>
                    </div>
                  </div>
                  <div className="col-2 d-flex align-items-center">
                    <p
                      style={{
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "600",
                        fontSize: "16px",
                        lineHeight: "24px",
                        color: "#000000",
                        marginBottom: "0px",
                      }}
                    >
                      And / OR
                    </p>
                  </div>
                  <div className="col-5">
                    <div className="d-grid">
                      <label
                        style={{
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: "16px",
                          lineHeight: "24px",
                          color: "#000000",
                        }}
                      >
                        Select client in CRM Database
                      </label>
                      {client.length > 0 ? (
                        <Select
                          name="candidatName"
                          closeMenuOnSelect={true}
                          placeholder="‎ ‎ ‎ ‎ ‎ ‎Select client in CRM Database"
                          className="basic-multi-select"
                          classNamePrefix="select"
                          //   onChange={handleNameChange}
                          options={client}
                          styles={colourStyles}
                          isClearable={false}
                        />
                      ) : (
                        <div
                          className="d-flex align-items-center"
                          style={{ height: "50px" }}
                        >
                          {" "}
                          <div
                            className="spinner-grow text-primary"
                            role="status"
                          >
                            <span
                              className="visually-hidden"
                              style={{ height: "28px", width: "28px" }}
                            >
                              Loading...
                            </span>
                          </div>
                          <div
                            className="spinner-grow text-secondary"
                            role="status"
                          >
                            <span
                              className="visually-hidden"
                              style={{ height: "28px", width: "28px" }}
                            >
                              Loading...
                            </span>
                          </div>
                          <div
                            className="spinner-grow text-success"
                            role="status"
                          >
                            <span
                              className="visually-hidden"
                              style={{ height: "28px", width: "28px" }}
                            >
                              Loading...
                            </span>
                          </div>
                          <div
                            className="spinner-grow text-danger"
                            role="status"
                          >
                            <span
                              className="visually-hidden"
                              style={{ height: "28px", width: "28px" }}
                            >
                              Loading...
                            </span>
                          </div>
                          <div
                            className="spinner-grow text-warning"
                            role="status"
                          >
                            <span
                              className="visually-hidden"
                              style={{ height: "28px", width: "28px" }}
                            >
                              Loading...
                            </span>
                          </div>
                          <div className="spinner-grow text-dark" role="status">
                            <span
                              className="visually-hidden"
                              style={{ height: "28px", width: "28px" }}
                            >
                              Loading...
                            </span>
                          </div>
                        </div>
                      )}
                      <span
                        style={{
                          fontFamily: "Inter",
                          fontStyle: "normal",
                          fontWeight: "400",
                          fontSize: "12px",
                          lineHeight: "20px",
                          color: "#000000",
                        }}
                      >
                        This action will link this offer to a client CRM and
                        store it on “OFFRE ENVOYE”{" "}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 mt-3">
                    <div className="row justify-content-center">
                      <div className="col-6">
                        <button className="btn AddThisOffer">Validate </button>
                      </div>
                    </div>
                  </div>
                  </div>
                :
                <div className="row justify-content-center align-items-center" style={{height:"70vh"}}>
 <span className="my-1 d-flex align-items-center ErrorSearchBox justify-content-center text-center" >This offer is already linked with a Company Lead in Commercial Center.<br /> Please check lead - {props.props.company_name}</span>
{/* <hr title="or" /> */}
<div className="col-12 my-2 ">
<p  style={{
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: "23px",
                          lineHeight: "24px",
                          color: "#000000",
                        }} className="d-flex justify-content-center mb-0">OR</p>
  </div>
 <div className="col-12">
                    <div className="d-grid">
                      <label
                        style={{
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: "16px",
                          lineHeight: "24px",
                          color: "#000000",
                        }}
                      >
                        Select client in CRM Database
                      </label>
                      {client.length > 0 ? (
                        <Select
                          name="candidatName"
                          closeMenuOnSelect={true}
                          placeholder="‎ ‎ ‎ ‎ ‎ ‎Select client in CRM Database"
                          className="basic-multi-select"
                          classNamePrefix="select"
                          //   onChange={handleNameChange}
                          options={client}
                          styles={colourStyles}
                          isClearable={false}
                        />
                      ) : (
                        <div
                          className="d-flex align-items-center"
                          style={{ height: "50px" }}
                        >
                          {" "}
                          <div
                            className="spinner-grow text-primary"
                            role="status"
                          >
                            <span
                              className="visually-hidden"
                              style={{ height: "28px", width: "28px" }}
                            >
                              Loading...
                            </span>
                          </div>
                          <div
                            className="spinner-grow text-secondary"
                            role="status"
                          >
                            <span
                              className="visually-hidden"
                              style={{ height: "28px", width: "28px" }}
                            >
                              Loading...
                            </span>
                          </div>
                          <div
                            className="spinner-grow text-success"
                            role="status"
                          >
                            <span
                              className="visually-hidden"
                              style={{ height: "28px", width: "28px" }}
                            >
                              Loading...
                            </span>
                          </div>
                          <div
                            className="spinner-grow text-danger"
                            role="status"
                          >
                            <span
                              className="visually-hidden"
                              style={{ height: "28px", width: "28px" }}
                            >
                              Loading...
                            </span>
                          </div>
                          <div
                            className="spinner-grow text-warning"
                            role="status"
                          >
                            <span
                              className="visually-hidden"
                              style={{ height: "28px", width: "28px" }}
                            >
                              Loading...
                            </span>
                          </div>
                          <div className="spinner-grow text-dark" role="status">
                            <span
                              className="visually-hidden"
                              style={{ height: "28px", width: "28px" }}
                            >
                              Loading...
                            </span>
                          </div>
                        </div>
                      )}
                      <span
                        style={{
                          fontFamily: "Inter",
                          fontStyle: "normal",
                          fontWeight: "400",
                          fontSize: "12px",
                          lineHeight: "20px",
                          color: "#000000",
                        }}
                      >
                        This action will link this offer to a client CRM and
                        store it on “OFFRE ENVOYE”{" "}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 mt-3">
                    <div className="row justify-content-center">
                      <div className="col-6">
                        <button className="btn AddThisOffer">Validate </button>
                      </div>
                    </div>
                  </div>

                  </div>  
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default LinkItModal;
