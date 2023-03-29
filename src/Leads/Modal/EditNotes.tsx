import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../config/serverApiConfig";
import { motion } from "framer-motion";
import Cookies from "js-cookie";

function NotesEditModal({
  closeModal,
  props,
  Notes,
  update,
  Load,
  deleteModal,
  setDelete,
  setFilter,
  DAta,
  setrest,
}) {
  const [editNotes, setEditNotes] = useState("");
  const [btnDS, setBTNds] = useState(false);
  const ref = useRef();

  useOnClickOutside(ref, () => closeModal(false));

  const LeadsNotes = async () => {
    setBTNds(true);
    let data = {
      leadId: props._id,
      leadNotes: editNotes,
    };
    return await fetch(API_BASE_URL + "updateLeadNotes", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => err);
  };

  const AgencyNotes = async () => {
    let data = {
      leadId: props._id,
      agencyNotes: editNotes,
    };
    setBTNds(true);
    return await fetch(API_BASE_URL + `editAgencyNotes`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => err);
  };

  function useOnClickOutside(ref, handler) {
    useEffect(() => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [ref, handler]);
  }

  const DeleteNotes = () => {
    setDelete("");
    if (Notes == "Leads") {
      if (props.leadNotes !== "") {
        closeModal(false);
        deleteModal(true);
      } else {
        setBTNds(false);
        toast.error("Please Add Notes!");
      }
    } else {
      if (props.agencyNotes !== "") {
        closeModal(false);
        deleteModal(true);
      } else {
        setBTNds(false);
        toast.error("Please Add Notes!");
      }
    }
  };

  const EditNotes = () => {
    if (Notes == "Leads") {
      LeadsNotes().then((res) => {
        if (res.status) {
          if (DAta === undefined) {
            update(true);
          }
          setBTNds(false);
          Load(true);
          setrest(true);

          toast.success(res.message);
          setTimeout(() => {
            closeModal(false);
          }, 2000);
          if (DAta !== undefined) {
            setTimeout(() => {
              setFilter(true);
            }, 2000);
          } else {
            setBTNds(false);
            toast.success(res.message);
          }
        }
      });
    } else {
      AgencyNotes().then((res) => {
        if (res.status) {
          if (DAta === undefined) {
            update(true);
          }
          setBTNds(false);
          setrest(true);

          toast.success(res.message);
          setTimeout(() => {
            closeModal(false);
          }, 2000);
          if (DAta !== undefined) {
            setTimeout(() => {
              setFilter(true);
            }, 2000);
          }
        } else {
          setBTNds(false);
          toast.success(res.message);
        }
      });
    }
  };

  return (
    <>
      {/* <Toaster   containerStyle={{zIndex:"30443330099555"}}    position="top-right"         /> */}
      <div
        className="modal d-block"
        style={{ backgroundColor: "#00000052" }}
        id="staticBackdrop2"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 190,
            damping: 50,
          }}
          className="modal-dialog modal-lg"
          style={{ width: "795px" }}
        >
          <div className="modal-content">
            <div className="modal-header p-0">
              <div className="col-12">
                <div className="row">
                  <div className="col-8 px-0 clientArchivedModal-font">
                    <h2
                      className="modal-title  py-1 pRight"
                      id="staticBackdropLabel"
                    >
                      {Notes == "Leads"
                        ? "Notes by " + Notes
                        : "Notes by Agency"}
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
              <textarea
                style={{ fontSize: "12px", height: "40vh" }}
                className="form-control nameTransform"
                onChange={(e) => setEditNotes(e.target.value)}
                defaultValue={
                  Notes == "Leads"
                    ? props.leadNotes
                      ? props.leadNotes
                      : "✘✘No Notes!"
                    : Notes === "Agency"
                    ? props.agencyNotes
                      ? props.agencyNotes
                      : "✘✘No Notes!"
                    : "✘✘No Notes!"
                }
              ></textarea>
              <div className="col-12 text-center mt-1">
                <div className="row justify-content-end">
                  <div className="col-4 d-grid">
                    <button
                      className="btn"
                      disabled={btnDS}
                      onClick={() => DeleteNotes()}
                      style={{
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "700",
                        fontSize: "13px",
                        lineHeight: "20px",
                        color: "#E21B1B",
                        border: "2px solid #E21B1B",
                        borderRadius: "22px",
                        marginTop: "5px",
                      }}
                    >
                      <img alt="..."
                        style={{ paddingRight: "5px" }}
                        src={require("../../images/Deletebucket.svg").default}
                      />{" "}
                      Delete This Note
                    </button>
                  </div>{" "}
                  <div className="col-4 d-grid">
                    <button
                      className="btn  btn-bgbClient d-flex justify-content-center align-items-center"
                      disabled={btnDS}
                      onClick={() => {
                        EditNotes();
                      }}
                      style={{
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "700",
                        fontSize: "13px",
                        lineHeight: "18px",
                        borderRadius: "22px",
                        color: "#ffff",
                        backgroundColor: "#489767",
                      }}
                    >
                      <img alt="..."
                        style={{ paddingRight: "5px" }}
                        src={require("../../images/diskette.svg").default}
                      />{" "}
                      Update This Note
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
export default NotesEditModal;
