import React,{useState} from "react";
import {Link} from "react-router-dom"
import { Tabs, Tab } from "react-tabs-scrollable";
import "../CSS/JobsAdsCss/JobAdsList.css"
import JobsCard from "./Components/JobsCard";

function JobAdsList (){
    const [activeTab, setActiveTab] = React.useState(0) as any;
    const [tabItems] = useState([
        {
          text: "FRANCE",
          value: "CONTRACT",
        },
        {
          text: "SUISSE",
          value: "BULETIN_/_ID_CARD",
        },
        {
          text: "ROMANIA",
          value: "BULETIN_/_ID_CARD",
        },
      ]) as any;
    
      const onTabClick = (e, index: any) => {
        setActiveTab(index);
        const FolderName = tabItems.filter((el, i) => i == index);
      };
    
    return(
        <>
          <div className="container-fluid" >
        <div className="row">
          <div
            className="col-12 mt-2"
            style={{ background: "#ffff", borderRadius: "10px" }}
          >
            <div className="row">
              <div className="col-8">
                <div className="downLoadCenter p-1 ">
                  <h3 className="mb-0">JOB ADS CENTER</h3>
                </div>
              </div>
              <div className="col-4 d-flex justify-content-end align-items-center">
                <Link to="/JobAdsCenter/AddReaserch" className="BtnLeads">
                  + ADD AD REASERCH
                </Link>
              </div>
            </div>
          </div>
          <div
            className="col-12 mt-2 leadsTab"
            style={{ background: "#ffff", borderRadius: "10px" }}
          >
            <Tabs
              activeTab={activeTab}
              onTabClick={onTabClick}
              rightBtnIcon={">"}
              hideNavBtns={false}
              leftBtnIcon={"<"}
              showTabsScroll={false}
              tabsScrollAmount={2}
            >
              {/* generating an array to loop through it  */}
              {tabItems.map((el, i) => (
                <Tab key={i}>
                  <img
                    style={{ paddingRight: "5px" }}
                    src={
                      require(i === 0
                        ? "../images/france.svg"
                        : i == 1
                        ? "../images/switzerland.svg"
                        : "../images/romania.svg").default
                    }
                  />
                  {el.text}
                </Tab>
              ))}
            </Tabs>
          </div>
          <div
            className="col-12 mt-2"
            style={{ background: "#ffff", borderRadius: "10px" }}
          >
            <div className="row">
              <div className="col-8">
                <div className="downLoadCenter p-1 ">
                  <h3 className="mb-0">✔️ Active reaserch <span className="pub-Actives">(pub actives)</span></h3>
                </div>
              </div>
              <div className="col-4 d-flex justify-content-end align-items-center">
               <p className="mb-0 activeJobs">6 active job ads  Results found</p>
              </div>
            </div>
          </div>
          <div className="col-4 my-1">
            <JobsCard   bg="active"        />
          </div>
          <div
            className="col-12 mt-2"
            style={{ background: "#ffff", borderRadius: "10px" }}
          >
            <div className="row">
              <div className="col-8">
                <div className="downLoadCenter p-1 ">
                  <h3 className="mb-0" style={{color:"#f00"}}>✔️ INActive reaserch <span className="pub-Actives" style={{color:"#f00"}}>(pub non actives)</span></h3>
                </div>
              </div>
              <div className="col-4 d-flex justify-content-end align-items-center">
               <p className="mb-0 activeJobs">6 inactive job ads  Results found</p>
              </div>
            </div>
          </div>
          <div className="col-4 my-1">
            <JobsCard  bg={"inactive"}    />
          </div>

</div>
</div>
        </>
    )
}
export default JobAdsList;