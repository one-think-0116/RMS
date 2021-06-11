import {
    FETCH_MODULE,
    FETCH_MODULE_UPDATE,
    FETCH_MODULE_SUCCESS,
    FETCH_MODULE_FAILED,
  } from "../store/types";
  import { store } from '../store';
export const fetchModule = () => (dispatch) => async (firebase) => {
  const {
    moduleRef 
  } = firebase;

  dispatch({
      type: FETCH_MODULE,
      payload: null,
  });
  try{
    moduleRef.on('value', snapshot => {
      if(snapshot.val()){
          dispatch({
              type: FETCH_MODULE_SUCCESS,
              payload: snapshot.val(),
          });
        }else{
            dispatch({
                type: FETCH_MODULE_SUCCESS,
                payload: [],
            });
        }
    })
  }catch{
    dispatch({
      type: FETCH_MODULE_FAILED,
      payload:"During fetch the module, error be cause.",
  });
  }
  
}
export const updateModule = (data) => (dispatch) => (firebase) => {
  const {
    moduleRef 
  } = firebase;
  dispatch({
      type: FETCH_MODULE_SUCCESS,
      payload: data,
  });
  moduleRef.update(data);
}

export const addModule = (data) => (dispatch) => (firebase) => {
  const {
    moduleRef 
  } = firebase;
  const originalCash = store.getState().modules.info;
  originalCash.push(data);
  dispatch({
      type: FETCH_MODULE_SUCCESS,
      payload: originalCash,
  });
  moduleRef.update(data);
}
export const deleteModule = (data) => (dispatch) => (firebase) => {
  const {
    moduleRef 
  } = firebase;
  dispatch({
      type: FETCH_MODULE_SUCCESS,
      payload: data,
  });
  moduleRef.set(data);
}