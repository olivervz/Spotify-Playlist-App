import "./Login.css";
import "./components/Footer";
import React, { Component } from "react";
import Footer from "./components/Footer";

function Login() {
  return (
    <>
      <main>
        <div classname="button-div">
          <button
            onClick={() => (window.location = "http://localhost:8888/login")}
            className="login-button"
            style={{
              padding: "20px",
              "font-size": "50px",
              "margin-top": "20px",
            }}
          >
            Sign in with spotify
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Login;
