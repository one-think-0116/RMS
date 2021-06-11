import {
    FETCH_FORMULAS,
    FETCH_FORMULAS_UPDATE,
    FETCH_FORMULAS_SUCCESS,
    FETCH_FORMULAS_FAILED,
  } from "../store/types";

export const fetchFormulas = () => (dispatch) => async (firebase) => {
    const {
        formulasRef 
    } = firebase;
  
    dispatch({
        type: FETCH_FORMULAS,
        payload: null,
    });
    try{
        formulasRef.on('value', snapshot => {
            if(snapshot.val()){
                dispatch({
                    type: FETCH_FORMULAS_SUCCESS,
                    payload: snapshot.val(),
                });
            }else{
                dispatch({
                    type: FETCH_FORMULAS_SUCCESS,
                    payload: [],
                });
            }
        })
    }catch{
        dispatch({
            type: FETCH_FORMULAS_FAILED,
            payload: "During fetch the formulas, error be cause.",
        });
    }

}
export const updateFormulas = (data) => (dispatch) => (firebase) => {
    const {
        formulasRef 
    } = firebase;
    dispatch({
        type: FETCH_FORMULAS_SUCCESS,
        payload: data,
    });
    formulasRef.update(data);
}