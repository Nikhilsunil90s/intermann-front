import React, { useEffect, useRef } from "react";
function CSVModal({ props, closeModal, status }) {
  const ref = useRef();

  useOnClickOutside(ref, () => closeModal(false));

  function useOnClickOutside(ref, handler) {
    useEffect(
      () => {
        const listener = (event) => {
          // Do nothing if clicking ref's element or descendent elements
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
          handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      },
      // Add ref and handler to effect dependencies
      // It's worth noting that because the passed-in handler is a new ...
      // ... function on every render that will cause this effect ...
      // ... callback/cleanup to run every render. It's not a big deal ...
      // ... but to optimize you can wrap handler in useCallback before ...
      // ... passing it into this hook.
      [ref, handler]
    );
  }

  return (
    <>
      <div
        className="modal d-block"
        style={{ backgroundColor: "#00000052" }}
        id="staticBackdrop2"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg"
          style={{ width: "605px", marginTop: "100px" }}
        >
          <div className="modal-content">
            <div className="col-12">
              <div className="row justify-content-end">
                <div className="col-4 text-end d-flex justify-content-end align-items-end">
                  <button
                    type="button"
                    className="btn-close p-1"
                    onClick={() => {
                      closeModal(false);
                    }}
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
              </div>
            </div>
            <div className="modal-body text-start">
              <div
                className="col-12 d-flex justify-content-center align-items-center"
                style={{ height: "19vh" }}
              >
                <p
                  className="mb-0 d-grid"
                  style={{
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: "600",
                    fontSize: "18px",
                    lineHeight: "24px",
                    color: "#000",
                  }}
                >
                  <div className="col-12 d-flex justify-content-center mb-1">
                    <img alt="..."
                      style={{ width: "57px" }}
                      src={
                        status
                          ? require(`../../images/checkmark.svg`).default
                          : require(`../../images/cancelicon.svg`).default
                      }
                    />
                  </div>
                  {props}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CSVModal;
