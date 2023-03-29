import React  from "react";
import { API_BASE_URL } from "../../../config/serverApiConfig";
import "../../../CSS/Client/ArchivedCardClient.css";
import "../../../CSS/Dashboard.css";

function DocumentLink({ props, closeModal, id, ReAvance }) {
  console.log(props);
  const CloseTheModal = () => {
    closeModal(false);
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
                      Send contract to sign to :{" "}
                      <span
                        className=""
                        style={{ color: "#FE8700", marginLeft: "5px" }}
                      >
                        {props.candidatName
                          ? props.candidatName.toLocaleUpperCase()
                          : props.clientCompanyName.toLocaleUpperCase()}
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
                {" "}
                This is the contract link you need to send to the
                candidate/client via whats’app or by email : Once it will be
                signed we will receive the signed document by email and you will
                have to archive it on Drive/CRM [unique_link] :{" "}
                <span className="d-flex align-items-center">
                  {" "}
                  <img  alt="..." src={require("../../../images/LogoModal.svg").default} />
                  <a
                    style={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "16px",
                      lineHeight: "24px",
                      color: "#3F76E2",
                    }}
                    onClick={() => CloseTheModal()}
                    href={`/${
                      ReAvance === "Represent" ? `Representance` : `Avance`
                    }/documentSignForReAvance/${
                      props.candidatName
                        ? props.candidatName
                            .toLocaleUpperCase()
                            .replaceAll(" ", "")
                        : props.clientCompanyName
                            .toLocaleUpperCase()
                            .replaceAll(" ", "")
                    }/${id}`}
                    target="_blank"
                  >
                    {API_BASE_URL}
                    {ReAvance === "Represent" ? `Representance` : `Avance`}
                    /documentSignForReAvance/
                    {props.candidatName
                      ? props.candidatName
                          .toLocaleUpperCase()
                          .replaceAll(" ", "")
                      : props.clientCompanyName
                          .toLocaleUpperCase()
                          .replaceAll(" ", "")}
                    /{id}
                  </a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default DocumentLink;
