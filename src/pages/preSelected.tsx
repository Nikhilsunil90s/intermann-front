import React from "react";


declare namespace JSX {
    interface IntrinsicElements {
      "lottie-player": any;
    }
  }
  declare global {
    namespace JSX {
      interface IntrinsicElements {
        lable: React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLElement>,
          HTMLElement
        >;
      }
    }
  }
  let SelectedName = []
  let FilterJob = [];
  let MotivationArr=[]
  let LicencePermisArr=[]
  let DateArr=[]
function Preselected(){
 return(
    <>
    
    </>
 )
}
export default Preselected;