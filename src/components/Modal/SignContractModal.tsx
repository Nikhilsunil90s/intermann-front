import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config/serverApiConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function SignedClientModal({ props, closeModal }) {
    console.log(props)

    const navigate = useNavigate();

    const notifyMoveSuccess = () => toast.success("Moved Client to Signed Contract Status Successfully!");

    const notifyMoveError = () => toast.error("Not Signed Yet!");

    const moveToSigned = async (data: any) => {
        return await fetch(API_BASE_URL + "moveClientToSigned", {
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
        let data = { clientId: props._id, clientJob: props.clientJob }
        moveToSigned(data)
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
                    <div className="col-12 " style={{borderBottom:"1px solid #d2d2d2"}}>
                        <div className="row mb-1" >
                            <div className="col-8 clientArchivedModal-font">
                    <h2 className="modal-title " id="staticBackdropLabel">Move to Signed Contract</h2>
                    </div>
                    <div className="col-4 text-end">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { closeModal(false) }}></button>
                        </div>
                    </div>
                    </div>
                    <form onSubmit={saveFormData}>
                        <div className="modal-body text-start mt-1">
                            <div className="text-center">
                                Move {props.clientCompanyName} to Signed Contract Status ?
                            </div>
                            <div className="col-12 text-center pt-3">
                                <div className="row ">
                                    <div className="col-2"></div>
                                    <div className="col-9">
                                        <button
                                            className="btn btn-success"
                                            style={{
                                                borderRadius: "8px", width: "100%", fontFamily: 'Inter',
                                                fontStyle: "normal",
                                                fontWeight: "600",
                                                fontSize: "18px",
                                                lineHeight: "26px", color: "white", border: "unset"
                                            }}
                                            type="submit"
                                        >
                                            <p className="mb-0">I Confirm. <br />Move this lead/client to Signed Contract status.</p>
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
export default SignedClientModal;