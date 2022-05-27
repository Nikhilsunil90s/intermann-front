import { Link } from "react-router-dom";
import "../../CSS/Client/ClientTodo.css";
import StarRatings from 'react-star-ratings';


const ClientToDoCard = (props: any) => {
 
    return (
        <>
            <div className="card card-color-client">
                <div className="card-upper">
                    <div className="col-4">
                        <img
                            src={require("../../images/card-men.svg").default}
                            className="card-img-top"
                            alt="..."
                        />
                    </div>
                    <div className="col-7 ">
                        <p> &#10100;Company_name &#10101;</p>
                        <div >  <p>Motivation:
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
                        </div> <div >  <p>Importance :
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
                        <Link to='/todoprofile'>
                        <button className="todo">TO DO</button>
                        </Link>
                    </div>
                </div>

                <div className="card-body ">
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
                   
                </div>
                <div className="padding">
                    <div>
                        <input type="checkbox" /> Permis
                    </div>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-6 text-center">
                            <Link to="/clientFullprofile" className="btn btn-SEE">
                        See Full Profile
                    </Link>
                    </div>
                    <div className="col-6">
                    <Link to="/editTodo" className="btn btn-EDIT">
                        Edit Profile
                    </Link>
                            </div>
                            <div className="col-6 text-center">
                            <Link to="/editProgress" className="btn btn-MOVE ">
                        Move to in Progress
                    </Link>
                            </div>
                        
                  <div className="col-6 ">
                  <Link to="/archive" className="btn btn-ARCHIVE">
                        Archive
                    </Link>
                  </div>
                  </div>
                    </div>
                  
                </div>
            </div>
        </>
    )
}

export default ClientToDoCard;