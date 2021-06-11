import {
    FETCH_BATTERY,
    FETCH_BATTERY_UPDATE,
    FETCH_BATTERY_SUCCESS,
    FETCH_BATTERY_FAILED,
  } from "../store/types";
  import { store } from '../store';
export const fetchBattery = () => (dispatch) => async (firebase) => {
    const {
        batteryRef 
    } = firebase;
  
    dispatch({
        type: FETCH_BATTERY,
        payload: null,
    });
    try{
        await batteryRef.on('value', snapshot => {
            if(snapshot.val()){
                dispatch({
                    type: FETCH_BATTERY_SUCCESS,
                    payload: snapshot.val(),
                });
            }else{
                dispatch({
                    type: FETCH_BATTERY_SUCCESS,
                    payload: [],
                });
            }
        })
    }catch{
        dispatch({
            type: FETCH_BATTERY_FAILED,
            payload: "During fetch the battery, error be cause.",
        });
    }
    

    
}
export const updateBattery = (data) => (dispatch) => (firebase) => {
    const {
        batteryRef 
    } = firebase;
    dispatch({
        type: FETCH_BATTERY_SUCCESS,
        payload: data,
    });
    batteryRef.update(data);
}

export const addBattery = (data) => (dispatch) => (firebase) => {
    const {
        batteryRef 
    } = firebase;
    const originalCash = store.getState().battery.info;
    originalCash.push(data);
    dispatch({
        type: FETCH_BATTERY_SUCCESS,
        payload: originalCash,
    });
    batteryRef.update(data);
}
export const deleteBattery = (data) => (dispatch) => (firebase) => {
    const {
        batteryRef 
    } = firebase;
    dispatch({
        type: FETCH_BATTERY_SUCCESS,
        payload: data,
    });
    batteryRef.set(data);
}