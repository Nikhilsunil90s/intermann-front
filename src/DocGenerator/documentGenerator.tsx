import React, { useEffect, useState, useRef } from "react";
import DGHeader from "./components/Header";
import "./CSS/docGenerator.css";
import { Form, FormControl, Button } from "react-bootstrap";
import { API_BASE_URL } from "../config/serverApiConfig";
import { Toaster, toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { Calendar } from "react-date-range";
import format from "date-fns/format";
import DocuGenerator from "../components/Modal/DocuGenerator/DocuGenerator";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";


function DocumentGenerator() {
  const calendarRef = useRef(null);
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    telephone: "",
    identity: "",
    document_title: "",
    document_content: "",
    document_lieu: "",
    generated_on: "",
  });
  const [docuID, setDocuId] = useState("");
  const notifyFormSubmitSuccess = () =>
    toast.success("Document Data Submit Successfully!");

  const notifyFormSubmitError = () =>
    toast.error("Document Data Submit Failed! Please Try Again.");

  const handleFormDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event: any) => {
    setDisableSubmitBtn(true);
    event.preventDefault();
    submitFormData()
      .then((data) => {
        console.log(data);
        if (data.status) {
          setDocuId(data.documentId);
          notifyFormSubmitSuccess();
          setDisableSubmitBtn(false);
        } else {
          notifyFormSubmitError();
          setDocuId("");
          setDisableSubmitBtn(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitFormData = async () => {
    return await fetch(API_BASE_URL + "addDocumentDetails", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((reD) => reD)
      .catch((err) => err);
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, ["generated_on"]: format(date, "dd-MM-yyyy") });
    setOpenCalendar(false);
  };

  //utils

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpenCalendar(false);
    }
  };
  const hideOnClickOutside = (e) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if (calendarRef.current && !calendarRef.current.contains(e.target)) {
      setOpenCalendar(false);
    }
  };

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  return (
    <div>
      <Toaster
        position="top-right"
        containerStyle={{ zIndex: "99999999999" }}
      />
      {/* Header */}
      <div className="DG_Header">
        <DGHeader />
      </div>

      {/* Form */}
      <div className="col-12 docGenForm">
        <Form>
          <div className="row docRow">
            <Form.Group className="mb-3 col-4" controlId="formName">
              <Form.Label>Name Person / Company Name</Form.Label>
              <FormControl
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormDataChange}
                placeholder="Enter your name"
              />
            </Form.Group>

            <Form.Group className="mb-3 col-4" controlId="formTelephone">
              <Form.Label>Telephone Company / Person</Form.Label>
              <FormControl
                type="text"
                name="telephone"
                value={formData.telephone}
                onChange={handleFormDataChange}
                placeholder="Enter phone number"
              />
            </Form.Group>

            <Form.Group className="mb-3 col-4" controlId="formIdentity">
              <Form.Label>ID Person / Company Number</Form.Label>
              <FormControl
                type="text"
                name="identity"
                value={formData.identity}
                onChange={handleFormDataChange}
                placeholder="Enter ID"
              />
            </Form.Group>
          </div>

          <div className="row">
            <Form.Group className="mb-3 col-12" controlId="formDocumentContent">
              <Form.Label>Document Content</Form.Label>
              <div
                  className="mb-1 "
                  style={{ border: "1px solid #e5e5e5", borderRadius: "10px" }}
                >
                  <Editor
                    //   editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={(newState) => {
                      setFormData({
                        ...formData,
                        document_content: draftToHtml(
                          convertToRaw(newState.getCurrentContent())
                        ),
                      });
                    }}
                  />
                </div>
             
            </Form.Group>
          </div>

          <div className="row">
            <Form.Group className="mb-3 col-4" controlId="formDate">
              <Form.Label>Date</Form.Label>
              <input
                value={
                  formData.generated_on === ""
                    ? "DD/MM/YYYY"
                    : formData.generated_on
                }
                readOnly
                style={{ textTransform: "none" }}
                className="dateSortCal"
                onClick={() => setOpenCalendar((open) => !open)}
              />
              <div ref={calendarRef} className="rdrDateRangePickerWrapper">
                {openCalendar && (
                  <Calendar
                    onChange={(item) => handleDateChange(item)}
                    direction="vertical"
                    className="calendarElement"
                  />
                )}
              </div>
              <div
                onClick={() => setOpenCalendar((open) => !open)}
                className="d-flex justify-content-end eventPos"
              >
                <img alt="..." src={require("../images/event.svg").default} />
              </div>
            </Form.Group>

            <Form.Group className="mb-3 col-4" controlId="formLieu">
              <Form.Label>Where Document Made</Form.Label>
              <FormControl
                type="text"
                name="document_lieu"
                value={formData.document_lieu}
                onChange={handleFormDataChange}
                placeholder="Place where document made"
              />
            </Form.Group>

            <Form.Group className="mb-3 col-4" controlId="formTitle">
              <Form.Label>Document Title</Form.Label>
              <FormControl
                type="text"
                name="document_title"
                value={formData.document_title}
                onChange={handleFormDataChange}
                placeholder="Title of this Custom Document"
              />
            </Form.Group>
          </div>

          <div className="row">
            <div className="col-12 text-center">
              <button
                className="submit_doc_btn "
                onClick={(e) => handleFormSubmit(e)}
                disabled={disableSubmitBtn}
              >
                Generate Document
              </button>
            </div>
          </div>
        </Form>
      </div>
      {docuID && <DocuGenerator id={docuID} closeModal={setDocuId} />}
    </div>
  );
}

export default DocumentGenerator;
