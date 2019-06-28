import React, { Component } from 'react';
import SideBar from '../../component/side-bar/SideBar';
import Post from '../../component/post/Post';
import Pagination from '../../component/pagination/Pagination';
import { connect } from 'react-redux';
const axios = require('axios');
import './Home.css'
import { Link } from 'react-router-dom';

class Home extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      post: []
    }
  }
  componentWillMount() {
    axios.get(process.env.REACT_APP_API_ENDPOINT + 'posts').then((response: any) => {
      // console.log(response);
      this.setState({ post: response.data });
    }).catch((error: any) => {
      console.log(error);
    });
  }
  render() {
    return (
      <div>
        <div className="row">
          {/* <div className="jumbotron text-dark">
          <div className="container">
            <h1 className="display-4">Hello, world!</h1>
            <p className="lead"><button className="btn btn-primary" onClick={() => this.props.dispatch({ type: 'save' })}>Add</button></p>
          </div>
        </div> */}
          <div className="col-md-8 pl-0">
            {/* <h1 className="my-4">Page Heading
                <small>Secondary Text</small>
          </h1> */}
            {this.state.post.map((post: any, index: number) =>
              <Post post={post} key={index} />
            )}
            <Pagination />
          </div>
          <SideBar />
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state: any) => ({
//   post: state.post.post
// })

// const mapDispatchToProps = (dispatch:any) => ({
//   dispatch : dispatch
// });
// export default connect(mapStateToProps,mapDispatchToProps)(Home);
export default Home;
