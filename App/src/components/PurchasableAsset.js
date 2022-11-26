import React from "react";

const PurchasableAsset = ({ item, handlePurchaseAsset }) => {
    return (
        <tr>
            <td>{item.name}</td>
            <td>{item.model}</td>
            <td>${item.cost.toFixed(2)}</td>
            <td>
                <button 
                type="submit" class="btn btn-primary"
                onClick={(event) => handlePurchaseAsset(event, item)}
                    >Purchase
                </button>
            </td>
        </tr>
    )
}

export default PurchasableAsset