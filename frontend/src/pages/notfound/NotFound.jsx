import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="nf-wrapper">

      <div className="coins">
        <div className="coin c1">₹</div>
        <div className="coin c2">₹</div>
        <div className="coin c3">₹</div>
      </div>

      <div className="receipt">
        <div className="top-edge"></div>
        <h1>404</h1>
        <p className="lost">Looks like this page went missing…</p>
        <p className="line small">
          Just like untracked expenses 👀
        </p>
      </div>

      <Link to="/" className="home-btn">
        Go Back & Track Better
      </Link>

    </div>
  );
}

export default NotFound;
