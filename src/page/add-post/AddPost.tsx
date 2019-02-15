import React, { Component } from 'react';
import { connect } from 'react-redux';
const CKEditor = require('ckeditor4-react');
const axios = require('axios');

import { withRouter } from 'react-router-dom'

class AddPost extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            content: ''
        }
    }
    render() {
        return (
            <div>
                <h1>Add Post</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="heading">Heading</label>
                        <input type="text" className="form-control" id="heading" aria-describedby="emailHelp" placeholder="Heading" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="by">By</label>
                        <input type="text" className="form-control" id="by" placeholder="By" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input type="text" className="form-control" id="date" placeholder="Date" />
                    </div>
                    <CKEditor data={this.state.content}
                        onChange={(evt: any) => console.log(evt.editor.getData())}
                    />
                    <div className="pull-right pt-3">
                        <button type="submit" className="btn btn-primary mr-2">Save</button>
                        <button type="button" className="btn btn-primary mr-2">Publish</button>
                        <button type="button" className="btn btn-primary">Delete</button>
                    </div>
                    <div className="clearfix" />

                </form>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    todos: state.post
})

export default connect(mapStateToProps)(AddPost);
