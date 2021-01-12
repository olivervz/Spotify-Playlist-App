import './Login.css';
import React, { Component } from 'react';

function Login() {
  return (
      <div className="container">
          <main>
              <h1>Login With Spotify</h1>
                  <button 
                      onClick={() => window.location = 'http://localhost:8888/login' }
                      style={{padding: '20px', 'font-size': '50px', 'margin-top': '20px'}}>Sign in with spotify
                  </button>
          </main>
      </div>
  )
}

export default Login;
