import React, { useEffect, useState } from "react";
import { ColourOption } from "../../Selecteddata/data";
import chroma from "chroma-js";
import Select, { StylesConfig } from "react-select";
import { API_BASE_URL } from "../../config/serverApiConfig";
import Cookies from "js-cookie";
function Filter(props) {
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
  const [phonefilter,setphonefilter]=useState([])
  const [companyName, setCompanyName] = useState() as any;
  useEffect(() => {
    if (responsable.length == 0) {
      setResponsable([
        {
          value: "BENJAMIN B",
          label: "BENJAMIN B",
          name: `companyResponsable`,
          color: "#FF8B00",
        },
        {
          value: "JEREMY R",
          label: "JEREMY R",
          name: `companyResponsable`,
          color: "#FF8B00",
        },
        {
          value: "PATRICK R",
          label: "PATRICK R",
          name: `companyResponsable`,
          color: "#FF8B00",
        },
        {
          value: "ADRIAN T",
          label: "ADRIAN T",
          name: `companyResponsable`,
          color: "#FF8B00",
        },
        {
          value: "MORGAN R",
          label: "MORGAN R",
          name: `companyResponsable`,
          color: "#FF8B00",
        },
        {
          value: "PATRICK B",
          label: "PATRICK B",
          name: `companyResponsable`,
          color: "#FF8B00",
        },
        {
          value: "PERSONNE",
          label: "PERSONNE",
          name: `companyResponsable`,
          color: "#FF8B00",
        },
      ]);
    }
    setStatus([
      {
        value: "Non determine",
        label: "Non déterminé",
        name: "clientStatus",
        color: "#FF8B00",
      },
      {
        value: "Le client negocie",
        label: "Le client négocie",

        name: "clientStatus",
        color: "#FF8B00",
      },
      {
        value: "Offre Accepte",
        label: "Offre Accepté",
        name: "clientStatus",
        color: "#FF8B00",
      },
      {
        value: "Le client reflechit",
        label: "Le client réfléchit",
        name: "clientStatus",
        color: "#FF8B00",
      },
      {
        value: "Le client ne reponds pas",
        label: "Le client ne réponds pas",
        name: "clientStatus",
        color: "#FF8B00",
      },
      {
        value: "Pas interese",
        label: "Pas intéréssé",
        name: "clientStatus",
        color: "#FF8B00",
      },
    ]);
    setbool({
      rappeler: [
        {
          value: true,
          label: "Oui",
          color: "#FF8B00",
          name: "rappeler",
        },
        {
          value: false,
          label: "Non",
          color: "#FF8B00",
          name: "rappeler",
        },
      ],
      Offre: [
        {
          value: true,
          label: "Oui",
          color: "#FF8B00",
          name: "offerSent",
        },
        {
          value: false,
          label: "Non",
          color: "#FF8B00",
          name: "offerSent",
        },
      ],
      Client: [
        {
          value: true,
          label: "Oui",
          color: "#FF8B00",
          name: "companyInterested",
        },
        {
          value: false,
          label: "Pas déterminé",
          color: "#FF8B00",
          name: "companyInterested",
        },
      ],
    });
  }, [props.leads]);
  useEffect(() => {
    let Name = [];
    let phone=[];
    if (props.leads.length > 0) {
      props.leads.map((el) => {
        if(el.phoneNumber1){
             phone.push({
              value:el.phoneNumber1,
              label:el.phoneNumber1,
              name:"phone",
              color: "#FF8B00",
             })
        }
        Name.push({
          value: el.companyName,
          label: el.companyName,
          name: `companyName`,
          color: "#FF8B00",
        });
      });
      setCompanyName([...Name]);
      setphonefilter([...phone])
    }
  }, [props.leads]);

  useEffect(() => {
    if (props.CurrentFilter.filterApplied === true && data !== undefined) {
      FilterData()
        .then((res) => {
          if (res.status) {
            setBTNds(false);
            props.leadsSet([...res.data]);
            props.setCurrentLeads(res.notContactedCount);
            props.setCurrentFilter({
              ...props.CurrentFilter,
              filterApplied: false,
              FilterData: data,
            });
            //  toast.success(`${res.data.length} Results Found!`)
          } else if (res.status === false) {
            setBTNds(false);
            props.leadsSet([]);
            props.setCurrentLeads(res.notContactedCount);
            props.setCurrentFilter({
              ...props.CurrentFilter,
              filterApplied: false,
              FilterData: data,
            });
          }
        })
        .catch((err) => err);
    }
  }, [props.CurrentFilter]);
  const [responsable, setResponsable] = useState([]) as any;

  const [status, setStatus] = useState([]);
  const [bool, setbool] = useState() as any;

  const [data, setData] = useState() as any;
  const [btnDS, setBTNds] = useState(false);
  const FilterData = async () => {
    return await fetch(API_BASE_URL + `filterCommercialLeads`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
      body: JSON.stringify(data),
    })
      .then((red) => red.json())
      .then((resData) => resData)
      .catch((err) => err);
  };

  const ApplyFilter = (e) => {
    setBTNds(true);
    if (e.target.name === "apply") {
      FilterData()
        .then((res) => {
          if (res.status) {
            setBTNds(false);
            props.leadsSet([...res.data]);
            props.setCurrentLeads(res.notContactedCount);
            props.setCurrentFilter({
              ...props.CurrentFilter,
              filterApplied: false,
              FilterData: data,
            });

            //  toast.success(`${res.data.length} Results Found!`)
          } else if (res.status === false) {
            setBTNds(false);
            props.leadsSet([]);
            props.setCurrentLeads(res.notContactedCount);
            props.setCurrentFilter({
              ...props.CurrentFilter,
              filterApplied: false,
              FilterData: data,
            });
          }
        })
        .catch((err) => err);
    } else {
      props.setCurrentFilter({
        filterApplied: false,
        FilterData: [],
      });
      setData();
      setphonefilter([])
      setBTNds(false);
      setStatus([]);
      setResponsable([]);
      setCompanyName();
      setbool();
      // toast.success(`Filter Reset Successfully !`)
      props.setUpdate(true);
    }
  };

  const OnReactSelect = (e) => {
    setData({ ...data, [e.name]: e.value });
  };

  return (
    <>
      <div className="row">
        <div className="col-4">
          <label style={{ fontSize: "14px" }} className="Form-styling">
            Offre envoyé ?
          </label>
          {bool ? (
            <Select
              name="market"
              closeMenuOnSelect={true}
              placeholder="‎  ‎ ‎  ‎ Offre envoyé ?"
              className="basic-multi-select placeHolderLead"
              classNamePrefix="select"
              onChange={OnReactSelect}
              options={bool?.Offre}
              styles={colourStyles}
            />
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <span className="filterLeadsLoader" />
            </div>
          )}
        </div>
        <div className="col-4">
          <label style={{ fontSize: "14px" }} className="Form-styling">
            A rappeler ?
          </label>
          {bool ? (
            <Select
              name="market"
              closeMenuOnSelect={true}
              placeholder="‎  ‎ ‎  ‎ A rappeler ?"
              className="basic-multi-select placeHolderLead"
              classNamePrefix="select"
              onChange={OnReactSelect}
              options={bool?.rappeler}
              styles={colourStyles}
            />
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <span className="filterLeadsLoader" />
            </div>
          )}
        </div>
        <div className="col-4">
          <label style={{ fontSize: "14px" }} className="Form-styling">
            Client interéssé ?
          </label>
          {bool ? (
            <Select
              name="market"
              closeMenuOnSelect={true}
              placeholder="‎  ‎ ‎  ‎ Client interéssé ?"
              className="basic-multi-select placeHolderLead"
              classNamePrefix="select"
              onChange={OnReactSelect}
              options={bool?.Client}
              styles={colourStyles}
            />
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <span className="filterLeadsLoader" />
            </div>
          )}
        </div>
        <div className="col-4 mt-1">
          <label style={{ fontSize: "14px" }} className="Form-styling">
            Assigner a quel responsable ?
          </label>
          {responsable.length > 0 ? (
            <Select
              name="market"
              closeMenuOnSelect={true}
              placeholder="‎  ‎ ‎  ‎ Assigner a quel resposable ?"
              className="basic-multi-select placeHolderLead"
              classNamePrefix="select"
              onChange={OnReactSelect}
              options={responsable}
              styles={colourStyles}
            />
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <span className="filterLeadsLoader" />
            </div>
          )}
        </div>
        <div className="col-4 mt-1">
          <label style={{ fontSize: "14px" }} className="Form-styling">
            Nom de la société ?
          </label>
          {companyName ? (
            <Select
              name="market"
              closeMenuOnSelect={true}
              placeholder="‎  ‎ ‎  ‎ Assigner a quel resposable ?"
              className="basic-multi-select placeHolderLead"
              classNamePrefix="select"
              onChange={OnReactSelect}
              options={companyName}
              styles={colourStyles}
            />
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <span className="filterLeadsLoader" />
            </div>
          )}
        </div>
               <div className="col-4 mt-1">
          <label style={{ fontSize: "14px" }} className="Form-styling">
            Search by Status
          </label>
          {status.length > 0 ? (
            <Select
              name="market"
              closeMenuOnSelect={true}
              placeholder="‎  ‎ ‎  ‎ Assigner a quel resposable ?"
              className="basic-multi-select placeHolderLead"
              classNamePrefix="select"
              onChange={OnReactSelect}
              options={status}
              styles={colourStyles}
            />
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <span className="filterLeadsLoader" />
            </div>
          )}
        </div>
        <div className="col-4 mt-1">
          <label style={{ fontSize: "14px" }} className="Form-styling">
            Search by Phone
          </label>
          {phonefilter?.length > 0 ? (
            <Select
              name="market"
              closeMenuOnSelect={true}
              placeholder="‎  ‎ ‎  ‎ Assigner a quel resposable ?"
              className="basic-multi-select placeHolderLead"
              classNamePrefix="select"
              onChange={OnReactSelect}
              options={phonefilter}
              styles={colourStyles}
            />
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <span className="filterLeadsLoader" />
            </div>
          )}
        </div>
 
        <div className="col-12 mt-2">
          <div className="row justify-content-end">
            <div className="col-2">
              {" "}
              <button
                className="glow-on-hover mr-2"
                style={{ width: "100%", height: "40px" }}
                name="apply"
                onClick={(e) => ApplyFilter(e)}
                disabled={btnDS}
              >
                Appliquer filtre
              </button>
            </div>
            {data !== undefined ? (
              <div className="col-2">
                {" "}
                <button
                  className="RESETfilters"
                  onClick={(e) => ApplyFilter(e)}
                >
                  Reset
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
export default Filter;
