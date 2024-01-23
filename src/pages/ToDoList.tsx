import React, { useEffect, useState } from "react";
import "../CSS/CanEmpl.css";
import ToDoProfileCard from "../components/ToDoProfileCard";
import { API_BASE_URL } from "../config/serverApiConfig";
import { Toaster, toast } from "react-hot-toast";
import Loader from "../components/Loader/loader";
import Select, { StylesConfig } from "react-select";
import chroma from "chroma-js";
import { ColourOption } from "../Selecteddata/data";
import ErrorLoader from "../components/Loader/SearchBarError";
import Error404Loader from "../components/Loader/404Error";
import { motion } from "framer-motion";
import Cookies from "js-cookie";

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
let MotivationArr = [];
let LicencePermisArr = [];
let DateArr = [];
let emailArr = [];
let contactArr = [];
let LanguageFilter = [];
function ToDoList() {
  const [sectors, setSectors] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState([]);
  const [selectedSector, setSelectedSector] = useState("");
  const [sectorOptions, setSectorOptions] = useState([]) as any;
  const [jobOptions, setJobOptions] = useState([]);
  const [selectedLanguages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [filterData, setFilterData] = useState([]) as any;
  const [status, setStatus] = useState(Boolean);
  const [nameOptions, setNameOptions] = useState([]) as any;
  const [showMore, setShowMore] = useState(true);
  const [email, setEmail] = useState([]);
  const [dateLoader, setdateLoader] = useState(false);
  const [LoaderTime, setLoaderTime] = useState(false);
  const [licenceOptions, setLicenseOptions] = useState([]);
  let [page, setPage] = useState(0);
  const [motivationOptions, setMotivationOptions] = useState([]);
  const [ContactOptions, setContactOptions] = useState([]);
  const [LanguageOp, setLangOp] = useState([]);
  const [filterLoader, setFetchingLoader] = useState(true);
  const [cardTotallength, setTotalLength] = useState(0);
  const [sectorName, setSectorName] = useState("");
  const [JobName, setJobName] = useState([]) as any;
  const [readyToWorkLength,setreadyToWorkLength]=useState({
    length:"",
    readyToWorkLength:""
  })
  const [AllProfilesForSelect, setAllProfilesForSelects] = useState([]);
  let HaveName = null;
  let MotivationCount = null;
  const loadMoreHandle = (i) => {
    let bottom =
      i.target.scrollHeight - i.target.clientHeight - i.target.scrollTop < 50;
    if (bottom) {
      if (
        cardTotallength > page &&
        selectedSector.length === 0 &&
        selectedJob.length === 0 &&
        selectedLanguages.length === 0 &&
        SelectedName.length === 0 &&
        MotivationArr.length === 0 &&
        LicencePermisArr.length === 0 &&
        DateArr.length === 0 &&
        emailArr.length === 0 &&
        contactArr.length === 0 &&
        FilterJob.length === 0 &&
        LanguageFilter.length === 0 &&
        sectorName === "" &&
        JobName.length === 0 &&
        HaveName === null &&
        MotivationCount === null
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
    if (sectors.length === 0) {
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
    // console.log(jobs);
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
  }, [selectedLanguages, selectedJob, selectedSector, motivationOptions]);

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
  // console.log(selectedJob, "selectedjob");
  const fetchAllJobs = async (sector: string) => {
    if (sector === "Select Un Secteur") {
      return {
        data: [],
      };
    }
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
  const DateFilter = () => {
    fetch(`${API_BASE_URL}getCandidats/?candidatStartDate=${DateArr}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
    })
      .then((reD) => reD.json())
      .then((result) => {
        if (result.total === 0) {
          setLoader(true);
          setStatus(false);
        } else {
          setFilterData([...result.data]);
          setreadyToWorkLength({...readyToWorkLength,readyToWorkLength:result.readyToWorkLength,length:result.length})
          setLoader(true);
          setStatus(true);
        }
      })
      .catch((err) => err);
  };
  const EmailFilter = () => {
    return fetch(`${API_BASE_URL}getCandidats/?candidatEmail=${emailArr}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
    })
      .then((reD) => reD.json())
      .then((result) => result)
      .catch((err) => err);
  };
  const ContactFilter = () => {
    return fetch(
      `${API_BASE_URL}getCandidatsByPhoneNumber/?phoneNumber=${contactArr}`,
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
      .then((result) => result)
      .catch((err) => err);
  };
  const fetchProfiles = async () => {
    await fetch(API_BASE_URL + "allToDoCandidats", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
    })
      .then((resD) => resD.json())
      .then((reD) => {
        setAllProfilesForSelects([...reD]);
      })
      .catch((err) => err);
  };

  const fetchProfileS = async (page) => {
    return await fetch(API_BASE_URL + `toDoCandidats/?skip=${page}`, {
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
        if (cardTotallength < page) {
          setFetchingLoader(false);
          return true;
        }
        if (filterData.length === 0) {
          setFetchingLoader(false);
          setFilterData([...reD]);
        }
      })
      .catch((err) => err);
  };

  // if(JobName !== ""  && sectorName !== "" && HaveName !== ""){
  //  SecJobHaveArr =SectorJob.filter((el)=> JSON.stringify(el).includes(JSON.stringify(sectorName && JobName && HaveName))

  //  )
  //  }

  useEffect(() => {
    if (dateLoader === false) {
      setTimeout(() => {
        setdateLoader(true);
      }, 1000);
    }
    if (licenceOptions.length === 0) {
      setTimeout(() => {
        setLicenseOptions([
          {
            value: "Select Licence",
            label: "Select Licence",
            color: "#FF8B00",
          },
          {
            value: "true",
            label: "Have Licence",
            color: "#FF8B00",
          },
          {
            value: "false",
            label: "No Licence",
            color: "#FF8B00",
          },
        ]);
      }, 1000);
    }

    if (LanguageOp.length === 0) {
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
    if (motivationOptions.length === 0) {
      setTimeout(() => {
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
      }, 1000);
    }
    if (AllProfilesForSelect.length === 0) {
      fetchProfiles();
    }
    if (AllProfilesForSelect.length > 0 && nameOptions.length === 0) {
      if (nameOptions.length === 0) {
        let nameops = AllProfilesForSelect.map((pro) => {
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
      }

      if (email.length === 0) {
        let emailops = [] as any;
        AllProfilesForSelect.filter((item) => {
          if (cardTotallength === 0) {
            setTotalLength(AllProfilesForSelect.length);
          }
          if (item.candidatEmail && item.candidatEmail !== "-") {
            emailops.push({
              value: item.candidatEmail,
              label: item.candidatEmail.toLocaleLowerCase(),
              color: "#FF8B00",
            });
          }
        });
        setEmail([
          {
            value: "Select email",
            label: "Select Email",
            color: "#FF8B00",
          },
          ...emailops,
        ]);
      }
      if (ContactOptions.length === 0) {
        let ContactOp = [] as any;
        AllProfilesForSelect.filter((item) => {
          if (item.candidatPhone) {
            ContactOp.push({
              value: item.candidatPhone,
              label: item.candidatPhone,
              color: "#FF8B00",
            });
          }
        });
        setContactOptions([
          {
            value: "Select Contact",
            label: "Select Contact",
            color: "#FF8B00",
          },
          ...ContactOp,
        ]);
      }
    }
  });

  const handleNameChange = (e: any) => {
    // console.log(e.target.value)
    MotivationCount = null;
    HaveName = null;
    setSectorName("");
    setJobName([]);
    SelectedName = [];
    DateArr = [];
    emailArr = [];
    LanguageFilter = [];
    contactArr = [];
    MotivationArr = [];
    LicencePermisArr = [];
    setSelectedSector("");
    setSelectedJob([]);
    if (e.value === "Select Name") {
      SelectedName = [];
      filterFunction();
    } else if (e.value !== "" && e.value !== "Select Name") {
      SelectedName = [];
      MotivationArr = [];
      let NameField = e.value;
      SelectedName.push(NameField);
    }
  };

  const HandelLicence = (e) => {
    LicencePermisArr = [];
    MotivationCount = null;
    SelectedName = [];
    emailArr = [];
    LanguageFilter = [];
    contactArr = [];
    DateArr = [];
    setSelectedSector("");
    MotivationArr = [];
    if (e.value === "Select Licence") {
      LicencePermisArr = [];
      filterFunction();
    }
    if (e.value !== "" && e.value !== "Select Licence") {
      if (sectorName === "" && JobName.length === 0) {
        LicencePermisArr.push(e.value);
        filterFunction();
      } else {
        HaveName = e.value;
        setTimeout(() => {
          filterFunction();
        }, 1000);
      }
    }
  };

  const handleMotivationChange = (e: any) => {
    // console.log(e.target.value)
    MotivationArr = [];
    LicencePermisArr = [];
    LanguageFilter = [];
    setSelectedSector("");
    emailArr = [];
    DateArr = [];
    FilterJob = [];
    contactArr = [];
    if (e.value === "Select Motivations") {
      MotivationArr = [];
      filterFunction();
    } else if (e.value !== "" && e.value !== "Select Motivations") {
      if (sectorName === "" && JobName.length === 0) {
        MotivationArr = [];
        let sectorField = e.value;
        MotivationArr.push(sectorField);
        filterFunction();
      } else {
        MotivationCount = null;

        MotivationCount = e.value;
        filterFunction();
      }

      // setSelectedSector(sectorField);
    }
  };

  const handleSectorChange = (e: any) => {
    setSectorName(e.value);
    // console.log(e.target.value)
    SelectedName = [];
    LanguageFilter = [];
    MotivationArr = [];
    LicencePermisArr = [];
    FilterJob = [];
    DateArr = [];
    setSelectedJob([]);
    emailArr = [];
    contactArr = [];
    if (e.value === "Select Sector") {
      setJobs([]);
      setSelectedSector("");
      setJobOptions([]);
      filterFunction();
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

  const handleEmailChange = (e: any) => {
    MotivationCount = null;
    HaveName = null;
    setSectorName("");
    setJobName([]);
    SelectedName = [];
    MotivationArr = [];
    LanguageFilter = [];
    LicencePermisArr = [];
    FilterJob = [];
    setSelectedJob([]);
    setSelectedSector("");
    emailArr = [];
    DateArr = [];
    contactArr = [];
    if (e.value === "Select email") {
      emailArr = [];
      filterFunction();
    } else if (e.value !== "" && e.value !== "Select email") {
      emailArr = e.value;
    }
  };

  const handleContactChange = (e: any) => {
    SelectedName = [];
    MotivationCount = null;
    HaveName = null;
    setSectorName("");
    setJobName([]);
    LanguageFilter = [];
    MotivationArr = [];
    LicencePermisArr = [];
    FilterJob = [];
    setSelectedJob([]);
    setSelectedSector("");
    emailArr = [];
    DateArr = [];
    contactArr = [];
    if (e.value === "Select Contact") {
      contactArr = [];
      filterFunction();
    } else if (e.value !== "" && e.value !== "Select Contact") {
      contactArr = e.value;
    }
  };

  useEffect(() => {
    setSelectedJob(FilterJob);
  }, [selectedJob]);

  const filterFunction = async () => {
    setLoader(false);
    if (
      SelectedName.length > 0 ||
      MotivationArr.length > 0 ||
      LicencePermisArr.length > 0 ||
      DateArr.length > 0 ||
      emailArr.length > 0 ||
      contactArr.length > 0
    ) {
      if (
        SelectedName.length > 0 &&
        MotivationArr.length === 0 &&
        LicencePermisArr.length === 0 &&
        DateArr.length === 0 &&
        emailArr.length === 0 &&
        contactArr.length === 0
      ) {
        LicencePermisArr = [];
        setFetchingLoader(false);
        setLoaderTime(true);
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
      if (
        SelectedName.length === 0 &&
        MotivationArr.length > 0 &&
        LicencePermisArr.length === 0 &&
        DateArr.length === 0 &&
        emailArr.length === 0 &&
        contactArr.length === 0
      ) {
        setFilterData([]);
        SelectedName = [];
        setFetchingLoader(false);
        setLoaderTime(false);

        fetch(
          `${API_BASE_URL}getCandidats/?candidatMotivation=${MotivationArr}`,
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
              // setFilterData([...result.data]);
              setreadyToWorkLength({...readyToWorkLength,readyToWorkLength:result.readyToWorkLength,length:result.length})

              setFilterData([...result.data]);
            }
            // setStatus(result.status);
          })
          .catch((err) => err);
        setLoader(true);
      }
      if (
        LicencePermisArr.length > 0 &&
        MotivationArr.length === 0 &&
        SelectedName.length === 0 &&
        DateArr.length === 0 &&
        emailArr.length === 0 &&
        contactArr.length === 0
      ) {
        setFilterData([]);
        SelectedName = [];
        MotivationArr = [];
        setFetchingLoader(false);
        setLoaderTime(false);

        fetch(
          `${API_BASE_URL}getCandidats/?candidatLicensePermis=${LicencePermisArr}`,
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
              setreadyToWorkLength({...readyToWorkLength,readyToWorkLength:result.readyToWorkLength,length:result.length})

              setFilterData([...result.data]);
            }
          })
          .catch((err) => err);
        setLoader(true);
      }
      if (
        DateArr.length > 0 &&
        SelectedName.length === 0 &&
        MotivationArr.length === 0 &&
        LicencePermisArr.length === 0 &&
        emailArr.length === 0 &&
        contactArr.length === 0
      ) {
        setFilterData([]);
        SelectedName = [];
        setFetchingLoader(false);
        setLoaderTime(true);
        MotivationArr = [];
        LicencePermisArr = [];
        setSelectedSector("");

        DateFilter();
      }
      if (
        emailArr.length > 0 &&
        DateArr.length === 0 &&
        SelectedName.length === 0 &&
        MotivationArr.length === 0 &&
        LicencePermisArr.length === 0 &&
        contactArr.length === 0
      ) {
        setFilterData([]);
        SelectedName = [];
        setFetchingLoader(false);
        setLoaderTime(true);
        MotivationArr = [];
        LicencePermisArr = [];
        setSelectedSector("");
        DateArr = [];

        EmailFilter()
          .then((data) => {
            if (data.total === 0) {
              setLoader(true);
              setStatus(false);
            } else {
              setreadyToWorkLength({...readyToWorkLength,readyToWorkLength:data.readyToWorkLength,length:data.length})
              setFilterData([...data.data]);
              setLoader(true);
              setStatus(true);
            }
          })
          .catch((err) => err);
      }
      if (
        contactArr.length > 0 &&
        emailArr.length === 0 &&
        DateArr.length === 0 &&
        SelectedName.length === 0 &&
        MotivationArr.length === 0 &&
        LicencePermisArr.length === 0
      ) {
        setFilterData([]);
        SelectedName = [];
        MotivationArr = [];
        LicencePermisArr = [];
        setSelectedSector("");
        setFetchingLoader(false);
        setLoaderTime(true);
        DateArr = [];
        emailArr = [];
        ContactFilter()
          .then((data) => {
            if (data.total === 0) {
              setLoader(true);
              setStatus(false);
            } else {
              setFilterData([...data.data]);
              setreadyToWorkLength({...readyToWorkLength,readyToWorkLength:data.readyToWorkLength,length:data.length})
              setLoader(true);
              setStatus(true);
            }
          })
          .catch((err) => err);
      }
    }
    if (
      selectedSector.length > 0 &&
      selectedJob.length === 0 &&
      LanguageFilter.length === 0
    ) {
      setFetchingLoader(false);
      setLoaderTime(true);

      fetch(
        `${API_BASE_URL}filterToDoCandidatBySector/?sector=${selectedSector}`,
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
        `${API_BASE_URL}filterToDoSJL/?sector=${sectorName}&jobs=${JobName}&languages=${LanguageFilter}`,
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
          if (result.length > 0) {
            setLoader(true);
            setStatus(true);
            setFilterData([...result.data]);
            setreadyToWorkLength({...readyToWorkLength,readyToWorkLength:result.readyToWorkLength,length:result.length})

          }
          if (result.status === false) {
            setLoader(true);
            setStatus(false);
          }
        })
        .catch((err) => err);
      setLoader(true);
    }

    if (
      selectedSector.length > 0 &&
      FilterJob.length > 0 &&
      LanguageFilter.length === 0
    ) {
      setFetchingLoader(false);
      setLoaderTime(true);

      await fetch(
        `${API_BASE_URL}filterToDoSJ/?sector=${selectedSector}&jobs=${FilterJob}`,
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
          if (result.length > 0) {
            setLoader(true);
            setStatus(true);
            setFilterData([...result.data]);
            setreadyToWorkLength({...readyToWorkLength,readyToWorkLength:result.readyToWorkLength,length:result.length})

          }
          if (result.status === false) {
            setLoader(true);
            setStatus(false);
          }
        })
        .catch((err) => err);
    }
    if (
      LanguageFilter.length > 0 &&
      selectedJob.length === 0 &&
      selectedSector.length === 0
    ) {
      setFetchingLoader(false);
      setLoaderTime(true);

      await fetch(
        `${API_BASE_URL}filterToDoCandidatByLanguages/?languages=${LanguageFilter}`,
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
          if (result.length > 0) {
            setLoader(true);
            setStatus(true);
            setFilterData([...result.data]);
            setreadyToWorkLength({...readyToWorkLength,readyToWorkLength:result.readyToWorkLength,length:result.length})

          }
          if (result.length === 0) {
            setLoader(true);
            setStatus(false);
          }
        })
        .catch((err) => err);
    }

    if (sectorName !== "" && JobName.length > 0 && HaveName !== null) {
      setFetchingLoader(false);
      setLoaderTime(true);

      await fetch(
        `${API_BASE_URL}filterToDoSJLicence/?sector=${sectorName}&jobs=${JobName}&licence=${HaveName}`,
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
          if (result.length > 0) {
            setLoader(true);
            setStatus(true);
            setFilterData([...result.data]);
            setreadyToWorkLength({...readyToWorkLength,readyToWorkLength:result.readyToWorkLength,length:result.length})

          }
          if (result.data.length === 0) {
            setLoader(true);
            setStatus(false);
            setdateLoader(false);
          }
        })
        .catch((err) => err);
    }
    if (sectorName !== "" && JobName.length > 0 && MotivationCount !== null) {
      setFetchingLoader(false);
      setLoaderTime(true);

      await fetch(
        `${API_BASE_URL}filterToDoSJM/?sector=${sectorName}&jobs=${JobName}&motivation=${MotivationCount}`,
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
          if (result.length > 0) {
            setLoader(true);
            setStatus(true);
            setFilterData([...result.data]);
            setreadyToWorkLength({...readyToWorkLength,readyToWorkLength:result.readyToWorkLength,length:result.length})

          }
          if (result.data.length === 0) {
            setLoader(true);
            setStatus(false);
            setdateLoader(false);
          }
        })
        .catch((err) => err);
    }
    if (
      selectedSector.length === 0 &&
      selectedJob.length === 0 &&
      selectedLanguages.length === 0 &&
      SelectedName.length === 0 &&
      MotivationArr.length === 0 &&
      LicencePermisArr.length === 0 &&
      DateArr.length === 0 &&
      emailArr.length === 0 &&
      contactArr.length === 0 &&
      FilterJob.length === 0 &&
      LanguageFilter.length === 0 &&
      sectorName === "" &&
      JobName.length === 0 &&
      MotivationCount === null &&
      HaveName === null
    ) {
      {
        setLoader(true);
        setStatus(true);
        setFetchingLoader(false);

        // fetchProfiles().then(filteredresponse => {

        //     setFilterData([...filteredresponse])

        // })
        fetchProfileS(page).catch((err) => {
          console.log(err);
        });
      }
    }
  };

  const jobChange = async (jobval) => {
    HaveName = null;
    MotivationCount = null;
    jobval.map((el) => FilterJob.push(el.value));
    setJobName(FilterJob);
    filterFunction();
  };
  const onDateChange = (e: any) => {
    MotivationCount = null;
    HaveName = null;
    setSectorName("");
    setJobName([]);
    LanguageFilter = [];
    MotivationCount = null;
    HaveName = null;
    setSectorName("");
    setJobName([]);
    DateArr = [];
    SelectedName = [];
    emailArr = [];
    FilterJob = [];
    contactArr = [];
    setSelectedSector("");
    LicencePermisArr = [];
    MotivationArr = [];
    if (e.target.name === "candidatStartDate") {
      let SelectedDate = [];
      SelectedDate = e.target.value;
      DateArr.push(SelectedDate);
      filterFunction();
    }
  };
  const LanguageChange = async (lang) => {
    MotivationCount = null;
    HaveName = null;
    DateArr = [];
    MotivationCount = null;
    HaveName = null;
    setSectorName("");
    setJobName([]);
    setSelectedSector("");
    SelectedName = [];
    LicencePermisArr = [];
    FilterJob = [];
    emailArr = [];
    contactArr = [];
    MotivationArr = [];
    // console.log(jobval)
    let LangArr = [];
    if (lang.value === "Select Language") {
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

  const RestFilters = () => {
    setSectors([]);
    setNameOptions([]);
    SelectedName = [];
    setSelectedSector("");
    setSectorOptions([]);
    setJobs([]);
    setSelectedJob([]);
    setJobOptions([]);
    MotivationCount = null;
    HaveName = null;
    setSectorName("");
    setJobName([]);
    setMotivationOptions([]);
    MotivationArr = [];
    LanguageFilter = [];
    setLangOp([]);
    DateArr = [];
    LicencePermisArr = [];
    setLicenseOptions([]);
    setFilterData([]);
    setPage(0);
    setLangOp([]);
    setdateLoader(false);
    setLoaderTime(false);
    emailArr = [];
    setEmail([]);
    contactArr = [];
    setreadyToWorkLength({
      length:"",
      readyToWorkLength:""
    })
    setContactOptions([]);
    toast.success("Filters Reset Successfully!");
    fetchAllSectors();
    setTimeout(() => {
      filterFunction();
    }, 1000);
  };

  return (
    <>
      <Toaster
        position="top-right"
        containerStyle={{ zIndex: "99999999999" }}
      />

      <div
        className="container-fluid cardScrollBar"
        onScroll={loadMoreHandle}
        style={{ overflowY: "auto", height: "100vh" }}
      >
        <div className="row pd ">
          <div
            className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 card-tops px-1 mt-1 "
            style={{ padding: "0px", marginBottom: "20px" }}
          >
            <div className="row text-start">
              <div
                className="card mdquery"
                style={{
                  padding: "15px 15px",
                  borderRadius: "10px",
                  marginBottom: "0px",
                }}
              >
                <div className="d-flex topHeading">
                  {" "}
                  <h2 className="">candidats / employes</h2>{" "}
                  <span className="topBluetext">list to do / En Sommeil</span>
                </div>
                <p className="h-child-text d-flex mb-0">
                  Ici vous avez la liste des candidats ne travaillant pas encore
                  avec nous
                </p>
                <p className="h-child-text mb-0">
                  Vous devez toujours vous assurer d’avoir un maximum
                  d’information sur cette liste et déplacer les candidats en
                  archive si plus d’actualité
                </p>
              </div>
            </div>
          </div>
          <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 bg-white p-2 rounded001 mdquery mb-2">
            <div className="row ">
              <div className="col-md-6 col-xxl-4 col-xl-4 col-lg-4 ">
                <p className="FiltreName">Filtre by name</p>
                <div className="dropdown">
                  <div aria-labelledby="dropdownMenuButton1">
                    {nameOptions.length > 0 ? (
                      <Select
                        name="candidatName"
                        closeMenuOnSelect={true}
                        placeholder="‎ ‎ ‎ ‎ ‎ ‎Select Un Candidat"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleNameChange}
                        options={nameOptions}
                        styles={colourStyles}
                        isClearable={false}
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
                    {/* <select
                      name="candidatActivityName"
                      className="form-select"
                      onChange={handleNameChange}
                      onClick={() => {
                        // setSelectedJob([]);
                        filterFunction();
                      }}
                    >
                      <option value="Select Un Name" className="fadeClass001">Select</option>
                      {nameOptions &&
                        SelectDropDown.map((Name) => (
                          <option value={Name.candidatName}>
                            <button className="dropdown-item">
                              {Name.candidatName}
                            </button>
                          </option>
                        ))}
                    </select> */}
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xxl-4 col-xl-4 col-lg-4">
                <p className="FiltreName">Filtre Secteur d’activité</p>
                <div className="dropdown">
                  <div aria-labelledby="dropdownMenuButton1">
                    {sectorOptions.length > 0 ? (
                      <Select
                        name="candidatActivitySector"
                        closeMenuOnSelect={true}
                        placeholder="‎ ‎ ‎‎ ‎ ‎Select Un Secteur"
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
                    {/* <select
                      name="candidatActivitySector"
                      className="form-select"
                      onChange={handleSectorChange}
                      onClick={() => {
                        setSelectedJob([]);
                        filterFunction();
                      }}
                    >
                      <option value="Select Un Secteur" className="fadeClass001">Select Un Secteur</option> */}
                    {/* {sectors &&
                        sectors.map((sector) => (
                          <option value={sector.sectorName}>
                            <button className="dropdown-item">
                              {sector.sectorName}
                            </button>
                          </option>
                        ))} */}
                    {/* </select> */}
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xxl-4 col-xl-4 col-lg-4 pt-1101">
                <p className="FiltreName">Filtre selection métier / job</p>
                <div>
                  {jobOptions.length > 0 ? (
                    <Select
                      name="jobName"
                      closeMenuOnSelect={true}
                      isMulti
                      placeholder="‎ ‎ ‎ ‎ ‎ ‎Select"
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={jobChange}
                      options={jobOptions}
                      styles={colourStyles}
                    />
                  ) : (
                    <p className="FiltreName mt-1">Select A Sector!</p>
                  )}
                </div>
              </div>
              {showMore ? (
                <>
                  <div className="col-12 pt-1">
                    <div className="row">
                      <div className="col-md-6 col-xxl-4 col-xl-4 col-lg-4 pt-1">
                        <p className="FiltreName">Filtre by Motivation</p>
                        <div className="dropdown">
                          <div aria-labelledby="dropdownMenuButton1">
                            {/* <select
                                name="candidatActivityMotivation"
                                className="form-select"
                                onChange={handleMotivationChange}
                              // onClick={() => {
                              //   // setSelectedJob([]);
                              //   filterFunction();
                              // }}
                              >
                                <option value="Select Un Secteur" className="fadeClass001">Select</option>
                                {motivation &&
                                  Motivation.map((Motivation) => (
                                    <option value={Motivation.value}>
                                      <button className="dropdown-item">
                                        {Motivation.label}
                                      </button>
                                    </option>
                                  ))}
                              </select> */}
                            {motivationOptions.length > 0 ? (
                              <Select
                                name="candidatMotivation"
                                closeMenuOnSelect={true}
                                placeholder="‎ ‎ ‎ ‎ ‎ ‎Select Motivation du Candidat"
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={handleMotivationChange}
                                options={motivationOptions}
                                styles={colourStyles}
                              />
                            ) : (
                              <>
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
                      <div className="col-md-6 col-xxl-4 col-xl-4 col-lg-4 pt-1">
                        <p className="FiltreName">Filter by date</p>
                        {/* <input
                              type="date"
                              className="form-control"
                              name="candidatStartDate"
                                // value={data.candidatStartDate}
                                onClick={onDateChange}
                                
                              /> */}
                        {dateLoader ? (
                          <input
                            type="date"
                            className="form-control inputDate"
                            name="candidatStartDate"
                            onChange={onDateChange}
                          />
                        ) : (
                          <>
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
                      <div className="col-md-6 col-xxl-4 col-xl-4 col-lg-4 pt-1">
                        <p className="FiltreName">Filter by driver licence</p>
                        <div className="dropdown">
                          <div aria-labelledby="dropdownMenuButton1">
                            {/* <select
                                name=""
                                className="form-select"
                                // onChange={handleSectorChange}
                                onChange={HandelLicence}
                              >
                                <option value="Select Un Secteur" className="fadeClass001" selected disabled hidden>Have licence</option>
                                <option value="true" onChange={HandelLicence}>Have Licence</option>
                                <option value="false" onChange={HandelLicence}>Doesn't Have Licence</option>
                              </select> */}
                            {licenceOptions.length > 0 ? (
                              <Select
                                name="candidatLicencePermis"
                                closeMenuOnSelect={true}
                                placeholder="‎ ‎ ‎ ‎ ‎  ‎ Select Licence Permis"
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={HandelLicence}
                                options={licenceOptions}
                                styles={colourStyles}
                              />
                            ) : (
                              <>
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
                      <div className="col-md-6 col-xxl-4 col-xl-4 col-lg-4 pt-2">
                        <p className="FiltreName">Filtre by email</p>
                        <div className="dropdown">
                          <div aria-labelledby="dropdownMenuButton1">
                            {email.length > 0 ? (
                              <Select
                                name="candiatEmail"
                                closeMenuOnSelect={true}
                                placeholder="‎ ‎ ‎ ‎ ‎  ‎ yourmail@mail.com"
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={handleEmailChange}
                                options={email}
                                styles={colourStyles}
                              />
                            ) : (
                              <>
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
                      <div className="col-md-6 col-xxl-4 col-xl-4 col-lg-4 pt-2">
                        <p className="FiltreName">Filtre by contact</p>
                        <div className="dropdown">
                          <div aria-labelledby="dropdownMenuButton1">
                            {ContactOptions.length > 0 ? (
                              <Select
                                name="candidatPhone"
                                closeMenuOnSelect={true}
                                placeholder="‎ ‎ ‎ ‎ ‎  ‎ Candidat's Phone Number"
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={handleContactChange}
                                options={ContactOptions}
                                styles={colourStyles}
                              />
                            ) : (
                              <>
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
                      <div className="col-md-6 col-xxl-4 col-xl-4 col-lg-4 pt-2">
                        <p className="FiltreName">Filtre By Language</p>
                        <div className="dropdown">
                          <div aria-labelledby="dropdownMenuButton1">
                            {/* <select
                                name=""
                                className="form-select"
                                // onChange={handleSectorChange}
                                onChange={HandelLicence}
                              >
                                <option value="Select Un Secteur" className="fadeClass001" selected disabled hidden>Have licence</option>
                                <option value="true" onChange={HandelLicence}>Have Licence</option>
                                <option value="false" onChange={HandelLicence}>Doesn't Have Licence</option>
                              </select> */}
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
                    </div>
                  </div>
                  <div className="extraPadding">
                    <div className="col-12">
                      <div className="row justify-content-end">
                        <div className="col-2 d-flex align-items-center justify-content-end">
                          {selectedSector.length > 0 ||
                          selectedJob.length > 0 ||
                          selectedLanguages.length > 0 ||
                          SelectedName.length > 0 ||
                          MotivationArr.length > 0 ||
                          LicencePermisArr.length > 0 ||
                          DateArr.length > 0 ||
                          emailArr.length > 0 ||
                          contactArr.length > 0 ||
                          LanguageFilter.length > 0 ? (
                            <p
                              className="filterStyling  cursor-pointer mt-2 HoveRESTClass"
                              onClick={() => RestFilters()}
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
                            <img
                              alt="..."
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
                      <div className="col-2 d-flex align-items-center justify-content-end">
                        {selectedSector.length > 0 ||
                        selectedJob.length > 0 ||
                        selectedLanguages.length > 0 ||
                        SelectedName.length > 0 ||
                        MotivationArr.length > 0 ||
                        LicencePermisArr.length > 0 ||
                        DateArr.length > 0 ||
                        emailArr.length > 0 ||
                        contactArr.length > 0 ||
                        LanguageFilter.length > 0 ? (
                          <p
                            className="filterStyling HoveRESTClass cursor-pointer mt-2"
                            onClick={() => RestFilters()}
                          >
                            Reset Filters
                          </p>
                        ) : null}{" "}
                      </div>
                      <div className="col-2 d-flex justify-content-end">
                        <p
                          className="filterStyling pt-2 cursor-pointer"
                          onClick={() => setShowMore(true)}
                        >
                          More Filters{" "}
                          <img
                            alt="..."
                            src={require("../images/down.svg").default}
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
           {
            readyToWorkLength.length || readyToWorkLength.readyToWorkLength ? 
          <>  <div>
            <p className="filterStyling">
              There is <span style={{color:"red"}}>{readyToWorkLength.length}{" "}workers total</span>{" "}that match your request and <span style={{color:"blue"}}>{readyToWorkLength.readyToWorkLength}{" "}ready to work</span>
            </p>
              </div>
              </>
              :
              ""
           }
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
                      className="col-md-6 col-xxl-4   col-xl-4 col-lg-4 col-sm-6 pl-0"
                      key={index}
                    >
                      <ToDoProfileCard data={profile} />
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 60,
                      damping: 15,
                    }}
                    className="col-12"
                  >
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
                  </motion.div>
                )
              ) : (
                <div className="col-12 d-flex justify-content-center align-items-center">
                  <ErrorLoader />
                  <p className="ErrorSearchBox mb-0">
                    No Profiles in Candidat ToDo ! Please Add New Candidats.
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
        </div>
      </div>
    </>
  );
}
export default ToDoList;
