import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../CSS/Client/ClientSeepage.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UploadDow from "../../components/Modal/SelectUploadDownload";
import Switch from "react-switch";
import { ReactComponent as Empty } from "../../images/emptyStar.svg";
import { ReactComponent as StarRating } from "../../images/RatingStar.svg";
import ArchivedClientModal from "../../components/Modal/ArchivedClientModal";
import SignedClientModal from "../../components/Modal/SignContractModal";
import { ReactComponent as TurnoFF } from "../../images/FatX.svg";
import { ReactComponent as TurnOn } from "../../images/base-switch_icon.svg";
import { API_BASE_URL } from "../../config/serverApiConfig";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import PDFModalClient from "../../components/Modal/PDFGenerateclientModal";
import ErrorLoader from "../../components/Loader/SearchBarError";
import moment from "moment";
import { Tabs, Tab } from "react-tabs-scrollable";
import "react-tabs-scrollable/dist/rts.css";
import DOCUSIGNModalCandidate from '../../components/Modal/DOCUSIGNModalCandidate'
import PDFBoxClient from "../../components/PDFboxBothSide/PdfBoxClient";
import PreModalClient from "../../components/Modal/preSelectedModalForClient";
import ClientContract from "../../components/ClientComponents/ClientContract"
import JobAdsCard from '../../components/ClientComponents/ClientJobAds'  
import Carousel from "react-multi-carousel";
import ProfilesLoader from "../../components/Loader/ProfilesLoader"
import Warning from "../../components/Loader/SearchBarError"
import DetailBox from "../../components/ClientComponents/ViewPageDetailBox"
import SocialButton from "../../components/ClientComponents/SocialButtons";
import { motion } from "framer-motion";

let id = "";
function ClientProgressView() {
  const profileData = JSON.parse(localStorage.getItem("embauch"));
  const { state } = useLocation();
  const navigate = useNavigate();
  const [stateid] = useState(state) as any;
  const [profile, setProfile] = useState<any>(state ? state : profileData);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [showSignedModal, setShowSignedModal] = useState(false);
  const [UploadBtn, setSelectUpload] = useState(false);
  const hiddenImageInput = React.useRef(null);
  const [SISPI, setChecked] = useState(profile.sispiDeclared);
  const [Agence, setAgence] = useState(profile.agenceDeVoyage);
  const [Assurance, setAssurance] = useState(profile.assuranceFaite);
  const [A1, setA1] = useState(profile.A1selected);
  const [Public, setPublic] = useState(profile.publicityStarted);
  const [Contrat, setContrat] = useState(profile.contractSigned);
  const [Signature, setSignature] = useState(profile.signatureSent);
  const [Offre, setOffre] = useState(profile.offerSent);
  const [docUploaded, setDocUploaded] = useState(false);
  const [documentList, setDocumentList] = useState([]);
  const hiddenFileInput = React.useRef(null);
  const [PreSelectedData, setPreSelected] = useState([]);
  const [showPreSelectedModal, setShowInPreSelectedModal] = useState(false);
  const [PDFModal, setPDFModal] = useState(false);
  const [UpdatedWarning, setUpdatedWarning] = useState(false);
  const [clientContract, setClientContract] = useState() as any;
  const [imgSource, setImgSource] = useState("");
  const [contrat_client, setcontrat_client] = useState() as any;
  const [contrat_employes, setcontrat_employes] = useState() as any;
  const [carte_d, setcarte_d] = useState() as any;
  const [id_card_employer, setid_card_employer] = useState() as any;
  const [al, setal] = useState() as any;
  const [contrats_assurances_employes, setcontrats_assurances_employes] =
    useState() as any;
  const [sispi, setsispi] = useState() as any;
  const [document_de_represntation, setdocument_de_represntation] =
    useState() as any;
  const [offre_signee, setoffre_signee] = useState() as any;
  const [attestations_societe_intermann, setattestations_societe_intermann] =
    useState() as any;
  const [cvs, setcvs] = useState() as any;
  const [autres_documents, setautres_documents] = useState() as any;
  const [factures, setfactures] = useState() as any;
  const [rapport_activite, setrapport_activite] = useState() as any;
  const [reges, setreges] = useState() as any;
  const [fiche_medicale, setfiche_medicale] = useState() as any;
  const [offre_envoye_et_nonsigne, setoffre_envoye_et_nonsigne] =
    useState() as any;
   const [fiche_de_mise_a_disposition, setfiche_de_mise_a_disposition] =
    useState() as any;
  const [DocumentSignModal,setDocuSignModal]=useState(false)
  const [JobAdsCards,setJobAdsCards] =useState([])
  const [JobAdsCardsStatus,setJobAdsCardsStatus] =useState(false)

  const candidatImportanceIcons = [
    {
      icon: (
        <>
          <StarRating style={{ marginRight: "3px", width: "100%" }} />{" "}
          <Empty style={{ marginRight: "3px", width: "100%" }} />{" "}
          <Empty style={{ marginRight: "3px", width: "100%" }} />{" "}
          <Empty style={{ marginRight: "3px", width: "100%" }} />{" "}
          <Empty style={{ marginRight: "3px", width: "100%" }} />
        </>
      ),
    },
    {
      icon: (
        <>
          <StarRating style={{ marginRight: "3px", width: "100%" }} />
          <StarRating style={{ marginRight: "3px", width: "100%" }} />{" "}
          <Empty style={{ marginRight: "3px", width: "100%" }} />{" "}
          <Empty style={{ marginRight: "3px", width: "100%" }} />{" "}
          <Empty style={{ marginRight: "3px", width: "100%" }} />
        </>
      ),
    },
    {
      icon: (
        <>
          <StarRating style={{ marginRight: "3px", width: "100%" }} />{" "}
          <StarRating style={{ marginRight: "3px", width: "100%" }} />{" "}
          <StarRating style={{ marginRight: "3px", width: "100%" }} />{" "}
          <Empty style={{ marginRight: "3px", width: "100%" }} />{" "}
          <Empty style={{ marginRight: "3px", width: "100%" }} />
        </>
      ),
    },
    {
      icon: (
        <>
          <StarRating style={{ marginRight: "3px", width: "100%" }} />{" "}
          <StarRating style={{ marginRight: "3px", width: "100%" }} />{" "}
          <StarRating style={{ marginRight: "3px", width: "100%" }} />{" "}
          <StarRating style={{ marginRight: "3px", width: "100%" }} />{" "}
          <Empty style={{ marginRight: "3px", width: "100%" }} />
        </>
      ),
    },
    {
      icon: (
        <>
          <StarRating style={{ marginRight: "3px", width: "100%" }} />
          <StarRating style={{ marginRight: "3px", width: "100%" }} />{" "}
          <StarRating style={{ marginRight: "3px", width: "100%" }} />{" "}
          <StarRating style={{ marginRight: "3px", width: "100%" }} />{" "}
          <StarRating style={{ marginRight: "3px", width: "100%" }} />
        </>
      ),
    },
  ];

  const candidatMotivationIcons = [
    { icon: "", motivation: "✘✘!" },
    { icon: "😟", motivation: "Disappointed" },
    { icon: "🙁", motivation: "Not Really" },
    { icon: "😊", motivation: "Like" },
    { icon: "🥰", motivation: "Great" },
    { icon: "😍", motivation: "Super Lovely" },
  ];
  const handleImageChange = (val) => {
    if (val === "upload") {
      handleImageUpload();
    } else if (val === "Download") {
      window.open(imgSource.replace("http","https"));
    }
  };

  
  useEffect(() => {
    profile.clientDocuments.map((el) => {
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("reges"))
      ) {
        setreges([el]);
      }
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("contrat_client"))
      ) {
       setcontrat_client([el]);
        }
       
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(
          JSON.stringify("contrat_employes")
        )
      ) {
        setcontrat_employes([el]);
      }
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("carte_d'identite_employes"))
      ) {
        setcarte_d([el]);
      }
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("id_card_employer"))
      ) {
        setid_card_employer([el]);
      }
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("al"))
      ) {
        setal([el]);
      }
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("contrats_assurances_employes"))
      ) {
        setcontrats_assurances_employes([el]);
      }
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("sispi"))
      ) {
        setsispi([el]);
      }
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("document_de_represntation"))
      ) {
        setdocument_de_represntation([el]);
      }
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("offre_signee"))
      ) {
        setoffre_signee([el]);
      }
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("attestations_societe_intermann"))
      ) {
        setattestations_societe_intermann([el]);
      }
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("cvs"))
      ) {
        setcvs([el]);
      }
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("autres_documents"))
      ) {
        setautres_documents([el]);
      }
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("factures"))
      ) {
        setfactures([el]);
      }

      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("rapport_activite"))
      ) {
        setrapport_activite([el]);
      } if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("offre_envoye_et_nonsigne"))
      ) {
        setoffre_envoye_et_nonsigne([el]);
      }
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("fiche_medicale"))
      ) {
        setfiche_medicale([el]);
      }
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(
          JSON.stringify("fiche_de_mise_a_disposition")
        )
      ) {
        setfiche_de_mise_a_disposition([el]);
      }
    });
  },[UpdatedWarning]);

  useEffect(() => {
    fetchCandidat(profile._id)
      .then((resData) => {
        if (resData.status) {
          resData.data.map((el) => {
            setImgSource(el.clientPhoto ?el.clientPhoto.url : "");
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [state]);
  useEffect(() => {
    setProfile(state ? state : profileData);
    jobAdsCards(profile._id)
  }, [state]);

  function padTo2DigitsCH(num) {
    return num.toString().padStart(2, "0");
  }
  const [startStatus]=useState(profile.jobStartDate.slice(0,4).includes("-"))
  const [endStatus]=useState(profile.jobEndDate.slice(0,4).includes("-"))
  const [startDate,setStartDate]=useState()as any
  const [EndDate,setEndDate]=useState()as any
  // console.log(props.data.jobStartDate.slice(0,4).includes("-"))

  function formatDateCha(date) {
    return [
      padTo2DigitsCH(date.getDate()),
      padTo2DigitsCH(date.getMonth() + 1),
      date.getFullYear(),
    ].join("/");
  }
  const datenow = moment().format("YYYY-MM-DD");

  let date = new Date(datenow);

  let start = new Date(profile.jobStartDate);
  let end = new Date(profile.jobEndDate);

  useEffect(()=>{
    if(startStatus){
      setStartDate(profile.jobStartDate)
    }else{
      let data=formatDateCha(start)
      setStartDate(data.replaceAll("/","-"))
      
  
    }
    if(endStatus){
      setEndDate(profile.jobEndDate)
    }else{
      let data=formatDateCha(end)
      setEndDate(data.replaceAll("/","-"))
      
  
    }
   })
  // DOC Upload //\

  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
  });
  // NOTIFY //
  const notificationSwitch = () => toast.success("Modification sauvegardée");
  const notifyDocumentUploadError = () =>
    toast.error("Document Upload Failed! Please Try Again in few minutes.");
  const notifyDocumentDeleteError = () =>
    toast.error("Document Not Removed! Please Try Again in few minutes.");

  const notifyDocumentUploadSuccess = () =>
    toast.success("Document Uploaded Successfully!");
  const notifyDocumentDeleteSuccess = () =>
    toast.success("Document Removed Successfully!");

  //END //

  const fileChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | any
    >
  ) => {
    if (e.target.name === "clientPhoto") {
      console.log(e.target.files, "e.target.files");
      console.log(e.target.files[0], "e.target.files[]");
      const fileUploaded = e.target.files[0];
      let formdata = new FormData();
      formdata.append("clientId", profile._id);
      formdata.append("image", fileUploaded);
      axiosInstance
        .post("uploadClientImage", formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((datares) => {
          if (datares.data.status) {
            //  setClientImage(datares.data.filename)
            notifyDocumentUploadSuccess();

            setTimeout(() => {
              window.location.href = "/clientInProgressProfile";
            }, 2000);
          } else {
            notifyDocumentUploadError();
          }
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }
  };

  useEffect(() => {
    fetchCandidat(state ? stateid._id : profileData._id)
      .then((resData) => {
        if (resData.status == true) {
          resData.data.map((el) => {
            setProfile(el);
            setClientContract(el.clientContract);
          });
       setDocUploaded(false);
        } else {
          setDocumentList([...documentList]);
          setDocUploaded(false);
        }
      })

      .catch((err) => {
        console.log(err);
      });

  }, [docUploaded]);


  const fetchCandidat = async (clientId: any) => {
    return await fetch(API_BASE_URL + `getClientById/?clientId=${clientId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((resp) => resp.json())
      .then((respData) => respData)
      .catch((err) => err);
  };

  const handleFileUpload = () => {
    hiddenFileInput.current.click();
  };
  
  //END //
  let Editdata = { state: profile, path: "/clientInProgressProfile" };

  const editClientProfile = () => {
    navigate("/clientInProgressEdit", { state: Editdata });
  };

  const handleImageUpload = () => {
    hiddenImageInput.current.click();
  };

  const SwitchChange = (checked: any, e: any, Name: any) => {
    id = e._id;
    if (Name === "offerSent") {
      if (checked === true) {
        setOffre(true);
        id = e._id;
        onChangeSwitches(id, Name, checked);
        notificationSwitch();
      }
      if (checked === false) {
        setOffre(false);
        onChangeSwitches(id, Name, checked);
        notificationSwitch();
      }
    }
    if (Name === "signatureSent") {
      if (checked === true) {
        setSignature(true);
        id = e._id;

        onChangeSwitches(id, Name, checked);
        notificationSwitch();
      }
      if (checked === false) {
        setSignature(false);
        onChangeSwitches(id, Name, checked);
        notificationSwitch();
      }
    }
    if (Name === "contractSigned") {
      if (checked === true) {
        setContrat(true);
        id = e._id;

        onChangeSwitches(id, Name, checked);
        notificationSwitch();
      }
      if (checked === false) {
        setContrat(false);
        onChangeSwitches(id, Name, checked);
        notificationSwitch();
      }
    }
    if (Name === "publicityStarted") {
      if (checked === true) {
        setPublic(true);
        id = e._id;

        onChangeSwitches(id, Name, checked);
        notificationSwitch();
      }
      if (checked === false) {
        setPublic(false);
        onChangeSwitches(id, Name, checked);
        notificationSwitch();
      }
    }
    if (Name === "A1selected") {
      if (checked === true) {
        setA1(true);
        id = e._id;

        onChangeSwitches(id, Name, checked);
        notificationSwitch();
      }
      if (checked === false) {
        setA1(false);
        onChangeSwitches(id, Name, checked);
        notificationSwitch();
      }
    }
    if (Name === "assuranceFaite") {
      if (checked === true) {
        setAssurance(true);
        id = e._id;

        onChangeSwitches(id, Name, checked);
        notificationSwitch();
      }
      if (checked === false) {
        setAssurance(false);
        onChangeSwitches(id, Name, checked);
        notificationSwitch();
      }
    }
    if (Name === "agenceDeVoyage") {
      if (checked === true) {
        setAgence(true);
        id = e._id;

        onChangeSwitches(id, Name, checked);
        notificationSwitch();
      }
      if (checked === false) {
        setAgence(false);
        onChangeSwitches(id, Name, checked);
        notificationSwitch();
      }
    }
    if (Name === "sispiDeclared") {
      if (checked === true) {
        setChecked(true);
        id = e._id;

        onChangeSwitches(id, Name, checked);
        notificationSwitch();
      }
      if (checked === false) {
        setChecked(false);
        onChangeSwitches(id, Name, checked);
        notificationSwitch();
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

  const jobAdsCards = async (Id) => {
    setJobAdsCardsStatus(false)

    await fetch(
      `${API_BASE_URL}getClientAds/?clientId=${Id}`,
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
      .then((result) => 
      {
       if(result.status){
        setJobAdsCards([...result.data])
        setJobAdsCardsStatus(true)
       }else{
        setJobAdsCards([])
        setJobAdsCardsStatus(true)

       }
      }
      )
      .catch((err) => err);
  };
  
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <Toaster
        position="top-right"
        containerStyle={{ zIndex: "9999999999999999999999" }}
      />
      <div className="containet-fluid">
        <div className="row px-1">
          <div className="col-12 top-pd mt-1">
            {/* <div className="col-12 top-pd text-center">
              <h1 style={{ textDecoration: 'underline' }}>CLIENT FILE: {profile.clientCompanyName}</h1>
            </div> */}
            <div className="row">
              <div className="col-8">
                <div className="stable">
                  <Link to="/clientProgress">
                    <button type="button" className="btn FontStyle-TODOSEE">
                      <img src={require("../../images/return.svg").default} />
                      Client File :{" "}
                      {profile.clientCompanyName.toLocaleUpperCase()}
                    </button>
                  </Link>
                </div>
              </div>
              <div className="col-4  d-flex align-items-center justify-content-end text-end pr-2">
                <button
                  className="btn btn-bgbClient"
                  onClick={() => editClientProfile()}
                >
                  <img src={require("../../images/Edit.svg").default} />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
          <div className="px-0">
          <motion.div
  initial={{ scale: 0 }}
  animate={{ rotate:0, scale:1}}
  transition={{
    type: "spring",
    stiffness: 120,
    damping: 50
  }}   className="col-12 my-1 py-1 ClientSEE-TopDetails">
              <div className="row">
                <div className="col-2 pr-0 text-center">
                  <div className="">
                    {imgSource !== "" ? (
                      <img
                        src={imgSource}
                        className="imgEmbauch-upload-Download"
                      />
                    ) : (
                      <img
                        src={require("../../images/fullClientSee.svg").default}
                        className="imgEmbauch-upload-Download"
                      />
                    )}
                  </div>
                  {/* <Select
                          closeMenuOnSelect={true}
  // onChange={handleChange}
  // components={ {SingleValue: customSingleValue } }
  options={uploadOption}
  className="upload-Client"
  // defaultValue={uploadOption[0]}
/> */}
                  <button
                    onClick={() => {
                      setSelectUpload(!UploadBtn);
                    }}
                    className="SelectBtn"
                    type="button"
                  >
                    <img
                      className=""
                      src={require("../../images/select.svg").default}
                    />
                    {UploadBtn ? (
                      <UploadDow
                        closeModal={setSelectUpload}
                        FunModal={handleImageChange}
                      />
                    ) : null}
                  </button>
                  <input
                    type="file"
                    ref={hiddenImageInput}
                    onChange={fileChange}
                    name="clientPhoto"
                    style={{ display: "none" }}
                  />
                </div>

                {/* <button type="button" className="btn btn-upload">
                    UPLOAD PHOTO
                  </button> */}
                <div className="col-6 ClientSEEPtags">
                  <div className="d-flex">
                    <p>
                      Company : {profile.clientCompanyName.toLocaleUpperCase()}|
                      {profile.candidatAge ? profile.candidatAge : "No "}
                    </p>
                    <span className="card-xlSpan">(Age)</span>
                  </div>
                  <p>
                    Number of Positions :{" "}
                    {profile.numberOfPosts
                      ? profile.numberOfPosts
                      : "No Posts!"}
                  </p>

                  <p>
                    Secteur :{" "}
                    {profile.clientActivitySector
                      ? profile.clientActivitySector
                      : "No Sector"}
                  </p>
                  <p>
                    Métier/Job :{" "}
                    {profile.clientJob ? profile.clientJob : "No Job!"}
                  </p>
                  <p style={{ width: "120%" }}>
                    Contact Name :{" "}
                    {profile.clientReferenceName
                      ? profile.clientReferenceName.toLocaleUpperCase()
                      : "No Contact Name!"}
                  </p>
                </div>
                {/* <div className="col-4 text-end end-class d-grid justify-content-center align-items-center"> */}
                <div className="col-4 d-grid align-items-center">
                  <div className="text-end ">
                    <button className="InProLargebtn">
                      <img
                        src={require("../../images/thundermini.svg").default}
                      />
                      IN PROGRESS
                    </button>
                    <div className="Lead-encore">
                      <p className="mb-0  pt-1">Lead en recherche active</p>
                      <p className="TODOclientChild">
                        Nous recehrchons activement{" "}
                      </p>
                    </div>
                  </div>
                  {/* </div> */}
                </div>
              </div>
            </motion.div>
            <div className="col-12 Social-CardClient mt-2 ">
              <div className="row p-1">
                <div className="col-2 d-flex px-0 justify-content-start">
                  <div className="d-flex align-items-center ">
                    <p className="fontSizeReactSwitch mb-0">Offre envoyé ?</p>
                    <Switch
                      className="ml-left"
                      onChange={(checked, e, id) =>
                        SwitchChange(checked, profile, id)
                      }
                      // onClick={(e)=>switchHandle(e)}
                      checked={Offre}
                      id="offerSent"
                      checkedHandleIcon={
                        <TurnOn
                          style={{
                            position: "absolute",
                            width: "31px",
                            height: "25px",
                            top: "-3px",
                            left: "-6px",
                          }}
                        />
                      }
                      height={22}
                      width={48}
                      uncheckedHandleIcon={
                        <TurnoFF
                          style={{
                            position: "absolute",
                            width: "27px",
                            height: "26px",
                            top: "-3px",
                            left: "-3px",
                          }}
                        />
                      }
                    />
                  </div>
                </div>
                <div className="col-3 d-flex px-0 justify-content-center">
                  <div className="d-flex align-items-center ">
                    <p className="fontSizeReactSwitch mb-0">
                      Signature digitale envoyé ?
                    </p>
                    <Switch
                      className="ml-left"
                      onChange={(checked, e, id) =>
                        SwitchChange(checked, profile, id)
                      }
                      checked={Signature}
                      id="signatureSent"
                      checkedHandleIcon={
                        <TurnOn
                          style={{
                            position: "absolute",
                            width: "31px",
                            height: "25px",
                            top: "-3px",
                            left: "-6px",
                          }}
                        />
                      }
                      height={22}
                      width={48}
                      uncheckedHandleIcon={
                        <TurnoFF
                          style={{
                            position: "absolute",
                            width: "27px",
                            height: "26px",
                            top: "-3px",
                            left: "-3px",
                          }}
                        />
                      }
                    />
                  </div>
                </div>
                <div className="col-2 d-flex px-0 justify-content-end ml-1">
                  <div className="d-flex align-items-center ">
                    <p className="fontSizeReactSwitch mb-0">Client singé ?</p>
                    <Switch
                      className="ml-left"
                      onChange={(checked, e, id) =>
                        SwitchChange(checked, profile, id)
                      }
                      checked={Contrat}
                      id="contractSigned"
                      checkedHandleIcon={
                        <TurnOn
                          style={{
                            position: "absolute",
                            width: "31px",
                            height: "25px",
                            top: "-3px",
                            left: "-6px",
                          }}
                        />
                      }
                      height={22}
                      width={48}
                      uncheckedHandleIcon={
                        <TurnoFF
                          style={{
                            position: "absolute",
                            width: "27px",
                            height: "26px",
                            top: "-3px",
                            left: "-3px",
                          }}
                        />
                      }
                    />
                  </div>
                </div>
                <div className="col-3 d-flex px-0 justify-content-end">
                  <div className="d-flex align-items-center ">
                    <p className="fontSizeReactSwitch mb-0">
                      Publicité commencé ?
                    </p>
                    <Switch
                      className="ml-left"
                      onChange={(checked, e, id) =>
                        SwitchChange(checked, profile, id)
                      }
                      checked={Public}
                      id="publicityStarted"
                      checkedHandleIcon={
                        <TurnOn
                          style={{
                            position: "absolute",
                            width: "31px",
                            height: "25px",
                            top: "-3px",
                            left: "-6px",
                          }}
                        />
                      }
                      height={22}
                      width={48}
                      uncheckedHandleIcon={
                        <TurnoFF
                          style={{
                            position: "absolute",
                            width: "27px",
                            height: "26px",
                            top: "-3px",
                            left: "-3px",
                          }}
                        />
                      }
                    />
                  </div>
                </div>
                <div className="col-1 d-flex px-0 justify-content-center ml-1">
                  <div className="d-flex align-items-center ">
                    <p
                      className="fontSizeReactSwitch mb-0"
                      style={{ width: "22px" }}
                    >
                      A1 ?
                    </p>
                    <Switch
                      className="ml-left"
                      onChange={(checked, e, id) =>
                        SwitchChange(checked, profile, id)
                      }
                      checked={A1}
                      id="A1selected"
                      checkedHandleIcon={
                        <TurnOn
                          style={{
                            position: "absolute",
                            width: "31px",
                            height: "25px",
                            top: "-3px",
                            left: "-6px",
                          }}
                        />
                      }
                      height={22}
                      width={48}
                      uncheckedHandleIcon={
                        <TurnoFF
                          style={{
                            position: "absolute",
                            width: "27px",
                            height: "26px",
                            top: "-3px",
                            left: "-3px",
                          }}
                        />
                      }
                    />
                  </div>
                </div>
                <div className="col-2 d-flex pt-1 px-0 justify-content-start">
                  <div className="d-flex align-items-center ">
                    <p className="fontSizeReactSwitch mb-0">
                      Assurance faite ?
                    </p>
                    <Switch
                      className="ml-left"
                      onChange={(checked, e, id) =>
                        SwitchChange(checked, profile, id)
                      }
                      checked={Assurance}
                      id="assuranceFaite"
                      checkedHandleIcon={
                        <TurnOn
                          style={{
                            position: "absolute",
                            width: "31px",
                            height: "25px",
                            top: "-3px",
                            left: "-6px",
                          }}
                        />
                      }
                      height={22}
                      width={48}
                      uncheckedHandleIcon={
                        <TurnoFF
                          style={{
                            position: "absolute",
                            width: "27px",
                            height: "26px",
                            top: "-3px",
                            left: "-3px",
                          }}
                        />
                      }
                    />
                  </div>
                </div>
                <div className="col-3 d-flex pt-1 px-0 justify-content-center">
                  <div className="d-flex align-items-center ">
                    <p className="fontSizeReactSwitch mb-0">
                      Agence de voyage ok ?
                    </p>
                    <Switch
                      className="ml-left"
                      onChange={(checked, e, id) =>
                        SwitchChange(checked, profile, id)
                      }
                      checked={Agence}
                      id="agenceDeVoyage"
                      checkedHandleIcon={
                        <TurnOn
                          style={{
                            position: "absolute",
                            width: "31px",
                            height: "25px",
                            top: "-3px",
                            left: "-6px",
                          }}
                        />
                      }
                      height={22}
                      width={48}
                      uncheckedHandleIcon={
                        <TurnoFF
                          style={{
                            position: "absolute",
                            width: "27px",
                            height: "26px",
                            top: "-3px",
                            left: "-3px",
                          }}
                        />
                      }
                    />
                  </div>
                </div>
                <div className="col-3 d-flex pt-1 px-0  justify-content-center">
                  <div className="d-flex align-items-start ">
                    <p className="fontSizeReactSwitch mb-0">SISPI déclaré ?</p>
                    <Switch
                      className="ml-left"
                      onChange={(checked, e, id) =>
                        SwitchChange(checked, profile, id)
                      }
                      checked={SISPI}
                      id="sispiDeclared"
                      checkedHandleIcon={
                        <TurnOn
                          style={{
                            position: "absolute",
                            width: "31px",
                            height: "25px",
                            top: "-3px",
                            left: "-6px",
                          }}
                        />
                      }
                      height={22}
                      width={48}
                      uncheckedHandleIcon={
                        <TurnoFF
                          style={{
                            position: "absolute",
                            width: "27px",
                            height: "26px",
                            top: "-3px",
                            left: "-3px",
                          }}
                        />
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 pt-1 py-0 mb-1">
              <div className="row justify-content-between">
                          <motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  transition={{ duration: 0.7, delay: 0.7 }}
  variants={{
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: 50 }
  }}

                  className="col-xxl-5 col-xl-5 col-md-5 col-lg-5 Social-Card text-center p-1 Social-cardDiv"
                  style={{ maxWidth: "49%" }}
                >
                <SocialButton  props={profile} />
                </motion.div>
                <motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  transition={{ duration: 0.7, delay: 0.7 }}
  variants={{
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -50 }
  }}
                  className="col-xxl-8 col-xl-8 col-lg-8 col-md-7 Social-Card p-1 detailsCardClientSee scrollbar Social-btnS"
                  id="style-3"
                  style={{ maxWidth: "49%" }}
                >
                                                  <DetailBox props={profile} startDate={startDate} EndDate={EndDate} />

                </motion.div>
              </div>
            </div>

            <div className="col-12 inPAdsBOX">
              <div className="row">
                <div className="col-6 pt-2 pb-1">
                  <p>Ads Spent on this client  <b>: {profile.jobTotalBudget ? profile.jobTotalBudget : "✘ No Ads!"}</b></p>
                </div>
              </div>
            </div>
          
              <div className="col-12 my-1 clientAdJobs">
                <div className="row p-1">
{
JobAdsCardsStatus ?  
JobAdsCards.length > 0 ?
                <Carousel responsive={responsive}>
                  {
                        
                    JobAdsCards.map((el)=>(
                      <div className="col-12">

                      <JobAdsCard    bg="progress"   props={el}     />
                      </div>
                    ))
                  }
                  </Carousel>
                  :
                  <div className="col-12 d-flex justify-content-center">
                  <p className="mb-0 d-flex align-items-center ErrorSearchBox"><Warning /> NO JOBS ADS FOUND ✘✘!</p>
                  </div>

:
<div className="col-12 d-flex justify-content-center">
<ProfilesLoader  width ={250} height={200} fontSize={"26px"} fontWeight={"600"}  Title={"Please Wait!"}/> 
</div>
}
                </div>
              </div>
          
            <div className="col-12 Social-CardClient my-1 p-1">
              <div className="row">
                <div className="col-6">
                  <div className="ClientFontMotivationsStyling">
                    {/* <p>
                    Importance:
                    <StarRatings
                      rating={profile.clientImportance}
                      starRatedColor="#ffc107"
                      // changeRating={}
                      numberOfStars={profile.clientImportance}
                      starDimension={"19px"}
                      starSpacing={"1px"}
                      name="rating"
                    />
                  </p> */}
                    <p
                      className="d-flex align-items-center mb-0"
                      style={{ height: "30px", background: "transparent" }}
                    >
                      Importance :
                      <b
                        className="d-flex align-items-center"
                        style={{ width: "25%", marginLeft: "5px" }}
                      >
                        {candidatImportanceIcons[profile.clientImportance - 1]
                          ?.icon
                          ? candidatImportanceIcons[
                              profile.clientImportance - 1
                            ]?.icon
                          : "✘✘!"}
                      </b>
                    </p>
                    <p className="mb-0 pt-1" style={{ width: "130%" }}>
                      Motivation :
                      <b style={{ background: "transparent", zIndex: "9999" }}>
                        {candidatMotivationIcons[profile.clientMotivation]
                          .icon +
                          " " +
                          candidatMotivationIcons[profile.clientMotivation]
                            .motivation}
                      </b>
                    </p>

                    <div className="d-flex align-items-center">
                      <p style={{ marginBottom: "0px" }}>
                        Ajouté par/Added by :
                      </p>
                      <span
                        className="ClientFontMotivationsStylingS"
                        style={{ marginBottom: "0px" }}
                      >
                        {profile.enteredBy ? profile.enteredBy : "✘✘!"}
                      </span>
                    </div>
                    <div>
                      <p className="clientNote">
                        Note : Who entred this lead on the database
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-6 d-flex justify-content-end align-items-center">
                  <button className="pdf-btn" onClick={handleFileUpload}>
                    <img
                      src={require("../../images/doc.svg").default}
                      className="docImg"
                    />
                    <span>Add document about this client </span>
                  </button>
                </div>
                <input
                  type="file"
                  ref={hiddenFileInput}
                  onChange={fileChange}
                  name="clientDocuments"
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <div className="col-12 Social-CardClient p-1">
              <div className="row">
                <div className="col-3 text-center">
                  <button
                    type="button"
                    className="btn btn-BlackEdit"
                    onClick={editClientProfile}
                  >
                    <img src={require("../../images/Edit.svg").default} />
                    Edit Profile
                  </button>
                  <p className="btn-Down text-center text-start">
                    Editer le profil
                  </p>
                </div>

                <div className="col-3 text-center">
                  <a
                    href="https://www.canva.com/design/DAFA2NwkHSw/p4I45NInV69YG9HKrS3TGw/edit"
                    target="_blank"
                    type="button"
                    className=" btn-contractClient"
                  >
                    <img
                      src={require("../../images/doc.svg").default}
                      style={{ paddingRight: "5px" }}
                    />
                    Créer offre
                  </a>

                  <p className="btn-Down text-center">
                    Créer une offre avec Canva
                  </p>
                </div>
                <div className="col-3 text-center">
                  <button
                    type="button"
                    className="btn btn-ArchivedClient"
                    onClick={() => {
                      setShowArchiveModal(true);
                    }}
                  >
                    Archive / Canceleld
                  </button>
                  {showArchiveModal ? (
                    <ArchivedClientModal
                      props={profile}
                      closeModal={setShowArchiveModal}
                      path={"/clientToDoProfile"}
                    />
                  ) : null}
                  <p className="btn-Down text-center">Si plus d’actualité</p>
                </div>
                <div className="col-3">
                  <a
                    href="https://docs.google.com/spreadsheets/d/14xzXy9FD5V7ASYfYZg1kPmHSGvPqr4APfIWP_S9r_tI/edit#gid=0"
                    target="_blank"
                    type="button"
                    className="btn btn-grilleClient"
                  >
                    <img
                      src={require("../../images/salary.svg").default}
                      style={{ paddingRight: "5px" }}
                    />
                    Grille de prix
                  </a>
                  <p className="btn-Down text-center">
                    Accès réstreint à Jeremy & Pat
                  </p>
                </div>
                <div className="col-3">
                  <a
                    href="https://drive.google.com/drive/folders/1MqR9nDBLtpl_xMCmVGmcy5g0T3noPhgZ"
                    target="_blank"
                    type="button"
                    className="btn btn-careerClient"
                  >
                    <img
                      src={require("../../images/doc.svg").default}
                      style={{ paddingRight: "5px" }}
                    />
                    Créer contrat
                  </a>
                  <p className="btn-Down text-center">
                    Créer un contrat avec Drive
                  </p>
                </div>
                <div className="col-3">
                  <button
                    type="button"
                    className="btn btn-MoveClient"
                    onClick={() => {
                      setShowSignedModal(true);
                    }}
                  >
                    <img
                      src={require("../../images/doc.svg").default}
                      style={{ paddingRight: "5px" }}
                    />{" "}
                    Move to signed contract
                  </button>
                  <p className="btn-Down text-center">
                    Si on lance les recherches
                  </p>
                </div>
                <div className="col-4 pl-3 text-center">
                  <button
                    type="button"
                    className="btn btn-careerClient"
                    onClick={(e) => setPDFModal(true)}
                  >
                    <span>
                      <img
                        style={{ paddingRight: "10px" }}
                        src={require("../../images/doc.svg").default}
                      />
                    </span>
                    Générér un contrat
                  </button>
                  <p style={{ width: "106%" }} className="btn-Down text-center">
                    Créer un contrat avec le logiciel CRM
                  </p>
                </div>
                {showSignedModal ? (
                  <SignedClientModal
                    props={profile}
                    closeModal={setShowSignedModal}
                  />
                ) : null}
                {PDFModal ? (
                  <PDFModalClient props={profile} closeModal={setPDFModal}  LinkModal={setDocuSignModal} path="/clientInProgressProfile" />
                ) : null}
                 {
        DocumentSignModal ? 
        <DOCUSIGNModalCandidate props={profile} closeModal={setDocuSignModal} />

        :
        null

      }
              </div>
            </div>
          </div>
          <div className="col-12 Social-CardClient mt-1 ">
            {clientContract ? (
                <ClientContract  props={profile} path="/clientInProgressEdit"     />

             
            ) : (
              <div className="col-12 d-flex justify-content-center align-items-center py-2">
                <ErrorLoader />
                <p className="mb-0 ErrorSearchBox">
                ✘ No Contract Available for this In-Progress Client! Please add
                  a New Contract ✘
                </p>
              </div>
            )}
          </div>
        
          {/* PDF Upload */}
            <div>
              <PDFBoxClient   props={profile} value={setProfile}  updated={setUpdatedWarning} />
            </div>
{/* PDF Upload End */}
          <div
              className="col-12 Social-CardClient mb-1 "
              style={{ padding: "13px 26px" }}
            >
               <div className="row alertMessage align-items-center py-1">
                <Tabs
                  activeTab
                  rightBtnIcon={">"}
                  hideNavBtns={false}
                  leftBtnIcon={"<"}
                  showTabsScroll={false}
                  tabsScrollAmount={5}
                  className="alertMessage"
                >
                  {contrat_client ? null : (
                    <Tab className="redColorStyling">
                      ⚠️ CONTRAT CLIENT IS MISSING / MANQUANT
                    </Tab>
                  )}
                  {contrat_employes ? null : (
                    <Tab className="redColorStyling">
                      ⚠️ CONTRATS EMPLOYES IS MISSING / MANQUANT
                    </Tab>
                  )}
                  {id_card_employer ? null : (
                    <Tab className="redColorStyling">
                      ⚠️ Id Card Employes IS MISSING / MANQUANT
                    </Tab>
                  )}
                  {al ? null : (
                    <Tab className="redColorStyling">
                      ⚠️ A1 IS MISSING / MANQUANT
                    </Tab>
                  )}
                  {contrats_assurances_employes ? null : (
                    <Tab className="redColorStyling">
                      ⚠️ CONTRATS ASSURANCES EMPLOYES IS MISSING / MANQUANT
                    </Tab>
                  )}
                  {sispi ? null : (
                    <Tab className="redColorStyling">
                      ⚠️ SISPI IS MISSING / MANQUANT
                    </Tab>
                  )}
                  {document_de_represntation ? null : (
                    <Tab className="redColorStyling">
                      ⚠️ DOCUMENT DE REPRESENTANCE / REPRESENTATION IS MISSING /
                      MANQUANT
                    </Tab>
                  )}
                  {offre_signee ? null : (
                    <Tab className="redColorStyling">
                      ⚠️ OFFRE SIGNEE / QUOTES IS MISSING / MANQUANT
                    </Tab>
                  )}
                  {attestations_societe_intermann ? null : (
                    <Tab className="redColorStyling">
                      ⚠️ ATTESTATIONS SOCIETE INTERMANN WORK S.R.L IS MISSING /
                      MANQUANT
                    </Tab>
                  )}
                  {cvs ? null : (
                    <Tab className="redColorStyling">
                      ⚠️ CVS IS MISSING / MANQUANT
                    </Tab>
                  )}
                  {autres_documents ? null : (
                    <Tab className="redColorStyling">
                      ⚠️ AUTRES DOCUMENTS / OTHER IS MISSING / MANQUANT
                    </Tab>
                  )}
                  {factures ? null : (
                    <Tab className="redColorStyling">
                      ⚠️ FACTURES IS MISSING / MANQUANT
                    </Tab>
                  )}
                  {rapport_activite ? null : (
                    <Tab className="redColorStyling">
                      ⚠️ RAPPORT ACTIVITE IS MISSING / MANQUANT
                    </Tab>
                  )}
                  {offre_envoye_et_nonsigne ? null : (
                    <Tab className="redColorStyling">
                      ⚠️ OFFRE ENVOYE ET NON SIGNE IS MISSING / MANQUANT
                    </Tab>
                  )}
                  {fiche_medicale ? null : (
                    <Tab className="redColorStyling">
                      ⚠️ FICHE MEDICALE IS MISSING / MANQUANT
                    </Tab>
                  )}
                  {reges ? null : (
                    <Tab className="redColorStyling">
                      ⚠️ REGES IS MISSING / MANQUANT
                    </Tab>
                  )}
                  {fiche_de_mise_a_disposition ? null : (
                    <Tab className="redColorStyling">
                      ⚠️ FICHE DE MISE A DISPOSITION / MANQUANT
                    </Tab>
                  )}
                </Tabs>
              </div>
            </div>
        </div>

                {showPreSelectedModal ? (
                  <PreModalClient
                    props={PreSelectedData}
                    closepreModal={setShowInPreSelectedModal}
                    clientProps={profile}
                  />
                ) : null}
      </div>
    </>
  );
}
export default ClientProgressView;
