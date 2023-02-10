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
import Filter from "./Filter";
import OfferModal from "./Modal/OfferModal";

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

  const [premier, setpremier] = useState([]) as any;

  const [deuxième, setDeuxieme] = useState([]) as any;

  const [appelé, setAppele] = useState([]) as any;

  const [responsable, setResponsable] = useState([]) as any;

  const [status, setStatus] = useState() as any;

  const [GenOffer, setGenOffer] = useState(false);

  function padTo2DigitsCH(num) {
    return num.toString().padStart(2, "0");
  }

  useEffect(() => {
    setResponsable([
      {
        value: "BENJAMIN B",
        label: (
          <>
            <p className="mb-0">
              <input
                type="radio"
                className="inputLeadsClient"
                id="test1"
                name="radio-group"
                defaultChecked={
                  props.props.companyResponsable == "BENJAMIN B" ? true : false
                }
              />
              <label htmlFor="test1 mb-0">BENJAMIN B</label>
            </p>
          </>
        ),
        name: `responsable${props.length}`,
        color: "#FF8B00",
      },
      {
        value: "JEREMY R",
        label: (
          <>
            <p className="mb-0">
              <input
                type="radio"
                className="inputLeadsClient"
                id="test1"
                name="radio-group"
                defaultChecked={
                  props.props.companyResponsable == "JEREMY R" ? true : false
                }
              />
              <label htmlFor="test1 mb-0">JEREMY R</label>
            </p>
          </>
        ),
        name: `responsable${props.length}`,
        color: "#FF8B00",
      },
      {
        value: "PATRICK R",
        label: (
          <>
            <p className="mb-0">
              <input
                type="radio"
                className="inputLeadsClient"
                id="test1"
                name="radio-group"
                defaultChecked={
                  props.props.companyResponsable == "PATRICK R" ? true : false
                }
              />
              <label htmlFor="test1 mb-0">PATRICK R</label>
            </p>
          </>
        ),
        name: `responsable${props.length}`,
        color: "#FF8B00",
      },
      {
        value: "ADRIAN T",
        label: (
          <>
            <p className="mb-0">
              <input
                type="radio"
                className="inputLeadsClient"
                id="test1"
                name="radio-group"
                defaultChecked={
                  props.props.companyResponsable == "ADRIAN T" ? true : false
                }
              />
              <label htmlFor="test1 mb-0">ADRIAN T</label>
            </p>
          </>
        ),
        name: `responsable${props.length}`,
        color: "#FF8B00",
      },
      {
        value: "MORGAN R",
        label: (
          <>
            <p className="mb-0">
              <input
                type="radio"
                className="inputLeadsClient"
                id="test1"
                name="radio-group"
                defaultChecked={
                  props.props.companyResponsable == "MORGAN R" ? true : false
                }
              />
              <label htmlFor="test1 mb-0">MORGAN R</label>
            </p>
          </>
        ),
        name: `responsable${props.length}`,
        color: "#FF8B00",
      },
      {
        value: "PATRICK B",
        label: (
          <>
            <p className="mb-0">
              <input
                type="radio"
                className="inputLeadsClient"
                id="test1"
                name="radio-group"
                defaultChecked={
                  props.props.companyResponsable == "PATRICK B" ? true : false
                }
              />
              <label htmlFor="test1 mb-0">PATRICK B</label>
            </p>
          </>
        ),
        name: `responsable${props.length}`,
        color: "#FF8B00",
      },
      {
        value: "PERSONNE",
        label: (
          <>
            <p className="mb-0">
              <input
                type="radio"
                className={
                  props.props.companyResponsable === "PERSONNE"
                    ? "persoon"
                    : `inputLeadsClient`
                }
                id="test1"
                name="radio-group"
                defaultChecked={
                  props.props.companyResponsable == "PERSONNE" ? true : false
                }
              />
              <label htmlFor="test1 mb-0">PERSONNE</label>
            </p>
          </>
        ),
        name: `responsable${props.length}`,
        color: "#ff0000",
      },
    ]);
    setAppele([
      {
        value: "BENJAMIN B",
        label: (
          <>
            <p className="mb-0">
              <input
                type="radio"
                className="inputLeadsClient"
                id="test1"
                name="radio-group"
                defaultChecked={
                  props.props.contactedAfterOfferSentBy == "BENJAMIN B"
                    ? true
                    : false
                }
              />
              <label htmlFor="test1 mb-0">BENJAMIN B</label>
            </p>
          </>
        ),
        name: `appelé${props.length}`,
        color: "#FF8B00",
      },
      {
        value: "JEREMY R",
        label: (
          <>
            <p className="mb-0">
              <input
                type="radio"
                className="inputLeadsClient"
                id="test1"
                name="radio-group"
                defaultChecked={
                  props.props.contactedAfterOfferSentBy == "JEREMY R"
                    ? true
                    : false
                }
              />
              <label htmlFor="test1 mb-0">JEREMY R</label>
            </p>
          </>
        ),
        name: `appelé${props.length}`,
        color: "#FF8B00",
      },
      {
        value: "PATRICK R",
        label: (
          <>
            <p className="mb-0">
              <input
                type="radio"
                className="inputLeadsClient"
                id="test1"
                name="radio-group"
                defaultChecked={
                  props.props.contactedAfterOfferSentBy == "PATRICK R"
                    ? true
                    : false
                }
              />
              <label htmlFor="test1 mb-0">PATRICK R</label>
            </p>
          </>
        ),
        name: `appelé${props.length}`,
        color: "#FF8B00",
      },
      {
        value: "ADRIAN T",
        label: (
          <>
            <p className="mb-0">
              <input
                type="radio"
                className="inputLeadsClient"
                id="test1"
                name="radio-group"
                defaultChecked={
                  props.props.contactedAfterOfferSentBy == "ADRIAN T"
                    ? true
                    : false
                }
              />
              <label htmlFor="test1 mb-0">ADRIAN T</label>
            </p>
          </>
        ),
        name: `appelé${props.length}`,
        color: "#FF8B00",
      },
      {
        value: "MORGAN R",
        label: (
          <>
            <p className="mb-0">
              <input
                type="radio"
                className="inputLeadsClient"
                id="test1"
                name="radio-group"
                defaultChecked={
                  props.props.contactedAfterOfferSentBy == "MORGAN R"
                    ? true
                    : false
                }
              />
              <label htmlFor="test1 mb-0">MORGAN R</label>
            </p>
          </>
        ),
        name: `appelé${props.length}`,
        color: "#FF8B00",
      },
      {
        value: "PATRICK B",
        label: (
          <>
            <p className="mb-0">
              <input
                type="radio"
                className="inputLeadsClient"
                id="test1"
                name="radio-group"
                defaultChecked={
                  props.props.contactedAfterOfferSentBy == "PATRICK B"
                    ? true
                    : false
                }
              />
              <label htmlFor="test1 mb-0">PATRICK B</label>
            </p>
          </>
        ),
        name: `appelé${props.length}`,
        color: "#FF8B00",
      },
      {
        value: "PERSONNE",
        label: (
          <>
            <p className="mb-0">
              <input
                type="radio"
                className={
                  props.props.companyResponsable === "PERSONNE"
                    ? "persoon"
                    : `inputLeadsClient`
                }
                id="test1"
                name="radio-group"
                defaultChecked={
                  props.props.contactedAfterOfferSentBy == "PERSONNE"
                    ? true
                    : false
                }
              />
              <label htmlFor="test1 mb-0">PERSONNE</label>
            </p>
          </>
        ),
        name: `appelé${props.length}`,
        color: "#ff0000",
      },
    ]);
    setDeuxieme([
      {
        value: "BENJAMIN B",
        label: (
          <>
            <p className="mb-0">
              <input
                type="radio"
                className="inputLeadsClient"
                id="test1"
                name={`deuxième${props.length}`}
                defaultChecked={
                  props.props.contactedSecondTimeBy == "BENJAMIN B"
                    ? true
                    : false
                }
              />
              <label htmlFor="test1 mb-0">BENJAMIN B</label>
            </p>
          </>
        ),
        name: `deuxième${props.length}`,
        color: "#FF8B00",
      },
      {
        value: "JEREMY R",
        label: (
          <>
            <p className="mb-0">
              <input
                type="radio"
                className="inputLeadsClient"
                id="test1"
                name={`deuxième${props.length}`}
                defaultChecked={
                  props.props.contactedSecondTimeBy == "JEREMY R" ? true : false
                }
              />
              <label htmlFor="test1 mb-0">JEREMY R</label>
            </p>
          </>
        ),
        name: `deuxième${props.length}`,
        color: "#FF8B00",
      },
      {
        value: "PATRICK R",
        label: (
          <>
            <p className="mb-0">
              <input
                type="radio"
                className="inputLeadsClient"
                id="test1"
                name={`deuxième${props.length}`}
                defaultChecked={
                  props.props.contactedSecondTimeBy == "PATRICK R"
                    ? true
                    : false
                }
              />
              <label htmlFor="test1 mb-0">PATRICK R</label>
            </p>
          </>
        ),
        name: `deuxième${props.length}`,
        color: "#FF8B00",
      },
      {
        value: "ADRIAN T",
        label: (
          <>
            <p className="mb-0">
              <input
                type="radio"
                className="inputLeadsClient"
                id="test1"
                name={`deuxième${props.length}`}
                defaultChecked={
                  props.props.contactedSecondTimeBy == "ADRIAN T" ? true : false
                }
              />
              <label htmlFor="test1 mb-0">ADRIAN T</label>
            </p>
          </>
        ),
        name: `deuxième${props.length}`,
        color: "#FF8B00",
      },
      {
        value: "MORGAN R",
        label: (
          <>
            <p className="mb-0">
              <input
                type="radio"
                className="inputLeadsClient"
                id="test1"
                name={`deuxième${props.length}`}
                defaultChecked={
                  props.props.contactedSecondTimeBy == "MORGAN R" ? true : false
                }
              />
              <label htmlFor="test1 mb-0">MORGAN R</label>
            </p>
          </>
        ),
        name: `deuxième${props.length}`,
        color: "#FF8B00",
      },
      {
        value: "PATRICK B",
        label: (
          <>
            <p className="mb-0">
              <input
                type="radio"
                className="inputLeadsClient"
                id="test1"
                name={`deuxième${props.length}`}
                defaultChecked={
                  props.props.contactedSecondTimeBy == "PATRICK B"
                    ? true
                    : false
                }
              />
              <label htmlFor="test1 mb-0">PATRICK B</label>
            </p>
          </>
        ),
        name: `deuxième${props.length}`,
        color: "#FF8B00",
      },
      {
        value: "PERSONNE",
        label: (
          <>
            <p className="mb-0">
              <input
                type="radio"
                className={
                  props.props.companyResponsable === "PERSONNE"
                    ? "persoon"
                    : `inputLeadsClient`
                }
                id="test1"
                name={`deuxième${props.length}`}
                defaultChecked={
                  props.props.contactedSecondTimeBy == "PERSONNE" ? true : false
                }
              />
              <label htmlFor="test1 mb-0">PERSONNE</label>
            </p>
          </>
        ),
        name: `deuxième${props.length}`,
        color: "#ff0000",
      },
    ]);
    setpremier([
      {
        value: "BENJAMIN B",
        label: (
          <>
            <p className="mb-0">
              <input
                type="radio"
                className="inputLeadsClient"
                id="test1"
                name={`premier${props.length}`}
                defaultChecked={
                  props.props.contactedFirstTimeBy == "BENJAMIN B"
                    ? true
                    : false
                }
              />
              <label htmlFor="test1 mb-0">BENJAMIN B</label>
            </p>
          </>
        ),
        name: `premier${props.length}`,
        color: "#FF8B00",
      },
      {
        value: "JEREMY R",
        label: (
          <>
            <p className="mb-0">
              <input
                type="radio"
                className="inputLeadsClient"
                id="test1"
                name={`premier${props.length}`}
                defaultChecked={
                  props.props.contactedFirstTimeBy == "JEREMY R" ? true : false
                }
              />
              <label htmlFor="test1 mb-0">JEREMY R</label>
            </p>
          </>
        ),
        name: `premier${props.length}`,
        color: "#FF8B00",
      },
      {
        value: "PATRICK R",
        label: (
          <>
            <p className="mb-0">
              <input
                type="radio"
                className="inputLeadsClient"
                id="test1"
                name={`premier${props.length}`}
                defaultChecked={
                  props.props.contactedFirstTimeBy == "PATRICK R" ? true : false
                }
              />
              <label htmlFor="test1 mb-0">PATRICK R</label>
            </p>
          </>
        ),
        name: `premier${props.length}`,
        color: "#FF8B00",
      },
      {
        value: "ADRIAN T",
        label: (
          <>
            <p className="mb-0">
              <input
                type="radio"
                className="inputLeadsClient"
                id="test1"
                name={`premier${props.length}`}
                defaultChecked={
                  props.props.contactedFirstTimeBy == "ADRIAN T" ? true : false
                }
              />
              <label htmlFor="test1 mb-0">ADRIAN T</label>
            </p>
          </>
        ),
        name: `premier${props.length}`,
        color: "#FF8B00",
      },
      {
        value: "MORGAN R",
        label: (
          <>
            <p className="mb-0">
              <input
                type="radio"
                className="inputLeadsClient"
                id="test1"
                name={`premier${props.length}`}
                defaultChecked={
                  props.props.contactedFirstTimeBy == "MORGAN R" ? true : false
                }
              />
              <label htmlFor="test1 mb-0">MORGAN R</label>
            </p>
          </>
        ),
        name: `premier${props.length}`,
        color: "#FF8B00",
      },
      {
        value: "PATRICK B",
        label: (
          <>
            <p className="mb-0">
              <input
                type="radio"
                className="inputLeadsClient"
                id="test1"
                name={`premier${props.length}`}
                defaultChecked={
                  props.props.contactedFirstTimeBy == "PATRICK B" ? true : false
                }
              />
              <label htmlFor="test1 mb-0">PATRICK B</label>
            </p>
          </>
        ),
        name: `premier${props.length}`,
        color: "#FF8B00",
      },
      {
        value: "PERSONNE",
        label: (
          <>
            <p className="mb-0">
              <input
                type="radio"
                className={
                  props.props.companyResponsable === "PERSONNE"
                    ? "persoon"
                    : `inputLeadsClient`
                }
                id="test1"
                name={`premier${props.length}`}
                defaultChecked={
                  props.props.contactedFirstTimeBy == "PERSONNE" ? true : false
                }
              />
              <label htmlFor="test1 mb-0">PERSONNE</label>
            </p>
          </>
        ),
        name: `premier${props.length}`,
        color: "#ff0000",
      },
    ]);
    setStatus([
      {
        value: "Non determine",
        label: (
          <>
            <p className="mb-0">
              <input
                type="radio"
                className={
                  props.props.clientStatus == "Non determine"
                    ? "persoon"
                    : "inputLeadsClient"
                }
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
        color: "#ff0000",
      },
      {
        value: "Le client negocie",
        label: (
          <>
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
        color: "#ff0000",
      },
    ]);
  }, []);

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
          if (props.CurrentFilter.FilterData.length !== 0) {
            props.setCurrentFilter({
              ...props.CurrentFilter,
              filterApplied: true,
            });
          } else {
            props.setCurrentFilter({
              ...props.CurrentFilter,
              filterApplied: false,
            });
            props.update(true);
          }
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
          if (props.CurrentFilter.FilterData.length !== 0) {
            props.setCurrentFilter({
              ...props.CurrentFilter,
              filterApplied: true,
            });
          } else {
            props.setCurrentFilter({
              ...props.CurrentFilter,
              filterApplied: false,
            });
            props.update(true);
          }
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
  const switchCheckk = (e) => {
    console.log(e, "check");
  };

  return (
    <>
      <div
        className="row leadClientCard my-1"
        style={{ width: "102%" }}
        key={props.props._id}
      >
        <div className="col-12 ">
          <div className="row">
            <div className="col-4 d-flex align-items-center">
              <p className="mb-0 d-flex align-items-center">
                <img
                  src={require("../../images/calendar.png")}
                  style={{ width: "12px", marginRight: "4px" }}
                />
                Lead ajouté le {formatDateCha(date)}
              </p>
            </div>
            <div className="col-6 d-flex justify-content-end align-items-center">
          {props.props.offerSent ?  
            <button className="leadsAddToCRM mx-1">Voir les offres</button>
         :
         null 
}
              <button className="leadsAddToCRM">Add to CRM</button>
              <button
                className="leadsAddToCRM mx-1" 
                onClick={() => setGenOffer(true)}
              >
                GENERATE OFFER
              </button>
            </div>

            <div
              className="col-2 d-flex justify-content-end align-items-center"
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
                <p className="mb-0">Société 👇</p>
              </div>
              <div className="BoxHeight">
                <span>
                  <div
                    className="col-9 d-flex align-items-center cursor-pointer leadsChipColor"
                    onClick={() => CurrentModal("Name")}
                  >
                    {props.props.companyName
                      ? props.props.companyName.toLocaleUpperCase()
                      : "Pas de Société sur ce lead"}
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
              <div className="grayboxLeads d-flex justify-content-start align-items-center ">
                <p className="mb-0">Téléphone(s) 👇</p>
              </div>
              <div className="BoxHeight">
                <span>
                  <div
                    className="col-9 d-flex align-items-center cursor-pointer leadsChipColor"
                    onClick={() => CurrentModal("Num1")}
                  >
                    {props.props.phoneNumber1
                      ? props.props.phoneNumber1.includes("+")
                        ? props.props.phoneNumber1
                        : "+" + props.props.phoneNumber1
                      : "Pas de Téléphone sur ce lead"}
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
                  <div
                    className="col-9 d-flex align-items-center cursor-pointer leadsChipColor"
                    onClick={() => CurrentModal("Num2")}
                  >
                    {props.props.phoneNumber2
                      ? props.props.phoneNumber2.includes("+")
                        ? props.props.phoneNumber2
                        : "+" + props.props.phoneNumber2
                      : "Pas de Téléphone 2 sur ce lead"}
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
                <p className="mb-0">Email Adress 👇</p>
              </div>
              <div className="BoxHeight">
                <span   className="" style={{height:"auto",wordBreak:"break-all"}}>
                  <div
                    className="col-9 d-flex align-items-center cursor-pointer leadsChipColor text-break "
                    onClick={() => CurrentModal("email")}
                 
                  >
                    {props.props.email
                      ? props.props.email
                      : "Pas de Email sur ce lead"}
                  </div>
                  <div
                    className="col-4 d-flex align-items-center justify-content-center  cursor-pointer"
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
                <p className="mb-0">Notes Client 👇</p>
              </div>
              <div className="BoxHeight">
                <span style={{ height: "70px" }}>
                  <div
                    className="col-9 d-flex align-items-center text-capitalize cursor-pointer leadsChipColor"
                    onClick={() => CurrentModal("CNote")}
                  >
                    {props.props.companyNote.length > 40
                      ? props.props.companyNote.slice(0, 40) + "..."
                      : props.props.companyNote
                      ? props.props.companyNote
                      : "Pas de Notes Client sur ce lead"}
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
              <div className="grayboxLeads d-flex justify-content-start align-items-center ">
                <p className="mb-0">Notes Internes 👇</p>
              </div>
              <div className="BoxHeight">
                <span style={{ height: "70px" }}>
                  <div
                    className="col-9 d-flex align-items-center text-capitalize cursor-pointer leadsChipColor"
                    onClick={() => CurrentModal("ANote")}
                  >
                    {props.props.agencyNote.length > 40
                      ? props.props.agencyNote.slice(0, 40) + "..."
                      : props.props.agencyNote
                      ? props.props.agencyNote
                      : "Pas de Notes Internes sur ce lead"}
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
                <p className="mb-0 ">Offre envoyé? 👇</p>
              </div>
              <div className="BoxHeight d-grid align-items-center justify-content-center">
                <div className="check-box d-flex align-items-center ">
                  <input
                    type="checkbox"
                    defaultChecked={props.props.offerSent}
                    id={`offer${props.length}`}
                    onChange={(e) => {
                      switchCheck("Offre", props.props._id, e.target.checked);
                    }}
                  />
                  <label
                    className="ToggleLabel mb-0 cursor-pointer"
                    htmlFor={`offer${props.length}`}
                  >
                    {props.props.offerSent == false ? "Non" : "Oui"}
                  </label>
                </div>
                {
                  props.props.offerSent == false ? 
                  null
                  :
                  <div className="cursor-pointer" style={{height:"11px"}}>
                  <p className="mb-0 offerVoir">Voir offre</p>
                  </div>
                }
             
              </div>
            </div>
            <div className="col-3 d-grid px-0">
              <div className="grayboxLeads d-flex justify-content-start align-items-center">
                <p className="mb-0">A rappeler? 👇</p>
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
                <p className="mb-0">Client Intéréssé? 👇</p>
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
                    {props.props.companyInterested == false
                      ? "Pas déterminé"
                      : "Oui"}
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
                      className="basic-multi-select placeHolderLead clientLeads CommercialCenter"
                      classNamePrefix="select"
                      inputId={props.length}
                      onChange={onReactSelect}
                      value={{
                        value: props.props.contactedFirstTimeBy,
                        label: (
                          <>
                            <p className="mb-0">
                              <input
                                type="radio"
                                className={
                                  props.props.contactedFirstTimeBy
                                    ? props.props.contactedFirstTimeBy ===
                                      "PERSONNE"
                                      ? "persoon"
                                      : `inputLeadsClient`
                                    : "persoon"
                                }
                                id="test1"
                                name={`premie${props.length}`}
                                defaultChecked
                              />
                              <label htmlFor="test1 mb-0">
                                {props.props.contactedFirstTimeBy
                                  ? props.props.contactedFirstTimeBy
                                  : "Personne"}
                              </label>
                            </p>
                          </>
                        ) as any,

                        color: "#FF8B00",
                      }}
                      defaultValue={{
                        value: props.props.contactedFirstTimeBy,
                        label: (
                          <>
                            <p className="mb-0">
                              <input
                                type="radio"
                                className={
                                  props.props.contactedFirstTimeBy
                                    ? props.props.contactedFirstTimeBy ===
                                      "PERSONNE"
                                      ? "persoon"
                                      : `inputLeadsClient`
                                    : "persoon"
                                }
                                id="test1"
                                name={`premie${props.length}`}
                                defaultChecked
                              />
                              <label htmlFor="test1 mb-0">
                                {props.props.contactedFirstTimeBy
                                  ? props.props.contactedFirstTimeBy
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
                      className="basic-multi-select placeHolderLead clientLeads CommercialCenter"
                      classNamePrefix="select"
                      //   defaultMenuIsOpen={true}
                      onChange={onReactSelect}
                      options={deuxième}
                      styles={colourStyles}
                      inputId={props.length}
                      value={{
                        value: props.props.contactedSecondTimeBy,
                        label: (
                          <>
                            <p className="mb-0">
                              <input
                                type="radio"
                                className={
                                  props.props.contactedSecondTimeBy
                                    ? props.props.contactedSecondTimeBy ===
                                      "PERSONNE"
                                      ? "persoon"
                                      : `inputLeadsClient`
                                    : "persoon"
                                }
                                id="test1"
                                name={`deux${props.length}`}
                                defaultChecked
                              />
                              <label htmlFor="test1 mb-0">
                                {props.props.contactedSecondTimeBy
                                  ? props.props.contactedSecondTimeBy
                                  : "Personne"}
                              </label>
                            </p>
                          </>
                        ) as any,

                        color: "#FF8B00",
                      }}
                      defaultValue={{
                        value: props.props.contactedSecondTimeBy,
                        label: (
                          <>
                            <p className="mb-0">
                              <input
                                type="radio"
                                className={
                                  props.props.contactedSecondTimeBy
                                    ? props.props.contactedSecondTimeBy ===
                                      "PERSONNE"
                                      ? "persoon"
                                      : `inputLeadsClient`
                                    : "persoon"
                                }
                                id="test1"
                                name={`deux${props.length}`}
                                defaultChecked
                              />
                              <label htmlFor="test1 mb-0">
                                {props.props.contactedSecondTimeBy
                                  ? props.props.contactedSecondTimeBy
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
                      className="basic-multi-select placeHolderLead clientLeads CommercialCenter"
                      classNamePrefix="select"
                      inputId={props.length}
                      //   onChange={FilterChange}
                      onChange={onReactSelect}
                      options={appelé}
                      styles={colourStyles}
                      value={{
                        value: props.props.contactedAfterOfferSentBy
                          ? props.props.contactedAfterOfferSentBy
                          : "Personne",
                        label: (
                          <>
                            <p className="mb-0">
                              <input
                                type="radio"
                                className={
                                  props.props.contactedAfterOfferSentBy
                                    ? props.props.contactedAfterOfferSentBy ===
                                      "PERSONNE"
                                      ? "persoon"
                                      : `inputLeadsClient`
                                    : "persoon"
                                }
                                id="test1"
                                name={`appel${props.length}`}
                                defaultChecked
                              />
                              <label htmlFor="test1 mb-0">
                                {props.props.contactedAfterOfferSentBy
                                  ? props.props.contactedAfterOfferSentBy
                                  : "Personne"}
                              </label>
                            </p>
                          </>
                        ) as any,

                        color: "#FF8B00",
                      }}
                      defaultValue={{
                        value: props.props.contactedAfterOfferSentBy
                          ? props.props.contactedAfterOfferSentBy
                          : "Personne",
                        label: (
                          <>
                            <p className="mb-0">
                              <input
                                type="radio"
                                className={
                                  props.props.contactedAfterOfferSentBy
                                    ? props.props.contactedAfterOfferSentBy ===
                                      "PERSONNE"
                                      ? "persoon"
                                      : `inputLeadsClient`
                                    : "persoon"
                                }
                                id="test1"
                                name={`appel${props.length}`}
                                defaultChecked
                              />
                              <label htmlFor="test1 mb-0">
                                {props.props.contactedAfterOfferSentBy
                                  ? props.props.contactedAfterOfferSentBy
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
                      Qui est le responsable actuel de ce client ?
                    </p>
                  </div>
                  <div className="p-1">
                    <Select
                      name="market"
                      closeMenuOnSelect={true}
                      placeholder="‎  ‎ ‎  ‎ "
                      className="basic-multi-select placeHolderLead clientLeads CommercialCenter"
                      classNamePrefix="select"
                      //   onChange={FilterChange}
                      onChange={onReactSelect}
                      options={responsable}
                      inputId={props.length}
                      styles={colourStyles}
                      value={{
                        value: props.props.companyResponsable
                          ? props.props.companyResponsable
                          : "Personne",
                        label: (
                          <>
                            <p className="mb-0">
                              <input
                                type="radio"
                                className={
                                  props.props.companyResponsable
                                    ? props.props.companyResponsable ===
                                      "PERSONNE"
                                      ? "persoon"
                                      : `inputLeadsClient`
                                    : "persoon"
                                }
                                id="test1"
                                name={`responsab${props.length}`}
                                defaultChecked
                              />
                              <label htmlFor="test1 mb-0">
                                {props.props.companyResponsable
                                  ? props.props.companyResponsable
                                  : "Personne"}
                              </label>
                            </p>
                          </>
                        ) as any,

                        color: "#FF8B00",
                      }}
                      defaultValue={{
                        value: props.props.companyResponsable
                          ? props.props.companyResponsable
                          : "Personne",
                        label: (
                          <>
                            <p className="mb-0">
                              <input
                                type="radio"
                                className={
                                  props.props.companyResponsable
                                    ? props.props.companyResponsable ===
                                      "PERSONNE"
                                      ? "persoon"
                                      : `inputLeadsClient`
                                    : "persoon"
                                }
                                id="test1"
                                name={`responsabl${props.length}`}
                                defaultChecked
                              />
                              <label htmlFor="test1 mb-0">
                                {props.props.companyResponsable
                                  ? props.props.companyResponsable
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
                  className="basic-multi-select placeHolderLead clientLeads CommercialCenter"
                  classNamePrefix="select"
                  inputId={props.length}
                  onChange={onReactSelect}
                  options={status}
                  styles={colourStyles}
                  value={{
                    value: props.props.clientStatus,
                    label: (
                      <>
                        <p className="mb-0">
                          <input
                            type="radio"
                            className={
                              props.props.clientStatus == "Non determine"
                                ? "persoon"
                                : "inputLeadsClient"
                            }
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
                  setCurrentFilter={props.setCurrentFilter}
                  CurrentFilter={props.CurrentFilter}
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
              {GenOffer ? (
                <OfferModal closeModal={setGenOffer} props={props.props} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="row pr-2">
        <hr />
      </div>
    </>
  );
}
export default LeadCard;
