import React, { useState, useEffect } from "react";
import "../../CSS/Client/ProgressCardClient.css";
import { ReactComponent as Empty } from "../../images/emptyStar.svg";
import { ReactComponent as StarRating } from "../../images/RatingStar.svg";
import Select from "react-select";
import ArchivedClientModal from "../../components/Modal/ArchivedClientModal";
import { useNavigate } from "react-router-dom";
import ReadMoreReact from "read-more-react";
import CLintHide from "../../components/Modal/HideClientProfile";
import ClientREST from "../../components/Modal/ClientREStProfile";
import moment from "moment";

function ClientCardArchived(props: any) {
  const navigate = useNavigate();
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [HideProfile, setHideProfile] = useState(false);
  const [RESTprofile, setREStProfile] = useState(false);
  const [startStatus] = useState(
    props.data.jobStartDate.slice(0, 4).includes("-")
  );
  const [endStatus] = useState(props.data.jobEndDate.slice(0, 4).includes("-"));
  const [startDate, setStartDate] = useState() as any;
  const [EndDate, setEndDate] = useState() as any;
  const CardOption = [
    {
      value: "Edit Profile",
      label: "Edit Profile",
    },
    { value: "Reset Profile", label: "Reset Profile" },
    { value: "Hide This Profile", label: "Hide This Profile" },
  ] as any;

 
  const editClientProfile = () => {
    navigate("/archived/archivedClientEditprofile", { state: props.data });
  };
  const viewFullProfile = () => {
    // navigate("/archivedClientSeeprofile", { state: props.data });
    localStorage.setItem("archive", JSON.stringify(props.data));
    window.open("/archived/archivedClientSeeprofile", "_blank");
  };

  const MoreOption = (e: any) => {
    if (e.value == "Edit Profile") {
      editClientProfile();
    }
    if (e.value == "Reset Profile") {
      setREStProfile(true);
    }
    if (e.value == "Hide This Profile") {
      setHideProfile(true);
    }
    if (e.value == "Archive") {
      setShowArchiveModal(true);
    }
  };

  const candidatImportanceIcons = [
    {
      icon: (
        <>
          <StarRating style={{ marginRight: "3px", width: "70%" }} />{" "}
          <Empty style={{ marginRight: "3px", width: "70%" }} />{" "}
          <Empty style={{ marginRight: "3px", width: "70%" }} />{" "}
          <Empty style={{ marginRight: "3px", width: "70%" }} />{" "}
          <Empty style={{ marginRight: "3px", width: "70%" }} />
        </>
      ),
    },
    {
      icon: (
        <>
          <StarRating style={{ marginRight: "3px", width: "70%" }} />
          <StarRating style={{ marginRight: "3px", width: "70%" }} />{" "}
          <Empty style={{ marginRight: "3px", width: "70%" }} />{" "}
          <Empty style={{ marginRight: "3px", width: "70%" }} />{" "}
          <Empty style={{ marginRight: "3px", width: "70%" }} />
        </>
      ),
    },
    {
      icon: (
        <>
          <StarRating style={{ marginRight: "3px", width: "70%" }} />{" "}
          <StarRating style={{ marginRight: "3px", width: "70%" }} />{" "}
          <StarRating style={{ marginRight: "3px", width: "70%" }} />{" "}
          <Empty style={{ marginRight: "3px", width: "70%" }} />{" "}
          <Empty style={{ marginRight: "3px", width: "70%" }} />
        </>
      ),
    },
    {
      icon: (
        <>
          <StarRating style={{ marginRight: "3px", width: "70%" }} />{" "}
          <StarRating style={{ marginRight: "3px", width: "70%" }} />{" "}
          <StarRating style={{ marginRight: "3px", width: "70%" }} />{" "}
          <StarRating style={{ marginRight: "3px", width: "70%" }} />{" "}
          <Empty style={{ marginRight: "3px", width: "70%" }} />
        </>
      ),
    },
    {
      icon: (
        <>
          <StarRating style={{ marginRight: "3px", width: "70%" }} />
          <StarRating style={{ marginRight: "3px", width: "70%" }} />{" "}
          <StarRating style={{ marginRight: "3px", width: "70%" }} />{" "}
          <StarRating style={{ marginRight: "3px", width: "70%" }} />{" "}
          <StarRating style={{ marginRight: "3px", width: "70%" }} />
        </>
      ),
    },
  ];
  const candidatMotivationIcons = [
    { icon: "", motivation: "✘✘!" },
    { icon: "😟", motivation: "Disappointed" },
    { icon: "🙁", motivation: "Not Really" },
    { icon: "😊", motivation: "Like" },
    { icon: "🥰", motivation: "Great" },
    { icon: "😍", motivation: "Super Lovely" },
  ];

  function padTo2DigitsCH(num) {
    return num.toString().padStart(2, "0");
  }
  // console.log(props.data.jobStartDate.slice(0,4).includes("-"))

  function formatDateCha(date) {
    return [
      padTo2DigitsCH(date.getDate()),
      padTo2DigitsCH(date.getMonth() + 1),
      date.getFullYear(),
    ].join("/");
  }

  const datenow = moment().format("YYYY-MM-DD");

  let date = new Date(datenow);

  let start = new Date(props.data.jobStartDate);
  let end = new Date(props.data.jobEndDate);

  useEffect(() => {
    if (startStatus) {
      setStartDate(props.data.jobStartDate);
    } else {
      let data = formatDateCha(start);
      setStartDate(data.replaceAll("/", "-"));
    }
    if (endStatus) {
      setEndDate(props.data.jobEndDate);
    } else {
      let data = formatDateCha(end);
      setEndDate(data.replaceAll("/", "-"));
    }
  });

  return (
    <>
      <div className="card cardInPro p-0 HoveRESTClassCardA">
        <div className="d-flex cursor-pointer" onClick={viewFullProfile}>
          <div className="col-3 px-0 d-flex justify-content-center align-items-center">
            <img alt="..."
              src={
                props.data.clientPhoto
                  ? props.data.clientPhoto.url
                    ? props.data.clientPhoto.url
                    : require("../../images/ClientCardPhoto.svg").default
                  : require("../../images/ClientCardPhoto.svg").default
              }
              className={
                props.data.clientPhoto
                  ? props.data.clientPhoto.url
                    ? ""
                    : "card-img-top widthIMG"
                  : "card-img-top widthIMG"
              }
              style={
                props.data.clientPhoto
                  ? props.data.clientPhoto.url
                    ? {
                        width: "75px",
                        height: "75px",
                        padding: " 0px",
                        border: "2px solid #ff0000",
                        borderRadius: "100px",
                      }
                    : null
                  : null
              }
            
            />
          </div>
          <div className="col-5 px-0 mt-1">
            <p
              className="textClientCard"
              style={{ width: "150%" }}
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title={props.data.clientCompanyName.toLocaleUpperCase()}
            >
              <b>
                {props.data.clientCompanyName
                  ? props.data.clientCompanyName.length > 20
                    ? props.data.clientCompanyName
                        .toLocaleUpperCase()
                        .slice(0, 29) + "..."
                    : props.data.clientCompanyName.toLocaleUpperCase()
                  : "✘ No CompanyName!"}
              </b>
            </p>
            <div>
              {" "}
              <p
                className="textClientCard"
                style={{ height: "30px", background: "transparent" }}
              >
                Importance:
                <b
                  className="d-flex align-items-center"
                  style={{ width: "55%", marginLeft: "3px", height: "43px" }}
                >
                  {candidatImportanceIcons[props.data.clientImportance - 1]
                    ?.icon
                    ? candidatImportanceIcons[props.data.clientImportance - 1]
                        ?.icon
                    : "✘✘!"}
                </b>
              </p>
            </div>
            <div>
              {" "}
              <p className="textClientCard" style={{ width: "130%" }}>
                Motivation :
                <b style={{ background: "transparent", zIndex: "9" }}>
                  {candidatMotivationIcons[props.data.clientMotivation].icon +
                    " " +
                    candidatMotivationIcons[props.data.clientMotivation]
                      ?.motivation}
                </b>
              </p>
            </div>
            <div>
              <p className="textClientCard">
                Num of position :{" "}
                <b>
                  {" "}
                  {props.data.numberOfPosts
                    ? props.data.numberOfPosts
                    : "✘ No Posts!"}
                </b>{" "}
              </p>
            </div>
          </div>
          <div className="col-3 d-flex align-items-center">
            <button className="ArchiveLargebtn pb-1 p-0">
              <img alt="..." src={require("../../images/ArchivedBtn.svg").default} />
            </button>
          </div>
        </div>
        <div className="col-12 d-flex align-items-center colorARecruting my-1 ">
          <p
            className="A-Recruting mb-0 "
            style={{
              color: date >= start && date <= end ? "#E21B1B" : "#ca1313",
            }}
          >
            Recruiting :{" "}
            {date >= start && date < end
              ? "From " + " 📆" + startDate + "  To  " + " 📆" + EndDate
              : "⚠️ From  " + startDate + "  To  " + EndDate}{" "}
          </p>
        </div>
        <div className="col-12 ">
          <div className="row pl-1">
            <div className="col-5 fontStylingCardDetails px-0 py-1">
              <p className="fontStylingCardP">
                Secteur :{" "}
                {props.data.clientActivitySector
                  ? props.data.clientActivitySector.length > 14
                    ? props.data.clientActivitySector
                        .toLocaleUpperCase()
                        .slice(0, 14) + "..."
                    : props.data.clientActivitySector.toLocaleUpperCase()
                  : "No Sector!"}{" "}
              </p>
              <p
                className="fontStylingCardP"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title={
                  props.data.clientJob.length
                    ? props.data.clientJob
                    : "✘ No clientJob!"
                }
              >
                Job :{" "}
                {props.data.clientJob
                  ? props.data.clientJob.length > 20
                    ? props.data.clientJob.toLocaleUpperCase().slice(0, 15) +
                      "..."
                    : props.data.clientJob.toLocaleUpperCase()
                  : "No Job!"}
              </p>
              <p
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title={
                  props.data.clientLanguages.length
                    ? props.data.clientLanguages.join(", ")
                    : "✘ No Langues!"
                }
              >
                Langues :{" "}
                <b>
                  {" "}
                  {props.data.clientLanguages.length
                    ? props.data.clientLanguages.length > 2
                      ? props.data.clientLanguages.join(", ").slice(0, 18)
                      : props.data.clientLanguages.join(", ")
                    : "✘ No Langues!"}
                </b>{" "}
              </p>
              <p>
                Phone :
                <b>
                  {props.data.clientPhone.length
                    ? props.data.clientPhone
                    : "✘ No Phone Number!"}
                </b>{" "}
              </p>
              <p>
                Estimated CA :{" "}
                <b>
                  {props.data.jobTotalBudget
                    ? props.data.jobTotalBudget + " €"
                    : "N/A"}
                </b>{" "}
              </p>
            </div>
            <div className="col-7 pl-1 fontStylingCardDetails px-0 pt-1">
              <p>
                Salary by person :{" "}
                <b>
                  {" "}
                  {props.data.netSalary
                    ? props.data.netSalary + "€" ||
                      props.data.salary_hours.salaryPerHour + " €"
                    : "0€"}
                </b>{" "}
              </p>
              <p>
                Cl-Phone :{" "}
                <b>
                  {props.data.clientPhone.length
                    ? props.data.clientPhone
                    : "✘ No Client Number!"}
                </b>{" "}
              </p>
              <p>
                C-Name :{" "}
                <b>
                  {props.data.clientReferenceName
                    ? props.data.clientReferenceName
                    : "✘ No Name!"}
                </b>{" "}
              </p>
              <p>
                C-phone :{" "}
                <b>
                  {props.data.clientReferenceNumber.length
                    ? props.data.clientReferenceNumber
                    : "✘ No Contact Number!"}
                </b>{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <div className="colorARecruting p-1">
            <p className="AdsFont">
              Ads Spent on this client:{" "}
              {props.data.jobTotalBudget
                ? props.data.jobTotalBudget + "€"
                : "✘ No Ads!"}{" "}
            </p>
            <div className="AdsFont">
              Reason archived :
              <ReadMoreReact
                text={
                  props.data.clientArchived.reason
                    ? props.data.clientArchived.reason
                    : "✘ No Reason!"
                }
                min={0}
                ideal={50}
                max={120}
                readMoreText={"....."}
              />
            </div>
          </div>
          <div className="col-12 d-flex justify-content-end my-1">
            <div className="row ">
              <div className="col-6 text-center">
                <Select
                  options={CardOption}
                  className="CardOptions AllMoreOp"
                  onChange={MoreOption}
                  placeholder="More options"
                />
              </div>

              <div className="col-6 text-center">
                <button className="btn btn-card" onClick={viewFullProfile}>
                  See Full Profile
                </button>
              </div>
            </div>
          </div>
          {HideProfile ? (
            <CLintHide
              props={props.data}
              closeModal={setHideProfile}
              path={"/clientToDo"}
            />
          ) : null}
          {RESTprofile ? (
            <ClientREST
              props={props.data}
              closeModal={setREStProfile}
              path={"/clientToDo"}
            />
          ) : null}
          {showArchiveModal ? (
            <ArchivedClientModal
              props={props.data}
              closeModal={setShowArchiveModal}
              path={"/clientToDo"}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
export default ClientCardArchived;
