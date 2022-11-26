import React from "react";
//import { BrowserRouter, Route, Link } from "react-router-dom";

function Sidebar() {
    return (
            <div>
                <ul class="nav flex-column sticky-top pt-2 mt-3">
                    <li class="nav-item"><a class="nav-link" href="/dashboard">Dashboard</a></li>
                    <li class="nav-item"><a class="nav-link" href="/tickets">Tickets</a></li>
                </ul>
                <ul class="nav flex-column sticky-top pt-2 mt-3">
                    <li class="nav-item"><a class="nav-link" href="/assets">Assets</a></li>
                    <li class="nav-item"><a class="nav-link" href="/software">Software License</a></li>
                    <li class="nav-item"><a class="nav-link" href="/hardware">Hardware</a></li>
                    <li class="nav-item"><a class="nav-link" href="/electronics">Electronics</a></li>
                </ul> 
            </div>      
    );
}

export default Sidebar;