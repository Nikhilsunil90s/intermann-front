import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { API_BASE_URL } from "../config/serverApiConfig";
import ErrorLoader from "../components/Loader/SearchBarError";

let clDoc;
function ClientContractPage() {
  const { id } = useParams();
  // const {state}= useLocation()
  const [documentList, setDocumentList] = useState([]);
  const [profile, setProfile] = useState() as any;
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
  const [fiche_de_mise_a_disposition, setfiche_de_mise_a_disposition] =
  useState() as any;
  const [offre_envoye_et_nonsigne, setoffre_envoye_et_nonsigne] =
    useState() as any;
  useEffect(() => {
    fetchCandidat(id)
      .then((resData) => {
        if (resData.status == true) {
          // setProfile(resData.data)
          resData.data.map((el) => {
            setProfile(el);
            setDocumentList(el.clientDocuments);
          });
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
    documentList.map((el) => {
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
  },[documentList]);



  const fetchCandidat = async (clientId: any) => {
    return await fetch(API_BASE_URL + `getClientDetailsById/?clientId=${clientId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((respData) => respData)
      .catch((err) => err);
  };

  return (
    <>
      <div className="container-fluied bg-ContractPage">
        <div className="row">
          <div className="col-12 d-flex justify-content-center p-1 mt-2">
            <span>
              <img
                src={require("../images/logo-header.svg").default}
                className="filter-logo"
                style={{ width: "150%" }}
              />
            </span>
            <img
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
             
                  <img
                    src={require("../images/representant.png")}
                    className="representant"
                  />

               
               
              </div>
              <div className="col-md-9 col-sm-12 d-grid align-items-center ">
                <p className="mb-0 cardPDFDetails">
                  Votre représentant : Jeremy Roggy
                <br/>
INTERMANN WORK S.R.L <br/>
 VAT : RO44515629 <br/>
+40 770 504 158</p>
             </div>
            </div>
          </div>
       
          <div className="col-12 px-3 mb-1 ">
            <div className="row Social-CardClient p-1">
              <div className="col-md-4 col-sm-12 justify-content-center d-flex align-items-center">
                <p className="mb-0 CLIntermann">CONTRAT CLIENT x Intermann</p>
              </div>
            <div className="col-md-8 col-sm-12">
                <div className="row justify-content-end">
                  {
                   contrat_client ?
                    documentList?.map((el)=>(
                        JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("contrat_client")) ?
                    <>    <div className="col-md-6 col-sm-12 mb-1">
                       <div className="row PDFcardBG cursor-pointer" onClick={() =>
                                ViewDownloadFiles(el.url)
                              }>
                          <div className="col-2 px-0 d-flex align-items-center">
                            <img
                              style={{ width: "73%" }}
                              src={require("../images/newresume.svg").default}
                            />
                          </div>
                          <div className="col-8 px-0 d-flex align-items-center cursor-pointer"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={el.originalName}>
                            <p className="mb-0 contractEMPStyle">{el.originalName.length > 20 ? el.originalName.slice(0, 21) + "..." : el.originalName}</p>
                          </div>
                          <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer" >
                            <img
                              style={{ width: "73%" }}
                              src={require("../images/dowcard.svg").default}
                            />
                          </div>
                          </div>
                        </div>
                      </>
                        
                         : 
                       null

                    )
                    )
                    :
                   <p className="d-flex  justify-content-center align-items-center mb-0"     style={{
                  fontFamily: 'Poppins',
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#000000"
              }}> <ErrorLoader />No Documents Uploaded!</p>
                    
                    
                }
           
              </div>
              </div>
            </div>
          </div>
          <div className="col-12 px-3 mb-1 ">
            <div className="row Social-CardClient p-1">
              <div className="col-md-4 col-sm-12 justify-content-center d-flex align-items-center">
                <p className="mb-0 CLIntermann">
                  Contrats employes x Intermann
                </p>
              </div>
              <div className="col-md-8 col-sm-12">
                <div className="row justify-content-end">
                {
                   contrat_employes ?
                   documentList?.map((el)=>(
                       JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("contrat_employes")) ?
                   <>    <div className="col-md-6 col-sm-12 mb-1">
                       <div className="row PDFcardBG cursor-pointer" onClick={() =>
                                ViewDownloadFiles(el.url)
                              }>
                         <div className="col-2 px-0 d-flex align-items-center">
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/newresume.svg").default}
                           />
                         </div>
                         <div className="col-8 px-0 d-flex align-items-center cursor-pointer"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={el.originalName}>
                           <p className="mb-0 contractEMPStyle">{el.originalName.length > 20 ? el.originalName.slice(0, 21) + "..." : el.originalName}</p>
                         </div>
                         <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer" >
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/dowcard.svg").default}
                           />
                         </div>
                         </div>
                       </div>
                     </>
                          :
                          null
                   )
                   )
                   :
                  <p className="d-flex  justify-content-center align-items-center mb-0"     style={{
                  fontFamily: 'Poppins',
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#000000"
              }}> <ErrorLoader />No Documents Uploaded!</p>
                   
                   
               }
           
              </div>
              </div>
            </div>
          </div>{" "}
          <div className="col-12 px-3 mb-1 ">
            <div className="row Social-CardClient p-1">
              <div className="col-md-4 col-sm-12 justify-content-center d-flex align-items-center">
                <p className="mb-0 CLIntermann">Id Card Employes</p>
              </div>
              <div className="col-md-8 col-sm-12">
                <div className="row justify-content-end">
                {
                   id_card_employer ?
                   documentList?.map((el)=>(
                       JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("id_card_employer")) ?
                   <>    <div className="col-md-6 col-sm-12  mb-1">
                       <div className="row PDFcardBG cursor-pointer" onClick={() =>
                                ViewDownloadFiles(el.url)
                              }>
                         <div className="col-2 px-0 d-flex align-items-center">
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/newresume.svg").default}
                           />
                         </div>
                         <div className="col-8 px-0 d-flex align-items-center cursor-pointer"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={el.originalName}>
                           <p className="mb-0 contractEMPStyle">{el.originalName.length > 20 ? el.originalName.slice(0, 21) + "..." : el.originalName}</p>
                         </div>
                         <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer" >
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/dowcard.svg").default}
                           />
                         </div>
                         </div>
                       </div>
                     </>
                          :
                          null
                   )
                   )
                   :
                  <p className="d-flex  justify-content-center align-items-center mb-0"     style={{
                  fontFamily: 'Poppins',
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#000000"
              }}> <ErrorLoader />No Documents Uploaded!</p>
                   
               }
           
           
              </div>
              </div>
            </div>
          </div>{" "}
          <div className="col-12 px-3 mb-1 ">
            <div className="row Social-CardClient p-1">
              <div className="col-md-4 col-sm-12 justify-content-center d-flex align-items-center">
                <p className="mb-0 CLIntermann">A1</p>
              </div>
              <div className="col-md-8 col-sm-12">
                <div className="row justify-content-end">
                {
                   al ?
                   documentList?.map((el)=>(
                       JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("al")) ?
                   <>    <div className="col-md-6 col-sm-12 mb-1">
                        <div className="row PDFcardBG cursor-pointer" onClick={() =>
                                ViewDownloadFiles(el.url)
                              }>
                         <div className="col-2 px-0 d-flex align-items-center">
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/newresume.svg").default}
                           />
                         </div>
                         <div className="col-8 px-0 d-flex align-items-center cursor-pointer"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={el.originalName}>
                           <p className="mb-0 contractEMPStyle">{el.originalName.length > 20 ? el.originalName.slice(0, 21) + "..." : el.originalName}</p>
                         </div>
                         <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer" >
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/dowcard.svg").default}
                           />
                         </div>
                         </div>
                       </div>
                     </>
                          :
                          null
                   )
                   )
                   :
                  <p className="d-flex  justify-content-center align-items-center mb-0"     style={{
                  fontFamily: 'Poppins',
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#000000"
              }}> <ErrorLoader />No Documents Uploaded!</p>
                   
                   
               } 
           
              </div>
              </div>
            </div>
          </div>{" "}
          <div className="col-12 px-3 mb-1 ">
            <div className="row Social-CardClient p-1">
              <div className="col-md-4 col-sm-12 justify-content-center d-flex align-items-center">
                <p className="mb-0 CLIntermann">CONTRATS ASSURANCES EMPLOYES</p>
              </div>
              <div className="col-md-8 col-sm-12">
                <div className="row justify-content-end">
                {
                   contrats_assurances_employes ?
                   documentList?.map((el)=>(
                       JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("contrats_assurances_employes")) ?
                   <>    <div className="col-md-6 col-sm-12 mb-1">
                       <div className="row PDFcardBG cursor-pointer" onClick={() =>
                                ViewDownloadFiles(el.url)
                              }>
                         <div className="col-2 px-0 d-flex align-items-center">
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/newresume.svg").default}
                           />
                         </div>
                         <div className="col-8 px-0 d-flex align-items-center cursor-pointer"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={el.originalName}>
                           <p className="mb-0 contractEMPStyle">{el.originalName.length > 20 ? el.originalName.slice(0, 21) + "..." : el.originalName}</p>
                         </div>
                         <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer" >
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/dowcard.svg").default}
                           />
                         </div>
                         </div>
                       </div>
                     </>
                          :
                          null
                   )
                   )
                   :
                  <p className="d-flex  justify-content-center align-items-center mb-0"     style={{
                  fontFamily: 'Poppins',
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#000000"
              }}> <ErrorLoader />No Documents Uploaded!</p>
                   
               }
           
              </div>
              </div>
            </div>
          </div>{" "}
          <div className="col-12 px-3 mb-1 ">
            <div className="row Social-CardClient p-1">
              <div className="col-md-4 col-sm-12 justify-content-center d-flex align-items-center">
                <p className="mb-0 CLIntermann">SISPI</p>
              </div>
              <div className="col-md-8 col-sm-12">
                <div className="row justify-content-end">
                {
                   sispi ?
                   documentList?.map((el)=>(
                       JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("sispi")) ?
                   <>    <div className="col-md-6 col-sm-12 mb-1">
                        <div className="row PDFcardBG cursor-pointer" onClick={() =>
                                ViewDownloadFiles(el.url)
                              }>
                         <div className="col-2 px-0 d-flex align-items-center">
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/newresume.svg").default}
                           />
                         </div>
                         <div className="col-8 px-0 d-flex align-items-center cursor-pointer"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={el.originalName}>
                           <p className="mb-0 contractEMPStyle">{el.originalName.length > 20 ? el.originalName.slice(0, 21) + "..." : el.originalName}</p>
                         </div>
                         <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer" >
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/dowcard.svg").default}
                           />
                         </div>
                         </div>
                       </div>
                     </>
                          :
                          null
                   )
                   )
                   :
                  <p className="d-flex  justify-content-center align-items-center mb-0"     style={{
                  fontFamily: 'Poppins',
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#000000"
              }}> <ErrorLoader />No Documents Uploaded!</p>
                   
               }
              </div>
              </div>
            </div>
          </div>{" "}
          <div className="col-12 px-3 mb-1 ">
            <div className="row Social-CardClient p-1">
              <div className="col-md-4 col-sm-12 justify-content-center d-flex align-items-center">
                <p className="mb-0 CLIntermann">
                  DOCUMENT DE REPRESENTANCE / REPRESENTATION
                </p>
              </div>
              <div className="col-md-8 col-sm-12">
                <div className="row justify-content-end">
                {
                   document_de_represntation ?
                   documentList?.map((el)=>(
                       JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("document_de_represntation")) ?
                   <>    <div className="col-md-6 col-sm-12 mb-1">
                      <div className="row PDFcardBG cursor-pointer" onClick={() =>
                                ViewDownloadFiles(el.url)
                              }>
                         <div className="col-2 px-0 d-flex align-items-center">
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/newresume.svg").default}
                           />
                         </div>
                         <div className="col-8 px-0 d-flex align-items-center cursor-pointer"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={el.originalName}>
                           <p className="mb-0 contractEMPStyle">{el.originalName.length > 20 ? el.originalName.slice(0, 21) + "..." : el.originalName}</p>
                         </div>
                         <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer">
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/dowcard.svg").default}
                           />
                         </div>
                         </div>
                       </div>
                     </>
                          :
                          null
                   )
                   )
                   :
                   <p className="d-flex  justify-content-center align-items-center mb-0"     style={{
                    fontFamily: 'Poppins',
                    fontStyle: "normal",
                    fontWeight: "700",
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#000000"
                }}> <ErrorLoader />No Documents Uploaded!</p>
                   
               }  
           
              </div>
              </div>
            </div>
          </div>{" "}
          <div className="col-12 px-3 mb-1 ">
            <div className="row Social-CardClient p-1">
              <div className="col-md-4 col-sm-12 justify-content-center d-flex align-items-center">
                <p className="mb-0 CLIntermann">OFFRE SIGNEE / QUOTES</p>
              </div>
              <div className="col-md-8 col-sm-12">
                <div className="row justify-content-end">
                {
                   offre_signee ?
                   documentList?.map((el)=>(
                       JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("offre_signee")) ?
                   <>    <div className="col-md-6 col-sm-12 mb-1">
                    <div className="row PDFcardBG cursor-pointer" onClick={() =>
                                ViewDownloadFiles(el.url)
                              }>
                         <div className="col-2 px-0 d-flex align-items-center">
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/newresume.svg").default}
                           />
                         </div>
                         <div className="col-8 px-0 d-flex align-items-center cursor-pointer"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={el.originalName}>
                           <p className="mb-0 contractEMPStyle">{el.originalName.length > 20 ? el.originalName.slice(0, 21) + "..." : el.originalName}</p>
                         </div>
                         <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer">
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/dowcard.svg").default}
                           />
                         </div>
                         </div>
                       </div>
                     </>
                          :
                          null
                   )
                   )
                   :
                  <p className="d-flex  justify-content-center align-items-center mb-0"     style={{
                  fontFamily: 'Poppins',
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#000000"
              }}> <ErrorLoader />No Documents Uploaded!</p>
                   
               } 
           
              </div>
              </div>
            </div>
          </div>{" "}
          <div className="col-12 px-3 mb-1 ">
            <div className="row Social-CardClient p-1">
              <div className="col-md-4 col-sm-12 justify-content-center d-flex align-items-center">
                <p className="mb-0 CLIntermann">
                  ATTESTATIONS SOCIETE INTERMANN WORK S.R.L
                </p>
              </div>
              <div className="col-md-8 col-sm-12">
                <div className="row justify-content-end">
                {
                  attestations_societe_intermann ? 
                   documentList?.map((el)=>(
                       JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("attestations_societe_intermann")) ?
                   <>    <div className="col-md-6 col-sm-12 mb-1">
                        <div className="row PDFcardBG cursor-pointer" onClick={() =>
                                ViewDownloadFiles(el.url)
                              }>
                         <div className="col-2 px-0 d-flex align-items-center">
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/newresume.svg").default}
                           />
                         </div>
                         <div className="col-8 px-0 d-flex align-items-center cursor-pointer"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={el.originalName}>
                           <p className="mb-0 contractEMPStyle">{el.originalName.length > 20 ? el.originalName.slice(0, 21) + "..." : el.originalName}</p>
                         </div>
                         <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer">
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/dowcard.svg").default}
                           />
                         </div>
                         </div>
                       </div>
                     </>
                          :
                          null
                   )
                   )
                   :
                  <p className="d-flex  justify-content-center align-items-center mb-0"     style={{
                  fontFamily: 'Poppins',
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#000000"
              }}> <ErrorLoader />No Documents Uploaded!</p>
                   
                   
               }  
           
              </div>
              </div>
            </div>
          </div>{" "}
          <div className="col-12 px-3 mb-1 ">
            <div className="row Social-CardClient p-1">
              <div className="col-md-4 col-sm-12 justify-content-center d-flex align-items-center">
                <p className="mb-0 CLIntermann">CVS</p>
              </div>
              <div className="col-md-8 col-sm-12">
                <div className="row justify-content-end">
                {
                   cvs ?
                   documentList?.map((el)=>(
                       JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("cvs")) ?
                   <>    <div className="col-md-6 col-sm-12  mb-1">
                        <div className="row PDFcardBG cursor-pointer" onClick={() =>
                                ViewDownloadFiles(el.url)
                              }>
                         <div className="col-2 px-0 d-flex align-items-center">
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/newresume.svg").default}
                           />
                         </div>
                         <div className="col-8 px-0 d-flex align-items-center cursor-pointer"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={el.originalName}>
                           <p className="mb-0 contractEMPStyle">{el.originalName.length > 20 ? el.originalName.slice(0, 21) + "..." : el.originalName}</p>
                         </div>
                         <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer" >
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/dowcard.svg").default}
                           />
                         </div>
                         </div>
                       </div>
                     </>
                          :
                          null
                   )
                   )
                   :
                  <p className="d-flex  justify-content-center align-items-center mb-0"     style={{
                  fontFamily: 'Poppins',
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#000000"
              }}> <ErrorLoader />No Documents Uploaded!</p>
                   
               }  
            
           
              </div>
              </div>
            </div>
          </div>{" "}
          <div className="col-12 px-3 mb-1 ">
            <div className="row Social-CardClient p-1">
              <div className="col-md-4 col-sm-12 justify-content-center d-flex align-items-center">
                <p className="mb-0 CLIntermann">AUTRES DOCUMENTS / OTHER </p>
              </div>
              <div className="col-md-8 col-sm-12">
                <div className="row justify-content-end">
                {
                   autres_documents ?
                   documentList?.map((el)=>(
                       JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("autres_documents")) ?
                   <>    <div className="col-md-6 col-sm-12 mb-1">
                      <div className="row PDFcardBG cursor-pointer" onClick={() =>
                                ViewDownloadFiles(el.url)
                              }>
                         <div className="col-2 px-0 d-flex align-items-center">
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/newresume.svg").default}
                           />
                         </div>
                         <div className="col-8 px-0 d-flex align-items-center cursor-pointer"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={el.originalName}>
                           <p className="mb-0 contractEMPStyle">{el.originalName.length > 20 ? el.originalName.slice(0, 21) + "..." : el.originalName}</p>
                         </div>
                         <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer" >
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/dowcard.svg").default}
                           />
                         </div>
                         </div>
                       </div>
                     </>
                          :
                          null
                   )
                   )
                   :
                  <p className="d-flex  justify-content-center align-items-center mb-0"     style={{
                  fontFamily: 'Poppins',
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#000000"
              }}> <ErrorLoader />No Documents Uploaded!</p>
                   
               }  
             
           
              </div>
              </div>
            </div>
          </div>{" "}
          <div className="col-12 px-3 mb-1 ">
            <div className="row Social-CardClient p-1">
              <div className="col-md-4 col-sm-12 justify-content-center d-flex align-items-center">
                <p className="mb-0 CLIntermann">FACTURES</p>
              </div>
              <div className="col-md-8 col-sm-12">
                <div className="row justify-content-end">
                {
                   factures ?
                   documentList?.map((el)=>(
                       JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("factures")) ?
                   <>    <div className="col-md-6 col-sm-12  mb-1">
                       <div className="row PDFcardBG cursor-pointer" onClick={() =>
                                ViewDownloadFiles(el.url)
                              }>
                         <div className="col-2 px-0 d-flex align-items-center">
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/newresume.svg").default}
                           />
                         </div>
                         <div className="col-8 px-0 d-flex align-items-center cursor-pointer"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={el.originalName}>
                           <p className="mb-0 contractEMPStyle">{el.originalName.length > 20 ? el.originalName.slice(0, 21) + "..." : el.originalName}</p>
                         </div>
                         <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer">
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/dowcard.svg").default}
                           />
                         </div>
                         </div>
                       </div>
                     </>
                          :
                          null
                   )
                   )
                   :
                  <p className="d-flex  justify-content-center align-items-center mb-0"     style={{
                  fontFamily: 'Poppins',
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#000000"
              }}> <ErrorLoader />No Documents Uploaded!</p>
                   
               }   
           
              </div>
              </div>
            </div>
          </div>{" "}
          <div className="col-12 px-3 mb-1 ">
            <div className="row Social-CardClient p-1">
              <div className="col-md-4 col-sm-12 justify-content-center d-flex align-items-center">
                <p className="mb-0 CLIntermann">RAPPORT ACTIVITE</p>
              </div>
              <div className="col-md-8 col-sm-12">
                <div className="row justify-content-end">
                {
                   rapport_activite ? 
                   documentList?.map((el)=>(
                       JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("rapport_activite")) ?
                   <>    <div className="col-md-6 col-sm-12 mb-1">
                         <div className="row PDFcardBG cursor-pointer" onClick={() =>
                                ViewDownloadFiles(el.url)
                              }>
                         <div className="col-2 px-0 d-flex align-items-center">
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/newresume.svg").default}
                           />
                         </div>
                         <div className="col-8 px-0 d-flex align-items-center cursor-pointer"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={el.originalName}>
                           <p className="mb-0 contractEMPStyle">{el.originalName.length > 20 ? el.originalName.slice(0, 21) + "..." : el.originalName}</p>
                         </div>
                         <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer">
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/dowcard.svg").default}
                           />
                         </div>
                         </div>
                       </div>
                     </>
                          :
                          null
                   )
                   )
                   :
                  <p className="d-flex  justify-content-center align-items-center mb-0"     style={{
                  fontFamily: 'Poppins',
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#000000"
              }}> <ErrorLoader />No Documents Uploaded!</p>
                   
               }  
           
              </div>
              </div>
            </div>
          </div>
          <div className="col-12 px-3 mb-1">
            <div className="row Social-CardClient p-1">
              <div className="col-md-4 col-sm-12 justify-content-center d-flex align-items-center">
                <p className="mb-0 CLIntermann">OFFRE ENVOYE ET NON SIGNE</p>
              </div>
              <div className="col-md-8 col-sm-12">
                <div className="row justify-content-end">
                {
                   offre_envoye_et_nonsigne ?
                   documentList?.map((el)=>(
                       JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("offre_envoye_et_nonsigne")) ?
                   <>    <div className="col-md-6 col-sm-12 mb-1">
                       <div className="row PDFcardBG " onClick={() =>
                                ViewDownloadFiles(el.url)
                              }>
                         <div className="col-2 px-0 d-flex align-items-center">
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/newresume.svg").default}
                           />
                         </div>
                         <div className="col-8 px-0 d-flex align-items-center cursor-pointer"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={el.originalName}>
                           <p className="mb-0 contractEMPStyle">{el.originalName.length > 20 ? el.originalName.slice(0, 21) + "..." : el.originalName}</p>
                         </div>
                         <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer" >
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/dowcard.svg").default}
                           />
                         </div>
                         </div>
                       </div>
                     </>
                          :
                          null
                   )
                   )
                   :
                  <p className="d-flex  justify-content-center align-items-center mb-0"     style={{
                  fontFamily: 'Poppins',
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#000000"
              }}> <ErrorLoader />No Documents Uploaded!</p>
                   
               }    
           
              </div>
              </div>
            </div>
          </div>
          <div className="col-12 px-3 mb-1">
            <div className="row Social-CardClient p-1">
              <div className="col-md-4 col-sm-12 justify-content-center d-flex align-items-center">
                <p className="mb-0 CLIntermann">FICHE MEDICALE</p>
              </div>
              <div className="col-md-8 col-sm-12">
                <div className="row justify-content-end">
                {
                   fiche_medicale ?
                   documentList?.map((el)=>(
                       JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("fiche_medicale")) ?
                   <>    <div className="col-md-6 col-sm-12 mb-1">
                       <div className="row PDFcardBG cursor-pointer" onClick={() =>
                                ViewDownloadFiles(el.url)
                              }>
                         <div className="col-2 px-0 d-flex align-items-center">
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/newresume.svg").default}
                           />
                         </div>
                         <div className="col-8 px-0 d-flex align-items-center cursor-pointer"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={el.originalName}>
                           <p className="mb-0 contractEMPStyle">{el.originalName.length > 20 ? el.originalName.slice(0, 21) + "..." : el.originalName}</p>
                         </div>
                         <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer">
                           <img
                             style={{ width: "73%" }}
                             src={require("../images/dowcard.svg").default}
                           />
                         </div>
                         </div>
                       </div>
                     </>
                          :
                          null
                   )
                   )
                   :
                  <p className="d-flex  justify-content-center align-items-center mb-0"     style={{
                  fontFamily: 'Poppins',
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#000000"
              }}> <ErrorLoader />No Documents Uploaded!</p>
                   
               }    
           
              </div>
              </div>
            </div>
          </div>
          <div className="col-12 px-3 mb-1 ">
            <div className="row Social-CardClient p-1">
              <div className="col-md-4 col-sm-12 justify-content-center d-flex align-items-center">
                <p className="mb-0 CLIntermann">REGES</p>
              </div>
            <div className="col-md-8 col-sm-12">
                <div className="row justify-content-end">
                  {
                   reges ?
                    documentList?.map((el)=>(
                        JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("reges")) ?
                    <>    <div className="col-md-6 col-sm-12 mb-1">
                        <div className="row PDFcardBG cursor-pointer" onClick={() =>
                                ViewDownloadFiles(el.url)
                              }>
                          <div className="col-2 px-0 d-flex align-items-center">
                            <img
                              style={{ width: "73%" }}
                              src={require("../images/newresume.svg").default}
                            />
                          </div>
                          <div className="col-8 px-0 d-flex align-items-center cursor-pointer"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={el.originalName}>
                            <p className="mb-0 contractEMPStyle">{el.originalName.length > 20 ? el.originalName.slice(0, 21) + "..." : el.originalName}</p>
                          </div>
                          <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer" >
                            <img
                              style={{ width: "73%" }}
                              src={require("../images/dowcard.svg").default}
                            />
                          </div>
                          </div>
                        </div>
                      </>
                        
                         : 
                       null

                    )
                    )
                    :
                   <p className="d-flex  justify-content-center align-items-center mb-0"     style={{
                  fontFamily: 'Poppins',
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#000000"
              }}> <ErrorLoader />No Documents Uploaded!</p>
                    
                    
                }
           
              </div>
              </div>
            </div>
          </div>
          <div className="col-12 px-3 mb-1 ">
            <div className="row Social-CardClient p-1">
              <div className="col-md-4 col-sm-12 justify-content-center d-flex align-items-center">
                <p className="mb-0 CLIntermann">FICHE DE MISE A DISPOSITION</p>
              </div>
            <div className="col-md-8 col-sm-12">
                <div className="row justify-content-end">
                  {
                   fiche_de_mise_a_disposition ?
                    documentList?.map((el)=>(
                        JSON.stringify(el.folderName ? el.folderName : null).includes(JSON.stringify("fiche_de_mise_a_disposition")) ?
                    <>    <div className="col-md-6 col-sm-12 mb-1">
                        <div className="row PDFcardBG cursor-pointer" onClick={() =>
                                ViewDownloadFiles(el.url)
                              }>
                          <div className="col-2 px-0 d-flex align-items-center">
                            <img
                              style={{ width: "73%" }}
                              src={require("../images/newresume.svg").default}
                            />
                          </div>
                          <div className="col-8 px-0 d-flex align-items-center cursor-pointer"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={el.originalName}>
                            <p className="mb-0 contractEMPStyle">{el.originalName.length > 20 ? el.originalName.slice(0, 21) + "..." : el.originalName}</p>
                          </div>
                          <div className="col-2 px-0 d-flex align-items-center justify-content-center cursor-pointer" >
                            <img
                              style={{ width: "73%" }}
                              src={require("../images/dowcard.svg").default}
                            />
                          </div>
                          </div>
                        </div>
                      </>
                        
                         : 
                       null

                    )
                    )
                    :
                   <p className="d-flex  justify-content-center align-items-center mb-0"     style={{
                  fontFamily: 'Poppins',
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#000000"
              }}> <ErrorLoader />No Documents Uploaded!</p>
                    
                    
                }
           
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ClientContractPage;
