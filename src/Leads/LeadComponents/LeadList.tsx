import React, { useEffect, useState } from "react";
import NotesModal from "../Modal/NotesModal";
import ConfirmDelete from "../Modal/ConfirmDelete";
import NotesEditModal from "../Modal/EditNotes";
import { API_BASE_URL } from "../../config/serverApiConfig";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
let NewCdate;
function LeadList({
  props,
  Update,
  Load,
  Lead,
  length,
  activeUser,
  TabName,
  setFilter,
  Data,
  setrest,
}) {
  const LoginUser = JSON.parse(localStorage.getItem("LoginUser"));
  const navigate = useNavigate();
  const [LoginUserS, setLoginUser] = useState(LoginUser);
  const [NoteModal, setNotesModal] = useState(false);
  const [NoteEditModal, setNoteEditsModal] = useState(false);
  const [NoteDeleteModal, setNotesDeleteModal] = useState(false);
  const [LeadNotes, setLeadsNote] = useState("");
  const [DeleteLeads, setDeleteLeads] = useState("");
  const [Precontacted, setPrecontacted] = useState(props?.leadPreContacted);
  const [Agency, setAgency] = useState(props.leadContactedByAgency);
  const [Added, setAdded] = useState(props.leadAddedToCRM.toString()) as any;
  const [Qual, setQual] = useState(props.leadQualified);

  useEffect(() => {
    activeUser(LoginUser);
  }, []);

  useEffect(() => {
    // setPrecontacted(props?.leadPreContacted);
    setAgency(props.leadContactedByAgency);
    setQual(props.leadQualified);
  }, [
    props?.leadPreContacted,
    props.leadQualified,
    props.leadContactedByAgency,
  ]);

  const AddToCRM = (data) => {
    fetch(API_BASE_URL + `addLeadToCRM`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status) {
          toast.success(res.message);
          Lead([]);
          //  Update(true)

          setTimeout(() => {
            Load(true);
            setFilter(true);
          }, 3000);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => err);
  };

  const PreContact = (id, status) => {
    fetch(
      API_BASE_URL +
        `changePreContactedStatus/?userId=${LoginUserS._id}&leadId=${id}&status=${status}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + Cookies.get("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.status) {
          Update(true);
          setTimeout(() => {
            setFilter(true);
          }, 3000);

          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => err);
  };
  const ContactAgency = (id, status) => {
    fetch(
      API_BASE_URL +
        `changeLeadContactedStatus/?userId=${LoginUserS._id}&leadId=${id}&status=${status}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + Cookies.get("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.status) {
          Update(true);
          setTimeout(() => {
            setFilter(true);
          }, 3000);
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => err);
  };

  const OnChangeAddToCrm = (id, status) => {
    fetch(
      API_BASE_URL +
        `changeCRMStatus/?userId=${LoginUserS._id}&leadId=${id}&status=${status}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + Cookies.get("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.status) {
          Update(true);
          setTimeout(() => {
            setFilter(true);
          }, 3000);
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => err);
  };

  const QUALIFIED = (id, status) => {
    fetch(
      API_BASE_URL +
        `changeQualifiedValue/?userId=${LoginUserS._id}&leadId=${id}&value=${status}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + Cookies.get("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.status) {
          Update(true);
          setTimeout(() => {
            setFilter(true);
          }, 3000);
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => err);
  };

  const OnChangeRadio = (e, id) => {
    // if (e.target.name === `preContact${length}`) {
    //   setPrecontacted(e.target.value);
    //   PreContact(id, e.target.value);
    // }
    if (e.target.name === `CAgency${length}`) {
      setAgency(e.target.value);
      ContactAgency(id, e.target.value);
    }
    if (e.target.name === `QUALIFIED${length}`) {
      setQual(e.target.value);
      QUALIFIED(id, e.target.value);
    }
    if (e.target.name === `Added_to_CRM${length}`) {
      OnChangeAddToCrm(id, e.target.value);
      setAdded(e.target.value);
    }
  };

  let data = {
    leadId: props._id,
  };

  const LeadDelete = () => {
    fetch(API_BASE_URL + `deleteLead`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
      body: JSON.stringify(data),
    })
      .then((red) => red.json())
      .then((resData) => {
        if (resData.status) {
          Load(true);
          toast.success(resData.message);
          // Lead([])

          setTimeout(() => {}, 2000);
        } else {
          //  Update(true)

          toast.error(resData.message);
        }
      })
      .catch((err) => err);
  };

  const AddToCrm = (props: any) => {
    let data = {
      leadId: props._id,
      candidatName: props.leadCandidatName,
      candidatEmail: props.email ? props.email : "",
      candidatPhone: props.phoneNumber ? props.phoneNumber : "",
      leadNotes: props.leadNotes ? props.leadNotes : "",
      agencyNotes: "",
    };
    localStorage.setItem("archive", JSON.stringify(data));
    window.open("/AddLeadToCandidate");
    // AddToCRM(data)
  };

  return (
    <>
      {/* <Toaster  position="top-right"   containerStyle={{zIndex:"30443330099555"}}   /> */}
      <div className="row px-1 mt-1" style={{ width: "101%" }}>
        <div className="col-12 lead_Created">
          <div className="row">
            <div className="col-7 d-flex align-items-center">
              <p className="mb-0 d-flex align-items-center">
                <img alt="..."
                  src={require("../../images/calendar.png")}
                  style={{ width: "12px", marginRight: "4px" }}
                />
                Lead Created on {new Date(props.createdAt).toLocaleDateString('en-GB', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric'
                                })}
              </p>
            </div>
            <div
              className="col-5 d-flex justify-content-end align-items-center"
              style={{ height: "50px" }}
            >
              <button
                className="AddToCrm mb-0"
                onClick={() => AddToCrm(props)}
                style={{ height: "37px", width: "135px" }}
              >
                + add to crm
              </button>
              <button
                className="deleteAd mx-1"
                onClick={() => {
                  setDeleteLeads("Delete");
                  setNotesDeleteModal(true);
                }}
              >
                <img alt="..." src={require("../../images/Deletebucket.svg").default} />
              </button>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="row">
            <div className="col-8">
              <div className="row ">
                <div className="col-2 leadBox">
                  <b className="mb-0">Job Name</b>
                </div>
                <div className="col-2 leadBox">
                  <b className="mb-0">Source</b>
                </div>
                <div className="col-2 leadBox">
                  <b className="mb-0">Name</b>
                </div>
                <div className="col-3 leadBox d-grid">
                  <b className="mb-0">Phone Number</b>
                </div>
                <div className="col-3 leadBox">
                  <b
                    className="mb-0"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                  >
                    Email Address
                  </b>
                </div>
              </div>
            </div>
            <div className="col-4 d-grid leadBoxX">
              <b className="mb-0">Notes by Leads</b>
            </div>
            <div className="col-8">
              <div className="row justify-content-between">
                <div className="col-2 leadBoxGray">
                  <b
                    className="mb-0"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title={props.adName}
                  >
                    {props.adName
                      ? props.adName.length > 10
                        ? props.adName.slice(0, 8).toLocaleUpperCase() + ".."
                        : props.adName.toLocaleUpperCase()
                      : "✘✘!"}
                  </b>
                </div>
                <div className="col-2 leadBoxGray">
                  <b className="mb-0">
                    {props.leadSource ? props.leadSource : ""}
                  </b>
                </div>
                <div className="col-2 leadBoxGray">
                  <b
                    className="mb-0"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title={props.leadCandidatName}
                  >
                    {props.leadCandidatName
                      ? props.leadCandidatName.length > 8
                        ? props.leadCandidatName
                            .slice(0, 7)
                            .toLocaleUpperCase() + ".."
                        : props.leadCandidatName.toLocaleUpperCase()
                      : "✘✘!"}
                  </b>
                </div>
                <div
                  className="col-3 leadBoxGray d-grid"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title={
                    props.phoneNumber
                      ? props.phoneNumber.includes("+")
                        ? props.phoneNumber.replace("`", "")
                        : "+" + props.phoneNumber
                      : "✘✘!"
                  }
                >
                  <b className="mb-0">
                    {props.phoneNumber
                      ? props.phoneNumber.includes("+")
                        ? props.phoneNumber.replace("`", "")
                        : "+" + props.phoneNumber
                      : "✘✘!"}
                  </b>
                  <a
                    href={`https://wa.me/${props.phoneNumber}`}
                    target="_blank"
                    className="BlueLink text-center"
                  >
                    Send What’s app
                  </a>
                </div>
                <div className="col-3 leadBoxGray ">
                  <b
                    className="mb-0"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title={props.email}
                  >
                    {props.email
                      ? props.email.length > 15
                        ? props.email.slice(0, 18) + ".."
                        : props.email
                      : "✘✘!"}
                  </b>
                </div>
              </div>
            </div>
            <div className="col-4 d-grid leadBoxGray justify-content-start">
              <p className="mb-0">
                {props.leadNotes
                  ? props.leadNotes.length > 40
                    ? props.leadNotes.slice(0, 70) + "..."
                    : props.leadNotes
                  : "✘✘No Notes!"}
              </p>
              <button
                onClick={() => {
                  setLeadsNote("Leads");
                  props.leadNotes !== ""
                    ? setNotesModal(true)
                    : setNoteEditsModal(true);
                }}
                className="BlueLink"
              >
                Click Here to View More
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 leadBottom">
          <div className="row">
            <div className="col-12 d-grid PrECONTACTED">
              <div className="row p-1">
                <div
                  className="col-12 "
                  style={{
                    background: `${
                      Agency === "Not Yet" || Agency === "No" || Agency === "Not Interested"
                        ? `#d42424`
                        : Agency === "Yes"
                        ? `#489767`
                        : Agency === "Recall"
                        ? `#FE8700`
                        : ``
                    }`,
                    padding: "10px 15px",
                    borderRadius: "10px",
                  }}
                >
                  {" "}
                  <p className="m-0 ">Contacted by Agency</p>
                  {/* <span>(BY {LoginUser.emailAddress.substring(0,LoginUserS.emailAddress.lastIndexOf("@")).toUpperCase()})</span> */}
                </div>
              </div>
              <div className="row justify-content-around mb-1">
                <div className="col-2 pr-0 d-flex  align-items-center ">
                  <label
                    htmlFor={`1${length}`}
                    className={`btn d-flex align-items-center  ${
                      Agency === "Not Yet"
                        ? "offRedBtnAgency"
                        : "offBtns"
                    }`}
                  >
                    <div className="d-flex justify-content-center align-item-center inputBorder">
                      <input
                        type={"radio"}
                        id={`1${length}`}
                        name={`CAgency${length}`}
                        onChange={(e) => OnChangeRadio(e, props._id)}
                        value="Not Yet"
                        className="cursor-pointer d-flex justify-content-center align-items-center"
                        checked={
                          Agency === "Not Yet"
                            ? true
                            : false
                        }
                      />
                    </div>
                    Not yet
                  </label>
                </div>
                <div className="col-3  d-flex  align-items-center ">
                  <label
                    htmlFor={`5${length}`}
                    className={`btn d-flex align-items-center  ${
                      Agency === "Not Interested"
                        ? "offRedBtnAgency"
                        : "offBtns"
                    }`}
                  >
                    <div className="d-flex justify-content-center align-item-center inputBorder">
                      <input
                        type={"radio"}
                        id={`5${length}`}
                        name={`CAgency${length}`}
                        onChange={(e) => OnChangeRadio(e, props._id)}
                        value="Not Interested"
                        className="cursor-pointer d-flex justify-content-center align-items-center"
                        checked={
                          Agency === "Not Interested"
                            ? true
                            : false
                        }
                      />
                    </div>
                    Not Interested
                  </label>
                </div>
                <div className="col-2  d-flex justify-content-end align-items-center">
                  <label
                    htmlFor={`2${length}`}
                    className={`btn d-flex align-items-center  ${
                      Agency === "Yes" ? "onGreenBtnContact" : "offBtns"
                    }`}
                  >
                    {" "}
                    <div className="d-flex justify-content-center align-item-center inputBorder">
                      <input
                        type={"radio"}
                        id={`2${length}`}
                        name={`CAgency${length}`}
                        onChange={(e) => OnChangeRadio(e, props._id)}
                        value="Yes"
                        className="cursor-pointer d-flex justify-content-center align-items-center"
                        checked={
                          Agency === "Yes" ? true : false
                        }
                      />
                    </div>
                    Yes
                  </label>
                </div>
                <div className="col-2  d-flex justify-content-end align-items-center">
                  {" "}
                  <label
                    htmlFor={`3${length}`}
                    className={`btn d-flex align-items-center  ${
                      Agency === "No" ? "offRedBtnAgency" : "offBtns"
                    }`}
                  >
                    <div className="d-flex justify-content-center align-item-center inputBorder">
                      <input
                        type={"radio"}
                        id={`3${length}`}
                        name={`CAgency${length}`}
                        onChange={(e) => OnChangeRadio(e, props._id)}
                        value="No"
                        className="cursor-pointer d-flex justify-content-center align-items-center"
                        checked={
                          Agency === "No" ? true : false
                        }
                      />
                    </div>
                    No
                  </label>
                </div>
                <div className="col-3  d-flex  align-items-center">
                  {" "}
                  <label
                    htmlFor={`4${length}`}
                    className={`btn d-flex align-items-center  ${
                      Agency === "Recall" ? "themeColorAgency" : "offBtns"
                    }`}
                  >
                    <div className="d-flex justify-content-center align-item-center inputBorder">
                      <input
                        type={"radio"}
                        id={`4${length}`}
                        name={`CAgency${length}`}
                        onChange={(e) => OnChangeRadio(e, props._id)}
                        value="Recall"
                        className="cursor-pointer d-flex justify-content-center align-items-center"
                        checked={
                          Agency === "Recall"
                            ? true
                            : false
                        }
                      />
                    </div>
                    Recall
                  </label>
                </div>
              </div>
            </div>

            {/* <div className="col-4 d-grid NotesAgency">
        <p className="mb-0">Notes by Agency</p>
        <span className="mb-0">{props.agencyNotes !=="" ? props.agencyNotes.length > 40 ? props.agencyNotes.slice(0,40) + "..." :  props.agencyNotes : "✘✘No Notes!"}</span>
        <button  onClick={()=>{setLeadsNote("Agency");props.agencyNotes !=="" ? setNotesModal(true) : setNoteEditsModal(true)}} className="BlueLink d-flex" style={{background:"transparent",border:"0px"}}>Click Here to View More</button>
        </div> */}
            <div className="col-12 ">
              <div
                className="row "
                style={{
                  borderTop: "1px solid #dcd9d9",
                }}
              >
                {/* <div
                  className="col-3 py-1 px-0"
                  style={{
                    borderRight: "1px solid #dcd9d9",
                  }}
                >
                  <div className="row mx-1">
                    <div
                      className="col-12 addToCrmLabel"
                      style={{
                        background: `${
                          Added == "true" ? `#489767` : `#d42424`
                        }`,
                      }}
                    >
                      <p className="mb-0 ">Added to CRM</p>
                    </div>
                    <div className="col-12  mt-1">
                      <div className="row PrECONTACTEDInput ">
                        <div className="col-6 pr-0  d-flex justify-content-center align-items-center ">
                          <label
                            htmlFor={`Add1${length}`}
                            className={`btn d-flex align-items-center  ${
                              Added === "false" ? "offRedBtn" : "offBtns"
                            }`}
                          >
                            <div className="d-flex justify-content-center align-item-center inputBorder">
                              <input
                                id={`Add1${length}`}
                                type={"radio"}
                                value={"false"}
                                name={`Added_to_CRM${length}`}
                                onChange={(e) => OnChangeRadio(e, props._id)}
                                className="cursor-pointer yesNoRadio d-flex"
                                checked={
                                  Added === false
                                    ? true
                                    : props.leadAddedToCRM === false
                                    ? true
                                    : false
                                }
                              />
                            </div>
                            No
                          </label>
                        </div>
                        <div className="col-6  d-flex justify-content-start align-items-center">
                          <label
                            htmlFor={`Add2${length}`}
                            className={`btn d-flex align-items-center  ${
                              Added === "true" ? "onGreenBtnContact" : "offBtns"
                            }`}
                          >
                            <div className="d-flex justify-content-center align-item-center inputBorder">
                              {" "}
                              <input
                                id={`Add2${length}`}
                                type={"radio"}
                                value={"true"}
                                name={`Added_to_CRM${length}`}
                                onChange={(e) => OnChangeRadio(e, props._id)}
                                className="cursor-pointer yesNoRadio d-flex justify-content-center align-items-center"
                                checked={
                                  Added === true
                                    ? true
                                    : props.leadAddedToCRM === true
                                    ? true
                                    : false
                                }
                              />
                            </div>
                            Yes
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div
                  className="col-6"
                  style={{
                    borderRight: "1px solid #dcd9d9",
                  }}
                >
                  <div className="row p-1">
                    <div
                      className="col-12 addToCrmLabel"
                      style={{
                        background: `${
                          Qual == 0
                            ? "#d42424"
                            : Qual == 1
                            ? `#FE8700`
                            : `#489767`
                        }`,
                      }}
                    >
                      <p className="mb-0 ">QUALIFIED</p>
                    </div>
                  </div>
                  <div className="row PrECONTACTEDInput ">
                    <div className="col-2 pr-0 d-flex justify-content-start align-items-center ">
                      <label
                        className={`btn d-flex align-items-center  ${
                          Qual == 0 ? "offRedBtnAgency" : "offBtns"
                        }`}
                        htmlFor={`Qua0${length}`}
                      >
                        {" "}
                        <div className="d-flex justify-content-center align-item-center inputBorder">
                          {" "}
                          <input
                            name={`QUALIFIED${length}`}
                            id={`Qua0${length}`}
                            onChange={(e) => OnChangeRadio(e, props._id)}
                            value={0}
                            type={"radio"}
                            className="cursor-pointer d-flex justify-content-center align-items-center"
                            checked={
                              Qual == 0
                                ? true
                                : false
                            }
                          />
                        </div>
                        ?
                      </label>
                    </div>
                    <div className="col-2 pr-0 d-flex justify-content-start align-items-center">
                      {" "}
                      <label
                        className={`btn d-flex align-items-center  ${
                          Qual == 1 ? "themeColorAgency" : "offBtns"
                        }`}
                        htmlFor={`Qua1${length}`}
                      >
                        {" "}
                        <div className="d-flex justify-content-center align-item-center inputBorder">
                          {" "}
                          <input
                            name={`QUALIFIED${length}`}
                            id={`Qua1${length}`}
                            onChange={(e) => OnChangeRadio(e, props._id)}
                            value={1}
                            type={"radio"}
                            className="cursor-pointer d-flex justify-content-center align-items-center"
                            checked={
                              Qual == 1
                                ? true
                                : false
                            }
                          />
                        </div>
                        😟
                      </label>
                    </div>
                    <div className="col-2 pr-0 d-flex justify-content-start align-items-center">
                      {" "}
                      <label
                        className={`btn d-flex align-items-center  ${
                          Qual == 2 ? "onGreenBtnContact" : "offBtns"
                        }`}
                        htmlFor={`Qua2${length}`}
                      >
                        {" "}
                        <div className="d-flex justify-content-center align-item-center inputBorder">
                          {" "}
                          <input
                            name={`QUALIFIED${length}`}
                            id={`Qua2${length}`}
                            onChange={(e) => OnChangeRadio(e, props._id)}
                            value={2}
                            type={"radio"}
                            className="cursor-pointer d-flex justify-content-center align-items-center"
                            checked={
                              Qual == 2
                                ? true
                                : false
                            }
                          />
                        </div>
                        🙁
                      </label>
                    </div>
                    <div className="col-2 pr-0 d-flex justify-content-start align-items-center">
                      {" "}
                      <label
                        className={`btn d-flex align-items-center  ${
                          Qual == 3 ? "onGreenBtnContact" : "offBtns"
                        }`}
                        htmlFor={`Qua3${length}`}
                      >
                        {" "}
                        <div className="d-flex justify-content-center align-item-center inputBorder">
                          {" "}
                          <input
                            name={`QUALIFIED${length}`}
                            id={`Qua3${length}`}
                            onChange={(e) => OnChangeRadio(e, props._id)}
                            value={3}
                            type={"radio"}
                            className="cursor-pointer d-flex justify-content-center align-items-center"
                            checked={
                              Qual == 3
                                ? true
                                : false
                            }
                          />
                        </div>
                        😊
                      </label>
                    </div>
                    <div
                      className="col-2 pr-0 d-flex justify-content-start align-items-center"
                      style={{ marginTop: "5px" }}
                    >
                      {" "}
                      <label
                        className={`btn d-flex align-items-center  ${
                          Qual == 4 ? "onGreenBtnContact" : "offBtns"
                        }`}
                        htmlFor={`Qua4${length}`}
                      >
                        {" "}
                        <div className="d-flex justify-content-center align-item-center inputBorder">
                          {" "}
                          <input
                            name={`QUALIFIED${length}`}
                            id={`Qua4${length}`}
                            onChange={(e) => OnChangeRadio(e, props._id)}
                            value={4}
                            type={"radio"}
                            className="cursor-pointer d-flex justify-content-center align-items-center"
                            checked={
                              Qual == 4
                                ? true
                                : false
                            }
                          />
                        </div>
                        🥰
                      </label>
                    </div>
                    <div
                      className="col-2 d-flex justify-content-start align-items-center"
                      style={{ marginTop: "5px" }}
                    >
                      {" "}
                      <label
                        className={`btn d-flex align-items-center  ${
                          Qual == 5 ? "onGreenBtnContact" : "offBtns"
                        }`}
                        htmlFor={`Qua5${length}`}
                      >
                        {" "}
                        <div className="d-flex justify-content-center align-item-center inputBorder">
                          {" "}
                          <input
                            name={`QUALIFIED${length}`}
                            id={`Qua5${length}`}
                            onChange={(e) => OnChangeRadio(e, props._id)}
                            value={5}
                            type={"radio"}
                            className="cursor-pointer d-flex justify-content-center align-items-center"
                            checked={
                              Qual == 5
                                ? true
                                : false
                            }
                          />
                        </div>
                        😍
                      </label>
                    </div>
                  </div>
                </div>
                <div
                  className="col-6 addToCrmLabel d-grid"
                  style={{ background: "transparent" }}
                >
                  <p className="mb-0 mt-1">Notes by Agency</p>
                  <span className="mb-0">
                    {props.agencyNotes !== ""
                      ? props.agencyNotes.length > 40
                        ? props.agencyNotes.slice(0, 40) + "..."
                        : props.agencyNotes
                      : "✘✘No Notes!"}
                  </span>
                  <button
                    onClick={() => {
                      setLeadsNote("Agency");
                      props.agencyNotes !== ""
                        ? setNotesModal(true)
                        : setNoteEditsModal(true);
                    }}
                    className="BlueLink d-flex"
                    style={{ background: "transparent", border: "0px" }}
                  >
                    Click Here to View More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {NoteEditModal ? (
        <NotesEditModal
          closeModal={setNoteEditsModal}
          props={props}
          update={Update}
          Load={Load}
          deleteModal={setNotesDeleteModal}
          setrest={setrest}
          Notes={LeadNotes}
          setDelete={setDeleteLeads}
          setFilter={setFilter}
          Data={Data}
        />
      ) : null}
      {NoteModal ? (
        <NotesModal
          closeModal={setNotesModal}
          props={props}
          EditModal={setNoteEditsModal}
          deleteModal={setNotesDeleteModal}
          Notes={LeadNotes}
          setDelete={setDeleteLeads}
        />
      ) : null}
      {NoteDeleteModal ? (
        <ConfirmDelete
          closeModal={setNotesDeleteModal}
          setrest={setrest}
          props={props}
          update={Update}
          Load={Load}
          Notes={LeadNotes}
          LeadsDelete={DeleteLeads}
          setDelete={setDeleteLeads}
          setFilter={setFilter}
        />
      ) : null}
    </>
  );
}
export default LeadList;
