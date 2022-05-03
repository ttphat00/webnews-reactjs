import React from "react";
import '../css/dashboard.css';
import { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

export default function Login(){
    const [email,setEmail] = useState('');
    const [pass,setPass] = useState('');

    function handleChangeEmail(e){
        setEmail(e.target.value);
    }
    function handleChangePass(e){
        setPass(e.target.value);
    }
    function handleSubmit(e){
        e.preventDefault();

        const user = {
            email: email,
            password: pass
        };

        axios.post('https://webnews-backend.herokuapp.com/api/login', user)
        .then(res => {
            axios.get(`https://webnews-backend.herokuapp.com/api/user-info?token=${res.data.token}`)
            .then(response => {
                if(response.data.result.permission === 'Tác giả'){
                    localStorage.setItem("token", JSON.stringify(res.data));
                    console.log(res.data);
                    window.location='/author/my-dashboard';
                }else 
                    if(response.data.result.permission === 'Kiểm duyệt'){
                        localStorage.setItem("admin", JSON.stringify(res.data));
                        console.log(res.data);
                        window.location='/admin/my-dashboard';
                    }else{
                        localStorage.setItem("system_admin", JSON.stringify(res.data));
                        console.log(res.data);
                        window.location='/system-admin/1';
                    }
            })
            .catch(error => console.log(error));
            
        })
        .catch(() => {alert('Tài khoản hoặc mật khẩu không đúng');});
    }

    return (
        <div className="bg-login">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 mt-5">
                        <div className="card">
                            <div className="card-header bg-dark text-white">Đăng nhập <Link to="/" style={{marginLeft: '440px', textDecoration: 'none'}}>Trang chủ</Link></div>
                            <div className="card-body mt-3 mb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                                        <div className="col-sm-7">
                                            <input type="email" className="form-control" name="email" placeholder="Email" onChange={handleChangeEmail} required/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="password" className="col-sm-3 col-form-label">Mật khẩu</label>
                                        <div className="col-sm-7">
                                            <input type="password" className="form-control" name="password" placeholder="Mật khẩu" onChange={handleChangePass}required/>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-login">Đăng nhập</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}