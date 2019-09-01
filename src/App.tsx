import React, { Component } from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
// import jQuery from "jquery";
// import "bootstrap";
// import Popper from "popper.js";
import Home from "./page/home/Home";
import NavBar from "./component/nav-bar/NavBar";
import Footer from "./component/footer/Footer";
import { BrowserRouter, Route } from "react-router-dom";
import About from "./page/about/About";
import PostDetail from "./page/post-detail/PostDetail";
import AddPost from "./page-admin/add-post/AddPost";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./redux/reducers/root";
import ListPost from "./page-admin/list-post/ListPost";
import { spinnerService } from "./service/spinner";
import Login from "./page/login/Login";
import PrivateRoute from "./component/private-route/PrivateRoute";
import { authService } from "./service/auth";
import NavSidebar from "./component/nav-sidebar/NavSideBar";
import Tags from "./page-admin/tags/Tags";
import Category from "./page-admin/category/Category";
const test: any = {
  post: {
    loading: true,
    post: [
      {
        img: "init",
        title: "init",
      },
    ],
  },
};
import SideBar from "./component/side-bar/SideBar";
import ImageList from "./page-admin/image-list/ImageList";
import PostByCategory from "./page/post-by-category/PostByCategory";

// initialize store
const store = createStore(reducer, test);

class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
    };
    authService.checkAuth();
  }
  componentDidMount() {
    spinnerService.getMessage().subscribe((value) => {
      this.setState({ loading: value });
    });
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            {this.state.loading ?
              <div className="loading-overlay-show">
                <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
              </div>
              : ""}
            {authService.isAuthenticated ?
              <div className="row  m-0 min-vh-100">
                <div className="sidenav col-2">
                  <NavSidebar />
                </div>
                <div className="main col-10">
                  <PrivateRoute path="/listpost" component={ListPost} />
                  <PrivateRoute path="/addpost" exact component={AddPost} />
                  <PrivateRoute path="/editpost/:id" exact component={AddPost} />
                  <PrivateRoute path="/imagelist" exact component={ImageList} />
                  <PrivateRoute path="/tags" component={Tags} />
                  <PrivateRoute path="/category" exact component={Category} />
                </div>
              </div>
              :
              <div>
                <NavBar />
                <div className="container min-vh-100" style={{ paddingBottom: "30px" }}>
                  <div className="row">
                    <div className="col-md-9">
                      <Route path="/" exact component={Home} />
                      <Route path="/about" exact component={About} />
                      <Route path="/post/:category/:id" exact component={PostDetail} />
                      <Route path="/post/:category" exact component={PostByCategory} />
                      <Route path="/login" exact component={Login} />
                    </div>
                    <SideBar />
                  </div>
                </div>
              </div>
            }
            <Footer />
          </div>
        </BrowserRouter >
      </Provider>
    );
  }
}

export default App;
