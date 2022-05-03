import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/logo.png';

function Footer() {
    return (
        <>
            <footer className="footer-area">
                <div className="container">
                    <div className="footer-col-left">
                        <div className="footer-logo">
                        <Link to='/'><img src={logo} alt=""/></Link>
                        </div>
                        <div className="footer-content">
                            <ul className="list">
                                <li>Địa chỉ: Ninh Kiều, Cần Thơ</li>
                                <li>Email: <Link to='#'>ttphat@gmail.com</Link></li>
                                <li>Điện thoại: <Link to="#">012 345 6789</Link></li>
                                <li><Link to="#">Chính sách quyền riêng tư</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-col-right">
                        <div className="f-y">
                            <p>Theo dõi NEWS trên:</p>
                            <p>Facebook <Link to="#"><i className="fa fa-facebook-square"></i></Link></p>
                            <p>Youtube <Link to="#"><i className="fa fa-youtube-square"></i></Link></p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
  }
  
  export default Footer;