import React, { Component } from "react";
import "./PostDetail.css";
// import PostComment from "../../component/post-comment/PostComment";
// import ListComment from "../../component/list-comment/ListComment";
// import { throws } from "assert";
import { EditorState, convertFromRaw } from "draft-js";
import { spinnerService } from "../../service/spinner";
import axios from "axios";
import moment from "moment";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Helmet } from "react-helmet";
class PostDetail extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      post: {
      },
      editorState: "",
    };
  }
  componentWillMount() {
    spinnerService.showLoading(true);
    axios.get(process.env.API_ENDPOINT + "api/posts/get/" + this.props.match.params.id).then((response: any) => {
      spinnerService.showLoading(false);
      this.setState({ post: response.data });
      this.setState({ editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.state.post.content))) });
    }).catch((error: any) => {
      // console.log(error);
    });
  }
  render() {
    return (
      <div className="">
        <Helmet>
          <title>{this.state.post.heading}</title>
          <meta name="description" content={this.state.post.tags} />
        </Helmet>
        <h2 className="h-text mt-4">{this.state.post.heading}</h2>
        <b>Posted on {moment(this.state.post.date).format("MM/DD/YYYY")} - {this.state.post.min} Mins Read</b>
        <p className="lead">
          By <a href="https://twitter.com/babirali001" target="_blank"> {this.state.post.postBy}</a>
        </p>
        <img className="img-fluid rounded" src={this.state.post.mainImg} alt="" />
        <Editor
          editorState={this.state.editorState}
          toolbarHidden
          readOnly={true}
        />
        {/* <PostComment />
              <ListComment /> */}
      </div>
    );
  }
}

export default PostDetail;
