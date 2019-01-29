import React, { Component } from 'react';

class Pagination extends Component<any, any> {
    render() {
        return (
            <ul className="pagination mb-4 mt-4">
                <li className="page-item disabled mr-auto">
                    <a className="page-link" href="#">&larr; Newer</a>
                </li>
                <li className="page-item ml-auto">
                    <a className="page-link" href="#">Older &rarr;</a>
                </li>
            </ul>
        );
    }
}

export default Pagination;
