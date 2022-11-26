import React from "react";
//import { BrowserRouter, Route, Link } from "react-router-dom";

function Navbar() {
    return (
        <nav class="navbar bg-light border navbar navbar-expand-md navbar-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="/dashboard">IT Management</a>
                <div class="collapse navbar-collapse" id="navbar">
                    <ul class="navbar-nav me-auto mt-0">
                        <li class="nav-item"><a class="nav-link" href="/users">Users</a></li>
                        <li class="nav-item"><a class="nav-link" href="/departments">Departments</a></li>
                    </ul>
                    <ul class="navbar-nav ms-auto mt-2">
                            <li class="nav-item"><a class="nav-link" href="/">Log Out</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;