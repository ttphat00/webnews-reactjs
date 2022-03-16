import React, { useState } from 'react';
import '../../../../css/dashboard.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

function PostDetail() {
    const [post, setPost] = useState({title : ''});
    const [user, setUser] = useState({name : ''});
    let { id } = useParams();

    useEffect(() => {
        axios.get(`https://webnews-backend.herokuapp.com/api/post/${id}`)
        .then(res => {
            setPost(res.data);
            document.title = res.data.title;
            document.querySelector('.sp-post-content').innerHTML = res.data.content;
            axios.get(`https://webnews-backend.herokuapp.com/api/users/${res.data.id_user}`)
            .then(res => {
                setUser(res.data);
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    },[id]);

    return (
        <>
            {/* <main className="main-area"> */}
                <div className="container">
                    <div className="sp-detail w-75 bg-white">
                        <div className="sp-post-title w-100">
                            <h2>{post.title}</h2>
                        </div>
                        <div className="sp-post-content w-100"></div>
                        <div className="sp-author w-100"><b>{user.name}</b></div>
                    </div>
                </div>
            {/* </main> */}
        </>
    );
  }
  
  export default PostDetail;