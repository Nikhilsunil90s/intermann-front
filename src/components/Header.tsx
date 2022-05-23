import React from "react";
import "../CSS/Header.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <div className="row" style={{ width: "75%", background: "#ffff" }}>
            <div className="col-12">
              <div className="collapse navbar-collapse" id="navbarText" style={{ height: "50px" }}>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/addCustomer"
                    >
                      <button className="btn btn-1"> Add Client/Customer</button>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/addCandidate">
                      <button className="btn btn-2"> Add Candidate</button>
                    </Link>
                  </li>
                </ul>
                <span className="navbar-text">
                  <ul className="d-flex ul-li">
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="https://www.intermann.ro/"
                        target="_blank"
                      >
                        <button className="btn btn-2">
                          Voir le site Roumain
                        </button>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="https://www.intermann.fr/"
                        target="_blank"
                      >
                        <button className=" btn btn-1">
                          Voir le site Francais
                        </button>
                      </a>
                    </li>
                  </ul>
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Header;
