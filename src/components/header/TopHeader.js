import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/logo.png';

function TopHeader() {
    const [keyWord, setKeyWord] = useState(' ');

    function handleChangeWord(e){
        var str = e.target.value.trim().replace(/\s/g, ' ');
        setKeyWord(str.replace(' ', '+'));
    }

    return (
        <div className="top-header">
            <div className="container">
                <div className="logo">
                    <Link to='/'><img src={logo} alt=""/></Link>
                </div>
                <div className="search-form mysearch ">
                    <form>
                        <input type="search" name="search" className="form-control" placeholder="Tìm kiếm" onChange={handleChangeWord}/>
                        <Link to={`/search/${keyWord}/1`}><button><i className="fa fa-search"></i></button></Link>
                    </form>
                </div>
                <div className="mt-4 ml-5">
                    <Link to="/login" style={{textDecoration: 'none'}}>Login</Link>
                </div>
                <div className="mt-4 ml-4">
                    <Link to="/system-admin" style={{textDecoration: 'none'}}>System-Admin</Link>
                </div>
            </div>
        </div>
    );
  }
  
  export default TopHeader;