import React, { Component } from "react";
import SideBar from "../../component/side-bar/SideBar";
import Post from "../../component/post/Post";
import Pagination from "../../component/pagination/Pagination";
import { connect } from "react-redux";
import axios from "axios";
import "./Home.css";
import { spinnerService } from "../../service/spinner";
import { Helmet } from "react-helmet";

class Home extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      post: [],
    };
  }
  componentWillMount() {
    spinnerService.showLoading(true);
    axios.get(process.env.API_ENDPOINT + "api/posts").then((response: any) => {
      spinnerService.showLoading(false);
      this.setState({ post: response.data });
    }).catch((error: any) => {
      spinnerService.showLoading(false);
      // console.log(error);
    });
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>Tutorials on JavaScript, React, Angular and more</title>
          <meta name="description" content="Tutorials on JavaScript, React, Angular and more" />
        </Helmet>
        {this.state.post.map((post: any, index: number) => {
          return <Post post={post} key={index} />;
        }
        )}
        <Pagination />
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
