import React, { Component } from "react";
import "./Post.css";
import { Link, Route } from "react-router-dom";

const Post = (props) => {
    return (
        <div className="card flex-row border-0 shadow-sm bg-white rounded mb-4">
            <div className="card-header border-0 padding-0">
                <Route render={({ history }) => (
                    <img className="img-l" onClick={() => history.push(`/post/${props.post.category}/${props.post._id}`)} src={props.post.img} alt="" />
                )} />
            </div>
            <div className="card-block p-2">
                <Route render={({ history }) => (
                    <h3 className="card-title mb-1" onClick={() => history.push(`/post/${props.post.category}/${props.post._id}`)}>
                        {props.post.heading}
                    </h3>
                )} />
                < p className="card-text text-hidden"> {props.post.homePageText}</p>
                <Link className="link small" to={`/post/${props.post.category}/${props.post._id}`}>
                    Read More <span className="pl-1">⟶</span>
                </Link>
            </div>
        </div >
    );
};

export default Post;
