import React from "react";

const AssetRow = ({ asset, handleSellAsset }) => {
    return (
        <tr>
            {
                Object.values(asset).map((value) => (
                    <td>{value==null ? "-": value}</td>
                ))
            }
            <td>
                <form>
                    <button 
                    type="submit" class="btn btn-danger mx-2"
                    onClick={(event) => handleSellAsset(event, asset)}
                        >Sell Asset
                    </button>
                </form>
            </td>
        </tr>
    )
}

export default AssetRow;