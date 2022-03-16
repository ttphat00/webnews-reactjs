import React, { useState } from 'react';
import '../css/style.css';
import Header from './header/Header';
import Footer from './footer/Footer';
import ScrollUp from './scroll/ScrollUp';
import { useEffect } from 'react';
import PostDetail from './main/post/PostDetail';
import PostList from './main/category/PostList';
import axios from 'axios';
import { useParams } from 'react-router';

function Single() {
    const [post, setPost] = useState({});
    let { id } = useParams();

    useEffect(() => {
        axios.get(`https://webnews-backend.herokuapp.com/api/post/${id}`)
        .then(res => {
            setPost(res.data);
            document.title = res.data.title;
        })
        .catch(error => console.log(error));
    },[id]);

    return (
        <>
            <Header />
            <main className="main-area">
                <div className="container">
                    <PostDetail idPost={post}/>
                    <div className="divider"></div>
                    <PostList idCate={post.id_subcategory} idPost={post.id}/>
                </div>
            </main>
            <Footer />
            <ScrollUp />
        </>
    );
  }
  
  export default Single;