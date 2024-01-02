import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../config/serverApiConfig";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

function UploadCofaceModal(props) {
    const hiddenDocumentInput = React.useRef(null);
    const [isFileUploading, setIsFileUploading] = useState(false);

    const handleDocumentUpload = () => {
        hiddenDocumentInput.current.click();
    }

    const notifyDocumentUploadError = () =>
        toast.error("Document Upload Failed! Please Try Again in few minutes.");
    const notifyDocumentUploadSuccess = () =>
        toast.success("Document Uploaded Successfully!");

    const fileChange = (
        e: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | any
        >
      ) => {
        if (e.target.name === "document") {
          const fileUploaded = e.target.files[0];
          let formdata = new FormData();
          formdata.append("leadId", props.props._id);
          formdata.append("document", fileUploaded);
          setIsFileUploading(true);
          axiosInstance
            .post("uploadCoface", formdata, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + Cookies.get("token"),
              },
            })
            .then((datares) => {
              if (datares.data.status) {
                // setCandidatImage(datares.data.filename)
                setIsFileUploading(false);
                notifyDocumentUploadSuccess();
                props.setUpdate(true);
                props.closeModal(false);
              } else {
                notifyDocumentUploadError();
                setIsFileUploading(false);
              }
            })
            .catch((err) => {
              setIsFileUploading(false);
            });
          return;
        }
      };
    return (<>
        <div className="modal d-block" style={{ backgroundColor: "#00000052" }} id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div
                className="modal-dialog modal-sm" style={{ maxWidth: "1198px", top: '25%' }}>
                <div className="modal-content">
                    <div className="modal-header p-0">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-8 px-0 clientArchivedModal-font">
                                    <h2 className="modal-title  py-1 pRight" id="staticBackdropLabel">Upload Coface</h2>
                                </div>
                                <div className="col-4 text-end d-flex align-items-center">
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => props.closeModal(false)}></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-body scrollbarModal text-start">
                    {
                      isFileUploading ? 
                      <div className="d-flex justify-content-center overflow-hidden">
                        <div
                          className="spinner-border text-warning"
                          role="status"
                          style={{ height: "100px", width: "100px" }}
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                      : 
                      <div className="mb-0 text-center p-3">
                        <button className="cofaceUploadBtn p-2 rounded-pill border-1 shadow-lg" type="button" onClick={handleDocumentUpload} >UPLOAD COFACE FOR THIS LEAD</button>
                        <input
                          type="file"
                          ref={hiddenDocumentInput}
                          onChange={fileChange}
                          name="document"
                          style={{ display: "none" }}
                        />
                      </div>
                    }
                        
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default UploadCofaceModal;