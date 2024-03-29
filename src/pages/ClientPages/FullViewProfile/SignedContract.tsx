import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../../CSS/Client/ProgressCardClient.css";
import UploadDow from "../../../components/Modal/SelectUploadDownload";
import Switch from "react-switch";
import { ReactComponent as Empty } from "../../../images/emptyStar.svg";
import { ReactComponent as StarRating } from "../../../images/RatingStar.svg";
import ArchivedClientModal from "../../../components/Modal/ArchivedClientModal";
import { ReactComponent as TurnoFF } from "../../../images/FatX.svg";
import { ReactComponent as TurnOn } from "../../../images/base-switch_icon.svg";
import { API_BASE_URL } from "../../../config/serverApiConfig";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { ProgressBar } from "react-bootstrap";
import ProfileLoader from "../../../components/Loader/ProfilesLoader";
import RenameDoc from "../../../components/Modal/RenameDoc_Modal";
import PreModalClient from "../../../components/Modal/preSelectedModalForClient";
import ErrorLoader from "../../../components/Loader/SearchBarError";
import Cookies from "js-cookie";

let RenameData = [];
let id = "";
function Signed() {
  // console.log(localStorage.getItem("embauch"),"profileD")

  const profileData = JSON.parse(localStorage.getItem("profile"));
  // const profileD = JSON.parse(localStorage.getItem("embauch"));

  const [GetClientbyID, setGetClient] = useState(profileData._id);
  const [Loader, setLoader] = useState(false);
  useEffect(() => {
    GetClient(GetClientbyID).then((res) => {
      if (res.data.length > 0) {
        setLoader(true);
        res.data.map((el) => {
          setEMPunderWorking(el.employeesWorkingUnder);
        });
      } else if (res.data == []) {
        setLoader(false);
      }
    });
  }, []);

  const [profile, setProfile] = useState<any>(profileData);
  const navigate = useNavigate();

  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [EMPunderWorking, setEMPunderWorking] = useState([]) as any;
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
  const [candidatDocument, setCandidatDocument] = useState("");
  const [progress, setProgress] = useState<any>(0);
  const [docUploaded, setDocUploaded] = useState(false);
  const [documentList, setDocumentList] = useState([]);
  const [candidatImage, setCandidatImage] = useState(
    profile.candidatPhoto && profile.candidatPhoto?.documentName !== undefined
      ? profile.candidatPhoto?.documentName
      : ""
  );
  const hiddenFileInput = React.useRef(null);
  const [RenameDocStatus, setRenameDocStatus] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [showPreSelectedModal, setShowInPreSelectedModal] = useState(false);
  const [PreSelectedData, setPreSelected] = useState([]);

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
    { icon: "", motivation: "No Motivation!" },
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
      window.open(candidatImage.replace("http", "https"));
    }
  };
  const editClientProfile = () => {
    navigate("/clientContract/ClientContractEditprofile", { state: profile });
  };

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

  const renameDocument = (docId: any, docName: any, originalName: any) => {
    // setRenameDoc(true);

    RenameData = [docId, docName, profile._id, originalName];
    // renameCandidatDocument(docId, docName, profile._id).then(resData => {
    //   console.log(resData)
    //   setRenameDoc(false);
    // }).catch(err => {
    //   console.log(err)
    // })
  };

  const fileChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | any
    >
  ) => {
    if (e.target.name === "clientDocuments") {
      const fileUploaded = e.target.files[0];
      setCandidatDocument(fileUploaded);
      let formdata = new FormData();
      formdata.append("clientId", profile._id);
      formdata.append("document", fileUploaded);
      axiosInstance
        .post("uploadClientDocuments", formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + Cookies.get("token"),
          },
          onUploadProgress: (data) => {
            //Set the progress value to show the progress bar
            setProgress(Math.round((100 * data.loaded) / data.total));
          },
        })
        .then((resData) => {
          if (resData.data.status) {
            setDocUploaded(true);
            setProgress(0);
            notifyDocumentUploadSuccess();
          } else {
            setDocUploaded(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setDocUploaded(false);
        });
      return;
    }
  };

  useEffect(() => {
    fetchCandidat(profile._id)
      .then((resData) => {
        setCandidatImage("");
        if (resData.status == true) {
          // setProfile(resData.data)
          resData.data.map((el) => {
            setDocumentList(el.clientDocuments);
          });

          setCandidatImage(
            resData.data.candidatPhoto !== undefined
              ? resData.data.candidatPhoto?.documentName
              : ""
          );
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

  const ViewDownloadFiles = (documentName: any) => {
    window.open(documentName);
  };

  const fetchCandidat = async (clientId: any) => {
    return await fetch(API_BASE_URL + `getClientById/?clientId=${clientId}`, {
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

  const handleFileUpload = () => {
    hiddenFileInput.current.click();
  };

  // const removeRecommendation = (rId: any) => {

  //   console.log(recommendations);
  //   let filteredRecommendations = recommendations.filter((recomm) => {
  //     return recomm._id !== rId;
  //   })
  //   console.log(filteredRecommendations)
  //   setRecommendations([...filteredRecommendations])
  //   setLoader(true);
  // }

  const deleteDocument = async (docId: any, docName: any) => {
    await deleteCandidatDocument(docId, docName, profile._id)
      .then((resData) => {
        if (resData.status) {
          notifyDocumentDeleteSuccess();
          setDocumentList([
            ...documentList.filter((doc) => {
              return doc.documentName !== docName;
            }),
          ]);
        } else {
          notifyDocumentDeleteError();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCandidatDocument = async (
    docId: any,
    docName: any,
    clientId: any
  ) => {
    let headers = {
      Accept: "application/json",
      Authorization: "Bearer " + Cookies.get("token"),
    };
    return await fetch(
      API_BASE_URL +
        `deleteClientDocument/?documentId=${docId}&documentName=${docName}&clientId=${clientId}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((reD) => reD.json())
      .then((resD) => resD)
      .catch((err) => err);
  };

  //END //

  // useEffect(()=>{
  //     GetClient(IdFromURL)
  // })

  const GetClient = async (IdFromURL) => {
    return await fetch(API_BASE_URL + `getClientById/?clientId=${IdFromURL}`, {
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

  const viewFullProfile = (data) => {
    localStorage.setItem("embauch", JSON.stringify(data));
    window.open("/embauchlist/embauchprofile", "_blank");
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
          Authorization: "Bearer " + Cookies.get("token"),
        },
      }
    )
      .then((reD) => reD.json())
      .then((result) => result)
      .catch((err) => err);
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
                      <img
                        alt="..."
                        src={require("../../../images/return.svg").default}
                      />
                      Client File : {profile.clientCompanyName}
                    </button>
                  </Link>
                </div>
              </div>
              <div className="col-4  d-flex align-items-center justify-content-end text-end pr-2">
                <button
                  className="btn btn-bgbClient"
                  onClick={() => editClientProfile()}
                >
                  <img
                    alt="..."
                    src={require("../../../images/Edit.svg").default}
                  />
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
                    <img
                      alt="..."
                      src={require("../../../images/fullClientSee.svg").default}
                      className="imgSigned-upload-Download"
                    />
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
                      alt="..."
                      className=""
                      src={require("../../../images/select.svg").default}
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
                    // onChange={fileChange}
                    name="candidatPhoto"
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
                      : "No Secteur!"}
                  </p>
                  <p>
                    Métier/Job :{" "}
                    {profile.clientJob ? profile.clientJob : "No Job!"}
                  </p>
                  <p style={{ width: "120%" }}>
                    Contact Name :{" "}
                    {profile.clientReferenceName
                      ? profile.clientReferenceName
                      : "No Name!"}
                  </p>
                </div>
                {/* <div className="col-4 text-end end-class d-grid justify-content-center align-items-center"> */}
                <div className="col-4 d-grid align-items-center">
                  <div className="text-end ">
                    <button className="SignedLargebtn">
                      <img
                        alt="..."
                        src={
                          require("../../../images/tickClientBtn.svg").default
                        }
                      />
                      SIGNED CONTRACT
                    </button>
                    <div className="Lead-encore">
                      <p className="mb-0  pt-1">Contrat signé avec le client</p>
                      <p className="TODOclientChild">
                        Nous recehrchons activement
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
                <div className="col-3 d-flex pt-1 px-0 justify-content-start">
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
                <div className="col-3 d-flex pt-1 px-0 justify-content-start">
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
                <div className="col-3 d-flex pt-1 px-0 ">
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
                      Mail :
                      {profile.clientEmail
                        ? profile.clientEmail
                        : "No Email Provided!"}
                    </p>
                  </div>
                  {profile.clientEmail ? (
                    <button className="btn-TODOgmail">
                      <a
                        href="https://accounts.google.com/"
                        className="text-dark fw-bold"
                        target="_blank"
                      >
                        <span className="padding-email">
                          <img
                            alt="..."
                            style={{ width: "8%" }}
                            src={require("../../../images/gmail.svg").default}
                          />
                        </span>
                        Send Email
                      </a>
                    </button>
                  ) : (
                    <button className="btn-TODOgmail">
                      <span className="padding-email">
                        <img
                          alt="..."
                          style={{ width: "8%" }}
                          src={require("../../../images/gmail.svg").default}
                        />
                      </span>
                      No Email !
                    </button>
                  )}

                  <div className="d-flex">
                    <p className="Span-StylingClient text-start pt-2 pb-1 my-1">
                      Contact :
                      {profile.clientEmail ? profile.clientEmail : "No Email!"}
                    </p>
                  </div>

                  {profile.clientEmail ? (
                    <a
                      href={profile.clientEmail}
                      target="_blank"
                      className="btn  fw-bold btn-TODOgmail"
                    >
                      <span className="padding-email">
                        <img
                          alt="..."
                          src={require("../../../images/gmail.svg").default}
                        />
                      </span>
                      Send Email
                    </a>
                  ) : (
                    <button className="btn  fw-bold btn-TODOgmail">
                      <span className="padding-email">
                        <img
                          alt="..."
                          src={require("../../../images/gmail.svg").default}
                        />
                      </span>
                      No Email !
                    </button>
                  )}

                  <div className="d-flex">
                    <p className="Span-StylingClient text-start pt-2 pb-1 my-1">
                      Company Phone :
                      {profile.clientPhone
                        ? profile.clientPhone
                        : "No Phone Number!"}
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
                            alt="..."
                            style={{ width: "8%" }}
                            src={
                              require("../../../images/whatsapp.svg").default
                            }
                          />
                        </span>
                        Send What’s App
                      </button>
                    </a>
                  ) : (
                    <button className="btn-whatsapp my-1">
                      <span className="padding-email">
                        <img
                          alt="..."
                          style={{ width: "8%" }}
                          src={require("../../../images/whatsapp.svg").default}
                        />
                      </span>
                      No What’s App !
                    </button>
                  )}

                  <div className="d-flex">
                    <p className="Span-StylingClient text-start pt-2 pb-1 my-1">
                      Contact Phone :
                      {profile.clientReferenceNumber
                        ? profile.clientReferenceNumber
                        : "No Number!"}
                    </p>
                  </div>
                  {profile.clientReferenceNumber ? (
                    <a
                      href={`https://wa.me/${profile.clientReferenceNumber}`}
                      target="_blank"
                    >
                      <button className="btn-whatsapp my-1">
                        <span className="padding-email">
                          <img
                            alt="..."
                            style={{ width: "8%" }}
                            src={
                              require("../../../images/whatsapp.svg").default
                            }
                          />
                        </span>
                        Send What’s App
                      </button>
                    </a>
                  ) : (
                    <button className="btn-whatsapp my-1">
                      <span className="padding-email">
                        <img
                          alt="..."
                          style={{ width: "8%" }}
                          src={require("../../../images/whatsapp.svg").default}
                        />
                      </span>
                      No What’s App !
                    </button>
                  )}
                </div>
                <div
                  className="col-xxl-8 col-xl-8 col-lg-8 col-md-7 Social-Card p-1 detailsCardClientSee scrollbar Social-btnS"
                  id="style-3"
                  style={{ maxWidth: "49%" }}
                >
                  <div className="Todo-ClinetCardMore force-overflow">
                    <div className="d-flex">
                      <div className="d-flex" style={{ width: "500px" }}>
                        <p className="CompanyAddres">Company Adress</p>

                        <span className="Todo-ClinetCardMore-span">
                          :
                          {profile.clientAddress
                            ? profile.clientAddress
                            : "No Address!"}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center ">
                      <p className="blue-text">Research for work :</p>
                      <span className="bluetextCardSee">
                        {profile.jobStartDate != ""
                          ? profile.jobStartDate
                          : "___"}
                        To
                        {profile.jobEndDate != "" ? profile.jobEndDate : "___"}
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <p>Langues : </p>
                      <span className="Todo-ClinetCardMore-span">
                        {profile.clientLanguages.length
                          ? profile.clientLanguages.join(", ")
                          : "No Langues!"}
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <p>Voyage en voiture :</p>
                      <span className="Todo-ClinetCardMore-span">
                        {profile.candidatConduireEnFrance ? "Yes" : "No"}
                      </span>
                    </div>

                    <div className="d-flex">
                      <p style={{ width: "121px" }}>Client Note:</p>
                      <span
                        className="Todo-ClinetCardMore-span"
                        style={{ textDecoration: "none", width: "390px" }}
                      >
                        {profile.clientRequiredSkills != ""
                          ? profile.clientRequiredSkills
                          : "Not Available!"}
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <p className="text-dark">Potential Turnover CA</p>
                      <span className="Todo-ClinetCardMore-span">
                        :
                        {profile.jobTotalBudget != null
                          ? profile.jobTotalBudget + "€"
                          : "No Budget"}
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <p className="text-dark">Salary by person </p>
                      <span className="Todo-ClinetCardMore-span">
                        :
                        {profile.salary_hours
                          ? profile.salary_hours.salaryPerHour + "€"
                          : "No Salary"}
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <p className="text-dark">Salaire net du salarié </p>
                      <span className="Todo-ClinetCardMore-span">
                        :
                        {profile.salary_hours
                          ? profile.salary_hours.hours *
                              profile.salary_hours.salaryPerHour +
                            "€"
                          : "No Hours!"}
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <p className="text-dark">Taux horraire</p>
                      <span className="Todo-ClinetCardMore-span">
                        :
                        {profile.rate_hours
                          ? profile.rate_hours.hours *
                              profile.rate_hours.ratePerHour +
                            "€"
                          : "No Hours!"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 inPAdsBOX py-1">
              <div className="row">
                <div className="col-6 pt-2">
                  <p className="EmpWorking">
                    Employees working for this client :
                  </p>
                </div>
                {Loader
                  ? EMPunderWorking?.map((el) => (
                      <div className="col-12 pb-1">
                        <div className="row">
                          <div className="col-9 d-flex align-items-center">
                            <img
                              alt="..."
                              style={{ width: "7%" }}
                              className="pr-1"
                              src={
                                require("../../../images/menSigned.svg").default
                              }
                            />
                            {el.candidatName}
                            <span className="pl-1">Since :</span>
                            {el.candidatCurrentWork
                              ? el.candidatCurrentWork.map(
                                  (el) => el.workingSince
                                )
                              : "No workingSince!"}
                            <span className="pl-1">Salary :</span>
                            {el.candidatCurrentWork.length > 0
                              ? el.candidatCurrentWork.map((el) => el.salary)
                              : "No salary!"}
                          </div>
                          <div className="col-3">
                            <button
                              className="seeFullCandidat"
                              onClick={(e) => viewFullProfile(el)}
                            >
                              <img
                                alt="..."
                                src={
                                  require("../../../images/seeCan.svg").default
                                }
                              />
                              See profile
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  : null}
                <p className="mb-0">
                  Ads Spent on this client :
                  {profile.jobTotalBudget
                    ? profile.jobTotalBudget
                    : "No Budget!"}
                </p>
              </div>
            </div>

            {/* <div className="col-12 pt-4">
                <div className="row">
                  <div className="col-5 pdf-btn">
                    <img  alt="..." src={require("../../../images/doc.svg").default} />
                    <span>Add document about this client </span>
                  </div>
                </div>
              </div> */}
            {/* <div className="col-12"> */}
            {/* <div className="row">
                  <div className="col-6 mb-3">
                    <p className="poppins">
                      Par exemple : Contrat signé; Offre signé.... 
                    </p>
                    <span className="poppins">
                      PDF; Word; PNG; Excel etc ......
                    </span>
                  </div>
                </div>
              </div> */}
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
                          : "No Importance!"}
                      </b>
                    </p>
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
                          : "No Motivation!"}
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
                        {profile.enteredBy}
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
                      alt="..."
                      src={require("../../../images/doc.svg").default}
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
                    <img
                      alt="..."
                      src={require("../../../images/Edit.svg").default}
                    />
                    Edit Profile
                  </button>
                  <p className="btn-Down text-center text-start">
                    Editer le profil
                  </p>
                </div>

                <div className="col-3 text-center">
                  <button type="button" className="btn btn-contractClient">
                    <img
                      alt="..."
                      src={require("../../../images/doc.svg").default}
                      style={{ paddingRight: "5px" }}
                    />
                    Créer offre
                  </button>
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
                      path={"/clientTodo/clientToDoProfile"}
                    />
                  ) : null}
                  <p className="btn-Down text-center">Si plus d’actualité</p>
                </div>
                <div className="col-3">
                  <button type="button" className="btn btn-grilleClient">
                    <img
                      alt="..."
                      src={require("../../../images/salary.svg").default}
                      style={{ paddingRight: "5px" }}
                    />
                    Grille de prix
                  </button>
                  <p className="btn-Down text-center">
                    Accès réstreint à Jeremy & Pat
                  </p>
                </div>
                <div className="col-3">
                  <button type="button" className="btn  btn-careerClient">
                    <img
                      alt="..."
                      src={require("../../../images/doc.svg").default}
                      style={{ paddingRight: "5px" }}
                    />
                    Créer contrat
                  </button>
                  <p className="btn-Down text-center">
                    Créer un contrat avec Drive
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 Social-CardClient my-1 ">
              <div className="row p-1">
                <div className="row" style={{ marginRight: "1px" }}>
                  {documentList.length > 0 ? (
                    documentList.map((doc, index) => (
                      <div className="col-6 mx-0">
                        <div className="row CardClassDownload mt-1 mx-0">
                          <div className="col-4 d-flex align-items-center ">
                            <p className="download-font mb-0">
                              {doc.originalName}
                            </p>
                          </div>
                          <div className="col-6 text-center">
                            {/* {progress > 0 && progress < 100  ?
                                  <ProgressBar className="mt-1" now={progress} label={`${progress}%`} />
                                  :
                                  <button className="btnDownload">
                                    <img  alt="..." src={require("../images/dowBtn.svg").default} />
                                    {doc.originalName.length > 10 ? doc.originalName.slice(0, 11) + "..." : doc.originalName}
                                  </button>
                                } */}
                            <button
                              className="btnDownload"
                              onClick={() => ViewDownloadFiles(doc.url)}
                            >
                              <img
                                alt="..."
                                src={
                                  require("../../../images/dowBtn.svg").default
                                }
                              />
                              {doc.originalName.length > 10
                                ? doc.originalName.slice(0, 11) + "..."
                                : doc.originalName}
                            </button>
                          </div>
                          <div className="col-2  d-flex align-item-end justify-content-end">
                            <img
                              alt="..."
                              src={
                                require("../../../images/editSvg.svg").default
                              }
                              style={{
                                width: "20px",
                                marginRight: "5px",
                                cursor: "pointer",
                              }}
                              // onClick={() => renameDocument(doc._id, doc.documentName)}
                              onClick={() => {
                                setRenameDocStatus(true);
                                renameDocument(
                                  doc._id,
                                  doc.documentName,
                                  doc.originalName
                                );
                              }}
                            />
                            <img
                              alt="..."
                              src={
                                require("../../../images/Primaryfill.svg")
                                  .default
                              }
                              style={{ width: "20px", cursor: "pointer" }}
                              onClick={() =>
                                deleteDocument(doc._id, doc.documentName)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : progress > 0 &&
                    progress < 100 &&
                    documentList.length == 0 ? (
                    <div className="col-6 mx-0">
                      <div className="row CardClassDownload p-0 mt-1 mx-0">
                        <div className="col-4 pr-0 d-flex align-items-center ">
                          <ProfileLoader
                            width={"90"}
                            height={"56px"}
                            fontSize={"12px"}
                            fontWeight={600}
                            Title={"Uploading!"}
                          />
                        </div>
                        <div
                          className="col-6 text-center  mb-0"
                          style={{ marginTop: "21px" }}
                        >
                          <ProgressBar
                            className="mb-0"
                            now={progress}
                            label={`${progress}%`}
                          />
                        </div>
                        <div className="col-2  d-flex align-item-end justify-content-end">
                          <img
                            alt="..."
                            src={require("../../../images/editSvg.svg").default}
                            style={{
                              width: "20px",
                              marginRight: "5px",
                              cursor: "pointer",
                            }}
                            // onClick={() => renameDocument(doc._id, doc.documentName)}
                          />
                          <img
                            alt="..."
                            src={
                              require("../../../images/Primaryfill.svg").default
                            }
                            style={{ width: "20px", cursor: "pointer" }}
                            // onClick={() => deleteDocument(doc._id, doc.documentName)}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="col-12 d-flex justify-content-center">
                        <p
                          className="d-flex align-items-center mb-0"
                          style={{
                            fontFamily: "Poppins",
                            fontStyle: "normal",
                            fontWeight: "700",
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "#000000",
                          }}
                        >
                          <ErrorLoader />
                          No Documents Uploaded!
                        </p>
                      </div>
                    </>
                  )}
                  {progress > 0 && progress < 100 && documentList.length > 0 ? (
                    <div className="col-6 mx-0">
                      <div className="row CardClassDownload p-0 mt-1 mx-0">
                        <div className="col-4 pr-0 d-flex align-items-center ">
                          <ProfileLoader
                            width={"90"}
                            height={"56px"}
                            fontSize={"12px"}
                            fontWeight={600}
                            Title={"Uploading!"}
                          />
                        </div>
                        <div
                          className="col-6 text-center  mb-0"
                          style={{ marginTop: "21px" }}
                        >
                          <ProgressBar
                            className="mb-0"
                            now={progress}
                            label={`${progress}%`}
                          />
                        </div>
                        <div className="col-2  d-flex align-item-end justify-content-end">
                          <img
                            alt="..."
                            src={require("../../../images/editSvg.svg").default}
                            style={{
                              width: "20px",
                              marginRight: "5px",
                              cursor: "pointer",
                            }}
                          />
                          <img
                            alt="..."
                            src={
                              require("../../../images/Primaryfill.svg").default
                            }
                            style={{ width: "20px", cursor: "pointer" }}
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {RenameDocStatus ? (
                    <RenameDoc
                      props={RenameData}
                      closepreModal={setRenameDocStatus}
                      status={null}
                    />
                  ) : null}
                  {showPreSelectedModal ? (
                    <PreModalClient
                      props={PreSelectedData}
                      closepreModal={setShowInPreSelectedModal}
                      clientProps={profile}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Signed;
