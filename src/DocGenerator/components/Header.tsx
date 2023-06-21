import React from "react";
import "../CSS/docGenerator.css";
import { useNavigate } from "react-router-dom";

function DGHeader(props) {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="container-fluid bg-white DG_HeaderContent"
      >
        <div className="row align-items-center">
          <div className="col-6 d-grid">
            <p className="mb-0">CREATE CUSTOM DOCUMENT</p>
            <span>Créer un document personnalisé avec l’entete de la société à signer</span>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <button
                className="DC_Btn"
                onClick={() => {
                    navigate("/downloadCenter");
                }}
            >
                GO TO DOWNLOAD CENTER
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default DGHeader;
