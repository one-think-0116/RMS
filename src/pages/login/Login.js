import React, { useContext,useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import CircularLoading from "../../components/CircularLoading";

import { withRouter } from "react-router-dom";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";

import { useSelector, useDispatch } from "react-redux";
import { FirebaseContext } from '../../redux';

function Login(props) {
  const { api } = useContext(FirebaseContext);
  const {
    signIn,
    checkUser,
    fetchUser,
    fetchCalculator,
    fetchAdders,
    fetchFormulas,
    fetchBattery,
    fetchCash,
    fetchFee,
    fetchGuide,
    fetchModule,
    fetchSelfGen,
    fetchUsers,
    authenticate,
    checkStatus
  } = api;
  const auth = useSelector(state => state.auth);
  const adders = useSelector(state => state.adders);
  const calculator = useSelector(state => state.calculator);
  const battery = useSelector(state => state.battery);
  const cash = useSelector(state => state.cash);
  const fee = useSelector(state => state.fee);
  const guide = useSelector(state => state.guide);
  const modules = useSelector(state => state.modules);
  const selfgen = useSelector(state => state.selfgen);
  const users = useSelector(state => state.users);
  const authenticated = useSelector(state => state.authenticated);
  const dispatch = useDispatch();
  var classes = useStyles();
  useEffect(() => {
    dispatch(checkStatus());
  }, [])
  useEffect(() => {
    if(auth.refinfo){
      let uid = auth.refinfo.uid
      dispatch(checkUser(uid));
    }
  }, [auth.refinfo])
  useEffect(() => {
    if(auth.check){
      dispatch(fetchUser());
    }
  }, [auth.check])
  const getData = async (role) =>  {
    let uid = auth.refinfo.uid
    if(role === "seller"){
      await dispatch(fetchCalculator(uid));
      await dispatch(fetchAdders(uid));
      await dispatch(fetchFormulas());
      await dispatch(fetchBattery());
      await dispatch(fetchCash());
      await dispatch(fetchFee());
      await dispatch(fetchModule());
      await dispatch(fetchSelfGen());
    }else{
      await dispatch(fetchCalculator(uid));
      await dispatch(fetchAdders(uid));
      await dispatch(fetchFormulas());
      await dispatch(fetchBattery());
      await dispatch(fetchCash());
      await dispatch(fetchFee());
      await dispatch(fetchModule());
      await dispatch(fetchSelfGen());
      await dispatch(fetchGuide());
      await dispatch(fetchUsers());
    }
    if(selfgen.info){
      await dispatch(authenticate(true));
      props.history.push('/app/calculator')
    }
  }
  useEffect(() => {
    if(auth.info){
      getData(auth.info.profile.role)
    }
  }, [auth.info,selfgen.info,dispatch,fetchCalculator,fetchAdders,fetchFormulas,fetchBattery,fetchCash,fetchFee,fetchModule,fetchSelfGen,fetchGuide,fetchUsers,authenticate])
  const login = () => {
    dispatch(signIn());
  }
  return (
    <>
    {
      // auth.refinfo && !authenticated.status ?
      localStorage.getItem("Id") ?
      <CircularLoading />
      :
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
    }
    </>
    
  );
}

export default withRouter(Login);
