import React from "react";
import moment from "moment";

function DetailBox({ props, startDate, EndDate ,editClientProfile}) {
  const datenow = moment().format("YYYY-MM-DD");
  let date = new Date(datenow);

  let start = new Date(props.jobStartDate);
  let end = new Date(props.jobEndDate);

  return (
    <>
      <div className="Todo-ClinetCardMore force-overflow">
        <div className="d-flex">
          <p className="">Company Adress </p>

          <span
            className="Todo-ClinetCardMore-span text-capitalize"
            style={{ width: "69%" }}
          >
            :
            {props.clientAddress ? "  " + props.clientAddress : "✘ No Address!"}
          </span>
          <span className="mx-1 cursor-pointer" onClick={editClientProfile}>  <img style={{filter:"invert(1)",height:"22px"}} alt="..." src={require("../../images/Edit.svg").default} /></span>

        </div>

        <div className="d-flex align-items-center ">
          <p className="blue-text">Research for work :</p>
          <span
            className="bluetextCardSee"
            style={{
              color: date >= start && date <= end ? "#3F76E2" : "#ca1313",
            }}
          >
            {date >= start && date <= end
              ? " 📆" + startDate + "  To  " + EndDate
              : "⚠️" + startDate + "  To  " + EndDate}
          </span>
          <span className="mx-1 cursor-pointer" onClick={editClientProfile}>  <img style={{filter:"invert(1)",height:"22px"}} alt="..." src={require("../../images/Edit.svg").default} /></span>

        </div>
        <div className="d-flex align-items-center">
          <p>Langues : </p>
          <span className="Todo-ClinetCardMore-span">
            {props.clientLanguages.length
              ? "  " + props.clientLanguages.join(", ")
              : " ✘ No Langues!"}
          </span>
          <span className="mx-1 cursor-pointer" onClick={editClientProfile}>  <img style={{filter:"invert(1)",height:"22px"}} alt="..." src={require("../../images/Edit.svg").default} /></span>

        </div>
        <div className="d-flex align-items-center">
          <p>Voyage en voiture :</p>
          <span className="Todo-ClinetCardMore-span">
            {props.candidatConduireEnFrance ? `✔ Yes` : "✘ No"}
          </span>
          <span className="mx-1 cursor-pointer" onClick={editClientProfile}>  <img style={{filter:"invert(1)",height:"22px"}} alt="..." src={require("../../images/Edit.svg").default} /></span>

        </div>
        <div className="d-flex align-items-center">
          <p>Permis / Licence Drive :</p>
          <span className="Todo-ClinetCardMore-span">
            {props.clientPermis ? `✔ Yes` : "✘ No"}
          </span>
          <span className="mx-1 cursor-pointer" onClick={editClientProfile}>  <img style={{filter:"invert(1)",height:"22px"}} alt="..." src={require("../../images/Edit.svg").default} /></span>

        </div>
        <div className="d-flex">
          <p>Client Note:</p>
          <span
            className="Todo-ClinetCardMore-span text-capitalize"
            style={{ textDecoration: "none", width: "77%" }}
          >
            {props.clientRequiredSkills != ""
              ? "  " + props.clientRequiredSkills
              : "✘ Not Available!"}
          </span>
          <span className="mx-1 cursor-pointer" onClick={editClientProfile}>  <img style={{filter:"invert(1)",height:"22px"}} alt="..." src={require("../../images/Edit.svg").default} /></span>

        </div>
        <div className="d-flex align-items-center">
          <p className="text-dark">Potential Turnover CA</p>
          <span className="Todo-ClinetCardMore-span">
            :
            {props.jobTotalBudget != null
              ? props.jobTotalBudget + "€"
              : "No Budget!"}
          </span>
          <span className="mx-1 cursor-pointer" onClick={editClientProfile}>  <img style={{filter:"invert(1)",height:"22px"}} alt="..." src={require("../../images/Edit.svg").default} /></span>

        </div>
        <div className="d-flex align-items-center">
          <p className="text-dark">Salary by person </p>
          <span className="Todo-ClinetCardMore-span">
            :{" "}
            {props.salary_hours.length > 0
              ? props.salary_hours.includes(props.salary_hours.salaryPerHour)
                ? props.salary_hours
                    .map((el, i) => {
                      return el.salaryPerHour + "€";
                    })
                    .slice(0, 1)
                : "✘ No Salary!"
              : "✘ No Salary!"}{" "}
          </span>
          <span className="mx-1 cursor-pointer" onClick={editClientProfile}>  <img style={{filter:"invert(1)",height:"22px"}} alt="..." src={require("../../images/Edit.svg").default} /></span>

        </div>
        <div className="d-flex ">
          <p className="text-dark">Salaire net du salarié </p>
          <span className="Todo-ClinetCardMore-span">
            :{" "}
            {props.salary_hours.length !== 0
              ? props.salary_hours.map((el, i) => (
                  <div className="d-flex" key={i}>
                    {el.hours ? el.hours : "0"}H ={" "}
                    <span>
                      {el.salaryPerHour ? el.salaryPerHour + "€" : "0€"}
                    </span>
                  </div>
                ))
              : "✘ No Salaire!"}
          </span>
          <span className="mx-1 cursor-pointer" onClick={editClientProfile}>  <img style={{filter:"invert(1)",height:"22px"}} alt="..." src={require("../../images/Edit.svg").default} /></span>

        </div>
        <div className="d-flex ">
          <p className="text-dark">Taux horraire </p>
          <span className="Todo-ClinetCardMore-span">
            :{" "}
            {props.rate_hours.length !== 0
              ? props.rate_hours.map((el, i) => (
                  <div className="d-flex" key={i}>
                    {el.hours ? el.hours : "0"}H ={" "}
                    <span>{el.ratePerHour ? el.ratePerHour + "€" : "0€"}</span>
                  </div>
                ))
              : "✘ No horraire!"}
          </span>
          <span className="mx-1 cursor-pointer" onClick={editClientProfile}>  <img style={{filter:"invert(1)",height:"22px"}} alt="..." src={require("../../images/Edit.svg").default} /></span>

        </div>
      </div>
    </>
  );
}
export default DetailBox;
