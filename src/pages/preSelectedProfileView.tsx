import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/Candidatefile.css";
import { useLocation } from "react-router-dom";
import InProgressModal from "../components/Modal/InProgressModal";
import ArchivedModal from "../components/Modal/ArchivedModal";
import { useNavigate } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { API_BASE_URL } from "../config/serverApiConfig";
import { Toaster, toast } from "react-hot-toast";
import UploadDow from "../components/Modal/SelectUploadDownload";
import PDFGenerate from "../components/Modal/PDFGenerateModal";
import ErrorLoader from "../components/Loader/SearchBarError";
import ResetProfile from "../components/Modal/RestProfileForArchived";
import DOCUSIGNModalCandidate from "../components/Modal/DOCUSIGNModalCandidate";
import { Tabs, Tab } from "react-tabs-scrollable";
import PDFBoxCandidate from "../components/PDFboxBothSide/PDFBoxCandidate";
import Representance from "../components/Modal/RepresentanceModalCandidate";
import AvanceModal from "../components/Modal/AvanceModalCandidate";
import CandidateContract from "../components/CandidateComponents/CandidateContract";
import DocumLink from "../components/Modal/CandidateRepresentModal/LinkModal";
import ViewPageDetailsBox from "../components/CandidateComponents/ViewPageDetailsBox";
import SocialButtons from "../components/CandidateComponents/ViewPageSocialButtons";
import { motion } from "framer-motion";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});
function PreSelectedView() {
  const navigate = useNavigate();
  const profileData = JSON.parse(localStorage.getItem("profile"));
  const { state } = useLocation();
  const [profile, setProfile] = useState<any>(state ? state : profileData);
  const [PDFModal, setPDFModal] = useState(false);
  const [Data] = useState(profileData);
  const [showInProgressModal, setShowInProgressModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const candidatMotivationIcons = [
    { icon: "", motivation: "No Motivation!" },
    { icon: "😟", motivation: "Disappointed" },
    { icon: "🙁", motivation: "Not Really" },
    { icon: "😊", motivation: "Like" },
    { icon: "🥰", motivation: "Great" },
    { icon: "😍", motivation: "Super Lovely" },
  ];

  const [representance, setRepresentance] = useState(false);
  const [Avance, setAvance] = useState(false);
  const [ReAvance, setReAvance] = useState("");
  const [docUploaded, setDocUploaded] = useState(false);
  const [candidatImage, setCandidatImage] = useState(
    profile.candidatPhoto && profile.candidatPhoto?.url !== undefined
      ? profile.candidatPhoto?.url
      : ""
  );
  const hiddenImageInput = React.useRef(null);
  const [UploadBtn, setSelectUpload] = useState(false);
  const [DocumentSignModal, setDocuSignModal] = useState(false);
  const [ResetModalProfile, setResetModalProfile] = useState(false);
  const [CONTRACT_EMPLOYE_INTERMANN] = useState() as any;
  const [Fiche_Medicale] = useState() as any;
  const [Assurance] = useState() as any;
  const [ID_CARD] = useState() as any;
  const [Reges] = useState() as any;
  const [Fiche_mise_à_disposition] = useState() as any;
  const [DocuLink, setDocuLink] = useState(false);
  const [repID, setRepId] = useState("");
  const notifyDocumentUploadError = () =>
    toast.error("Document Upload Failed! Please Try Again in few minutes.");

  const notifyDocumentUploadSuccess = () =>
    toast.success("Document Uploaded Successfully!");

  let data = { profileData: profile, path: "/preSelected/preSelectedView" };

  const showCustomerProfile = (data) => {
    localStorage.setItem("profile", JSON.stringify(data));
    window.open("/clientSignedGlobalCard", "_blank");
  };

  const [startStatus] = useState(
    profile.candidatStartDate !== undefined
      ? profile.candidatStartDate.slice(0, 4).includes("-")
      : null
  );
  const [endStatus] = useState(
    profile.candidatEndDate !== undefined
      ? profile.candidatEndDate.slice(0, 4).includes("-")
      : null
  );
  const [startDate, setStartDate] = useState() as any;
  const [EndDate, setEndDate] = useState() as any;

  function padTo2DigitsCH(num) {
    return num.toString().padStart(2, "0");
  }

  // console.log(props.data.jobStartDate.slice(0,4).includes("-"))

  function formatDateCha(date) {
    return [
      padTo2DigitsCH(date.getDate()),
      padTo2DigitsCH(date.getMonth() + 1),
      date.getFullYear(),
    ].join("/");
  }

  let start = new Date(profile.candidatStartDate);
  let end = new Date(profile.candidatEndDate);

  useEffect(() => {
    if (startStatus) {
      setStartDate(profile.candidatStartDate);
    } else {
      let data = formatDateCha(start);
      setStartDate(data.replaceAll("/", "-"));
    }
    if (endStatus) {
      setEndDate(profile.candidatEndDate);
    } else {
      let data = formatDateCha(end);
      setEndDate(data.replaceAll("/", "-"));
    }
  });

  const fileChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | any
    >
  ) => {
    if (e.target.name === "candidatPhoto") {
      const fileUploaded = e.target.files[0];
      let formdata = new FormData();
      formdata.append("candidatId", profile._id);
      formdata.append("image", fileUploaded);
      axiosInstance
        .post("uploadCandidatImage", formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + Cookies.get("token"),
          },
        })
        .then((datares) => {
          if (datares.data.status) {
            notifyDocumentUploadSuccess();
            // setCandidatImage(datares.data.filename)
            setTimeout(() => {
              window.location.href = "/preSelected/preSelectedView";
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
  const handleImageChange = (val) => {
    if (val === "upload") {
      handleImageUpload();
    } else if (val === "Download") {
      window.open(candidatImage);
    }
  };
  const handleImageUpload = () => {
    hiddenImageInput.current.click();
  };
  const editCandidatProfile = () => {
    navigate("/preSelected/editPreSelected", { state: data });
  };

  // const renameDocument = (docId: any, docName: any) => {
  //   setRenameDoc(true);
  //   renameCandidatDocument(docId, docName, profile._id).then(resData => {
  //     console.log(resData)
  //     setRenameDoc(false);
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }

  useEffect(() => {
    fetchCandidat(profile._id)
      .then((resData) => {
        setCandidatImage("");
        if (resData.status) {
          setProfile(resData.data);
          setCandidatImage(
            resData.data.candidatPhoto !== undefined
              ? resData.data.candidatPhoto?.url
              : ""
          );
          setDocUploaded(false);
        } else {
          setDocUploaded(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [docUploaded]);

  const fetchCandidat = async (candidatId: any) => {
    return await fetch(
      API_BASE_URL + `getCandidatById/?candidatId=${candidatId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + Cookies.get("token"),
        },
      }
    )
      .then((resp) => resp.json())
      .then((respData) => respData)
      .catch((err) => err);
  };

  return (
    <>
      <Toaster
        position="top-right"
        containerStyle={{ zIndex: "99999999999" }}
      />
      <div className="container-fluid">
        <div className="row pt-1 pr-1">
          <div className="card mt-2 mb-0">
            <div className="row text-start topCandidateHeaderPre">
              <div className="col-6 d-flex align-items-center">
                <div className="stable">
                  <Link to="/preSelected">
                    <button
                      type="button"
                      className="btn d-flex align-items-center p-0"
                    >
                      <img
                        alt="..."
                        src={require("../images/return.svg").default}
                      />
                      <h2 className="card-Leads mb-0"> Candidate Profile</h2>
                    </button>
                  </Link>
                </div>
              </div>
              <div className="col-6 d-flex align-items-center justify-content-end">
                <button
                  className="btn-bgblack mt-0"
                  onClick={editCandidatProfile}
                >
                  <img alt="..." src={require("../images/Edit.svg").default} />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 50,
            }}
            className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 pb-0 mt-1"
          >
            <div className="row bg-todoTodoDetails mt-0">
              <div className="col-xxl-2 col-xl-2 col-md-2 col-sm-2 text-center ">
                {candidatImage !== "" ? (
                  <img
                    alt="..."
                    // src={require("../images/menlogos.svg").default}
                    src={candidatImage}
                    className="img-upload-Download"
                  />
                ) : (
                  <img
                    alt="..."
                    src={require("../images/menlogos.svg").default}
                    className="img-upload-Download"
                  />
                )}
                <button
                  onClick={() => {
                    setSelectUpload(!UploadBtn);
                  }}
                  className="SelectBtn"
                >
                  <img
                    alt="..."
                    className=""
                    src={require("../images/select.svg").default}
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
                  name="candidatPhoto"
                  style={{ display: "none" }}
                />
              </div>
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 card-preProfile">
                <div className="d-flex">
                  <p>
                    Name : {profile.candidatName.toLocaleUpperCase()}|
                    {profile.candidatAge}
                  </p>
                  <span className="card-xlSpan">(Age)</span>
                </div>
                <div>
                  <div className="d-flex mb-0">
                    <p>
                      Motivation :{" "}
                      <b>
                        {profile.candidatMotivation
                          ? candidatMotivationIcons[profile.candidatMotivation]
                              .icon +
                            " " +
                            candidatMotivationIcons[profile.candidatMotivation]
                              .motivation
                          : "✘✘!"}
                      </b>{" "}
                    </p>
                  </div>
                </div>
                <p>
                  Secteur :{" "}
                  {profile.candidatActivitySector
                    ? profile.candidatActivitySector.toLocaleUpperCase()
                    : "✘✘No Sector!"}
                </p>
                <p className="" style={{ width: "150%" }}>
                  Métier/Job :
                  {profile.candidatJob
                    ? profile.candidatJob.toLocaleUpperCase()
                    : "✘✘No Jobs!"}
                </p>
              </div>
              <div className="col-4 px-0 text-end end-class">
                <div className="text-center d-grid justify-content-end align-items-center mt-2 pr-1">
                  <div className="text-end">
                    <button className="preLargebtn">
                      <img
                        alt="..."
                        src={require("../images/preselectedCard.svg").default}
                      />
                      PRE SELECTED
                    </button>
                  </div>
                  <p className="fw-bold textPRE-end pl-5 pt-1">
                    Selectionné pour un client
                  </p>
                  <p className="text-PREBtn-child">
                    This candidate have been selected for a client
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 pb-0 px-1 pt-1">
            <div className="row preColorRowSelected p-2">
              {Data?.candidatPreSelectedFor.map((el, i) =>
                el.clientId ? (
                  <>
                    <p>
                      Selected For client :{" "}
                      {el.clientId.clientCompanyName.toLocaleUpperCase()}
                    </p>

                    <div className="col-8 pt-1 px-1">
                      <p className="CommentSelection">
                        {el.reasonForPreSelection
                          ? el.reasonForPreSelection
                          : "This Client Has No Reason!"}{" "}
                      </p>
                    </div>
                    <div className="col-4 d-flex justify-content-end align-items-center">
                      <button
                        className="btn customerProfil"
                        onClick={(e) => showCustomerProfile(el.clientId)}
                      >
                        <img
                          alt="..."
                          src={require("../images/eyeProfil.svg").default}
                        />
                        CUSTOMER PROFIL
                      </button>
                    </div>
                  </>
                ) : null
              )}
            </div>
          </div>

          <div className="col-xxl-12 col-xl-12 col-lg-12 col-12-md pb-0 pt-1 px-1">
            <div className="row justify-content-between">
              {/* DetailsBox */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5 }}
                variants={{
                  visible: { opacity: 1, x: 0 },
                  hidden: { opacity: 0, x: 50 },
                }}
                className="col-7 Social-Card px-1  scrollbarpree heightWidth"
                id="style-3"
                style={{ maxWidth: "57%" }}
              >
                <ViewPageDetailsBox
                  props={profile}
                  startDate={startDate}
                  EndDate={EndDate}
                />
              </motion.div>
              {/* DetailsBox */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5 }}
                variants={{
                  visible: { opacity: 1, x: 0 },
                  hidden: { opacity: 0, x: -50 },
                }}
                className="col-xxl-5 col-xl-5 col-md-5 col-lg-5 Social-Card text-center p-1 heightWidth"
                style={{ maxWidth: "49%" }}
              >
                <SocialButtons props={profile} />
              </motion.div>
            </div>
          </div>

          <div className="col-xxl-12 col-xl-12 col-lg-12 col-12-md pb-0 pt-1 px-1 Social-Card mt-1">
            <h3 className="exp">Expérience du Candidat </h3>
            <table className="table table-bordered border-dark">
              <thead>
                <tr>
                  <th scope="col">
                    Période Exemple Janvier 2020 à Janvier 2021
                  </th>
                  <th scope="col">Lieu de travail Exemple Paris</th>
                  <th scope="col">
                    Travail effectué Exemple : Facadier Isolateur
                  </th>
                </tr>
              </thead>
              <tbody>
                {profile.candidatExperienceDetails.length > 0 &&
                profile.candidatExperienceDetails[0].period !== "" ? (
                  profile.candidatExperienceDetails.map((detail, i) => (
                    <tr key={i}>
                      <td key={i}>{detail.period}</td>
                      <td key={i}>{detail.location}</td>
                      <td key={i}>{detail.workDoneSample}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center">
                      <b className="d-flex align-items-center justify-content-center my-1">
                        <ErrorLoader />
                        No Experience Details Available!
                      </b>

                      <button
                        className="btn btn-sm text-light btn-dark"
                        onClick={editCandidatProfile}
                      >
                        Edit Candidat To Add Experience Details!
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="col-12 mt-1 p-1 Social-Card">
            <div className="row">
              <div className="col-12 d-flex AnneesStyle">
                <p className="">Années d’expériance :</p>
                <span>
                  {" "}
                  {profile.candidatYearsExperience
                    ? profile.candidatYearsExperience + "years"
                    : "✘✘!"}{" "}
                </span>
              </div>
              <div className="col-12 d-flex AddressEnteredBy">
                <p className="">Adresse : </p>
                <span className="text-capitalize">
                  {" "}
                  {profile.candidatAddress
                    ? profile.candidatAddress
                    : "✘✘No Address!"}
                </span>
              </div>
              <div className="col-12 d-flex AddressEnteredBy">
                <p className="">Ajouté par/Added by :</p>
                <span> {profile.enteredBy}</span>
              </div>
              <div className="col-12">
                <p className="noteThis">
                  Note : Who entred this candidates/employe on the database
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 Social-Card mt-1">
            <div className="row p-1 ">
              <div className="col-3 px-0 text-center">
                <button
                  type="button"
                  className="btn btn-pre-EditProfile"
                  onClick={editCandidatProfile}
                >
                  <img alt="..." src={require("../images/Edit.svg").default} />
                  Edit Profile
                </button>
                <p className="italic-fontStyle text-start">Editer le profil</p>
              </div>
              <div className="col-3 px-0 text-center">
                <button
                  type="button"
                  className="btn btn-pre-Archived"
                  onClick={() => setShowArchiveModal(true)}
                >
                  Archive / Canceled
                </button>
                <p className="italic-fontStyle text-start ">
                  Si plus d’actualité
                </p>
                {showArchiveModal ? (
                  <ArchivedModal
                    props={profile.candidatName}
                    closeModal={setShowArchiveModal}
                    path={"/todolist"}
                  />
                ) : null}
              </div>

              <div className="col-3 px-0 text-center">
                <a
                  type="button"
                  className="btn btn-pre-CVManual  d-flex align-items-center justify-content-center"
                  href="https://www.canva.com/design/DAFA1_f9AmA/ZBNOgKbj-tCDJa9QRj9kNA/edit"
                  target="_blank"
                >
                  <img
                    alt="..."
                    src={require("../images/resume.svg").default}
                  />
                  Créer CV Manuel
                </a>
                <p className="italic-fontStyle text-start">
                  Edit CV with Canva
                </p>
              </div>
              <div className="col-3 px-0 text-center">
                <button
                  type="button"
                  className="btn btn-pre-CVManual"
                  onClick={() => setShowInProgressModal(true)}
                >
                  Move to In Progress
                </button>
                {showInProgressModal ? (
                  <InProgressModal
                    props={profile}
                    closeModal={setShowInProgressModal}
                  />
                ) : null}
                {PDFModal ? (
                  <PDFGenerate
                    props={profile}
                    LinkModal={setDocuSignModal}
                    closeModal={setPDFModal}
                    path="/preSelected"
                  />
                ) : null}
                {ResetModalProfile ? (
                  <ResetProfile
                    props={profile}
                    closeModal={setResetModalProfile}
                    path={"/todolist"}
                  />
                ) : null}
                {representance ? (
                  <Representance
                    props={profile}
                    closeModal={setRepresentance}
                    rePid={setRepId}
                    LinkModal={setDocuLink}
                    setReAvance={setReAvance}
                  />
                ) : null}
                {Avance ? (
                  <AvanceModal
                    props={profile}
                    closeModal={setAvance}
                    rePid={setRepId}
                    LinkModal={setDocuLink}
                    setReAvance={setReAvance}
                  />
                ) : null}
                {DocuLink ? (
                  <DocumLink
                    props={profile}
                    closeModal={setDocuLink}
                    id={repID}
                    ReAvance={ReAvance}
                  />
                ) : null}

                <p className="italic-fontStyle">
                  Si embaché pour un client en cours de recherche
                </p>
              </div>
              <div className="col-4 px-0 text-center">
                <button
                  type="button"
                  onClick={() => setPDFModal(true)}
                  className="btn text-white btn-pre-moveProgress"
                >
                  <img
                    alt="..."
                    src={require("../images/resume.svg").default}
                  />
                  Générér un contrat
                </button>
                <p className="italic-fontStyle text-center">
                  Pour Adrian, générer un contrat pour un candidat
                </p>
              </div>
              <div className="col-4 px-0 text-start">
                <button
                  type="button"
                  onClick={() => setRepresentance(true)}
                  className="btn text-white btn-pre-moveProgress"
                >
                  <img
                    alt="..."
                    src={require("../images/resume.svg").default}
                  />
                  Générer représentance
                </button>
              </div>
              <div className="col-3 px-0">
                <button
                  className="restProfile"
                  onClick={() => setResetModalProfile(true)}
                  style={{ width: "100%" }}
                >
                  <img alt="..." src={require("../images/rest.svg").default} />
                  To-Do
                </button>
                <p className="italic-fontStyle text-center">
                  Profile will be reset to todo stage
                </p>
              </div>
              <div className="col-3 px-0 text-center">
                <button
                  type="button"
                  onClick={() => setAvance(true)}
                  className="btn text-white btn-pre-moveProgress"
                >
                  <img
                    alt="..."
                    src={require("../images/resume.svg").default}
                  />
                  Générer Avance
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 Social-Card mt-1">
            <div className="row  p-1">
              {JSON.stringify(profile).includes(
                JSON.stringify(profile.candidatContract)
              ) ? (
                <>
                  <CandidateContract
                    props={profile}
                    path={"/preSelected/editPreSelected"}
                  />
                </>
              ) : (
                <div className="col-12 d-flex justify-content-center align-items-center py-2">
                  <ErrorLoader />
                  <p className="mb-0 ErrorSearchBox">
                    ✘ No Contract Available for this Candidat! Please add a New
                    Contract ✘
                  </p>
                </div>
              )}
            </div>
          </div>
          <>
            <PDFBoxCandidate props={profile} value={setProfile} />
          </>

          <div className="col-12 Social-Card mt-1">
            <div className="row alertMessage align-items-center py-1">
              <Tabs
                rightBtnIcon={">"}
                hideNavBtns={false}
                leftBtnIcon={"<"}
                showTabsScroll={false}
                tabsScrollAmount={5}
                className="alertMessage"
                activeTab
              >
                {CONTRACT_EMPLOYE_INTERMANN ? null : (
                  <Tab className="redColorStyling">
                    ⚠️ CONTRACT EMPLOYE INTERMANN IS MISSING / MANQUANT
                  </Tab>
                )}
                {ID_CARD ? null : (
                  <Tab className="redColorStyling">
                    ⚠️ ID CARD IS MISSING / MANQUANT
                  </Tab>
                )}
                {Fiche_Medicale ? null : (
                  <Tab className="redColorStyling">
                    ⚠️FICHE MEDICALE IS MISSING / MANQUANT
                  </Tab>
                )}
                {Assurance ? null : (
                  <Tab className="redColorStyling">
                    ⚠️ ASSURANCE IS MISSING / MANQUANT
                  </Tab>
                )}
                {Reges ? null : (
                  <Tab className="redColorStyling">
                    ⚠️ REGES IS MISSING / MANQUANT
                  </Tab>
                )}
                {Fiche_mise_à_disposition ? null : (
                  <Tab className="redColorStyling">
                    ⚠️ FICHE MISE A DISPOSITION IS MISSING / MANQUANT
                  </Tab>
                )}
              </Tabs>
            </div>
            {DocumentSignModal ? (
              <DOCUSIGNModalCandidate
                props={profile}
                closeModal={setDocuSignModal}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
export default PreSelectedView;
