import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import StarRatings from 'react-star-ratings';
import "../CSS/CanEmpl.css";
function CanEmpl() {

  return (
    <>
      <div className="container-fluid">
        <div className="row pd ">
          <div className="col-12 text-center">
            <img
              src={require("../images/todo.svg").default}
              style={{ width: "70%" }}
            />
            <p className="text-family">
              Ici vous avez la liste des candidats ne travaillant
              <span> pas encore avec nous</span>
            </p>
            <p className="child-text">
              Vous devez toujours vous assurer d’avoir un maximum d’information
              sur cette liste et déplacer les candidats en archive si plus
              d’actualité
            </p>
            <p>
              You should always make sure you have as much information as
              possible on this list and move the candidates to the archive if
              the candidate is not serious.
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
            <div className="card card-color">
              <div className="card-upper">
                <div className="col-4">
                  <img
                    src={require("../images/card-men.svg").default}
                    className="card-img-top"
                    alt="..."
                  />
                </div>
                <div className="col-7 ">
                  <p> &#10100;Candidats_name &#10101;</p>
                  <p> &#10100;Candidats_Age &#10101;</p>
                <div >  <p>Motivation:
                  <StarRatings
          rating={5}
          starRatedColor="#ffc107"
          // changeRating={}
          numberOfStars={5}
          starDimension={'9px'}
          starSpacing={'0px'}
          name='rating'
        />
                  </p>
                  </div>
                  <Link to="/todoprofile">
                    <button className="todo">TO DO</button>
                  </Link>
                </div>
              </div>

              <div className="card-body">
                <p>Name : &#10100;Candidats_name&#10101;</p>
                <p>Age : &#10100;Candidats_age&#10101;</p>
                <p>Motivation : </p>
                <p>Secteur : &#10100;Candidats_Sector&#10101;</p>

                <p>Job : &#10100;Candidats_Sector &#10101; </p>
                <p>Langues : &#10100;Candidats_langues_List &#10101; </p>
                <p>Phone Number : &#10100;Candidats_Phone &#10101; </p>
                <p>Facebook link : &#10100;Candidats_Facebook &#10101; </p>
                <p>Email : &#10100;Candidats_Email &#10101; </p>
                <p className="blue">
                  Ready for work : From &#10100;date &#10101; To &#10100;date
                  &#10101;
                </p>
                <div>
                  <small>
                    <span>
                      <input type="checkbox" />
                    </span>
                    Permise.b
                  </small>
                </div>
                <a href="#" className="btn btn-card">
                  See Full profile
                </a>
                <a href="#" className="btn btn-cardRight1">
                  Edit Profile
                </a>
                <a href="#" className="btn btn-cardLeft">
                  Move to in Progress
                </a>
                <a href="#" className="btn btn-cardRight">
                  Archive
                </a>
              </div>
            </div>
          </div>
          <div className="col-3 pd-left">
            <div className="card card-color">
              <div className="card-upper">
                <div className="col-4">
                  <img
                    src={require("../images/card-men.svg").default}
                    className="card-img-top"
                    alt="..."
                  />
                </div>
                <div className="col-7 ">
                  <p> &#10100;Candidats_name &#10101;</p>
                  <p> &#10100;Candidats_Age &#10101;</p>
                  <div >  <p>Motivation:
                  <StarRatings
          rating={5}
          starRatedColor="#ffc107"
          // changeRating={}
          numberOfStars={5}
          starDimension={'9px'}
          starSpacing={'0px'}
          name='rating'
        />
                  </p>
                  </div>
                  <Link to="/todoprofile">
                    <button className="todo">TO DO</button>
                  </Link>
                </div>
              </div>

              <div className="card-body">
                 <p>Name : &#10100;Candidats_name&#10101;</p>
                <p>Age : &#10100;Candidats_age&#10101;</p>
                <p>Motivation : </p>
                <p>Secteur : &#10100;Candidats_Sector&#10101;</p>

                <p>Job : &#10100;Candidats_Sector &#10101; </p>
                <p>Langues : &#10100;Candidats_langues_List &#10101; </p>
                <p>Phone Number : &#10100;Candidats_Phone &#10101; </p>
                <p>Facebook link : &#10100;Candidats_Facebook &#10101; </p>
                <p>Email : &#10100;Candidats_Email &#10101; </p>
                <p className="blue">
                  Ready for work : From &#10100;date &#10101; To &#10100;date
                  &#10101;
                </p>
                <div>
                  <small>
                    <span>
                      <input type="checkbox" />
                    </span>
                    Permise.b
                  </small>
                </div>
                <a href="#" className="btn btn-card">
                  See Full profile
                </a>
                <a href="#" className="btn btn-cardRight1">
                  Edit Profile
                </a>
                <a href="#" className="btn btn-cardLeft">
                  Move to in Progress
                </a>
                <a href="#" className="btn btn-cardRight">
                  Archive
                </a>
              </div>
            </div>
          </div>
          <div className="col-3 pd-left">
            <div className="card card-color">
              <div className="card-upper">
                <div className="col-4">
                  <img
                    src={require("../images/card-men.svg").default}
                    className="card-img-top"
                    alt="..."
                  />
                </div>
                <div className="col-7 ">
                  <p> &#10100;Candidats_name &#10101;</p>
                  <p> &#10100;Candidats_Age &#10101;</p>
                  <div >  <p>Motivation:
                  <StarRatings
          rating={5}
          starRatedColor="#ffc107"
          // changeRating={}
          numberOfStars={5}
          starDimension={'9px'}
          starSpacing={'0px'}
          name='rating'
        />
                  </p>
                  </div>
                  <Link to="/todoprofile">
                    <button className="todo">TO DO</button>
                  </Link>
                </div>
              </div>

              <div className="card-body">
                 <p>Name : &#10100;Candidats_name&#10101;</p>
                <p>Age : &#10100;Candidats_age&#10101;</p>
                <p>Motivation : </p>
                <p>Secteur : &#10100;Candidats_Sector&#10101;</p>

                <p>Job : &#10100;Candidats_Sector &#10101; </p>
                <p>Langues : &#10100;Candidats_langues_List &#10101; </p>
                <p>Phone Number : &#10100;Candidats_Phone &#10101; </p>
                <p>Facebook link : &#10100;Candidats_Facebook &#10101; </p>
                <p>Email : &#10100;Candidats_Email &#10101; </p>
                <p className="blue">
                  Ready for work : From &#10100;date &#10101; To &#10100;date
                  &#10101;
                </p>
                <div>
                  <small>
                    <span>
                      <input type="checkbox" />
                    </span>
                    Permise.b
                  </small>
                </div>
                <a href="#" className="btn btn-card">
                  See Full profile
                </a>
                <a href="#" className="btn btn-cardRight1">
                  Edit Profile
                </a>
                <a href="#" className="btn btn-cardLeft">
                  Move to in Progress
                </a>
                <a href="#" className="btn btn-cardRight">
                  Archive
                </a>
              </div>
            </div>
          </div>
          <div className="col-3 pd-left">
            <div className="card card-color">
              <div className="card-upper">
                <div className="col-4">
                  <img
                    src={require("../images/card-men.svg").default}
                    className="card-img-top"
                    alt="..."
                  />
                </div>
                <div className="col-7 ">
                  <p> &#10100;Candidats_name &#10101;</p>
                  <p> &#10100;Candidats_Age &#10101;</p>
                  <div >  <p>Motivation:
                  <StarRatings
          rating={5}
          starRatedColor="#ffc107"
          // changeRating={}
          numberOfStars={5}
          starDimension={'9px'}
          starSpacing={'0px'}
          name='rating'
        />
                  </p>
                  </div>
                  <a href="/todoprofile">
                    <button className="todo">TO DO</button>
                  </a>
                </div>
              </div>

              <div className="card-body">
                 <p>Name : &#10100;Candidats_name&#10101;</p>
                <p>Age : &#10100;Candidats_age&#10101;</p>
                <p>Motivation : </p>
                <p>Secteur : &#10100;Candidats_Sector&#10101;</p>

                <p>Job : &#10100;Candidats_Sector &#10101; </p>
                <p>Langues : &#10100;Candidats_langues_List &#10101; </p>
                <p>Phone Number : &#10100;Candidats_Phone &#10101; </p>
                <p>Facebook link : &#10100;Candidats_Facebook &#10101; </p>
                <p>Email : &#10100;Candidats_Email &#10101; </p>
                <p className="blue">
                  Ready for work : From &#10100;date &#10101; To &#10100;date
                  &#10101;
                </p>
                <small>
                  <span>
                    <input type="checkbox" />
                  </span>
                  Permise.b
                </small>
                <a href="#" className="btn btn-card">
                  See Full profile
                </a>
                <a href="#" className="btn btn-cardRight1">
                  Edit Profile
                </a>
                <a href="#" className="btn btn-cardLeft">
                  Move to in Progress
                </a>
                <a href="#" className="btn btn-cardRight">
                  Archive
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CanEmpl;
