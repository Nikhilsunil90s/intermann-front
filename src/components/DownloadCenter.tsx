import React,{useState,useEffect} from "react";
import '../CSS/Canceled.css'
import { Tabs, Tab } from "react-tabs-scrollable";
import { API_BASE_URL } from "../config/serverApiConfig";
import Loader from "./Loader/loader";
import Error from "./Loader/SearchBarError";
import toast from "react-hot-toast";
export default function  DownloadCenter(){
  const [activeTab, setActiveTab] = React.useState(0) as any;
  const [candidateContracts,setCandidateContracts]=useState([])
  const [ClientContracts,setClientContracts]=useState([])
  const [AllProfiles,setAllProfiles]=useState([])
  const [Status,setStatus]=useState(false)
  const [tabItems] = useState([
    {
      text: "Contrat Employés",
      value: "CONTRACT",
    },
    {
      text: "Contrat Clients",
      value: "Contrat_Clients",
    },
    {
      text: "Avances Employes",
      value: "Avances_Employes",
    },
    {
      text: "Représentance",
      value: "Représentance",
    }
  ]) as any;

  const fetchCandidatContracts = async () => {
    return await fetch(API_BASE_URL + `getCandidatSignedContracts`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((resp) => resp.json())
      .then((respData) => respData)
      .catch((err) => err);
  };

  const fetchClientsContracts = async () => {
    return await fetch(API_BASE_URL + `getClientSignedContracts`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((resp) => resp.json())
      .then((respData) => respData)
      .catch((err) => err);
  };

  const removeCandidateContract = async (url) => {
    return await fetch(API_BASE_URL + `getClientSignedContracts`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body:url
    })
      .then((resp) => resp.json())
      .then((respData) => 
      {
        if(respData.status){
            toast.success("Contrat Employé Removed Successfully!")
            setTimeout(()=>{
               window.location.reload()
            },2000)
        }
        
      })
      .catch((err) => {
        toast.error("Contrat Employé Not Removed!")
      });
  };
  
  useEffect(()=>{
    setStatus(false)
    fetchCandidatContracts().then((res)=>{
        if(res.status){
            setStatus(true)
            setCandidateContracts([...res.data])
            if(activeTab === 0){
                setAllProfiles([...res.data])
            }
        }else{
            return
            
        }
    })
        fetchClientsContracts().then((res)=>{
            if(res.status){
                setStatus(true)
                setClientContracts([...res.data])
                if(activeTab === 1){
                    setAllProfiles([...res.data])
                }
            }else{
                return
            }
    })
  },[])       
   

    const onTabClick = (e,index: any) => {
        setActiveTab(index);
        if(index === 0){
            setAllProfiles(candidateContracts.filter((el)=>(el)))
        }
        if(index === 1){
            setAllProfiles(ClientContracts.filter((el)=>(el)))
        }
        if(index === 2){
            setAllProfiles([])
        }
        if(index === 3){
            setAllProfiles([])
        }
      
      };
    
      

      const HandleDeleteView =(e,url)=>{
        console.log(e.target.id)
   if(e.target.id === "delete"){
   removeCandidateContract(url)
   }
   if(e.target.id == "view"){
    window.open(url)
   }
      }
    return(
        <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 mt-2" style={{background:"#ffff",borderRadius:"10px"}}>
                    <div className="downLoadCenter p-1 ">
                    <h3 className="">DOWNLOAD CENTER</h3>
                    <p className="mb-0">DOWNLOAD DOCUMENT SIGNED BY DOCUSIGN WITH CRM</p>
                </div>
                </div>
                <div className="col-12 mt-1 tabsClass" style={{background:"#E8E8E8",borderTopLeftRadius:"10px",borderTopRightRadius:"10px"}}>
                  <Tabs
                
                    activeTab={activeTab}
                    onTabClick={onTabClick}
                    rightBtnIcon={">"}
                    hideNavBtns={false}
                    leftBtnIcon={"<"}
                    showTabsScroll={false}
                    tabsScrollAmount={7}
                  >
                    {tabItems.map((el, i) => (
                      <Tab  key={i}>{el.text}</Tab>
                    ))}
                  </Tabs>
                </div>
                <div className="col-12" style={{background:"#ffff",borderBottomLeftRadius:"10px",borderBottomRightRadius:"10px"}}>
                 <div className="row p-1">
                    {
                        
                        Status  ?
                        AllProfiles.length > 0 && activeTab === 0 || activeTab === 1 ?
                        AllProfiles.map((el,i)=>(
                            <div className="col-12 mt-1" style={{background:"#fe87001f",borderRadius:"10px"}} key={i}>
                            <div className="row p-1 align-items-center">
                                <div className="col-10 px-0">
                                  <p className="ContractListFont mb-0">{el.candidatName ? el.candidatName : el.initial_client_company} - Generated : <b>{el.contract_date ? el.contract_date : "01-01-2022 "} </b> Signed : <b>{el.contract_signed_on ? el.contract_signed_on : el.contract_signed_on}</b></p>
                                </div>
                                <div className="col-2 px-0 ">
                                    <div className="row d-flex justify-content-evenly">
                                        <div className="col-6 px-0 RoundDiv cursor-pointer" id="delete" onClick={(e)=>{HandleDeleteView(e,el.signed_contract_url)}}>
                                    <img src={require("../images/Deletebucket.svg").default} />
                                    </div>
                                  
                                    <div className="col-6 px-0 RoundDiv cursor-pointer" id="view" onClick={(e)=>HandleDeleteView(e,el.signed_contract_url)}>
                                <img
                                      src={require("../images/dowBtn.svg").default}
                                    />
                                    </div>
                                    </div>
                                    </div>
                            </div>
                        </div>
                        ))
                         
                        :
                       <div className="col-12 d-flex justify-content-center align-items-center ErrorSearchBox my-1 ">
                        {activeTab === 0 || activeTab === 1 ? 
                         <><Error /> <span> ✘ No Contract Available ✘</span></> 
                          :
                          <><Error /> <span> ✘ No data yet ✘</span></> 
                        }
                        </div>
                       
                        :
                        <div className="col-12 d-flex justify-content-center align-items-center">
                          <Loader />

                            </div>
                    }
                 
                 </div>
                </div>
            </div>
        </div>
        </>
    )
}