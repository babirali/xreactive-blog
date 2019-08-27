import React, { Component } from "react";
import "./PostDetail.css";
// import PostComment from "../../component/post-comment/PostComment";
// import ListComment from "../../component/list-comment/ListComment";
// import { throws } from "assert";
import { EditorState, convertFromRaw } from "draft-js";
// import { stateToHTML } from "draft-js-export-html";
import { spinnerService } from "../../service/spinner";
import axios from "axios";
import moment from "moment";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Helmet } from "react-helmet";
class PostDetail extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      post: {
      },
      // content: "",/
      editorState: "",
    };
  }
  componentWillMount() {
    spinnerService.showLoading(true);
    axios.get(process.env.API_ENDPOINT + "api/posts/get/" + this.props.match.params.id).then((response: any) => {
      spinnerService.showLoading(false);
      this.setState({ post: response.data });
      this.setState({ editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.state.post.content))) });
      // const rawContentState = convertToRaw(this.state.editorState.getCurrentContent());
      // this.setState({ content: stateToHTML(this.state.editorState.getCurrentContent()) });
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
        <h1 className="mt-4">{this.state.post.heading}</h1>
        <b>Posted on {moment(this.state.post.date).format("MM/DD/YYYY")} {this.state.post.min} min read</b>
        {/* <hr /> */}
        <p className="lead">
          By <a href="#"> {this.state.post.postBy}</a>
        </p>
        <img className="img-fluid rounded" src={this.state.post.mainImg} alt="" />
        {/* <div dangerouslySetInnerHTML={{ __html: this.state.content }}></div> */}
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
