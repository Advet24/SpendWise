import React from "react";
import "../layout/navbar.css";
import { FiSearch, FiBell } from "react-icons/fi";
import { useLocation } from "react-router-dom";

function Navbar() {

    const location = useLocation();

    const pageTitles = {
        "/": "Dashboard",
        "/transaction": "Transactions",
        "/addtransaction": "Add Entry",
        "/account": "Accounts",
        "/category": "Categories",
        "/report": "Reports"
    };

    const pages = {
        "/": "Overview",
        "/transaction": "Overview",
        "/addtransaction": "Overview",
        "/account": "Manage",
        "/category": "Manage",
        "/report": "Manage"
    }

    const pageBreadcrumb = pages[location.pathname] || "";

    const currentTitle = pageTitles[location.pathname] || "";

    return (
        <div className="navbar">

            <div className="left">
                <span className="breadcrumb">{pageBreadcrumb} /</span>
                <h3>{currentTitle}</h3>
            </div>

            <div className="right-box">

                <div className="search-box">
                    <FiSearch className="search-icon" />
                    <input type="text" placeholder="Search transactions..." />
                </div>

                <div className="notification">
                    <FiBell />
                    <span className="dot"></span>
                </div>

            </div>
        </div>
    );
}

export default Navbar;
