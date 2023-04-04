import React, { useState } from "react";
import toast from "react-hot-toast";
import { PostRoute } from "../../../components/ApisFunction/FunctionsApi";
import { GetWithoutAuth } from "../../../components/ApisFunction/FunctionsApi";
import { API_BASE_URL } from "../../../config/serverApiConfig";

function OfferModal(props) {
  let FilePath = "";
  const [genOfferData, setDataGenOffer] = useState({
    company_name: props.props.companyName,
    company_email: props.props.email,
    commercialLeadId: props.props._id,
  }) as any;
  const [Metier, setMetier] = useState({
    metier: "",
    salaire_35H: "", // will come with euro sign:,
    tax_35H: "", // will come with euro sign
    heure_fait: "", // will come with H
    tax_heure_fait: "", // will come with euaro sign
    supplymentry_tax: "", // will come with euro sign
    total_salaire: "", // will come with euro sign
  });
  const [response, setResponse] = useState(true);
  const onChangeGenOfferset = (e) => {
    if (e.target.name === "salaire_35H") {
      setMetier({
        ...Metier,
        [e.target.name]: e.target.value + "€",
      });
    } else if (e.target.name === "tax_35H") {
      setMetier({
        ...Metier,
        [e.target.name]: e.target.value + "€",
      });
    } else if (e.target.name === "heure_fait") {
      setMetier({
        ...Metier,
        [e.target.name]: e.target.value + "H",
      });
    } else if (e.target.name === "tax_heure_fait") {
      setMetier({
        ...Metier,
        [e.target.name]: e.target.value + "€",
      });
    } else if (e.target.name === "supplymentry_tax") {
      setMetier({
        ...Metier,
        [e.target.name]: e.target.value + "€",
      });
    } else if (e.target.name === "total_salaire") {
      setMetier({
        ...Metier,
        [e.target.name]: e.target.value + "€",
      });
    } else if (e.target.name === "metier") {
      setMetier({
        ...Metier,
        [e.target.name]: e.target.value,
      });
    } else {
      setDataGenOffer({ ...genOfferData, [e.target.name]: e.target.value });
    }
  };

  const DownLoadOffer = (response, id) => {
    GetWithoutAuth(`get-offer/?offerId=${id}`).then((res) => {
      if (res.status) {
        FilePath = API_BASE_URL + res.filepath.replace("/app/", "");
        DataResponse(response, id);
      }
    });
  };

  const GenOffer = async (e: any) => {
    if (e.target.name === "downloadPDF") {
      if (Metier.metier === "") {
        toast.error("please fill all required fields!");
      } else {
        if (props.Data.length === 0) {
          let newData = { ...genOfferData, metiers: [Metier] };
          setResponse(false);
          PostRoute(newData, "generate-offer")
            .then((res) => {
              if (res.status) {
                DownLoadOffer(res, res.data._id);
              } else {
                toast.error(res.message);
                setResponse(true);
              }
            })
            .catch((err) => err);
        } else {
          let newData = { ...genOfferData, metiers: props.Data };

          setResponse(false);
          PostRoute(newData, "generate-offer")
            .then((res) => {
              if (res.status) {
                DownLoadOffer(res, res.data._id);
              } else {
                toast.error(res.message);
                setResponse(true);
              }
            })
            .catch((err) => err);
        }
      }
    } else {
      if (Metier.metier === "") {
        toast.error("please fill all required fields!");
      } else {
        if (JSON.stringify(props.Data).includes(JSON.stringify(Metier))) {
          toast.error("already exists!");
        } else {
          toast.success("job added successfully!");
          props.Data.push(Metier);
        }
      }
    }
  };
  const DataResponse = (res, id) => {
    props.setUpdate(true);
    setResponse(true);
    // FilePath = res.filepath;
    toast.success(res.message);
    props.setDownloadMailModal({
      status: true,
      filePath: FilePath,
      id: id,
      content: `<div>bonjour, suite à notre entretien téléphonique voici l’offre pour les travailleurs détachés.</br>
      vous y trouverez ${res.data.metiers.map((el) =>
        el.tax_35H ? el.tax_35H : "0"
      )} en bleu le taux horaire pour les profils demandés.</br>
      une fois l’offre retourné signée, nous allons lancer les recherches auprès de notre réseau en roumanie, de notre base de donnée, et en publiant des annonces publicitaire dans toute la région.</br>
      nous vous enverrons ainsi règulièrement des cvs par mail que vous devrez valider ou refuser.</br>
      nous vous rappelons que vous avez toujours la possibilité de renvoyer sans frais pendant une semaine votre travailleur si jamais celui ne convenant pas.</br>
      nous vous demandons d'être le plus réactif possible dès réception de nos cvs pour ne pas perdre les candidats.</br>
      nous nous donnons un délai de 3 semaines pour trouver le candidat correspondant à votre demande.</br>
      nous vous invitons à regarder notre vidéo explictive de l’offre sur notre chaine youtube ici :</br>
      <a style="color:"#FE8700"" target="_blank" href="https://www.youtube.com/watch?v=a5ug5ulpliq&t=1s"> https://www.youtube.com/watch?v=a5ug5ulpliq&t=1s</a></br>
      enfin, vous avez deux possibilités pour accepter cette offre.</br>
      1) la première c’est de la renvoyer signer par email à contact@intermann.ro</br>
      2) la seconde c’est de la signer digitalement depuis votre pc/smartphone en cliquant sur ce lien : <a target="_blank" style="color:"#FE8700"" href="https://intermann.herokuapp.com/ViewOffer/${id}"> https://intermann.herokuapp.com/ViewOffer/${id}</a>
      </div>`,
    });
    props.closeModal(false);
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
        <div className="modal-dialog modal-lg" style={{ width: "795px" }}>
          <div className="modal-content">
            <div className="modal-header p-0">
              <div className="col-12">
                <div className="row">
                  <div className="col-8 px-0 clientArchivedModal-font">
                    <h2
                      className="modal-title  py-1 pRight"
                      id="staticBackdropLabel"
                    >
                      GENERATE OFFER
                    </h2>
                  </div>
                  <div className="col-4 text-end d-flex align-items-center">
                    <button
                      type="button"
                      onClick={() => props.closeModal(false)}
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal-body scrollbarModal text-start"
              style={{ height: "78vh" }}
            >
              <p
                className="mb-0"
                style={{
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "15px",
                  lineHeight: "24px",
                  color: "#000000",
                }}
              ></p>
              <div className="col-12">
                <div className="row">
                  <div className="col-6">
                    <div className="d-grid">
                      <label
                        style={{
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: "16px",
                          lineHeight: "24px",
                          color: "#000000",
                        }}
                      >
                        METIER
                        <span
                          style={{
                            fontFamily: "Poppins",
                            fontStyle: "normal",
                            fontWeight: "600",
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "#ff0000",
                          }}
                        >
                          *
                        </span>
                      </label>
                      <input
                        style={{
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: "400",
                          fontSize: "13px",
                          lineHeight: "24px",
                          color: "#000000",
                        }}
                        defaultValue={Metier.metier}
                        onChange={(e) => onChangeGenOfferset(e)}
                        placeholder="JOB NAME"
                        name="metier"
                        className="form-control fontsizeModal"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <label
                      style={{
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "600",
                        fontSize: "16px",
                        lineHeight: "24px",
                        color: "#000000",
                      }}
                    >
                      NOM SOCIETE
                    </label>
                    <input
                      style={{
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "400",
                        fontSize: "13px",
                        lineHeight: "24px",
                        color: "#000000",
                      }}
                      defaultValue={props.props.companyName}
                      onChange={(e) => onChangeGenOfferset(e)}
                      placeholder="COMPANY NAME"
                      name="company_name"
                      className="form-control fontsizeModal"
                    />
                  </div>
                  <div className="col-6 mt-1">
                    <label
                      style={{
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "600",
                        fontSize: "16px",
                        lineHeight: "24px",
                        color: "#000000",
                      }}
                    >
                      SALAIRE 35H
                    </label>
                    <input
                      style={{
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "400",
                        fontSize: "13px",
                        lineHeight: "24px",
                        color: "#000000",
                      }}
                      type="number"
                      onChange={(e) => onChangeGenOfferset(e)}
                      placeholder="SALAIRE 35H"
                      name="salaire_35H"
                      defaultValue={
                        Metier.salaire_35H ? Metier.salaire_35H : ""
                      }
                      className="form-control fontsizeModal"
                    />
                  </div>
                  <div className="col-6 mt-1">
                    <label
                      style={{
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "600",
                        fontSize: "16px",
                        lineHeight: "24px",
                        color: "#000000",
                      }}
                    >
                      TAUX HORRAIRE 35H
                    </label>
                    <input
                      style={{
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "400",
                        fontSize: "13px",
                        lineHeight: "24px",
                        color: "#000000",
                      }}
                      defaultValue={Metier.tax_35H}
                      type="number"
                      onChange={(e) => onChangeGenOfferset(e)}
                      placeholder="TAUX HORRAIRE 35H"
                      name="tax_35H"
                      className="form-control fontsizeModal"
                    />
                  </div>
                  <div className="col-6 mt-1">
                    <label
                      style={{
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "600",
                        fontSize: "16px",
                        lineHeight: "24px",
                        color: "#000000",
                      }}
                    >
                      NOMBRE HEURE FORFAIT
                    </label>
                    <input
                      style={{
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "400",
                        fontSize: "13px",
                        lineHeight: "24px",
                        color: "#000000",
                      }}
                      defaultValue={Metier.heure_fait}
                      type="number"
                      onChange={(e) => onChangeGenOfferset(e)}
                      placeholder="NOMBRE HEURE FORFAIT"
                      name="heure_fait"
                      className="form-control fontsizeModal"
                    />
                  </div>
                  <div className="col-6 mt-1">
                    <label
                      style={{
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "600",
                        fontSize: "16px",
                        lineHeight: "24px",
                        color: "#000000",
                      }}
                    >
                      TAUX HORAIRE FORFAIT
                    </label>
                    <input
                      style={{
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "400",
                        fontSize: "13px",
                        lineHeight: "24px",
                        color: "#000000",
                      }}
                      defaultValue={Metier.tax_heure_fait}
                      type="number"
                      onChange={(e) => onChangeGenOfferset(e)}
                      placeholder="TAUX HORAIRE FORFAIT"
                      name="tax_heure_fait"
                      className="form-control fontsizeModal"
                    />
                  </div>
                  <div className="col-12 mt-1">
                    <label
                      style={{
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "600",
                        fontSize: "16px",
                        lineHeight: "24px",
                        color: "#000000",
                      }}
                    >
                      TAUX HORAIRE HEURE SUPPLEMENTAIRE
                    </label>
                    <input
                      style={{
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "400",
                        fontSize: "13px",
                        lineHeight: "24px",
                        color: "#000000",
                      }}
                      type="number"
                      defaultValue={Metier.supplymentry_tax}
                      onChange={(e) => onChangeGenOfferset(e)}
                      placeholder="TAUX HORAIRE HEURE SUPPLEMENTAIRE"
                      name="supplymentry_tax"
                      className="form-control fontsizeModal"
                    />
                  </div>
                  <div className="col-12 mt-1">
                    <label
                      style={{
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "600",
                        fontSize: "16px",
                        lineHeight: "24px",
                        color: "#000000",
                      }}
                      className=""
                    >
                      SALAIRE TOTAL
                    </label>
                    <input
                      style={{
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "400",
                        fontSize: "13px",
                        lineHeight: "24px",
                        color: "#000000",
                      }}
                      defaultValue={Metier.total_salaire}
                      type="number"
                      onChange={(e) => onChangeGenOfferset(e)}
                      placeholder="SALAIRE TOTAL"
                      name="total_salaire"
                      className="form-control fontsizeModal"
                    />
                  </div>

                  <div className="col-12 d-flex justify-content-end align-items-center mt-2">
                    {response ? (
                      <button
                        className="leadsAddToCRM"
                        name="downloadPDF"
                        style={{ width: "350px" }}
                        onClick={(e) => GenOffer(e)}
                      >
                        Download PDF and send by email
                      </button>
                    ) : (
                      <button
                        className="leadsAddToCRM"
                        style={{ width: "350px" }}
                      >
                        {" "}
                        <div className="d-flex justify-content-center align-items-center">
                          Please Wait !!
                          <span
                            className="filterLeadsLoader mx-2"
                            style={{
                              width: "32px",
                              height: "32px",
                              borderColor: "#0066ff transparent",
                            }}
                          />
                        </div>
                      </button>
                    )}
                    <button
                      name="newJob"
                      onClick={(e) => GenOffer(e)}
                      className="leadsGenOffer"
                    >
                      Add a New Job
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
export default OfferModal;
