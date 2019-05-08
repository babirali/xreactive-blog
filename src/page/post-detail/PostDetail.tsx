import React, { Component } from 'react';
import SideBar from '../../component/side-bar/SideBar';
import './PostDetail.css'
import PostComment from '../../component/post-comment/PostComment';
import ListComment from '../../component/list-comment/ListComment';
import { throws } from 'assert';
const axios = require('axios');
class PostDetail extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      post: {}
    }
  }
  componentWillMount() {
    axios.get('http://localhost:3001/api/getpostbyid/' + this.props.match.params.id).then((response: any) => {
      this.setState({ post: response.data });
    }).catch((error: any) => {
      console.log(error);
    });
  }
  render() {
    return (
      <div className="row">
        <div className="col-lg-8">
          <h1 className="mt-4">{this.state.post.heading}</h1>
          <p className="lead">
            by <a href="#"> {this.state.post.by}</a>
          </p>
          <hr />
          <p>Posted on {this.state.post.date}</p>
          <hr />
          <img className="img-fluid rounded" src="http://placehold.it/900x300" alt="" />
          <div dangerouslySetInnerHTML={{ __html: this.state.post.content }}></div>
          {/* <PostComment />
              <ListComment /> */}
        </div>
        <SideBar />
      </div>
    );
  }
}

export default PostDetail;
