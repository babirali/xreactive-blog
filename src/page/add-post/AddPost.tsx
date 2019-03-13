import React, { Component } from 'react';
import { connect } from 'react-redux';
const CKEditor = require('ckeditor4-react');
const axios = require('axios');

class AddPost extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            heading: '',
            by: '',
            date: '',
            content: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any) {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit(event: any) {
        event.preventDefault();
        axios.post('http://localhost:3001/api/savepost', this.state).then(function (response: any) {
            console.log(response);
        }).catch(function (error: any) {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <h1>Add Post</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="heading">Heading</label>
                        <input type="text" className="form-control" name="heading" value={this.state.heading} onChange={this.handleChange} id="heading" aria-describedby="heading" placeholder="Heading" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="by">By</label>
                        <input type="text" className="form-control" name="by" value={this.state.by} onChange={this.handleChange} id="by" placeholder="By" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input type="text" className="form-control" name="date" value={this.state.date} onChange={this.handleChange} id="date" placeholder="Date" />
                    </div>
                    <CKEditor data={this.state.content}
                        onChange={(evt: any) => this.setState({ content: evt.editor.getData() })}
                    />
                    <div className="pull-right pt-3">
                        <button type="submit" className="btn btn-primary mr-2" onClick={this.handleSubmit}>Save</button>
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
