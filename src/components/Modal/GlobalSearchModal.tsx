import React, { useEffect,  useRef } from "react";

export default function SearchModal({
  props,
  closeModal,
  value,
  ReloadSearch,
  Text,
  InputState,
  Data,
}) {
  const ref = useRef();

  useOnClickOutside(ref, () =>
    setTimeout(() => {
      closeModal(false);
      value(false);
    }, 1000)
  );

  function useOnClickOutside(ref, handler) {
    useEffect(() => {
      const listener = (event) => {
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
    }, [ref, handler]);
  }

  const ListPage = (data) => {
    if (data.candidatName) {
      value(false);
      InputState(false);
      ReloadSearch(0);
      Data([]);

      if (data.candidatStatus == "To-Do") {
        localStorage.setItem("profile", JSON.stringify(data));
        window.open("/todolist/todoprofile");

        Text("");
        setTimeout(() => {
          closeModal(false);
        }, 1500);
      }
      if (data.candidatStatus == "In-Progress") {
        localStorage.setItem("embauch", JSON.stringify(data));

        window.open("/embauchlist/embauchprofile");

        Text("");
        setTimeout(() => {
          closeModal(false);
        }, 500);
      }
      if (data.candidatStatus == "Archived") {
        localStorage.setItem("archive", JSON.stringify(data));

        window.open("/archivedlist/archivedprofile");

        Text("");
        setTimeout(() => {
          closeModal(false);
        }, 500);
      }
      if (data.candidatStatus == "Pre-Selected") {
        localStorage.setItem("profile", JSON.stringify(data));

        window.open("/preSelected/preSelectedView");

        Text("");
        setTimeout(() => {
          closeModal(false);
        }, 500);
      }
    } else if (data.clientCompanyName) {
      value(false);
      InputState(false);
      ReloadSearch(0);
      Data([]);
      if (data.jobStatus == "To-Do") {
        Text("");
        localStorage.setItem("profile", JSON.stringify(data));
        window.open("/clientTodo/clientToDoProfile");

        setTimeout(() => {
          closeModal(false);
        }, 500);
      }
      if (data.jobStatus == "In-Progress") {
        Text("");
        localStorage.setItem("embauch", JSON.stringify(data));
        window.open("/clientProgress/clientInProgressProfile");
        setTimeout(() => {
          closeModal(false);
        }, 500);
      }
      if (data.jobStatus == "Archived") {
        Text("");
        localStorage.setItem("archive", JSON.stringify(data));
        window.open("/archived/archivedClientSeeprofile");

        setTimeout(() => {
          closeModal(false);
        }, 500);
      }
      if (data.jobStatus == "Signed Contract") {
        Text("");
        localStorage.setItem("archive", JSON.stringify(data));
        window.open("/clientContract/clientSigned");
        setTimeout(() => {
          closeModal(false);
        }, 500);
      }
    }
  };

  return (
    <>
      <div
        className="col-12 d-flex pb-1 cursor-pointer"
        onClick={() => ListPage(props)}
        ref={ref}
      >
        <div className="row hoverSearchList">
          <div className="col-2">
            <div className="imgManLogo" />
          </div>
          <div className="col-3 nameCard">
            <p className="mb-0">
              {props.candidatName
                ? props.candidatName.length > 16
                  ? props.candidatName.slice(0, 15) + "..."
                  : props.candidatName
                : props.clientCompanyName
                ? props.clientCompanyName.length > 16
                  ? props.clientCompanyName.slice(0, 15) + "..."
                  : props.clientCompanyName
                : "No Card!"}
            </p>
          </div>
          <div className="col-3 nameCard ml-1">
            <p className="mb-0">
              {props.candidatActivitySector
                ? props.candidatActivitySector.length > 16
                  ? props.candidatActivitySector.slice(0, 15) + "..."
                  : props.candidatActivitySector
                : props.clientJob
                ? props.clientJob.length > 16
                  ? props.clientJob.slice(0, 15)
                  : props.clientJob
                : "No Job!"}
            </p>
          </div>

          <div className="col-3 nameCardbtn ml-1">
            {props.candidatStatus == "To-Do" || props.jobStatus == "To-Do" ? (
              <button className="todoBtnStyleCard p-0">To Do</button>
            ) : props.candidatStatus == "In-Progress" ||
              props.jobStatus == "In-Progress" ? (
              <button className="EmbaucheCardSearchBtn p-0">IN PROGRESS</button>
            ) : props.candidatStatus == "Archived" ||
              props.jobStatus == "Archived" ? (
              <button className="ArchivedCardSearchBtn p-0">Archive</button>
            ) : props.jobStatus == "Signed Contract" ? (
              <button
                className="SignedClientBtn"
                style={{
                  padding: "10px 8px",
                  fontSize: "10px",
                  fontWeight: "400",
                }}
              >
                SIGNED CONTRACT
              </button>
            ) : props.candidatStatus == "Pre-Selected" ? (
              <button className="preLargebtnCard">PRE Selected</button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
