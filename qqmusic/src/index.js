import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import './common/rem'
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import './common/font-awesome-4.7.0/css/font-awesome.min.css'

// import EventEmitter from 'events'
// Component.prototype.ev=new EventEmitter();
ReactDOM.render(
  <BrowserRouter><App /></BrowserRouter>,
  document.getElementById('root')
);
