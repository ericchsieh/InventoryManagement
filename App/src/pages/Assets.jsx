import React from "react";
import assets from "./asset-filler-data.json";
import Headers from "./table_headers.json";
import { Fragment } from 'react';
import AssetRow from "../components/AssetRow";

class Assets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: assets
        }
        this.handleGetAssets();
    }

    handleGetAssets = () => {
        var assetPage = this;
        var url = "https://www.students.cs.ubc.ca/~shasan01/sql_commands.php";
        var formData = new FormData();
        formData.append("get", "Purchased_Asset");

        const requestOptions = {
            method: "POST",
            body: formData,
        };

        fetch(url, requestOptions)
            .then(function (response) {
                return response.text();
            })
            .then(function (body) {
                if (body) {
                    const body_json = JSON.parse(body);
                    assetPage.setState({data: body_json});
                    console.log(body_json);
                }
        });
    }

    handleSellAsset = (event, asset) => {
        event.preventDefault();
        var url = "https://www.students.cs.ubc.ca/~shasan01/sql_commands.php";
        var formData = new FormData();
        console.log(asset);

        formData.append("sell_asset", "");
        formData.append("catalogue_id", asset.INV_NUMBER);
        formData.append("catalogue_name", asset.NAME);
        formData.append("catalogue_model", asset.MODEL);
        console.log(formData);

        const requestOptions = {
            method: "POST",
            body: formData,
        };

        fetch(url, requestOptions)
            .then(function (response) {
                return response.text();
            })
            .then(function (body) {
                console.log(body);
                window.location.replace("http://localhost:3000/assets");
            });
    }

    handleFilterFreeAssets = (event) => {
        event.preventDefault();
        console.log("Filter assets")
    }

    render() {
        return (
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-9">
                        <h1>Assets</h1>
                    </div>
                    <div class="col-lg-3">
                        <button 
                            type="button" 
                            class="form-control form-control-lg btn btn-primary"
                            onClick={this.handleFilterFreeAssets}
                        >See all free assets</button>
                    </div>
                </div>
                <div class="mt-2 bg-light round">
                    <div class="px-3 mt-3 mb-3">
                        <table>
                            <tr>
                                {
                                    Object.keys(this.state.data[0]).map((heading) => (
                                        <th>{Headers[heading]}</th>
                                    ))
                                }
                            </tr>
                            {
                                this.state.data.map((asset) => (
                                    <Fragment>
                                        <AssetRow asset={asset}
                                        handleSellAsset={this.handleSellAsset}/> 
                                    </Fragment>
                                ))
                            }
                        </table>
                    </div>
                </div>
                <div class="text-center">
                    <form>
                        <a href="/catalogue" class="my-2 btn btn-primary">Add Asset</a>
                    </form>
                </div>
            </div>
        );
    }
}

export default Assets;