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
import useForm from "../../component/useForm/useForm";
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
    // myBlockStyleFn = (contentBlock) => {
    //     const type = contentBlock.getType();
    //     if (type === "blockquote") {
    //         return "superFancyBlockquote";
    //     }
    // }
    // focus = () => {
    //     this.editor.focus();
    // }
    // const onChange = (editorState) => {
    //     this.setState({ editorState });
    // };
    // handleChange(event: any) {
    //     this.setState({ [event.target.name]: event.target.value });
    // }
    const formData = {
        values: {
            heading: "",
            img: "",
            mainImg: "",
            postBy: "",
            tags: "",
            min: "",
            homePageText: ""
        },
        validations: {
            heading: {
                required: { flag: true, message: "Heading is required" }
            },
            img: {
                required: { flag: true, message: "List Image is required" }
            },
            mainImg: {
                required: { flag: true, message: "Main Image is required" }
            },
            postBy: {
                required: { flag: true, message: "Post by is required" }
            },
            tags: {
                required: { flag: true, message: "tags is required" }
            },
            min: {
                required: { flag: true, message: "min is required" }
            },
            homePageText: {
                required: { flag: true, message: "Home Page Text is required" }
            }
        }
    };
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [date, setDate] = useState(new Date());

    const save = () => {
        if (formValid && (date !== null || date !== undefined) && (editorState.getCurrentContent().hasText())) {
            spinnerService.showLoading(true);
            let data = inputs.values;
            data = {
                ...data,
                content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
                date
            };
            axios.post(process.env.API_ENDPOINT + "api/posts/save", data).then((response: any) => {
                toast.success("Saved Successfully");
                spinnerService.showLoading(false);
            }).catch((error: any) => {
                toast.error("Error");
                // console.log(error);
            });
        }

    };
    const { inputs, handleChange, handleSubmit, clearForm, formValid, isDirty } = useForm(save, formData);
    const clear = () => {
        clearForm();
        setEditorState(EditorState.createEmpty());
    };
    return (
        <div>
            <ToastContainer />
            <h1>Add Post</h1>
            <form onSubmit={handleSubmit} noValidate>
                <div className="row">
                    <div className="form-group col-md-6">
                        <label htmlFor="heading">Heading</label>
                        <input type="text" tabIndex={1} className="form-control" name="heading" value={inputs.values ? inputs.values.heading : ""} onChange={handleChange} id="heading" aria-describedby="heading" placeholder="Heading" required />
                        <span className="text-danger">{inputs.errors ? inputs.errors.heading : ""}</span>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="by">By</label>
                        <input type="text" tabIndex={2} className="form-control" name="postBy" value={inputs.values ? inputs.values.postBy : ""} onChange={handleChange} id="postBy" placeholder="Name" required />
                        <span className="text-danger">{inputs.errors ? inputs.errors.postBy : ""}</span>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="date">Date</label>
                        <DatePicker
                            tabIndex={3}
                            name="date"
                            className="form-control"
                            selected={date}
                            onChange={(d) => { setDate(d); }}
                        />
                        {((date === null || date === undefined) && isDirty) ? <span className="text-danger">Text is Required.</span> : ""}
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="date">List Image</label>
                        <input type="text" tabIndex={4} className="form-control" name="img" value={inputs.values ? inputs.values.img : ""} onChange={handleChange} id="img" placeholder="Image" required />
                        <span className="text-danger">{inputs.errors ? inputs.errors.img : ""}</span>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="date">Detail Image</label>
                        <input type="text" tabIndex={5} className="form-control" name="mainImg" value={inputs.values ? inputs.values.mainImg : ""} onChange={handleChange} id="mainImg" placeholder="Image" required />
                        <span className="text-danger">{inputs.errors ? inputs.errors.mainImg : ""}</span>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="tags">Tags</label>
                        <input type="text" tabIndex={6} className="form-control"
                            name="tags" value={inputs.values ? inputs.values.tags : ""} onChange={handleChange} id="tags" placeholder="Tags" required />
                        <span className="text-danger">{inputs.errors ? inputs.errors.tags : ""}</span>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="tags">Mins</label>
                        <input type="text" tabIndex={7} className="form-control"
                            name="min" value={inputs.values ? inputs.values.min : ""} onChange={handleChange} id="min" placeholder="Min" required />
                        <span className="text-danger">{inputs.errors ? inputs.errors.min : ""}</span>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="tags">Home Page Text</label>
                        <textarea tabIndex={8} className="form-control"
                            name="homePageText" value={inputs.values ? inputs.values.homePageText : ""} onChange={handleChange} id="homePageText" placeholder="Home Page Text" required />
                        <span className="text-danger">{inputs.errors ? inputs.errors.homePageText : ""}</span>
                    </div>
                    <div className="col-md-12">
                        <Editor
                            tabIndex={9}
                            wrapperClassName="wrapper-class"
                            editorClassName="wrapper-editor"
                            editorState={editorState}
                            onEditorStateChange={(editor) => { setEditorState(editor); }}
                        />
                        {(!(editorState.getCurrentContent().hasText()) && isDirty) ? <span className="text-danger">Text is Required.</span> : ""}
                    </div>
                    <div className="col-md-12 pb-5">
                        <div className="pull-right pt-4">
                            <button type="submit" className="btn btn-primary mr-2">Save</button>
                            <button type="button" className="btn btn-primary mr-2" onClick={() => alert("implementation pending")}>Publish</button>
                            <button type="button" className="btn btn-primary mr-2" onClick={clear}>Clear</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default AddPost;
