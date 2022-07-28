import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import "../../CSS/Client/ClientSeepage.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InProgressClientModal from "../../components/Modal/InProgressClientModal";
import ArchivedClientModal from "../../components/Modal/ArchivedClientModal";
import ProfileLoader from "../../components/Loader/ProfilesLoader";
import axios from "axios";
import { ProgressBar } from "react-bootstrap";
import RenameDoc from '../../components/Modal/RenameDoc_Modal'
import UploadDow from '../../components/Modal/SelectUploadDownload'
import { Toaster, toast } from 'react-hot-toast';
import { API_BASE_URL } from '../../config/serverApiConfig';


const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
})
let RenameData=[]
function ClientSee() {
 
  const notifyDocumentUploadSuccess = () => toast.success("Document Uploaded Successfully!");
  const notifyDocumentDeleteSuccess = () => toast.success("Document Removed Successfully!");
 
  const notifyDocumentUploadError = () => toast.error("Document Upload Failed! Please Try Again in few minutes.")
  const notifyDocumentDeleteError = () => toast.error("Document Not Removed! Please Try Again in few minutes.")


  const navigate = useNavigate();
  const { state } = useLocation();
  const [profile, setProfile] = useState<any>(state)
  const [showInProgressModal, setShowInProgressModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false)
  const [documentsList, setDocumentsList] = useState([]);
  const [RenameDocStatus,setRenameDocStatus]=useState(false)
  const [documentList, setDocumentList] = useState([]);
  const hiddenFileInput = React.useRef(null);
  const [candidatDocument, setCandidatDocument] = useState("");
  const [progress, setProgress] = useState<any>(0);
  const [docUploaded, setDocUploaded] = useState(false);
  const [renameDoc, setRenameDoc] = useState(false);
  const [candidatImage, setCandidatImage] = useState(profile.clientPhoto && profile.clientPhoto?.imageName !== undefined ? profile.clientPhoto?.imageName : "");
  const [loader, setLoader] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [clientList, setClientList] = useState([]);

  const editClientProfile = () => {
    navigate("/clientToDoEdit", { state: profile });
  }




  const  ViewDownloadFiles =( documentName:any)=>{
    window.open(API_BASE_URL + documentName)
   }


  const fileChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | any
    >
  ) => {
    if (e.target.name === 'candidatPhoto') {
      console.log(e.target.files,"e.target.files")
      console.log(e.target.files[0],"e.target.files[]")
      const fileUploaded = e.target.files[0]
      let formdata = new FormData();
      formdata.append('candidatId', profile._id)
      formdata.append('image', fileUploaded)
      axiosInstance.post("uploadCandidatImage", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": "Bearer " + localStorage.getItem('token')
        }
      })
        .then(datares => {
          console.log(datares)
          if (datares.data.status) {
            
            console.log(datares.data.status,"datares.data.status")
     // setCandidatImage(datares.data.filename)
     notifyDocumentUploadSuccess()

     
            setTimeout(()=>{
              window.location.href = "/todoprofile"
            },2000)
          } else {
            notifyDocumentUploadError()
          }
        })
        .catch(err => { console.log(err) })
      return;
    }
    if (e.target.name === 'candidatDocuments') {
      const fileUploaded = e.target.files[0];
      setCandidatDocument(fileUploaded)
      let formdata = new FormData();
      formdata.append('candidatId', profile._id)
      formdata.append('document', fileUploaded)
      axiosInstance.post("uploadCandidatDocuments", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": "Bearer " + localStorage.getItem('token')
        },
        onUploadProgress: data => {
          //Set the progress value to show the progress bar
          setProgress(Math.round((100 * data.loaded) / data.total))
        },
      })
        .then(resData => {
          if (resData.data.status) {
            console.log(resData.data,"resData")
            setDocUploaded(true);
            setProgress(0); 
            notifyDocumentUploadSuccess();
          } else {
            console.log(resData)
            setDocUploaded(false);
          }
        })
        .catch(err => {
          console.log(err)
          setDocUploaded(false);

        })
      return;
    }
  }
  const handleFileUpload = () => {
    hiddenFileInput.current.click();
  }

  const deleteCandidatDocument = async (docId: any, docName: any, candidatId: any) => {
    let headers = {
      "Accept": 'application/json',
      "Authorization": "Bearer " + localStorage.getItem('token')
    }
    return await fetch(API_BASE_URL + `deleteDocument/?documentId=${docId}&documentName=${docName}&candidatId=${candidatId}`, {
      method: "GET",
      headers: headers
    })
      .then(reD => reD.json())
      .then(resD => resD)
      .catch(err => err)
  }
  const deleteDocument = async (docId: any, docName: any) => {
    await deleteCandidatDocument(docId, docName, profile._id).then(resData => {
      console.log(resData);
      if (resData.status) {
        notifyDocumentDeleteSuccess()
        setDocumentList([...documentList.filter((doc) => {
          return doc.documentName !== docName
        })])
      } else {
        notifyDocumentDeleteError()
      }
    }).catch(err => {
      console.log(err)
    })
  }

  const renameDocument = (docId: any, docName: any ,originalName:any) => {
    setRenameDoc(true);

    RenameData=[
      docId,
      docName,
      profile._id,
      originalName
    ]
    // renameCandidatDocument(docId, docName, profile._id).then(resData => {
    //   console.log(resData)
    //   setRenameDoc(false);
    // }).catch(err => {
    //   console.log(err)
    // })
  }
  const fetchRecommendations = async (candidatSector: string) => {
    return await fetch(API_BASE_URL + `clientRecommendations/?candidatSector=${candidatSector}`, {
      method: "GET",
      headers: {
        "Accept": 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
    })
      .then(resp => resp.json())
      .then(respData => respData)
      .catch(err => err)
  }
  useEffect(() => {
    setLoader(true);
    fetchRecommendations(profile.candidatActivitySector)
      .then(respData => {
        if (respData.status) {
          setRecommendations([...respData.data]);
          setClientList([...respData.data]);
          setLoader(true);
        } else {
          setRecommendations([])
          setLoader(false);

        }
      })
      .catch(err => {
        console.log(err)
      })
  }, [state])
  

  const fetchCandidat = async (candidatId: any) => {
    return await fetch(API_BASE_URL + `getCandidatById/?candidatId=${candidatId}`, {
      method: "GET",
      headers: {
        "Accept": 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
    })
      .then(resp => resp.json())
      .then(respData => respData)
      .catch(err => err)
  }

  useEffect(() => {
    console.log(profile._id,"id")
    console.log(documentList,"doc")
    fetchCandidat(profile._id).then(resData => {
      console.log(resData)

      setCandidatImage("")
      if (resData.status) {
        setProfile(resData.data)
        setDocumentList([...resData.data.candidatDocuments])
        setCandidatImage(resData.data.candidatPhoto !== undefined ? resData.data.candidatPhoto?.documentName : "")
        setDocUploaded(false);
      } else {
        setDocumentList([...documentList])
        setDocUploaded(false);
      }
    })
      .catch(err => {
        console.log(err)
      })
  }, [docUploaded])
  // useEffect(() => {
  //   window.scroll({
  //     top: 0,
  //     left: 0,
  //     behavior: "smooth",
  //   });
  //   console.log(profile)
  // });
  return (
    <>
      <div className="containet-fluid">
        <div className="row">
          <div className="col-12 top-pd text-center">
            <h1 style={{ textDecoration: 'underline' }}>CLIENT FILE: {profile.clientCompanyName}</h1>
          </div>
          <div className="col-6">
            <div className="stable">
              <Link to="/clientTodo">
                <button type="button" className="btn bg-btn">
                  <img src={require("../../images/return.svg").default} />
                  Return to Client TO DO List
                </button>
              </Link>
            </div>
          </div>
          <div className="col-6 d-flex align-items-center justify-content-center  text-end ">
            <button className="btn btn-bgb" onClick={editClientProfile}>
              <img src={require("../../images/Edit.svg").default} />
              Edit Profile
            </button>
          </div>
          <div className="bg-class">
            <div className="col-12 p-3 bg-color-card">
              <div className="row">
              <div className="logo-bg">
              <img
                      src={require("../images/menlogos.svg").default}
                     className="img-uploadTodo-Download"
                    />
                 
                  </div>
                {/* <button type="button" className="btn btn-upload">
                    UPLOAD PHOTO
                  </button> */}
                <div className="col-5 card-xl">
                  <p>Company : {profile.clientCompanyName}</p>
                  <p>Number of Positions : {profile.numberOfPosts}</p>

                  <p>Secteur : {profile.clientActivitySector}</p>
                  <p>Métier/Job : {profile.clientJob}</p>
                  <p style={{ width: "145%" }}>
                    Contact Name : {profile.clientReferenceName}
                  </p>
                </div>
                <div className="col-4 text-end end-class">
                  <div>
                    <button type="button" className="btn btn-gray">
                      TO DO
                    </button>
                  </div>
                  <p className="fw-bold">Lead pas encore traité</p>
                  <p>Ce lead est en sommeil, pas traité</p>
                </div>
              </div>
            </div>

            <div className="col-12 box-size">
              <div className="row">
                <div className="col-6 text-center">
                  <p>Company Mail : {profile.clientEmail}</p>
                  <button className="btn btn-email">
                    <span className="padding-email">
                      <img src={require("../../images/gmail.svg").default} />
                    </span>
                    Send Mail
                  </button>
                  <p>Contact Mail :  {profile.clientEmail}</p>
                  <button className="btn btn-primary btn-email">
                    <span className="padding-email">
                      <img src={require("../../images/gmail.svg").default} />
                    </span>
                    Send Email
                  </button>
                </div>

                <div className="col-6">
                  <p>Company Phone : {profile.clientPhone}</p>
                  <button className="btn btn-whatsapp btn-see">
                    <span className="padding-email">
                      <img src={require("../../images/whatsapp.svg").default} />
                    </span>
                    Send What’s App
                  </button>
                  <p>Contact Phone : {profile.clientReferenceNumber} </p>
                  <button className="btn btn-whatsapp btn-see">
                    <span className="padding-email">
                      <img src={require("../../images/whatsapp.svg").default} />
                    </span>
                    Send What’s App
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="parent-p">
                <div className="d-flex">
                  <p>Company Adress </p>
                  <span>: {profile.clientAddress}</span>
                </div>
                <div className="d-flex ">
                  <p className="">Langues </p>
                  <span className="">: {profile.clientLanguages}</span>
                </div>
                <div className="d-flex">
                  <p className="blue-text">Research for work</p>
                  <span className="blue-text">
                    :   From {profile.jobStartDate != "" ? profile.jobStartDate : "___"} To {profile.jobEndDate != "" ? profile.jobEndDate : "___"}
                  </span>
                </div>
                <div className="d-flex">
                  <p>Note </p>
                  <span>
                    : {profile.clientRequiredSkills != "" ? profile.clientRequiredSkills : "Not Available!"}
                  </span>
                </div>
                <div className="d-flex pt-4">
                  <p className="text-dark">Potential Turnover CA</p>
                  <span className="text-dark">
                    :  {profile.jobTotalBudget}  €
                  </span>
                </div>
                <div className="d-flex">
                  <p className="text-dark">Salary by person </p>
                  <span className="text-dark">
                    :  {profile.netSalary}  €
                  </span>
                </div>
                <div>
                  <p>
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
                  </p>
                </div>
                <div>
                  <p>
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
                  </p>
                </div>

                <div className="d-flex">
                  <p style={{ marginBottom: "0px" }}>Ajouté par/Added by :</p>
                  <span style={{ marginBottom: "0px" }}>
                    {profile.enteredBy}
                  </span>
                </div>
              </div>

              <p className="f-text text-dark">
                Note : Who entred this candidates/employe on the database
              </p>
              <div className="col-12 pt-4">
                <div className="row">
                  <div className="col-5 pdf-btn">
                    <img src={require("../../images/doc.svg").default} />
                    <span>Add document about this client </span>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-6 mb-3">
                    <p className="poppins">
                      Par exemple : Contrat signé; Offre signé...
                    </p>
                    <span className="poppins">
                      PDF; Word; PNG; Excel etc ...
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-3 text-center">
                    <button type="button" className="btn btn-move">
                      Move to in Progress
                    </button>
                    {showInProgressModal ?
                      <InProgressClientModal props={profile} closeModal={setShowInProgressModal} /> : null
                    }
                    <p className="italic-font">Si on lance les recherches</p>
                  </div>
                  <div className="col-3 text-center">
                    <button type="button" className="btn btn-red">
                      Archive / Canceleld
                    </button>
                    {showArchiveModal ?
                      <ArchivedClientModal props={profile} closeModal={setShowArchiveModal} path={"/clientToDoProfile"} /> : null
                    }
                    <p className="italic-font">Si plus d’actualité</p>
                  </div>
                  <div className="col-3 text-center">
                    <button type="button" className="btn btn-black" onClick={editClientProfile}>
                      <img src={require("../../images/Edit.svg").default} />
                      Edit Profile
                    </button>
                    <p className="italic-font text-start">Editer le Profil</p>
                  </div>
                  <div className="col-3 text-center">
                    <a href="https://www.canva.com/design/DAFA2NwkHSw/p4I45NInV69YG9HKrS3TGw/edit" target="_blank" type="button" className="btn btn-contract">
                      <img
                        src={require("../../images/contract-pg.svg").default}
                        style={{ paddingRight: "10px" }}
                      />
                      Créer Offre
                    </a>
                    <p style={{ width: "106%" }}>Créer une Offre avec Canva</p>
                  </div>
                  <div className="col-3">
                    <a href="https://drive.google.com/drive/folders/1MqR9nDBLtpl_xMCmVGmcy5g0T3noPhgZ" target="_blank" type="button" className="btn btn-career">
                      <span>
                        <img
                          src={require("../../images/contractPage.svg").default}
                        />
                      </span>

                      Créer Contrat
                    </a>
                    <p style={{ width: "106%" }}>Créer un contrat avec Drive</p>
                  </div>
                  <div className="col-3">
                    <a href="https://docs.google.com/spreadsheets/d/14xzXy9FD5V7ASYfYZg1kPmHSGvPqr4APfIWP_S9r_tI/edit#gid=0" target="_blank" type="button" className="btn btn-grille">
                      <img
                        src={require("../../images/salary.svg").default}
                        style={{ paddingRight: "10px" }}
                      />
                      Grille de prix
                    </a>
                    <p style={{ padding: "0px 30px", color: "#ff0000" }}>
                      Accès réstreint à Jeremy & Pat
                    </p>
                  </div>
                  <div className="col-12 Social-Card mt-1">
              <div className="row justify-content-center">
                <div className="col-12 d-flex justify-content-center">
                  <button className="CandidateCV" onClick={handleFileUpload}>
                    <div className="col-8" >
                      <img src={require("../images/Upload+text.svg").default} />
                    </div>
                  </button>
                  <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={fileChange}
                    name="candidatDocuments"
                    style={{ display: 'none' }}
                  />
                </div>
                <div className="col-12 mb-1">
                  <div className="row">

                    <div className="col-6  pr-0 mb-1">
                      <p className="candidatecVs pt-2">Candidate CV & Other Document</p>
                    </div>
                  </div>
                  <div className="row" style={{ marginRight: '1px' }}>
                    {
                      documentList.length > 0  ?
                        documentList.map((doc, index) =>
                          <div className="col-6 mx-0">
                            <div className="row CardClassDownload mt-1 mx-0">
                              <div className="col-4 d-flex align-items-center ">
                                <p className="download-font mb-0">{doc.originalName}</p>
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
                                     <button className="btnDownload" onClick={()=>ViewDownloadFiles( doc.documentName)}>
                                    <img src={require("../images/dowBtn.svg").default} />
                                    {doc.originalName.length > 10 ? doc.originalName.slice(0, 11) + "..." : doc.originalName}
                                  </button>
                              </div>
                              <div className="col-2  d-flex align-item-end justify-content-end">
                                <img
                                  src={require("../images/editSvg.svg").default}
                                  style={{ width: "20px", marginRight: "5px", cursor: 'pointer' }}
                                  // onClick={() => renameDocument(doc._id, doc.documentName)}
                                  onClick={()=>{setRenameDocStatus(true);renameDocument(doc._id, doc.documentName,doc.originalName)}}
                                />
                                <img
                                  src={require("../images/Primaryfill.svg").default}
                                  style={{ width: "20px", cursor: 'pointer' }}
                                  onClick={() => deleteDocument(doc._id, doc.documentName)}
                                />
                              </div>
                            </div>
                          </div>
                        ) :
                        progress > 0 && progress < 100 && documentList.length == 0?
                        <div className="col-6 mx-0">
                        <div className="row CardClassDownload p-0 mt-1 mx-0">
                          <div className="col-4 pr-0 d-flex align-items-center ">
                        <ProfileLoader width={"90"} height={"56px"} fontSize={"12px"} fontWeight={600} Title={"Uploading!"}/>
                          </div>
                          <div className="col-6 text-center  mb-0" style={{marginTop:"21px"}}>
                              <ProgressBar className="mb-0" now={progress} label={`${progress}%`} />
                          </div>
                          <div className="col-2  d-flex align-item-end justify-content-end">
                            <img
                              src={require("../images/editSvg.svg").default}
                              style={{ width: "20px", marginRight: "5px", cursor: 'pointer' }}
                              // onClick={() => renameDocument(doc._id, doc.documentName)}
                            />
                            <img
                              src={require("../images/Primaryfill.svg").default}
                              style={{ width: "20px", cursor: 'pointer' }}
                              // onClick={() => deleteDocument(doc._id, doc.documentName)}
                            />
                          </div>
                        </div>
                      </div>
                      :  
<p className="text-center">No Documents Uploaded!</p>
   
                    }
    {progress > 0 && progress < 100 && documentList.length > 0 ?
                        <div className="col-6 mx-0">
                        <div className="row CardClassDownload p-0 mt-1 mx-0">
                          <div className="col-4 pr-0 d-flex align-items-center ">
                        <ProfileLoader width={"90"} height={"56px"} fontSize={"12px"} fontWeight={600} Title={"Uploading!"}/>
                          </div>
                          <div className="col-6 text-center  mb-0" style={{marginTop:"21px"}}>
                              <ProgressBar className="mb-0" now={progress} label={`${progress}%`} />
                          </div>
                          <div className="col-2  d-flex align-item-end justify-content-end">
                            <img
                              src={require("../images/editSvg.svg").default}
                              style={{ width: "20px", marginRight: "5px", cursor: 'pointer' }}
                            />
                            <img
                              src={require("../images/Primaryfill.svg").default}
                              style={{ width: "20px", cursor: 'pointer' }}
                            />
                          </div>
                        </div>
                      </div>
                        :
                      
                 null 
                  

                          }
                          {
                            RenameDocStatus? 
                            <RenameDoc  props={RenameData} closepreModal={setRenameDocStatus}  path={"/todoprofile"}/>
                            :
                            null
                          }
              
                  </div>
                </div>


              </div>
            </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ClientSee;
