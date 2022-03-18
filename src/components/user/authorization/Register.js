import React, { useState } from "react";
import '../../../css/dashboard.css';
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register(){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [pass,setPass] = useState('');

    function handleChangeName(e){
        setName(e.target.value);
    }
    function handleChangeEmail(e){
        setEmail(e.target.value);
    }
    function handleChangePass(e){
        setPass(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();

        const user = {
            name: name,
            email: email,
            password: pass,
            permission: 'Tác giả'
        };

        axios.post('https://webnews-backend.herokuapp.com/api/register', user)
        .then(res => {
            console.log(res.data);
            alert('Đăng ký thành công');
            window.location='/register';
        })
        .catch(() => alert('Đăng ký thất bại'));
    }

    return (
        <div>
            <div className="admin-main">
                <div className="col-left bg-dark text-white">
                    <div className="card-header bg-dark"><Link className="nav-link" to="/system-admin">DASHBOARD</Link></div>
                    <div className="card-body">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/system-admin/1">Quản Lý Người Dùng</Link>
                                <Link className="nav-link" to="/register">Tạo Tài Khoản</Link>
                                <Link className="nav-link" to="/">Về Trang Chủ</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div>
                                <div className="card-header bg-dark text-white">Tạo tài khoản</div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group row">
                                            <label htmlFor="name" className="col-sm-3 col-form-label">Tên người dùng</label>
                                            <div className="col-sm-5">
                                                <input type="text" className="form-control" name="name" placeholder="Họ tên" onChange={handleChangeName} required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                                            <div className="col-sm-5">
                                                <input type="text" className="form-control" name="email" placeholder="Email" onChange={handleChangeEmail} required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="old_perm" className="col-sm-3 col-form-label">Mật khẩu</label>
                                            <div className="col-sm-5">
                                                <input type="text" className="form-control" name="old_perm" placeholder="Mật khẩu" onChange={handleChangePass}required/>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary mt-3 update-user">Tạo</button>
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