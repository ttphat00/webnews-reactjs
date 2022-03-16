import React from 'react';
import '../css/style.css';
import Header from './header/Header';
import Footer from './footer/Footer';
import ScrollUp from './scroll/ScrollUp';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

function Subcategory() {
    const [category, setCategory] = useState([]);
    const [subcategory, setSubcategory] = useState({});
    const [post, setPost] = useState([]);
    let { id, idpage } = useParams();
    let sumPost = [];
    let limit5 = 0;

    useEffect(() => {
        axios.get(`https://webnews-backend.herokuapp.com/api/subcategory/${id}`)
        .then(res => {
            document.title ='Tin tức '+ res.data.title;
            setSubcategory(res.data);
            axios.get('https://webnews-backend.herokuapp.com/api/category')
            .then(res => {
                setCategory(res.data);
                axios.get('https://webnews-backend.herokuapp.com/api/post')
                .then(res => {
                    setPost(res.data);
                })
                .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    },[id]);

    return (
        <>
            <Header />
            <main className="main-area">
                <div className="container">
                    <div className="cp-title">
                        {
                            category.map((data) => {
                                if(data.id === subcategory.id_category){
                                    return(
                                        <React.Fragment key={data.id}>
                                            <div className="cp-category-title"><Link to={'/category/'+data.id+'/1'}><b>{data.title}</b></Link> &gt; <span>{subcategory.title}</span></div>
                                        </React.Fragment>
                                    );
                                }else return null;
                            })
                        }
                        <div className="cp-subcategory-title"></div>
                    </div>
                    <div className="cp-post-list">
                        {
                            post.map((item) => {
                                if(item.id_subcategory === subcategory.id && item.status === '1'){
                                    sumPost.push(item);
                                }
                                return null;
                            })
                        }
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
                            <li className="page-item"><Link className="page-link" to={'/subcategory/'+id+'/'+(idpage > 1 ? (parseInt(idpage) - 1) : 1)}>&laquo;</Link></li>
                            {
                                sumPost.map((data, index) => {
                                    if( index < (sumPost.length/5) ){
                                        return(
                                            <li key={index} className="page-item"><Link className="page-link" to={'/subcategory/'+id+'/'+(index + 1)}>{index + 1}</Link></li>
                                        );
                                    }else return null;
                                })
                            }
                            <li className="page-item"><Link className="page-link" to={'/subcategory/'+id+'/'+(idpage < (sumPost.length/5) ? (parseInt(idpage) + 1) : idpage)}>&raquo;</Link></li>
                        </ul>
                    </nav>
                </div>
            </main>
            <Footer />
            <ScrollUp />
        </>
    );
  }
  
  export default Subcategory;