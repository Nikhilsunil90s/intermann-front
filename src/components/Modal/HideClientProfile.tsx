import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { API_BASE_URL } from "../../config/serverApiConfig";
import "../../CSS/Client/ArchivedCardClient.css"
function HideClientProfile({ props, closeModal, path }) {

    console.log(props);

    const navigate = useNavigate();
    const [ClientId, setClientId] = useState(props._id);

    const notifyMoveSuccess = () => toast.success("Candidat Hidden Successfully!");
    const notifyMoveError = () => toast.error("Cannot Hide Candidat! Please try Again.");

    let data = {
        ClientId,
    }

    const HideProfile = async () => {
        console.log(data);
        return await fetch(API_BASE_URL + "moveClientToToDo", {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify(data),
        })
            .then(resp => resp.json())
            .then(reD => reD)
            .catch(err => err)
    }

    const sendHideRequest = () => {
        console.log(data);
        HideProfile().then((resdata) => {
            console.log(resdata)
            setTimeout(function () {
                if (path == "/embauchlist") {
                    window.location.href = path;
                }
                else if (path == "/clientToDo") {
                    window.location.href = "/clientToDo";
                } else {
                    window.location.href = "/dashboard";
                }

            }, 2000);
            notifyMoveSuccess();
        })
            .catch(err => {
                console.log(err)
                notifyMoveError();
            })
    }

    return (<>

        <div className="modal d-block" style={{ backgroundColor: "#00000052" }} id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header p-0">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-8 px-0 clientArchivedModal-font">
                    <h2 className="modal-title  py-1 pRight" id="staticBackdropLabel">Confirm Hide Profile :  <span className="" style={{color:"#ff0000",marginLeft:"5px"}}> {props.clientCompanyName}</span> </h2>
                    </div>
                    <div className="col-4 text-end d-flex align-items-center">
                    <button type="button" className="btn-close" onClick={() => closeModal(false)} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    </div>
                    </div>
                    </div>
                    <div className="modal-body text-start">
                        <p style={{
                            fontFamily: 'Poppins',
                            fontStyle: "normal",
                            fontWeight: "700",
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "#000000"
                        }}>
                         Client Name :   {props.clientCompanyName}
                         <br></br>
                        </p>
                        <p className="text-center">
                         Hiding Profile will make it invisible in Lists.

                        </p>
                            <div className="col-12 text-center mt-1">
                                <div className="row ">
                                    <div className="col-12 d-flex justify-content-end">
                                        <div className="col-6 d-flex">
                                        

                                        </div>
                                        
                                        <div className="col-6 d-flex">
                                        <button
                                         className="btnHide-ArchivedModal"
                                         onClick={sendHideRequest}
                                         style={{backgroundColor:"#FF0000"}}
                                        >Hide</button>
                                        <button
                                         className="btnHide-ArchivedModal"
                                         style={{backgroundColor:"#FF0000", color: 'black', marginLeft: "10px"}}
                                         onClick={() => {closeModal(false)}}
                                        >Cancel</button>
                                        </div>
                                    </div>
                                    
                                


                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default HideClientProfile;