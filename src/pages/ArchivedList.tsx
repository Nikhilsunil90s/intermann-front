import React, { useEffect, useState } from "react";
import "../CSS/Canceled.css";
import ArchivedProfileCard from "../components/ArchivedProfileCard";
import { API_BASE_URL } from "../config/serverApiConfig";
import Loader from "../components/Loader/loader";
import { colourOptions, ColourOption } from "../Selecteddata/data";
import chroma from "chroma-js";
import Select, { StylesConfig } from "react-select";
import ProfileLoader from "../components/Loader/ProfilesLoader";
import toast, { Toaster } from "react-hot-toast";
import ErrorLoader from "../components/Loader/SearchBarError";
import Error404Loader from "../components/Loader/404Error";
import { motion } from "framer-motion";
import Cookies from "js-cookie";

declare namespace JSX {
  interface IntrinsicElements {
    "lottie-player": any;
  }
}
declare global {
  namespace JSX {
    interface IntrinsicElements {
      lable: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
let SelectedName = [];
let FilterJob = [];
let LanguageFilter = [];
let ClientFL = [];
let SelectedClient = [];
function ArchivedList() {
  const [sectors, setSectors] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState([]);
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [status, setStatus] = useState(Boolean);
  const [nameOptions, setNameOptions] = useState([]);
  const [sectorOptions, setSectorOptions] = useState([]);
  const [jobOptions, setJobOptions] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [Clients, setClients] = useState([]);
  const [LanguageOp, setLangOp] = useState([]);
  const [filterLoader, setFetchingLoader] = useState(true);
  const [cardTotallength, setTotalLength] = useState(0);
  let [page, setPage] = useState(0);
  const [LoaderTime, setLoaderTime] = useState(false);
  const [sectorName, setSectorName] = useState("");
  const [JobName, setJobName] = useState([]) as any;
  const [readyToWorkLength,setreadyToWorkLength]=useState({
    length:"",
    readyToWorkLength:""
  })
  const loadMoreHandle = (i) => {
    let bottom =
      i.target.scrollHeight - i.target.clientHeight - i.target.scrollTop < 40;
    if (bottom) {
      if (
        cardTotallength > page &&
        selectedSector.length === 0 &&
        selectedJob.length === 0 &&
        selectedLanguages.length === 0 &&
        SelectedName.length === 0 &&
        FilterJob.length == 0 &&
        LanguageFilter.length == 0 &&
        sectorName == "" &&
        JobName.length === 0
      ) {
        setPage(page + 20);
        setFetchingLoader(true);
        fetchProfileS(page);
        setLoader(true);
      }
    }
  };

  const LoaderFun = () => {
    setTimeout(() => {
      setLoaderTime(true);
    }, 15000);
  };

  useEffect(() => {
    fetchProfileS(page);
  }, [page]);

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

  useEffect(() => {
    if (sectors.length == 0) {
      fetchAllSectors()
        .then((data) => {
          // console.log(data.data);
          setSectors([...data.data]);
        })
        .catch((err) => {
          // console.log(err);
        });
    }
    let jobResults = jobs.map((ajob) => {
      return { value: ajob.jobName, label: ajob.jobName, color: "#FF8B00" };
    });
    setJobOptions([...jobResults]);
  }, [jobs]);
  useEffect(() => {
    let sectorops = sectors.map((asector) => {
      return {
        value: asector.sectorName,
        label: asector.sectorName,
        color: "#FF8B00",
      };
    });
    setTimeout(() => {
      setSectorOptions([
        { value: "Select Sector", label: "Select Sector", color: "#ff8b00" },
        ...sectorops,
      ]);
    }, 1000);
  }, [sectors]);
  useEffect(() => {
    filterFunction();
  }, [selectedLanguages, selectedJob, selectedSector]);

  const fetchProfiles = async () => {
    return await fetch(API_BASE_URL + "allArchivedCandidats", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
    })
      .then((resD) => resD.json())
      .then((reD) => reD)
      .catch((err) => err);
  };
  const fetchAllSectors = async () => {
    return await fetch(API_BASE_URL + "fetchAllSectors", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
    })
      .then((resp) => resp.json())
      .then((respData) => respData)
      .catch((err) => err);
  };
  const fetchClients = async () => {
    return await fetch(API_BASE_URL + `getClientsForFilter`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
    })
      .then((resp) => resp.json())
      .then((respData) => respData)
      .catch((err) => err);
  };
  useEffect(() => {
    if (LanguageOp.length == 0) {
      setTimeout(() => {
        setLangOp([
          { value: "Roumain", label: "Roumain", color: "#FF8B00" },
          { value: "Français", label: "Français", color: "#FF8B00" },
          { value: "Anglais", label: "Anglais", color: "#FF8B00" },
          { value: "Italien", label: "Italien", color: "#FF8B00" },
          { value: "Russe", label: "Russe", color: "#FF8B00" },
          { value: "Espagnol", label: "Espagnol", color: "#FF8B00" },
          { value: "Autre", label: "Autre", color: "#FF8B00" },
          { value: "Suisse", label: "Suisse", color: "#FF8B00" },
        ]);
      }, 1000);
    }
    if (Clients.length == 0) {
      fetchClients().then((data) => {
        let ClientOP: any = data.data.map((el) => {
          return { value: el, label: el.toLocaleUpperCase(), color: "#FF8B00" };
        });
        setClients([
          { value: "Select Client", label: "Select Client", color: "#ff8b00" },
          ...ClientOP,
        ]);
      });
    }
    if (nameOptions.length == 0) {
      fetchProfiles()
        .then((profilesResult) => {
          if (cardTotallength == 0) {
            setTotalLength(profilesResult.length);
          }
          let nameops = profilesResult.map((pro) => {
            return {
              value: pro.candidatName,
              label: pro.candidatName.toLocaleUpperCase(),
              color: "#FF8B00",
            };
          });
          setNameOptions([
            { value: "Select Name", label: "Select Name", color: "#ff8b00" },
            ...nameops,
          ]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  const handleNameChange = (e: any) => {
    // console.log(e.target.value)
    SelectedName = [];
    ClientFL = [];
    SelectedClient = [];
    LanguageFilter = [];

    setSectorName("");
    setJobName([]);

    setSelectedSector("");
    setSelectedJob([]);
    if (e.value === "Select Name") {
      SelectedName = [];
      filterFunction();
    } else if (e.value !== "" && e.value !== "Select Name") {
      SelectedName = [];
      let NameField = e.value;
      SelectedName.push(NameField);
    }
  };
  useEffect(() => {
    setSelectedJob(FilterJob);
  }, [selectedJob]);
  const fetchAllJobs = async (sector: string) => {
    return await fetch(API_BASE_URL + `fetchAllJobs/?sector=${sector}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
    })
      .then((resD) => resD.json())
      .then((reD) => reD)
      .catch((err) => err);
  };

  const handleSectorChange = (e: any) => {
    // console.log(e.target.value)
    SelectedName = [];
    setSectorName(e.value);
    FilterJob = [];
    setSelectedJob([]);
    LanguageFilter = [];
    ClientFL = [];
    SelectedClient = [];
    if (e.value === "Select Sector") {
      setJobs([]);
      setSelectedSector("");
      setJobOptions([]);
      setLoader(true);
    } else if (e.value !== "" && e.value !== "Select Sector") {
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

  const jobChange = async (jobval) => {
    jobval.map((el) => FilterJob.push(el.value));
    setJobName(FilterJob);
    filterFunction();
  };

  const LanguageChange = async (lang) => {
    setSelectedSector("");
    SelectedName = [];
    SelectedClient = [];

    // console.log(jobval)
    let LangArr = [];
    if (lang.value == "Select Language") {
      LangArr = [];
      filterFunction();
    }
    if (lang.vlaue !== "" && lang.value !== "Select Language") {
      lang.map((el) => {
        LangArr.push(el.value);
      });
      LanguageFilter = LangArr;
      filterFunction();
    }
  };

  const fetchProfileS = async (page) => {
    return await fetch(API_BASE_URL + `archivedCandidats/?skip=${page}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
    })
      .then((resD) => resD.json())
      .then((reD) => {
        if (cardTotallength > page && page !== 0) {
          setFetchingLoader(true);
          let resultArr = [...reD] as any;
          if (filterData.includes(resultArr.candidatName)) {
            return true;
          } else {
            setFilterData([...filterData, ...resultArr]);
          setreadyToWorkLength({...readyToWorkLength,readyToWorkLength:reD.readyToWorkLength,length:reD.length})

          }
        }
        if (page > cardTotallength) {
          setFetchingLoader(false);
          return;
        }
        if (filterData.length === 0) {
          setFetchingLoader(false);
          setFilterData([...reD]);
        }
      })
      .catch((err) => err);
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
  };
  const filterFunction = async () => {
    setFetchingLoader(false);
    setLoader(false);
    if (SelectedName.length > 0) {
      if (SelectedName.length > 0) {
        fetch(`${API_BASE_URL}getCandidats/?candidatName=${SelectedName}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("token"),
          },
        })
          .then((reD) => reD.json())
          .then((result) => {
            {
              // setFilterData([...result.data]);
              // console.log(result,"result")
          setreadyToWorkLength({...readyToWorkLength,readyToWorkLength:result.readyToWorkLength,length:result.length})

              setFilterData([...result.data]);
            }
            // setStatus(result.status);
          })
          .catch((err) => err);
        setLoader(true);
      }
    }
    if (SelectedClient.length > 0) {
      fetch(
        API_BASE_URL +
          `getCandidatsByClient/?clientCompanyName=${SelectedClient}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + Cookies.get("token"),
          },
        }
      )
        .then((resp) => resp.json())
        .then((respData) => {
          respData.data.map((el) => {
            ClientFL = el.employeesWorkingUnder.filter((el) => {
              return el.candidatStatus == "Archived";
            });
          });
          {
            if (respData.status == false || ClientFL.length == 0) {
              setLoader(true);
              setStatus(false);
            } else {
              setLoader(true);
              setStatus(true);
              setFilterData([...ClientFL]);
          setreadyToWorkLength({...readyToWorkLength,readyToWorkLength:respData.readyToWorkLength,length:respData.length})

            }
          }
        })
        .catch((err) => err);
    }
    if (
      selectedSector.length > 0 &&
      selectedJob.length == 0 &&
      selectedLanguages.length == 0
    ) {
      fetch(
        `${API_BASE_URL}filterArchivedCandidatBySector/?sector=${selectedSector}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("token"),
          },
        }
      )
        .then((reD) => reD.json())
        .then((result) => {
          {
            setFilterData([...result.data]);
          setreadyToWorkLength({...readyToWorkLength,readyToWorkLength:result.readyToWorkLength,length:result.length})

          }
          setStatus(result.status);
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
        `${API_BASE_URL}filterArchivedSJ/?sector=${selectedSector}&jobs=${FilterJob}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("token"),
          },
        }
      )
        .then((reD) => reD.json())
        .then((result) => {
          {
            setFilterData([...result.data]);
          setreadyToWorkLength({...readyToWorkLength,readyToWorkLength:result.readyToWorkLength,length:result.length})

          }
          setStatus(result.status);
        })
        .catch((err) => err);
      setLoader(true);
    }

    if (
      sectorName.length > 0 &&
      LanguageFilter.length > 0 &&
      JobName.length == 0
    ) {
      await fetch(
        `${API_BASE_URL}filterArchivedSL/?sector=${selectedSector}&languages=${selectedLanguages}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("token"),
          },
        }
      )
        .then((reD) => reD.json())
        .then((result) => {
          {
            setFilterData([...result.data]);
          setreadyToWorkLength({...readyToWorkLength,readyToWorkLength:result.readyToWorkLength,length:result.length})

          }
          setStatus(result.status);
        })
        .catch((err) => err);
      setLoader(true);
    }
    if (
      sectorName.length > 0 &&
      JobName.length > 0 &&
      LanguageFilter.length > 0
    ) {
      await fetch(
        `${API_BASE_URL}filterArchivedSJL/?sector=${selectedSector}&jobs=${FilterJob}&languages=${LanguageFilter}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("token"),
          },
        }
      )
        .then((reD) => reD.json())
        .then((result) => {
          {
            setFilterData([...result.data]);
          setreadyToWorkLength({...readyToWorkLength,readyToWorkLength:result.readyToWorkLength,length:result.length})

          }
          setStatus(result.status);
        })
        .catch((err) => err);
      setLoader(true);
    }

    if (
      LanguageFilter.length > 0 &&
      selectedJob.length == 0 &&
      selectedSector.length == 0
    ) {
      SelectedName = [];
      FilterJob = [];
      setSelectedSector("");
      await fetch(
        `${API_BASE_URL}filterArchivedCandidatByLanguages/?languages=${LanguageFilter}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("token"),
          },
        }
      )
        .then((reD) => reD.json())
        .then((result) => {
          {
            setFilterData([...result.data]);
          setreadyToWorkLength({...readyToWorkLength,readyToWorkLength:result.readyToWorkLength,length:result.length})

          }
          setStatus(result.status);
        })
        .catch((err) => err);
      setLoader(true);
    }
    if (
      selectedSector.length === 0 &&
      selectedJob.length === 0 &&
      selectedLanguages.length === 0 &&
      SelectedName.length === 0 &&
      LanguageFilter.length === 0 &&
      SelectedClient.length === 0 &&
      FilterJob.length === 0 &&
      sectorName == "" &&
      JobName.length === 0
    ) {
      {
        setLoader(true);
        setStatus(true);
        fetchProfileS(page).catch((err) => {
          console.log(err);
        });
      }
    }
  };

  const ClientChange = (e) => {
    setSectorName("");
    setJobName([]);
    setSelectedSector("");
    LanguageFilter = [];
    if (e.value == "Select Client") {
      setSelectedSector("");
      LanguageFilter = [];
      SelectedName = [];
      ClientFL = [];
      SelectedClient = [];
      setClients([]);
    }
    if (e.value) {
      SelectedClient = [];
      SelectedClient.push(e.value);
      filterFunction();
    }
  };
  const ResetFilters = () => {
    setSectorName("");
    setreadyToWorkLength({
      length:"",
      readyToWorkLength:""
    })
    setJobName([]);
    setSectors([]);
    setNameOptions([]);
    SelectedName = [];
    LanguageFilter = [];
    setSelectedSector("");
    setSectorOptions([]);
    setJobs([]);
    setSelectedJob([]);
    setLangOp([]);
    setJobOptions([]);
    ClientFL = [];
    setClients([]);
    SelectedClient = [];
    toast.success("Filters Reset Successfully!");

    setTimeout(() => {
      filterFunction();
    }, 1000);
    fetchAllSectors();
  };

  return (
    <>
      <Toaster
        position="top-right"
        containerStyle={{ zIndex: "99999999999999999999999999" }}
      />
      <div
        className="container-fluid cardScrollBar"
        style={{ marginTop: "80px", height: "100vh", overflow: "auto" }}
        onScroll={loadMoreHandle}
      >
        <div className="row pd">
          <div
            className="col-12 card-tops px-1"
            style={{ padding: "0px", marginBottom: "20px" }}
          >
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
                  <h1 className="fontStylingArchived">
                    Candidats / Employes<span>Canceled/Archive</span>
                  </h1>
                  <p className="ArchivedChild">
                    Ici vous avez la liste des candidats ne travaillant
                    <span> pas encore avec nous </span>
                  </p>
                  <p className="ArchivedChild">
                    Here you have the list of candidates who have been fired or
                    archived
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 bg-white p-2 rounded001 mb-1">
            <div className="row ">
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                <p className="filtersLabel">Filtre by name</p>
                <div className="dropdown">
                  <div aria-labelledby="dropdownMenuButton1">
                    {nameOptions.length > 0 ? (
                      <Select
                        name="candidatName"
                        closeMenuOnSelect={true}
                        placeholder="‎ ‎ ‎ Select Un Candidat"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleNameChange}
                        options={nameOptions}
                        styles={colourStyles}
                      />
                    ) : (
                      <>
                        {" "}
                        <div
                          className="spinner-grow text-primary"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <div
                          className="spinner-grow text-secondary"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <div
                          className="spinner-grow text-success"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow text-danger" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <div
                          className="spinner-grow text-warning"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow text-dark" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                <p className="filtersLabel">Filtre Secteur d’activité</p>
                <div className="dropdown">
                  <div aria-labelledby="dropdownMenuButton1">
                    {sectorOptions.length > 0 ? (
                      <Select
                        name="candidatActivitySector"
                        closeMenuOnSelect={true}
                        placeholder="‎ ‎ ‎ Select Un Secteur"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleSectorChange}
                        options={sectorOptions}
                        styles={colourStyles}
                      />
                    ) : (
                      <>
                        {" "}
                        <div
                          className="spinner-grow text-primary"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <div
                          className="spinner-grow text-secondary"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <div
                          className="spinner-grow text-success"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow text-danger" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <div
                          className="spinner-grow text-warning"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow text-dark" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 JobPD">
                <p className="filtersLabel">Filtre selection métier / job</p>
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
                      <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 pt-1">
                        <p className="filtersLabel">Filtre by Client</p>
                        <div className="dropdown">
                          <div aria-labelledby="dropdownMenuButton1">
                            {Clients.length > 0 ? (
                              <Select
                                name="ClientFilter"
                                closeMenuOnSelect={true}
                                placeholder="‎ ‎ ‎ Select Filtre by Client"
                                className="basic-multi-select"
                                classNamePrefix="select"
                                styles={colourStyles}
                                options={Clients}
                                onChange={ClientChange}
                              />
                            ) : (
                              <>
                                {" "}
                                <div
                                  className="spinner-grow text-primary"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                                <div
                                  className="spinner-grow text-secondary"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                                <div
                                  className="spinner-grow text-success"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                                <div
                                  className="spinner-grow text-danger"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                                <div
                                  className="spinner-grow text-warning"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                                <div
                                  className="spinner-grow text-dark"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 pt-1">
                        <p className="filtersLabel ">
                          Filtre Langues du candidat
                        </p>
                        {LanguageOp.length > 0 ? (
                          <Select
                            name="candidatLanguages"
                            closeMenuOnSelect={false}
                            isMulti
                            placeholder="‎ ‎ ‎Select Langues"
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={LanguageChange}
                            options={LanguageOp}
                            styles={colourStyles}
                          />
                        ) : (
                          <>
                            {" "}
                            <div
                              className="spinner-grow text-primary"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                            <div
                              className="spinner-grow text-secondary"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                            <div
                              className="spinner-grow text-success"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                            <div
                              className="spinner-grow text-danger"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                            <div
                              className="spinner-grow text-warning"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                            <div
                              className="spinner-grow text-dark"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="extraPadding">
                    <div className="col-12">
                      <div className="row justify-content-end">
                        <div className="col-2 d-flex justify-content-end">
                          {selectedSector.length > 0 ||
                          selectedJob.length > 0 ||
                          selectedLanguages.length > 0 ||
                          SelectedName.length > 0 ||
                          LanguageFilter.length > 0 ||
                          SelectedClient.length > 0 ? (
                            <p
                              className="filterStyling HoveRESTClass cursor-pointer mt-2"
                              onClick={() => ResetFilters()}
                            >
                              Reset Filters
                            </p>
                          ) : null}
                        </div>
                        <div className="col-2 d-flex justify-content-end">
                          <p
                            className="filterStyling pt-2 cursor-pointer"
                            onClick={() => setShowMore(false)}
                          >
                            Less Filters{" "}
                            <img alt="..."
                              src={require("../images/downup.svg").default}
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
                      <div className="col-2 d-flex justify-content-end">
                        {selectedSector.length > 0 ||
                        selectedJob.length > 0 ||
                        selectedLanguages.length > 0 ||
                        SelectedName.length > 0 ||
                        LanguageFilter.length > 0 ||
                        SelectedClient.length > 0 ? (
                          <p
                            className="filterStyling HoveRESTClass cursor-pointer mt-2"
                            onClick={() => ResetFilters()}
                          >
                            Reset Filters
                          </p>
                        ) : null}
                      </div>
                      <div className="col-2 d-flex justify-content-end">
                        <p
                          className="filterStyling pt-2 cursor-pointer"
                          onClick={() => setShowMore(true)}
                        >
                          More Filters{" "}
                          <img alt="..." src={require("../images/down.svg").default} />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {
            readyToWorkLength.length|| readyToWorkLength.readyToWorkLength ? 
          <>  <div>
            <p className="filterStyling">
              There is <span style={{color:"red"}}>{readyToWorkLength.length}{" "}workers total</span>{" "}that match your request and <span style={{color:"blue"}}>{readyToWorkLength.readyToWorkLength}{" "}ready to work</span>
            </p>
              </div>
              </>
              :
              ""
           }
          <>
            {loader ? (
              <>
                {status ? (
                  filterData.length > 0 ? (
                    filterData.map((profile, index) => (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 60,
                          damping: 15,
                        }}
                        className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-1 pd-left"
                        key={profile._id}
                      >
                        <ArchivedProfileCard props={profile} />
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-12">
                      <div className="row d-flex justify-content-center">
                        <>
                          {LoaderTime ? (
                            <Error404Loader />
                          ) : (
                            <>
                              {" "}
                              <Loader />
                              {LoaderFun()}
                            </>
                          )}
                        </>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="col-12 d-flex justify-content-center align-items-center">
                    <ErrorLoader />
                    <p className="ErrorSearchBox mb-0">
                      No Profiles in Candidat To-Do! Please Add New Candidats.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="col-12">
                <div className="row d-flex justify-content-center">
                  <Loader />
                </div>
              </div>
            )}
            {filterLoader ? <Loader /> : null}
          </>
        </div>
      </div>
    </>
  );
}
export default ArchivedList;
