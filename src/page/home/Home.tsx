import React, { Component } from 'react';
import SideBar from '../../component/side-bar/SideBar';
import NavBar from '../../component/nav-bar/NavBar';
import Post from '../../component/post/Post';
import Pagination from '../../component/pagination/Pagination';
import Footer from '../../component/footer/Footer';
import { connect } from 'react-redux';

class Home extends Component<any, any> {
  render() {
    return (
      <div className="row">
        <div className="jumbotron text-dark">
          <div className="container">
            <h1 className="display-4">Hello, world!</h1>
            <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
          </div>
        </div>
        <div className="col-md-8">
          {/* <h1 className="my-4">Page Heading
                <small>Secondary Text</small>
          </h1> */}
          {this.props.post.map((post: any,index:number) =>
            <Post post={post} key={index} />
          )}
          <Pagination />
        </div>
        <SideBar />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  post: state.post
})

export default connect(mapStateToProps)(Home);
