import React from "react";
import { Document, Page } from 'react-pdf'; 

function PdfDocu({props}){


    return(<>
    <Document
file="somefile.pdf"

/>
    </>)
}
export default PdfDocu;