import React,{useEffect, useState,useRef} from "react";
import "../CSS/Header.css";
import { Link } from "react-router-dom";
import HeaderSelect from "../../src/components/Modal/HeaderSelectModal"
import { API_BASE_URL } from "../config/serverApiConfig";
import SearchModal from "./Modal/GlobalSearchModal";
import ErrorBar from '../../src/components/Loader/SearchBarError'


let FilDataCName
let FilDataCNName
const Header = () => {
  const [ModalOpen,setModalOpen]=useState(false)
  const [value,setValue]=useState("")
  const [SearchOpen,setSearchOpen]=useState(false)
 const [filterData,setFilterData]=useState([])as any
 const [data,setData]=useState([])
  const [inputStatus,setInputStatus]=useState(false)
  const [spinner,setSpinner]=useState(false)

  const Modal=()=>{

   if(ModalOpen == true){
    setModalOpen(false)
   }
   else{
    setModalOpen(true)
   }

  }


  const ref = useRef();
  
  useOnClickOutside(ref, () => {setSearchOpen(false)});
  function useOnClickOutside(ref, handler) {
    useEffect(
      () => {
        const listener = (event) => {
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
          handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      },
      [ref, handler,SearchOpen]
    );
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
  },[data])
 


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
  setSpinner(true)
  setSearchOpen(true)
if(e == null ){
  setValue("")
  setSearchOpen(false)
  setInputStatus(false)
  // window.location.reload()

}
else if(e.target.value !== "" && e !== null){
  setInputStatus(true)
  setValue(e.target.value)

if(e.target.value){
  setTimeout(()=>{
    setSpinner(false)

  },600)
}

if( Number.isInteger(Number(e.target.value))){

  
    const FilDataNo =   data.filter(el=>(
      el.candidatPhone !== undefined ?
     el.candidatPhone.includes(e.target.value)
      :
      el.clientPhone !== undefined ?
      el.clientPhone.includes(e.target.value)                                                                                                                                                                                                                                                                                                                                                                                                                                                           
      :
      null
      )
      )

      setFilterData([...FilDataNo])
}
 if(e.target.value){
   FilDataCName =   data.filter((el)=>{
    if(el.clientCompanyName){
    return el.clientCompanyName.toString().toLowerCase() == e.target.value.toString().toLowerCase()
  }
}
  )



}
if(e.target.value){
  FilDataCNName =   data.filter((el)=>{
   if(el.candidatName){
   return el.candidatName.toString().toLowerCase() == e.target.value.toString().toLowerCase()
 }
}
 )
 


}
if(e.target.value){
  const FilData =   data.filter(el=>(

    el.candidatEmail ?
    el.candidatEmail.toLowerCase().includes(value.toLowerCase())
    :
    el.clientEmail ?
    el.clientEmail.toLowerCase().includes(value.toLowerCase())

    :

    el.candidatName ?
    el.candidatName.toString().toLowerCase().replaceAll(" ","").includes(value.toString().toLowerCase().replaceAll(" ",""))
    
    :
    el.clientCompanyName ?
    el.clientCompanyName.toString().toLowerCase().replaceAll(" ","").includes(value.toString().toLowerCase().replaceAll(" ",""))
    :
     null

    )
    )


    setFilterData([...FilDataCName,...FilDataCNName, ...FilData])
}


  



}
else if(e.target.value == ""){
  setSearchOpen(false)
  setSpinner(false)
  setValue("")
}

}

console.log(filterData,"fldata")
  return (
    <>

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
                      <div  className="d-flex cursor-pointer"   onClick={()=>Modal()}>
                    <div className="HeaderModalSelect">
                      <img src={require("../images/headerSelect.svg").default} />
                    </div>
                    <div className="d-flex justify-content-center align-items-center ml-1" >
                      <img src={require("../images/Vector-9.svg").default} />
                    </div>
                    </div>
                    

                      <div className="d-flex mx-2" style={{background: "#F5F6F8",
    border: "1px solid #ADADAD",
    borderRadius: "26px",
    width: "82%"}}>
                        <div className="d-flex align-items-center pl-1">
                        <img  src={require("../images/searchIcon.svg").default} />
                        </div>
                       
                       {
                        inputStatus ?
                        <input style={{border:"0px",background: "#F5F6F8"}} defaultValue={value}  onChange={NameSearch} className="searcInputbOx pl-1" placeholder="Search, Name, Phone, Work, Jobs..." />
                            :
                       <input style={{border:"0px",background: "#F5F6F8"}} value=""   onChange={NameSearch} className="searcInputbOx pl-1" placeholder="Search, Name, Phone, Work, Jobs..." />
                       }
                     {
                         value ?
                         
                         <div className="d-flex align-items-center px-1 clear cursor-pointer" onClick={()=>NameSearch(null)}>
                             {spinner ?  <div className="spinner-border text-dark" role="status" style={{width:"1rem" ,height :"1rem"}}>
  <span className="visually-hidden">Loading...</span>
</div> :  <b>X</b>}
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
                
 {
      SearchOpen ? 
       <div className={filterData.length > 0? "inputData p-1" : "NoinputData p-1" }>
   
        {
        filterData.length > 0 ?
        filterData.map((el)=>(
        <SearchModal  props={el} closeModal={setSearchOpen}  value={setInputStatus}/>
              ))

              :
              <div ref={ref} className="d-flex align-items-center" >
                <ErrorBar  />
            <p className="ErrorSearchBox mb-0">No Card ! Please Enter Valid Name.</p>
                </div>
 }
           
</div>
       :
   null
    }
               {
                ModalOpen ? 
<HeaderSelect   closeModal={setModalOpen}   />
           
                : 
                null
               }
        

    </>
  );
};
export default Header;
