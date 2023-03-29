import React, { useState } from "react";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../config/serverApiConfig";
import "../../CSS/Client/ArchivedCardClient.css";
import Cookies from "js-cookie";
function ResetProfile({ props, closeModal, path }) {
  const [ResetLoader, setResetLoader] = useState(false);
  const [candidatId] = useState(props._id);

  const notifyMoveSuccess = () =>
    toast.success("Candidat Reset To To-DO Successfully!");
  const notifyMoveError = () =>
    toast.error("Cannot Reset Candidat! Please Try Again.");

  let data = {
    candidatId,
  };

  const ResetClient = async () => {
    setResetLoader(true);
    console.log(data);
    return await fetch(API_BASE_URL + "moveToToDo", {
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
    console.log(data);
    ResetClient()
      .then((resdata) => {
        console.log(resdata);
        closeModal(false);
        setResetLoader(false);
        setTimeout(function () {
          if (path == "/embauchlist") {
            window.location.href = path;
          } else if (path == "/clientToDo") {
            window.location.href = "/clientToDo";
          } else {
            window.location.href = "/dashboard";
          }
        }, 2000);
        notifyMoveSuccess();
      })
      .catch((err) => {
        console.log(err);
        notifyMoveError();
        setResetLoader(false);
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
                      RESET {props.candidatName.toUpperCase()} Profile to{" "}
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
                Candidate Name : {props.candidatName.toUpperCase()}
              </p>
              <div className="col-12 text-center mt-1">
                <div className="row ">
                  <div className="col-12 d-flex justify-content-end">
                    <button
                      disabled={ResetLoader}
                      onClick={sendResetRequest}
                      className="btnHide-ArchivedModal d-flex justify-content-center "
                      style={{
                        backgroundColor: "#489767",
                        width: "15%",
                        padding: "0px",
                        height: "46px",
                      }}
                    >
                      {ResetLoader ? (
                        <div className="RESTloader ">Loading...</div>
                      ) : null}{" "}
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
export default ResetProfile;
