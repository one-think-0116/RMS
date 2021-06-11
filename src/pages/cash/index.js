import React, { useContext,useEffect } from "react";
import * as ReactDOM from 'react-dom';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { MyCommandCell } from './myCommandCell';
import { useLoading, ThreeDots} from '@agney/react-loading';
import Notification from "../../components/Notification";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useStyles from "./styles";
import "./style.css"
import {
    Paper,
    Grid as MaterialGrid,
  } from '@material-ui/core';
import Widget from "../../components/Widget/Widget";
import SweetAlert from 'react-bootstrap-sweetalert';
import { CircularProgressWithLabel } from "../../components/CircularProgressWithLabel"

import { useSelector, useDispatch } from "react-redux";
import { FirebaseContext } from '../../redux';

let deleteDataItem;
export default function Cash() {
    const { api } = useContext(FirebaseContext);
    const {
        addCash,
        updateCash,
        deleteCash
      } = api;
    const cash = useSelector(state => state.cash);
    const dispatch = useDispatch();

    var classes = useStyles();
    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        indicator: <ThreeDots width="50" />,
      });
    const [loading, setLoading] = React.useState(true);
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
        if(isNaN(dataItem.cash)){
            setAlert(<SweetAlert
            warnning
            confirmBtnText="Yes, got it"
            confirmBtnBsStyle="delete"
            title="Are you sure?"
            onConfirm={warnConfirm}
            focusConfirmBtn
            >
            The field value must be <b>number</b>.
          </SweetAlert>)
          discard(dataItem);
        }else{
            if(parseFloat(dataItem.cash) < 0){
                setAlert(<SweetAlert
                    warnning
                    confirmBtnText="Yes, got it"
                    confirmBtnBsStyle="delete"
                    title="Are you sure?"
                    onConfirm={warnConfirm}
                    focusConfirmBtn
                    >
                    The field value must be greater than <b>0</b>.
                  </SweetAlert>)
                  discard(dataItem);
            }else{
                setAlert(
                    <SweetAlert
                        title={""}
                        onConfirm={() => {}}
                        showConfirm={false}
                    >
                        <CircularProgressWithLabel value={100} />
                    </SweetAlert>)
                    dispatch(addCash(newSaveData));
                    setAlert(null);
                    handleNotificationCall();
                    // console.log("cash Document successfully add!");
                    
            }
        }
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
        if(isNaN(item.cash)){
            setAlert(<SweetAlert
                warnning
                confirmBtnText="Yes, got it"
                confirmBtnBsStyle="delete"
                title="Are you sure?"
                onConfirm={warnConfirm}
                focusConfirmBtn
                >
                The field value must be <b>number</b>.
              </SweetAlert>)
              cancelCurrentChanges()
        }else{
            if(parseFloat(item.cash) < 0){
                setAlert(<SweetAlert
                    warnning
                    confirmBtnText="Yes, got it"
                    confirmBtnBsStyle="delete"
                    title="Are you sure?"
                    onConfirm={warnConfirm}
                    focusConfirmBtn
                    >
                    The field value must be greater than <b>0</b>.
                  </SweetAlert>)
                  cancelCurrentChanges()
            }else{
                setAlert(
                    <SweetAlert
                        title={""}
                        onConfirm={() => {}}
                        showConfirm={false}
                    >
                        <CircularProgressWithLabel value={100} />
                    </SweetAlert>)
                    dispatch(updateCash(newSaveData));
                    setAlert(null);
                    handleNotificationCall();
                    // console.log("cash Document successfully update!");
            }
        }
        
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
            You will not be able to recover this cash(<b>$ {dataItem.cash}</b>).
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
        dispatch(deleteCash(newSaveData));
        setAlert(null);
        handleNotificationCall();
        // console.log("cash Document successfully delete!");
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
        if(cash.info){
            const dbdata = cash.info;
            dbdata.sort(function(a, b){return a.cash - b.cash});
            setData(dbdata)
        }
    }
    const hasEditedItem = data.some(p => p.inEdit);
    React.useEffect(() => {
        if(cash.info){
            const dbdata = cash.info;
            dbdata.sort(function(a, b){return a.cash - b.cash});
            setData(dbdata)
            setLoading(false);
        }
      }, [cash.info])
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
                <Widget title="Cash back to customer">
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
                                Add new cash
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
                            {/* <Column field="ID" title="Id" width="50px" editable={false}  className="centerClass"/> */}
                            <Column field="cash" title="Cash back to customer ($)"  className="centerClass"/>
                            <Column title="Action" cell={CommandCell} width="300px"  className="centerClass"/>
                        </Grid>
                    </Paper>
                </Widget>
            </MaterialGrid>
            
            }
        </>
    );
}