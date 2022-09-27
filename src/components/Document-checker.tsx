import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { API_BASE_URL } from "../config/serverApiConfig";
import ErrorLoader from "../components/Loader/SearchBarError";
import Error from "../components/Loader/loader";

function DocumentCheck() {
  const [data,setData]=useState([])
  const [todoClient,settodoClient]=useState([])
  const [Inprogress,setInprogress]=useState([])
  const [Archived,setArchived]=useState([])
  const [ClientSigned,setClientSigned]=useState([])
  const [LoaderFails,setLoaderFails]=useState(true)


  useEffect(() => {
 
    if(data.length == 0){
     fetchProfiles().then(filteredresponse => {
       setData([...filteredresponse.data])
     })
       .catch(err => {
         console.log(err);
       })
    }

    if(todoClient.length === 0){
       let TClient= data.filter((el)=>(
           el.jobStatus == "To-Do"
       ))
        settodoClient([...TClient])
    }
    if(Inprogress.length === 0){
        let TClient= data.filter((el)=>(
            el.jobStatus == "In-Progress"
        ))
        setInprogress([...TClient])
     }
     if(Archived.length === 0){
        let TClient= data.filter((el)=>(
            el.jobStatus == "Archived"
        ))
        setArchived([...TClient])
     }
     if(ClientSigned.length === 0){
        let TClient= data.filter((el)=>(
            el.jobStatus == "Signed Contract"
        ))
        setClientSigned([...TClient])
     }
   },[data])

  const DocumentClientPage=(id,Name)=>{
  window.open(`/documentbox/${Name}/${id}`,"_blank")
  }

  const Loader=()=>{
   setTimeout(()=>{
    setLoaderFails(false)
   },15000)

   if(LoaderFails == true){
      return  <Error />
   }
   if(LoaderFails == false){
    return <p className="verification mb-0">No Clients Available!</p>
   }
  }


   const fetchProfiles = async () => {
     return await fetch(API_BASE_URL + "getClients", {
       method: "GET",
       headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: "Bearer " + localStorage.getItem("token"),
       },
     })
       .then((resD) => resD.json())
       .then((reD) => reD)
       .catch((err) => err);
   };

  return (
    <>
      <div className="container-fluied bg-ContractPage">
        <div className="row">
          <div className="col-12 d-flex justify-content-center p-1 mt-2">
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
          <div className="col-12 text-center" style={{padding:"0px 20px"}}>
<p className="verification mb-0">Vérification de documents</p>
<p className="pouvez mb-0">Les clients de la société sont listés sur cette page, vous pouvez cliquer sur un client et faire un controle des documents obligatoires.</p><p className="pouvezz">Chaque client doit avoir accès à sa propre page qui doit lui etre communiqué par Jeremy</p>

            </div>
            <hr className="hrLineDocChecker" />
            <div  className="col-12" style={{padding:"0px 30px"}}>
            <div className="row">
              <div className="col-4">
<p className="sommeil mb-0">😴 Clients en sommeil</p>
                </div>
<span className="travaillant pl-4">Les clients ne travaillant pas encore avec nous, vous pouvez quand meme voir l’offre envoyé. </span>

                </div>
           </div>
           <div className="col-12 scrollbarBox my-2" style={{padding:"0px 50px",overflow:"auto"}}>
             <div className="row scrollbarBox justify-content-between" >
             {
                todoClient.length > 0 ?
                todoClient.map((el)=>(
              
              <div className="col-4 d-flex align-items-center justify-content-center boxClientName cursor-pointer mb-1 p-1" style={{maxWidth:"384px",height:"130px"}} onClick={(e)=>DocumentClientPage(el._id,el.clientCompanyName)}>
                <p className="ClientNameBox mb-0">📂{el.clientCompanyName.length > 13 ? el.clientCompanyName.slice(0,13) + "..." : el.clientCompanyName }</p>
               </div>
))
               :
               <>{Loader()}</>
             }
              
                </div>
            </div>
            <hr className="hrLineDocChecker" />
            <div  className="col-12" style={{padding:"0px 30px"}}>
            <div className="row">
              <div className="col-6">
<p className="sommeil mb-0">🔍 Clients en cours de recherche</p>
                </div>
<span className="travaillant pl-4">Les clients ayant signés l’offre sans pour autant avoir des employés. </span>

                </div>
           </div>
           <div className="col-12 scrollbarBox my-2" style={{padding:"0px 50px",overflow:"auto"}}>
             <div className="row scrollbarBox justify-content-between" >
             {
                Inprogress.length > 0 ?
                Inprogress.map((el)=>(
              
              <div className="col-4 d-flex align-items-center justify-content-center boxClientName cursor-pointer mb-1 p-1" style={{maxWidth:"384px",height:"130px"}} onClick={(e)=>DocumentClientPage(el._id,el.clientCompanyName)}>
                <p className="ClientNameBox mb-0">📂{el.clientCompanyName.length > 13 ? el.clientCompanyName.slice(0,13) + "..." : el.clientCompanyName }</p>
               </div>
))
               :
               <>{Loader()}</>
             }
              
                </div>
            </div>
            <hr className="hrLineDocChecker" />
            <div  className="col-12" style={{padding:"0px 30px"}}>
            <div className="row">
              <div className="col-4">
<p className="sommeil mb-0">✅ Clients EN COURS </p>
                </div>
<span className="travaillant pl-4">Les clients ayant signés le contrat et ayant des employés actuellement chez eux.  </span>

                </div>
           </div>
           <div className="col-12 scrollbarBox my-2" style={{padding:"0px 50px",overflow:"auto"}}>
             <div className="row scrollbarBox justify-content-between" >
             {
                ClientSigned.length > 0 ?
                ClientSigned.map((el)=>(
              
              <div className="col-4 d-flex align-items-center justify-content-center boxClientName cursor-pointer mb-1 p-1" style={{maxWidth:"384px",height:"130px"}} onClick={(e)=>DocumentClientPage(el._id,el.clientCompanyName)}>
                <p className="ClientNameBox mb-0">📂{el.clientCompanyName.length > 13 ? el.clientCompanyName.slice(0,13) + "..." : el.clientCompanyName }</p>
               </div>
))
               :
              <>{Loader()}</>
             }
              
                </div>
            </div>
            <hr className="hrLineDocChecker" />
            <div  className="col-12" style={{padding:"0px 30px"}}>
            <div className="row">
              <div className="col-4">
<p className="sommeil mb-0">🗑️ Clients EN archives  </p>
                </div>
<span className="travaillant pl-4">Les clients qui ont été supprimés pour une raison quelconque </span>

                </div>
           </div>
           <div className="col-12 scrollbarBox my-2" style={{padding:"0px 50px",overflow:"auto"}}>
             <div className="row scrollbarBox justify-content-between" >
             {
                Archived.length > 0 ?
                Archived.map((el)=>(
              
              <div className="col-4 d-flex align-items-center justify-content-center boxClientName cursor-pointer mb-1 p-1" style={{maxWidth:"384px",height:"130px"}} onClick={(e)=>DocumentClientPage(el._id,el.clientCompanyName)}>
                <p className="ClientNameBox mb-0">📂{el.clientCompanyName.length > 13 ? el.clientCompanyName.slice(0,13) + "..." : el.clientCompanyName }</p>
               </div>
))
               :
               <>{Loader()}</>
             }
              
                </div>
            </div>
        </div>
        </div>
        

    </>
  );
}
export default DocumentCheck;
