import React, { useState } from "react";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../config/serverApiConfig";
import "../../CSS/Client/ArchivedCardClient.css";
import Cookies from "js-cookie";

function ArchivedClientModal({ props, closeModal, path }) {
  const [reasonToArchive, setReasonToArchive] = useState([]);
  const [clientId] = useState(props._id);
  const [clientJobName] = useState(props.clientJob);
  const [btnDisabled, setDisabled] = useState(false);

  const notifyMoveSuccess = () =>
    toast.success("Client Archived Successfully!");
  const notifyMoveError = () =>
    toast.error("Cannot Archive Client Yet! Please try Again.");

  let data = {
    clientId,
    reasonToArchive,
    clientJobName,
  };

  const onFormDataChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | any
    >
  ) => {
    if (e.target.name === "reasonToArchive") {
      console.log(e.target.name, e.target.value);
      setReasonToArchive(e.target.value);
    }
  };

  const ArchiveClient = async () => {
    console.log(data);
    return await fetch(API_BASE_URL + "moveClientToArchived", {
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

  const sendArchiveRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    console.log(data);
    ArchiveClient()
      .then((resdata) => {
        console.log(resdata);
        closeModal(false);
        setTimeout(function () {
          if (path == "/embauchlist") {
            window.location.href = path;
            setDisabled(false);
          } else if (path == "/clientToDo") {
            window.location.href = "/clientToDo";
            setDisabled(false);
          } else {
            window.location.href = "/dashboard";
            setDisabled(false);
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
          <div className="modal-content padding-full">
            <div className="modal-header p-0">
              <div className="col-12">
                <div className="row">
                  <div className="col-8 px-0 clientArchivedModal-font">
                    <h2
                      className="modal-title  py-1 pRight"
                      id="staticBackdropLabel"
                    >
                      Move {props.clientCompanyName} to{" "}
                      <span className="text-danger">Archived</span>{" "}
                    </h2>
                  </div>
                  <div className="col-4 text-end">
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
                  fontWeight: "400",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#373A3C",
                }}
              >
                What is the reason of this archived ? Pourquoi{" "}
                {props.clientCompanyName} is archived ?{" "}
              </p>
              <form onSubmit={sendArchiveRequest}>
                <div className="col-12 text-center">
                  <textarea
                    id="reasonToArchive"
                    name="reasonToArchive"
                    required
                    className="form-control"
                    onChange={onFormDataChange}
                    placeholder="Client_List"
                  ></textarea>
                </div>
                <div className="col-12 text-center mt-1">
                  <div className="row ">
                    <div className="col-12 d-flex NoteArchivedModal mb-1">
                      <p className="">Note</p>{" "}
                      <span>
                        {" "}
                        : This action mean that is not wanted anymore If you
                        have any question please contact your manager or
                        contact@textone.fr
                      </span>
                    </div>
                    <div className="col-12 d-flex justify-content-end">
                      <button
                        disabled={btnDisabled}
                        type="submit"
                        className="btnClient-ArchivedModal"
                      >
                        Move {props.clientCompanyName.toUpperCase()} to Status
                        Archived.
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ArchivedClientModal;
