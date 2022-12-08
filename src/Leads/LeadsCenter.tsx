import React, { useState,useEffect } from "react";
import "../CSS/Leads/Lead.css";
import { Link } from "react-router-dom";
import { Tabs, Tab } from "react-tabs-scrollable";
import LeadCenterMiniCard from "./LeadComponents/LeadCenterMiniCard";
import Filters from "./LeadComponents/Filters";
import LeadList from "./LeadComponents/LeadList";
import Loader from "../components/Loader/loader"
import Error from "../components/Loader/SearchBarError"
import { API_BASE_URL } from "../config/serverApiConfig";
import {toast,Toaster} from "react-hot-toast";
import Carousel from "react-multi-carousel";
import ProfilesLoader from "../../src/components/Loader/ProfilesLoader"
import LazyLoad from 'react-lazy-load';
import { motion } from "framer-motion";

let TabName=""
function LeadsCenter() {

  const LoginUser=JSON.parse(localStorage.getItem("LoginUser"))
  const [LoginUserS,setLoginUser]=useState(LoginUser)
  const [activeTab, setActiveTab] = React.useState(0) as any;
  const [LeadsCheck,setLeadScHeck] =useState(false)
  const [Leads,setLeads]=useState([])
  const [userCardList,setUserCardList]=useState([])
  const [UpdateFiled,setUpdateField]=useState(false)
  const [currentUser,setCurrentUser]=useState()as any
  const [preContected,setpreContected]=useState(0)as any
  const [contected,setcontected]=useState(0)as any
  const [ch,setch]=useState(false)
  let [page, setPage] = useState(0);
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



  const  fetchLeads=async(market:any,page:any)=>{
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
              setpreContected(resData.notPreContactedCount)
              setcontected(resData.notContactedCount)
             }else{
              setLeads([])
              setLeadScHeck(true)
              setUpdateField(false)

             }
          })
          .catch(err => err)
        }

        console.log(preContected,contected)

        const  fetchUsers=async()=>{
          //  setLeadScHeck(false)
       
      return    await fetch(API_BASE_URL + `allusers`,{
            method: "GET",
            headers: {
              "Accept": 'application/json',
              'Content-Type': 'application/json',
              "Authorization": "Bearer " + localStorage.getItem('token')
            },
          })
            .then(red => red.json())
            .then(resData =>resData)
            .catch(err => err)
          }
  
          const responsive = {
            superLargeDesktop: {
              // the naming can be any, depends on you.
              breakpoint: { max: 4000, min: 3000 },
              items: 3,
            },
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 3,
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 2,
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 1,
            },
          };

useEffect(()=>{
 
  fetchUsers().then((resData)=>{
    {
      if(resData.status){
       setUpdateField(false)
       if(resData.data.length > 0){
         let Cuser=  resData.data.filter((el)=>el?.username === LoginUserS?.username)
          let users=  resData.data.filter((el)=>el?.username !== LoginUserS?.username)
          setUserCardList([...Cuser,...users])

       }
    
      }else{
       setUserCardList([])
       setUpdateField(false)

      }
   }
  })
// console.log(currentUser.emailAddress)
  const FolderName = tabItems.filter((el, i) => i == activeTab);
  TabName =FolderName.map((el)=>(el.value))
  
  fetchLeads(TabName,page)
},[UpdateFiled])

  const onTabClick = (e, index: any) => {
    setActiveTab(index);
    const FolderName = tabItems.filter((el, i) => i == index);
    TabName =FolderName.map((el)=>(el.value))
    fetchLeads(TabName,page)
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
          <div className="userLeads">
        {  userCardList.length > 0 ?
     <Carousel responsive={responsive}>

          {
           userCardList.map((el)=>(
    <>
    <LeadCenterMiniCard  props={el} key={el._id} activeUser={currentUser} setUserCardList={setUserCardList} allUsers={userCardList} />
  </>
          ))
          }
    </Carousel>
    :
    <div className="col-12 mt-2 d-flex justify-content-center" >    <ProfilesLoader  width ={250} height={200} fontSize={"26px"} fontWeight={"600"}  Title={"Please Wait!"}/> </div>

        }
    </div>
          {/* End Card */}
        

          <div
            className="col-12 mt-1 p-1"
            style={{ background: "#ffff", borderRadius: "10px" }}
          >
            {LeadList.length > 0 ?
            
            <Filters  LeadsCard={Leads} market={TabName} setLeads={setLeads} statusLeads={setLeadScHeck} update={setUpdateField} setprecontacted={setpreContected} setcontacted={setcontected} />
            :
            null 
}
          </div>

          <div
            className="col-12 mt-1 p-1"
            style={{ background: "#ffff", borderRadius: "10px" }}
          >
            <p className="mb-2 ApplyFilter">
            <b> ‎ ✔  ‎There is {Leads.length} ‎ ‎leads total</b>
            </p>
            <p className="mb-2 ApplyFilter">
            <b> ‎✔   ‎There is {contected} leads not yet contacted by Agency</b>
            </p>
            <p className="mb-0 ApplyFilter">
            <b> ‎ ✔  ‎There is {preContected} leads not yet precontacted by <span style={{color:"#f8ba00"}}>{LoginUserS?.username}</span></b>
            </p>
          </div>
          <div
            className="col-12 p-1 my-1 OverFlowLink"
            style={{ background: "#ffff", borderRadius: "10px"}}
      
        >
           {
            LeadsCheck ?
            Leads.length > 0 ?
          
                <>
               { Leads.map((el,i)=>(
                  <LazyLoad threshold={0.96}>
              
                  <LeadList  props={el} length={i} key={el._id} Update={setUpdateField} Load={setLeadScHeck} Lead={setLeads} activeUser={setCurrentUser}  TabName={TabName}  />
                 
              </LazyLoad>
            ))
               }
            </>
          
              
          
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
