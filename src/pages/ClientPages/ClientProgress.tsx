import React, { useEffect ,useState} from "react";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import "../../CSS/inProgressCard.css";
import Modal from '../../components/Modal/InProgressModal'
import ClientProgressCard from "../ClientPages/ClientProgressCard";

export default function ClientProgress() {
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
  const [modalIsOpen,setModalIsOpen] = useState(false);
  const setModalIsOpenToTrue =()=>{
    setModalIsOpen(true)
}

const setModalIsOpenToFalse =()=>{
    setModalIsOpen(false)
}


  return (
    <>
         <div className="container-fluid">
        <div className="row ">
          <div className="col-12 text-center">
            <img src={require("../../images/progress.svg").default} style={{ width: "70%", paddingTop: "30px" }} />
            <p className="text-family">
            Ici vous avez la liste des sociétés sur lesquelles nous avons 
              <span className="fw-bolder"> une recherche active en cours.</span>
            </p>
            <p className="child-text">
            Nous dépensons de l’argent et du temps pour toutes les sociétés dans cette liste. Si la recherche n’est plus d’actu alors l’archiver        </p>
            <p>
            Here you have the list of companies on which we have an active search in progress.        </p>
          </div>
          <div className="col-6">
            <p>Filtre Secteur d’activité</p>
            <div className="dropdown">
              <div aria-labelledby="dropdownMenuButton1">
                <select style={{ width: "320px", height: "30px" }}>
                  <option>
                    <a className="dropdown-item" href="#">
                      BTP
                    </a>
                  </option>
                  <option>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </option>
                  <option>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </option>
                </select>
              </div>
            </div>
            <p className="last-child">Filtre Langues du candidat</p>
            <div>
              <div>
                <input type="checkbox" />
                <span className="ps-2">Roumain</span>
              </div>
              <div>
                <input type="checkbox" />
                <span className="ps-2">Français</span>
              </div>
              <div>
                <input type="checkbox" />
                <span className="ps-2">Anglais</span>
              </div>
              <div>
                <input type="checkbox" />
                <span className="ps-2">Italien</span>
              </div>
              <div>
                <input type="checkbox" />
                <span className="ps-2">Russe</span>
              </div>
              <div>
                <input type="checkbox" />
                <span className="ps-2">Espagnol</span>
              </div>
              <div>
                <input type="checkbox" />
                <span className="ps-2">Autre</span>
              </div>
            </div>
          </div>
          <div className="col-6">
            <p>Filtre selection métier / job</p>
            <div className="box">
              <p>Métier a</p>
              <p>Métier b</p>
              <p>Métier c</p>
              <p>Métier d</p>
              <p>Métier e</p>
            </div>
          </div>
          <hr className="new5" />
          <div className="col-3 pd-left">
            <ClientProgressCard />
          </div>
          <div className="col-3 pd-left">
            <ClientProgressCard />
          </div>
          <div className="col-3 pd-left">
            <ClientProgressCard />
          </div>
          <div className="col-3 pd-left">
            <ClientProgressCard />
          </div>

        </div>
      </div>
    </>
  );
}

