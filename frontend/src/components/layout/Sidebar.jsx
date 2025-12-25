import React from "react";
import "../layout/sidebar.css";
import { NavLink } from "react-router-dom";

import {
  FiHome,
  FiList,
  FiPlusCircle,
  FiCreditCard,
  FiTag,
  FiBarChart2,
  FiSettings
} from "react-icons/fi";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2 className="logo">SpendWise</h2>


      <div className="menu">

        <p>OVERVIEW</p>
        <NavLink to="/">
          <FiHome /> <span>Dashboard</span>
        </NavLink>

        <NavLink to="/transaction">
          <FiList /> <span>Transactions</span>
        </NavLink>

        <NavLink to="/addtransaction">
          <FiPlusCircle /> <span>Add Entry</span>
        </NavLink>

        <p>MANAGE</p>
        <NavLink to="/account"><FiCreditCard /> <span>Accounts</span></NavLink>
        <NavLink to="/category"><FiTag /> <span>Categories</span></NavLink>
        <NavLink to="/report"><FiBarChart2 /> <span>Reports</span></NavLink>

        <p>SYSTEM</p>
        <a><FiSettings /> <span>Settings</span></a>

      </div>

      <div className="profile">
        <div className="avatar">AD</div>

        <div className="user-info">
          <p>Alex Doe</p>
          <span>Pro Plan</span>
        </div>
      </div>

    </div>
  );
}

export default Sidebar;
