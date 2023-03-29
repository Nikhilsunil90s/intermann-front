import React, { useEffect, useState } from "react";
import LoaderLoad from "../../components/Loader/loader";
import { API_BASE_URL } from "../../config/serverApiConfig";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

function Representance({ props, closeModal, rePid, LinkModal, setReAvance }) {
  const [DataP, setDataP] = useState() as any;
  const [id, setId] = useState(null);
  const RepresentFormat = {
    representenceId: id,
    candidat: props._id,
    candidatName: props.candidatName,
    candidatPhone: props.candidatPhone !== "" ? props.candidatPhone : "",
    candidat_birthday: DataP
      ? DataP.candidat_birthday
        ? DataP.candidat_birthday
        : ""
      : "",
    candidat_birthcity: DataP
      ? DataP.candidat_birthcity
        ? DataP.candidat_birthcity
        : ""
      : "",
    debut_mission_date: DataP
      ? DataP.debut_mission_date
        ? DataP.debut_mission_date
        : ""
      : "",
    fin_mission_date: DataP
      ? DataP.fin_mission_date
        ? DataP.fin_mission_date
        : ""
      : "",
    company_address: DataP
      ? DataP.company_address
        ? DataP.company_address
        : ""
      : "",
    company_name: DataP ? (DataP.company_name ? DataP.company_name : "") : "",
  };
  const [data, setData] = useState(RepresentFormat);
  const [DateFin, setFinDate] = useState("");
  const [debutMiss, setDebutMiss] = useState("");
  const [candiateBirth, setcandiateBirth] = useState("");
  const [Loader, setLoader] = useState(false);

  useEffect(() => {
    GetRepresentance();
  }, []);

  const GetRepresentance = async () => {
    setLoader(true);
    let headers = {
      Accept: "application/json",
      Authorization: "Bearer " + Cookies.get("token"),
    };
    return await fetch(
      API_BASE_URL + `getCandidatRepresentence/?candidatId=${props._id}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((reD) => reD.json())
      .then((resD) => {
        if (resD.status) {
          setDataP(resD.data);
          RepresentFormat.representenceId = resD.data._id;
          RepresentFormat.candidat_birthcity = resD.data.candidat_birthcity;
          RepresentFormat.candidat_birthday = resD.data.candidat_birthday;
          RepresentFormat.debut_mission_date = resD.data.debut_mission_date;
          RepresentFormat.fin_mission_date = resD.data.fin_mission_date;
          RepresentFormat.company_address = resD.data.company_address;
          RepresentFormat.company_name = resD.data.company_name;
          setId(resD.data._id);
          rePid(resD.data._id);
          setLoader(false);
          if (resD.data.candidat_birthday) {
            var tempDate = new Date(resD.data.candidat_birthday);
            var formattedDate = [
              tempDate.getMonth() + 1,
              tempDate.getDate(),
              tempDate.getFullYear(),
            ].join("-");
            setcandiateBirth(formattedDate);
          }
          if (resD.data.debut_mission_date) {
            var tempDate = new Date(resD.data.debut_mission_date);
            var formattedDate = [
              tempDate.getMonth() + 1,
              tempDate.getDate(),
              tempDate.getFullYear(),
            ].join("-");
            setDebutMiss(formattedDate);
          }
          if (resD.data.fin_mission_date) {
            var tempDate = new Date(resD.data.fin_mission_date);
            var formattedDate = [
              tempDate.getDate(),
              tempDate.getMonth() + 1,
              tempDate.getFullYear(),
            ].join("-");
            setFinDate(formattedDate);
          }
        } else {
          setLoader(false);
        }
      })
      .catch((err) => err);
  };

  const onFormChange = (e) => {
    if (e.target.name === "candidat_birthday") {
      var tempDate = new Date(e.target.value);
      var formattedDate = [
        tempDate.getDate(),
        tempDate.getMonth() + 1,
        tempDate.getFullYear(),
      ].join("-");
      RepresentFormat.candidat_birthday = formattedDate;
    } else if (e.target.name === "debut_mission_date") {
      var tempDate = new Date(e.target.value);
      var formattedDate = [
        tempDate.getDate(),
        tempDate.getMonth() + 1,
        tempDate.getFullYear(),
      ].join("-");
      RepresentFormat.debut_mission_date = formattedDate;
    } else if (e.target.name === "fin_mission_date") {
      var tempDate = new Date(e.target.value);
      var formattedDate = [
        tempDate.getDate(),
        tempDate.getMonth() + 1,
        tempDate.getFullYear(),
      ].join("-");
      RepresentFormat.fin_mission_date = formattedDate;
    } else if (e.target.name === "candidat_birthcity") {
      RepresentFormat.candidat_birthcity = e.target.value;
    } else if (e.target.name === "company_name") {
      RepresentFormat.company_name = e.target.value;
    } else if (e.target.name === "company_address") {
      RepresentFormat.company_address = e.target.value;
    }
  };
  const FormSubmit = (e) => {
    console.log(RepresentFormat, data, id);
    setLoader(true);
    if (e.target.name == "Generate") {
      fetch(API_BASE_URL + "generateRepresentence", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("token"),
        },
        body: JSON.stringify(RepresentFormat),
      })
        .then((resp) => resp.json())
        .then((reD) => {
          if (reD.status) {
            toast.success(reD.message);
            setTimeout(() => {
              setLoader(false);
              closeModal(false);
              window.open(API_BASE_URL + reD.filePath.replace("/app/", ""));
            }, 2000);
          } else {
            setLoader(false);
          }
        })
        .catch((err) => err);
    } else if (e.target.name === "DOCUSIGN") {
      fetch(API_BASE_URL + "saveRepresentence", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("token"),
        },
        body: JSON.stringify(RepresentFormat),
      })
        .then((resp) => resp.json())
        .then((reD) => {
          if (reD.status) {
            toast.success(reD.message);
            setLoader(false);
            setReAvance("Represent");
            rePid(reD.representenceid);
            closeModal(false);
            LinkModal(true);
          } else {
            setLoader(false);
          }
        })
        .catch((err) => err);
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
        <div className="modal-dialog" style={{ maxWidth: "809px" }}>
          <div className="modal-content" style={{ width: "870px" }}>
            <div className="modal-header">
              <h5
                className="modal-title modalStylingfont"
                id="exampleModalLabel"
              >
                Générer représentance{" "}
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
            <div className="modal-body">
              <div className="col-12">
                {Loader ? (
                  <div className="row justify-content-center">
                    <LoaderLoad />
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-4">
                      <label className="ChildStylePreModal">
                        candidat_name
                      </label>
                      <input
                        className="form-control"
                        defaultValue={props.candidatName.toLocaleUpperCase()}
                        style={{ fontSize: "12px", fontFamily: "Poppins" }}
                        placeholder="candidate_birthday_date"
                        name="candidatName"
                        disabled
                      />
                    </div>
                    <div className="col-4">
                      <label className="ChildStylePreModal">
                        candidate_birthday_date
                      </label>
                      <input
                        className="form-control"
                        type={"date"}
                        onChange={onFormChange}
                        defaultValue={
                          DataP
                            ? DataP.candidat_birthday
                              ? candiateBirth
                              : ""
                            : ""
                        }
                        name="candidat_birthday"
                        style={{ fontSize: "12px", fontFamily: "Poppins" }}
                        placeholder="candidate_birthday_date"
                      />
                    </div>
                    <div className="col-4">
                      <label className="ChildStylePreModal">
                        candidate_birth_city
                      </label>
                      <input
                        className="form-control"
                        onChange={onFormChange}
                        defaultValue={
                          DataP
                            ? DataP.candidat_birthcity
                              ? DataP.candidat_birthcity
                              : ""
                            : ""
                        }
                        style={{ fontSize: "12px", fontFamily: "Poppins" }}
                        placeholder="candidat_birthcity"
                        name="candidat_birthcity"
                      />
                    </div>
                    <div className="col-4 mt-1">
                      <label className="ChildStylePreModal">
                        debut_mission
                      </label>
                      <input
                        className="form-control"
                        type={"date"}
                        onChange={onFormChange}
                        style={{ fontSize: "12px", fontFamily: "Poppins" }}
                        defaultValue={
                          DataP
                            ? DataP.debut_mission_date
                              ? debutMiss
                              : ""
                            : ""
                        }
                        placeholder="debut_mission_date"
                        name="debut_mission_date"
                      />
                    </div>
                    <div className="col-4 mt-1">
                      <label className="ChildStylePreModal">fin_mission</label>
                      <input
                        className="form-control"
                        type={"date"}
                        onChange={onFormChange}
                        style={{ fontSize: "12px", fontFamily: "Poppins" }}
                        defaultValue={
                          DataP ? (DataP.fin_mission_date ? DateFin : "") : ""
                        }
                        placeholder="fin_mission_date"
                        name="fin_mission_date"
                      />
                    </div>
                    <div className="col-4 mt-1">
                      <label className="ChildStylePreModal">company_name</label>
                      <input
                        className="form-control"
                        onChange={onFormChange}
                        style={{ fontSize: "12px", fontFamily: "Poppins" }}
                        defaultValue={
                          DataP
                            ? DataP.company_name
                              ? DataP.company_name
                              : ""
                            : ""
                        }
                        placeholder="company_adress"
                        name="company_name"
                      />
                    </div>
                    <div className="col-4 mt-1">
                      <label className="ChildStylePreModal">
                        company_adress
                      </label>
                      <input
                        className="form-control"
                        onChange={onFormChange}
                        defaultValue={
                          DataP
                            ? DataP.company_address
                              ? DataP.company_address
                              : ""
                            : ""
                        }
                        style={{ fontSize: "12px", fontFamily: "Poppins" }}
                        placeholder="company_adress"
                        name="company_address"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div> </div>
              <div></div>
            </div>
            <div className="modal-footer">
              <div className="col-12">
                <div className="row justify-content-end">
                  <div className="col-3 ">
                    <button
                      type="button"
                      onClick={(e) => FormSubmit(e)}
                      name="Generate"
                      className="btn preSelectedStageBtn"
                      style={{ width: "100%", background: "#3F76E2" }}
                    >
                      Generate the PDF
                    </button>
                  </div>
                  <div className="col-4">
                    <button
                      type="button"
                      onClick={(e) => FormSubmit(e)}
                      name="DOCUSIGN"
                      className="btn preSelectedStageBtn"
                      style={{ width: "100%", background: "#032339" }}
                    >
                      DOCUSIGN DOC
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
export default Representance;
