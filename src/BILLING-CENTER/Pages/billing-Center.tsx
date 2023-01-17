import React from "react";
import Header from "../components/Header";

function BillingCenter(){

    return(<>
<div className="container-fluid">
    <div className="row">
        <div >
        <Header  props={"header"} />
        </div>
        <div >
        <Header props={"Tabs"}  />
        </div>

</div>
</div>
    </>)
}
export default BillingCenter;