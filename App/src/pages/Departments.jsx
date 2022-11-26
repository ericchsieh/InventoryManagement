import React from "react";

class Departments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            departments: [{
                DEPT_NAME: "Computer Science",
                BUDGET: 50000,
                LABS: ["Computer Vision Lab", "Algorithm Lab"],
                BUILDINGS: ["ICCS", "DMP"],
                RECEIVED_TICKETS: 35
            }]
        }
        this.handleLoadDepartments();
    }

    handleLoadDepartments() {
        this.setState({
            departments: [{
                DEPT_NAME: "Computer Science",
                BUDGET: 50000,
                LABS: ["Computer Vision Lab", "Algorithm Lab"],
                BUILDINGS: ["ICCS", "DMP"],
                RECEIVED_TICKETS: 35
            }]
        });
    }

    render() {
        return (
            <div class="container-fluid">
                <div class="row">
                    <h1>Departments</h1>
                </div>
                <div class="mt-2 bg-light round">
                    <div class="px-3 mt-3 mb-3">
                        <table>
                            <tr>
                                <th>Department Name</th>
                                <th>Budget</th>
                                <th>Labs</th>
                                <th>Located in</th>
                                <th># of received tickets</th>
                            </tr>
                            {
                                this.state.departments.map((department) => (
                                    <tr>
                                        <td>{department.DEPT_NAME}</td>
                                        <td>{department.BUDGET}</td>
                                        <td>{
                                            department.LABS.map((value, index) => (
                                                <a class="btn btn-light">
                                                    {value}
                                                </a>
                                            ))
                                        }</td>
                                        <td>{
                                            department.BUILDINGS.map((value, index) => (
                                                <a class="btn btn-light">
                                                    {value}
                                                </a>
                                            ))
                                        }</td>
                                        <td>{department.RECEIVED_TICKETS}</td>
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

export default Departments;