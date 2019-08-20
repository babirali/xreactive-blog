import React, { Component, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddPost.css";
import { spinnerService } from "../../service/spinner";
import { Observable, Subject } from "rxjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Draft, { EditorState, RichUtils, AtomicBlockUtils, convertFromRaw, convertToRaw } from "draft-js";
// function myBlockRenderer(contentBlock) {
//     const type = contentBlock.getType();
//     if (type === "atomic") {
//         return {
//             component: Gist,
//             editable: false,
//             props: {
//                 foo: "",
//             },
//         };
//     }
// }
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const AddPost = () => {
    // editor: any;
    // constructor(props: any) {
    //     super(props);
    //     this.state = {};
    //     this.handleChange = this.handleChange.bind(this);
    //     this.handleSubmit = this.handleSubmit.bind(this);
    //     this.state = {
    //         editorState: EditorState.createEmpty()
    //     };
    //     this.onChange = this.onChange.bind(this);
    // }
    // confirmMedia(e) {
    //     // this.setState({ urlType: "image" });
    //     e.preventDefault();
    //     const { editorState, urlValue, urlType } = this.state;
    //     const contentState = editorState.getCurrentContent();
    //     const contentStateWithEntity = contentState.createEntity(urlType, "IMMUTABLE", { src: urlValue });
    //     const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    //     const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    //     this.setState({
    //         editorState: AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " "),
    //         showURLInput: false,
    //         urlValue: ""
    //     }, () => {
    //         setTimeout(() => this.focus(), 0);
    //     });
    // }

    // makeGist(type) {
    //     const { editorState } = this.state;
    //     const contentState = editorState.getCurrentContent();
    //     const contentStateWithEntity = contentState.createEntity(
    //         type,
    //         "IMMUTABLE",
    //         {}
    //     );
    //     const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    //     const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    //     this.setState({
    //         editorState: AtomicBlockUtils.insertAtomicBlock(
    //             newEditorState,
    //             entityKey,
    //             " "
    //         )
    //     });
    // }
    const [state, setState] = useState({ editorState: EditorState.createEmpty() });
    // const onChange = (editorState) => {
    //     this.setState({ editorState });
    // };
    // handleChange(event: any) {
    //     this.setState({ [event.target.name]: event.target.value });
    // }
    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(state.editorState);
        // this.setState({ content: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())) });
        // spinnerService.showLoading(true);
        // axios.post(process.env.API_ENDPOINT + "api/posts/save", this.state).then((response: any) => {
        //     toast.success("Saved Successfully");
        //     spinnerService.showLoading(false);
        // }).catch((error: any) => {
        //     toast.error("Error");
        //     // console.log(error);
        // });
    };
    const handleDate = (date: any) => {
        this.setState({
            date,
        });
    }
    // myBlockStyleFn = (contentBlock) => {
    //     const type = contentBlock.getType();
    //     if (type === "blockquote") {
    //         return "superFancyBlockquote";
    //     }
    // }
    // focus = () => {
    //     this.editor.focus();
    // }
    // render() {
    return (
        <div>
            <ToastContainer />
            <h1>Add Post</h1>
            <form>
                <div className="row">
                    {/* <div className="col-md-6">
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
                            <DatePicker
                                    className="form-control"
                                    selected={this.state.date}
                                    onChange={handleDate}
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
                    </div> */}
                    <div className="col-md-12 pb-5">
                        <Editor
                            wrapperClassName="wrapper-class"
                            editorClassName="wrapper-editor"
                            editorState={state.editorState}
                            onEditorStateChange={(editor) => setState({ editorState: editor })}
                        />
                        <div className="pull-right pt-4">
                            <button type="submit" className="btn btn-primary mr-2" onClick={handleSubmit}>Save</button>
                            <button type="button" className="btn btn-primary mr-2" onClick={() => alert("implementation pending")}>Publish</button>
                        </div>
                        <div className="clearfix" />
                    </div>
                </div>
            </form>
        </div>
    );
};
// }
// const mapStateToProps = (state: any) => ({
//     todos: state.post
// })
// export default connect(mapStateToProps)(AddPost);
export default AddPost;
