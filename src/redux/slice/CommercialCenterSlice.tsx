import { createSlice } from "@reduxjs/toolkit";

const STATUSES = Object.freeze({
  SUCCESS: "Success",
  ERROR: "error",
  LOADING: "loading",
  FALSE: "false",
});

const initialState = {
  data: [],
  status: STATUSES.FALSE,
  disabled: false,
} as any;

const CommercialCenterSlice = createSlice({
  name: "CommercialCenter",
  initialState,
  reducers: {
    setLeads(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setDSfield(state, action) {
      state.disabled = action.payload;
    },
  },
});

export const { setLeads, setStatus, setDSfield } =
  CommercialCenterSlice.actions;
export default CommercialCenterSlice.reducer;

// thunk //

export const CommercialCenter = () => {
  //  async function FetchDataWithThunk(dispatch:any){
  //     try{
  //         await   fetch(API_BASE_URL + "allSignedForms",
  //         {
  //           method: "GET",
  //           headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         }})
  //         .then((res)=>res.json())
  //         .then((res)=>{
  //          if(res.status){
  //           dispatch(setStatus(STATUSES.SUCCESS))
  //           dispatch(setLeads([...res.data]))
  //          }else if(res.status === false){
  //              dispatch(setStatus(STATUSES.FALSE))
  //          }
  //      })
  //     }
  //     catch{
  //     }
  // }
};
