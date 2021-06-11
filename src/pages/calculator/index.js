import React, { useContext,useEffect } from "react";
// import { Form, Field } from 'react-final-form';
import {
  Select,
  TextField,
  Paper,
  Grid,
  MenuItem,
} from '@material-ui/core';
import { useLoading, ThreeDots} from '@agney/react-loading';
import { makeStyles } from "@material-ui/styles";
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import Fab from '@material-ui/core/Fab';
import $ from "jquery";
// components
import Widget from "../../components/Widget/Widget";

import Notification from "../../components/Notification";
import { ToastContainer, toast } from "react-toastify";
import { Close as CloseIcon } from "@material-ui/icons";
  // styles
  import "react-toastify/dist/ReactToastify.css";
  import useToastStyles from "./styles";

  import { useSelector, useDispatch } from "react-redux";
  import { FirebaseContext } from '../../redux';
  import { core } from "../core";

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}));
var cnt = 0;
var timeid;
var CC3,CC4,CC5,CC6,CC7,CC8,CC9,CC10,
    CC11,CC12,CC13,CC14,CC15,CC16,CC17,
    CC18,CC19,CC20,CC21
    ,FF14,FF15,FF17,FF18,FF19,FF20,FFSelfGen;
export default function Calculator() {
  const { api } = useContext(FirebaseContext);
  const {
    updateCalculator,
    updateAdders
  } = api;
  const auth = useSelector(state => state.auth);
  const calculator = useSelector(state => state.calculator);
  const adders = useSelector(state => state.adders);
  const formulas = useSelector(state => state.formulas);
  const cash = useSelector(state => state.cash);
  const selfgen = useSelector(state => state.selfgen);
  const battery = useSelector(state => state.battery);
  const fee = useSelector(state => state.fee);
  const modules = useSelector(state => state.modules);
  const dispatch = useDispatch();

  var toastClasses = useToastStyles();
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <ThreeDots width="50" />,
  });
  const classes = useStyles();
  const [loading, setLoading] = React.useState(true);
  const [C3, setC3] = React.useState('');
  const [C4, setC4] = React.useState('');
  const [C5, setC5] = React.useState('');
  const [C6, setC6] = React.useState('');
  const [C7, setC7] = React.useState('');
  const [C8, setC8] = React.useState('');
  const [C9, setC9] = React.useState('');
  const [C10, setC10] = React.useState('');
  const [C11, setC11] = React.useState('');
  const [C12, setC12] = React.useState('');
  const [C13, setC13] = React.useState('');
  const [C14, setC14] = React.useState('');
  const [C15, setC15] = React.useState('');
  const [C16, setC16] = React.useState('');
  const [C17, setC17] = React.useState('');
  const [C18, setC18] = React.useState('');
  const [C19, setC19] = React.useState('');
  const [C20, setC20] = React.useState('');
  const [C21, setC21] = React.useState('');
  const [F14, setF14] = React.useState('');
  const [F15, setF15] = React.useState('');
  const [F17, setF17] = React.useState('');
  const [F18, setF18] = React.useState('');
  const [F19, setF19] = React.useState('');
  const [F20, setF20] = React.useState('');
  const [FSelfGen, setFSelfGen] = React.useState('');
  const [dealerFee, setDealerFee] = React.useState([]);
  const [ccash, setCash] = React.useState([]);
  const [bbattery, setBattery] = React.useState([]);
  const [mmodule, setModule] = React.useState([]);
  const [selfgen_lead, setSelfgenLead] = React.useState([]);

      //#####################################toast########################################################
      const sendNotification = (componentProps, options) => {
        return toast(
        <Notification
            {...componentProps}
            className={toastClasses.notificationComponent}
        />,
        options,
        );
    }
    const handleNotificationCall = () => {
        var componentProps;
            componentProps = {
              type: "feedback",
              message: `You do not have permission to use it yet.
                        Please contact your administrator`,
              variant: "contained",
              color: "secondary",
            };
            
        var toastId = sendNotification(componentProps, {
          type: "error",
          position:  toast.POSITION.TOP_CENTER,
          progressClassName: toastClasses.progress,
          className: toastClasses.notification,
        });
    }
    const CloseButton = ({ closeToast, className }) => {
        return <CloseIcon className={className} onClick={closeToast} />;
        }
          
    //#####################################toast########################################################

   const handleChange = async function(event){
    switch(event.target.name){
      case "C7":
        setC7(event.target.value);
        CC7 = event.target.value;
      break;
      case "C8":
        setC8(event.target.value);
        CC8 = event.target.value;
      break;
      case "C9":
        setC9(event.target.value);
        CC9 = event.target.value;
      break;
      case "C12":
        setC12(event.target.value);
        if(event.target.value.indexOf('$') > -1){
          CC12 = event.target.value.split('$')[1];
        }else{
          CC12 = event.target.value;
        }
      break;
      case "C14":
        setC14(event.target.value);
        CC14 = event.target.value;
      break;
      case "C10":
        setC10(event.target.value);
        CC10 = event.target.value;
        calcAdders(CC10);
      break;
      case "C11":
        setC11(event.target.value);
        CC11 = event.target.value;
      break;
    }
    calc();
  };
  const getNum = (str) => {
    if(typeof str === "string"){
        var num;
        if(str.indexOf(",") > -1){
          var str_arr = str.split(",");
          var tempStr = "";
          str_arr.map((item) => {
            tempStr += item;
          })
          num = parseFloat(tempStr)
        }else{
          num = parseFloat(str)
        }
        return num;
    }else
    {
        return str;
    }
  }
  const calcAdders = (sysSize) => {
    let addersData =  adders.info;
    let systemSize = getNum(sysSize);
    var sum = 0;
        for(var i = 0;i < 21;i++)
        {
          addersData[i].sales_cash_price = parseFloat(addersData[i].sales_cash_price);
          switch(addersData[i].scale){
            case "per watt add-on":
                if(addersData[i].quantity === "Yes") addersData[i].total =addersData[i].sales_cash_price * systemSize;
                else addersData[i].total = 0;
              break;
            case "Added price":
                if(addersData[i].quantity === "Yes") addersData[i].total =addersData[i].sales_cash_price;
                else addersData[i].total = 0;
              break;
            case "per foot":
                addersData[i].total = addersData[i].sales_cash_price * addersData[i].quantity;
              break;
            default:
              addersData[i].total = addersData[i].sales_cash_price * addersData[i].quantity;
              break;
          }
          sum += addersData[i].total;
        }
        addersData[22].total = sum;
        CC18 = sum;
        setC18(sum);
        let uid = auth.refinfo.uid;
        dispatch(updateAdders(uid,addersData));
  }
  React.useEffect(() => {
    if(auth.info.profile.allow){
      // style();
      let calcData = calculator.info;
      
      let feeData = fee.info;
      feeData.sort(function(a, b){return a.Fee - b.Fee});
      setDealerFee(feeData);
     
      let cashData = cash.info;
      cashData.sort(function(a, b){return a.cash - b.cash});
      setCash(cashData);
      
      let batteryData = battery.info;
      batteryData.sort(function(a, b){return a.ID - b.ID});
      setBattery(batteryData);
     
      let modulesData = modules.info;
      modulesData.sort(function(a, b){return a.ID - b.ID});
      setModule(modulesData);
      
      let selfgenData = selfgen.info;
      selfgenData.sort(function(a, b){return a.ID - b.ID});
      setSelfgenLead(selfgenData);

      var formulasData = formulas.info;
      var data = core(formulasData,calcData);

      calcData = data.calculator;

      setC3(calcData.C3);CC3 = calcData.C3;
      setC4(calcData.C4);CC4 = calcData.C4;
      setC5(calcData.C5);CC5 = calcData.C5;
      setC6(calcData.C6);CC6 = calcData.C6;
      setC7(calcData.C7);CC7 = calcData.C7;
      setC8(calcData.C8);CC8 = calcData.C8;
      setC9(calcData.C9);CC9 = calcData.C9;
      setC10(calcData.C10);CC10 = calcData.C10;
      setC11(calcData.C11);CC11 = calcData.C11;
      setC12("$" + calcData.C12);CC12 = calcData.C12;
      setC13(calcData.C13);CC13 = calcData.C13;
      setC14(calcData.C14);CC14 = calcData.C14;
      setC15(calcData.C15);CC15 = calcData.C15;
      setC16(calcData.C16);CC16 = calcData.C16;
      setC17(calcData.C17);CC17 = calcData.C17;
      setC18(calcData.C18);CC18 = calcData.C18;
      setC19(calcData.C19);CC19 = calcData.C19;
      setC20(calcData.C20);CC20 = calcData.C20;
      setC21(calcData.C21);CC21 = calcData.C21;
      setF20(calcData.F20);FF20 = calcData.F20;
      setF19(calcData.F19);FF19 = calcData.F19;
      setF18(calcData.F18);FF18 = calcData.F18;
      setF17(calcData.F17);FF17 = calcData.F17;
      setF15(calcData.F15);FF15 = calcData.F15;
      setF14(calcData.F14);FF14 = calcData.F14;
      setFSelfGen(calcData.FSelfGen);FFSelfGen = calcData.FSelfGen;
      // console.log("useeffect")
      
      setLoading(false);
      timeid = setTimeout(() => {
        style()
      }, 10);
    }else{
      setLoading(true);
      if(cnt === 0){
        handleNotificationCall();
        cnt++;
      }
    }
  }, [
    auth.info.profile,
    calculator.info,
    adders.info,
    formulas.info,
    cash.info,
    selfgen.info,
    battery.info,
    fee.info,
    modules.info])
const style = () => {
  //------------------------------------------------------------jquery style--------------------------------------------------
  $("#C3").css({"color":"black"});
  $("#C3").css({"text-align":"center"});
  $("#C4").css({"color":"black"});
  $("#C4").css({"text-align":"center"});
  $("#C10").css({"color":"black"});
  // $("#C10").css({"width":"10%"});
  $("#C10").css({"text-align":"center"});
  $("#C11").css({"color":"black"});
  $("#C11").css({"text-align":"center"});
  $("#C13").css({"color":"black"});
  $("#C13").css({"text-align":"center"});
  $("#C15").css({"color":"black"});
  $("#C15").css({"text-align":"center"});
  $("#C16").css({"color":"black"});
  $("#C16").css({"text-align":"center"});
  $("#C17").css({"color":"black"});
  $("#C17").css({"text-align":"center"});
  $("#C18").css({"color":"black"});
  $("#C18").css({"text-align":"center"});
  $("#C19").css({"color":"black"});
  $("#C19").css({"text-align":"center"});
  $("#C20").css({"color":"black"});
  $("#C20").css({"text-align":"center"});
  $("#C21").css({"color":"black"});
  $("#C21").css({"text-align":"center"});
  $("#F14").css({"color":"black"});
  $("#F14").css({"text-align":"center"});
  $("#F15").css({"color":"black"});
  $("#F15").css({"text-align":"center"});
  $("#F17").css({"color":"black"});
  $("#F17").css({"text-align":"center"});
  $("#FSelfGen").css({"color":"black"});
  $("#FSelfGen").css({"text-align":"center"});
  $("#F18").css({"color":"black"});
  $("#F18").css({"text-align":"center"});
  $("#F19").css({"color":"black"});
  $("#F19").css({"text-align":"center"});
  $("#F20").css({"color":"black"});
  $("#F20").css({"text-align":"center"});
  // console.log("timeid",timeid)
  clearTimeout(timeid)
  //------------------------------------------------------------style end------------------------------------------------------
}
const calc = () => {
   // console.log(C3,C4,C5,C6,C7,C8,C9,C10,C11,C12,C13,"C14",C14,C15,C16,C17,C18,C19,C20,C21,F14,F15,F17,F18,F19,F20)
   // console.log("useeffect")
   
   CC3 = C3;
   CC4 = C4;

   CC10 = parseFloat(getNum(CC10));
   CC11 = parseFloat(getNum(CC11));
   CC12 = parseFloat(CC12);
   // console.log(CC12)
   CC13 = CC11-CC12;
   setC13(CC13);
   //C15=C13-(C13*C14)
   var percent = CC14.split("%")[0]/100;
   CC15 = (CC11-CC12) - (CC11-CC12)*percent;
   setC15(CC15)
   //C16=0.11*C10
   CC16 = CC10*0.11;
   setC16(CC16);
   //C17=If($C$9="Enphase 3kw",+#REF!,IF($C$9="Enphase 10kw",+#REF!,IF($C$9="Panasonic 11kw",+#REF!,IF(C9="Panasonic 17kw",+#REF!,0 ))))
   if(CC9 === "Enphase 3kw") { CC17 = "#REF" }
   else{
     if(CC9 === "Enphase 10kw") { CC17 = "#REF" }
     else{
       if(CC9 === "Panasonic 11kw") { CC17 = "#REF" }
       else{
         if(CC9 === "Panasonic 17kw") { CC17 = "#REF" }
         else { CC17 = "0" }
       }
     }
   }
   setC17(CC17);
   //C18
   // console.log("C18",C18,C10)
   if(CC18 === "") CC18 = "0";
   // setC18("0");
   //C19=C15-C16-C17-C18
   console.log("CC18",CC18)
   CC19 = Math.round((CC15-CC16-CC17-CC18)*100)/100
   setC19(CC19);
   //C20=C19/C10
   CC20 = Math.round(CC19/parseFloat(getNum(CC10))*100)/100
   setC20(CC20);
 
   var calcObj = {
    C3:CC3 || "",
    C4:CC4 || "",
    C5:CC5 || "",
    C6:CC6 || "",
    C7:CC7 || "",
    C8:CC8 || "",
    C9:CC9 || "",
    C10:CC10 || 0,
    C11:CC11 || 0,
    C12:CC12 || 0,
    C13:CC13 || 0,
    C14:CC14 || 0,
    C15:CC15 || 0,
    C16:CC16 || 0,
    C17:CC17 || 0,
    C18:CC18 || 0,
    C19:CC19 || 0,
    C20:CC20 || 0,
    C21:CC21 || "",
   }
   var formulasData = formulas.info;
   var data = core(formulasData,calcObj);
   calcObj = data.calculator;
   let uid = auth.refinfo.uid;
   dispatch(updateCalculator(uid,calcObj));
    // console.log("calc Document successfully update!");
}
return(
  <>
  <ToastContainer 
                className={toastClasses.toastsContainer}
            />
  {loading ?    
    <section {...containerProps} style={{textAlign:"center",marginTop:window.innerHeight/2 - 100}}>
      {indicatorEl} {/* renders only while loading */}
    </section> :
          <Grid container spacing={4}>
             <Grid item lg={12} md={12} sm={12} xs={12} style={{textAlign:"center"}}>
                <Fab variant="extended" color="primary" aria-label="add" style={{textTransform: "inherit",marginRight:10}}>
                  Rep Name   :   {C5}
                </Fab>

                <Fab variant="extended" color="secondary" aria-label="add"  style={{textTransform: "inherit"}}>
                  Rep Status   :   {C6}
                </Fab>                   
             </Grid>
        <Grid item lg={7} md={6} sm={12} xs={12}>
          <Widget title="YOUR COMMISSION Calculator" >
            <Paper style={{ paddingLeft: '4%',paddingRight: '4%' }}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item lg={8} md={6} sm={6} xs={12} style={{textAlign: "center",marginTop: 30}}>
                    System Number
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}  style={{textAlign: "center"}}>
                  <TextField 
                    name="C3" 
                    id="C3" 
                    label="" 
                    value={C3} 
                    // onBlur={handleBlur}
                    onChange={(event) => {setC3(event.target.value);}}
                    style={{textAlign: "center",marginTop: 15,backgroundColor:"rgb(229 255 14)",width: "75%",color:"black"}} />
                </Grid>
                <Grid item lg={8} md={6} sm={6} xs={12} style={{textAlign: "center"}}>
                    Name of Customer
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}  style={{textAlign: "center"}}>
                  <TextField name="C4" id="C4" label="" value={C4} onChange={(event) => {setC4(event.target.value);}} style={{textAlign: "center",marginTop: -12,backgroundColor:"rgb(229 255 14)",width: "75%"}} />
                </Grid>
                {/* <Grid item lg={8} md={6} sm={6} xs={12} style={{textAlign: "center"}}>
                    Select Sales Rep
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}  style={{textAlign: "center",marginTop: -15}}>
                  <Select
                    labelId="C5"
                    name="C5"
                    id="C5"
                    value={C5}
                    onChange={handleChange}
                    style={{textAlign: "center",backgroundColor:"rgb(229 255 14)",width: "75%"}}
                  >
                    <MenuItem value={"Bill Wade"}>Bill Wade</MenuItem>
                    <MenuItem value={"Chandler Brooks"}>Chandler Brooks</MenuItem>
                    <MenuItem value={"Dave Shanholzer"}>Dave Shanholzer</MenuItem>
                    <MenuItem value={"Dustin Moniez"}>Dustin Moniez</MenuItem>
                    <MenuItem value={"Jeff Stover"}>Jeff Stover</MenuItem>
                    <MenuItem value={"Mason Kelso"}>Mason Kelso</MenuItem>
                    <MenuItem value={"Minh LeDuc"}>Minh LeDuc</MenuItem>
                    <MenuItem value={"Perri Fisher"}>Perri Fisher</MenuItem>
                    <MenuItem value={"Peter Kim"}>Peter Kim</MenuItem>
                    <MenuItem value={"Tim Chung"}>Tim Chung</MenuItem>
                  </Select>
                </Grid>
                <Grid item lg={8} md={6} sm={6} xs={12}  style={{textAlign: "center"}}>
                    Select Sales Rep Status level (see next Tab)
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}  style={{textAlign: "center",marginTop: -15}}>
                  <Select
                    labelId="C6"
                    name="C6"
                    value={C6}
                    onChange={handleChange}
                    style={{textAlign: "center",backgroundColor:"rgb(229 255 14)",width: "75%"}}
                    disabled
                  >
                    <MenuItem value={"Bronze"}>Bronze</MenuItem>
                    <MenuItem value={"Silver"}>Silver</MenuItem>
                    <MenuItem value={"Chairman"}>Chairman's Club</MenuItem>
                  </Select>
                </Grid> */}
                <Grid item lg={8} md={6} sm={6} xs={12} style={{textAlign: "center"}}>
                    Select SelfGen Lead
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}  style={{textAlign: "center",marginTop: -15}}>
                  <Select
                    labelId="C7"
                    name="C7"
                    value={C7}
                    onChange={handleChange}
                    style={{textAlign: "center",backgroundColor:"rgb(229 255 14)",width: "75%"}}
                  >
                    { selfgen_lead.map( item => {
                      return (<MenuItem key={item.ID} value={item.selfgen}>{item.selfgen}</MenuItem>)
                    })}
                    {/* <MenuItem value={"Self Gen"}>Self</MenuItem>
                    <MenuItem value={"Company"}>Company</MenuItem> */}
                  </Select>
                </Grid>
                <Grid item lg={8} md={6} sm={6} xs={12} style={{textAlign: "center"}}>
                    Select Module
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}  style={{textAlign: "center",marginTop: -15}}>
                  <Select
                    labelId="C8"
                    name="C8"
                    value={C8}
                    onChange={handleChange}
                    style={{textAlign: "center",backgroundColor:"rgb(229 255 14)",width: "75%"}}
                  >
                    { mmodule.map( item => {
                      return (<MenuItem key={item.ID} value={item.module}>{item.module}</MenuItem>)
                    })}
                    {/* <MenuItem value={"REC 370"}>REC 370</MenuItem>
                    <MenuItem value={"Mission 345"}>Mission 345</MenuItem> */}
                  </Select>
                </Grid>
                <Grid item lg={8} md={6} sm={6} xs={12} style={{textAlign: "center"}}>
                    Select Battery Type
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}  style={{textAlign: "center",marginTop: -15}}>
                  <Select
                    labelId="C9"
                    name="C9"
                    value={C9}
                    onChange={handleChange}
                    style={{textAlign: "center",backgroundColor:"rgb(229 255 14)",width: "75%"}}
                  >
                    { bbattery.map( item => {
                      return (<MenuItem key={item.ID} value={item.battery}>{item.battery}</MenuItem>)
                    })}
                    {/* <MenuItem value={"None"}>None</MenuItem>
                    <MenuItem value={"Enphase 3kw"}>Enphase 3kw</MenuItem>
                    <MenuItem value={"Enphase 10kw"}>Enphase 10kw</MenuItem>
                    <MenuItem value={"Panasonic 11kw"}>Panasonic 11kw</MenuItem>
                    <MenuItem value={"Panasonic 17kw"}>Panasonic 17kw</MenuItem> */}
                  </Select>
                </Grid>
                <Grid item lg={8} md={6} sm={6} xs={12} style={{textAlign: "center"}}>
                    Enter System Size in watts
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}  style={{textAlign: "center",marginTop: -12}}>
                <TextField
                  // onBlur={handleBlur}
                  onChange={handleChange}
                  name="C10"
                  value={C10}
                  id="C10"
                  InputProps={{
                    inputComponent: CountNumber,
                  }}
                  style={{textAlign: "center",backgroundColor:"rgb(229 255 14)",width: "75%"}}
                />
                </Grid>
                <Grid item lg={8} md={6} sm={6} xs={12} style={{textAlign: "center"}}>
                    Total System Price from Sighten Proposal
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}  style={{textAlign: "center",marginTop: -12}}>
                <TextField
                  // onBlur={handleBlur}
                  onChange={handleChange}
                  name="C11"
                  value={C11}
                  id="C11"
                  InputProps={{
                    inputComponent: MoneyNumber,
                  }}
                  style={{textAlign: "center",backgroundColor:"rgb(229 255 14)",width: "75%"}}
                />
                </Grid>
                <Grid item lg={8} md={6} sm={6} xs={12} style={{textAlign: "center",color: "#fb00c5"}}>
                    Select Cash Back to Customer
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}  style={{textAlign: "center",marginTop: -15}}>
                  <Select
                    labelId="C12"
                    name="C12"
                    value={C12}
                    onChange={handleChange}
                    style={{textAlign: "center",backgroundColor:"rgb(229 255 14)",width: "75%"}}
                  >
                    { ccash.map( item => {
                      return (<MenuItem key={item.ID} value={'$' + item.cash}>${item.cash}</MenuItem>)
                    })}
                    {/* <MenuItem value={"$0"}>$0</MenuItem>
                    <MenuItem value={"$1000"}>$1000</MenuItem>
                    <MenuItem value={"$2000"}>$2000</MenuItem> */}
                  </Select>
                </Grid>
                <Grid item lg={8} md={6} sm={6} xs={12} style={{textAlign: "center",color: "#fb00c5"}}>
                    Total System Price after Cash Back
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}  style={{textAlign: "center",marginTop: -12}}>
                <TextField
                  // onBlur={handleBlur}
                  // onChange={handleChange}
                  name="C13"
                  value={C13}
                  id="C13"
                  InputProps={{
                    inputComponent: MoneyNumber,
                  }}
                  style={{width: "75%"}}
                  disabled
                />
                </Grid>
                <Grid item lg={8} md={6} sm={6} xs={12} style={{textAlign: "center"}}>
                    Select Dealer Fee
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}  style={{textAlign: "center",marginTop: -15}}>
                  <Select
                    labelId="C14"
                    name="C14"
                    value={C14}
                    onChange={handleChange}
                    style={{textAlign: "center",backgroundColor:"rgb(229 255 14)",width: "75%"}}
                  >
                    { dealerFee.map( item => {
                      return (<MenuItem key={item.ID} value={item.Fee + "%"}>{item.Fee}%</MenuItem>)
                    })}
                    {/* <MenuItem value={"0%"}>0%</MenuItem>
                    <MenuItem value={"20%"}>20%</MenuItem>
                    <MenuItem value={"24%"}>24%</MenuItem>
                    <MenuItem value={"24.5%"}>24.5%</MenuItem>
                    <MenuItem value={"25%"}>25%</MenuItem>
                    <MenuItem value={"25.5%"}>25.5%</MenuItem>
                    <MenuItem value={"30%"}>30%</MenuItem> */}
                  </Select>
                </Grid>
                <Grid item lg={8} md={6} sm={6} xs={12} style={{textAlign: "center"}}>
                    System Price without Dealer Fee
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}  style={{textAlign: "center",marginTop: -12}}>
                <TextField
                  // onBlur={handleBlur}
                  name="C15"
                  value={C15}
                  id="C15"
                  InputProps={{
                    inputComponent: MoneyNumber,
                  }}
                  style={{width: "75%"}}
                  disabled
                />
                </Grid>
                <Grid item lg={8} md={6} sm={6} xs={12} style={{textAlign: "center"}}>
                    Solar Insure Adder (automatic)
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}  style={{textAlign: "center",marginTop: -12}}>
                <TextField
                  // onBlur={handleBlur}
                  name="C16"
                  value={C16}
                  id="C16"
                  InputProps={{
                    inputComponent: MoneyNumber,
                  }}
                  style={{width: "75%"}}
                  disabled
                />
                </Grid>
                <Grid item lg={8} md={6} sm={6} xs={12} style={{textAlign: "center"}}>
                    Battery Price (automatic)
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}  style={{textAlign: "center",marginTop: -12}}>
                <TextField
                  // onBlur={handleBlur}
                  name="C17"
                  value={C17}
                  id="C17"
                  InputProps={{
                    inputComponent: MoneyNumber,
                  }}
                  style={{width: "75%"}}
                  disabled
                />
                </Grid>
                <Grid item lg={8} md={6} sm={6} xs={12} style={{textAlign: "center"}}>
                    Total of ALL Adders
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}  style={{textAlign: "center",marginTop: -12}}>
                <TextField
                  // onBlur={handleBlur}
                  name="C18"
                  value={C18}
                  id="C18"
                  InputProps={{
                    inputComponent: MoneyNumber,
                  }}
                  disabled
                  style={{backgroundColor:"rgb(229 255 14)",width: "75%"}}
                />
                </Grid>
                <Grid item lg={8} md={6} sm={6} xs={12} style={{textAlign: "center",fontWeight:"bolder"}}>
                    System Price (This is the Solar Portion only)
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}  style={{textAlign: "center",marginTop: -12}}>
                <TextField
                  // onBlur={handleBlur}
                  name="C19"
                  value={C19}
                  id="C19"
                  InputProps={{
                    inputComponent: MoneyNumber,
                  }}
                  style={{width: "75%"}}
                  disabled
                  
                />
                </Grid>
                <Grid item lg={8} md={6} sm={6} xs={12} style={{textAlign: "center",fontWeight:"bolder"}}>
                    System Price per Watt (Solar Portion Only)
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}  style={{textAlign: "center",marginTop: -12}}>
                <TextField
                  // onBlur={handleBlur}
                  name="C20"
                  value={C20}
                  id="C20"
                  InputProps={{
                    inputComponent: MoneyNumber,
                  }}
                  disabled
                  style={{backgroundColor:"#38fbe0",width: "75%"}}
                />
                </Grid>
                <Grid item lg={8} md={6} sm={6} xs={12} style={{textAlign: "center",color: "#fb00c5"}}>
                    Status of Sale
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}  style={{textAlign: "center"}}>
                  <TextField id="C21" label="" value={C21} style={{textAlign: "center",marginTop: -12,width: "75%"}} disabled/>
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                
                </Grid>
              </Grid>
            </Paper>
          </Widget>
        </Grid>
        <Grid item lg={5} md={6} sm={12} xs={12}>
          <Widget title="COMMISSION BREAKDOWN">
          <Paper style={{ paddingLeft: "4%",paddingRight: "4%" }}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item lg={6} md={6} sm={6} xs={12} style={{textAlign: "center",marginTop:20}}>
                Total Overrage per watt
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}  style={{textAlign: "center",marginTop: 8}}>
                <TextField
                  // onChange={handleChange}
                  name="F14"
                  value={F14}
                  id="F14"
                  InputProps={{
                    inputComponent: MoneyNumber,
                  }}
                  style={{width: "75%"}}
                  disabled
                />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12} style={{textAlign: "center"}}>
                Reps' Share of Overrage/watt
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}  style={{textAlign: "center",marginTop: -12}}>
                <TextField
                  // onChange={handleChange}
                  name="F15"
                  value={F15}
                  id="F15"
                  InputProps={{
                    inputComponent: MoneyNumber,
                  }}
                  style={{width: "75%"}}
                  disabled
                />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12} style={{textAlign: "center"}}>
                BaseLine Commission
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}  style={{textAlign: "center",marginTop: -12}}>
                <TextField
                  // onChange={handleChange}
                  name="F17"
                  value={F17}
                  id="F17"
                  InputProps={{
                    inputComponent: MoneyNumber,
                  }}
                  style={{width: "75%"}}
                  disabled
                />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12} style={{textAlign: "center"}}>
                Self Gen Commission
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}  style={{textAlign: "center",marginTop: -12}}>
                <TextField
                  // onChange={handleChange}
                  name="FSelfGen"
                  value={FSelfGen}
                  id="FSelfGen"
                  InputProps={{
                    inputComponent: MoneyNumber,
                  }}
                  style={{width: "75%"}}
                  disabled
                />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12} style={{textAlign: "center"}}>
                Overrage Commission
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}  style={{textAlign: "center",marginTop: -12}}>
                <TextField
                  // onChange={handleChange}
                  name="F18"
                  value={F18}
                  id="F18"
                  InputProps={{
                    inputComponent: MoneyNumber,
                  }}
                  style={{width: "75%"}}
                  disabled
                />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12} style={{textAlign: "center"}}>
                Battery Commission
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}  style={{textAlign: "center",marginTop: -12}}>
                <TextField
                  // onChange={handleChange}
                  name="F19"
                  value={F19}
                  id="F19"
                  InputProps={{
                    inputComponent: MoneyNumber,
                  }}
                  style={{width: "75%"}}
                  disabled
                />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12} style={{textAlign: "center"}}>
                Total Commission (Solar+Storage)
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}  style={{textAlign: "center",marginTop: -12}}>
                <TextField
                  // onChange={handleChange}
                  name="F20"
                  value={F20}
                  id="F20"
                  InputProps={{
                    inputComponent: MoneyNumber,
                  }}
                  disabled
                  style={{backgroundColor:"#65ea44",width: "75%"}}
                />
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                
                </Grid>
              </Grid>
            </Paper>
          </Widget>
        </Grid>
      </Grid>
  }
  </>
)

  // return (
  //   <>

  //   </>
  // );
}
function MoneyNumber(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

MoneyNumber.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
function CountNumber(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
}

CountNumber.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};