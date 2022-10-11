import React,{useState} from "react";
import { PDFReader } from 'reactjs-pdf-reader'
import { Document, Page } from 'react-pdf';
import { MobilePDFReader } from 'reactjs-pdf-reader';
// import PDFReader from "react-pdf-reader";

function PDFreader(props){
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

    return(
      <div style={{overflow:'hidden',height:"100%"}}>
 <PDFReader data-page-number="3" showAllPage={true}  url={"https://res.cloudinary.com/dj06tvfjt/image/upload/v1665045867/document-1665045866708.pdf.pdf"}/> 
 </div>

    )
}
export default PDFreader;