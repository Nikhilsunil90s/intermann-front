import React, { useEffect, useState } from "react";
import "../../CSS/PreModal.css";
import {  toast } from "react-hot-toast";
import { API_BASE_URL } from "../../config/serverApiConfig";
import Cookies from "js-cookie";

let LinkData = {};
function RenameDoc({ props, closepreModal, reload }) {
  const notifyCandidatMovedSuccess = () =>
    toast.success("Document Name Changed Successfully!");
  const notifyCandidatMovedError = () =>
    toast.error("Document Name Not Change Please Try Again.");
  const [NewName, setNewName] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);

  const onDataChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | any
    >
  ) => {
    // debugger
    if (!e.target.value.includes(".")) {
      setNewName(e.target.value.concat("." + props[3].split(".")[1]));
    }
    if (!e.target.value.split(".")[1] && !props[3].split(".")[1]) {
      setNewName(e.target.value);
    }
  };

  const onLinkDataChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | any
    >
  ) => {
    // debugger
    setNewName(e.target.value);
  };

  const changeLinkName = async (LinkData: any) => {
    LinkData = {
      linkId: props[0],
      newName: NewName,
    };
    return await fetch(API_BASE_URL + "renameClientLink", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
      body: JSON.stringify(LinkData),
    })
      .then((resp) => resp.json())
      .then((respData) => respData)
      .catch((err) => err);
  };

  const renameClientDocument = async () => {
    setBtnDisabled(true);
    if (props[2] === "LinkEdit") {
      changeLinkName(LinkData)
        .then((res) => {
          toast.success("Renamed Successfully!");
          reload(true);
          setTimeout(() => {
            closepreModal(false);
            setBtnDisabled(false);
          }, 2000);
        })
        .catch((err) => {
          setBtnDisabled(false);
          toast.error("Not Successfully!");
        });
    } else {
      let headers = {
        Accept: "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      };
      fetch(
        API_BASE_URL +
          `renameClientDocument/?documentId=${props[0]}&newName=${NewName}&clientId=${props[2]}`,
        {
          method: "GET",
          headers: headers,
        }
      )
        .then((reD) => reD.json())
        .then((resD) => {
          DataHandle(resD.status);
        })
        .catch((err) => err);
    }
  };

  const DataHandle = (el) => {
    if (el) {
      notifyCandidatMovedSuccess();
      reload(true);
      setTimeout(() => {
        closepreModal(false);
      }, 2000);
    } else {
      notifyCandidatMovedError();
    }
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
                Re-Name{" "}
                <span> {props[2] === "LinkEdit" ? "Link" : "DOCUMENT"} </span>
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
                {props[2] === "LinkEdit" ? "Link" : "DOCUMENT Name"} :{" "}
                <span className="text-success">
                  {" "}
                  {props[2] === "LinkEdit"
                    ? props[1].length > 20
                      ? props[1].slice(0, 56) + "..."
                      : props[1]
                    : props[3]}
                </span>
              </p>
              <div> </div>
              <p className="ChildStylePreModal mt-2">
                {props[2] === "LinkEdit"
                  ? "Enter Display Name.."
                  : "Enter new Name.."}
              </p>
              <div>
                <div className="form-floating">
                  <div className="col-8 pl-0">
                    {" "}
                    <input
                      className="form-control"
                      onChange={
                        props[2] === "LinkEdit"
                          ? onLinkDataChange
                          : onDataChange
                      }
                      name="DOCName"
                      placeholder={
                        props[2] === "LinkEdit"
                          ? "New Name.."
                          : "Doc New Name.."
                      }
                      id="floatingTextarea2"
                    />
                  </div>
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
                disabled={btnDisabled}
                onClick={renameClientDocument}
              >
                {props[2] === "LinkEdit"
                  ? "Save Display Name."
                  : "Save New Name."}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default RenameDoc;
