import React, { useEffect, useState } from "react";
import Rating from "react-rating";
import {ReactComponent as Empty} from "../../images/emptyStar.svg";
import {ReactComponent as StarRating} from "../../images/RatingStar.svg";
import AddClient from "../../pages/EditPages/AddClient";
function RatingCmp({StarRatings}){
  const [RatingStar ,setRating]=useState([])
 const handelchange=(e)=>{
StarRatings(e)
setRating(e)
 }
//  console.log(RatingStar)


    return(
      <>
<Rating
  emptySymbol={<img style={{marginLeft:"10px"}} src={require("../../images/emptyStar.svg").default} />}
  fullSymbol={<img style={{marginLeft:"10px"}} src={require("../../images/RatingStar.svg").default} />}
  onClick={(e)=>{handelchange(e)}}
/>
</>
    )
}
export default RatingCmp;