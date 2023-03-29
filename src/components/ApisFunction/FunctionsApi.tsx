import React from "react";
import { API_BASE_URL } from "../../config/serverApiConfig";
import Cookies from 'js-cookie'

export const   GetRoute =async(path)=>{
  return   await fetch(API_BASE_URL +path,{
    method: "GET",
    headers:{
      "Accept": 'application/json',
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + Cookies.get("token")
    }  ,
   })
   .then(res=>res.json())
   .then(res=>res)
   .catch(err=>err)
}
export const   GetRouteWithoutAuth =async(path)=>{
  return   await fetch(API_BASE_URL +path,{
    method: "GET",
    headers:{
      "Accept": 'application/json',
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + Cookies.get("token")
    } ,
   })
   .then(res=>res.json())
   .then(res=>res)
   .catch(err=>err)
}

export  const  PostRoute=async(data,path)=>{
   return   await fetch(API_BASE_URL +path,{
        method: "POST",
        headers: {
          "Accept": 'application/json',
          'Content-Type': 'application/json',
          "Authorization": "Bearer "+Cookies.get('token')
        },
        body:JSON.stringify(data)
       })
       .then(res=>res.json())
       .then(res=>res)
       .catch(err=>err)
}