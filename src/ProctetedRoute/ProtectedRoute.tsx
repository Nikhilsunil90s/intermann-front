import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import Cookies from 'js-cookie'

function PrivateRoute(props){
    const {Component}=props
    const navigate = useNavigate()
useEffect(()=>{
    let login =  Cookies.get("token")
    if(!login){
       navigate("/")
    }
})
return(
    <>
    <Component />
    </>
)

}
export default PrivateRoute;