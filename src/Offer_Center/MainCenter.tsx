import React, { useEffect, useState } from "react";
import { GetRoute } from "../components/ApisFunction/FunctionsApi";
import Card from "./components/Card";
import Filter from "./components/Filter";
import Header from "./components/Header";
import "./CSS/Offer.css";
import UploadFile from "./Modal/UploadFile";

function MainCenter() {
  const [uploadPdfModal, setUploadPdfModal] = useState({
    AddToCrm: false,
    Manually: false,
  });
  const[btnDS,setBtnDs]=useState(false)
  const [cards, setCards] = useState([]);

  useEffect(()=>{
    GetRoute(`get-offers/?offerType=${"unsigned"}`).then((res) => {
        if (res.status) {
          setCards([...res.data]);
          setBtnDs(true)
        } else {
          setCards([]);
          setBtnDs(true)

        }
      });
  },[])
  const activeTab = (e) => {
    setBtnDs(false)
    if (e.target.id === "sIGNEES") {
      document.getElementById("sIGNEES").classList.add("activeBtnOffer");
      document.getElementById("sIGNEES").classList.remove("transBtn");
      document.getElementById("envoyees").classList.remove("activeBtnOffer");
      document.getElementById("envoyees").classList.add("transBtn");
      GetRoute(`get-offers/?offerType=${"signed"}`).then((res) => {
        if (res.status) {
          setCards([...res.data]);
          setBtnDs(true)

        } else {
          setCards([]);
          setBtnDs(true)

        }
      });
    } else {
      document.getElementById("sIGNEES").classList.remove("activeBtnOffer");
      document.getElementById("sIGNEES").classList.add("transBtn");
      document.getElementById("envoyees").classList.add("activeBtnOffer");
      document.getElementById("envoyees").classList.remove("transBtn");
      GetRoute(`get-offers/?offerType=${"unsigned"}`).then((res) => {
        if (res.status) {
          setCards([...res.data]);
          setBtnDs(true)

        } else {
          setCards([]);
          setBtnDs(true)

        }
      });
    }
  };
  return (
    <>
      <div className="container-fluid mt-4" style={{ height: "100vh" }}>
        <div className="row">
          <div>
            <Header setUploadPdfModal={setUploadPdfModal} />
          </div>
          <div>
            <Filter />
          </div>
          <div>
            <div className="col-12 colorTopTab p-1">
              <div className="row">
                <div className="col-2 d-flex justify-content-center">
                  <button
                    onClick={(e) => activeTab(e)}
                    id="sIGNEES"
                    className="transBtn"
                  >
                    oFFRES sIGNEES
                  </button>
                </div>
                <div className="col-2  d-flex justify-content-start">
                  <button
                    onClick={(e) => activeTab(e)}
                    id="envoyees"
                    className="activeBtnOffer"
                  >
                    offres envoyees
                  </button>
                </div>
              </div>
            </div>
            <div
              className="col-12 bg-white"
              style={{
                borderRadius: "0px 0px 10px 10px",
                padding: "10px 24px",
              }}
            >
              {btnDS ?

              
              cards.length > 0 ? cards.map((el) => <Card props={el} />) :    <div className="col-12 my-2 d-flex align-items-center justify-content-center">
                      <span className="Leads002"></span>
                      </div>
                      
                    :
                    <div className="col-12 my-2 d-flex align-items-center justify-content-center">
                    <span className="Leads002"></span>
                    </div> 
                    }

            </div>
            {uploadPdfModal.AddToCrm ? (
              <UploadFile
                uploadPdfModal={uploadPdfModal}
                setUploadPdfModal={setUploadPdfModal}
                AddToCrm={"addToCrm"}
              />
            ) : null}
            {uploadPdfModal.Manually ? (
              <UploadFile
                uploadPdfModal={uploadPdfModal}
                setUploadPdfModal={setUploadPdfModal}
                AddToCrm={"Manually"}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
export default MainCenter;
