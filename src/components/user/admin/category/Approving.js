import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useParams } from "react-router";

export default function Approving(){

    let stt = 0;
    const [category,setCategory] = useState([]);
    const [subcategory,setSubcategory] = useState([]);
    let { id } = useParams();
    let sumCate = [];
    let limit5 = 0;

    stt = (id - 1) * 5;

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}category`)
        .then(res => {
            setCategory(res.data);
        })
        .catch(error => console.log(error));

        axios.get(`${process.env.REACT_APP_API_URL}subcategory`)
        .then(res => {
            setSubcategory(res.data);
        })
        .catch(error => console.log(error));
    },[]);

    function handleClickCancel(e, id, tt){
        category.map((data) => {
            if(id === data.id && data.title === tt){
                var isCancel = window.confirm('Hủy bỏ chủ đề này?');
                if(isCancel){
                    const cate = {
                        title: data.title,
                        id_user: data.id_user,
                        status: '-1'
                    };
                    axios.put(`${process.env.REACT_APP_API_URL}category/${data.id}`, cate)
                    .then(res => {
                        console.log(res.data);
                        //window.location.reload();
                        axios.get(`${process.env.REACT_APP_API_URL}category`)
                        .then(res => {
                            setCategory(res.data);
                        })
                        .catch(error => console.log(error));
                    })
                }
            }
            return null;
        });
        subcategory.map((data) => {
            if(id === data.id && data.title === tt){
                var isCancel = window.confirm('Hủy bỏ chủ đề này?');
                if(isCancel){
                    const subcate = {
                        title: data.title,
                        id_category: data.id_category,
                        id_user: data.id_user,
                        status: '-1'
                    };
                    axios.put(`${process.env.REACT_APP_API_URL}subcategory/${data.id}`, subcate)
                    .then(res => {
                        console.log(res.data);
                        //window.location.reload();
                        axios.get(`${process.env.REACT_APP_API_URL}subcategory`)
                        .then(res => {
                            setSubcategory(res.data);
                        })
                        .catch(error => console.log(error));
                    })
                }
            }
            return null;
        });
    }

    function handleClickAccept(e, id, tt){
        category.map((data) => {
            if(id === data.id && data.title === tt){
                var isAccept = window.confirm('Duyệt chủ đề này?');
                if(isAccept){
                    const cate = {
                        title: data.title,
                        id_user: data.id_user,
                        status: '1'
                    };
                    axios.put(`${process.env.REACT_APP_API_URL}category/${data.id}`, cate)
                    .then(res => {
                        console.log(res.data);
                        //window.location.reload();
                        axios.get(`${process.env.REACT_APP_API_URL}category`)
                        .then(res => {
                            setCategory(res.data);
                        })
                        .catch(error => console.log(error));
                    })
                }
            }
            return null;
        });
        subcategory.map((data) => {
            if(id === data.id && data.title === tt){
                var isAccept = window.confirm('Duyệt chủ đề này?');
                if(isAccept){
                    const subcate = {
                        title: data.title,
                        id_category: data.id_category,
                        id_user: data.id_user,
                        status: '1'
                    };
                    axios.put(`${process.env.REACT_APP_API_URL}subcategory/${data.id}`, subcate)
                    .then(res => {
                        console.log(res.data);
                        //window.location.reload();
                        axios.get(`${process.env.REACT_APP_API_URL}subcategory`)
                        .then(res => {
                            setSubcategory(res.data);
                        })
                        .catch(error => console.log(error));
                    })
                }
            }
            return null;
        });
    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="my-table-cate">
                            <div className="my-card-header"><b>CHỦ ĐỀ CHỜ DUYỆT</b></div>
                            <div className="card-body">
                                <table className="table">
                                    <thead className="bg-primary text-white">
                                        <tr>
                                            <th scope="col">Stt</th>
                                            <th scope="col">Tiêu đề</th>
                                            <th scope="col">Chấp nhận / Hủy bỏ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            category.map((data) => {
                                                if(data.status === '0'){
                                                    sumCate.push(data);
                                                } 
                                                return null;
                                            })
                                        }
                                        {
                                            category.map((data) => {
                                                if(data.status === '1'){
                                                    return (
                                                        <React.Fragment key={data.id}>
                                                            {
                                                                subcategory.map((item) => {
                                                                    if(item.status === '0' && item.id_category === data.id){
                                                                        sumCate.push(item);
                                                                    }
                                                                    return null;
                                                                })
                                                            }
                                                        </React.Fragment>
                                                    );
                                                }else return null;
                                            })
                                        }
                                        {
                                            sumCate.map((data, index) => {
                                                if(limit5 < 5 && index >= (5 * (id - 1))){
                                                    stt++;
                                                    limit5++;
                                                    return (
                                                        <React.Fragment key={index}>
                                                            <tr>
                                                                <td>{stt}</td>
                                                                <td>{data.title}</td>
                                                                <td>
                                                                    <div className="form-group">
                                                                        <button type="submit" className="btn btn-light btn-sm ml-5" onClick={(e) => {handleClickAccept(e, data.id, data.title)}}><i className="fa fa-check-square-o text-success size-btn-edit" aria-hidden="true"></i></button>
                                                                        <button type="submit" className="btn btn-light btn-sm" onClick={(e) => {handleClickCancel(e, data.id, data.title)}}><i className="fa fa-ban text-danger size-btn-edit" aria-hidden="true"></i></button>
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
                                        <li className="page-item"><Link className="page-link" to={'/admin/approving-category/'+(id > 1 ? (parseInt(id) - 1) : 1)}>&laquo;</Link></li>
                                        {
                                            sumCate.map((data, index) => {
                                                if( index < (sumCate.length/5) ){
                                                    return(
                                                        <li key={index} className="page-item"><Link className="page-link" to={'/admin/approving-category/'+(index + 1)}>{index + 1}</Link></li>
                                                    );
                                                }else return null;
                                            })
                                        }
                                        <li className="page-item"><Link className="page-link" to={'/admin/approving-category/'+(id < (sumCate.length/5) ? (parseInt(id) + 1) : id)}>&raquo;</Link></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}