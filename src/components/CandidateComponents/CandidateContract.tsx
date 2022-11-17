import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router";
function  CandidateContract({props,path}){
    const navigate =useNavigate()

    const [contract_date,setcontract_date]=useState()as any
    const [debutMissionDate,setdebutMissionDate]=useState()as any
    const [fin_mision,setfin_mision]=useState()as any
    const [GetMonth,setMonth]=useState()as any
    const [GetMonth2,setMonth2]=useState()as any
    const [GetMonth3,setMonth3]=useState()as any


    let data={profileData:props ,path:path}

    useEffect(()=>{
        if(props.candidatContract){
       
          let tempdate =new Date(props.candidatContract.contract_date)
          setMonth(tempdate.getMonth()+1)
          let NewCdate=[tempdate.getDate(),GetMonth,tempdate.getFullYear()].join("-")
        setcontract_date(NewCdate)
    
      let tempdate2 =new Date(props.candidatContract.debutMissionDate)
      setMonth2(tempdate2.getMonth()+1)
        let NewMDate=  [tempdate2.getDate(),GetMonth2,tempdate2.getFullYear()].join("-")
        setdebutMissionDate(NewMDate)
    
    
    
     let tempdate3 =new Date(props.candidatContract.fin_mision)
      setMonth3(tempdate3.getMonth()+1)
      let FormatNewDate=[tempdate3.getDate(),GetMonth3,tempdate3.getFullYear()].join("-")
      setfin_mision(FormatNewDate)
    
    }},)

    const editCandidatProfile = () => {
        navigate(path, { state: data });
      };

    return(
        <>
                            <div className='col-4  d-grid text-start'>
                                <label className="PDFFormlabel">Lieu_Mission</label>
                                <input className='form-control inputStylingForView'  onClick={editCandidatProfile} value={props.candidatContract ? props.candidatContract.lieu_mission ? props.candidatContract.lieu_mission: "input Not Available!" : "input Not Available!"}  placeholder="‎ ‎ ‎ Lieu_Mission" />
                            </div>
                            <div className='col-4  d-grid text-start' >
                            <label className="PDFFormlabel">Durée_Mission</label>
                            <input className='form-control inputStylingForView'  onClick={editCandidatProfile} value={props.candidatContract ?props.candidatContract.duree_mission ? props.candidatContract.duree_mission  : "input Not Available!" : "input Not Available!"}  placeholder="‎ ‎ ‎ Durée_Mission" />

                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel  d-flex align-items-start ">Durée_Hebdomadaire_Mission</label>
                            <input className='form-control inputStylingForView' onClick={editCandidatProfile} value={props.candidatContract ?props.candidatContract.duree_hebdomadaire_mission? props.candidatContract.duree_hebdomadaire_mission  : "input Not Available!" : "input Not Available!"} placeholder="‎ ‎ ‎ Durée_Hebdomadaire_Mission"/>

                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel">Candidate_Job</label>
                            <input className='form-control inputStylingForView'  onClick={editCandidatProfile} value={props.candidatContract ?props.candidatContract.candidatJob ? props.candidatContract.candidatJob : "input Not Available!" : "input Not Available!"} placeholder="‎ ‎ ‎ Candidate_Job" />

                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel">CMP_CANDIDATE</label>
                            <input className='form-control inputStylingForView' onClick={editCandidatProfile} value={props.candidatContract ?props.candidatContract.cmp_candidat? props.candidatContract.cmp_candidat : "input Not Available!" : "input Not Available!"}  placeholder="‎ ‎ ‎ CMP_CANDIDATE" />

                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel">Contract_date</label>
                            <input className='form-control inputStylingForView' type="" readOnly  onClick={editCandidatProfile} value={props.candidatContract ?props.candidatContract.contract_date ? contract_date : "input Not Available!" : "input Not Available!"}  placeholder="‎ ‎ ‎ Contract_date" />

                            </div>
                            <div className='col-4  d-grid text-start'>
                                                      <label className="PDFFormlabel d-flex align-items-start ">Company_Contact_Name</label>
                            

                            <input className='form-control inputStylingForView' onClick={editCandidatProfile} value={props.candidatContract ?props.candidatContract.company_contact_name ? props.candidatContract.company_contact_name : "input Not Available!" : "input Not Available!"} placeholder="‎ ‎ ‎ Company_Contact_Name" />
                            
                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel">NR_INREG</label>
                            <input className='form-control inputStylingForView' onClick={editCandidatProfile} value={props.candidatContract ?props.candidatContract.nr_inreg ? props.candidatContract.nr_inreg : "input Not Available!" : "input Not Available!"}  placeholder="‎ ‎ ‎ NR_INREG" />

                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel">SERIE_ID</label>
                            <input className='form-control inputStylingForView' onClick={editCandidatProfile} value={props.candidatContract ?props.candidatContract.serie_id ? props.candidatContract.serie_id: "input Not Available!" : "input Not Available!"}  placeholder="‎ ‎ ‎ SERIE_ID" />

                            </div>
                            
                            <div className='col-4 d-grid text-start'>
                            <label className="PDFFormlabel">Candidate_Adress</label>
                            <input className='form-control inputStylingForView' onClick={editCandidatProfile} value={props.candidatContract ?props.candidatContract.candidatAddress ? props.candidatContract.candidatAddress : "input Not Available!" : "input Not Available!"}  placeholder="‎ ‎ ‎ Candidate_Adress" />

                            </div>
                            <div className='col-4  d-grid text-start'>
                            <label className="PDFFormlabel">Company_Siret</label>
                            <input className='form-control inputStylingForView'  onClick={editCandidatProfile} value={props.candidatContract ?props.candidatContract.company_siret ? props.candidatContract.company_siret : "input Not Available!": "input Not Available!"}  placeholder="‎ ‎ ‎ Company_Siret" />

                            </div>
                            
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Numero TF Candidat</label>
                            <input className='form-control inputStyling'  name='Numero_TF_Candidat'  onClick={editCandidatProfile} value={props.candidatContract ?props.candidatContract.numeroTFCandidat ? props.candidatContract.numeroTFCandidat : "input Not Available!": "input Not Available!"}  placeholder="‎ ‎ ‎ Numero TF Candidat" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Company Vat</label>
                            <input className='form-control inputStyling'  name='Company_Vat'  onClick={editCandidatProfile} value={props.candidatContract ?props.candidatContract.companyVat ? props.candidatContract.companyVat : "input Not Available!": "input Not Available!"}   placeholder="‎ ‎ ‎ Company Vat" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Salaire Brut</label>
                            <input className='form-control inputStyling'   name='Salaire_Brut'  onClick={editCandidatProfile} value={props.candidatContract ?props.candidatContract.salaireBrut ? props.candidatContract.salaireBrut : "input Not Available!": "input Not Available!"} placeholder="‎ ‎ ‎ Salaire Brut" />

                            </div>


                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Salaire Net</label>
                            <input className='form-control inputStyling'  name='Salaire_Net'  onClick={editCandidatProfile} value={props.candidatContract ?props.candidatContract.salaireNet ? props.candidatContract.salaireNet : "input Not Available!": "input Not Available!"}  placeholder="‎ ‎ ‎ Salaire_Net" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Diurna Total Par Jour</label>
                            <input className='form-control inputStyling'  name='Diurna_Total_Par_Jour'  onClick={editCandidatProfile} value={props.candidatContract ?props.candidatContract.diurnaTotalParJour ? props.candidatContract.diurnaTotalParJour : "input Not Available!": "input Not Available!"}  placeholder="‎ ‎ ‎ Diurna Total Par Jour" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Debut Mision (Date)</label>
                            <input className='form-control inputStyling' type=""  name='Debut Mision Date' readOnly  onClick={editCandidatProfile} value={props.candidatContract ? props.candidatContract.debutMissionDate ? debutMissionDate : "input Not Available!": "input Not Available!"}  placeholder="‎ ‎ ‎ Debut Mision Date" />

                            </div>



                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Heure Par Semaine</label>
                            <input className='form-control inputStyling'  name='Heure_Par_Semaine'  onClick={editCandidatProfile} value={props.candidatContract ?props.candidatContract.heurePerSemaine ? props.candidatContract.heurePerSemaine : "input Not Available!": "input Not Available!"}  placeholder="‎ ‎ ‎ Heure Par Semaine" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Duree Hebdomadaire</label>
                            <input className='form-control inputStyling'  name='Duree_Hebdomadaire'  onClick={editCandidatProfile} value={props.candidatContract ?props.candidatContract.duree_hebdomadaire ? props.candidatContract.duree_hebdomadaire : "input Not Available!": "input Not Available!"}   placeholder="‎ ‎ ‎ Duree Hebdomadaire" />

                            </div>
                            <div className='col-4  d-grid'>
                            <label className="PDFFormlabel">indemnisation jour</label>
                            <input className='form-control inputStyling'  name='indemnisation_jour'  onClick={editCandidatProfile} value={props.candidatContract ?props.candidatContract.indemnisationJour ? props.candidatContract.indemnisationJour : "input Not Available!": "input Not Available!"}  placeholder="‎ ‎ ‎ indemnisation jour" />

                            </div>
                            <div className='col-4  d-grid '>
                            <label className="PDFFormlabel">Fin Mision</label>
                            <input className='form-control inputStyling'  type="" readOnly name='fin_mision'  onClick={editCandidatProfile} value={props.candidatContract ? props.fin_mision !="" ? fin_mision  : "input Not Available!": "input Not Available!"}  placeholder="‎ ‎ ‎ indemnisation jour" />

                            </div>

                            <div className='col-12  d-grid text-start'>
                            <label className="PDFFormlabel">Company_Adress</label>
                            <textarea className='TextAreaPage form-control' onClick={editCandidatProfile} value={props.candidatContract ?props.candidatContract.companyAddress ? props.candidatContract.companyAddress : "input Not Available!": "input Not Available!"} placeholder='‎ ‎ ‎Company_Adress'></textarea>
                            </div>     
                                      </>
    
    )
}
export default CandidateContract;