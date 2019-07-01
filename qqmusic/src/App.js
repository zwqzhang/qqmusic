import React, { Component } from 'react';
import './App.css';
import Router from './router/index'
import routes from './router/routes'
import axios from 'axios'
Component.prototype.$http = axios;
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router routes={routes}></Router>
      </div>
    );
  }
}

export default App;
