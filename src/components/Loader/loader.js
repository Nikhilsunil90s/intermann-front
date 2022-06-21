import React, { useEffect, useState } from "react";
import Embauch from "../../pages/Embauch";
import ToDoList from '../../pages/ToDoList'
export default  function Loader(){
 
    return(
<>
<lottie-player src="https://assets4.lottiefiles.com/packages/lf20_jsuj2bs7.json"    speed="1"  style={{width: "300px", height: "300px",background:"transparent"}}  loop  autoplay></lottie-player>
</>
    )
}


