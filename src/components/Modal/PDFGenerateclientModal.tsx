import React, {useState, useEffect} from 'react';
import "../../CSS/PreModal.css";
import { API_BASE_URL } from "../../config/serverApiConfig";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader/loader";
import { useNavigate } from 'react-router';



function PdfModal({props,closeModal} ){
  const PdfFormat = {
    lieu_mission: props.candidatContract ? props.candidatContract.lieu_mission != "" ? props.candidatContract.lieu_mission :"" : "",
    duree_mission:props.candidatContract ? props.candidatContract.duree_mission != "" ? props.candidatContract.duree_mission :"" :"",
    duree_hebdomadaire_mission:props.candidatContract ? props.candidatContract.duree_hebdomadaire_mission != "" ? props.candidatContract.duree_hebdomadaire_mission : "" : "",
    candidatJob: props.candidatContract ? props.candidatContract.candidatJob != "" ? props.candidatContract.candidatJob : "" : "",
    cmp_candidat: props.candidatContract ? props.candidatContract.cmp_candidat !="" ? props.candidatContract.cmp_candidat :""  :"",
    contract_date:props.candidatContract ? props.candidatContract.contract_date != "" ? props.candidatContract.contract_date : "" : "",
    company_contact_name: props.candidatContract ? props.candidatContract.company_contact_name != "" ? props.candidatContract.company_contact_name : "" : "",
    nr_inreg: props.candidatContract ? props.candidatContract.nr_inreg !="" ? props.candidatContract.nr_inreg : "" : "",
    serie_id: props.candidatContract ? props.candidatContract.serie_id !=="" ? props.candidatContract.serie_id :"" :"",
    candidatAddress: props.candidatContract ? props.candidatContract.candidatAddress !=="" ? props.candidatContract.candidatAddress : "Candidate_Adress" : "Candidate_Adress",
    company_siret: props.candidatContract ? props.candidatContract.company_siret !="" ? props.candidatContract.company_siret : ""  : "",
    companyAddress: props.candidatContract ? props.candidatContract.companyAddress !=""? props.candidatContract.companyAddress : "" : "",
    candidatId: props.candidatContract ? props.candidatContract._id ? props.candidatContract._id : "" : "",
    candidatName: props.candidatContract ? props.candidatContract.candidatName ? props.candidatContract.candidatName : "" : "",
    contractId: props.candidatContract ? props.candidatContract._id ? props.candidatContract._id : "" : "",
}
  const [data, setData] = useState(PdfFormat);
  const [loader, setLoader] = useState(false);

  console.log(data,"data")
  const navigate =useNavigate()
//   useEffect(() => {
//     if (data.candidatName == "") {
//         setData((prev) => ({ ...prev, ["candidatName"]: props.candidatName }));
//       }
//     if (data.candidatId == "") {
//         setData((prev) => ({ ...prev, ["candidatId"]: props._id }));
//       }
//     if(data.candidatAddress == "") {
//         setData((prev) => ({ ...prev, ["candidatAddress"]: props.candidatAddress }));
//       }
//       if (data.candidatJob == "") {
//         setData((prev) => ({ ...prev, ["candidatJob"]: props.candidatJob }));
//       }
//   })

    const onFormDataChange = (
        e: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | any
        >
      ) => {
        //   setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };

    
    const addContract = async () => {
      // return await fetch(API_BASE_URL + "addContractToCRM", {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //     Authorization: "Bearer " + localStorage.getItem("token"),
      //   },
      //   body: JSON.stringify(data),
      // })
      //   .then((resp) => resp.json())
      //   .then((reD) => reD)
      //   .catch((err) => err);
    }

    const generatePDF = async () => {
        // console.log(data);
        // setLoader(true);
        // return await fetch(API_BASE_URL + "makeContract", {
        //     method: "POST",
        //     headers: {
        //       Accept: "application/json",
        //       "Content-Type": "application/json",
        //       Authorization: "Bearer " + localStorage.getItem("token"),
        //     },
        //     body: JSON.stringify(data),
        //   })
        //     .then((resp) => resp.json())
        //     .then((reD) => reD)
        //     .catch((err) => err);
    }

    const addContractToCRM = () => {
      // addContract().then(result => {
      //   console.log(result);
      //   if(result.status==true){
      //       toast.success("Contract Added To CRM Successfully!")
      //       setTimeout(()=>{
      //           window.location.reload();
      //       },2000)
      //   }
      //   if(result.status == false){
      //       toast.success("Contract Added Not Successfully!")
      //   }
      // })
    }

    const invokeGeneratePDF = () => {

        // console.log(data);
        
        // generatePDF().then(result => {
        //     console.log(result);
        //     setLoader(false);
        //     if (result.status) {
        //       let splittedFilePath = result.filePath.split("/app/");
        //           window.open(API_BASE_URL + splittedFilePath[1]); 
        //     }
        // }).catch(err => {
        //     console.log(err);
        // })
    }

    return(
        <>
  
        <div className="modal d-block" style={{ backgroundColor: "#00000052" }} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel">
            <div className="modal-dialog modal-lg">
           
                <div className="modal-content modalScreenSize " >
            {
            loader ?
            <>
            <div className=" modal-header  pb-1">
                    <div className="col-12">
                        <div className="row">
                <div className="col-8 px-0 TopHeaderModalInprogress">
                <h2 className="modal-title " id="staticBackdropLabel">Attendre SVP!</h2>
                   </div>
                   <div className="col-4 text-end">
                        <button type="button" className="btn-close" onClick={()=>closeModal(false)} data-bs-dismiss="modal" aria-label="Close" ></button>
                    </div>
                    </div>
                    </div>
            </div>
            <div className="col-12">
              <div className="row d-flex justify-content-center">
                <Loader />
              </div>
            </div>
                    
            </> 
             :
                    <>
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
                    <form className="col-12 scrollbarModal modal-body text-center ">
                       
                         
                          <div className='row ' style={{height:"100%"}}>
                            <div className='col-4  d-grid '>
                                <label className="ClientPDFFormlabel">$ numero contrat</label>
                                <input className='form-control inputStyling'  name='lieu_mission' onChange={onFormDataChange} placeholder="‎ ‎ ‎ $ numero contrat" />
                            </div>
                            <div className='col-4  d-grid ' >
                            <label className="ClientPDFFormlabel">$ initial Société client</label>
                            <input className='form-control inputStyling' name='duree_mission' onChange={onFormDataChange}  placeholder="‎ ‎ ‎ $ initial Société client" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="ClientPDFFormlabel">$ siret </label>
                            <input className='form-control inputStyling' defaultValue={data ? data.duree_hebdomadaire_mission != "" ? data.duree_hebdomadaire_mission : "" : ""} name='duree_hebdomadaire_mission' onChange={onFormDataChange} placeholder="‎ ‎ ‎$ siret"/>

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="ClientPDFFormlabel">$ numero TVA</label>
                            <input className='form-control inputStyling'  name='candidatJob' onChange={onFormDataChange}placeholder="‎ ‎ ‎ $ numero TVA" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="ClientPDFFormlabel">$ nom gérant</label>
                            <input className='form-control inputStyling'   name='cmp_candidat' onChange={onFormDataChange} placeholder="‎ ‎ ‎ $ nom gérant" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="ClientPDFFormlabel">$ telephone gerant</label>
                            <input className='form-control inputStyling'   name='contract_date' onChange={onFormDataChange} placeholder="‎ ‎ ‎ $ telephone gerant" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="ClientPDFFormlabel">$ metier en Roumain</label>
                            <input  className='inputStyling wHCompany form-control' name='company_contact_name' onChange={onFormDataChange} placeholder="‎ ‎ ‎ $ metier en Roumain" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="ClientPDFFormlabel">$ metier en Français</label>
                            <input className='form-control inputStyling'  name='$ metier en Français' onChange={onFormDataChange} placeholder="‎ ‎ ‎ $ metier en Français" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="ClientPDFFormlabel">$ date du debut de mission</label>
                            <input className='form-control inputStyling'  name='serie_id' onChange={onFormDataChange} placeholder="‎ ‎ ‎ $ date du debut de mission" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="ClientPDFFormlabel">$ date de fin de mission</label>
                            <input className='form-control inputStyling'  name='candidatAddress' onChange={onFormDataChange}  placeholder="‎ ‎ ‎ $ date de fin de mission" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="ClientPDFFormlabel">$ prix en euro / heure selon contract</label>
                            <input className='form-control inputStyling'  name='company_siret' onChange={onFormDataChange} placeholder="‎ ‎ ‎ $ prix en euro / heure selon contract" />

                            </div>


                            <div className='col-4  d-grid '>
                            <label className="ClientPDFFormlabel">$ SALAIRE EN EURO</label>
                            <input className='form-control inputStyling' name='SALAIRE EN EURO' onChange={onFormDataChange} placeholder="‎ ‎ ‎ $ SALAIRE EN EURO" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="ClientPDFFormlabel">$ nombre d'heure négocie dans le contrat</label>
                            <input className='form-control inputStyling'  name='candidatAddress' onChange={onFormDataChange} placeholder="‎ ‎ ‎ $ nombre d'heure négocie dans le contrat" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="ClientPDFFormlabel">$ numero de tel du travailleur 1</label>
                            <input className='form-control inputStyling'   name='company_siret' onChange={onFormDataChange} placeholder="‎ ‎ ‎ $ numero de tel du travailleur 1" />

                            </div> <div className='col-4  d-grid '>
                            <label className="ClientPDFFormlabel">$ nom du travailleur 2 </label>
                            <input className='form-control inputStyling' name='serie_id' onChange={onFormDataChange} placeholder="‎ ‎ ‎ $ nom du travailleur 2 " />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="ClientPDFFormlabel">$ numero de tel du travailleur 2</label>
                            <input className='form-control inputStyling'  name='candidatAddress' onChange={onFormDataChange}  placeholder="‎ ‎ ‎ $ numero de tel du travailleur 2" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="ClientPDFFormlabel">$ nom du travailleur3</label>
                            <input className='form-control inputStyling'   name='company_siret' onChange={onFormDataChange} placeholder="‎ ‎ ‎ $ nom du travailleur3" />

                            </div> <div className='col-4  d-grid '>
                            <label className="ClientPDFFormlabel">$ numero de tel du travailleur 3</label>
                            <input className='form-control inputStyling'  name='serie_id' onChange={onFormDataChange} placeholder="‎ ‎ ‎ $ numero de tel du travailleur 3" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="ClientPDFFormlabel">$ nom du travailleur 4</label>
                            <input className='form-control inputStyling'  name='candidatAddress' onChange={onFormDataChange} placeholder="‎ ‎ ‎ $ nom du travailleur 4" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="ClientPDFFormlabel">$ numero de tel du travailleur 4</label>
                            <input className='form-control inputStyling'  name='company_siret' onChange={onFormDataChange} placeholder="‎ ‎ ‎ $ numero de tel du travailleur 4" />

                            </div> <div className='col-4  d-grid '>
                            <label className="ClientPDFFormlabel">$ nom du travailleur 5</label>
                            <input className='form-control inputStyling'  name='serie_id' onChange={onFormDataChange} placeholder="‎ ‎ ‎$ nom du travailleur 5" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="ClientPDFFormlabel">$ numero de tel du travailleur 5</label>
                            <input className='form-control inputStyling'  name='candidatAddress' onChange={onFormDataChange} placeholder="‎ ‎ ‎ $ numero de tel du travailleur 5" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="ClientPDFFormlabel">$ nom du travailleur 6</label>
                            <input className='form-control inputStyling'  name='company_siret' onChange={onFormDataChange} placeholder="‎ ‎ ‎$ nom du travailleur 6" />

                            </div> <div className='col-4  d-grid '>
                            <label className="ClientPDFFormlabel">$ numero de tel du travailleur 6</label>
                            <input className='form-control inputStyling'  name='serie_id' onChange={onFormDataChange} placeholder="‎ ‎ ‎ $ numero de tel du travailleur 6" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="ClientPDFFormlabel">$ nom du travailleur 7</label>
                            <input className='form-control inputStyling'  name='candidatAddress' onChange={onFormDataChange} placeholder="‎ ‎ ‎$ nom du travailleur 7" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="ClientPDFFormlabel">$ numero de tel du travailleur 7</label>
                            <input className='form-control inputStyling'  name='company_siret' onChange={onFormDataChange} placeholder="‎ ‎ ‎ $ numero de tel du travailleur 7" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="ClientPDFFormlabel">$ nom du travailleur 8</label>
                            <input className='inputStyling form-control'  name='companyAddress' onChange={onFormDataChange} placeholder='‎ ‎ ‎$ nom du travailleur 8'  />
                            </div>
                            <div className='col-4  d-grid '>
                            <label className="ClientPDFFormlabel">$ numero de tel du travailleur 8</label>
                            <input className='inputStyling form-control'  name='companyAddress' onChange={onFormDataChange} placeholder='‎ ‎ ‎$ numero de tel du travailleur 8'  />
                            </div>
                            <div className="col-12 text-center mt-2">
                                <div className="row">
                                           <div className='col-3'>
                                            <button type='button' className='btnGeneratePDF' onClick={invokeGeneratePDF}>Generate the PDF</button>
                                            <p className='PDFNotes'>Download local</p>
                                           </div>
                                           <div className='col-3 px-0'>
                                           <button type='button' className='contractCRM text-center' onClick={addContractToCRM}>Add the contract to CRM</button>
                                           <p className='PDFNotes'>Download cloud</p>
                                           </div>
                                           <div className='col-3'>
                                           <button className='voirModal' type='button'>
                                           Voir le model
                                           </button>
                                           </div>
                                           <div className='col-3'>

                                           </div>
                                </div>
                            </div>
                         </div>
                         
                    
                    </form>
                    </>
        }
                </div>

            </div>
        </div>
        
        </>
    )
}
export default PdfModal;