import React,{useState,useEffect} from "react";
import Filter from '../components/Filter'
import Header from "../components/Header";
import LeadCard from "../components/LeadsCard";
import { API_BASE_URL } from "../../config/serverApiConfig";
import { motion } from "framer-motion";

function MainCenter(){

    const [Leads,setLeads]=useState([])

  const  fetchLeads=async()=>{
    //  setLeadScHeck(false)
     
    await fetch(API_BASE_URL + `getAllCommercialLeads`,{
      method: "GET",
      headers: {
        "Accept": 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
    })
      .then(red => red.json())
      .then(resData => {
         if(resData.status){
            setLeads([...resData.data])
        console.log(resData)
        
         }else{
         
            setLeads([])
      

         }
      })
      .catch(err => err)
    }

    useEffect(()=>{
        fetchLeads()
    },[])
    return(<>
     <section className="" style={{marginTop:"90px"}}>
        <div className="px-1">
        <Header   />

        </div>
        <motion.div
                  initial={{ scale: 0 }}
                  animate={{ rotate: 0, scale:1}}
                  transition={{
                    type: "spring",
                    stiffness: 30,
                    damping: 15
                  }} className="container-fluid">
        <div className="row px-1">
            <div className="col-12 p-1 my-1" style={{background:"#ffff",borderRadius:"22px"}}>
            <Filter   />
            </div>
            <div className="col-12 py-1 px-2 my-1" style={{background:"#ffff",borderRadius:"22px",overflowX:"scroll"}}>
                <p className="LeadsTopHeading">Leads à traiter</p>
                {
                    Leads.length > 0 ?
                     Leads.map((el,i)=>(
                      <LeadCard props={el} key={i} length={i}  />

                     ))
                     :
                     <>
                     <p>Please Wait!!</p>
                     </>
                }
            </div>
        </div>
    </motion.div>
    </section>
    </>)
}
export default MainCenter;