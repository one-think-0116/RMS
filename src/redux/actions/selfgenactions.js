import {
    FETCH_SELFGEN,
    FETCH_SELFGEN_UPDATE,
    FETCH_SELFGEN_SUCCESS,
    FETCH_SELFGEN_FAILED,
  } from "../store/types";
  import { store } from '../store';
export const fetchSelfGen = () => (dispatch) => async (firebase) => {
    const {
        selfGenRef 
      } = firebase;
    
      dispatch({
          type: FETCH_SELFGEN,
          payload: null,
      });
      try{
        selfGenRef.on('value', snapshot => {
            if(snapshot.val()){
                dispatch({
                    type: FETCH_SELFGEN_SUCCESS,
                    payload: snapshot.val(),
                });
            }else{
                dispatch({
                    type: FETCH_SELFGEN_SUCCESS,
                    payload: [],
                });
            }
        })
    }catch{
        dispatch({
            type: FETCH_SELFGEN_FAILED,
            payload: "During fetch the module, error be cause.",
        });
    }

      
}
export const updateSelfGen = (data) => (dispatch) => (firebase) => {
    const {
        selfGenRef 
    } = firebase;
    dispatch({
        type: FETCH_SELFGEN_SUCCESS,
        payload: data,
    });
    selfGenRef.update(data);

}

export const addSelfGen = (data) => (dispatch) => (firebase) => {
    const {
        selfGenRef 
    } = firebase;
    const originalCash = store.getState().selfgen.info;
    originalCash.push(data);
    dispatch({
        type: FETCH_SELFGEN_SUCCESS,
        payload: originalCash,
    });
    selfGenRef.update(data);
}
export const deleteSelfGen = (data) => (dispatch) => (firebase) => {
    const {
        selfGenRef 
    } = firebase;
    dispatch({
        type: FETCH_SELFGEN_SUCCESS,
        payload: data,
    });
    selfGenRef.set(data);
}