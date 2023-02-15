import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "react-tabs-scrollable";
const PaginationFun = (props: any) => {
   const [numberOfpage,setNumOfPages]=useState([])
  const paginationFunction=()=>{
    const totalPage= Math.ceil(props?.Leads?.length/50);
    let totalNumber=[]
    let currentPage=0;
    for(let i=1;i<=totalPage;i++){
     totalNumber.push({page:i,currentPage})
     currentPage+=50;
    }
    setNumOfPages(totalNumber)
  }
useEffect(()=>{
  paginationFunction()
},[ props?.Leads?.length])

  const [activeTab, setActiveTab] = React.useState(0) as any;

  // console.log(props.DS)
  const HandleChange = (e, page) => {
    props.setPage(e);
    props.setcurrentPage(page);
    props.fetchSkipLeads(props.tabName, page);
  };

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

            
                numberOfpage.map((el:any,i)=>(
                  <Tab key={i}  className="disabled " >
                    
                      {el.page}
                                        </Tab>
                ))
              
            :

                numberOfpage.map((el:any,i)=>(
            
               
                  <span key={i} onClick={()=>HandleChange(el.page,el.currentPage)}  style={{
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
                      numberOfpage.map((el:any,i)=>(
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
   
   numberOfpage.map((el:any,i)=>(
    <div onClick={()=>HandleChange(el.page,el.currentPage)}  style={{
      background: props.page === el.page ? "#000" : "#fff",
      color: props.page === el.page ? "#fff" : "#000",
    }}>
                            {el.page}
                            </div>
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
