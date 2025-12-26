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
        "/subcategories": "Sub-Categories",
        "/report": "Reports"
    };

    const pages = {
        "/": "Overview",
        "/transaction": "Overview",
        "/addtransaction": "Overview",
        "/account": "Manage",
        "/category": "Manage",
        "/subcategories": "Manage",
        "/report": "Manage"
    }

    const pageBreadcrumb = pages[location.pathname] || "";

    const currentTitle = pageTitles[location.pathname] || "";

    const user = localStorage.getItem("user");
    console.log(user);

    const profileName = user ? JSON.parse(user).name : "User";
    console.log(profileName);






    const getInitials = (name = "") => {
        const parts = name.trim().split(" ").filter(Boolean);

        if (parts.length === 0) return "";
        if (parts.length === 1) return parts[0][0].toUpperCase();

        return (parts[0][0] + parts[1][0]).toUpperCase();
    };




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

                <div className="profile">
                    <div className="avatar">
                        {getInitials(profileName)}
                    </div>

                    <div className="user-info">
                        <p>
                            {profileName}
                        </p>
                        <span>Pro Plan</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
