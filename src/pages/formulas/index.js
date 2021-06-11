import React, { useContext,useEffect } from "react";
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { Renderers } from './renderers.js';
import {
    Paper,
    Grid as MaterialGrid,
  } from '@material-ui/core';
  import Widget from "../../components/Widget/Widget";
  import { useLoading, ThreeDots} from '@agney/react-loading';
  import "./style.css"

  import { useSelector, useDispatch } from "react-redux";
  import { FirebaseContext } from '../../redux';
import { core } from "../core";

  var calcData = {};
  export default function Formulas(){
    const { api } = useContext(FirebaseContext);
    const {
        updateFormulas,
      } = api;
    const calculator = useSelector(state => state.calculator);
    const formulas = useSelector(state => state.formulas);
    const dispatch = useDispatch();

    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        indicator: <ThreeDots width="50" />,
      });
    const [loading, setLoading] = React.useState(true);
    const firebase = useContext(FirebaseContext);
    const [data, setData] = React.useState([]);
    const [editField, setEditField] = React.useState(undefined);
    const [changes, setChanges] = React.useState(false);
    
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
        // console.log("data",data)
        let newdata = data.map(item => (
                { ...item, inEdit: undefined }
            ));
            var calculatorData = calculator.info;
            var finaldata = core(newdata,calculatorData);
            newdata = finaldata.formulas;
            setData(newdata);
            setEditField(undefined);
            var updateData = [];
                newdata.map((item) => {
                    const {temp,inEdit,...ndata} = item;
                    updateData.push(ndata);
                });

            dispatch(updateFormulas(updateData));
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
            if(formulas.info.length === 0){
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
            }else{
                // console.log("changed")
                var formulasData = formulas.info;
                var calculatorData = calculator.info;
                var data = core(formulasData,calculatorData);
                setData(data.formulas);
                setLoading(false);
            }
      }, [
          formulas.info[3].A,//Formulas A4
          formulas.info[4].A,//Formulas A5
          formulas.info[3].B,//Formulas B4
          formulas.info[4].B,//Formulas B5
          formulas.info[3].D,//Formulas D4
          formulas.info[4].D,//Formulas D5
          formulas.info[3].F,//Formulas F4
          formulas.info[4].F,//Formulas F5
          formulas.info[6].Z,//Formulas Z7
          formulas.info[7].Z,//Formulas z8
          formulas.info[8].Z,//Formulas z9
          calculator.info
        ])
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
