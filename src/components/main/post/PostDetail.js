import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PostDetail(props){
    const [user, setUser] = useState({name : ''});
    const [subcategory, setSubcategory] = useState({});
    const [category, setCategory] = useState([]);

    useEffect(() => {
        document.querySelector('.sp-post-content').innerHTML = props.idPost.content;

        axios.get(`https://webnews-backend.herokuapp.com/api/users/${props.idPost.id_user}`)
        .then(res => {
            setUser(res.data);
            axios.get(`https://webnews-backend.herokuapp.com/api/subcategory/${props.idPost.id_subcategory}`)
            .then(res => {
                setSubcategory(res.data);
                axios.get('https://webnews-backend.herokuapp.com/api/category')
                .then(res => {
                    setCategory(res.data);
                })
                .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    },[props]);
    
    return (
        <div className="sp-detail">
            <div className="sp-category-time">
                <div className="sp-category"><Link to="/">Trang chủ</Link> &gt; <span>
                    {
                        category.map((data) => {
                            if(subcategory.id_category === data.id){
                                return(
                                    <React.Fragment key={data.id}>
                                        <Link to={'/category/'+data.id+'/1'}>{data.title}</Link>
                                    </React.Fragment>
                                );
                            }else return null;
                        })
                    }
                </span> &gt; <span><Link to={'/subcategory/'+subcategory.id+'/1'}>{subcategory.title}</Link></span></div>
                <div className="sp-time">{props.idPost.time_created}</div>
            </div>
            <div className="sp-post-title">
                <h2>{props.idPost.title}</h2>
            </div>
            <div className="sp-post-content"></div>
            <div className="sp-author"><b>{user.name}</b></div>
        </div>
    );
}