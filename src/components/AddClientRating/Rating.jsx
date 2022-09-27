import React, { useEffect, useState } from "react";
import Rating from "react-rating";

function  RatingCmp({StarRatings ,StarR ,FunC}){
  const [RatingStar ,setRating]=useState(StarR ? StarR : "")
 const handelchange=(e)=>{
StarRatings(e)
setRating(e)
FunC(e)
 }
    return(
      <>
<Rating
  emptySymbol={<img style={{marginLeft:"10px",width:"40px"}} src={require("../../images/emptyStar.svg").default} />}
  fullSymbol={<img style={{marginLeft:"10px",width:"40px"}} src={require("../../images/RatingStar.svg").default} />}
  onClick={(e)=>{handelchange(e)}}
  placeholderSymbol={RatingStar}
  initialRating={RatingStar}
/>
</>
    )
}
export default RatingCmp;