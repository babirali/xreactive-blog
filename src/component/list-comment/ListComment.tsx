import React, { Component } from "react";

class ListComment extends Component<any, any> {
  render() {
    return (
      <div>
        <div className="media mb-4">
          <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="" />
          <div className="media-body">
            <h5 className="mt-0">Commenter Name</h5>
            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
             ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra
              turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
              felis in faucibus.
                </div>
        </div>

        <div className="media mb-4">
          <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="" />
          <div className="media-body">
            <h5 className="mt-0">Commenter Name</h5>
            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
             scelerisque ante sollicitudin. Cras purus odio, vestibulum in
              vulputate at, tempus viverra turpis. Fusce condimentum nunc
               ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                  <div className="media mt-4">
              <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="" />
              <div className="media-body">
                <h5 className="mt-0">Commenter Name</h5>
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                    </div>
            </div>

            <div className="media mt-4">
              <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="" />
              <div className="media-body">
                <h5 className="mt-0">Commenter Name</h5>
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                    </div>
            </div>

          </div>
        </div>

      </div>
    );
  }
}

export default ListComment;
