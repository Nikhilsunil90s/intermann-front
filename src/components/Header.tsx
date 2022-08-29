import React,{useState} from "react";
import "../CSS/Header.css";
import { Link } from "react-router-dom";
import HeaderSelect from "../../src/components/Modal/HeaderSelectModal"

const Header = () => {
  const [ModalOpen,setModalOpen]=useState(false)

  const Modal=()=>{

   if(ModalOpen == true){
    setModalOpen(false)
   }
   if(ModalOpen == false){
    setModalOpen(true)
   }

  }
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
                        <input style={{border:"0px",background: "#F5F6F8"}} className="searcInputbOx pl-1" placeholder="Search, Name, Phone, Work, Jobs..." />
                      </div>
                      </div>
                   </div>
                </div>
                    </div>            
                  </div>
                {/* </div>
               </nav> */}

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
