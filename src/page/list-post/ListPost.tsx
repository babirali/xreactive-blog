import React, { Component } from 'react';
import SideBar from '../../component/side-bar/SideBar';
import Post from '../../component/post/Post';
import Pagination from '../../component/pagination/Pagination';
import { connect } from 'react-redux';
const axios = require('axios');
import './ListPost.css'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

class ListPost extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            post: []
        }
    }
    // componentWillMount() {
    //     axios.get(process.env.REACT_APP_API_ENDPOINT + 'api/posts').then((response: any) => {
    //         console.log(response);
    //         this.setState({ post: response.data });
    //     }).catch((error: any) => {
    //         console.log(error);
    //     });
    // }
    render() {
        const columns = [{
            Header: 'Id',
            accessor: '_id',
            Cell: (row: any) => (<a href="">{row.original._id}</a>)
        }, {
            Header: 'Heading',
            accessor: 'heading'
        }, {
            Header: 'Image',
            accessor: 'img'
        }, {
            Header: 'Content',
            accessor: 'content'
        }, {
            Header: 'Post By',
            accessor: 'postBy'
        }, {
            Header: 'Date',
            accessor: 'date'
        }
            , {
            Header: 'Actions',
            Cell: (row: any) => (<button className="btn btn-primary">test</button>)
        }]
        return (
            <div className="row">
                <div className="col-md-12 pt-4">
                    <ReactTable
                        data={this.state.post}
                        columns={columns}
                        defaultPageSize={10}
                        // filterable={true}
                        getTrProps={(state: any, rowinfo: any) => {
                            return {
                                onClick: (e: any) => {
                                    console.log(rowinfo);
                                }
                            }
                        }}
                        onFetchData={(state, instance) => {
                            this.setState({ loading: true })
                            axios.get(process.env.REACT_APP_API_ENDPOINT + 'posts')
                                .then((res: any) => {
                                    this.setState({
                                        post: res.data,
                                        loading: false
                                    })
                                })
                        }}
                    />
                </div>
            </div>
        );
    }
}
export default ListPost;
