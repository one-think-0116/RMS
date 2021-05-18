import React from "react";

export const MyCommandCell = props => {
  const { dataItem } = props;
  const inEdit = dataItem[props.editField];
  const isNewItem = dataItem.ID === undefined;

  return inEdit ? (
    <td className="k-command-cell" style={{textAlign: "center"}}>
      <button
        className="k-fourth k-button k-grid-save-command"
        onClick={() => (isNewItem ? props.add(dataItem) : props.update(dataItem))}
      >
        {isNewItem ? "Add" : "Update"}
      </button>
      {isNewItem ? <button
                        className="k-button k-grid-cancel-command k-fiveth"
                        onClick={() => props.discard(dataItem)}
                    >
                        Discard
                    </button> 
      : ""}
      
    </td>
  ) : (
    <td className="k-command-cell" style={{textAlign: "center"}}>
      <button
        className="k-third k-button k-grid-edit-command"
        onClick={() => props.edit(dataItem)}
      >
        Edit
      </button>
      <button
        className="k-button k-grid-remove-command k-fiveth"
        onClick={() =>
          // window.confirm("Confirm deleting: " + dataItem.Fee + "% dealer fee") &&
          // props.remove(dataItem)
          props.remove(dataItem)
        }
      >
        Remove
      </button>
    </td>
  );
};