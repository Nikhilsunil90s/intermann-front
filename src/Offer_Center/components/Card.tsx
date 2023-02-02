import React from "react";

function Card() {
  return (
    <>
      <div className="row OfferCenterRow mb-1">
        <div className="col-7 d-flex align-items-center">
          <p className="mb-0 d-flex justify-content-center">
            société : <b className="d-flex align-items-center"> sabir - </b>
            métier : <b className="d-flex align-items-center"> ahmad -</b>{" "}
            Forfait : <b className="d-flex align-items-center">43 H -</b>{" "}
            salaire : <b className="d-flex align-items-center">3000 €</b> - Generated :  <b className="d-flex align-items-center">23/09/2022</b>{" "}
          </p>
        </div>
        <div className="col-5">
          <div className="row">
            <div className="col-8 d-flex justify-content-end">
              <button className="btn LinkItClient mx-1">Link it to Client</button>
              <button className="btn SignedMark">Mark as signed</button>
            </div>
            <div className="col-4">
              <div className=" d-flex align-items-center justify-content-center">
                <button
                  className={`col-6 px-0 RoundDiv cursor-pointer`}
                  style={{ border: "0px" }}
                >
                  <img src={require("../../images/Deletebucket.svg").default} />
                </button>
                <button
                  className={`col-6 px-0 RoundDiv cursor-pointe mx-2`}
                  style={{ border: "0px" }}
                >
                  <img src={require("../../images/dowBtn.svg").default} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Card;
