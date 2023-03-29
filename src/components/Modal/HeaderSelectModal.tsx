import React, { useEffect,  useRef } from "react";
import "../../CSS/Client/ArchivedCardClient.css";
function UploadDow({ closeModal }) {
  const onchange = (val: any) => {
    if (val == "ROUMAIN") {
      window.open("https://www.intermann.ro/");
    }
    if (val == "FRANCAIS") {
      window.open("https://www.intermann.fr/");
    }
  };

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
        className="modal d-flex HeaderModalContainer"
        ref={ref}
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog HeaderWidthModal">
          <div className="modal-content">
            <div className="modal-body HeaderWidthModal text-start">
              <button
                style={{
                  backgroundColor: "transparent",
                  border: "0px",
                  width: "100%",
                  height: "35px",
                  textAlign: "left",
                }}
                className="hoverbtnS"
                onClick={() => {
                  onchange("ROUMAIN");
                  closeModal(false);
                }}
              >
                <p className="VoirLESite mb-0 ml-1">VOIR LE SITE ROUMAIN</p>
              </button>
              <button
                onClick={() => {
                  onchange("FRANCAIS");
                  closeModal(false);
                }}
                style={{
                  marginTop: "10px",
                  backgroundColor: "transparent",
                  border: "0px",
                  width: "100%",
                  height: "35px",
                  textAlign: "left",
                }}
                className="hoverbtnS"
              >
                <p className="VoirLESite mb-0 ml-1">VOIR LE SITE FRANCAIS</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default UploadDow;
