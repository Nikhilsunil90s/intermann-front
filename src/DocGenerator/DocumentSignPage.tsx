import React, { useRef, useState } from "react";
import "../CSS/Client/ArchivedCardClient.css";
import SignatureCanvas from "react-signature-canvas";
import { Toaster, toast } from "react-hot-toast";
import { API_BASE_URL } from "../config/serverApiConfig";
import { useLocation } from "react-router";
import ProfileLoader from "../components/Loader/ProfilesLoader";
import Cookies from "js-cookie";

let Data;
function DocSign() {
  const [SignLoad, setSingLoad] = useState(false);
  const { state } = useLocation();
  const SignPad = useRef(undefined);
  const [SignError, setSignError] = useState(false);

  const [contractID] = useState(state) as any;

  const SignSave = () => {
    if (SignPad.current.isEmpty()) {
    }
    if (SignPad.current.toDataURL()) {
      SignPad.current.toDataURL();
    }

    Data = {
        docId: contractID.id,
      signature: SignPad.current.toDataURL(),
    };
  };

  const clear = () => {
    SignPad.current.clear();
  };
  const Checkking = (e) => {
    setSignError(e.isTrusted);
  };

  const SaveSignFun = () => {
    SignSave();
    if (SignError) {

        SaveSign()
          .then((res) => {
            if (res) {
              toast.success("Signatures Added Successfully!");
              setSingLoad(false);
              setTimeout(() => {
                window.location.href = "/documentSigned/thankYou";
              }, 2000);
            }
          })
          .catch((err) => {
            console.log(err);
            setSingLoad(false);
            toast.error("Signatures Not Added !");
          });
      
      
    } else {
      toast.error("Trebuie să semnezi ! / You must sign / Veuillez signer !");
    }
  };

  const SaveSign = async () => {
    setSingLoad(true);
    return await fetch(API_BASE_URL + "addDocumentSignatures", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
      body: JSON.stringify(Data),
    })
      .then((resp) => resp.json())
      .then((reD) => reD)
      .catch((err) => err);
  };


  return (
    <>
      <Toaster
        position="top-right"
        containerStyle={{
          zIndex: "99999999999999999999999999",
          marginRight: "40px",
        }}
      />
      <div className="container-fluid" style={{ backgroundColor: "#00000052" }}>
        <div className="row">
          <div className="col-12 px-0">
            <div className="col-12 bg-ContractPage HeightLogoContract">
              <div className="row d-flex justify-content-center">
                <div className="col-8 heightScreenTop d-flex justify-content-center">
                  <img
                    src={require("../images/logo-header.svg").default}
                    className="filter-logo LogoScreenSign"
                  />
                  <img
                    src={require("../images/LogoName.svg").default}
                    className="filter-text LogoIntermann"
                    style={{ paddingLeft: "15px" }}
                  />{" "}
                </div>
              </div>
            </div>
            <div
              className="row text-start mx-0 HeightWidthControl"
              style={{ background: "#FE8700", padding: "10px" }}
            >
              <div className="col-12 ">
                {" "}
                <p className=" mb-0 topTitle">
                  Va rog semnati aici :{" "}
                  <span style={{ color: "#ffff" }}>
                    I declare that I have read the contract and accept it in its
                    entirety. Declar că am citit contractul și îl accept în
                    întregime.Adresa dvs. IP va fi înregistrată
                  </span>
                </p>
              </div>
              <div className="col-12 " style={{ background: "#ffff" }}>
                <div className="row " style={{ padding: "10px" }}>
                  <div
                    className="col-12 "
                    style={{
                      background: "#E7E7E7",
                      border: "2px solid #000000",
                    }}
                  >
                    <SignatureCanvas
                      penColor="black"
                      ref={SignPad}
                      //   onEnd={SignSave()}
                      canvasProps={{
                        className: "sigCanvas",
                        velocityFilterWeight: 200,
                        height: 350,
                      }}
                      onEnd={Checkking}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12">
                {" "}
                <div className="col-12">
                  <button
                    onClick={() => {
                      clear();
                    }}
                    className="clearbtn"
                  >
                    X Clear
                  </button>
                </div>
              </div>
              <div className="col-12">
                <p className="bottomText mb-0">
                  {" "}
                  L'écrit sous forme électronique est admis en preuve au même
                  titre que l'écrit sur support papier, sous réserve que puisse
                  être dûment identifiée la personne dont il émane et qu'il soit
                  établi et conservé dans des conditions de nature à en garantir
                  l'intégrité
                  <br />
                  Scrierea în formă electronică este admisă ca probă în același
                  mod ca și scrierea pe hârtie, cu condiția ca persoana de la
                  care emană să poată fi identificată în mod corespunzător și să
                  fie întocmită și păstrată în condiții care să garanteze
                  integritatea acesteia.
                  <br />
                  Writing in electronic form is admitted as evidence in the same
                  way as writing on paper, provided that the person from whom it
                  emanates can be duly identified and that it is drawn up and
                  stored under conditions such as to guarantee its integrity.
                  'integrity
                </p>
              </div>
            </div>
            <button
              className="col-12 cursor-pointer d-flex p-2 align-items-center justify-content-center  bg-ContractPage  semneaza"
              onClick={() => {
                SignSave();
                SaveSignFun();
              }}
              disabled={SignLoad}
            >
              {SignLoad ? (
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
              ) : (
                `📨 acepta si semneaza
accept and sign`
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default DocSign;
