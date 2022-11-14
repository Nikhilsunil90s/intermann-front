import React,{useState,useEffect,useRef} from "react";
import Select, { StylesConfig } from "react-select";
import { ColourOption } from "../../Selecteddata/data";
import chroma from "chroma-js";
// import { DateRangePicker } from 'react-date-range';
// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css'
// import DateRangePicker from 'react-daterange-picker'
import { DateRange } from 'react-date-range'

import format from 'date-fns/format'
import { addDays } from 'date-fns'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

function Filters (){
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ])
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

  const [fromPerson]=useState ([ {value: 'TikTok', label: 'TikTok',name:"leadSource", color:  '#FF8B00' },
{  value: 'Facebook', label: 'Facebook', name:"leadSource", color:  '#FF8B00', },
{value: 'Google Ads', label: 'Google Ads',name:"leadSource", color: '#FF8B00' },
{value: 'Bing Ads', label: 'Bing Ads',name:"leadSource", color: '#FF8B00'  },
{  value: 'Linkedin', label: 'Linkedin', name:"leadSource", color:  '#FF8B00', },
{value: 'Snapchat', label: 'Snapchat',name:"leadSource", color: '#FF8B00' },
])

  // open close
  const [open, setOpen] = useState(false)

  // get the target element to toggle 
  const refOne = useRef(null)

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true)
    document.addEventListener("click", hideOnClickOutside, true)
  }, [])

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if( e.key === "Escape" ) {
      setOpen(false)
    }
  }

  // Hide on outside click
  const hideOnClickOutside = (e) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if( refOne.current && !refOne.current.contains(e.target) ) {
      setOpen(false)
    }
  }

    return(<>
    <div className="row">
              <div className="col-4">
                <label style={{ fontSize: "14px" }} className="Form-styling">
                  FILTER BY QUALIFIED
                </label>
                <Select
                  name="market"
                  closeMenuOnSelect={true}
                  placeholder="‎  ‎ ‎  ‎ FILTER BY QUALIFIED"
                  className="basic-multi-select placeHolderLead"
                  classNamePrefix="select"
                  // onChange={handleEmailChange}
                  // options={email}
                  styles={colourStyles}
                />
              </div>
              <div className="col-4">
                <label style={{ fontSize: "14px" }} className="Form-styling">
                  FILTER BY SOURCE
                </label>
                <Select
                  name="market"
                  closeMenuOnSelect={true}
                  placeholder="‎  ‎ ‎  ‎ FILTER BY SOURCE"
                  className="basic-multi-select placeHolderLead"
                  classNamePrefix="select"
                  // onChange={handleEmailChange}
                  options={fromPerson}
                  styles={colourStyles}
                />
              </div>
              <div className="col-4">
                <label style={{ fontSize: "14px" }} className="Form-styling">
                  Filter CONTACTED BY AGENCY ONLY
                </label>
                <Select
                  name="market"
                  closeMenuOnSelect={true}
                  placeholder="‎  ‎ ‎  ‎ FILTER CONTACTED BY AGENCY ONLY"
                  className="basic-multi-select placeHolderLead"
                  classNamePrefix="select"
                  // onChange={handleEmailChange}
                  // options={email}
                  styles={colourStyles}
                />
              </div>
              <div className="col-4 mt-1">
                <label style={{ fontSize: "14px" }} className="Form-styling">
                  FILTER PRECONTACTED ONLY
                </label>
                <Select
                  name="market"
                  closeMenuOnSelect={true}
                  placeholder="‎  ‎ ‎  ‎ FILTER PRECONTACTED ONLY"
                  className="basic-multi-select placeHolderLead"
                  classNamePrefix="select"
                  // onChange={handleEmailChange}
                  // options={email}
                  styles={colourStyles}
                />
              </div>
              <div className="col-4 mt-1">
                <label style={{ fontSize: "14px" }} className="Form-styling">
                  FILTER BY JOB
                </label>
                <Select
                  name="market"
                  closeMenuOnSelect={true}
                  placeholder="‎  ‎ ‎  ‎ FILTER BY JOB"
                  className="basic-multi-select placeHolderLead"
                  classNamePrefix="select"

                  // onChange={handleEmailChange}
                  // options={email}
                  styles={colourStyles}
                />
              </div>
              <div className="col-4 mt-1">
                <label style={{ fontSize: "14px" }} className="Form-styling" >
                  Sort by Date
                </label>
                <div className=""  >



<input
  value={`${format(range[0].startDate, "MM/dd/yyyy")} to ${format(range[0].endDate, "MM/dd/yyyy")}`}
  readOnly
  className="dateSort"
  onClick={ () => setOpen(open => !open) }
/>

<div ref={refOne} className="rdrDateRangePickerWrapper">
  {open && 
    <DateRange
      onChange={item => setRange([item.selection])}
      editableDateInputs={true}
      moveRangeOnFirstSelection={false}
      ranges={range}
      months={1}
      direction="vertical"
      className="calendarElement"
    />
  }
  
</div>
<div  onClick={ () => setOpen(open => !open) } className="d-flex justify-content-end eventPos">
    <img src={require("../../images/event.svg").default}  />
  </div>
</div>
              </div>
              <div className="col-4">
                <label style={{ fontSize: "14px" }} className="Form-styling">
                  Filter by Name
                </label>
                <Select
                  name="market"
                  closeMenuOnSelect={true}
                  placeholder="‎  ‎ ‎  ‎ Filter by Name"
                  className="basic-multi-select placeHolderLead"
                  classNamePrefix="select"
                  // onChange={handleEmailChange}
                  // options={email}
                  styles={colourStyles}
                />
              </div>
              <div className="col-4">
                <label style={{ fontSize: "14px" }} className="Form-styling">
                FILTER BY Phone Number
                </label>
                <Select
                  name="market"
                  closeMenuOnSelect={true}
                  placeholder="‎  ‎ ‎  ‎ FILTER BY Phone Number"
                  className="basic-multi-select placeHolderLead"
                  classNamePrefix="select"
                  // onChange={handleEmailChange}
                  // options={email}
                  styles={colourStyles}
                />
              </div>
              <div className="col-4">
                <label style={{ fontSize: "14px" }} className="Form-styling">
                Filter by Email
                </label>
                <Select
                  name="market"
                  closeMenuOnSelect={true}
                  placeholder="‎  ‎ ‎  ‎ Filter by Email"
                  className="basic-multi-select placeHolderLead"
                  classNamePrefix="select"
                  // onChange={handleEmailChange}
                  // options={email}
                  styles={colourStyles}
                />
              </div>
             
            </div>
    </>)
}
export default Filters;