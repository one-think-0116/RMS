import {
    FETCH_GUIDE,
    FETCH_GUIDE_UPDATE,
    FETCH_GUIDE_SUCCESS,
    FETCH_GUIDE_FAILED,
  } from "../store/types";

export const fetchGuide = () => (dispatch) => async (firebase) => {
    const {
        guideRef 
    } = firebase;
  
    dispatch({
        type: FETCH_GUIDE,
        payload: null,
    });
    try{
        guideRef.on('value', snapshot => {
            if(snapshot.val()){
                dispatch({
                    type: FETCH_GUIDE_SUCCESS,
                    payload: snapshot.val(),
                });
            }else{
                dispatch({
                    type: FETCH_GUIDE_SUCCESS,
                    payload: [],
                });
            }
        })
    }catch{
        dispatch({
            type: FETCH_GUIDE_FAILED,
            payload: "During fetch the guide, error be cause.",
        });
    }
    
}
export const updateGuide = (data) => (dispatch) => (firebase) => {
    const {
        guideRef 
    } = firebase;
    dispatch({
        type: FETCH_GUIDE_SUCCESS,
        payload: data,
    });
    guideRef.update(data);
}
