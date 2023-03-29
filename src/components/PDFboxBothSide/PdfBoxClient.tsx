import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../config/serverApiConfig";
import { Tabs, Tab } from "react-tabs-scrollable";
import "react-tabs-scrollable/dist/rts.css";
import { FileUploader } from "react-drag-drop-files";
import Share from "../Loader/Share";
import { toast } from "react-hot-toast";
import axios from "axios";
import ProfileLoader from "../Loader/ProfilesLoader";
import { ProgressBar } from "react-bootstrap";
import RenameDoc from "../Modal/RenameDoc_ModalClient";
import Cookies from "js-cookie";

let RenameData = [];
let UploadName = "";
let UploadTextBtn = "";
function PDFBoxClient({ props, value, updated }) {
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
  });
  const [documentList, setDocumentList] = useState([]);
  const [activeTab, setActiveTab] = React.useState(1) as any;
  const [RenameDocStatus, setRenameDocStatus] = useState(false);
  const [LinkList, setLinkList] = useState([]);
  const [profile, setProfile] = useState() as any;
  const [progress, setProgress] = useState<any>(0);
  const [DeleteStatus, setDeleteStatus] = useState(false);
  const [DriveLink, setDriveLink] = useState("");
  const [tabItems] = useState([
    {
      text: "CONTRAT CLIENT",
      value: "contrat_client",
    },
    {
      text: "CONTRAT EMPLOYES",
      value: "contrat_employes",
    },
    {
      text: "ID Card EMPLOYES",
      value: "id_card_employer",
    },
    {
      text: "A1",
      value: "al",
    },
    {
      text: "CONTRATS ASSURANCES EMPLOYES",
      value: "contrats_assurances_employes",
    },
    {
      text: "SISPI",
      value: "sispi",
    },
    {
      text: "DOCUMENT DE REPRESENTATION",
      value: "document_de_represntation",
    },
    {
      text: "OFFRE SIGNEE",
      value: "offre_signee",
    },
    {
      text: "ATTESTATIONS SOCIETE INTERMANN",
      value: "attestations_societe_intermann",
    },
    {
      text: "CVS",
      value: "cvs",
    },
    {
      text: "AUTRES DOCUMENTS",
      value: "autres_documents",
    },
    {
      text: "FACTURES PAYES",
      value: "factures_payes",
    },
    {
      text: "FACTURES IMPAYES",
      value: "factures_impayes",
    },
    {
      text: "RAPPORT ACTIVITE",
      value: "rapport_activite",
    },
    {
      text: "OFFRE ENVOYE ET NONSIGNE",
      value: "offre_envoye_et_nonsigne",
    },
    {
      text: "FICHE MEDICALE",
      value: "fiche_medicale",
    },
    {
      text: "REGES",
      value: "reges",
    },
    {
      text: "FICHE DE MISE A DISPOSITION",
      value: "fiche_de_mise_a_disposition",
    },
  ]) as any;
  useEffect(() => {
    const FolderName = tabItems.filter((el, i) => i == activeTab);

    FolderName.map((el) => {
      UploadName = el.value;
      UploadTextBtn = el.text;
    });
    setDocumentList(
      props?.clientDocuments.filter((el) => el.folderName == UploadName)
    );
  }, [props]);

  useEffect(() => {
    fetchClient(props._id);
  }, [DeleteStatus]);

  const fetchClient = (props_id: any) => {
    fetch(API_BASE_URL + `getClientById/?clientId=${props_id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.status) {
          resp.data.map((el) => {
            setDocumentList(
              el.clientDocuments.filter((el) => el.folderName == UploadName)
            );
            setLinkList(
              el?.clientLinks.filter((props) => props.folder == UploadName)
            );
            setProfile(el);
            value(el);
            setDeleteStatus(false);
            updated(false);
          });
        }
      })
      .catch((err) => err);
  };

  const onTabClick = (e, index: any) => {
    setActiveTab(index);
    const FolderName = tabItems.filter((el, i) => i == index);

    FolderName.map((el) => {
      UploadName = el.value;
      UploadTextBtn = el.text;
    });

    setLinkList(
      profile?.clientLinks.filter((props) => props.folder == UploadName)
    );
    setDocumentList(
      profile?.clientDocuments.filter((el) => el.folderName === UploadName)
    );
  };

  const FilesUploads = (file) => {
    const fileUploaded = file;
    let formdata = new FormData();
    formdata.append("clientId", props._id);
    formdata.append("document", fileUploaded);
    formdata.append("folderName", UploadName);
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
          setDeleteStatus(true);
          updated(true);

          setProgress(0);
          notifyDocumentUploadSuccess();
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Notify //

  const notifyDocumentDeleteError = () =>
    toast.error("Document Not Removed! Please Try Again in few minutes.");

  const notifyDocumentDeleteSuccess = () =>
    toast.success("Document Removed Successfully!");

  const notifyDocumentUploadSuccess = () =>
    toast.success("Document Uploaded Successfully!");

  // Notify //

  const ViewDownloadFiles = (e, documentName: any) => {
    if (e.target.name === "btnDownloadLink") {
      window.open(documentName);
    } else {
      window.open(documentName);
    }
  };

  const renameDocument = (docId: any, docName: any, originalName: any) => {
    if (originalName == "LinkEdit") {
      RenameData = [docId, docName, originalName];
    } else {
      RenameData = [docId, docName, props._id, originalName];
    }
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

  const deleteDocument = async (docId: any, docName: any) => {
    await deleteCandidatDocument(docId, docName, props._id)
      .then((resData) => {
        console.log(resData);
        if (resData.status) {
          notifyDocumentDeleteSuccess();
          setDocumentList([
            ...documentList.filter((doc) => {
              return doc.documentName !== docName;
            }),
          ]);
          setDeleteStatus(true);
          updated(true);
        } else {
          notifyDocumentDeleteError();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ADD Link  //
  let Data = {
    clientId: props._id,
    link: DriveLink,
    folder: UploadName,
  } as any;

  const LinktoDrive = async (updatedData: any) => {
    console.log(updatedData);
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + Cookies.get("token"),
    };
    return await fetch(API_BASE_URL + "addClientLink", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(updatedData),
    })
      .then((reD) => reD.json())
      .then((resD) => resD)
      .catch((err) => err);
  };

  const deleteCandidatLink = (Id: any) => {
    let Data = {
      clientId: props._id,
      linkId: Id,
    };
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + Cookies.get("token"),
    };
    fetch(API_BASE_URL + "removeClientLink", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then((reD) => reD.json())
      .then((resD) => {
        toast.success(resD.message);
        setDeleteStatus(true);
        updated(true);
      })
      .catch((err) =>
        toast.error("Link Not Removed! Please Try Again in few minutes.")
      );
  };

  const onDriveLinkChange = (e) => {
    if (e.target.name == "inputDrive") {
      setDriveLink(e.target.value);
    }

    if (e.target.name == "DriveLinkSubmit") {
      let Check = isValidUrl(DriveLink);
      if (Check) {
        LinktoDrive(Data).then((resD) => {
          toast.success(resD.message);
          setDeleteStatus(true);
          updated(true);
        });
      } else {
        return toast.error("Please Enter Valid Url!");
      }

      console.log(isValidUrl(DriveLink));
    }
  };
  // const urlPattern = new RegExp(DriveLink);
  const isValidUrl = (urlString) => {
    var urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // validate protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // validate fragment locator
    return !!urlPattern.test(urlString);
  };

  return (
    <>
      <div className="col-12 Social-CardClient my-1" key={props._id}>
        <div className="row px-1 pt-1 pb-0">
          <div className="col-4 d-flex align-items-center  px-0">
            <div className="d-flex">
              {" "}
              <p className="DocShareLink mb-0">
                Share this link with the client <br />
                Patager ce lien avec le client
              </p>
              <div
                className="d-flex justify-content-center align-items-center "
                style={{ paddingLeft: "5px" }}
              >
                {" "}
                <Share width={25} />
                <b className="pl-1"> :</b>
              </div>
            </div>
          </div>
          <div className="col-8 DocShareLinkBackground p-1 pl-0">
            <Link
              className="LinkStyling"
              to={`/documentbox/${props.clientCompanyName}/${props._id}`}
              target="_blank"
            >
              {API_BASE_URL +
                `documentbox/${props.clientCompanyName.replaceAll(
                  " ",
                  "%20"
                )}/` +
                props._id}
            </Link>
          </div>
          <div className="col-12 mt-2">
            <Tabs
              activeTab={activeTab}
              onTabClick={onTabClick}
              rightBtnIcon={">"}
              hideNavBtns={false}
              leftBtnIcon={"<"}
              showTabsScroll={false}
              tabsScrollAmount={2}
            >
              {/* generating an array to loop through it  */}
              {tabItems.map((el, i) => (
                <Tab key={i}>{el.text}</Tab>
              ))}
            </Tabs>
          </div>
          <div className="row py-1" style={{ marginRight: "1px" }}>
            {documentList.length > 0 ? (
              documentList.map((doc, index) => (
                <>
                  {doc.documentName ? (
                    <div className="col-6 mx-0" key={index}>
                      <div className="row CardClassDownload mt-1 mx-0">
                        <div
                          className="col-4 d-flex align-items-center cursor-pointer"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          title={doc.originalName}
                        >
                          <p className="download-font mb-0">
                            {doc.originalName.length > 20
                              ? doc.originalName.slice(0, 21) + "..."
                              : doc.originalName}
                          </p>
                        </div>
                        <div className="col-6 text-center">
                          {/* {progress > 0 && progress < 100  ?
                                   <ProgressBar className="mt-1" now={progress} label={`${progress}%`} />
                                   :
                                   <button className="btnDownload">
                                     <img alt="..." src={require("../images/dowBtn.svg").default} />
                                     {doc.originalName.length > 10 ? doc.originalName.slice(0, 11) + "..." : doc.originalName}
                                   </button>
                                 } */}
                          <button
                            className="btnDownload"
                            onClick={(e) => ViewDownloadFiles(e, doc.url)}
                          >
                            <img alt="..."
                              src={require("../../images/dowBtn.svg").default}
                            />
                            {doc.originalName.length > 10
                              ? doc.originalName.slice(0, 11) + "..."
                              : doc.originalName}
                          </button>
                        </div>
                        <div className="col-2  d-flex align-item-end justify-content-end">
                          <img alt="..."
                            src={require("../../images/editSvg.svg").default}
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
                          <img alt="..."
                            src={
                              require("../../images/Primaryfill.svg").default
                            }
                            style={{ width: "20px", cursor: "pointer" }}
                            onClick={() =>
                              deleteDocument(doc._id, doc.documentName)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}
                </>
              ))
            ) : progress > 0 && progress < 100 && documentList.length == 0 ? (
              <>
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
                      <img alt="..."
                        src={require("../../images/editSvg.svg").default}
                        style={{
                          width: "20px",
                          marginRight: "5px",
                          cursor: "pointer",
                        }}
                        // onClick={() => renameDocument(doc._id, doc.documentName)}
                      />
                      <img alt="..."
                        src={require("../../images/Primaryfill.svg").default}
                        style={{ width: "20px", cursor: "pointer" }}
                        // onClick={() => deleteDocument(doc._id, doc.documentName)}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : LinkList.length > 0 ? null : (
              <div className="d-grid  justify-content-center align-items-center mb-0">
                <div className="d-flex justify-content-center">
                  <img alt="..." src={require("../../images/docupload.svg").default} />
                </div>
                <p
                  style={{
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#92929D",
                  }}
                >
                  {UploadTextBtn} file not Uploaded Yet
                </p>
              </div>
            )}
            <>
              {LinkList.map((Link, index) =>
                LinkList.length > 0 ? (
                  <div className="col-6 mx-0" key={index}>
                    <div className="row CardClassDownload mt-1 mx-0">
                      <div
                        className="col-4 d-flex align-items-center cursor-pointer"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title={Link.link}
                      >
                        <p className="download-font mb-0">
                          {Link.displayName
                            ? Link.displayName
                            : Link.link.length > 30
                            ? Link.link.slice(0, 28) + "..."
                            : Link.link}
                        </p>
                      </div>
                      <div className="col-6 text-center">
                        <button
                          name="btnDownloadLink"
                          className="btnDownload"
                          onClick={(e) => ViewDownloadFiles(e, Link.link)}
                        >
                          <img alt="..."
                            src={require("../../images/dowBtn.svg").default}
                          />
                          {Link.link.length > 10
                            ? Link.link.slice(0, 11) + "..."
                            : Link.link}
                        </button>
                      </div>
                      <div className="col-2  d-flex align-item-end justify-content-end">
                        <img alt="..."
                          src={require("../../images/editSvg.svg").default}
                          style={{
                            width: "20px",
                            marginRight: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setRenameDocStatus(true);
                            renameDocument(Link._id, Link.link, "LinkEdit");
                          }}
                        />
                        <img alt="..."
                          src={require("../../images/Primaryfill.svg").default}
                          style={{ width: "20px", cursor: "pointer" }}
                          onClick={() => deleteCandidatLink(Link._id)}
                        />
                      </div>
                    </div>
                  </div>
                ) : null
              )}
            </>
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
                    <img alt="..."
                      src={require("../../images/editSvg.svg").default}
                      style={{
                        width: "20px",
                        marginRight: "5px",
                        cursor: "pointer",
                      }}
                    />
                    <img alt="..."
                      src={require("../../images/Primaryfill.svg").default}
                      style={{ width: "20px", cursor: "pointer" }}
                    />
                  </div>
                </div>
              </div>
            ) : null}
            <div className="col-12 d-flex justify-content-center mt-2">
              <img alt="..." src={require("../../images/resume.svg").default} />

              {/* <input
                        type="file"
                        ref={hiddenFileInput}
                        onChange={fileChange}
                        name="clientDocuments"
                        style={{ display: "none" }}
                      /> */}
              <FileUploader
                handleChange={FilesUploads}
                name="clientDocuments"
                label={`Upload ${UploadTextBtn} file Now`}
              />
            </div>
            {RenameDocStatus ? (
              <RenameDoc
                props={RenameData}
                closepreModal={setRenameDocStatus}
                reload={setDeleteStatus}
              />
            ) : null}
          </div>
        </div>
      </div>
      <div
        className="col-12 Social-CardClient mb-1 "
        style={{ padding: "13px 26px" }}
      >
        <div className="row">
          <div
            className="col-3 px-0"
            style={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: "14px",
              lineHeight: "21px",
              color: "#000000",
              display: "flex",
              alignItems: "center",
            }}
          >
            <p className="mb-0">ORADD AN EXTERNAL LINK (GOOGLE DRIVE) :</p>
          </div>
          <div className="col-5 px-0">
            <input
              name="inputDrive"
              placeholder="WWW.XXXXXX.COM"
              onChange={onDriveLinkChange}
              style={{
                background: "#D3D6DB",
                borderRadius: "20px",
                width: "100%",
                height: "100%",
                border: "0px",
                paddingLeft: "10px",
                paddingRight: "10px",
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "14px",
              }}
            />
          </div>
          <div className="col-4">
            <button
              name="DriveLinkSubmit"
              onClick={(e) => {
                onDriveLinkChange(e);
              }}
              className="LinkAsDocument"
            >
              add this link as document
            </button>
          </div>
        </div>
      </div>
      {/* <div
              className="col-12 Social-CardClient mb-1 "
              style={{ padding: "13px 26px" }}
            > */}
      {/* <div className="row alertMessage align-items-center py-1">
                <Tabs
                  rightBtnIcon={">"}
                  hideNavBtns={false}
                  leftBtnIcon={"<"}
                  showTabsScroll={false}
                  tabsScrollAmount={5}
                  activeTab
                  className="alertMessage"
                >
                
                  {PdfChecker.map((el)=>el.folderName.toString() === "contrat_client") ? null : (
                    <Tab className="redColorStyling"> ⚠️ CONTRAT CLIENT IS MISSING / MANQUANT</Tab>
                  )}
                  {PdfChecker.map((el)=>el.folderName.toString() === "contrat_employes") ? null : (
                    <Tab className="redColorStyling">⚠️ CONTRATS EMPLOYES IS MISSING / MANQUANT</Tab>
                  )}
                  {PdfChecker.map((el)=>el.folderName.toString() === "id_card_employer")  ? null : (
                    <Tab className="redColorStyling">⚠️ Id Card Employes IS MISSING / MANQUANT</Tab>
                  )}
                  {PdfChecker.map((el)=>el.folderName.toString() === "al") ? null : <Tab className="redColorStyling">⚠️ A1 IS MISSING / MANQUANT</Tab>}
                  {PdfChecker.map((el)=>el.folderName.toString() === "contrats_assurances_employes") ? null : (
                    <Tab className="redColorStyling">
                      ⚠️ CONTRATS ASSURANCES EMPLOYES IS MISSING / MANQUANT
                    </Tab>
                  )}
                  {PdfChecker.map((el)=>el.folderName.toString() === "sispi") ? null : <Tab className="redColorStyling">⚠️ SISPI IS MISSING / MANQUANT</Tab>}
                  {PdfChecker.map((el)=>el.folderName.toString() === "document_de_represntation") ? null : (
                    <Tab className="redColorStyling">
                      ⚠️ DOCUMENT DE REPRESENTANCE / REPRESENTATION IS MISSING /
                      MANQUANT
                    </Tab>
                  )}
                  {PdfChecker.map((el)=>el.folderName.toString() === "offre_signee") ? null : (
                    <Tab className="redColorStyling">⚠️ OFFRE SIGNEE / QUOTES IS MISSING / MANQUANT</Tab>
                  )}
                  {PdfChecker.map((el)=>el.folderName.toString() === "attestations_societe_intermann") ? null : (
                    <Tab className="redColorStyling">
                      ⚠️ ATTESTATIONS SOCIETE INTERMANN WORK S.R.L IS MISSING /
                      MANQUANT
                    </Tab>
                  )}
                  {PdfChecker.map((el)=>el.folderName.toString() === "cvs") ? null : <Tab className="redColorStyling">⚠️ CVS IS MISSING / MANQUANT</Tab>}
                  {PdfChecker.map((el)=>el.folderName.toString() === "autres_documents") ? null : (
                    <Tab className="redColorStyling">⚠️ AUTRES DOCUMENTS / OTHER IS MISSING / MANQUANT</Tab>
                  )}
                  {PdfChecker.map((el)=>el.folderName.toString() === "factures_payes") ? null : (
                    <Tab className="redColorStyling">⚠️ FACTURES IS MISSING / MANQUANT</Tab>
                  )}
                  {PdfChecker.map((el)=>el.folderName.toString() === "rapport_activite") ? null : (
                    <Tab className="redColorStyling">⚠️ RAPPORT ACTIVITE IS MISSING / MANQUANT</Tab>
                  )}
                  {PdfChecker.map((el)=> el.folderName.toString() === "offre_envoye_et_nonsigne") ? null : (
                    <Tab className="redColorStyling">
                      ⚠️ OFFRE ENVOYE ET NON SIGNE IS MISSING / MANQUANT
                    </Tab>
                  )}
                  {PdfChecker.map((el)=>el.folderName.toString() === "fiche_medicale") ? null : (
                    <Tab className="redColorStyling">
                      ⚠️ FICHE MEDICALE IS MISSING / MANQUANT
                    </Tab>
                  )}
                    {PdfChecker.map((el)=>el.folderName.toString() === "reges") ? null : (
                    <Tab className="redColorStyling"> ⚠️ REGES IS MISSING / MANQUANT</Tab>
                  )}
                    {PdfChecker.map((el)=>el.folderName.toString() === "fiche_de_mise_a_disposition") ? null : (
                    <Tab className="redColorStyling">
                      ⚠️ FICHE DE MISE A DISPOSITION / MANQUANT
                    </Tab>
                  )}
                </Tabs>
              </div>
            </div> */}
    </>
  );
}
export default PDFBoxClient;
