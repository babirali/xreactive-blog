// import React, { Component } from "react";
// import { convertFromRaw, EditorState } from "draft-js";

// import "draft-js-focus-plugin/lib/plugin.css";
// import "draft-js-image-plugin/lib/plugin.css";
// import "draft-js-alignment-plugin/lib/plugin.css";
// import "draft-js-side-toolbar-plugin/lib/plugin.css";
// import "draft-js-inline-toolbar-plugin/lib/plugin.css";
// import "draft-js-video-plugin/lib/plugin.css";

// import Editor, {
//     composeDecorators,
//     createEditorStateWithText
// } from "draft-js-plugins-editor";

// import createImagePlugin from "draft-js-image-plugin";
// import createAlignmentPlugin from "draft-js-alignment-plugin";
// import createFocusPlugin from "draft-js-focus-plugin";
// import createResizeablePlugin from "draft-js-resizeable-plugin";
// import createSideToolbarPlugin from "draft-js-side-toolbar-plugin";
// import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
// import createVideoPlugin from "draft-js-video-plugin";

// import "./MyEditor.css";
// import ImageAdd from "./image-add/ImageAdd";
// import VideoAdd from "./video-add/VideoAdd";

// const sideToolbarPlugin = createSideToolbarPlugin();
// const focusPlugin = createFocusPlugin();
// const resizeablePlugin = createResizeablePlugin({
//     vertical: "relative",
//     horizontal: "relative"
// });
// const alignmentPlugin = createAlignmentPlugin();
// const inlineToolbarPlugin = createInlineToolbarPlugin();

// const { InlineToolbar } = inlineToolbarPlugin;
// const { SideToolbar } = sideToolbarPlugin;
// const { AlignmentTool } = alignmentPlugin;

// const decorator = composeDecorators(
//     resizeablePlugin.decorator,
//     alignmentPlugin.decorator,
//     focusPlugin.decorator
// );
// const videoPlugin = createVideoPlugin({ decorator });
// const imagePlugin = createImagePlugin({ decorator });

// const plugins = [
//     focusPlugin,
//     alignmentPlugin,
//     resizeablePlugin,
//     imagePlugin,
//     sideToolbarPlugin,
//     inlineToolbarPlugin,
//     videoPlugin
// ];

// export default class MyEditor extends Component<any, any> {
//     editor: any;
//     state = {
//         editorState: this.props.editorState
//     };

//     onChange = (editorState) => {
//         this.setState({
//             editorState
//         });
//         this.props.onEditorChange(editorState);
//     }

//     focus = () => { this.editor.focus(); };

//     render() {
//         return (
//             <div className="row">
//                 <div className="col-md-12">
//                     <ImageAdd
//                         editorState={this.state.editorState}
//                         onChange={this.onChange}
//                         modifier={imagePlugin.addImage}
//                     />
//                     <VideoAdd
//                         editorState={this.state.editorState}
//                         onChange={this.onChange}
//                         modifier={videoPlugin.addVideo}
//                     />
//                 </div>
//                 <div className="col-md-12">
//                     <div className="editor" onClick={this.focus}>
//                         <Editor
//                             editorState={this.state.editorState}
//                             onChange={this.onChange}
//                             plugins={plugins}
//                             ref={(element) => {
//                                 this.editor = element;
//                             }}
//                         />
//                         <InlineToolbar />
//                         <AlignmentTool />
//                         <SideToolbar />
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }
