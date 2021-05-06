import React from "react";
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Input } from '@progress/kendo-react-inputs';
export const MyCustomCell = props => {
  const { dataItem } = props;
  const inEdit = dataItem[props.editField];
  const localizedData = [
    { text: 'Yes', value: "Yes" },
    { text: 'No', value: "No" }
  ];
  const dataValue = dataItem[props.field];
  // console.log(props)
  if(dataItem.id === 22 || dataItem.id === 23){
    return  (
      <td className="k-command-cell" style={{textAlign: "center"}}>
        {dataItem.quantity}
      </td>
      )
  }else{
    return dataItem.scale === "per watt add-on" || dataItem.scale === "Added price"? (
      <td className="k-command-cell" style={{textAlign: "center",backgroundColor:"#f4ff81"}}>
        <DropDownList
            style={{ width: "60px" }}
            id={dataItem.id.toString()}
            onChange={props.onchange}
            value={localizedData.find(c => c.value === dataValue)}
            data={localizedData}
            textField="text"
                />
        
      </td>
    ) : (
      <td className="k-command-cell" style={{textAlign: "center",backgroundColor:"#f4ff81"}}>
        <Input id={dataItem.id.toString()} defaultValue={dataItem.quantity} onChange={props.onchange} style={{width:60}}/>
      </td>
    );
  }
};