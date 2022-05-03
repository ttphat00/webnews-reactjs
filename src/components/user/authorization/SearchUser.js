import React, { useEffect, useState } from "react";
import '../../../css/dashboard.css';
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router";

export default function SearchUser(){
    let stt = 0;
    const [users, setUsers] = useState([]);
    let { title, idpage } = useParams();
    let sumUser = [];
    let limit5 = 0;

    stt = (idpage - 1) * 5;

    const [keyWord, setKeyWord] = useState(' ');

    function handleChangeWord(e){
        var str = e.target.value.trim().replace(/\s/g, ' ');
        setKeyWord(str.replace(' ', '+'));
    }

    useEffect(() => {
        axios.get('https://webnews-backend.herokuapp.com/api/users')
        .then(res => {
            setUsers(res.data);
        })
        .catch(error => console.log(error));
    },[]);

    return (
        <div>
            <div className="admin-main">
                <div className="col-left bg-dark text-white">
                    <div className="card-header bg-dark h4">DASHBOARD</div>
                    <div className="card-body">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to={`/system-admin/1`}>Quản Lý Người Dùng</Link>
                                <Link className="nav-link" to="/register">Tạo Tài Khoản</Link>
                                <Link className="nav-link" to="/">Về Trang Chủ</Link>
                                <Link className="nav-link" to='/logout/system-admin'>Đăng xuất</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-11">
                            <div className="mt-3">
                                <div className="search-form w-50">
                                    <form>
                                        <input type="search" name="search" className="form-control" placeholder="Tìm kiếm" onChange={handleChangeWord}/>
                                        <Link to={`/sysad-search-user/${keyWord}/1`}><i className="fa fa-search"></i></Link>
                                    </form>
                                </div>
                                <div className="card-body">
                                    {
                                        users.map((data) => {
                                            if(data.name.indexOf(title.replace('+', ' ')) !== -1 || data.email.indexOf(title.replace('+', ' ')) !== -1 || data.permission.indexOf(title.replace('+', ' ')) !== -1){
                                                sumUser.push(data);
                                            }
                                            return null;
                                        })
                                    }
                                    <div className="cp-category-title"><b>{sumUser.length ? `Có ${sumUser.length} kết quả cho từ khóa "${title.replace('+', ' ')}"` : 'Đang tìm kiếm...'}</b></div>
                                    <table className="table">
                                        <thead className="bg-success text-white">
                                            <tr>
                                                <th scope="col">Stt</th>
                                                <th scope="col">Tên người dùng</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Quyền</th>
                                                <th scope="col">Sửa</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                sumUser.map((data, index) => {
                                                    if(limit5 < 5 && index >= (5 * (idpage - 1))){
                                                        stt++;
                                                        limit5++;
                                                        return (
                                                            <React.Fragment key={data.id}>
                                                                <tr>
                                                                    <td>{stt}</td>
                                                                    <td>{data.name}</td>
                                                                    <td>{data.email}</td>
                                                                    <td>{data.permission}</td>
                                                                    <td>
                                                                        <div className="form-group">
                                                                            <Link to={`/edit-permission/1/${data.id}`}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></Link>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </React.Fragment>
                                                        );
                                                    }else return null;
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination">
                                            <li className="page-item"><Link className="page-link" to={'/sysad-search-user/'+title+'/'+(idpage > 1 ? (parseInt(idpage) - 1) : 1)}>&laquo;</Link></li>
                                            {
                                                sumUser.map((data, index) => {
                                                    if( index < (sumUser.length/5) ){
                                                        return(
                                                            <li key={index} className="page-item"><Link className="page-link" to={'/sysad-search-user/'+title+'/'+(index + 1)}>{index + 1}</Link></li>
                                                        );
                                                    }else return null;
                                                })
                                            }
                                            <li className="page-item"><Link className="page-link" to={'/sysad-search-user/'+title+'/'+(idpage < (sumUser.length/5) ? (parseInt(idpage) + 1) : idpage)}>&raquo;</Link></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}