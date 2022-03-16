import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useParams } from "react-router";

export default function ApprovedPost(){

    let stt = 0;
    const [post,setPost] = useState([]);
    const [subcategory,setSubcategory] = useState([]);
    let { id } = useParams();
    let sumPost = [];
    let limit5 = 0;

    stt = (id - 1) * 5;

    const [keyWord, setKeyWord] = useState(' ');

    function handleChangeWord(e){
        var str = e.target.value.trim().replace(/\s/g, ' ');
        setKeyWord(str.replace(' ', '+'));
    }

    useEffect(() => {
        axios.get('https://webnews-backend.herokuapp.com/api/post')
        .then(res => {
            setPost(res.data);
        })
        .catch(error => console.log(error));

        axios.get('https://webnews-backend.herokuapp.com/api/subcategory')
        .then(res => {
            setSubcategory(res.data);
        })
        .catch(error => console.log(error));
    },[]);

    function handleClickCancel(e, id){
        post.map((data) => {
            if(id === data.id){
                var isCancel = window.confirm('Hủy bỏ bài viết này?');
                if(isCancel){
                    const pst = {
                        title: data.title,
                        description: data.description,
                        image: data.image,
                        content: data.content,
                        time_created: data.time_created,
                        id_subcategory: data.id_subcategory,
                        id_user: data.id_user,
                        status: '-1'
                    };
                    axios.put(`https://webnews-backend.herokuapp.com/api/post/${data.id}`, pst)
                    .then(res => {
                        console.log(res.data);
                        //window.location.reload();
                        axios.get('https://webnews-backend.herokuapp.com/api/post')
                        .then(res => {
                            setPost(res.data);
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
                    <div className="col-md-12">
                        <div className="my-table-cate">
                            <div className="my-card-header"><b>BÀI VIẾT ĐÃ DUYỆT</b></div>
                            <div className="card-body">
                                <div className="search-form w-50 mb-3">
                                    <form>
                                        <input type="search" name="search" className="form-control" placeholder="Tìm kiếm" onChange={handleChangeWord}/>
                                        <Link to={`/admin/search-approved-post/${keyWord}/1`}><i className="fa fa-search"></i></Link>
                                    </form>
                                </div>
                                <table className="table size-text-table">
                                    <thead className="bg-primary text-white">
                                        <tr>
                                            <th scope="col">Stt</th>
                                            <th scope="col">Tiêu đề</th>
                                            <th scope="col">Ảnh</th>
                                            <th scope="col">Mô tả</th>
                                            <th scope="col">Ngày tạo</th>
                                            <th scope="col">Chủ đề</th>
                                            <th scope="col">Hủy bỏ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            post.map((data) => {
                                                if(data.status === '1'){
                                                    sumPost.push(data);
                                                }
                                                return null;
                                            })
                                        }
                                        {
                                            sumPost.map((data, index) => {
                                                if(limit5 < 5 && index >= (5 * (id - 1))){
                                                    stt++;
                                                    limit5++;
                                                    return (
                                                        <React.Fragment key={data.id}>
                                                            <tr>
                                                                <td><Link to={"/post-detail/"+data.id} target="_blank">{stt}</Link></td>
                                                                <td><Link to={"/post-detail/"+data.id} target="_blank">{data.title}</Link></td>
                                                                <td><Link to={"/post-detail/"+data.id} target="_blank"><img src={data.image} alt=""/></Link></td>
                                                                <td><Link to={"/post-detail/"+data.id} target="_blank">{data.description.substr(0,100)}...</Link></td>
                                                                <td><Link to={"/post-detail/"+data.id} target="_blank">{data.time_created}</Link></td>
                                                                <td>
                                                                    <Link to={"/post-detail/"+data.id} target="_blank">
                                                                    {
                                                                        subcategory.map((item) => {
                                                                            if(item.id === data.id_subcategory){
                                                                                return (
                                                                                    <React.Fragment key={item.id}>
                                                                                        {item.title}
                                                                                    </React.Fragment>
                                                                                );
                                                                            }else return null;
                                                                        })
                                                                    }
                                                                    </Link>
                                                                </td>
                                                                <td>
                                                                    <div className="form-group">
                                                                        <button type="submit" className="btn btn-light btn-sm mt-2" onClick={(e) => {handleClickCancel(e, data.id)}}><i className="fa fa-ban text-danger size-btn-edit" aria-hidden="true"></i></button>
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
                                        <li className="page-item"><Link className="page-link" to={'/admin/approved-post/'+(id > 1 ? (parseInt(id) - 1) : 1)}>&laquo;</Link></li>
                                        {
                                            sumPost.map((data, index) => {
                                                if( index < (sumPost.length/5) ){
                                                    return(
                                                        <li key={index} className="page-item"><Link className="page-link" to={'/admin/approved-post/'+(index + 1)}>{index + 1}</Link></li>
                                                    );
                                                }else return null;
                                            })
                                        }
                                        <li className="page-item"><Link className="page-link" to={'/admin/approved-post/'+(id < (sumPost.length/5) ? (parseInt(id) + 1) : id)}>&raquo;</Link></li>
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