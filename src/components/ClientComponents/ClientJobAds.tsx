import React, { useState } from "react";
import parse from 'html-react-parser';

export default function ClientJobsCard({bg,props}){
 let Text =props.adDescription ;
    return(<>
    <div className="row p-1 jobCardBoxClient" style={{background:bg == "progress"? "#F4E7FF" : "#E4FFEF",borderRight:`2px solid ${bg === "progress"?"#A461D8" : "#489767"}`}}>
        <div className="col-4 bgW" style={{background:bg === "progress" ? " #ffffff" : "#ffffff"}}>
            {"#"+props._id.slice(props._id.length - 5).toUpperCase()}
            </div>
        <div className="col-4 bgW cursor-pointer"  style={{background:bg === "progress" ? " #ffffff" : "#ffffff"}}  data-bs-toggle="tooltip" data-bs-placement="bottom" 
        title={props.adNameFrench.toLocaleUpperCase()+ "/" + props.adNameRomanian.toLocaleUpperCase()}
    >
             {props.adNameFrench !== "" ? props.adNameFrench.length > 5 ? props.adNameFrench.slice(0,5).toLocaleUpperCase() :  props.adNameFrench.toLocaleUpperCase() : "no"}/{props.adNameRomanian !== "" ?  props.adNameRomanian.length > 5 ?  props.adNameRomanian.slice(0,4).toLocaleUpperCase() + ".." : props.adNameRomanian.toLocaleUpperCase(): "no"}
             
             </div>
        <div className="col-4 bgW"  style={{background:bg === "progress" ? " #ffffff" : "#ffffff"}}> x leads aquired</div>
        <div className="col-7 bgWH " style={{background:bg === "progress" ? " #ffffff" : "#ffffff"}} >Importance:
        {props.adImportance === 0 ? "⭐" :props.adImportance === 1 ? "⭐⭐" : props.adImportance === 2 ? "⭐⭐⭐"  : props.adImportance === 3 ? "⭐⭐⭐⭐":  "⭐⭐⭐⭐⭐" } 
        </div> 
        <div className="col-4 bgWH " style={{background:bg === "progress" ? " #ffffff" : "#ffffff"}} >Price by lead :
         {props.leadPriceForAd ? props.leadPriceForAd : "0"}
         €
         </div>
        <div className="col-12 mt-1 jobCardContentScroll" style={{height:"209px",borderTop:"1px solid #ffff"}} ><p className="mb-0 py-1  CardcontantText d-grid" style={{cursor:"s-resize"}}  data-bs-toggle="tooltip" data-bs-placement="bottom"  title="Please Scroll">
            {parse(Text)}
            </p></div>


    </div>
    </>)
}