import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  let LoginLogout;

  if (
    window.location.pathname != "/login" &&
    window.location.pathname != "/" &&
    window.location.pathname != "/login/"
  ) {
    LoginLogout = (
      <Link to="/login" className="nav-links">
        LOGOUT
      </Link>
    );
  } else {
    LoginLogout = (
      <Link
        onClick={() => (window.location = "http://localhost:8888/login")}
        className="nav-links"
      >
        LOGIN
      </Link>
    );
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <ul className="nav-menu">
            <li className="nav-item">{LoginLogout}</li>
            <li className="nav-item">
              <Link to="/about" className="nav-links">
                ABOUT
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/privacy" className="nav-links">
                PRIVACY
              </Link>
            </li>
            <li className="nav-item">
              <a
                href="https://github.com/olivervz/Spotify-Playlist-App"
                className="nav-links"
              >
                <i class="icon-linkedin"></i>
                Github
              </a>
            </li>
            <li className="nav-item">
              <a href="https://linkedin.com/in/olivervz/" className="nav-links">
                <i class="icon-github"></i>
                Linkedin
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Footer;
