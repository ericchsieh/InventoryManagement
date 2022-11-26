import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Layout = () => {
    return (
        <>
            <Navbar />
            <div class="container-fluid" id="main">
                <div class="row row-offcanvas row-offcanvas-left vh-100">
                    <div class="col-md-3 col-lg-2 sidebar-offcanvas h-100 overflow-auto bg-light pl-0" id="sidebar" role="navigation">
                        <Sidebar />
                    </div>
                    <main class="col main pt-2 mt-0 h-100 overflow-auto">
                        <div class="container-fluid">
                            <h1 class="display-4 d-none d-sm-block">
                            </h1>
                            <Outlet />
                        </div>
                    </main>

                </div>
            </div>
        </>
    );
};

export default Layout;