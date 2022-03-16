import React from "react";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router";
import { Route, Switch } from 'react-router-dom';
import Approving from './category/Approving';
import ApprovingPost from './post/ApprovingPost';
import Approved from './category/Approved';
import ApprovedPost from './post/ApprovedPost';
import SearchApprovedPost from './post/SearchApprovedPost';
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function AdminDashboard(){
    var match = useRouteMatch();
    const [category, setCategory] = useState([]);
    const [subcategory, setSubcategory] = useState([]);
    const [post, setPost] = useState([]);
    const approving_cate = [];
    const approved_cate = [];
    const approving_post = [];
    const approved_post = [];

    useEffect(() => {
        axios.get('https://webnews-backend.herokuapp.com/api/category')
        .then(res => {
            setCategory(res.data);
        })
        .catch(error => console.log(error));

        axios.get('https://webnews-backend.herokuapp.com/api/subcategory')
        .then(res => {
            setSubcategory(res.data);
        })
        .catch(error => console.log(error))

        axios.get('https://webnews-backend.herokuapp.com/api/post')
        .then(res => {
            setPost(res.data);
        })
        .catch(error => console.log(error))
    }, [])

    return (
        <div className="admin-main">
            <div className="col-left bg-dark text-white">
                <div className="card-header bg-dark m-auto"><Link className="nav-link" to="/admin">DASHBOARD</Link></div>
                <div className="card-body">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active mr-3">
                            <Link className="nav-link" to={`${match.url}/approving-category/1`}>Chủ đề chờ duyệt</Link>
                        </li>
                        <li className="nav-item active mr-3">
                            <Link className="nav-link" to={`${match.url}/approved-category/1`}>Chủ đề đã duyệt</Link>
                        </li>
                        <li className="nav-item active mr-3">
                            <Link className="nav-link" to={`${match.url}/approving-post/1`}>Bài viết chờ duyệt</Link>
                        </li>
                        <li className="nav-item active mr-3">
                            <Link className="nav-link" to={`${match.url}/approved-post/1`}>Bài viết đã duyệt</Link>
                        </li>
                    </ul>
                </div>
            </div>

            {
                category.map((data) => {
                    if(data.status === '1'){
                        approved_cate.push(data);
                    }else{
                        if(data.status === '0'){
                            approving_cate.push(data);
                        }
                    }
                    return null;
                })
            }
            {
                subcategory.map((data) => {
                    if(data.status === '1'){
                        approved_cate.push(data);
                    }else{
                        if(data.status === '0'){
                            approving_cate.push(data);
                        }
                    }
                    return null;
                })
            }
            {
                post.map((data) => {
                    if(data.status === '1'){
                        approved_post.push(data);
                    }else{
                        if(data.status === '0'){
                            approving_post.push(data);
                        }
                    }
                    return null;
                })
            }
            
            
            <div className="d-flex justify-content-center all-cate">
                <div className="bg-warning text-white quantity-cate">
                    <div>Chủ đề chờ duyệt</div>
                    <div>{approving_cate.length}</div>
                </div>
                <div className="bg-success text-white quantity-cate">
                    <div>Chủ đề đã duyệt</div>
                    <div>{approved_cate.length}</div>
                </div>
                <div className="bg-warning text-white quantity-post">
                    <div>Bài viết chờ duyệt</div>
                    <div>{approving_post.length}</div>
                </div>
                <div className="bg-success text-white quantity-post">
                    <div>Bài viết đã duyệt</div>
                    <div>{approved_post.length}</div>
                </div>
            </div>
        
            
            
            <Switch>
                <Route path={`${match.url}/approving-category/:id`} component={Approving} />
                <Route path={`${match.url}/approved-category/:id`} component={Approved} />
                <Route path={`${match.url}/approving-post/:id`} component={ApprovingPost} />
                <Route path={`${match.url}/approved-post/:id`} component={ApprovedPost} />
                <Route path={`${match.url}/search-approved-post/:title/:idpage`} component={SearchApprovedPost} />
            </Switch>
        </div>
    );
}