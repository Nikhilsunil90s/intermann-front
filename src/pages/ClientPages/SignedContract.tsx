import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../CSS/Client/ProgressCardClient.css";
import UploadDow from "../../components/Modal/SelectUploadDownload";
import Switch from "react-switch";
import { ReactComponent as Empty } from "../../images/emptyStar.svg";
import { ReactComponent as StarRating } from "../../images/RatingStar.svg";
import ArchivedClientModal from "../../components/Modal/ArchivedClientModal";
import { ReactComponent as TurnoFF } from "../../images/FatX.svg";
import { ReactComponent as TurnOn } from "../../images/base-switch_icon.svg";
import { API_BASE_URL } from "../../config/serverApiConfig";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { ProgressBar } from "react-bootstrap";
import ProfileLoader from "../../components/Loader/ProfilesLoader";
import RenameDoc from "../../components/Modal/RenameDoc_ModalClient";
import ReadMoreReact from "read-more-react";
import PreModalClient from "../../components/Modal/preSelectedModalForClient";
import PDFModalClient from "../../components/Modal/PDFGenerateclientModal";
import moment from "moment";
import ErrorLoader from "../../components/Loader/SearchBarError";
import { Tabs, Tab } from "react-tabs-scrollable";
import "react-tabs-scrollable/dist/rts.css";
import { FileUploader } from "react-drag-drop-files";
import Share from "../../components/Loader/Share"
import ArchivedModal from "../../components/Modal/ArchivedModal";



let RenameData = [];
let id = "";
let UploadName = ""as any;
let clDoc;
let Links;
let UploadTextBtn = "";
function Signed() {
  const { state } = useLocation();

  const profileData = JSON.parse(localStorage.getItem("archive"));
  const [profile, setProfile] = useState<any>(state ? state : profileData);
  const navigate = useNavigate();
  const [stateid] = useState(state) as any;
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
  const [ClientImage, setClientImage] = useState(
    profile.clientPhoto && profile.clientPhoto?.url !== undefined
      ? profile.clientPhoto?.url
      : ""
  );
  const hiddenFileInput = React.useRef(null);
  const [RenameDocStatus, setRenameDocStatus] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [showPreSelectedModal, setShowInPreSelectedModal] = useState(false);
  const [PreSelectedData, setPreSelected] = useState([]);
  const [PDFModal, setPDFModal] = useState(false);
  const [clientContract, setClientContract] = useState() as any;
  const [activeTab, setActiveTab] = React.useState(1) as any;
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
    const [deleteModal,setDeleteModal]=useState(false)
    const [DeleteEmp,setDeleteEmp]=useState([])
    const [Archived,setArchived]=useState(  profile.employeesWorkingUnder ?   profile.employeesWorkingUnder.filter((el) => (el.candidatStatus == "Archived")):null )
    const [preSelect,setPreselected]=useState( profile.employeesWorkingUnder ?   profile.employeesWorkingUnder.filter((el) => (el.candidatStatus == "Pre-Selected")):null )
    const [DriveLink,setDriveLink]=useState("")
  const [tabItems, setTabitems] = useState([
     {
      text: "CONTRAT CLIENT",
      value: "contrat_client",
    },
    { text: "CONTRAT EMPLOYES", value: "contrat_employes" },
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
      text: "FACTURES",
      value: "factures",
    },
    {
      text: "RAPPORT ACTIVITE",
      value: "rapport_activite",
    },
    {
      text: "OFFRE ENVOYE ET NONSIGNE",
      value: "offre_envoye_et_nonsigne",
    },  {
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
  },[profile.clientDocuments,documentList]);


  useEffect(() => {
    setProfile(state ? state : profileData);
  }, [state]);

  useEffect(() => {
    const FolderName = tabItems.filter((el, i) => i == activeTab);

    FolderName.map((el) => {
      UploadName = el.value;
      UploadTextBtn = el.text;
    });

    clDoc = profile.clientDocuments.filter((el) => el.folderName == UploadName);
    Links = profile.clientLinks.filter((el) => el.folder.toString() == UploadName.toString());
    setDocumentList([...clDoc,...Links]);
    // setLinkDoc([...Links])
  }, [UploadName]);

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
      window.open(ClientImage.replace("http","https"));
    }
  };

let Editdata ={state:profile,path:"/clientSigned"}

  const editClientProfile = () => {
    navigate("/ClientContractEditprofile", { state:Editdata });
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

  const onTabClick = (e, index: any) => {
    setActiveTab(index);
    const FolderName = tabItems.filter((el, i) => i == index);

    FolderName.map((el) => {
      UploadName = el.value;
      UploadTextBtn = el.text;
    });

    clDoc = profile.clientDocuments.filter((el) => el.folderName === UploadName);
    Links = profile.clientLinks.filter((el) => el.folder.toString() === UploadName.toString());
    setDocumentList([...clDoc,...Links]);
    
    // setLinkDoc([...Links])


  };

  const FilesUploads=(file)=>{
    const fileUploaded = file;
    setCandidatDocument(fileUploaded);
    let formdata = new FormData();
    formdata.append("clientId", profile._id);
    formdata.append("document", fileUploaded);
    formdata.append("folderName", UploadName);
    axiosInstance
      .post("uploadClientDocuments", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
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
  
  }


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
              window.location.href = "/clientSigned";
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
    // if (e.target.name === "clientDocuments") {
    //   const fileUploaded = e.target.files[0];
    //   setCandidatDocument(fileUploaded);
    //   let formdata = new FormData();
    //   formdata.append("clientId", profile._id);
    //   formdata.append("document", fileUploaded);
    //   formdata.append("folderName", UploadName);
    //   axiosInstance
    //     .post("uploadClientDocuments", formdata, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //         Authorization: "Bearer " + localStorage.getItem("token"),
    //       },
    //       onUploadProgress: (data) => {
    //         //Set the progress value to show the progress bar
    //         setProgress(Math.round((100 * data.loaded) / data.total));
    //       },
    //     })
    //     .then((resData) => {
    //       console.log(resData.data.status, "resData.data.status");
    //       if (resData.data.status) {
    //         console.log(resData.data, "resData");
    //         setDocUploaded(true);
    //         setProgress(0);
    //         notifyDocumentUploadSuccess();
    //       } else {
    //         console.log(resData);
    //         setDocUploaded(false);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       setDocUploaded(false);
    //     });
    //   return;
    // }
  };

  useEffect(() => {
    fetchCandidat(state ? stateid._id : profileData._id)
      .then((resData) => {
        if (resData.status == true) {
          resData.data.map((el) => {
            setProfile(el);
            setClientContract(el.clientContract);
            clDoc = el.clientDocuments.filter(
              (el) => el.folderName == UploadName
            );
            Links = el.clientLinks.filter((el) => el.folder == UploadName);
            setDocumentList([...clDoc,...Links]);
            // setLinkDoc([...Links])

            setClientImage(el.clientPhoto.url)
          });

      
          setDocUploaded(false);
        } else {
          setDocumentList([...documentList]);
          // setLinkDoc([...LinkDoc])
          setDocUploaded(false);
        }
      })

      .catch((err) => {
        console.log(err);
      });

    // if(PDFModalData == null){
    //   fetchCandidat(profile._id).then(resData => {

    //     if (resData.status == true) {
    //       setPDFModalData([...resData.data])
    //       // setClientImage(resData.data.clientPhoto !== undefined ? resData.data.clientPhoto?.map((el)=>{ return el.documentName }): ""

    //     }
    //   }

    //   )

    //     .catch(err => {
    //       console.log(err)
    //     })

    // }
  }, [docUploaded,UploadName]);


  const ViewDownloadFiles = (e,documentName) => {
    if(e.target.name ==="btnDownloadLink"){
    window.open(documentName.replace("http","https"));
      
    }else{
      window.open(documentName.replace("http","https"));
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
          window.location.reload()
        } else {
          notifyDocumentDeleteError();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const deleteLink = async (Id: any, FolderName: any,Link: any) => {
  //   await deleteCandidatLink(Id, FolderName,Link).then((resData) => {
  //       if (resData.status) {
  //         notifyDocumentDeleteSuccess();
  //         // setDocumentList([
  //         //   ...documentList.filter((doc) => {
  //         //     return doc.documentName !== docName;
  //         //   }),
  //         // ]);
  //         window.location.reload()
  //       } else {
  //         notifyDocumentDeleteError();
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const deleteCandidatDocument = async (
    docId: any,
    docName: any,
    clientId: any
  ) => {
    let headers = {
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
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
const deleteCandidatLink = (Id : any) => {
 let Data={
  clientId:profile._id,
  linkId:Id,
 }
    let headers = {
      "Accept": 'application/json',
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + localStorage.getItem('token')
    }
   fetch(API_BASE_URL + "removeClientLink", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then(reD => reD.json())
      .then(resD =>{toast.success(resD.message);setTimeout(()=>{ window.location.reload()},2000)})
      .catch(err => toast.error("Link Not Removed! Please Try Again in few minutes."))
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
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((resp) => resp.json())
      .then((respData) => respData)
      .catch((err) => err);
  };

  const viewFullProfile = (data) => {
    localStorage.setItem("embauch", JSON.stringify(data));
    window.open("/embauchprofile", "_blank");
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

  const datenow = moment().format("YYYY-MM-DD");

  let date = new Date(datenow);

  let start = new Date(profile.jobStartDate);
  let end = new Date(profile.jobEndDate);

  let Data={
    clientId:profile._id,
    link:DriveLink,
    folder:UploadName
  }as any
  // const urlPattern = new RegExp(DriveLink);
  const isValidUrl = urlString=> {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
  return !!urlPattern.test(urlString);
}
  const LinktoDrive = async (updatedData: any) => {
    console.log(updatedData)
    let headers = {
      "Accept": 'application/json',
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + localStorage.getItem('token')
    }
    return await fetch(API_BASE_URL + "addClientLink", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(updatedData),
    })
      .then(reD => reD.json())
      .then(resD => resD)
      .catch(err => err)
  }

  const onDriveLinkChange=(e)=>{
    if(e.target.name =="inputDrive"){
      setDriveLink(e.target.value)
      
    }
    
    if(e.target.name =="DriveLinkSubmit"){
      let Check = isValidUrl(DriveLink)
      if(Check){
        // setLinkDoc([...Links])
        LinktoDrive(Data).then((resD)=>{toast.success(resD.message);setTimeout(()=>{window.location.reload()},2000)})
      }else{
        return toast.error("Please Enter Valid Url!")
      }
     
      

      console.log(isValidUrl(DriveLink));
    }
  }
  console.log(documentList,"document")
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
                  <Link to="/clientContract">
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
            <div className="col-12 my-1 py-1 ClientSEE-TopDetails">
              <div className="row">
                <div className="col-2 pr-0 text-center">
                  {ClientImage !== "" ? (
                    <img
                      src={ClientImage}
                      className="imgSigned-upload-Download"
                    />
                  ) : (
                    <img
                      src={require("../../images/fullClientSee.svg").default}
                      className="imgSigned-upload-Download"
                    />
                  )}

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
                    <button className="SignedLargebtn">
                      <img
                        src={require("../../images/tickClientBtn.svg").default}
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
                      {profile.clientEmail
                        ? " Mail :" + profile.clientEmail
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
                  {profile.clientReferenceNumber != "" ? (
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
                      <div className="col-12 px-0">
                        <div className="row">
                          <div className="col-4">
                            <p className="CompanyAddres">Company Adress</p>
                          </div>
                          <div className="col-8">
                            <span className="Todo-ClinetCardMore-span">
                              :
                              {profile.clientAddress
                                ? profile.clientAddress
                                : "✘ No Address!"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center ">
                      <p className="blue-text">Research for work :</p>
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
                          ? " 📆" + profile.jobStartDate + "  To  " + profile.jobEndDate
                          : "⚠️" +
                            profile.jobStartDate +
                            "  To  " +
                            profile.jobEndDate}
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <p>Langues : </p>
                      <span className="Todo-ClinetCardMore-span">
                        {profile.clientLanguages.length
                          ? profile.clientLanguages.join(", ")
                          : " ✘ No Langues!"}
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <p>Voyage en voiture :</p>
                      <span className="Todo-ClinetCardMore-span">
                        {profile.candidatConduireEnFrance ? `✔ Yes` : "✘ No"}
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <p>Permis / Licence Drive :</p>
                      <span className="Todo-ClinetCardMore-span">
                        {profile.clientPermis ? `✔ Yes` : "✘ No"}
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
                          : "✘ Not Available!"}
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
                        :{" "}
                        {profile.salary_hours.length > 0
                          ? profile.salary_hours.includes(
                              profile.salary_hours.salaryPerHour
                            )
                            ? profile.salary_hours
                                .map((el) => {
                                  return el.salaryPerHour;
                                })
                                .slice(0, 1)
                            : "✘ No Salary"
                          : "✘ No Salary"}{" "}
                        €
                      </span>
                    </div>
                    <div className="d-flex ">
                      <p className="text-dark">Salaire net du salarié : </p>
                      <span className="Todo-ClinetCardMore-span">
                        {profile.salary_hours.length !== 0
                          ? profile.salary_hours.map((el) => (
                              <div className="d-flex">
                                {el.hours ? el.hours : "0"}H ={" "}
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
                      <p className="text-dark">Taux horraire :</p>
                      <span className="Todo-ClinetCardMore-span">
                        {profile.rate_hours.length !== 0
                          ? profile.rate_hours.map((el) => (
                              <div className="d-flex">
                                {el.hours ? el.hours : "0"}H ={" "}
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

            <div className="col-12 inPAdsBOX py-1">
              <div className="row">
                <div className="col-6 pt-2">
                  <p className="EmpWorking">
                    Employees working for this client :
                  </p>
                </div>
                {profile.employeesWorkingUnder !== null &&
                profile.employeesWorkingUnder.length > 0 ? 
                  profile.employeesWorkingUnder.map((el) => (
                <>    
                     {  el.candidatStatus == "Archived" ||  el.candidatStatus == "Pre-Selected" ?
                         
                        null
:                    
<>
  <div className="col-12 pb-1">
<div className="row">   
                   <div className="col-8 d-flex align-items-center">
<img
  style={{ width: "7%" }}
  className="pr-1"
  src={require("../../images/menSigned.svg").default}
/>
{ el.candidatStatus == "Archived" ||  el.candidatStatus == "Pre-Selected" ? null : el.candidatName }
<span className="pl-1">Since :</span>
{el.candidatName && el.candidatStatus == "Archived" ||el.candidatName && el.candidatStatus == "Pre-Selected" ? null : el.candidatCurrentWork.map((el) => el.workingSince ? el.workingSince :"✘ No Working Since!")}
<span className="pl-1">Salary :</span>
{el.candidatName && el.candidatStatus == "Archived" || el.candidatName && el.candidatStatus == "Pre-Selected" ? null : el.candidatCurrentWork.map((el) => el.salary ? el.salary : "0€")}
</div>

<div className="col-4 d-flex">
<button
  className="seeFullCandidat"
  onClick={(e) => viewFullProfile(el)}
>
  <img
    src={require("../../images/seeCan.svg").default}
  />
  See profile
</button>
<div className="col-1 px-0">
<button
      className="btn"   
      onClick={(e)=>{setDeleteModal(true);setDeleteEmp(el)}}
  >
      <img src={require("../../images/Deletebucket.svg").default} />
  </button>
</div>
</div>

</div>
</div>
</>
}
</>      ))
                  
                 : (
                  // <div className="col-12 pb-1 d-flex">
                  //   <img
                  //     className="pr-1"
                  //     src={require("../../images/menSigned.svg").default}
                  //   />
                  //   No Candidat! <span className="pl-1">Since :</span> Since No!
                  //   <span className="pl-1">Salary :</span> No Salary!
                  // </div>
                  <div className="col-12 pb-1 d-flex justify-content-center ">
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
                      <ErrorLoader /> No data available for Employees Working
                      under this Client !
                    </p>
                  </div>
                )}

<div className="col-12 pb-1">
                      <div className="row">
                        {
                          preSelect ?
                          preSelect.map((el)=>(
                            <>      <div className="col-4 d-flex align-items-center mb-1">
                            <img
                              style={{ width: "15%" }}
                              className="pr-1"
                              src={require("../../images/menSigned.svg").default}
                            /><p className="mb-0" style={{color:"#fd9e02"}}>
                            {el.candidatName.toLocaleUpperCase()}</p>
   
                            </div>
                            <div className="col-8 text-end">
                            <b     style={{
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "700",
                        fontSize: "10px",
                        lineHeight: "24px",
                        color: "#000000",
                      }}>"⚠️This Candidat is Preselected But Don't Work for the Company yet!"</b>
                            </div>
                            
                            </>
                            ))
                             :
                             null
                            
                        }
{Archived ?
                   Archived.map((el)=>(
<>      <div className="col-3 d-flex align-items-center">
<img
  style={{ width: "20%" }}
  className="pr-1"
  src={require("../../images/menSigned.svg").default}
/><p className="mb-0" style={{color:"red"}}>
{el.candidatName.toLocaleUpperCase()}</p>

</div>

<div className="col-9 text-end">
                            <b     style={{
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "700",
                        fontSize: "10px",
                        lineHeight: "24px",
                        color: "#000000",
                      }}>"⚠️This candidat previously worked for this company but have been archived, please reset to todo if something changed"</b>
                            </div>
</>
))
 :
 null

                      }
                      </div>
                      </div>
         

                {profile.employeesWorkingUnder !== null &&
                profile.employeesWorkingUnder.length > 0 ? (
                  <p className="mb-0">
                    Ads Spent on this client :
                    {profile.jobTotalBudget
                      ? profile.jobTotalBudget + "€"
                      : "✘ No Budget!"}
                  </p>
                ) : null}
              </div>
            </div>

            {/* <div className="col-12 pt-4">
                <div className="row">
                  <div className="col-5 pdf-btn">
                    <img src={require("../../images/doc.svg").default} />
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
                <div className="col-4 ml-1 text-center">
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
                <div className="row p-1">
                  <div className="col-4  d-grid ">
                    <label className="ClientPDFFormlabel">
                      $ numero contrat
                    </label>
                    <input
                      className="form-control inputStyling"
                      name="numero_contract"
                      value={
                        clientContract ? clientContract.numero_contract : ""
                      }
                      onClick={editClientProfile}
                      placeholder="‎ ‎ ‎ $ numero contrat"
                    />
                  </div>
                  <div className="col-4  d-grid ">
                    <label className="ClientPDFFormlabel">
                      $ initial Société client
                    </label>
                    <input
                      className="form-control inputStyling"
                      value={
                        clientContract
                          ? clientContract.initial_client_company
                          : ""
                      }
                      onClick={editClientProfile}
                      placeholder="‎ ‎ ‎ $ initial Société client"
                    />
                  </div>
                  <div className="col-4  d-grid ">
                    <label className="ClientPDFFormlabel">$ siret </label>
                    <input
                      className="form-control inputStyling"
                      value={clientContract ? clientContract.siret : ""}
                      onClick={editClientProfile}
                      placeholder="‎ ‎ ‎$ siret"
                    />
                  </div>
                  <div className="col-4  d-grid ">
                    <label className="ClientPDFFormlabel">$ numero TVA</label>
                    <input
                      className="form-control inputStyling"
                      name="candidatJob "
                      value={clientContract ? clientContract.numero_tva : ""}
                      onClick={editClientProfile}
                      placeholder="‎ ‎ ‎ $ numero TVA"
                    />
                  </div>
                  <div className="col-4  d-grid ">
                    <label className="ClientPDFFormlabel">$ nom gérant</label>
                    <input
                      className="form-control inputStyling"
                      name="cmp_candidat"
                      value={clientContract ? clientContract.nom_gerant : ""}
                      onClick={editClientProfile}
                      placeholder="‎ ‎ ‎ $ nom gérant"
                    />
                  </div>
                  <div className="col-4  d-grid ">
                    <label className="ClientPDFFormlabel">
                      $ telephone gerant
                    </label>
                    <input
                      className="form-control inputStyling"
                      name="contract_date"
                      value={
                        clientContract ? clientContract.telephone_gerant : ""
                      }
                      onClick={editClientProfile}
                      placeholder="‎ ‎ ‎ $ telephone gerant"
                    />
                  </div>
                  <div className="col-4  d-grid ">
                    <label className="ClientPDFFormlabel">
                      $ metier en Roumain
                    </label>
                    <input
                      className="inputStyling wHCompany form-control"
                      name="company_contact_name"
                      value={
                        clientContract ? clientContract.metier_en_roumain : ""
                      }
                      onClick={editClientProfile}
                      placeholder="‎ ‎ ‎ $ metier en Roumain"
                    />
                  </div>
                  <div className="col-4  d-grid ">
                    <label className="ClientPDFFormlabel">
                      $ metier en Français
                    </label>
                    <input
                      className="form-control inputStyling"
                      name="$ metier en Français"
                      value={
                        clientContract ? clientContract.metier_en_francais : ""
                      }
                      onClick={editClientProfile}
                      placeholder="‎ ‎ ‎ $ metier en Français"
                    />
                  </div>
                  <div className="col-4  d-grid ">
                    <label className="ClientPDFFormlabel">
                      $ date du debut de mission
                    </label>
                    <input
                      type="date"
                      className="form-control inputStyling"
                      name="serie_id"
                      value={clientContract ? clientContract.debut_date : ""}
                      onClick={editClientProfile}
                      placeholder="‎ ‎ ‎ $ date du debut de mission"
                    />
                  </div>
                  <div className="col-4  d-grid ">
                    <label className="ClientPDFFormlabel">
                      $ date de fin de mission
                    </label>
                    <input
                      type="date"
                      className="form-control inputStyling"
                      name="candidatAddress"
                      value={
                        clientContract ? clientContract.date_fin_mission : ""
                      }
                      onClick={editClientProfile}
                      placeholder="‎ ‎ ‎ $ date de fin de mission"
                    />
                  </div>
                  <div className="col-4  d-grid ">
                    <label className="ClientPDFFormlabel">
                      $ prix en euro / heure selon contract
                    </label>
                    <input
                      className="form-control inputStyling"
                      name="company_siret"
                      value={
                        clientContract ? clientContract.prix_per_heure : ""
                      }
                      onClick={editClientProfile}
                      placeholder="‎ ‎ ‎ $ prix en euro / heure selon contract"
                    />
                  </div>
                  <div className="col-4  d-grid ">
                    <label className="ClientPDFFormlabel">
                      $ SALAIRE EN EURO
                    </label>
                    <input
                      className="form-control inputStyling"
                      name="SALAIRE EN EURO"
                      value={clientContract ? clientContract.salaire_euro : ""}
                      onClick={editClientProfile}
                      placeholder="‎ ‎ ‎ $ SALAIRE EN EURO"
                    />
                  </div>
                  <div className="col-4  d-grid ">
                    <label className="ClientPDFFormlabel">
                      $ nombre d'heure négocie dans le contrat
                    </label>
                    <input
                      className="form-control inputStyling"
                      name="candidatAddress"
                      value={clientContract ? clientContract.nombre_heure : ""}
                      onClick={editClientProfile}
                      placeholder="‎ ‎ ‎ $ nombre d'heure négocie dans le contrat"
                    />
                  </div>
                  <div className="col-4  d-grid ">
                    <label className="ClientPDFFormlabel">
                      $ numero de tel du travailleur 1
                    </label>
                    <input
                      className="form-control inputStyling"
                      name="company_siret"
                      value={
                        clientContract ? clientContract.worker_number_1 : ""
                      }
                      onClick={editClientProfile}
                      placeholder="‎ ‎ ‎ $ numero de tel du travailleur 1"
                    />
                  </div>
                  <div className="col-4  d-grid ">
                    <label className="ClientPDFFormlabel">
                      $ Nom Du Travailleur 1
                    </label>
                    <input
                      className="form-control inputStyling"
                      name="worker_name_1"
                      value={clientContract ? clientContract.worker_name_1 : ""}
                      onClick={editClientProfile}
                      placeholder="‎ ‎ ‎ $ numero de tel du travailleur 1"
                    />
                  </div>
                  <div className="col-4  d-grid ">
                    <label className="ClientPDFFormlabel">
                      $ nom du travailleur 2{" "}
                    </label>
                    <input
                      className="form-control inputStyling"
                      name="serie_id"
                      value={
                        clientContract ? clientContract.worker_number_2 : ""
                      }
                      onClick={editClientProfile}
                      placeholder="‎ ‎ ‎ $ nom du travailleur 2 "
                    />
                  </div>
                  <div className="col-4  d-grid ">
                    <label className="ClientPDFFormlabel">
                      $ numero de tel du travailleur 2
                    </label>
                    <input
                      className="form-control inputStyling"
                      name="candidatAddress"
                      value={clientContract ? clientContract.worker_name_2 : ""}
                      onClick={editClientProfile}
                      placeholder="‎ ‎ ‎ $ numero de tel du travailleur 2"
                    />
                  </div>
                  <div className="col-4  d-grid ">
                    <label className="ClientPDFFormlabel">
                      $ nom du travailleur3
                    </label>
                    <input
                      className="form-control inputStyling"
                      name="company_siret"
                      value={
                        clientContract ? clientContract.worker_number_3 : ""
                      }
                      onClick={editClientProfile}
                      placeholder="‎ ‎ ‎ $ nom du travailleur3"
                    />
                  </div>{" "}
                  <div className="col-4  d-grid ">
                    <label className="ClientPDFFormlabel">
                      $ numero de tel du travailleur 3
                    </label>
                    <input
                      className="form-control inputStyling"
                      name="serie_id"
                      value={clientContract ? clientContract.worker_name_3 : ""}
                      onClick={editClientProfile}
                      placeholder="‎ ‎ ‎ $ numero de tel du travailleur 3"
                    />
                  </div>
                  <div className="col-4  d-grid ">
                    <label className="ClientPDFFormlabel">
                      $ nom du travailleur 4
                    </label>
                    <input
                      className="form-control inputStyling"
                      name="candidatAddress"
                      value={
                        clientContract ? clientContract.worker_number_4 : ""
                      }
                      onClick={editClientProfile}
                      placeholder="‎ ‎ ‎ $ nom du travailleur 4"
                    />
                  </div>
                  <div className="col-4  d-grid ">
                    <label className="ClientPDFFormlabel">
                      $ numero de tel du travailleur 4
                    </label>
                    <input
                      className="form-control inputStyling"
                      name="company_siret"
                      value={clientContract ? clientContract.worker_name_4 : ""}
                      onClick={editClientProfile}
                      placeholder="‎ ‎ ‎ $ numero de tel du travailleur 4"
                    />
                  </div>{" "}
                  <div className="col-4  d-grid ">
                    <label className="ClientPDFFormlabel">
                      $ nom du travailleur 5
                    </label>
                    <input
                      className="form-control inputStyling"
                      name="serie_id"
                      value={
                        clientContract ? clientContract.worker_number_5 : ""
                      }
                      onClick={editClientProfile}
                      placeholder="‎ ‎ ‎$ nom du travailleur 5"
                    />
                  </div>
                  <div className="col-4  d-grid ">
                    <label className="ClientPDFFormlabel">
                      $ numero de tel du travailleur 5
                    </label>
                    <input
                      className="form-control inputStyling"
                      name="candidatAddress"
                      value={clientContract ? clientContract.worker_name_5 : ""}
                      onClick={editClientProfile}
                      placeholder="‎ ‎ ‎ $ numero de tel du travailleur 5"
                    />
                  </div>
                  <div className="col-4  d-grid ">
                    <label className="ClientPDFFormlabel">
                      $ nom du travailleur 6
                    </label>
                    <input
                      className="form-control inputStyling"
                      name="company_siret"
                      value={
                        clientContract ? clientContract.worker_number_6 : ""
                      }
                      onClick={editClientProfile}
                      placeholder="‎ ‎ ‎$ nom du travailleur 6"
                    />
                  </div>{" "}
                  <div className="col-4  d-grid ">
                    <label className="ClientPDFFormlabel">
                      $ numero de tel du travailleur 6
                    </label>
                    <input
                      className="form-control inputStyling"
                      name="serie_id"
                      value={clientContract ? clientContract.worker_name_6 : ""}
                      onClick={editClientProfile}
                      placeholder="‎ ‎ ‎ $ numero de tel du travailleur 6"
                    />
                  </div>
                  <div className="col-4  d-grid ">
                    <label className="ClientPDFFormlabel">
                      $ nom du travailleur 7
                    </label>
                    <input
                      className="form-control inputStyling"
                      name="candidatAddress"
                      value={
                        clientContract ? clientContract.worker_number_7 : ""
                      }
                      onClick={editClientProfile}
                      placeholder="‎ ‎ ‎$ nom du travailleur 7"
                    />
                  </div>
                  <div className="col-4  d-grid ">
                    <label className="ClientPDFFormlabel">
                      $ numero de tel du travailleur 7
                    </label>
                    <input
                      className="form-control inputStyling"
                      name="company_siret"
                      value={clientContract ? clientContract.worker_name_7 : ""}
                      onClick={editClientProfile}
                      placeholder="‎ ‎ ‎ $ numero de tel du travailleur 7"
                    />
                  </div>
                  <div className="col-4  d-grid ">
                    <label className="ClientPDFFormlabel">
                      $ nom du travailleur 8
                    </label>
                    <input
                      className="inputStyling form-control"
                      name="companyAddress"
                      value={
                        clientContract ? clientContract.worker_number_8 : ""
                      }
                      onClick={editClientProfile}
                      placeholder="‎ ‎ ‎$ nom du travailleur 8"
                    />
                  </div>
                  <div className="col-4  d-grid ">
                    <label className="ClientPDFFormlabel">
                      $ numero de tel du travailleur 8
                    </label>
                    <input
                      className="inputStyling form-control"
                      name="companyAddress"
                      value={clientContract ? clientContract.worker_name_8 : ""}
                      onClick={editClientProfile}
                      placeholder="‎ ‎ ‎$ numero de tel du travailleur 8"
                    />
                  </div>
                  <div className="col-4  d-grid ">
                    <label className="ClientPDFFormlabel">
                      $ Poste du Gerant
                    </label>
                    <input
                      className="inputStyling form-control"
                      name="poste_du_gerant"
                      value={
                        clientContract ? clientContract.poste_du_gerant : ""
                      }
                      onClick={editClientProfile}
                      placeholder="‎ ‎ ‎$ Poste du Gerant"
                    />
                  </div>
                </div>
              ) : (
                <div className="col-12 d-flex justify-content-center align-items-center py-2">
                  <ErrorLoader />
                  <p className="mb-0 ErrorSearchBox">
                  ✘ No Contract Available for this Signed Client! Please add a
                    New Contract ✘
                  </p>
                </div>
              )}
            </div>
            <div className="col-12 Social-CardClient my-1">
              <div className="row px-1 pt-1 pb-0">
              <div className="col-4 d-flex align-items-center  px-0">
              <div className="d-flex">  <p className="DocShareLink mb-0">
                   Share this link with the client <br />
                    Patager ce lien avec le client
                  </p><div className="d-flex justify-content-center align-items-center " style={{paddingLeft:"5px"}}> <Share width={25} /><b className="pl-1"> :</b></div></div>  
                </div>
                <div className="col-8 pl-0">
                  <div className="DocShareLinkBackground p-1">
                    <Link className="LinkStyling" to={`/documentbox/${profile.clientCompanyName}/${profile._id}`} target="_blank">{API_BASE_URL + `documentbox/${profile.clientCompanyName.replaceAll(" ","%20")}/` + profile._id}</Link>
                  </div>
                </div>
                <div className="col-12 mt-2">
                  <Tabs
                    activeTab={activeTab}
                    onTabClick={onTabClick}
                    rightBtnIcon={">"}
                    hideNavBtns={false}
                    leftBtnIcon={"<"}
                    showTabsScroll={false}
                    tabsScrollAmount={7}
                  >
                    {/* generating an array to loop through it  */}
                    {tabItems.map((el, i) => (
                      <Tab key={i}>{el.text}</Tab>
                    ))}
                  </Tabs>

                  {}
                </div>
                <div className="row py-1" style={{ marginRight: "1px" }}>
                  {documentList.length > 0 ? (
                    documentList.map((doc, index) => (
                  <>
                     {
                      doc.documentName ?
                      <div className="col-6 mx-0">
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
                                    <img src={require("../images/dowBtn.svg").default} />
                                    {doc.originalName.length > 10 ? doc.originalName.slice(0, 11) + "..." : doc.originalName}
                                  </button>
                                } */}
                            <button
                              className="btnDownload"
                              onClick={(e) =>
                                ViewDownloadFiles(e,doc.url)
                              }
                            >
                              <img
                                src={require("../../images/dowBtn.svg").default}
                              />
                              {doc.originalName.length > 10
                                ? doc.originalName.slice(0, 11) + "..."
                                : doc.originalName}
                            </button>
                          </div>
                          <div className="col-2  d-flex align-item-end justify-content-end">
                            <img
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
                            <img
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
                      :             
      
                   null
                     }
                 
                      </>
                     
                      
                      
                      )
                    
                    )
                    
                  ) : progress > 0 &&
                    progress < 100 &&
                    documentList.length == 0 ? (
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
                            <img
                              src={require("../../images/editSvg.svg").default}
                              style={{
                                width: "20px",
                                marginRight: "5px",
                                cursor: "pointer",
                              }}
                              // onClick={() => renameDocument(doc._id, doc.documentName)}
                            />
                            <img
                              src={
                                require("../../images/Primaryfill.svg").default
                              }
                              style={{ width: "20px", cursor: "pointer" }}
                              // onClick={() => deleteDocument(doc._id, doc.documentName)}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="d-grid  justify-content-center align-items-center mb-0">
                      {" "}
                      <div className="d-flex justify-content-center">
                        {" "}
                        <img
                          src={require("../../images/docupload.svg").default}
                        />{" "}
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
                    {
                      documentList.map((Link, index) => (
                        Link.link && Link._id?
                       
                          <div className="col-6 mx-0">
                          <div className="row CardClassDownload mt-1 mx-0">
                            <div
                              className="col-4 d-flex align-items-center cursor-pointer"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title={Link.link}
                            >
                              <p className="download-font mb-0">
                                {Link.link.length > 30
                                  ? Link.link.slice(0, 28) + "..."
                                  : Link.link}
                              </p>
                            </div>
                            <div className="col-6 text-center">
                              {/* {progress > 0 && progress < 100  ?
                                    <ProgressBar className="mt-1" now={progress} label={`${progress}%`} />
                                    :
                                    <button className="btnDownload">
                                      <img src={require("../images/dowBtn.svg").default} />
                                      {Link.originalName.length > 10 ? Link.originalName.slice(0, 11) + "..." : Link.originalName}
                                    </button>
                                  } */}
                              <button
                                name="btnDownloadLink"
                                className="btnDownload"
                                onClick={(e) =>
                                  ViewDownloadFiles(e,Link.link)
                                }
                              >
                                <img
                                  src={require("../../images/dowBtn.svg").default}
                                />
                                {Link.link.length > 10
                                  ? Link.link.slice(0, 11) + "..."
                                  : Link.link}
                              </button>
                            </div>
                            <div className="col-2  d-flex align-item-end justify-content-end">
                            
                              <img
                                src={
                                  require("../../images/Primaryfill.svg").default
                                }
                                style={{ width: "20px", cursor: "pointer" }}
                                onClick={() =>
                                  deleteCandidatLink(Link._id)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        
                      
                      :
                      null
                      )
                      )
                     }
                    
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
                          <img
                            src={require("../../images/editSvg.svg").default}
                            style={{
                              width: "20px",
                              marginRight: "5px",
                              cursor: "pointer",
                            }}
                          />
                          <img
                            src={
                              require("../../images/Primaryfill.svg").default
                            }
                            style={{ width: "20px", cursor: "pointer" }}
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}
                 <div className="col-12 d-flex justify-content-center mt-2"> 
                
                          <FileUploader 
                      handleChange={FilesUploads}
                      name="clientDocuments"
                      label={`Upload ${UploadTextBtn} file Now`}
                      />
                  </div>
                  {PDFModal ? (
                    <PDFModalClient props={profile} closeModal={setPDFModal} />
                  ) : null}
                  {RenameDocStatus ? (
                    <RenameDoc
                      props={RenameData}
                      closepreModal={setRenameDocStatus}
                      path={"/clientSigned"}
                    />
                  ) : null}
                  {showPreSelectedModal ? (
                    <PreModalClient
                      props={PreSelectedData}
                      closepreModal={setShowInPreSelectedModal}
                      clientProps={profile}
                    />
                  ) : null}
                  {
                    deleteModal ? 
                    <ArchivedModal
                    props={DeleteEmp}
                    closeModal={setDeleteModal}
                    path={"/clientSigned"}
                    
                  />
                    :
                    null
                  }
                </div>
              </div>
            </div>
            <div
              className="col-12 Social-CardClient mb-1 "
              style={{ padding: "13px 26px" }}
            >
              <div className="row">
             <div className="col-3 px-0" style={{fontFamily: 'Poppins',
fontStyle: "normal",
fontWeight: "500",
fontSize: "14px",
lineHeight: "21px",
color: "#000000",
display:"flex",
alignItems:"center"}}><p className="mb-0">ORADD AN EXTERNAL LINK 
(GOOGLE DRIVE) :</p></div>
             <div className="col-5 px-0"><input name="inputDrive" placeholder="WWW.XXXXXX.COM" onChange={onDriveLinkChange} style={{background:"#D3D6DB",borderRadius:"20px",width:"100%",height:"100%",border:"0px",paddingLeft:"10px",paddingRight:"10px",fontFamily: 'Poppins',
fontStyle: "normal",
fontWeight: "500",
fontSize: "14px",}} />
</div>
             <div className="col-4"><button name="DriveLinkSubmit" onClick={(e)=>{onDriveLinkChange(e)}} className="LinkAsDocument">add this link as document</button></div>
             </div>
              </div>
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
                >
                
                  {contrat_client ? null : (
                    <Tab className="redColorStyling"> ⚠️ CONTRAT CLIENT IS MISSING / MANQUANT</Tab>
                  )}
                  {contrat_employes ? null : (
                    <Tab className="redColorStyling">⚠️ CONTRATS EMPLOYES IS MISSING / MANQUANT</Tab>
                  )}
                  {id_card_employer ? null : (
                    <Tab className="redColorStyling">⚠️ Id Card Employes IS MISSING / MANQUANT</Tab>
                  )}
                  {al ? null : <Tab className="redColorStyling">⚠️ A1 IS MISSING / MANQUANT</Tab>}
                  {contrats_assurances_employes ? null : (
                    <Tab className="redColorStyling">
                      ⚠️ CONTRATS ASSURANCES EMPLOYES IS MISSING / MANQUANT
                    </Tab>
                  )}
                  {sispi ? null : <Tab className="redColorStyling">⚠️ SISPI IS MISSING / MANQUANT</Tab>}
                  {document_de_represntation ? null : (
                    <Tab className="redColorStyling">
                      ⚠️ DOCUMENT DE REPRESENTANCE / REPRESENTATION IS MISSING /
                      MANQUANT
                    </Tab>
                  )}
                  {offre_signee ? null : (
                    <Tab className="redColorStyling">⚠️ OFFRE SIGNEE / QUOTES IS MISSING / MANQUANT</Tab>
                  )}
                  {attestations_societe_intermann ? null : (
                    <Tab className="redColorStyling">
                      ⚠️ ATTESTATIONS SOCIETE INTERMANN WORK S.R.L IS MISSING /
                      MANQUANT
                    </Tab>
                  )}
                  {cvs ? null : <Tab className="redColorStyling">⚠️ CVS IS MISSING / MANQUANT</Tab>}
                  {autres_documents ? null : (
                    <Tab className="redColorStyling">⚠️ AUTRES DOCUMENTS / OTHER IS MISSING / MANQUANT</Tab>
                  )}
                  {factures ? null : (
                    <Tab className="redColorStyling">⚠️ FACTURES IS MISSING / MANQUANT</Tab>
                  )}
                  {rapport_activite ? null : (
                    <Tab className="redColorStyling">⚠️ RAPPORT ACTIVITE IS MISSING / MANQUANT</Tab>
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
                    <Tab className="redColorStyling"> ⚠️ REGES IS MISSING / MANQUANT</Tab>
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
export default Signed;
