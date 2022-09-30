import React,{useState,useEffect} from 'react'
import DocSignCandidate from '../components/Modal/DocSignCandidate'
import { PDFViewer } from 'react-view-pdf';
import { useParams } from "react-router";
import { API_BASE_URL } from "../config/serverApiConfig";
import FileViewer from 'react-file-viewer';
import "../CSS/AddClient.css"
import "../CSS/Candidatefile.css"
import Loader from "../components/Loader/loader"
import ErrorLoader from '../pages/ErrorPages/Error404';

function  DocumentSign(){
    const [ContractSignModal,setContractSignModal]=useState(false)
    const [pdfTimeOut,setpdfTimeOut]=useState(false)
    const { id } = useParams();
    const [profile, setProfile] = useState([])as any;
    const [pdfUrl,setUrl]=useState()as any
    useEffect(() => {
      if(profile.length == 0){
  
     fetchCandidat(id).then((resData) => {
              if (resData.status == true) {
                // setProfile(resData.data)
              
                  setProfile(resData.data);
                  fetchThePDF(resData.data.candidatContract._id)
              } else {
                return false;
              }
            })
      
            .catch((err) => {
              console.log(err);
            }); 
          } 

  
      },[id,profile]);

      useEffect(()=>{
        setTimeout(()=>{
          setpdfTimeOut(true)
        },4000)
          

   
      })

      console.log(pdfUrl,"pdf")

  
      console.log(profile,"props")

    const fetchCandidat = async (candidatId: any) => {
        return await fetch(API_BASE_URL + `getCandidatById/?candidatId=${candidatId}`, {
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
          const fetchThePDF = async (id:any) => {
        return await fetch(API_BASE_URL + `getContract/?contractId=${id}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
          .then((resp) => resp.json())
          .then((respData) => setUrl(respData.filePath))
          .catch((err) => err);
      };

    const onError=()=>{
     return  'error in file-viewer'
    } 

return (
    <>
    <div className='container-fluid'>
        <div className='row'>
         <div className='col-12 d-flex justify-content-center  bg-ContractPage p-2'>
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
         <div className='col-12 d-flex justify-content-center mt-1 overFlowHeight' style={{overflow:"scroll",height:"64vh"}}>
       
      {pdfTimeOut ?

<FileViewer
filePath={pdfUrl}
fileType={'pdf'}
onError={onError}
/>

:


<Loader />

      }  
         </div>
         {
            ContractSignModal ? 
             <DocSignCandidate  props={profile.candidatContract._id} closeModal={setContractSignModal} />

            :

            null
        }
         <div className='col-12 footerDocSign bg-ContractPage'>
          <button className='btn' onClick={(e)=>setContractSignModal(true)}>
          ✒️ incepe  CONTRACTUL(sign the contract)
          </button>
         </div>
        </div>
      
    </div>

    
    </>
)

}
export default DocumentSign;