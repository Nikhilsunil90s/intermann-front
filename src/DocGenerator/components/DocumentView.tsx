import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { API_BASE_URL } from "../../config/serverApiConfig";
import Loader from "../../components/Loader/loader";
import ProfileLoader from "../../components/Loader/ProfilesLoader";
import PDFreader from "../../components/AddClientRating/PDFreader";
import $ from "jquery";
import CountDown from "../../../src/components/Loader/CountDown";
let ContractData = {
  id: "",
  filePath: "",
};
function DocumentSign() {
  const [ContractSignData] = useState(ContractData) as any;
  const [pdfTimeOut, setpdfTimeOut] = useState(false);
  const { id } = useParams();
  const [profile, setProfile] = useState([]) as any;
  const [pdfUrl, setUrl] = useState() as any;

  const navigate = useNavigate();

  useEffect(() => {
    $(function () {
      setTimeout(function () {
        $("#hideDiv").fadeOut(1500);
      }, 15000);
    });
    $(function () {
      setTimeout(function () {
        $("#hideDivPc").fadeOut(1500);
      }, 7000);
    });

    fetchDocumentPDF(id)
  }, [id, profile]);

  useEffect(() => {
    setTimeout(() => {
      setpdfTimeOut(true);
    }, 5000);
  });

  const SignDocu = (e) => {
    ContractData.filePath = pdfUrl;
    ContractData.id =id
    navigate(`/sign-page/${id}`, { state: ContractSignData });
  };


  const fetchDocumentPDF = async (id: any) => {
    return await fetch(API_BASE_URL + `getDocumentForSignatures/?docId=${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((respData) => {
        setUrl(API_BASE_URL+respData.filepath.replace("/app/", ""));
      })
      .catch((err) => err);
  };


  return (
    <>
      <div id="hideDiv">
        <div className="d-grid justify-content-center align-items-center">
          <p className="mb-0 d-flex justify-content-center align-items-end">
            Nu închideți pagina, poate dura până la 1 minut. Doar așteaptă!
            <br />
            Veuillez ne pas fermer la page cela peut prendre 1mn
          </p>
          <div className="d-flex justify-content-center">
            <CountDown />
          </div>
        </div>
      </div>
      <div id="hideDivPc">
        <div className="d-grid justify-content-center align-items-center">
          <p className="mb-0 d-flex justify-content-center align-items-end">
            Nu închideți pagina, poate dura până la 1 minut. Doar așteaptă!
            <br />
            Veuillez ne pas fermer la page cela peut prendre 1mn
          </p>
          <div className="d-flex justify-content-center">
            <CountDown />
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 d-flex justify-content-center  bg-ContractPage p-2">
            <span>
              <img alt="..."
                src={require("../../images/logo-header.svg").default}
                className="filter-logo"
                style={{ width: "150%" }}
              />
            </span>
            <img
            alt="..."
              src={require("../../images/LogoName.svg").default}
              className="filter-text LogoIntermann"
              style={{ paddingLeft: "30px" }}
            />
          </div>
          <div
            className="col-12 d-flex justify-content-center  overFlowHeight"
            style={{ msOverflowY: "scroll" }}
          >
            {pdfUrl ? (
              <>
                <div className="iFrameView">
                  <iframe
                    src={pdfUrl}
                    style={{ width: "90vw", height: "61vh" }}
                  />
                </div>
                <div className="PdfViewMobileRes">
                  <PDFreader props={pdfUrl} />
                </div>
              </>
            ) : (
              <Loader />
            )}
          </div>
          {/* {
            ContractSignModal ? 
             <DocSignCandidate  props={profile.candidatContract._id} closeModal={setContractSignModal} />

            :

            null
        } */}
          <div className="col-12 footerDocSign bg-ContractPage">
            {pdfTimeOut ? (
              <button className="btn" onClick={(e) => SignDocu(e)}>
                ✒️ incepe CONTRACTUL(sign the contract)
              </button>
            ) : (
              <div className="col-12 d-flex justify-content-center px-1">
                {" "}
                <ProfileLoader
                  width={150}
                  height={100}
                  fontSize={"12px"}
                  fontWeight={"600"}
                  Title={null}
                />{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default DocumentSign;
