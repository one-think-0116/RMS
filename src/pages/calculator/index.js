import React ,{useContext,useEffect} from "react";
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
import NavigationIcon from '@material-ui/icons/Navigation';
import $ from "jquery";
// components
import Widget from "../../components/Widget/Widget";
import { FirebaseContext } from '../../components/Firebase/context';

import Notification from "../../components/Notification";
import { ToastContainer, toast } from "react-toastify";
import { Close as CloseIcon } from "@material-ui/icons";
  // styles
  import "react-toastify/dist/ReactToastify.css";
  import useToastStyles from "./styles";

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))
let cnt = 0;
export default function Calculator() {
  var toastClasses = useToastStyles();
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <ThreeDots width="50" />,
  });
  const firebase = useContext(FirebaseContext);
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
  const [cash, setCash] = React.useState([]);

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

  // const handleBlur = (event) => {
  //   console.log("handleBlur")
  //   switch(event.target.name){
  //     case "C3":
  //       setC3(event.target.value);
  //     break;
  //     case "C4":
  //       setC4(event.target.value);
  //     break;
  //     case "C10":
  //       setC10(event.target.value);
  //     break;
  //     case "C11":
  //       setC11(event.target.value.split("$")[1]);
  //     break;
  //     // disabled
  //     // case "C13":
  //     //   setC13(event.target.value);
  //     // break;
  //     // case "C15":
  //     //   setC15(event.target.value);
  //     // break;
  //     // case "C16":
  //     //   setC16(event.target.value);
  //     // break;
  //     // case "C17":
  //     //   setC17(event.target.value);
  //     // break;
  //     // case "C18":
  //     //   setC18(event.target.value);
  //     // break;
  //     // case "C19":
  //     //   setC19(event.target.value);
  //     // break;
  //     // case "C20":
  //     //   setC20(event.target.value);
  //     // break;
  //     // case "C21":
  //     //   setC21(event.target.value);
  //     // break;
  //     default:
  //     break;
  //   }

  // }
  const handleChange = (event) => {
    // console.log("handle change")
    switch(event.target.name){
      
      // case "C5":
      //   setC5(event.target.value);
      // break;
      // case "C6":
      //   setC6(event.target.value);
      // break;
      case "C7":
        setC7(event.target.value);
      break;
      case "C8":
        setC8(event.target.value);
      break;
      case "C9":
        setC9(event.target.value);
      break;
      case "C12":
        setC12(event.target.value);
      break;
      case "C14":
        setC14(event.target.value);
      break;
      case "C10":
        setC10(event.target.value);
      break;
      case "C11":
        setC11(event.target.value);
      break;
      // case "C21":
      //   setC21(event.target.value);
      // break;
      // case "F14":
      //   setF14(event.target.value);
      // break;
      // case "F15":
      //   setF15(event.target.value);
      // break;
      // case "F17":
      //   setF17(event.target.value);
      // break;
      // case "F18":
      //   setF18(event.target.value);
      // break;
      // case "F19":
      //   setF19(event.target.value);
      // break;
      // case "F20":
      //   setF20(event.target.value);
      // break;
    }
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
  const cutDecimal = (data,limit,to) => {
      let numstr;
      let splitArray;
      let result;
      if(isNaN(data)){
          return null
      }else
      {
          if(typeof data === "string"){
              numstr = data;
          }else if(typeof data === "number"){
              numstr = data.toString();
          }else{
              return data;
          }
          if(numstr.indexOf(".") > -1){
              splitArray = numstr.split('.');
              if(splitArray[1].length > limit){
                  result = Math.round(parseFloat(numstr)*Math.pow(10,limit))/Math.pow(10,limit);
                  return to === "Number" ? result: result.toString();
              }else{
                  return to === "Number" ? parseFloat(numstr): numstr 
              }
          }else{
              return to === "Number" ? parseFloat(numstr):numstr;
          }
      }
  }

  React.useEffect(() => {
    firebase.firestore().collection("users").where("email","==",localStorage.getItem("email")).get().then((query) => {
        query.forEach((doc) => {
          if(doc.data().allow)
          {
            // console.log("123",doc.data())
            firebase.firestore().collection("calculators").where("email","==",localStorage.getItem("email")).get().then((query) => {
              query.forEach((doc) => {
                firebase.firestore().collection("fee").get().then((query) => {
                  query.forEach((docfee) => {
                    const feedata = docfee.data().data;
                    feedata.sort(function(a, b){return a.Fee - b.Fee});
                    setDealerFee(feedata);
                    // firebase.firestore().collection("fee").get().then((query) => {
                    //   query.forEach((docfee) => {
                    //     const feedata = docfee.data().data;
                    //     feedata.sort(function(a, b){return a.Fee - b.Fee});
                    //     setDealerFee(feedata);
                    //   })
                    // })
                    firebase.firestore().collection("cash").get().then((query) => {
                      query.forEach((doccash) => {
                        const cashData = doccash.data().data;
                        cashData.sort(function(a, b){return a.cash - b.cash});
                        setCash(cashData);

                        setC3(doc.data().C3);
                        setC4(doc.data().C4);
                        setC5(doc.data().C5);
                        setC6(doc.data().C6);
                        setC7(doc.data().C7);
                        setC8(doc.data().C8);
                        setC9(doc.data().C9);
                        setC10(doc.data().C10);
                        setC11(doc.data().C11);
                        setC12("$" + doc.data().C12);
                        setC13(doc.data().C13);
                        setC14(doc.data().C14);
                        setC15(doc.data().C15);
                        setC16(doc.data().C16);
                        setC17(doc.data().C17);
                        // console.log("dbC18",doc.data().C18,doc.data())
                        if(doc.data().C18 === "") setC18("0");
                        else setC18(doc.data().C18);
                        // setC18(doc.data().C18);
                        setC19(doc.data().C19);
                        setC20(doc.data().C20);
                        setC21(doc.data().C21);
                        setF14(doc.data().F14);
                        setF15(doc.data().F15);
                        setF17(doc.data().F17);
                        setF18(doc.data().F18);
                        setF19(doc.data().F19);
                        setF20(doc.data().F20);
                        setFSelfGen(doc.data().FSelfGen);
                      })
                    })
                  })
                })
              })
            })
          }else{
          }
        })
      })
  }, [])
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
  //------------------------------------------------------------style end------------------------------------------------------
}
useEffect(() => { 
  // console.log(C3,C4,C5,C6,C7,C8,C9,C10,C11,C12,C13,"C14",C14,C15,C16,C17,C18,C19,C20,C21,F14,F15,F17,F18,F19,F20)
  style();
  // console.log("useeffect")
  var CC3,CC4,CC5,CC6,CC7,CC8,CC9,CC10,CC11,CC12,CC13,CC14,CC15,CC16,CC17,CC18,CC19,CC20,CC21;
  CC3 = C3;
  CC4 = C4;
  CC5 = C5;
  CC6 = C6;
  CC7 = C7;
  CC8 = C8;
  CC9 = C9;
  CC10 = parseFloat(getNum(C10));
  CC11 = parseFloat(getNum(C11));
  CC12 = parseFloat(C12.split("$")[1]);
  // console.log(CC12)
  CC13 = CC11-CC12;
  setC13(CC13);
  //C15=C13-(C13*C14)
  CC14 = C14;
  var percent = CC14.split("%")[0]/100;
  CC15 = (CC11-CC12) - (CC11-CC12)*percent;
  setC15(CC15)
  //C16=0.11*C10
  CC16 = CC10*0.11;
  setC16(CC16);
  //C17=If($C$9="Enphase 3kw",+#REF!,IF($C$9="Enphase 10kw",+#REF!,IF($C$9="Panasonic 11kw",+#REF!,IF(C9="Panasonic 17kw",+#REF!,0 ))))
  if(C9 === "Enphase 3kw") { CC17 = "#REF" }
  else{
    if(C9 === "Enphase 10kw") { CC17 = "#REF" }
    else{
      if(C9 === "Panasonic 11kw") { CC17 = "#REF" }
      else{
        if(C9 === "Panasonic 17kw") { CC17 = "#REF" }
        else { CC17 = "0" }
      }
    }
  }
  setC17(CC17);
  //C18
  CC18 = C18;
  // console.log("C18",C18,C10)
  if(CC18 === "") CC18 = "0";
  // setC18("0");
  //C19=C15-C16-C17-C18
  CC19 = Math.round((CC15-CC16-CC17-CC18)*100)/100
  setC19(CC19);
  //C20=C19/C10
  CC20 = Math.round(CC19/parseFloat(getNum(CC10))*100)/100
  setC20(CC20);
  //F  calcul...............................................
  var formulasRef = firebase.database().ref('MINIFORMULAS');
  formulasRef.on('value', (snapshot) => {
  const fData = snapshot.val();
    
    var fC4,fC5;
    fC4 = parseFloat(getNum(fData.B4)) / parseFloat(getNum(fData.A4)) * 100;
    fC4 = cutDecimal(fC4,2,"Number");
    fC5 = parseFloat(getNum(fData.B5)) / parseFloat(getNum(fData.A5)) * 100;
    fC5 = cutDecimal(fC5,2,"Number");
    //E4=(D4+B4)/((A4/0.8))
    var fE4,fE5;
    fE4 = (parseFloat(getNum(fData.D4)) + parseFloat(getNum(fData.B4)))/(parseFloat(getNum(fData.A4))/0.8) *100;
    fE4 = cutDecimal(fE4,2,"Number");
    //E5=(D5+B5)/((A5/0.8))
    fE5 = (parseFloat(getNum(fData.D5)) + parseFloat(getNum(fData.B5)))/(parseFloat(getNum(fData.A5))/0.8) *100;
    fE5 = cutDecimal(fE5,2,"Number");
    //H4,H5
    var fH4,fH5
    fH4 = CC10;
    fH4 = cutDecimal(fH4,2,"Number");
    fH5 = CC10;
    fH5 = cutDecimal(fH5,2,"Number");
    //I4,I5 I4 = A4;I5 = A5;
    var fI4,fI5;
    fI4 = parseFloat(getNum(fData.A4));
    fI4 = cutDecimal(fI4,2,"Number");
    fI5 = parseFloat(getNum(fData.A5));
    fI5 = cutDecimal(fI5,2,"Number");
    //I6,I7 I6=I4/(1-CALCULATOR!$C$14) I7=I5/(1-CALCULATOR!$C$14)
    var fI6,fI7;
    fI6 = fI4 / (1 - percent);
    fI6 = cutDecimal(fI6,2,"Number");
    fI7 = fI5 / (1 - percent);
    fI7 = cutDecimal(fI7,2,"Number");
    
    //K4=if(CALCULATOR!$C$8="Mission 345",CALCULATOR!C11,0)
    var fK4,fK5;
    if(C8 === "Mission 345") fK4 = CC11;
    else fK4 = 0;
    fK4 = cutDecimal(fK4,2,"Number");
    //K5=if(CALCULATOR!$C$8="REC 370",CALCULATOR!$C$11,0)
    if(C8 === "REC 370") fK5 = CC11;
    else fK5 = 0;
    fK5 = cutDecimal(fK5,2,"Number");
    
    //L4=if(CALCULATOR!$C$8="Mission 345",CALCULATOR!$C$15,0)
    var fL4,fL5;
    
    if(C8 === "Mission 345") fL4 = CC15;
    else fL4 = 0;
    fL4 = cutDecimal(fL4,2,"Number");
    //L5=if(CALCULATOR!$C$8="REC 370",CALCULATOR!$C$15,0)
    if(C8 === "REC 370") fL5 = CC15;
    else fL5 = 0;
    fL5 = cutDecimal(fL5,2,"Number");
    
    //M4=if(CALCULATOR!$C$8="Mission 345",-CALCULATOR!$C$16,0)
    var fM4,fM5;
    if(C8 === "Mission 345") fM4 = -CC16;
    else fM4 = 0;
    fM4 = cutDecimal(fM4,2,"Number");
    //M5=if(CALCULATOR!$C$8="REC 370",-CALCULATOR!$C$16,0)
    if(C8 === "REC 370") fM5 = -CC16;
    else fM5 = 0;
    fM5 = cutDecimal(fM5,2,"Number");
    
    //N4=if(CALCULATOR!$C$8="Mission 345",-CALCULATOR!$C$17,0)
    var fN4,fN5;
    if(C8 === "Mission 345") fN4 = -CC17;
    else fN4 = 0;
    fN4 = cutDecimal(fN4,2,"Number");
    //N5=if(CALCULATOR!$C$8="REC 370",-CALCULATOR!$C$17,0)
    if(C8 === "REC 370") fN5 = -CC17;
    else fN5 = 0;
    fN5 = cutDecimal(fN5,2,"Number");
    
    //O4=if(CALCULATOR!$C$8="Mission 345",-CALCULATOR!$C$18,0)
    var fO4,fO5;
    if(C8 === "Mission 345") fO4 = -CC18;
    else fO4 = 0;
    fO4 = cutDecimal(fO4,2,"Number");
    //O5=if(CALCULATOR!$C$8="REC 370",-CALCULATOR!$C$18,0)
    if(C8 === "REC 370") fO5 = -CC18;
    else fO5 = 0;
    fO5 = cutDecimal(fO5,2,"Number");
    //Q4=sum(L4:O4)
    var fQ4,fQ5;
    fQ4 = fL4+fM4+fN4+fO4;
    fQ4 = cutDecimal(fQ4,2,"Number");
    //Q5=sum(L5:O5)
    fQ5 = fL5+fM5+fN5+fO5;
    fQ5 = cutDecimal(fQ5,2,"Number");
    //S4=IF(Q4>0,Q4/H4,0)
    var fS4,fS5;
    if(fQ4 > 0) fS4 = fQ4/fH4
    else fS4 = 0;
    fS4 = cutDecimal(fS4,2,"Number");
    //S5=IF(Q5>0,Q5/H5,0)
    if(fQ5 > 0) fS5 = fQ5/fH5
    else fS5 = 0;
    fS5 = cutDecimal(fS5,2,"Number");
    //S8=IF(S4<I4,"REFUSED","ACCEPTED")
    var fS8,fS9;
    if(fS4 < fI4) fS8 = "REFUSED";
    else fS8 = "ACCEPTED";
    //S9=IF(S5<I5,"REFUSED","ACCEPTED")
    if(fS5 < fI5) fS9= "REFUSED";
    else fS9= "ACCEPTED";
    //T4=IF(S4>I4,S4-I4,0)
    var fT4,fT5;
    if(fS4 > fI4) fT4 = (fS4 - fI4);
    else fT4 = 0;
    fT4 = cutDecimal(fT4,2,"Number");
    //T5=IF(S5>0,S5-I5,0)
    if(fS5 > fI5) fT5 = (fS5 - fI5);
    else fT5 = 0;
    fT5 = cutDecimal(fT5,2,"Number");

    //U4=IF(T4>=0,IF(CALCULATOR!$C$6="Bronze",T4*$Z$7,IF(CALCULATOR!$C$6="Silver",T4*$Z$8,T4*$Z$9)))
    var fU4,fU5;
    if(fT4 >=0){
        if(C6 === "Bronze") fU4 =(fT4*parseFloat(fData.Z7.split("%")[0])/100);
        else{
            if(C6 === "Silver") fU4 =(fT4*parseFloat(fData.Z8.split("%")[0])/100);
            else fU4 =(fT4*parseFloat(fData.Z9.split("%")[0])/100);
        }
    }
    fU4 = cutDecimal(fU4,2,"Number");
    //U5=IF(T5>=0,IF(CALCULATOR!$C$6="Bronze",T5*$Z$7,IF(CALCULATOR!$C$6="Silver",T5*$Z$8,T5*$Z$9)))
    if(fT5 >=0){
        if(C6 === "Bronze") fU5 =(fT5*parseFloat(fData.Z7.split("%")[0])/100);
        else{
            if(C6 === "Silver") fU5 =(fT5*parseFloat(fData.Z8.split("%")[0])/100);
            else fU5 =(fT5*parseFloat(fData.Z9.split("%")[0])/100);
        }
    }
    fU5 = cutDecimal(fU5,2,"Number");
    //V4=IF(+S4>=I4,B4*H4,0)
    var fV4,fV5;
    if(fS4 >= fI4) fV4 = fData.B4*fH4;
    else fV4 = 0;
    fV4 = cutDecimal(fV4,2,"Number");
    //V5=IF(S5>I5,B5*H5,0)
    if(fS5 > fI5) fV5 = fData.B5*fH5;
    else fV5 = 0;
    fV5 = cutDecimal(fV5,2,"Number");
    //Y4=IF(CALCULATOR!$C$7="Self Gen",D4*H4,0)
    var fY4,fY5;
    if(C7 === "Self Gen") fY4 = fData.D4*fH4;
    else fY4 = 0;
    fY4 = cutDecimal(fY4,2,"Number");
    //Y5=IF(CALCULATOR!$C$7="Self Gen",D5*H5,0)
    if(C7 === "Self Gen") fY5 = fData.D5*fH5;
    else fY5 = 0;
    fY5 = cutDecimal(fY5,2,"Number");
    //Z4=U4*H4
    var fZ4,fZ5;
    fZ4 = fU4*fH4;
    fZ4 = cutDecimal(fZ4,2,"Number");
    //Z5=U5*H5
    fZ5 = fU5*fH5;
    fZ5 = cutDecimal(fZ5,2,"Number");
    //AA4=sum(V4:Z4)
    var fAA4,fAA5;
    fAA4 = fV4+fY4+fZ4;
    fAA4 = cutDecimal(fAA4,2,"Number");
    //AA5=sum(V5:Z5)
    fAA5 = fV5+fY5+fZ5;
    fAA5 = cutDecimal(fAA5,2,"Number");
    // console.log("fAA5",fAA5)

    let str_F14,str_F15,str_F17,str_F18,str_F19,str_FSelfGen,str_F20;
    if(C8 === "Mission 345") CC21 = fS8;
    else CC21 = fS9;
    setC21(CC21);
    //F14=IF(C8="Mission 345",Formulas!$T$4,Formulas!$T$5)
    if(C8 === "Mission 345") str_F14 = (Math.round(fT4*100)/100).toString();
    else str_F14 = (Math.round(fT5*100)/100).toString();
    setF14(str_F14);
    //F15=IF(C8="Mission 345",Formulas!$U$4,Formulas!$U$5)
    if(C8 === "Mission 345") str_F15 = (Math.round(fU4*100)/100).toString();
    else str_F15 = (Math.round(fU5*100)/100).toString();
    setF15(str_F15);
    //F17=IF($C$8="Mission 345",Formulas!$V$4,Formulas!$V$5)
    
    if(C8 === "Mission 345") str_F17 = (Math.round((fV4)*100)/100).toString();
    else str_F17 = (Math.round((fV5)*100)/100).toString();
    setF17(str_F17);
    //FSelfGen=IF($C$8="Mission 345",Formulas!$V$4+Formulas!$Y$4,Formulas!$V$5+Formulas!$Y$5)
    
    if(C8 === "Mission 345") str_FSelfGen = (Math.round((fY4)*100)/100).toString();
    else str_FSelfGen = (Math.round((fY5)*100)/100).toString();
    setFSelfGen(str_FSelfGen);
    //F18=IF($C$8="Mission 345",Formulas!$Z$4,Formulas!$Z$5)
    
    if(C8 === "Mission 345") str_F18 = (Math.round(fZ4*100)/100).toString();
    else str_F18 = (Math.round(fZ5*100)/100).toString();
    setF18(str_F18)
    //F19=IF($C$9="None",0,500)
    
    if(C9 === "None") str_F19 = "0";
    else str_F19 = "500";
    setF19(str_F19)
    
    //F20=sum(F17:F19)
    str_F20 = (Math.round((parseFloat(getNum(str_F17))+parseFloat(getNum(str_FSelfGen))+parseFloat(getNum(str_F18))+parseFloat(getNum(str_F19)))*100)/100).toString();
    setF20(str_F20);
    // console.log((Math.round((parseFloat(getNum(str_F17))+parseFloat(getNum(str_selfGen))+parseFloat(getNum(str_F18))+parseFloat(getNum(str_F19)))*100)/100).toString())
    //-------------------------------------------------database update------------------------------------------------------------
    var updateData = {};
    updateData.C3 = CC3.toString();
    updateData.C4 = CC4.toString();
    updateData.C5 = CC5.toString();
    updateData.C6 = CC6.toString();
    updateData.C7 = CC7.toString();
    updateData.C8 = CC8.toString();
    updateData.C9 = CC9.toString();
    updateData.C10 = CC10.toString();
    updateData.C11 = CC11.toString();
    updateData.C12 = CC12.toString();
    updateData.C13 = CC13.toString();
    updateData.C14 = CC14.toString();
    updateData.C15 = CC15.toString();
    updateData.C16 = CC16.toString();
    updateData.C17 = CC17.toString();
    updateData.C18 = CC18.toString();
    updateData.C19 = CC19.toString();
    updateData.C20 = CC20.toString();
    updateData.C21 = CC21.toString();
    updateData.F14 = str_F14.toString();
    updateData.F15 = str_F15.toString();
    updateData.F17 = str_F17.toString();
    updateData.F18 = str_F18.toString();
    updateData.F19 = str_F19.toString();
    updateData.F20 = str_F20.toString();
    updateData.FSelfGen = str_FSelfGen.toString();
    // console.log(updateData)
    firebase.firestore().collection("calculators").where("email","==",localStorage.getItem("email"))
      .get()
      .then((querySnapshot) => {
          var docs = querySnapshot.docs;
          if(docs.length > 0) //update documentation
          {
              firebase.firestore().collection("calculators").doc(docs[0].id).update(updateData).then(() => {
                  if(docs[0].data().allow){
                    setLoading(false);
                    style();
                  }else{
                    cnt++;
                    if(cnt === 2)
                    {handleNotificationCall();cnt = 0;}
                  }
              })
          }
      })
  })



  //..........................................................
  
    return () => {
      formulasRef.off("value");
    };

}, [C3,C4,C7,C8,C9,C10,C11,C12,C14,C18])

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
                    style={{textAlign: "center",marginTop: 15,backgroundColor:"rgb(229 255 14)",width: "75%"}} />
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
                    <MenuItem value={"Self Gen"}>Self</MenuItem>
                    <MenuItem value={"Company"}>Company</MenuItem>
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
                    <MenuItem value={"REC 370"}>REC 370</MenuItem>
                    <MenuItem value={"Mission 345"}>Mission 345</MenuItem>
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
                    <MenuItem value={"None"}>None</MenuItem>
                    <MenuItem value={"Enphase 3kw"}>Enphase 3kw</MenuItem>
                    <MenuItem value={"Enphase 10kw"}>Enphase 10kw</MenuItem>
                    <MenuItem value={"Panasonic 11kw"}>Panasonic 11kw</MenuItem>
                    <MenuItem value={"Panasonic 17kw"}>Panasonic 17kw</MenuItem>
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
                    { cash.map( item => {
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