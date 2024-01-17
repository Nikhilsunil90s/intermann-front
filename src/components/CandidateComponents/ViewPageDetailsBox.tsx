import React from "react";
import moment from "moment";

function CandidateDetialBox({ props, startDate, EndDate ,editCandidatProfile}) {
  const datenow = moment().format("YYYY-MM-DD");

  let date = new Date(datenow);

  let start = new Date(props.candidatStartDate);
  let end = new Date(props.candidatEndDate);

  return (
    <>
      <div className="Todo-CardMore force-overflow">
        <div className="row ">
          <div className="d-flex align-items-center">
            <p>Langues </p>
            <span className="Todo-CardMore-span">
              :{" "}
              {props.candidatLanguages.length
                ? props.candidatLanguages.join(", ")
                : "✘✘No Language!"}
            </span>
            <span className="mx-1 cursor-pointer" onClick={editCandidatProfile}>  <img style={{filter:"invert(1)",height:"22px"}} alt="..." src={require("../../images/Edit.svg").default} /></span>

          </div>
        </div>
        <div className="d-flex align-items-center">
          <p className="blue-text">Ready for work :</p>
          <span
            className="bluetextCardSee"
            style={{
              color: date >= start && date <= end ? "#3F76E2" : "#ca1313",
            }}
          >
            {props.candidatStartDate !== undefined
              ? date >= start && date <= end
                ? " 📆" + startDate + "  To  " + EndDate
                : "⚠️" + startDate + "  To  " + EndDate
              : "✘✘No Dates! "}
          </span>
          <span className="mx-1 cursor-pointer" onClick={editCandidatProfile}>  <img style={{filter:"invert(1)",height:"22px"}} alt="..." src={require("../../images/Edit.svg").default} /></span>

        </div>
        <div className="d-flex align-items-center">
          <p>Permis </p>
          <span className="Todo-CardMore-span">
            : {props.candidatLicensePermis ? `✔ Yes` : "✘ No"}
          </span>
          <span className="mx-1 cursor-pointer" onClick={editCandidatProfile}>  <img style={{filter:"invert(1)",height:"22px"}} alt="..." src={require("../../images/Edit.svg").default} /></span>

        </div>
        <div className="d-flex align-items-center">
          <p>Voyage en voiture </p>
          <span className="Todo-CardMore-span">
            : {props.candidatConduireEnFrance ? "✔ Yes" : "✘ No"}
          </span>
          <span className="mx-1 cursor-pointer" onClick={editCandidatProfile}>  <img style={{filter:"invert(1)",height:"22px"}} alt="..." src={require("../../images/Edit.svg").default} /></span>

        </div>

        <div className="d-flex align-items-center">
          <div className="d-flex">
            {" "}
            <p>Skills/note </p>{" "}
            <span className="Todo-CardMore-span text-capitalize">
              : {props.candidatSkills ? props.candidatSkills : "✘✘No Skills!"}
            </span>
            <span className="mx-1 cursor-pointer" onClick={editCandidatProfile}>  <img style={{filter:"invert(1)",height:"22px"}} alt="..." src={require("../../images/Edit.svg").default} /></span>

          </div>
        </div>
        <div className="d-flex align-items-center">
          <p className="text-dark">Trouvé sur </p>
          <span className="text-dark Todo-CardMore-span text-capitalize">
            : {props.candidatJob ? props.candidatJob : "✘✘No Trouvé!"}
          </span>
          <span className="mx-1 cursor-pointer" onClick={editCandidatProfile}>  <img style={{filter:"invert(1)",height:"22px"}} alt="..." src={require("../../images/Edit.svg").default} /></span>

        </div>
      </div>
    </>
  );
}
export default CandidateDetialBox;
