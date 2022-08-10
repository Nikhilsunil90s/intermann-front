import React from "react"
import "../../CSS/Error404.css"

function Error404(){


    return(
        <>
<div className="container-fluid p-2">
<div className="row HeightWidth">
<div className="col-6 d-flex align-items-center justify-content-center">
    <div className="d-grid align-items-center justify-content-center" style={{width:"68%"}}>
<h1 className="Oopss mb-0">Oops....</h1>
<h4 className="Notfound">Page not found </h4>
<p className="suggestBack">This Page doesn`t exist or was removed!
We suggest you  back to home.</p>
<button className="btn BtnBackToHome"><div className="row"><div className="col-3 pr-0"><img src={require("../../images/returnBack.svg").default} /></div><div className="col-9 pl-0">Back to home</div></div></button>
</div>
</div>
<div className="col-6 bgError">

</div>

</div>

</div>

        </>
    )
}
export default Error404;