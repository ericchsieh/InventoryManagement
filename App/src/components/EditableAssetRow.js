import React from 'react'

const EditableRow = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
    return (
        <tr>
            <td>
                <input 
                    type="text" 
                    required="required" 
                    placeholder="Inventory#" 
                    name="inventoryNum"
                    value={editFormData.inventoryNum}
                    onChange={handleEditFormChange}
                    >
                </input>
            </td>
            <td>
                <input 
                    type="text" 
                    required="required" 
                    placeholder="Cost" 
                    name="cost"
                    value={editFormData.cost}
                    onChange={handleEditFormChange}
                    >
                </input>
            </td>
            <td>
                <input 
                    type="text" 
                    required="required" 
                    placeholder="Name" 
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditFormChange}
                    >
                </input>
            </td>
            <td>
                <input 
                    type="text" 
                    required="required" 
                    placeholder="Model" 
                    name="model"
                    value={editFormData.model}
                    onChange={handleEditFormChange}
                    >
                </input>
            </td>
            <td>
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancelClick}>
                    Cancel
                </button>
            </td>
        </tr>
    )
}

export default EditableRow