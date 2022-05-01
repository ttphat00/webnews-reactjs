import { useEffect, useState } from "react";
import axios from "axios";

export default function AuthorInfo(){
    const [category, setCategory] = useState([]);
    const [subcategory, setSubcategory] = useState([]);
    const [post, setPost] = useState([]);
    const [user, setUser] = useState({result:{id:''}});
    let myToken = JSON.parse(localStorage.getItem('token'));
    const sum_cate = [];
    const approving_cate = [];
    const approved_cate = [];
    const cancel_cate = [];
    const posts = [];
    const approving_post = [];
    const approved_post = [];
    const cancel_post = [];

    useEffect(() => {
        axios.get('https://webnews-backend.herokuapp.com/api/category')
        .then(res => {
            setCategory(res.data);
        })
        .catch(error => console.log(error));

        axios.get('https://webnews-backend.herokuapp.com/api/subcategory')
        .then(res => {
            setSubcategory(res.data);
        })
        .catch(error => console.log(error))

        axios.get('https://webnews-backend.herokuapp.com/api/post')
        .then(res => {
            setPost(res.data);
        })
        .catch(error => console.log(error))

        axios.get(`https://webnews-backend.herokuapp.com/api/user-info?token=${myToken.token}`)
        .then(res => {
            setUser(res.data);
        })
        .catch(error => console.log(error));
    }, [myToken.token])

    return (
        <>
            {
                category.map((data) => {
                    if(data.id_user === user.result.id){
                        sum_cate.push(data);
                    }
                    return null;
                })
            }
            {
                subcategory.map((data) => {
                    if(data.id_user === user.result.id){
                        sum_cate.push(data);
                    }
                    return null;
                })
            }
            {
                post.map((data) => {
                    if(data.id_user === user.result.id){
                        posts.push(data);
                    }
                    return null;
                })
            }
            {
                posts.map((data) => {
                    if(data.status === '1'){
                        approved_post.push(data);
                    }else{
                        if(data.status === '0'){
                            approving_post.push(data);
                        }else{
                            cancel_post.push(data);
                        }
                    }
                    return null;
                })
            }
            {
                sum_cate.map((data) => {
                    if(data.status === '1'){
                        approved_cate.push(data);
                    }else{
                        if(data.status === '0'){
                            approving_cate.push(data);
                        }else{
                            cancel_cate.push(data);
                        }
                    }
                    return null;
                })
            }
            
            <div className="d-flex justify-content-center all-post">
                <div className="bg-info text-white quantity-cate">
                    <div>Tổng số chủ đề</div>
                    <div>{sum_cate.length}</div>
                </div>
                <div className="bg-warning text-white quantity-cate">
                    <div>Chủ đề chờ duyệt</div>
                    <div>{approving_cate.length}</div>
                </div>
                <div className="bg-success text-white quantity-cate">
                    <div>Chủ đề đã duyệt</div>
                    <div>{approved_cate.length}</div>
                </div>
                <div className="bg-danger text-white quantity-cate">
                    <div>Chủ đề bị hủy</div>
                    <div>{cancel_cate.length}</div>
                </div>
            </div>
        
            <div className="d-flex justify-content-center all-post2">
                <div className="bg-info text-white quantity-post">
                    <div>Tổng số bài viết</div>
                    <div>{posts.length}</div>
                </div>
                <div className="bg-warning text-white quantity-post">
                    <div>Bài viết chờ duyệt</div>
                    <div>{approving_post.length}</div>
                </div>
                <div className="bg-success text-white quantity-post">
                    <div>Bài viết đã duyệt</div>
                    <div>{approved_post.length}</div>
                </div>
                <div className="bg-danger text-white quantity-post">
                    <div>Bài viết bị hủy</div>
                    <div>{cancel_post.length}</div>
                </div>
            </div>
        </>
    )
}