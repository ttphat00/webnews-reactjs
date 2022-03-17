import React, { useEffect, useState } from "react";
import '../../../css/dashboard.css';
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router";

export default function ShowPermission(){
    let stt = 0;
    const [users, setUsers] = useState([]);
    let { id } = useParams();
    let limit5 = 0;

    stt = (id - 1) * 5;

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
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-11 table-user">
                    <div className="search-form w-50">
                        <form>
                            <input type="search" name="search" className="form-control" placeholder="Tìm kiếm người dùng" onChange={handleChangeWord}/>
                            <Link to={`/sysad-search-user/${keyWord}/1`}><i className="fa fa-search"></i></Link>
                        </form>
                    </div>
                    <div className="card-body">
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
                                    users.map((data, index) => {
                                        if(limit5 < 5 && index >= (5 * (id - 1))){
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
                                                                <Link to={`/edit-permission/${id}/${data.id}`}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></Link>
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
                                <li className="page-item"><Link className="page-link" to={'/system-admin/'+(id > 1 ? (parseInt(id) - 1) : 1)}>&laquo;</Link></li>
                                {
                                    users.map((data, index) => {
                                        if( index < (users.length/5) ){
                                            return(
                                                <li key={index} className="page-item"><Link className="page-link" to={'/system-admin/'+(index + 1)}>{index + 1}</Link></li>
                                            );
                                        }else return null;
                                    })
                                }
                                <li className="page-item"><Link className="page-link" to={'/system-admin/'+(id < (users.length/5) ? (parseInt(id) + 1) : id)}>&raquo;</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}