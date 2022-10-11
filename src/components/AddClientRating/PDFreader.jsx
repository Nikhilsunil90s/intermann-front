import React from "react";
import { PDFReader } from 'reactjs-pdf-reader'

function PDFreader(props){

    return(
<PDFReader url={props} />
    )
}
export default PDFreader;