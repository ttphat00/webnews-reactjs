import React from 'react';
import '../css/style.css';
import Header from './header/Header';
import Footer from './footer/Footer';
import ScrollUp from './scroll/ScrollUp';
import CategoryTitle from './main/category/CategoryTitle';
//import FeaturedPost from './main/home/FeaturedPost';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

function Category() {
    const [category, setCategory] = useState({});
    const [subcategory, setSubcategory] = useState([]);
    const [post, setPost] = useState([]);
    let { id, idpage } = useParams();
    let sumPost = [];
    let limit5 = 0;

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}category/${id}`)
        .then(res => {
            document.title ='Tin tức '+ res.data.title;
            setCategory(res.data);
            axios.get(`${process.env.REACT_APP_API_URL}subcategory`)
            .then(res => {
                setSubcategory(res.data);
                axios.get(`${process.env.REACT_APP_API_URL}post`)
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
                    <CategoryTitle cate={category} subCate={subcategory}/>
                    {/* <div className="hot-post">
                        <FeaturedPost />
                    </div> */}
                    {/* <div className="divider"></div> */}
                    <div className="cp-post-list">
                        {
                            subcategory.map((data) => {
                                if(data.id_category === category.id && data.status === '1'){
                                    return(
                                        <React.Fragment key={data.id}>
                                            {
                                                post.map((item) => {
                                                    if(item.id_subcategory === data.id && item.status === '1'){
                                                        sumPost.push(item);
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
                            <li className="page-item"><Link className="page-link" to={'/category/'+id+'/'+(idpage > 1 ? (parseInt(idpage) - 1) : 1)}>&laquo;</Link></li>
                            {
                                sumPost.map((data, index) => {
                                    if( index < (sumPost.length/5) ){
                                        return(
                                            <li key={index} className="page-item"><Link className="page-link" to={'/category/'+id+'/'+(index + 1)}>{index + 1}</Link></li>
                                        );
                                    }else return null;
                                })
                            }
                            <li className="page-item"><Link className="page-link" to={'/category/'+id+'/'+(idpage < (sumPost.length/5) ? (parseInt(idpage) + 1) : idpage)}>&raquo;</Link></li>
                        </ul>
                    </nav>
                </div>
            </main>
            <Footer />
            <ScrollUp />
        </>
    );
  }
  
  export default Category;