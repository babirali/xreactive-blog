import React, { Component } from 'react';
import SideBar from '../../component/side-bar/SideBar';
import NavBar from '../../component/nav-bar/NavBar';
import Post from '../../component/post/Post';
import Pagination from '../../component/pagination/Pagination';
import Footer from '../../component/footer/Footer';

class Home extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-8">
          <h1 className="my-4">Page Heading
                <small>Secondary Text</small>
          </h1>
          <Post />
          <Post />
          <Post />
          <Pagination />
        </div>
        <SideBar />
      </div>
    );
  }
}

export default Home;
