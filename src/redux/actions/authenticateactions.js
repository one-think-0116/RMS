import {
    AUTHENTICATE_SUCCESS,
    AUTHENTICATE_FAILED
  } from "../store/types";
  import { store } from '../store';

  export const authenticate = (status) => (dispatch) => (firebase) => {
    //   console.log("authenticate status",status)
      if(status){
        dispatch({
          type: AUTHENTICATE_SUCCESS,
        });
      }else{
        dispatch({
          type: AUTHENTICATE_FAILED,
        });
      }
  }