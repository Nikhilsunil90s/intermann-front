import React from "react";

function Card(props:any) {
  return (
    <>
      <div className="row OfferCenterRow mb-1" key={props.props._id}>
        <div className="col-7 d-flex align-items-center pl-0">
          <p className="mb-0 d-flex justify-content-center">
            société : <b className="d-flex align-items-center"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={props.props.company_name}> {props.props.company_name.length > 12 ?props.props.company_name.slice(0,11) +"..." :  props.props.company_name} - </b>
            métier : <b className="d-flex align-items-center" data-bs-toggle="tooltip" data-bs-placement="bottom" title={props.props.metier}> {props.props.metier.length > 9 ? props.props.metier.slice(0,9) +"..." : props.props.metier ? props.props.metier  : "no"} -</b>{" "}
            Forfait : <b className="d-flex align-items-center">{props.props.heure_fait ? props.props.heure_fait : "0H"} -</b>{" "}
            salaire : <b className="d-flex align-items-center">{props.props.total_salaire ?  props.props.total_salaire  : "0€"}</b> - Generated :  <b className="d-flex align-items-center">{props.props.offer_made_date}</b>{" "}
          </p>
        </div>
        <div className="col-5">
          <div className="row">
            <div className="col-8 d-flex justify-content-end pl-0">
              <button className="btn LinkItClient mr-1">Link it to Client</button>
              {
                props.props.offer_signed ?
null
                :

                <button className="btn SignedMark">Mark as signed</button>

              }
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
                  className={`col-6 px-0 RoundDiv cursor-pointe`}
                  style={{ border: "0px" ,    margin:"0px 6px 0px 26px"}}
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
