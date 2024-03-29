import { Link } from "react-router-dom";
import "../CSS/CanEmpl.css";
import ArchivedModal from "./Modal/ArchivedModal";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import PreSelectedModal from "../components/Modal/preSelectedModal"
import moment from "moment";

const ToDoProfileCard = (props: any) => {
  const navigate = useNavigate();
  const [showInProgressModal, setShowInProgressModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [startStatus] = useState(
    props.data.candidatStartDate != undefined || props.data.candidatStartDate != ""
      ? props.data.candidatStartDate.slice(0, 4).includes("-")
      : null
  );
  const [endStatus] = useState(
    props.data.candidatEndDate != undefined || props.data.candidatEndDate != ""
      ? props.data.candidatEndDate.slice(0, 4).includes("-")
      : null
  );
  const [startDate, setStartDate] = useState() as any;
  const [EndDate, setEndDate] = useState() as any;

  const CardOptions = [
    {
      value: "Edit Profile",
      label: "Edit Profile",
    },
    { value: "move to pre selected", label: "Move to PreSelected" },
    { value: "Archive", label: "Archive" },
  ];

  let state = { profileData: props.data, path: "/todolist" };

  const [candidatMotivationIcons, setMotivation] = useState([
    { icon: "No", motivation: "Motivation!" },
    { icon: "😟", motivation: "Disappointed" },
    { icon: "🙁", motivation: "Not Really" },
    { icon: "😊", motivation: "Like" },
    { icon: "🥰", motivation: "Great" },
    { icon: "😍", motivation: "Super Lovely" },
  ]);

  const editCandidatProfile = () => {
    navigate("/todolist/editToDo", { state: state });
  };

  const viewFullProfile = () => {
    // navigate("/todoprofile", { state: props.data });
    localStorage.setItem("profile", JSON.stringify(props.data));
    window.open("/todolist/todoprofile", "_blank");
  };

  function padTo2DigitsCH(num) {
    return num.toString().padStart(2, "0");
  }

  // console.log(props.data.jobStartDate.slice(0,4).includes("-"))

  function formatDateCha(date) {
    if (date === "") {
      return false;
    }
    return [
      padTo2DigitsCH(date.getDate()),
      padTo2DigitsCH(date.getMonth() + 1),
      date.getFullYear(),
    ].join("/");
  }
  const datenow = moment().format("YYYY-MM-DD");

  let date = new Date(datenow);

  let start = props.data.candidatStartDate !== "" ? new Date(props.data.candidatStartDate) : '';
  let end = props.data.candidatEndDate !== "" ? new Date(props.data.candidatEndDate) : '';

  useEffect(() => {
    if (startStatus) { 
      setStartDate(props.data.candidatStartDate !== "" ? props.data.candidatStartDate : '');
    } else {
      let data = formatDateCha(start);
      setStartDate(data ? data.replaceAll("/", "-") : '');
    }
    if (endStatus) {
      setEndDate(props.data.candidatEndDate);
    } else {
      let data = formatDateCha(end);
      setEndDate(data ? data.replaceAll("/", "-") : '');
    }
  });

  const MoreOption = (e: any) => {
    if (e.value == "Edit Profile") {
      editCandidatProfile();
    }
    if (e.value == "move to pre selected") {
      setShowInProgressModal(true);
    }
    if (e.value == "Archive") {
      setShowArchiveModal(true);
    }
  };
  return (
    <>
      <div className="card card-color mb-1 px-0 HoveRESTClassCard">
        <div onClick={viewFullProfile} className="card-upper cursor-pointer">
          {props.data.candidatPhoto &&
          props.data.candidatPhoto?.url !== undefined ? (
            <>
              <div className="col-5 d-flex justify-content-center p-1">
                <img 
                  src={props.data.candidatPhoto?.url}
                  className="card-img-top-url"
                  alt="..."
                />
              </div>
              <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7 col-sm-7 fontStylinForcards">
                <p
                  style={{ width: "100%" }}
              
                  className="text-dark mb-0"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title={props.data.candidatName.toLocaleUpperCase()}
                >
                  <b className="TopTodoTitle"      style={{
              color: date >= start && date <= end ? "#3F76E2" : "#ca1313",
            }}>
                    {props.data.candidatName.length > 20
                      ? props.data.candidatName
                          .slice(0, 21)
                          .toLocaleUpperCase() + "..."
                      : props.data.candidatName.toLocaleUpperCase()}
                  </b>
                </p>
                <p className="text-dark mb-0">
                  {props.data.candidatAge ? (
                    <p className="age00 mb-0">
                      {" "}
                      <b>Age : {props.data.candidatAge}</b>
                    </p>
                  ) : (
                    <b>✘ Age Not Available!</b>
                  )}
                </p>
                <div>
                  {" "}
                  <p className="text-dark d-flex mb-0">
                    {" "}
                    <b>
                      {props.data.candidatMotivation == 0
                        ? candidatMotivationIcons[props.data.candidatMotivation]
                            .icon +
                          " " +
                          candidatMotivationIcons[props.data.candidatMotivation]
                            .motivation
                        : candidatMotivationIcons[props.data.candidatMotivation]
                            .icon +
                          " " +
                          candidatMotivationIcons[props.data.candidatMotivation]
                            .motivation}
                    </b>
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="col-4">
                <img
                  src={require("../images/card-men.svg").default}
                  className="card-img-top"
                  alt="..."
                />
              </div>
              <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-8 fontStylinForcards">
                <p
                  style={{ width: "100%" }}
                  className="text-dark mb-0"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title={props.data.candidatName.toLocaleUpperCase()}
                >
                  <b className="TopTodoTitle"  style={{
              color: date >= start && date <= end ? "#3F76E2" : "#ca1313",
            }}>
                    {props.data.candidatName.length > 20
                      ? props.data.candidatName
                          .slice(0, 21)
                          .toLocaleUpperCase() + "..."
                      : props.data.candidatName.toLocaleUpperCase()}
                  </b>
                </p>
                <div className="text-dark mb-0">
                  {props.data.candidatAge ? (
                    <p className="age00 mb-0">
                      {" "}
                      <b className="TopTodoTitle">
                        Age : {props.data.candidatAge}
                      </b>
                    </p>
                  ) : (
                    <b className="TopTodoTitle">Age : ✘!</b>
                  )}
                </div>
                <div>
                  {" "}
                  <p className="text-dark d-flex mb-0">
                    {" "}
                    <b>
                      {props.data.candidatMotivation
                        ? props.data.candidatMotivation == 0
                          ? candidatMotivationIcons[
                              props.data.candidatMotivation
                            ].icon +
                            " " +
                            candidatMotivationIcons[
                              props.data.candidatMotivation
                            ].motivation
                          : candidatMotivationIcons[
                              props.data.candidatMotivation
                            ].icon +
                            " " +
                            candidatMotivationIcons[
                              props.data.candidatMotivation
                            ].motivation
                        : "✘ No Motivation!"}
                    </b>
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="col-12 ">
          <div className="row cardColorRow">
            <div className="col-6 d-flex align-items-center">
              <Link to="#">
                <button className="todo p-0">
                  <img alt="..." src={require("../images/briefcase.svg").default} />
                </button>
              </Link>
            </div>
            <div className="col-6 d-flex justify-content-end mb-0 px-0 form-group">
              {props.data.candidatLicensePermis ? (
                <div className="d-flex  justify-content-center align-items-center">
                  <img alt="..."
                    style={{ width: "16px" }}
                    src={require("../images/HaveLicence.svg").default}
                  />
                  <label htmlFor="css" className="Licence mb-0">
                    Have Licence
                  </label>
                </div>
              ) : (
                <div className="d-flex  justify-content-center align-items-center">
                  <img alt="..."
                    style={{ width: "16px" }}
                    src={require("../images/noLicence.svg").default}
                  />
                  <label htmlFor="css" className="NoLicence mb-0">
                    No Licence
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="card-todoBody" style={{ paddingLeft: "5px" }}>
          {/*                
                    <p className="todoCardbody">Name : <b>{props.data.candidatName.toLocaleUpperCase()}</b></p>
                    <p className="todoCardbody">Age : <b>{props.data.candidatAge ? props.data.candidatAge : "Age Not Available!"}</b></p> */}
          {/* <p className="todoCardbody">Motivation : <b>{candidatMotivationIcons[props.data.candidatMotivation - 1].icon + " " + candidatMotivationIcons[props.data.candidatMotivation - 1].motivation}</b> </p> */}
          <p className="todoCardbody mb-0">
            <b>
              Secteur :{" "}
              {props.data.candidatActivitySector
                ? props.data.candidatActivitySector.toLocaleUpperCase()
                : "✘ No Sector!"}
            </b>
          </p>

          <p className="todoCardbody mb-0">
            <b>
              Job :{" "}
              {props.data.candidatJob
                ? props.data.candidatJob.toLocaleUpperCase()
                : "No Job!"}
            </b>{" "}
          </p>
          <p className="todoCardbody-p mb-0">
            Langues :{" "}
            <b>
              {props.data.candidatLanguages.length !== 0
                ? props.data.candidatLanguages.length > 3
                  ? props.data.candidatLanguages.slice(0, 3).join(", ") + "..."
                  : props.data.candidatLanguages.join(", ")
                : "✘ No Langues Selected!"}
            </b>
          </p>
          <p className="todoCardbody-p mb-0">
            Phone Number :{" "}
            <b>
              {props.data.candidatPhone
                ? props.data.candidatPhone
                : "✘ No Phone!"}
            </b>{" "}
          </p>
          <p className="todoCardbody-p " style={{ marginBottom: "8px" }}>
            Facebook URL :{" "}
            <b>
              {props.data.candidatFBURL ? (
                <a
                  href={props.data.candidatFBURL}
                  target="_blank"
                  className="fbURL"
                >
                  View Facebook Profile
                </a>
              ) : (
                "✘ No Facebook Profile!"
              )}
            </b>
          </p>
          <p className="preCard-Body-p">
            Email :{" "}
            <b>
              {" "}
              {props.data.candidatEmail
                ? props.data.candidatEmail.length > 20
                  ? props.data.candidatEmail.slice(0, 22).toLocaleUpperCase() +
                    "..."
                  : props.data.candidatEmail.toLocaleUpperCase()
                : "✘ No Email Provided!"}
            </b>
          </p>
          <p
            className="todoCardbodyBlue py-1"
            style={{
              color: date >= start && date <= end ? "#3F76E2" : "#ca1313",
            }}
          >
            Ready for work :{" "}
            {props.data.candidatStartDate != undefined || props.data.candidatStartDate != "" 
              ? startDate != "" && EndDate != ""
                ? " 📆" + startDate + "  To  " + EndDate
                : "✘No Dates!"
              : "✘No Dates!"}
          </p>
        </div>

        <div className="card-bodyTodo mb-1 py-0">
          <div className="" style={{ padding: "0px 5px" }}>
            <div className="col-xxl-12 col-xl-12 col-md-12 col-lg-12 py-0 px-0 mt-0">
              <div className="row">
                <div className="col-xxl-6 col-xl-6 col-md-6 col-lg-6">
                  <Select
                    placeholder="More options"
                    options={CardOptions}
                    className="CardOptions AllMoreOp cursor-pointer"
                    onChange={MoreOption}
                    isSearchable={false}
                  />
                </div>
                <div className="col-xxl-6 col-xl-6 col-md-6 col-lg-6  text-end pl-0">
                  <button
                    className="btn btn-dark btn-viewprofile-card"
                    onClick={() => {
                      viewFullProfile();
                    }}
                  >
                    See Full Profile
                  </button>
                </div>
                {showInProgressModal ? (
                  <PreSelectedModal
                    props={props.data}
                    closepreModal={setShowInProgressModal}
                  />
                ) : null}
                {showArchiveModal ? (
                  <ArchivedModal
                    props={props.data}
                    closeModal={setShowArchiveModal}
                    path={"/todolist"}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDoProfileCard;
