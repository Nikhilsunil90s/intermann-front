import React from "react";
import { API_BASE_URL } from "../../config/serverApiConfig";

function  GetRoute(props:any){

}

export  const  PostRoute=async(data,path)=>{
   return   await fetch(API_BASE_URL +path,{
        method: "POST",
        headers: {
          "Accept": 'application/json',
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + localStorage.getItem('token')
        },
        body:JSON.stringify(data)
       })
       .then(res=>res.json())
       .then(res=>res)
       .catch(err=>err)
}