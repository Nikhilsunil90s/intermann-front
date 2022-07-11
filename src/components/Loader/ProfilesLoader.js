import React from "react";

export default function ProfileLoader({width,height,fontSize,fontWeight,Title}){
 
    return(
        <>
     <div className="d-flex"><span className="d-flex align-items-center LoaderClass" style={{fontFamily: 'Poppins',
fontStyle: "normal",
fontWeight: fontWeight,
fontSize: fontSize,
lineHeight: "33px",
letterSpacing: "1px",
textTransform: "capitalize",
color: "#252726"}}>{Title}</span>   <lottie-player  src="https://assets2.lottiefiles.com/packages/lf20_kyi8qg4t.json"   background="transparent"  speed="1"  style={{width: width, height:height }} loop  autoplay></lottie-player></div>
        </>  )
}