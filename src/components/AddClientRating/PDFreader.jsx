import React,{useState} from "react";
import { PDFReader } from 'reactjs-pdf-reader'

function PDFreader(props){
console.log(props.props,"props")
    return(
      <div style={{overflow:'hidden',height:"100%"}}>
 <PDFReader data-page-number="3" showAllPage={true}  url={props.props}/> 
 </div>

    )
}
export default PDFreader;