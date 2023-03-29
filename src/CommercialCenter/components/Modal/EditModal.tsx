import React, { useState } from "react";
import { API_BASE_URL } from "../../../config/serverApiConfig";
import { toast } from "react-hot-toast";
import Cookies from 'js-cookie'

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
          Authorization: "Bearer " + Cookies.get("token"),
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.status) {
          toast.success(res.message);
          if(props.CurrentFilter.FilterData.length !== 0){
            props.setCurrentFilter({...props.CurrentFilter,filterApplied:true})
          }else{
            props.setCurrentFilter({...props.CurrentFilter,filterApplied:false})
            props.update(true);
          }
        
       
          setTimeout(()=>{
            props.closeModal(false);
          },1000)
    
        } else {
          toast.success(res.message);
          props.closeModal(false);
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
        <div
       
          className="modal-dialog modal-lg"
          style={{ width: "795px" ,top:"15%"}}
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
            <div className="modal-body text-start ">
              {props.Status == "Name" ? (
                <label className="topTitle">Company Name </label>
              ) : props.Status === "Num1" ? (
                <label className="topTitle">Téléphone 1</label>
              ) : props.Status === "Num2" ? (
                <label className="topTitle">Téléphone 2</label>
              ) : props.Status === "CNote" ? (
                <label className="topTitle">Note fournis par le client</label>
              ) : props.Status === "email" ? (
                <label className="topTitle">Email</label>
              ) : (
                <label className="topTitle"> Notes de l'agence Intermann sur le client</label>
              )}
              {props.Status == "Name" ? (
                <input
                  className="form-control fontsizeModal"
                  name="newName"
                  defaultValue={props.props.companyName}
                  onChange={onFormChange}
                />
              ) : props.Status === "Num1" ? (
                <input
                  className="form-control fontsizeModal"
                  type={"number"}
                  name="phoneNumber1"
                  defaultValue={props.props.phoneNumber1}
                  onChange={onFormChange}
                />
              ) : props.Status === "Num2" ? (
                <input
                  className="form-control fontsizeModal"
                  type={"number"}
                  name="phoneNumber2"
                  defaultValue={props.props.phoneNumber2}
                  onChange={onFormChange}
                />
              ) : props.Status === "email" ? (
                <input
                  className="form-control fontsizeModal"
                  type={"email"}
                  defaultValue={props.props.email}
                  name="newEmail"
                  onChange={onFormChange}
                />
              ) : props.Status === "CNote" ? (
                <textarea
                  style={{  height: "40vh" }}
                  defaultValue={props.props.companyNote}
                  className="form-control fontsizeModal nameTransform"
                  name="note"
                  onChange={onFormChange}
                ></textarea>
              ) : (
                <textarea
                  style={{  height: "40vh" }}
                  defaultValue={props.props.agencyNote}
                  className="form-control fontsizeModal nameTransform"
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
                      alt="..."
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
        </div>
      </div>
    </>
  );
}
export default EditModal;
