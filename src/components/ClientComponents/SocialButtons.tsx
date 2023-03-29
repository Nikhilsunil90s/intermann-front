import React from "react";

function SocialButton({ props }) {
  return (
    <>
      <div className="d-flex">
        <p className="Span-StylingClient text-start pt-2 pb-1 my-1">
          {props.clientEmail ? "Company Mail :" + props.clientEmail : null}
        </p>
      </div>
      {props.clientEmail ? (
        <button className="btn-TODOgmail">
          <a
            href={`mailto:${props.clientEmail}`}
            className="text-dark fw-bold"
            target="_blank"
          >
            <span className="padding-email">
              <img
                style={{ width: "8%" }}
                src={require("../../images/gmail.svg").default}
              />
            </span>
            Send Email
          </a>
        </button>
      ) : null}

      <div className="d-flex">
        <p className="Span-StylingClient text-start pt-2 pb-1 my-1">
          {props.clientReferenceEmail
            ? "Contact :" + props.clientReferenceEmail
            : null}
        </p>
      </div>

      {props.clientReferenceEmail ? (
        <a
          href={`mailto:${props.clientReferenceEmail}`}
          target="_blank"
          className="btn  fw-bold btn-TODOgmail"
        >
          <span className="padding-email">
            <img  alt="..." src={require("../../images/gmail.svg").default} />
          </span>
          Send Email
        </a>
      ) : null}

      <div className="d-flex">
        <p className="Span-StylingClient text-start pt-2 pb-1 my-1">
          {props.clientPhone ? "Company Phone :" + props.clientPhone : null}
        </p>
      </div>
      {props.clientPhone ? (
        <a href={`https://wa.me/${props.clientPhone}`} target="_blank">
          <button className="btn-whatsapp my-1">
            <span className="padding-email">
              <img
                style={{ width: "8%" }}
                src={require("../../images/whatsapp.svg").default}
              />
            </span>
            Send What’s App
          </button>
        </a>
      ) : null}

      <div className="d-flex">
        <p className="Span-StylingClient text-start pt-2 pb-1 my-1">
          {props.clientReferenceNumber
            ? "Contact Phone :" + props.clientReferenceNumber
            : null}
        </p>
      </div>
      {props.clientReferenceNumber !== "" ? (
        <a
          href={`https://wa.me/${props.clientReferenceNumber}`}
          target="_blank"
        >
          <button className="btn-whatsapp my-1">
            <span className="padding-email">
              <img
                style={{ width: "8%" }}
                src={require("../../images/whatsapp.svg").default}
              />
            </span>
            Send What’s App
          </button>
        </a>
      ) : null}
    </>
  );
}
export default SocialButton;
