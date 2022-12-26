import React, { useEffect, useState } from "react";
import { ColourOption } from "../../Selecteddata/data";
import chroma from "chroma-js";
import Select, { StylesConfig } from "react-select";
import { API_BASE_URL } from "../../config/serverApiConfig";

function LeadCard(props) {
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


   const [premier]=useState([ {
    value: "Patrick R",
    label:<>  <p className="mb-0">
    <input type="radio" className="inputLeadsClient" id="test1" name="radio-group" checked />
    <label htmlFor="test1 mb-0">Patrick R</label>
  </p></>,
    name: "premier",
    color: "#FF8B00",
  },
  {
    value: "Jeremy R",
    label: <>  <p className="mb-0">
    <input type="radio" className="inputLeadsClient" id="test1" name="radio-group" checked />
    <label htmlFor="test1 mb-0">Jeremy R</label>
  </p></>,
    name: "premier",
    color: "#FF8B00",
  },
  {
    value: "Morgan R",
    label: <>  <p className="mb-0">
    <input type="radio" className="inputLeadsClient" id="test1" name="radio-group" checked />
    <label htmlFor="test1 mb-0">Morgan R</label>
  </p></>,
    name: "premier",
    color: "#FF8B00",
  },
  {
    value: "Patrick B",
    label:<>  <p className="mb-0">
    <input type="radio" className="inputLeadsClient" id="test1" name="radio-group" checked />
    <label htmlFor="test1 mb-0">Patrick B</label>
  </p></> ,
    name: "premier",
    color: "#FF8B00",
  },
  {
    value: "Personne",
    label: <>  <p className="mb-0">
    <input type="radio" className="inputLeadsClient" id="test1" name="radio-group" checked />
    <label htmlFor="test1 mb-0">Personne</label>
  </p></>,
    name: "premier",
    color: "#FF8B00",
  },])as any


  const [deuxième]=useState([ {
    value: "Patrick R",
    label:<>  <p className="mb-0">
    <input type="radio" className="inputLeadsClient" id="test1" name="radio-group" checked />
    <label htmlFor="test1 mb-0">Patrick R</label>
  </p></>,
    name: "deuxième",
    color: "#FF8B00",
  },
  {
    value: "Jeremy R",
    label: <>  <p className="mb-0">
    <input type="radio" className="inputLeadsClient" id="test1" name="radio-group" checked />
    <label htmlFor="test1 mb-0">Jeremy R</label>
  </p></>,
    name: "deuxième",
    color: "#FF8B00",
  },
  {
    value: "Morgan R",
    label: <>  <p className="mb-0">
    <input type="radio" className="inputLeadsClient" id="test1" name="radio-group" checked />
    <label htmlFor="test1 mb-0">Morgan R</label>
  </p></>,
    name: "deuxième",
    color: "#FF8B00",
  },
  {
    value: "Patrick B",
    label:<>  <p className="mb-0">
    <input type="radio" className="inputLeadsClient" id="test1" name="radio-group" checked />
    <label htmlFor="test1 mb-0">Patrick B</label>
  </p></> ,
    name: "deuxième",
    color: "#FF8B00",
  },
  {
    value: "Personne",
    label: <>  <p className="mb-0">
    <input type="radio" className="inputLeadsClient" id="test1" name="radio-group" checked />
    <label htmlFor="test1 mb-0">Personne</label>
  </p></>,
    name: "deuxième",
    color: "#FF8B00",
  },])as any

  const [appelé]=useState([ {
    value: "Patrick R",
    label:<>  <p className="mb-0">
    <input type="radio" className="inputLeadsClient" id="test1" name="radio-group" checked />
    <label htmlFor="test1 mb-0">Patrick R</label>
  </p></>,
    name: "appelé",
    color: "#FF8B00",
  },
  {
    value: "Jeremy R",
    label: <>  <p className="mb-0">
    <input type="radio" className="inputLeadsClient" id="test1" name="radio-group" checked />
    <label htmlFor="test1 mb-0">Jeremy R</label>
  </p></>,
    name: "appelé",
    color: "#FF8B00",
  },
  {
    value: "Morgan R",
    label: <>  <p className="mb-0">
    <input type="radio" className="inputLeadsClient" id="test1" name="radio-group" checked />
    <label htmlFor="test1 mb-0">Morgan R</label>
  </p></>,
    name: "appelé",
    color: "#FF8B00",
  },
  {
    value: "Patrick B",
    label:<>  <p className="mb-0">
    <input type="radio" className="inputLeadsClient" id="test1" name="radio-group" checked />
    <label htmlFor="test1 mb-0">Patrick B</label>
  </p></> ,
    name: "appelé",
    color: "#FF8B00",
  },
  {
    value: "Personne",
    label: <>  <p className="mb-0">
    <input type="radio" className="inputLeadsClient" id="test1" name="radio-group" checked />
    <label htmlFor="test1 mb-0">Personne</label>
  </p></>,
    name: "appelé",
    color: "#FF8B00",
  },])as any

  const [responsable]=useState([ {
    value: "Patrick R"+props.length,
    label:<>  <p className="mb-0">
    <input type="radio" className="inputLeadsClient" id="test1" name="radio-group"  />
    <label htmlFor="test1 mb-0">Patrick R</label>
  </p></>,
    name: "responsable",
    color: "#FF8B00",
  },
  {
    value: "Jeremy R"+props.length,
    label: <>  <p className="mb-0">
    <input type="radio" className="inputLeadsClient" id="test1" name="radio-group"  />
    <label htmlFor="test1 mb-0">Jeremy R</label>
  </p></>,
    name: "responsable",
    color: "#FF8B00",
  },
  {
    value: "Morgan R" +props.length,
    label: <>  <p className="mb-0">
    <input type="radio" className="inputLeadsClient" id="test1" name="radio-group"  />
    <label htmlFor="test1 mb-0">Morgan R</label>
  </p></>,
    name: "responsable",
    color: "#FF8B00",
  },
  {
    value: "Patrick B"+props.length,
    label:<>  <p className="mb-0">
    <input type="radio" className="inputLeadsClient" id="test1" name="radio-group"  />
    <label htmlFor="test1 mb-0">Patrick B</label>
  </p></> ,
    name: "responsable",
    color: "#FF8B00",
  },
  {
    value: "Personne"+props.length,
    label: <>  <p className="mb-0">
    <input type="radio" className="inputLeadsClient" id="test1" name="radio-group"  />
    <label htmlFor="test1 mb-0">Personne</label>
  </p></>,
    name: "responsable",
    color: "#FF8B00",
  },])as any


  const [status]=useState([ {
    value: "Non déterminé",
    label:<>  <p className="mb-0">
    <input type="radio" className="inputLeadsClient" id="test1" name="radio-group" checked />
    <label htmlFor="test1 mb-0">Non déterminé</label>
  </p></>,
    name: "status",
    color: "#FF8B00",
  },
  {
    value: "Le client négocie",
    label: <>  <p className="mb-0">
    <input type="radio" className="inputLeadsClient" id="test1" name="radio-group" checked />
    <label htmlFor="test1 mb-0">Le client négocie</label>
  </p></>,
    name: "status",
    color: "#FF8B00",
  },
  {
    value: "Offre Accepté",
    label: <>  <p className="mb-0">
    <input type="radio" className="inputLeadsClient" id="test1" name="radio-group" checked />
    <label htmlFor="test1 mb-0">Offre Accepté</label>
  </p></>,
    name: "status",
    color: "#FF8B00",
  },
  {
    value: "Le client réfléchit",
    label:<>  <p className="mb-0">
    <input type="radio" className="inputLeadsClient" id="test1" name="radio-group" checked />
    <label htmlFor="test1 mb-0">Le client réfléchit</label>
  </p></> ,
    name: "status",
    color: "#FF8B00",
  },
  {
    value: "Le client ne réponds pas",
    label: <>  <p className="mb-0">
    <input type="radio" className="inputLeadsClient" id="test1" name="radio-group" checked />
    <label htmlFor="test1 mb-0">Le client ne réponds pas</label>
  </p></>,
    name: "status",
    color: "#FF8B00",
  },
  {
    value: "Pas intéréssé",
    label: <>  <p className="mb-0">
    <input type="radio" className="inputLeadsClient" id="test1" name="radio-group" checked />
    <label htmlFor="test1 mb-0">Pas intéréssé</label>
  </p></>,
    name: "status",
    color: "#FF8B00",
  }])as any

  

  const onSelect =()=>{
    debugger
    debugger
  }
  return (
    <>
      <div className="row leadClientCard my-1" style={{ width: "125%" }} key={props.props._id}>
        <div className="col-12 ">
          <div className="row">
            <div className="col-7 d-flex align-items-center">
              <p className="mb-0 d-flex align-items-center">
                <img
                  src={require("../../images/calendar.png")}
                  style={{ width: "12px", marginRight: "4px" }}
                />
                Lead Created on{" "}
              </p>
            </div>
            <div
              className="col-5 d-flex justify-content-end align-items-center"
              style={{ height: "50px" }}
            >
              <button className="deleteAd mx-1">
                <img src={require("../../images/Deletebucket.svg").default} />
              </button>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="row">
            <div className="col-8">
              <div className="row">
                <div className="col-3 d-grid px-0">
                  <div className="colorBoxLead d-flex justify-content-start align-items-center">
                    <p className="mb-0">Société</p>
                  </div>
                  <div className="BoxHeight">
                    <span>
                      <div className="col-9"> {props.props.companyName}</div>
                      <div className="col-4 d-flex align-items-center justify-content-center">
                        <img src={require("../../images/pen.svg").default} />
                      </div>
                    </span>
                  </div>
                </div>
                <div className="col-3  d-grid px-0">
                  <div className="grayboxLeads d-flex justify-content-start align-items-center">
                    <p className="mb-0">Téléphone(s)</p>
                  </div>
                  <div className="BoxHeight">
                    <span>
                      <div className="col-9"> {props.props.phoneNumber1}</div>
                      <div className="col-4 d-flex align-items-center justify-content-center">
                        <img src={require("../../images/pen.svg").default} />
                      </div>
                    </span>
                  </div>
                </div>
                <div className="col-3  d-grid px-0">
                  <div className="grayboxLeads d-flex justify-content-start align-items-center">
                    <p className="mb-0">Email Address</p>
                  </div>
                  <div className="BoxHeight">
                    <span>
                      <div className="col-9"> {props.props.email}</div>
                      <div className="col-4 d-flex align-items-center justify-content-center">
                        <img src={require("../../images/pen.svg").default} />
                      </div>
                    </span>
                  </div>
                </div>
                <div className="col-3  d-grid px-0">
                  <div className="grayboxLeads d-flex justify-content-start align-items-center">
                    <p className="mb-0">Note Client</p>
                  </div>
                  <div className="BoxHeight">
                    <span>
                      <div className="col-9"> {props.props.companyNote}</div>
                      <div className="col-4 d-flex align-items-center justify-content-center">
                        <img src={require("../../images/pen.svg").default} />
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="row">
                <div className="col-4 d-grid px-0">
                  <div className="grayboxLeads d-flex justify-content-start align-items-center">
                    <p className="mb-0">Nos notes Internes</p>
                  </div>
                  <div className="BoxHeight">
                    <span>
                      <div className="col-9"> {props.props.agencyNote}</div>
                      <div className="col-4 d-flex align-items-center justify-content-center">
                        <img src={require("../../images/pen.svg").default} />
                      </div>
                    </span>
                  </div>
                </div>
                <div className="col-3 d-grid px-0">
                  <div className="grayboxLeads d-flex justify-content-start align-items-center">
                    <p className="mb-0 ">Offre envoyé?</p>
                  </div>
                  <div className="BoxHeight align-items-center justify-content-center">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckChecked"
                        defaultChecked={props.props.offerSent}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexSwitchCheckChecked"
                      >
                        Oui
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-2 d-grid px-0">
                  <div className="grayboxLeads d-flex justify-content-start align-items-center">
                    <p className="mb-0">A rappeler?</p>
                  </div>
                  <div className="BoxHeight align-items-center justify-content-center">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckChecked"
                        defaultChecked={props.props.rappeler}

                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexSwitchCheckChecked"
                      >
                        Oui
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-3 d-grid px-0">
                  <div
                    className="grayboxLeads d-flex justify-content-start align-items-center"
                    style={{ borderTopRightRadius: "10px" }}
                  >
                    <p className="mb-0">Client Intéréssé?</p>
                  </div>
                  <div className="BoxHeight align-items-center justify-content-center">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckChecked"
                        defaultChecked={props.props.companyInterested}

                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexSwitchCheckChecked"
                      >
                        Oui
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 mt-1">
          <div className="row">
            <div className="col-10 ">
              <div className="row ">
                <div className="col-3 px-0 d-grid">
                  <div
                    className="grayboxLeads d-flex"
                    style={{ width: "100%",height:'50px' }}
                  >
                    <p className="mb-0 align-items-center  d-flex">
                      Qui a appelé le client en premier ? (premier contact)
                    </p>
                  </div>
                  <div className="p-1">
                    <Select
                      name="market"
                      closeMenuOnSelect={true}
                      placeholder="‎  ‎ ‎  ‎"
                      className="basic-multi-select placeHolderLead clientLeads"
                      classNamePrefix="select"
                      
                      //   onChange={FilterChange}
                      defaultValue={{
                        value: "Jeremy R",
                        label: <>  <p className="mb-0">
                        <input type="radio" className="inputLeadsClient" id="test1" name="radio-group" checked />
                        <label htmlFor="test1 mb-0">Jeremy R</label>
                      </p></>as any,
                       
                        color: "#FF8B00",
                      }}
                        options={premier}
                      styles={colourStyles}
                    />
                  </div>
                </div>
                <div className="col-3 px-0 d-grid">
                  <div
                    className="grayboxLeads d-flex"
                    style={{ width: "100%",height:'50px' }}
                  >
                    <p className="mb-0 align-items-center  d-flex">
                      Qui a appelé une deuxième fois le client ?
                    </p>
                  </div>
                  <div className="p-1">
                    <Select
                      name="market"
                    
                      placeholder="‎  ‎ ‎  ‎ "
                      className="basic-multi-select placeHolderLead clientLeads"
                      classNamePrefix="select"
                    //   defaultMenuIsOpen={true}
                        options={deuxième}
                      styles={colourStyles}
                      defaultValue={{
                        value: "Jeremy R",
                        label: <>  <p className="mb-0">
                        <input type="radio" className="inputLeadsClient" id="test1" name="radio-group" checked />
                        <label htmlFor="test1 mb-0">Jeremy R</label>
                      </p></>as any,
                       
                        color: "#FF8B00",
                      }}
                    />
                  </div>
                </div>
                <div className="col-3 px-0 d-grid">
                  <div
                    className="grayboxLeads d-flex"
                    style={{ width: "100%" ,height:'50px'}}
                  >
                    <p className="mb-0 align-items-center  d-flex">
                      Le client a t’il été appelé après envoi de l’offre ? Par
                      Qui ?
                    </p>
                  </div>
                  <div className="p-1">
                    <Select
                      name="market"
                      closeMenuOnSelect={true}
                      placeholder="‎  ‎ ‎  ‎ "
                      className="basic-multi-select placeHolderLead clientLeads"
                      classNamePrefix="select"
                      //   onChange={FilterChange}
                        options={appelé}
                      styles={colourStyles}
                      defaultValue={{
                        value: "Jeremy R",
                        label: <>  <p className="mb-0">
                        <input type="radio" className="inputLeadsClient" id="test1" name="radio-group" checked />
                        <label htmlFor="test1 mb-0">Jeremy R</label>
                      </p></>as any,
                       
                        color: "#FF8B00",
                      }}
                    />
                  </div>
                </div>
                <div className="col-3 px-0 d-grid">
                  <div
                    className="grayboxLeads d-flex"
                    style={{ width: "100%",height:'50px' }}
                  >
                    <p className="mb-0 align-items-center  d-flex">
                      Qui est le responsable actuel de ce client ?{" "}
                    </p>
                  </div>
                  <div className="p-1">
                    <Select
                      name="market"
                      closeMenuOnSelect={true}
                      placeholder="‎  ‎ ‎  ‎ "
                      className="basic-multi-select placeHolderLead clientLeads"
                      classNamePrefix="select"
                      //   onChange={FilterChange}
                        options={responsable}
                      styles={colourStyles}
                      defaultValue={{
                        value: "Jeremy R",
                        label: <>  <p className="mb-0">
                        <input type="radio" className="inputLeadsClient" id="test1" name="radio-group" checked={true} />
                        <label htmlFor="test1 mb-0">Jeremy R</label>
                      </p></>as any,
                       
                        color: "#FF8B00",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-2 px-0 d-grid" >
              <div className="grayboxLeads d-flex" style={{ width: "100%",height:'50px' }}>
                <p className="mb-0 align-items-center  d-flex">Status Client</p>
              </div>
              <div className="p-1">
                <Select
                  name="market"
                  closeMenuOnSelect={true}
                  placeholder="‎  ‎ ‎  ‎ "
                  className="basic-multi-select placeHolderLead clientLeads"
                  classNamePrefix="select"
                  //   onChange={FilterChange}
                  //   options={fromPerson}
                  styles={colourStyles}
                  defaultValue={{
                    value: "Pas intéréssé",
                    label: <>  <p className="mb-0">
                    <input type="radio" className="inputLeadsClient" id="test1" name="radio-group" checked />
                    <label htmlFor="test1 mb-0">Pas intéréssé</label>
                  </p></>as any,
                   
                    color: "#FF8B00",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default LeadCard;
