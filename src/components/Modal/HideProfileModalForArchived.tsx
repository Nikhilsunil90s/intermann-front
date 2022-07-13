import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { API_BASE_URL } from "../../config/serverApiConfig";
import "../../CSS/Client/ArchivedCardClient.css"
function HideProfile({ props, closeModal, path }) {

    console.log(props);

    const navigate = useNavigate();
    const [reasonToArchive, setReasonToArchive] = useState([]);
    const [clientId, setClientId] = useState(props._id);
    const [clientJobName, setClientJobName] = useState(props.clientJob);

    const notifyMoveSuccess = () => toast.success("Client Archived Successfully!");
    const notifyMoveError = () => toast.error("Cannot Archive Client Yet! Please try Again.");

    let data = {
        clientId,
        reasonToArchive,
        clientJobName
    }

    const onFormDataChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | any
        >
    ) => {
        if (e.target.name === 'reasonToArchive') {
            console.log(e.target.name, e.target.value);
            setReasonToArchive(e.target.value);
        }
    }

    const ArchiveClient = async () => {
        console.log(data);
        return await fetch(API_BASE_URL + "moveClientToArchived", {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify(data),
        })
            .then(resp => resp.json())
            .then(reD => (reD))
            .catch(err => err)
    }

    const sendArchiveRequest = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(data);
        ArchiveClient().then((resdata) => {
            console.log(resdata)
            closeModal(false);
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
                    <h2 className="modal-title  py-1 pRight" id="staticBackdropLabel">Hide This {props.clientCompanyName} <span className="" style={{color:"#ff0000",marginLeft:"5px"}}> Profile.</span> </h2>
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
                         Candidate Name :   {props.candidatName}
                        </p>
                        <form onSubmit={sendArchiveRequest}>
                            <div className="col-12 text-center mt-1">
                                <div className="row ">
                                    <div className="col-12 d-flex justify-content-end">
                                        <button
                                            type="submit"
                                         className="btnHide-ArchivedModal"
                                         style={{backgroundColor:"#FF0000"}}
                                        >Please Confirm..</button>
                                    </div>

                                


                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default HideProfile;