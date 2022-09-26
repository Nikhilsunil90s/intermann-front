import React from 'react'


function  DocumentSign(){
 
return (
    <>
    <div className='container-fluid'>
        <div className='row'>
         <div className='col-12 d-flex justify-content-center  bg-ContractPage p-2'>
         <span>
              <img
                src={require("../images/logo-header.svg").default}
                className="filter-logo"
                style={{ width: "150%" }}
              />
            </span>
            <img
              src={require("../images/LogoName.svg").default}
              className="filter-text LogoIntermann"
              style={{ paddingLeft: "30px" }}
            />
    
         </div>
        </div>
    </div>
    
    </>
)

}
export default DocumentSign;