import React, { useState, useEffect, useRef } from "react";
import "../CSS/Leads/Lead.css";
import { Link } from "react-router-dom";
import { Tabs, Tab } from "react-tabs-scrollable";
import LeadCenterMiniCard from "./LeadComponents/LeadCenterMiniCard";
import Filters from "./LeadComponents/Filters";
import LeadList from "./LeadComponents/LeadList";
import Error from "../components/Loader/SearchBarError";
import { API_BASE_URL } from "../config/serverApiConfig";
import toast, { Toaster } from "react-hot-toast";
import Carousel from "react-multi-carousel";
import ProfilesLoader from "../../src/components/Loader/ProfilesLoader";
import Cookies from "js-cookie";
import Pagination from "./LeadComponents/pagination";
import InfiniteScroll from "react-infinite-scroll-component";

let TabName = "";

function LeadsCenter() {

  const topRef = useRef(null);

  const LoginUser = JSON.parse(localStorage.getItem("LoginUser"));
  const [LoginUserS] = useState(LoginUser);
  const [activeTab, setActiveTab] = React.useState(0) as any;
  const [LeadsCheck, setLeadsCheck] = useState(false);
  const [leads, setLeads] = useState([]) as any;
  const [filteredLeads, setFilteredLeads] = useState([]) as any;
  const [loadNumber, setLoadNumber] = useState(1);
  const [userCardList, setUserCardList] = useState([]);
  const [UpdateField, setUpdateField] = useState(false);
  const [currentUser, setCurrentUser] = useState() as any;
  const [data, setData] = useState() as any;
  const [skipLeads, setSkipLeads] = useState([]) as any;
  const [filter, setFilter] = useState(false);
  const [currentPage, setcurrentPage] = useState(0);
  const [filterActive, setFilterActive] = useState(false);
  let [page, setPage] = useState(1) as any;
  const [DsBtn, setDsBtn] = useState(false);

  const [totalLeadsCount, setTotalLeadsCount] = useState(0) as any;
  const [notContactedLeadsCount, setNotContactedLeadsCount] = useState(0) as any;

  const [waitingForLeadsCountLoad, setWaitingForLeadsCountLoad] = useState(false);
  const [waitingToFetchSkipLeads, setWaitingToFetchSkipLeads] = useState(false);
  const [waitingToFetchFilteredLeads, setWaitingToFetchFilteredLeads] = useState(false);
  const [displayFilteredResults, setDisplayFilteredResults] = useState(false);
  const [hasMoreFilteredLeads, setHasMoreFilteredLeads] = useState(true);
  const [filterData, setFilterData] = useState() as any;
  const [exporting, setExporting] = useState(false);

  const [rest, setrest] = useState(false);
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

  // fetch skipped leads for a market - used for pagination 
  const fetchSkipLeads = async (market: any, page: any) => {
    await fetch(API_BASE_URL + `allLeads/?market=${market}&skip=${page}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
    })
      .then((red) => red.json())
      .then((resData) => {
        setWaitingToFetchSkipLeads(false);
        setWaitingForLeadsCountLoad(false);
        if (resData.status) {
          setLeads([...resData.data]);
          setTotalLeadsCount(resData.totalCount);
          setNotContactedLeadsCount(resData.notContactedCount);
          topRef.current.scrollIntoView({ behavior: 'smooth' });
        } else {
          setLeads([]);
          setTotalLeadsCount(0);
          setNotContactedLeadsCount(0);
          topRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      })
      .catch((err) => err);
  };

  const fetchUsers = async () => {

    return await fetch(API_BASE_URL + `allusers`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
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
    if (userCardList.length === 0) {
      fetchUsers()
        .then((resData) => {
          if (resData.status) {
            if (resData.data.length > 0) {
              resData.data.sort((d1, d2) => {
                if (d1?.username === LoginUserS?.username && d2?.username !== LoginUserS?.username) {
                  return -1;
                } else if (d1?.username !== LoginUserS?.username && d2?.username === LoginUserS?.username) {
                  return 1;
                } else {
                  return 0;
                }
              })

              setUserCardList([...resData.data]);
            }
          } else {
            setUserCardList([]);
          }
        });

      const FolderName = tabItems.filter((el, i) => i == activeTab);
      TabName = FolderName.map((el) => el.value);
    }
  });

  useEffect(() => {
    if (filterData === undefined) {
      setLoadNumber(1);
      setWaitingForLeadsCountLoad(true);
      setDisplayFilteredResults(false);
      setWaitingToFetchSkipLeads(true);
      fetchSkipLeads(TabName, currentPage);
    } 

    if (filterData !== undefined) {
      setLoadNumber(1);
      setDisplayFilteredResults(true);
      setWaitingForLeadsCountLoad(true);
      setWaitingToFetchFilteredLeads(true);
      filterLeads();
    }
  }, [filterData]);

  const filterLeads = async () => {
    setWaitingForLeadsCountLoad(true);
    await fetch(API_BASE_URL + "filterLeads", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("token"),
        },
        body: JSON.stringify(filterData),
      })
      .then((res) => res.json())
      .then((res) => {
        setFilterActive(true);
        setWaitingForLeadsCountLoad(false);
        setWaitingToFetchFilteredLeads(false);
        setLeads([...res.data]);
        setTotalLeadsCount(res.totalCount);
        setNotContactedLeadsCount(res.notContactedCount);
        toast.success(`Filters Applied. ${res.data.length} Leads found!`);
      })
      .catch((err) => err);
  }

  const scrollAndLoadMoreLeads = () => {
    // User has scrolled to the bottom, add the next slice of 20 elements
    const startIndex = (loadNumber - 1) * 20;
    const endIndex = startIndex + 20;
    const nextItems = leads.slice(startIndex, endIndex);
    setFilteredLeads([...filteredLeads, ...nextItems]);
    setLoadNumber(loadNumber + 1);
  };

  useEffect(() => {
    setLoadNumber(1);
    setFilteredLeads([]);
  }, [leads])

  const onTabClick = (e, index: any) => {
    setActiveTab(index);
    setPage(0);
    setcurrentPage(0);
    const FolderName = tabItems.filter((el, i) => i == index);
    TabName = FolderName.map((el) => el.value);
    fetchSkipLeads(TabName, 0);
  };

  const exportAndDownloadFilteredLeads = async () => {
    setExporting(true);
    let leadPhoneNumbers = leads.map(lead => {
      return '+' + lead?.phoneNumber
    })

    console.log(leadPhoneNumbers);
    const dataBlob = new Blob([leadPhoneNumbers.join("\n")], { type: 'text/plain' });
    // Create a download link and trigger the download
    const url = URL.createObjectURL(dataBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'phone-numbers.txt'; // File name
    document.body.appendChild(a);
    a.click();

    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    setExporting(false);
  }

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

          {/* Mini Cards For Employee Counters */}
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
            <Filters
              LeadsCard={[]}
              market={TabName}
              selectedFilters={filterData}
              setFilterData={setFilterData}
              disableApplyBtn={waitingToFetchFilteredLeads}
              deactivateFilter={setFilterActive}
            />
          </div>

          {/* Leads Counter */}
          <div
            className="col-12 mt-1 p-1"
            style={{ background: "#ffff", borderRadius: "10px" }}
            ref={topRef}
          >
            {!waitingForLeadsCountLoad ? (
              <div className="pt-1">
                {filterActive ?
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="ApplyFilter">
                        Applied Filters showed <b style={{ marginLeft: '5px' }}> {totalLeadsCount} Lead Results</b>.
                      </p>
                      <p className="ApplyFilter">
                        <b>
                          {" "}
                          ‎✔ ‎There are {notContactedLeadsCount} leads Not Yet Contacted by Agency
                        </b>
                      </p>
                    </div>
                    {filterActive && leads.length > 0 ? <button className="btn btn-dark py-0 mt-n2" onClick={exportAndDownloadFilteredLeads} disabled={exporting}>
                        { exporting ? 'Exporting...' : 'EXPORT & SMS' }
                    </button> : null}
                  </div>
                  : <><p className="mb-2 ApplyFilter">
                    <b>‎ ✔ ‎There are {totalLeadsCount} ‎ Lead Results</b>
                  </p>
                    <p className="ApplyFilter">
                      <b>
                        {" "}
                        ‎✔ ‎There are {notContactedLeadsCount} leads Not Yet Contacted by Agency
                      </b>
                    </p></>
                }
              </div>
            ) : (
              <div className="d-flex LeadsLoad justify-content-center">
                <div
                  className="spinner-border text-warning"
                  role="status"
                  style={{ height: "140px", width: "140px" }}
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>

          <div
            className="col-12 p-1 my-1 "
            style={{ background: "#ffff", borderRadius: "10px", overflow: 'hidden' }}
          >
            
            {/* Pagination - Top and Bottom, Lead List - Cards */}
            {filterData ? null : 
              <Pagination
                setPage={setPage}
                setcurrentPage={setcurrentPage}
                fetchSkipLeads={fetchSkipLeads}
                page={page}
                tabName={TabName}
                comp="top"
                totalLeadsCount={totalLeadsCount}
                filterActive={filterActive}
              />}

            {/* Leads If Filters Are Not Active - Displayed Within Pagination */}
            {displayFilteredResults 
              ?
                  (!waitingToFetchFilteredLeads ? 
                    <InfiniteScroll
                    dataLength={filteredLeads.length}
                    next={scrollAndLoadMoreLeads}
                    hasMore={filteredLeads.length < leads.length}
                    loader={
                      <>
                        {" "}
                        <div className="d-flex LeadsLoad justify-content-center mt-2 overflow-hidden">
                          <div
                            className="spinner-border text-warning"
                            role="status"
                            style={{ height: "40px", width: "40px" }}
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      </>
                    }
                  >
                    {filteredLeads.map((el, i) =>
                      <LeadList
                        props={el}
                        length={i}
                        key={i}
                        Update={setUpdateField}
                        Load={setLeadsCheck}
                        Lead={setFilteredLeads}
                        activeUser={setCurrentUser}
                        TabName={TabName}
                        setFilter={setFilter}
                        Data={data}
                        setrest={setrest}
                      />
                    )}
                    </InfiniteScroll> 
                    : 
                    <div className="row my-2 ">
                    <div className="d-flex  justify-content-center  LeadsLoad">
                      <div className="spinner-border text-warning" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                    </div>
                    
                  )   
                
              : (
                  // Display UnFiltered Lists
                  leads.length > 0 && !waitingToFetchSkipLeads ? 
                  (
                    <>
                      {leads.map((el, i) =>
                        <LeadList
                          props={el}
                          length={i}
                          key={i}
                          Update={setUpdateField}
                          Load={setLeadsCheck}
                          Lead={setLeads}
                          activeUser={setCurrentUser}
                          TabName={TabName}
                          setFilter={setFilter}
                          Data={data}
                          setrest={setrest}
                        />
                      )}
                    </>
                  ) : 
                  (
                    waitingToFetchSkipLeads ? 
                    <div className="row my-2 ">
                      <div className="d-flex  justify-content-center  LeadsLoad">
                        <div className="spinner-border text-warning" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    </div> : 
                    <div className="row my-4">
                      <div className="col-12 d-flex justify-content-center">
                        <p className="mb-0 d-flex align-items-center ErrorSearchBox">
                          <Error />
                          ✘✘ No Leads Available Yet! Please Add a New Lead!
                        </p>
                      </div>
                    </div>
                  )
                )
            }  
            

            {/* Bottom Pagination */}
            <div className="mt-2">
              {filterData ? null : <Pagination
                setPage={setPage}
                setcurrentPage={setcurrentPage}
                fetchSkipLeads={fetchSkipLeads}
                page={page}
                tabName={TabName}
                comp="bottom"
                totalLeadsCount={totalLeadsCount}
                filterActive={filterActive}
              />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default LeadsCenter;
