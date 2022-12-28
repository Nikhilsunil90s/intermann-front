import React, { useState } from "react";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../../../config/serverApiConfig";
import { Toaster, toast } from "react-hot-toast";

function EditModal(props: any) {
  const [data, setData] = useState({
    id: props.props._id,
  });
  const onFormChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onFormSubmit = async () => {
    await fetch(
      props.Status === "Name"
        ? API_BASE_URL + `changeCompanyName`
        : props.Status === "Num1"
        ? API_BASE_URL + `changePhoneNumber1`
        : props.Status === "Num2"
        ? API_BASE_URL + `changePhoneNumber2`
        : props.Status === "email"
        ? API_BASE_URL + `changeEmail`
        :  props.Status === "CNote" 
        ? API_BASE_URL + `changeCompanyNote`
        :   API_BASE_URL + `changeAgencyNote`
        ,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.status) {
          toast.success(res.message);
          props.update(true);
          setTimeout(() => {
            props.closeModal(false);
          }, 1000);
        } else {
          toast.success(res.message);
        }
      })
      .catch((err) => err);
  };

  return (
    <>
      <div
        className="modal d-block "
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
                      Change{" "}
                      {props.Status == "Name"
                        ? "Company Name"
                        : props.Status === "Num1"
                        ? "Téléphone 1"
                        : props.Status === "Num2"
                        ? "Téléphone 2"
                        : props.Status === "email"
                        ? "Email"
                        : props.Status === "CNote"
                        ? "Note Client"
                        : "Nos notes Internes"}
                    </h2>
                  </div>
                  <div className="col-4 text-end d-flex align-items-center">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={() => props.closeModal(false)}
                    ></button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-body text-start">
              {props.Status == "Name" ? (
                <label>Company Name </label>
              ) : props.Status === "Num1" ? (
                <label>Téléphone 1</label>
              ) : props.Status === "Num2" ? (
                <label>Téléphone 2</label>
              ) : props.Status === "CNote" ? (
                <label>Client Note</label>
              ) : props.Status === "email" ? (
                <label>Email</label>
              ) : (
                <label>Nos notes Internes</label>
              )}
              {props.Status == "Name" ? (
                <input
                  className="form-control"
                  name="newName"
                  defaultValue={props.props.companyName}
                  onChange={onFormChange}
                />
              ) : props.Status === "Num1" ? (
                <input
                  className="form-control"
                  type={"number"}
                  name="phoneNumber1"
                  defaultValue={props.props.phoneNumber1}
                  onChange={onFormChange}
                />
              ) : props.Status === "Num2" ? (
                <input
                  className="form-control"
                  type={"number"}
                  name="phoneNumber2"
                  defaultValue={props.props.phoneNumber2}
                  onChange={onFormChange}
                />
              ) : props.Status === "email" ? (
                <input
                  className="form-control"
                  type={"email"}
                  defaultValue={props.props.email}
                  name="newEmail"
                  onChange={onFormChange}
                />
              ) : props.Status === "CNote" ? (
                <textarea
                  style={{ fontSize: "12px", height: "40vh" }}
                  defaultValue={props.props.companyNote}
                  className="form-control nameTransform"
                  name="note"
                  onChange={onFormChange}
                ></textarea>
              ) : (
                <textarea
                  style={{ fontSize: "12px", height: "40vh" }}
                  defaultValue={props.props.agencyNote}
                  className="form-control nameTransform"
                  name="note"
                  onChange={onFormChange}
                ></textarea>
              )}

              <div className="col-12 text-center mt-1">
                <div className="row justify-content-end">
            
                  <div className="col-4 d-grid">
                    <button
                      className="btn  btn-bgbClient d-flex justify-content-center align-items-center"
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
                      onClick={() => {
                        onFormSubmit();
                      }}
                    >
                      <img
                        style={{ paddingRight: "5px" }}
                        src={require("../../../images/diskette.svg").default}
                      />{" "}
                      Update
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
export default EditModal;
