import React, { useState, useEffect } from "react";
import "../../CSS/PreModal.css";
import { API_BASE_URL } from "../../config/serverApiConfig";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/loader";
import Cookies from "js-cookie";

function PdfModal({ props, closeModal, LinkModal, path }) {
  const PdfFormat = {
    numero_contract: props.clientContract
      ? props.clientContract.numero_contract !== ""
        ? props.clientContract.numero_contract
        : ""
      : "",
    initial_client_company: props.clientCompanyName
      ? props.clientCompanyName
      : "",
    siret: props.clientContract
      ? props.clientContract.siret !== ""
        ? props.clientContract.siret
        : ""
      : "",
    numero_tva: props.clientContract
      ? props.clientContract.numero_tva !== ""
        ? props.clientContract.numero_tva
        : ""
      : "",
    nom_gerant: props.clientContract
      ? props.clientContract.nom_gerant !== ""
        ? props.clientContract.nom_gerant
        : ""
      : "",
    telephone_gerant: props.clientContract
      ? props.clientContract.telephone_gerant !== ""
        ? props.clientContract.telephone_gerant
        : ""
      : "",
    metier_en_roumain: props.clientContract
      ? props.clientContract.metier_en_roumain !== ""
        ? props.clientContract.metier_en_roumain
        : ""
      : "",
    metier_en_francais: props.clientContract
      ? props.clientContract.metier_en_francais !== ""
        ? props.clientContract.metier_en_francais
        : ""
      : "",
    debut_date: props.clientContract
      ? props.clientContract.debut_date !== ""
        ? props.clientContract.debut_date
        : ""
      : "",
    date_fin_mission: props.clientContract
      ? props.clientContract.date_fin_mission !== ""
        ? props.clientContract.date_fin_mission
        : ""
      : "",
    prix_per_heure: props.clientContract
      ? props.clientContract.prix_per_heure !== ""
        ? props.clientContract.prix_per_heure
        : ""
      : "",
    salaire_euro: props.clientContract
      ? props.clientContract.salaire_euro !== ""
        ? props.clientContract.salaire_euro
        : ""
      : "",
    nombre_heure: props.clientContract
      ? props.clientContract.nombre_heure !== ""
        ? props.clientContract.nombre_heure
        : ""
      : "",
    worker_number_1: props.clientContract
      ? props.clientContract.worker_number_1 !== ""
        ? props.clientContract.worker_number_1
        : ""
      : "",
    worker_name_1: props.clientContract
      ? props.clientContract.worker_name_1 !== ""
        ? props.clientContract.worker_name_1
        : ""
      : "",
    worker_number_2: props.clientContract
      ? props.clientContract.worker_number_2 !== ""
        ? props.clientContract.worker_number_2
        : ""
      : "",
    worker_name_2: props.clientContract
      ? props.clientContract.worker_name_2 !== ""
        ? props.clientContract.worker_name_2
        : ""
      : "",
    worker_number_3: props.clientContract
      ? props.clientContract.worker_number_3 !== ""
        ? props.clientContract.worker_number_3
        : ""
      : "",
    worker_name_3: props.clientContract
      ? props.clientContract.worker_name_3 !== ""
        ? props.clientContract.worker_name_3
        : ""
      : "",
    worker_number_4: props.clientContract
      ? props.clientContract.worker_number_4 !== ""
        ? props.clientContract.worker_number_4
        : ""
      : "",
    worker_name_4: props.clientContract
      ? props.clientContract.worker_name_4 !== ""
        ? props.clientContract.worker_name_4
        : ""
      : "",
    worker_number_5: props.clientContract
      ? props.clientContract.worker_number_5 !== ""
        ? props.clientContract.worker_number_5
        : ""
      : "",
    worker_name_5: props.clientContract
      ? props.clientContract.worker_name_5 !== ""
        ? props.clientContract.worker_name_5
        : ""
      : "",
    worker_number_6: props.clientContract
      ? props.clientContract.worker_number_6 !== ""
        ? props.clientContract.worker_number_6
        : ""
      : "",
    worker_name_6: props.clientContract
      ? props.clientContract.worker_name_6 !== ""
        ? props.clientContract.worker_name_6
        : ""
      : "",
    worker_number_7: props.clientContract
      ? props.clientContract.worker_number_7 !== ""
        ? props.clientContract.worker_number_7
        : ""
      : "",
    worker_name_7: props.clientContract
      ? props.clientContract.worker_name_7 !== ""
        ? props.clientContract.worker_name_7
        : ""
      : "",
    worker_number_8: props.clientContract
      ? props.clientContract.worker_number_8 !== ""
        ? props.clientContract.worker_number_8
        : ""
      : "",
    worker_name_8: props.clientContract
      ? props.clientContract.worker_name_8 !== ""
        ? props.clientContract.worker_name_8
        : ""
      : "",
      worker_number_9: props.clientContract
      ? props.clientContract.worker_number_1 !== ""
        ? props.clientContract.worker_number_1
        : ""
      : "",
    worker_name_9: props.clientContract
      ? props.clientContract.worker_name_1 !== ""
        ? props.clientContract.worker_name_1
        : ""
      : "",
    worker_number_10: props.clientContract
      ? props.clientContract.worker_number_2 !== ""
        ? props.clientContract.worker_number_2
        : ""
      : "",
    worker_name_10: props.clientContract
      ? props.clientContract.worker_name_2 !== ""
        ? props.clientContract.worker_name_2
        : ""
      : "",
    worker_number_11: props.clientContract
      ? props.clientContract.worker_number_3 !== ""
        ? props.clientContract.worker_number_3
        : ""
      : "",
    worker_name_11: props.clientContract
      ? props.clientContract.worker_name_3 !== ""
        ? props.clientContract.worker_name_3
        : ""
      : "",
    worker_number_12: props.clientContract
      ? props.clientContract.worker_number_4 !== ""
        ? props.clientContract.worker_number_4
        : ""
      : "",
    worker_name_12: props.clientContract
      ? props.clientContract.worker_name_4 !== ""
        ? props.clientContract.worker_name_4
        : ""
      : "",
    worker_number_13: props.clientContract
      ? props.clientContract.worker_number_5 !== ""
        ? props.clientContract.worker_number_5
        : ""
      : "",
    worker_name_13: props.clientContract
      ? props.clientContract.worker_name_5 !== ""
        ? props.clientContract.worker_name_5
        : ""
      : "",
    worker_number_14: props.clientContract
      ? props.clientContract.worker_number_6 !== ""
        ? props.clientContract.worker_number_6
        : ""
      : "",
    worker_name_14: props.clientContract
      ? props.clientContract.worker_name_6 !== ""
        ? props.clientContract.worker_name_6
        : ""
      : "",
    worker_number_15: props.clientContract
      ? props.clientContract.worker_number_7 !== ""
        ? props.clientContract.worker_number_7
        : ""
      : "",
    worker_name_15: props.clientContract
      ? props.clientContract.worker_name_7 !== ""
        ? props.clientContract.worker_name_7
        : ""
      : "",
    worker_number_16: props.clientContract
      ? props.clientContract.worker_number_8 !== ""
        ? props.clientContract.worker_number_8
        : ""
      : "",
    worker_name_16: props.clientContract
      ? props.clientContract.worker_name_8 !== ""
        ? props.clientContract.worker_name_8
        : ""
      : "",
      worker_number_17: props.clientContract
      ? props.clientContract.worker_number_5 !== ""
        ? props.clientContract.worker_number_5
        : ""
      : "",
    worker_name_17: props.clientContract
      ? props.clientContract.worker_name_5 !== ""
        ? props.clientContract.worker_name_5
        : ""
      : "",
    worker_number_18: props.clientContract
      ? props.clientContract.worker_number_6 !== ""
        ? props.clientContract.worker_number_6
        : ""
      : "",
    worker_name_18: props.clientContract
      ? props.clientContract.worker_name_6 !== ""
        ? props.clientContract.worker_name_6
        : ""
      : "",
    worker_number_19: props.clientContract
      ? props.clientContract.worker_number_7 !== ""
        ? props.clientContract.worker_number_7
        : ""
      : "",
    worker_name_19: props.clientContract
      ? props.clientContract.worker_name_7 !== ""
        ? props.clientContract.worker_name_7
        : ""
      : "",
    worker_number_20: props.clientContract
      ? props.clientContract.worker_number_8 !== ""
        ? props.clientContract.worker_number_8
        : ""
      : "",
    worker_name_20: props.clientContract
      ? props.clientContract.worker_name_8 !== ""
        ? props.clientContract.worker_name_8
        : ""
      : "",
    clientId: props._id ? props._id : "",
    contractId: props.clientContract
      ? props.clientContract._id !== ""
        ? props.clientContract._id
        : ""
      : "",
    clientAddress: props.clientAddress ? props.clientAddress : "",
    clientEmail: props.clientEmail ? props.clientEmail.toLowerCase() : "",
    poste_du_gerant: props.clientContract
      ? props.clientContract.poste_du_gerant !== ""
        ? props.clientContract.poste_du_gerant
        : ""
      : "",
  };
  const [data, setData] = useState(PdfFormat);
  const [loader, setLoader] = useState(false);
  const [Btndisabled, setBtndisabled] = useState(false);

  const onFormDataChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | any
    >
  ) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addContract = async () => {
    return await fetch(API_BASE_URL + "addClientContractToCRM", {
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

  const generatePDF = async () => {
    setLoader(true);
    return await fetch(API_BASE_URL + "makeClientContract", {
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

  const addContractToCRM = (e) => {
    setBtndisabled(true);
    addContract().then((result) => {
      if (result.status == true) {
        toast.success("Contract Added To CRM Successfully!");
        setTimeout(() => {
          if (e.target.name == "ADDtoCRM") {
            window.location.reload();
          }
          if (e.target.name == "DOCU") {
            setBtndisabled(false);
            if (path === "/clientTodo/clientToDoProfile") {
              closeModal(false);
              LinkModal(true);
            }
            if (path === "/clientProgress/clientInProgressProfile") {
              closeModal(false);
              LinkModal(true);
            }
            if (path === "/archived/archivedClientSeeprofile") {
              closeModal(false);
              LinkModal(true);
            }
            if (path === "/clientContract/clientSigned") {
              closeModal(false);
              LinkModal(true);
            }
          }
        }, 2000);
      }
      if (result.status == false) {
        toast.success("Contract Added Not Successfully!");
      }
    });
  };

  // console.log(props,"props")
  const invokeGeneratePDF = () => {
    generatePDF()
      .then((result) => {
        setLoader(false);
        if (result.status) {
          let splittedFilePath = result.filePath.split("/app/");
          window.open(API_BASE_URL + splittedFilePath[1]);
        }
      })
      .catch((err) => {
        console.log(err);
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
          <div className="modal-content modalScreenSize ">
            {loader ? (
              <>
                <div className=" modal-header  pb-1">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-8 px-0 TopHeaderModalInprogress">
                        <h2 className="modal-title " id="staticBackdropLabel">
                          Attendre SVP!
                        </h2>
                      </div>
                      <div className="col-4 text-end">
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
                <div className="col-12">
                  <div className="row d-flex justify-content-center">
                    <Loader />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className=" modal-header  pb-1">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-8 px-0 TopHeaderModalInprogress">
                        <h2 className="modal-title " id="staticBackdropLabel">
                          Générér un contrat
                        </h2>
                      </div>
                      <div className="col-4 text-end">
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
                <form className="col-12 scrollbarModal modal-body text-center ">
                  <div className="row " style={{ height: "100%" }}>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ numero contrat
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="numero_contract"
                        onChange={onFormDataChange}
                        defaultValue={
                          data.numero_contract ? data.numero_contract : ""
                        }
                        placeholder="‎ ‎ ‎ $ numero contrat"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ initial Société client
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="initial_client_company"
                        onChange={onFormDataChange}
                        defaultValue={
                          props.clientCompanyName ? props.clientCompanyName : ""
                        }
                        placeholder="‎ ‎ ‎ $ initial Société client"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">$ siret </label>
                      <input
                        className="form-control inputStyling"
                        name="siret"
                        onChange={onFormDataChange}
                        defaultValue={data.siret ? data.siret : ""}
                        placeholder="‎ ‎ ‎$ siret"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">$ numero TVA</label>
                      <input
                        className="form-control inputStyling"
                        name="numero_tva"
                        onChange={onFormDataChange}
                        defaultValue={data.numero_tva ? data.numero_tva : ""}
                        placeholder="‎ ‎ ‎ $ numero TVA"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">$ nom gérant</label>
                      <input
                        className="form-control inputStyling"
                        defaultValue={data.nom_gerant ? data.nom_gerant : ""}
                        name="nom_gerant"
                        onChange={onFormDataChange}
                        placeholder="‎ ‎ ‎ $ nom gérant"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ telephone gerant
                      </label>
                      <input
                        className="form-control inputStyling"
                        defaultValue={
                          data.telephone_gerant ? data.telephone_gerant : ""
                        }
                        name="telephone_gerant"
                        onChange={onFormDataChange}
                        placeholder="‎ ‎ ‎ $ telephone gerant"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ metier en Roumain
                      </label>
                      <input
                        className="inputStyling wHCompany form-control"
                        defaultValue={
                          data.metier_en_roumain ? data.metier_en_roumain : ""
                        }
                        name="metier_en_roumain"
                        onChange={onFormDataChange}
                        placeholder="‎ ‎ ‎ $ metier en Roumain"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ metier en Français
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="metier_en_francais"
                        onChange={onFormDataChange}
                        defaultValue={
                          data.metier_en_francais ? data.metier_en_francais : ""
                        }
                        placeholder="‎ ‎ ‎ $ metier en Français"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ date du debut de mission
                      </label>
                      <input
                        type="date"
                        className="form-control inputStyling"
                        name="debut_date"
                        onChange={onFormDataChange}
                        defaultValue={data.debut_date ? data.debut_date : ""}
                        placeholder="‎ ‎ ‎ $ date du debut de mission"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ date de fin de mission
                      </label>
                      <input
                        type="date"
                        className="form-control inputStyling"
                        name="date_fin_mission"
                        defaultValue={
                          data.date_fin_mission ? data.date_fin_mission : ""
                        }
                        onChange={onFormDataChange}
                        placeholder="‎ ‎ ‎ $ date de fin de mission"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ prix en euro / heure selon contract
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="prix_per_heure"
                        defaultValue={
                          data.prix_per_heure ? data.prix_per_heure : ""
                        }
                        onChange={onFormDataChange}
                        placeholder="‎ ‎ ‎ $ prix en euro / heure selon contract"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ SALAIRE EN EURO
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="salaire_euro"
                        onChange={onFormDataChange}
                        defaultValue={
                          data.salaire_euro ? data.salaire_euro : ""
                        }
                        placeholder="‎ ‎ ‎ $ SALAIRE EN EURO"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ nombre d'heure négocie dans le contrat
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="nombre_heure"
                        defaultValue={
                          data.nombre_heure ? data.nombre_heure : ""
                        }
                        onChange={onFormDataChange}
                        placeholder="‎ ‎ ‎ $ nombre d'heure négocie dans le contrat"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ Nom Du Travailleur 1
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="worker_name_1"
                        defaultValue={
                          data.worker_name_1 ? data.worker_name_1 : ""
                        }
                        onChange={onFormDataChange}
                        placeholder="‎ ‎ ‎ $ nom de tel du travailleur 1"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ numero de tel du travailleur 1
                      </label>
                      <input
                        className="form-control inputStyling"
                        defaultValue={
                          data.worker_number_1 ? data.worker_number_1 : ""
                        }
                        name="worker_number_1"
                        onChange={onFormDataChange}
                        placeholder="‎ ‎ ‎ $ numero de tel du travailleur 1"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ numero de tel du travailleur 2{" "}
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="worker_number_2"
                        defaultValue={
                          data.worker_number_2 ? data.worker_number_2 : ""
                        }
                        onChange={onFormDataChange}
                        placeholder="‎ ‎ ‎ $ numero du travailleur 2 "
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ Nom Du travailleur 2
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="worker_name_2"
                        onChange={onFormDataChange}
                        defaultValue={
                          data.worker_name_2 ? data.worker_name_2 : ""
                        }
                        placeholder="‎ ‎ ‎ $ nom de tel du travailleur 2"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ numero de tel du travailleur 3
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="worker_number_3"
                        onChange={onFormDataChange}
                        defaultValue={
                          data.worker_number_3 ? data.worker_number_3 : ""
                        }
                        placeholder="‎ ‎ ‎ $ numero de tel du travailleur 3"
                      />
                    </div>{" "}
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ nom du travailleur 3
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="worker_name_3"
                        onChange={onFormDataChange}
                        defaultValue={
                          data.worker_name_3 ? data.worker_name_3 : ""
                        }
                        placeholder="‎ ‎ ‎ $ nom du travailleur 3"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ numero de tel du travailleur 4
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="worker_number_4"
                        defaultValue={
                          data.worker_number_4 ? data.worker_number_4 : ""
                        }
                        onChange={onFormDataChange}
                        placeholder="‎ ‎ ‎ $ numero de tel du travailleur 4"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ nom du travailleur 4
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="worker_name_4"
                        onChange={onFormDataChange}
                        defaultValue={
                          data.worker_name_4 ? data.worker_name_4 : ""
                        }
                        placeholder="‎ ‎ ‎ $ nom du travailleur 4"
                      />
                    </div>{" "}
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ numero de tel du travailleur 5
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="worker_number_5"
                        onChange={onFormDataChange}
                        defaultValue={
                          data.worker_number_5 ? data.worker_number_5 : ""
                        }
                        placeholder="‎ ‎ ‎$ numero de tel du travailleur 5"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ nom du travailleur 5
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="worker_name_5"
                        onChange={onFormDataChange}
                        defaultValue={
                          data.worker_name_5 ? data.worker_name_5 : ""
                        }
                        placeholder="‎ ‎ ‎ $ nom du travailleur 5"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ numero de tel du travailleur 6
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="worker_number_6"
                        onChange={onFormDataChange}
                        defaultValue={
                          data.worker_number_6 ? data.worker_number_6 : ""
                        }
                        placeholder="‎ ‎ ‎$ numero de tel du travailleur 6"
                      />
                    </div>{" "}
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ nom du travailleur 6
                      </label>
                      <input
                        className="form-control inputStyling"
                        defaultValue={
                          data.worker_name_6 ? data.worker_name_6 : ""
                        }
                        name="worker_name_6"
                        onChange={onFormDataChange}
                        placeholder="‎ ‎ ‎ $ nom du travailleur 6"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ numero de tel du travailleur 7
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="worker_number_7"
                        onChange={onFormDataChange}
                        defaultValue={
                          data.worker_number_7 ? data.worker_number_7 : ""
                        }
                        placeholder="‎ ‎ ‎$ numero de tel du travailleur 7"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ nom du travailleur 7
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="worker_name_7"
                        onChange={onFormDataChange}
                        defaultValue={
                          data.worker_name_7 ? data.worker_name_7 : ""
                        }
                        placeholder="‎ ‎ ‎ $ nom du travailleur 7"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ numero de tel du travailleur 8
                      </label>
                      <input
                        className="inputStyling form-control"
                        name="worker_number_8"
                        onChange={onFormDataChange}
                        defaultValue={
                          data.worker_number_8 ? data.worker_number_8 : ""
                        }
                        placeholder="‎ ‎ ‎$ numero de tel du travailleur 8"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ nom du travailleur 8
                      </label>
                      <input
                        className="inputStyling form-control"
                        name="worker_name_8"
                        defaultValue={
                          data.worker_name_8 ? data.worker_name_8 : ""
                        }
                        onChange={onFormDataChange}
                        placeholder="‎ ‎ ‎$ nom du travailleur 8"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ Nom Du Travailleur 9
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="worker_name_9"
                        defaultValue={
                          data.worker_name_9 ? data.worker_name_9 : ""
                        }
                        onChange={onFormDataChange}
                        placeholder="‎ ‎ ‎ $ nom de tel du travailleur 9"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ numero de tel du travailleur 9
                      </label>
                      <input
                        className="form-control inputStyling"
                        defaultValue={
                          data.worker_number_9 ? data.worker_number_9 : ""
                        }
                        name="worker_number_9"
                        onChange={onFormDataChange}
                        placeholder="‎ ‎ ‎ $ numero de tel du travailleur 9"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ numero de tel du travailleur 10{" "}
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="worker_number_10"
                        defaultValue={
                          data.worker_number_10 ? data.worker_number_10 : ""
                        }
                        onChange={onFormDataChange}
                        placeholder="‎ ‎ ‎ $ numero du travailleur 10"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ Nom Du travailleur 10
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="worker_name_10"
                        onChange={onFormDataChange}
                        defaultValue={
                          data.worker_name_10 ? data.worker_name_10 : ""
                        }
                        placeholder="‎ ‎ ‎ $ nom de tel du travailleur 10"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ numero de tel du travailleur 11
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="worker_number_11"
                        onChange={onFormDataChange}
                        defaultValue={
                          data.worker_number_11 ? data.worker_number_11 : ""
                        }
                        placeholder="‎ ‎ ‎ $ numero de tel du travailleur 11"
                      />
                    </div>{" "}
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ nom du travailleur 11
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="worker_name_11"
                        onChange={onFormDataChange}
                        defaultValue={
                          data.worker_name_11 ? data.worker_name_11 : ""
                        }
                        placeholder="‎ ‎ ‎ $ nom du travailleur 11"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ numero de tel du travailleur 12
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="worker_number_12"
                        defaultValue={
                          data.worker_number_12 ? data.worker_number_12 : ""
                        }
                        onChange={onFormDataChange}
                        placeholder="‎ ‎ ‎ $ numero de tel du travailleur 12"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ nom du travailleur 12
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="worker_name_12"
                        onChange={onFormDataChange}
                        defaultValue={
                          data.worker_name_12 ? data.worker_name_12 : ""
                        }
                        placeholder="‎ ‎ ‎ $ nom du travailleur 12"
                      />
                    </div>{" "}
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ numero de tel du travailleur 13
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="worker_number_13"
                        onChange={onFormDataChange}
                        defaultValue={
                          data.worker_number_13 ? data.worker_number_13 : ""
                        }
                        placeholder="‎ ‎ ‎$ numero de tel du travailleur 13"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ nom du travailleur 13
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="worker_name_13"
                        onChange={onFormDataChange}
                        defaultValue={
                          data.worker_name_13 ? data.worker_name_13 : ""
                        }
                        placeholder="‎ ‎ ‎ $ nom du travailleur 13"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ numero de tel du travailleur 14
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="worker_number_14"
                        onChange={onFormDataChange}
                        defaultValue={
                          data.worker_number_14 ? data.worker_number_14 : ""
                        }
                        placeholder="‎ ‎ ‎$ numero de tel du travailleur 14"
                      />
                    </div>{" "}
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ nom du travailleur 14
                      </label>
                      <input
                        className="form-control inputStyling"
                        defaultValue={
                          data.worker_name_14 ? data.worker_name_14 : ""
                        }
                        name="worker_name_6"
                        onChange={onFormDataChange}
                        placeholder="‎ ‎ ‎ $ nom du travailleur 14"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ numero de tel du travailleur 15
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="worker_number_15"
                        onChange={onFormDataChange}
                        defaultValue={
                          data.worker_number_15 ? data.worker_number_15 : ""
                        }
                        placeholder="‎ ‎ ‎$ numero de tel du travailleur 15"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ nom du travailleur 15
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="worker_name_15"
                        onChange={onFormDataChange}
                        defaultValue={
                          data.worker_name_15 ? data.worker_name_15 : ""
                        }
                        placeholder="‎ ‎ ‎ $ nom du travailleur 15"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ numero de tel du travailleur 16
                      </label>
                      <input
                        className="inputStyling form-control"
                        name="worker_number_16"
                        onChange={onFormDataChange}
                        defaultValue={
                          data.worker_number_16 ? data.worker_number_16 : ""
                        }
                        placeholder="‎ ‎ ‎$ numero de tel du travailleur 16"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ nom du travailleur 16
                      </label>
                      <input
                        className="inputStyling form-control"
                        name="worker_name_16"
                        defaultValue={
                          data.worker_name_16 ? data.worker_name_16 : ""
                        }
                        onChange={onFormDataChange}
                        placeholder="‎ ‎ ‎$ nom du travailleur 16"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ numero de tel du travailleur 17
                      </label>
                      <input
                        className="inputStyling form-control"
                        name="worker_number_17"
                        onChange={onFormDataChange}
                        defaultValue={
                          data.worker_number_17 ? data.worker_number_17 : ""
                        }
                        placeholder="‎ ‎ ‎$ numero de tel du travailleur 17"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ nom du travailleur 17
                      </label>
                      <input
                        className="inputStyling form-control"
                        name="worker_name_17"
                        defaultValue={
                          data.worker_name_17 ? data.worker_name_17 : ""
                        }
                        onChange={onFormDataChange}
                        placeholder="‎ ‎ ‎$ nom du travailleur 17"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ numero de tel du travailleur 18
                      </label>
                      <input
                        className="inputStyling form-control"
                        name="worker_number_18"
                        onChange={onFormDataChange}
                        defaultValue={
                          data.worker_number_18 ? data.worker_number_18 : ""
                        }
                        placeholder="‎ ‎ ‎$ numero de tel du travailleur 18"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ nom du travailleur 18
                      </label>
                      <input
                        className="inputStyling form-control"
                        name="worker_name_18"
                        defaultValue={
                          data.worker_name_18 ? data.worker_name_18 : ""
                        }
                        onChange={onFormDataChange}
                        placeholder="‎ ‎ ‎$ nom du travailleur 18"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ numero de tel du travailleur 19
                      </label>
                      <input
                        className="inputStyling form-control"
                        name="worker_number_19"
                        onChange={onFormDataChange}
                        defaultValue={
                          data.worker_number_19 ? data.worker_number_19 : ""
                        }
                        placeholder="‎ ‎ ‎$ numero de tel du travailleur 19"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ nom du travailleur 19
                      </label>
                      <input
                        className="inputStyling form-control"
                        name="worker_name_19"
                        defaultValue={
                          data.worker_name_19 ? data.worker_name_19 : ""
                        }
                        onChange={onFormDataChange}
                        placeholder="‎ ‎ ‎$ nom du travailleur 19"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ numero de tel du travailleur 20
                      </label>
                      <input
                        className="inputStyling form-control"
                        name="worker_number_20"
                        onChange={onFormDataChange}
                        defaultValue={
                          data.worker_number_20 ? data.worker_number_20 : ""
                        }
                        placeholder="‎ ‎ ‎$ numero de tel du travailleur 20"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ nom du travailleur 20
                      </label>
                      <input
                        className="inputStyling form-control"
                        name="worker_name_20"
                        defaultValue={
                          data.worker_name_20 ? data.worker_name_20 : ""
                        }
                        onChange={onFormDataChange}
                        placeholder="‎ ‎ ‎$ nom du travailleur 20"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ Poste du Gerant
                      </label>
                      <input
                        className="inputStyling form-control"
                        name="poste_du_gerant"
                        defaultValue={
                          data.poste_du_gerant ? data.poste_du_gerant : ""
                        }
                        onChange={onFormDataChange}
                        placeholder="‎ ‎ ‎$ Poste du Gerant"
                      />
                    </div>
                    <div className="col-12 text-center mt-2">
                      <div className="row justify-content-end">
                        <div className="col-3">
                          <button
                            type="button"
                            className="btnGeneratePDF"
                            onClick={invokeGeneratePDF}
                          >
                            Generate the PDF
                          </button>
                          <p className="PDFNotes">Download local</p>
                        </div>

                        <div className="col-3 pl-0">
                          <button
                            className="documentSign d-flex align-items-center justify-content-center"
                            name="DOCU"
                            onClick={(e) => {
                              addContractToCRM(e);
                            }}
                            type="button"
                            disabled={Btndisabled}
                          >
                            {Btndisabled ? (
                              <>Please Wait...</>
                            ) : (
                              "📨 ENVOYER DOCU SIGN"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default PdfModal;
