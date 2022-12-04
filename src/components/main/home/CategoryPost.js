import React, { useEffect, useState } from 'react';
import CategoryPostTitle from './CategoryPostTitle';
import CategoryPostList from './CategoryPostList';
import axios from "axios";

function CategoryPost() {
    const [category, setCategory] = useState([]);
    const [subcategory, setSubcategory] = useState([]);
    const [post, setPost] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}category`)
        .then(res => {
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
    },[]);

    return (
        <>
        {
            category.map((data) => {
                if(data.status === '1'){
                    return(
                        <React.Fragment key={data.id}>
                            <div className="category-post">
                                <CategoryPostTitle idCate={data.id} titleCate={data.title} subCate={subcategory}/>
                                <CategoryPostList idCate={data.id} posts={post} subCate={subcategory}/>
                            </div>
                        </React.Fragment>
                    );
                }else return null;
            })
        }
        </>
    );
  }
  
  export default CategoryPost;