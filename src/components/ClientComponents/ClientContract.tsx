import React, { useState } from "react";
import { useNavigate } from "react-router";
import format from 'date-fns/format'

function ClientContract ({props,path}){
const navigate = useNavigate()
const [clientContract,setclientContract]=useState(props.clientContract)


const dateDu = new Date(clientContract.debut_date)
const FinM = new Date(clientContract.date_fin_mission)
const Editdata = { state: props, path:path };
const editClientProfile = () => {
    navigate("/clientToDoEdit", { state: Editdata });
  };
    return(<>
 <div className="row p-1">
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ numero contrat
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="numero_contract"
                       readOnly
                        defaultValue={
                          clientContract ? clientContract.numero_contract : ""
                        }
                        onClick={editClientProfile}
                        placeholder="‎ ‎ ‎ $ numero contrat"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ initial Société client
                      </label>
                      <input
                        className="form-control inputStyling"
                       readOnly
                        defaultValue={
                          clientContract
                            ? clientContract.initial_client_company
                            : ""
                        }
                        onClick={editClientProfile}
                        placeholder="‎ ‎ ‎ $ initial Société client"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">$ siret </label>
                      <input
                        className="form-control inputStyling"
                       readOnly
                        defaultValue={clientContract ? clientContract.siret : ""}
                        onClick={editClientProfile}
                        placeholder="‎ ‎ ‎$ siret"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">$ numero TVA</label>
                      <input
                        className="form-control inputStyling"
                        name="candidatJob "
                       readOnly
                        defaultValue={clientContract ? clientContract.numero_tva : ""}
                        onClick={editClientProfile}
                        placeholder="‎ ‎ ‎ $ numero TVA"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">$ nom gérant</label>
                      <input
                        className="form-control inputStyling"
                        name="cmp_candidat"
                       readOnly
                        defaultValue={clientContract ? clientContract.nom_gerant : ""}
                        onClick={editClientProfile}
                        placeholder="‎ ‎ ‎ $ nom gérant"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ telephone gerant
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="contract_date"
                       readOnly
                        defaultValue={
                          clientContract ? clientContract.telephone_gerant : ""
                        }
                        onClick={editClientProfile}
                        placeholder="‎ ‎ ‎ $ telephone gerant"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ metier en Roumain
                      </label>
                      <input
                        className="inputStyling wHCompany form-control"
                        name="company_contact_name"
                       readOnly
                        defaultValue={
                          clientContract ? clientContract.metier_en_roumain : ""
                        }
                        onClick={editClientProfile}
                        placeholder="‎ ‎ ‎ $ metier en Roumain"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ metier en Français
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="$ metier en Français"
                       readOnly
                        defaultValue={
                          clientContract
                            ? clientContract.metier_en_francais
                            : ""
                        }
                        onClick={editClientProfile}
                        placeholder="‎ ‎ ‎ $ metier en Français"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ date du debut de mission
                      </label>
                      <input
                        type=""
                        readOnly
                        className="form-control inputStyling"
                        name="serie_id"
                         defaultValue={clientContract.debut_date !== "" ? format(dateDu, "dd/MM/yyyy"): ""}
                        onClick={editClientProfile}
                        placeholder="‎ ‎ ‎ $ date du debut de mission"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ date de fin de mission
                      </label>
                      <input
                        type=""
                        readOnly
                        className="form-control inputStyling"
                        name="candidatAddress"
                   
                        defaultValue={
                          clientContract.date_fin_mission !== "" ? format(FinM,"dd/MM/yyyy") : ""
                        }
                        onClick={editClientProfile}
                        placeholder="‎ ‎ ‎ $ date de fin de mission"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ prix en euro / heure selon contract
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="company_siret"
                       readOnly
                        defaultValue={
                          clientContract ? clientContract.prix_per_heure : ""
                        }
                        onClick={editClientProfile}
                        placeholder="‎ ‎ ‎ $ prix en euro / heure selon contract"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ SALAIRE EN EURO
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="SALAIRE EN EURO"
                       readOnly
                        defaultValue={
                          clientContract ? clientContract.salaire_euro : ""
                        }
                        onClick={editClientProfile}
                        placeholder="‎ ‎ ‎ $ SALAIRE EN EURO"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ nombre d'heure négocie dans le contrat
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="candidatAddress"
                       readOnly
                        defaultValue={
                          clientContract ? clientContract.nombre_heure : ""
                        }
                        onClick={editClientProfile}
                        placeholder="‎ ‎ ‎ $ nombre d'heure négocie dans le contrat"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ numero de tel du travailleur 1
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="company_siret"
                       readOnly
                        defaultValue={
                          clientContract ? clientContract.worker_number_1 : ""
                        }
                        onClick={editClientProfile}
                        placeholder="‎ ‎ ‎ $ numero de tel du travailleur 1"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ Nom Du Travailleur 1
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="worker_name_1"
                       readOnly
                        defaultValue={
                          clientContract ? clientContract.worker_name_1 : ""
                        }
                        onClick={editClientProfile}
                        placeholder="‎ ‎ ‎ $ numero de tel du travailleur 1"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ nom du travailleur 2
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="serie_id"
                       readOnly
                        defaultValue={
                          clientContract ? clientContract.worker_number_2 : ""
                        }
                        onClick={editClientProfile}
                        placeholder="‎ ‎ ‎ $ nom du travailleur 2 "
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ numero de tel du travailleur 2
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="candidatAddress"
                       readOnly
                        defaultValue={
                          clientContract ? clientContract.worker_name_2 : ""
                        }
                        onClick={editClientProfile}
                        placeholder="‎ ‎ ‎ $ numero de tel du travailleur 2"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ nom du travailleur3
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="company_siret"
                       readOnly
                        defaultValue={
                          clientContract ? clientContract.worker_number_3 : ""
                        }
                        onClick={editClientProfile}
                        placeholder="‎ ‎ ‎ $ nom du travailleur3"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ numero de tel du travailleur 3
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="serie_id"
                       readOnly
                        defaultValue={
                          clientContract ? clientContract.worker_name_3 : ""
                        }
                        onClick={editClientProfile}
                        placeholder="‎ ‎ ‎ $ numero de tel du travailleur 3"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ nom du travailleur 4
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="candidatAddress"
                       readOnly
                        defaultValue={
                          clientContract ? clientContract.worker_number_4 : ""
                        }
                        onClick={editClientProfile}
                        placeholder="‎ ‎ ‎ $ nom du travailleur 4"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ numero de tel du travailleur 4
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="company_siret"
                       readOnly
                        defaultValue={
                          clientContract ? clientContract.worker_name_4 : ""
                        }
                        onClick={editClientProfile}
                        placeholder="‎ ‎ ‎ $ numero de tel du travailleur 4"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ nom du travailleur 5
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="serie_id"
                       readOnly
                        defaultValue={
                          clientContract ? clientContract.worker_number_5 : ""
                        }
                        onClick={editClientProfile}
                        placeholder="‎ ‎ ‎$ nom du travailleur 5"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ numero de tel du travailleur 5
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="candidatAddress"
                       readOnly
                        defaultValue={
                          clientContract ? clientContract.worker_name_5 : ""
                        }
                        onClick={editClientProfile}
                        placeholder="‎ ‎ ‎ $ numero de tel du travailleur 5"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ nom du travailleur 6
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="company_siret"
                       readOnly
                        defaultValue={
                          clientContract ? clientContract.worker_number_6 : ""
                        }
                        onClick={editClientProfile}
                        placeholder="‎ ‎ ‎$ nom du travailleur 6"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ numero de tel du travailleur 6
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="serie_id"
                       readOnly
                        defaultValue={
                          clientContract ? clientContract.worker_name_6 : ""
                        }
                        onClick={editClientProfile}
                        placeholder="‎ ‎ ‎ $ numero de tel du travailleur 6"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ nom du travailleur 7
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="candidatAddress"
                       readOnly
                        defaultValue={
                          clientContract ? clientContract.worker_number_7 : ""
                        }
                        onClick={editClientProfile}
                        placeholder="‎ ‎ ‎$ nom du travailleur 7"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ numero de tel du travailleur 7
                      </label>
                      <input
                        className="form-control inputStyling"
                        name="company_siret"
                       readOnly
                        defaultValue={
                          clientContract ? clientContract.worker_name_7 : ""
                        }
                        onClick={editClientProfile}
                        placeholder="‎ ‎ ‎ $ numero de tel du travailleur 7"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ nom du travailleur 8
                      </label>
                      <input
                        className="inputStyling form-control"
                        name="companyAddress"
                       readOnly
                        defaultValue={
                          clientContract ? clientContract.worker_number_8 : ""
                        }
                        onClick={editClientProfile}
                        placeholder="‎ ‎ ‎$ nom du travailleur 8"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ numero de tel du travailleur 8
                      </label>
                      <input
                        className="inputStyling form-control"
                        name="companyAddress"
                       readOnly
                        defaultValue={
                          clientContract ? clientContract.worker_name_8 : ""
                        }
                        onClick={editClientProfile}
                        placeholder="‎ ‎ ‎$ numero de tel du travailleur 8"
                      />
                    </div>
                    <div className="col-4  d-grid ">
                      <label className="ClientPDFFormlabel">
                        $ Poste du Gerant
                      </label>
                      <input
                        className="inputStyling form-control"
                        name="poste_du_gerant"
                       readOnly
                        defaultValue={
                          clientContract ? clientContract.poste_du_gerant : ""
                        }
                        onClick={editClientProfile}
                        placeholder="‎ ‎ ‎$ Poste du Gerant"
                      />
                    </div>
                  </div>

    </>)
}
export default ClientContract;