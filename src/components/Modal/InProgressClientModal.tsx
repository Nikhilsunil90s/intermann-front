import React, {  useState } from "react";
import { API_BASE_URL } from "../../config/serverApiConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../../CSS/Client/ProgressCardClient.css";
import Cookies from "js-cookie";

function InProgressClientModal({ props, closeModal }) {
  const navigate = useNavigate();
  const [btnDisabled, setDisabled] = useState(false);

  const notifyMoveSuccess = () =>
    toast.success("Moved Client to In-Progress Successfully!");

  const notifyMoveError = () => toast.error("Not Moved To In-Progress");

  const moveToInProgress = async (data: any) => {
    return await fetch(API_BASE_URL + "moveClientToInProgress", {
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

  const saveFormData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    let data = {
      clientId: props._id,
      clientCompanyName: props.clientCompanyName,
      clientJob: props.clientJob,
    };
    moveToInProgress(data)
      .then((resp) => {
        console.log(resp);
        closeModal(false);
        notifyMoveSuccess();
        setTimeout(function () {
          // window.location.href = "/clientToDo";
          setDisabled(false);
          navigate("/dashboard");
        }, 2000);
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
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content padding-full">
            <div className=" modal-header  pb-1">
              <div className="col-12">
                <div className="row">
                  <div className="col-8 px-0 TopHeaderModalInprogress">
                    <h2 className="modal-title " id="staticBackdropLabel">
                      Move {props.clientCompanyName} to
                      <span className="col-spl ">IN-PROGRESS</span>{" "}
                    </h2>
                  </div>
                  <div className="col-4 text-end">
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
                </div>
              </div>
            </div>
            <form onSubmit={saveFormData}>
              <div className="modal-body text-center">
                <div className="Modal-bodyText ">
                  <p className="">
                    {" "}
                    This status means that we strated active reseach on this
                    client and we will spend money on this research.
                  </p>
                  <p>
                    Cette société a signé l’offre et nous commençons à dépenser
                    de l’argent pour trouver des candidats
                  </p>
                </div>
                <div className="col-12 text-center pt-3">
                  <div className="row text-center">
                    <div className="d-flex justify-content-center">
                      {" "}
                      <button
                        disabled={btnDisabled}
                        className="btnClient-Modal"
                        type="submit"
                      >
                        <p className="mb-0">
                          I Confirm. Move this lead/client to in Progress
                          status.
                        </p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default InProgressClientModal;
