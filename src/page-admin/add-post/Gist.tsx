import React, { Component } from "react";
export default class Gist extends Component<any, any> {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        const { block, contentState } = this.props;
        const { foo } = this.props.blockProps;
        const data = contentState.getEntity(block.getEntityAt(0)).getData();
        return (
            <div>
                <script src={foo}></script>
            </div>
        );
    }
}
