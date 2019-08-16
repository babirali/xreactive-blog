import React, { Component } from "react";
import { connect } from "react-redux";
const CKEditor = require("ckeditor4-react");
// import CKEditor from "ckeditor4-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddPost.css";
import { spinnerService } from "../../service/spinner";
import { Observable, Subject } from "rxjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { EditorState, RichUtils } from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';

import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,
    SubButton,
    SupButton,
} from 'draft-js-buttons';

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;
const plugins = [toolbarPlugin];
class AddPost extends Component<any, any> {
    editor: any;
    constructor(props: any) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            editorState: createEditorStateWithText('test')
        }
        this.onChange = this.onChange.bind(this);
        this.setEditor = this.setEditor.bind(this)
    }
    onChange = (editorState) => {
        // console.log(editorState);
        this.setState({ editorState })
    };
    setEditor = (editor) => {
        this.editor = editor;
    };
    handleChange(event: any) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event: any) {
        spinnerService.showLoading(true);
        event.preventDefault();
        axios.post(process.env.API_ENDPOINT + "api/posts/save", this.state).then((response: any) => {
            toast.success("Saved Successfully");
            spinnerService.showLoading(false);
        }).catch((error: any) => {
            toast.error("Error");
            // console.log(error);
        });
    }
    notify = () => {
        this.setState({ loading: true });
    }
    handleDate = (date: any) => {
        this.setState({
            date,
        });
    }

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
                                {/* <input type="text" className="form-control" name="date" value={this.state.date} onChange={this.handleChange} id="date" placeholder="Date" /> */}
                                <DatePicker
                                    className="form-control"
                                    selected={this.state.date}
                                    onChange={this.handleDate}
                                />
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
                            <div className="form-group">
                                <label htmlFor="tags">Tags</label>
                                <input type="text" className="form-control"
                                    name="tags" value={this.state.tags} onChange={this.handleChange} id="tags" placeholder="Tags" />
                            </div>
                        </div>
                        <div className="col-md-12">
                            {/* <CKEditor
                                type="classic"
                                data={this.state.content}
                                onChange={(evt: any) => this.setState({ content: evt.editor.getData() })}
                                config={{
                                    filebrowserBrowseUrl: process.env.API_ENDPOINT + "api/posts/browse",
                                    filebrowserUploadUrl: process.env.API_ENDPOINT + "api/posts/upload1",
                                }}
                            /> */}
                            <Toolbar>
                                {
                                    // may be use React.Fragment instead of div to improve perfomance after React 16
                                    (externalProps) => (
                                        <div>
                                            <BoldButton {...externalProps} />
                                            <ItalicButton {...externalProps} />
                                            <UnderlineButton {...externalProps} />
                                            <CodeButton {...externalProps} />
                                            <UnorderedListButton {...externalProps} />
                                            <OrderedListButton {...externalProps} />
                                            <BlockquoteButton {...externalProps} />
                                            <CodeBlockButton {...externalProps} />
                                            <HeadlineOneButton {...externalProps} />
                                            <HeadlineTwoButton {...externalProps} />
                                            <HeadlineThreeButton {...externalProps} />
                                            <SubButton {...externalProps} />
                                            <SupButton {...externalProps} />
                                        </div>
                                    )
                                }
                            </Toolbar>
                            <Editor
                                ref={this.setEditor}
                                editorState={this.state.editorState}
                                onChange={this.onChange}
                                plugins={plugins}
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
