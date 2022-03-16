import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import logo from '../../../img/logo.png';

export default function NavbarAdmin(){
    const [user, setUser] = useState({});
    const [isShow, setIsShow] = useState(false);
    let myToken = JSON.parse(localStorage.getItem('admin'));

    useEffect(() => {
        
        axios.get(`https://webnews-backend.herokuapp.com/api/user-info?token=${myToken.token}`)
        .then(res => {
            setUser(res.data);
            setIsShow(true);
        })
        .catch(error => console.log(error));
        
    },[myToken.token]);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img className="logo-dashboard" src={logo} alt=""></img>
                </Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown">
                            <span className="nav-link dropdown-toggle text-white" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {isShow ? user.result.name : null}
                            </span>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/logout/admin">Đăng xuất</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}