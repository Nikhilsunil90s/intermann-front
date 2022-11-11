import React, { useState,useEffect } from "react";
import "../CSS/Leads/Lead.css";
import { Link } from "react-router-dom";
import { Tabs, Tab } from "react-tabs-scrollable";
import LeadCenterMiniCard from "./LeadComponents/LeadCenterMiniCard";
import Filters from "./LeadComponents/Filters";
import LeadList from "./LeadComponents/LeadList";
import Loader from "../components/Loader/loader"
import Error from "../components/Loader/SearchBarError"
import {useSelector} from "react-redux";
import { API_BASE_URL } from "../config/serverApiConfig";
import {toast,Toaster} from "react-hot-toast";

let TabName=""
function LeadsCenter() {


  const [activeTab, setActiveTab] = React.useState(0) as any;
  const [monthModal,setMonthModal] =useState(false)
  const [LeadsCheck,setLeadScHeck] =useState(false)
  const [Leads,setLeads]=useState([])
  const [UpdateFiled,setUpdateField]=useState(false)
  const [tabItems] = useState([
    {
      text: "FRANCE",
      value: "France",
    },
    {
      text: "SUISSE",
      value: "Suisse",
    },
    {
      text: "ROMANIA",
      value: "Romania",
    },
  ]) as any;


  const  fetchLeads=async(market)=>{
        //  setLeadScHeck(false)
         
        await fetch(API_BASE_URL + `allLeads/?market=${market}`,{
          method: "GET",
          headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem('token')
          },
        })
          .then(red => red.json())
          .then(resData => {
             if(resData.status){
              setLeadScHeck(true)
              setUpdateField(false)
              setLeads([...resData.data])
             }else{
              setLeads([])
              setLeadScHeck(true)
              setUpdateField(false)

             }
          })
          .catch(err => err)
        }
   
  


useEffect(()=>{
  const FolderName = tabItems.filter((el, i) => i == activeTab);
  TabName =FolderName.map((el)=>(el.value))
  
  fetchLeads(TabName)

},[UpdateFiled])

  const onTabClick = (e, index: any) => {
    setActiveTab(index);
    const FolderName = tabItems.filter((el, i) => i == index);
    TabName =FolderName.map((el)=>(el.value))
    fetchLeads(TabName)
  };

  return (
    <>
    <Toaster     containerStyle={{zIndex:"999999999999999999"}}  position="top-right"/>
      <div className="container-fluid" >
        <div className="row">
          <div
            className="col-12 mt-2"
            style={{ background: "#ffff", borderRadius: "10px" }}
          >
            <div className="row">
              <div className="col-8">
                <div className="downLoadCenter p-1 ">
                  <h3 className="mb-0">Leads CENTER</h3>
                </div>
              </div>
              <div className="col-4 d-flex justify-content-end align-items-center">
                <Link to="/LeadsCenter/AddLeads" className="BtnLeads">
                  + ADD LEADS
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
          {/* Mini Card */}
          <>
            <LeadCenterMiniCard closeModal={setMonthModal}  modal={monthModal} />
          </>
          {/* End Card */}
        

          <div
            className="col-12 mt-1 p-1"
            style={{ background: "#ffff", borderRadius: "10px" }}
          >
            <Filters  />
          </div>

          <div
            className="col-12 mt-1 p-1"
            style={{ background: "#ffff", borderRadius: "10px" }}
          >
            <p className="mb-0 ApplyFilter">
              Applied filters showed <b> ‎ ‎“✘✘No Filters Applied!”</b>
            </p>
          </div>
          <div
            className="col-12 p-1 my-1 OverFlowLink"
            style={{ background: "#ffff", borderRadius: "10px" }}
        
        >
           {
            LeadsCheck ?
            Leads.length > 0 ?
            Leads.map((el,i)=>(

              <LeadList  props={el} length={i} key={i} Update={setUpdateField} Load={setLeadScHeck} Lead={setLeads} />

            ))
            :
            <div className="row ">
              <div className="col-12 d-flex justify-content-center">
            <p className="mb-0 d-flex align-items-center ErrorSearchBox"><Error    />✘✘ No Leads Available Yet! Please Add a New Lead!</p>
            </div>
            </div>
            :
            <div className="row ">
            <div className="col-12 d-flex justify-content-center">
            <Loader   />
            </div>
            </div>
           }
  
          </div>
         
        </div>
      </div>
    </>
  );
}
export default LeadsCenter;
