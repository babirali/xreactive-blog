import React, { Component } from "react";

class PostComment extends Component<any, any> {
    render() {
        return (
            <div className="card my-4 border-0">
                <h5 className="card-header text-uppercase border-0 text-dark">Leave a Comment:</h5>
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <textarea className="form-control" rows={3} />
                        </div>
                        <button type="submit" className="btn btn-primary rounded-0">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default PostComment;
