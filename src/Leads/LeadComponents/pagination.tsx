import React, { useState } from "react";
import { Tabs, Tab } from "react-tabs-scrollable";
const PaginationFun = (props: any) => {
  const [num] = useState([
    { page: 1, currentPage: 0 },
    { page: 2, currentPage: 50 },
    { page: 3, currentPage: 100 },
    { page: 4, currentPage: 150 },
    { page: 5, currentPage: 200 },
    { page: 6, currentPage: 250 },
    { page: 7, currentPage: 300 },
    { page: 8, currentPage: 350 },
    { page: 9, currentPage: 400 },
    { page: 10, currentPage: 450 },
    { page: 11, currentPage: 500 },
    { page: 12, currentPage: 550 },
    { page: 13, currentPage: 600 },
    { page: 14, currentPage: 650 },
    { page: 15, currentPage: 700 },
    { page: 16, currentPage: 750 },
    { page: 17, currentPage: 800 },
    { page: 18, currentPage: 850 },
    { page: 19, currentPage: 900 },
    { page: 20, currentPage: 950 },
    { page: 21, currentPage: 1000 },
    { page: 22, currentPage: 1050 },
    { page: 23, currentPage: 1100 },
    { page: 24, currentPage: 1150 },
    { page: 25, currentPage: 1200 },
    { page: 26, currentPage: 1250 },
    { page: 27, currentPage: 1300 },
    { page: 28, currentPage: 1350 },
    { page: 29, currentPage: 1400 },
    { page: 30, currentPage: 1450 },
    { page: 31, currentPage: 1500 },
    { page: 32, currentPage: 1550 },
    { page: 33, currentPage: 1600 },
    { page: 34, currentPage: 1650 },
    { page: 35, currentPage: 1700 },
    { page: 36, currentPage: 1750 },
    { page: 37, currentPage: 1800 },
    { page: 38, currentPage: 1850 },
    { page: 39, currentPage: 1900 },
    { page: 40, currentPage: 2000 },
    { page: 41, currentPage: 2050 },
    { page: 42, currentPage: 2100 },
    { page: 43, currentPage: 2150 },
    { page: 44, currentPage: 2200 },
    { page: 45, currentPage: 2250 },
    { page: 46, currentPage: 2300 },
    { page: 47, currentPage: 2350 },
    { page: 48, currentPage: 2400 },
    { page: 49, currentPage: 2450 },
    { page: 50, currentPage: 2500 },
    { page: 51, currentPage: 2550 },
    { page: 52, currentPage: 2600 },
    { page: 53, currentPage: 2650 },
    { page: 54, currentPage: 2700 },
    
  ]);
  const [activeTab, setActiveTab] = React.useState(0) as any;

  console.log(props.DS)
  const HandleChange = (e, page) => {
    console.log(e);
    props.setPage(e);
    props.setcurrentPage(page);
    props.fetchSkipLeads(props.tabName, page);
  };
  // const HandleChange = (e, page) => {
  
  //   props.setcurrentPage(page);
  //   props.fetchSkipLeads(props.tabName, page);
  // };
  const onTabClick = (e, index: any) => {
    setActiveTab(index);
    props.setPage(index + 1);
    // props.fetchSkipLeads(props.tabName,index);
    
  };
  return (
    <>
      <div className="row justify-content-end">
        {
            props.comp == "top" ?
            <>            <div className="col-7">
          <p className="ApplyFilter mb-0">
            <b>Page - {props.page}</b>
          </p>
        </div>
        
        <div className="col-5">
        <Tabs
               activeTab={activeTab}
               onTabClick={(e,index)=>onTabClick(e,index)}
               rightBtnIcon={">"}
               hideNavBtns={false}
               leftBtnIcon={"<"}
               showTabsScroll={false}
               tabsScrollAmount={5}
               
            >
          {/* <nav aria-label="...">
            <ul className="pagination">
             */}
        {
            props.DS ?

            
                num.map((el:any,i)=>(
                  <Tab key={i}  className="disabled " >
                    
                      {el.page}
                                        </Tab>
                ))
              
            :

                num.map((el:any,i)=>(
            
               
                  <span onClick={()=>HandleChange(el.page,el.currentPage)}  style={{
                    background: props.page === el.page ? "#000" : "#fff",
                    color: props.page === el.page ? "#fff" : "#000",
                  }}>
              
                    {/* <button
                    className={`page-item cursor-pointer`} 
                    // onClick={(e) => HandleChange(el.page, el.currentPage)}
                    
                  >
                 
                    <span
                      style={{
                        background: props.page === el.page ? "#000" : "#fff",
                        color: props.page === el.page ? "#fff" : "#000",
                      }}
                      className="page-link"
                    > */}
                
                      {el.page}
                   
                    {/* </span>
                  </button> */}
               
                  </span>
        
                ))
              
        }
            
            

            
            {/* </ul>
          </nav> */}
          </Tabs>
        </div>   
        </>

            :
            <>        
          <div className="col-5">
     
                {
                    props.LeadsCheck  ?

                 
             
  
                      props.DS ?
  <>
     <Tabs
               activeTab={activeTab}
               onTabClick={onTabClick}
               rightBtnIcon={">"}
               hideNavBtns={false}
               leftBtnIcon={"<"}
               showTabsScroll={false}
               tabsScrollAmount={5}
            >
              {
                      num.map((el:any,i)=>(
                    <Tab  key={i}    className="disabled ">
                            {el.page}
                            </Tab>
                      ))
                        }
                   </Tabs>
                      </>
                  :
      
                  
                  <>
                     <Tabs
               activeTab={activeTab}
               onTabClick={onTabClick}
               rightBtnIcon={">"}
               hideNavBtns={false}
               leftBtnIcon={"<"}
               showTabsScroll={false}
               tabsScrollAmount={5}
            >
   {
   
   num.map((el:any,i)=>(
    <span onClick={()=>HandleChange(el.page,el.currentPage)}  style={{
      background: props.page === el.page ? "#000" : "#fff",
      color: props.page === el.page ? "#fff" : "#000",
    }}>
                            {el.page}
                            </span>
                      ))
                        }
                        </Tabs>
                      </>

                
                  
                  
    
              

                    :
                    null
                }
              
          
          </div>
          </>

        }
       
      </div>
    </>
  );
};
export default PaginationFun;
