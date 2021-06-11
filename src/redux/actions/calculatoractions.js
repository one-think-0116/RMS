import {
    FETCH_CALCULATOR,
    FETCH_CALCULATOR_UPDATE,
    FETCH_CALCULATOR_SUCCESS,
    FETCH_CALCULATOR_FAILED,
  } from "../store/types";

export const fetchCalculator = (uid) => (dispatch) => async (firebase) => {
    const {
        singleCalculatorsRef 
    } = firebase;
  
    dispatch({
        type: FETCH_CALCULATOR,
        payload: null,
    });
    await singleCalculatorsRef(uid).on('value', snapshot => {
        if(snapshot.val()){
            dispatch({
                type: FETCH_CALCULATOR_SUCCESS,
                payload: snapshot.val(),
            });
        }else{
            dispatch({
                type: FETCH_CALCULATOR_FAILED,
                payload: "During fetch the calculator, error be cause.",
            });
        }
    })

}
export const updateCalculator = (uid,data) => (dispatch) => (firebase) => {
    const {
        singleCalculatorsRef 
    } = firebase;
    dispatch({
        type: FETCH_CALCULATOR_SUCCESS,
        payload: data,
    });
    singleCalculatorsRef(uid).update(data);
}

export const updateCalculatorRefAdder = (uid,data) => (dispatch) => (firebase) => {
    const {
        singleCalculatorsRef 
    } = firebase;
    singleCalculatorsRef(uid).update(data);
}