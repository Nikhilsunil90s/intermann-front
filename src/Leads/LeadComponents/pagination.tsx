import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "react-tabs-scrollable";
const PaginationFun = (props: any) => {

  const [numberOfpage, setNumOfPages] = useState([]);
  
  const paginationFunction = () => {
    const totalPages = Math.ceil(props?.totalLeadsCount / 50);

    let totalNumber = [];
    let currentPage = 0;
    for (let i = 1; i <= totalPages; i++) {
      totalNumber.push({ page: i, currentPage });
      currentPage += 50;
    }
    setNumOfPages(totalNumber);
  };

  useEffect(() => {
    paginationFunction();
  }, [props?.totalLeadsCount]);

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
  };
  return (
    <div>
      {props.comp == "top" ? (
        <div className="row align-items-center">
          <div className="col-6">
            <p className="ApplyFilter mb-0">
              <b>Page - {props.page}</b>
            </p>
          </div>
          <div className="col-6">
            <Tabs
              activeTab={activeTab}
              onTabClick={(e, index) => onTabClick(e, index)}
              rightBtnIcon={">"}
              hideNavBtns={false}
              leftBtnIcon={"<"}
              showTabsScroll={false}
              tabsScrollAmount={5}
            >
              {numberOfpage.map((el: any, i) => (
                  <span
                    key={i}
                    onClick={() => HandleChange(el.page, el.currentPage)}
                    style={{
                      background: props.page === el.page ? "#000" : "#fff",
                      color: props.page === el.page ? "#fff" : "#000",
                    }}
                  >

                    {el.page}

                  </span>
              ))}
            </Tabs>
          </div>
        </div>
      ) : (
        <div className="row justify-content-end">
          <div className="col-6">
            <Tabs
              activeTab={activeTab}
              onTabClick={onTabClick}
              rightBtnIcon={">"}
              hideNavBtns={false}
              leftBtnIcon={"<"}
              showTabsScroll={false}
              tabsScrollAmount={5}
            >
              {numberOfpage.map((el: any, i) => (
                <div
                  onClick={() => HandleChange(el.page, el.currentPage)}
                  style={{
                    background:
                      props.page === el.page ? "#000" : "#fff",
                    color: props.page === el.page ? "#fff" : "#000",
                  }}
                >
                  {el.page}
                </div>
              ))}
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};
export default PaginationFun;
