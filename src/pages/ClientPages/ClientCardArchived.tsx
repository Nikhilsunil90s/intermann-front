import React from "react";
import StarRatings from "react-star-ratings";
import {Link} from 'react-router-dom'
import "../../CSS/Client/ProgressCardClient.css";

function ClientCardArchived(){
    return(<>
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
                    <p>&#10100;Candidats_name&#10101;</p>
                    <p>&#10100;Candidats_Age&#10101;</p>
                        <div >  <p>Motivation:
                            <StarRatings
                                rating={5}
                                starRatedColor="#ffc107"
                                // changeRating={}
                                numberOfStars={5}
                                starDimension={'11px'}
                                starSpacing={'0px'}
                                name='rating'
                            />
                        </p>
                        </div>
                        <div >  <p>Importance :
                            <StarRatings
                                rating={5}
                                starRatedColor="#ffc107"
                                // changeRating={}
                                numberOfStars={5}
                                starDimension={'9px'}
                                starSpacing={'0px'}
                                name='rating'
                            />
                        </p>
                        </div>
                        <div ><p>Num of position :&#10100;&#10101; </p></div>
                        <button className="Archive001">Archived</button>

                    </div>
                </div>

                <div className="card-body">
                <p>Secteur :&#10100;Client_Sector&#10101;</p>
                    <p>Job : &#10100;Candidats_Job &#10101;</p>
                    <p>Langues : &#10100;Candidats_langues_List&#10101;  : </p>
                    <p>Phone Number : &#10100;Candidats_Phone &#10101; </p>

                    <p className="blue">Recruiting  :From &#10100;date &#10101; To &#10100;date
                        &#10101; </p>
                    <p>Estimated CA :   &#10100;Turnover_Amount&#10101; </p>
                   
                    <p>Salary by person : &#10100;Salary_Amount&#10101; </p>
                    <p>Client Phone : &#10100; Client_phone&#10101; </p>
                    <p>Contact Name :  &#10100;Client_name_company &#10101; </p>
                    <p> Contact phone :   &#10100;Client_name_phone &#10101; </p>
                    <span style={{fontSize:"13px"}}>
                        <input type="checkbox" />
                        Permise
                    </span>
                  
                    <div className="padding">
                    <div className="ads-box-red">
                    <p>Ads Spent on this client:&#10100;ad_Spent&#10101;  </p>
                    <p>Reason archived : &#10100;reason_Text-Area&#10101; 
                         </p>
                    </div>
                 
                    <Link to="/embauchprofile" className="btn btn-card">
                        See Full Profile
                    </Link>
                    <Link to="#" className="btn btn-cardRight1">
                        Edit Profile
                    </Link>
                    <Link to="#" className="btn btn-cardArchive">
                        Archive
                    </Link>
                    </div>
                </div>
            </div>
    </>)
}
export default ClientCardArchived;