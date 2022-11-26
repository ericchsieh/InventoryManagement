import React from "react";
import { UserDataContext } from "./context";

class Home extends React.Component {
    render() {
        return (
            <h1>Welcome, {this.context.user_id}</h1>
        );
    }
}
Home.contextType = UserDataContext;

export default Home;