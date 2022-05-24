import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarRatings from 'react-star-ratings';
import "../../CSS/Client/ClientTodo.css";
import ClientToDoCard from "../../pages/ClientPages/ClientTodoCard";

function ClientToDoList() {

  return (
    <>
      <div className="container-fluid">
        <div className="row pd ">
          <div className="col-12 text-center">
            <img
              src={require("../../images/lead.svg").default}
              style={{ width: "70%" }}
            />
            <p className="text-family">
            Ici vous avez la liste des sociétés qui font une
              <span className="fw-bolder"> demande pas encore traité</span>
            </p>
            <p className="child-text">
            Vous devez toujours vous assurer d’avoir un maximum d’information sur cette liste et déplacer les leads en archive si plus d’actualité 
            </p>
            <p>
            You should always make sure you have as much information as possible on this list and move the candidates to the archive if the candidate is not serious.
            </p>
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
            <ClientToDoCard />
          </div>
          <div className="col-3 pd-left">
            <ClientToDoCard />
          </div>
          <div className="col-3 pd-left">
            <ClientToDoCard />
          </div>
          <div className="col-3 pd-left">
            <ClientToDoCard />
          </div>
        </div>
      </div>
    </>
  );
}
export default ClientToDoList;
