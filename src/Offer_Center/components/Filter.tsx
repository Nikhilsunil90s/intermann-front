import React, { useState, useRef, useEffect } from "react";
import format from "date-fns/format";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Select, { StylesConfig } from "react-select";
import { ColourOption } from "../../Selecteddata/data";
import { PostRoute } from "../../components/ApisFunction/FunctionsApi";
import chroma from "chroma-js";
import toast from "react-hot-toast";

function Filter(props: any) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState() as any;
  const [data, setData] = useState() as any;
  const SelectRef = useRef(null) as any;
  const JobRef = useRef(null) as any;
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ])as any;
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpen(false);
    }
  };
  console.log(range, "date");
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

  useEffect(() => {
    // event listeners

    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);


  const refOne = useRef(null);

  // Hide on outside click
  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const ReactSelectDataSet = (e) => {
    setData({
      ...data,
      [e.name]: e.value,
      offer_signed: props.currentTab === "unsigned" ? false : true,
    });
  };
  const dateChange = (date) => {
    setRange([date.selection]);
    console.log([date.selection])
    setData({
      ...data,
      ["start_date"]: format(date.selection.startDate, "dd-MM-yyyy"),
      ["end_date"]: format(date.selection.endDate, "dd-MM-yyyy"),
      offer_signed: props.currentTab === "unsigned" ? false : true,
    });
  };

  const ApplyAnResetFilter = (e) => {
    if (e.target.name === "ApplyFil") {
      PostRoute(data, "filter-offers")
        .then((res) => {
          if (res.status) {
            props.setCards([...res.data]);
            toast.success(
              `total ${res.data.length} Offers Found with these Filters!`
            );
          } else {
            props.setCards([]);
            toast.error(res.message);
          }
        })
        .catch((err) => err);
    } else {
      setData();
      setRange([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
          key: "selection",
        },
      ])
      props.setStatus({ ...props.Status, status: false });
      props.setDataUpdate(true);
    }
  };
  return (
    <>
      <div className="col-12 my-2">
        <div className="row mainOfferFilter p-1 bg-white">
          <div className="col-4 ">
            <label>filtrer par nom société</label>
            {/* <input placeholder="filtrer par nom société" className="form-control" /> */}
            {props.filterOP?.name?.length > 0 ? (
              <Select
                name="market"
                closeMenuOnSelect={true}
                placeholder="‎  ‎ ‎  ‎ filtrer par nom société"
                className="basic-multi-select placeHolderLead"
                classNamePrefix="select"
                onChange={ReactSelectDataSet}
                options={props.filterOP.name}
                styles={colourStyles}
                value={
                  {
                    label: data
                      ? data?.company_name
                        ? data?.company_name
                        : "filtrer par nom société"
                      : "filtrer par nom société",
                  } as any
                }
              />
            ) : (
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
            )}
          </div>
          <div className="col-4">
            {" "}
            <label style={{ fontSize: "14px" }} className="Form-styling">
              Sort by Date
            </label>
            <div className="cursor-pointer">
              {
                data?.start_date ?
                <input
                value={`${data.start_date
                 } to ${data.end_date}`}
                readOnly
                className="dateSort cursor-pointer"
                onClick={() => setOpen((open) => !open)}
              />

                :
                <input
                value={`${format(
                  range[0].startDate,
                  "dd/MM/yyyy"
                )} to ${format(range[0].endDate, "dd/MM/yyyy")}`}
                readOnly
                className="dateSort cursor-pointer"
                onClick={() => setOpen((open) => !open)}
              />
              }
              

              <div ref={refOne} className="dateRangePick">
                {open && (
                  <DateRange
                    onChange={(item) => dateChange(item)}
                    editableDateInputs={true}
                    moveRangeOnFirstSelection={false}
                    ranges={range}
                    months={1}
                    direction="vertical"
                    className="calendarElement "
                  />
                )}
              </div>
              <div
                onClick={() => setOpen((open) => !open)}
                className="d-flex justify-content-end eventPos"
              >
                <img src={require("../../images/event.svg").default} />
              </div>
            </div>
          </div>
          <div className="col-4">
            {" "}
            <label>filtrer par Métier/job name</label>
            {props.filterOP?.job?.length > 0 ? (
              <Select
                name="market"
                closeMenuOnSelect={true}
                placeholder="‎  ‎ ‎  ‎ filtrer par Métier/job name"
                className="basic-multi-select placeHolderLead"
                classNamePrefix="select"
                onChange={ReactSelectDataSet}
                options={props.filterOP.job}
                styles={colourStyles}
                value={
                  {
                    label: data
                      ? data?.metier
                        ? data?.metier
                        : "filtrer par Métier/job name"
                      : "filtrer par Métier/job name",
                  } as any
                }
              />
            ) : (
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
            )}
          </div>
        </div>
        <div className="row">
          {date || data ? (
            <div className="col-12 mt-2">
              <div className="row justify-content-end">
                <div className="col-2">
                  {" "}
                  <button
                    className="glow-on-hover mr-2"
                    style={{ width: "100%", height: "40px" }}
                    name="ApplyFil"
                    onClick={(e) => ApplyAnResetFilter(e)}
                    // disabled={applyBtn}
                  >
                    Apply
                  </button>
                </div>
                {data !== undefined ? (
                  <div className="col-2">
                    {" "}
                    <button
                      className="RESETfilters"
                      onClick={(e) => ApplyAnResetFilter(e)}
                    >
                      Reset
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
export default Filter;
