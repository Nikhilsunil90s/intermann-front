import React from "react";
import { Link } from "react-router-dom";
import "../../CSS/Client/Client_toDoEdit.css";

function ClientTodoEdit() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 top-pd text-center">
            <h1 style={{ textDecoration: "underline" }}>EDIT FILE: </h1>
          </div>

          <div className="col-12 d-flex justify-content-end text-end ">
            <Link to="/todolist" style={{ textDecoration: "none" }}>
              <button className="btn bg-red">
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
          <form className="form">
            <div className="bg-class">
              <div className="col-12 p-3 bg-color-card">
                <div className="row">
                  <div className="col-2 d-grid logo-bg">
                    <img
                      src={require("../../images/enterprise.svg").default}
                      style={{ padding: "28px" }}
                    />

                    <button type="button" className="btn btn-upload" style={{marginTop:"20px"}}>
                      UPLOAD PHOTO
                    </button>
                  </div>
                  <div className="col-5 card-xl">
                    <div className="row">
                      <div className="col-12 flex-grid">
                        <label>Company Name</label>
                        <input className="form-control" name="candidatName" />
                      </div>
                      <div className="col-12 flex-grid pt-3">
                        <label>Number of position</label>
                        <input name="candidatAge" className="form-control" />
                        <label className="fw-normal">Num only</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-5 end-class">
                    <div className="text-center">
                      <div>
                        <button type="button" className="btn btn-gray">
                          TO DO
                        </button>
                      </div>
                      <p className="fw-bold">Lead pas encore traité</p>
                      <p>Ce lead est en sommeil, pas traité</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 ">
                <div className="row">
                  <div className="col-6">
                    <p className="Arial">Secteur d’Activité</p>
                    <div className="dropdown">
                      <select
                        className="form-select"
                        name="candidatActivitySector"
                      >
                        <option>select</option>
                      </select>
                    </div>
                    <p className="last-child">Langues du Candidat</p>
                    <div>
                      <div>
                        <input
                          type="checkbox"
                          name="candidatLanguages"
                          className="form-check-input"
                          value="Roumain"
                        />
                        <span className="ps-2">Roumain</span>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          name="candidatLanguages"
                          className="form-check-input"
                          value="Francais"
                        />
                        <span className="ps-2">Français</span>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          name="candidatLanguages"
                          className="form-check-input"
                          value="Anglais"
                        />
                        <span className="ps-2">Anglais</span>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          name="candidatLanguages"
                          className="form-check-input"
                          value="Italien"
                        />
                        <span className="ps-2">Italien</span>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          name="candidatLanguages"
                          className="form-check-input"
                          value="Russe"
                        />
                        <span className="ps-2">Russe</span>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          name="candidatLanguages"
                          className="form-check-input"
                          value="Espagnol"
                        />
                        <span className="ps-2">Espagnol</span>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          name="candidatLanguages"
                          className="form-check-input"
                          value="Autre"
                        />
                        <span className="ps-2">Autre</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <p className="Arial">Metier/Job</p>
                    <div className="dropdown">
                      <div aria-labelledby="dropdownMenuButton1">
                        <select
                          name="candidatJob"
                          className="form-select"
                          >
                        </select>
                      </div>
                    </div>
                    <div className="pt-2">
                      <div className="card " style={{padding:"15px"}}>
                        <label className="fw-bold">
                        Quand ce client a besoin du(des) travailleur détaché  / When this client needs the posted worker
                        </label>
                        <br />
                        <label className="fw-bold">
                          From date / A PARTIR DE
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          name="candidatStartDate"
                         
                        
                        />
                        <br />
                        <label className="fw-bold">UNTIL DATE / Jusqu’à </label>
                        <input
                          type="date"
                          className="form-control"
                          name="candidatEndDate"
                          
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-6 flex-grid pt-3">
                        <div className="row">
                          <label>Candidat Motivation</label>
                          <div className="d-flex">
                            <div>
                              <input
                                className="form-check-input"
                                type="radio"
                                name="candidatMotivation"
                                value={1}
                                // defaultChecked={candidatMotivation == 1}
                                // onChange={onFormDataChange}
                              />
                              <span className="ps-1">1</span>
                            </div>
                            <div className="ps-3">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="candidatMotivation"
                                value={2}
                                // onChange={onFormDataChange}
                              />
                              <span className="ps-1">2</span>
                            </div>
                            <div className="ps-3">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="candidatMotivation"
                                value={3}
                                // onChange={onFormDataChange}
                              />
                              <span className="ps-1">3</span>
                            </div>
                            <div className="ps-3">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="candidatMotivation"
                                value={4}
                                // onChange={onFormDataChange}
                              />
                              <span className="ps-1">4</span>
                            </div>
                            <div className="ps-3">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="candidatMotivation"
                                value={5}
                                // onChange={onFormDataChange}
                              />
                              <span className="ps-1">5</span>
                            </div>
                          </div>
                          <div className="col-6 pt-1">
                            <label>Client importance</label>
                            <div className="d-flex">
                              <div>
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="candidatMotivation"
                                  value={1}
                                  // defaultChecked={candidatMotivation == 1}
                                  // onChange={onFormDataChange}
                                />
                                <span className="ps-1">1</span>
                              </div>
                              <div className="ps-3">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="candidatMotivation"
                                  value={2}
                                  // onChange={onFormDataChange}
                                />
                                <span className="ps-1">2</span>
                              </div>
                              <div className="ps-3">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="candidatMotivation"
                                  value={3}
                                  // onChange={onFormDataChange}
                                />
                                <span className="ps-1">3</span>
                              </div>
                              <div className="ps-3">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="candidatMotivation"
                                  value={4}
                                  // onChange={onFormDataChange}
                                />
                                <span className="ps-1">4</span>
                              </div>
                              <div className="ps-3">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="candidatMotivation"
                                  value={5}
                                  // onChange={onFormDataChange}
                                />
                                <span className="ps-1">5</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 ">
                            <p className="mb-0 fw-bolder">
                              Permis / Licence drive
                            </p>
                            <div>
                              <input
                                type="radio"
                                name="candidatLicensePermis"
                                value="true"
                                className="form-check-input"
                              />
                              <span>Yes(B)</span>
                            </div>
                            <div>
                              <input
                                type="radio"
                                name="candidatLicensePermis"
                                value="false"
                                className="form-check-input"
                              />
                              <span>No</span>
                            </div>
                          </div>
                          <div className="col-12 pt-2 d-grid">
                            <label className="salaire">
                              Chiffre d’affaire potentiel / Potential turnover
                            </label>
                            <div>
                              <div
                                className="d-flex amount-fields"
                                style={{ width: "50%" }}
                              >
                                <span>€</span>
                                <input
                                  style={{ marginBottom: "0px" }}
                                  type="number"
                                  className="form-control"
                                  name="turnover"
                                  placeholder="Amount"
                                />
                                <span>.00</span>
                              </div>
                              <label className="fw-normal">
                                Not mendatory / Potentiel CA généré par ce lead
                              </label>
                            </div>
                          </div>
                          <div className="col-12 pt-2 d-grid">
                            <label className="salaire">
                              Salaire net du salarié / Employee's net salary
                            </label>
                            <div>
                              <div
                                className="d-flex amount-fields"
                                style={{ width: "50%" }}
                              >
                                <span>€</span>
                                <input
                                  style={{ marginBottom: "0px" }}
                                  type="number"
                                  className="form-control"
                                  name="turnover"
                                  placeholder="Amount"
                                />
                                <span>.00</span>
                              </div>
                              <label className="fw-normal">
                                Not mendatory / Potentiel CA généré par ce lead
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-6 pt-3">
                        <p className="Arial">Notes about this client</p>
                        <textarea
                          id="skills"
                          name="candidatSkills"
                          className="form-control"
                          style={{ height: "250px", width: "100%" }}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 pt-2">
                <div className="col-12">
                  <div className="row">
                    <div className="col-6 pt-3 flex-grid">
                      <label>Company email</label>
                      <input
                        placeholder="Company email"
                        className="form-control"
                        name="Company email"
                      />
                    </div>
                    <div className="col-6 pt-2 flex-grid">
                      <label>Company phone number</label>
                      <input
                        placeholder="Company phone"
                        className="form-control"
                        name="Company phone"
                      />
                      <p className="child-label">Use international format</p>
                    </div>
                    <div className="col-6 pt-1 flex-grid">
                      <label>Contact in Company Email</label>
                      <input
                        placeholder="Company Email"
                        className="form-control"
                        name="Company Email"
                      />
                    </div>
                    <div className="col-6 pt-1 flex-grid">
                      <label>Contact in company phone number</label>
                      <input
                        placeholder="Company number"
                        className="form-control"
                        name="companynumber"
                      />
                      <p className="child-label">Use international format</p>
                    </div>
                    <div className="col-6 pt-1 flex-grid">
                      <label>Company Adress</label>
                      <input
                        placeholder="Company Adress"
                        className="form-control"
                        name="Company Adress"
                      />
                      <p className="child-label">Number only</p>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="row">
                    <div className="col-6 d-flex">
                      <Link to="/todolist" style={{ textDecoration: "none" }}>
                        <button type="button" className="btn bg-red">
                          <img
                            style={{ width: "25%" }}
                            src={require("../../images/multiply.svg").default}
                          />
                          <p>Cancel</p>
                        </button>
                      </Link>
                      <button className="btn btn-save" type="submit">
                        <img src={require("../../images/check.svg").default} />
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default ClientTodoEdit;
