import {
    USER_SIGN_IN,
    USER_SIGN_IN_FAILED
  } from "../store/types";
  export const signIn = (email, password) => (dispatch) => (firebase) => {

    const {
      auth
    } = firebase;
  
    dispatch({
      type: USER_SIGN_IN,
      payload: null
    });
    auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        //OnAuthStateChange takes care of Navigation
      })
      .catch(error => {
        dispatch({
          type: USER_SIGN_IN_FAILED,
          payload: error
        });
      });
  };