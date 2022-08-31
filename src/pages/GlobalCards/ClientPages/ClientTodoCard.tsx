import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import "../../../CSS/Client/ClientTodo.css";
import ClientToDoCard from "../../../pages/ClientPages/ClientTodoCard";
import toast, { Toaster } from "react-hot-toast";
import { API_BASE_URL } from "../../../config/serverApiConfig";
import { ColourOption } from "../../../Selecteddata/data";
import ProfileLoader from "../../../components/Loader/ProfilesLoader";
import chroma from "chroma-js";
import Select, { StylesConfig } from "react-select";
import { ReactComponent as RatingStar } from "../../../images/RatingStar.svg";
import { ReactComponent as Empty } from "../../../images/emptyStar.svg";
import Switch from "react-switch";
import Loader from "../../../components/Loader/loader";
import { ReactComponent as TurnoFF } from "../../../images/FatX.svg";
import { ReactComponent as TurnOn } from "../../../images/base-switch_icon.svg";
import { useNavigate } from "react-router-dom";
import InProgressClientModal from "../../../components/Modal/InProgressClientModal";
import ArchivedClientModal from "../../../components/Modal/ArchivedClientModal";
import { ReactComponent as StarRating } from "../../../images/RatingStar.svg";
import moment from 'moment';
import {useLocation} from 'react-router-dom'

let id = "";

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

  const {state}=useLocation()
  const [loader, setLoader] = useState(true);
  const [sectors, setSectors] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState([]);
  const [nameOptions, setNameOptions] = useState([]);
  const [sectorOptions, setSectorOptions] = useState([]);
  const [jobOptions, setJobOptions] = useState([]);
  const [EmailCheck, setEmailCheck] = useState(false);
  const [Data, setData] = useState(state)as any;
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
 

useEffect(()=>{
  setData(state)
},[state])


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
      MotivationArr.push(MField);
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

    // if (
    //   selectedSector.length === 0 &&
    //   selectedJob.length === 0 &&
    //   selectedLanguages.length === 0 &&
    //   SelectedName.length == 0 &&
    //   MotivationArr.length == 0 &&
    //   Importance.length == 0  &&
    //   OthersFilterArr.length ==0 &&
    //   email == false && 
    //   phone == false 
   
    // ) {
    //   setLoader(true);
    //   setStatus(true);
    //   fetchProfiles()
    //     .then((res) => setFilterData([...res]))
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
    // if (MotivationArr.length > 0) {
    //   fetch(
    //     `${API_BASE_URL}filterClients/?clientMotivation=${MotivationArr}&jobStatus=To-Do`,
    //     {
    //       method: "GET",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + localStorage.getItem("token"),
    //       },
    //     }
    //   )
    //     .then((reD) => reD.json())
    //     .then((result) => {
    //       if (result.total == 0) {
    //         setLoader(true);
    //         setStatus(false);
    //       } else if (result.total > 0) {
    //         setFilterData([...result.data]);
    //         setLoader(true);
    //         setStatus(true);
    //       }
    //     })
    //     .catch((err) => err);
    //   setLoader(true);
    // }

    // if (
    //   selectedSector.length > 0 &&
    //   FilterJob.length == 0 &&
    //   selectedLanguages.length == 0
    // ) {
    //   await fetch(
    //     `${API_BASE_URL}filterClients/?clientActivitySector=${selectedSector}&jobStatus=To-Do`,
    //     {
    //       method: "GET",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + localStorage.getItem("token"),
    //       },
    //     }
    //   )
    //     .then((reD) => reD.json())
    //     .then((result) => {
    //       if (result.total == 0) {
    //         setLoader(true);
    //         setStatus(false);
    //       } else if (result.total > 0) {
    //         setFilterData([...result.data]);
    //         setLoader(true);
    //         setStatus(true);
    //       }
    //     })
    //     .catch((err) => err);
    //   setLoader(true);
    // }
    // if (
    //   selectedSector.length > 0 &&
    //   FilterJob.length > 0 &&
    //   selectedLanguages.length == 0
    // ) {
    //   await fetch(
    //     `${API_BASE_URL}filterClients/?clientJob=${FilterJob}&jobStatus=To-Do`,
    //     {
    //       method: "GET",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + localStorage.getItem("token"),
    //       },
    //     }
    //   )
    //     .then((reD) => reD.json())
    //     .then((result) => {
    //       if (result.total == 0) {
    //         setLoader(true);
    //         setStatus(false);
    //       } else if (result.total > 0) {
    //         setFilterData([...result.data]);
    //         setLoader(true);
    //         setStatus(true);
    //       }
    //     })
    //     .catch((err) => err);
    //   setLoader(true);
    // }

    // if (SelectedName.length > 0) {
    //   await fetch(
    //     `${API_BASE_URL}filterClients/?clientCompanyName=${SelectedName}&jobStatus=To-Do`,
    //     {
    //       method: "GET",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + localStorage.getItem("token"),
    //       },
    //     }
    //   )
    //     .then((reD) => reD.json())
    //     .then((result) => {
    //       if (result.total == 0) {
    //         setLoader(true);
    //         setStatus(false);
    //       } else if (result.total > 0) {
    //         setFilterData([...result.data]);
    //         setLoader(true);
    //         setStatus(true);
    //       }
    //     })
    //     .catch((err) => err);
    // }
    // if (Importance.length > 0) {
    //   await fetch(
    //     `${API_BASE_URL}filterClients/?clientImportance=${Importance}&jobStatus=To-Do`,
    //     {
    //       method: "GET",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + localStorage.getItem("token"),
    //       },
    //     }
    //   )
    //     .then((reD) => reD.json())
    //     .then((result) => {
    //       if (result.total == 0) {
    //         setLoader(true);
    //         setStatus(false);
    //       } else if (result.total > 0) {
    //         setFilterData([...result.data]);
    //         setLoader(true);
    //         setStatus(true);
    //       }
    //     })
    //     .catch((err) => err);
    // }
    // if(email === true){
    //   EmailFetch()
    // }
    // if(phone === true){
    //   await fetch(
    //     `${API_BASE_URL}filterClientsByMissingEmailOrPhone/?field=phone&status=To-Do`,
    //     {
    //       method: "GET",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + localStorage.getItem("token"),
    //       },
    //     }
    //   )
    //     .then((reD) => reD.json())
    //     .then((result) => {
    //       if (result.status == false) {
    //         setLoader(true);
    //         setStatus(false);
    //       } else if (result.status == true) {
    //         setFilterData([...result.data]);
    //         setLoader(true);
    //         setStatus(true);
    //       }
    //     })
    //     .catch((err) => err);
    // }
    // if(OthersFilterArr.length > 0){
    //   await fetch(
    //     `${API_BASE_URL}filterClientsByAttributes/?filters=${OthersFilterArr.toString()}&status=To-Do`,
    //     {
    //       method: "GET",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + localStorage.getItem("token"),
    //       },
    //     }
    //   )
    //     .then((reD) => reD.json())
    //     .then((result) => {
    //       if (result.status == false) {
    //         setLoader(true);
    //         setStatus(false);
    //       } else if (result.status == true) {
    //         setFilterData([...result.data]);
    //         setLoader(true);
    //         setStatus(true);
    //       }
    //     })
    //     .catch((err) => err);
    // }
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
          label: "😟",
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
    setSelectedSector("")
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
    toast.success("Filters Reset Successful!")
    fetchAllSectors();
    setTimeout(()=>{
      filterFunction();
    },1000)
 
  };


  const navigate = useNavigate();

  const notificationSwitch=()=>toast.success("Modification sauvegardée")


  const [showInProgressModal, setShowInProgressModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [SISPI, setChecked] = useState(Data.sispiDeclared);
  const [Agence, setAgence] = useState(Data.agenceDeVoyage) as any;
  const [Assurance, setAssurance] = useState(Data.assuranceFaite) as any;
  const [A1, setA1] = useState(Data.A1selected) as any;
  const [Public, setPublic] = useState(Data.publicityStarted) as any;
  const [Contrat, setContrat] = useState(Data.contractSigned) as any;
  const [Signature, setSignature] = useState(Data.signatureSent) as any;
  const [Offre, setOffre] = useState(Data.offerSent) as any;
  const CardOption = [
    {
      value: "Edit Profile",
      label: "Edit Profile",
    },
    { value: "moveProgress", label: "Move to In Progress" },
    { value: "Archive", label: "Archive" },
  ] as any;
  console.log(Offre, "ofree");

  const SwitchChange = (checked: any, e: any, Name: any) => {
    id = e.data._id;
    if (Name === "offerSent") {
      if (checked === true) {
        setOffre(true);
        id = e.data._id;
        onChangeSwitches(id, Name, checked);
        notificationSwitch()
      }
      if (checked === false) {
        setOffre(false);
        onChangeSwitches(id, Name, checked);
        notificationSwitch()
      }
    }
    if (Name === "signatureSent") {
      if (checked === true) {
        setSignature(true);
        id = e.data._id;
        notificationSwitch()
        onChangeSwitches(id, Name, checked);
      }
      if (checked === false) {
        setSignature(false);
        onChangeSwitches(id, Name, checked);
        notificationSwitch()
      }
    }
    if (Name === "contractSigned") {
      if (checked === true) {
        setContrat(true);
        id = e.data._id;
        notificationSwitch()
        onChangeSwitches(id, Name, checked);
      }
      if (checked === false) {
        setContrat(false);
        onChangeSwitches(id, Name, checked);
        notificationSwitch()
      }
    }
    if (Name === "publicityStarted") {
      if (checked === true) {
        setPublic(true);
        id = e.data._id;
        notificationSwitch()
        onChangeSwitches(id, Name, checked);
      }
      if (checked === false) {
        setPublic(false);
        onChangeSwitches(id, Name, checked);
      }
    }
    if (Name === "A1selected") {
      if (checked === true) {
        setA1(true);
        id = e.data._id;
        notificationSwitch()

        onChangeSwitches(id, Name, checked);
      }
      if (checked === false) {
        setA1(false);
        onChangeSwitches(id, Name, checked);
        notificationSwitch()
      }
    }
    if (Name === "assuranceFaite") {
      if (checked === true) {
        setAssurance(true);
        id = e.data._id;
        notificationSwitch()
        onChangeSwitches(id, Name, checked);
      }
      if (checked === false) {
        setAssurance(false);
        onChangeSwitches(id, Name, checked);
        notificationSwitch()
      }
    }
    if (Name === "agenceDeVoyage") {
      if (checked === true) {
        setAgence(true);
        id = e.data._id;
        notificationSwitch()
        onChangeSwitches(id, Name, checked);
      }
      if (checked === false) {
        setAgence(false);
        onChangeSwitches(id, Name, checked);
      }
    }
    if (Name === "sispiDeclared") {
      if (checked === true) {
        setChecked(true);
        id = e.data._id;
        notificationSwitch()
        onChangeSwitches(id, Name, checked);
      }
      if (checked === false) {
        setChecked(false);
        onChangeSwitches(id, Name, checked);
        notificationSwitch()
      }
    }
  };

  const onChangeSwitches = async (id, AName, val) => {
    await fetch(
      `${API_BASE_URL}switchClientAttributes/?clientId=${id}&attribute=${AName}&value=${val}`,
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
      .then((result) => result)
      .catch((err) => err);
  };

  const candidatImportanceIcons = [
    {
      icon: (
        <>
          <StarRating style={{ marginRight: "3px", width: "70%" }} />{" "}
          <Empty style={{ marginRight: "3px", width: "70%" }} />{" "}
          <Empty style={{ marginRight: "3px", width: "70%" }} />{" "}
          <Empty style={{ marginRight: "3px", width: "70%" }} />{" "}
          <Empty style={{ marginRight: "3px", width: "70%" }} />
        </>
      ),
    },
    {
      icon: (
        <>
          <StarRating style={{ marginRight: "3px", width: "70%" }} />
          <StarRating style={{ marginRight: "3px", width: "70%" }} />{" "}
          <Empty style={{ marginRight: "3px", width: "70%" }} />{" "}
          <Empty style={{ marginRight: "3px", width: "70%" }} />{" "}
          <Empty style={{ marginRight: "3px", width: "70%" }} />
        </>
      ),
    },
    {
      icon: (
        <>
          <StarRating style={{ marginRight: "3px", width: "70%" }} />{" "}
          <StarRating style={{ marginRight: "3px", width: "70%" }} />{" "}
          <StarRating style={{ marginRight: "3px", width: "70%" }} />{" "}
          <Empty style={{ marginRight: "3px", width: "70%" }} />{" "}
          <Empty style={{ marginRight: "3px", width: "70%" }} />
        </>
      ),
    },
    {
      icon: (
        <>
          <StarRating style={{ marginRight: "3px", width: "70%" }} />{" "}
          <StarRating style={{ marginRight: "3px", width: "70%" }} />{" "}
          <StarRating style={{ marginRight: "3px", width: "70%" }} />{" "}
          <StarRating style={{ marginRight: "3px", width: "70%" }} />{" "}
          <Empty style={{ marginRight: "3px", width: "70%" }} />
        </>
      ),
    },
    {
      icon: (
        <>
          <StarRating style={{ marginRight: "3px", width: "70%" }} />
          <StarRating style={{ marginRight: "3px", width: "70%" }} />{" "}
          <StarRating style={{ marginRight: "3px", width: "70%" }} />{" "}
          <StarRating style={{ marginRight: "3px", width: "70%" }} />{" "}
          <StarRating style={{ marginRight: "3px", width: "70%" }} />
        </>
      ),
    },
  ];

  const candidatMotivationIcons = [
    { icon: "No Icon", motivation: "No Motivation" },
    { icon: "😟", motivation: "Disappointed" },
    { icon: "🙁", motivation: "Not Really" },
    { icon: "😊", motivation: "Like" },
    { icon: "🥰", motivation: "Great" },
    { icon: "😍", motivation: "Super Lovely" },
  ];
  const editClientProfile = () => {
    navigate("/clientToDoEdit", { state: Data });
  };
  console.log(Data);

  const viewFullProfile = () => {
    navigate("/clientToDoProfile", { state: Data });
  };

  const MoreOption = (e: any) => {
    debugger;
    if (e.value == "Edit Profile") {
      editClientProfile();
    }
    if (e.value == "moveProgress") {
      setShowInProgressModal(true);
    }
    if (e.value == "Archive") {
      setShowArchiveModal(true);
    }
    console.log(e.value);
  };

  const [isSwitchOn, setIsSwitchOn] = useState(true) as any;
  console.log(Data, "Data");
  // useEffect(() => {
  //     console.log(Data)
  // })
  const datenow=moment().format('YYYY-MM-DD')
    
       let date = new Date(datenow);
  
      let start = new Date(Data.jobStartDate);
      let end = new Date(Data.jobEndDate);
   
  return (
    <>
      <Toaster
        position="top-right"
        containerStyle={{ zIndex: "9999999999999999999999" }}
      />
      <div className="container-fluid" style={{marginTop:"80px"}}>
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
                              src={require("../../../images/downup.svg").default}
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
                          <img src={require("../../../images/down.svg").default} />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

      
                     
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12  pd-left">
                        <div className="card cardTODO pr-0">
        <div className="d-flex cursor-pointer" onClick={viewFullProfile}>
          <div className="col-3 px-0 d-flex justify-content-center">
            <img
              src={require("../../../images/ClientCardPhoto.svg").default}
              className="cardTODO-img"
              alt="..."
            />
          </div>
          <div className="col-5 px-0 mt-1">
            <p className="textClientCard" style={{ width: "130%" }} data-bs-toggle="tooltip" data-bs-placement="bottom" title={Data.clientCompanyName.toLocaleUpperCase()}>
              <b>
                {Data.clientCompanyName
                  ? Data.clientCompanyName.length > 20
                    ? Data.clientCompanyName
                        .toLocaleUpperCase()
                        .slice(0, 29) + "..."
                    : Data.clientCompanyName.toLocaleUpperCase()
                  : "No CompanyName!"}
              </b>
            </p>
            <p className="textClientCard" style={{ width: "130%" }}>
              Motivation :
              <b style={{ background: "transparent", zIndex: "9" }}>
                {candidatMotivationIcons[Data.clientMotivation].icon +" " +candidatMotivationIcons[Data.clientMotivation].motivation}
              </b>
            </p>
            <div>
              {" "}
              <p
                className="textClientCard"
                style={{
                  height: "30px",
                  background: "transparent",
                  width: "120%",
                }}
              >
                Importance :
                <b
                  className="d-flex"
                  style={{ width: "44%", marginLeft: "5px" }}
                >
                  {candidatImportanceIcons[Data.clientImportance - 1]
                    ?.icon
                    ? candidatImportanceIcons[Data.clientImportance - 1]
                        ?.icon
                    : "No Importance"}
                </b>
              </p>
            </div>
            <div>
              <p className="textClientCard">
                Num of position :{" "}
                <b>
                  {" "}
                  {Data.numberOfPosts
                    ? Data.numberOfPosts
                    : "No Posts!"}
                </b>{" "}
              </p>
            </div>
          </div>
          <div className="col-4 text-end d-flex align-items-start justify-content-end">
            <Link to="#">
              <button className="todoClient mt-2">
                <img src={require("../../../images/briefcase.svg").default} />
              </button>
            </Link>
          </div>
        </div>
        <div className="col-12">
          <div className="row color-rowClientCard ">
            <p style={{ color: date >= start && date <= end  ? "#3F76E2" : "#ca1313"}}>Recruiting  :  {date >= start && date <= end  ? " From " + Data.jobStartDate  + "  To  " + Data.jobEndDate :   "⚠️ From  " + Data.jobStartDate +"  To  " + Data.jobEndDate} 
            </p>
          </div>
        </div>
        <div className="col-12">
          <div className="row pxbody">
            <div className="col-5 fontStylingCardDetails px-0 py-1">
              <p className="fontStylingCardP">
                Secteur :{" "}
                {Data.clientActivitySector
                  ? Data.clientActivitySector.length > 15
                    ? Data.clientActivitySector
                        .toLocaleUpperCase()
                        .slice(0, 14) + "..."
                    : Data.clientActivitySector.toLocaleUpperCase()
                  : "No Sector!"}{" "}
              </p>
              <p className="fontStylingCardP">
                Job :{" "}
                {Data.clientJob
                  ? Data.clientJob.length > 15
                    ? Data.clientJob.toLocaleUpperCase().slice(0, 14) +
                      "..."
                    : Data.clientJob.toLocaleUpperCase()
                  : "No Job!"}
              </p>
              <p>
                Langues :{" "}
                <b>
                  {" "}
                  {Data.clientLanguages.length
                    ? Data.clientLanguages
                    : "No Langues!"}
                </b>{" "}
              </p>
              <p>
                Phone :
                <b>
                  {Data.clientPhone.length
                    ? Data.clientPhone
                    : "No Phone Number!"}
                </b>{" "}
              </p>
              <p>
                Estimated CA :{" "}
                <b>
                  {Data.jobTotalBudget
                    ? Data.jobTotalBudget + " €"
                    : "N/A"}
                </b>{" "}
              </p>
            </div>
            <div className="col-7 fontStylingCardDetails px-0 pt-1">
              <p>
                Salary by person :{" "}
                <b>
                  {Data.netSalary || Data.salary_hours ? Data.netSalary + "€" || Data.salary_hours.salaryPerHour * Data.salary_hours.hours  + " €" : "N/A"}
                </b>{" "}
              </p>
              <p>
                E-Mail :{" "}
                <b>
                  {Data.clientEmail
                    ? Data.clientEmail.length > 20
                      ? Data.clientEmail.slice(0, 19) + "..."
                      : Data.clientEmail
                    : "No Email!"}
                </b>{" "}
              </p>
              <p>
                Client Phone :{" "}
                <b>
                  {Data.clientPhone.length
                    ? Data.clientPhone
                    : "No Client Number!"}
                </b>{" "}
              </p>
              <p>
                Contact Name :{" "}
                <b>
                  {Data.clientReferenceName
                    ? Data.clientReferenceName
                    : "No Name!"}
                </b>{" "}
              </p>
              <p>
                Contact phone :{" "}
                <b>
                  {Data.clientReferenceNumber.length
                    ? Data.clientReferenceNumber
                    : "No Contact Number!"}
                </b>{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="row color-rowClientCard p-1">
            <div className="col-4 px-0 d-flex  justify-content-start">
              <div className="d-flex align-items-center ">
              
                <p className="switch-fontCard mb-0">Offre envoyé ?</p>      
              
                
                <Switch
                  className="ml-left"
                  checked={Offre}
                  id="offerSent"
                  onChange={(checked, e, id) =>
                    SwitchChange(checked, Data, id)
                  }
                  checkedHandleIcon={
                    <TurnOn
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-6px",
                      }}
                    />
                  }
                  height={19}
                  width={41}
                  uncheckedHandleIcon={
                    <TurnoFF
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-5px",
                      }}
                    />
                  }
                />
                </div>
              </div>
   
            <div className="col-5 px-0 d-flex  justify-content-center">
              <div className="d-flex align-items-center ">
                <p className="switch-fontCard mb-0">
                  Signature digitale envoyé ?
                </p>

                <Switch
                  checked={Signature}
                  id="signatureSent"
                  className="ml-left"
                  value={Signature}
                  onChange={(checked, e, id) =>
                    SwitchChange(checked, Data, id)
                  }
                  checkedHandleIcon={
                    <TurnOn
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-6px",
                      }}
                    />
                  }
                  height={19}
                  width={41}
                  uncheckedHandleIcon={
                    <TurnoFF
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-5px",
                      }}
                    />
                  }
                />
              </div>
            </div>
            <div className="col-2 d-flex px-0 justify-content-center ml-1">
              <div className="d-flex align-items-center ">
                <p className="switch-fontCard mb-0">A1 ?</p>

                <Switch
                  className="ml-left "
                  onChange={(checked, e, id) =>
                    SwitchChange(checked, Data, id)
                  }
                  checked={A1}
                  id="A1selected"
                  checkedHandleIcon={
                    <TurnOn
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-6px",
                      }}
                    />
                  }
                  height={19}
                  width={41}
                  uncheckedHandleIcon={
                    <TurnoFF
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-5px",
                      }}
                    />
                  }
                />
              </div>
            </div>

            <div className="col-4 d-flex pt-0 px-0 justify-content-start">
              <div className="d-flex align-items-center ">
                <p className="switch-fontCard mb-0">Assurance faite ?</p>
                <Switch
                  className="ml-left "
                  onChange={(checked, e, id) =>
                    SwitchChange(checked, Data, id)
                  }
                  checked={Assurance}
                  id="assuranceFaite"
                  checkedHandleIcon={
                    <TurnOn
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-6px",
                      }}
                    />
                  }
                  height={19}
                  width={41}
                  uncheckedHandleIcon={
                    <TurnoFF
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-5px",
                      }}
                    />
                  }
                />
              </div>
            </div>
            <div className="col-7 d-flex px-0 justify-content-start">
              <div className="d-flex align-items-center ">
                <p className="switch-fontCard mb-0">Client singé ?</p>
                <Switch
                  className="ml-left "
                  // onChange={switchHandle}
                  checked={Contrat}
                  onChange={(checked, e, id) =>
                    SwitchChange(checked, Data, id)
                  }
                  id="contractSigned"
                  checkedHandleIcon={
                    <TurnOn
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-6px",
                      }}
                    />
                  }
                  height={19}
                  width={41}
                  uncheckedHandleIcon={
                    <TurnoFF
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-5px",
                      }}
                    />
                  }
                />
              </div>
            </div>
            <div className="col-5 px-0 d-flex justify-content-start">
              <div className="d-flex align-items-center ">
                <p className="switch-fontCard mb-0">Agence de voyage ok ?</p>
                <Switch
                  className="ml-left "
                  // onChange={switchHandle}
                  checked={Agence}
                  onChange={(checked, e, id) =>
                    SwitchChange(checked, Data, id)
                  }
                  id="agenceDeVoyage"
                  checkedHandleIcon={
                    <TurnOn
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-6px",
                      }}
                    />
                  }
                  height={19}
                  width={41}
                  uncheckedHandleIcon={
                    <TurnoFF
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-5px",
                      }}
                    />
                  }
                />
              </div>
            </div>
            <div className="col-6 d-flex px-0  justify-content-start">
              <div className="d-flex align-items-center ">
                <p className="switch-fontCard mb-0">Publicité commencé ?</p>
                <Switch
                  className="ml-left "
                  // onChange={switchHandle}
                  checked={Public}
                  onChange={(checked, e, id) =>
                    SwitchChange(checked, Data, id)
                  }
                  id="publicityStarted"
                  checkedHandleIcon={
                    <TurnOn
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-6px",
                      }}
                    />
                  }
                  height={19}
                  width={41}
                  uncheckedHandleIcon={
                    <TurnoFF
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-5px",
                      }}
                    />
                  }
                />
              </div>
            </div>

            <div className="col-5 d-flex  px-0">
              <div className="d-flex align-items-center ">
                <p className="switch-fontCard mb-0">SISPI déclaré ?</p>
                <Switch
                  className="ml-left "
                  // onChange={switchHandle}
                  checked={SISPI}
                  onChange={(checked, e, id) =>
                    SwitchChange(checked, Data, id)
                  }
                  // defaultChecked={Data.}
                  id="sispiDeclared"
                  checkedHandleIcon={
                    <TurnOn
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-6px",
                      }}
                    />
                  }
                  height={19}
                  width={41}
                  uncheckedHandleIcon={
                    <TurnoFF
                      style={{
                        position: "absolute",
                        width: "28px",
                        height: "22px",
                        top: "-3px",
                        left: "-5px",
                      }}
                    />
                  }
                />
           </div>
            </div>
          </div>
        </div>
        <div className=" col-12 d-flex justify-content-end my-1">
          <div className="row">
            <div className="col-6 text-center">
              <Select
                options={CardOption}
                className="CardOptions AllMoreOp"
                onChange={MoreOption}
                placeholder="More options"
              />
            </div>

            <div className="col-6 px-0 text-center">
              <button
                className="btn btn-SEEFULLprofile"
                onClick={viewFullProfile}
              >
                See Full Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      {showInProgressModal ? (
        <InProgressClientModal
          props={Data}
          closeModal={setShowInProgressModal}
        />
      ) : null}

      {showArchiveModal ? (
        <ArchivedClientModal
          props={Data}
          closeModal={setShowArchiveModal}
          path={"/clientToDo"}
        />
      ) : null}
                        </div>
                  
        </div>
      </div>
    </>
  );
}
export default ClientToDoList;
