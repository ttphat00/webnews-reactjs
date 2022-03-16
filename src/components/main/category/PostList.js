import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PostList(props){
    const [post, setPost] = useState([]);

    useEffect(() => {
        axios.get('https://webnews-backend.herokuapp.com/api/post')
        .then(res => {
            setPost(res.data);
        })
        .catch(error => console.log(error));
    },[]);

    return (
        <div className="cp-post-list">
            {
                post.map((item) => {
                    if(item.id_subcategory === props.idCate && item.id !== props.idPost && item.status === '1'){
                        return(
                            <React.Fragment key={item.id}>
                                <div className="cp-one-post">
                                    <Link to={'/post/'+ item.id}><div className="cp-post-img"><img src={item.image} alt=""/></div></Link>
                                    <div className="cp-post-content">
                                        <h5><Link to={'/post/'+ item.id}>{item.title}</Link></h5>
                                        <p><Link to={'/post/'+ item.id}>{item.description}</Link></p>
                                        <div className="cp-post-time">{item.time_created}</div>
                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    }else return null;
                })       
            }
        </div>
    );
}