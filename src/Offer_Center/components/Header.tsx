import React from "react";


function Header(props){

return(<>
<div className="container-fluid bg-white Offer_Header113 p-1" style={{marginTop:"41px"}}>
    <div className="row Offer_Header align-items-center">
    <div className="col-4 d-grid">
<p className="mb-0">offer center</p>
<span>VOIR LES OFFRES ENVOYES ET OU SIGNEES PAR LE CLIENT</span>
    </div>
    <div className="col-8">
        <div className="row">
          <div className="col-8 d-flex justify-content-end align-items-center">
           <button className="GenOffer" onClick={() => props.setUploadPdfModal({...props.uploadPdfModal,AddToCrm:true})} >generate offer cRM</button>
          </div>
          <div className="col-4 d-flex justify-content-center align-items-center">
          <button className="AddManually"  onClick={() => props.setUploadPdfModal({...props.uploadPdfModal,Manually:true})} >add offer manually</button>

          </div>
        </div>
    </div>
    </div>
</div>

</>)
}
export default Header;
