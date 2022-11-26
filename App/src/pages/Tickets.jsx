import React from "react";
import tickets from "./ticket-data.json";
import Headers from "./table_headers.json";
import { Fragment } from "react";
import TicketRow from "../components/TicketRow";

class Tickets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: tickets,
            resolved: tickets,
        }
        this.handleFetchTickets("=");
        this.handleFetchTickets("<>");
    }

    handleFetchTickets(filter) {
        var ticketPage = this;
        var url = "https://www.students.cs.ubc.ca/~shasan01/sql_commands.php";
        var formData = new FormData();
        formData.append("getTickets", filter)
        
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
                if (body) {
                    const body_json = JSON.parse(body);
                    if (filter === "=") {
                        ticketPage.setState({resolved: body_json});
                    } else {
                        ticketPage.setState({open: body_json});
                    }
                }
            })
    }

    handleViewTicketResources = (ticket) => {
        var ticketPage = this;
        var url = "https://www.students.cs.ubc.ca/~shasan01/sql_commands.php";
        var formData = new FormData();
        formData.append("getMoreTicketInfo", ticket.TICKET_NUMBER);

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
                // TODO: add query to popup
                // NOTE: can return an empty list
            })
    }

    handleSortTickets = (event) => {
        event.preventDefault();
        console.log("Sorting by " + event.target.value);
    }

    render() {
        return (
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-9">
                        <h1>Open Tickets</h1>
                    </div>
                    <div class="col-lg-3">
                        <form>
                            <select 
                                class="form-control form-control-lg"
                                onChange={this.handleSortTickets}
                            >
                                <option hidden>Sort by</option>
                                <option value="created_asc">Date Created (Ascending)</option>
                                <option value="created_desc">Date Created (Descending)</option>
                                <option value="resolved_asc">Date Resolved (Ascending)</option>
                                <option value="resolved_desc">Date Resolved (Descending)</option>
                            </select>
                        </form>
                    </div>
                </div>
                <div class="mt-2 bg-light round">
                    <div class="px-3 mt-3 mb-3">
                        <table>
                            <tr>
                                {
                                    Object.keys(this.state.open[0]).map((heading) => (
                                        <th>{Headers[heading]}</th>
                                    ))
                                }
                            </tr>
                            {
                                this.state.open.map((ticket) => (
                                    <Fragment>
                                        <TicketRow ticket={ticket} handleViewTicketResources={this.handleViewTicketResources}/> 
                                    </Fragment>
                                ))
                            }
                        </table>
                    </div>
                </div>
                <h1>Resolved Tickets</h1>
                <div class="mt-2 bg-light round">
                    <div class="px-3 mt-3 mb-3">
                        <table>
                            <tr>
                                {
                                    Object.keys(this.state.resolved[0]).map((heading) => (
                                        <th>{Headers[heading]}</th>
                                    ))
                                }
                            </tr>
                            {
                                this.state.resolved.map((ticket) => (
                                    <Fragment>
                                        <TicketRow ticket={ticket} handleViewTicketResources={this.handleViewTicketResources}/> 
                                    </Fragment>
                                ))
                            }
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Tickets;