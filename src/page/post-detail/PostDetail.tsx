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
    axios.get(process.env.REACT_APP_API_ENDPOINT + 'posts/get/' + this.props.match.params.id).then((response: any) => {
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
            by <a href="#"> {this.state.post.postBy}</a>
          </p>
          <hr />
          <p>Posted on {this.state.post.date}</p>
          <hr />
          <img className="img-fluid rounded" src={this.state.post.mainImg} alt="" />
          <div dangerouslySetInnerHTML={{ __html: this.state.post.content }}></div>
          <script src="https://gist.github.com/babirali/0327b7988eab28c22cdaae51f6932efd.js"></script>
          {/* <PostComment />
              <ListComment /> */}
        </div>
        <SideBar />
      </div>
    );
  }
}

export default PostDetail;
