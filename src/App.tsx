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
import ListPost from './page/list-post/ListPost';
import { spinnerService } from './service/spinner';
const test: any = {
  post: {
    loading: true,
    post: [
      {
        img: 'init',
        title: 'init'
      }
    ]
  }
}
//initialize store
let store = createStore(reducer, test);

class App extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      loading: false
    }
  }
  componentDidMount() {
    spinnerService.getMessage().subscribe(value => {
      this.setState({ loading: value })
    });
  }
  render() {
    return (
      <Provider store={store}>
        <Router >
          <div>
            {this.state.loading ?
              <div className="loading-overlay-show">
                <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
              </div>
              : ''}
            <NavBar />
            <div className="container" style={{ paddingBottom: '30px' }}>
              <Route path="/" exact component={Home} />
              <Route path="/about" exact component={About} />
              <Route path="/post/:id?" exact component={PostDetail} />
              <Route path="/addpost" exact component={AddPost} />
              <Route path="/listpost" exact component={ListPost} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
