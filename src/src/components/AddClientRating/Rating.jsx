import React, { useEffect, useState } from "react";
import Rating from "react-rating";
import {ReactComponent as Empty} from "../../images/emptyStar.svg";
import {ReactComponent as StarRating} from "../../images/RatingStar.svg";
import AddClient from "../../pages/EditPages/AddClient";
function RatingCmp({StarRatings ,StarR}){
  const [RatingStar ,setRating]=useState("")
 const handelchange=(e)=>{
StarRatings(e)
setRating(e)
 }
    return(
      <>
<Rating
  emptySymbol={<img style={{marginLeft:"10px"}} src={require("../../images/emptyStar.svg").default} />}
  fullSymbol={<img style={{marginLeft:"10px"}} src={require("../../images/RatingStar.svg").default} />}
  onClick={(e)=>{handelchange(e)}}
  placeholderSymbol={RatingStar}
  initialRating={RatingStar}
/>
</>
    )
}
export default RatingCmp;