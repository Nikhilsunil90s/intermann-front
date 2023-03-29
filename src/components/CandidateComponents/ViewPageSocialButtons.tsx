import React from "react";

function SocialButtons({ props }) {
  return (
    <>
      <div className="text-start px-1">
        <p className="Span-Styling pt-2 my-1">
          {props.candidatEmail ? "Mail :" + props.candidatEmail : null}
        </p>
      </div>
      {props.candidatEmail ? (
        <button className=" btn-gmail my-1">
          <a
            href={`mailto:${props.candidatEmail}`}
            className="text-dark fw-bold"
            target="_blank"
          >
            <span className="padding-email">
              <img alt="..." src={require("../../images/gmail.svg").default} />
            </span>
            Send Email
          </a>
        </button>
      ) : null}
      <div className="text-start px-1">
        <p className="Span-Styling my-2 px-3">
          {" "}
          {props.candidatFBURL ? "Facebook :" + props.candidatFBURL : null}
        </p>
      </div>
      {props.candidatFBURL ? (
        <a
          href={props.candidatFBURL}
          target="_blank"
          className="btn btn-Facebookpresee my-1"
        >
          <span className="padding-email">
            <img
              style={{ width: "4%" }}
              src={require("../../images/facebook.svg").default}
            />
          </span>
          See Profile
        </a>
      ) : null}

      <div className="text-start px-1">
        <p className="Span-Styling my-2 px-3">
          {props.candidatPhone ? "Phone :" + props.candidatPhone : null}
        </p>
      </div>
      {props.candidatPhone ? (
        <a href={`https://wa.me/${props.candidatPhone}`} target="_blank">
          <button className="btn-whatsapp mt-1 mb-1">
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
      <div className="text-start px-1">
        <p className="Span-Styling mt-2 mb-1 px-3">
          {props.candidatAlternatePhone
            ? " Phone 2 :" + props.candidatAlternatePhone
            : null}
        </p>
      </div>
      {props.candidatAlternatePhone ? (
        <a
          href={`https://wa.me/${props.candidatAlternatePhone}`}
          target="_blank"
        >
          <button className="btn-whatsapp ">
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
export default SocialButtons;
