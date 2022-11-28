import React,{useState,useEffect} from "react";
import {Link} from "react-router-dom"
import { Tabs, Tab } from "react-tabs-scrollable";
import "../CSS/JobsAdsCss/JobAdsList.css"
import JobsCard from "./Components/JobsCard";
import {API_BASE_URL} from ".././config/serverApiConfig"
import {toast,Toaster} from "react-hot-toast";
import ProfilesLoader from "../../src/components/Loader/ProfilesLoader"
import Warning from "../components/Loader/SearchBarError"
import { motion } from "framer-motion";

let TabName=""
let active=[]
let Inactive=[]
function JobAdsList (){
    const [activeTab, setActiveTab] = React.useState(0) as any;
    const [jobCardActive, setJobCardActive] = React.useState([])as any;
    const [jobCardInActive, setJobCardInActive] = React.useState([])as any;
    const [UpdateFiled,setUpdateField]=useState(false)
    const [activeStatus,setActiveStatus]=useState(false)
    const [InactiveStatus,setInActiveStatus]=useState(false)
    const [AllJobs,setAllJobs]=useState([])
    
    const [tabItems] = useState([
        {
          text: "FRANCE",
          value: "France",
        },
        {
          text: "SUISSE",
          value: "Suisse",
        },
        {
          text: "ROMANIA",
          value: "Romania",
        }
      ]) as any;
    
      const onTabClick = (e, index: any) => {
        setActiveTab(index);
         active=[]
         Inactive=[]
         setJobCardActive([])
         setJobCardInActive([])
         setActiveStatus(false)
         setInActiveStatus(false)
         setAllJobs([])
        const FolderName = tabItems.filter((el, i) => i == index);
        TabName =FolderName.map((el)=>(el.value))
        setUpdateField(true)
        fetchUsers(TabName)
        
      };
    
      
useEffect(()=>{
  if(AllJobs.length === 0 ){
  fetchUsers(TabName).then((resData)=>{
 
    {
      if(resData.status){
       setUpdateField(false)
       
       if(resData.data.length > 0){
        active=[]
        Inactive=[]
        setAllJobs([...resData.data])
        setUpdateField(false)
   
       }
    
      }else{
        setJobCardActive([])
        setJobCardInActive([])
       setUpdateField(false)
      }
   }
  
  
  })
  const FolderName = tabItems.filter((el, i) => i == activeTab);
  TabName =FolderName.map((el)=>(el.value))
 
    fetchUsers(TabName)
  }
  },[UpdateFiled])

  useEffect(()=>{
    if(AllJobs.length > 0 && jobCardActive.length === 0 && jobCardInActive.length ===0){
      active= AllJobs.filter((el)=>(
        el.adStatus === "Active"
         ))
        Inactive = AllJobs.filter((el)=>(
          el.adStatus !== "Active"
  
         ))
         setJobCardActive([...active])
         setJobCardInActive([...Inactive])
         setActiveStatus(true)
         setInActiveStatus(true)
    }else if(active.length > 0){
      setActiveStatus(true)
    }else if(Inactive.length > 0){
      setInActiveStatus(true)
    }else {
      if(AllJobs.length === 0 && active.length === 0 || AllJobs.length === 0 && Inactive.length === 0){
       
       setTimeout(()=>{
        setInActiveStatus(true)
        setActiveStatus(true)
       },3000) 
  
      }
     
    }

  },[AllJobs])

const  fetchUsers=async(TabName)=>{
return    await fetch(API_BASE_URL + `allAds/?market=${TabName}`,{
    method: "GET",
    headers: {
      "Accept": 'application/json',
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + localStorage.getItem('token')
    },
  })
    .then(red => red.json())
    .then(resData =>resData)
    .catch(err => err)
  }

    return(
        <>
    <Toaster     containerStyle={{zIndex:"999999999999999999"}}  position="top-right"/>

          <div className="container-fluid" >
        <div className="row">
          <div
            className="col-12 mt-2"
            style={{ background: "#ffff", borderRadius: "10px" }}
          >
            <div className="row">
              <div className="col-8">
                <div className="downLoadCenter p-1 ">
                  <h3 className="mb-0">JOB ADS CENTER</h3>
                </div>
              </div>
              <div className="col-4 d-flex justify-content-end align-items-center">
                <Link to="/JobAdsCenter/AddReaserch" className="BtnLeads">
                  + ADD AD REASERCH
                </Link>
              </div>
            </div>
          </div>
          <div
            className="col-12 mt-2 leadsTab"
            style={{ background: "#ffff", borderRadius: "10px" }}
          >
            <Tabs
              activeTab={activeTab}
              onTabClick={onTabClick}
              rightBtnIcon={">"}
              hideNavBtns={false}
              leftBtnIcon={"<"}
              showTabsScroll={false}
              tabsScrollAmount={2}
            >
              {/* generating an array to loop through it  */}
              {tabItems.map((el, i) => (
                <Tab key={i}>
                  <img
                    style={{ paddingRight: "5px" }}
                    src={
                      require(i === 0
                        ? "../images/france.svg"
                        : i == 1
                        ? "../images/switzerland.svg"
                        : "../images/romania.svg").default
                    }
                  />
                  {el.text}
                </Tab>
              ))}
            </Tabs>
          </div>
          <div
            className="col-12 mt-2"
            style={{ background: "#ffff", borderRadius: "10px" }}
          >
            <div className="row">
              <div className="col-8">
                <div className="downLoadCenter p-1 ">
                  <h3 className="mb-0">✔️ Active reaserch <span className="pub-Actives">(pub actives)</span></h3>
                </div>
              </div>
              <div className="col-4 d-flex justify-content-end align-items-center">
               <p className="mb-0 activeJobs">{
              jobCardActive.length} active job ads  Results found!</p>
              </div>
            </div>
          </div>
      
            {activeStatus ?
            jobCardActive.length > 0 ?
              jobCardActive.map((el)=>(
                <motion.div
                initial={{ scale: 0 }}
                animate={{ rotate:0, scale:1 }}
                transition={{
                  type: "spring",
                  stiffness:60,
                  damping: 15
                }}
                className="col-4 " style={{maxWidth:"32%",marginRight:"10px",marginTop:"10px"}} key={el._id}
          
              >
                <JobsCard  props={el}  bg="Active"  setUpdateField={setUpdateField}      />
                </motion.div>
              ))
            :
            <div className="col-12 my-2 d-flex justify-content-center" >
            <p className="mb-0 d-flex align-items-center ErrorSearchBox"><Warning /> NO ACTIVE RESULTS FOUND ✘✘!</p>
         </div>
:
<div className="col-12 mt-2 d-flex justify-content-center" >    <ProfilesLoader  width ={250} height={200} fontSize={"26px"} fontWeight={"600"}  Title={"Please Wait!"}/> </div>


          }
       
          <div
            className="col-12 mt-2"
            style={{ background: "#ffff", borderRadius: "10px" }}
          >
            <div className="row">
              <div className="col-8">
                <div className="downLoadCenter p-1 ">
                  <h3 className="mb-0" style={{color:"#f00"}}>✔️ INActive reaserch <span className="pub-Actives" style={{color:"#f00"}}>(pub non actives)</span></h3>
                </div>
              </div>
              <div className="col-4 d-flex justify-content-end align-items-center">
               <p className="mb-0 activeJobs">{jobCardInActive.length} inactive job ads  Results found!</p>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="row">
          {InactiveStatus ?
          jobCardInActive.length > 0 ?
              jobCardInActive.map((el)=>(
        
   <motion.div
                initial={{ scale: 0 }}
                animate={{ rotate:0, scale:1 }}
                transition={{
                  type: "spring",
                  stiffness:60,
                  damping: 15
                }}
                className="col-4 my-1" style={{maxWidth:"32%" ,marginRight:"10px",marginTop:"10px"}} key={el._id}
       
              >
            <JobsCard  props={el} bg={"Inactive"}  setUpdateField={setUpdateField}     />
            </motion.div>
          
         
           
            ))
       
         :
            <div className="col-12 my-2 d-flex justify-content-center" >
            <p className="mb-0 d-flex align-items-center ErrorSearchBox"><Warning />NO INACTIVE RESULTS FOUND ✘✘!</p>
         </div>
           :
           <div className="col-12 mt-2 d-flex justify-content-center" >   <ProfilesLoader  width ={250} height={200} fontSize={"26px"} fontWeight={"600"}  Title={"Please Wait!"}/>  </div>
            }
            </div></div>

</div>
</div>
        </>
    )
}
export default JobAdsList;