import { JOB_CENTER } from "../../types"


export const  JobCenterReducer=(state={
    data:[],
    status:""
},action)=>{

    switch(action.type){
        case JOB_CENTER:
            console.log(action)
            return state
    
    
            default  : return  state
        }


}