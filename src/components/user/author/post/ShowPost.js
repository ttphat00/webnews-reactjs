import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useParams } from "react-router";

export default function ShowPost(props){

    let stt = 0;
    let sts = '';
    let colortxt = '';
    const [post,setPost] = useState([]);
    const [subcategory,setSubcategory] = useState([]);
    const [user, setUser] = useState({});
    let myToken = JSON.parse(localStorage.getItem('token'));
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
        axios.get(`https://webnews-backend.herokuapp.com/api/user-info?token=${myToken.token}`)
        .then(res => {
            setUser(res.data);

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
        })
        .catch(error => console.log(error));
    },[myToken.token]);

    function handleClickDelete(e, idPost){
        var isDelete = window.confirm('Đồng ý xóa bài viết này?');
        if(isDelete){
            axios.delete(`https://webnews-backend.herokuapp.com/api/post/${idPost}`)
            .then(res => {
                console.log(res.data);
                axios.get('https://webnews-backend.herokuapp.com/api/post')
                .then(res => {
                    setPost(res.data);
                })
                .catch(error => console.log(error));
            })
        }
    }

    function handleClickEdit(e, idPost){
        props.clickEdit(true);
        props.idValue(idPost);
    }

    return (
        <>
            <div className="search-form w-50 mb-3">
                <form>
                    <input type="search" name="search" className="form-control" placeholder="Tìm kiếm" onChange={handleChangeWord}/>
                    <Link to={`/author/search-post/${keyWord}/1`}><i className="fa fa-search"></i></Link>
                </form>
            </div>
            <table className="table size-text-table">
                <thead className="bg-primary text-white">
                    <tr>
                        <th scope="col">Stt</th>
                        <th scope="col">Tiêu đề</th>
                        <th scope="col">Hình ảnh</th>
                        <th scope="col">Mô tả ngắn</th>
                        <th scope="col">Ngày tạo</th>
                        <th scope="col">Chủ đề</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Sửa/Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        post.map((data) => {
                            if(user.result.id === data.id_user){
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
                                if(data.status === '0'){
                                    // sts = 'status-waiting';
                                    sts = 'Đang chờ duyệt';
                                    colortxt = 'yellow';
                                }else if(data.status === '1'){
                                    // sts = 'status-success';
                                    sts = 'Đã duyệt';
                                    colortxt = 'green';
                                }else {
                                    // sts = 'status-fail';
                                    sts = 'Không được duyệt';
                                    colortxt = 'red';
                                }

                                return (
                                    <React.Fragment key={data.id}>
                                        <tr className="">
                                            <td>{stt}</td>
                                            <td>{data.title}</td>
                                            <td><img src={data.image} alt=""/></td>
                                            <td>{data.description.substr(0,100)}...</td>
                                            <td>{data.time_created}</td>
                                            <td>
                                                {
                                                    subcategory.map((item) => {
                                                        if(item.id === data.id_subcategory && user.result.id === item.id_user){
                                                            return (
                                                                <React.Fragment key={item.id}>
                                                                    {item.title}
                                                                </React.Fragment>
                                                            );
                                                        }else return null;
                                                    })
                                                }
                                            </td>
                                            <td style={{color: colortxt}}>{sts}</td>
                                            <td>
                                                <div className="form-group">
                                                    <button type="submit" className="btn btn-link btn-sm" onClick={(e) => {handleClickEdit(e, data.id)}}><i className="fa fa-pencil-square-o text-primary size-btn-edit" aria-hidden="true"></i></button>
                                                    <button type="submit" className="btn btn-link btn-sm" onClick={(e) => {handleClickDelete(e, data.id)}}><i className="fa fa-trash-o text-danger size-btn-edit" aria-hidden="true"></i></button>
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
                    <li className="page-item"><Link className="page-link" to={'/author/post/'+(id > 1 ? (parseInt(id) - 1) : 1)}>&laquo;</Link></li>
                    {
                        sumPost.map((data, index) => {
                            if( index < (sumPost.length/5) ){
                                return(
                                    <li key={index} className="page-item"><Link className="page-link" to={'/author/post/'+(index + 1)}>{index + 1}</Link></li>
                                );
                            }else return null;
                        })
                    }
                    <li className="page-item"><Link className="page-link" to={'/author/post/'+(id < (sumPost.length/5) ? (parseInt(id) + 1) : id)}>&raquo;</Link></li>
                </ul>
            </nav>
        </>
    );
}