import { de } from "date-fns/locale";
import React, { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import "../CSS/Billing.css";
import { Calendar } from "react-date-range";
import format from "date-fns/format";
import { PostRoute } from "../../components/ApisFunction/FunctionsApi";
import { motion } from "framer-motion";
import Select from "react-select";
import { currency, colourStyles } from "../Functions/ReactSelect";
import { useLocation } from "react-router";

let GlobalRow = [];
let toTalamount = 0.0;
let Prix = 0;
let Qua = 0;
function EditBillingCenter() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const ref = useRef() as any;
  const refOne = useRef(null);
  const reftwo = useRef(null);
  const [Startopen, setStartOpen] = useState(false);
  const [old_data,setOld_data]=useState(state)as any
  const [open, setOpen] = useState(false);
  const [totalA, setA] = useState(old_data.details ? old_data.details: [])as any;
  const [displayRow, setDisplayRow] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0.0) as any;
  const [DS, setDS] = useState(false);
  const [CurrencyValue, setCurrencyValue] = useState( {
    value: "Euro",
    label: "€",
  });
  const [Row, setRow] = useState({
    description: "",
    quantity: "",
    price: 0,
    montant: 0,
  }) as any;



  const [data, setData] = useState({
    factureCurrency: old_data.factureCurrency !== "" ?  old_data.factureCurrency  : CurrencyValue.value,
    factureNumber:old_data.factureNumber !== "" ?  old_data.factureNumber  : "",
    factureCreateDate: old_data.factureCreateDate !== "" ?  old_data.factureCreateDate  : "",
    factureDueDate: old_data.factureDueDate !== "" ?  old_data.factureDueDate  : "",
    factureTo:  old_data.factureTo !== "" ?  old_data.factureTo  : "",
    factureVAT:  old_data.factureVAT !== "" ?  old_data.factureVAT  : "",
    details:old_data.details ? old_data.details : [],
  })as any;

  useEffect(()=>{
    if(totalA.length){
        GlobalRow=old_data.details ? old_data.details: []
        setDisplayRow(true) 
        toTalamount = old_data?.total_h_t_tva
        setTotalAmount(toTalamount)
      }
  },[])

  const onClickLineAdd = () => {
    if (Row.quantity === "" || Row.price == "" || Row.description == "") {
      if (totalA.length > 0) {
        setDisplayRow(true);
      }
      toast.error("Please Fill All Fields!");
    } else {
      setDisplayRow(true);
      let datA = Row;
      datA.montant = parseFloat(ref.current?.value);
      setRow({ ...Row, montant: datA });
      toTalamount =
        totalAmount + parseInt(Row.quantity) * parseFloat(Row.price);
      setTotalAmount(toTalamount);
      GlobalRow.push(Row);
      setData({ ...data, details: GlobalRow });
      setA([...GlobalRow]);
      setRow({ ...Row, montant: "", quantity: "", price: "", description: "" });
    }
  };

  const deleteItem = async (name, items) => {
    if (name == "withoutMap") {
      setDisplayRow(false);
    } else {
      await totalA.map((el, i) => {
        if (items == i) {
          toTalamount = toTalamount - el.montant;
        }
      });
      let newArray = totalA.filter((el, i) => items !== i);
      if (newArray.length === 0) {
        setDisplayRow(false);
      }
      setTotalAmount(toTalamount);
      GlobalRow = newArray;
      setA([...newArray]);
      setData({ ...data, details: newArray });
    }
  };

  // Main details //

  const onChangeFormFill = (e: any) => {
    if (e.target.name === "Submit") {
      setDS(true);
      PostRoute(data, "saveInvoice").then((res) => {
        if (res.status) {
          toast.success(res.message);
          setDS(false);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          toast.error(res.message);
          setDS(false);
        }
      });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  // Dates
  const dateChangeStart = (date) => {
    setData({ ...data, ["factureCreateDate"]: format(date, "dd-MM-yyyy") });
    setStartOpen(false);
    setOpen(false);
  };

  const dateChange = (date) => {
    setData({ ...data, ["factureDueDate"]: format(date, "dd-MM-yyyy") });
    setOpen(false);
    setStartOpen(false);
  };
  // End

  // Details //
  const onChangeDetailsFill = (e: any) => {
    if (e.target.name === "description") {
      setRow({ ...Row, [e.target.name]: e.target.value });
    }
    if (e.target.name === "price") {
      Prix = parseFloat(e.target.value);
      setRow({ ...Row, price: parseFloat(e.target.value) });
    }
    if (e.target.name === "quantity") {
      Qua = parseFloat(e.target.value);
      setRow({ ...Row, [e.target.name]: parseInt(e.target.value) });
    }
  };
  // End Details //

  useEffect(() => {
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  const hideOnClickOutside = (e) => {
    if (reftwo.current && !reftwo.current.contains(e.target)) {
      setStartOpen(false);
    }
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const OnReactSelect = (e) => {
    setCurrencyValue({ ...CurrencyValue, value: e.value, label: e.label });
    setData({ ...data, factureCurrency: e.value });
  };
  return (
    <>
      <Toaster
        position="top-right"
        containerStyle={{
          zIndex:
            "999999999999999999999999999999909999999999999999999999999999555555555555",
        }}
      />
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-12"
            style={{
              position: "sticky",
              top: "0px",
              height: "18vh",
              zIndex: "555555555",
            }}
          >
            <div className="row">
              <div
                className="col-2 logoSet sideBarBackG d-flex align-items-center justify-content-center"
                style={{ padding: "20px" }}
              >
                <span>
                  <img
                    alt="..."
                    src={require("../../images/logo-header.svg").default}
                    className="filter-logo"
                  />
                </span>
                <img
                  alt="..."
                  src={require("../../images/LogoName.svg").default}
                  className="filter-text"
                />
              </div>
              <div className="col-10 text-end bg-white pt-1 pr-3 TopHeaderAddInvoice">
                <h3>Facture</h3>
                <p className="mb-0">
                  Jeremy Roggy +40 770 504 158 contact@intermann.ro
                  https://www.intermann.fr/
                </p>
                <span>
                  Valabila online cf art. 319, alin. 29, din Legea 227/2016
                  privind Codul Fiscal
                </span>
              </div>
            </div>
          </div>
          <div
            className="p-2 scrollbarBox"
            style={{
              height: "70vh",
              position: "fixed",
              overflowY: "scroll",
              marginTop: "100px",
              marginBottom: "60px",
            }}
          >
            <div className="col-12 bgAddInvoice p-1">
              <div className="row">
                <div className="col-6">
                  <div className="row">
                    <div className="col-6 d-flex  align-items-center">
                      <p className="fact mb-0">FACTURA N°</p>
                    </div>
                    <div className="col-6">
                      <input
                        type={"text"}
                        value={data.factureNumber}
                        placeholder="Factura N"
                        onChange={onChangeFormFill}
                        name="factureNumber"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="row">
                    <div className="col-6  d-flex justify-content-end align-items-center">
                      <p className="mb-0 fact">DATE </p>
                    </div>
                    <div className="col-6">
                      <input
                        placeholder="20.6.2022"
                        name="factureCreateDate"
                        readOnly
                        style={{ textTransform: "none" }}
                        onClick={() => setStartOpen((open) => !open)}
                        value={
                          data.factureCreateDate === ""
                            ? "dd/mm/yyyy"
                            : data.factureCreateDate
                        }
                      />
                      {/* <input
                              //  value={data.candidatStartDate === "" ? "dd/mm/yyyy" : data.candidatStartDate }
                                readOnly
                                style={{textTransform:"none"}}
                                className="dateSort"
                                onClick={() => setStartOpen((open) => !open)}
                                
                              /> */}
                      <div ref={reftwo} className="rdrDateRangePickerWrapper ">
                        {Startopen && (
                          <Calendar
                            onChange={(item) => dateChangeStart(item)}
                            direction="vertical"
                            className="calendarElement "
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-6" style={{ marginTop: "8px" }}>
                  <p className="mb-0 fact" style={{ lineHeight: "40px" }}>
                    MODE DE PAIEMENT/MODALITATE DE PLATÄ‚
                  </p>
                </div>
                <div className="col-6  " style={{ marginTop: "8px" }}>
                  <div className="row">
                    <div className="col-6 justify-content-end d-flex  align-items-center">
                      <p className="mb-0 fact">ÉCHÉANCE </p>
                    </div>
                    <div className="col-6">
                      <input
                        placeholder="25.6.2022"
                        name="factureDueDate"
                        value={
                          data.factureDueDate == ""
                            ? "dd/mm/yyyy"
                            : data.factureDueDate
                        }
                        readOnly
                        onClick={() => setOpen((open) => !open)}
                        style={{ textTransform: "none" }}
                      />

                      <div ref={refOne} className="rdrDateRangePickerWrapper">
                        {open && (
                          <Calendar
                            onChange={(item) => dateChange(item)}
                            direction="vertical"
                            className="calendarElement"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <p className="mb-0 fact007">EUR : RO87INGB0000999911654186</p>
                </div>
                <div className="col-12">
                  <p className="mb-0 fact007">RON : RO02INGB0000999911654164</p>
                </div>
                <div className="col-12">
                  <p className="mb-0 fact007">SWIFT : INGBROBU</p>
                </div>
              </div>
            </div>

            <div className="mt-2">
              <div className="col-12">
                <div className="row">
                  <div className="col-5 borderClass">
                    <div className="row">
                      <div className="col-2 d-flex justify-content-center ">
                        <p className="x1102">DE</p>
                      </div>
                      <div className="col-10">
                        <p className="mb-0 x1103">
                          S.C. INTERMANN WORK S.R.L. str. Baba Novac nr. 5, bl.
                          M1 sc. B ap. 22 BUCURESTI
                        </p>
                        <p className="mb-0">Roumanie</p>
                      </div>
                      <div className="col-2 d-flex justify-content-end ">
                        <p className="mb-0 x1103">VAT ID:</p>
                      </div>
                      <div className="col-10">
                        <p className="mb-0 x1103">RO44515629</p>
                      </div>
                      <div className="col-2 d-flex justify-content-end ">
                        <p className="mb-0 x1103">NOTE:</p>
                      </div>
                      <div className="col-10">
                        <p className="mb-0 x1103 text-capitalize">
                          Valabila online cf art. 319, alin. 29, din Legea
                          227/2016 privind - codul Fiscal
                        </p>
                      </div>
                      <div className="col-2 d-flex justify-content-end ">
                        <p className="mb-0 x1103">CIF:</p>
                      </div>
                      <div className="col-10">
                        <p className="mb-0 x1103">44515629</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-4 borderClass d-flex">
                    <div className="row">
                      <div className="col-2 d-flex justify-content-center ">
                        <p className="x1102">Ã:</p>
                      </div>
                      <div className="col-10">
                        <textarea
                          typeof="text"
                          className="x1102Textarea"
                          value={data.factureTo}
                          onChange={onChangeFormFill}
                          name="factureTo"
                        />
                      </div>

                      <div className="col-2 d-flex justify-content-end ">
                        <p className="mb-0 x1103">VAT:</p>
                      </div>
                      <div className="col-10">
                        <input
                          className="x1102input"
                          type={"text"}
                          value={data.factureVAT}
                          name="factureVAT"
                          onChange={onChangeFormFill}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-3 borderClass text-center "
                    style={{ borderRight: "none" }}
                  >
                    <p className="x1103 fw-bolder">Total Ã payer</p>
                    <div className="d-flex">
                      <input
                        readOnly={true}
                        className="x1103Totalpayer"
                        type={"number"}
                        value={
                          toTalamount === 0 ? "0.00" : toTalamount.toFixed(1)
                        }
                      />
                      <span className="totalSign">
                        {/* {CurrencyValue.label.includes("Lei")
                          ? "Lei"
                          : CurrencyValue.label.includes("$")
                          ? "$"
                          : CurrencyValue.label.includes("€")
                          ? "€"
                          : ""} */}
                          {
                            data.factureCurrency == "Euro" ?  "€" :  data.factureCurrency == "USD" ?  "$"  : "Lei"
                          }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <p className="DECEMBRE">FACTURE DECEMBRE</p>
            </div>
            <table className="table table-borderedX12S">
              <thead style={{ background: "transparent" }}>
                <tr className="">
                  <th className="text-center" scope="col">
                    DESCRIPTION / DESCRIERE
                  </th>
                  <th className="text-center" scope="col">
                    quantity / CANTITATE
                  </th>
                  <th className="text-center" scope="col">
                    price / PREȚ (
                    {/* {CurrencyValue.label.includes("Lei")
                      ? "Lei"
                      : CurrencyValue.label.includes("$")
                      ? "$"
                      : CurrencyValue.label.includes("€")
                      ? "€"
                      : ""} */}
                       {
                            data.factureCurrency == "Euro" ?  "€" :  data.factureCurrency == "USD" ?  "$"  : "Lei"
                          }
                    )
                  </th>
                  <th className="text-center" scope="col">
                    MONTANT (
                    {/* {CurrencyValue.label.includes("Lei")
                      ? "Lei"
                      : CurrencyValue.label.includes("$")
                      ? "$"
                      : CurrencyValue.label.includes("€")
                      ? "€"
                      : ""} */}
                     {
                            data.factureCurrency == "Euro" ?  "€" :  data.factureCurrency == "USD" ?  "$"  : "Lei"
                          }
                    )
                  </th>
                  {totalA.length > 0 ? (
                    <th className="text-center" scope="col">
                      Delete
                    </th>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {totalA.length > 0 ? (
                  totalA.map((el, i) => (
                    <>
                      <motion.tr
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        variants={{
                          visible: { opacity: 1, y: 0 },
                          hidden: { opacity: 0, y: -20 },
                        }}
                        key={i}
                      >
                        <td scope="row" style={{ padding: "0px" }}>
                          <div className="px-1 d-flex align-items-center justify-content-center">
                            <input
                              className="InputInvoice"
                              value={el.description}
                              onChange={onChangeDetailsFill}
                              style={{
                                background: "#d8d8d8",
                              }}
                              disabled={true}
                              name="description"
                            />
                          </div>
                        </td>
                        <td className="" style={{ padding: "0px" }}>
                          <div className="px-1 d-flex align-items-center justify-content-center">
                            <input
                              className="InputInvoice "
                              value={el.quantity}
                              onChange={onChangeDetailsFill}
                              style={{
                                background: "#d8d8d8",
                              }}
                              disabled={true}
                              name="quantity"
                            />
                          </div>
                        </td>
                        <td className="" style={{ padding: "0px" }}>
                          <div className="px-1 d-flex align-items-center justify-content-center">
                            <input
                              className="InputInvoice"
                              type={"number"}
                              value={el.price}
                              onChange={onChangeDetailsFill}
                              style={{
                                background: "#d8d8d8",
                              }}
                              disabled={true}
                              name="price"
                            />
                          </div>
                        </td>
                        <td className="" style={{ padding: "0px" }}>
                          <div className="px-1 d-flex align-items-center justify-content-center">
                            <input
                              className="InputInvoice"
                              value={el.montant.toFixed(2)}
                              onChange={onChangeDetailsFill}
                              style={{
                                background: "#d8d8d8",
                              }}
                              disabled={true}
                              name="price"
                            />
                          </div>
                        </td>
                        {totalA.length > 0 ? (
                          <td
                            className="d-flex justify-content-center p-0 cursor-pointer"
                            style={{ height: "55px" }}
                            scope="col"
                          >
                            <div
                              className="RoundDiv"
                              style={{
                                background: "transparent",
                                height: "100%",
                                width: "100%",
                              }}
                              onClick={() => {
                                deleteItem("map", i);
                              }}
                            >
                              <img
                                alt="..."
                                src={
                                  require("../../images/Deletebucket.svg")
                                    .default
                                }
                              />
                            </div>
                          </td>
                        ) : null}
                      </motion.tr>
                    </>
                  ))
                ) : (
                  <tr>
                    <td scope="row" style={{ padding: "0px" }}>
                      <div className="px-1 d-flex align-items-center justify-content-center">
                        <input
                          className="InputInvoice"
                          onChange={onChangeDetailsFill}
                          placeholder="Prestation Macon A conforme contrat
Antonica Ionut"
                          name="description"
                        />
                      </div>
                    </td>
                    <td className="" style={{ padding: "0px" }}>
                      <div className="px-1 d-flex align-items-center justify-content-center">
                        <input
                          className="InputInvoice"
                          placeholder="98"
                          onChange={onChangeDetailsFill}
                          name="quantity"
                        />
                      </div>
                    </td>
                    <td className="" style={{ padding: "0px" }}>
                      <div className="px-1 d-flex align-items-center justify-content-center">
                        <input
                          className="InputInvoice"
                          type={"number"}
                          onChange={onChangeDetailsFill}
                          placeholder="23,70"
                          name="price"
                        />
                      </div>
                    </td>
                    <td className="" style={{ padding: "0px" }}>
                      <div className="px-1 d-flex align-items-center justify-content-center">
                        <input
                          ref={ref}
                          className="InputInvoice"
                          onChange={onChangeDetailsFill}
                          placeholder="2.322,60"
                          value={(Row.quantity * Row.price).toFixed(2)}
                          name="montant"
                        />
                      </div>
                    </td>
                  </tr>
                )}
                {displayRow ? (
                  <>
                    <motion.tr
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.3 }}
                      variants={{
                        visible: { opacity: 1, x: 0 },
                        hidden: { opacity: 0, x: -20 },
                      }}
                    >
                      <td scope="row" style={{ padding: "0px" }}>
                        <div className="px-1 d-flex align-items-center justify-content-center">
                          <input
                            className="InputInvoice"
                            onChange={onChangeDetailsFill}
                            placeholder="Prestation Macon A conforme contrat
Antonica Ionut"
                            value={Row.description}
                            name="description"
                          />
                        </div>
                      </td>
                      <td className="" style={{ padding: "0px" }}>
                        <div className="px-1 d-flex align-items-center justify-content-center">
                          <input
                            className="InputInvoice"
                            onChange={onChangeDetailsFill}
                            placeholder="98"
                            value={Row.quantity}
                            name="quantity"
                          />
                        </div>
                      </td>
                      <td className="" style={{ padding: "0px" }}>
                        <div className="px-1 d-flex align-items-center justify-content-center">
                          <input
                            className="InputInvoice"
                            type={"number"}
                            onChange={onChangeDetailsFill}
                            placeholder="23,70"
                            value={Row.price}
                            name="price"
                          />
                        </div>
                      </td>
                      <td className="" style={{ padding: "0px" }}>
                        <div className="px-1 d-flex align-items-center justify-content-center">
                          <input
                            className="InputInvoice"
                            ref={ref}
                            type={"number"}
                            onChange={onChangeDetailsFill}
                            placeholder="2.322,60"
                            value={(Row.quantity * Row.price).toFixed(2)}
                            name="montant"
                          />
                        </div>
                      </td>
                      {totalA.length > 0 ? (
                        <td
                          className="d-flex justify-content-center p-0 cursor-pointer"
                          scope="col"
                          style={{ height: "55px" }}
                        >
                          <div
                            className="RoundDiv"
                            style={{
                              background: "transparent",
                              height: "53px",
                              width: "100%",
                            }}
                            onClick={() => {
                              deleteItem("withoutMap", null);
                            }}
                          >
                            <img
                              alt="..."
                              src={
                                require("../../images/Deletebucket.svg").default
                              }
                            />
                          </div>
                        </td>
                      ) : null}
                    </motion.tr>
                  </>
                ) : null}

                <tr>
                  <td scope="row " style={{ padding: "0px" }}>
                    <div className="px-1 d-flex align-items-center justify-content-start">
                      <p className="mb-0 ">Total H. T. TVA:</p>
                    </div>
                  </td>
                  <td className="" style={{ padding: "0px" }}>
                    <div className="px-1 d-flex align-items-center justify-content-center"></div>
                  </td>
                  <td className="" style={{ padding: "0px" }}>
                    <div className="px-1 d-flex align-items-center justify-content-center"></div>
                  </td>
                  <td style={{ padding: "0px" }}>
                    <div className="px-1 d-flex align-items-center justify-content-center">
                      <p className="mb-0">
                        {toTalamount === 0 ? "0.00" : toTalamount.toFixed(2)}{" "}
                        {/* {CurrencyValue.label.includes("Lei")
                          ? "Lei"
                          : CurrencyValue.label.includes("$")
                          ? "$"
                          : CurrencyValue.label.includes("€")
                          ? "€"
                          : ""} */}
                         {
                            data.factureCurrency == "Euro" ?  "€" :  data.factureCurrency == "USD" ?  "$"  : "Lei"
                          }
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="col-12 d-grid justify-content-center mt-5">
              <button
                disabled={DS}
                onClick={(e) => onClickLineAdd()}
                className="AddLine"
              >
                ADD A LINE
              </button>
              <p className="text-center my-2 oR">OR</p>
              <button
                className="AddLine"
                disabled={DS}
                name="Submit"
                onClick={onChangeFormFill}
                style={{ background: "#2468e4" }}
              >
                Save
              </button>
            </div>
          </div>
          <div
            className="col-12 mt-4 p-1  bg-white"
            style={{ position: "fixed", bottom: "0px", height: "12vh" }}
          >
            <div className="row  align-items-center">
              <div className="col-8 d-flex ">
                <Select
                  name="market"
                  closeMenuOnSelect={true}
                  placeholder="‎  ‎ ‎  ‎ Change Currency"
                  className="basic-multi-select placeHolderLead billingCenter"
                  classNamePrefix="select"
                  // menuIsOpen={true}
                  defaultValue={{
                    value: data.factureCurrency,
                    label: data.factureCurrency,
                    color: "#1372b5",
                  }}
                  onChange={OnReactSelect}
                  options={currency}
                  styles={colourStyles}
                />
              </div>
              <div className="col-4 d-flex justify-content-end">
                <img
                  alt="..."
                  src={require("../../images/Editpen2.svg").default}
                />

                <img
                  alt="..."
                  src={require("../../images/downloadBtn.svg").default}
                  className="mx-1"
                />
                <div
                  className="RoundDiv"
                  style={{ background: "#F3F4F6", width: "37px" }}
                >
                  <img
                    alt="..."
                    src={require("../../images/Deletebucket.svg").default}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default EditBillingCenter;
