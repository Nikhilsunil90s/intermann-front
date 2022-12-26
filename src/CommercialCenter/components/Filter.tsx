import React from "react";
import { ColourOption } from "../../Selecteddata/data";
import chroma from "chroma-js";
import Select, { StylesConfig } from "react-select";

function Filter (){

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
    return (<>
      <div className="row">
        <div className="col-4">
          <label style={{ fontSize: "14px" }} className="Form-styling">
          Offre envoyé ?
          </label>
          {/* {QUALIFIED.length > 0 ? ( */}
            <Select
              name="market"
              closeMenuOnSelect={true}
              placeholder="‎  ‎ ‎  ‎ Offre envoyé ?"
              className="basic-multi-select placeHolderLead"
              classNamePrefix="select"
            //   onChange={FilterChange}
            //   options={QUALIFIED}
            //   styles={colourStyles}
            />
          {/* ) : (
            <>
              {" "}
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </>
          )} */}
        </div>
        <div className="col-4">
          <label style={{ fontSize: "14px" }} className="Form-styling">
          A rappeler ?
          </label>
          {/* {fromPerson.length > 0 ? ( */}
            <Select
              name="market"
              closeMenuOnSelect={true}
              placeholder="‎  ‎ ‎  ‎ A rappeler ?"
              className="basic-multi-select placeHolderLead"
              classNamePrefix="select"
            //   onChange={FilterChange}
            //   options={fromPerson}
              styles={colourStyles}
            />
          {/* ) : (
            <>
              {" "}
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </>
          )} */}
        </div>
        <div className="col-4">
          <label style={{ fontSize: "14px" }} className="Form-styling">
          Client interéssé ?
          </label>
          {/* {CONTACTED.length > 0 ? ( */}
            <Select
              name="market"
              closeMenuOnSelect={true}
              placeholder="‎  ‎ ‎  ‎ Client interéssé ?"
              className="basic-multi-select placeHolderLead"
              classNamePrefix="select"
            //   onChange={FilterChange}
            //   options={CONTACTED}
              styles={colourStyles}
            />
          {/* ) : (
            <>
              {" "}
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </>
          )} */}
        </div>
        <div className="col-4 mt-1">
          <label style={{ fontSize: "14px" }} className="Form-styling">
          Assigner a quel resposable ?
          </label>
          {/* {Precontacted.length > 0 ? ( */}
            <Select
              name="market"
              closeMenuOnSelect={true}
              placeholder="‎  ‎ ‎  ‎ Assigner a quel resposable ?"
              className="basic-multi-select placeHolderLead"
              classNamePrefix="select"
            //   onChange={FilterChange}
            //   options={Precontacted}
              styles={colourStyles}
            />
          {/* ) : (
            <>
              {" "}
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </>
          )} */}
        </div>
        <div className="col-4 mt-1">
          <label style={{ fontSize: "14px" }} className="Form-styling">
            Nom de la société ?
          </label>
          {/* {Precontacted.length > 0 ? ( */}
          <input
                         type="number"
                         style={{fontSize:"12px", border :"2px solid #f4f4f4"}} className="form-control nameTransform"
                         placeholder=" Nom de la société ?"
                         name="phoneNumber1"
                        //  onChange={onInputFormChange}
                          
                       />
          {/* ) : (
            <>
              {" "}
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </>
          )} */}
        </div>
        <div className="col-4 mt-1">
          <label style={{ fontSize: "14px" }} className="Form-styling">
          Search by Status
          </label>
          {/* {Precontacted.length > 0 ? ( */}
          <input
                         type="number"
                         style={{fontSize:"12px", border :"2px solid #f4f4f4"}} className="form-control nameTransform"
                         placeholder="Search by Status"
                         name="phoneNumber1"
                        //  onChange={onInputFormChange}
                          
                       />
          {/* ) : (
            <>
              {" "}
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </>
          )} */}
        </div>
{/*    
         <div className="col-12 mt-2">
          <div className="row justify-content-end">
            <div className="col-2">
              {" "}
              <button
                className="glow-on-hover mr-2"
                style={{width:"100%",height:"40px"}}
                name="ApplyFil"
                // onClick={(e) => OnClickDataChange(e)}
                // disabled={applyBtn}
              >
                Apply
              </button>
            </div>
        
              <div className="col-2">
                {" "}
                <button
                  className="RESETfilters"
              
                >
                  Reset
                </button>
              </div>
   
          </div>
        </div>  */}
      </div>
    </>)
}
export default Filter;