import React, { Component } from 'react';
import { connect } from 'react-redux';
const CKEditor = require('ckeditor4-react');
const axios = require('axios');
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddPost.css'
import { spinnerService } from '../../service/spinner';
import { Observable, Subject } from 'rxjs';

class AddPost extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    } 

    handleChange(event: any) {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit(event: any) {
        spinnerService.showLoading(true);
        event.preventDefault();
        axios.post(process.env.REACT_APP_API_ENDPOINT + 'posts/save', this.state).then((response: any) => {
            toast.success('Saved Successfully ')
            // this.props.history.push('/listpost');
            spinnerService.showLoading(false);
        }).catch((error: any) => {
            toast.error('Error')
            console.log(error);
        });
    }
    notify = () => {
        this.setState({ loading: true });
    };

    render() {
        return (
            <div>
                <ToastContainer />
                <h1>Add Post</h1>
                <form>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="heading">Heading</label>
                                <input type="text" className="form-control" name="heading" value={this.state.heading} onChange={this.handleChange} id="heading" aria-describedby="heading" placeholder="Heading" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="by">By</label>
                                <input type="text" className="form-control" name="postBy" value={this.state.postBy} onChange={this.handleChange} id="postBy" placeholder="Name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="date">Date</label>
                                <input type="text" className="form-control" name="date" value={this.state.date} onChange={this.handleChange} id="date" placeholder="Date" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="date">List Image</label>
                                <input type="text" className="form-control" name="img" value={this.state.img} onChange={this.handleChange} id="img" placeholder="Image" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="date">Detail Image</label>
                                <input type="text" className="form-control" name="mainImg" value={this.state.mainImg} onChange={this.handleChange} id="mainImg" placeholder="Image" />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <CKEditor
                                type="classic"
                                data={this.state.content}
                                onChange={(evt: any) => this.setState({ content: evt.editor.getData() })}
                                config={{
                                    filebrowserBrowseUrl: process.env.REACT_APP_API_ENDPOINT + 'posts/browse',
                                    filebrowserUploadUrl: process.env.REACT_APP_API_ENDPOINT + 'posts/upload1',
                                }}


                            />
                            <div className="pull-right pt-3">
                                <button type="submit" className="btn btn-primary mr-2" onClick={this.handleSubmit}>Save</button>
                                <button type="button" className="btn btn-primary mr-2" onClick={this.notify}>Publish</button>
                            </div>
                            <div className="clearfix" />
                        </div>
                    </div>

                </form>
            </div>
        );
    }
}

// const mapStateToProps = (state: any) => ({
//     todos: state.post
// })

// export default connect(mapStateToProps)(AddPost);
export default AddPost;
