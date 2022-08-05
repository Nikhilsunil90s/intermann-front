import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import "../../CSS/Client/ClientTodo.css";
import ClientToDoCard from "../../pages/ClientPages/ClientTodoCard";
import toast, { Toaster } from "react-hot-toast";
import { API_BASE_URL } from "../../config/serverApiConfig";
import { ColourOption } from "../../Selecteddata/data";
import ProfileLoader from "../../components/Loader/ProfilesLoader";
import chroma from "chroma-js";
import Select, { StylesConfig } from "react-select";
import { ReactComponent as RatingStar } from "../../images/RatingStar.svg";
import { ReactComponent as Empty } from "../../images/emptyStar.svg";
import Switch from "react-switch";
import Loader from "../../components/Loader/loader";
import { ReactComponent as TurnoFF } from "../../images/FatX.svg";
import { ReactComponent as TurnOn } from "../../images/base-switch_icon.svg";

declare namespace JSX {
  interface IntrinsicElements {
    "lottie-player": any;
  }
}
let SelectedName = [];
let FilterJob = [];
let MotivationArr = [];
let OthersFilterArr = [];
let Importance = [];
let email=false;
let phone=false;
let MultiBvalues=[]
function ClientToDoList() {
  const [loader, setLoader] = useState(true);
  const [sectors, setSectors] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState([]);
  const [nameOptions, setNameOptions] = useState([]);
  const [sectorOptions, setSectorOptions] = useState([]);
  const [jobOptions, setJobOptions] = useState([]);
  const [EmailCheck, setEmailCheck] = useState(false);
  const [PhoneNumberMissing, setMissing] = useState(Boolean);
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [status, setStatus] = useState(Boolean);
  const [showMore, setShowMore] = useState(true);
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  const [optionsOthersFilter, setOtherOptions] = useState([]);
  const [motivationOptions, setMotivationOptions] = useState([]);
  const [importanceOptions, setImportanceOptions] = useState([]) as any;
  console.log(status);
  console.log(selectedSector, selectedJob, "allfield");
 

  const colourStyles: StylesConfig<ColourOption, true> = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ":hover": {
        backgroundColor: data.color,
        color: "white",
      },
    }),
  };
  console.log(EmailCheck, "email");

  const MissingHandler = (checked, e, id) => {
    setNameOptions([]);
    SelectedName = [];
    setMotivationOptions([]);
    setOtherOptions([]);
    setJobs([]);
    FilterJob = [];
    MotivationArr = [];
    OthersFilterArr = [];
    Importance = [];
    OthersFilterArr = [];
    setImportanceOptions([]);
    setSectorOptions([]);
    setSectors([]);
    setSelectedJob([]);
    setSelectedSector("");
    console.log(id, "id");
    if (id == "EmailMissing") {
      if (checked == true) {
        email=true
        filterFunction()
      }
      if (checked== false) {
        setEmailCheck(true);
        email=false
        filterFunction()
      }
    }
    if (id == "PhoneNumberMissing") {
      if (checked == true) {
        phone=true;
        filterFunction()
      }
      if (checked == false) {
         phone=false;
        filterFunction()
      }
    }
  };

  useEffect(() => {
    if (sectors.length == 0) {
      fetchAllSectors()
        .then((data) => {
          console.log(data.data);
          setSectors([...data.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    let jobResults = jobs.map((ajob) => {
      return { value: ajob.jobName, label: ajob.jobName, color: "#FF8B00" };
    });
    setJobOptions([...jobResults]);
    console.log(jobs);
  }, [jobs]);
  useEffect(() => {
    console.log(sectors);
    let sectorops = sectors.map((asector) => {
      return {
        value: asector.sectorName,
        label: asector.sectorName,
        color: "#FF8B00",
      };
    });

    setSectorOptions([
      {
        value: "Select Un Secteur",
        label: "Select Un Secteur",
        color: "#FF8B00",
      },
      ...sectorops,
    ]);
  }, [sectors]);

  useEffect(() => {
    filterFunction();
  }, [selectedLanguages, selectedJob, selectedSector]);
  const fetchAllSectors = async () => {
    return await fetch(API_BASE_URL + "fetchAllSectors", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((resp) => resp.json())
      .then((respData) => respData)
      .catch((err) => err);
  };

  const fetchAllJobs = async (sector: string) => {
    if (sector === "Select Un Secteur") {
      // return {
      //   data: []
      // }
      setSelectedSector("");
      setSelectedJob([]);
    }
    return await fetch(API_BASE_URL + `fetchAllJobs/?sector=${sector}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((resD) => resD.json())
      .then((reD) => reD)
      .catch((err) => err);
  };
  const handleNameChange = (e: any) => {
    // setEmail("")
    // setPhone("")
    // console.log(e.target.value)
    email=false;
    phone=false;
    SelectedName = [];
    Importance = [];
    MotivationArr = [];
    OthersFilterArr = [];
    setSelectedSector("");
    setSelectedJob([]);
    if (e.value === "Select Name") {
      SelectedName = [];
      filterFunction();
    } else if (e.value !== "Select Name") {
      SelectedName = [];
      MotivationArr = [];
      let NameField = e.value;
      SelectedName.push(NameField);
    }
  };

  const HandelOthers = (e) => {
    // setEmail("")
    // setPhone("")
    console.log(e)
    email=false;
    phone=false;
    SelectedName = [];
    setSelectedSector("");
    Importance = [];
    MotivationArr = [];
    FilterJob = [];
    console.log(e.value);
    let OthersF=[]
    e.map((el)=>{
      OthersF.push(el.value)
    })
    OthersFilterArr=OthersF
    filterFunction();
  };
  const handleMotivationChange = (e: any) => {
    // setEmail("")
    // setPhone("")
    // console.log(e.target.value)
    email=false;
    phone=false;
    MotivationArr = [];
    Importance = [];
    OthersFilterArr = [];
    setSelectedSector("");
    SelectedName = [];
    if (e.value === "Select Motivation") {
      MotivationArr = [];
      filterFunction();
      setLoader(true);
    } else if (e.value !== "Select Motivation") {
      MotivationArr = [];
      let MField = e.value;

      console.log(MField, "motivation");
      MotivationArr.push(MField - 1);
      filterFunction();
      // setSelectedSector(sectorField);
    }
  };

  const fetchProfiles = async () => {
    return await fetch(API_BASE_URL + "allToDoClients", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((resD) => resD.json())
      .then((reD) => reD)
      .catch((err) => err);
  };
  const importanceHandel = (e) => {
    // setEmail("")
    // setPhone("")
    email=false;
    phone=false;
    SelectedName = [];
    setSelectedSector("");
    MotivationArr = [];
    FilterJob = [];
    Importance = [];
    if (e.value == "Select Importance") {
      Importance = [];
    } else if (e.value != "Select Importance") {
      Importance.push(e.value);
      filterFunction();
    }
  };

  const handleSectorChange = (e: any) => {
    // console.log(e.target.value)
    // setEmail("")
    // setPhone("")
    SelectedName = [];
    MotivationArr = [];
    OthersFilterArr = [];
    FilterJob = [];
    setSelectedJob([]);
    console.log(e);
    if (e.value === "Select Un Secteur") {
      setJobs([]);
      setSelectedSector("");
      setJobOptions([]);
      setLoader(true);
    } else if (e.value !== "Select Un Secteur") {
      let sectorField = e.value;
      setSelectedSector(sectorField);
      setJobOptions([]);
    }

    fetchAllJobs(e.value)
      .then((data) => {
        // console.log(data);
        setJobs([...data.data]);
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  useEffect(() => {
    setSelectedJob(FilterJob);
  }, [selectedJob]);
  const HandleChecked = (e: any, job: any) => {
    // FilterJob=[]
    if (!FilterJob.find((e) => e == job.jobName)) {
      console.log("hello");
      FilterJob.push(job.jobName);
      setSelectedJob(FilterJob);
    } else {
      if (FilterJob.length === 1) {
        FilterJob = [];
      }
      FilterJob = FilterJob.filter((item) => {
        return item !== job.jobName;
      });
      setSelectedJob(FilterJob);
    }
  };
  const getSelectedLanguage = (e: any) => {
    if (e.target.checked) {
      addLanguages(e.target.value);
    } else {
      removeLanguages(e.target.value);
    }
  };

  const addLanguages = (lang: string) => {
    setSelectedLanguages((prev) => [...prev, lang]);
  };

  const removeLanguages = (lang: string) => {
    setSelectedLanguages(selectedLanguages.filter((l) => l !== lang));
    setSelectedLanguages([]);
  };

  const filterFunction = async () => {
    setLoader(false);

    if (
      selectedSector.length === 0 &&
      selectedJob.length === 0 &&
      selectedLanguages.length === 0 &&
      SelectedName.length == 0 &&
      MotivationArr.length == 0 &&
      Importance.length == 0  &&
      OthersFilterArr.length ==0 &&
      email == false && 
      phone == false 
   
    ) {
      setLoader(true);
      setStatus(true);
      fetchProfiles()
        .then((res) => setFilterData([...res]))
        .catch((err) => {
          console.log(err);
        });
    }
    if (MotivationArr.length > 0) {
      fetch(
        `${API_BASE_URL}filterClients/?clientMotivation=${MotivationArr}&jobStatus=To-Do`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
        .then((reD) => reD.json())
        .then((result) => {
          if (result.total == 0) {
            setLoader(true);
            setStatus(false);
          } else if (result.total > 0) {
            setFilterData([...result.data]);
            setLoader(true);
            setStatus(true);
          }
        })
        .catch((err) => err);
      setLoader(true);
    }

    if (
      selectedSector.length > 0 &&
      FilterJob.length == 0 &&
      selectedLanguages.length == 0
    ) {
      await fetch(
        `${API_BASE_URL}filterClients/?clientActivitySector=${selectedSector}&jobStatus=To-Do`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
        .then((reD) => reD.json())
        .then((result) => {
          if (result.total == 0) {
            setLoader(true);
            setStatus(false);
          } else if (result.total > 0) {
            setFilterData([...result.data]);
            setLoader(true);
            setStatus(true);
          }
        })
        .catch((err) => err);
      setLoader(true);
    }
    if (
      selectedSector.length > 0 &&
      FilterJob.length > 0 &&
      selectedLanguages.length == 0
    ) {
      await fetch(
        `${API_BASE_URL}filterClients/?clientJob=${FilterJob}&jobStatus=To-Do`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
        .then((reD) => reD.json())
        .then((result) => {
          if (result.total == 0) {
            setLoader(true);
            setStatus(false);
          } else if (result.total > 0) {
            setFilterData([...result.data]);
            setLoader(true);
            setStatus(true);
          }
        })
        .catch((err) => err);
      setLoader(true);
    }

    if (SelectedName.length > 0) {
      await fetch(
        `${API_BASE_URL}filterClients/?clientCompanyName=${SelectedName}&jobStatus=To-Do`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
        .then((reD) => reD.json())
        .then((result) => {
          if (result.total == 0) {
            setLoader(true);
            setStatus(false);
          } else if (result.total > 0) {
            setFilterData([...result.data]);
            setLoader(true);
            setStatus(true);
          }
        })
        .catch((err) => err);
    }
    if (Importance.length > 0) {
      await fetch(
        `${API_BASE_URL}filterClients/?clientImportance=${Importance}&jobStatus=To-Do`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
        .then((reD) => reD.json())
        .then((result) => {
          if (result.total == 0) {
            setLoader(true);
            setStatus(false);
          } else if (result.total > 0) {
            setFilterData([...result.data]);
            setLoader(true);
            setStatus(true);
          }
        })
        .catch((err) => err);
    }
    if(email === true){
      EmailFetch()
    }
    if(phone === true){
      await fetch(
        `${API_BASE_URL}filterClientsByMissingEmailOrPhone/?field=phone&status=To-Do`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
        .then((reD) => reD.json())
        .then((result) => {
          if (result.status == false) {
            setLoader(true);
            setStatus(false);
          } else if (result.status == true) {
            setFilterData([...result.data]);
            setLoader(true);
            setStatus(true);
          }
        })
        .catch((err) => err);
    }
    if(OthersFilterArr.length > 0){
      await fetch(
        `${API_BASE_URL}filterClientsByAttributes/?filters=${OthersFilterArr.toString()}&status=To-Do`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
        .then((reD) => reD.json())
        .then((result) => {
          if (result.status == false) {
            setLoader(true);
            setStatus(false);
          } else if (result.status == true) {
            setFilterData([...result.data]);
            setLoader(true);
            setStatus(true);
          }
        })
        .catch((err) => err);
    }
  };

  useEffect(() => {
    if (nameOptions.length == 0) {
      fetchProfiles()
        .then((profilesResult) => {
          let nameops = profilesResult.map((pro) => {
            return {
              value: pro.clientCompanyName,
              label: pro.clientCompanyName,
              color: "#FF8B00",
            };
          });
          console.log(nameops, "console");
          setNameOptions([
            { value: "Select Name", label: "Select Name", color: "#FF8B00" },
            ...nameops,
          ]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (optionsOthersFilter.length == 0) {
      setOtherOptions([
        {
          value: "Select Others",
          label: "Select Others",
          color: "#FF8B00",
        },
        {
          value: "offerSent",
          label: "Offre envoyé ?",
          color: "#FF8B00",
        },
        {
          value: "signatureSent",
          label: "Signature digitale envoyé ?",
          color: "#FF8B00",
        },
        {
          value: "contractSigned",
          label: "Client Signe ?",
          color: "#FF8B00",
        },
        {
          value: "publicityStarted",
          label: "Publicité commencé ?",
          color: "#FF8B00",
        },
        {
          value: "A1selected",
          label: "A1 ?",
          color: "#FF8B00",
        },
        {
          value: "assuranceFaite",
          label: "Assurance faite ?",
          color: "#FF8B00"
        },
        {
          value: "agenceDeVoyage",
          label: "Agence de voyage ok ?",
          color: "#FF8B00",
        },
        {
          value: "sispiDeclared",
          label: "SISPI déclaré ?",
          color: "#FF8B00",
        },
      ]);
    }
    if (importanceOptions.length == 0) {
      setImportanceOptions([
        {
          value: "Select Importance",
          label: "Select Importance",
          color: "#FF8B00",
        },
        {
          value: "1",
          label: (
            <>
              <RatingStar
                style={{ height: "25px", width: "25px", borderRadius: "30px" }}
              />{" "}
              <Empty
                style={{ height: "25px", width: "25px", borderRadius: "30px" }}
              />{" "}
              <Empty
                style={{ height: "25px", width: "25px", borderRadius: "30px" }}
              />{" "}
              <Empty
                style={{ height: "25px", width: "25px", borderRadius: "30px" }}
              />{" "}
              <Empty
                style={{ height: "25px", width: "25px", borderRadius: "30px" }}
              />
            </>
          ),
          color: "#FF8B00",
        },
        {
          value: "2",
          label: (
            <>
              <RatingStar
                style={{ height: "25px", width: "25px", borderRadius: "30px" }}
              />{" "}
              <RatingStar
                style={{ height: "25px", width: "25px", borderRadius: "30px" }}
              />{" "}
              <Empty
                style={{ height: "25px", width: "25px", borderRadius: "30px" }}
              />{" "}
              <Empty
                style={{ height: "25px", width: "25px", borderRadius: "30px" }}
              />{" "}
              <Empty
                style={{ height: "25px", width: "25px", borderRadius: "30px" }}
              />
            </>
          ),
          color: "#FF8B00",
        },
        {
          value: "3",
          label: (
            <>
              <RatingStar
                style={{ height: "25px", width: "25px", borderRadius: "30px" }}
              />{" "}
              <RatingStar
                style={{ height: "25px", width: "25px", borderRadius: "30px" }}
              />{" "}
              <RatingStar
                style={{ height: "25px", width: "25px", borderRadius: "30px" }}
              />{" "}
              <Empty
                style={{ height: "25px", width: "25px", borderRadius: "30px" }}
              />{" "}
              <Empty
                style={{ height: "25px", width: "25px", borderRadius: "30px" }}
              />
            </>
          ),
          color: "#FF8B00",
        },
        {
          value: "4",
          label: (
            <>
              <RatingStar
                style={{ height: "25px", width: "25px", borderRadius: "30px" }}
              />{" "}
              <RatingStar
                style={{ height: "25px", width: "25px", borderRadius: "30px" }}
              />{" "}
              <RatingStar
                style={{ height: "25px", width: "25px", borderRadius: "30px" }}
              />{" "}
              <RatingStar
                style={{ height: "25px", width: "25px", borderRadius: "30px" }}
              />{" "}
              <Empty
                style={{ height: "25px", width: "25px", borderRadius: "30px" }}
              />
            </>
          ),
          color: "#FF8B00",
        },
        {
          value: "5",
          label: (
            <>
              <RatingStar
                style={{ height: "25px", width: "25px", borderRadius: "30px" }}
              />{" "}
              <RatingStar
                style={{ height: "25px", width: "25px", borderRadius: "30px" }}
              />{" "}
              <RatingStar
                style={{ height: "25px", width: "25px", borderRadius: "30px" }}
              />{" "}
              <RatingStar
                style={{ height: "25px", width: "25px", borderRadius: "30px" }}
              />{" "}
              <RatingStar
                style={{ height: "25px", width: "25px", borderRadius: "30px" }}
              />
            </>
          ),
          color: "#FF8B00",
        },
      ]);
    }
    if (motivationOptions.length == 0) {
      setMotivationOptions([
        {
          value: "Select Motivations",
          label: "Select Motivations",
          color: "#FF8B00",
        },
        {
          value: "1",
          label: "😔",
          color: "#FF8B00",
        },
        {
          value: "2",
          label: "🙁",
          color: "#FF8B00",
        },
        {
          value: "3",
          label: "😊",
          color: "#FF8B00",
        },
        {
          value: "4",
          label: "🥰",
          color: "#FF8B00",
        },
        {
          value: "5",
          label: "😍",
          color: "#FF8B00",
        },
      ]);
    }

    console.log(nameOptions, " console.log()");
  });

  const jobChange = async (jobval) => {
    // console.log(jobval)
    let JobArr = [];
    jobval.map((el) => {
      JobArr.push(el.value);
    });
    FilterJob = JobArr;
    console.log(FilterJob, "flJob");
    filterFunction();
  };

  const EmailFetch=async()=>{
    await fetch(
      `${API_BASE_URL}filterClientsByMissingEmailOrPhone/?field=email&status=To-Do`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((reD) => reD.json())
      .then((result) => {
        if (result.status == false) {
          setLoader(true);
          setStatus(false);
        } else if (result.status == true) {
          setFilterData([...result.data]);
          setLoader(true);
          setStatus(true);
        }
      })
      .catch((err) => err);
  }

  const RestFilters = () => {
    setNameOptions([]);
    SelectedName = [];
    setMotivationOptions([]);
    setOtherOptions([]);
    setJobs([]);
    FilterJob = [];
    MotivationArr = [];
    OthersFilterArr = [];
    Importance =[];
    OthersFilterArr =[];
    setImportanceOptions([]);
    setSectorOptions([]);
    setSectors([]);
    setSelectedJob([]);
    setSelectedSector("");
    email=false;
    phone=false;
    setMissing(true)
    setEmailCheck(true)
    fetchAllSectors();
    filterFunction();
  };
  return (
    <>
      <Toaster
        position="top-right"
        containerStyle={{ zIndex: "9999999999999999999999" }}
      />
      <div className="container-fluid">
        <div className="row pd ">
          <div className="col-12 text-center">
            <div className="row text-start">
              <div
                className="card "
                style={{
                  padding: "15px 15px",
                  borderRadius: "15px",
                  marginBottom: "0px",
                }}
              >
                <div className="">
                  <p className="ClientTOPFamily">
                    Clients / Lead <span> List To Do</span>
                  </p>
                  <p className="child-text mb-0">
                    Ici vous avez la liste des sociétés qui font une{" "}
                    <b> demande pas encore traité</b>
                  </p>
                  <p className="child-text">
                    Vous devez toujours vous assurer d’avoir un maximum
                    d’information sur cette liste et déplacer les leads en
                    archive si plus d’actualité{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 bg-white p-2 rounded001 mt-1 mb-3">
            <div className="row ">
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                <p className="FiltreName">Filtre by name</p>
                <div className="dropdown">
                  <div aria-labelledby="dropdownMenuButton1">
                    {nameOptions.length > 0 ? (
                      <Select
                        name="candidatName"
                        closeMenuOnSelect={true}
                        placeholder="‎ ‎ ‎ Select Un Client"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleNameChange}
                        options={nameOptions}
                        styles={colourStyles}
                      />
                    ) : (
                      <div className="">
                     
                        <ProfileLoader
                          width={"64px"}
                          height={"45px"}
                          fontSize={"12px"}
                          fontWeight={600}
                          Title={""}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                <p className="FiltreName">Filtre Secteur d’activité</p>
                <div className="dropdown">
                  <div aria-labelledby="dropdownMenuButton1">
                    {sectorOptions.length > 0 ? (
                      <Select
                        name="ClientActivitySector"
                        closeMenuOnSelect={true}
                        placeholder="‎ ‎ ‎ Select Un Secteur"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleSectorChange}
                        options={sectorOptions}
                        styles={colourStyles}
                      />
                    ) : (
                      <p>Select Un Secteur!</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 px-120">
                <p className="FiltreName">Filtre selection métier / job</p>
                <div>
                  {jobOptions.length > 0 ? (
                    <Select
                      name="jobName"
                      closeMenuOnSelect={true}
                      isMulti
                      placeholder="‎ ‎ ‎ Select"
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={jobChange}
                      options={jobOptions}
                      styles={colourStyles}
                    />
                  ) : (
                    <p>Select A Sector!</p>
                  )}
                </div>
              </div>
              {showMore ? (
                <>
                  <div className="col-12 ">
                    <div className="row">
                      <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 pt-1">
                        <p className="FiltreName">Filtre by Motivation</p>
                        <div className="dropdown">
                          <div aria-labelledby="dropdownMenuButton1">
                            {motivationOptions.length > 0 ? (
                              <Select
                                name="ClientMotivation"
                                closeMenuOnSelect={true}
                                placeholder="‎ ‎ ‎ Select Motivation du Client"
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={handleMotivationChange}
                                options={motivationOptions}
                                styles={colourStyles}
                              />
                            ) : (
                              <div className="">
                                {" "}
                                <ProfileLoader
                                  width={"64px"}
                                  height={"45px"}
                                  fontSize={"12px"}
                                  fontWeight={600}
                                  Title={""}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 pt-1">
                        <p className="FiltreName">Filtre by Importance</p>
                        <div className="dropdown">
                          <div aria-labelledby="dropdownMenuButton1">
                            {importanceOptions.length > 0 ? (
                              <Select
                                name="ClientLicencePermis"
                                closeMenuOnSelect={true}
                                placeholder="‎ ‎ ‎ Select Licence Permis"
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={importanceHandel}
                                options={importanceOptions}
                                styles={colourStyles}
                              />
                            ) : (
                              <div className="">
                                {" "}
                                <ProfileLoader
                                  width={"64px"}
                                  height={"45px"}
                                  fontSize={"12px"}
                                  fontWeight={600}
                                  Title={""}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 pt-1">
                        <p className="FiltreName">Filter by other options</p>
                        <div className="dropdown">
                          <div aria-labelledby="dropdownMenuButton1">
                            {optionsOthersFilter.length > 0 ? (
                              <Select
                                name="ClientLicencePermis"
                                closeMenuOnSelect={true}
                                isMulti={true}
                                placeholder="‎ ‎ ‎ Select Licence Permis"
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={HandelOthers}
                                options={optionsOthersFilter}
                                styles={colourStyles}
                              />
                            ) : (
                              <div className="">
                             
                                <ProfileLoader
                                  width={"64px"}
                                  height={"45px"}
                                  fontSize={"12px"}
                                  fontWeight={600}
                                  Title={""}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="extraPadding">
                    <div className="col-12">
                      <div className="row justify-content-end">
                        <div className="col-12 mt-1">
                          <div className="row">
                            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-4 d-flex  align-items-center">
                              <p className="missing mb-0">
                                Phone number missing
                              </p>
                              <Switch
                                onChange={MissingHandler}
                                id="PhoneNumberMissing"
                                checked={phone}
                                checkedHandleIcon={
                                  <TurnOn
                                    style={{
                                      position: "absolute",
                                      width: "35px",
                                      height: "28px",
                                      top: "-3px",
                                      left: "-7px",
                                    }}
                                  />
                                }
                                height={24}
                                width={52}
                                uncheckedHandleIcon={
                                  <TurnoFF
                                    style={{
                                      position: "absolute",
                                      width: "35px",
                                      height: "28px",
                                      top: "-3px",
                                      left: "-6px",
                                    }}
                                  />
                                }
                              />
                            </div>
                            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-4 d-flex  align-items-center">
                              <p className="missing mb-0">Email missing</p>
                              <Switch
                                onChange={MissingHandler}
                                id="EmailMissing"
                                checked={email}
                                checkedHandleIcon={
                                  <TurnOn
                                    style={{
                                      position: "absolute",
                                      width: "35px",
                                      height: "28px",
                                      top: "-3px",
                                      left: "-7px",
                                    }}
                                  />
                                }
                                height={24}
                                width={52}
                                uncheckedHandleIcon={
                                  <TurnoFF
                                    style={{
                                      position: "absolute",
                                      width: "35px",
                                      height: "28px",
                                      top: "-3px",
                                      left: "-6px",
                                    }}
                                  />
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {selectedSector.length > 0 ||
                        selectedJob.length > 0 ||
                        selectedLanguages.length > 0 ||
                        SelectedName.length > 0 ||
                        MotivationArr.length > 0 ||
                        SelectedName.length > 0 ||
                        Importance.length > 0 ||
                        OthersFilterArr.length > 0 ||
                        phone == true ||
                        email ==true ? 
                      
                          <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-3 d-flex align-items-center justify-content-end">
                            <p
                              className="filterStyling  cursor-pointer mt-2"
                              onClick={() => RestFilters()}
                            >
                              Reset Filters
                            </p>
                          </div>
                         : null}
                        <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-4 d-flex justify-content-end">
                          <p
                            className="filterStyling pt-2 cursor-pointer"
                            onClick={() => setShowMore(false)}
                          >
                            Less Filters{" "}
                            <img
                              src={require("../../images/downup.svg").default}
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="extraPadding">
                  <div className="col-12">
                    <div className="row justify-content-end">
                      {selectedSector.length > 0 ||
                      selectedJob.length > 0 ||
                      selectedLanguages.length > 0 ||
                      SelectedName.length > 0 ||
                      MotivationArr.length > 0 ||
                      SelectedName.length > 0 ||
                      Importance.length > 0 ||
                      OthersFilterArr.length > 0 ||
                      phone == true ||
                      email == true 
                       ? (
                        <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-3 d-flex align-items-center justify-content-end">
                          <p
                            className="filterStyling  cursor-pointer mt-2"
                            onClick={() => RestFilters()}
                          >
                            Reset Filters
                          </p>
                        </div>
                      ) : null}
                      <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-4 d-flex justify-content-end">
                        <p
                          className="filterStyling pt-2 cursor-pointer"
                          onClick={() => setShowMore(true)}
                        >
                          More Filters{" "}
                          <img src={require("../../images/down.svg").default} />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {loader ? 
                <>
                  {  status? 
                   filterData.length > 0 ? 
                      filterData.map((profile, index) => (
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12  pd-left">
                          <ClientToDoCard data={profile}  />
                        </div>
                      ))
                     
                     
                     : <div className="col-12">
                     <div className="row d-flex justify-content-center">
                       <Loader />
                     </div>
                   </div> :
                      <p className="text-center">
                      No Profiles in Candidat To-Do! Please Add New Candidats.
                    </p>
                      }
            </>
          : 
            <div className="col-12">
              <div className="row d-flex justify-content-center">
                <Loader />
              </div>
            </div>
          }
        </div>
      </div>
    </>
  );
}
export default ClientToDoList;
