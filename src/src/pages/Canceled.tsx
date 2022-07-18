import React,{useEffect} from "react";
import StarRatings from "react-star-ratings";
import "../CSS/Canceled.css";
function Embauch() {
  useEffect(()=>{
  
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
  })
  return (
    <>
      <div className="container-fluid">
        <div className="row pd">
          <div className="col-12 text-center">
            <img src={require("../images/archive.svg").default} style={{width:"70%"}}/>
            <p className="text-family">
            Ici vous avez la liste des candidats qui ont été virés ou archivés
            </p>
            <p className="child-text">
            Here you have the list of candidates who have been fired or archived
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
                <p>Candidats_name</p>
                <p>Candidats_Age</p>
                <div >  <p>Motivation:
                  <StarRatings
          rating={5}
          starRatedColor="#ffc107"
          // changeRating={}
          numberOfStars={5}
          starDimension={'11px'}
          starSpacing={'0px'}
          name='rating'
        />
                  </p>
                  </div>
                <div className="Archived">Archived</div>
              </div>
            </div>

            <div className="card-body">
              <p>Candidats_name</p>
              <p>Candidats_age: years old</p>
              <p>Secteur : Candidats_Sector</p>
              <p>Job : Candidats_Sector </p>
              <p>Langues : Candidats_langues_List </p>
              <p>Phone Number : Candidats_Phone </p>
              <p>Facebook link : Candidats_Facebook </p>
              <p>Email : Candidats_Email </p>
              <p className="blue">Ready for work : From date To date </p>
              <small>
                <span>
                  <input type="checkbox" />
                </span>
                Permise.b
              </small>
             <div className="box-red">
                  <p>REASON WHY CANCELED : <span> client_Name</span></p>
                 
                                </div>
              <a href="#" className="btn btn-card">
                See Full profile
              </a>
              <a href="#" className="btn btn-cardRight1">
                Edit Profile
              </a>
              <a href="#" className="btn btn-cardbottom">
              Move : to do
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
                <p>Candidats_name</p>
                <p>Candidats_Age</p>
                <div >  <p>Motivation:
                  <StarRatings
          rating={5}
          starRatedColor="#ffc107"
          // changeRating={}
          numberOfStars={5}
          starDimension={'11px'}
          starSpacing={'0px'}
          name='rating'
        />
                  </p>
                  </div>
                <div className="Archived">Archived</div>

              </div>
            </div>

            <div className="card-body">
              <p>Candidats_name</p>
              <p>Candidats_age: years old</p>
              <p>Secteur : Candidats_Sector</p>
              <p>Job : Candidats_Sector </p>
              <p>Langues : Candidats_langues_List </p>
              <p>Phone Number : Candidats_Phone </p>
              <p>Facebook link : Candidats_Facebook </p>
              <p>Email : Candidats_Email </p>
              <p className="blue">Ready for work : From date To date </p>
              <small>
                <span>
                  <input type="checkbox" />
                </span>
                Permise.b
              </small>
             <div className="box-red">
                  <p>  REASON WHY CANCELED : <span> client_Name</span></p>
                 
                                </div>
              <a href="#" className="btn btn-card">
                See Full profile
              </a>
              <a href="#" className="btn btn-cardRight1">
                Edit Profile
              </a>
              <a href="#" className="btn btn-cardbottom">
              Move : to do
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
                <p>Candidats_name</p>
                <p>Candidats_Age</p>
                <div >  <p>Motivation:
                  <StarRatings
          rating={5}
          starRatedColor="#ffc107"
          // changeRating={}
          numberOfStars={5}
          starDimension={'11px'}
          starSpacing={'0px'}
          name='rating'
        />
                  </p>
                  </div>
                <div className="Archived">Archived</div>

              </div>
            </div>

            <div className="card-body">
              <p>Candidats_name</p>
              <p>Candidats_age: years old</p>
              <p>Secteur : Candidats_Sector</p>
              <p>Job : Candidats_Sector </p>
              <p>Langues : Candidats_langues_List </p>
              <p>Phone Number : Candidats_Phone </p>
              <p>Facebook link : Candidats_Facebook </p>
              <p>Email : Candidats_Email </p>
              <p className="blue">Ready for work : From date To date </p>
              <small>
                <span>
                  <input type="checkbox" />
                </span>
                Permise.b
              </small>
             <div className="box-red">
                  <p>  REASON WHY CANCELED : <span> client_Name</span></p>
                 
                                </div>
              <a href="#" className="btn btn-card">
                See Full profile
              </a>
              <a href="#" className="btn btn-cardRight1">
                Edit Profile
              </a>
              <a href="#" className="btn btn-cardbottom">
              Move : to do
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
                <p>Candidats_name</p>
                <p>Candidats_Age</p>
                <div >  <p>Motivation:
                  <StarRatings
          rating={5}
          starRatedColor="#ffc107"
          // changeRating={}
          numberOfStars={5}
          starDimension={'11px'}
          starSpacing={'0px'}
          name='rating'
        />
                  </p>
                  </div>
                <div className="Archived">Archived</div>

              </div>
            </div>

            <div className="card-body">
              <p>Candidats_name</p>
              <p>Candidats_age: years old</p>
              <p>Secteur : Candidats_Sector</p>
              <p>Job : Candidats_Sector </p>
              <p>Langues : Candidats_langues_List </p>
              <p>Phone Number : Candidats_Phone </p>
              <p>Facebook link : Candidats_Facebook </p>
              <p>Email : Candidats_Email </p>
              <p className="blue">Ready for work : From date To date </p>
              <small>
                <span>
                  <input type="checkbox" />
                </span>
                Permise.b
              </small>
              <div className="box-red">
                  <p>  REASON WHY CANCELED : <span> client_Name</span></p>
                 
                                </div>
              <a href="#" className="btn btn-card">
                See Full profile
              </a>
              <a href="#" className="btn btn-cardRight1">
                Edit Profile
              </a>
              <a href="#" className="btn btn-cardbottom">
              Move : to do
              </a>
            </div>
            </div>
        </div>
     
        </div>
      </div>
    </>
  );
}
export default Embauch;
