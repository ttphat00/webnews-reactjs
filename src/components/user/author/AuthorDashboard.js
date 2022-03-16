import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router";
import { Route, Switch } from 'react-router-dom';
import CreateCategory from "./category/CreateCategory";
import CreateSubcategory from "./subcategory/CreateSubcategory";
import ShowCategory from "./category/ShowCategory";
import EditCategory from './category/EditCategory';
import EditSubcategory from './subcategory/EditSubcategory';
import CreatePost from './post/CreatePost';
import EditPost from './post/EditPost';
import EditSearchPost from './post/EditSearchPost';
import axios from "axios";

export default function AuthorDashboard(){
    var match = useRouteMatch();
    const [category, setCategory] = useState([]);
    const [subcategory, setSubcategory] = useState([]);
    const [post, setPost] = useState([]);
    const [user, setUser] = useState({result:{id:''}});
    let myToken = JSON.parse(localStorage.getItem('token'));
    const sum_cate = [];
    const approving_cate = [];
    const approved_cate = [];
    const cancel_cate = [];
    const posts = [];
    const approving_post = [];
    const approved_post = [];
    const cancel_post = [];

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

        axios.get(`https://webnews-backend.herokuapp.com/api/user-info?token=${myToken.token}`)
        .then(res => {
            setUser(res.data);
        })
        .catch(error => console.log(error));
    }, [myToken.token])

    return (
        <div className="admin-main">
            <div className="col-left bg-dark text-white">
                <div className="card-header bg-dark m-auto"><Link className="nav-link" to="/author">DASHBOARD</Link></div>
                <div className="card-body">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item dropdown mb-3">
                            <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Chủ đề
                            </span>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to={`${match.url}/add-category`}>Thêm chủ đề</Link>
                                <Link className="dropdown-item" to={`${match.url}/category/1`}>Xem chủ đề</Link>
                                <Link className="dropdown-item" to={`${match.url}/add-subcategory`}>Thêm chủ đề con</Link>
                                <Link className="dropdown-item" to={`${match.url}/edit-category`}>Sửa/Xóa chủ đề</Link>
                                <Link className="dropdown-item" to={`${match.url}/edit-subcategory`}>Sửa/Xóa chủ đề con</Link>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Bài viết
                            </span>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to={`${match.url}/add-post`}>Thêm bài viết</Link>
                                <Link className="dropdown-item" to={`${match.url}/post/1`}>Xem bài viết</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {
                category.map((data) => {
                    if(data.id_user === user.result.id){
                        sum_cate.push(data);
                    }
                    return null;
                })
            }
            {
                subcategory.map((data) => {
                    if(data.id_user === user.result.id){
                        sum_cate.push(data);
                    }
                    return null;
                })
            }
            {
                post.map((data) => {
                    if(data.id_user === user.result.id){
                        posts.push(data);
                    }
                    return null;
                })
            }
            {
                posts.map((data) => {
                    if(data.status === '1'){
                        approved_post.push(data);
                    }else{
                        if(data.status === '0'){
                            approving_post.push(data);
                        }else{
                            cancel_post.push(data);
                        }
                    }
                    return null;
                })
            }
            {
                sum_cate.map((data) => {
                    if(data.status === '1'){
                        approved_cate.push(data);
                    }else{
                        if(data.status === '0'){
                            approving_cate.push(data);
                        }else{
                            cancel_cate.push(data);
                        }
                    }
                    return null;
                })
            }
            
            <div className="d-flex justify-content-center all-post">
                <div className="bg-info text-white quantity-cate">
                    <div>Tổng số chủ đề</div>
                    <div>{sum_cate.length}</div>
                </div>
                <div className="bg-warning text-white quantity-cate">
                    <div>Chủ đề chờ duyệt</div>
                    <div>{approving_cate.length}</div>
                </div>
                <div className="bg-success text-white quantity-cate">
                    <div>Chủ đề đã duyệt</div>
                    <div>{approved_cate.length}</div>
                </div>
                <div className="bg-danger text-white quantity-cate">
                    <div>Chủ đề bị hủy</div>
                    <div>{cancel_cate.length}</div>
                </div>
            </div>
        
            <div className="d-flex justify-content-center all-post2">
                <div className="bg-info text-white quantity-post">
                    <div>Tổng số bài viết</div>
                    <div>{posts.length}</div>
                </div>
                <div className="bg-warning text-white quantity-post">
                    <div>Bài viết chờ duyệt</div>
                    <div>{approving_post.length}</div>
                </div>
                <div className="bg-success text-white quantity-post">
                    <div>Bài viết đã duyệt</div>
                    <div>{approved_post.length}</div>
                </div>
                <div className="bg-danger text-white quantity-post">
                    <div>Bài viết bị hủy</div>
                    <div>{cancel_post.length}</div>
                </div>
            </div>
            

            <Switch>
                <Route path={`${match.url}/add-category`} component={CreateCategory} />
                <Route path={`${match.url}/add-subcategory`} component={CreateSubcategory} />
                <Route path={`${match.url}/category/:id`} component={ShowCategory} />
                <Route path={`${match.url}/edit-category`} component={EditCategory} />
                <Route path={`${match.url}/edit-subcategory`} component={EditSubcategory} />
                <Route path={`${match.url}/add-post`} component={CreatePost} />
                <Route path={`${match.url}/post/:id`} component={EditPost} />
                <Route path={`${match.url}/search-post/:title/:idpage`} component={EditSearchPost} />
            </Switch>
        </div>
    );
}