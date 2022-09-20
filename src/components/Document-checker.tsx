import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { API_BASE_URL } from "../config/serverApiConfig";
import ErrorLoader from "../components/Loader/SearchBarError";

let clDoc;
function ClientContractPage() {
  const { id } = useParams();
  // const {state}= useLocation()

  return (
    <>
      <div className="container-fluied bg-ContractPage">
        <div className="row">
          <div className="col-12 d-flex justify-content-center p-1 mt-2">
            <span>
              <img
                src={require("../images/logo-header.svg").default}
                className="filter-logo"
                style={{ width: "150%" }}
              />
            </span>
            <img
              src={require("../images/LogoName.svg").default}
              className="filter-text LogoIntermann"
              style={{ paddingLeft: "30px" }}
            />
          </div>
          <div
            className="col-12 text-center mt-2"
            style={{ padding: "0px 50px 0px 50px" }}
          >
            {" "}
            <p className="verification mb-0 ">
            Vérification de documents
            </p>
            <p className="mb-0 necessaryDoc">
            Les clients de la société sont listés sur cette page, vous pouvez cliquer sur un client et faire un controle des documents obligatoires. Chaque client doit avoir accès à sa propre page qui doit lui etre communiqué par Jeremy
            </p>
          </div>
          <div className="col-12 px-3 mt-2 mb-1">
            <div className="row Social-CardClient p-1">
              <div className="col-md-3 col-sm-12  d-flex align-items-center justify-content-center">
             
                  <img
                    src={require("../images/representant.png")}
                    className="representant"
                  />

               
               
              </div>
              <div className="col-md-9 col-sm-12 d-grid align-items-center ">
                <p className="mb-0 cardPDFDetails">
                  Votre représentant : Jeremy Roggy
                <br/>
INTERMANN WORK S.R.L <br/>
 VAT : RO44515629 <br/>
+40 770 504 158</p>
             </div>
            </div>
          </div>
          <div className="col-12 px-3 mb-1 ">
            <div className="row Social-CardClient p-1">
             
            
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ClientContractPage;
