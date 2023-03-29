import React, { useState } from "react";
import "../../CSS/PreModal.css";
import{ StylesConfig } from "react-select";
import {
  ColourOption,

} from "../../Selecteddata/data";
import chroma from "chroma-js";
import {  toast } from "react-hot-toast";
import { API_BASE_URL } from "../../config/serverApiConfig";
import Cookies from "js-cookie";

function PreModal({ props, closepreModal, clientProps }) {
  const notifyCandidatMovedSuccess = () =>
    toast.success("Candidat Pre-Selected Successfully!");
  const notifyCandidatMovedError = () =>
    toast.error("Candidat Not Pre-Selected! Please Try Again.");

  const [selectedClient, setSelectedClient] = useState(clientProps._id);
  const [reason, setReason] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);

  const onDataChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | any
    >
  ) => {
    // debugger
    setReason(e.target.value);
  };

  const changeStatus = async (preSelectedData: any) => {
    return await fetch(API_BASE_URL + "moveToPreSelected", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
      body: JSON.stringify(preSelectedData),
    })
      .then((resp) => resp.json())
      .then((respData) => respData)
      .catch((err) => err);
  };

  const moveToPreSelected = () => {
    setBtnDisabled(true);
    console.log(reason, selectedClient, props._id);
    const preSelectedData = {
      candidatId: props._id,
      clientId: selectedClient,
      reason: reason,
    };
    changeStatus(preSelectedData)
      .then((resData) => {
        console.log(resData);
        if (resData.status) {
          notifyCandidatMovedSuccess();
          setTimeout(() => {
            setBtnDisabled(false);
            window.location.href = "/todolist";
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        notifyCandidatMovedError();
      });
  };

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

  return (
    <>
      <div
        className="modal d-block"
        style={{ backgroundColor: "#00000052" }}
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content" style={{ width: "670px" }}>
            <div className="modal-header">
              <h5
                className="modal-title modalStylingfont"
                id="exampleModalLabel"
              >
                Move {props.candidatName.toUpperCase()} to{" "}
                <span> PRE SELECTED </span>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  closepreModal(false);
                }}
              ></button>
            </div>
            <div className="modal-body">
              <p className="ChildStylePreModal">
                pour quel client {props.candidatName} est selectionné ?
              </p>
              <div>
                {" "}
                <p className="modalStylingfont">
                  <span>{clientProps.clientCompanyName}</span>
                </p>
              </div>
              <p className="ChildStylePreModal mt-2">
                pour quel raison {props.candidatName.toUpperCase()} est
                selectionné ?
              </p>
              <div>
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    onChange={onDataChange}
                    name="reason"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: "100px" }}
                  ></textarea>
                  <label
                    htmlFor="floatingTextarea2"
                    placeholder="{client_List}"
                  ></label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn preSelectedStageBtn"
                onClick={moveToPreSelected}
                disabled={btnDisabled}
              >
                Move this person to in preselected status
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default PreModal;
