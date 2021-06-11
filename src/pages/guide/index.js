import React, { useContext,useEffect } from "react";
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { Renderers } from './renderers.js';
import {
    Paper,
    Grid as MaterialGrid,
  } from '@material-ui/core';
import Widget from "../../components/Widget/Widget";
import { useLoading, ThreeDots} from '@agney/react-loading';

import { useSelector, useDispatch } from "react-redux";
import { FirebaseContext } from '../../redux';

export default function Guide(){
    const { api } = useContext(FirebaseContext);
    const {
        updateGuide,
      } = api;
    const guide = useSelector(state => state.guide);
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
        const newdata = data.map(item => (
            { ...item, inEdit: undefined }
            ));
            setData(newdata);
            setEditField(undefined);

            var updateData = {};
            updateData.data = [];
            newdata.map((item) => {
                const {temp,inEdit,...ndata} = item;
                updateData.data.push(ndata);
            })
            dispatch(updateGuide(updateData));
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
        if(guide.info){
            const dbdata = guide.info;
            if(dbdata.length === 0){
                let initialData = [];
                let tempRowData = {};
                let key;
                for(var i = 0;i < 25; i++){
                    tempRowData = {};
                    tempRowData.id = i+1;
                    tempRowData.A = "";
                    tempRowData.A = "";
                    initialData.push(tempRowData);
                }
                setData(initialData);
                setLoading(false); 
            }else{
                setData(dbdata.data)
                setLoading(false);
            }
        }
      }, [guide.info])
      return(
        <>
            {loading ?    
            <section {...containerProps} style={{textAlign:"center",marginTop:window.innerHeight/2 - 100}}>
                {indicatorEl} {/* renders only while loading */}
            </section> :
            <MaterialGrid item xs={12}>
                <Widget title="Guide">
                <Paper style={{}}>
                    <Grid
                        style={{ height: '900px' }}
                        data={data}
                        rowHeight={20}
                        onItemChange={itemChange}

                        cellRender={renderers.cellRender}
                        rowRender={renderers.rowRender}
                        navigatable={true}
                        resizable={true}
                        editField="inEdit"
                        >
                        <Column field="id" title="Id" width="50px" editable={false} auto locked={true}/>
                        <Column title="A" width="300px" field="A" />
                        <Column title="B" width="1200px" editor="text" field="B" />
                    </Grid>
                </Paper>
                </Widget>
            </MaterialGrid>
            }
        </>
      )
}
