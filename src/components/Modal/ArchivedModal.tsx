import React, { useState } from "react";
import { API_BASE_URL } from "../../config/serverApiConfig";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

function ArchivedModal({ props, closeModal, path }) {
  const [reasonToArchive, setReasonToArchive] = useState([]);
  const [candidatId] = useState(props._id);
  const [btnLoader, setbtnLoader] = useState(false);

  // Notification //
  const notifyMoveSuccess = () => toast.success("Moved Archived Successfully!");
  const notifyMoveError = () => toast.error("Not Moved..");
  // End  //

  let data = {
    candidatId,
    reasonToArchive,
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

  const ArchiveCandidat = async () => {
    setbtnLoader(true);
    return await fetch(API_BASE_URL + "moveToArchived", {
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

  const sendArchiveRequest = (e) => {
    e.preventDefault();

    ArchiveCandidat()
      .then((resdata) => {
        console.log(resdata);
        closeModal(false);
        setTimeout(function () {
          if (path == "/embauchlist") {
            window.location.href = path;
          } else {
            window.location.href = "/todolist";
          }
        }, 2000);
        setbtnLoader(false);
        notifyMoveSuccess();
      })
      .catch((err) => {
        console.log(err);
        notifyMoveError();
        setbtnLoader(false);
      });
  };

  return (
    <>
      <Toaster
        containerStyle={{ zIndex: "99999999999999999" }}
        position="top-right"
      />
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
            <div className="modal-header">
              <h5
                className="modal-title modalStylingfontArchive"
                id="exampleModalLabel"
              >
                Move {props.candidatName} to{" "}
                <span className=""> Archived </span>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  closeModal(false);
                }}
              ></button>
            </div>
            <div className="modal-body text-start">
              <p
                style={{
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#373A3C",
                }}
              >
                What is the reason of this archived ? Pourquoi‏‏‎ ‎
                {props.candidatName} is archived ?
              </p>
              <form
                onSubmit={(e) => {
                  sendArchiveRequest(e);
                  return false;
                }}
              >
                <div className="col-12 text-center">
                  <textarea
                    id="reasonToArchive"
                    name="reasonToArchive"
                    required
                    className="form-control"
                    onChange={onFormDataChange}
                    placeholder="Your message here"
                  ></textarea>
                </div>
                <div className="col-12 text-center pt-3">
                  <div className="row justify-content-end">
                    <div className="col-7">
                      <button
                        className="d-flex justify-content-center"
                        disabled={btnLoader}
                        style={{
                          borderRadius: "25px",
                          backgroundColor: "#FF0000",
                          width: "100%",
                          padding: "15px 0px",
                          fontFamily: "Inter",
                          fontStyle: "normal",
                          fontWeight: "700",
                          fontSize: "16px",
                          lineHeight: "24px",
                          color: "white",
                          border: "unset",
                        }}
                      >
                        {btnLoader ? (
                          <div className="RESTloader ">Loading...</div>
                        ) : null}{" "}
                        Move {props.candidatName.toUpperCase()} to Status
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
export default ArchivedModal;
