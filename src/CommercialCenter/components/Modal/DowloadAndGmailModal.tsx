import React, { useState } from "react";
import toast from "react-hot-toast";
import $ from "jquery"

function DownloadGmail(props: any) {
  console.log(props);
  const [copied,setCopied]=useState(false)
  const [steps,setSteps]=useState({
    step1:false,
    step2:false
  })
  function copyToClipboard(element:any) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
    setCopied(true)
    toast.success("Copied successfully !!")
  }
  //   const [genOfferData, setDataGenOffer] = useState({
  //     company_name: props.props.companyName,
  //     company_email: props.props.email,
  //     commercialLeadId: props.props._id,
  //   }) as any;
  //   const [Metier, setMetier] = useState({
  //     metier: "",
  //     salaire_35H: "", // will come with euro sign:,
  //     tax_35H: "", // will come with euro sign
  //     heure_fait: "", // will come with H
  //     tax_heure_fait: "", // will come with euaro sign
  //     supplymentry_tax: "", // will come with euro sign
  //     total_salaire: "", // will come with euro sign
  //   });
  const [response, setResponse] = useState(true);
  //   const onChangeGenOfferset = (e) => {
  //     if (e.target.name === "salaire_35H") {
  //       setMetier({
  //         ...Metier,
  //         [e.target.name]: e.target.value + "€",
  //       });
  //     } else if (e.target.name === "tax_35H") {
  //       setMetier({
  //         ...Metier,
  //         [e.target.name]: e.target.value + "€",
  //       });
  //     } else if (e.target.name === "heure_fait") {
  //       setMetier({
  //         ...Metier,
  //         [e.target.name]: e.target.value + "H",
  //       });
  //     } else if (e.target.name === "tax_heure_fait") {
  //       setMetier({
  //         ...Metier,
  //         [e.target.name]: e.target.value + "€",
  //       });
  //     } else if (e.target.name === "supplymentry_tax") {
  //       setMetier({
  //         ...Metier,
  //         [e.target.name]: e.target.value + "€",
  //       });
  //     } else if (e.target.name === "total_salaire") {
  //       setMetier({
  //         ...Metier,
  //         [e.target.name]: e.target.value + "€",
  //       });
  //     } else if (e.target.name === "metier") {
  //       setMetier({
  //         ...Metier,
  //         [e.target.name]: e.target.value,
  //       });
  //     } else {
  //       setDataGenOffer({ ...genOfferData, [e.target.name]: e.target.value });
  //     }
  //   };

  //   const GenOffer = async (e: any) => {
  //     if (e.target.name === "downloadPDF") {
  //       if (Metier.metier === "") {
  //         toast.error("please fill all required fields!");
  //       } else {
  //         if (data.length === 0) {
  //           let newData= {...genOfferData,meteirs:[Metier]}
  //           setResponse(false);
  //           PostRoute(newData, "generate-offer")
  //             .then((res) => {
  //               if (res.status) {
  //                 props.setUpdate(true);
  //                 setResponse(true);

  //                 // FilePath = res.filepath;

  //                 // MailTo = `mailto:${
  //                 //   props.props.email
  //                 // }?subject=offre%20intermann%20travailleur%20temporaire%20${
  //                 //   genOfferData.company_name
  //                 // }&body=bonjour%2c%20suite%20%c3%a0%20notre%20entretien%20t%c3%a9l%c3%a9phonique%20voici%20l%e2%80%99offre%20pour%20les%20travailleurs%20d%c3%a9tach%c3%a9s.%0d%0avous%20y%20trouverez%20${
  //                 //   genOfferData.tax_35H
  //                 // }%20pour%20les%20profils%20demand%c3%a9s.%0d%0aune%20fois%20l%e2%80%99offre%20retourn%c3%a9%20sign%c3%a9e%2c%20nous%20allons%20lancer%20les%20recherches%20aupr%c3%a8s%20de%20notre%20r%c3%a9seau%20en%20roumanie%2c%20de%20notre%20base%20de%20donn%c3%a9e%2c%20et%20en%20publiant%20des%20annonces%20publicitaire%20dans%20toute%20la%20r%c3%a9gion.%0d%0anous%20vous%20enverrons%20ainsi%20r%c3%a8guli%c3%a8rement%20des%20cvs%20par%20mail%20que%20vous%20devrez%20valider%20ou%20refuser.%0d%0anous%20vous%20rappelons%20que%20vous%20avez%20toujours%20la%20possibilit%c3%a9%20de%20renvoyer%20sans%20frais%20pendant%20une%20semaine%20votre%20travailleur%20si%20jamais%20celui%20ne%20convenant%20pas.%0d%0anous%20vous%20demandons%20d'%c3%aatre%20le%20plus%20r%c3%a9actif%20possible%20d%c3%a8s%20r%c3%a9ception%20de%20nos%20cvs%20pour%20ne%20pas%20perdre%20les%20candidats.%0d%0anous%20nous%20donnons%20un%20d%c3%a9lai%20de%203%20semaines%20pour%20trouver%20le%20candidat%20correspondant%20%c3%a0%20votre%20demande.%0d%0anous%20vous%20invitons%20%c3%a0%20regarder%20notre%20vid%c3%a9o%20explictive%20de%20l%e2%80%99offre%20sur%20notre%20chaine%20youtube%20ici%20%3a%0d%0ahttps%3a%2f%2fwww.youtube.com%2fwatch%3fv%3da5ug5ulpliq%26t%3d1s%0d%0aenfin%2c%20vous%20avez%20deux%20possibilit%c3%a9s%20pour%20accepter%20cette%20offre.%0d%0a1)%20la%20premi%c3%a8re%20c%e2%80%99est%20de%20la%20renvoyer%20signer%20par%20email%20%c3%a0%20contact%40intermann.ro%0D%0A2)%20La%20seconde%20c%E2%80%99est%20de%20la%20signer%20digitalement%20depuis%20votre%20PC%2FSmartphone%20en%20cliquant%20sur%20ce%20lien%20%3A%20%3a%0d%0a${`${"intermann.herokuapp.com/"}ViewOffer/${
  //                 //   res.data._id
  //                 // }%0d%0a`}`;
  //                 toast.success(res.message);
  //                 // window.open(MailTo);

  //                 // var dl = document.createElement("a");
  //                 // dl.setAttribute("href", FilePath);
  //                 // dl.setAttribute("download", "pdfname.pdf");
  //                 // dl.setAttribute("target", "_blank");
  //                 // document.body.appendChild(dl);
  //                 // dl.click();
  //                 // document.body.removeChild(dl);
  //                 setTimeout(() => {
  //                   props.closeModal(false);
  //                 }, 2000);
  //               } else {
  //                 toast.error(res.message);
  //                 setResponse(true);
  //               }
  //             })
  //             .catch((err) => err);
  //         } else {
  //           setDataGenOffer({ ...genOfferData, metiers: data });
  //           setResponse(false);
  //           PostRoute(genOfferData, "generate-offer")
  //             .then((res) => {
  //               if (res.status) {
  //                 props.setUpdate(true);
  //                 setResponse(true);

  //                 FilePath = res.filepath;

  //                 // MailTo = `mailto:${
  //                 //   props.props.email
  //                 // }?subject=offre%20intermann%20travailleur%20temporaire%20${
  //                 //   genOfferData.company_name
  //                 // }&body=bonjour%2c%20suite%20%c3%a0%20notre%20entretien%20t%c3%a9l%c3%a9phonique%20voici%20l%e2%80%99offre%20pour%20les%20travailleurs%20d%c3%a9tach%c3%a9s.%0d%0avous%20y%20trouverez%20${
  //                 //   genOfferData.tax_35H
  //                 // }%20pour%20les%20profils%20demand%c3%a9s.%0d%0aune%20fois%20l%e2%80%99offre%20retourn%c3%a9%20sign%c3%a9e%2c%20nous%20allons%20lancer%20les%20recherches%20aupr%c3%a8s%20de%20notre%20r%c3%a9seau%20en%20roumanie%2c%20de%20notre%20base%20de%20donn%c3%a9e%2c%20et%20en%20publiant%20des%20annonces%20publicitaire%20dans%20toute%20la%20r%c3%a9gion.%0d%0anous%20vous%20enverrons%20ainsi%20r%c3%a8guli%c3%a8rement%20des%20cvs%20par%20mail%20que%20vous%20devrez%20valider%20ou%20refuser.%0d%0anous%20vous%20rappelons%20que%20vous%20avez%20toujours%20la%20possibilit%c3%a9%20de%20renvoyer%20sans%20frais%20pendant%20une%20semaine%20votre%20travailleur%20si%20jamais%20celui%20ne%20convenant%20pas.%0d%0anous%20vous%20demandons%20d'%c3%aatre%20le%20plus%20r%c3%a9actif%20possible%20d%c3%a8s%20r%c3%a9ception%20de%20nos%20cvs%20pour%20ne%20pas%20perdre%20les%20candidats.%0d%0anous%20nous%20donnons%20un%20d%c3%a9lai%20de%203%20semaines%20pour%20trouver%20le%20candidat%20correspondant%20%c3%a0%20votre%20demande.%0d%0anous%20vous%20invitons%20%c3%a0%20regarder%20notre%20vid%c3%a9o%20explictive%20de%20l%e2%80%99offre%20sur%20notre%20chaine%20youtube%20ici%20%3a%0d%0ahttps%3a%2f%2fwww.youtube.com%2fwatch%3fv%3da5ug5ulpliq%26t%3d1s%0d%0aenfin%2c%20vous%20avez%20deux%20possibilit%c3%a9s%20pour%20accepter%20cette%20offre.%0d%0a1)%20la%20premi%c3%a8re%20c%e2%80%99est%20de%20la%20renvoyer%20signer%20par%20email%20%c3%a0%20contact%40intermann.ro%0D%0A2)%20La%20seconde%20c%E2%80%99est%20de%20la%20signer%20digitalement%20depuis%20votre%20PC%2FSmartphone%20en%20cliquant%20sur%20ce%20lien%20%3A%20%3a%0d%0a${`${"intermann.herokuapp.com/"}ViewOffer/${
  //                 //   res.data._id
  //                 // }%0d%0a`}`;
  //                 toast.success(res.message);
  //                 window.open(MailTo);

  //                 var dl = document.createElement("a");
  //                 dl.setAttribute("href", FilePath);
  //                 dl.setAttribute("download", "pdfname.pdf");
  //                 dl.setAttribute("target", "_blank");
  //                 document.body.appendChild(dl);
  //                 dl.click();
  //                 document.body.removeChild(dl);
  //                 setTimeout(() => {
  //                   props.closeModal(false);
  //                 }, 2000);
  //               } else {
  //                 toast.error(res.message);
  //                 setResponse(true);
  //               }
  //             })
  //             .catch((err) => err);
  //         }
  //       }
  //     } else {
  //       if (Metier.metier === "") {
  //         toast.error("please fill all required fields!");
  //       } else {
  //         if (JSON.stringify(data).includes(JSON.stringify(Metier))) {
  //           toast.error("already exists!");
  //         } else {
  //           data.push(Metier);
  //         }
  //       }
  //     }
  //   };
  //   console.log(data, genOfferData.metiers, "he");
  const nextStep=()=>{
    if(steps.step1){
        setSteps({step1:false,step2:true})
    }else{
        setSteps({step1:true,step2:false})

    }
  }
  return (
    <>
      <div
        className="modal d-block"
        style={{ backgroundColor: "#00000052" }}
        id="staticBackdrop2"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" style={{ width: "795px" }}>
          <div className="modal-content">
            <div className="modal-header p-0">
              <div className="col-12">
                <div className="row">
                  <div className="col-8 px-0 clientArchivedModal-font ">
                    <h2
                      className="modal-title  py-1 pRight text-capitalize"
                      id="staticBackdropLabel"
                      
                    >{
                        steps.step1 === false && steps.step2 == false   ? 
                     "Copiez ce texte dans votre ordinateur"
                     :
                     steps.step1 ?
                     "Download the file"  
                       :
                       "Open GMAIL"


                    }
                      
                    </h2>
                  </div>
                  <div className="col-4 text-end d-flex align-items-center">
                    <button
                      type="button"
                      onClick={() =>
                        props.setDownloadMailModal({
                          ...props.downloadMailModal,
                          status: false,
                          content: "",
                          filePath:""
                        })
                      }
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal-body scrollbarModal text-start"
              style={{ height: "78vh" }}
            >
              <div className="col-12" style={{ background: steps.step1 === false && steps.step2 == false   ?  "#D9D9D9"  :
                     steps.step1 == false ? "#fff" :"#fff"}}>
              {
                        steps.step1 === false && steps.step2 == false   ? 
                        <p
                        className=""
                        id="p1"
                        style={{
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: 600,
                          fontSize: "16px",
                          lineHeight: "24px",
                          /* or 150% */
      
                          display: "flex",
                          alignItems: "flex-end",
                          letterSpacing: "2px",
                          color: "#000000",
                        }}
                      >
                        {props.props.content}
                      </p>
                     :
                     steps.step1 ?
                     <p
                     className="d-flex alig-items-center justify-content-center"
                     id="p1"
                     style={{
                       fontFamily: "Poppins",
                       fontStyle: "normal",
                       fontWeight: 600,
                       fontSize: "16px",
                       lineHeight: "24px",
                       /* or 150% */
                       height:"63vh",
                       display: "flex",
                       alignItems: "center",
                       letterSpacing: "2px",
                       color: "#000000",
                     }}
                   >
                     Merci de télécharger le fichier PDF à envoyer au client 
                     </p>
                       :
                       <div className="row justify-content-center align-items-center" style={{height:"70vh"}}>
                       <div className="col-6">
                       <a
                    //    onClick={()=>nextStep()}
                    target="_blank"
                    href={"http://www.gmail.com"}
              
                         className=""
                         style={{
                            width:"100%",
                           background: "#FE8700",
                           fontFamily: "Poppins",
                           fontStyle: "normal",
                           fontWeight: 600,
                           fontSize: "24px",
                           lineHeight: "24px",
                           /* identical to box height, or 71% */
   
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "center",
                           textDecorationLine: "underline",
                           textTransform: "capitalize",
                           color: " #FFFFFF",
                           border: "none",
                           height: "90px",
                          
                         }}
                       >Click here to open Gmail
                       </a>
</div>
</div>

                    }
             
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-6">
                   
                   {
                        steps.step1 === false && steps.step2 == false   ?   <button
                        className=""
                        id="content"
                        onClick={(e) =>
                    
                          copyToClipboard('#p1')}
                          disabled={copied}
                        style={{
                          background:copied  ? "#355240" :"#489767",
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: 600,
                          fontSize: "24px",
                          lineHeight: "24px",
                          /* identical to box height, or 71% */
  
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textDecorationLine: "underline",
                          textTransform: "capitalize",
                          color: " #FFFFFF",
                          border: "none",
                          height: "50px",
                          width: "80%",
                        }}
                      >  📜 copy text
</button>
                        :
                        steps.step1  ?
                        <button
                        className=""
                        id="content"
                        onClick={(e) => window.open(props.props.filePath)
                             }
                        //   disabled={copied}
                        style={{
                          background:copied  ? "#355240" :"#489767",
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: 600,
                          fontSize: "24px",
                          lineHeight: "24px",
                          /* identical to box height, or 71% */
  
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textDecorationLine: "underline",
                          textTransform: "capitalize",
                          color: " #FFFFFF",
                          border: "none",
                          height: "50px",
                          width: "80%",
                        }}
                      >
                      📥 Download PDF
                      </button>
                        :
null

                   }


                  </div>
                  {
                    steps.step2 ?
                    null
                    :
                    <div className="col-6 d-flex justify-content-end">
                    <button
                    onClick={()=>nextStep()}
                      className=""
                      style={{
                        background: "#FE8700",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: 600,
                        fontSize: "24px",
                        lineHeight: "24px",
                        /* identical to box height, or 71% */

                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textDecorationLine: "underline",
                        textTransform: "capitalize",
                        color: " #FFFFFF",
                        border: "none",
                        height: "50px",
                        width: "80%",
                      }}
                    >
                      ➡️ next step
                    </button>
                  </div>
                  }
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default DownloadGmail;
