import React,{useState,useEffect} from 'react'
import { useNavigate, useParams } from "react-router";
import { API_BASE_URL } from "../../config/serverApiConfig";
import "../../CSS/AddClient.css"
import "../../CSS/Candidatefile.css"
import Loader from "../../components/Loader/loader"
import ProfileLoader from "../../components/Loader/ProfilesLoader" 
import PDFreader from '../../components/AddClientRating/PDFreader';
import $ from "jquery"
import CountDown from "../../../src/components/Loader/CountDown"
// import { GetRoute } from '../../components/ApisFunction/FunctionsApi';
let ContractData={
  id:"",
  filePath:"",
  public_id:"",
  user:""
}
function  ViewOffer(){
    const [ContractSignData,setContractSignData]=useState(ContractData)as any
    const [pdfTimeOut,setpdfTimeOut]=useState(false)
    const { id } = useParams();
    const { ClientEmp } = useParams();
    const [profile, setProfile] = useState([])as any;
    const [Clientprofile, setClientProfile] = useState()as any;
    const [pdfUrl,setUrl]=useState()as any
    
  const navigate = useNavigate()
  const header ={
    "Accept": 'application/json',
    'Content-Type': 'application/json',
    "Authorization": "Bearer " + localStorage.getItem('token')
  }
  const GetRoute =async(id)=>{
    return   await fetch(API_BASE_URL +`get-offer/?offerId=${id}`,{
      method: "GET",
      headers:header ,
     })
     .then(res=>res.json())
     .then(res=>res)
     .catch(err=>err)
  }

      useEffect(()=>{
        setTimeout(()=>{
          setpdfTimeOut(true)
        },5000)
          
   
   
      })
      useEffect(() => {
        $(function() {
          setTimeout(function() { $("#hideDiv").fadeOut(1500);}, 15000)
          
          })
          $(function() {
            setTimeout(function() { $("#hideDivPc").fadeOut(1500);}, 7000)
            
            })
  
 
      GetRoute("63da395881a2b57141df3f34").then((resData) => {
        if (resData.status == true) {
          // setProfile(resData.data)
          setUrl(resData.filepath.replace("/app/",""))
            setProfile(resData.data); 
          
           
        } else {
          return false;
        }
      })
  
    

        },[id,profile]);
        console.log(pdfUrl)


      const SignDocu =(e)=>{
        ContractData.user=ClientEmp
        ContractData.filePath=pdfUrl
        ContractData.id=ClientEmp === "Candidate" ? profile.candidatContract._id : Clientprofile?.clientContract?._id
   
        navigate("/ContractSigend",{state:ContractSignData})
      }

return (
    <>
      <div id="hideDiv">
        <div className='d-grid justify-content-center align-items-center'>
        <p className='mb-0 d-flex justify-content-center align-items-end'>Nu închideți pagina, poate dura până la 1 minut. Doar așteaptă!<br/>Veuillez ne pas fermer la page cela peut prendre 1mn</p>
  <div className='d-flex justify-content-center'>
   <CountDown />
   </div>
   </div>
   </div>
   <div id="hideDivPc">
        <div className='d-grid justify-content-center align-items-center'>
        <p className='mb-0 d-flex justify-content-center align-items-end'>Nu închideți pagina, poate dura până la 1 minut. Doar așteaptă!<br/>Veuillez ne pas fermer la page cela peut prendre 1mn</p>
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
                src={require("../../images/logo-header.svg").default}
                className="filter-logo"
                style={{ width: "150%" }}
              />
            </span>
            <img
              src={require("../../images/LogoName.svg").default}
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
            ✒️ incepe  CONTRACTUL(sign)
            </button>
            :
            <div className="col-12 d-flex justify-content-center px-1">    <ProfileLoader  width ={150} height={100} fontSize={"12px"} fontWeight={"600"}  Title={null}/>     </div>}   
           
          
         
         </div>
        </div>
      
    </div>

    
    </>
)

}
export default ViewOffer;