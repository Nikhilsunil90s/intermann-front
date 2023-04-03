import React, { useState } from "react";
import toast from "react-hot-toast";
import { PostRoute } from "../../../components/ApisFunction/FunctionsApi";

function OfferModal(props) {
  console.log(props.Data);
  let FilePath = "";
  let MailTo;
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
                DataResponse(res);
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
                DataResponse(res);
                // MailTo = `mailto:${
                //   props.props.email
                // }?subject=offre%20intermann%20travailleur%20temporaire%20${
                //   genOfferData.company_name
                // }&body=bonjour%2c%20suite%20%c3%a0%20notre%20entretien%20t%c3%a9l%c3%a9phonique%20voici%20l%e2%80%99offre%20pour%20les%20travailleurs%20d%c3%a9tach%c3%a9s.%0d%0avous%20y%20trouverez%20${
                //   genOfferData.tax_35H
                // }%20pour%20les%20profils%20demand%c3%a9s.%0d%0aune%20fois%20l%e2%80%99offre%20retourn%c3%a9%20sign%c3%a9e%2c%20nous%20allons%20lancer%20les%20recherches%20aupr%c3%a8s%20de%20notre%20r%c3%a9seau%20en%20roumanie%2c%20de%20notre%20base%20de%20donn%c3%a9e%2c%20et%20en%20publiant%20des%20annonces%20publicitaire%20dans%20toute%20la%20r%c3%a9gion.%0d%0anous%20vous%20enverrons%20ainsi%20r%c3%a8guli%c3%a8rement%20des%20cvs%20par%20mail%20que%20vous%20devrez%20valider%20ou%20refuser.%0d%0anous%20vous%20rappelons%20que%20vous%20avez%20toujours%20la%20possibilit%c3%a9%20de%20renvoyer%20sans%20frais%20pendant%20une%20semaine%20votre%20travailleur%20si%20jamais%20celui%20ne%20convenant%20pas.%0d%0anous%20vous%20demandons%20d'%c3%aatre%20le%20plus%20r%c3%a9actif%20possible%20d%c3%a8s%20r%c3%a9ception%20de%20nos%20cvs%20pour%20ne%20pas%20perdre%20les%20candidats.%0d%0anous%20nous%20donnons%20un%20d%c3%a9lai%20de%203%20semaines%20pour%20trouver%20le%20candidat%20correspondant%20%c3%a0%20votre%20demande.%0d%0anous%20vous%20invitons%20%c3%a0%20regarder%20notre%20vid%c3%a9o%20explictive%20de%20l%e2%80%99offre%20sur%20notre%20chaine%20youtube%20ici%20%3a%0d%0ahttps%3a%2f%2fwww.youtube.com%2fwatch%3fv%3da5ug5ulpliq%26t%3d1s%0d%0aenfin%2c%20vous%20avez%20deux%20possibilit%c3%a9s%20pour%20accepter%20cette%20offre.%0d%0a1)%20la%20premi%c3%a8re%20c%e2%80%99est%20de%20la%20renvoyer%20signer%20par%20email%20%c3%a0%20contact%40intermann.ro%0D%0A2)%20La%20seconde%20c%E2%80%99est%20de%20la%20signer%20digitalement%20depuis%20votre%20PC%2FSmartphone%20en%20cliquant%20sur%20ce%20lien%20%3A%20%3a%0d%0a${`${"intermann.herokuapp.com/"}ViewOffer/${
                //   res.data._id
                // }%0d%0a`}`;
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
          console.log(props.Data, "he");
        }
        // if (JSON.stringify(data?.metier).includes(JSON.stringify(Metier))) {
        //   toast.error("already exists!");
        // } else {
        //   data.push(Metier);
        //
        // }
      }
    }
  };
  const DataResponse = (res) => {
    props.setUpdate(true);
    setResponse(true);
    FilePath = res.filepath;
    toast.success(res.message);
    props.setDownloadMailModal({
      status: true,
      filePath:FilePath,
      content: `bonjour, suite à notre entretien téléphonique voici l’offre pour les travailleurs détachés.
      vous y trouverez ${res.data.metiers.map((el=>el.tax_35H ? el.tax_35H : "0"))} en bleu le taux horaire pour les profils demandés.
      une fois l’offre retourné signée, nous allons lancer les recherches auprès de notre réseau en roumanie, de notre base de donnée, et en publiant des annonces publicitaire dans toute la région.
      nous vous enverrons ainsi règulièrement des cvs par mail que vous devrez valider ou refuser.
      nous vous rappelons que vous avez toujours la possibilité de renvoyer sans frais pendant une semaine votre travailleur si jamais celui ne convenant pas.
      nous vous demandons d'être le plus réactif possible dès réception de nos cvs pour ne pas perdre les candidats.
      nous nous donnons un délai de 3 semaines pour trouver le candidat correspondant à votre demande.
      nous vous invitons à regarder notre vidéo explictive de l’offre sur notre chaine youtube ici :
      https://www.youtube.com/watch?v=a5ug5ulpliq&t=1s
      enfin, vous avez deux possibilités pour accepter cette offre.
      1) la première c’est de la renvoyer signer par email à contact@intermann.ro
      2) la seconde c’est de la signer digitalement depuis votre pc/smartphone en cliquant sur ce lien : ${FilePath}
      `,
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
