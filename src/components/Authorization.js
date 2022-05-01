import React, { useEffect, useState } from "react";
import '../css/dashboard.css';
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router";
import { Route, Switch } from 'react-router-dom';
import ShowPermission from './user/authorization/ShowPermission';
import axios from "axios";

export default function Authorization(){
    var match = useRouteMatch();
    const [user, setUser] = useState([]);
    const authors = [];
    const approvers = [];

    useEffect(() => {
        document.title = 'System Admin';

        axios.get('https://webnews-backend.herokuapp.com/api/users')
        .then(res => {
            setUser(res.data);
        })
        .catch(error => console.log(error));
    },[]);

    if(localStorage.getItem('system_admin')){
        return (
            <div>
                <div className="admin-main">
                    <div className="col-left bg-dark text-white">
                        <div className="card-header bg-dark h4">DASHBOARD</div>
                        <div className="card-body">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <Link className="nav-link" to={`${match.url}/1`}>Quản Lý Người Dùng</Link>
                                    <Link className="nav-link" to={`/register`}>Tạo Tài Khoản</Link>
                                    <Link className="nav-link" to={`/`}>Về Trang Chủ</Link>
                                    <Link className="nav-link" to='/logout/system-admin'>Đăng xuất</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="d-flex all-user">
                        {
                            user.map((data) => {
                                if(data.permission === 'Tác giả'){
                                    authors.push(data);
                                }
                                return null;
                            })
                        }
                        {
                            user.map((data) => {
                                if(data.permission === 'Quản trị'){
                                    approvers.push(data);
                                }
                                return null;
                            })
                        }
                        <div className="bg-primary text-white quantity-user">
                            <div>Tổng số người dùng</div>
                            <div>{user.length}</div>
                        </div>
                        <div className="bg-success text-white quantity-user">
                            <div>Tác Giả</div>
                            <div>{authors.length}</div>
                        </div>
                        <div className="bg-danger text-white quantity-user">
                            <div>Người Quản Trị</div>
                            <div>{approvers.length}</div>
                        </div>
                    </div>
                    <Switch>
                        <Route path={`${match.url}/:id`} component={ShowPermission} />
                    </Switch>
                </div>
            </div>
        );
    }else{
        window.location='/login'
        return null;
    }
}