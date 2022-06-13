import React from "react";
import "../CSS/Header.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
     
        {/* <div className="container-fluid">
        <div className="row" style={{ width: "100%", background: "#ffff" }}>
       
        
            <div className="col-12"> */}
            <nav className="navbar navbar-expand-lg navbar-light">
              <div className="collapse navbar-collapse" id="navbarText" style={{ height: "50px" }}>
                <div className="col-12">
                  <div className="row">
                    <div className="col-5">
                   <div className="row">
                     <div className="col-6 p-0">
                     <Link
                      className="nav-link active p-0"
                      aria-current="page"
                      to="/addCustomer"
                      style={{backgroundColor:"none"}}
                    >
                      <button className="btn btn-1"> Add Client/Customer</button>
                    </Link>
                     </div>
                     <div className="col-6 ">
                 <Link className="nav-link p-0" to="/addCandidate">
                      <button className="btn btn-2"> Add Candidate</button>
                    </Link>
                 </div>
                   </div>
                </div>


                <div className="col-7 pt-0">
                   <div className="row">
                     <div className="col-6 text-end">
                     <a
                        className="nav-link p-0"
                        href="https://www.intermann.ro/"
                        target="_blank"
                      >
                        <button className="btn btn-003">
                        VOIR LE SITE EN ROUMAIN
                        </button>
                      </a>
                     </div>
                     <div className="col-6 text-center">
                     <a
                        className="nav-link p-0"
                        href="https://www.intermann.fr/"
                        target="_blank"
                      >
                        <button className=" btn btn-004">
                        VOIR LE SITE EN FRANçAIS
                        </button>
                      </a>
                 </div>
                   </div>
                </div>
                    </div>            
                  </div>
                </div>
               </nav>
        

    </>
  );
};
export default Header;
