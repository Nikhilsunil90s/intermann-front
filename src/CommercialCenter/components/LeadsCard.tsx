import React, { useEffect, useState } from "react";
import { ColourOption } from "../../Selecteddata/data";
import chroma from "chroma-js";
import Select, { StylesConfig } from "react-select";
import { API_BASE_URL } from "../../config/serverApiConfig";
import moment from "moment";
import EditModal from "./Modal/EditModal";
import ViewModal from "./Modal/ViewModalLeads";
import toast, { Toaster } from "react-hot-toast";
import DeleteLeadModal from "./Modal/DeleteLeadsModal";

function LeadCard(props) {
  const colourStyles: StylesConfig<ColourOption, true> = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ":hover": {
        backgroundColor: data.color,
        color: "white",
      },
    }),
  };

  const [premier, setpremier] = useState([
    //   {
    //   value: "Patrick R",
    //   label:<>  <p className="mb-0">
    //   <input type="radio" className="inputLeadsClient" id="test1" name={`premier${props.length}`}  />
    //   <label htmlFor="test1 mb-0">Patrick R</label>
    // </p></>,
    //   name:`premier${props.length}`,
    //   color: "#FF8B00",
    // },
    // {
    //   value: "Jeremy R",
    //   label: <>  <p className="mb-0">
    //   <input type="radio" className="inputLeadsClient" id="test1" name={`premier${props.length}`}   />
    //   <label htmlFor="test1 mb-0">Jeremy R</label>
    // </p></>,
    //   name: `premier${props.length}`,
    //   color: "#FF8B00",
    // },
    // {
    //   value: "Morgan R",
    //   label: <>  <p className="mb-0">
    //   <input type="radio" className="inputLeadsClient" id="test1" name={`premier${props.length}`}   />
    //   <label htmlFor="test1 mb-0">Morgan R</label>
    // </p></>,
    //   name: `premier${props.length}`,
    //   color: "#FF8B00",
    // },
    // {
    //   value: "Patrick B",
    //   label:<>  <p className="mb-0">
    //   <input type="radio" className="inputLeadsClient" id="test1" name={`premier${props.length}`}   />
    //   <label htmlFor="test1 mb-0">Patrick B</label>
    // </p></> ,
    //   name: `premier${props.length}`,
    //   color: "#FF8B00",
    // },
    // {
    //   value: "Personne",
    //   label: <>  <p className="mb-0">
    //   <input type="radio" className="inputLeadsClient" id="test1" name={`premier${props.length}`}   />
    //   <label htmlFor="test1 mb-0">Personne</label>
    // </p></>,
    //   name: `premier${props.length}`,
    //   color: "#FF8B00",
    // },
  ]) as any;

  const [deuxième, setDeuxieme] = useState([
    //   {
    //   value: "Patrick R",
    //   label:<>  <p className="mb-0">
    //   <input type="radio" className="inputLeadsClient" id="test1" name={`deuxième${props.length}`}  />
    //   <label htmlFor="test1 mb-0">Patrick R</label>
    // </p></>,
    //   name: `deuxième${props.length}`,
    //   color: "#FF8B00",
    // },
    // {
    //   value: "Jeremy R",
    //   label: <>  <p className="mb-0">
    //   <input type="radio" className="inputLeadsClient" id="test1" name={`deuxième${props.length}`}  />
    //   <label htmlFor="test1 mb-0">Jeremy R</label>
    // </p></>,
    //   name: `deuxième${props.length}`,
    //   color: "#FF8B00",
    // },
    // {
    //   value: "Morgan R",
    //   label: <>  <p className="mb-0">
    //   <input type="radio" className="inputLeadsClient" id="test1" name={`deuxième${props.length}`}  />
    //   <label htmlFor="test1 mb-0">Morgan R</label>
    // </p></>,
    //   name: `deuxième${props.length}`,
    //   color: "#FF8B00",
    // },
    // {
    //   value: "Patrick B",
    //   label:<>  <p className="mb-0">
    //   <input type="radio" className="inputLeadsClient" id="test1" name={`deuxième${props.length}`}  />
    //   <label htmlFor="test1 mb-0">Patrick B</label>
    // </p></> ,
    //   name: `deuxième${props.length}`,
    //   color: "#FF8B00",
    // },
    // {
    //   value: "Personne",
    //   label: <>  <p className="mb-0">
    //   <input type="radio" className="inputLeadsClient" id="test1" name={`deuxième${props.length}`}  />
    //   <label htmlFor="test1 mb-0">Personne</label>
    // </p></>,
    //   name:  `deuxième${props.length}`,
    //   color: "#FF8B00",
    // },
  ]) as any;

  const [appelé, setAppele] = useState([
    //    {
    //   value: "Patrick R",
    //   label:<>  <p className="mb-0">
    //   <input type="radio" className="inputLeadsClient" id="test1" name="radio-group"  />
    //   <label htmlFor="test1 mb-0">Patrick R</label>
    // </p></>,
    //   name:  `appelé${props.length}`,
    //   color: "#FF8B00",
    // },
    // {
    //   value: "Jeremy R",
    //   label: <>  <p className="mb-0">
    //   <input type="radio" className="inputLeadsClient" id="test1" name="radio-group"  />
    //   <label htmlFor="test1 mb-0">Jeremy R</label>
    // </p></>,
    //   name:  `appelé${props.length}`,
    //   color: "#FF8B00",
    // },
    // {
    //   value: "Morgan R",
    //   label: <>  <p className="mb-0">
    //   <input type="radio" className="inputLeadsClient" id="test1" name="radio-group"  />
    //   <label htmlFor="test1 mb-0">Morgan R</label>
    // </p></>,
    //   name:  `appelé${props.length}`,
    //   color: "#FF8B00",
    // },
    // {
    //   value: "Patrick B",
    //   label:<>  <p className="mb-0">
    //   <input type="radio" className="inputLeadsClient" id="test1" name="radio-group"  />
    //   <label htmlFor="test1 mb-0">Patrick B</label>
    // </p></> ,
    //   name:  `appelé${props.length}`,
    //   color: "#FF8B00",
    // },
    // {
    //   value: "Personne",
    //   label: <>  <p className="mb-0">
    //   <input type="radio" className="inputLeadsClient" id="test1" name="radio-group"  />
    //   <label htmlFor="test1 mb-0">Personne</label>
    // </p></>,
    //   name: `appelé${props.length}`,
    //   color: "#FF8B00",
    // },
  ]) as any;

  const [responsable, setResponsable] = useState([
    //   {
    //   value: "Patrick R",
    //   label:<>  <p className="mb-0">
    //   <input type="radio" className="inputLeadsClient" id="test1" name="radio-group"  />
    //   <label htmlFor="test1 mb-0">Patrick R</label>
    // </p></>,
    //   name: `responsable${props.length}`,
    //   color: "#FF8B00",
    // },
    // {
    //   value: "Jeremy R",
    //   label: <>  <p className="mb-0">
    //   <input type="radio" className="inputLeadsClient" id="test1" name="radio-group"  />
    //   <label htmlFor="test1 mb-0">Jeremy R</label>
    // </p></>,
    //   name: `responsable${props.length}`,
    //   color: "#FF8B00",
    // },
    // {
    //   value: "Morgan R" ,
    //   label: <>  <p className="mb-0">
    //   <input type="radio" className="inputLeadsClient" id="test1" name="radio-group"  />
    //   <label htmlFor="test1 mb-0">Morgan R</label>
    // </p></>,
    //   name: `responsable${props.length}`,
    //   color: "#FF8B00",
    // },
    // {
    //   value: "Patrick B",
    //   label:<>  <p className="mb-0">
    //   <input type="radio" className="inputLeadsClient" id="test1" name="radio-group"  />
    //   <label htmlFor="test1 mb-0">Patrick B</label>
    // </p></> ,
    //   name: `responsable${props.length}`,
    //   color: "#FF8B00",
    // },
    // {
    //   value: "Personne",
    //   label: <>  <p className="mb-0">
    //   <input type="radio" className="inputLeadsClient" id="test1" name="radio-group"  />
    //   <label htmlFor="test1 mb-0">Personne</label>
    // </p></>,
    //   name: `responsable${props.length}`,
    //   color: "#FF8B00",
    // },
  ]) as any;

  const [userS, setUserS] = useState([]);

  const fetchUsers = async () => {
    //  setLeadScHeck(false)

    return await fetch(API_BASE_URL + `allusers`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((red) => red.json())
      .then((resData) => resData)
      .catch((err) => err);
  };

  useEffect(() => {
    if (responsable.length == 0) {
      let resp = [];
      let premier = [];
      let deuxième = [];
      let appelé = [];
      userS.map((el) => {
        resp.push({
          value: el._id,
          name: `responsable${props.length}`,
          label: (
            <>
              {" "}
              <p className="mb-0">
            
                <label htmlFor="test1 mb-0">
                  {el.username.toLocaleUpperCase()}
                </label>
              </p>
            </>
          ),
          color: "#FF8B00",
        });
        premier.push({
          value: el._id,
          name: `premier${props.length}`,
          label: (
            <>
              {" "}
              <p className="mb-0">
             
                <label htmlFor="test1 mb-0">
                  {el.username.toLocaleUpperCase()}
                </label>
              </p>
            </>
          ),
          color: "#FF8B00",
        });
        deuxième.push({
          value: el._id,
          name: `deuxième${props.length}`,
          label: (
            <>
              {" "}
              <p className="mb-0">
             
                <label htmlFor="test1 mb-0">
                  {el.username.toLocaleUpperCase()}
                </label>
              </p>
            </>
          ),
          color: "#FF8B00",
        });
        appelé.push({
          value: el._id,
          name: `appelé${props.length}`,
          label: (
            <>
              {" "}
              <p className="mb-0">
              
                <label htmlFor="test1 mb-0">
                  {el.username.toLocaleUpperCase()}
                </label>
              </p>
            </>
          ),
          color: "#FF8B00",
        });
      });
      setDeuxieme([...deuxième]);
      setAppele([...appelé]);
      setResponsable([...resp]);
      setpremier([...premier]);
    }
  }, [responsable]);

  const [status, setStatus] = useState() as any;

  function padTo2DigitsCH(num) {
    return num.toString().padStart(2, "0");
  }

  useEffect(() => {
    if (userS.length === 0) {
      fetchUsers().then((resData) => {
        {
          if (resData.status) {
            if (resData.data.length > 0) {
              setUserS([...resData.data]);
              console.log(resData.data);
            }
          } else {
            setUserS([]);
          }
        }
      });
    }
    setStatus([
      {
        value: "Non determine",
        label: (
          <>
            {" "}
            <p className="mb-0">
              <input
                type="radio"
                className="inputLeadsClient"
                id="test1"
                name="radio-group"
                defaultChecked={
                  props.props.clientStatus == "Non determine" ? true : false
                }
              />
              <label htmlFor="test1 mb-0">Non déterminé</label>
            </p>
          </>
        ),
        name: "status",
        color: "#FF8B00",
      },
      {
        value: "Le client negocie",
        label: (
          <>
            {" "}
            <p className="mb-0">
              <input
                type="radio"
                className="inputLeadsClient"
                id="test1"
                name="radio-group"
                defaultChecked={
                  props.props.clientStatus == "Le client negocie" ? true : false
                }
              />
              <label htmlFor="test1 mb-0">Le client négocie</label>
            </p>
          </>
        ),
        name: "status",
        color: "#FF8B00",
      },
      {
        value: "Offre Accepte",
        label: (
          <>
            {" "}
            <p className="mb-0">
              <input
                type="radio"
                className="inputLeadsClient"
                id="test1"
                name="radio-group"
                defaultChecked={
                  props.props.clientStatus == "Offre Accepte" ? true : false
                }
              />
              <label htmlFor="test1 mb-0">Offre Accepté</label>
            </p>
          </>
        ),
        name: "status",
        color: "#FF8B00",
      },
      {
        value: "Le client reflechit",
        label: (
          <>
            {" "}
            <p className="mb-0">
              <input
                type="radio"
                className="inputLeadsClient"
                id="test1"
                name="radio-group"
                defaultChecked={
                  props.props.clientStatus == "Le client reflechit"
                    ? true
                    : false
                }
              />
              <label htmlFor="test1 mb-0">Le client réfléchit</label>
            </p>
          </>
        ),
        name: "status",
        color: "#FF8B00",
      },
      {
        value: "Le client ne reponds pas",
        label: (
          <>
            {" "}
            <p className="mb-0">
              <input
                type="radio"
                className="inputLeadsClient"
                id="test1"
                name="radio-group"
                defaultChecked={
                  props.props.clientStatus == "Le client ne reponds pas"
                    ? true
                    : false
                }
              />
              <label htmlFor="test1 mb-0">Le client ne réponds pas</label>
            </p>
          </>
        ),
        name: "status",
        color: "#FF8B00",
      },
      {
        value: "Pas interese",
        label: (
          <>
            {" "}
            <p className="mb-0">
              <input
                type="radio"
                className="inputLeadsClient"
                id="test1"
                name="radio-group"
                defaultChecked={
                  props.props.clientStatus == "Pas interese" ? true : false
                }
              />
              <label htmlFor="test1 mb-0">Pas intéréssé</label>
            </p>
          </>
        ),
        name: "status",
        color: "#FF8B00",
      },
    ]);
  }, [props.props]);

  const [statusModal, setStatusModal] = useState("");
  const [Modal, setModal] = useState(false);
  const [ModalView, setModalView] = useState(false);
  const [DeleteModal, setDeleteModal] = useState(false);

  const switchCheck = async (Currentswitch, id, status) => {
    await fetch(
      Currentswitch == "Offre"
        ? API_BASE_URL + `changeOfferStatus/?id=${id}&status=${status}`
        : Currentswitch == "rappel"
        ? API_BASE_URL + `changeRappelerStatus/?id=${id}&status=${status}`
        : API_BASE_URL + `changeInterestedStatus/?id=${id}&status=${status}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.status) {
          toast.success(res.message);
          props.update(true);
        } else {
          toast.success(res.message);
        }
      })
      .catch((err) => err);
  };

  const onSelectChange = async (path, data) => {
    await fetch(API_BASE_URL + path, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status) {
          toast.success(res.message);
          props.update(true);
        } else {
          toast.success(res.message);
        }
      })
      .catch((err) => err);
  };

  const onReactSelect = async (e) => {
    let UserData = {
      leadId: props.props._id,
      userId: e.value,
    };
    if (e.name === `premier${props.length}`) {
      onSelectChange("changeContactedFirstTimeBy", UserData);
    }
    if (e.name === "status") {
      let data = {
        id: props.props._id,
        status: e.value,
      };
      onSelectChange("changeClientStatus", data);
    }
    if (e.name === `responsable${props.length}`) {
      onSelectChange("changeCompanyResponsable", UserData);
    }
    if (e.name === `deuxième${props.length}`) {
      onSelectChange("changeContactedSecondTimeBy", UserData);
    }
    if (e.name === `appelé${props.length}`) {
      onSelectChange("changeContactedAfterOfferSentBy", UserData);
    }
  };

  const formatDateCha = (date) => {
    return [
      padTo2DigitsCH(date.getDate()),
      padTo2DigitsCH(date.getMonth() + 1),
      date.getFullYear(),
    ].join("/");
  };

  const CurrentModal = (name: any) => {
    if (name === "Name") {
      setStatusModal(name);
      setModal(true);
    }
    if (name === "Num1") {
      setStatusModal(name);
      setModal(true);
    }
    if (name === "Num2") {
      setStatusModal(name);
      setModal(true);
    }
    if (name === "email") {
      setStatusModal(name);
      setModal(true);
    }
    if (name === "CNote") {
      setStatusModal(name);
      setModal(true);
    }
    if (name === "ANote") {
      setStatusModal(name);
      setModal(true);
    }
  };

  let date = new Date(props.props.createdAt);

  return (
    <>
      <Toaster
        containerStyle={{ zIndex: "999999999999999999999999999999" }}
        position={"top-right"}
      />
      <div
        className="row leadClientCard my-1"
        style={{ width: "102%" }}
        key={props.props._id}
      >
        <div className="col-12 ">
          <div className="row">
            <div className="col-7 d-flex align-items-center">
              <p className="mb-0 d-flex align-items-center">
                <img
                  src={require("../../images/calendar.png")}
                  style={{ width: "12px", marginRight: "4px" }}
                />
                Lead Created on {formatDateCha(date)}
              </p>
            </div>
            <div
              className="col-5 d-flex justify-content-end align-items-center"
              style={{ height: "50px" }}
            >
              <button
                className="deleteAd mx-1"
                onClick={() => setDeleteModal(true)}
              >
                <img src={require("../../images/Deletebucket.svg").default} />
              </button>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="row">
            <div className="col-3 d-grid px-0">
              <div className="colorBoxLead d-flex justify-content-start align-items-center">
                <p className="mb-0">Société</p>
              </div>
              <div className="BoxHeight">
                <span>
                  <div className="col-9 d-flex align-items-center">
                    {" "}
                    {props.props.companyName ? props.props.companyName : "✘✘!"}
                  </div>
                  <div
                    className="col-4 d-flex align-items-center justify-content-center cursor-pointer"
                    onClick={() => CurrentModal("Name")}
                  >
                    <img src={require("../../images/pen.svg").default} />
                  </div>
                </span>
              </div>
            </div>
            <div className="col-3  d-grid px-0">
              <div className="grayboxLeads d-flex justify-content-start align-items-center">
                <p className="mb-0">Téléphone(s)</p>
              </div>
              <div className="BoxHeight">
                <span>
                  <div className="col-9 d-flex align-items-center">
                    {" "}
                    {props.props.phoneNumber1
                      ? props.props.phoneNumber1
                      : "✘✘!"}
                  </div>
                  <div
                    className="col-4 d-flex align-items-center justify-content-center cursor-pointer"
                    onClick={() => CurrentModal("Num1")}
                  >
                    <img src={require("../../images/pen.svg").default} />
                  </div>
                </span>
              </div>
              <div className="BoxHeight ">
                <span>
                  <div className="col-9 d-flex align-items-center">
                    {" "}
                    {props.props.phoneNumber2
                      ? props.props.phoneNumber2
                      : "✘✘!"}
                  </div>
                  <div
                    className="col-4 d-flex align-items-center justify-content-center cursor-pointer"
                    onClick={() => CurrentModal("Num2")}
                  >
                    <img src={require("../../images/pen.svg").default} />
                  </div>
                </span>
              </div>
            </div>
            <div className="col-3  d-grid px-0">
              <div className="grayboxLeads d-flex justify-content-start align-items-center">
                <p className="mb-0">Email Address</p>
              </div>
              <div className="BoxHeight">
                <span>
                  <div className="col-9 d-flex align-items-center">
                    {" "}
                    {props.props.email ? props.props.email : "✘✘!"}
                  </div>
                  <div
                    className="col-4 d-flex align-items-center justify-content-center cursor-pointer"
                    onClick={() => CurrentModal("email")}
                  >
                    <img src={require("../../images/pen.svg").default} />
                  </div>
                </span>
              </div>
            </div>
            <div className="col-3  d-grid px-0">
              <div
                className="grayboxLeads d-flex justify-content-start align-items-center"
                style={{ borderTopRightRadius: "10px" }}
              >
                <p className="mb-0">Note Client</p>
              </div>
              <div className="BoxHeight">
                <span style={{ height: "70px" }}>
                  <div className="col-9 d-flex align-items-center">
                    {" "}
                    {props.props.companyNote.length > 40
                      ? props.props.companyNote.slice(0, 40) + "..."
                      : props.props.companyNote
                      ? props.props.companyNote
                      : "✘✘!"}
                  </div>
                  <div className="col-4 d-grid align-items-center justify-content-center">
                    <div className="cursor-pointer">
                      <img
                        src={require("../../images/pen.svg").default}
                        onClick={() => CurrentModal("CNote")}
                      />
                    </div>
                    <div className="cursor-pointer">
                      <img
                        src={require("../../images/expand.svg").default}
                        onClick={() => {
                          setStatusModal("Note Client");
                          setModalView(true);
                        }}
                      />
                    </div>
                  </div>
                </span>
              </div>
            </div>

            <div className="col-3 d-grid px-0">
              <div className="grayboxLeads d-flex justify-content-start align-items-center">
                <p className="mb-0">Nos notes Internes</p>
              </div>
              <div className="BoxHeight">
                <span style={{ height: "70px" }}>
                  <div className="col-9 d-flex align-items-center">
                    {" "}
                    {props.props.agencyNote.length > 40
                      ? props.props.agencyNote.slice(0, 40) + "..."
                      : props.props.agencyNote
                      ? props.props.agencyNote
                      : "✘✘!"}
                  </div>
                  <div className="col-4 d-grid align-items-center justify-content-center">
                    <div
                      className="cursor-pointer"
                      onClick={() => CurrentModal("ANote")}
                    >
                      <img src={require("../../images/pen.svg").default} />
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        setStatusModal("Nos notes Internes");
                        setModalView(true);
                      }}
                    >
                      <img src={require("../../images/expand.svg").default} />
                    </div>
                  </div>
                </span>
              </div>
            </div>
            <div className="col-3 d-grid px-0">
              <div className="grayboxLeads d-flex justify-content-start align-items-center">
                <p className="mb-0 ">Offre envoyé?</p>
              </div>
              <div className="BoxHeight align-items-center justify-content-center">
                <div className="check-box d-flex align-items-center ">
                  <input
                    type="checkbox"
                    defaultChecked={props.props.offerSent}
                    id={`offer${props.length}`}
                    onChange={(e) =>
                      switchCheck("Offre", props.props._id, e.target.checked)
                    }
                  />
                  <label
                    className="ToggleLabel mb-0 cursor-pointer"
                    htmlFor={`offer${props.length}`}
                  >
                    {props.props.offerSent == false ? "Non" : "Oui"}
                  </label>
                </div>
              </div>
            </div>
            <div className="col-3 d-grid px-0">
              <div className="grayboxLeads d-flex justify-content-start align-items-center">
                <p className="mb-0">A rappeler?</p>
              </div>
              <div className="BoxHeight align-items-center justify-content-center">
                <div className="check-box d-flex align-items-center ">
                  <input
                    type="checkbox"
                    id={`rappeler${props.length}`}
                    onChange={(e) =>
                      switchCheck("rappel", props.props._id, e.target.checked)
                    }
                    defaultChecked={props.props.rappeler}
                  />
                  <label
                    className="ToggleLabel mb-0 cursor-pointer"
                    htmlFor={`rappeler${props.length}`}
                  >
                    {props.props.rappeler == false ? "Non" : "Oui"}
                  </label>
                </div>
              </div>
            </div>
            <div className="col-3 d-grid px-0">
              <div className="grayboxLeads d-flex justify-content-start align-items-center">
                <p className="mb-0">Client Intéréssé?</p>
              </div>
              <div className="BoxHeight align-items-center justify-content-center">
                <div className="check-box d-flex align-items-center ">
                  <input
                    type="checkbox"
                    id={`Intéréssé${props.length}`}
                    onChange={(e) =>
                      switchCheck("", props.props._id, e.target.checked)
                    }
                    defaultChecked={props.props.companyInterested}
                  />
                  <label
                    className="ToggleLabel mb-0 cursor-pointer"
                    htmlFor={`Intéréssé${props.length}`}
                  >
                    {props.props.companyInterested == false ? "Non" : "Oui"}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 mt-1">
          <div className="row">
            <div className="col-10 ">
              <div className="row ">
                <div className="col-3 px-0 d-grid">
                  <div
                    className="grayboxLeads d-flex"
                    style={{ width: "100%", height: "50px" }}
                  >
                    <p className="mb-0 align-items-center  d-flex">
                      Qui a appelé le client en premier ? (premier contact)
                    </p>
                  </div>
                  <div className="p-1">
                    <Select
                      name="premier"
                      controlShouldRenderValue={true}
                      closeMenuOnSelect={true}
                      placeholder="‎  ‎ ‎  ‎"
                      className="basic-multi-select placeHolderLead clientLeads"
                      classNamePrefix="select"
                      inputId={props.length}
                      onChange={onReactSelect}
                      defaultValue={{
                        value: props.props.contactedFirstTimeBy?.username,
                        label: (
                          <>
                            {" "}
                            <p className="mb-0">
                              <input
                                type="radio"
                                className="inputLeadsClient"
                                id="test1"
                                name={`premier${props.length}`}
                                checked
                              />
                              <label htmlFor="test1 mb-0">
                                {props.props.contactedFirstTimeBy?.username
                                  ? props.props.contactedFirstTimeBy?.username
                                  : "Personne"}
                              </label>
                            </p>
                          </>
                        ) as any,

                        color: "#FF8B00",
                      }}
                      options={premier}
                      styles={colourStyles}
                    />
                  </div>
                </div>
                <div className="col-3 px-0 d-grid">
                  <div
                    className="grayboxLeads d-flex"
                    style={{ width: "100%", height: "50px" }}
                  >
                    <p className="mb-0 align-items-center  d-flex">
                      Qui a appelé une deuxième fois le client ?
                    </p>
                  </div>
                  <div className="p-1">
                    <Select
                      name="market"
                      placeholder="‎  ‎ ‎  ‎ "
                      className="basic-multi-select placeHolderLead clientLeads"
                      classNamePrefix="select"
                      //   defaultMenuIsOpen={true}
                      onChange={onReactSelect}
                      options={deuxième}
                      styles={colourStyles}
                      inputId={props.length}
                      defaultValue={{
                        value: props.props.contactedSecondTimeBy?._id,
                        label: (
                          <>
                            {" "}
                            <p className="mb-0">
                              <input
                                type="radio"
                                className="inputLeadsClient"
                                id="test1"
                                name={`deux${props.length}`}
                                checked
                              />
                              <label htmlFor="test1 mb-0">
                                {props.props.contactedSecondTimeBy?.username
                                  ? props.props.contactedSecondTimeBy?.username
                                  : "Personne"}
                              </label>
                            </p>
                          </>
                        ) as any,

                        color: "#FF8B00",
                      }}
                    />
                  </div>
                </div>
                <div className="col-3 px-0 d-grid">
                  <div
                    className="grayboxLeads d-flex"
                    style={{ width: "100%", height: "50px" }}
                  >
                    <p className="mb-0 align-items-center  d-flex">
                      Le client a t’il été appelé après envoi de l’offre ? Par
                      Qui ?
                    </p>
                  </div>
                  <div className="p-1">
                    <Select
                      name="market"
                      closeMenuOnSelect={true}
                      placeholder="‎  ‎ ‎  ‎ "
                      className="basic-multi-select placeHolderLead clientLeads"
                      classNamePrefix="select"
                      inputId={props.length}
                      //   onChange={FilterChange}
                      onChange={onReactSelect}
                      options={appelé}
                      styles={colourStyles}

                      
                      defaultValue={{
                        value: props.props.contactedAfterOfferSentBy?.username ? props.props.contactedAfterOfferSentBy?.username : "Personne",
                        label: (
                          <>
                            {" "}
                            <p className="mb-0">
                              <input
                                type="radio"
                                className="inputLeadsClient"
                                id="test1"
                                name={`appelé${props.length}`}
                                checked
                              />
                              <label htmlFor="test1 mb-0">{props.props.contactedAfterOfferSentBy?.username ? props.props.contactedAfterOfferSentBy?.username : "Personne"}</label>
                            </p>
                          </>
                        ) as any,

                        color: "#FF8B00",
                      }}
                    />
                  </div>
                </div>
                <div className="col-3 px-0 d-grid">
                  <div
                    className="grayboxLeads d-flex"
                    style={{ width: "100%", height: "50px" }}
                  >
                    <p className="mb-0 align-items-center  d-flex">
                      Qui est le responsable actuel de ce client ?{" "}
                    </p>
                  </div>
                  <div className="p-1">
                    <Select
                      name="market"
                      closeMenuOnSelect={true}
                      placeholder="‎  ‎ ‎  ‎ "
                      className="basic-multi-select placeHolderLead clientLeads"
                      classNamePrefix="select"
                      //   onChange={FilterChange}
                      onChange={onReactSelect}
                      options={responsable}
                      inputId={props.length}
                      styles={colourStyles}
                      defaultValue={{
                        value:props.props.companyResponsable?.username ? props.props.companyResponsable?.username : "Personne",
                        label: (
                          <>
                            {" "}
                            <p className="mb-0">
                              <input
                                type="radio"
                                className="inputLeadsClient"
                                id="test1"
                                name={`responsable${props.length}`}
                                checked
                              />
                              <label htmlFor="test1 mb-0">{props.props.companyResponsable?.username ? props.props.companyResponsable?.username : "Personne"}</label>
                            </p>
                          </>
                        ) as any,

                        color: "#FF8B00",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-2 px-0 d-grid">
              <div
                className="grayboxLeads d-flex"
                style={{ width: "100%", height: "50px" }}
              >
                <p className="mb-0 align-items-center  d-flex">Status Client</p>
              </div>
              <div className="p-1">
                <Select
                  name="market"
                  closeMenuOnSelect={true}
                  placeholder="‎  ‎ ‎  ‎ "
                  className="basic-multi-select placeHolderLead clientLeads"
                  classNamePrefix="select"
                  inputId={props.length}
                  onChange={onReactSelect}
                  options={status}
                  styles={colourStyles}
                  value={{
                    value: props.props.clientStatus,
                    label: (
                      <>
                        {" "}
                        <p className="mb-0">
                          <input
                            type="radio"
                            className="inputLeadsClient"
                            id="test1"
                            name={`status${props.length}`}
                            defaultChecked={true}
                          />
                          <label htmlFor="test1 mb-0">
                            {props.props.clientStatus}
                          </label>
                        </p>
                      </>
                    ) as any,

                    color: "#FF8B00",
                  }}
                />
              </div>
              {Modal ? (
                <EditModal
                  props={props.props}
                  Status={statusModal}
                  closeModal={setModal}
                  update={props.update}
                />
              ) : null}
              {ModalView ? (
                <ViewModal
                  props={props.props}
                  Notes={statusModal}
                  closeModal={setModalView}
                />
              ) : null}
              {DeleteModal ? (
                <DeleteLeadModal
                  props={props.props}
                  closeModal={setDeleteModal}
                  update={props.update}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default LeadCard;
