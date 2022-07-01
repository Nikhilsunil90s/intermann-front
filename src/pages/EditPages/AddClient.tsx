import React, { useState, useEffect } from "react";
import "../../CSS/AddClient.css";
import Select, { StylesConfig } from "react-select";
import Switch from "react-switch";
import RatingCmp from "../../components/AddClientRating/Rating";
import {
  NumberOfPost,
  ColourOption,
  optionsOfSEO,
  COFAC,
} from "../../Selecteddata/data";
import chroma from "chroma-js";
import $ from "jquery";
let Amountarr = "";
let Hours = "";
declare global {
  namespace JSX {
    interface IntrinsicElements {
      Rating: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
export default function AddClient(props) {
  const switchHandle = (event,id,e) => {
  if(e==="Offre"){
    setOffre(event)
  }
  if(e==="Signature"){
        setSignature(event)
  }
  if(e==="Contrat"){
    setContrat(event)
}  
if(e==="Public"){
  setPublic(event)
} 
 if(e==="A1"){
  setA1(event)
}
if(e==="Assurance"){
  setAssurance(event)
}
if(e==="Agence"){
  setAgence(event)
}
if(e==="SISPI"){
  setChecked(event)
}
  //       setChecked(e);
  //       setAgence(nextChecked);
  //       setAssurance(nextChecked)
  //       setA1(nextChecked)
  //       setPublic(nextChecked)
  //       setContrat(nextChecked)
        
    console.log(event,e);
  };
  const [SISPI, setChecked] = useState(false);
  const [Agence,setAgence]=useState(false)
  const [Assurance,setAssurance]=useState(false)
  const [showHour, setShowHour] = useState("");
  const [id, setID] = useState("");
  const [A1,setA1]=useState(false)
  const [Public,setPublic]=useState(false)
  const [Contrat,setContrat]=useState(false)
  const [Signature,setSignature]=useState(false)
  const [Offre,setOffre]=useState(false)
  const [StarRatings,setRatings]=useState([])
console.log(StarRatings,"hello")
  const [state, setState] = useState({
    name: "bob",
    color: "blue",
  });
  const handleColor = (e: any) => {
    console.log(e.target.id, "hey");
  };
  // let n=35
  //    const  NumberOfPost=()=>{
  //    {  [...Array(n)].map((el)=>{
  //       console.log(el)
  //      })
  //     }
  //    }

  //    useEffect(()=>{
  //     // NumberOfPost()
  //     loopFun()
  //    })

  // const loopFun = () => {
  // Amountarr=[]
  // for (let i = 0; i <= 35; i++) {
  //     Amountarr.push(i)
  // }
  // NumberOfPosts= Amountarr.map((el)=>{
  //   return {value:el,label:el}
  // })
  // console.log[(NumberOfPosts,"k")
  // };
  // useEffect(()={
  //   $(document).ready(function(){
  //     $("#dam_return a").click(function(){
  //         var value = $(this).html();
  //         var input = $('#dam');
  //         input.val(value);
  //     });
  // })
  // })
  const RemoveHandling=()=>{
    setShowHour("")
    setID("")
  }
  const HandleChange = (e: any) => {
    console.log(e.target.value);
    if (e.target.id === "1") {
      setShowHour("35");
      setID(e.target.id);
    }
    if (e.target.id === "2") {
      setShowHour("39");
      setID(e.target.id);
    }
    if (e.target.id === "3") {
      setShowHour("40");
      setID(e.target.id);
    }
    if (e.target.id === "4") {
      setShowHour("41");
      setID(e.target.id);
    }
    if (e.target.id === "5") {
      setShowHour("42");
      setID(e.target.id);
    }
    if (e.target.id === "6") {
      setShowHour("43");
      setID(e.target.id);
    }
    if (e.target.id === "7") {
      setShowHour("44");
      setID(e.target.id);
    }
    if (e.target.id === "8") {
      setShowHour("45");
      setID(e.target.id);
    }
  };

  useEffect(() => {
    $(document).ready(function () {
      $("#dam_return button").click(function () {
        Amountarr = $(this).val();
        var input = $("#dam");
        input.val(Amountarr);
      });
    });
    console.log(Hours, "hr");
  });
  const [data, setData] = useState(fakeDataFormat);
  const onFormDataChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data);
  };
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  // useEffect(()=>{

  //     window.scroll({
  //       top: 0,
  //       left: 0,
  //       behavior: 'smooth'
  //     });
  // })
  const colourStyles: StylesConfig<ColourOption, true> = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ":hover": {
        backgroundColor: data.color,
        color: "white",
      },
    }),
  };
  console.log(Amountarr);
  return (
    <div className="container-fluid px-3">
      <div className="row">
        <div
          className="col-12 card-tops px-1 mt-2"
          style={{ padding: "0px", marginBottom: "20px" }}
        >
          <div className="row text-start">
            <div
              className="card "
              style={{
                padding: "0px 15px",
                borderRadius: "15px",
                marginBottom: "0px",
              }}
            >
              <div className="card-body">
                <h2 className="card-Leads">ADD A CLIENT / LEAD</h2>
                <p className="fonStylingPtag">
                  Attention : si un client demande deux métiers différents = il
                  faut faire deux fois ce formulaire
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 p-0">
          <div className="row px-1 pb-1">
            <form
              className="add-form form needs-validation p-0"
              name="contact-form"
              onSubmit={onFormSubmit}
            >
              <div className="d-flex flex-wrap justify-content-around">
                <div className="col-4">
                  <div className="p-1">
                    <label className="Form-styling">Company name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter candidats name"
                      id="validationCustom01"
                      name="ClientName"
                      required
                      onChange={onFormDataChange}
                    />
                    <span className="text-small">
                      Mendatory, please add company client
                    </span>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-1">
                    <label className="Form-styling">CLIENT Email</label>
                    <input
                      type="text"
                      className="form-control placeHolder"
                      placeholder="Enter email"
                      name="ClientEmail"
                      onChange={onFormDataChange}
                    />
                    <span className="text-small">
                      Mendatory, please add client email address
                    </span>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-1">
                    <label className="Form-styling">Company Phone number</label>
                    <input
                      type="text"
                      className="form-control placeHolder"
                      placeholder="Enter Phone Number (+format)"
                      name="clientPhone"
                      required
                      onChange={onFormDataChange}
                    />
                    <span className="text-smallOG">
                      Important Value, please add phone number
                    </span>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-1">
                    <label className="Form-styling">Company adress</label>
                    <input
                      type="text"
                      className="form-control placeHolder"
                      placeholder="Enter CLIENT adress (address, zip, city, country)"
                      name="ClientAddress"
                      onChange={onFormDataChange}
                    />
                    <span className="text-smallOG">Important value</span>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-1">
                    <label className="Form-styling">Secteur d’Activité</label>
                    <select
                      name="candidatActivitySector"
                      className="form-select placeHolder"
                      onChange={onFormDataChange}
                    >
                      <option>Select Un Secteur</option>
                      {/* {activitySectors.map((sector) =>
                    <option value={sector.name} >{sector.sectorName}</option> // fetch from api
                  )} */}
                    </select>
                    <span className="text-small">
                      Please select the sector of this client, you can add
                      sector on the BO
                    </span>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-1">
                    <label className="Form-styling">Métier / Job</label>
                    <select
                      name="ClientJob"
                      className="form-select placeHolder"
                      onChange={onFormDataChange}
                    >
                      {/* {
                    jobs.map((job) =>
                      <option value={job.jobName}>
                        {job.jobName}
                      </option>
                    )
                  } */}
                    </select>
                    <span className="text-small">
                      Please select the job of this client, you can add job on
                      the BO
                    </span>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-1">
                    <label className="Form-styling">
                      Nom du contact dans l’entreprise
                    </label>
                    <input
                      type="text"
                      className="form-control placeHolder"
                      placeholder="Contact name"
                      name="ClientFBURL"
                      onChange={onFormDataChange}
                    />
                    <span className="text-smallOG">
                      NOT Mendatory, please add contact person on this company.
                    </span>
                  </div>
                </div>
                <div className="col-4 pt-1">
                  <div className="">
                    <label className="Form-styling" style={{ width: "105%" }}>
                      Téléphone du contact dans l’entreprise
                    </label>
                    <input
                      type="text"
                      className="form-control placeHolder"
                      placeholder="Phone number (+format)  "
                      name="ClientAlternatePhone"
                      onChange={onFormDataChange}
                    />
                    <span className="text-smallOG">
                      Important Value, please add phone number of our contact in
                      this company if there is one, if not we will use company
                      number
                    </span>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-1">
                    <label className="Form-styling">
                      Nombre de poste recherché
                    </label>
                    {/* <input
                  type="number"
                  className="form-control placeHolder"
                  name="ClientAge"
                  placeholder="42"
               
                  onChange={onFormDataChange}

                /> */}
                    <Select
                      name="NumberOfPosts"
                      closeMenuOnSelect={false}
                      isMulti={false}
                      placeholder="Select value from 1  to 35"
                      className="basic-select"
                      classNamePrefix="select"
                      // onChange={wherePerson}
                      options={NumberOfPost}
                      styles={colourStyles}
                    />
                    <span className="text-small">
                      Select the number of workers that this customer need
                    </span>
                  </div>
                </div>
                <div className="col-12">
                  <div className="p-1">
                    <label className="Form-styling">
                      Skills / Notes Compétances (will be displayed on CV)
                    </label>
                    <textarea
                      className="form-control"
                      placeholder="Note"
                      name="ClientSkills"
                      rows={4}
                      onChange={onFormDataChange}
                    ></textarea>
                    <span className="text-smallOG">
                      NOT mandatory, please add some special skills that the
                      customer asks for this reasearch.
                    </span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-1">
                    <label className="Form-styling">
                      Motivation de ce CLIENT à travailler avec nous
                    </label>
                    <div className="col-12 coverClass  px-0">
                      <div className="row">
                        <div className="col-3  d-flex flex-column text-center">
                          <div
                            className="text-center"
                            style={{ height: "35px" }}
                          >
                            
                            <input
                              type="radio"
                              name="candidatMotivation"
                              value={1}
                              onChange={onFormDataChange}
                              id="r1"
                            />
                            <label htmlFor="r1" className="react">
                              <i data-icon="😟"></i>
                            </label>
                          </div>
                          <span className="font-Emoji">Dissapointed</span>
                        </div>
                        <div className="col-2 both p-0 d-flex flex-column text-center">
                          <div
                            className="text-center both"
                            style={{ height: "35px" }}
                          >
                            
                            <input
                              type="radio"
                              name="candidatMotivation"
                              value={2}
                              onChange={onFormDataChange}
                              id="r2"
                            />
                            <label htmlFor="r2" className="react">
                              <i data-icon="🙁"></i>
                            </label>
                          </div>
                          <span className="font-Emoji">Not really</span>
                        </div>
                        <div className="col-2 p-0 d-flex flex-column text-center">
                          <div
                            className="text-center"
                            style={{ height: "35px" }}
                          >
                            
                            <input
                              type="radio"
                              name="candidatMotivation"
                              value={3}
                              onChange={onFormDataChange}
                              id="r3"
                            />
                            <label htmlFor="r3" className="react">
                              <i data-icon="😊"></i>
                            </label>
                          </div>
                          <span className="font-Emoji">Like</span>
                        </div>
                        <div className="col-2 p-0 d-flex flex-column text-center">
                          <div
                            className="text-center"
                            style={{ height: "35px" }}
                          >
                            
                            <input
                              type="radio"
                              name="candidatMotivation"
                              value={4}
                              onChange={onFormDataChange}
                              id="r4"
                            />
                            <label htmlFor="r4" className="react">
                              <i data-icon="🥰"></i>
                            </label>
                          </div>
                          <span className="font-Emoji">Great</span>
                        </div>
                        <div className="col-3 d-flex flex-column text-center">
                          <div
                            className="text-center"
                            style={{ height: "35px" }}
                          >
                            
                            <input
                              type="radio"
                              name="candidatMotivation"
                              value={5}
                              onChange={onFormDataChange}
                              id="r5"
                            />
                            <label htmlFor="r5" className="react">
                              <i data-icon="😍"></i>
                            </label>
                          </div>
                          <span className="font-Emoji">Super lovely</span>
                        </div>
                      </div>
                      {/* {showMessage ?
                          <h5 className="Form-styling mt-1">
                            Note: If we find the candidates, does he take it immediately? Or
                            will he still need to think?
                          </h5> : null} */}
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="">
                    <label className="Form-styling d-grid">
                      Importance de ce client
                      <p className="mb-0">(bigger number is more important) </p>
                    </label>
                    <div className="col-12">
                      {/* <ReactStars
                        count={5}
                        color="#E7E7E7"
                        onChange={ratingChanged}
                        size={50}
                        emptyIcon={
                          <div>
                            <i className="far fa-star"></i>
                          </div>
                        }
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#FFB608"
                      /> */}
                      
{/* <div className="star-rating">
  <input type="radio" id="5-stars" name="rating" value="5" />
  <label htmlFor="5-stars" className="star"><Empty /></label>
  <input type="radio" id="4-stars" name="rating" value="4" />
  <label htmlFor="4-stars" className="star"><Empty /></label>
  <input type="radio" id="3-stars" name="rating" value="3" />
  <label htmlFor="3-stars" className="star"><Empty /></label>
  <input type="radio" id="2-stars" name="rating" value="2" />
  <label htmlFor="2-stars" className="star"><Empty /></label>
  <input type="radio" id="1-star" name="rating" value="1" />
  <label htmlFor="1-star" className="star"><Empty /></label>
</div> */}
{/* <Rating
  emptySymbol={<img style={{marginLeft:"10px"}} src={require("../../images/emptyStar.svg").default} />}
  fullSymbol={<img style={{marginLeft:"10px"}} src={require("../../images/RatingStar.svg").default} />}
  placeholderRating={0}
  
/> */}
<RatingCmp  StarRatings={setRatings} />
                    </div>
                  </div>
                </div>
                <div className="col-5 p-1">
                  <p className="padding-bottom Form-styling mb-1">NOTE COFAC</p>

                  <Select
                    name="candidatComingFrom"
                    closeMenuOnSelect={false}
                    isMulti
                    placeholder="0"
                    className="basic-multi-select"
                    classNamePrefix="select"
                    // onChange={wherePerson}
                    options={COFAC}
                    styles={colourStyles}
                  />
                  <label className="paidHFontChild">
                    Si possible (0 si non déterminé)
                  </label>
                </div>
                <div className="col-5 py-1  mr-3">
                  <p className="padding-bottom Form-styling mb-1">
                    Provenance du lead
                  </p>
                  <Select
                    name="candidatComingFrom"
                    closeMenuOnSelect={false}
                    isMulti
                    placeholder="SEO"
                    className="basic-multi-select"
                    classNamePrefix="select"
                    // onChange={wherePerson}
                    options={optionsOfSEO}
                    styles={colourStyles}
                  />
                </div>

                <div className="col-12">
                  <div className="row">
                    <label className="fw-bold Form-styling mt-1 mb-0">
                      Quand ce CLIENT a besoin de travailler When this CLIENT is
                      ready to work with us
                    </label>
                    <div className="col-6">
                      <div className="p-1">
                        <label className="fromDate">
                          From date / A PARTIR DE
                        </label>
                        <input
                          type="date"
                          className="form-control placeHolder"
                          name="CLIENTStartDate"
                          onChange={onFormDataChange}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="p-1">
                        <label className="fromDate">
                          UNTIL DATE / Jusqu’à
                        </label>
                        <input
                          type="date"
                          className="form-control placeHolder"
                          name="CLIENTEndDate"
                          onChange={onFormDataChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 mt-1">
                  <div className="row">
                    <p className="padding-bottom Form-styling pb-1">
                      Select salaries Hours
                    </p>
                    <div className="d-flex " id="dam_return">
                      <div className="pr-1">
                        <button
                          type="button"
                          value="10000rs"
                          id="1"
                          onClick={(e) => {
                            HandleChange(e);
                        
                          }}
                          style={{
                            backgroundColor: id == "1" ? " #F4E7FF" : "",
                            color: id == "1" ? "#A461D8" : "#979797",
                          }}
                          className="btn btnHPaid "
                        >
                          35H
                        </button>
                      </div>
                      <div className="pr-1">
                        <button
                          type="button"
                          value="20000rs"
                          id="2"
                          onClick={(e) => {
                            HandleChange(e);
                        
                          }}
                          style={{
                            backgroundColor: id == "2" ? " #F4E7FF" : "",
                            color: id == "2" ? "#A461D8" : "#979797",
                          }}
                          className="btn btnHPaid "
                        >
                          39H
                        </button>
                      </div>
                      <div className="pr-1">
                        <button
                          type="button"
                          value="30000rs"
                          id="3"
                          onClick={(e) => {
                            HandleChange(e);
                        
                          }}
                          style={{
                            backgroundColor: id == "3" ? " #F4E7FF" : "",
                            color: id == "3" ? "#A461D8" : "#979797",
                          }}
                          className="btn btnHPaid "
                        >
                          40H
                        </button>
                      </div>
                      <div className="pr-1">
                        <button
                          type="button"
                          value="40000rs"
                          id="4"
                          onClick={(e) => {
                            HandleChange(e);
                        
                          }}
                          style={{
                            backgroundColor: id == "4" ? " #F4E7FF" : "",
                            color: id == "4" ? "#A461D8" : "#979797",
                          }}
                          className="btn btnHPaid "
                        >
                          41H
                        </button>
                      </div>
                      <div className="pr-1">
                        <button
                          type="button"
                          value="50000rs"
                          id="5"
                          onClick={(e) => {
                            HandleChange(e);
                        
                          }}
                          style={{
                            backgroundColor: id == "5" ? " #F4E7FF" : "",
                            color: id == "5" ? "#A461D8" : "#979797",
                          }}
                          className="btn btnHPaid "
                        >
                          42H
                        </button>
                      </div>
                      <div className="pr-1">
                        <button
                          type="button"
                          value="60000rs"
                          id="6"
                          onClick={(e) => {
                            HandleChange(e);
                        
                          }}
                          style={{
                            backgroundColor: id == "6" ? " #F4E7FF" : "",
                            color: id == "6" ? "#A461D8" : "#979797",
                          }}
                          className="btn btnHPaid "
                        >
                          43H
                        </button>
                      </div>
                      <div className="pr-1">
                        <button
                          type="button"
                          value="70000rs"
                          id="7"
                          onClick={(e) => {
                            HandleChange(e);
                        
                          }}
                          style={{
                            backgroundColor: id == "7" ? " #F4E7FF" : "",
                            color: id == "7" ? "#A461D8" : "#979797",
                          }}
                          className="btn btnHPaid "
                        >
                          44H
                        </button>
                      </div>
                      <div className="pr-1">
                        <button
                          type="button"
                          value="80000rs"
                          id="8"
                          onClick={(e) => {
                            HandleChange(e);
                        
                          }}
                          style={{
                            backgroundColor: id == "8" ? " #F4E7FF" : "",
                            color: id == "8" ? "#A461D8" : "#979797",
                          }}
                          className="btn btnHPaid "
                        >
                          45H
                        </button>
                      </div>
                    </div>
                    <div className="col-5 mt-1">
                      <div
                        className="d-flex amount-fieldsModal"
                        style={{ width: "100%" }}
                      >
                        <span>€</span>
                        <input
                          style={{ marginBottom: "0px" }}
                          type="text"
                          id="dam"
                          className="form-control "
                          name="turnover"
                          placeholder="Amount"
                        />
                        <span>.00</span>
                      </div>
                    </div>
                    <div className="col-3 mt-1 px-1 ">
                      <button type="button" className="btn saveSalary" id="Hour">
                        Save Salary {showHour}H
                      </button>
                    </div>
                    <div className="col-4 mt-1 px-1">
                      <button type="button" onClick={()=>RemoveHandling()} className="btn RemoveSalary">
                        REMOVE Salary {showHour}H
                      </button>
                    </div>
                    <p className="paidHFontChild">
                      A remplir si possible, il faut selectionner les heures
                      négociées et mettre une valeur du salaire mensuel pour Xh
                    </p>
                  </div>
                </div>
                <div className="col-12">
                  <div className="row">
                    <p className="padding-bottom Form-styling pb-1 mt-2">
                      taux horraire Hours
                    </p>
                    <div className="d-flex">
                      <div className="pr-1">
                        <button type="button" className="btn btnHPaid ">
                          35H
                        </button>
                      </div>
                      <div className="pr-1">
                        <button type="button" className="btn btnHPaid ">
                          39H
                        </button>
                      </div>
                      <div className="pr-1">
                        <button type="button" className="btn btnHPaid ">
                          40H
                        </button>
                      </div>
                      <div className="pr-1">
                        <button type="button" className="btn btnHPaid ">
                          41H
                        </button>
                      </div>
                      <div className="pr-1">
                        <button type="button" className="btn btnHPaid ">
                          42H
                        </button>
                      </div>
                      <div className="pr-1">
                        <button type="button" className="btn btnHPaid ">
                          43H
                        </button>
                      </div>
                      <div className="pr-1">
                        <button type="button" className="btn btnHPaid ">
                          44H
                        </button>
                      </div>
                      <div className="pr-1">
                        <button type="button" className="btn btnHPaid ">
                          45H
                        </button>
                      </div>
                    </div>

                    <div className="col-5 mt-1">
                      <div
                        className="d-flex amount-fieldsModal"
                        style={{ width: "100%" }}
                      >
                        <span>€</span>
                        <input
                          style={{ marginBottom: "0px" }}
                          type="text"
                          className="form-control "
                          name="turnover"
                          placeholder="Amount"
                          onChange={null}
                        />
                        <span>.00</span>
                      </div>
                    </div>
                    <div className="col-3 mt-1 px-1">
                      <button className="btn SaveTAUX ">
                        Save TAUX HORRAIRE 35 H
                      </button>
                    </div>
                    <div className="col-4 mt-1 px-1">
                      <button className="btn RemoveSalary">
                        REMOVE Salary 35 H
                      </button>
                    </div>
                    <p className="paidHFontChild">
                      A remplir si possible, il faut selectionner les heures
                      négociées et mettre une valeur du salaire mensuel pour Xh
                    </p>
                  </div>
                </div>
                <div className="col-12 mt-1">
                  <p className="Form-styling  ">
                    CA Potentiel / Potential Turnonver
                  </p>
                  <div
                    className="d-flex amount-fieldsModal mt-0 pt-0"
                    style={{ width: "40%" }}
                  >
                    <span>€</span>
                    <input
                      style={{ marginBottom: "0px" }}
                      type="number"
                      className="form-control "
                      name="turnover"
                      placeholder="Amount"
                      onChange={onFormDataChange}
                    />
                    <span>.00</span>
                  </div>
                  <p className="paidHFontChild">
                    A remplir si possible, c’est le CA qu’on peut réaliser avec
                    ce client
                  </p>
                </div>
                <div className="col-12">
                  <div className="row">
                    <div className="col-md-6">
                      <label className="Form-styling mb-0">
                        Ce client a été rentré par : / This customer was entered
                        by
                      </label>
                      <input
                        type="text"
                        name="enteredBy"
                        placeholder="Contact name "
                        className="form-control placeHolder"
                        value={data.enteredBy}
                        onChange={onFormDataChange}
                      />
                      <span className="text-small">
                        Exemple : Jeremy Roggy; Patrick Bueno; TDR .... Who
                        entred this customer on the database
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-12 mt-2 ">
                  <div className="row bg-Switch">
                    <div className="col-2 d-flex px-0 justify-content-start">
                      <div className="d-flex align-items-center ">
                        <p className="fontSizeReactSwitch mb-0">
                          Offre envoyé ?
                        </p>
                        <Switch
                          className="ml-left"
                          onChange={switchHandle}
                          // onClick={(e)=>switchHandle(e)}
                          checked={Offre}
                          id="Offre"
                        />
                      </div>
                    </div>
                    <div className="col-3 d-flex px-0 justify-content-center">
                      <div className="d-flex align-items-center ">
                        <p className="fontSizeReactSwitch mb-0">
                          Signature digitale envoyé ?
                        </p>
                        <Switch
                          className="ml-left"
                          onChange={switchHandle}
                          checked={Signature}
                          id="Signature"
                        />
                      </div>
                    </div>
                    <div className="col-2 d-flex px-0 justify-content-end ml-1">
                      <div className="d-flex align-items-center ">
                        <p className="fontSizeReactSwitch mb-0">
                          Contrat singé ?
                        </p>
                        <Switch
                          className="ml-left"
                          onChange={switchHandle}
                          checked={Contrat}
                          id="Contrat"
                        />
                      </div>
                    </div>
                    <div className="col-3 d-flex px-0 justify-content-end">
                      <div className="d-flex align-items-center ">
                        <p className="fontSizeReactSwitch mb-0">
                          Publicité commencé ?
                        </p>
                        <Switch
                          className="ml-left"
                          onChange={switchHandle}
                          checked={Public}
                          id="Public"
                        />
                      </div>
                    </div>
                    <div className="col-1 d-flex px-0 justify-content-center ml-1">
                      <div className="d-flex align-items-center ">
                        <p className="fontSizeReactSwitch mb-0">A1 ?</p>
                        <Switch
                          className="ml-left"
                          onChange={switchHandle}
                          checked={A1}
                          id="A1"
                        />
                      </div>
                    </div>
                    <div className="col-3 d-flex pt-1 px-0 justify-content-start">
                      <div className="d-flex align-items-center ">
                        <p className="fontSizeReactSwitch mb-0">
                          Assurance faite ?
                        </p>
                        <Switch
                          className="ml-left"
                          onChange={switchHandle}
                          checked={Assurance}
                          id="Assurance"
                        />
                      </div>
                    </div>
                    <div className="col-3 d-flex pt-1 px-0 justify-content-start">
                      <div className="d-flex align-items-center ">
                        <p className="fontSizeReactSwitch mb-0">
                          Agence de voyage ok ?
                        </p>
                        <Switch
                          className="ml-left"
                          onChange={switchHandle}
                          checked={Agence}
                          id="Agence"
                        />
                      </div>
                    </div>
                    <div className="col-3 d-flex pt-1 px-0 ">
                      <div className="d-flex align-items-start ">
                        <p className="fontSizeReactSwitch mb-0">
                          SISPI déclaré ?
                        </p>
                        <Switch
                          className="ml-left"
                          onChange={switchHandle}
                          checked={SISPI}
                          id="SISPI"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-12 py-4">
                  <div className="row">
                    <div className="col-8">
                      <button className="btn btn-CLIENTSB px-4" type="submit">
                        Ajouter ce CLIENT / Add this CLIENT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const fakeDataFormat = {
  companyName: "",
  companyNumber: "",
  clientEmail: "",
  companyAddress: "",
  sector: "",
  companyContactName: "",
  companyContactNumber: "",
  skills: "",
  immediateClient: "",
  turnover: 0,
  salary: 0,
  job: "",
  postCount: 1,
  fromDate: "",
  toDate: "",
  importanceClient: "",
  enteredBy: "",
};
