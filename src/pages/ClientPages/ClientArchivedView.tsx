import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../CSS/Client/ClientSeepage.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UploadDow from "../../components/Modal/SelectUploadDownload";
import { ReactComponent as Empty } from "../../images/emptyStar.svg";
import { ReactComponent as StarRating } from "../../images/RatingStar.svg";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import DOCUSIGNModalCandidate from '../../components/Modal/DOCUSIGNModalCandidate'
import PreModalClient from "../../components/Modal/preSelectedModalForClient";
import { API_BASE_URL } from "../../config/serverApiConfig";
import CLintHide from "../../components/Modal/HideClientProfile";
import ClientREST from "../../components/Modal/ClientREStProfile";
import PDFModalClient from "../../components/Modal/PDFGenerateclientModal";
import moment from "moment";
import ErrorLoader from "../../components/Loader/SearchBarError";
import { Tabs, Tab } from "react-tabs-scrollable";
import "react-tabs-scrollable/dist/rts.css";
import PDFBoxClient from "../../components/PDFboxBothSide/PdfBoxClient";
import ClientContract from "../../components/ClientComponents/ClientContract"
import DetailBox from "../../components/ClientComponents/ViewPageDetailBox"
import SocialButton from "../../components/ClientComponents/SocialButtons";
import { motion } from "framer-motion";


function ArchivedViewPage() {
  const profileData = JSON.parse(localStorage.getItem("archive"));
  const { state } = useLocation();
  const [stateid] = useState(state) as any;
  const navigate = useNavigate();

  const [profile, setProfile] = useState<any>(state ? state : profileData);
  const [UploadBtn, setSelectUpload] = useState(false);
  const hiddenImageInput = React.useRef(null);
  const [UpdatedWarning, setUpdatedWarning] = useState(false);
  const [docUploaded, setDocUploaded] = useState(false);
  const [documentList, setDocumentList] = useState([]);
  const [ClientImage, setClientImage] = useState(
    profile.clientPhoto && profile.clientPhoto?.url !== undefined
      ? profile.clientPhoto?.url
      : ""
  );
  const hiddenFileInput = React.useRef(null);
  const [RenameDocStatus, setRenameDocStatus] = useState(false);
  const [showPreSelectedModal, setShowInPreSelectedModal] = useState(false);
  const [PreSelectedData, setPreSelected] = useState([]);
  const [HideProfile, setHideProfile] = useState(false);
  const [RESTprofile, setREStProfile] = useState(false);
  const [PDFModal, setPDFModal] = useState(false);
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
    const [DriveLink,setDriveLink]=useState("")
  const candidatImportanceIcons = [
    {
      icon: (
        <>
          <StarRating style={{ marginRight: "3px", width: "100%" }} />
          <Empty style={{ marginRight: "3px", width: "100%" }} />
          <Empty style={{ marginRight: "3px", width: "100%" }} />
          <Empty style={{ marginRight: "3px", width: "100%" }} />
          <Empty style={{ marginRight: "3px", width: "100%" }} />
        </>
      ),
    },
    {
      icon: (
        <>
          <StarRating style={{ marginRight: "3px", width: "100%" }} />
          <StarRating style={{ marginRight: "3px", width: "100%" }} />
          <Empty style={{ marginRight: "3px", width: "100%" }} />
          <Empty style={{ marginRight: "3px", width: "100%" }} />
          <Empty style={{ marginRight: "3px", width: "100%" }} />
        </>
      ),
    },
    {
      icon: (
        <>
          <StarRating style={{ marginRight: "3px", width: "100%" }} />
          <StarRating style={{ marginRight: "3px", width: "100%" }} />
          <StarRating style={{ marginRight: "3px", width: "100%" }} />
          <Empty style={{ marginRight: "3px", width: "100%" }} />
          <Empty style={{ marginRight: "3px", width: "100%" }} />
        </>
      ),
    },
    {
      icon: (
        <>
          <StarRating style={{ marginRight: "3px", width: "100%" }} />
          <StarRating style={{ marginRight: "3px", width: "100%" }} />
          <StarRating style={{ marginRight: "3px", width: "100%" }} />
          <StarRating style={{ marginRight: "3px", width: "100%" }} />
          <Empty style={{ marginRight: "3px", width: "100%" }} />
        </>
      ),
    },
    {
      icon: (
        <>
          <StarRating style={{ marginRight: "3px", width: "100%" }} />
          <StarRating style={{ marginRight: "3px", width: "100%" }} />
          <StarRating style={{ marginRight: "3px", width: "100%" }} />
          <StarRating style={{ marginRight: "3px", width: "100%" }} />
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
  const [clientContract, setClientContract] = useState() as any;
  const [startStatus]=useState(profile.jobStartDate.slice(0,4).includes("-"))
  const [endStatus]=useState(profile.jobEndDate.slice(0,4).includes("-"))
  const [startDate,setStartDate]=useState()as any
  const [EndDate,setEndDate]=useState()as any

  const [DocumentSignModal,setDocuSignModal]=useState(false)

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
  useEffect(() => {
    setProfile(state ? state : profileData);
  }, [state]);

  const handleImageChange = (val) => {
    if (val === "upload") {
      handleImageUpload();
    }
    if (val === "Download") {
      window.open(ClientImage.replace("http","https"));
    }
  };

  const handleImageUpload = () => {
    hiddenImageInput.current.click();
  };

  let EditData ={state:profile,path:"/archived/archivedClientSeeprofile"}
  const editClientProfile = () => {
    navigate("/archived/archivedClientEditprofile", { state: EditData });
  };

  // DOC Upload //\

  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
  });
  // NOTIFY //

  const notifyDocumentUploadError = () =>
    toast.error("Document Upload Failed! Please Try Again in few minutes.");
  const notifyDocumentDeleteError = () =>
    toast.error("Document Not Removed! Please Try Again in few minutes.");

  const notifyDocumentUploadSuccess = () =>
    toast.success("Document Uploaded Successfully!");
  const notifyDocumentDeleteSuccess = () =>
    toast.success("Document Removed Successfully!");

  //END //

  useEffect(() => {
    profile.clientDocuments.map((el) => {
      if (JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("reges"))) {
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
        JSON.stringify(el.folderName ? el.folderName : null).includes(
          JSON.stringify("carte_d'identite_employes")
        )
      ) {
        setcarte_d([el]);
      }
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(
          JSON.stringify("id_card_employer")
        )
      ) {
        setid_card_employer([el]);
      }
      if (JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("al"))) {
        setal([el]);
      }
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(
          JSON.stringify("contrats_assurances_employes")
        )
      ) {
        setcontrats_assurances_employes([el]);
      }
      if (JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("sispi"))) {
        setsispi([el]);
      }
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(
          JSON.stringify("document_de_represntation")
        )
      ) {
        setdocument_de_represntation([el]);
      }
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("offre_signee"))
      ) {
        setoffre_signee([el]);
      }
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(
          JSON.stringify("attestations_societe_intermann")
        )
      ) {
        setattestations_societe_intermann([el]);
      }
      if (JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("cvs"))) {
        setcvs([el]);
      }
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(
          JSON.stringify("autres_documents")
        )
      ) {
        setautres_documents([el]);
      }
      if (JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("factures"))) {
        setfactures([el]);
      }

      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(
          JSON.stringify("rapport_activite")
        )
      ) {
        setrapport_activite([el]);
      }
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(
          JSON.stringify("offre_envoye_et_nonsigne")
        )
      ) {
        setoffre_envoye_et_nonsigne([el]);
      }
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("fiche_medicale"))
      ) {
        setfiche_medicale([el]);
      }if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("fiche_de_mise_a_disposition"))
      ) {
        setfiche_medicale([el]);
      }
    });
  }, [UpdatedWarning]);


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
              window.location.href = "/archived/archivedClientSeeprofile";
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
          setClientImage(el.clientPhoto ? el.clientPhoto.url : "")
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

  const ViewDownloadFiles = (e,documentName: any) => {
    if(e.target.name ==="btnDownloadLink"){
      window.open(documentName);
        
      }else{
        window.open(documentName);
      }
  };

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


  return (
    <>
      <Toaster
        position="top-right"
        containerStyle={{ zIndex: "9999999999999999999999" }}
      />
      <div className="container-fluid ">
        <div className="row  mt-1">
          <div className="col-12 top-pd mt-2">
            <div className="row">
              <div className="col-8">
                <div className="stable">
                  <Link to="/archived">
                    <button type="button" className="btn FontStyle-TODOSEE">
                      <img src={require("../../images/return.svg").default} />
                      Client File :
                      {profile.clientCompanyName.toLocaleUpperCase()}
                    </button>
                  </Link>
                </div>
              </div>
              <div className="col-4  d-flex align-items-center justify-content-end text-end pr-2">
                {/* <Link to="/clientInProgressEdit"> */}
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
                    {ClientImage !== "" ? (
                      <img
                        src={ClientImage}
                        className="imgArchived-upload-download"
                      />
                    ) : (
                      <img
                        src={require("../../images/fullClientSee.svg").default}
                        className="imgArchived-upload-download"
                      />
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setSelectUpload(!UploadBtn);
                    }}
                    className="SelectBtn"
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
                <div className="col-6 ClientSEEPtags">
                  <div className="d-flex">
                    <p>
                      Company : {profile.clientCompanyName.toLocaleUpperCase()}|
                      {profile.candidatAge ? profile.candidatAge : "No "}
                    </p>
                    <span className="card-xlSpan">(Age)</span>
                  </div>
                  <p>
                    Number of Positions :
                    {profile.numberOfPosts
                      ? profile.numberOfPosts
                      : "No Posts!"}
                  </p>

                  <p>
                    Secteur :
                    {profile.clientActivitySector
                      ? profile.clientActivitySector
                      : "No Sector"}
                  </p>
                  <p>
                    Métier/Job :
                    {profile.clientJob ? profile.clientJob : "No Job!"}
                  </p>
                  <p style={{ width: "120%" }}>
                    Contact Name :
                    {profile.clientReferenceName
                      ? profile.clientReferenceName.toLocaleUpperCase()
                      : "No Contact Name!"}
                  </p>
                </div>
                {/* <div className="col-4 text-end end-class d-grid justify-content-center align-items-center"> */}
                <div className="col-4 d-grid align-items-center">
                  <div className="text-end ">
                    <div className="d-grid justify-content-end align-items-center">
                      <button className="ArchiveLargebtn pb-1 p-0">
                        <img
                          src={require("../../images/ArchivedBtn.svg").default}
                        />
                      </button>
                    </div>
                    <div className="Lead-encore">
                      <p className="mb-0  pt-1">Lead en recherche active</p>
                      <p className="TODOclientChild">
                        Nous recehrchons activement
                      </p>
                    </div>
                  </div>
                  {/* </div> */}
                </div>
              </div>
            </motion.div>

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
                 <SocialButton    props={profile}    />
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

            <div className="col-12 ArchivedBoxAds">
              <div className="row py-2">
                <div className="col-6 ">
                  <p className="StylingArchivedAds mb-0">
                    Ads Spent on this client : {profile.jobTotalBudget ? profile.jobTotalBudget :"✘ No Budget!"}
                  </p>
                </div>
                <div className="col-12">
                  <p className="StylingArchivedAdss">
                    WHY THIS LEAD/CLIENT HAVE BEEN ARCHIVED :
                    {profile.clientArchived.reason}
                  </p>
                </div>
              </div>
            </div>
           <div className="col-12 Social-CardClient my-1 p-1">
              <div className="row">
                <div className="col-6">
                  <div className="ClientFontMotivationsStyling">
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
                        { candidatMotivationIcons[
                            profile.clientMotivation]?.icon +
                            " " +
                            candidatMotivationIcons[
                           
                                 profile.clientMotivation
                                
                            ]?.motivation
                        }
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
                        {profile.enteredBy ? profile.enteredBy :"✘✘!"}
                      </span>
                    </div>
                    <div>
                      <p className="clientNote">
                        Note : Who entred this lead on the database
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-6 d-flex  justify-content-end align-items-center">
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
                <div className="col-3  text-center">
                  <button
                    className="hideProfile"
                    onClick={() => setHideProfile(true)}
                  >
                    <img src={require("../../images/visibility.svg").default} />
                    Hide this profile
                  </button>
                  <p className="italic-fontStyle text-center">
                    Profile will be not deleted but hidded
                  </p>
                </div>
                <div className="col-3 text-center">
                  <button
                    className="restProfile"
                    onClick={() => setREStProfile(true)}
                  >
                    <img src={require("../../images/rest.svg").default} />
                    Reset this profile
                  </button>
                  <p className="italic-fontStyle text-center">
                    Profile will be reset to todo stage
                  </p>
                </div>
                <div className="col-4 text-center">
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
              </div>
            </div>
            <div className="col-12 Social-CardClient mt-1 ">
              {clientContract ? (
                <>
                <ClientContract  props={profile} path="/archived/archivedClientEditprofile"     />
                </>
              ) : (
                <div className="col-12 d-flex justify-content-center align-items-center py-2">
                  <ErrorLoader />
                  <p className="mb-0 ErrorSearchBox">
                  ✘ No Contract Available for this Archived Client! Please add a
                    New Contract ✘
                  </p>
                </div>
              )}
            </div>
                 
                  {showPreSelectedModal ? (
                    <PreModalClient
                      props={PreSelectedData}
                      closepreModal={setShowInPreSelectedModal}
                      clientProps={profile}
                    />
                  ) : null}
                  {PDFModal ? (
                    <PDFModalClient props={profile} closeModal={setPDFModal} LinkModal={setDocuSignModal} path="/archived/archivedClientSeeprofile" />
                  ) : null}
                   {
        DocumentSignModal ? 
        <DOCUSIGNModalCandidate props={profile} closeModal={setDocuSignModal} />

        :
        null

      }
                  {HideProfile ? (
                    <CLintHide
                      props={profile}
                      closeModal={setHideProfile}
                      path={"/clientToDo"}
                    />
                  ) : null}
                  {RESTprofile ? (
                    <ClientREST
                      props={profile}
                      closeModal={setREStProfile}
                      path={"/clientToDo"}
                    />
                  ) : null}
                     {/* PDF Upload */}
            <div>
              <PDFBoxClient   props={profile} value={setProfile} updated={setUpdatedWarning} />
            </div>
{/* PDF Upload End */}
            <div
              className="col-12 Social-CardClient mb-1 "
              style={{ padding: "13px 26px" }}
            >
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
        </div>
      </div>
    </>
  );
}
export default ArchivedViewPage;
