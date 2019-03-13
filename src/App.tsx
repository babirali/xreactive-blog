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
import AddPost from './page/add-post/AddPost';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from "./redux/reducers/root";
//initialize store
let store = createStore(reducer);

class App extends Component {
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <Provider store={store}>
        <Router >
          <div>
            <NavBar />
            <div className="container" style={{ paddingBottom: '30px' }}>
              <Route path="/" exact component={Home} />
              <Route path="/about" exact component={About} />
              <Route path="/post/:id?" exact component={PostDetail} />
              <Route path="/addpost" exact component={AddPost} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
