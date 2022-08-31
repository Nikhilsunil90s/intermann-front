import React,{useEffect, useState,useRef} from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../config/serverApiConfig";
import { useNavigate } from "react-router-dom";
import { call } from "redux-saga/effects";


export default function SearchModal({props,closeModal}){


    const navigate = useNavigate()



    const ref = useRef();
  
        useOnClickOutside(
            
            ref, () =>setTimeout(()=>{ closeModal(false)},1000)
            );



    function useOnClickOutside(ref, handler) {

        useEffect(
          () => {


       
            const listener = (event) => {
              if (!ref.current || ref.current.contains(event.target)) {
                return;
              }
              handler(event);
            };
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
            return () => {
              document.removeEventListener("mousedown", listener);
              document.removeEventListener("touchstart", listener);
            };
        
            },
          [ref, handler]
        );
      }
    

    const ListPage=(data)=>{
        if(data.candidatName){
         if(data.candidatStatus =="To-Do"){
          navigate("/todolistCard",{state:data})
 
         }
         if(data.candidatStatus =="In-Progress"){
          navigate("/embauchlistCard",{state:data})
    
        }
        if(data.candidatStatus =="Archived"){
          navigate("/archivedlistCard",{state:data})
        }
        if(data.candidatStatus == "Pre-Spropsected"){
          navigate("/preSpropsectGlobalList",{state:data})
        }
        }
      else if(data.clientCompanyName){
        if(data.jobStatus =="To-Do"){
          navigate("/todoClientlistCard",{state:data})
         }
         if(data.jobStatus =="In-Progress"){
          navigate("/ClientGLProgressList",{state:data})
    
        }
        if(data.jobStatus =="Archived"){
          navigate("/clientarchivedGlobalList",{state:data})
        }
        if(data.jobStatus == "Signed Contract"){
          navigate("/clientSignedGlobalCard",{state:data})
        }
    
        }
    }
    
    

return(<>
  <div className="col-12 d-flex pb-1 cursor-pointer" onClick={()=>ListPage(props)} ref={ref}> 
              <div className="row">
              <div className="col-2">
               <img  src={require("../../images/mencard.svg").default}  />
                </div>
                <div className="col-3 nameCard">
                 <p className="mb-0">{props.candidatName ? props.candidatName.length > 16 ?  props.candidatName.slice(0,15) + "..." : props.candidatName:  props.clientCompanyName ?  props.clientCompanyName.length > 16 ? props.clientCompanyName.slice(0,15) + "..." : props.clientCompanyName: "No Card!"}</p>
                  </div>
                  <div className="col-3 nameCard ml-1">
                    <p className="mb-0">{props.candidatActivitySector ? props.candidatActivitySector.length > 16 ?  props.candidatActivitySector.slice(0,15) + "..." :  props.candidatActivitySector : props.clientJob ? props.clientJob.length > 16 ? props.clientJob.slice(0,15) : props.clientJob : "No Job!"}</p>
                    </div>
                        
                  <div className="col-3 nameCardbtn ml-1">
              
              {
                props.candidatStatus == "To-Do" || props.jobStatus == "To-Do" ?
                <button className="todoBtnStyleCard p-0" >
                To Do
              </button>
              :
              props.candidatStatus == "In-Progress" || props.jobStatus == "In-Progress" ?
             
            <button className="EmbaucheCardSearchBtn p-0">IN PROGRESS</button>

              :
              props.candidatStatus == "Archived" || props.jobStatus == "Archived"?
             
              <button className="ArchivedCardSearchBtn p-0">Archive</button>
            
             :
            props.jobStatus == "Signed Contract" ?
            <button className="SignedClientBtn">SIGNED CONTRACT</button>

            :
            props.candidatStatus == "Pre-Spropsected"?
            <button className="prpropsargebtn">
            PRE SpropsECTED
          </button>
          :
          null}
</div>
          </div>
          </div>
   </>)
} 