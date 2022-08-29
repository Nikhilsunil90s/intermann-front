import React,{useEffect, useState} from "react";
import "../CSS/Header.css";
import { Link } from "react-router-dom";
import HeaderSelect from "../../src/components/Modal/HeaderSelectModal"
import { API_BASE_URL } from "../config/serverApiConfig";

const Header = () => {
  const [ModalOpen,setModalOpen]=useState(false)
  const [SearchOpen,setSearchOpen]=useState(false)
 const [filterData,setFilterData]=useState([])as any
 const [status,setStatus]=useState({
  Todo:false,
  InPro:false,
  Archive:false,
  PreSelected:false
 })
  const Modal=()=>{

   if(ModalOpen == true){
    setModalOpen(false)
   }
   if(ModalOpen == false){
    setModalOpen(true)
   }

  }
const NameSearch=(e)=>{
  setSearchOpen(true)
   fetch(`${API_BASE_URL}getCandidats/?candidatName=${e.target.value}`, {

    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((reD) => reD.json())
    .then((result) => {
      {
        if(result.total > 0){
          setFilterData([...result.data]);  
          
        }else{
          return
        }
        // setFilterData([...result.data]);
     
    
      }
      // setStatus(result.status);
    })
    .catch((err) => err);
}
useEffect(()=>{
if(filterData.length !==0){
  if(filterData.length > 0){
    if(JSON.stringify(filterData).includes(JSON.stringify("In-Progress"))){
     setStatus({...status,InPro:true})
    }  if(JSON.stringify(filterData).includes(JSON.stringify("To-Do"))){
     setStatus({...status,Todo:true})
    }  if(JSON.stringify(filterData).includes(JSON.stringify("Archived"))){
     setStatus({...status,Archive:true})
    } 
}
}
},[filterData])

  return (
    <>

   
     
        {/* <div className="container-fluid">
        <div className="row" style={{ width: "100%", background: "#ffff" }}>
       
        
            <div className="col-12"> */}
            {/* <nav className="navbar navbar-expand-lg navbar-light">
              <div className="collapse navbar-collapse" id="navbarText" style={{ height: "50px" }}> */}
                <div className="col-12 px-0 position">
                  <div className="row m-0 mainRow">
                    <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5">
                   <div className="row">
                  <div className="d-flex">
                     <Link
                      className="nav-link  p-0"
                      aria-current="page"
                      to="/addCustomer"
                      style={{backgroundColor:"none",marginRight:"10px"}}
                    >
                      <button className="btn btn-1">Add customer</button>
                    </Link>
           
                
                 <Link className="nav-link p-0" to="/addCandidate">
                      <button className="btn btn-2"> Add Candidate</button>
                    </Link>
                    </div>
                 </div>
                </div>


                <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7">
                   <div className="row text-end">
                 
                    <div className="d-flex justify-content-end">
                      <div  className="d-flex cursor-pointer" onClick={()=>Modal()}>
                    <div className="HeaderModalSelect">
                      <img src={require("../images/headerSelect.svg").default} />
                    </div>
                    <div className="d-flex justify-content-center align-items-center ml-1" >
                      <img src={require("../images/Vector-9.svg").default} />
                    </div>
                    </div>
                     {/* <a
                        className="nav-link p-0"
                        href="https://www.intermann.ro/"
                        target="_blank"
                      >
                        <button className="btn btn-003">
                        VOIR LE SITE EN ROUMAIN
                        </button>
                      </a>
                 
                   
                     <a
                        className="nav-link p-0"
                        href="https://www.intermann.fr/"
                        target="_blank"
                        style={{margin:"0px 20px"}}
                      >
                        <button className=" btn btn-004">
                        VOIR LE SITE EN FRANçAIS
                        </button>
                      </a> */}

                      <div className="d-flex mx-2" style={{background: "#F5F6F8",
    border: "1px solid #ADADAD",
    borderRadius: "26px",
    width: "82%"}}>
                        <div className="d-flex align-items-center pl-1">
                        <img  src={require("../images/searchIcon.svg").default} />
                        </div>
                        <input style={{border:"0px",background: "#F5F6F8"}} onChange={NameSearch} className="searcInputbOx pl-1" placeholder="Search, Name, Phone, Work, Jobs..." />
                      </div>
                      </div>
                   </div>
                </div>
                    </div>            
                  </div>
                {/* </div>
               </nav> */}
 {
      SearchOpen ? 
       <div className="inputData p-1" >
        {status.Todo ?
          filterData.map((el)=>(
              <div className="col-12 d-flex pb-1"> 
              <div className="row">
              <div className="col-2">
               <img  src={require("../images/mencard.svg").default}  />
                </div>
                <div className="col-3 nameCard">
<p className="mb-0">{el.candidatName.length > 7 ? el.candidatName.slice(0,7) + ".." : el.candidatName}</p>
                  </div>
                  <div className="col-3 nameCard ml-1">
                    <p className="mb-0">{el.candidatActivitySector}</p>
                    </div>
                        
                  <div className="col-3">
                  <button className="todoBtnStyle p-0">
                      <img style={{width:"8%"}} src={require("../images/briefcase2.svg").default} />
                    </button>
                    </div>
                </div>
              </div>
          ))
        :
        null
        }
             {status.InPro ?
          filterData.map((el)=>(
              <div className="col-12 d-flex pb-1"> 
              <div className="row">
               <div className="col-2">
               <img  src={require("../images/mencard.svg").default}  />
                </div>
                <div className="col-3 nameCard">
<p className="mb-0">{el.candidatName.length > 7 ? el.candidatName.slice(0,7) + ".." : el.candidatName}</p>
                  </div>
                  <div className="col-3 nameCard ml-1">
                    <p className="mb-0">{el.candidatActivitySector}</p>
                    </div>
                        
                  <div className="col-3">
                  <button className="InProLargebtn p-1">
                      {/* <img src={require("../images/thundermini.svg").default} /> */}
                      IN-PRO
                    </button>
                    </div>
                </div>
              </div>
          ))
        :
        null
        }
             {status.Archive ?
          filterData.map((el)=>(
              <div className="col-12 d-flex pb-1"> 
             <div className="row">
               <div className="col-2">
               <img  src={require("../images/mencard.svg").default}  />
                </div>
                <div className="col-3 nameCard">
<p className="mb-0">{el.candidatName.length > 7 ? el.candidatName.slice(0,7) + ".." : el.candidatName}</p>
                  </div>
                  <div className="col-3 nameCard ml-1">
                    <p className="mb-0">{el.candidatActivitySector}</p>
                    </div>
                        
                  <div className="col-3">
                  <button className="ArchiveLargebtn pb-1 p-0"><img src={require("../images/ArchivedBtn.svg").default} /></button>

                        
                    </div>
                </div>
              </div>
          ))
        :
        null
        }
       </div>

       :
   null
    }
               {
                ModalOpen ? 
<HeaderSelect   closeModal={setModalOpen} />
           
                : 
                null
               }
        

    </>
  );
};
export default Header;
