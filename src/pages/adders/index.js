import React ,{useContext} from "react";
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { Renderers } from './renderers.js';
import {
    Paper,
    Grid as MaterialGrid,
  } from '@material-ui/core';
  import Widget from "../../components/Widget/Widget";
  import { useLoading, ThreeDots} from '@agney/react-loading';
  
  import { FirebaseContext } from '../../components/Firebase/context';

  import Notification from "../../components/Notification";
  import { ToastContainer, toast } from "react-toastify";
  import { Close as CloseIcon } from "@material-ui/icons";
    // styles
    import "react-toastify/dist/ReactToastify.css";
    import useStyles from "./styles";
    import "./style.css"
    // import { CurrencyFormatter } from "./currency"

export default function Adder(){
    var classes = useStyles();
    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        indicator: <ThreeDots width="50" />,
      });
    const [loading, setLoading] = React.useState(true);
    const firebase = useContext(FirebaseContext);
    const [data, setData] = React.useState([]);
    const [editField, setEditField] = React.useState(undefined);
    const [changes, setChanges] = React.useState(false);
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
              message: `You do not have permission to use it yet.
                        Please contact your administrator`,
              variant: "contained",
              color: "secondary",
            };
            
        var toastId = sendNotification(componentProps, {
          type: "error",
          position:  toast.POSITION.TOP_CENTER,
          progressClassName: classes.progress,
          className: classes.notification,
        });
    }
    const CloseButton = ({ closeToast, className }) => {
        return <CloseIcon className={className} onClick={closeToast} />;
        }
          
    //#####################################toast########################################################
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
            var sum = 0;
            for(var i = 0;i < 21;i++)
            {
                newdata[i].sales_cash_price = parseFloat(newdata[i].sales_cash_price);
                sum+=newdata[i].sales_cash_price * newdata[i].quantity;
                newdata[i].total = newdata[i].sales_cash_price * newdata[i].quantity;
            }
            newdata[22].total = sum;
            setData(newdata);
            setEditField(undefined);
            firebase.firestore().collection("adders").where("email","==",localStorage.getItem("email"))
            .get()
            .then((querySnapshot) => {
                var docs = querySnapshot.docs;
                if(docs.length > 0) //update documentation
                {
                    var updateData = {};
                    updateData.email = localStorage.getItem("email");
                    updateData.data = [];
                    newdata.map((item) => {
                        const {temp,inEdit,...ndata} = item;
                        updateData.data.push(ndata);
                    })
                    firebase.firestore().collection("adders").doc(docs[0].id).update(updateData).then(() => {
                        console.log("adders Document successfully update!");
                        firebase.firestore().collection("calculators").where("email","==",localStorage.getItem("email"))
                        .get()
                        .then((querySnapshot) => {
                            var docs = querySnapshot.docs;
                            if(docs.length > 0) //update documentation
                            {
                                var newCalcData = {C18:sum.toString()};
                                firebase.firestore().collection("calculators").doc(docs[0].id).update(newCalcData).then(() => {
                                    console.log("calculators Document successfully update!");
                                })
                            }
                        })
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
        firebase.firestore().collection("users").where("email","==",localStorage.getItem("email")).get().then((query) => {
            query.forEach((doc) => {
              if(doc.data().allow)
              {
                firebase.firestore().collection("adders").where("email","==",localStorage.getItem("email")).get().then((query) => {
                  query.forEach((doc) => {
                    setData(doc.data().data)
                    setLoading(false);
                  })
                })
              }else{
                handleNotificationCall();
              }
            })
          })
        
      }, [])

      return(
        <>
            <ToastContainer 
                className={classes.toastsContainer}
            />
            {loading ?    
            <section {...containerProps} style={{textAlign:"center",marginTop:window.innerHeight/2 - 100}}>
                {indicatorEl} 
            </section> :
            
            <MaterialGrid item lg={12} md={12} sm={12} xs={12}>
                <Widget title="ADDERS, BATTERIES AND INSURANCE PRICES">
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
                        <Column field="id" title="Id" width="50px" editable={false} auto locked={true} className="centerClass"/>
                        <Column title="Adders"  field="adders" width="500px" className="centerClass" />
                        <Column title="Sales - Cash Price"  field="sales_cash_price" width="200px" className="centerClass" format="{0:c}" />
                        <Column title="Scale" editor="text"  field="scale" width="200px" className="centerClass" />
                        <Column title="Quantity" field="quantity" width="100px" className="centerClass" />
                        <Column title="Total" field="total" width="150px" className="centerClass" format="{0:c}" />
                        <Column title="" editor="text" field="F" className="centerClass" />
                        <Column title="" editor="text" field="G" width="100px" className="centerClass"/>
                        <Column title="" editor="text" field="H" width="100px" className="centerClass"/>
                    </Grid>
                </Paper>
                </Widget>
            </MaterialGrid>
            }
        </>
      )
}