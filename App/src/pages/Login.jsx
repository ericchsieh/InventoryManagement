import React from "react";
import { Navigate } from "react-router-dom";
import "./Login.css";
import { UserDataContext } from "./context";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uname: '',
            pword: '',
            authenticated: null,
        }
    }

    handleFormSubmit = event => {
        event.preventDefault(); // stops page from reloading
        this.context.user_id = this.state.uname;
        console.log(this.context.user_id);
        this.setState({authenticated: true});
        // var loginForm = this;
        // var url = "https://www.students.cs.ubc.ca/~shasan01/login.php";
        // var formData = new FormData(); // stores POST information
        // formData.append("post", "Faculty_Member")
        // formData.append("uname", this.state.uname);

        // const requestOptions = {
        //     method: "POST",
        //     body: formData,
        // };
        
        // fetch(url, requestOptions)
        //     .then(function (response) {
        //         return response.text();
        //     })
        //     .then(function (body) {
        //         const body_json = JSON.parse(body);
        //         loginForm.setState({authenticated: body_json.authenticated});
        //         if (!body_json.authenticated) {
        //             document.getElementById('incorrect-login').style.display = 'block';
        //         }
        //     });
    }

    render() {
        if (this.state.authenticated) {
            return <Navigate to='/dashboard' />
        }
        // <div className="Login-container">
        return (
            <>
            <section class="vh-100">
            <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-md-4">
            <div class="card">
            <div className="card-margin">
                <form>
                    <h3 class="mb-5 text-center">
                        Sign In
                    </h3>
                    <div class="mb-3">
                        <input 
                        autocomplete="off" autofocus
                        class="form-control mx-auto w-auto"
                        placeholder="Faculty Member ID"
                        type="text" id="uname" name="username" 
                        value={this.state.uname}
                        onChange={e => this.setState({uname: e.target.value})}
                        />
                    </div>
                    <div class="mb-3">
                        <input
                        class="form-control mx-auto"
                        type="submit" value="Login"
                        onClick={e => this.handleFormSubmit(e)}
                        />
                    </div>
                </form>
            </div>   
            </div>
            </div>
            </div>
            </div>
            </section>


            <div id="incorrect-login" className="Incorrect-Login">
                Incorrect Login
            </div>
            </>
        )
    }
}
Login.contextType = UserDataContext;

export default Login;