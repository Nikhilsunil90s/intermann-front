import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { API_BASE_URL } from "../config/serverApiConfig";
import ErrorLoader from "../components/Loader/SearchBarError";
import { Toaster } from "react-hot-toast";

function GdocumentCandidatePage() {
  const { id } = useParams();
  console.log(id);
  // const {state}= useLocation()
  const [documentList, setDocumentList] = useState([]) as any;
  const [profile, setProfile] = useState() as any;
  const [CONTRACT_EMPLOYE_INTERMANN, setCONTRACT_EMPLOYE_INTERMANN] =
    useState() as any;
  
  const [paiements, setPaiements] = useState() as any;
  const [clientId, setClientId] = useState() as any;
  const [Fiche_Medicale, setFiche_Medicale] = useState() as any;
  const [Assurance, setAssurance] = useState() as any;
  const [ID_CARD, setID_CARD] = useState() as any;
  const [Reges, setReges] = useState() as any;
  const [factures_payes, setfactures_payes] = useState() as any;
  const [factures_impayes, setfactures_impayes] = useState() as any;
  const [Fiche_mise_à_disposition, setFiche_mise_à_disposition] =
    useState() as any;

  useEffect(() => {
    fetchCandidat(id)
      .then((resData) => {
        if (resData.status == true) {
          setProfile(resData.data);
          console.log(resData.data);
          setDocumentList([
            ...resData.data?.candidatDocuments,
            ...resData.data?.candidatLinks,
          ]);
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });

  }, [id]);

  const ViewDownloadFiles = (documentName: any) => {
    window.open(documentName);
  };

  useEffect(() => {
    // documentList.map((el) => {
    profile?.candidatDocuments?.map((el) => {
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(
          JSON.stringify("paiements")
        )
      ) {
        setPaiements([el]);
      }
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(
          JSON.stringify("Reges")
        )
      ) {
        setReges([el]);
      }
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(
          JSON.stringify("CONTRACT")
        )
      ) {
        setCONTRACT_EMPLOYE_INTERMANN([el]);
      }
      if (el.folderName == "BULETIN_/_ID_CARD") {
        console.log(el, "el");
        setID_CARD([el]);
      }
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(
          JSON.stringify("Fiche_Medicale")
        )
      ) {
        setFiche_Medicale([el]);
      }
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(
          JSON.stringify("Assurance")
        )
      ) {
        setAssurance([el]);
      }
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(
          JSON.stringify("Fiche_mise_à_disposition")
        )
      ) {
        setFiche_mise_à_disposition([el]);
      }
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(
          JSON.stringify("factures_payes")
        )
      ) {
        setfactures_payes([el]);
      }
      if (
        JSON.stringify(el.folderName ? el.folderName : null).includes(
          JSON.stringify("factures_impayes")
        )
      ) {
        setfactures_impayes([el]);
      }
    });
  }, [profile]);

  useEffect(() => {
    profile?.candidatLinks?.map((Link) => {
      if (
        JSON.stringify(Link.folder ? Link.folder : null).includes(
          JSON.stringify("Reges")
        )
      ) {
        setReges([Link]);
      }
      if (
        JSON.stringify(Link.folder ? Link.folder : null).includes(
          JSON.stringify("CONTRACT")
        )
      ) {
        setCONTRACT_EMPLOYE_INTERMANN([Link]);
      }
      if (Link.folder == "BULETIN_/_ID_CARD") {
        setID_CARD([Link]);
      }
      if (
        JSON.stringify(Link.folder ? Link.folder : null).includes(
          JSON.stringify("Fiche_Medicale")
        )
      ) {
        setFiche_Medicale([Link]);
      }
      if (
        JSON.stringify(Link.folder ? Link.folder : null).includes(
          JSON.stringify("Assurance")
        )
      ) {
        setAssurance([Link]);
      }
      if (
        JSON.stringify(Link.folder ? Link.folder : null).includes(
          JSON.stringify("Fiche_mise_à_disposition")
        )
      ) {
        setFiche_mise_à_disposition([Link]);
      }
      if (
        JSON.stringify(Link.folder ? Link.folder : null).includes(
          JSON.stringify("factures_payes")
        )
      ) {
        setfactures_payes([Link]);
      }
      if (
        JSON.stringify(Link.folder ? Link.folder : null).includes(
          JSON.stringify("factures_impayes")
        )
      ) {
        setfactures_impayes([Link]);
      }
    });
  }, [profile]);

  useEffect(() => {
    if (profile?.candidatCurrentWork[0]?.workingFor !== '') {
      let clientName = profile?.candidatCurrentWork[0]?.workingFor;
      console.log(clientName);
      fetchClient(clientName)
        .then(resData => {
          setClientId(resData?.data?._id);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }, [profile])

  const fetchCandidat = async (CandidateID: any) => {
    return await fetch(
      API_BASE_URL + `getCandidatDetailsById/?candidatId=${CandidateID}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((resp) => resp.json())
      .then((respData) => respData)
      .catch((err) => err);
  };

  const fetchClient = async (clientName: any) => {
    return await fetch(
      API_BASE_URL + `getClientByName/?clientCompanyName=${clientName}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    )
    .then((resp) => resp.json())
    .then((respData) => respData)
    .catch((err) => err);
  }

  // const FilesUploads=(file)=>{

  //   const fileUploaded = file;
  //   let formdata = new FormData();
  //   formdata.append("clientId", profile._id);
  //   formdata.append("document", fileUploaded);
  //   formdata.append("folderName", "rapport_activite");
  //   axiosInstance
  //     .post("uploadClientDocuments", formdata, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: "Bearer " + Cookies.get("token"),
  //       },
  //       onUploadProgress: (data) => {

  //         //Set the progress value to show the progress bar

  //       },
  //     })
  //     .then((resData) => {
  //       if (resData.data.status) {

  //         notifyDocumentUploadSuccess();
  //         setTimeout(()=>{
  //           window.location.reload()
  //         },2000)
  //       } else {

  //         setDocUploaded(false);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setDocUploaded(false);
  //       toast.error("File Not Uploaded!")
  //     });

  // }

  return (
    <>
      <Toaster position="top-right" />
      <div className="container-fluied bg-ContractPage">
        <div className="row">
          <div className="col-12 d-flex justify-content-center p-1 mt-2">
            <span>
              <img alt="..."
                src={require("../images/logo-header.svg").default}
                className="filter-logo"
                style={{ width: "150%" }}
              />
            </span>
            <img alt="..."
              src={require("../images/LogoName.svg").default}
              className="filter-text LogoIntermann"
              style={{ paddingLeft: "30px" }}
            />
          </div>
          <div
            className="col-12 text-center mt-2"
            style={{ padding: "0px 50px 0px 50px" }}
          >
            {" "}
            <p className="retrouverez mb-0 ">
              Ceci est votre espace client Intermann, vous y retrouverez toute
              la documentation nécéssaire à jour en cas de controle.
            </p>
            <p className="mb-0 necessaryDoc">
              This is your customer area, you will find all the necessary
              up-to-date documentation there in the event of an inspection.
            </p>
          </div>
          <div className="col-12 px-3 mt-2 mb-1">
            <div className="row Social-CardClient p-1">
              <div className="col-md-3 col-sm-12  d-flex align-items-center justify-content-center">
                <img alt="..."
                  src={require("../images/logoImForCandidaDoctBox.svg").default}
                  className="representant"
                />
              </div>
              <div className="col-md-9 col-sm-12 d-grid align-items-center mt-2 ">
                <p className="mb-0 cardPDFDetails">
                  Votre représentant : Gabriela Elena Carevan
                  <br />
                  INTERMANN WORK S.R.L <br />
                  VAT : RO44515629 <br />
                  +40 770 504 158 / Adrian: +40 770 160 374 / Agence:+40 31 631 4347  <br />
                  contact@intermann.ro

                </p>
              </div>
            </div>
          </div>

          <div className="col-12 px-3 mt-1 mb-1">
            <div className="row Social-CardClient pb-1" style={{ backgroundColor: '#EAEAEA' }}>
              <div className="col-12" >

                <div className="text-center p-1">
                  <span className="custom-text-size" style={{ color: '#3F76E2', fontWeight: 'bold', textShadow: '2px 4px 4px rgba(46,91,173,0.6)' }}>
                    TRAVAIL ACTUELLEMENT CHEZ :
                  </span>
                </div>
                <div className="col-12">

                  <div className="p-1" style={{ backgroundColor: '#D9D9D9' }}>
                    <div className="d-flex align-items-center">
                      <img
                        alt="Building"
                        src={require("../images/company-dummy-logo.svg").default}
                        className="building-image"
                        style={{ width: "75px", height: "75px" }}
                      />
                      <div className="ml-1">
                        <p
                          className="mb-0"
                          style={{
                            fontFamily: "Poppins",
                            fontStyle: "normal",
                            fontWeight: 500,
                            fontSize: "18px",
                            color: "#000000",
                            textTransform: 'uppercase',
                          }}
                        >
                          { profile?.candidatCurrentWork[0]?.workingFor !== ''
                            ? profile?.candidatCurrentWork[0]?.workingFor
                            : "Not Working For Any Company."}
                        </p>
                        {
                          profile?.candidatCurrentWork[0]?.workingFor !== ''
                          ?
                          <a
                            className="btn btn-blue d-flex align-items-center"
                            href={`https://intermann.herokuapp.com/documentbox/${profile?.candidatCurrentWork[0]?.workingFor}/${clientId}`}
                            target="_blank"
                            style={{
                              fontFamily: "Poppins",
                              fontStyle: "normal",
                              fontSize: "12px",
                              color: "#FFFFFF",
                              height: '12px',
                            }}
                          >
                          {'->'}Voir les documents
                        </a>
                        : null
                        }
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 px-3 mb-1 ">
            <div className="row Social-CardClient p-1">
              <div className="col-md-4 col-sm-12 d-flex align-items-center">
                <p className="mb-0 CLIntermann">Paiements</p>
              </div>
              <div className="col-md-8 col-sm-12">
                <div className="row justify-content-center">
                  {paiements ? (
                    documentList?.map((el) =>
                      JSON.stringify(
                        el.folderName ? el.folderName : null
                      ).includes(JSON.stringify("paiements")) ? (
                        <>
                          {" "}
                          <div className="col-md-6 col-sm-12 mb-1">
                            <div
                              className="row PDFcardBG cursor-pointer"
                              onClick={() =>
                                ViewDownloadFiles(el.url ? el.url : el.link)
                              }
                            >
                              <div className="col-2 px-0 d-flex align-items-center">
                                <img alt="..."
                                  style={{ width: "73%" }}
                                  src={
                                    require("../images/newresume.svg").default
                                  }
                                />
                              </div>
                              <div
                                className="col-8 px-0 d-flex align-items-center cursor-pointer"
                                data-bs-toggle="tooltip"
                                data-bs-placement="bottom"
                                title={el.originalName}
                              >
                                <p className="mb-0 contractEMPStyle">
                                  {el.originalName.length > 30
                                    ? el.originalName.slice(0, 32) + "..."
                                    : el.originalName}
                                </p>
                              </div>
                              <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer">
                                <img alt="..."
                                  style={{ width: "73%" }}
                                  src={require("../images/dowcard.svg").default}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      ) : JSON.stringify(el.folder ? el.folder : null).includes(
                        JSON.stringify("CONTRACT")
                      ) ? (
                        <>
                          <div className="col-md-6 col-sm-12 mb-1">
                            <div
                              className="row PDFcardBG cursor-pointer"
                              onClick={() => ViewDownloadFiles(el.link)}
                            >
                              <div className="col-2 px-0 d-flex align-items-center">
                                <img alt="..."
                                  style={{ width: "73%" }}
                                  src={
                                    require("../images/newresume.svg").default
                                  }
                                />
                              </div>
                              <div
                                className="col-8 px-0 d-flex align-items-center cursor-pointer"
                                data-bs-toggle="tooltip"
                                data-bs-placement="bottom"
                                title={el.link}
                              >
                                <p className="mb-0 contractEMPStyle">
                                  {el.link.length > 30
                                    ? el.link.slice(0, 32) + "..."
                                    : el.link}
                                </p>
                              </div>
                              <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer">
                                <img alt="..."
                                  style={{ width: "73%" }}
                                  src={require("../images/dowcard.svg").default}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      ) : null
                    )
                  ) : (
                    <p
                      className="d-flex  justify-content-center align-items-center mb-0"
                      style={{
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "700",
                        fontSize: "16px",
                        lineHeight: "24px",
                        color: "#000000",
                      }}
                    >
                      {" "}
                      <ErrorLoader />
                      No Documents Uploaded!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default GdocumentCandidatePage;