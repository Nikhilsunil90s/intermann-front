import { Link,useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import "../../CSS/Client/ProgressCardClient.css";

function ClientContractCard(props:any) {
  console.log(props)

  const navigate = useNavigate();

  const SeeFullProfile=()=>{
    navigate("/clientSigned", { state: props});
  }
  return (
    <>
      <div className="card card-color">
        <div className="card-upper">
          <div className="col-4">
            <img
              src={require("../../images/card-men.svg").default}
              className="card-img-top"
              alt="..."
            />
          </div>
          <div className="col-7 ">
          <p>{props.data.clientCompanyName}</p>
            <div>
       
              <p>
                Motivation:
                <StarRatings
                  rating={5}
                  starRatedColor="#ffc107"
                  // changeRating={}
                  numberOfStars={5}
                  starDimension={"11px"}
                  starSpacing={"0px"}
                  name="rating"
                />
              </p>
            </div>
            <div>
       
              <p>
                Importance :
                <StarRatings
                  rating={5}
                  starRatedColor="#ffc107"
                  // changeRating={}
                  numberOfStars={5}
                  starDimension={"9px"}
                  starSpacing={"0px"}
                  name="rating"
                />
              </p>
              <p>Num of position : {props.data.numberOfPosts}</p>
            </div>
            <div>
            </div>
            <button className="contract">SIGNED CONTRACT</button>
          </div>
        </div>

        <div className="card-body">
        <p>Secteur : {props.data.clientActivitySector}</p>
                    <p>Job : {props.data.clientJob}</p>
                    <p>Langues : {props.data.clientLanguages} </p>
                    <p>Phone Number : {props.data.clientPhone} </p>

                    <p className="blue">Recruiting :From {props.data.jobStartDate}To {props.data.jobEndDate} </p>
                    <p>Estimated CA : {props.data.jobTotalBudget} </p>
                   
                    <p>Salary by person : {props.data.netSalary} </p>
                    <p>Client Phone : {props.data.clientPhone} </p>
                    <p>Contact Name : {props.data.clientReferenceName}</p>
                    <p> Contact phone : {props.data.clientPhone} </p>
                    <span style={{fontSize:"13px"}}>
                        <input type="checkbox" />
                        Permise
                    </span>

          <div className="padding">
            <div className="ad-box">
              <p>Ads Spent on this client: {props.data.jobTotalBudget} </p>
              <p>
                Employees working for this client :
                {props.data.employeesWorkingUnder.map((el)=>(
                                <div className="d-flex ps-2">
           
                                <img
                                  src={require("../../images/menlogos.svg").default}
                                  style={{ width: "7%" }}
                                />
                                <p style={{ fontSize: "6px" }}>
                                 {el}
                                </p>
                              </div>
                ))
                }
              </p>
            </div>

         <div className="col-12">
           <div className="row">
             <div className="col-6 text-center">
             <button className="btn btn-card" onClick={SeeFullProfile}>
              See Full Profile
            </button>
             </div>
             <div className="col-6 text-center">
             <Link to="#" className="btn btn-cardRight1">
              Edit Profile
            </Link>
             </div>
             <div className="col-12 text-center">
             <Link to="#" className="btn btn-cardRight">
              Archive
            </Link>
             </div>
           </div>
         </div>
  
          </div>
        </div>
      </div>
    </>
  );
}
export default ClientContractCard;
