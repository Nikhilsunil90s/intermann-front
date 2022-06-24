import React, { useEffect, useState } from "react";
import {  toast } from "react-hot-toast";
import Select,{StylesConfig} from "react-select";
import { API_BASE_URL } from "../../config/serverApiConfig";
import { ColourOption, colourOptions, colourOptionsFetes, fromPerson } from '../../Selecteddata/data';
import chroma from 'chroma-js';

let opArr=[]
function InProgressModal({ props, closeModal }) {
  console.log(props);
  // Notifications //
  const notifyMoveSuccess = () =>
    toast.success("Moved to In-Progress Successfully!");
   const notifyMoveError = () => toast.error("Not Moved..");
  //  End   //
  const [workingFor, setWorkingFor] = useState(opArr);
  const [workingSince, setWorking] = useState("");
  const [salary, setSalary] = useState("");
  const [candidatId, setCandidateID] = useState(props._id);
  const [clientOption,setClientOption]=useState([{
value:"Client ONE",label:"Client One",color:  '#FF8B00',name:"clientName"
  }
,{
  value:"Client TWO",label:"Client TWO",color:  '#FF8B00',name:"clientName"
    },{
      value:"Client THREE",label:"Client THREE",color:  '#FF8B00',name:"clientName"
        }
])as any
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

  let data = {
    workingFor,
    workingSince,
    salary,
    candidatId,
  };

  const saveModalData = async () => {
    console.log(data);
    return await fetch(API_BASE_URL + "moveToInProgress", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((reD) => {
        {
          console.log(reD);
        }
      })
      .catch((err) => err);
  };

  const saveFormData = (e) => {
    e.preventDefault();
    console.log(data);
    saveModalData()
      .then((resp) => {
        console.log(resp);
        closeModal(false);
        setTimeout(function () {
              window.location.href = "/todolist";
            },
          2000
        );    
        notifyMoveSuccess();
      })
      .catch((err) => {
        console.log(err);
        notifyMoveError()
      });
  };
  const Client=(ClientOp)=>{
    if(ClientOp.value !== "")
    opArr=ClientOp.value
  }
  const onFormDataChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | any
    >
  ) => {
    // if (e.target.value !== "") {
    //   console.log(e.target.name, e.target.value);
    //   setWorkingFor(e.target.value);
    //   alert("hello")
    if (e.target.name === "date") {
      console.log(e.target.name, e.target.value);
      setWorking(e.target.value);
    } else if (e.target.name === "turnover") {
      console.log(e.target.value);
      setSalary(e.target.value);
    }
  };
  return (
    <>
      <div
        className="modal d-block"
        style={{ backgroundColor: "#00000052" }}
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content padding-full">
          <div className="modal-header">
          <h2 className="modal-title modalStylingfontProgress" id="staticBackdropLabel">
              Move {props.candidatName} to
              <span className="col-spl">IN-PROGRESS</span>
            </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  closeModal(false);
                }}
              ></button>
            </div>
          
            <form
              onSubmit={(e) => {
                saveFormData(e);
                return false;
              }}
            >
              <div className="modal-body text-start">
                <span className="Modal-body-Progress">
                
                  Qui est le client qui a embauché {props.candidatName} ?
                </span>
                <div className="col-12 pt-1">
                  <div className="row">
                    <div className="col-6">
                    <label className="Modal-label">Who is the client who hired this person</label>
                {/* <select
                  className="form-select"
                  name="clientName"
                  onChange={onFormDataChange}
                  aria-label="Default select example"
                >
                  <option>Select Un Client</option>
                  <option value="1">Client One</option>
                  <option value="2">Client Two</option>
                  <option value="3">Client Three</option>
                </select> */}
                <Select 
                options={clientOption}
                onChange={Client}
                styles={colourStyles}
                className="inProgress"
                placeholder="{Client_list}"
                />
  
                <div className="noteModal">
                  <span className="">NOTE: </span>
                  <span>
                    
                  Note  : This action will automaticclly move this client/lead to status 
- <span className="col-spl">In Progress</span>, if this client/lead isn’t already with this status.
                  </span>
                  
                </div>
                    </div>
                    <div className="col-6">
                   
                    <label className=" Modal-label-1">
                      FROM DATE / A PARTIR DE:
                    </label>
                    <div className="input-group date" id="datepicker">
                      <input
                        type="date"
                        name="date"
                        onChange={onFormDataChange}
                        className="form-control"
                      />
                    </div>
                  
                      </div>
                  </div>
                </div>
 
        
                <div className="col-12 pt-2 d-grid">
                  <label className="salaire">
                    Salaire Net de {props.candidatName} / {props.candidatName}
                    Net Salary:
                  </label>
                  <div>
                    <div
                      className="d-flex amount-fieldsModal"
                      style={{ width: "50%" }}
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
                  </div>
                  <p className="last-noteModal"><span >Note</span> : This action mean that {props.candidatName} have signed a contract with Intermann If you have any question please contact your manager or contact@textone.fr</p>
                </div>
                <div className="col-12 text-center pt-3">
                  <div className="row justify-content-end">
                    <div className="col-8">
                      <button
                        style={{
                          borderRadius: "30px",
                          backgroundColor: "#A461D8",
                          width: "100%",
                          padding: "17px 0px",
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: "16px",
                          lineHeight: "24px",
                          color: "white",
                          border: "unset",
                        }}
                      >
                        Move {props.candidatName} to In-Progress status
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default InProgressModal;
