import React, { useState } from 'react';
import '../css/style.css';
import Header from './header/Header';
import Footer from './footer/Footer';
import CategoryPost from './main/home/CategoryPost';
import ScrollUp from './scroll/ScrollUp';
import FeaturedPost from './main/home/FeaturedPost';
import NewPost from './main/home/NewPost';
import { useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [post, setPost] = useState([]);

    useEffect(() => {
        document.title = 'Tin tức tổng hợp 24h';

        axios.get('https://webnews-backend.herokuapp.com/api/post')
        .then(res => {
            setPost(res.data);
        })
        .catch(error => console.log(error));
    },[]);

    return (
        <>
            <Header />
            <main className="main-area">
                <div className="container">
                    <div className="hot-post">
                        <FeaturedPost posts={post}/>
                        <NewPost posts={post}/>
                    </div>
                    <div className="divider"></div>
                    <CategoryPost />
                </div>
            </main>
            <Footer />
            <ScrollUp />
        </>
    );
  }
  
  export default Home;