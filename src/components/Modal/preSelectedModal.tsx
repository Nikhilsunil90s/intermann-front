import React from "react";
import '../../CSS/PreModal.css'
import Select,{StylesConfig} from 'react-select'
import { ColourOption, colourOptions, colourOptionsFetes, fromPerson } from '../../Selecteddata/data';
import chroma from 'chroma-js';

function PreModal({props,closepreModal}) {
    const option=[{
        value:"hello",label:"hello",color:"#FF8B00"
    }]
    console.log(props.candidatName)
    const HandelLicence=(e:any)=>{
      // debugger
   
    }
    const colourStyles: StylesConfig<ColourOption, true> = {
      control: (styles) => ({ ...styles, backgroundColor: 'white' }),
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
            ? '#ccc'
            : isSelected
              ? chroma.contrast(color, 'white') > 2
                ? 'white'
                : 'black'
              : data.color,
          cursor: isDisabled ? 'not-allowed' : 'default',
  
          ':active': {
            ...styles[':active'],
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
        ':hover': {
          backgroundColor: data.color,
          color: 'white',
        },
      }),
    };
  return (
    <>
    

      <div
        className="modal d-block"
        style={{ backgroundColor: "#00000052" }}
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content" style={{width:"670px"}}>
            <div className="modal-header">
              <h5 className="modal-title modalStylingfont" id="exampleModalLabel">
              Move {props.candidatName} to <span> PRE SELECTED </span>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              onClick={()=>{closepreModal(false)}}
              ></button>
            </div>
            <div className="modal-body">

<p className="ChildStylePreModal">pour quel client {props.candidatName} est selectionné ?</p>
<div >                        <Select
                                name="candidatLicencePermis"
                                closeMenuOnSelect={true}
                                placeholder="{Client_List}"
                                className="basic-select preSelectModal" 
                                classNamePrefix="select"
                                styles={colourStyles}
                                onChange={HandelLicence}
                                options={option}
                                // styles={colourStyles}
                              /></div>
                              <p className="ChildStylePreModal mt-2">pour quel raison {props.candidatName} est selectionné ?</p>
<div><div className="form-floating">
  <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: "100px"}}></textarea>
  <label htmlFor="floatingTextarea2" placeholder="{client_List}"></label>
</div></div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn preSelectedStageBtn">
              Move this person to in preselected status
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default PreModal;
