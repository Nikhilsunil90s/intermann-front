import React, { useEffect, useState ,useRef} from "react";
import { Link } from "react-router-dom";
import "../CSS/Dashboard.css";
import { API_BASE_URL } from "../config/serverApiConfig";
function Dashboard() {
  const [toDoCount, setToDoCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [archivedCount, setArchivedCount] = useState(0);
  const [loader, setLoader] = useState(false);
  const fetchCounts = async () => {
    return await fetch(API_BASE_URL + "getCounts", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((resd) => resd.json())
      .then((d) => d)
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    fetchCounts()
      .then((data) => {
        console.log(data);
        setToDoCount(data.toDoCount);
        setInProgressCount(data.inProgressCount);
        setArchivedCount(data.archivedCount);
        setLoader(true);
      })
      .catch((err) => err);
  });

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-5 card-tops">
            <div className="card ">
              <div className="card-body">
                <h5 className="card-title">Stats Candidats</h5>
              </div>

              <ul className="list-group list-group-flush">
                <Link to="/todolist">
                  <li className="list-group-item">
                    <span className="px-2">
                      <img src={require("../images/Icon.svg").default} />
                    </span>
                    En sommeil / To do
                    <span>
                  {loader?
                   (<>  {toDoCount}</> )
                  :
                 ( <>
           <div className="load"></div>
                  </>)
}

                    </span>
                  </li>
                </Link>
                <Link to="/embauchlist">
                  <li className="list-group-item">
                    <span className="px-2">
                      <img src={require("../images/Icon1.svg").default} />
                    </span>
                    Embauché / Work with us<span> {loader? (<>{inProgressCount}</>):(<><div className="load"></div></>)}</span>
                  </li>
                </Link>
                <Link to="/archivedlist">
                  <li className="list-group-item">
                    <span className="px-2">
                      <img src={require("../images/multiply.svg").default} />
                    </span>
                    Archivé / Archived<span> {loader? (<>{archivedCount}</>):(<><div className="load"></div></>)}</span>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
          <div className="col-5 card-top">
            <div className="card ">
              <div className="card-body">
                <h5 className="card-title">Stats Leads / Contrats</h5>
              </div>

              <ul className="list-group list-group-flush">
                <Link to="#">
                  <li className="list-group-item">
                    <span className="px-2">
                      <img src={require("../images/Icon.svg").default} />
                    </span>
                    To Do/Non traité/Attente<span>12</span>
                  </li>
                </Link>
                <Link to="#">
                  <li className="list-group-item">
                    <span className="px-2">
                      <img src={require("../images/Icon1.svg").default} />
                    </span>
                    <span>En Cours</span>
                    <span>8</span>
                  </li>
                </Link>
                <Link to="#">
                  <li className="list-group-item">
                    <span className="px-2">
                      <img src={require("../images/Icon2.svg").default} />
                    </span>
                    Contrat en cours / Done<span>32</span>
                  </li>
                </Link>
                <Link to="#">
                  <li className="list-group-item">
                    <span className="px-2">
                      <img src={require("../images/multiply.svg").default} />
                    </span>
                    Annulé / Archivé / Canceled<span>10</span>
                  </li>
                </Link>
              </ul>
            </div>{" "}
          </div>
        </div>
      </div>
     
    </>
  );
}
export default Dashboard;
