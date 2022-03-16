import React from 'react';
import '../css/style.css';
import Header from './header/Header';
import Footer from './footer/Footer';
import ScrollUp from './scroll/ScrollUp';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

function Search() {
    const [post, setPost] = useState([]);
    let { title, idpage } = useParams();
    let sumPost = [];
    let limit5 = 0;

    useEffect(() => {
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
                    <div className="cp-title">
                        {
                            post.map((data) => {
                                if(data.title.indexOf(title.replace('+', ' ')) !== -1 || data.description.indexOf(title.replace('+', ' ')) !== -1 || data.content.indexOf(title.replace('+', ' ')) !== -1){
                                    sumPost.push(data);
                                }
                                return null;
                            })
                        }
                        <div className="cp-category-title"><b>Có {sumPost.length} kết quả cho từ khóa "{title.replace('+', ' ')}"</b></div>
                        <div className="cp-subcategory-title"></div>
                    </div>
                    <div className="cp-post-list">
                        {
                            sumPost.map((data, index) => {
                                if(limit5 < 5 && index >= (5 * (idpage - 1))){
                                    limit5++;
                                    return (
                                        <React.Fragment key={data.id}>
                                            <div className="cp-one-post">
                                                <Link to={'/post/'+ data.id}><div className="cp-post-img"><img src={data.image} alt=""/></div></Link>
                                                <div className="cp-post-content">
                                                    <h5><Link to={'/post/'+ data.id}>{data.title}</Link></h5>
                                                    <p><Link to={'/post/'+ data.id}>{data.description}</Link></p>
                                                    <div className="cp-post-time">{data.time_created}</div>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    );
                                }else return null;
                            })
                        }
                    </div>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            {
                                sumPost.map((data, index) => {
                                    if( index < (sumPost.length/5) ){
                                        return(
                                            <li key={index} className="page-item"><Link className="page-link" to={'/search/'+title+'/'+(index + 1)}>{index + 1}</Link></li>
                                        );
                                    }else return null;
                                })
                            }
                        </ul>
                    </nav>
                </div>
            </main>
            <Footer />
            <ScrollUp />
        </>
    );
  }
  
  export default Search;