import React from "react";
import { API_BASE_URL } from "../../config/serverApiConfig";

const header ={
  "Accept": 'application/json',
  'Content-Type': 'application/json',
  "Authorization": "Bearer " + localStorage.getItem('token')
}
export const   GetRoute =async(path)=>{
  return   await fetch(API_BASE_URL +path,{
    method: "GET",
    headers:header ,
   })
   .then(res=>res.json())
   .then(res=>res)
   .catch(err=>err)
}

export  const  PostRoute=async(data,path)=>{
   return   await fetch(API_BASE_URL +path,{
        method: "POST",
        headers: header,
        body:JSON.stringify(data)
       })
       .then(res=>res.json())
       .then(res=>res)
       .catch(err=>err)
}