import React, { useState } from "react";

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
    
  ]);

  console.log(props.DS)
  const HandleChange = (e, page) => {
    console.log(e);
    props.setPage(e);
    props.setcurrentPage(page);
    props.fetchSkipLeads(props.tabName, page);
  };

  return (
    <>
      <div className="row">
        {
            props.comp == "top" ?
            <>            <div className="col-3">
          <p className="ApplyFilter mb-0">
            <b>Page - {props.page}</b>
          </p>
        </div>
        <div className="col-9 d-flex justify-content-end">
          <nav aria-label="...">
            <ul className="pagination">
              <li className="page-item disabled">
                <span className="page-link">Previous</span>
              </li>
        {
            props.DS ?

            
                num.map((el:any,i)=>(
                    <li
                    className="page-item disabled "
                 
                  >
                 
                    <span
                      style={{
                        background: props.page === el.page ? "#00000092" : "#ffffff",
                        color: props.page === el.page ? "#fff" : "#000",
                      }}
                      className="page-link"
                    >
                      {el.page}
                    </span>
                  </li>
                ))
              
            :

            
                num.map((el:any,i)=>(
                    <li
                    className={`page-item cursor-pointer`} 
                    onClick={(e) => HandleChange(el.page, el.currentPage)}
                    
                  >
                 
                    <span
                      style={{
                        background: props.page === el.page ? "#000" : "#fff",
                        color: props.page === el.page ? "#fff" : "#000",
                      }}
                      className="page-link"
                    >
                      {el.page}
                    </span>
                  </li>
                ))
              
        }
            
            

              <li className="page-item cursor-pointer disabled">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>   
        </>

            :
            <>        
          <div className="col-12 d-flex justify-content-end">
            <nav aria-label="...">
              <ul className="pagination">
                {
                    props.LeadsCheck  ?

                 
             
  
                      props.DS ?
  <>
     <li className="page-item disabled">
                    <span className="page-link">Previous</span>
  
                  </li>
              {
                      num.map((el:any,i)=>(
                          <li
                          className="page-item disabled "
                       
                        >
                       
                          <span
                            style={{
                              background: props.page === el.page ? "#00000092" : "#ffffff",
                              color: props.page === el.page ? "#fff" : "#000",
                            }}
                            className="page-link"
                          >
                            {el.page}
                          </span>
                        </li>
                      ))
                        }
                        <li className="page-item cursor-pointer disabled">
                        <a className="page-link" href="#">
                          Next
                        </a>
                      </li>
                      </>
                  :
      
                  
                  <>
     <li className="page-item disabled">
                    <span className="page-link">Previous</span>
  
                  </li>{  num.map((el:any,i)=>(
                          <li
                          className={`page-item cursor-pointer`} 
                          onClick={(e) => HandleChange(el.page, el.currentPage)}
                          
                        >
                       
                          <span
                            style={{
                              background: props.page === el.page ? "#000" : "#fff",
                              color: props.page === el.page ? "#fff" : "#000",
                            }}
                            className="page-link"
                          >
                            {el.page}
                          </span>
                        </li>
                      ))
                        }
                         <li className="page-item cursor-pointer disabled">
                        <a className="page-link" href="#">
                          Next
                        </a>
                      </li>
                      </>

                
                  
                  
    
              

                    :
                    null
                }
              
              </ul>
            </nav>
          </div>
          </>

        }
       
      </div>
    </>
  );
};
export default PaginationFun;
