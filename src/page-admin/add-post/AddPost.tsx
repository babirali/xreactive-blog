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
import Draft, { EditorState, RichUtils, AtomicBlockUtils, convertFromRaw, convertToRaw } from "draft-js";
// import Editor, { composeDecorators } from "draft-js-plugins-editor";
// import createToolbarPlugin from "draft-js-static-toolbar-plugin";
// import "draft-js-static-toolbar-plugin/lib/plugin.css";

// import {
//     ItalicButton,
//     BoldButton,
//     UnderlineButton,
//     CodeButton,
//     HeadlineOneButton,
//     HeadlineTwoButton,
//     HeadlineThreeButton,
//     UnorderedListButton,
//     OrderedListButton,
//     BlockquoteButton,
//     CodeBlockButton,
//     SubButton,
//     SupButton,
// } from "draft-js-buttons";
// import ImageAdd from "./ImageAdd";
// import Immutable from "immutable";
import Gist from "./Gist";

// import createImagePlugin from "draft-js-image-plugin";
// import createFocusPlugin from "draft-js-focus-plugin";
// import createAlignmentPlugin from "draft-js-alignment-plugin";
// import createResizeablePlugin from "draft-js-resizeable-plugin";

// import "draft-js-alignment-plugin/lib/plugin.css";
// import "draft-js-focus-plugin/lib/plugin.css";
// import "draft-js-image-plugin/lib/plugin.css";
import MyEditor from "../../component/my-editor/MyEditor";
// // const toolbarPlugin = createToolbarPlugin();

// const focusPlugin = createFocusPlugin();
// const resizeablePlugin = createResizeablePlugin();
// const alignmentPlugin = createAlignmentPlugin();

// const decorator = composeDecorators(
//     resizeablePlugin.decorator,
//     alignmentPlugin.decorator,
//     focusPlugin.decorator
// );
// const imagePlugin = createImagePlugin({ decorator });

// const { AlignmentTool } = alignmentPlugin;
// const { Toolbar } = toolbarPlugin;

// const plugins = [
//     // toolbarPlugin,
//     imagePlugin,
//     focusPlugin,
//     alignmentPlugin,
//     resizeablePlugin
// ];

// const blockRenderMap = Immutable.Map({
//     "code-block": {
//         // element is used during paste or html conversion to auto match your component;
//         // it is also retained as part of this.props.children and not stripped out
//         element: "pre",
//         wrapper: <Gist />,
//     }
// });
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
// const extendedBlockRenderMap = Draft.DefaultDraftBlockRenderMap.merge(blockRenderMap);
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
class AddPost extends Component<any, any> {
    editor: any;
    constructor(props: any) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            editorState: EditorState.createEmpty()
        };
        this.onChange = this.onChange.bind(this);
        // this.setEditor = this.setEditor.bind(this);
        // this.makeGist = this.makeGist.bind(this);
        // this.onURLInputKeyDown = this.onURLInputKeyDown.bind(this);
        // this.confirmMedia = this.confirmMedia.bind(this);
    }
    // onURLChange = (e) => this.setState({ urlValue: e.target.value });
    // onURLInputKeyDown(e) {
    //     if (e.which === 13) {
    //         this.confirmMedia(e);
    //     }
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

    onChange = (editorState) => {
        // console.log(editorState);
        this.setState({ editorState });
    }

    // setEditor = (editor) => {
    //     this.editor = editor;
    // }

    handleChange(event: any) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event: any) {
        event.preventDefault();
        // console.log(JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())));
        this.setState({ content: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())) });
        spinnerService.showLoading(true);

        axios.post(process.env.API_ENDPOINT + "api/posts/save", this.state).then((response: any) => {
            toast.success("Saved Successfully");
            spinnerService.showLoading(false);
        }).catch((error: any) => {
            toast.error("Error");
            // console.log(error);
        });
    }
    handleDate = (date: any) => {
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
                            {/* <div>
                                <input
                                    onChange={this.onURLChange}
                                    ref="url"
                                    type="text"
                                    value={this.state.urlValue}
                                    onKeyDown={this.onURLInputKeyDown}
                                />
                                <button type="button" className="btn btn-default" onMouseDown={this.confirmMedia}>Confirm</button>
                            </div> */}
                            {/* <Toolbar>
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
                                            <button type="button" onClick={() => this.makeGist("gist")}>gist</button>
                                        </div>
                                    )
                                }
                            </Toolbar> */}
                            {/* <div className="editor" onClick={this.focus}>
                                <Editor
                                    ref={this.setEditor}
                                    editorState={this.state.editorState}
                                    onChange={this.onChange}
                                    plugins={plugins}
                                    blockStyleFn={this.myBlockStyleFn}
                                    // blockRenderMap={extendedBlockRenderMap}
                                    // blockRendererFn={myBlockRenderer}
                                    blockRendererFn={mediaBlockRenderer}
                                />
                            </div> */}
                            {/* <MyEditor editorState={this.state.editorState} onEditorChange={this.onChange} /> */}
                            <Editor
                                editorState={this.state.editorState}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={this.onChange}
                            />
                            {/* <AlignmentTool /> */}
                            {/* <ImageAdd
                                editorState={this.state.editorState}
                                onChange={this.onChange}
                                modifier={imagePlugin.addImage}
                            /> */}
                            <div className="pull-right pt-3">
                                <button type="submit" className="btn btn-primary mr-2" onClick={this.handleSubmit}>Save</button>
                                <button type="button" className="btn btn-primary mr-2" onClick={() => alert("implementation pending")}>Publish</button>
                            </div>
                            <div className="clearfix" />
                        </div>
                    </div>

                </form>
            </div>
        );
    }
}

// function mediaBlockRenderer(block) {
//     if (block.getType() === "atomic") {
//         return { component: Media, editable: false };
//     }
//     return null;
// }
// const Audio = (props) => {
//     return <audio controls src={props.src} />;
// };

// const Image = (props) => {
//     return <img src={props.src} alt="Example" />;
// };

// const Video = (props) => {
//     return <video controls src={props.src} />;
// };

// const Media = (props) => {
//     const entity = props.contentState.getEntity(props.block.getEntityAt(0));
//     const { src } = entity.getData();
//     // const type = entity.getType();
//     const type = "image";
//     let media;
//     // if (type === "audio") {
//     //     media = <Audio src={src} />;
//     // } else if (type === "image") {
//     media = <Image src={src} />;
//     // } else if (type === "video") {
//     //     media = <Video src={src} />;
//     // }
//     return media;
// };
// const mapStateToProps = (state: any) => ({
//     todos: state.post
// })

// export default connect(mapStateToProps)(AddPost);

export default AddPost;
