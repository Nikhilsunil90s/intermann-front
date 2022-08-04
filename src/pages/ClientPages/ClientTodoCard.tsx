import { Link } from "react-router-dom";
import "../../CSS/Client/ClientTodo.css";
import StarRatings from "react-star-ratings";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InProgressClientModal from "../../components/Modal/InProgressClientModal";
import ArchivedClientModal from "../../components/Modal/ArchivedClientModal";
import { ReactComponent as Empty } from "../../images/emptyStar.svg";
import { ReactComponent as StarRating } from "../../images/RatingStar.svg";
import Switch from "react-switch";
import Select from "react-select";
import { ReactComponent as TurnoFF } from "../../images/FatX.svg";
import { ReactComponent as TurnOn } from "../../images/base-switch_icon.svg";
import { API_BASE_URL } from "../../config/serverApiConfig";
import toast from "react-hot-toast";

let id = "";

const ClientToDoCard = (props: any) => {
  const navigate = useNavigate();

  const notificationSwitch=()=>toast.success("Modification sauvegardée")


  const [showInProgressModal, setShowInProgressModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [SISPI, setChecked] = useState(props.data.sispiDeclared);
  const [Agence, setAgence] = useState(props.data.agenceDeVoyage) as any;
  const [Assurance, setAssurance] = useState(props.data.assuranceFaite) as any;
  const [A1, setA1] = useState(props.data.A1selected) as any;
  const [Public, setPublic] = useState(props.data.publicityStarted) as any;
  const [Contrat, setContrat] = useState(props.data.contractSigned) as any;
  const [Signature, setSignature] = useState(props.data.signatureSent) as any;
  const [Offre, setOffre] = useState(props.data.offerSent) as any;
  const CardOption = [
    {
      value: "Edit Profile",
      label: "Edit Profile",
    },
    { value: "moveProgress", label: "moveProgress" },
    { value: "Archive", label: "Archive" },
  ] as any;
  console.log(Offre, "ofree");

  const SwitchChange = (checked: any, e: any, Name: any) => {
    id = e.data._id;
    if (Name === "offerSent") {
      if (checked === true) {
        setOffre(true);
        id = e.data._id;
        onChangeSwitches(id, Name, checked);
        notificationSwitch()
      }
      if (checked === false) {
        setOffre(false);
        onChangeSwitches(id, Name, checked);
        notificationSwitch()
      }
    }
    if (Name === "signatureSent") {
      if (checked === true) {
        setSignature(true);
        id = e.data._id;
        notificationSwitch()
        onChangeSwitches(id, Name, checked);
      }
      if (checked === false) {
        setSignature(false);
        onChangeSwitches(id, Name, checked);
        notificationSwitch()
      }
    }
    if (Name === "contractSigned") {
      if (checked === true) {
        setContrat(true);
        id = e.data._id;
        notificationSwitch()
        onChangeSwitches(id, Name, checked);
      }
      if (checked === false) {
        setContrat(false);
        onChangeSwitches(id, Name, checked);
        notificationSwitch()
      }
    }
    if (Name === "publicityStarted") {
      if (checked === true) {
        setPublic(true);
        id = e.data._id;
        notificationSwitch()
        onChangeSwitches(id, Name, checked);
      }
      if (checked === false) {
        setPublic(false);
        onChangeSwitches(id, Name, checked);
      }
    }
    if (Name === "A1selected") {
      if (checked === true) {
        setA1(true);
        id = e.data._id;
        notificationSwitch()

        onChangeSwitches(id, Name, checked);
      }
      if (checked === false) {
        setA1(false);
        onChangeSwitches(id, Name, checked);
        notificationSwitch()
      }
    }
    if (Name === "assuranceFaite") {
      if (checked === true) {
        setAssurance(true);
        id = e.data._id;
        notificationSwitch()
        onChangeSwitches(id, Name, checked);
      }
      if (checked === false) {
        setAssurance(false);
        onChangeSwitches(id, Name, checked);
        notificationSwitch()
      }
    }
    if (Name === "agenceDeVoyage") {
      if (checked === true) {
        setAgence(true);
        id = e.data._id;
        notificationSwitch()
        onChangeSwitches(id, Name, checked);
      }
      if (checked === false) {
        setAgence(false);
        onChangeSwitches(id, Name, checked);
      }
    }
    if (Name === "sispiDeclared") {
      if (checked === true) {
        setChecked(true);
        id = e.data._id;
        notificationSwitch()
        onChangeSwitches(id, Name, checked);
      }
      if (checked === false) {
        setChecked(false);
        onChangeSwitches(id, Name, checked);
        notificationSwitch()
      }
    }
  };

  const onChangeSwitches = async (id, AName, val) => {
    await fetch(
      `${API_BASE_URL}switchClientAttributes/?clientId=${id}&attribute=${AName}&value=${val}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((reD) => reD.json())
      .then((result) => result)
      .catch((err) => err);
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
    { icon: "No icon", motivation: "No Motivation" },
    { icon: "😟", motivation: "Disappointed" },
    { icon: "🙁", motivation: "Not Really" },
    { icon: "😊", motivation: "Like" },
    { icon: "🥰", motivation: "Great" },
    { icon: "😍", motivation: "Super Lovely" },
  ];
  const editClientProfile = () => {
    navigate("/clientToDoEdit", { state: props.data });
  };
  console.log(props.data);

  const viewFullProfile = () => {
    navigate("/clientToDoProfile", { state: props.data });
  };

  const MoreOption = (e: any) => {
    debugger;
    if (e.value == "Edit Profile") {
      editClientProfile();
    }
    if (e.value == "moveProgress") {
      setShowInProgressModal(true);
    }
    if (e.value == "Archive") {
      setShowArchiveModal(true);
    }
    console.log(e.value);
  };

  const [isSwitchOn, setIsSwitchOn] = useState(true) as any;
  console.log(props, "props");
  // useEffect(() => {
  //     console.log(props.data)
  // })

  return (
    <>
      <div className="card cardTODO pr-0">
        <div className="d-flex cursor-pointer" onClick={viewFullProfile}>
          <div className="col-3 px-0 d-flex justify-content-center">
            <img
              src={require("../../images/ClientCardPhoto.svg").default}
              className="cardTODO-img"
              alt="..."
            />
          </div>
          <div className="col-5 px-0 mt-1">
            <p className="textClientCard" style={{ width: "130%" }}>
              <b>
                {props.data.clientCompanyName
                  ? props.data.clientCompanyName.length > 20
                    ? props.data.clientCompanyName
                        .toLocaleUpperCase()
                        .slice(0, 29) + "..."
                    : props.data.clientCompanyName.toLocaleUpperCase()
                  : "No CompanyName!"}
              </b>
            </p>
            <p className="textClientCard" style={{ width: "130%" }}>
              Motivation :
              <b style={{ background: "transparent", zIndex: "9" }}>
                {candidatMotivationIcons[props.data.clientMotivation]?.icon +
                " " +
                candidatMotivationIcons[props.data.clientMotivation]?.motivation
                  ? candidatMotivationIcons[props.data.clientMotivation]?.icon +
                    " " +
                    candidatMotivationIcons[props.data.clientMotivation]
                      ?.motivation
                  : "No Motivation!"}
              </b>
            </p>
            <div>
              {" "}
              <p
                className="textClientCard"
                style={{
                  height: "30px",
                  background: "transparent",
                  width: "120%",
                }}
              >
                Importance :
                <b
                  className="d-flex"
                  style={{ width: "44%", marginLeft: "5px" }}
                >
                  {candidatImportanceIcons[props.data.clientImportance - 1]
                    ?.icon
                    ? candidatImportanceIcons[props.data.clientImportance - 1]
                        ?.icon
                    : "No Importance"}
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
                    : "No Posts!"}
                </b>{" "}
              </p>
            </div>
          </div>
          <div className="col-4 text-end d-flex align-items-start justify-content-end">
            <Link to="#">
              <button className="todoClient mt-2">
                <img src={require("../../images/briefcase.svg").default} />
              </button>
            </Link>
          </div>
        </div>
        <div className="col-12">
          <div className="row color-rowClientCard ">
            <p>
              Recruiting : From{" "}
              {props.data.jobStartDate != "" ? props.data.jobStartDate : "___"}{" "}
              To {props.data.jobEndDate != "" ? props.data.jobEndDate : "___"}{" "}
            </p>
          </div>
        </div>
        <div className="col-12">
          <div className="row pxbody">
            <div className="col-5 fontStylingCardDetails px-0 py-1">
              <p className="fontStylingCardP">
                Secteur :{" "}
                {props.data.clientActivitySector
                  ? props.data.clientActivitySector.length > 15
                    ? props.data.clientActivitySector
                        .toLocaleUpperCase()
                        .slice(0, 14) + "..."
                    : props.data.clientActivitySector.toLocaleUpperCase()
                  : "No Sector!"}{" "}
              </p>
              <p className="fontStylingCardP">
                Job :{" "}
                {props.data.clientJob
                  ? props.data.clientJob.length > 15
                    ? props.data.clientJob.toLocaleUpperCase().slice(0, 14) +
                      "..."
                    : props.data.clientJob.toLocaleUpperCase()
                  : "No Job!"}
              </p>
              <p>
                Langues :{" "}
                <b>
                  {" "}
                  {props.data.clientLanguages.length
                    ? props.data.clientLanguages
                    : "No Langues!"}
                </b>{" "}
              </p>
              <p>
                Phone :
                <b>
                  {props.data.clientPhone.length
                    ? props.data.clientPhone
                    : "No Phone Number!"}
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
            <div className="col-7 fontStylingCardDetails px-0 pt-1">
              <p>
                Salary by person :{" "}
                <b>
                  {props.data.netSalary || props.data.salary_hours ? props.data.netSalary + "€" || props.data.salary_hours.salaryPerHour * props.data.salary_hours.hours  + " €" : "N/A"}
                </b>{" "}
              </p>
              <p>
                E-Mail :{" "}
                <b>
                  {props.data.clientEmail
                    ? props.data.clientEmail.length > 20
                      ? props.data.clientEmail.slice(0, 19) + "..."
                      : props.data.clientEmail
                    : "No Email!"}
                </b>{" "}
              </p>
              <p>
                Client Phone :{" "}
                <b>
                  {props.data.clientPhone.length
                    ? props.data.clientPhone
                    : "No Client Number!"}
                </b>{" "}
              </p>
              <p>
                Contact Name :{" "}
                <b>
                  {props.data.clientReferenceName
                    ? props.data.clientReferenceName
                    : "No Name!"}
                </b>{" "}
              </p>
              <p>
                Contact phone :{" "}
                <b>
                  {props.data.clientReferenceNumber.length
                    ? props.data.clientReferenceNumber
                    : "No Contact Number!"}
                </b>{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="row color-rowClientCard p-1">
            <div className="col-4 px-0 d-flex  justify-content-start">
              <div className="d-flex align-items-center ">
              
                <p className="switch-fontCard mb-0">Offre envoyé ?</p>      
              
                
                <Switch
                  className="ml-left"
                  checked={Offre}
                  id="offerSent"
                  onChange={(checked, e, id) =>
                    SwitchChange(checked, props, id)
                  }
                  checkedHandleIcon={
                    <TurnOn
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-6px",
                      }}
                    />
                  }
                  height={19}
                  width={41}
                  uncheckedHandleIcon={
                    <TurnoFF
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-5px",
                      }}
                    />
                  }
                />
                </div>
              </div>
   
            <div className="col-5 px-0 d-flex  justify-content-center">
              <div className="d-flex align-items-center ">
                <p className="switch-fontCard mb-0">
                  Signature digitale envoyé ?
                </p>

                <Switch
                  checked={Signature}
                  id="signatureSent"
                  className="ml-left"
                  value={Signature}
                  onChange={(checked, e, id) =>
                    SwitchChange(checked, props, id)
                  }
                  checkedHandleIcon={
                    <TurnOn
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-6px",
                      }}
                    />
                  }
                  height={19}
                  width={41}
                  uncheckedHandleIcon={
                    <TurnoFF
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-5px",
                      }}
                    />
                  }
                />
              </div>
            </div>
            <div className="col-2 d-flex px-0 justify-content-center ml-1">
              <div className="d-flex align-items-center ">
                <p className="switch-fontCard mb-0">A1 ?</p>

                <Switch
                  className="ml-left "
                  onChange={(checked, e, id) =>
                    SwitchChange(checked, props, id)
                  }
                  checked={A1}
                  id="A1selected"
                  checkedHandleIcon={
                    <TurnOn
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-6px",
                      }}
                    />
                  }
                  height={19}
                  width={41}
                  uncheckedHandleIcon={
                    <TurnoFF
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-5px",
                      }}
                    />
                  }
                />
              </div>
            </div>

            <div className="col-5 d-flex pt-0 px-0 justify-content-center">
              <div className="d-flex align-items-center ">
                <p className="switch-fontCard mb-0">Assurance faite ?</p>
                <Switch
                  className="ml-left "
                  onChange={(checked, e, id) =>
                    SwitchChange(checked, props, id)
                  }
                  checked={Assurance}
                  id="assuranceFaite"
                  checkedHandleIcon={
                    <TurnOn
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-6px",
                      }}
                    />
                  }
                  height={19}
                  width={41}
                  uncheckedHandleIcon={
                    <TurnoFF
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-5px",
                      }}
                    />
                  }
                />
              </div>
            </div>
            <div className="col-7 d-flex px-0 justify-content-start">
              <div className="d-flex align-items-center ">
                <p className="switch-fontCard mb-0">Contrat singé ?</p>
                <Switch
                  className="ml-left "
                  // onChange={switchHandle}
                  checked={Contrat}
                  onChange={(checked, e, id) =>
                    SwitchChange(checked, props, id)
                  }
                  id="contractSigned"
                  checkedHandleIcon={
                    <TurnOn
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-6px",
                      }}
                    />
                  }
                  height={19}
                  width={41}
                  uncheckedHandleIcon={
                    <TurnoFF
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-5px",
                      }}
                    />
                  }
                />
              </div>
            </div>
            <div className="col-6 d-flex justify-content-start">
              <div className="d-flex align-items-center ">
                <p className="switch-fontCard mb-0">Agence de voyage ok ?</p>
                <Switch
                  className="ml-left "
                  // onChange={switchHandle}
                  checked={Agence}
                  onChange={(checked, e, id) =>
                    SwitchChange(checked, props, id)
                  }
                  id="agenceDeVoyage"
                  checkedHandleIcon={
                    <TurnOn
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-6px",
                      }}
                    />
                  }
                  height={19}
                  width={41}
                  uncheckedHandleIcon={
                    <TurnoFF
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-5px",
                      }}
                    />
                  }
                />
              </div>
            </div>
            <div className="col-6 d-flex px-0  justify-content-start">
              <div className="d-flex align-items-center ">
                <p className="switch-fontCard mb-0">Publicité commencé ?</p>
                <Switch
                  className="ml-left "
                  // onChange={switchHandle}
                  checked={Public}
                  onChange={(checked, e, id) =>
                    SwitchChange(checked, props, id)
                  }
                  id="publicityStarted"
                  checkedHandleIcon={
                    <TurnOn
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-6px",
                      }}
                    />
                  }
                  height={19}
                  width={41}
                  uncheckedHandleIcon={
                    <TurnoFF
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-5px",
                      }}
                    />
                  }
                />
              </div>
            </div>

            <div className="col-5 d-flex  ">
              <div className="d-flex align-items-center ">
                <p className="switch-fontCard mb-0">SISPI déclaré ?</p>
                <Switch
                  className="ml-left "
                  // onChange={switchHandle}
                  checked={SISPI}
                  onChange={(checked, e, id) =>
                    SwitchChange(checked, props, id)
                  }
                  // defaultChecked={props.}
                  id="sispiDeclared"
                  checkedHandleIcon={
                    <TurnOn
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-6px",
                      }}
                    />
                  }
                  height={19}
                  width={41}
                  uncheckedHandleIcon={
                    <TurnoFF
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-5px",
                      }}
                    />
                  }
                />
           </div>
            </div>
          </div>
        </div>
        <div className=" col-12 d-flex justify-content-end my-1">
          <div className="row">
            <div className="col-6 text-center">
              <Select
                options={CardOption}
                className="CardOptions AllMoreOp"
                onChange={MoreOption}
                placeholder="More options"
              />
            </div>

            <div className="col-6 px-0 text-center">
              <button
                className="btn btn-SEEFULLprofile"
                onClick={viewFullProfile}
              >
                See Full Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      {showInProgressModal ? (
        <InProgressClientModal
          props={props.data}
          closeModal={setShowInProgressModal}
        />
      ) : null}

      {showArchiveModal ? (
        <ArchivedClientModal
          props={props.data}
          closeModal={setShowArchiveModal}
          path={"/clientToDo"}
        />
      ) : null}
    </>
  );
};

export default ClientToDoCard;
