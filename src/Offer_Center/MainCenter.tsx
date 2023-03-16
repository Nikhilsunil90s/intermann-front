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

function MainCenter() {
  const [uploadPdfModal, setUploadPdfModal] = useState({
    AddToCrm: false,
    Manually: false,
  });
  const [btnDS,setBtnDs]=useState(false)
  const [dataUpdate,setDataUpdate]=useState(false)
  const [cards, setCards] = useState([]);
  const [Status,setStatus]=useState({
   status:false,
   error:false
  })

  useEffect(()=>{
    GetRoute(`get-offers/?offerType=${"unsigned"}`).then((res) => {
        if (res.status) {
          setCards([...res.data]);
          setBtnDs(true)
          setStatus({...Status,status:true})
        } else {
          setCards([]);
          setBtnDs(true)
          setStatus({...Status,error:true})

        }
      })
      .catch((err)=>err);
  },[dataUpdate])
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
          setStatus({...Status,status:true})

        } else {
          setCards([]);
          setBtnDs(true)
          setStatus({...Status,error:true})
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
          setStatus({...Status,status:true})

        } else {
          setCards([]);
          setBtnDs(true)
          setStatus({...Status,error:true})

        }
      });
    }
  };
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
              {Status.status ?
               Status.error ?
               <div className="col-12 d-flex justify-content-center">
               < Error404Loader  props={"38%"}    />    
                </div>

               :
              
              cards.length > 0 ? cards.map((el,i) => <Card props={el} key={i} cards={cards} setCards={setCards}  />) :   
               <div className="col-12 my-2 d-flex align-items-center justify-content-center">
                      {/* <span className="Leads002"></span> */}
                      <p className="mb-0 d-flex align-items-center ErrorSearchBox">
                      <Error /> Offer's not available ✘✘!</p>
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
