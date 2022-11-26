import React from "react";
import AssetFill from "./asset-filler-data.json";
import Headers from "./table_headers.json";
import TicketFill from "./ticket-data.json";
import { Fragment } from 'react';
import AssetRow from "../components/AssetRow";
import TicketRow from "../components/TicketRow";
import { UserDataContext } from "./context";

//TODO: lump all the fetch requests into one, as the Oracle database seems to not like multiple fetch
// requests at the same time

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open_tickets: TicketFill,
            assets: AssetFill,
            num_open_tickets: "-",
            num_assets: "-",
            top_it_team: -1,
            frequent_ticketers: []
        }
        this.handleGetBestITTeam();
        //this.handleGetFrequentTicketers();
        this.handleGetAssets();
        this.handleGetTickets();
        this.handleSetCounts();
    }

    handleGetAssets = () => {
        var page = this;
        var endpoint = "https://www.students.cs.ubc.ca/~shasan01/sql_commands.php";
        var assetFormData = new FormData();
        var ticketFormData = new FormData();
        assetFormData.append("get", "Purchased_Asset");
        ticketFormData.append("getTickets", "<>");

        const requestOptions = {
            method: "POST",
            body: assetFormData
        };

        fetch(endpoint, requestOptions)
            .then(function (response) {
                return response.text();
            })
            .then(function (body) {
                //console.log(body);
                const body_json = JSON.parse(body);
                page.setState({assets:body_json})
            })
    }

    handleGetTickets = () => {
        var page = this;
        var endpoint = "https://www.students.cs.ubc.ca/~shasan01/sql_commands.php";
        var ticketFormData = new FormData();
        ticketFormData.append("getTickets", "<>");

        const requestOptions = {
            method: "POST",
            body: ticketFormData
        };

        fetch(endpoint, requestOptions)
            .then(function (response) {
                return response.text();
            })
            .then(function (body) {
                //console.log(body);
                if (body) {
                    const body_json = JSON.parse(body);
                    page.setState({open_tickets:body_json})
                }
            })
    }

    handleSetCounts = () => {
        var page = this;
        page.setState({num_open_tickets:this.state.open_tickets.length,
            num_assets:this.state.assets.length
        })
    }

    handleGetBestITTeam = () => {
        var page = this;
        page.setState({top_it_team: 3});
        console.log("Set best it team");
    }

    handleGetFrequentTicketers = () => {
        var page = this;
        var url = "https://www.students.cs.ubc.ca/~shasan01/sql_commands.php";
        var formData = new FormData();
        formData.append("getFrequentTicketers", "1");

        const requestOptions = {
            method: "POST",
            body: formData,
        };

        //TODO: do you want frequent ticketers to only include full name?
        // the given SQL commands gives only this
        //TODO: change sql php command to increase min from 0 to 5

        fetch(url, requestOptions)
            .then(function (response) {
                return response.text();
            })
            .then(function (body) {
                console.log(body);
                var body_json = JSON.parse(body);
                page.setState({frequent_ticketers: body_json});
            });

        // page.setState({
        //     frequent_ticketers: [{
        //         FULL_NAME: "Andy Zhao",
        //         USER_ID: 22451884,
        //         SUBMITTED_TICKETS: 12,
        //         RESOLVED_TICKETS: 8
        //     }]
        // });
        console.log("Set frequent ticketers");
    }

    render() {
        return (
            <div class="container-fluid">
                <h1>Dashboard {this.context.user_id}</h1>
                <div class="mt-2 bg-light round">
                    <div class="px-3 mt-3 mb-2">
                        <table>
                            <tr>
                                <th>Number of Open Tickets</th>
                                <th>Number of Assets in Inventory</th> 
                            </tr>
                            <tr>
                                <td><b>{this.state.num_open_tickets}</b></td>
                                <td><b>{this.state.num_assets}</b></td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6">
                        <div class="mt-2 bg-light round">
                            <h3 class="pt-3 mt-3 mx-3">Most Helpful IT Support Team</h3>
                            <div class="px-3 mt-3 mb-2">
                                <table>
                                    <tr>
                                        <td>Support Team #{this.state.top_it_team}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div class="mt-2 bg-light round">
                            <h3 class="pt-3 mt-3 mx-3">Manage Assets</h3>
                            <div class="px-3 mt-3 mb-3">
                                <table>
                                    <tr>
                                        {
                                            Object.keys(this.state.assets[0]).map((heading) => (
                                                <th>{Headers[heading]}</th>
                                            ))
                                        }
                                        <th>Action</th>
                                    </tr>
                                    {
                                        this.state.assets.map((asset) => (
                                            <Fragment>
                                                <AssetRow asset={asset}/>
                                            </Fragment>
                                        ))
                                    }
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="mt-2 bg-light round">
                            <h3 class="pt-3 mt-3 mx-3">Frequent Ticketers</h3>
                            <div class="px-3 mt-3 mb-2">
                                <table>
                                    <tr>
                                        <th>Name</th>
                                        <th>User ID</th> 
                                        <th>Submitted tickets</th> 
                                        <th>Resolved tickets</th> 
                                    </tr>
                                    {
                                        this.state.frequent_ticketers.map((ticketer) => (
                                            <tr>
                                                <td>{ticketer.FULL_NAME}</td>
                                                <td>{ticketer.USER_ID}</td>
                                                <td>{ticketer.SUBMITTED_TICKETS}</td>
                                                <td>{ticketer.RESOLVED_TICKETS}</td>
                                            </tr>
                                        ))
                                    }
                                </table>
                            </div>
                        </div>
                        <div class="mt-2 bg-light round">
                            <h3 class="pt-3 mt-3 mx-3">Manage Open Tickets</h3>
                            <div class="px-3 mt-3 mb-3">
                                <table>
                                    <tr>
                                        {
                                            Object.keys(this.state.open_tickets[0]).map((heading) => (
                                                <th>{Headers[heading]}</th>
                                            ))
                                        }
                                        <th>Action</th>
                                    </tr>
                                    {
                                        this.state.open_tickets.map((ticket) => (
                                            <Fragment>
                                                <TicketRow ticket={ticket}/>
                                            </Fragment>
                                        ))
                                    }
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
Dashboard.contextType = UserDataContext;


export default Dashboard;