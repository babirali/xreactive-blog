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
import AddPost from './page-admin/add-post/AddPost';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from "./redux/reducers/root";
import ListPost from './page-admin/list-post/ListPost';
import { spinnerService } from './service/spinner';
import Login from './page/login/Login';
import PrivateRoute from './component/private-route/PrivateRoute';
import { authService } from './service/auth';
import NavSidebar from './component/nav-sidebar/NavSideBar';
import Tags from './page-admin/tags/Tags';
import Category from './page-admin/category/Category';
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
    authService.checkAuth();
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
            {authService.isAuthenticated ?
              <div>
                <div className="sidenav">
                  <NavSidebar />
                </div>
                <div className="main">
                  <PrivateRoute path="/listpost" component={ListPost} />
                  <PrivateRoute path="/addpost" exact component={AddPost} />
                  <PrivateRoute path="/tags" component={Tags} />
                  <PrivateRoute path="/category" exact component={Category} />
                </div>
              </div>
              :
              <div>
                <NavBar />
                <div className="container" style={{ paddingBottom: '30px' }}>
                  <Route path="/" exact component={Home} />
                  <Route path="/about" exact component={About} />
                  <Route path="/post/:id?" exact component={PostDetail} />
                  <Route path="/login" exact component={Login} />
                </div>
              </div>
            }
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
