import { Toaster, toast } from "react-hot-toast";
import { API_BASE_URL } from "../../../config/serverApiConfig";
import $ from 'jquery';
import { useEffect, useState } from "react";
function DocuGenerator({ id, closeModal }: any) {
    const [copied,setCopied]=useState(false)
    const [pdfURL,setPDFurl] =useState("")

    function copyToClipboard(element:any) {
      var $temp = $("<input>");
      $("body").append($temp);
      $temp.val($(element).text()).select();
      document.execCommand("copy");
      $temp.remove();
      setCopied(true)
      toast.success("Copied successfully !!")
    }

    useEffect(()=>{
     if(id && pdfURL ===""){
        fetchDocumentPDF(id)
     }
    },[])
    const fetchDocumentPDF = async (id: any) => {
        return await fetch(API_BASE_URL + `getDocumentForSignatures/?docId=${id}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((resp) => resp.json())
          .then((respData) => {
            console.log(API_BASE_URL)
            setPDFurl(API_BASE_URL+respData.filepath.replace("/app/", ""));
          })
          .catch((err) => err);
      };
    
  return (
    <>
      <Toaster position="top-center" />
      <div
        className="modal d-block"
        id="addJobModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ backgroundColor: "#00000052" }}
      >
        <div
          className="modal-dialog d-flex justify-content-center align-items-center"
          style={{ maxWidth: "740px", height: "100%" }}
        >
          <div className="modal-content" style={{ width: "900px" }}>
            <div className="modal-header ">
              <h5
                className="modal-title Add-ModalUserStyle justify-content-center "
                id="exampleModalLabel"
                style={{ width: "100%", fontWeight: 800, fontSize: "22px" }}
              >
                STEPS TO SEND THIS DOCUMENT TO SIGN
              </h5>
            </div>
            <div className="modal-body d-flex  text-start mt-1">
              <ul style={{ listStyle: "auto" }}>
                <li
                  style={{ fontWeight: 500, fontSize: "18px", color: "#000" }}
                >
                  Please copy and past this link once the document generated
              <br/>    <a style={{ color: "#3F76E2" }}  id="p1" onClick={()=>copyToClipboard('#p1')}>{"https://intermann.herokuapp.com/document/"+id}</a>
                </li>
                <li
                  style={{ fontWeight: 500, fontSize: "18px", color: "#000" }}
                >
                  Send this link to employee or company to sign
                </li>
                <li
                  style={{ fontWeight: 500, fontSize: "18px", color: "#000" }}
                >
                  Once this document signed you will receive the signed version
                  by email to contact & adrian email
                </li>
                <li
                  style={{ fontWeight: 500, fontSize: "18px", color: "#000" }}
                >
                  You will be able to download the signed version in{" "}
                  <a target="_blank" href="/downloadCenter" style={{ color: "#3F76E2" }}>download center</a> anytime
                </li>
                <li
                  style={{ fontWeight: 500, fontSize: "18px", color: "#000" }}
                >
                  You can{" "}
                  <a style={{ color: "#3F76E2" }} target="_blank" href={pdfURL} >
                    download here the not signed PDF version
                  </a>{" "}
                  in case you need it
                </li>
              </ul>
            </div>
            <div className="d-flex justify-content-center align-items-center p-2">
              <button
              className=""
              style={{background:"#489767",padding:"10px 30px",color:"#fff",border:"none"}}
                type="button"
                onClick={(e) => {
                  closeModal("");
                  window.location.reload()
                }}
              >Ok and close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default DocuGenerator;
