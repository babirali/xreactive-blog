import React, { useState, useEffect } from "react";
import { spinnerService } from "../../service/spinner";
import axios from "axios";
import Post from "../../component/post/Post";

const PostByCategory = (props) => {
    const [post, setPost] = useState([]);
    useEffect(() => {
        // console.log(props);
        spinnerService.showLoading(true);
        axios.get(process.env.API_ENDPOINT + "api/posts/getpostbycategory/" + props.match.params.category).then((response: any) => {
            spinnerService.showLoading(false);
            setPost(response.data);
        }).catch((error: any) => {
            spinnerService.showLoading(false);
            // console.log(error);
        });
    }, [props.match.params.category]);
    return (
        <div>
            {
                post.map((post: any, index: number) => {
                    return <Post post={post} key={index} />;
                })
            }
        </div>
    );
};

export default PostByCategory;
