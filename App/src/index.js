import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';

// react router imports
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Users from "./pages/Users";
import Departments from "./pages/Departments";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import Assets from "./pages/Assets";
import Software from "./pages/Software";
import Hardware from "./pages/Hardware";
import Electronics from "./pages/Electronics";
import Catalogue from "./pages/Catalogue";
import SubmitTicket from "./pages/SubmitTicket";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/" element={<Layout />}> 
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="departments" element={<Departments />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="assets" element={<Assets />} />
          <Route path="software" element={<Software />} />
          <Route path="hardware" element={<Hardware />} />
          <Route path="electronics" element={<Electronics />} />
          <Route path="catalogue" element={<Catalogue />} />
          <Route path="submit_ticket" element={<SubmitTicket />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);