import React, { Component } from "react";

import './Pagination.css'

class Pagination extends Component<any, any> {
    render() {
        return (
            // <ul className="pagination mb-4 mt-4">
            //     <li className="page-item mr-auto">
            //         <a className="page-link page-link-disabled" href="#">&larr; Newer</a>
            //     </li>
            //     <li className="page-item ml-auto">
            //         <a className="page-link" href="#">Older &rarr;</a>
            //     </li>
            // </ul>
            <div className="mb-5 mt-5">
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </a>
                        </li>
                        <li className="page-item"><a className="page-link page-link-active" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Pagination;
