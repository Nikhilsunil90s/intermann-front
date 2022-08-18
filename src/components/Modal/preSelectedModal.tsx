import React,{useEffect, useState} from "react";
import '../../CSS/PreModal.css'
import Select,{StylesConfig} from 'react-select'
import { ColourOption, colourOptions, colourOptionsFetes, fromPerson } from '../../Selecteddata/data';
import chroma from 'chroma-js';
import { Toaster, toast } from "react-hot-toast";
import { API_BASE_URL } from "../../config/serverApiConfig";

function PreModal({props,closepreModal,client}) {
  const notifyCandidatMovedSuccess = () => toast.success("Candidat Pre-Selected Successfully!");
  const notifyCandidatMovedError = () => toast.error("Candidat Not Pre-Selected! Please Try Again.");

  const [selectedClient, setSelectedClient] = useState("");
  const [reason, setReason] = useState("");
  const [clientDataOptions,setClientOption]=useState([])
console.log(props,"props")

useEffect(()=>{
  if(clientDataOptions.length == 0){
  setClientOption( client ? client.map((client) => {
    return { label: client.clientCompanyName, value: client._id, color: '#FF8B00' }
  }) :  props.clients ? props.clients.map((client) => {
    return { label: client.clientCompanyName, value: client._id, color: '#FF8B00' }
  }): [{ label: 'No Clients In this Sector', value: "", color: '#FF8B00' }])
}
})


console.log(clientDataOptions,"clients")
  const onClientChange = (sc: any) => {
    console.log(sc)
    setSelectedClient(sc.value);
  }

  const onDataChange = (e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | any
  >) => {
    // debugger
    console.log(e.target.value)
    setReason(e.target.value);
  }

  const changeStatus = async (preSelectedData: any) => {
    return await fetch(API_BASE_URL + "moveToPreSelected", {
      method: 'POST',
      headers: {
        "Accept": 'application/json',
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
      body: JSON.stringify(preSelectedData)
    })
      .then(resp => resp.json())
      .then(respData => respData)
      .catch(err => err)
  }

  const moveToPreSelected = () => {
    console.log(reason, selectedClient, props._id);
    const preSelectedData = {
      candidatId: props._id,
      clientId: selectedClient,
      reason: reason
    }
    changeStatus(preSelectedData).then((resData) => {
      console.log(resData);
      if (resData.status) {
        notifyCandidatMovedSuccess()
        setTimeout(() => {
          window.location.href = "/todolist";
        }, 2000)
      }
    }).catch(err => {
      console.log(err)
      notifyCandidatMovedError()
    })
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
                             name="clientCompanyName"
                                closeMenuOnSelect={true}
                                placeholder="Select A Client"
                                className="basic-select preSelectModal" 
                                classNamePrefix="select"
                                styles={colourStyles}
                                onChange={onClientChange}
                                options={clientDataOptions}
                                // styles={colourStyles}
                              /></div>
                              <p className="ChildStylePreModal mt-2">pour quel raison {props.candidatName} est selectionné ?</p>
<div><div className="form-floating">
  <textarea className="form-control" onChange={onDataChange} name="reason" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: "100px"}}></textarea>
  <label htmlFor="floatingTextarea2" placeholder="{client_List}"></label>
</div></div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn preSelectedStageBtn"  onClick={moveToPreSelected}>
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
