import React, { useState } from "react";
import Header from "../components/Header";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../../config/serverApiConfig";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
export default function AddLeads() {
  const [data, setData] = useState({
    companyName: "",
    phoneNumber1: "",
    phoneNumber2: "",
    email: "",
    companyNote: "",
    agencyNote: "",
  });
  const [btn, setBtn] = useState(false);

  const onInputFormChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const SubmitForm = async (e) => {
    setBtn(true);
    e.preventDefault();
    await fetch(API_BASE_URL + "addCommercialLead", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status) {
          setBtn(false);
          toast.success(res.message);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          // toast.error(res.message)
          // setBtnDS(false)
          toast.error(res.message);
          setBtn(false);
        }
      })
      .catch((err) => err);
  };

  return (
    <>
      <Toaster
        position="top-right"
        containerStyle={{ zIndex: "99999999999999" }}
      />
      <section className="px-1" style={{ marginTop: "90px" }}>
        <Header />
        <div className="container-fliud">
          <div className="row px-1">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 30,
                damping: 15,
              }}
              className="col-12 mt-2 p-1"
              style={{ background: "#ffff", borderRadius: "10px" }}
            >
              <form className="row" onSubmit={(e) => SubmitForm(e)}>
                <div className="col-4">
                  <label className="Form-styling">Nom de la société </label>

                  <input
                    type="text"
                    style={{ fontSize: "12px", border: "2px solid #f4f4f4" }}
                    className="form-control nameTransform"
                    placeholder="Nom de la société"
                    name="companyName"
                    onChange={onInputFormChange}
                  />
                </div>
                <div className="col-4">
                  <label className="Form-styling">Telephone 1 </label>
                  <input
                    type="number"
                    style={{ fontSize: "12px", border: "2px solid #f4f4f4" }}
                    className="form-control nameTransform"
                    placeholder="Telephone 1"
                    name="phoneNumber1"
                    onChange={onInputFormChange}
                  />
                </div>
                <div className="col-4">
                  <label className="Form-styling">Telephone 2 </label>
                  <input
                    type="number"
                    style={{ fontSize: "12px", border: "2px solid #f4f4f4" }}
                    className="form-control nameTransform"
                    placeholder="Telephone 1"
                    id="phone_Number"
                    name="phoneNumber2"
                    onChange={onInputFormChange}
                  />
                </div>
                <div className="col-8 mt-1">
                  <label className="Form-styling">Note du client</label>
                  <textarea
                    name="companyNote"
                    style={{ fontSize: "12px", border: "2px solid #f4f4f4" }}
                    onChange={onInputFormChange}
                    className="form-control nameTransform"
                    placeholder="Note du client"
                  ></textarea>
                </div>
                <div className="col-4 mt-1">
                  <label className="Form-styling">Email </label>
                  <input
                    type="text"
                    style={{ fontSize: "12px", border: "2px solid #f4f4f4" }}
                    className="form-control nameTransform"
                    placeholder="Email"
                    id="email"
                    name="email"
                    onChange={onInputFormChange}
                  />
                </div>

                <div className="col-12 d-grid mt-1">
                  <label className="Form-styling">Note de l’agence</label>
                  <textarea
                    name="agencyNote"
                    style={{ fontSize: "12px", border: "2px solid #f4f4f4" }}
                    onChange={onInputFormChange}
                    className="form-control nameTransform"
                    placeholder="Note de l’agence "
                  ></textarea>
                </div>
                <div className="col-12 d-flex justify-content-end mt-2">
                  <button
                    type="submit"
                    className="btnAddLeads"
                    style={{
                      background: btn ? "#383839" : "",
                      color: btn ? "#ffff" : "",
                    }}
                    disabled={btn}
                  >
                    Ajouter le lead
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
