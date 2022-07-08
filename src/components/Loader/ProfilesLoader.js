import React from "react";

export default function ProfileLoader(){
 
    return(
        <>
     <div className="d-flex">   <lottie-player  src="https://assets2.lottiefiles.com/packages/lf20_kyi8qg4t.json"   background="transparent"  speed="1"  style={{width: "300px", height: "300px;" }} loop  autoplay></lottie-player><span className="d-flex align-items-center LoaderClass" style={{fontFamily: 'Poppins',
fontStyle: "normal",
fontWeight: 700,
fontSize: "22px",
lineHeight: "33px",
letterSpacing: "1px",
textTransform: "capitalize",
color: "#252726"}}>Loading..</span></div>
        </>  )
}