import React ,{useContext} from "react";
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { Renderers } from './renderers.js';
import {
    Paper,
    Grid as MaterialGrid,
  } from '@material-ui/core';
  import Widget from "../../components/Widget/Widget";
  import { FirebaseContext } from '../../components/Firebase/context';
  import { useLoading, ThreeDots} from '@agney/react-loading';
  import "./style.css"

  var calcData = {};
  export default function Formulas(){
    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        indicator: <ThreeDots width="50" />,
      });
    const [loading, setLoading] = React.useState(true);
    const firebase = useContext(FirebaseContext);
    const [data, setData] = React.useState([]);
    const [editField, setEditField] = React.useState(undefined);
    const [changes, setChanges] = React.useState(false);
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
    const enterEdit = (dataItem, field) => {
        const newdata = data.map(item => ({
                ...item,
                inEdit: item.id === dataItem.id ? field : undefined
            })
        );
            setData(newdata);
            setEditField(field);
    }

    const exitEdit = () => {
        const newdata = data.map(item => (
                { ...item, inEdit: undefined }
            ));
            // console.log(newdata)
          //formulas logic-------------------------------------------------------------------------------------------------------
            newdata[3].A = parseFloat(newdata[3].A);
            newdata[4].A = parseFloat(newdata[4].A);
            newdata[3].B = parseFloat(newdata[3].B);
            newdata[4].B = parseFloat(newdata[4].B);
            newdata[3].D = parseFloat(newdata[3].D);
            newdata[4].D = parseFloat(newdata[4].D);
            calcData.C10 = parseFloat(getNum(calcData.C10));
            calcData.C11 = parseFloat(getNum(calcData.C11));
            calcData.C15 = parseFloat(getNum(calcData.C15));
            calcData.C16 = parseFloat(getNum(calcData.C16));
            calcData.C17 = parseFloat(getNum(calcData.C17));
            calcData.C18 = parseFloat(getNum(calcData.C18));

            newdata[3].C = newdata[3].B / newdata[3].A * 100;
            newdata[3].C = cutDecimal(newdata[3].C,2,"Number");

            newdata[4].C = newdata[4].B / newdata[4].A * 100;
            newdata[4].C = cutDecimal(newdata[4].C,2,"Number");
            //E4=(D4+B4)/((A4/0.8))
            newdata[3].E = (parseFloat(newdata[3].D) + parseFloat(newdata[3].B))/(newdata[3].A/0.8) *100;
            newdata[3].E = cutDecimal(newdata[3].E,2,"Number");
            //E5=(D5+B5)/((A5/0.8))
            newdata[4].E = (parseFloat(newdata[4].D) + parseFloat(newdata[4].B))/(newdata[4].A/0.8) *100;
            newdata[4].E = cutDecimal(newdata[4].E,2,"Number");
            //H4,H5
            newdata[3].H = cutDecimal(calcData.C10,2,"Number");
            newdata[4].H = cutDecimal(calcData.C10,2,"Number");
            //I4,I5 I4 = A4;I5 = A5;
            newdata[3].I = cutDecimal(newdata[3].A,2,"Number");
            newdata[4].I = cutDecimal(newdata[4].A,2,"Number");
            //I6,I7 I6=I4/(1-CALCULATOR!$C$14) I7=I5/(1-CALCULATOR!$C$14)
            newdata[5].I = newdata[3].I / (1 - parseFloat(calcData.C14.split("%"))/100);
            newdata[5].I = cutDecimal(newdata[5].I,2,"Number");
            newdata[6].I = newdata[4].I / (1 - parseFloat(calcData.C14.split("%"))/100);
            newdata[6].I = cutDecimal(newdata[6].I,2,"Number");
            //K4=if(CALCULATOR!$C$8="Mission 345",CALCULATOR!C11,0)
            if(calcData.C8 === "Mission 345") newdata[3].K = calcData.C11;
            else newdata[3].K = 0;
            newdata[3].K = cutDecimal(newdata[3].K,2,"Number");
            //K5=if(CALCULATOR!$C$8="REC 370",CALCULATOR!$C$11,0)
            if(calcData.C8 === "REC 370") newdata[4].K = calcData.C11;
            else newdata[4].K = 0;
            newdata[4].K = cutDecimal(newdata[4].K,2,"Number");
            //L4=if(CALCULATOR!$C$8="Mission 345",CALCULATOR!$C$15,0)
            if(calcData.C8 === "Mission 345") newdata[3].L = calcData.C15;
            else newdata[3].L = 0;
            newdata[3].L = cutDecimal(newdata[3].L,2,"Number");
            //L5=if(CALCULATOR!$C$8="REC 370",CALCULATOR!$C$15,0)
            if(calcData.C8 === "REC 370") newdata[4].L = calcData.C15;
            else newdata[4].L = 0;
            newdata[4].L = cutDecimal(newdata[4].L,2,"Number");
            //M4=if(CALCULATOR!$C$8="Mission 345",-CALCULATOR!$C$16,0)
            if(calcData.C8 === "Mission 345") newdata[3].M = -calcData.C16;
            else newdata[3].M = 0;
            newdata[3].M = cutDecimal(newdata[3].M,2,"Number");
            //M5=if(CALCULATOR!$C$8="REC 370",-CALCULATOR!$C$16,0)
            if(calcData.C8 === "REC 370") newdata[4].M = -calcData.C16;
            else newdata[4].M = 0;
            newdata[4].M = cutDecimal(newdata[4].M,2,"Number");
            //N4=if(CALCULATOR!$C$8="Mission 345",-CALCULATOR!$C$17,0)
            if(calcData.C8 === "Mission 345") newdata[3].N = -calcData.C17;
            else newdata[3].N = 0;
            newdata[3].N = cutDecimal(newdata[3].N,2,"Number");
            //N5=if(CALCULATOR!$C$8="REC 370",-CALCULATOR!$C$17,0)
            if(calcData.C8 === "REC 370") newdata[4].N = -calcData.C17;
            else newdata[4].N = 0;
            newdata[4].N = cutDecimal(newdata[4].N,2,"Number");
            //O4=if(CALCULATOR!$C$8="Mission 345",-CALCULATOR!$C$18,0)
            if(calcData.C8 === "Mission 345") newdata[3].O = -calcData.C18;
            else newdata[3].O = 0;
            newdata[3].O = cutDecimal(newdata[3].O,2,"Number");
            //O5=if(CALCULATOR!$C$8="REC 370",-CALCULATOR!$C$18,0)
            if(calcData.C8 === "REC 370") newdata[4].O = -calcData.C18;
            else newdata[4].O = 0;
            newdata[4].O = cutDecimal(newdata[4].O,2,"Number");
            //Q4=sum(L4:O4)
            newdata[3].Q = (parseFloat(getNum(newdata[3].L))+parseFloat(getNum(newdata[3].M))+parseFloat(getNum(newdata[3].N))+parseFloat(getNum(newdata[3].O)));
            newdata[3].Q = cutDecimal(newdata[3].Q,2,"Number");
            //Q5=sum(L5:O5)
            newdata[4].Q = (parseFloat(getNum(newdata[4].L))+parseFloat(getNum(newdata[4].M))+parseFloat(getNum(newdata[4].N))+parseFloat(getNum(newdata[4].O)));
            newdata[4].Q = cutDecimal(newdata[4].Q,2,"Number");
            //S4=IF(Q4>0,Q4/H4,0)
            if(parseFloat(getNum(newdata[3].Q)) > 0) newdata[3].S = (parseFloat(getNum(newdata[3].Q))/parseFloat(getNum(newdata[3].H)));
            else newdata[3].S = 0;
            newdata[3].S = cutDecimal(newdata[3].S,2,"Number");
            //S5=IF(Q5>0,Q5/H5,0)
            if(parseFloat(getNum(newdata[4].Q)) > 0) newdata[4].S = (parseFloat(getNum(newdata[4].Q))/parseFloat(getNum(newdata[4].H)));
            else newdata[4].S = 0;
            newdata[4].S = cutDecimal(newdata[4].S,2,"Number");
            //S8=IF(S4<I4,"REFUSED","ACCEPTED")
            if(parseFloat(getNum(newdata[3].S)) < parseFloat(getNum(newdata[3].I))) newdata[7].S = "REFUSED";
            else newdata[7].S = "ACCEPTED";
            //S9=IF(S5<I5,"REFUSED","ACCEPTED")
            if(parseFloat(getNum(newdata[4].S)) < parseFloat(getNum(newdata[4].I))) newdata[8].S = "REFUSED";
            else newdata[8].S = "ACCEPTED";
            //T4=IF(S4>I4,S4-I4,0)
            if(parseFloat(getNum(newdata[3].S)) > parseFloat(getNum(newdata[3].I))) newdata[3].T = (parseFloat(getNum(newdata[3].S)) - parseFloat(getNum(newdata[3].I)));
            else newdata[3].T = 0;
            newdata[3].T = cutDecimal(newdata[3].T,2,"Number");
            //T5=IF(S5>0,S5-I5,0)
            if(parseFloat(getNum(newdata[4].S)) > parseFloat(getNum(newdata[4].I))) newdata[4].T = (parseFloat(getNum(newdata[4].S)) - parseFloat(getNum(newdata[4].I)));
            else newdata[4].T = 0;
            newdata[4].T = cutDecimal(newdata[4].T,2,"Number");
            //U4=IF(T4>=0,IF(CALCULATOR!$C$6="Bronze",T4*$Z$7,IF(CALCULATOR!$C$6="Silver",T4*$Z$8,T4*$Z$9)))
            if(parseFloat(getNum(newdata[3].T)) >=0){
                if(calcData.C6 === "Bronze") newdata[3].U =(parseFloat(getNum(newdata[3].T))*parseFloat(newdata[6].Z.split("%")[0])/100);
                else{
                    if(calcData.C6 === "Silver") newdata[3].U =(parseFloat(getNum(newdata[3].T))*parseFloat(newdata[7].Z.split("%")[0])/100);
                    else newdata[3].U =(parseFloat(getNum(newdata[3].T))*parseFloat(newdata[8].Z.split("%")[0])/100);
                }
            }
            newdata[3].U = cutDecimal(newdata[3].U,2,"Number");
            //U5=IF(T5>=0,IF(CALCULATOR!$C$6="Bronze",T5*$Z$7,IF(CALCULATOR!$C$6="Silver",T5*$Z$8,T5*$Z$9)))
            if(parseFloat(getNum(newdata[4].T)) >=0){
                if(calcData.C6 === "Bronze") newdata[4].U =(parseFloat(getNum(newdata[4].T))*parseFloat(newdata[6].Z.split("%")[0])/100);
                else{
                    if(calcData.C6 === "Silver") newdata[4].U =(parseFloat(getNum(newdata[4].T))*parseFloat(newdata[7].Z.split("%")[0])/100);
                    else newdata[4].U =(parseFloat(getNum(newdata[4].T))*parseFloat(newdata[8].Z.split("%")[0])/100);
                }
            }
            newdata[4].U = cutDecimal(newdata[4].U,2,"Number");
            //V4=IF(+S4>=I4,B4*H4,0)
            if(parseFloat(getNum(newdata[3].S)) >= parseFloat(getNum(newdata[3].I))) newdata[3].V = ((parseFloat(getNum(newdata[3].B)))*(parseFloat(getNum(newdata[3].H))));
            else newdata[3].V = 0;
            newdata[3].V = cutDecimal(newdata[3].V,2,"Number");
            //V5=IF(S5>I5,B5*H5,0)
            if(parseFloat(getNum(newdata[4].S)) > parseFloat(getNum(newdata[4].I))) newdata[4].V = ((parseFloat(getNum(newdata[4].B)))*(parseFloat(getNum(newdata[4].H))));
            else newdata[4].V = 0;
            newdata[4].V = cutDecimal(newdata[4].V,2,"Number");
            //Y4=IF(CALCULATOR!$C$7="Self",D4*H4,0)
            if(calcData.C7 === "Self") newdata[3].Y = ((parseFloat(getNum(newdata[3].D)))*(parseFloat(getNum(newdata[3].H))));
            else newdata[3].Y = 0;
            newdata[3].Y = cutDecimal(newdata[3].Y,2,"Number");
            //Y5=IF(CALCULATOR!$C$7="Self",D5*H5,0)
            if(calcData.C7 === "Self") newdata[4].Y = ((parseFloat(getNum(newdata[4].D)))*(parseFloat(getNum(newdata[4].H))));
            else newdata[4].Y = 0;
            newdata[4].Y = cutDecimal(newdata[4].Y,2,"Number");
            //Z4=U4*H4
            newdata[3].Z = ((parseFloat(getNum(newdata[3].U)))*(parseFloat(getNum(newdata[3].H))));
            newdata[3].Z = cutDecimal(newdata[3].Z,2,"Number");
            //Z5=U5*H5
            newdata[4].Z = ((parseFloat(getNum(newdata[4].U)))*(parseFloat(getNum(newdata[4].H))));
            newdata[4].Z = cutDecimal(newdata[4].Z,2,"Number");
            //AA4=sum(V4:Z4)
            newdata[3].AA = ((parseFloat(getNum(newdata[3].V)))+(parseFloat(getNum(newdata[3].Y)))+(parseFloat(getNum(newdata[3].Z))));
            newdata[3].AA = cutDecimal(newdata[3].AA,2,"Number");
            //AA5=sum(V5:Z5)
            newdata[4].AA = ((parseFloat(getNum(newdata[4].V)))+(parseFloat(getNum(newdata[4].Y)))+(parseFloat(getNum(newdata[4].Z))));
            newdata[4].AA = cutDecimal(newdata[4].AA,2,"Number");
            setData(newdata);
            setEditField(undefined);
            //database ------------------------------------------------------------------------------------------------------------

            firebase.firestore().collection("formulas")
            .get()
            .then((querySnapshot) => {
                var docs = querySnapshot.docs;
                if(docs.length > 0) //update documentation
                {
                    var updateData = {};
                    updateData.data = [];
                    newdata.map((item) => {
                        const {temp,inEdit,...ndata} = item;
                        updateData.data.push(ndata);
                    })

                    var formulasRef = firebase.database().ref('MINIFORMULAS');
                    var obj = {};
                    obj.A4 = newdata[3].A;
                    obj.A5 = newdata[4].A;
                    obj.B4 = newdata[3].B;
                    obj.B5 = newdata[4].B;
                    obj.D4 = newdata[3].D;
                    obj.D5 = newdata[4].D;
                    obj.F4 = newdata[3].F;
                    obj.F5 = newdata[4].F;
                    obj.Z7 = newdata[6].Z;
                    obj.Z8 = newdata[7].Z;
                    obj.Z9 = newdata[8].Z;
                    formulasRef.update(obj);

                    firebase.firestore().collection("formulas").doc(docs[0].id).update(updateData).then(() => {
                        console.log("formulas Document successfully update!");
                    })
                }else{
                    var updateData = {};
                    updateData.data = [];
                    newdata.map((item) => {
                        const {temp,inEdit,...ndata} = item;
                        updateData.data.push(ndata);
                    })
                    var formulasRef = firebase.database().ref('MINIFORMULAS');
                    var obj = {};
                    obj.A4 = newdata[3].A;
                    obj.A5 = newdata[4].A;
                    obj.B4 = newdata[3].B;
                    obj.B5 = newdata[4].B;
                    obj.D4 = newdata[3].D;
                    obj.D5 = newdata[4].D;
                    obj.F4 = newdata[3].F;
                    obj.F5 = newdata[4].F;
                    obj.Z7 = newdata[6].Z;
                    obj.Z8 = newdata[7].Z;
                    obj.Z9 = newdata[8].Z;
                    formulasRef.set(obj);

                    firebase.firestore().collection("formulas").add(updateData).then(() => {
                        console.log("formulas Document successfully aadd!");
                    })
                }
            })
    }

    const itemChange = (event) => {
        event.dataItem[event.field] = event.value;
        const newdata = data.map(item => {
            var temp = {};
            var key = event.dataItem[event.field];
            if(isNaN(event.value))
            temp[key] = event.value;
            else
            temp[key] = parseFloat(event.value);
            return {...item,temp};
            }
        );
        setData(newdata);
        setChanges(true);
    }
    const renderers =  new Renderers(enterEdit, exitEdit, 'inEdit');
    React.useEffect(() => {
        firebase.firestore().collection("formulas").get().then((query) => {
            if(query.docs.length === 1){
                query.forEach((doc) => {
                    // console.log("doc",doc)
                    var dbData = doc.data().data;
                    
                
                  firebase.firestore().collection("calculators").where("email","==",localStorage.getItem("email")).get().then((query1) => {
                    query1.forEach((doc1) => {
                        calcData = doc1.data();
                        //formulas logic-------------------------------------------------------------------------------------------------------
                        dbData[3].A = parseFloat(dbData[3].A);
                        dbData[4].A = parseFloat(dbData[4].A);
                        dbData[3].B = parseFloat(dbData[3].B);
                        dbData[4].B = parseFloat(dbData[4].B);
                        dbData[3].D = parseFloat(dbData[3].D);
                        dbData[4].D = parseFloat(dbData[4].D);
                        calcData.C10 = parseFloat(getNum(calcData.C10));
                        calcData.C11 = parseFloat(getNum(calcData.C11));
                        calcData.C15 = parseFloat(getNum(calcData.C15));
                        calcData.C16 = parseFloat(getNum(calcData.C16));
                        calcData.C17 = parseFloat(getNum(calcData.C17));
                        calcData.C18 = parseFloat(getNum(calcData.C18));
                        dbData[3].C = dbData[3].B / dbData[3].A * 100;
                        dbData[3].C = cutDecimal(dbData[3].C,2,"Number");
                        dbData[4].C = dbData[4].B / dbData[4].A * 100;
                        dbData[4].C = cutDecimal(dbData[4].C,2,"Number");
                        //E4=(D4+B4)/((A4/0.8))
                        dbData[3].E = (parseFloat(dbData[3].D) + parseFloat(dbData[3].B))/(dbData[3].A/0.8) *100;
                        dbData[3].E = cutDecimal(dbData[3].E,2,"Number");
                        //E5=(D5+B5)/((A5/0.8))
                        dbData[4].E = (parseFloat(dbData[4].D) + parseFloat(dbData[4].B))/(dbData[4].A/0.8) *100;
                        dbData[4].E = cutDecimal(dbData[4].E,2,"Number");
                        //H4,H5
                        dbData[3].H = calcData.C10;
                        dbData[3].H = cutDecimal(dbData[3].H,2,"Number");
                        dbData[4].H = calcData.C10;
                        dbData[4].H = cutDecimal(dbData[4].H,2,"Number");
                        //I4,I5 I4 = A4;I5 = A5;
                        dbData[3].I = dbData[3].A;
                        dbData[3].I = cutDecimal(dbData[3].I,2,"Number");
                        dbData[4].I = dbData[4].A;
                        dbData[4].I = cutDecimal(dbData[4].I,2,"Number");
                        //I6,I7 I6=I4/(1-CALCULATOR!$C$14) I7=I5/(1-CALCULATOR!$C$14)
                        dbData[5].I = dbData[3].I / (1 - parseFloat(calcData.C14.split("%"))/100);
                        dbData[5].I = cutDecimal(dbData[5].I,2,"Number");
                        dbData[6].I = dbData[4].I / (1 - parseFloat(calcData.C14.split("%"))/100);
                        dbData[6].I = cutDecimal(dbData[6].I,2,"Number");
                        //K4=if(CALCULATOR!$C$8="Mission 345",CALCULATOR!C11,0)
                        if(calcData.C8 === "Mission 345") dbData[3].K = calcData.C11;
                        else dbData[3].K = 0;
                        dbData[3].K = cutDecimal(dbData[3].K,2,"Number");
                        //K5=if(CALCULATOR!$C$8="REC 370",CALCULATOR!$C$11,0)
                        if(calcData.C8 === "REC 370") dbData[4].K = calcData.C11;
                        else dbData[4].K = 0;
                        dbData[4].K = cutDecimal(dbData[4].K,2,"Number");

                        //L4=if(CALCULATOR!$C$8="Mission 345",CALCULATOR!$C$15,0)
                        if(calcData.C8 === "Mission 345") dbData[3].L = calcData.C15;
                        else dbData[3].L = 0;
                        dbData[3].L = cutDecimal(dbData[3].L,2,"Number");
                        //L5=if(CALCULATOR!$C$8="REC 370",CALCULATOR!$C$15,0)
                        if(calcData.C8 === "REC 370") dbData[4].L = calcData.C15;
                        else dbData[4].L = 0;
                        dbData[4].L = cutDecimal(dbData[4].L,2,"Number");
                        
                        //M4=if(CALCULATOR!$C$8="Mission 345",-CALCULATOR!$C$16,0)
                        if(calcData.C8 === "Mission 345") dbData[3].M = -calcData.C16;
                        else dbData[3].M = 0;
                        dbData[3].M = cutDecimal(dbData[3].M,2,"Number");
                        //M5=if(CALCULATOR!$C$8="REC 370",-CALCULATOR!$C$16,0)
                        if(calcData.C8 === "REC 370") dbData[4].M = -calcData.C16;
                        else dbData[4].M = 0;
                        dbData[4].M = cutDecimal(dbData[4].M,2,"Number");
                        
                        //N4=if(CALCULATOR!$C$8="Mission 345",-CALCULATOR!$C$17,0)
                        if(calcData.C8 === "Mission 345") dbData[3].N = -calcData.C17;
                        else dbData[3].N = 0;
                        dbData[3].N = cutDecimal(dbData[3].N,2,"Number");
                        //N5=if(CALCULATOR!$C$8="REC 370",-CALCULATOR!$C$17,0)
                        if(calcData.C8 === "REC 370") dbData[4].N = -calcData.C17;
                        else dbData[4].N = 0;
                        dbData[4].N = cutDecimal(dbData[4].N,2,"Number");
                        
                        //O4=if(CALCULATOR!$C$8="Mission 345",-CALCULATOR!$C$18,0)
                        if(calcData.C8 === "Mission 345") dbData[3].O = -calcData.C18;
                        else dbData[3].O = 0;
                        // console.log("C18",calcData.C18,dbData[3].O)
                        dbData[3].O = cutDecimal(dbData[3].O,2,"Number");
                        //O5=if(CALCULATOR!$C$8="REC 370",-CALCULATOR!$C$18,0)
                        if(calcData.C8 === "REC 370") dbData[4].O = -calcData.C18;
                        else dbData[4].O = 0;
                        dbData[4].O = cutDecimal(dbData[4].O,2,"Number");
                        //Q4=sum(L4:O4)
                        dbData[3].Q = (parseFloat(getNum(dbData[3].L))+parseFloat(getNum(dbData[3].M))+parseFloat(getNum(dbData[3].N))+parseFloat(getNum(dbData[3].O)));
                        dbData[3].Q = cutDecimal(dbData[3].Q,2,"Number");
                        //Q5=sum(L5:O5)
                        dbData[4].Q = (parseFloat(getNum(dbData[4].L))+parseFloat(getNum(dbData[4].M))+parseFloat(getNum(dbData[4].N))+parseFloat(getNum(dbData[4].O)));
                        dbData[4].Q = cutDecimal(dbData[4].Q,2,"Number");
                        //S4=IF(Q4>0,Q4/H4,0)
                        if(parseFloat(getNum(dbData[3].Q)) > 0) dbData[3].S = (parseFloat(getNum(dbData[3].Q))/parseFloat(getNum(dbData[3].H)));
                        else dbData[3].S = 0;
                        dbData[3].S = cutDecimal(dbData[3].S,2,"Number");
                        //S5=IF(Q5>0,Q5/H5,0)
                        if(parseFloat(getNum(dbData[4].Q)) > 0) dbData[4].S = (parseFloat(getNum(dbData[4].Q))/parseFloat(getNum(dbData[4].H)));
                        else dbData[4].S = 0;
                        dbData[4].S = cutDecimal(dbData[4].S,2,"Number");
                        //S8=IF(S4<I4,"REFUSED","ACCEPTED")
                        if(parseFloat(getNum(dbData[3].S)) < parseFloat(getNum(dbData[3].I))) dbData[7].S = "REFUSED";
                        else dbData[7].S = "ACCEPTED";
                        //S9=IF(S5<I5,"REFUSED","ACCEPTED")
                        if(parseFloat(getNum(dbData[4].S)) < parseFloat(getNum(dbData[4].I))) dbData[8].S = "REFUSED";
                        else dbData[8].S = "ACCEPTED";
                        //T4=IF(S4>I4,S4-I4,0)
                        if(parseFloat(getNum(dbData[3].S)) > parseFloat(getNum(dbData[3].I))) dbData[3].T = (parseFloat(getNum(dbData[3].S)) - parseFloat(getNum(dbData[3].I)));
                        else dbData[3].T = 0;
                        dbData[3].T = cutDecimal(dbData[3].T,2,"Number");
                        //T5=IF(S5>0,S5-I5,0)
                        if(parseFloat(getNum(dbData[4].S)) > parseFloat(getNum(dbData[4].I))) dbData[4].T = (parseFloat(getNum(dbData[4].S)) - parseFloat(getNum(dbData[4].I)));
                        else dbData[4].T = 0;
                        dbData[4].T = cutDecimal(dbData[4].T,2,"Number");
                        //U4=IF(T4>=0,IF(CALCULATOR!$C$6="Bronze",T4*$Z$7,IF(CALCULATOR!$C$6="Silver",T4*$Z$8,T4*$Z$9)))
                        if(parseFloat(getNum(dbData[3].T)) >=0){
                            if(calcData.C6 === "Bronze") dbData[3].U =(parseFloat(getNum(dbData[3].T))*parseFloat(dbData[6].Z.split("%")[0])/100);
                            else{
                                if(calcData.C6 === "Silver") dbData[3].U =(parseFloat(getNum(dbData[3].T))*parseFloat(dbData[7].Z.split("%")[0])/100);
                                else dbData[3].U =(parseFloat(getNum(dbData[3].T))*parseFloat(dbData[8].Z.split("%")[0])/100);
                            }
                        }
                        dbData[3].U = cutDecimal(dbData[3].U,2,"Number");
                        //U5=IF(T5>=0,IF(CALCULATOR!$C$6="Bronze",T5*$Z$7,IF(CALCULATOR!$C$6="Silver",T5*$Z$8,T5*$Z$9)))
                        if(parseFloat(getNum(dbData[4].T)) >=0){
                            if(calcData.C6 === "Bronze") dbData[4].U =(parseFloat(getNum(dbData[4].T))*parseFloat(dbData[6].Z.split("%")[0])/100);
                            else{
                                if(calcData.C6 === "Silver") dbData[4].U =(parseFloat(getNum(dbData[4].T))*parseFloat(dbData[7].Z.split("%")[0])/100);
                                else dbData[4].U =(parseFloat(getNum(dbData[4].T))*parseFloat(dbData[8].Z.split("%")[0])/100);
                            }
                        }
                        dbData[4].U = cutDecimal(dbData[4].U,2,"Number");
                        //V4=IF(+S4>=I4,B4*H4,0)
                        if(parseFloat(getNum(dbData[3].S)) >= parseFloat(getNum(dbData[3].I))) dbData[3].V = ((parseFloat(getNum(dbData[3].B)))*(parseFloat(getNum(dbData[3].H))));
                        else dbData[3].V = 0;
                        dbData[3].V = cutDecimal(dbData[3].V,2,"Number");
                        //V5=IF(S5>I5,B5*H5,0)
                        if(parseFloat(getNum(dbData[4].S)) > parseFloat(getNum(dbData[4].I))) dbData[4].V = ((parseFloat(getNum(dbData[4].B)))*(parseFloat(getNum(dbData[4].H))));
                        else dbData[4].V = 0;
                        dbData[4].V = cutDecimal(dbData[4].V,2,"Number");
                        //Y4=IF(CALCULATOR!$C$7="Self",D4*H4,0)
                        if(calcData.C7 === "Self") dbData[3].Y = ((parseFloat(getNum(dbData[3].D)))*(parseFloat(getNum(dbData[3].H))));
                        else dbData[3].Y = 0;
                        dbData[3].Y = cutDecimal(dbData[3].Y,2,"Number");
                        //Y5=IF(CALCULATOR!$C$7="Self",D5*H5,0)
                        if(calcData.C7 === "Self") dbData[4].Y = ((parseFloat(getNum(dbData[4].D)))*(parseFloat(getNum(dbData[4].H))));
                        else dbData[4].Y = 0;
                        dbData[4].Y = cutDecimal(dbData[4].Y,2,"Number");
                        //Z4=U4*H4
                        dbData[3].Z = ((parseFloat(getNum(dbData[3].U)))*(parseFloat(getNum(dbData[3].H))));
                        dbData[3].Z = cutDecimal(dbData[3].Z,2,"Number");
                        //Z5=U5*H5
                        dbData[4].Z = ((parseFloat(getNum(dbData[4].U)))*(parseFloat(getNum(dbData[4].H))));
                        dbData[4].Z = cutDecimal(dbData[4].Z,2,"Number");
                        //AA4=sum(V4:Z4)
                        dbData[3].AA = ((parseFloat(getNum(dbData[3].V)))+(parseFloat(getNum(dbData[3].Y)))+(parseFloat(getNum(dbData[3].Z))));
                        dbData[3].AA = cutDecimal(dbData[3].AA,2,"Number");
                        //AA5=sum(V5:Z5)
                        dbData[4].AA = ((parseFloat(getNum(dbData[4].V)))+(parseFloat(getNum(dbData[4].Y)))+(parseFloat(getNum(dbData[4].Z))));
                        dbData[4].AA = cutDecimal(dbData[4].AA,2,"Number");
                        setData(dbData);
                        setLoading(false);
                    })
                  })
                })
            }else{
                let initialData = [];
                let tempRowData = {};
                let key;
                for(var i = 0;i < 15; i++){
                    tempRowData = {};
                    tempRowData.id = i+1;
                    for(var j = 65;j < 91;j++){
                        key = String.fromCharCode(j);
                        tempRowData[key] = "";
                    }
                    tempRowData.AA = "";
                    tempRowData.AB = "";
                    initialData.push(tempRowData);
                }
                setData(initialData);
                setLoading(false);
            }
            
          })
          return () => {
            var formulasRef = firebase.database().ref('MINIFORMULAS');
            formulasRef.off("value");
          };
      }, [])
      return(
        <>
            {loading ?    
            <section {...containerProps} style={{textAlign:"center",marginTop:window.innerHeight/2 - 100}}>
                {indicatorEl} {/* renders only while loading */}
            </section> :
            <MaterialGrid item xs={12}>
                <Widget title="Formulas">
                <Paper style={{}}>
                    <Grid
                        style={{ height: '760px' }}
                        data={data}
                        rowHeight={25}
                        onItemChange={itemChange}

                        cellRender={renderers.cellRender}
                        rowRender={renderers.rowRender}
                        resizable={true}
                        editField="inEdit"
                        >
                        <Column field="id" title="" width="50px" editable={false} locked={true} className="centerClass"  />
                        <Column title="A"  field="A" width="100px" className="centerClass"  format="{0:c}"/>
                        <Column title="B"  field="B" width="150px" className="centerClass" format="{0:c}"/>
                        <Column title="C"  field="C" width="150px" className="centerClass" format="{0:#,0.0\%}"/>
                        <Column title="D"  field="D" width="120px" className="centerClass" format="{0:c}"/>
                        <Column title="E"  field="E" width="120px" className="centerClass" format="{0:#,0.0\%}"/>
                        <Column title="F"  field="F" width="100px" className="centerClass"/>
                        <Column title="G"  field="G" width="100px" className="centerClass"/>
                        <Column title="H"  field="H" width="100px" className="centerClass" format="{0:c}"/>
                        <Column title="I"  field="I" width="100px" className="centerClass" format="{0:c}"/>
                        <Column title="J"  field="J" width="100px" className="centerClass" format="{0:c}"/>
                        <Column title="K"  field="K" width="100px" className="centerClass" format="{0:c}"/>
                        <Column title="L"  field="L" width="100px" className="centerClass" format="{0:c}"/>
                        <Column title="M"  field="M" width="100px" className="centerClass" format="{0:c}"/>
                        <Column title="N"  field="N" width="100px" className="centerClass" format="{0:c}"/>
                        <Column title="O"  field="O" width="100px" className="centerClass" format="{0:c}"/>
                        <Column title="P"  field="P" width="100px" className="centerClass" format="{0:c}"/>
                        <Column title="Q"  field="Q" width="100px" className="centerClass" format="{0:c}"/>
                        <Column title="R"  field="R" width="100px" className="centerClass" format="{0:c}"/>
                        <Column title="S"  field="S" width="100px" className="centerClass" format="{0:c}"/>
                        <Column title="T"  field="T" width="100px" className="centerClass" format="{0:c}"/>
                        <Column title="U"  field="U" width="100px" className="centerClass" format="{0:c}"/>
                        <Column title="V"  field="V" width="100px" className="centerClass" format="{0:c}"/>
                        <Column title="W"  field="W" width="100px" className="centerClass" format="{0:c}"/>
                        <Column title="X"  field="X" width="100px" className="centerClass" format="{0:c}"/>
                        <Column title="Y"  field="Y" width="100px" className="centerClass" format="{0:c}"/>
                        <Column title="Z"  field="Z" width="100px" className="centerClass" format="{0:c}"/>
                        <Column title="AA"  field="AA" width="100px" className="centerClass" format="{0:c}"/>
                        <Column title="AB"  field="AB" width="100px" className="centerClass" format="{0:c}"/>
                    </Grid>
                </Paper>
            </Widget>
            </MaterialGrid>
            }
        </>
      )
}
