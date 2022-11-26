import React from "react";
import catalogue_items from "./catalogue_items.json";
import { Fragment } from "react";
import PurchasableAsset from "../components/PurchasableAsset";

class Catalogue extends React.Component {  
    constructor(props) {
        super(props);
        this.state = {
            data: catalogue_items
        }
    }

    handlePurchaseAsset = (event, item) => {
        event.preventDefault();
 //       var cataloguePage = this;
        var url = "https://www.students.cs.ubc.ca/~shasan01/sql_commands.php";
        var formData = new FormData();

        formData.append("catalogue_id", item.id);
        formData.append("catalogue_name", item.name);
        formData.append("catalogue_model", item.model);
        formData.append("catalogue_insert_into", item.insert_into);
        formData.append("catalogue_cost", item.cost);
        console.log(formData);

        const requestOptions = {
            method: "POST",
            body: formData,
        };

        fetch(url, requestOptions)
            .then(function (response) {
                return response.text();
            }).then(function (body) {
                console.log(body);
                window.location.replace("http://localhost:3000/assets");
            });
    }

    render() {
        return (
            <div class="container-fluid">
                <h1>Asset Store</h1>
                <div class="mt-2 bg-light round">
                    <div class="px-3 mt-3 mb-3">
                        <form>
                            <table>
                                <tr>
                                    <th>Item</th>
                                    <th>Model</th> 
                                    <th>Price</th>
                                </tr>
                                {
                                    this.state.data.map((item) => (
                                        <Fragment>
                                            <PurchasableAsset item={item}
                                            handlePurchaseAsset={this.handlePurchaseAsset}
                                            />
                                        </Fragment>
                                    ))
                                }
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Catalogue;