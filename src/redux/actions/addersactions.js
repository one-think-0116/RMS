import {
    FETCH_ADDERS,
    FETCH_ADDERS_UPDATE,
    FETCH_ADDERS_SUCCESS,
    FETCH_ADDERS_FAILED,
  } from "../store/types";

export const fetchAdders = (uid) => (dispatch) => async (firebase) => {
    const {
        singleAddersRef 
    } = firebase;
  
    dispatch({
        type: FETCH_ADDERS,
        payload: null,
    });
    await singleAddersRef(uid).on('value', snapshot => {
        if(snapshot.val()){
            dispatch({
                type: FETCH_ADDERS_SUCCESS,
                payload: snapshot.val(),
            });
        }else{
            dispatch({
                type: FETCH_ADDERS_FAILED,
                payload: "During fetch the adders, error be cause.",
            });
        }
    })

}
export const updateAdders = (uid,data) => (dispatch) => (firebase) => {
    const {
        singleAddersRef 
    } = firebase;
    dispatch({
        type: FETCH_ADDERS_SUCCESS,
        payload: data,
    });
    singleAddersRef(uid).update(data);
}