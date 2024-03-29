import React, { useState, useEffect } from "react";
import { GetRoute ,PostRoute} from "../../components/ApisFunction/FunctionsApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function Card(props: any) {
  const navigate =useNavigate()
  const [isMulti, setIsMulti] = useState([
    {
      index: "",
    },
  ]) as any;
 
  const onSelectRowActive = async (iD, i) => {
    props.SelectedList(iD,i,setIsMulti,isMulti)
  };

  const DeleteBills=()=>{
    let  data ={
      toDeleteArray:props.id
    } 
    PostRoute(data,"deleteInvoices").then((res)=>{
      if(res.status){
        toast.success(res.message)
      }else{
        toast.success(res.message)
      }
    })
    .catch((err)=>console.log(err))
  }

  const MoveToeditScreen=(data)=>{
    navigate("/edit_Billing_center",{state:data})
  }
  return (
    <>
      <tr
        className="cursor-pointer"
        key={props.index}
      
        style={{
          background: props.multiSelect
            ? "#E7F5FF"
            : props?.onClickRowActive?.includes(props.props._id)
            ? "#E7F5FF"
            : "",
        }}
      >
        <th scope="row"   onClick={() => {
          onSelectRowActive(props.props._id, props.index);
        }}>
          <div className="align-items-center" >
            <label className="InputContainer">
              <input
                type="checkbox"
                name={`checkMark` + props.index}
                checked={
                  props.multiSelect
                    ? true
                    : props?.onClickRowActive?.includes(props.props._id)
                    ? true
                    : false
                }
              />
              <span className="checkmark"></span>
            </label>
            {/* <input type={"checkbox"} /> */}
          </div>
        </th>
        <td className=""   onClick={() => {
          onSelectRowActive(props.props._id, props.index);
        }}>
          <div className="">
            <p className="mb-0 d-flex align-items-center">
              {props.props.factureNumber}
            </p>
          </div>
        </td>
        <td className=""   onClick={() => {
          onSelectRowActive(props.props._id, props.index);
        }}>
          <div className="">
            <p
              className="mb-0 d-flex align-items-center"
              data-bs-toggle="tooltip"
              data-bs-html="true"
              title={props.props.factureTo}
            >
              {props.props.factureTo.length > 40
                ? props.props.factureTo.slice(0, 40) + "..."
                : props.props.factureTo}
            </p>
          </div>
        </td>
        <td className=""   onClick={() => {
          onSelectRowActive(props.props._id, props.index);
        }}>
          <div className="">
            <p className="mb-0 d-flex align-items-center">
              {props.props.factureCreateDate
                ? props.props.factureCreateDate
                : "NO DATE"}{" "}
              /{" "}
              {props.props.factureDueDate
                ? props.props.factureDueDate
                : "NO DATE"}
            </p>
          </div>
        </td>
        <td className=""   onClick={() => {
          onSelectRowActive(props.props._id, props.index);
        }}>
          <div className="">
            <p
              className={`mb-0 d-flex align-items-center ${
                props.props.factureStatus === "Unpaid"
                  ? "colorFontx200d"
                  : "colorFont"
              }`}
            >
              {props.props.factureCurrency === "USD"
                ? "$"
                : props.props.factureCurrency === "Euro"
                ? "€"
                : "Lei"}
              {props.props.total_h_t_tva.toFixed(2)}
            </p>
          </div>
        </td>
        <td className="">
          <div className="align-items-center px-0">
            {props.props.factureStatus === "Unpaid" ? (
              <button className="mb-0 d-flex align-items-center buttonUnPaid">
                Unpaid
              </button>
            ) : (
              <button className="mb-0 d-flex align-items-center buttonPaid">
                Paid
              </button>
            )}
          </div>
        </td>
        <td>
          <div className="d-flex">
            <div className=" d-flex align-items-center">
              <button
                style={{
                  background:
                    props.multiSelect ||
                    props?.onClickRowActive?.includes(props.props._id)
                      ? "#489767"
                      : "",
                  color:
                    props.multiSelect ||
                    props?.onClickRowActive?.includes(props.props._id)
                      ? "#ffff"
                      : "",
                }}
                className="dsBtnPaid"
              >
                Mark as Paid
              </button>
            </div>
            <div className=" d-flex align-items-center">
              <button
                style={{
                  background:
                    props.multiSelect ||
                    props?.onClickRowActive?.includes(props.props._id)
                      ? "#E21B1B"
                      : "",
                  color:
                    props.multiSelect ||
                    props?.onClickRowActive?.includes(props.props._id)
                      ? "#ffff"
                      : "",
                }}
                className="dsBtnUnPaid"
              >
                Mark as UNPaid
              </button>
            </div>
            <div className=" d-flex align-items-center justify-content-center">
              <button
                className="border-white RoundDiv"
                style={{ background: "#F3F4F6", width: "37px" }}
                onClick={()=>MoveToeditScreen(props.props)}
              >
                <img alt="..." src={require("../../images/penPng.svg").default} />
              </button>
            </div>
            <div className=" d-flex align-items-center ">
              <button
                className="border-white RoundDiv"
                style={{ background: "#F3F4F6", width: "37px" }}
                onClick={()=>DeleteBills()}
              >
                <img alt="..." src={require("../../images/Deletebucket.svg").default} />
              </button>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}
export default Card;
