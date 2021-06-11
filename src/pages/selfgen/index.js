import React, { useContext,useEffect } from "react";
import * as ReactDOM from 'react-dom';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { useLoading, ThreeDots} from '@agney/react-loading';
import Notification from "../../components/Notification/Notification";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    Paper,
    Grid as MaterialGrid,
  } from '@material-ui/core';
import Widget from "../../components/Widget/Widget";
import SweetAlert from 'react-bootstrap-sweetalert';
import { CircularProgressWithLabel } from "../../components/CircularProgressWithLabel"
import { MyCommandCell } from './myCommandCell';
import useStyles from "./styles";
import "./style.css"

import { useSelector, useDispatch } from "react-redux";
import { FirebaseContext } from '../../redux';

let deleteDataItem;
export default function Selfgen() {
    const { api } = useContext(FirebaseContext);
    const {
        addSelfGen,
        updateSelfGen,
        deleteSelfGen
      } = api;
    const selfgen = useSelector(state => state.selfgen);
    const dispatch = useDispatch();

    var classes = useStyles();
    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        indicator: <ThreeDots width="50" />,
      });
    const [loading, setLoading] = React.useState(true);
    const firebase = React.useContext(FirebaseContext);
    const [editField, setEditField] = React.useState("inEdit");
    const [data, setData] = React.useState([]);
    const [alert,setAlert] = React.useState(null);
    //#####################################toast########################################################
    const sendNotification = (componentProps, options) => {
        return toast(
        <Notification
            {...componentProps}
            className={classes.notificationComponent}
        />,
        options,
        );
    }
    const handleNotificationCall = () => {
        var componentProps;
    

            componentProps = {
              type: "feedback",
              message: `Successfully saved`,
              variant: "contained",
              color: "primary",
            };
            
        var toastId = sendNotification(componentProps, {
          type: "error",
          position:  toast.POSITION.TOP_CENTER,
          progressClassName: classes.progress,
          className: classes.notification,
        });
    }
    //#####################################toast end########################################################
    let CommandCell;

    CommandCell = props => (
      <MyCommandCell
        {...props}
        edit={enterEdit}
        remove={remove}
        add={add}
        discard={discard}
        update={update}
        cancel={cancel}
        editField={editField}
        />
    );

    const enterEdit = (dataItem) => {
        const newData = data.map(item =>
                    item.ID === dataItem.ID ?
                    { ...item, inEdit: true } : item
                )
        setData(newData)
    }
    const warnConfirm = () => {
        setAlert(null);
    }
    const add = (dataItem) => {
        dataItem.inEdit = undefined;
        dataItem.ID = data.length;
        const newSaveData = data.map(item => {
            const {inEdit,...nitem} = item;
            return nitem;
        })
        setAlert(
            <SweetAlert
                title={""}
                onConfirm={() => {}}
                showConfirm={false}
            >
                <CircularProgressWithLabel value={100} />
            </SweetAlert>)
        dispatch(addSelfGen(newSaveData));
        setAlert(null);
        handleNotificationCall();
        // console.log("module Document successfully add!");
    }

    const update = (dataItem) => {
        const updatedItem = { ...dataItem, inEdit: undefined };
        updateItem(data, updatedItem);
        
    }

    const updateItem = (data, item) => {
        let index = data.findIndex(p => p === item || (item.ID && p.ID === item.ID));
        if (index >= 0) {
            data[index] = { ...item };
        }
        const newSaveData = data.map(item => {
            const {inEdit,...nitem} = item;
            return nitem;
        })
           

        setAlert(
            <SweetAlert
                title={""}
                onConfirm={() => {}}
                showConfirm={false}
            >
                <CircularProgressWithLabel value={100} />
            </SweetAlert>)
        dispatch(updateSelfGen(newSaveData));
        setAlert(null);
        handleNotificationCall();
        // console.log("selfgen Document successfully update!");
    }

    const cancel = (dataItem) => {
    }

    const discard = (dataItem) => {
        cancelCurrentChanges()
    }

    const remove = (dataItem) => {
        deleteDataItem = dataItem;
        setAlert(
            <SweetAlert
            danger
            showCancel
            confirmBtnText="Yes, delete it!"
            confirmBtnBsStyle="delete"
            title="Are you sure?"
            onConfirm={deleteRequest}
            onCancel={deleteCancel}
            focusCancelBtn
            >
            You will not be able to recover this selfgen lead(<b>{dataItem.selfgen}</b>).
          </SweetAlert>
          );
        
        
    }
    const deleteRequest = () => {
        setAlert(null)
        setAlert(
        <SweetAlert
            title={""}
            onConfirm={() => {}}
            showConfirm={false}
        >
            <CircularProgressWithLabel value={50} />
        </SweetAlert>)
        removeItem(data, deleteDataItem);
        let id = 0;
        const newSaveData = data.map(item => {
            const {inEdit,...nitem} = item;
            id++;
            nitem.ID = id;
            return nitem;
        })
        dispatch(deleteSelfGen(newSaveData));
        setAlert(null);
        handleNotificationCall();
        // console.log("selfgen Document successfully delete update!");
    }
    const deleteCancel = () => {
        setAlert(null);
    }
    const deletedConfirm = () => {
        setAlert(null);
    }
    const removeItem = (data, item) => {
        let index = data.findIndex(p => p === item || (item.ID && p.ID === item.ID));
        if (index >= 0) {
            data.splice(index, 1);
        }
    }
    const itemChange = (event) => {
        const newData = data.map(item =>
                    item.ID ===  event.dataItem.ID ?
                    { ...item, [event.field]: event.value } : item
                )
        setData(newData)
    }

    const addNew = () => {
        const newDataItem = { inEdit: true};
        setData([ newDataItem, ...data ])
    }

    const cancelCurrentChanges = () => {
        if(selfgen.info){
            const dbdata = selfgen.info;
            dbdata.sort(function(a, b){return a.ID - b.ID});
            setData(dbdata)
        }
    }
    const hasEditedItem = data.some(p => p.inEdit);
    React.useEffect(() => {
        if(selfgen.info){
            const dbdata = selfgen.info;
            dbdata.sort(function(a, b){return a.ID - b.ID});
            setData(dbdata)
            setLoading(false);
        }
      }, [selfgen.info])
    return (
        <>
            <ToastContainer 
                className={classes.toastsContainer}
            />
            {alert}
            {loading ?    
            <section {...containerProps} style={{textAlign:"center",marginTop:window.innerHeight/2 - 100}}>
                {indicatorEl} 
            </section> :
            <MaterialGrid item lg={12} md={12} sm={12} xs={12}>
                <Widget title="Selfgen Lead">
                    <Paper style={{}}>
                        <Grid
                            data={data}
                            onItemChange={itemChange}
                            editField={editField}
                            >
                            <GridToolbar>
                                <button
                                title="Add new"
                                className="k-button k-secondary"
                                onClick={addNew}
                                    >
                                Add new selfgen lead
                                </button>
                                {hasEditedItem && (
                                <button
                                    title="Cancel current changes"
                                    className="k-button k-fiveth"
                                    onClick={cancelCurrentChanges}
                                        >
                                    Cancel current changes
                                </button>
                                    )}
                            </GridToolbar>
                            <Column field="selfgen" title="Selfgen Lead"  className="centerClass"/>
                            <Column title="Action" cell={CommandCell} width="300px"  className="centerClass"/>
                        </Grid>
                    </Paper>
                </Widget>
            </MaterialGrid>
            
            }
        </>
        
    );

    
}