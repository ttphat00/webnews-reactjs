import React, { useEffect, useState } from 'react';
import CategoryPostTitle from './CategoryPostTitle';
import CategoryPostList from './CategoryPostList';
import axios from "axios";

function CategoryPost() {
    const [category, setCategory] = useState([]);
    const [subcategory, setSubcategory] = useState([]);
    const [post, setPost] = useState([]);

    useEffect(() => {
        axios.get('https://webnews-backend.herokuapp.com/api/category')
        .then(res => {
            setCategory(res.data);
            axios.get('https://webnews-backend.herokuapp.com/api/subcategory')
            .then(res => {
                setSubcategory(res.data);
                axios.get('https://webnews-backend.herokuapp.com/api/post')
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