import React, { useEffect, useState } from "react";
import { GetRoute } from "../components/ApisFunction/FunctionsApi";
import Card from "./components/Card";
import Filter from "./components/Filter";
import Header from "./components/Header";
import "./CSS/Offer.css";
import UploadFile from "./Modal/UploadFile";
import Error404Loader from "../components/Loader/404Error";
import { Toaster } from "react-hot-toast";
import Error from "../components/Loader/SearchBarError";
let name = [] as any;
let job = [] as any;
function MainCenter() {
  const [uploadPdfModal, setUploadPdfModal] = useState({
    AddToCrm: false,
    Manually: false,
  });
  const [currentTab, setCurrentTab] = useState("unsigned");
  const [dataUpdate, setDataUpdate] = useState(false);
  const [cards, setCards] = useState([]);
  const [Status, setStatus] = useState({
    status: false,
    error: false,
  });
  const [filters, setFilters] = useState([]) as any;

  useEffect(() => {
    GetRoute(`get-offers/?offerType=${currentTab}`)
      .then((res) => {
        if (res.status) {
          setCards([...res.data]);

          setStatus({ ...Status, status: true });
          setDataUpdate(false);
        } else {
          setCards([]);

          setStatus({ ...Status, error: true });
          setDataUpdate(false);
        }
      })
      .catch((err) => err);
  }, [dataUpdate]);
  const activeTab = (e) => {
    if (e.target.id === "sIGNEES") {
      setStatus({ ...Status, status: false });
      setCurrentTab("signed");
      document.getElementById("sIGNEES").classList.add("activeBtnOffer");
      document.getElementById("sIGNEES").classList.remove("transBtn");
      document.getElementById("envoyees").classList.remove("activeBtnOffer");
      document.getElementById("envoyees").classList.add("transBtn");
      GetRoute(`get-offers/?offerType=${"signed"}`).then((res) => {
        if (res.status) {
          setCards([...res.data]);
          name = [];
          job = [];
          setFilters([]);

          setStatus({ ...Status, status: true });
        } else {
          setCards([]);
          name = [];
          job = [];
          setFilters({
            name: [],
          });

          setStatus({ ...Status, error: true });
        }
      });
    } else {
      setStatus({ ...Status, status: false });
      setCurrentTab("unsigned");
      document.getElementById("sIGNEES").classList.remove("activeBtnOffer");
      document.getElementById("sIGNEES").classList.add("transBtn");
      document.getElementById("envoyees").classList.add("activeBtnOffer");
      document.getElementById("envoyees").classList.remove("transBtn");
      GetRoute(`get-offers/?offerType=${"unsigned"}`).then((res) => {
        if (res.status) {
          setCards([...res.data]);
          name = [];
          job = [];
          setFilters([]);

          setStatus({ ...Status, status: true });
        } else {
          setCards([]);
          name = [];
          job = [];
          setFilters({
            name: [],
          });

          setStatus({ ...Status, error: true });
        }
      });
    }
  };

  useEffect(() => {
    if (cards.length > 0 && filters.length === 0) {
      cards.map((el: any) => {
   
        if (!JSON.stringify(name).includes(JSON.stringify(el.company_name))) {
          name.push({
            value: el.company_name,
            label: el.company_name.toUpperCase(),
            color: "#FF8B00",
            name: "company_name",
          });
        }
        el?.metiers.map((jb)=>
          {
            if (jb.metier) {
            job.push({
              value: jb.metier,
              label: jb.metier.toUpperCase(),
              color: "#FF8B00",
              name: "metier",
            });
          }
        }

          )
       
        
       
      });
      setFilters({ ...filters, name: [...name], job: [...job] });
    }
  });

  return (
    <>
      <Toaster
        position="top-right"
        containerStyle={{ zIndex: "999999999999999999" }}
      />
      <div className="container-fluid mt-4 mb-2">
        <div className="row">
          <div>
            <Header setUploadPdfModal={setUploadPdfModal} />
          </div>
          <div>
            <Filter
              filterOP={filters}
              setStatus={setStatus}
              Status={Status}
              setDataUpdate={setDataUpdate}
              currentTab={currentTab}
              setCards={setCards}
            />
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
              {Status.status ? (
                Status.error ? (
                  <div className="col-12 d-flex justify-content-center">
                    <Error404Loader props={"38%"} />
                  </div>
                ) : cards.length > 0 ? (
                  cards.map((el, i) => (
                    <Card
                      props={el}
                      key={i}
                      cards={cards}
                      setCards={setCards}
                    />
                  ))
                ) : (
                  <div className="col-12 my-2 d-flex align-items-center justify-content-center">
                    {/* <span className="Leads002"></span> */}
                    <p className="mb-0 d-flex align-items-center ErrorSearchBox">
                      <Error />
                      {currentTab == "unsigned"
                        ? "✘✘ No Offers Sent Yet!"
                        : "✘✘ No Signed Offers!"}{" "}
                    </p>
                  </div>
                )
              ) : (
                <div className="col-12 my-2 d-flex align-items-center justify-content-center">
                  <span className="Leads002"></span>
                </div>
              )}
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
                setDataUpdate={setDataUpdate}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
export default MainCenter;
