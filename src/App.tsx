import React, { Component } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.css'
import jQuery from 'jquery'
import 'bootstrap'
import Popper from 'popper.js';
import Home from './page/home/Home';

class App extends Component {
  render() {
    return (
      <div >
        <Home />
      </div>
    );
  }
}

export default App;
