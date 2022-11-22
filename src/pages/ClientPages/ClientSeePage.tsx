import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../CSS/Client/ClientSeepage.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import InProgressClientModal from "../../components/Modal/InProgressClientModal";
import ArchivedClientModal from "../../components/Modal/ArchivedClientModal";
import { ReactComponent as Empty } from "../../images/emptyStar.svg";
import { ReactComponent as StarRating } from "../../images/RatingStar.svg";
import Switch from "react-switch";
import UploadDow from "../../components/Modal/SelectUploadDownload";
import { ReactComponent as TurnoFF } from "../../images/FatX.svg";
import { ReactComponent as TurnOn } from "../../images/base-switch_icon.svg";
import { API_BASE_URL } from "../../config/serverApiConfig";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import ProfileLoader from "../../components/Loader/ProfilesLoader";
import RenameDoc from "../../components/Modal/RenameDoc_ModalClient";
import ReadMoreReact from "read-more-react";
import PreModalClient from "../../components/Modal/preSelectedModalForClient";
import moment from "moment";
import PDFModalClient from "../../components/Modal/PDFGenerateclientModal";
import ErrorLoader from "../../components/Loader/SearchBarError";
import { Tabs, Tab } from "react-tabs-scrollable";
import "react-tabs-scrollable/dist/rts.css";
import DOCUSIGNModalCandidate from '../../components/Modal/DOCUSIGNModalCandidate'
import PDFBoxClient from "../../components/PDFboxBothSide/PdfBoxClient";
import ClientContract from "../../components/ClientComponents/ClientContract"

let RenameData = [];
let id = "";
function ClientSee() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [stateid] = useState(state) as any;
  const ProfileData = JSON.parse(localStorage.getItem("profile"));
  const [profile, setProfile] = useState<any>(state ? state : ProfileData);
  const [showInProgressModal, setShowInProgressModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [SISPI, setChecked] = useState(profile.sispiDeclared);
  const [Agence, setAgence] = useState(profile.agenceDeVoyage);
  const [Assurance, setAssurance] = useState(profile.assuranceFaite);
  const [A1, setA1] = useState(profile.A1selected);
  const [Public, setPublic] = useState(profile.publicityStarted);
  const [Contrat, setContrat] = useState(profile.contractSigned);
  const [Signature, setSignature] = useState(profile.signatureSent);
  const [Offre, setOffre] = useState(profile.offerSent);
  const [UploadBtn, setSelectUpload] = useState(false);
  const hiddenImageInput = React.useRef(null);
  const [docUploaded, setDocUploaded] = useState(false);
  const [documentList, setDocumentList] = useState([]);
  const [ClientImage, setClientImage] = useState(
    profile.clientPhoto && profile.clientPhoto?.url !== undefined
      ? profile.clientPhoto?.url
      : ""
  );
  const [UpdatedWarning, setUpdatedWarning] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showPreSelectedModal, setShowInPreSelectedModal] = useState(false);
  const [PreSelectedData, setPreSelected] = useState([]);
  const [PDFModal, setPDFModal] = useState(false);
  const [clientContract, setClientContract] = useState() as any;
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
  useEffect(() => {
    setProfile(state ? state : ProfileData);
  }, [state]);


  useEffect(() => {
    profile.clientDocuments.map((el) => {
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(
          JSON.stringify("reges")
        )
      ) {
        setreges([el]);
      }
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(
          JSON.stringify("contrat_client")
        )
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
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(
          JSON.stringify("al")
        )
      ) {
        setal([el]);
      }
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(
          JSON.stringify("contrats_assurances_employes")
        )
      ) {
        setcontrats_assurances_employes([el]);
      }
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(
          JSON.stringify("sispi")
        )
      ) {
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
        JSON.stringify(el.folderName ? el.folderName : null).includes(
          JSON.stringify("offre_signee")
        )
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
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(
          JSON.stringify("cvs")
        )
      ) {
        setcvs([el]);
      }
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(
          JSON.stringify("autres_documents")
        )
      ) {
        setautres_documents([el]);
      }
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(
          JSON.stringify("factures")
        )
      ) {
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
        JSON.stringify(el.folderName ? el.folderName : null).includes(
          JSON.stringify("fiche_medicale")
        )
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
  }, [UpdatedWarning]);



  const notificationSwitch = () => toast.success("Modification sauvegardée");

  const notifyDocumentUploadError = () =>
    toast.error("Document Upload Failed! Please Try Again in few minutes.");
  const notifyDocumentDeleteError = () =>
    toast.error("Document Not Removed! Please Try Again in few minutes.");

  const notifyDocumentUploadSuccess = () =>
    toast.success("Document Uploaded Successfully!");
  const notifyDocumentDeleteSuccess = () =>
    toast.success("Document Removed Successfully!");

  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
  });

  useEffect(() => {
    setLoader(true);
    fetchRecommendations(profile.clientActivitySector)
      .then((respData) => {
        if (respData.data.length !== 0) {
          setRecommendations([...respData.data]);
          setLoader(true);
        } else {
          setRecommendations([]);
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const removeRecommendation = (rId: any) => {
    console.log(recommendations);
    let filteredRecommendations = recommendations.filter((recomm) => {
      return recomm._id !== rId;
    });
    console.log(filteredRecommendations);
    setRecommendations([...filteredRecommendations]);
    if (filteredRecommendations.length == 0) {
      setLoader(false);
    } else {
      setLoader(true);
    }
  };
  const fetchRecommendations = async (clientSector: string) => {
    return await fetch(
      API_BASE_URL + `candidatRecommendations/?clientSector=${clientSector}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((resp) => resp.json())
      .then((respData) => respData)
      .catch((err) => err);
  };

  // end

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
          console.log(datares);
          if (datares.data.status) {
            notifyDocumentUploadSuccess();

            setTimeout(() => {
              window.location.href = "/clientToDoProfile";
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
    fetchCandidat(state ? stateid._id : ProfileData._id)
      .then((resData) => {
        if (resData.status == true) {
          resData.data.map((el) => {
            setProfile(el);
            setClientImage(el.clientPhoto? el.clientPhoto.url : "")
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
  }


  const Editdata = { state: profile, path: "/clientToDoProfile" };

  const editClientProfile = () => {
    navigate("/clientToDoEdit", { state: Editdata });
  };
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
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
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

  const handleImageChange = (val) => {
    if (val === "upload") {
      handleImageUpload();
    } else if (val === "Download") {
      window.open(ClientImage.replace("http","https"));
    }
  };
  const handleImageUpload = () => {
    hiddenImageInput.current.click();
  };



  return (
    <>
      <Toaster
        position="top-right"
        containerStyle={{ zIndex: "9999999999999999999999" }}
      />
      <div className="containet-fluid p-1" >
        <div className="row">
          <div className="col-12 top-pd mt-1" key={profile._id}>
            {/* <h1 style={{ textDecoration: 'underline' }}>CLIENT FILE: {profile.clientCompanyName}</h1> */}
            <div className="row">
              <div className="col-8">
                <div className="stable">
                  <Link to="/clientTodo">
                    <button type="button" className="btn FontStyle-TODOSEE">
                      <img src={require("../../images/return.svg").default} />
                      Client File :
                      {profile.clientCompanyName.toLocaleUpperCase()}
                    </button>
                  </Link>
                </div>
              </div>
              <div className="col-4 d-flex align-items-center justify-content-end text-end pr-2">
                <button
                  className="btn btn-bgbClient"
                  onClick={editClientProfile}
                >
                  <img src={require("../../images/Edit.svg").default} />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
          <div className="px-0">
            <div className="col-12 my-1 py-1 ClientSEE-TopDetails">
              <div className="row">
                <div className="col-2 pr-0 text-center">
                  <div className="">
                    {ClientImage !== "" ? (
                      <img
                        src={ClientImage}
                        className="img-uploadTodo-Download"
                      />
                    ) : (
                      <img
                        src={require("../../images/fullClientSee.svg").default}
                        className="img-uploadTodo-Download"
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
                    Number of Positions :
                    {profile.numberOfPosts
                      ? profile.numberOfPosts
                      : "✘ No Posts!"}
                  </p>

                  <p>
                    Secteur :
                    {profile.clientActivitySector
                      ? profile.clientActivitySector.toLocaleUpperCase()
                      : "✘ No Sector"}
                  </p>
                  <p>
                    Métier/Job :
                    {profile.clientJob
                      ? profile.clientJob.toLocaleUpperCase()
                      : "✘ No Job!"}
                  </p>
                  <p style={{ width: "120%" }}>
                    Contact Name :
                    {profile.clientReferenceName
                      ? profile.clientReferenceName.toLocaleUpperCase()
                      : "✘ No Contact Name!"}
                  </p>
                </div>
                {/* <div className="col-4 text-end end-class d-grid justify-content-center align-items-center"> */}
                <div className="col-4 d-grid align-items-center">
                  <div className="text-end ">
                    <button className="ClientSEEBtnStyle">
                      <img
                        src={require("../../images/briefcase2.svg").default}
                      />
                    </button>
                    <div className="Lead-encore">
                      <p className="mb-0  pt-1">Lead pas encore traité</p>
                      <p className="TODOclientChild">
                        Ce lead est en sommeil, pas traité
                      </p>
                    </div>
                  </div>
                  {/* </div> */}
                </div>
              </div>
            </div>
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
                <div className="col-3 d-flex pt-1 px-0 justify-content-center">
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
                <div
                  className="col-xxl-5 col-xl-5 col-md-5 col-lg-5 Social-Card text-center p-1 Social-cardDiv"
                  style={{ maxWidth: "49%" }}
                >
                  <div className="d-flex">
                    <p className="Span-StylingClient text-start pt-2 pb-1 my-1">
                      {profile.clientEmail
                        ? "Company Mail :" + profile.clientEmail
                        : null}
                    </p>
                  </div>
                  {profile.clientEmail ? (
                    <button className="btn-TODOgmail">
                      <a
                        href={`mailto:${profile.clientEmail}`}
                        className="text-dark fw-bold"
                        target="_blank"
                      >
                        <span className="padding-email">
                          <img
                            style={{ width: "8%" }}
                            src={require("../../images/gmail.svg").default}
                          />
                        </span>
                        Send Email
                      </a>
                    </button>
                  ) : null}

                  <div className="d-flex">
                    <p className="Span-StylingClient text-start pt-2 pb-1 my-1">
                      {profile.clientReferenceEmail
                        ? "Contact :" + profile.clientReferenceEmail
                        : null}
                    </p>
                  </div>

                  {profile.clientReferenceEmail ? (
                    <a
                      href={`mailto:${profile.clientReferenceEmail}`}
                      target="_blank"
                      className="btn  fw-bold btn-TODOgmail"
                    >
                      <span className="padding-email">
                        <img src={require("../../images/gmail.svg").default} />
                      </span>
                      Send Email
                    </a>
                  ) : null}

                  <div className="d-flex">
                    <p className="Span-StylingClient text-start pt-2 pb-1 my-1">
                      {profile.clientPhone
                        ? "Company Phone :" + profile.clientPhone
                        : null}
                    </p>
                  </div>
                  {profile.clientPhone ? (
                    <a
                      href={`https://wa.me/${profile.clientPhone}`}
                      target="_blank"
                    >
                      <button className="btn-whatsapp my-1">
                        <span className="padding-email">
                          <img
                            style={{ width: "8%" }}
                            src={require("../../images/whatsapp.svg").default}
                          />
                        </span>
                        Send What’s App
                      </button>
                    </a>
                  ) : null}

                  <div className="d-flex">
                    <p className="Span-StylingClient text-start pt-2 pb-1 my-1">
                      {profile.clientReferenceNumber
                        ? "Contact Phone :" + profile.clientReferenceNumber
                        : null}
                    </p>
                  </div>
                  {profile.clientReferenceNumber !== "" ? (
                    <a
                      href={`https://wa.me/${profile.clientReferenceNumber}`}
                      target="_blank"
                    >
                      <button className="btn-whatsapp my-1">
                        <span className="padding-email">
                          <img
                            style={{ width: "8%" }}
                            src={require("../../images/whatsapp.svg").default}
                          />
                        </span>
                        Send What’s App
                      </button>
                    </a>
                  ) : null}
                </div>
                <div
                  className="col-xxl-8 col-xl-8 col-lg-8 col-md-7 Social-Card p-1 detailsCardClientSee scrollbar Social-btnS"
                  id="style-3"
                  style={{ maxWidth: "49%" }}
                >
                  <div className="Todo-ClinetCardMore force-overflow">
                    <div className="d-flex">
                      <div className="d-flex">
                        <p className="CompanyAddres">Company Adress :</p>
                        <span className="Todo-ClinetCardMore-span">
                          {profile.clientAddress
                            ? profile.clientAddress
                            : "✘ No Address!"}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center ">
                      <p className="blue-text">Ready for work :</p>
                      <span
                        className="bluetextCardSee"
                        style={{
                          color:
                            date >= start && date <= end
                              ? "#3F76E2"
                              : "#ca1313",
                        }}
                      >
                        {date >= start && date <= end
                          ?" 📆" + startDate + "  To  " + EndDate
                          : "⚠️" +
                            startDate +
                            "  To  " +
                            EndDate}
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <p>Langues  </p>
                      <span className="Todo-ClinetCardMore-span">
                      :  {profile.clientLanguages.length
                          ? profile.clientLanguages.join(", ")
                          : " ✘ No Langues!"}
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <p>Voyage en voiture </p>
                      <span className="Todo-ClinetCardMore-span">
                      :   {profile.candidatConduireEnFrance ? `✔ Yes` : "✘ No"}
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <p>Permis / Licence Drive </p>
                      <span className="Todo-ClinetCardMore-span">
                      : {profile.clientPermis ? `✔ Yes` : "✘ No"}
                      </span>
                    </div>

                    <div className="d-flex">
                      <p >Client Note</p>
                      <span
                        className="Todo-ClinetCardMore-span"
                        style={{ textDecoration: "none", width: "390px" }}
                      >
                       :  {profile.clientRequiredSkills != ""
                          ? profile.clientRequiredSkills
                          : "✘ Not Available!"}
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <p className="text-dark">Potential Turnover CA</p>
                      <span className="Todo-ClinetCardMore-span">
                        :
                        {profile.jobTotalBudget != null
                          ? profile.jobTotalBudget +"€"
                          : "✘No Budget!"}
                        
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <p className="text-dark">Salary by person </p>
                      <span className="Todo-ClinetCardMore-span">
                        :
                        {profile.salary_hours.length > 0
                          ? profile.salary_hours.includes(
                              profile.salary_hours.salaryPerHour
                            )
                            ? profile.salary_hours
                                .map((el) => {
                                  return el.salaryPerHour + "€";
                                })
                                .slice(0, 1)
                            :  "✘ No Salary!"
                          : "✘ No Salary!"}
                        
                      </span>
                    </div>
                    <div className="d-flex ">
                      <p className="text-dark">Salaire net du salarié  </p>
                      <span className="Todo-ClinetCardMore-span">
                      :     {profile.salary_hours.length !== 0
                          ? profile.salary_hours.map((el) => (
                              <div className="d-flex">
                                {el.hours ? el.hours : "0"}H =
                                <span>
                                  {el.salaryPerHour
                                    ? el.salaryPerHour + "€"
                                    : "0€"}
                                </span>
                              </div>
                            ))
                          : "✘ No Salaire!"}
                      </span>
                    </div>
                    <div className="d-flex ">
                      <p className="text-dark">Taux horraire </p>
                      <span className="Todo-ClinetCardMore-span">
                      :    {profile.rate_hours.length !== 0
                          ? profile.rate_hours.map((el) => (
                              <div className="d-flex">
                                {el.hours ? el.hours : "0"}H =
                                <span>
                                  {el.ratePerHour ? el.ratePerHour + "€" : "0€"}
                                </span>
                              </div>
                            ))
                          : "✘ No horraire!"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 mt-1">
              <div className="row">
                {/* <Carousel responsive={responsive}>
                  <div className="Social-CardClient">
                    <div className="col-12">
                      <div className="row p-1 justify-content-around">
                        <div className="col-3">
                          <img
                            src={
                              require("../../images/Card-ImageStar.svg").default
                            }
                          />
                        </div>
                        <div className="col-9 d-flex align-items-center">
                          <p className="mb-0 FontMatchedStyle">
                            Candidate Name
                          </p>
                        </div>
                        <div className="col-12">
                          <p className="mb-0 FontStylingCardtext">
                            Secteur : &#10100;Client_Sector&#10101;
                          </p>
                        </div>
                        <div className="col-12">
                          <p className="mb-0 FontStylingCardtext">
                            Job : &#10100;Candidats_Job&#10101;
                          </p>
                        </div>
                        <div className="col-12 mb-1">
                          <p className="mb-0 FontStylingCardtext">Note :</p>
                          <p className="mb-0 FontStylingCardtext">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard.
                          </p>
                        </div>
                        <div className="col-5 px-0">
                          <button className="btnMatched">Matched</button>
                        </div>
                        <div className="col-5  px-0">
                          <button className="btnNotMatched">Not Matched</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Carousel> */}
                <Carousel responsive={responsive}>
                  {recommendations && recommendations.length > 0 ? (
                    recommendations.map((recommendation) => (
                      <div
                        className="row p-1  m-1 Social-Card client-Card"
                        style={{ height: "330px" }}
                         key={recommendation}>
                        <div className="col-3">
                          <img
                            src={
                              require("../../images/Card-ImageStar.svg").default
                            }
                          />
                        </div>
                        <div className="col-9 d-flex align-items-center">
                          <p
                            className="mb-0 FontMatchedStyle"
                            style={{ marginTop: "-15px" }}
                          >
                            <b>
                              {recommendation.candidatName.length > 20
                                ? recommendation.candidatName
                                    .slice(0, 21)
                                    .toLocaleUpperCase() + "..."
                                : recommendation.candidatName.toLocaleUpperCase()}
                            </b>
                          </p>
                        </div>

                        <p className="mb-0 FontStylingCardtext">
                          Secteur :
                          <b>
                            {recommendation.candidatActivitySector !== ""
                              ? recommendation.candidatActivitySector.toLocaleUpperCase()
                              : "Sector Not Selected!"}
                          </b>
                        </p>

                        <p className="mb-0 FontStylingCardtext">
                          Job :
                          <b>
                            {recommendation.candidatJob !== ""
                              ? recommendation.candidatJob.toLocaleUpperCase()
                              : "Job Not Selected!"}
                          </b>
                        </p>

                        <div className="col-12 mb-1">
                          <p className="mb-0 FontStylingCardtext">Notes:</p>
                          <div className="mb-0 FontStylingCardtext styledNotes">
                            {recommendation.candidatSkills !== "" ? (
                              <div style={{ height: "100px" }}>
                                <ReadMoreReact
                                  text={recommendation.candidatSkills}
                                  min={0}
                                  ideal={50}
                                  max={150}
                                  readMoreText={"....."}
                                />
                              </div>
                            ) : (
                              <p
                                style={{ height: "100px" }}
                                className="mb-0 FontStylingCardtext"
                              >
                                No Notes/Skills Available!
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-6 text-center d-flex align-items-center justify-content-center px-0">
                          <button
                            className="btnMatched"
                            onClick={() => {
                              setShowInPreSelectedModal(true);
                              setPreSelected(recommendation);
                            }}
                          >
                            Matched
                          </button>
                        </div>
                        <div className="col-6 text-center d-flex align-items-center px-0">
                          <button
                            className="btnNotMatched"
                            onClick={() =>
                              removeRecommendation(recommendation._id)
                            }
                          >
                            Not Matched
                          </button>
                        </div>
                      </div>
                    ))
                  ) : loader ? (
                    <div className="col-12 mx-auto">
                      <ProfileLoader
                        width={"300px"}
                        height={"300px"}
                        fontSize={"22px"}
                        fontWeight={700}
                        Title={"Loading.."}
                      />
                    </div>
                  ) : (
                    <div className="Social-Card m-1 text-center">
                      No More Client Recommendations!
                    </div>
                  )}
                </Carousel>
              </div>
            </div>
            <div className="col-12 Social-CardClient my-1">
              <div className="row">
                <div className="col-6">
                  <div className="ClientFontMotivationsStyling">
                    {/* <p>
                    Motivation:
                    <StarRatings
                      rating={profile.clientMotivation}
                      starRatedColor="#ffc107"
                      // changeRating={}
                      numberOfStars={profile.clientMotivation}
                      starDimension={"19px"}
                      starSpacing={"1px"}
                      name="rating"
                    />
                  </p> */}
                    <p className="mb-0 pt-1" style={{ width: "130%" }}>
                      Motivation :
                      <b style={{ background: "transparent", zIndex: "9999" }}>
                        {candidatMotivationIcons[profile.clientMotivation]
                          ?.icon +
                        " " +
                        candidatMotivationIcons[profile.clientMotivation]
                          ?.motivation
                          ? candidatMotivationIcons[profile.clientMotivation]
                              ?.icon +
                            " " +
                            candidatMotivationIcons[profile.clientMotivation]
                              ?.motivation
                          : "✘✘!"}
                      </b>
                    </p>

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
                        style={{ width: "27%", marginLeft: "5px" }}
                      >
                        {candidatImportanceIcons[profile.clientImportance - 1]
                          ?.icon
                          ? candidatImportanceIcons[
                              profile.clientImportance - 1
                            ]?.icon
                          : "✘✘!"}
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
                {/* <div className="col-6 d-flex justify-content-end align-items-center">
                  <button className="pdf-btn"  onClick={handleFileUpload}>
                    <img
                      src={require("../../images/doc.svg").default}
                      className="docImg"
                    />
                    
                    <span>Add document about this client </span>
                  </button>
                </div> */}
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
                    <img
                      style={{ paddingRight: "10px" }}
                      src={require("../../images/Edit.svg").default}
                    />
                    Edit Profile
                  </button>
                  <p className="text-center btn-Down">Editer le Profil</p>
                </div>
                <div className="col-3 text-center">
                  <a
                    href="https://www.canva.com/design/DAFA2NwkHSw/p4I45NInV69YG9HKrS3TGw/edit"
                    target="_blank"
                    type="button"
                    className="btn btn-contractClient"
                  >
                    <img
                      src={require("../../images/doc.svg").default}
                      style={{ paddingRight: "10px" }}
                    />
                    Créer Offre
                  </a>
                  <p style={{ width: "106%" }} className="btn-Down text-center">
                    Créer une Offre avec Canva
                  </p>
                </div>
                <div className="col-3 text-center">
                  <button
                    type="button"
                    className="btn btn-ArchivedClient"
                    onClick={() => setShowArchiveModal(true)}
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
                <div className="col-3 text-center">
                  <a
                    href="https://docs.google.com/spreadsheets/d/14xzXy9FD5V7ASYfYZg1kPmHSGvPqr4APfIWP_S9r_tI/edit#gid=0"
                    target="_blank"
                    type="button"
                    className="btn btn-grilleClient"
                  >
                    <img
                      src={require("../../images/salary.svg").default}
                      style={{ paddingRight: "10px" }}
                    />
                    Grille de prix
                  </a>
                  <p className="btn-Down text-center">
                    Accès réstreint à Jeremy & Pat
                  </p>
                </div>
                <div className="col-3 text-center">
                  <button
                    type="button"
                    className="btn btn-moveClient"
                    onClick={() => setShowInProgressModal(true)}
                  >
                    Move to in Progress
                  </button>
                  {showInProgressModal ? (
                    <InProgressClientModal
                      props={profile}
                      closeModal={setShowInProgressModal}
                    />
                  ) : null}
                  <p className="btn-Down text-center">
                    Si on lance les recherches
                  </p>
                </div>

                <div className="col-3 text-center">
                  <a
                    href="https://drive.google.com/drive/folders/1MqR9nDBLtpl_xMCmVGmcy5g0T3noPhgZ"
                    target="_blank"
                    type="button"
                    className="btn btn-careerClient"
                  >
                    <span>
                      <img
                        style={{ paddingRight: "10px" }}
                        src={require("../../images/doc.svg").default}
                      />
                    </span>
                    Créer Contrat
                  </a>
                  <p style={{ width: "106%" }} className="btn-Down text-center">
                    Créer un contrat avec Drive
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
                <ClientContract  props={profile} path="/clientToDoProfile"     />
                </>
              ) : (
                <div className="col-12 d-flex justify-content-center align-items-center py-2">
                  <ErrorLoader />
                  <p className="mb-0 ErrorSearchBox">
                  ✘ No Contract Available for this To-Do Client! Please add a
                    New Contract ✘
                  </p>
                </div>
              )}
            </div>
{/* PDF Upload */}
            <div>
              <PDFBoxClient   props={profile} value={setProfile} updated={setUpdatedWarning} />
            </div>
{/* PDF Upload End */}
            
                  {showPreSelectedModal ? (
                    <PreModalClient
                      props={PreSelectedData}
                      closepreModal={setShowInPreSelectedModal}
                      clientProps={profile}
                    />
                  ) : null}
                  {PDFModal ? (
                    <PDFModalClient props={profile} closeModal={setPDFModal}  LinkModal={setDocuSignModal} path="/clientToDoProfile" />
                  ) : null}
                   {
        DocumentSignModal ? 
        <DOCUSIGNModalCandidate props={profile} closeModal={setDocuSignModal} />

        :
        null

      }
         
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
export default ClientSee;
