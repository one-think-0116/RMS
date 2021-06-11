import {
    FETCH_USER,
    USER_SIGN_IN,
    USER_SIGN_IN_SUCCESS,
    USER_SIGN_IN_FAILED,
    USER_DELETED,
    UPDATE_USER_PROFILE,
    USER_SIGN_OUT,
    FETCH_USER_SUCCESS,
    USER_CHECK,
    USER_CHECKED,
  } from "../store/types";
  import data from "./data.json";
  import { store } from '../store';
  export const fetchUser = () => (dispatch) => (firebase) => {
    const {
      auth,
      singleUserRef,
      settingsRef,
    } = firebase;
  
    dispatch({
      type: FETCH_USER,
      payload: null
    });
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log("auto call")
        singleUserRef(user.uid).on("value", snapshot => {
          if (snapshot.val()) {
            localStorage.setItem("Id",user.uid)
            user.profile = snapshot.val();
              dispatch({
              type: FETCH_USER_SUCCESS,
              payload: user
            });        
            // if (user.profile.allow) {
            //   // dispatch({
            //   //   type: FETCH_USER_SUCCESS,
            //   //   payload: user
            //   // });
            // } else {
            //   // auth.signOut();
            //   // dispatch({
            //   //   type: USER_SIGN_IN_FAILED,
            //   //   payload: { code: "Auth error", message: "Server error" }
            //   // });
            // }
          }
        });
      }
    })
  }

  export const signIn = () => (dispatch) => (firebase) => {
    const {
      auth,
      googleProvider,
    } = firebase;
  
    dispatch({
      type: USER_SIGN_IN,
      payload: null
    });
    // console.log("beforesign",auth.currentUser.email)
    auth.signInWithPopup(googleProvider).then(result => {
      if(!!result){
        let data = {};
        data.email = auth.currentUser.email;
        data.displayName = auth.currentUser.displayName;
        data.photoURL = auth.currentUser.photoURL;
        data.uid = auth.currentUser.uid
        dispatch({
          type: USER_SIGN_IN_SUCCESS,
          payload: data
        });
      }else{
        dispatch({
          type: USER_SIGN_IN_FAILED,
          payload: "User dosen't exist"
        });
      }
    });
}
export const checkStatus = () => (dispatch) => (firebase) => {
  const {
    usersRef,
  } = firebase;
  if(localStorage.getItem("Id")){
    let uid = localStorage.getItem("Id");
    console.log("check user")
    try{
      usersRef.child(uid).get().then(async (docSnapshot) => {
        if(docSnapshot.val()){
          let data = {};
          data.email = docSnapshot.val().email;
          data.displayName = docSnapshot.val().name;
          data.photoURL = docSnapshot.val().photoURL;
          data.uid = uid
          dispatch({
            type: USER_SIGN_IN_SUCCESS,
            payload: data
          });
        }
      })
    }catch{
      console.log("no check error")
    }
    
  }
}
export const checkUser = (uid) => (dispatch) => async (firebase) => {
  const {
    usersRef,
    singleUserRef,
    singleCalculatorsRef,
    singleAddersRef,
    auth
  } = firebase;
  dispatch({
    type: USER_CHECK,
    payload: false
  });
  usersRef.child(uid).get().then(async (docSnapshot) => {
    if(docSnapshot.val()){
      dispatch({
        type: USER_CHECKED,
        payload: true
      });
    }else{
      const role = "seller";
      var date = new Date();
      let userData = {name: store.getState().auth.refinfo.displayName,
                        email: store.getState().auth.refinfo.email,
                        role:role,
                        photoURL:store.getState().auth.refinfo.photoURL,
                        allow:false,
                        club:"Pending",
                        evaluationDate: date.toLocaleDateString(),
                        lastQtrlySales:"",
                        nextEvaluationDate:date.toLocaleDateString(),
                        other:"",
                        systemNumber:"",
                        teamName:"Pending",
                        photoURL:store.getState().auth.refinfo.photoURL
                      };
      if(store.getState().auth.refinfo.email === "rsefrioui40@gmail.com") {userData.role = "admin";
                                                                            userData.club = "Silver";
                                                                            userData.teamName = "Arizona";
                                                                            userData.systemNumber = "TX";
                                                                            userData.allow = true;
                                                                          };
      let uid = store.getState().auth.refinfo.uid;
      await singleUserRef(uid).set(userData);
      data.calc.C3 = "";
      data.calc.C4 = "";
      data.calc.allow = false;
      await singleCalculatorsRef(uid).set(data.calc);
      await singleAddersRef(uid).set(data.adder);
      dispatch({
        type: USER_CHECKED,
        payload: true
      });
    }
  });
}
  export const signOut = () => (dispatch) => async (firebase) => {

    const {
      auth,
    } = firebase;
    localStorage.removeItem("Id");
    dispatch({
      type: USER_SIGN_OUT,
      payload: null
    });
    auth.signOut();
  };
  export const deleteUser = (uid) => (dispatch) => (firebase) => {
    const {
      singleUserRef,
      auth
    } = firebase;
  
    singleUserRef(uid).remove().then(() => {
      if (auth.currentUser.uid == uid) {
        auth.signOut();
        dispatch({
          type: USER_DELETED,
          payload: null
        });
      }
    });
  };
  
  export const updateProfile = (userAuthData, updateData) => (dispatch) => (firebase) => {
  
    const {
      singleUserRef,
    } = firebase;
  
    let profile = userAuthData.profile;
    profile = { ...profile, ...updateData }
    dispatch({
      type: UPDATE_USER_PROFILE,
      payload: profile
    });
    singleUserRef(userAuthData.uid).update(updateData);
  };