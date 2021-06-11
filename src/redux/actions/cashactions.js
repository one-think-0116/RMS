import {
    FETCH_CASH,
    FETCH_CASH_UPDATE,
    FETCH_CASH_SUCCESS,
    FETCH_CASH_FAILED,
  } from "../store/types";
import { store } from '../store';
export const fetchCash = () => (dispatch) => async (firebase) => {
    const {
        cashRef 
    } = firebase;
  
    dispatch({
        type: FETCH_CASH,
        payload: null,
    });
    try{
        cashRef.on('value', snapshot => {
            if(snapshot.val()){
                dispatch({
                    type: FETCH_CASH_SUCCESS,
                    payload: snapshot.val(),
                });
            }else{
                dispatch({
                    type: FETCH_CASH_SUCCESS,
                    payload: [],
                });
            }
        })
    }catch{
        dispatch({
            type: FETCH_CASH_FAILED,
            payload: "During fetch the cash, error be cause.",
        });
    }
    
}
export const updateCash = (data) => (dispatch) => (firebase) => {
    const {
        cashRef 
    } = firebase;
    dispatch({
        type: FETCH_CASH_SUCCESS,
        payload: data,
    });
    cashRef.update(data);
}

export const addCash = (data) => (dispatch) => (firebase) => {
    const {
        cashRef 
    } = firebase;
    const originalCash = store.getState().cash.info;
    originalCash.push(data);
    dispatch({
        type: FETCH_CASH_SUCCESS,
        payload: originalCash,
    });
    cashRef.update(data);
}
export const deleteCash = (data) => (dispatch) => (firebase) => {
    const {
        cashRef 
    } = firebase;
    dispatch({
        type: FETCH_CASH_SUCCESS,
        payload: data,
    });
    cashRef.set(data);
}