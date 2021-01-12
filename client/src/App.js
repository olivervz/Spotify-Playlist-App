import React from 'react';
import './App.css';
import Login from './Login'
import Home from './Home';
import queryString from 'query-string';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

function App() {

  let Default = "/login/"
  let parsed = queryString.parse(window.location.search);
  if (parsed.access_token) {
    Default = "/Home/" + parsed.access_token;
  }

  return (
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Redirect to={ Default }/>
            </Route> 
            <Route path="/login" component={Login}/>
            <Route path="/home" component={Home}/>
          </Switch>
        </div>
      </Router>
  )
}

export default App;
