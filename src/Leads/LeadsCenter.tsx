// import React, { useState,useEffect } from "react";
// import "../CSS/Leads/Lead.css";
// import { Link } from "react-router-dom";
// import { Tabs, Tab } from "react-tabs-scrollable";
// import LeadCenterMiniCard from "./LeadComponents/LeadCenterMiniCard";
// import Filters from "./LeadComponents/Filters";
// import LeadList from "./LeadComponents/LeadList";
// import Loader from "../components/Loader/loader"
// import Error from "../components/Loader/SearchBarError"
// import { API_BASE_URL } from "../config/serverApiConfig";
// import {toast,Toaster} from "react-hot-toast";
// import Carousel from "react-multi-carousel";
// import ProfilesLoader from "../../src/components/Loader/ProfilesLoader"
// import { motion } from "framer-motion";
// import InfiniteScroll from 'react-infinite-scroll-component';

// let TabName=""
// function LeadsCenter() {

//   const LoginUser=JSON.parse(localStorage.getItem("LoginUser"))
//   const [LoginUserS,setLoginUser]=useState(LoginUser)
//   const [activeTab, setActiveTab] = React.useState(0) as any;
//   const [LeadsCheck,setLeadScHeck] =useState(false)
//   const [Leads,setLeads]=useState([])
//   const [userCardList,setUserCardList]=useState([])
//   const [UpdateFiled,setUpdateField]=useState(false)
//   const [currentUser,setCurrentUser]=useState()as any
//   const [preContected,setpreContected]=useState(0)as any
//   const [contected,setcontected]=useState(0)as any
//   const [skipLeads,setSkipLeads]=useState([])as any
//   const [length ,setLength]=useState([])
//   const [FilterState,setFilterState]=useState(true)
//   const [hash,setHash]=useState(true)
//   let [page, setPage] = useState(0);
//   const [tabItems] = useState([
//     {
//       text: "FRANCE",
//       value: "FRANCE",
//     },
//     {
//       text: "SUISSE",
//       value: "SUISSE",
//     },
//     {
//       text: "ROMANIA",
//       value: "ROMANIA",
//     },
//   ]) as any;

// // const handleScroll =()=>{
// //     if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight){
// //       setPage((prev)=>prev + 20)
// //       setLeadScHeck(false)
// //       fetchAllLeads(TabName,page).then((res
// //         )=>{
// //           if(res.status){
// //             setLeadScHeck(true)
// //             setUpdateField(false)
// //             setSkipLeads([...skipLeads,...res.data])
// //             setpreContected(res.notPreContactedCount)
// //             setcontected(res.notContactedCount)
// //            }else{
// //             setSkipLeads([])
// //             setLeadScHeck(true)
// //             setUpdateField(false)

// //            }

// //         })

// //   }

// // }
// useEffect(()=>{

//   if(page >= Leads.length){
//     setHash(false)
//   }
//   fetchData(TabName,page)

// },[page])

//   const  fetchData=async(market:any,page)=>{
//     //  setLeadScHeck(false)

//     await fetch(API_BASE_URL + `viewallleads/?market=${market}&skip=${page}`,{
//       method: "GET",
//       headers: {
//         "Accept": 'application/json',
//         'Content-Type': 'application/json',
//         "Authorization": "Bearer " + localStorage.getItem('token')
//       },
//     })
//       .then(red => red.json())
//       .then(resData => {
//         if(resData.status){
//           setLeadScHeck(true)
//           setUpdateField(false)
//           setSkipLeads([...skipLeads,...resData.data])
//           setHash(true)
//           setpreContected(resData.notPreContactedCount)
//           setcontected(resData.notContactedCount)
//          }else if(page >= Leads.length){
//            setSkipLeads([...skipLeads])
//          }
//          else{
//           setSkipLeads([])
//           setLeadScHeck(true)
//           setUpdateField(false)
//           setHash(false)
//          }

//       })
//       .catch(err => err)
//     }

//   const  fetchLeads=async(market:any,page:any)=>{
//         //  setLeadScHeck(false)

//         await fetch(API_BASE_URL + `allLeads/?market=${market}`,{
//           method: "GET",
//           headers: {
//             "Accept": 'application/json',
//             'Content-Type': 'application/json',
//             "Authorization": "Bearer " + localStorage.getItem('token')
//           },
//         })
//           .then(red => red.json())
//           .then(resData => {
//              if(resData.status){
//               setUpdateField(false)
//               setLeads([...resData.data])
//               setpreContected(resData.notPreContactedCount)
//               setcontected(resData.notContactedCount)
//              }else{
//               setLeads([])
//               setUpdateField(false)

//              }
//           })
//           .catch(err => err)
//         }

//         const  fetchUsers=async()=>{
//           //  setLeadScHeck(false)

//       return    await fetch(API_BASE_URL + `allusers`,{
//             method: "GET",
//             headers: {
//               "Accept": 'application/json',
//               'Content-Type': 'application/json',
//               "Authorization": "Bearer " + localStorage.getItem('token')
//             },
//           })
//             .then(red => red.json())
//             .then(resData =>resData)
//             .catch(err => err)
//           }

//           const responsive = {
//             superLargeDesktop: {
//               // the naming can be any, depends on you.
//               breakpoint: { max: 4000, min: 3000 },
//               items: 3,
//             },
//             desktop: {
//               breakpoint: { max: 3000, min: 1024 },
//               items: 3,
//             },
//             tablet: {
//               breakpoint: { max: 1024, min: 464 },
//               items: 2,
//             },
//             mobile: {
//               breakpoint: { max: 464, min: 0 },
//               items: 1,
//             },
//           };

// useEffect(()=>{

//   fetchUsers().then((resData)=>{
//     {
//       if(resData.status){
//        setUpdateField(false)
//        if(resData.data.length > 0){
//          let Cuser=  resData.data.filter((el)=>el?.username === LoginUserS?.username)
//           let users=  resData.data.filter((el)=>el?.username !== LoginUserS?.username)
//           setUserCardList([...Cuser,...users])

//        }

//       }else{
//        setUserCardList([])
//        setUpdateField(false)

//       }
//    }
//   })
// // console.log(currentUser.emailAddress)
//   const FolderName = tabItems.filter((el, i) => i == activeTab);
//   TabName =FolderName.map((el)=>(el.value))

//   fetchLeads(TabName,page)
// },[UpdateFiled])

// useEffect(()=>{
//   fetchUsers().then((resData)=>{
//     {
//       if(resData.status){
//        setUpdateField(false)
//        if(resData.data.length > 0){
//          let Cuser=  resData.data.filter((el)=>el?.username === LoginUserS?.username)
//           let users=  resData.data.filter((el)=>el?.username !== LoginUserS?.username)
//           setUserCardList([...Cuser,...users])

//        }

//       }else{
//        setUserCardList([])
//        setUpdateField(false)

//       }
//    }
//   })
// },[length])
//   const onTabClick = (e, index: any) => {
//     setActiveTab(index);
//     setPage(0)
//     const FolderName = tabItems.filter((el, i) => i == index);
//     TabName =FolderName.map((el)=>(el.value))
//     fetchData(TabName,page)
//     fetchLeads(TabName,page)
//   };
//   return (
//     <>
//     <Toaster     containerStyle={{zIndex:"999999999999999999"}}  position="top-right"/>
//       <div className="container-fluid" >
//         <div className="row">
//           <div
//             className="col-12 mt-2"
//             style={{ background: "#ffff", borderRadius: "10px" }}
//           >
//             <div className="row">
//               <div className="col-8">
//                 <div className="downLoadCenter p-1 ">
//                   <h3 className="mb-0">Leads CENTER</h3>
//                 </div>
//               </div>
//               <div className="col-4 d-flex justify-content-end align-items-center">
//                 <Link to="/LeadsCenter/AddLeads" className="BtnLeads">
//                   + ADD LEADS
//                 </Link>
//               </div>
//             </div>
//           </div>

//           <div
//             className="col-12 mt-2 leadsTab"
//             style={{ background: "#ffff", borderRadius: "10px" }}
//           >
//             <Tabs
//               activeTab={activeTab}
//               onTabClick={onTabClick}
//               rightBtnIcon={">"}
//               hideNavBtns={false}
//               leftBtnIcon={"<"}
//               showTabsScroll={false}
//               tabsScrollAmount={2}
//             >
//               {/* generating an array to loop through it  */}
//               {tabItems.map((el, i) => (
//                 <Tab key={i}>
//                   <img
//                     style={{ paddingRight: "5px" }}
//                     src={
//                       require(i === 0
//                         ? "../images/france.svg"
//                         : i == 1
//                         ? "../images/switzerland.svg"
//                         : "../images/romania.svg").default
//                     }
//                   />
//                   {el.text}
//                 </Tab>
//               ))}
//             </Tabs>
//           </div>
//           {/* Mini Card */}
//           <div className="userLeads">
//         {  userCardList.length > 0 ?
//      <Carousel responsive={responsive}>

//           {
//            userCardList.map((el)=>(
//     <>
//     <LeadCenterMiniCard  props={el} key={el._id} activeUser={currentUser} setUserCardList={setUserCardList} allUsers={userCardList} />
//   </>
//           ))
//           }
//     </Carousel>
//     :
//     <div className="col-12 mt-2 d-flex justify-content-center" >    <ProfilesLoader  width ={250} height={200} fontSize={"26px"} fontWeight={"600"}  Title={"Please Wait!"}/> </div>

//         }
//     </div>
//           {/* End Card */}

//           <div
//             className="col-12 mt-1 p-1"
//             style={{ background: "#ffff", borderRadius: "10px" }}
//           >
//             {LeadList.length > 0 ?

//             <Filters  LeadsCard={Leads} market={TabName} setLeads={setLeads} statusLeads={setLeadScHeck} update={setUpdateField} setprecontacted={setpreContected} setcontacted={setcontected} setFilterState={setFilterState} page={setPage} setSkipLeads={setSkipLeads} setLength={setLength} length={length} />
//             :
//             null
// }
//           </div>

//           <div
//             className="col-12 mt-1 p-1"
//             style={{ background: "#ffff", borderRadius: "10px" }}
//           >
//             <p className="mb-2 ApplyFilter">
//             <b> ‎ ✔  ‎There is {Leads.length} ‎ ‎leads total</b>
//             </p>
//             <p className="mb-2 ApplyFilter">
//             <b> ‎✔   ‎There is {contected} leads not yet contacted by Agency</b>
//             </p>
//             <p className="mb-0 ApplyFilter">
//             <b> ‎ ✔  ‎There is {preContected} leads not yet precontacted</b>
//             </p>
//           </div>
//           <div
//             className="col-12 p-1 my-1 OverFlowLink"
//             style={{ background: "#ffff", borderRadius: "10px"}}

//         >
//            {
//             LeadsCheck ?
//             FilterState ?
//             skipLeads.length > 0 ?

//                 <>
//                 <InfiniteScroll
//   dataLength={skipLeads.length} //This is important field to render the next data
//   next={()=>{setPage((prev)=>prev + 20);}}
//   hasMore={hash}
//   loader={<div className="col-12 d-flex justify-content-center my-3"><Loader   /></div>}
// >
// { skipLeads.map((el,i)=>(

//                <LeadList  props={el} length={i} key={el._id} Update={setUpdateField} Load={setLeadScHeck} Lead={setLeads} activeUser={setCurrentUser}  TabName={TabName}  setFilterState={setFilterState}  page={setPage} setSkipLeads={setSkipLeads} setLength={setLength} />

//          ))
//             }
// </InfiniteScroll>

//             </>

//             :
//             <div className="row ">
//               <div className="col-12 d-flex justify-content-center">
//             <p className="mb-0 d-flex align-items-center ErrorSearchBox"><Error    />✘✘ No Leads Available Yet! Please Add a New Lead!</p>
//             </div>
//             </div>
//             :
//             Leads.length > 0 ?

//             <>

// { Leads.map((el,i)=>(

//            <LeadList  props={el} length={i} key={el._id} Update={setUpdateField} Load={setLeadScHeck} Lead={setLeads} activeUser={setCurrentUser}  TabName={TabName} setFilterState={setFilterState} page={setPage} setSkipLeads={setSkipLeads} setLength={setLength} />

//      ))
//         }
//         </>
//         :
//         <div className="row ">
//         <div className="col-12 d-flex justify-content-center">
//       <p className="mb-0 d-flex align-items-center ErrorSearchBox"><Error    />✘✘ No Leads Available Yet! Please Add a New Lead!</p>
//       </div>
//       </div>
//             :
//             <div className="row ">
//             <div className="col-12 d-flex justify-content-center">
//             <Loader   />
//             </div>
//             </div>

//            }

//           </div>

//         </div>
//       </div>
//     </>
//   );
// }
// export default LeadsCenter;

import React, { useState, useEffect } from "react";
import "../CSS/Leads/Lead.css";
import { Link } from "react-router-dom";
import { Tabs, Tab } from "react-tabs-scrollable";
import LeadCenterMiniCard from "./LeadComponents/LeadCenterMiniCard";
import Filters from "./LeadComponents/Filters";
import LeadList from "./LeadComponents/LeadList";
import Loader from "../components/Loader/loader";
import Error from "../components/Loader/SearchBarError";
import { API_BASE_URL } from "../config/serverApiConfig";
import { Toaster } from "react-hot-toast";
import Carousel from "react-multi-carousel";
import ProfilesLoader from "../../src/components/Loader/ProfilesLoader";
import $ from "jquery";
import Cookies from 'js-cookie'
import Pagination from "./LeadComponents/pagination";
let TabName = "";
function LeadsCenter() {
  const LoginUser = JSON.parse(localStorage.getItem("LoginUser"));
  const [LoginUserS, setLoginUser] = useState(LoginUser);
  const [activeTab, setActiveTab] = React.useState(0) as any;
  const [LeadsCheck, setLeadScHeck] = useState(false);
  const [Leads, setLeads] = useState([]) as any;
  const [userCardList, setUserCardList] = useState([]);
  const [UpdateFiled, setUpdateField] = useState(false);
  const [currentUser, setCurrentUser] = useState() as any;
  const [preContected, setpreContected] = useState(0) as any;
  const [contected, setcontected] = useState(0) as any;
  const [data,setData]=useState()as any
  const [skipLeads, setSkipLeads] = useState([]) as any;
  const [filter, setFilter] = useState(false);
  const [currentPage, setcurrentPage] = useState(0);
  const [filterActive,setFilterActive]=useState(false)
  let [page, setPage] = useState(1)as any;
  const [DsBtn,setDsBtn]=useState(false)
  const [total,setTotal]=useState(0)as any
  const [wait,setWait]=useState(false)
  const [rest,setrest]=useState(false)
  const [tabItems] = useState([
    {
      text: "FRANCE",
      value: "FRANCE",
    },
    {
      text: "SUISSE",
      value: "SUISSE",
    },
    {
      text: "ROMANIA",
      value: "ROMANIA",
    },
  ]) as any;


  const fetchSkipLeads = async (market: any, page: any) => {
    //  setLeadScHeck(false)
    setDsBtn(true)
    await fetch(API_BASE_URL + `allLeads/?market=${market}&skip=${page}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " +  Cookies.get("token"),
      },
    })
      .then((red) => red.json())
      .then((resData) => {
        if (resData.status) {
          setLeadScHeck(true);
    setDsBtn(false)
    setUpdateField(false);
          setLeads([...resData.data]);
   
        } else {
          setLeads([]);
          setLeadScHeck(true);
          setUpdateField(false);
          setDsBtn(false)
          setDsBtn(false)

 
        }
      })
      .catch((err) => err);
  };

  // console.log(skipLeads.length/50)

  const fetchLeads = async (market: any, page: any) => {
    //  setLeadScHeck(false)
    setWait(false)
    await fetch(API_BASE_URL + `allLeads2/?market=${market}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " +  Cookies.get("token"),
      },
    })
      .then((red) => red.json())
      .then((resData) => {
        if (resData.status) {
          setLeadScHeck(true);
          setUpdateField(false);
          setSkipLeads([...resData.data]);
          setTotal(resData.data.length)
          setWait(true)
          setrest(false)
          setpreContected(resData.notPreContactedCount);
          setcontected(resData.notContactedCount);
        } else {
          setSkipLeads([]);
          setWait(true)
          setLeadScHeck(true);
          setrest(false)
          setUpdateField(false);
          setTotal(resData.data.length)
          setpreContected(resData.notPreContactedCount);
          setcontected(resData.notContactedCount);
        }
      })
      .catch((err) => err);
  };

  const fetchUsers = async () => {
    //  setLeadScHeck(false)

    return await fetch(API_BASE_URL + `allusers`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " +  Cookies.get("token"),
      },
    })
      .then((red) => red.json())
      .then((resData) => resData)
      .catch((err) => err);
  };

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

  useEffect(() => {
    fetchUsers().then((resData) => {
      {
        if (resData.status) {
          setUpdateField(false);
          if (resData.data.length > 0) {
            let Cuser = resData.data.filter(
              (el) => el?.username === LoginUserS?.username
            );
            let users = resData.data.filter(
              (el) => el?.username !== LoginUserS?.username
            );
            setUserCardList([...Cuser, ...users]);
          }
        } else {
          setUserCardList([]);
          setUpdateField(false);
        }
      }
    });
    // console.log(currentUser.emailAddress)
    const FolderName = tabItems.filter((el, i) => i == activeTab);
    TabName = FolderName.map((el) => el.value);
// if(filter == false){
//   fetchLeads(TabName, page);
//   fetchSkipLeads(TabName, currentPage)
// }
  }, [UpdateFiled]);
  useEffect(()=>{
    if(filter == false){
  fetchLeads(TabName, page);
  fetchSkipLeads(TabName, currentPage)
}
  },[rest])

  const onTabClick = (e, index: any) => {
    setActiveTab(index);
    setPage(0)
    setcurrentPage(0)
    const FolderName = tabItems.filter((el, i) => i == index);
    TabName = FolderName.map((el) => el.value);
    fetchSkipLeads(TabName, 0)
    fetchLeads(TabName, page);
  };
  return (
    <>
      <Toaster
        containerStyle={{ zIndex: "999999999999999999" }}
        position="top-right"
      />
      <div className="container-fluid ">
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
            {userCardList.length > 0 ? (
              <Carousel responsive={responsive}>
                {userCardList.map((el) => (
                  <>
                    <LeadCenterMiniCard
                      props={el}
                      key={el._id}
                      activeUser={currentUser}
                      setUserCardList={setUserCardList}
                      allUsers={userCardList}
                    />
                  </>
                ))}
              </Carousel>
            ) : (
              <div className="col-12 mt-2 d-flex justify-content-center">
                {" "}
                <ProfilesLoader
                  width={250}
                  height={200}
                  fontSize={"26px"}
                  fontWeight={"600"}
                  Title={"Please Wait!"}
                />{" "}
              </div>
            )}
          </div>
          {/* End Card */}

          <div
            className="col-12 mt-1 p-1"
            style={{ background: "#ffff", borderRadius: "10px" }}
          >
            {LeadList.length > 0 ? (
              <Filters
                LeadsCard={skipLeads}
                market={TabName}
                setLeads={setLeads}
                statusLeads={setLeadScHeck}
                update={setUpdateField}
                setprecontacted={setpreContected}
                setcontacted={setcontected}
                setFilter={setFilter}
                setWait={setWait}
                setrest={setrest}
                filter={filter}
                setFilterActive={setFilterActive}
                setDatA={setData}
                setTotal={setTotal}
              />
            ) : null}
          </div>

          <div
            className="col-12 mt-1 p-1"
            style={{ background: "#ffff", borderRadius: "10px" }}
          >
            {wait ?
            <>
            <p className="mb-2 ApplyFilter">
              <b> ‎ ✔ ‎There are {total} ‎ ‎leads Total</b>
            </p>
            <p className="mb-2 ApplyFilter">
              <b>
                {" "}
                ‎✔ ‎There are {contected} leads Not Yet contacted by Agency
              </b>
            </p>
            <p className="mb-0 ApplyFilter">
              <b> ‎ ✔ ‎There are {preContected} leads Not Yet precontacted</b>
            </p>
            </>
            :
            <>
            {" "}
            <div className="d-flex LeadsLoad justify-content-center">
                  <div className="spinner-border text-warning" role="status" style={{height:"140px",width:"140px"}}>
                    <span className="visually-hidden" >Loading...</span>
                  </div>
                </div>
          </>}
          </div>
          <div
            className="col-12 p-1 my-1 "
            style={{ background: "#ffff", borderRadius: "10px" }}
          >
            {
              filterActive ?
               null
               :
               
           <Pagination setPage={setPage} setcurrentPage={setcurrentPage} fetchSkipLeads={fetchSkipLeads} page={page}  tabName={TabName} comp="top"  DS={DsBtn} LeadsCheck={LeadsCheck}  Leads={skipLeads} />
            }
           
            {LeadsCheck ? (
              Leads.length > 0 ? (
                <>
                  {Leads.map((el, i) => (
                    <>
                      <LeadList
                        props={el}
                        length={i}
                        key={i}
                        Update={setUpdateField}
                        Load={setLeadScHeck}
                        Lead={setLeads}
                        activeUser={setCurrentUser}
                        TabName={TabName}
                        setFilter={setFilter}
                        DAta={data}
                        setrest={setrest}
                      />
                    </>
                  ))}
                </>
              ) : (
                <div className="row my-4">
                  <div className="col-12 d-flex justify-content-center">
                    <p className="mb-0 d-flex align-items-center ErrorSearchBox">
                      <Error />
                      ✘✘ No Leads Available Yet! Please Add a New Lead!
                    </p>
                  </div>
                </div>
              )
            ) : (
              <div className="row my-2 ">
                <div className="d-flex  justify-content-center  LeadsLoad">
                  <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            )}
               {
              filterActive  ||   Leads.length == 0 ? 
            
               null
               :
               <div className="mt-2">
           <Pagination setPage={setPage} setcurrentPage={setcurrentPage} fetchSkipLeads={fetchSkipLeads} page={page}  tabName={TabName} comp="bottom"  DS={DsBtn} LeadsCheck={LeadsCheck} Leads={skipLeads} />
           </div>
            }
          </div>
        </div>
      </div>
    </>
  );
}
export default LeadsCenter;
