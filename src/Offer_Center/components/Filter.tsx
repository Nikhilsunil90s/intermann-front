import React,{useState,useRef,useEffect} from "react";
import format from "date-fns/format";
import { addDays } from "date-fns";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
import { DateRange } from "react-date-range";

function Filter() {
  const [open, setOpen] = useState(false);
  const [Data, setData] = useState() as any;
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpen(false);
    }
  };


  useEffect(() => {
    // event listeners

    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // hide dropdown on ESC press

  const refOne = useRef(null);

    // Hide on outside click
    const hideOnClickOutside = (e) => {
      // console.log(refOne.current)
      // console.log(e.target)
      if (refOne.current && !refOne.current.contains(e.target)) {
        setOpen(false);
      }
    };
      // hide dropdown on ESC press

      const dateChange = (date) => {
        setRange([date.selection]);
        console.log(date.selection);
        setData({
          ...Data,
          ["startDate"]: format(date.selection.startDate, "yyyy-MM-dd"),
          ["endDate"]: format(date.selection.endDate, "yyyy-MM-dd"),
        });
      };
  return (
    <>
      <div className="col-12 my-2">
        <div className="row mainOfferFilter p-1 bg-white">
          <div className="col-4 ">
            <label>filtrer par nom société</label>
            <input placeholder="filtrer par nom société" className="form-control" />
          </div>
          <div className="col-4">    <label style={{ fontSize: "14px" }} className="Form-styling">
            Sort by Date
          </label>
          <div className="cursor-pointer">
            <input
              value={`${format(range[0].startDate, "dd/MM/yyyy")} to ${format(
                range[0].endDate,
                "dd/MM/yyyy"
              )}`}
              readOnly
              className="dateSort cursor-pointer"
              onClick={() => setOpen((open) => !open)}
            />

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
          </div></div>
          <div className="col-4">   <label>filtrer par Métier/job name</label>
            <input placeholder="filtrer par Métier/job name" className="form-control" /></div>
        </div>
      </div>
    </>
  );
}
export default Filter;
