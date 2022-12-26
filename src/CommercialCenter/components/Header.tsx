import React,{useState} from "react";
import { useNavigate } from "react-router";
import '../CSS/Commercial.css'

export default function  Header (){

    const [CurrentPath]=useState(window.location.href)

    const navigate = useNavigate()
    return(<>
    <div className="container-fluid">
        <div className="row headerCommercial" >
            <div className="col-8">
                <p className="mb-0">{CurrentPath.includes("commercialCenter") ? "commercial center" : "Ajouter un lead"}</p>
                <span className="mb-0">{CurrentPath.includes("commercialCenter") ? "Gestion commercial des leads clients avec Patrick Roggy" : "Gestion commercial des leads clients avec Patrick Roggy"}</span>
            </div>
            <div className="col-4 d-flex justify-content-end align-items-center" >
<button className="btnAddLeads" onClick={()=>navigate(CurrentPath.includes("/commercialCenter/AddLeads")  ? "/commercialCenter" : "/commercialCenter/AddLeads")} >{CurrentPath.includes("commercialCenter/AddLeads") ?  "Switch To Leads": "ADD LEADS"}</button>
            </div>
        </div>
    </div>
    </>)
}