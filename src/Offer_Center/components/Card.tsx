import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  GetRouteWithoutAuth,
  GetRoute,
  PostRoute,
} from "../../components/ApisFunction/FunctionsApi";
import { API_BASE_URL } from "../../config/serverApiConfig";
import LinkItModal from "../Modal/LinkItModal";

function Card(props: any) {
  const [dsBtn, setDsBtn] = useState({
    id: "",
    DSBTN: false,
  });
  const [deleteDsBtn, setDeleteDsBtn] = useState({
    id: "",
    DSBTN: false,
  });
  const [LinkToclient, setLinkToclient] = useState(false);
  const DownLoadOffer = (id) => {
    setDsBtn({ ...dsBtn, ["DSBTN"]: true });
    setDsBtn({ ...dsBtn, ["id"]: id });

    GetRouteWithoutAuth(`get-offer/?offerId=${props.props._id}`)
      .then((res) => {
        if (res.status) {
          window.open(API_BASE_URL + res.filepath.replace("/app/", ""));
          setDsBtn({
            id: "",
            DSBTN: false,
          });
        } else {
          setDsBtn({
            id: "",
            DSBTN: false,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const DeleteOffer = (path, id) => {
    setDeleteDsBtn({ ...dsBtn, ["DSBTN"]: true });
    setDeleteDsBtn({ ...dsBtn, ["id"]: id });
    GetRoute(path)
      .then((res) => {
        if (res.status) {
          toast.success(res.message);
          const newArr = props.cards.filter(
            (el: any) => el._id !== props.props._id
          );
          props.setCards([...newArr]);
          setDeleteDsBtn({
            id: "",
            DSBTN: false,
          });
        } else {
          toast.error(res.message);
          setDeleteDsBtn({
            id: "",
            DSBTN: false,
          });
        }
      })
      .catch((err) => err);
  };

  const MoveToSigned = (id) => {
    let data = {
      offerId: id,
    };
    setDsBtn({ ...dsBtn, ["DSBTN"]: true });
    PostRoute(data, "mark-offer-as-signed")
      .then((res) => {
        if (res.status) {
          setDsBtn({
            id: "",
            DSBTN: false,
          });
          toast.success(res.message);
          const newArr = props.cards.filter(
            (el: any) => el._id !== props.props._id
          );
          props.setCards([...newArr]);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => err);
  };

  return (
    <>
      <div
        className="row OfferCenterRow mb-1"
        key={props.props._id}
        style={{ margin: props.voir == "voir" ? "10px" : "" }}
      >
        <div
          onClick={() => DownLoadOffer(props.props._id)}
          className={` ${
            props.voir == "voir" ? "col-9" : "col-7"
          } d-flex align-items-center pl-0 cursor-pointer`}
        >
          <p className="mb-0 d-flex justify-content-center align-items-center">
            société :
            <b
              className="d-flex align-items-center"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title={props.props.company_name}
            >
              {props.props.company_name.length > 12
                ? props.props.company_name.slice(0, 11) + "..."
                : props.props.company_name}
            </b>
            - métier :
            <b
              className="d-flex align-items-center"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title={props.props.metiers.map((jb) => jb.metier)}
            >
              {props.props.metiers.length ? null : "✘✘!"}
              <ul style={{listStyle:"none",margin:"5px 0px 0px 0px",padding:"0px"}}>
              {props.props.metiers.map((jb, i) =>
              (
                <li>
              {  jb
                  ? jb.metier.length > 9
                    ? jb.metier.slice(0, 9) + "..."
                    : jb.metier
                  : "✘✘!"}
                  </li>
              )
              )}
              </ul>
            </b>
            - Forfait :
            <b className="d-flex align-items-center">
              <ul  style={{listStyle:"none",margin:"5px 0px 0px 0px",padding:"0px"}}>
              {props.props.metiers.length > 0 ? null : "✘✘!"}
              {props.props.metiers.map((jb, i) =>
              (
                <li>
               { jb ? (jb.heure_fait ? jb.heure_fait : "✘✘!")  : "✘✘!"}
                </li>
              )
              )}
              </ul>
            </b>
            - salaire :
            <b className="d-flex align-items-center">
              {props.props.metiers.length > 0 ? null : "0€"}
              <ul style={{listStyle:"none",margin:"5px 0px 0px 0px",padding:"0px"}}>
              {props.props.metiers.map((jb, i) =>
              (
                <li>
                  {
                jb ? (jb.total_salaire ? jb.total_salaire : "0€") : "0€"}
                </li>
              )
              )}
              </ul>
            </b>
            - Generated :
            <b className="d-flex align-items-center">
              {props.props.offer_made_date.slice(0, 10)}
            </b>
          </p>
        </div>
        <div className={`${props.voir == "voir" ? "col-3" : "col-5"}`}>
          <div className="row">
            {props.voir == "voir" ? null : (
              <div className="col-8 d-flex justify-content-end pl-0">
                <button
                  className="btn LinkItClient mr-1"
                  onClick={() => setLinkToclient(true)}
                >
                  Link it to Client
                </button>
                {props.props.offer_signed ? null : (
                  <button
                    disabled={dsBtn.DSBTN}
                    onClick={() => MoveToSigned(props.props._id)}
                    className="btn SignedMark"
                  >
                    Mark as signed
                  </button>
                )}
              </div>
            )}

            <div className={`${props.voir == "voir" ? "col-12" : "col-4"}`}>
              <div className=" d-flex align-items-center justify-content-center">
                {deleteDsBtn.id === props.props._id ? (
                  <div className="d-flex justify-content-center align-items-center ml-1">
                    <span
                      className="filterLeadsLoader"
                      style={{ width: "38px", height: "38px" }}
                    />
                  </div>
                ) : (
                  <button
                    className={`col-6 px-0 RoundDiv cursor-pointer`}
                    style={{ border: "0px" }}
                    onClick={() =>
                      DeleteOffer(
                        props.props.offer_mode === "manual"
                          ? `delete-manual-offer/?doc_id=${props.props._id}&public_id=${props.props.offerDocument.file_public_id}`
                          : `delete-offer/?offerId=${props.props._id}`,
                        props.props._id
                      )
                    }
                  >
                    <img
                      src={require("../../images/Deletebucket.svg").default}
                    />
                  </button>
                )}
                {dsBtn.id === props.props._id ? (
                  <div className="d-flex justify-content-center align-items-center ml-1">
                    <span
                      className="filterLeadsLoader"
                      style={{ width: "38px", height: "38px" }}
                    />
                  </div>
                ) : props.props.offer_mode === "manual" ? (
                  <button
                    className={`col-6 px-0 RoundDiv cursor-pointe`}
                    style={{ border: "0px", margin: "0px 6px 0px 26px" }}
                    onClick={() => window.open(props.props.offerDocument.url)}
                  >
                    <img src={require("../../images/dowBtn.svg").default} />
                  </button>
                ) : (
                  <button
                    className={`col-6 px-0 RoundDiv cursor-pointe`}
                    style={{ border: "0px", margin: "0px 6px 0px 26px" }}
                    onClick={() => DownLoadOffer(props.props._id)}
                  >
                    <img src={require("../../images/dowBtn.svg").default} />
                  </button>
                )}
                {LinkToclient ? (
                  <LinkItModal
                    closeModel={setLinkToclient}
                    props={props.props}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Card;
