import React, {useRef,useState} from "react";
import "../../CSS/Client/ArchivedCardClient.css"
import ErrorLoader from '../../components/Loader/SearchBarError'
import SignatureCanvas from 'react-signature-canvas'
import { styled } from "precise-ui/dist/es6";
import { Toast } from "react-bootstrap";
import { API_BASE_URL } from "../../config/serverApiConfig";
import toast from "react-hot-toast";

function DocSignCandidate({ props, closeModal }) {
    const [Sign,setSign]=useState()as any
console.log(props)
  const [contractID]=useState(props)
    const SignSave=()=>{
        setSign(SignPad.current.toDataURL())
    }
    let Data={
        contractId:contractID,
        signature:Sign
    }

    const SignPad =useRef(undefined)
    const clear=()=>{
        SignPad.current.clear();
    }
    console.log(Data,"jhj")


    const SaveSignFun=()=>{
        SignSave()
        

        ResetClient().then((res)=>{
            if(res){
              toast.success("Signatures Added Successfully")
            }
        })
        .catch(err=>{
            console.log(err)
            toast.error("Signatures Not Added !")
        })
    }

    const ResetClient =async() => {
      
      return await  fetch(API_BASE_URL + "addSignatures", {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify(Data),
        })
            .then(resp => resp.json())
            .then((reD) => reD)
            .catch(err => err)
    }


    return (<>

        <div className="modal d-block" style={{ backgroundColor: "#00000052" }} id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg ">
                <div className="modal-content overFlowHeight" style={{height:"80vh"}}> 
                    <div className="modal-header p-0">
                    <div className="col-12">
                        <div className="row bg-ContractPage">
                         <div className="col-11 d-flex justify-content-center p-2">
                         <span>
              <img
                src={require("../../images/logo-header.svg").default}
                className="filter-logo"
                style={{ width: "130%" }}
              />
            </span>
            <img
              src={require("../../images/LogoName.svg").default}
              className="filter-text LogoIntermann"
              style={{ paddingLeft: "20px" }}
            />
                         </div>
                    <div className="col-1 text-end d-flex align-items-center">
                    <button type="button" className="btn-close text-light" onClick={() => closeModal(false)} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    </div>
                    </div>
                    </div>
                    <div className="modal-body text-start " style={{background:"#FE8700",padding:"10px"}}>
                
                    <div className="col-12 " >   <p  className=" mb-0"
                        style={{
                            fontFamily: 'Poppins',
                            fontStyle: "normal",
                            fontWeight: "700",
                            fontSize: "22px",
                            lineHeight: "24px",
                            color: "#424242;"
                        }}
                        >
                            


                     
                        Va rog semnati aici : <span style={{color:"#ffff",   fontFamily: 'Poppins',
                            fontStyle: "normal",
                            fontWeight: "700",
                            fontSize: "18px",
                            lineHeight: "24px",
                    }}>I declare that I have read the contract and accept it in its entirety.
Declar că am citit contractul și îl accept în întregime.Adresa dvs. IP va fi înregistrată</span>
                        </p>
                        </div> 
                           <div className="col-12 " style={{background:"#ffff" }}>
                                <div className="row " style={{padding:"10px"}}>
                                    <div className="col-12 " style={{background:"#E7E7E7",border:"2px solid #000000"}}>
                                  
                                  <SignatureCanvas penColor='black'  ref={SignPad}
                                //   onEnd={SignSave()}
    canvasProps={{ className: 'sigCanvas',velocityFilterWeight:200,height:350}} 
    
    />  
                                  
                 
        </div>                   
                                 


                                </div>
                           </div>
                           <div className="col-12">  <div className="col-12" >
                           <button onClick={()=>{SignSave()}} className="" style={{background:"transparent",border:"none"}}>Save</button>
    <button onClick={()=>{clear()}} className="" style={{background:"transparent",border:"none"}}>Clear</button>

        </div></div>
                           <div className="col-12">
                            <p  style={{color:"#ffff",   fontFamily: 'Poppins',
                            fontStyle: "normal",
                            fontWeight: "700",
                            fontSize: "12px",
                            lineHeight: "24px",
                    textAlign:"center"}}> L'écrit sous forme électronique est admis en preuve au même titre que l'écrit sur support papier, sous réserve que puisse être dûment identifiée la personne dont il émane et qu'il soit établi et conservé dans des conditions de nature à en garantir l'intégrité
<br />
                    Scrierea în formă electronică este admisă ca probă în același mod ca și scrierea pe hârtie, cu condiția ca persoana de la care emană să poată fi identificată în mod corespunzător și să fie întocmită și păstrată în condiții care să garanteze integritatea acesteia.
<br />
                    
                    Writing in electronic form is admitted as evidence in the same way as writing on paper, provided that the person from whom it emanates can be duly identified and that it is drawn up and stored under conditions such as to guarantee its integrity. 'integrity


                            </p>
                           </div>
                         
                 </div>
                 <div className="modal-body p-0 cursor-pointer">
                  <div className='col-12 d-flex p-2 align-items-center justify-content-center  bg-ContractPage  semneaza' onClick={()=>{SignSave();SaveSignFun()}} >
       
          📨 acepta si semneaza
accept and sign
         
        
         </div>
                    </div>
                             

                </div>
            </div>
        </div>
    </>)
}
export default DocSignCandidate;