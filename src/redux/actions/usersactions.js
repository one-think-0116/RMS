import {
    FETCH_USERS,
    FETCH_USERS_UPDATE,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILED,
  } from "../store/types";
  import { store } from '../store';
export const fetchUsers = () => (dispatch) => async (firebase) => {
    const {
        usersRef,
      } = firebase;
    
      dispatch({
          type: FETCH_USERS,
          payload: null,
      });
      try{
        usersRef.on('value', snapshot => {
            if(snapshot.val()){
                dispatch({
                    type: FETCH_USERS_SUCCESS,
                    payload: snapshot.val(),
                });
            }else{
                dispatch({
                    type: FETCH_USERS_SUCCESS,
                    payload: [],
                });
            }
        })
        }catch{
            dispatch({
                type: FETCH_USERS_FAILED,
                payload: "During fetch the module, error be cause.",
            });
        }
      

}
export const updateUsers = (useruid,data) => (dispatch) => (firebase) => {
    const {
        singleUserRef 
      } = firebase;
      let originalData = store.getState().users.info;
      let newData = {};
      Object.keys(originalData).map((key) => {
        if(key === useruid) originalData[key] = data;
        const {uid,id,...freshData} = originalData[key];
        newData[key] = freshData;
      })
        dispatch({
            type: FETCH_USERS_SUCCESS,
            payload: newData,
        });
      const {uid,id,...saveData} = data;
      singleUserRef(useruid).update(saveData);
}

export const deleteUsers = (useruid) => (dispatch) => (firebase) => {

    const {
        singleUserRef,
        singleCalculatorsRef,
        singleAddersRef
      } = firebase;
      let originalData = store.getState().users.info;
      let newData = {};
      Object.keys(originalData).map((key) => {
        if(key !== useruid) {
            const {uid,id,...freshData} = originalData[key];
            newData[key] = freshData;
        };
      })
      dispatch({
            type: FETCH_USERS_SUCCESS,
            payload: newData,
        });
        singleUserRef(useruid).remove();
        singleCalculatorsRef(useruid).remove();
        singleAddersRef(useruid).remove();
}