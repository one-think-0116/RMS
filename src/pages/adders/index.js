import React, { useContext,useEffect } from "react";
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { Renderers } from './renderers.js';
import {
    Paper,
    Grid as MaterialGrid,
  } from '@material-ui/core';
  import Widget from "../../components/Widget/Widget";
  import { useLoading, ThreeDots} from '@agney/react-loading';
  
  import Notification from "../../components/Notification";
  import { ToastContainer, toast } from "react-toastify";
  import { Close as CloseIcon } from "@material-ui/icons";
    // styles
    import "react-toastify/dist/ReactToastify.css";
    import useStyles from "./styles";
    import "./style.css"
    import { DropDownList } from '@progress/kendo-react-dropdowns';
    import { MyCustomCell } from './customCell';

import { useSelector, useDispatch } from "react-redux";
import { FirebaseContext } from '../../redux';

    function useAsyncState(initialValue) {
      const [value, setValue] = React.useState(initialValue);
      const setter = x =>
        new Promise(resolve => {
          setValue(x);
          resolve(x);
        });
      return [value, setter];
    }
export default function Adder(){

  const { api } = useContext(FirebaseContext);
  const {
    updateAdders,
    updateCalculatorRefAdder
    } = api;
  const adders = useSelector(state => state.adders);
  const auth = useSelector(state => state.auth);
  const calculator = useSelector(state => state.calculator);
  const dispatch = useDispatch();

    var classes = useStyles();
    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        indicator: <ThreeDots width="50" />,
      });
    const [loading, setLoading] = React.useState(true);
    const firebase = useContext(FirebaseContext);
    const [data, setData] = useAsyncState([]);
    const [systemSize, setSystemSize] = React.useState(0);
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
          
    //#####################################toast end########################################################
    let CommandCell;
    CommandCell = props => (
      <MyCustomCell
        {...props}
        onchange={onchange}
        editField={editField}
        />
    );
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
    const enterEdit = (dataItem, field) => {
        const newdata = data.map(item => ({
                ...item,
                inEdit: item.id === dataItem.id ? field : undefined
            })
        );
            setData(newdata);
            setEditField(field);
    }
    const onchange = (event) =>{
      const idNumber = parseInt(event.target.props.id);
      let changedValue;
      if(typeof event.value === "object"){
        changedValue = event.value.value;
      }else{
        changedValue = event.value;
      }
      const newData = data.map(item => (
        item.id == idNumber ? { ...item, quantity: changedValue} : item
      ))
      asyncUpdate(newData);
    }
    async function asyncUpdate(nData) {
      const resultData = await setData(nData)
      core(resultData);
    }
    const core = (currentData) => {
      const newdata = currentData.map(item => (
        { ...item, inEdit: undefined }
        ));
        var sum = 0;
        for(var i = 0;i < 21;i++)
        {
          newdata[i].sales_cash_price = parseFloat(newdata[i].sales_cash_price);
          switch(newdata[i].scale){
            case "per watt add-on":
                if(newdata[i].quantity === "Yes") newdata[i].total =newdata[i].sales_cash_price * systemSize;
                else newdata[i].total = 0;
              break;
            case "Added price":
                if(newdata[i].quantity === "Yes") newdata[i].total =newdata[i].sales_cash_price;
                else newdata[i].total = 0;
              break;
            case "per foot":
                newdata[i].total = newdata[i].sales_cash_price * newdata[i].quantity;
              break;
            default:
              newdata[i].total = newdata[i].sales_cash_price * newdata[i].quantity;
              break;
          }
          sum += newdata[i].total;
        }
        newdata[22].total = sum;
        setData(newdata);
        setEditField(undefined);
        // console.log(newdata)

        var updateData = [];
        newdata.map((item) => {
            const {temp,inEdit,...ndata} = item;
            updateData.push(ndata);
        })
        let uid = auth.refinfo.uid;
        dispatch(updateAdders(uid,updateData));
        // console.log("adders Document successfully update!");

        var newCalcData = {C18:sum.toString()};
        dispatch(updateCalculatorRefAdder(uid,newCalcData));
        // console.log("calculators Document successfully update!");
    } 
    const exitEdit = () => {
      core(data)
    }

    const itemChange = (event) => {
      event.dataItem[event.field] = event.value;
        const newdata = data.map(item => {
            return {...item}
            }
        );
        setData(newdata);
        setChanges(true);
    }
    const renderers =  new Renderers(enterEdit, exitEdit, 'inEdit');
    // console.log("auth allow",auth.info.profile,auth.info.profile.allow)
    React.useEffect(() => {
        if(auth.info.profile.allow){
            setSystemSize(getNum(calculator.info.C10))
            const newdata = adders.info.map(item => {
            if(item.scale === "per watt add-on" || item.scale === "Added price"){
              if(item.quantity === "Yes") return item;
              else return {...item,quantity:"No"};
            }else{
              return item;
            }
          })
          setData(newdata)
          setLoading(false);
        }else
        {
          handleNotificationCall();
        }
    }, [auth.info.profile.allow,adders.info,calculator.info.C10])
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
                        <Column title="Adders"  field="adders" width="250px" className="centerClass" />
                        <Column title="Sales - Cash Price"  field="sales_cash_price" width="100px" className="centerClass" format="{0:c}" />
                        <Column title="Scale" editor="text"  field="scale" width="150px" className="centerClass" />
                        {/* <Column title="Quantity" field="quantity" width="100px" className="centerClass" cell={(props) =><CustomCell {...props} quantityChange={quantityChange}/>}  /> */}
                        <Column title="Quantity" field="quantity" width="100px" className="centerClass" cell={CommandCell}  />
                        <Column title="Total" field="total" width="100px" className="centerClass" format="{0:c}" />
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
// class CustomCell extends React.Component {
//     constructor(props){
//       super(props);
//       this.state = {data:this.props.dataItem[this.props.field]};
//     }
//     localizedData = [
//       { text: 'Yes', value: "Yes" },
//       { text: 'No', value: "No" }
//     ];
//     handleChange(e) {
//       if(e.target.value.value === undefined){
//         this.setState({data:e.target.value})
//         this.props.quantityChange(
//           {
//             dataItem: this.props.dataItem,
//             field: this.props.field,
//             syntheticEvent: e.syntheticEvent,
//             value: e.target.value
//           }
//         );
//       }else
//       {
//         this.setState({data:e.target.value.value})
//         this.props.quantityChange(
//           {
//             dataItem: this.props.dataItem,
//             field: this.props.field,
//             syntheticEvent: e.syntheticEvent,
//             value: e.target.value.value
//           }
//         );
//       }
//     }
  
//     render() {
//       const dataValue = this.props.dataItem[this.props.field];
//     //   console.log("dataValue",dataValue,this.props.dataItem,this.props.field)
  
//       let defaultRendering = null;
  
//       if (!this.props.dataItem.inEdit || this.props.dataItem.inEdit !== this.props.field) {
//         defaultRendering = (
//           <td className="centerClass">
//             {!dataValue || dataValue === null ? '' : dataValue.toString()}
//           </td>
//         );
//       } else {
//         switch(this.props.dataItem.scale){
//             case "per watt add-on":
//                 defaultRendering = (
//                     <td>
//                         <DropDownList
//                           style={{ width: "100px" }}
//                           onChange={this.handleChange.bind(this)}
//                           value={this.localizedData.find(c => c.value === dataValue)}
//                           data={this.localizedData}
//                           textField="text"
//                               />
//                     </td>
//                 );
//              break;
//             case "Added price":
//                 defaultRendering = (
//                   <td>
//                     <DropDownList
//                       style={{ width: "100px" }}
//                       onChange={this.handleChange.bind(this)}
//                       value={this.localizedData.find(c => c.value === dataValue)}
//                       data={this.localizedData}
//                       textField="text"
//                           />
//                 </td>
//                 );
//              break;
//             case "per foot":
//                 defaultRendering = (
//                     <td><input className="k-textbox" defaultValue={dataValue} style={{width:'100%'}} onChange={this.handleChange.bind(this)}></input></td>
//                 );
//              break;
//             default:
//                 defaultRendering = (
//                     <td><input className="k-textbox" defaultValue={dataValue} style={{width:'100%'}} onChange={this.handleChange.bind(this)}></input></td>
//                 );
//              break;
//         }
        
//       }
  
//       return this.props.render ?
//         this.props.render.call(undefined, defaultRendering, this.props) :
//         defaultRendering;
//     }
//   }