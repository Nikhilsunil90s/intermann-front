import React from "react";

export default function ProfileLoader({width,height}){
 
    return(
        <>
   <lottie-player  src="https://assets8.lottiefiles.com/private_files/lf30_hdiNFs.json"   background="transparent"  speed="1"  style={{width: width, height:height }} loop  autoplay></lottie-player>
        </>  )
}