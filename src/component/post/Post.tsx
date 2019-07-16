import React, { Component } from "react";
import "./Post.css";
import { Link } from "react-router-dom";

class Post extends Component<any, any> {
    render() {
        return (
            <div className="card flex-row border-0 shadow-sm bg-white rounded mb-4">
                <div className="card-header border-0 padding-0">
                    <img src={this.props.post.img} alt="" />
                </div>
                <div className="card-block p-4">
                    <h4 className="card-title pb-2" id="test">{this.props.post.heading}</h4>
                    <p className="card-text" dangerouslySetInnerHTML={{ __html: this.props.post.content }}>{}</p>
                    <Link className="link small" to={"/post/" + this.props.post._id}>
                        Read More <span className="pl-1">⟶</span>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Post;
