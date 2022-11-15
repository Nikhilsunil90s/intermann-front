import React,{useRef,useEffect,useState} from "react";
import MonthModal from "../Modal/NotesModal";

function LeadCenterMiniCard({props,activeUser}) {
  const [monthModal,setMonthModal] =useState(false)
  
  const ref = useRef();
  useOnClickOutside(ref, () => setMonthModal(false));

  // console.log(props.emailAddress.substring(0, props.emailAddress.lastIndexOf("@")),"email")
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
      [ref, handler]
    );
  }

  return (
    <>
      <div className="col-12 card ml-0 my-1 mr-0"  style={{ padding: "5px 10px", borderRadius: "10px",width:"295px" }}>
      
            <div className="card-content">
              <div className="card-body">
                <div
                  className="col-12"
                  style={{ borderBottom: "1px solid #F4F5F7" }}
                >
                  <div className="row " style={{ marginBottom: "10px" }}>
                    <div className="col-2">
                      <img
                        src={require("../../images/card-men.svg").default}
                        style={{ width: "40px" }}
                      />
                    </div>
                    <div className="col-7 media-body d-grid">
                      <p className="leadCardUser">{props.username}</p>
                      <span className="leadSpan">Stats This Month</span>
                    </div>
                    <div className="col-3 media-body text-right px-0 cursor-pointer" >
                      <>
                        <p className="NumberStylingARchived text-start"  onClick={(e)=>{setMonthModal(true)}}>
                          Monthly{" "}
                          <img
                            src={require("../../images/Vector-9.svg").default}
                          />
                        </p>
                      </>
                      {monthModal ?
                      <>
                      <div className="d-grid Monthlydropdown" ref={ref} style={{border:"1px solid #484848"}}>
                        <div className=" d-flex align-items-center justify-content-start LeadMothlyDropDown"><p className="mb-0 VoirLESite">Monthly</p></div>
                        <div className="d-flex align-items-center justify-content-start LeadMothlyDropDown"><p className="mb-0 VoirLESite">Week</p></div>
                        <div className="d-flex align-items-center justify-content-start LeadMothlyDropDown"><p className="mb-0 VoirLESite">Days</p></div>
                      </div>
                      </>
                      :
                         null
                      }
                     </div>
                     </div>
                </div>
                <div className="col-12" style={{ marginTop: "8px" }}>
                  <div className="row justify-content-between">
                    <div className="col-3 px-0 text-center">
                      <div className="CardDetails">
                        <p className="mb-0">{props?.contactedLeads.count} Calls</p>
                      </div>
                    </div>
                    <div className="col-4 px-0 text-center">
                      <div className="CardDetails">
                        <p className="mb-0">{props.qualifiedLeads.count} Qualified</p>
                      </div>
                    </div>
                    <div className="col-4 px-0 text-center">
                      <div className="CardDetails">
                        <p className="mb-0">{props.preContactedLeads.count} PreCalls</p>
                      </div>
                    </div>
                    <div
                      className="col-6 pl-0 text-center"
                      style={{ paddingTop: "7px" }}
                    >
                      <div className="CardDetails">
                        <p className="mb-0">{props.leadsAddedToCRM.count} Added TO CRM</p>
                      </div>
                    </div>
                    <div className="col-6 d-flex justify-content-end align-items-end">
                      <span className={props?.emailAddress === activeUser?.emailAddress ? "activeCard" : "deActive"}></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
   
      </div>
    </>
  );
}
export default LeadCenterMiniCard;
