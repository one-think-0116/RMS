import {
    FETCH_FEE,
    FETCH_FEE_UPDATE,
    FETCH_FEE_SUCCESS,
    FETCH_FEE_FAILED,
  } from "../store/types";
  import { store } from '../store';
export const fetchFee = () => (dispatch) => async (firebase) => {
    const {
        feeRef 
    } = firebase;
  
    dispatch({
        type: FETCH_FEE,
        payload: null,
    });
    try{
        feeRef.on('value', snapshot => {
            if(snapshot.val()){
                dispatch({
                    type: FETCH_FEE_SUCCESS,
                    payload: snapshot.val(),
                });
            }else{
                dispatch({
                    type: FETCH_FEE_SUCCESS,
                    payload: [],
                });
            }
        })
    }catch{
        dispatch({
            type: FETCH_FEE_FAILED,
            payload: "During fetch the fee, error be cause.",
        });
    }
    
    
}
export const updateFee = (data) => (dispatch) => (firebase) => {
    const {
        feeRef 
    } = firebase;
    dispatch({
        type: FETCH_FEE_SUCCESS,
        payload: data,
    });
    feeRef.update(data);
}

export const addFee = (data) => (dispatch) => (firebase) => {
    const {
        feeRef 
    } = firebase;
    const originalCash = store.getState().fee.info;
    originalCash.push(data);
    dispatch({
        type: FETCH_FEE_SUCCESS,
        payload: originalCash,
    });
    feeRef.update(data);
}
export const deleteFee = (data) => (dispatch) => (firebase) => {
    const {
        feeRef 
    } = firebase;
    dispatch({
        type: FETCH_FEE_SUCCESS,
        payload: data,
    });
    feeRef.set(data);
}