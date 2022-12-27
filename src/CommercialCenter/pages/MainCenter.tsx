import React,{useState,useEffect} from "react";
import Filter from '../components/Filter'
import Header from "../components/Header";
import LeadCard from "../components/LeadsCard";
import { API_BASE_URL } from "../../config/serverApiConfig";
import { motion } from "framer-motion";
import Warning from '../../components/Loader/SearchBarError' 

function MainCenter(){

    const [Leads,setLeads]=useState([])
    const [update,setUpdate]=useState(false)
    const [loader,setLoader]=useState(false)
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
            setUpdate(false)
            setLoader(true)
         }else{
            setUpdate(false)
            setLeads([])
            setLoader(true)

         }
      })
      .catch(err => err)
    }

    useEffect(()=>{
        fetchLeads()
    },[update])
    return(<>
     <section className="" style={{marginTop:"90px"}}>
        <div className="px-1">
        <Header   />
      
        </div>
        <div
                className="container-fluid">
        <div className="row px-1">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ rotate: 0, scale:1}}
              transition={{
                type: "spring",
                stiffness: 30,
                damping: 15
              }} 
               className="col-12 p-1 my-1" style={{background:"#ffff",borderRadius:"22px"}}>
            <Filter   />
            </motion.div>
            <div className="col-12 py-1 px-2 my-1" style={{background:"#ffff",borderRadius:"22px"}}>
              <div className="row">
              <div className="col-8">
                <p className="LeadsTopHeading">Leads à traiter</p>
                </div>
                <div className="col-4 d-flex align-items-center justify-content-end">
                <p className="TotalLeads">Il y a {Leads.length} leads en tout , et nouveaux leads non contacté</p>
                </div>
                </div>
                {
                  loader ?
                    Leads.length > 0 ?
                     Leads.map((el,i)=>(
                      <LeadCard props={el} key={i} length={i} update={setUpdate} />

                     ))
                     :
                     <>
                      <div className="col-12 my-2 d-flex align-items-center justify-content-center">
                      <Warning  /> 
                     <p 
                     className="TotalLeads mb-0" style={{fontSize:"15px"}}>No Leads!!</p>
                     </div>
                     </>
                      :
                      <div className="col-12 my-2 d-flex align-items-center justify-content-center">
                      <span className="Leads002"></span>
                      </div>
                }
            </div>
        </div>
    </div>
    </section>
    </>)
}
export default MainCenter;