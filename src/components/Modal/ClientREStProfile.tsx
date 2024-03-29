import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { API_BASE_URL } from "../../config/serverApiConfig";
import "../../CSS/Client/ArchivedCardClient.css";
import Cookies from "js-cookie";
function ResetClientProfile({ props, closeModal, path }) {
  const [clientId] = useState(props._id);
  const [btnDisabled, setDisabled] = useState(false);

  const notifyMoveSuccess = () =>
    toast.success("Client Reset To To-DO Successfully!");
  const notifyMoveError = () =>
    toast.error("Cannot Reset Client! Please Try Again.");

  let data = {
    clientId,
  };

  const ResetCandidat = async () => {
    return await fetch(API_BASE_URL + "moveClientToToDo", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((reD) => reD)
      .catch((err) => err);
  };

  const sendResetRequest = () => {
    setDisabled(true);
    console.log(data);
    ResetCandidat()
      .then((resdata) => {
        console.log(resdata);
        closeModal(false);
        setTimeout(function () {
          if (path == "/embauchlist") {
            setDisabled(false);
            window.location.href = path;
          } else if (path == "/clientToDo") {
            setDisabled(false);
            window.location.href = "/clientToDo";
          } else {
            setDisabled(false);
            window.location.href = "/dashboard";
          }
        }, 2000);
        notifyMoveSuccess();
      })
      .catch((err) => {
        console.log(err);
        notifyMoveError();
      });
  };

  return (
    <>
      <div
        className="modal d-block"
        style={{ backgroundColor: "#00000052" }}
        id="staticBackdrop2"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header p-0">
              <div className="col-12">
                <div className="row">
                  <div className="col-8 px-0 clientArchivedModal-font">
                    <h2
                      className="modal-title  py-1 pRight"
                      id="staticBackdropLabel"
                    >
                      RESET {props.candidatName} Profile to{" "}
                      <span
                        className=""
                        style={{ color: "#489767", marginLeft: "5px" }}
                      >
                        To-Do.
                      </span>{" "}
                    </h2>
                  </div>
                  <div className="col-4 text-end d-flex align-items-center">
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => closeModal(false)}
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-body text-start">
              <p
                style={{
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#000000",
                }}
              >
                Client Name : {props.clientCompanyName}
              </p>
              <div className="col-12 text-center mt-1">
                <div className="row ">
                  <div className="col-12 d-flex justify-content-end">
                    <button
                      disabled={btnDisabled}
                      onClick={sendResetRequest}
                      className="btnHide-ArchivedModal"
                      style={{ backgroundColor: "#489767" }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ResetClientProfile;
