import React, { Component } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.css'
import jQuery from 'jquery'
import 'bootstrap'
import Popper from 'popper.js';
import Home from './page/home/Home';
import NavBar from './component/nav-bar/NavBar';
import Footer from './component/footer/Footer';
import { BrowserRouter as Router, Route } from "react-router-dom";
import About from './page/about/About';
import PostDetail from './page/post-detail/PostDetail';
class App extends Component {
  render() {
    return (
      <Router >
        <div>
          <NavBar />
          {/* <Link className="nav-link" to="/">Home</Link> */}
          <div className="container">
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/post/:id?" exact component={PostDetail} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
