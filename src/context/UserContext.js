import React  from "react";
var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("email"),
  });
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut, signUp,userReducer };

// ###########################################################

function loginUser(dispatch,email, password, history, setIsLoading, setError,firebase) {
//   setError(false);
//   setIsLoading(true);

//   firebase.firestore().collection("users").where("email","==",email).get().then((querySnapshot) => {
//     var docs = querySnapshot.docs;
//     if(docs.length > 0) //update documentation
//     {
//       querySnapshot.forEach((doc) => {
//         if(password == doc.data().password){
//           // firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
//           //   // Send token to your backend via HTTPS
//           //   console.log("idToken",idToken)
//           //   // ...
//           // }).catch(function(error) {
//           //   // Handle error
//           // });
//           var secret = 'secretstar';
//           var role = {role:doc.data().role,allow: doc.data().allow}
//           var token = jwt.encode(role, secret);
//           localStorage.setItem('name', doc.data().name);
//           localStorage.setItem('email', email);
//           localStorage.setItem('token', token);
//           setError(null)
//           setIsLoading(false)
//           dispatch({ type: 'LOGIN_SUCCESS' })
//         }else{
//           // dispatch({ type: "LOGIN_FAILURE" });
//           setError(true);
//           setIsLoading(false); 
//         }
//       })
//     }
//     else //add documentation
//     {
//       // dispatch({ type: "LOGIN_FAILURE" });
//       setError(true);
//       setIsLoading(false); 
//     }
// })
}
function signUp(dispatch,userName, email, password, history, setIsLoading, setError,firebase) {
  // setError(false);
  // setIsLoading(true);
  // const role = "seller";
  // const userData = {name: userName, email: email, password: password,role:role};
  // firebase.firestore().collection("users").add(userData).then((result) => {
  //     localStorage.setItem('email', email);
  //     localStorage.setItem('name', userName);
  //     var secret = 'secretstar';
  //     var role = {role:"seller",allow:false}
  //     var token = jwt.encode(role, secret);
  //     localStorage.setItem('token', token);
  //     data.calc.email = email;
  //     data.calc.C3 = "TX";
  //     data.calc.C4 = userName;
  //     let obj = {};
  //     obj.email = email;
  //     obj.data = data.adder;
  //     firebase.firestore().collection("adders").add(obj).then((result) => {
  //       firebase.firestore().collection("calculators").add(data.calc).then((result) =>{
  //         setError(null)
  //         setIsLoading(false)
  //         dispatch({ type: 'LOGIN_SUCCESS' })
  //         history.push('/app/dashboard')
  //         }
  //       )
  //     })
  // }).catch((error) => {
  //     dispatch({ type: "LOGIN_FAILURE" });
  //     setError(true);
  //     setIsLoading(false); 
  // });
}


function signOut(dispatch, history) {
  localStorage.removeItem("email");
  localStorage.removeItem("name");
  localStorage.removeItem("token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
