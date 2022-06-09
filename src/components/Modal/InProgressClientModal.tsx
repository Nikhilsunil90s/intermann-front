import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config/serverApiConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function InProgressClientModal({ props, closeModal }) {
    console.log(props)

    const navigate = useNavigate();

    const notifyMoveSuccess = () => toast.success("Moved Client to In-Progress Successfully!");

    const notifyMoveError = () => toast.error("Not Moved To In-Progress");

    const moveToInProgress = async (data: any) => {
        return await fetch(API_BASE_URL + "moveClientToInProgress", {
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

    const saveFormData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let data = { clientId: props._id, clientCompanyName: props.clientCompanyName, clientJob: props.clientJob }
        moveToInProgress(data)
            .then((resp) => {
                console.log(resp)
                closeModal(false);
                notifyMoveSuccess();
                setTimeout(function () {
                    // window.location.href = "/clientToDo";
                    navigate("/dashboard");
                },
                    2000
                );
            })
            .catch(err => {
                console.log(err)
                notifyMoveError();
            })
    }

    return (<>

        <div className="modal d-block" style={{ backgroundColor: "#00000052" }} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel">
            <div className="modal-dialog modal-lg">
                <div className="modal-content padding-full">
                    <div className="text-end">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { closeModal(false) }}></button>
                    </div>
                    <h2 className="modal-title pRight" id="staticBackdropLabel">Move {props.clientCompanyName} to <span className="col-spl">IN-PROGRESS</span> </h2>
                    <form onSubmit={saveFormData}>
                        <div className="modal-body text-start">
                            <div>
                                This status means that we strated active reseach on this client and we will spend
                                money on this research.
                            </div>
                            <div className="col-12 text-center pt-3">
                                <div className="row ">
                                    <div className="col-2"></div>
                                    <div className="col-8">
                                        <button
                                            style={{
                                                borderRadius: "8px", backgroundColor: "#A461D8", width: "100%", fontFamily: 'Inter',
                                                fontStyle: "normal",
                                                fontWeight: "700",
                                                fontSize: "20px",
                                                lineHeight: "16px", color: "white", border: "unset"
                                            }}
                                            type="submit"
                                        >
                                            <p><b>I Confirm. <br />Move this lead/client to in Progress status.</b></p>
                                        </button>
                                    </div>

                                    <div className="col-2"></div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>)
}
export default InProgressClientModal;