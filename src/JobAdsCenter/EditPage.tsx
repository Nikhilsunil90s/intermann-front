import React from "react";
import Select, { StylesConfig } from "react-select";
import {Link} from "react-router-dom"
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
export default function EditReaserch(){


    return(<>
     <div className="container-fluid">
        <div className="row">
        <div className="col-12 mt-2" style={{background:"#ffff",borderRadius:"10px"}}>
                    <Link to='/JobAdsCenter' className="downLoadCenter p-1 d-flex">
                    <img src={require("../images/return.svg").default} />
                    <h3 className="pl-1 mb-0">Edit Research </h3>
                    </Link >
                </div>
                <div className="col-12 mt-2 p-1" style={{background:"#ffff",borderRadius:"10px"}}>
                 <div className="row">
                    <div className="col-4">
                        <label className="Form-styling" >select contry market (select) </label>
                        <input
                        type="text"
                        style={{fontSize:"12px"}} className="form-control nameTransform"
                        placeholder="select contry market"
                        id="validationCustom01"
                        name="candidatName"
                    required
                     
                      />
                      <span className="text-small">Options are France; Suisse; Romania (select is enough) required*</span>
                    </div>
                    <div className="col-4">
                    <label className="Form-styling">Job name in french</label>
                    <input
                        type="text"
                        style={{fontSize:"12px"}} className="form-control nameTransform"
                        placeholder="Job Name"
                        id="validationCustom01"
                        name="candidatName"

                      />
                      <span className="text-small">Options are France; Suisse; Romania (select is enough) required*</span>

                    </div>
                    <div className="col-4">
                    <label className="Form-styling">Job name in romanian</label>
                    <input
                        type="text"
                        style={{fontSize:"12px"}} className="form-control nameTransform"
                        placeholder="Job Name"
                        id="validationCustom01"
                        name="candidatName"

                      />
                      <span className="text-small">Options are France; Suisse; Romania (select is enough) required*</span>

                    </div>
                    <div className="col-4 mt-1">
                    <label className="Form-styling">importance </label>
                    <Select
                                name="market"
                                closeMenuOnSelect={true}
                                placeholder="‎ ‎ ‎ ‎ ‎  ‎ Importance"
                                className="basic-multi-select"
                                classNamePrefix="select"
                                // onChange={handleEmailChange}
                                // options={email}
                                // styles={colourStyles}
                              />
                    </div>
                    <div className="col-4 mt-1">
                        <label className="Form-styling">link a client to this ad (client selector) </label>
                        <Select
                                name="market"
                                closeMenuOnSelect={true}
                                placeholder="‎ ‎ ‎ ‎ ‎  ‎ link a client to this ad"
                                className="basic-multi-select"
                                classNamePrefix="select"
                                // onChange={handleEmailChange}
                                // options={email}
                                // styles={colourStyles}
                              />
                      <span className="text-small">Options are Facebook; TikTok; SEO; Google Ads; Ejob; Jooble; Olx; Public21; Income Call; Undefined; Taboola; Outbrain; Other; Snapchat; SMS lead (select is enough) required*</span>
                    </div>
               
             
                    <div className="col-12 d-grid mt-1">
                        <label className="Form-styling">text area for job descrption</label>
                        <div className="mb-1 " style={{border: "1px solid #e5e5e5",borderRadius:"10px"}}>
                        <Editor
//   editorState={editorState}
  toolbarClassName="toolbarClassName"
  wrapperClassName="wrapperClassName"
  editorClassName="editorClassName"
  
//   onEditorStateChange={this.onEditorStateChange}
/>
</div>
                    </div>
                    <div className="col-12 d-flex justify-content-end mt-2">
                            <button className="BtnLeads">
                            add this reaserch
                            </button>
                        
                    </div>
                 </div>
                    </div>
        </div>
    </div>
    </>)
}