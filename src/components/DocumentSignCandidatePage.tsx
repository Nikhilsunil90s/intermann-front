import React,{useState,useEffect} from 'react'
import { useNavigate, useParams } from "react-router";
import { API_BASE_URL } from "../config/serverApiConfig";
import "../CSS/AddClient.css"
import "../CSS/Candidatefile.css"
import Loader from "../components/Loader/loader"
import ProfileLoader from "../components/Loader/ProfilesLoader" 
import PDFreader from './AddClientRating/PDFreader';
import $ from "jquery"
import CountDown from "../../src/components/Loader/CountDown"
let ContractData={
  id:"",
  filePath:"",
  public_id:""
 
}
function  DocumentSign(){
    const [ContractSignData,setContractSignData]=useState(ContractData)as any
    const [pdfTimeOut,setpdfTimeOut]=useState(false)
    const { id } = useParams();
    const [profile, setProfile] = useState([])as any;
    const [pdfUrl,setUrl]=useState()as any
    

console.log(API_BASE_URL + pdfUrl,"url")

  const navigate = useNavigate()


    useEffect(() => {
      $(function() {
        setTimeout(function() { $("#hideDiv").fadeOut(2000);}, 15000)
        
        })
        $(function() {
          setTimeout(function() { $("#hideDivPc").fadeOut(1500);}, 4000)
          
          })

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
        },5000)
          
   
   
      })
      const SignDocu =(e)=>{
        ContractData.filePath=pdfUrl
        ContractData.id=profile.candidatContract._id
   
        navigate("/ContractSigend",{state:ContractSignData})
      }

    const fetchCandidat = async (candidatId: any) => {
        return await fetch(API_BASE_URL + `getCandidatDetailsById/?candidatId=${candidatId}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
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
            'Content-Type': 'application/json',
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
          .then((resp) => resp.json())
          .then((respData) => {setUrl(respData.filePath.replace("/app/",""));setUrl(respData.filePath.replace("http","https"));ContractData.public_id=respData.public_id})
          .catch((err) => err);
      };

    const onError=()=>{
     return  'error in file-viewer'
    } 
    console.log(pdfUrl,"pdf")
return (
    <>
      <div id="hideDiv">
        <div className='d-grid justify-content-center align-items-center'>
        <p className='mb-0 d-flex justify-content-center align-items-end'>Please wait while we are processing your request....</p>
  <div className='d-flex justify-content-center'>
   <CountDown />
   </div>
   </div>
   </div>
   <div id="hideDivPc">
        <div className='d-grid justify-content-center align-items-center'>
        <p className='mb-0 d-flex justify-content-center align-items-end'>Please wait while we are processing your request....</p>
  <div className='d-flex justify-content-center'>
   <CountDown />
   </div>
   </div>
  </div>
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
         <div className='col-12 d-flex justify-content-center  overFlowHeight' style={{msOverflowY:"scroll"}}>
       
      {pdfUrl ?
      <>
      <div className='iFrameView'>
<iframe  src={pdfUrl} style={{width:"90vw",height:"61vh"}} /> 
</div>
<div className='PdfViewMobileRes'>

<PDFreader  props={pdfUrl}  />
</div>
</>
:


<Loader />

      }  
         </div>
         {/* {
            ContractSignModal ? 
             <DocSignCandidate  props={profile.candidatContract._id} closeModal={setContractSignModal} />

            :

            null
        } */}
         <div className='col-12 footerDocSign bg-ContractPage'>
          {
            pdfTimeOut ? 

            <button className='btn' onClick={(e)=>SignDocu(e)}>
            ✒️ incepe  CONTRACTUL(sign the contract)
            </button>
            :
            <div className="col-12 d-flex justify-content-center px-1">    <ProfileLoader  width ={150} height={100} fontSize={"12px"} fontWeight={"600"}  Title={null}/>     </div>}   
           
          
         
         </div>
        </div>
      
    </div>

    
    </>
)

}
export default DocumentSign;