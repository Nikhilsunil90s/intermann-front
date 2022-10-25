import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { API_BASE_URL } from "../config/serverApiConfig";
import ErrorLoader from "../components/Loader/SearchBarError";
import Error from "../components/Loader/loader";
import "../CSS/Canceled.css"

function DocumentCheck() {
  const [data,setData]=useState([])
  const [todoClient,settodoClient]=useState([])
  const [Inprogress,setInprogress]=useState([])
  const [FilterData,setFilterData]=useState([])
  const [Archived,setArchived]=useState([])
  const [ClientSigned,setClientSigned]=useState([])
  const [LoaderFails,setLoaderFails]=useState(true)
  const [FilterTodoFalse,setFilterTodoFalse]=useState(false)
  const [FilterPFalse,setFilterPFalse]=useState(false)
  const [FilterSFalse,setFilterSFalse]=useState(false)
  const [FilterAFalse,setFilterAFalse]=useState(false)


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

  const FilterByName =(e)=>{
    setFilterTodoFalse(false)
    setFilterPFalse(false)
    setFilterSFalse(false)
    setFilterAFalse(false)

    if(e.target.name === "To-Do"){
      let TClient= todoClient.filter((el)=>(
        el.clientCompanyName.toString().toLowerCase().replaceAll(" ","").includes(e.target.value.toString().toLowerCase().replaceAll(" ",""))
    ))
    setFilterTodoFalse(true)
    setFilterData([...TClient])
    }
    if(e.target.name === "inProgress"){
      let TClient= Inprogress.filter((el)=>(
        el.clientCompanyName.toString().toLowerCase().replaceAll(" ","").includes(e.target.value.toString().toLowerCase().replaceAll(" ",""))
    ))
    setFilterPFalse(true)
    setFilterData([...TClient])
    }
    if(e.target.name === "Signed"){
      let TClient= ClientSigned.filter((el)=>(
        el.clientCompanyName.toString().toLowerCase().replaceAll(" ","").includes(e.target.value.toString().toLowerCase().replaceAll(" ",""))
    ))
    setFilterSFalse(true)
    setFilterData([...TClient])
    }
    if(e.target.name === "Archive"){
      let TClient= Archived.filter((el)=>(
        el.clientCompanyName.toString().toLowerCase().replaceAll(" ","").includes(e.target.value.toString().toLowerCase().replaceAll(" ",""))
    ))
    setFilterAFalse(true)
    setFilterData([...TClient])
    }
    
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
     return await fetch(API_BASE_URL + "getClientsForDocs", {
       method: "GET",
       headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
       },
     })
       .then((resD) => resD.json())
       .then((reD) => reD)
       .catch((err) => err);
   };

   function openCity(e:any, cityName:any) {
    var i, x, tablinks;
    x = document.getElementsByClassName("city");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
    }
    document.getElementById(cityName).style.display = "block";
    e.currentTarget.className += " w3-red";
  }

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
            {/* <div className="col-12 ">

            <div id="navbar-example2" className="row align-items-center bg-light py-1">
              <div className="col-3 px-0"  onClick={(e)=>openCity(e,'sommeil')}>
              <a className="sommeilTab" href="#scrollspyHeading1">😴 Clients en sommeil</a>
              </div>
              <div className="col-3 px-0">
              <a className="sommeilTab" onClick={(e)=>openCity(e,'recherche')} href="#scrollspyHeading2">🔍 Clients en cours de recherche</a>
              </div>
              <div className="col-3 px-0">
              <a className="sommeilTab" onClick={(e)=>openCity(e,'COURS')} href="#scrollspyHeading3">✅ Clients EN COURS</a>
              </div>
              <div className="col-3 px-0">
              <a className="sommeilTab" onClick={(e)=>openCity(e,'archives')} href="#scrollspyHeading4">🗑️ Clients EN archives ?</a>
              </div>
</div>
            </div> */}
  
             <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-offset="0" className="scrollspy-example" tabIndex={0}>
           
             <hr className="hrLineDocChecker" />
            <div  className="col-12" id="scrollspyHeading1" style={{padding:"0px 30px"}}>

            <div className="row">
              <div className="col-4">
<p className="sommeil mb-0">😴 Clients en sommeil</p>
                </div>
                <div className="col-8 d-flex justify-content-end pr-3">
                <div className="wrapBar">
   <div className="searchBarClient">
      <input type="text" className="searchTerm" name="To-Do" onChange={FilterByName} placeholder="😴 Clients en sommeil ?" />
      <button type="submit" className="searchButton">
        <i className="fa fa-search"></i>
     </button>
   </div>
</div>
                </div>
<span className="travaillant pl-4">Les clients ne travaillant pas encore avec nous, vous pouvez quand meme voir l’offre envoyé. </span>

                </div>
           </div>
           <div className="col-12 scrollbarBox my-2" style={{padding:"0px 50px",overflow:"auto"}}>
             <div className="row scrollbarBox  justify-content-between" >
             {
                todoClient.length > 0 ?
                FilterTodoFalse ? 
                FilterData.map((el)=>(
                  <div className="col-4 d-flex align-items-center justify-content-center boxClientName cursor-pointer mb-1 p-1" style={{maxWidth:"32%",height:"130px"}} onClick={(e)=>DocumentClientPage(el._id,el.clientCompanyName)}>
                  <p className="ClientNameBox mb-0">📂{el.clientCompanyName.length > 13 ? el.clientCompanyName.slice(0,13).toLocaleUpperCase() + "..." : el.clientCompanyName.toLocaleUpperCase() }</p>
                 </div>
                ))
                :
                todoClient.map((el)=>(
              
              <div className="col-4 d-flex align-items-center justify-content-center boxClientName cursor-pointer mb-1 p-1" style={{maxWidth:"32%",height:"130px"}} onClick={(e)=>DocumentClientPage(el._id,el.clientCompanyName)}>
                <p className="ClientNameBox mb-0">📂{el.clientCompanyName.length > 13 ? el.clientCompanyName.slice(0,13).toLocaleUpperCase() + "..." : el.clientCompanyName.toLocaleUpperCase() }</p>
               </div>
))
               :
               <>{Loader()}</>
             }
              
                </div>
            </div>
            <hr className="hrLineDocChecker" />
            <div  className="col-12" id="scrollspyHeading2" style={{padding:"0px 30px"}}>
            <div className="row">
              <div className="col-6">
<p className="sommeil mb-0">🔍 Clients en cours de recherche</p>
                </div>     <div className="col-6 d-flex justify-content-end pr-3">
                <div className="wrapBar" style={{width:"55%"}}>
   <div className="searchBarClient">
      <input type="text" className="searchTerm" name="inProgress" onChange={FilterByName} placeholder="🔍 Clients en cours de recherche ?" />
      <button type="submit" className="searchButton">
        <i className="fa fa-search"></i>
     </button>
   </div>
</div>
                </div>
<span className="travaillant pl-4">Les clients ayant signés l’offre sans pour autant avoir des employés. </span>

                </div>
           </div>
           <div className="col-12 scrollbarBox my-2" style={{padding:"0px 50px",overflow:"auto"}}>
             <div className="row scrollbarBox  justify-content-between" >
             {
                Inprogress.length > 0 ?
                FilterPFalse ?
                FilterData.map((el)=>(
                  <div className="col-4 d-flex align-items-center justify-content-center boxClientName cursor-pointer mb-1 p-1" style={{maxWidth:"32%",height:"130px"}} onClick={(e)=>DocumentClientPage(el._id,el.clientCompanyName)}>
                <p className="ClientNameBox mb-0">📂{el.clientCompanyName.length > 13 ? el.clientCompanyName.slice(0,13).toLocaleUpperCase() + "..." : el.clientCompanyName.toLocaleUpperCase() }</p>
               </div>
                ))
                :
                Inprogress.map((el)=>(
              
              <div className="col-4 d-flex align-items-center justify-content-center boxClientName cursor-pointer mb-1 p-1" style={{maxWidth:"32%",height:"130px"}} onClick={(e)=>DocumentClientPage(el._id,el.clientCompanyName.toLocaleUpperCase())}>
                <p className="ClientNameBox mb-0">📂{el.clientCompanyName.length > 13 ? el.clientCompanyName.slice(0,13).toLocaleUpperCase() + "..." : el.clientCompanyName.toLocaleUpperCase() }</p>
               </div>
))
               :
               <>{Loader()}</>
             }
              
                </div>
            </div>
            <hr className="hrLineDocChecker" />
            <div  className="col-12" id="scrollspyHeading3" style={{padding:"0px 30px"}}>
            <div className="row">
              <div className="col-4">
<p className="sommeil mb-0">✅ Clients EN COURS </p>
                </div>
                <div className="col-8 d-flex justify-content-end pr-3">
                <div className="wrapBar">
   <div className="searchBarClient">
      <input type="text" className="searchTerm" name="Signed" onChange={FilterByName} placeholder="✅ Clients EN COURS ?" />
      <button type="submit" className="searchButton">
        <i className="fa fa-search"></i>
     </button>
   </div>
</div>
                </div>
<span className="travaillant pl-4">Les clients ayant signés le contrat et ayant des employés actuellement chez eux.  </span>

                </div>
           </div>
           <div className="col-12 scrollbarBox my-2" style={{padding:"0px 50px",overflow:"auto"}}>
             <div className="row scrollbarBox  justify-content-between" >
             {
                ClientSigned.length > 0 ?
                FilterSFalse ?
                FilterData.map((el)=>(
                  <div className="col-4 d-flex align-items-center justify-content-center boxClientName cursor-pointer mb-1 p-1" style={{maxWidth:"32%",height:"130px"}} onClick={(e)=>DocumentClientPage(el._id,el.clientCompanyName)}>
                <p className="ClientNameBox mb-0">📂{el.clientCompanyName.length > 13 ? el.clientCompanyName.slice(0,13).toLocaleUpperCase() + "..." : el.clientCompanyName.toLocaleUpperCase() }</p>
               </div>
                ))
                :
                ClientSigned.map((el)=>(
              
              <div className="col-4 d-flex align-items-center justify-content-center boxClientName cursor-pointer mb-1 p-1" style={{maxWidth:"32%",height:"130px"}} onClick={(e)=>DocumentClientPage(el._id,el.clientCompanyName)}>
                <p className="ClientNameBox mb-0">📂{el.clientCompanyName.length > 13 ? el.clientCompanyName.slice(0,13).toLocaleUpperCase() + "..." : el.clientCompanyName.toLocaleUpperCase() }</p>
               </div>
))
               :
              <>{Loader()}</>
             }
              
                </div>
            </div>
            <hr className="hrLineDocChecker" />
            <div  className="col-12" id="scrollspyHeading4" style={{padding:"0px 30px"}}>
            <div className="row">
              <div className="col-4">
<p className="sommeil mb-0">🗑️ Clients EN archives  </p>
                </div>
                <div className="col-8 d-flex justify-content-end pr-3">
                <div className="wrapBar">
   <div className="searchBarClient">
      <input type="text" className="searchTerm" name="Archive" onChange={FilterByName} placeholder="🗑️ Clients EN archives ?" />
      <button type="submit" className="searchButton">
        <i className="fa fa-search"></i>
     </button>
   </div>
</div>
                </div>
<span className="travaillant pl-4">Les clients qui ont été supprimés pour une raison quelconque </span>

                </div>
           </div>
           <div className="col-12 scrollbarBox my-2" style={{padding:"0px 50px",overflow:"auto"}}>
             <div className="row scrollbarBox  justify-content-between" >
             {
                Archived.length > 0 ?
                FilterAFalse ?
                FilterData.map((el)=>(
                  <div className="col-4 d-flex align-items-center justify-content-center boxClientName cursor-pointer mb-1 p-1" style={{maxWidth:"32%",height:"130px"}} onClick={(e)=>DocumentClientPage(el._id,el.clientCompanyName)}>
                <p className="ClientNameBox mb-0">📂{el.clientCompanyName.length > 13 ? el.clientCompanyName.slice(0,13).toLocaleUpperCase() + "..." : el.clientCompanyName.toLocaleUpperCase() }</p>
               </div>
                ))
                :
                Archived.map((el)=>(
              
              <div className="col-4 d-flex align-items-center justify-content-center boxClientName cursor-pointer mb-1 p-1" style={{maxWidth:"32%",height:"130px"}} onClick={(e)=>DocumentClientPage(el._id,el.clientCompanyName)}>
                <p className="ClientNameBox mb-0">📂{el.clientCompanyName.length > 13 ? el.clientCompanyName.slice(0,13).toLocaleUpperCase() + "..." : el.clientCompanyName.toLocaleUpperCase() }</p>
               </div>
))
               :
               <>{Loader()}</>
             }
              
                </div>
            </div>
            </div>
        </div>
        </div>
        

    </>
  );
}
export default DocumentCheck;
