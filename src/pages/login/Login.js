import React, { useContext } from "react";
import {
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import data from "./data.json"
import jwt from "jwt-simple"
import { FirebaseContext } from '../../components/Firebase/context';



// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";

// context
import { useUserDispatch} from "../../context/UserContext";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();
  const firebase = useContext(FirebaseContext);
  // local
  const login = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
      if(!!result)
      {
        const email = firebase.auth().currentUser.email;
        const displayName = firebase.auth().currentUser.displayName;
        const photoURL = firebase.auth().currentUser.photoURL;

        firebase.firestore().collection("users").where("email","==",email).get().then((query) => {
          var docs = query.docs;
          if(docs.length > 0){
            console.log("true")
            console.log(docs[0].data())
            var secret = 'secretstar';
            var role = {role:docs[0].data().role,allow: docs[0].data().allow}
            var token = jwt.encode(role, secret);
            localStorage.setItem('name', displayName);
            localStorage.setItem('email', email);
            localStorage.setItem('photoURL', photoURL);
            localStorage.setItem('token', token);
            userDispatch({ type: 'LOGIN_SUCCESS' })
            if(docs[0].data().role === "admin")
              props.history.push('/app/dashboard')
            else props.history.push('/app/calculator')
          }else{
            const role = "seller";
            var date = new Date();
            // const userData = {name: displayName, email: email,role:role,allow:false,club:"Pending"};
            const userData = {name: displayName, email: email,role:role,allow:false,club:"Pending",evaluationDate: date.toLocaleDateString(),lastQtrlySales:"",nextEvaluationDate:date.toLocaleDateString(),other:"",systemNumber:"",teamName:"Pending",photoURL:photoURL};
            firebase.firestore().collection("users").add(userData).then((result) => {
                localStorage.setItem('email', email);
                localStorage.setItem('name', displayName);
                var secret = 'secretstar';
                var role = {role:"seller",allow:false}
                var token = jwt.encode(role, secret);
                localStorage.setItem('token', token);
                localStorage.setItem('photoURL', photoURL);
                data.calc.email = email;
                data.calc.C3 = "";
                data.calc.C4 = displayName;
                data.calc.allow = false;
                let obj = {};
                obj.email = email;
                obj.data = data.adder;
                firebase.firestore().collection("adders").add(obj).then((result) => {
                  firebase.firestore().collection("calculators").add(data.calc).then((result) =>{
                    userDispatch({ type: 'LOGIN_SUCCESS' })
                    props.history.push('/app/adders')
                    }
                  )
                })
            })
          }
          // query1.forEach((doc1) => {
          //     // calcData = doc1.data();
          //     console.log("qwewq",doc1.data())
          // })
        })
      }
  });
  }
  return (
    <Grid container className={classes.container} >
      {/* <div className={classes.logotypeContainer} style={{background:`url("https://www.kindpng.com/picc/m/459-4597522_banking-and-finance-hd-png-download.png")`,
        backgroundRepeat: `no-repeat`,
        backgroundSize: `cover`,
        backgroundPosition: `center`,backgroundSize: `100% 100%`}}> */}
      <div className={classes.logotypeContainer} >
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>RMS Commission</Typography>
        <Button
            onClick={login
            }
            variant="contained"
            color="secondary"
            size="large"
          >
            Login
      </Button>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
