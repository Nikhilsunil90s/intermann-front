import React, { useState, useEffect } from "react";
import Filter from "../components/Filter";
import Header from "../components/Header";
import LeadCard from "../components/LeadsCard";
import { API_BASE_URL } from "../../config/serverApiConfig";
import { motion } from "framer-motion";
import Warning from "../../components/Loader/SearchBarError";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import com_tab_b1 from "../../../src/images/com_tab_b1.svg";
import com_tab_btn2 from "../../../src/images/com_tab_btn2.svg";
import com_tab_btn3 from "../../../src/images/com_tab_btn3.svg";
import com_tab_btn4 from "../../../src/images/com_tab_btn4.svg";
import MoveLeadModal from "../components/Modal/wantToMoveLead";

function MainCenter() {
  const [Leads, setLeads] = useState([]);
  const [update, setUpdate] = useState(false);
  const [loader, setLoader] = useState(false);
  const [leads, setleads] = useState([]);
  const [Currentleads, setCurrentLeads] = useState(0) as any;
  const [tab, setTab] = useState("En Cours");
  const [wantToMoveLead,setWantToMoveLead]=useState(false)
  const [moveLead_data,setMoveLead_data]=useState({
    id:"",
    status:{}
  })
  const [CurrentFilter, setCurrentFilter] = useState({
    filterApplied: false,
    FilterData: [],
  }) as any;

  const fetchLeads = async () => {
    setLoader(false);
    await fetch(API_BASE_URL + `getAllCommercialLeads/?leadType=${tab}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
    })
      .then((red) => red.json())
      .then((resData) => {
        if (resData.status) {
          setLoader(true);
          setLeads([...resData.data]);
          setleads([...resData.data]);
          setCurrentLeads(resData.notContactedCount);
          setUpdate(false);
          setLoader(true);
        } else {
          setLoader(true);
          setUpdate(true);
          setLeads([]);
          setleads([]);
          setLoader(true);
          setCurrentLeads(resData.notContactedCount);
        }
      })
      .catch((err) => err);
  };
  const moveLeads = async (status,id) => {
    return await fetch(API_BASE_URL + "updateLeadStatus", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
      body: JSON.stringify({
        leadId: id,
        statusChangesTo: status,
      }),
    })
      .then((resD) => resD.json())
      .then((reD) =>{
        if(reD.status ){
           toast.success(reD.message)
           setUpdate(true);
           setMoveLead_data({...moveLead_data,id:"",status:{}})
           setWantToMoveLead(false)
        }else{
          toast.error(reD.message)
        }
      } )
      .catch((err) => err);
  };
  const isModalOpen=(event,id)=>{
    setMoveLead_data({...moveLead_data,id:id,status:event})
    setWantToMoveLead(true)
  }

  useEffect(() => {
    if (CurrentFilter.filterApplied == false) {
      fetchLeads();
    }
  }, [update, tab]);

  return (
    <>
      <Toaster
        containerStyle={{ zIndex: "999999999999999999999999999999" }}
        position={"top-right"}
      />
      <section className="" style={{ marginTop: "90px" }}>
        <div className="px-1">
          <Header />
        </div>
        <div className="container-fluid">
          <div className="row px-1">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 30,
                damping: 15,
              }}
              className="col-12 p-1 my-1"
              style={{ background: "#ffff", borderRadius: "22px" }}
            >
              <Filter
                leadsSet={setLeads}
                leads={leads}
                setUpdate={setUpdate}
                setCurrentLeads={setCurrentLeads}
                setCurrentFilter={setCurrentFilter}
                CurrentFilter={CurrentFilter}
              />
            </motion.div>
            <div
              className="col-12 py-1 px-2 my-1"
              style={{ background: "#FFFFFF", borderRadius: " 9px" }}
            >
              <div className="row">
                <div className="col-6">
                  <p className="LeadsTopHeading mb-0">Leads à traiter</p>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-end ">
                  <p className="TotalLeads mb-0 text-black">
                    Il y a {Leads.length} leads en tout , et {Currentleads}{" "}
                    nouveaux leads non contacté
                  </p>
                </div>
                <div className="col-12 d-flex justify-content-center align-items-center my-2">
                  <button
                    onClick={() => {
                      setTab("En Cours");
                    }}
                    className={`d-flex justify-content-center gap-2 align-items-center px-3 py-1 ${
                      tab === "En Cours" ? "tab_Is_active" : "tab_In_active"
                    }`}
                  >
                    <img src={com_tab_b1} className="" height={30} width={30} />
                    En cours
                  </button>
                  <button
                    onClick={() => {
                      setTab("Stranger");
                    }}
                    className={`d-flex justify-content-center gap-2 align-items-center px-3 py-1 ${
                      tab === "Stranger" ? "tab_Is_active" : "tab_In_active"
                    }`}
                  >
                    <img
                      src={com_tab_btn2}
                      className=""
                      height={30}
                      width={30}
                    />
                    A l'étranger{" "}
                  </button>
                  <button
                    onClick={() => {
                      setTab("Signed");
                    }}
                    className={`d-flex justify-content-center gap-2 align-items-center px-3 py-1 ${
                      tab === "Signed" ? "tab_Is_active" : "tab_In_active"
                    }`}
                  >
                    <img
                      src={com_tab_btn3}
                      className=""
                      height={30}
                      width={30}
                    />
                    A signé 
                  </button>
                  <button
                    onClick={() => {
                      setTab("Archived");
                    }}
                    className={`d-flex justify-content-center gap-2 align-items-center px-3 py-1 ${
                      tab === "Archived" ? "tab_Is_active" : "tab_In_active"
                    }`}
                  >
                    <img
                      src={com_tab_btn4}
                      className=""
                      height={30}
                      width={30}
                    />
                    Archivé
                  </button>
                </div>
              </div>
              {loader ? (
                Leads.length > 0 ? (
                  Leads.map((el, i) => (
                    <LeadCard
                      props={el}
                      key={i}
                      length={i}
                      update={setUpdate}
                      setCurrentFilter={setCurrentFilter}
                      CurrentFilter={CurrentFilter}
                      Leads={Leads}
                      setLeads={setLeads}
                      isModalOpen={isModalOpen}
                    />
                  ))
                ) : (
                  <>
                    <div className="col-12 my-2 d-flex align-items-center justify-content-center noData text-black">
                      <Warning />
                      <p
                        className="TotalLeads mb-0"
                        style={{ fontSize: "15px" }}
                      >
                        No Leads!!
                      </p>
                    </div>
                  </>
                )
              ) : (
                <div className="col-12 my-2 d-flex align-items-center justify-content-center">
                  <span className="Leads002"></span>
                </div>
              )}
            </div>
            {
              wantToMoveLead && <MoveLeadModal data={moveLead_data} moveLeads={moveLeads}  isModalOpen={isModalOpen}  closeModal={setWantToMoveLead}     />
            }
          </div>
        </div>
      </section>
    </>
  );
}
export default MainCenter;
