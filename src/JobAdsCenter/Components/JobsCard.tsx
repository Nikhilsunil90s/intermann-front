import React from "react";
import { useNavigate } from "react-router";
export default function JobsCard({bg}){
  const navigate = useNavigate()

    return(<>
    <div className="row p-1 jobCardBox" style={{background:bg == "active"? "#EDF7FF" : "#FFE0E0"}}>
        <div className="col-4 bgW" style={{background:bg === "active" ? "#fff" : "#F3F3F3"}}>#45535</div>
        <div className="col-4 bgW"  style={{background:bg === "active" ? "#fff" : "#F3F3F3"}} > MACON / ZIDAR</div>
        <div className="col-4 bgW"  style={{background:bg === "active" ? "#fff" : "#F3F3F3"}}> x leads aquired</div>
        <div className="col-7 bgWH " style={{background:bg === "active" ? "#fff" : "#F3F3F3"}} >Importance : ⭐⭐⭐⭐⭐</div>
        <div className="col-4 bgWH " style={{background:bg === "active" ? "#fff" : "#F3F3F3"}} >Price by lead : x €</div>
        <div className="col-12 mt-1"><p className="mb-0 CardcontantText">DULGHER
Intermann este în căutare de personal calificat pentru dulgher/tamplar polivalent .
﻿Cerințe:
Experiență în domeniu minim 5 ani 
Permis de conducere cat.B - constituie un avantaj;
Spirit de echipa;
Responsabilitate, seriozitate, implicare.
Condiții:
Program de lucru full-time;
Contract de muncă pe o perioadă determinată de 6 luni cu posibilitatea de prelungire;
Transport România-Franța asigurat gratuit;
Cazarea asigurata gratuit in locuinte curate in apropierea locului de munca;
Concedii conform legislației romane in vigoare;
Orele suplimentare se plătesc separat;
Salariul de pornire 2800 EURO/pe lună net  pentru 43h/pe săptămână, la care se adaugă plata orelor suplimentare;
Responsabilități:
Activitate de citire planul,tăiere  si montare cadru pentru case conform fișei postului.</p></div>
<div className="col-12 mt-1">
    <div className="row">
<div className="col-4 px-0 d-flex justify-content-end"><button className=" EditJobAd" onClick={()=>navigate("/JobAdsCenter/EditPage")}>Edit This Ad</button></div>
    <div className="col-6 d-flex justify-content-end"><button className=" EditJobAd " style={{background:"#fff" ,color:"#000",width:"100%",border:"1px solid #CCCCCC"}}>Move to Inactive</button></div>
    <div className="col-2 pl-0"><button className="deleteAd" ><img   src={require("../../images/Deletebucket.svg").default}  /></button></div>
    </div>
    </div>
    </div>
    </>)
}