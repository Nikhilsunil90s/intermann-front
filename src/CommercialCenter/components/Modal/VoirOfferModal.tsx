import React,{useEffect, useState} from "react";
import { GetRoute } from "../../../components/ApisFunction/FunctionsApi";
import Card from "../../../Offer_Center/components/Card";
import Error from "../../../components/Loader/SearchBarError";

function VoirOfferModal(props){
   const [totalOffer,setTotalOffer]=useState([])as any
   const [status,setStatus]=useState(false)
   useEffect(()=>{
    setStatus(false)
   GetRoute(`get-associated-offers/?leadId=${props.props._id} `).then((res)=>{
    if(res.status){
        setStatus(true)
        setTotalOffer([...res.data])


    }else{
        setStatus(true)
        setTotalOffer([])
    }
   })
   },[])

    return(<>
      <div className="modal d-block" style={{ backgroundColor: "#00000052" }} id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div   
      className="modal-dialog modal-lg" style={{maxWidth:"1198px"}}>
                <div className="modal-content">
                    <div className="modal-header p-0">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-8 px-0 clientArchivedModal-font">
                    <h2 className="modal-title  py-1 pRight" id="staticBackdropLabel"> Voci les offres envoyé à {props.props.companyName}</h2>
                    </div>
                    <div className="col-4 text-end d-flex align-items-center">
                    <button type="button" className="btn-close" onClick={() => props.closeModal(false)} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    </div>
                    </div>
                    </div>
                    <div className="modal-body scrollbarModal text-start" style={{height:"77vh"}}>
                     
                       <p className="mb-0" style={{
                            fontFamily: 'Poppins',
                            fontStyle: "normal",
                            fontWeight: "400",
                            fontSize: "15px",
                            lineHeight: "24px",
                            color: "#000000",
                            wordBreak:"break-all"
                      
                        }}>
                        {status ?
                        totalOffer.length > 0  ?
totalOffer.map((el:any,i)=>(
<Card props={el} key={i} cards={totalOffer} setCards={setTotalOffer} voir={"voir"} />

))

:
<div className="col-12 my-2 d-flex align-items-center justify-content-center">
{/* <span className="Leads002"></span> */}
<p className="mb-0 d-flex align-items-center ErrorSearchBox">
<Error /> No Offers Available ✘✘!</p>
</div>
                       :
                       <div className="col-12 my-2 d-flex align-items-center justify-content-center" style={{height:"50vh"}}>
                    <span className="Leads002"></span>
                    </div> 
                        }
                              </p>  
                               </div>
                  
                </div>
            </div>
        </div>
    </>)
}
export default VoirOfferModal;