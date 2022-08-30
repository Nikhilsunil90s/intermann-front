import React,{useEffect, useState} from "react";
import "../CSS/Header.css";
import { Link } from "react-router-dom";
import HeaderSelect from "../../src/components/Modal/HeaderSelectModal"
import { API_BASE_URL } from "../config/serverApiConfig";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [ModalOpen,setModalOpen]=useState(false)
  const [value,setValue]=useState("")
  const [SearchOpen,setSearchOpen]=useState(false)
 const [filterData,setFilterData]=useState([])as any
 const [data,setData]=useState([])


 const navigate = useNavigate()

  const Modal=()=>{

   if(ModalOpen == true){
    setModalOpen(false)
   }
   if(ModalOpen == false){
    setModalOpen(true)
   }

  }

  const ClearData=()=>{
    setFilterData([])
    NameSearch(null)
  }


  const ListPage=(data)=>{
    if(data.candidatName){
     if(data.candidatStatus =="To-Do"){
      navigate("/todolistCard",{state:data})
     }
     if(data.candidatStatus =="In-Progress"){
      navigate("/embauchlistCard",{state:data})

    }
    if(data.candidatStatus =="Archived"){
      navigate("/archivedlistCard",{state:data})
    }
    }
  else if(data.clientCompanyName){

    }
  }



  useEffect(() => {
   if(data.length == 0){
    fetchProfiles().then(filteredresponse => {
      setData([...filteredresponse.data])
    })
      .catch(err => {
        console.log(err);
      })
   }

  })
  console.log(data,"data")
  const fetchProfiles = async () => {
    return await fetch(API_BASE_URL + "getProfiles", {
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
const NameSearch=(e)=>{
  setSearchOpen(true)
if(e == null ){
  setSearchOpen(false)
  setValue("")
}
else if(e.target.value !== "" && e !== null){
  setValue(e.target.value)


  const FilData =   data.filter(el=>(
    el.candidatName ?
    el.candidatName.toLowerCase().includes(e.target.value.toLowerCase())
    
    :
    el.clientCompanyName.toLowerCase().includes(e.target.value.toLowerCase())
    )
    )
    setFilterData([...FilData])
}

}
console.log(filterData,"filterdata")
// useEffect(()=>{
// if(filterData.length !==0){
//   if(filterData.length > 0){
//     if(JSON.stringify(filterData).includes(JSON.stringify("In-Progress"))){
//      setStatus({...status,InPro:true})
//     }  if(JSON.stringify(filterData).includes(JSON.stringify("To-Do"))){
//      setStatus({...status,Todo:true})
//     }  if(JSON.stringify(filterData).includes(JSON.stringify("Archived"))){
//      setStatus({...status,Archive:true})
//     } 
// }
// }
// },[filterData])
  return (
    <>

   
     
        {/* <div className="container-fluid">
        <div className="row" style={{ width: "100%", background: "#ffff" }}>
       
        
            <div className="col-12"> */}
            {/* <nav className="navbar navbar-expand-lg navbar-light">
              <div className="collapse navbar-collapse" id="navbarText" style={{ height: "50px" }}> */}
                <div className="col-12 px-0 position" >
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
                        <input style={{border:"0px",background: "#F5F6F8"}} defaultValue={SearchOpen !== false ?  value : "" }  onChange={NameSearch} className="searcInputbOx pl-1" placeholder="Search, Name, Phone, Work, Jobs..." />
                     {
                         value !==""?
                         <div className="d-flex align-items-center px-1 clear cursor-pointer" onClick={()=>NameSearch(null)}>
                                 X
                        </div>
                        :
                        null
                     }   
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
   
        {filterData.map((el)=>(
              <div className="col-12 d-flex pb-1 cursor-pointer" onClick={()=>ListPage(el)}> 
              <div className="row">
              <div className="col-2">
               <img  src={require("../images/mencard.svg").default}  />
                </div>
                <div className="col-3 nameCard">
                 <p className="mb-0">{el.candidatName ? el.candidatName.length > 16 ?  el.candidatName.slice(0,15) + "..." : el.candidatName:  el.clientCompanyName ?  el.clientCompanyName.length > 16 ? el.clientCompanyName.slice(0,15) + "..." : el.clientCompanyName: "No Card!"}</p>
                  </div>
                  <div className="col-3 nameCard ml-1">
                    <p className="mb-0">{el.candidatActivitySector ? el.candidatActivitySector.length > 16 ?  el.candidatActivitySector.slice(0,15) + "..." :  el.candidatActivitySector : el.clientJob ? el.clientJob.length > 16 ? el.clientJob.slice(0,15) : el.clientJob : "No Job!"}</p>
                    </div>
                        
                  <div className="col-3 nameCardbtn ml-1">
              
              {
                el.candidatStatus == "To-Do" || el.jobStatus == "To-Do" ?
                <button className="todoBtnStyleCard p-0" >
                To Do
              </button>
              :
              el.candidatStatus == "In-Progress" || el.jobStatus == "In-Progress" ?
             
            <button className="EmbaucheCardSearchBtn p-0">IN PROGRESS</button>

              :
              el.candidatStatus == "Archived" || el.jobStatus == "Archived"?
             
              <button className="ArchivedCardSearchBtn p-0">Archive</button>
            
             :
             null
              }  
                    </div>
                </div>
              </div>
          ))
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
