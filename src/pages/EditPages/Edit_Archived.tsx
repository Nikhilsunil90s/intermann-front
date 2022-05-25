import React, { useEffect } from "react";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import "../../CSS/EditArchive.css";

function EditArchive() {
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
  return (
    <>
      <div className="containet-fluid">
        <div className="row">
          <div className="col-12 top-pd text-center">
            <img
              src={require("../../images/edit file_ {CANDIDAT_NAME}.svg").default}
              style={{ width: "70%" }}
            />
          </div>

          <div className="col-12 d-flex justify-content-end text-end ">
            <Link to="/archivedlist" style={{
              textDecoration: "none"
            }}>
              <button type="button" className="btn bg-red">
                <img
                  style={{ width: "25%" }}
                  src={require("../../images/multiply.svg").default}
                />
                <p>Cancel</p>
              </button>
            </Link>

            <button className="btn btn-save">
              <img src={require("../../images/check.svg").default} />
              Save
            </button>
          </div>
          <div className="bg-class">
            <div className="col-12 p-3 bg-color-card">
              <div className="row">
                <div className="col-2 text-center ">
                  <img
                    src={require("../../images/menlogos.svg").default}
                    style={{ width: "90%" }}
                  />

                  <button type="button" className="btn btn-upload">
                    UPLOAD PHOTO
                  </button>
                </div>
                <div className="col-5 card-xl">
                  <div className="row">
                    <div className="col-12 flex-grid">
                      <label>Candidat name</label>
                      <input placeholder="{CURRENT STATE}" />
                    </div>
                    <div className="col-12 flex-grid pt-3">
                      <label>Candidat name</label>
                      <input placeholder="{CURRENT STATE}" />
                    </div>
                    <div className="col-12 flex-grid pt-3">
                      <label>Candidat Motivation</label>
                      <div className="d-flex">
                        <div>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                          />
                          1
                        </div>
                        <div className="ps-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                          />
                          2
                        </div>{" "}
                        <div className="ps-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault3"
                          />
                          3
                        </div>{" "}
                        <div className="ps-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault4"
                          />
                          4
                        </div>{" "}
                        <div className="ps-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault5"
                          />
                          5
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-5 text-end end-class">
                  <div>
                    <button type="button" className="btn btnArchive"
                    >

                      <span><img src={require("../../images/multiplyyy.svg").default} /></span>
                      ARCHIVED
                    </button>
                  </div>
                  <p className="fw-bold">Candidat Archivé/Annulé/Viré</p>
                  <p>This candidate have archived</p>
                </div>
              </div>
            </div>

            <div className="col-12 ">
              <div className="row">
                <div className="col-6">
                  <p className="Arial">Secteur d’activité</p>
                  <div className="dropdown">
                    <div aria-labelledby="dropdownMenuButton1">
                      <select style={{ width: "320px", height: "30px" }}>
                        <option className="child">
                          <a className="dropdown-item " href="#">
                            &#10100;CURRENT STATE&#10101;
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
                  <p className="Arial">Metier/Job</p>
                  <div className="dropdown">
                    <div aria-labelledby="dropdownMenuButton1">
                      <select style={{ width: "320px", height: "30px" }}>
                        <option className="child">
                          <a className="dropdown-item " href="#">
                            &#10100;CURRENT STATE&#10101;
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
                  <div className="pt-2">
                    <div className="card card-body">
                      <label className="fw-bold">
                        Quand ce candidat a besoin de travailler When this
                        candidate is ready to work with us
                      </label>
                      <br />
                      <label className="fw-bold">
                        From date / A PARTIR DE{" "}
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="fromDate"
                      // value={data.fromDate}
                      // onChange={onFormDataChange}
                      />
                      <br />
                      <label className="fw-bold">UNTIL DATE / Jusqu’à </label>
                      <input
                        type="date"
                        className="form-control"
                        name="toDate"
                      // value={data.toDate}
                      // onChange={onFormDataChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 pt-4 d-flex">
                  <div className="row">
                    <div className="col-6 ">
                      <p>Permis / Licence drive</p>
                      <div>
                        <input type="radio" />
                        <span>Yes (B)</span>
                      </div>
                      <div>
                        <input type="radio" />
                        <span>No</span>
                      </div>
                    </div>
                    <div className="col-6">
                      <p>Voyage en voiture vers France ?</p>
                      <div>
                        <input type="radio" />
                        <span>Yes</span>
                      </div>
                      <div>
                        <input type="radio" />
                        <span>No</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 ">
                    <p className="Arial">
                      Skills / Notes Compétances (will be displayed on CV)
                    </p>
                    <textarea
                      id="w3review"
                      name="w3review"
                      style={{ height: "126px", width: "420px" }}
                      placeholder="Note">
                    </textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 pt-4">
              <h3 className="exp">
                Expérience du candidat (fill only lines, higher = more recent)
              </h3>
              <table className="table table-bordered border-dark">
                <thead>
                  <tr>
                    <th scope="col">
                      Période Exemple Janvier 2020 à Janvier 2021
                    </th>
                    <th scope="col">Lieu de travail Exemple Paris</th>
                    <th scope="col">
                      Travail effectué Exemple : Facadier Isolateur
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ height: "100px" }}>
                    <td>Text Area</td>
                    <td>Text Area</td>
                    <td>Text Area</td>
                  </tr>
                </tbody>
              </table>

              <div className="col-12">
                <div className="row">
                  <div className="col-6 form-group pt-3 flex-grid">
                    <label>Candidat email</label>
                    <input type="text" placeholder="{CURRENT STATE}" />
                  </div>
                  <div className="col-6 form-group pt-3 flex-grid">
                    <label>Candidat phone number</label>
                    <input placeholder="{CURRENT STATE}" />
                    <p className="child-label">Use international format</p>
                  </div>
                  <div className="col-6 form-group pt-3 flex-grid">
                    <label>Candidat Adress</label>
                    <input placeholder="{CURRENT STATE}" />
                  </div>
                  <div className="col-6 form-group pt-3 flex-grid">
                    <label>Candidat Facebook</label>
                    <input placeholder="{CURRENT STATE}" />
                  </div>
                  <div className="col-6 form-group pt-3 flex-grid">
                    <label>Candidat Experience in Years</label>
                    <input placeholder="{CURRENT STATE}" />
                    <p className="child-label">Number only</p>
                  </div>
                </div>
              </div>
              <div className="col-12 edit-Archive">
                <div className="row">
                  <div className="col-12">
                    <p className="Arial1">Reason why archived</p>
                  </div>
                  <div className="col-12">
                    <textarea
                      id="w3review"
                      name="w3review"
                      style={{ height: "126px", width: "100%" }}
                      placeholder="Note"
                      className="inputText"
                    >&#10100;CURRENT STATE&#10101;</textarea>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-6 d-flex">
                    <Link to="/archivedlist" style={{
                      textDecoration: "none"
                    }}>
                      <button type="button" className="btn bg-red">
                        <img
                          style={{ width: "25%" }}
                          src={require("../../images/multiply.svg").default}
                        />
                        <p>Cancel</p>
                      </button>
                    </Link>
                    <button className="btn btn-save">
                      <img src={require("../../images/check.svg").default} />
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default EditArchive;
