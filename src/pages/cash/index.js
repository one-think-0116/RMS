import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { FirebaseContext } from '../../components/Firebase/context';
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

export default function Cash() {
    var classes = useStyles();
    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        indicator: <ThreeDots width="50" />,
      });
    const [loading, setLoading] = React.useState(true);
    const firebase = React.useContext(FirebaseContext);
    const [editField, setEditField] = React.useState("inEdit");
    const [data, setData] = React.useState([]);
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

    const add = (dataItem) => {
        dataItem.inEdit = undefined;
        dataItem.ID = data.length;
        const newSaveData = data.map(item => {
            const {inEdit,...nitem} = item;
            return nitem;
        })
        let saveData = {data:newSaveData};
        if(data.length === 1){
            firebase.firestore().collection("cash").add(saveData).then(() => {
                setData([...data]);
                handleNotificationCall();
                console.log("cash Document successfully add!");
            })
        }else
        {
            firebase.firestore().collection("cash")
            .get()
            .then((querySnapshot) => {
                var docs = querySnapshot.docs;
                if(docs.length > 0) //update documentation
                {
                    firebase.firestore().collection("cash").doc(docs[0].id).update(saveData).then(() => {
                        data.sort(function(a, b){return a.cash - b.cash});
                        setData([...data]);
                        handleNotificationCall();
                        console.log("cash Document successfully update!");
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
        firebase.firestore().collection("cash")
            .get()
            .then((querySnapshot) => {
                var docs = querySnapshot.docs;
                if(docs.length > 0) //update documentation
                {
                    firebase.firestore().collection("cash").doc(docs[0].id).update(saveData).then(() => {
                        data.sort(function(a, b){return a.cash - b.cash});
                        setData([...data]);
                        handleNotificationCall();
                        console.log("cash Document successfully update!");
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
        removeItem(data, dataItem);
        let id = 0;
        const newSaveData = data.map(item => {
            const {inEdit,...nitem} = item;
            id++;
            nitem.ID = id;
            return nitem;
        })
        let saveData = {data:newSaveData};
        firebase.firestore().collection("cash")
            .get()
            .then((querySnapshot) => {
                var docs = querySnapshot.docs;
                if(docs.length > 0) //update documentation
                {
                    firebase.firestore().collection("cash").doc(docs[0].id).update(saveData).then(() => {
                        data.sort(function(a, b){return a.cash - b.cash});
                        setData([...newSaveData]);
                        handleNotificationCall();
                        console.log("cash Document successfully delete update!");
                    })
                }
            })
        
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
        firebase.firestore().collection("cash").get().then((query) => {
            var docs = query.docs;
            if(docs.length > 0){
                const dbdata = docs[0].data().data;
                dbdata.sort(function(a, b){return a.cash - b.cash});
                setData(dbdata)
            }else{
                setData([]);
            }
          })
    }
    const hasEditedItem = data.some(p => p.inEdit);
    React.useEffect(() => {
        firebase.firestore().collection("cash").get().then((query) => {
            var docs = query.docs;
            if(docs.length > 0){
                const dbdata = docs[0].data().data;
                dbdata.sort(function(a, b){return a.cash - b.cash});
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