import {useNavigate} from "react-router-dom";
import React, {useEffect,useState} from "react";
import "../../CSS/Client/ProgressCardClient.css";
import ArchivedClientModal from "../../components/Modal/ArchivedClientModal";
import Select from "react-select";
import { ReactComponent as Empty } from "../../images/emptyStar.svg";
import { ReactComponent as StarRating } from "../../images/RatingStar.svg";
import moment from 'moment';

function ClientContractCard(props: any) {
  const navigate = useNavigate();

  // const [archivedEMP,setArchivedEMP]=useState(props.data.employeesWorkingUnder != null && props.data.employeesWorkingUnder != [] && props.data.employeesWorkingUnder.length > 0 ?   props.data.employeesWorkingUnder.map((el,i) => ( el.)))
  const candidatImportanceIcons = [{ icon: <><StarRating style={{ marginRight: "3px", width: "70%" }} /> <Empty style={{ marginRight: "3px", width: "70%" }} /> <Empty style={{ marginRight: "3px", width: "70%" }} /> <Empty style={{ marginRight: "3px", width: "70%" }} /> <Empty style={{ marginRight: "3px", width: "70%" }} /></> }, { icon: <><StarRating style={{ marginRight: "3px", width: "70%" }} /><StarRating style={{ marginRight: "3px", width: "70%" }} /> <Empty style={{ marginRight: "3px", width: "70%" }} /> <Empty style={{ marginRight: "3px", width: "70%" }} /> <Empty style={{ marginRight: "3px", width: "70%" }} /></> }, { icon: <><StarRating style={{ marginRight: "3px", width: "70%" }} /> <StarRating style={{ marginRight: "3px", width: "70%" }} /> <StarRating style={{ marginRight: "3px", width: "70%" }} /> <Empty style={{ marginRight: "3px", width: "70%" }} /> <Empty style={{ marginRight: "3px", width: "70%" }} /></> }, { icon: <><StarRating style={{ marginRight: "3px", width: "70%" }} /> <StarRating style={{ marginRight: "3px", width: "70%" }} /> <StarRating style={{ marginRight: "3px", width: "70%" }} /> <StarRating style={{ marginRight: "3px", width: "70%" }} /> <Empty style={{ marginRight: "3px", width: "70%" }} /></> }, { icon: <><StarRating style={{ marginRight: "3px", width: "70%" }} /><StarRating style={{ marginRight: "3px", width: "70%" }} /> <StarRating style={{ marginRight: "3px", width: "70%" }} /> <StarRating style={{ marginRight: "3px", width: "70%" }} /> <StarRating style={{ marginRight: "3px", width: "70%" }} /></> }];
  const candidatMotivationIcons = [{ icon: "✘", motivation: '✘!' }, { icon: "😟", motivation: 'Disappointed' }, { icon: "🙁", motivation: 'Not Really' }, { icon: "😊", motivation: 'Like' }, { icon: "🥰", motivation: 'Great' }, { icon: "😍", motivation: 'Super Lovely' }];
  const [showArchiveModal, setShowArchiveModal] = useState(false)
  const [Archived,setArchived]=useState(  props.data.employeesWorkingUnder ?   props.data.employeesWorkingUnder.filter((el) => (el.candidatStatus == "Archived")):null )
  const [preSelect,setPreselected]=useState( props.data.employeesWorkingUnder ?   props.data.employeesWorkingUnder.filter((el) => (el.candidatStatus == "Pre-Selected")):null )
  const CardOption = [{
    value: "Edit Profile", label: "Edit Profile"
  },

  {
    value: "Archive", label: "Archive"
  }
  ] as any

  const viewFullProfile = (data) => {
    localStorage.setItem("embauch", JSON.stringify(data));
    window.open("/embauchlist/embauchprofile", "_blank");
  };

  const Editdata = { state: props.data, path: "/clientContract" }


  const editClientProfile = () => {
    navigate("/clientContract/ClientContractEditprofile", { state: Editdata });

  }
  const MoreOption = (e: any) => {
    if (e.value == "Edit Profile") {
      editClientProfile()
    }
    if (e.value == "Archive") {
      setShowArchiveModal(true)
    }
  }



  const SeeFullProfile = () => {
    // navigate("/clientSigned", { state: props.data});
    localStorage.setItem('archive', JSON.stringify(props.data));
    window.open("/clientContract/clientSigned", "_blank")
  }

  function padTo2DigitsCH(num) {
    return num.toString().padStart(2, "0");
  }
  // console.log(props.data.jobStartDate.slice(0,4).includes("-"))

  function formatDateCha(date) {
    return [
      padTo2DigitsCH(date.getDate()),
      padTo2DigitsCH(date.getMonth() + 1),
      date.getFullYear(),
    ].join("/");
  }
  const datenow = moment().format("YYYY-MM-DD");

  let date = new Date(datenow);

  let start = new Date(props.data.jobStartDate);
  let end = new Date(props.data.jobEndDate);
  const [startStatus]=useState(props.data.jobStartDate.slice(0,4).includes("-"))
  const [endStatus]=useState(props.data.jobEndDate.slice(0,4).includes("-"))
  const [startDate,setStartDate]=useState()as any
  const [EndDate,setEndDate]=useState()as any
 useEffect(()=>{
  if(startStatus){
    setStartDate(props.data.jobStartDate)
  }else{
    let data=formatDateCha(start)
    setStartDate(data.replaceAll("/","-"))
    

  }
  if(endStatus){
    setEndDate(props.data.jobEndDate)
  }else{
    let data=formatDateCha(end)
    setEndDate(data.replaceAll("/","-"))
    

  }
 })
  return (
    <>
      <div className="card cardInPro p-0 HoveRESTClassCardS">
        <div className="d-flex cursor-pointer" onClick={SeeFullProfile}>
          <div className="col-3 px-0 d-flex justify-content-center align-items-center">
          
                 <img
              src={props.data.clientPhoto ?  props.data.clientPhoto.url : require("../../images/ClientCardPhoto.svg").default}
           className={props.data.clientPhoto ? "" :"card-img-top widthIMG" }
           style={props.data.clientPhoto ? {width:"75px",
            height: "75px",
            padding:" 0px",
            border:"2px solid #489767",
            borderRadius: "100px"}: null}

              alt="..."
            />
          </div>
          <div className="col-5 px-0 mt-1">
            <p className="textClientCard" style={{ width: "150%" }} data-bs-toggle="tooltip" data-bs-placement="bottom" title={props.data.clientCompanyName.toLocaleUpperCase()}><b>{props.data.clientCompanyName ? props.data.clientCompanyName.length > 20 ? props.data.clientCompanyName.toLocaleUpperCase().slice(0, 29) + "..." : props.data.clientCompanyName.toLocaleUpperCase() : "✘ No CompanyName!"}</b></p>
            <div >  <p className="textClientCard" style={{ height: "30px", background: "transparent" }}>Importance:
              <b className="d-flex" style={{ width: "50%", marginLeft: "3px", height: "43px" }}>{candidatImportanceIcons[props.data.clientImportance - 1]?.icon ? candidatImportanceIcons[props.data.clientImportance - 1]?.icon : <div className="d-flex align-items-center"><b className="d-flex align-items-center">✘✘!</b></div>}</b>

            </p>
            </div>
            <div >  <p className="textClientCard" style={{ width: "130%" }}>Motivation :
              <b style={{ background: "transparent", zIndex: "9" }}>{candidatMotivationIcons[props.data.clientMotivation]?.icon + " " + candidatMotivationIcons[props.data.clientMotivation]?.motivation}</b>
            </p>
            </div>
            <div className="d-flex" style={{width:"130%"}}><p  className="textClientCard">Num of position : <b style={{marginLeft:"3px"}}>  {props.data.numberOfPosts ? props.data.numberOfPosts : "✘ No Posts!"}</b> </p></div>
                 

          </div>
          <div className="col-4 px-0 d-flex justify-content-center align-items-center">
            <button className="SignedClientBtn"><img src={require("../../images/tickClientBtn.svg").default} /> SIGNED CONTRACT</button>
          </div>
        </div>
        <div className="col-12 d-flex align-items-center textSignedClient my-1 ">
          <p className=" mb-0 " style={{ color: date >= start && date <= end ? "#489767" : "#ca1313" }}>Recruiting  :    {date >= start && date <= end ? "From " + " 📆" + startDate + "  To  " + " 📆" + EndDate: "⚠️ From  " + startDate + "  To  " + EndDate} </p>
        </div>
        <div className="col-12 ">
          <div className="row pl-1">
            <div className="col-5 fontStylingCardDetails px-0 py-1">
              <p className="fontStylingCardP">Secteur : {props.data.clientActivitySector ? props.data.clientActivitySector.length > 14 ? props.data.clientActivitySector.toLocaleUpperCase().slice(0, 14) + "..." : props.data.clientActivitySector.toLocaleUpperCase() : "No Sector!"} </p>
              <p className="fontStylingCardP"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={props.data.clientJob.length ? props.data.clientJob : "✘ No clientJob!"}>Job :  {props.data.clientJob ? props.data.clientJob.length > 20 ? props.data.clientJob.toLocaleUpperCase().slice(0, 15) + "..." : props.data.clientJob.toLocaleUpperCase() : "No Job!"}</p>
              <p  data-bs-toggle="tooltip" data-bs-placement="bottom" title={props.data.clientLanguages.length ? props.data.clientLanguages.join(", ") : "✘ No Langues!"}>Langues : <b> {props.data.clientLanguages.length ? props.data.clientLanguages.length > 2 ? props.data.clientLanguages.join(", ").slice(0,18) : props.data.clientLanguages.join(", ") : "✘ No Langues!"}</b> </p>
              <p>Phone :<b>{props.data.clientPhone.length ? props.data.clientPhone : "✘ No Phone Number!"}</b> </p>
              <p>Estimated CA :   <b>{props.data.jobTotalBudget ? props.data.jobTotalBudget + " €" : "N/A"}</b> </p>

            </div>
            <div className="col-7 pl-1 fontStylingCardDetails px-0 pt-1">
              <p>Salary by person : <b>  {props.data.netSalary ? props.data.netSalary + "€" || props.data.salary_hours.salaryPerHour + " €" : "0€"}</b> </p>

              <p>E-Mail : <b>{props.data.clientEmail ? props.data.clientEmail.length > 20 ? props.data.clientEmail.slice(0, 21) + "..." : props.data.clientEmail : "✘ No Email!"}</b> </p>
              <p>Cl-Phone : <b>{props.data.clientPhone.length ? props.data.clientPhone : "✘ No Client Number!"}</b> </p>
              <p>C-Name :  <b>{props.data.clientReferenceName ? props.data.clientReferenceName : "✘ No Name!"}</b> </p>
              <p>Contact :   <b>{props.data.clientReferenceNumber.length ? props.data.clientReferenceNumber : "✘ No Contact Number!"}</b> </p>
            </div>
          </div>
        </div>
        <div className="SignedClientBox p-1">


          <div className="">
            {
              props.data.employeesWorkingUnder != null  && props.data.employeesWorkingUnder.length > 0 ?
                <>
                  <p className="AdsFont mb-0">Ads Spent on this client:  {props.data.jobTotalBudget  ? props.data.jobTotalBudget + " €" : "N/A"}  </p>
                  <p className="AdsFont mb-0">Employees working for this client :
                  </p>
                </>
                :
                null
            }
            <div className="col-12">
              <div className={`row ${props.data.employeesWorkingUnder.length > 8 ? "style-4" : ""}`}  id="">


              {props.data.employeesWorkingUnder !== null &&
                props.data.employeesWorkingUnder.length > 0 ? 
                  props.data.employeesWorkingUnder.map((el,i) => (
                
                  

                      <>
                           {  el.candidatStatus == "Archived" ||  el.candidatStatus == "Pre-Selected" ?
                         
                         null
 :       
 <>             
 <div className="col-4 pr-0" key={i} style={{marginBottom:"5px"}}>
                          <div className="d-flex align-items-center cursor-pointer" onClick={(e) => viewFullProfile(el)}>

                            <img alt="..."
                              src={require("../../images/menSigned.svg").default}
                              style={{ width: "15%" }}
                            />
                            <p style={{ fontSize: "10px", marginLeft: "5px" }} className="mb-0 " data-bs-toggle="tooltip" data-bs-placement="bottom" title={el.candidatName.toLocaleUpperCase()} >


                              {el.candidatName.length > 15 ?  el.candidatName.slice(0,15).toLocaleUpperCase() + ".." : el.candidatName.toLocaleUpperCase() }
                            </p>
                          </div>
</div>
</>
}
</> 
 /* :
                          el.candidatStatus == "Pre-Selected" ?
                          
                            :
                            
                    
 
                    }
                      </div> */
                    ))

                    :
                    // <div className="col-4 pr-0">
                    //       <div className="d-flex align-items-center">
                    //       <img
                    //       src={require("../../images/menSigned.svg").default}
                    //       style={{ width: "15%" }}
                    //     />
                    //     <p style={{ fontSize: "8px",marginLeft:"5px" }} className="mb-0 ">
                    //    No Candidat!
                    //     </p>
                    //     </div>
                    //     </div>
                    <div className="col-12 py-1 d-flex justify-content-center "><p className="d-flex  justify-content-center align-items-center mb-0" style={{
                      fontFamily: 'Poppins',
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "11px",
                      lineHeight: "14px",
                      color: "#000000"
                    }}>
                      ⚠️ No data available for Employees Working under this Client !
                    </p>
                    </div>

                }
{
  preSelect ? 
preSelect.map((el,i)=>(
  <>             
  <div className="col-4 pr-0" key={i} style={{marginBottom:"5px"}}>
  <div className="d-flex align-items-center cursor-pointer" >

                            <img
                              src={require("../../images/menSigned.svg").default}
                              style={{ width: "15%" }}
                            />
                            <p style={{ fontSize: "10px", marginLeft: "5px", color: "#fd9e02" }} className="mb-0 " data-bs-toggle="tooltip" data-bs-placement="bottom" title={`Pre-Selected ${el.candidatName.toLocaleUpperCase()} `} >


                              {el.candidatName.length > 15 ?  el.candidatName.slice(0,15).toLocaleUpperCase() + ".." : el.candidatName.toLocaleUpperCase() }
                            </p>
                          </div>
                          </div>
                          </>
))
  :
  null
}

{
  Archived ? 
Archived.map((el,i)=>(
  <>             
 <div className="col-4 pr-0" key={i} style={{marginBottom:"5px"}}> 
  <div className="d-flex align-items-center cursor-pointer" >

  <img
    src={require("../../images/menSigned.svg").default}
    style={{ width: "15%" }}
  />
  <p style={{ fontSize: "10px", marginLeft: "5px", color: "red" }} className="mb-0 " data-bs-toggle="tooltip" data-bs-placement="bottom" title={`Archived ${el.candidatName.toLocaleUpperCase()}`} >
    {el.candidatName.length > 15 ?  el.candidatName.slice(0,15).toLocaleUpperCase() + ".." : el.candidatName.toLocaleUpperCase() }
  </p>
</div>
</div>

</>
))
  :
  null
}
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 d-flex justify-content-end my-1">
          <div className="row ">
            <div className="col-6 text-center">
              <Select
                options={CardOption}
                className="CardOptions AllMoreOp"
                onChange={MoreOption}
                placeholder="More options"
              />
            </div>
            <div className="col-6 text-center">
              <button className="btn btn-card" onClick={SeeFullProfile}>
                See Full Profile
              </button>
            </div>
          </div>
        </div>
        {showArchiveModal ?
          <ArchivedClientModal props={props.data} closeModal={setShowArchiveModal} path={"/clientToDo"} /> : null
        }

      </div>
    </>
  );
}
export default ClientContractCard;
