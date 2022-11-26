import React from "react";
import assets from "./asset-filler-data.json";


class SubmitTicket extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            assets: assets,
            loaded: false,
            selected_assets: [],
            teams: [
                {TEAM_NUMBER: 1},
                {TEAM_NUMBER: 2},
                {TEAM_NUMBER: 3},
                {TEAM_NUMBER: 4},
                {TEAM_NUMBER: 5}
            ],
            selected_team: 1,
            hid: 1
        }
    }

    handleFilterFreeAssets = () => {
        var submitPage = this;
        var url = "https://www.students.cs.ubc.ca/~shasan01/sql_commands.php";
        var formData = new FormData();

        formData.append("getAvailableAssets", "");
        formData.append("departments", submitPage.context.departments);
        formData.append("asset_type", "Purchased_Asset");
        formData.append("column_names", []);

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
                    submitPage.setState({assets: body_json, loaded: true});
                    console.log(body_json);
                }
        });
    }

    handlePostNewTicket = (event) => {
        event.preventDefault();
        var submitPage= this;
        var url = "https://www.students.cs.ubc.ca/~shasan01/sql_commands.php";
        var formData = new FormData();
        var dateCreated = "2022-11-25";
        formData.append("postNewTicket", dateCreated);
        formData.append("submitted_by", submitPage.context.user_id);
        formData.append("helpDesk", submitPage.state.hid);
        formData.append("assets", submitPage.state.selected_assets);
        formData.append("itTeam", this.state.selected_team);

        const requestOptions = {
            method: "POST",
            body: formData,
        };

        fetch(url, requestOptions)
            .then(function (response) {
                return response.text();
            }).then(function (body) {
                console.log(body);
                window.location.replace("http://localhost:3000/tickets");
            });
    }

    handleGetTeam = () => {
        var submitPage= this;
        var url = "https://www.students.cs.ubc.ca/~shasan01/sql_commands.php";
        var formData = new FormData();
        formData.append("getTeam", "");

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
                    submitPage.setState({teams: body_json});
                    console.log(body_json);
                }
        });
    }

    render() {
        if (!this.state.loaded) {
            this.handleFilterFreeAssets();
            this.handleGetTeam();
        }
        return (
            <div class="container-fluid">
                <h1>Submit Ticket</h1>
                <form methods="post">
                    <div class="mt-2 bg-light round">
                        <div class="mx-3 pt-2 pb-3">
                            <h3 class="mt-2">Ticket Information</h3>
                            <div class="form-group row mb-3">
                                <label for="department">
                                    Help Desk
                                    <select 
                                    class="form-control form-control-lg" 
                                    id="department"
                                    onChange={e => this.setState({hid: e.target.value})}>
                                        <option value="1">Help Desk 1</option>
                                        <option value="2">Help Desk 2</option>
                                        <option value="3">Help Desk 3</option>
                                        <option value="4">Help Desk 4</option>
                                        <option value="5">Help Desk 5</option>
                                    </select>
                                </label>
                            </div>
                            <h3 class="mt-4">Reserve Assets</h3>
                            <div class="px-3 mt-3 mb-3">
                                <form>
                                    
                                <table>
                                    <tr>
                                        <th>Reserve</th>
                                        <th>Inventory #</th>
                                        <th>Name</th>
                                        <th>Model</th>
                                    </tr>
                                    {
                                        this.state.assets.map((asset) => (
                                            <tr>
                                                <td><input type="checkbox" value={asset.INV_NUMBER} class="form-control-lg" onChange={e => this.setState({selected_team: e.target.value})}></input></td>
                                                <td>{asset.INV_NUMBER}</td>
                                                <td>{asset.NAME}</td>
                                                <td>{asset.MODEL}</td>
                                            </tr>
                                        ))
                                    }
                                </table>
                                </form>
                            </div>
                            <h3 class="mt-4">Request IT Support Team</h3>
                            <div class="px-3 mt-3 mb-3">
                                <form>
                                    
                                <table>
                                    <tr>
                                        <th>Request</th>
                                        <th>Team Number</th>
                                    </tr>
                                    {
                                        this.state.teams.map((team) => (
                                            <tr>
                                                <td><input type="radio" name="it_team" value={team.TEAM_NUMBER} class="form-control-lg"></input></td>
                                                <td>Team #{team.TEAM_NUMBER}</td>
                                            </tr>
                                        ))
                                    }
                                </table>
                                </form>
                            </div>
                            <input type="submit" class="form-control form-control-lg btn btn-primary" value="Submit Ticket" onClick={this.handlePostNewTicket}></input>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default SubmitTicket;