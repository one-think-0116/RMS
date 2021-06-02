import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { FirebaseContext } from '../../components/Firebase/context';
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

let deleteDataItem;
export default function Battery() {
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
        let saveData = {data:newSaveData};
        setAlert(
            <SweetAlert
                title={""}
                onConfirm={() => {}}
                showConfirm={false}
            >
                <CircularProgressWithLabel value={100} />
            </SweetAlert>)
        if(data.length === 1){
            firebase.firestore().collection("battery").add(saveData).then(() => {
                setAlert(null);
                setData([...data]);
                handleNotificationCall();
                console.log("battery Document successfully add!");
            })
        }else
        {
            firebase.firestore().collection("battery")
            .get()
            .then((querySnapshot) => {
                var docs = querySnapshot.docs;
                if(docs.length > 0) //update documentation
                {
                    firebase.firestore().collection("battery").doc(docs[0].id).update(saveData).then(() => {
                        setAlert(null);
                        data.sort(function(a, b){return a.ID - b.ID});
                        setData([...data]);
                        handleNotificationCall();
                        console.log("battery Document successfully update!");
                    })
                }
            })
            
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
           
        let saveData = {data:newSaveData};
        setAlert(
            <SweetAlert
                title={""}
                onConfirm={() => {}}
                showConfirm={false}
            >
                <CircularProgressWithLabel value={100} />
            </SweetAlert>)
        firebase.firestore().collection("battery")
            .get()
            .then((querySnapshot) => {
                var docs = querySnapshot.docs;
                if(docs.length > 0) //update documentation
                {
                    firebase.firestore().collection("battery").doc(docs[0].id).update(saveData).then(() => {
                        setAlert(null);
                        data.sort(function(a, b){return a.ID - b.ID});
                        setData([...data]);
                        handleNotificationCall();
                        console.log("battery Document successfully update!");
                    })
                }
            })
        
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
            You will not be able to recover this battery type(<b>{dataItem.battery}</b>).
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
        let saveData = {data:newSaveData};
        firebase.firestore().collection("battery")
            .get()
            .then((querySnapshot) => {
                var docs = querySnapshot.docs;
                if(docs.length > 0) //update documentation
                {
                    setAlert(
                        <SweetAlert
                            title={""}
                            onConfirm={() => {}}
                            showConfirm={false}
                        >
                            <CircularProgressWithLabel value={100} />
                        </SweetAlert>)
                    firebase.firestore().collection("battery").doc(docs[0].id).update(saveData).then(() => {
                        data.sort(function(a, b){return a.ID - b.ID});
                        setData([...newSaveData]);
                        // handleNotificationCall();
                        setAlert(
                            <SweetAlert success title="Deleted" onConfirm={deletedConfirm}>
                              The battery type has been deleted.
                            </SweetAlert>
                            )
                        console.log("battery Document successfully delete update!");
                    })
                }
            })
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
        firebase.firestore().collection("battery").get().then((query) => {
            var docs = query.docs;
            if(docs.length > 0){
                const dbdata = docs[0].data().data;
                dbdata.sort(function(a, b){return a.ID - b.ID});
                setData(dbdata)
            }else{
                setData([]);
            }
          })
    }
    const hasEditedItem = data.some(p => p.inEdit);
    React.useEffect(() => {
        firebase.firestore().collection("battery").get().then((query) => {
            var docs = query.docs;
            if(docs.length > 0){
                const dbdata = docs[0].data().data;
                dbdata.sort(function(a, b){return a.ID - b.ID});
                setData(dbdata)
            }else{
                setData([]);
            }
            setLoading(false);
          })
        
      }, [])
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
                <Widget title="Battery Type">
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
                                Add new battery type
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
                            <Column field="battery" title="Battery Type"  className="centerClass"/>
                            <Column title="Action" cell={CommandCell} width="300px"  className="centerClass"/>
                        </Grid>
                    </Paper>
                </Widget>
            </MaterialGrid>
            
            }
        </>
        
    );

    
}