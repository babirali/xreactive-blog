import React, { Component } from 'react';
import "./Post.css";
import { Link } from 'react-router-dom';

class Post extends Component<any, any> {
    render() {
        return (
            <div className="card flex-row border-0 shadow-sm bg-white rounded mb-4">
                {/* <img className="card-img-top" src="http://placehold.it/750x300" alt="Card image cap" /> */}
                <div className="card-header border-0 padding-0">
                    <img src="//placehold.it/200" alt="" />
                </div>
                <div className="card-block p-4">
                    <h4 className="card-title pb-2">Ditle test</h4>
                    <p className="card-text">Description sdfsdf sdfsdfet twe sdf sf fsdfs dsfaerwe fgsdf sdfs gsdf ssdfas df</p>
                    <Link className="link small" to="/post/2">Read More <span className="pl-1">⟶</span></Link>
                </div>
            </div>
        );
    }
}

export default Post;
