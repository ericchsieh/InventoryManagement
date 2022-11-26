import React from "react";
import assets from "./asset-filler-data.json";

const user_data = {
    user_id: 22451884,
    departments: [
        "Computer Science",
        "Physics"
    ],

}

const ticket_number = 20220001

class SubmitTicket extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            assets: assets
        }
    }

    render() {
        return (

            <div class="container-fluid">
                <h1>Submit Ticket</h1>
                <form methods="post">
                    <div class="mt-2 bg-light round">
                        <div class="mx-3 pt-2 pb-3">
                            <h3 class="mt-2">Ticket Information</h3>
                            <div class="form-group row mb-3">
                                <label for="ticketnum">
                                    Ticket #
                                    <input type="text" class="form-control form-control-lg" id="ticketnum" value={ticket_number} disabled></input>
                                </label>
                            </div>
                            <div class="form-group row mb-3">
                                <label for="department">
                                    Department
                                    <select class="form-control form-control-lg" id="department">
                                        {
                                            user_data.departments.map((value, index) => (
                                                <option value={value}>{value}</option>
                                            ))
                                        }
                                    </select>
                                </label>
                            </div>
                            <h3 class="mt-4">Reserve Assets</h3>
                            <div class="px-3 mt-3 mb-3">
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
                                                <td><input type="checkbox" class="form-control-lg"></input></td>
                                                <td>{asset.inv_number}</td>
                                                <td>{asset.name}</td>
                                                <td>{asset.model}</td>
                                            </tr>
                                        ))
                                    }
                                </table>
                            </div>
                            <input type="submit" class="form-control form-control-lg btn btn-primary" value="Submit Ticket"></input>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default SubmitTicket;