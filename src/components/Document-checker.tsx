import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { API_BASE_URL } from "../config/serverApiConfig";
import ErrorLoader from "../components/Loader/SearchBarError";
import Error from "../components/Loader/loader";
import "../CSS/Canceled.css"
import $ from "jquery"
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
  const [activeTab,setActiveTab]=useState("scrollspyHeading1")
  const [TodoMobile,setTodoMobile]=useState(true)
  const [InprogressMobile,setInprogressMobile]=useState(false)
  const [Contract,setContract]=useState(false)
  const [Archive,setArchive]=useState(false)
  const [onClickMenuOpen,setMenuOpen]=useState(false)
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


   const onColorChange=(name:any)=>{
    setActiveTab(name)
    setInprogressMobile(false)
    setContract(false)
    setArchive(false)
    setTodoMobile(false)
    if(name == "todo"){
      setMenuOpen(false)
      setTodoMobile(true)
     
    }
    if(name == "inprogress"){
      setMenuOpen(false)
      setInprogressMobile(true)
     


    }  if(name == "contract"){
      setMenuOpen(false)
      setContract(true)
     

    }  if(name == "archive"){
      setMenuOpen(false)
      setArchive(true)
     
    }
   }


   const CloseMenu=()=>{
   if(onClickMenuOpen == true){
    setMenuOpen(false)
   }
   if(onClickMenuOpen == false){
    setMenuOpen(true)
   }
    
   }
  return (
    <>
      <div className="container-fluied bg-ContractPage">
        <div className="row searchBarChecker">
          <div className="col-12 d-flex justify-content-center p-1 mt-2">
            <span>
              <img
                src={require("../images/logo-header.svg").default}
                className="filter-logo"
                style={{ width: "100px" }}
              />
            </span>
            <img
              src={require("../images/LogoName.svg").default}
              className="filter-text LogoIntermann"
              style={{ paddingLeft: "10px" }}
            />
          </div>
          <div className="col-12 text-center" style={{padding:"0px 20px"}}>
        <p className="verification mb-0">Vérification de documents</p>
        <p className="pouvez mb-0">Les clients de la société sont listés sur cette page, vous pouvez cliquer sur un client et faire un controle des documents obligatoires.</p><p className="pouvezz">Chaque client doit avoir accès à sa propre page qui doit lui etre communiqué par Jeremy</p>

            </div>
            
            <div className="col-12 ">

            <div id="navbar-example2" className="row align-items-center bg-light py-1">
              <div className="col-3 px-0"  >
              <a className={activeTab == "scrollspyHeading1" ? "sommeilTabActive"  : "sommeilTab" }  onClick={()=>onColorChange("scrollspyHeading1")} href="#scrollspyHeading1">😴 Clients en sommeil</a>
              </div>
              <div className="col-3 px-0">
              <a className={activeTab == "scrollspyHeading2" ? "sommeilTabActive"  : "sommeilTab" } onClick={()=>onColorChange("scrollspyHeading2")}   href="#scrollspyHeading2">🔍 Clients en cours de recherche</a>
              </div>
              <div className="col-3 px-0">
              <a className={activeTab == "scrollspyHeading3" ? "sommeilTabActive"  : "sommeilTab" } onClick={()=>onColorChange("scrollspyHeading3")}  href="#scrollspyHeading3">✅ Clients EN COURS</a>
              </div>
              <div className="col-3 px-0">
              <a className={activeTab == "scrollspyHeading4" ? "sommeilTabActive"  : "sommeilTab" } onClick={()=>onColorChange("scrollspyHeading4")}  href="#scrollspyHeading4">🗑️ Clients EN archives ?</a>
              </div>
</div>
            </div>
  
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
                  <div className="col-lg-4 col-sm-6 d-flex align-items-center justify-content-center boxClientName cursor-pointer mb-1 p-1" style={{maxWidth:"32%",height:"130px"}} onClick={(e)=>DocumentClientPage(el._id,el.clientCompanyName)}>
                  <p className="ClientNameBox mb-0">📂{el.clientCompanyName.length > 13 ? el.clientCompanyName.slice(0,13).toLocaleUpperCase() + "..." : el.clientCompanyName.toLocaleUpperCase() }</p>
                 </div>
                ))
                :
                todoClient.map((el)=>(
              
              <div className="col-lg-4 col-sm-6  d-flex align-items-center justify-content-center boxClientName cursor-pointer mb-1 p-1" style={{maxWidth:"32%",height:"130px"}} onClick={(e)=>DocumentClientPage(el._id,el.clientCompanyName)}>
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
                  <div className="col-lg-4 col-sm-6  d-flex align-items-center justify-content-center boxClientName cursor-pointer mb-1 p-1" style={{maxWidth:"32%",height:"130px"}} onClick={(e)=>DocumentClientPage(el._id,el.clientCompanyName)}>
                <p className="ClientNameBox mb-0">📂{el.clientCompanyName.length > 13 ? el.clientCompanyName.slice(0,13).toLocaleUpperCase() + "..." : el.clientCompanyName.toLocaleUpperCase() }</p>
               </div>
                ))
                :
                Inprogress.map((el)=>(
              
              <div className="col-lg-4 col-sm-6  d-flex align-items-center justify-content-center boxClientName cursor-pointer mb-1 p-1" style={{maxWidth:"32%",height:"130px"}} onClick={(e)=>DocumentClientPage(el._id,el.clientCompanyName.toLocaleUpperCase())}>
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
                  <div className="col-lg-4 col-sm-6  d-flex align-items-center justify-content-center boxClientName cursor-pointer mb-1 p-1" style={{maxWidth:"32%",height:"130px"}} onClick={(e)=>DocumentClientPage(el._id,el.clientCompanyName)}>
                <p className="ClientNameBox mb-0">📂{el.clientCompanyName.length > 13 ? el.clientCompanyName.slice(0,13).toLocaleUpperCase() + "..." : el.clientCompanyName.toLocaleUpperCase() }</p>
               </div>
                ))
                :
                ClientSigned.map((el)=>(
              
              <div className="col-lg-4 col-sm-6 d-flex align-items-center justify-content-center boxClientName cursor-pointer mb-1 p-1" style={{maxWidth:"32%",height:"130px"}} onClick={(e)=>DocumentClientPage(el._id,el.clientCompanyName)}>
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
                  <div className="col-lg-4 col-sm-6  d-flex align-items-center justify-content-center boxClientName cursor-pointer mb-1 p-1" style={{maxWidth:"32%",height:"130px"}} onClick={(e)=>DocumentClientPage(el._id,el.clientCompanyName)}>
                <p className="ClientNameBox mb-0">📂{el.clientCompanyName.length > 13 ? el.clientCompanyName.slice(0,13).toLocaleUpperCase() + "..." : el.clientCompanyName.toLocaleUpperCase() }</p>
               </div>
                ))
                :
                Archived.map((el)=>(
              
              <div className="col-lg-4 col-sm-6  d-flex align-items-center justify-content-center boxClientName cursor-pointer mb-1 p-1" style={{maxWidth:"32%",height:"130px"}} onClick={(e)=>DocumentClientPage(el._id,el.clientCompanyName)}>
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
        <div className="row MobileView mb-1" style={{height:"100vh"}}>
          <div className="col-12 p-1" style={{height:"10vh"}}>
          <div className="row px-1 mt-1">
            <div className="col-4"  onClick={(e)=>CloseMenu()}>

            <img   src={require(onClickMenuOpen ?   "../images/menuClose.svg" : "../images/menu.svg").default}  />
            </div>
            <div className="col-8 d-flex  justify-content-end align-items-center pr-1">
            <span >
              <img
                src={require("../images/logo-header.svg").default}
                className="filter-logo"
                style={{ width: "92%" }}
               
              />
            </span>
            <img
              src={require("../images/LogoName.svg").default}
              className="filter-text LogoIntermann"
              style={{ paddingLeft: "0px",width:"70%" }}
            />
            </div>
          </div>
          </div>

          {
            onClickMenuOpen ?
             
            <div className="col-12 " style={{background:"#032339",height:"90vh"}}>
            <div className="row px-2"style={{height:"90%"}} >
<div className="col-12"  style={{background:"#ffff",borderRadius:"15px",}}>
<ul className="pt-1" style={{listStyle:"none"}}> 

  <li className={activeTab == "todo" ? "somilActiveTab"  : "somil" }  onClick={()=>onColorChange("todo")}>😴 Clients en sommeil</li>
  <li  className={activeTab == "inprogress" ? "somilActiveTab"  : "somil" } onClick={()=>onColorChange("inprogress")} >🔍 Clients en cours de recherche</li>
  <li className={activeTab == "contract" ? "somilActiveTab"  : "somil" } onClick={()=>onColorChange("contract")}>✅ Clients EN COURS</li>
  <li className={activeTab == "archive" ? "somilActiveTab"  : "somil" } onClick={()=>onColorChange("archive")}>🗑️ Clients EN archives </li>
</ul>
  </div>
              </div>
                 
              </div>


            :
            <>
            <div className="col-12 text-center mt-1" style={{padding:"0px 20px"}}>
            <p className="verification mb-0">Vérification de documents</p>
            <p className="pouvez mb-1 ">Les clients de la société sont listés sur cette page, vous pouvez cliquer sur un client et faire un controle des documents obligatoires.</p><b className="pouvezz ">Chaque client doit avoir accès à sa propre page qui doit lui etre communiqué par Jeremy</b>
    
                </div>
                <div className="LineHR" />
                <div className="col-12 text-center">
                <p className="travaillant">Les clients ne travaillant pas encore avec nous, vous pouvez quand meme voir l’offre envoyé. </p>
    
                </div>
                <div className="col-12">
                  <div className="row justify-content-around">
                  {
                    TodoMobile ?
                    todoClient.length > 0 ?
                    todoClient.map((el)=>(
                  
                  <div className="col-6  d-flex align-items-center justify-content-center boxClientName cursor-pointer mb-1 p-1"  style={{maxWidth:"45%",height:"100px"}} onClick={(e)=>DocumentClientPage(el._id,el.clientCompanyName)}>
                    <p className="ClientNameBox mb-0">📂{el.clientCompanyName.length > 13 ? el.clientCompanyName.slice(0,13).toLocaleUpperCase() + "..." : el.clientCompanyName.toLocaleUpperCase() }</p>
                   </div>
    ))
                   :
                   <div className="col-12 d-flex justify-content-center">
                    <Error   />
                    </div>
                   :
    
                null
                  }
                  {
                      InprogressMobile ?
                        Inprogress.length > 0 ?
                        Inprogress.map((el)=>(
                      
                      <div className="col-6  d-flex align-items-center justify-content-center boxClientName cursor-pointer mb-1 p-1" style={{maxWidth:"45%",height:"100px"}} onClick={(e)=>DocumentClientPage(el._id,el.clientCompanyName.toLocaleUpperCase())}>
                        <p className="ClientNameBox mb-0">📂{el.clientCompanyName.length > 13 ? el.clientCompanyName.slice(0,13).toLocaleUpperCase() + "..." : el.clientCompanyName.toLocaleUpperCase() }</p>
                       </div>
        ))
        :
        <p>test</p>
                       :
                       null
                     
                  }
                    {
                      Contract ?
                        ClientSigned.length > 0 ?
                        ClientSigned.map((el)=>(
                      
                      <div className="col-6  d-flex align-items-center justify-content-center boxClientName cursor-pointer mb-1 p-1" style={{maxWidth:"45%",height:"100px"}} onClick={(e)=>DocumentClientPage(el._id,el.clientCompanyName.toLocaleUpperCase())}>
                        <p className="ClientNameBox mb-0">📂{el.clientCompanyName.length > 13 ? el.clientCompanyName.slice(0,13).toLocaleUpperCase() + "..." : el.clientCompanyName.toLocaleUpperCase() }</p>
                       </div>
        ))
        :
        <p>test</p>
                       :
                       null
                     
                  }
                   {
                      Archive ?
                        Archived.length > 0 ?
                        Archived.map((el)=>(
                      
                      <div className=" col-6  d-flex align-items-center justify-content-center boxClientName cursor-pointer mb-1 p-1" style={{maxWidth:"45%",height:"100px"}} onClick={(e)=>DocumentClientPage(el._id,el.clientCompanyName.toLocaleUpperCase())}>
                        <p className="ClientNameBox mb-0">📂{el.clientCompanyName.length > 13 ? el.clientCompanyName.slice(0,13).toLocaleUpperCase() + "..." : el.clientCompanyName.toLocaleUpperCase() }</p>
                       </div>
        ))
        :
        <p>test</p>
                       :
                       null
                     
                  }
                </div>
                </div>
                </>
          }
       
        </div>
        </div>
        

    </>
  );
}
export default DocumentCheck;
