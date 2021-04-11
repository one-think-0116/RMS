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
            newdata[3].C = newdata[3].B / newdata[3].A * 100;
            newdata[4].C = newdata[4].B / newdata[4].A * 100;
            //E4=(D4+B4)/((A4/0.8))
            newdata[3].E = (parseFloat(newdata[3].D) + parseFloat(newdata[3].B))/(newdata[3].A/0.8) *100;
            //E5=(D5+B5)/((A5/0.8))
            newdata[4].E = (parseFloat(newdata[4].D) + parseFloat(newdata[4].B))/(newdata[4].A/0.8) *100;
            //H4,H5
            newdata[3].H = calcData.C10;
            newdata[4].H = calcData.C10;
            //I4,I5 I4 = A4;I5 = A5;
            newdata[3].I = newdata[3].A;
            newdata[4].I = newdata[4].A;
            //I6,I7 I6=I4/(1-CALCULATOR!$C$14) I7=I5/(1-CALCULATOR!$C$14)
            newdata[5].I = newdata[3].I / (1 - parseFloat(calcData.C14.split("%"))/100);
            newdata[6].I = newdata[4].I / (1 - parseFloat(calcData.C14.split("%"))/100);
            //K4=if(CALCULATOR!$C$8="Mission 345",CALCULATOR!C11,0)
            if(calcData.C8 === "Mission 345") newdata[3].K = calcData.C11;
            else newdata[3].K = "0";
            //K5=if(CALCULATOR!$C$8="REC 370",CALCULATOR!$C$11,0)
            if(calcData.C8 === "REC 370") newdata[4].K = calcData.C11;
            else newdata[4].K = "0";
            //L4=if(CALCULATOR!$C$8="Mission 345",CALCULATOR!$C$15,0)
            if(calcData.C8 === "Mission 345") newdata[3].L = calcData.C15;
            else newdata[3].L = "0";
            //L5=if(CALCULATOR!$C$8="REC 370",CALCULATOR!$C$15,0)
            if(calcData.C8 === "REC 370") newdata[4].L = calcData.C15;
            else newdata[4].L = "0";
            //M4=if(CALCULATOR!$C$8="Mission 345",-CALCULATOR!$C$16,0)
            if(calcData.C8 === "Mission 345") newdata[3].M = "-" + calcData.C16;
            else newdata[3].M = "0";
            //M5=if(CALCULATOR!$C$8="REC 370",-CALCULATOR!$C$16,0)
            if(calcData.C8 === "REC 370") newdata[4].M = "-" + calcData.C16;
            else newdata[4].M = "0";
            //N4=if(CALCULATOR!$C$8="Mission 345",-CALCULATOR!$C$17,0)
            if(calcData.C8 === "Mission 345") newdata[3].N = "-" + calcData.C17;
            else newdata[3].N = "0";
            //N5=if(CALCULATOR!$C$8="REC 370",-CALCULATOR!$C$17,0)
            if(calcData.C8 === "REC 370") newdata[4].N = "-" + calcData.C17;
            else newdata[4].N = "0";
            //O4=if(CALCULATOR!$C$8="Mission 345",-CALCULATOR!$C$18,0)
            if(calcData.C8 === "Mission 345") newdata[3].O = "-" + calcData.C18;
            else newdata[3].O = "0";
            //O5=if(CALCULATOR!$C$8="REC 370",-CALCULATOR!$C$18,0)
            if(calcData.C8 === "REC 370") newdata[4].O = "-" + calcData.C18;
            else newdata[4].O = "0";
            //Q4=sum(L4:O4)
            newdata[3].Q = (parseFloat(getNum(newdata[3].L))+parseFloat(getNum(newdata[3].M))+parseFloat(getNum(newdata[3].N))+parseFloat(getNum(newdata[3].O))).toString();
            //Q5=sum(L5:O5)
            newdata[4].Q = (parseFloat(getNum(newdata[4].L))+parseFloat(getNum(newdata[4].M))+parseFloat(getNum(newdata[4].N))+parseFloat(getNum(newdata[4].O))).toString();
            //S4=IF(Q4>0,Q4/H4,0)
            if(parseFloat(getNum(newdata[3].Q)) > 0) newdata[3].S = (parseFloat(getNum(newdata[3].Q))/parseFloat(getNum(newdata[3].H))).toString();
            else newdata[3].S = "0";
            //S5=IF(Q5>0,Q5/H5,0)
            if(parseFloat(getNum(newdata[4].Q)) > 0) newdata[4].S = (parseFloat(getNum(newdata[4].Q))/parseFloat(getNum(newdata[4].H))).toString();
            else newdata[4].S = "0";
            //S8=IF(S4<I4,"REFUSED","ACCEPTED")
            if(parseFloat(getNum(newdata[3].S)) < parseFloat(getNum(newdata[3].I))) newdata[7].S = "REFUSED";
            else newdata[7].S = "ACCEPTED";
            //S9=IF(S5<I5,"REFUSED","ACCEPTED")
            if(parseFloat(getNum(newdata[4].S)) < parseFloat(getNum(newdata[4].I))) newdata[8].S = "REFUSED";
            else newdata[8].S = "ACCEPTED";
            //T4=IF(S4>I4,S4-I4,0)
            if(parseFloat(getNum(newdata[3].S)) > parseFloat(getNum(newdata[3].I))) newdata[3].T = (parseFloat(getNum(newdata[3].S)) - parseFloat(getNum(newdata[3].I))).toString();
            else newdata[3].T = "0";
            //T5=IF(S5>0,S5-I5,0)
            if(parseFloat(getNum(newdata[4].S)) > parseFloat(getNum(newdata[4].I))) newdata[4].T = (parseFloat(getNum(newdata[4].S)) - parseFloat(getNum(newdata[4].I))).toString();
            else newdata[4].T = "0";
            //U4=IF(T4>=0,IF(CALCULATOR!$C$6="Bronze",T4*$Z$7,IF(CALCULATOR!$C$6="Silver",T4*$Z$8,T4*$Z$9)))
            if(parseFloat(getNum(newdata[3].T)) >=0){
                if(calcData.C6 === "Bronze") newdata[3].U =(parseFloat(getNum(newdata[3].T))*parseFloat(newdata[6].Z.split("%")[0])/100).toString();
                else{
                    if(calcData.C6 === "Silver") newdata[3].U =(parseFloat(getNum(newdata[3].T))*parseFloat(newdata[7].Z.split("%")[0])/100).toString();
                    else newdata[3].U =(parseFloat(getNum(newdata[3].T))*parseFloat(newdata[8].Z.split("%")[0])/100).toString();
                }
            }
            //U5=IF(T5>=0,IF(CALCULATOR!$C$6="Bronze",T5*$Z$7,IF(CALCULATOR!$C$6="Silver",T5*$Z$8,T5*$Z$9)))
            if(parseFloat(getNum(newdata[4].T)) >=0){
                if(calcData.C6 === "Bronze") newdata[4].U =(parseFloat(getNum(newdata[4].T))*parseFloat(newdata[6].Z.split("%")[0])/100).toString();
                else{
                    if(calcData.C6 === "Silver") newdata[4].U =(parseFloat(getNum(newdata[4].T))*parseFloat(newdata[7].Z.split("%")[0])/100).toString();
                    else newdata[4].U =(parseFloat(getNum(newdata[4].T))*parseFloat(newdata[8].Z.split("%")[0])/100).toString();
                }
            }
            //V4=IF(+S4>=I4,B4*H4,0)
            if(parseFloat(getNum(newdata[3].S)) >= parseFloat(getNum(newdata[3].I))) newdata[3].V = ((parseFloat(getNum(newdata[3].B)))*(parseFloat(getNum(newdata[3].H)))).toString();
            else newdata[3].V = "0";
            //V5=IF(S5>I5,B5*H5,0)
            if(parseFloat(getNum(newdata[4].S)) > parseFloat(getNum(newdata[4].I))) newdata[4].V = ((parseFloat(getNum(newdata[4].B)))*(parseFloat(getNum(newdata[4].H)))).toString();
            else newdata[4].V = "0";
            //Y4=IF(CALCULATOR!$C$7="Self Gen",D4*H4,0)
            if(calcData.C7 === "Self Gen") newdata[3].Y = ((parseFloat(getNum(newdata[3].D)))*(parseFloat(getNum(newdata[3].H)))).toString();
            else newdata[3].Y = "0";
            //Y5=IF(CALCULATOR!$C$7="Self Gen",D5*H5,0)
            if(calcData.C7 === "Self Gen") newdata[4].Y = ((parseFloat(getNum(newdata[4].D)))*(parseFloat(getNum(newdata[4].H)))).toString();
            else newdata[4].Y = "0";
            //Z4=U4*H4
            newdata[3].Z = ((parseFloat(getNum(newdata[3].U)))*(parseFloat(getNum(newdata[3].H)))).toString();
            //Z5=U5*H5
            newdata[4].Z = ((parseFloat(getNum(newdata[4].U)))*(parseFloat(getNum(newdata[4].H)))).toString();
            //AA4=sum(V4:Z4)
            newdata[3].AA = ((parseFloat(getNum(newdata[3].V)))+(parseFloat(getNum(newdata[3].Y)))+(parseFloat(getNum(newdata[3].Z)))).toString();
            //AA5=sum(V5:Z5)
            newdata[4].AA = ((parseFloat(getNum(newdata[4].V)))+(parseFloat(getNum(newdata[4].Y)))+(parseFloat(getNum(newdata[4].Z)))).toString();

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
                }
            })
    }

    const itemChange = (event) => {
        event.dataItem[event.field] = event.value;
        const newdata = data.map(item => {
            var temp = {};
            var key = event.dataItem[event.field];
            temp[key] = event.value;
            return {...item,temp};
            }
        );
        setData(newdata);
        setChanges(true);
    }
    const renderers =  new Renderers(enterEdit, exitEdit, 'inEdit');
    React.useEffect(() => {
        firebase.firestore().collection("formulas").get().then((query) => {
            query.forEach((doc) => {
                var dbData = doc.data().data;
                
              
              firebase.firestore().collection("calculators").where("email","==",localStorage.getItem("email")).get().then((query1) => {
                query1.forEach((doc1) => {
                    calcData = doc1.data();
                    //formulas logic-------------------------------------------------------------------------------------------------------
                    dbData[3].C = dbData[3].B / dbData[3].A * 100;
                    dbData[4].C = dbData[4].B / dbData[4].A * 100;
                    //E4=(D4+B4)/((A4/0.8))
                    dbData[3].E = (parseFloat(dbData[3].D) + parseFloat(dbData[3].B))/(dbData[3].A/0.8) *100;
                    //E5=(D5+B5)/((A5/0.8))
                    dbData[4].E = (parseFloat(dbData[4].D) + parseFloat(dbData[4].B))/(dbData[4].A/0.8) *100;
                    //H4,H5
                    dbData[3].H = calcData.C10;
                    dbData[4].H = calcData.C10;
                    //I4,I5 I4 = A4;I5 = A5;
                    dbData[3].I = dbData[3].A;
                    dbData[4].I = dbData[4].A;
                    //I6,I7 I6=I4/(1-CALCULATOR!$C$14) I7=I5/(1-CALCULATOR!$C$14)
                    dbData[5].I = dbData[3].I / (1 - parseFloat(calcData.C14.split("%"))/100);
                    dbData[6].I = dbData[4].I / (1 - parseFloat(calcData.C14.split("%"))/100);
                    //K4=if(CALCULATOR!$C$8="Mission 345",CALCULATOR!C11,0)
                    if(calcData.C8 === "Mission 345") dbData[3].K = calcData.C11;
                    else dbData[3].K = "0";
                    //K5=if(CALCULATOR!$C$8="REC 370",CALCULATOR!$C$11,0)
                    if(calcData.C8 === "REC 370") dbData[4].K = calcData.C11;
                    else dbData[4].K = "0";
                    //L4=if(CALCULATOR!$C$8="Mission 345",CALCULATOR!$C$15,0)
                    if(calcData.C8 === "Mission 345") dbData[3].L = calcData.C15;
                    else dbData[3].L = "0";
                    //L5=if(CALCULATOR!$C$8="REC 370",CALCULATOR!$C$15,0)
                    if(calcData.C8 === "REC 370") dbData[4].L = calcData.C15;
                    else dbData[4].L = "0";
                    //M4=if(CALCULATOR!$C$8="Mission 345",-CALCULATOR!$C$16,0)
                    if(calcData.C8 === "Mission 345") dbData[3].M = "-" + calcData.C16;
                    else dbData[3].M = "0";
                    //M5=if(CALCULATOR!$C$8="REC 370",-CALCULATOR!$C$16,0)
                    if(calcData.C8 === "REC 370") dbData[4].M = "-" + calcData.C16;
                    else dbData[4].M = "0";
                    //N4=if(CALCULATOR!$C$8="Mission 345",-CALCULATOR!$C$17,0)
                    if(calcData.C8 === "Mission 345") dbData[3].N = "-" + calcData.C17;
                    else dbData[3].N = "0";
                    //N5=if(CALCULATOR!$C$8="REC 370",-CALCULATOR!$C$17,0)
                    if(calcData.C8 === "REC 370") dbData[4].N = "-" + calcData.C17;
                    else dbData[4].N = "0";
                    //O4=if(CALCULATOR!$C$8="Mission 345",-CALCULATOR!$C$18,0)
                    if(calcData.C8 === "Mission 345") dbData[3].O = "-" + calcData.C18;
                    else dbData[3].O = "0";
                    //O5=if(CALCULATOR!$C$8="REC 370",-CALCULATOR!$C$18,0)
                    if(calcData.C8 === "REC 370") dbData[4].O = "-" + calcData.C18;
                    else dbData[4].O = "0";
                    //Q4=sum(L4:O4)
                    dbData[3].Q = (parseFloat(getNum(dbData[3].L))+parseFloat(getNum(dbData[3].M))+parseFloat(getNum(dbData[3].N))+parseFloat(getNum(dbData[3].O))).toString();
                    //Q5=sum(L5:O5)
                    dbData[4].Q = (parseFloat(getNum(dbData[4].L))+parseFloat(getNum(dbData[4].M))+parseFloat(getNum(dbData[4].N))+parseFloat(getNum(dbData[4].O))).toString();
                    //S4=IF(Q4>0,Q4/H4,0)
                    if(parseFloat(getNum(dbData[3].Q)) > 0) dbData[3].S = (parseFloat(getNum(dbData[3].Q))/parseFloat(getNum(dbData[3].H))).toString();
                    else dbData[3].S = "0";
                    //S5=IF(Q5>0,Q5/H5,0)
                    if(parseFloat(getNum(dbData[4].Q)) > 0) dbData[4].S = (parseFloat(getNum(dbData[4].Q))/parseFloat(getNum(dbData[4].H))).toString();
                    else dbData[4].S = "0";
                    //S8=IF(S4<I4,"REFUSED","ACCEPTED")
                    if(parseFloat(getNum(dbData[3].S)) < parseFloat(getNum(dbData[3].I))) dbData[7].S = "REFUSED";
                    else dbData[7].S = "ACCEPTED";
                    //S9=IF(S5<I5,"REFUSED","ACCEPTED")
                    if(parseFloat(getNum(dbData[4].S)) < parseFloat(getNum(dbData[4].I))) dbData[8].S = "REFUSED";
                    else dbData[8].S = "ACCEPTED";
                    //T4=IF(S4>I4,S4-I4,0)
                    if(parseFloat(getNum(dbData[3].S)) > parseFloat(getNum(dbData[3].I))) dbData[3].T = (parseFloat(getNum(dbData[3].S)) - parseFloat(getNum(dbData[3].I))).toString();
                    else dbData[3].T = "0";
                    //T5=IF(S5>0,S5-I5,0)
                    if(parseFloat(getNum(dbData[4].S)) > parseFloat(getNum(dbData[4].I))) dbData[4].T = (parseFloat(getNum(dbData[4].S)) - parseFloat(getNum(dbData[4].I))).toString();
                    else dbData[4].T = "0";
                    //U4=IF(T4>=0,IF(CALCULATOR!$C$6="Bronze",T4*$Z$7,IF(CALCULATOR!$C$6="Silver",T4*$Z$8,T4*$Z$9)))
                    if(parseFloat(getNum(dbData[3].T)) >=0){
                        if(calcData.C6 === "Bronze") dbData[3].U =(parseFloat(getNum(dbData[3].T))*parseFloat(dbData[6].Z.split("%")[0])/100).toString();
                        else{
                            if(calcData.C6 === "Silver") dbData[3].U =(parseFloat(getNum(dbData[3].T))*parseFloat(dbData[7].Z.split("%")[0])/100).toString();
                            else dbData[3].U =(parseFloat(getNum(dbData[3].T))*parseFloat(dbData[8].Z.split("%")[0])/100).toString();
                        }
                    }
                    //U5=IF(T5>=0,IF(CALCULATOR!$C$6="Bronze",T5*$Z$7,IF(CALCULATOR!$C$6="Silver",T5*$Z$8,T5*$Z$9)))
                    if(parseFloat(getNum(dbData[4].T)) >=0){
                        if(calcData.C6 === "Bronze") dbData[4].U =(parseFloat(getNum(dbData[4].T))*parseFloat(dbData[6].Z.split("%")[0])/100).toString();
                        else{
                            if(calcData.C6 === "Silver") dbData[4].U =(parseFloat(getNum(dbData[4].T))*parseFloat(dbData[7].Z.split("%")[0])/100).toString();
                            else dbData[4].U =(parseFloat(getNum(dbData[4].T))*parseFloat(dbData[8].Z.split("%")[0])/100).toString();
                        }
                    }
                    //V4=IF(+S4>=I4,B4*H4,0)
                    if(parseFloat(getNum(dbData[3].S)) >= parseFloat(getNum(dbData[3].I))) dbData[3].V = ((parseFloat(getNum(dbData[3].B)))*(parseFloat(getNum(dbData[3].H)))).toString();
                    else dbData[3].V = "0";
                    //V5=IF(S5>I5,B5*H5,0)
                    if(parseFloat(getNum(dbData[4].S)) > parseFloat(getNum(dbData[4].I))) dbData[4].V = ((parseFloat(getNum(dbData[4].B)))*(parseFloat(getNum(dbData[4].H)))).toString();
                    else dbData[4].V = "0";
                    //Y4=IF(CALCULATOR!$C$7="Self Gen",D4*H4,0)
                    if(calcData.C7 === "Self Gen") dbData[3].Y = ((parseFloat(getNum(dbData[3].D)))*(parseFloat(getNum(dbData[3].H)))).toString();
                    else dbData[3].Y = "0";
                    //Y5=IF(CALCULATOR!$C$7="Self Gen",D5*H5,0)
                    if(calcData.C7 === "Self Gen") dbData[4].Y = ((parseFloat(getNum(dbData[4].D)))*(parseFloat(getNum(dbData[4].H)))).toString();
                    else dbData[4].Y = "0";
                    //Z4=U4*H4
                    dbData[3].Z = ((parseFloat(getNum(dbData[3].U)))*(parseFloat(getNum(dbData[3].H)))).toString();
                    //Z5=U5*H5
                    dbData[4].Z = ((parseFloat(getNum(dbData[4].U)))*(parseFloat(getNum(dbData[4].H)))).toString();
                    //AA4=sum(V4:Z4)
                    dbData[3].AA = ((parseFloat(getNum(dbData[3].V)))+(parseFloat(getNum(dbData[3].Y)))+(parseFloat(getNum(dbData[3].Z)))).toString();
                    //AA5=sum(V5:Z5)
                    dbData[4].AA = ((parseFloat(getNum(dbData[4].V)))+(parseFloat(getNum(dbData[4].Y)))+(parseFloat(getNum(dbData[4].Z)))).toString();

                    setData(dbData);
                    setLoading(false);
                })
              })
            })
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
                        <Column field="id" title="" width="50px" editable={false} locked={true}  />
                        <Column title="A"  field="A" width="100px" />
                        <Column title="B"  field="B" width="150px"/>
                        <Column title="C"  field="C" width="150px"/>
                        <Column title="D"  field="D" width="120px"/>
                        <Column title="E"  field="E" width="120px"/>
                        <Column title="F"  field="F" width="100px"/>
                        <Column title="G"  field="G" width="100px"/>
                        <Column title="H"  field="H" width="100px"/>
                        <Column title="I"  field="I" width="100px"/>
                        <Column title="J"  field="J" width="100px"/>
                        <Column title="K"  field="K" width="100px"/>
                        <Column title="L"  field="L" width="100px"/>
                        <Column title="M"  field="M" width="100px"/>
                        <Column title="N"  field="N" width="100px"/>
                        <Column title="O"  field="O" width="100px"/>
                        <Column title="P"  field="P" width="100px"/>
                        <Column title="Q"  field="Q" width="100px"/>
                        <Column title="R"  field="R" width="100px"/>
                        <Column title="S"  field="S" width="100px"/>
                        <Column title="T"  field="T" width="100px"/>
                        <Column title="U"  field="U" width="100px"/>
                        <Column title="V"  field="V" width="100px"/>
                        <Column title="W"  field="W" width="100px"/>
                        <Column title="X"  field="X" width="100px"/>
                        <Column title="Y"  field="Y" width="100px"/>
                        <Column title="Z"  field="Z" width="100px"/>
                        <Column title="AA"  field="AA" width="100px"/>
                        <Column title="AB"  field="AB" width="100px"/>
                    </Grid>
                </Paper>
            </Widget>
            </MaterialGrid>
            }
        </>
      )
}
