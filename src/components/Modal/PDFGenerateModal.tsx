import React from 'react'
import "../../CSS/PreModal.css"

function PdfModal({closeModal} ){

    return(
        <>
         <div className="modal d-block pb-3" style={{ backgroundColor: "#00000052" }} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel">
            <div className="modal-dialog modal-lg">
                <div className="modal-content " style={{height:"87vh",width:"75vw"}}>
                    <div className=" modal-header  pb-1">
                    <div className="col-12">
                        <div className="row">
                <div className="col-8 px-0 TopHeaderModalInprogress">
                <h2 className="modal-title " id="staticBackdropLabel">Générér un contrat</h2>
                   </div>
                   <div className="col-4 text-end">
                        <button type="button" className="btn-close" onClick={()=>closeModal(false)} data-bs-dismiss="modal" aria-label="Close" ></button>
                    </div>
                    </div></div>
                    </div>
                    <form>
                        <div className="modal-body text-center scrollbarModal">
                         
                          <div className='row ' style={{height:"150%"}}>
                            <div className='col-4  d-grid justify-content-start text-start'>
                                <label className="PDFFormlabel">Lieu_Mission</label>
                                <input className='form-control inputStyling'  placeholder="‎ ‎ ‎ Lieu_Mission" />
                            </div>
                            <div className='col-4  d-grid justify-content-start text-start' >
                            <label className="PDFFormlabel">Durée_Mission</label>
                            <input className='form-control inputStyling'  placeholder="‎ ‎ ‎ Durée_Mission" />

                            </div>
                            <div className='col-4  d-grid justify-content-start text-start'>
                            <label className="PDFFormlabel">Durée_Hebdomadaire_Mission</label>
                            <input className='inputStylings' placeholder="‎ ‎ ‎ Durée_Hebdomadaire_Mission"/>

                            </div>
                            <div className='col-4  d-grid justify-content-start text-start'>
                            <label className="PDFFormlabel">Candidate_Job</label>
                            <input className='form-control inputStyling'  placeholder="‎ ‎ ‎ Candidate_Job" />

                            </div>
                            <div className='col-4  d-grid justify-content-start text-start'>
                            <label className="PDFFormlabel">CMP_CANDIDATE</label>
                            <input className='form-control inputStyling'  placeholder="‎ ‎ ‎ CMP_CANDIDATE" />

                            </div>
                            <div className='col-4  d-grid justify-content-start text-start'>
                            <label className="PDFFormlabel">Contract_date</label>
                            <input className='form-control inputStyling'  placeholder="‎ ‎ ‎ Contract_date" />

                            </div>
                            <div className='col-4  d-grid justify-content-start text-start'>
                            <label className="PDFFormlabel">Company_Contact_Name</label>
                            <input className='inputStylings' placeholder="‎ ‎ ‎ Company_Contact_Name" />

                            </div>
                            <div className='col-4  d-grid justify-content-start text-start'>
                            <label className="PDFFormlabel">NR_INREG</label>
                            <input className='form-control inputStyling'  placeholder="‎ ‎ ‎ NR_INREG" />

                            </div>
                            <div className='col-4  d-grid justify-content-start text-start'>
                            <label className="PDFFormlabel">SERIE_ID</label>
                            <input className='form-control inputStyling'  placeholder="‎ ‎ ‎ SERIE_ID" />

                            </div>
                            <div className='col-4  d-grid justify-content-start text-start'>
                            <label className="PDFFormlabel">Candidate_Adress</label>
                            <input className='form-control inputStyling'  placeholder="‎ ‎ ‎ Candidate_Adress" />

                            </div>
                            <div className='col-4  d-grid justify-content-start text-start'>
                            <label className="PDFFormlabel">Company_Siret</label>
                            <input className='form-control inputStyling'  placeholder="‎ ‎ ‎ Company_Siret" />

                            </div>
                            <div className='col-12  d-grid justify-content-start text-start'>
                            <label className="PDFFormlabel">Company_Adress</label>
                            <textarea className='TextArea form-control' placeholder='‎ ‎ ‎Company_Adress' style={{width:"530%"}}></textarea>
                            </div>
                            <div className="col-12 text-center mt-2">
                                <div className="row">
                                           <div className='col-3'>
                                            <button type='button' className='btnGeneratePDF'>Generate the PDF</button>
                                            <p className='PDFNotes'>Download local</p>
                                           </div>
                                           <div className='col-3 px-0'>
                                           <button type='button' className='contractCRM text-center' style={{width:"115%",height:"50px"}}>Add the contract to CRM</button>
                                           <p className='PDFNotes'>Download cloud</p>
                                           </div>
                                           <div className='col-3'>
                                           <button className='voirModal' type='button'>
                                           Voir le model
                                           </button>

                                           </div>
                                </div>
                            </div>
                         </div>
                         
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}
export default PdfModal;