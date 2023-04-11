import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { PostRoute } from "../../../components/ApisFunction/FunctionsApi";
import { GetWithoutAuth } from "../../../components/ApisFunction/FunctionsApi";
import { API_BASE_URL } from "../../../config/serverApiConfig";

function OfferModal(props) {
  let FilePath = "";
  const [mainData, setMainData] = useState(props.Data);
  const [isChecked, setIsChecked] = useState(false);
  const [genOfferData, setDataGenOffer] = useState({
    company_name: props.props.companyName,
    company_email: props.props.email,
    commercialLeadId: props.props._id,
  }) as any;
  const [form_values, setformValues] = useState({
    metier: "",
    salaire_35H: "",
    panier_repas: false,
    heure_fait: "",
    tax_heure_fait: "",
    supplymentry_tax: "",
    total_salaire: "",
  })
  const [Metier, setMetier] = useState({
    metier: "",
    salaire_35H: "", // will come with euro sign:,
    panier_repas: false,
    heure_fait: "", // will come with H
    tax_heure_fait: "", // will come with euaro sign
    supplymentry_tax: "", // will come with euro sign
    total_salaire: "", // will come with euro sign
  });
  const [response, setResponse] = useState(true);
  const [panierDisponible, setPanierDisponible] = useState("Non");

  const handleClose = () => {
    console.log('Close Called for Reset!')
    setMainData([]);
    setPanierDisponible('Non');
    setIsChecked(false);
    setformValues({
      metier: "",
      salaire_35H: "",
      panier_repas: false,
      heure_fait: "",
      tax_heure_fait: "",
      supplymentry_tax: "",
      total_salaire: "",
    })
    setMetier({
      metier: "",
      salaire_35H: "", // will come with euro sign:,
      panier_repas: false,
      heure_fait: "", // will come with H
      tax_heure_fait: "", // will come with euaro sign
      supplymentry_tax: "", // will come with euro sign
      total_salaire: "",
    })
    setDataGenOffer({
      company_name: "",
      company_email: "",
      commercialLeadId: "",
    })
    props.closeModal(false);
  }

  const onChangeGenOfferset = (e) => {
    if (e.target.name === "salaire_35H") {
      setMetier({
        ...Metier,
        [e.target.name]: e.target.value + "€",
      });
      setformValues({ ...form_values, [e.target.name]: e.target.value })
    } else if (e.target.name === "panier_repas") {
      setMetier({
        ...Metier,
        [e.target.name]: e.target.checked,
      });
      setformValues({ ...form_values, [e.target.name]: e.target.checked })
    } else if (e.target.name === "heure_fait") {
      setMetier({
        ...Metier,
        [e.target.name]: e.target.value + "H",
      });
      setformValues({ ...form_values, [e.target.name]: e.target.value })
    } else if (e.target.name === "tax_heure_fait") {
      setMetier({
        ...Metier,
        [e.target.name]: e.target.value + "€",
      });
      setformValues({ ...form_values, [e.target.name]: e.target.value })
    } else if (e.target.name === "supplymentry_tax") {
      setMetier({
        ...Metier,
        [e.target.name]: e.target.value + "€",
      });
      setformValues({ ...form_values, [e.target.name]: e.target.value })
    } else if (e.target.name === "total_salaire") {
      setMetier({
        ...Metier,
        [e.target.name]: e.target.value + "€",
      });
      setformValues({ ...form_values, [e.target.name]: e.target.value })
    } else if (e.target.name === "metier") {
      setMetier({
        ...Metier,
        [e.target.name]: e.target.value,
      });
      setformValues({ ...form_values, [e.target.name]: e.target.value })
    } else {
      console.log(e.target.name, e.target.value);
      setDataGenOffer({ ...genOfferData, [e.target.name]: e.target.value });
      setformValues({ ...form_values, [e.target.name]: e.target.value })
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
    console.log(e.target.name);
    if (e.target.name === "downloadPDF") {
      if (Metier.metier === "") {
        toast.error("please fill all required fields!");
      } else {
        if (mainData.length === 0) {
          let newData = { ...genOfferData, metiers: [Metier] };
          console.log(newData);
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
          if (Metier.metier !== "") {
            if (!JSON.stringify(mainData).includes(JSON.stringify(Metier))) {
              setMainData([...mainData, Metier]);
              let newData = { ...genOfferData, metiers: [...mainData, Metier] };
              console.log(newData);
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
              let newData = { ...genOfferData, metiers: mainData };
              setResponse(false);
              console.log(newData);
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


          } else {


          }


        }
      }
    } else {
      if (Metier.metier === "") {
        toast.error("please fill all required fields!");
      } else {
        if (JSON.stringify(mainData).includes(JSON.stringify(Metier))) {
          toast.error("already exists!");
        } else {
          toast.success("Job Added Successfully!");
          setMainData([...mainData, Metier]);
          setPanierDisponible("Non");
          setIsChecked(false);
          setformValues({
            metier: "",
            salaire_35H: "", // will come with euro sign:,
            panier_repas: false, // 
            heure_fait: "", // will come with H
            tax_heure_fait: "", // will come with euaro sign
            supplymentry_tax: "", // will come with euro sign
            total_salaire: "",
          })
          setMetier({
            metier: "",
            salaire_35H: "", // will come with euro sign:,
            panier_repas: false,
            heure_fait: "", // will come with H
            tax_heure_fait: "", // will come with euaro sign
            supplymentry_tax: "", // will come with euro sign
            total_salaire: "",
          })
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
      content: `<div><p>Bonjour, suite à notre entretien téléphonique voici l’offre pour les travailleurs détachés.</p>
      <p><strong>Vous y trouverez en bleu le taux horaire pour les profils demandés.</strong></p>
      <p>Une fois l’offre retourné signée, nous allons lancer les recherches auprès de notre réseau en Roumanie, de notre base de donnée, et en publiant des annonces publicitaire dans toute la région.</p>
      <p>Nous vous enverrons ainsi régulièrement des CVs par mail que vous devrez valider ou refuser.  Aussi, nous vous rappelons que vous avez toujours la possibilité de renvoyer sans frais pendant une semaine votre travailleur si jamais celui ne convenait pas.</p>
      <p>Nous vous demandons d'être le plus réactif possible dès réception de nos CVs pour ne pas perdre les candidats.</p>
      <p>Nous nous donnons un délai de 3 semaines pour trouver le candidat correspondant à votre demande.</p>
      <p>Vous pouvez regarder notre vidéo explicative de l’offre sur notre chaine YouTube ici :      <a target="_blank" href="https://www.youtube.com/watch?v=a5ug5ulpliq&t=1s"> https://www.youtube.com/watch?v=a5ug5ulpliq&t=1s </a></p>
      <p>Enfin, vous avez deux possibilités pour accepter cette offre.</p>
      <p>1) la première c’est de la renvoyer signer par email à contact@intermann.ro</p>
      <p>2) la seconde c’est de la signer digitalement depuis votre PC/Smartphone en cliquant sur ce lien :      <a target="_blank" href="https://intermann.herokuapp.com/ViewOffer/${id}"> https://intermann.herokuapp.com/ViewOffer/${id}</a></p>
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
                      onClick={() => handleClose()}
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
                        value={form_values.metier || ""}
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
                      value={
                        form_values.salaire_35H || ""
                      }
                      className="form-control fontsizeModal"
                    />
                  </div>
                  <div className="col-6 mt-1 align-items-center">
                    <p style={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: "600",
                      fontSize: "16px",
                      lineHeight: "24px",
                      color: "#000000",
                    }}>PANIER REPAS ?
                    </p>
                    <div className="check-box flex flex-row d-flex justify-content-center align-items-center">
                      <input
                        className=""
                        type="checkbox"
                        id={`panier_repas`}
                        name="panier_repas"
                        checked={isChecked}
                        onChange={(e) => {
                          setPanierDisponible(e.target.checked ? "Oui" : "Non");
                          setIsChecked(e.target.checked);
                          onChangeGenOfferset(e)
                        }
                        }
                      />
                      <label
                        className="mb-0 ml-2 cursor-pointer"
                        htmlFor={`panier_repas`}
                      >
                        <span style={{
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: "400",
                          fontSize: "12px",
                          lineHeight: "24px",
                          color: "#000000",
                        }}>{panierDisponible}</span>
                      </label>
                    </div>
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
                      value={form_values.heure_fait || ""}
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
                      value={form_values.tax_heure_fait || ""}
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
                      value={form_values.supplymentry_tax || ""}
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
                      value={form_values.total_salaire || ""}
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
