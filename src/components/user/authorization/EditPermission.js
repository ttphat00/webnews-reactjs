import React, { useEffect, useState } from "react";
import '../../../css/dashboard.css';
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export default function EditPermission(){
    const [user, setUser] = useState({});
    const [perm, setPerm] = useState('');
    let { idpage, id } = useParams();

    useEffect(() => {
        axios.get(`https://webnews-backend.herokuapp.com/api/users/${id}`)
        .then(res => {
            setUser(res.data);
            setPerm(res.data.permission);
        })
        .catch(error => console.log(error));
    },[id]);

    function clickBack(e){
        window.location = `/authorization/${idpage}`;
    }

    function handleChangePermission(e){
        setPerm(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();

        const userInfor = {
            name: user.name,
            email: user.email,
            permission: perm
        };
        axios.put(`https://webnews-backend.herokuapp.com/api/users/${id}`, userInfor)
        .then(res => {
            console.log(res.data);
            alert('Cập nhật thành công');
            window.location = `/authorization/${idpage}`;
        })
        .catch(() => alert('Cập nhật thất bại'));
    }

    return (
        <div>
            <div className="admin-main">
                <div className="col-left bg-dark text-white">
                    <div className="card-header bg-dark"><Link className="nav-link" to="/authorization">DASHBOARD</Link></div>
                    <div className="card-body">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/authorization/1">Quản Lý Người Dùng</Link>
                                <Link className="nav-link" to="/register">Tạo Tài Khoản</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div>
                                <div className="card-header bg-dark text-white">Cập nhật quyền <button type="submit" className="btn btn-dark" onClick={clickBack}><i className="fa fa-undo" aria-hidden="true"></i></button></div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group row">
                                            <label htmlFor="name" className="col-sm-3 col-form-label">Tên người dùng</label>
                                            <div className="col-sm-5">
                                                <input type="text" className="form-control" name="name" defaultValue={user.name} disabled/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                                            <div className="col-sm-5">
                                                <input type="text" className="form-control" name="email" defaultValue={user.email} disabled/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="old_perm" className="col-sm-3 col-form-label">Quyền hiện tại</label>
                                            <div className="col-sm-5">
                                                <input type="text" className="form-control" name="old_perm" defaultValue={user.permission} disabled/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="permission" className="col-sm-3 col-form-label">Quyền mới</label>
                                            <div className="col-sm-5">
                                                <select className="form-control" name="permission" value={perm} onChange={handleChangePermission}>
                                                    <option value="Tác giả">Tác giả</option>
                                                    <option value="Quản trị">Quản trị</option>
                                                </select>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary mt-3 update-user">Cập nhật</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}