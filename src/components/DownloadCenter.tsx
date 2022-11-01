import React,{useState,useEffect} from "react";
import '../CSS/Canceled.css'
import { Tabs, Tab } from "react-tabs-scrollable";
import { API_BASE_URL } from "../config/serverApiConfig";
import Loader from "./Loader/loader";
import Error from "./Loader/SearchBarError";
import {Toaster,toast} from "react-hot-toast";
export default function  DownloadCenter(){
  const [activeTab, setActiveTab] = React.useState(0) as any;
  const [candidateContracts,setCandidateContracts]=useState([])
  const [ClientContracts,setClientContracts]=useState([])
  const [representance,setRepresentance]=useState([])
  const [AllProfiles,setAllProfiles]=useState([])
  const [Status,setStatus]=useState(false)
  const [deleteCanContract,setdeleteCanContract]=useState(false)
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

  
  const fetchCandidatRepresentance = async () => {
    return await fetch(API_BASE_URL + `getSignedRepresentences`, {
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

  const deleteClientsContracts = async (id:any,CId) => {
    return await fetch(API_BASE_URL + `deleteClientContract/?clientId=${id}&contractId=${CId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((resp) => resp.json())
      .then((respData) => {
        toast.success("Contrat Client Removed Successfully!")
        setdeleteCanContract(true)
      })
      .catch((err) => {
        toast.error("Contrat Client Not Removed!")
        
      });
  };
  const deleteCandiateContracts = async (id:any,CId) => {
    return await fetch(API_BASE_URL + `deleteCandidatContract/?candidatId=${id}&contractId=${CId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((resp) => resp.json())
      .then((respData) => {
        toast.success("Contrat Employé Removed Successfully!")
        setdeleteCanContract(true)
      })
      .catch((err) => 
      {
        toast.error("Contrat Employé Not Removed!")
      });
  };

  const deleteRepresentance = async (id:any) => {
    return await fetch(API_BASE_URL + `deleteRepresentence/?representenceId=${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((resp) => resp.json())
      .then((respData) => {
        toast.success("Représentance Removed Successfully!")
        setdeleteCanContract(true)
      })
      .catch((err) => 
      {
        toast.error("Représentance Not Removed!")
      });
  };
  
  useEffect(()=>{
    setStatus(false)
    fetchCandidatContracts().then((res)=>{
        if(res.status){
            setStatus(true)
            setCandidateContracts([...res.data])
            setdeleteCanContract(false)
            if(activeTab === 0){
                setAllProfiles([...res.data])
            }
        }
        else{
          setStatus(true)
          if(activeTab === 0){
            setAllProfiles([])
            setCandidateContracts([])
        }

            
        }
    })
        fetchClientsContracts().then((res)=>{
            if(res.status){
                setStatus(true)
                setClientContracts([...res.data])
                setdeleteCanContract(false)

                if(activeTab === 1 ){
                    setAllProfiles([...res.data])
                }
            }else{
              setStatus(true)
              if(activeTab === 1 ){
                setAllProfiles([])
                setClientContracts([])
            }
            }
    })
      fetchCandidatRepresentance().then((res)=>{
        if(res.status){
          setStatus(true)
          setRepresentance([...res.data])
          console.log(...res.data)
          setdeleteCanContract(false)

          if(activeTab === 3 ){
              setAllProfiles([...res.data])
          }
      }else{
        setStatus(true)
        if(activeTab === 3 ){
          setAllProfiles([])
          setRepresentance([])
      }
      }



      })


  },[deleteCanContract])       
   
console.log(representance,"res")
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
            setAllProfiles(representance.filter((el)=>(el)))
        }
      
      };
    return(
        <>
        <Toaster  position="top-right" containerStyle={{zIndex:"999999999999999999"}}  />
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
                        AllProfiles.length > 0 && activeTab === 0 || AllProfiles.length > 0 && activeTab === 1 ||  AllProfiles.length > 0 && activeTab === 3 ?
                        AllProfiles.map((el,i)=>(
                            <div className="col-12 mt-1" style={{background:"#fe87001f",borderRadius:"10px"}} key={i}>
                            <div className="row p-1 align-items-center">
                                <div className="col-10 px-0">
                                  <p className="ContractListFont mb-0">{el.candidatName ? el.candidatName : el.initial_client_company ? el.initial_client_company  : el.candidat_name} - Generated : <b>{el.contract_date ? el.contract_date : el.contract_generated_on ? el.contract_generated_on : el.generated_on} </b> Signed : <b>{el.contract_signed_on ? el.contract_signed_on : el.contract_signed_on ?   el.contract_signed_on : el.signed_on}</b></p>
                                </div>
                                <div className="col-2 px-0 ">
                                    <div className="row d-flex justify-content-evenly">
                                        <div className="col-6 px-0 RoundDiv cursor-pointer" id="delete" onClick={(e)=>el.candidatName ? deleteCandiateContracts(el.candidatId,el._id) : el.clientId ?  deleteClientsContracts(el.clientId,el._id)  :  deleteRepresentance(el._id) }>
                                    <img src={require("../images/Deletebucket.svg").default} />
                                    </div>
                                  
                                    <div className="col-6 px-0 RoundDiv cursor-pointer" id="view" onClick={(e)=>window.open(el.signed_contract_url ?  el.signed_contract_url  : el.signed_representence_url)}>
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