import './Home.css';
import './App.js';
import React, { Component } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import history from './history'
//import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

class Home extends Component {
  state = {
    access_token: null,
    country: null,
    name: null,
    email: null,
    ID: null,
    profile_picture: null,
  };

  componentDidMount() {
    let parsed = window.location.pathname
    let access_token = parsed.substring(6);
    const headers = {
      'Accept' : 'application/json',
      'Authorization' : 'Bearer ' + access_token
    }
    axios.get('https://api.spotify.com/v1/me', {
      headers: headers
    })
    .then(res => {
      this.setState({
        country: res.data.country,
        name: res.data.display_name,
        email: res.data.email,
        ID: res.data.id,
        profile_picture: res.data.images[0].url,
      })
    })
  }

  render() {
    // whenever setState() is called, we have access in the render method
    console.log(this.state.profile_picture)

    return (
        <div className="container">
            <main>
                <h1>HOMEPAGE</h1>
                <p>Name: { this.state.name }</p>
                <p>ID: { this.state.ID }</p>
                <p>Email: { this.state.email }</p>
                <p>Country: { this.state.country }</p>
                <img src={ this.state.profile_picture } alt="Profile Pic"></img>
            </main>
        </div>
    )
  }
}

export default Home ;