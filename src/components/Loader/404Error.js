import React from "react";
import '../../CSS/Error404.css'
function Error404Loader(props){
    console.log(props.props)

    return(
        <>
        <lottie-player src="https://assets2.lottiefiles.com/private_files/lf30_gv4natto.json" className="ErrorLoader"  background="transparent"  speed="1"  style={{width:props.props === "38%" ? "38%" : "58%" , height: "100px;"}}  loop  autoplay></lottie-player>
        </>
    )
}
export default Error404Loader;