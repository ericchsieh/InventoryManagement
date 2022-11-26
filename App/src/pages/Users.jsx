import React from "react";

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
        this.handleLoadUsers();
    }

    handleLoadUsers() {
        this.setState({
            users: {
                USER_ID: 22451884,
                FULL_NAME: "Andy Zhao",
                LABS: "Computer Vision Lab",
                SUBMITTED_TICKETS: 12
            }
        });
        console.log(this.state.users);
    }

    render() {
        return (
            <div class="container-fluid">
                <div class="row">
                    <h1>Users</h1>
                </div>
                <div class="mt-2 bg-light round">
                    <div class="px-3 mt-3 mb-3">
                        <table>
                            <tr>
                                <th>User ID #</th>
                                <th>Name</th>
                                <th>Labs</th>
                                <th># of submitted tickets</th>
                            </tr>
                            {
                                this.state.users.map((user) => (
                                    <tr>
                                        <td>{user.USER_ID}</td>
                                        <td>{user.FULL_NAME}</td>
                                        <td>{user.LABS}</td>
                                        <td>{user.SUBMITTED_TICKETS}</td>
                                    </tr>
                                ))
                            }
                        </table>
                    </div>
                </div>
            </div>
        )
    };
}

export default Users;