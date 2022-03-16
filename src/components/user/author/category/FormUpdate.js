import React, { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';

export default function FormUpdate(props){

    const [title,setTitle] = useState('');
    const [cate,setCate] = useState({});
    const [user, setUser] = useState({});
    let myToken = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        props.valueShow(true);
    
        axios.get(`https://webnews-backend.herokuapp.com/api/user-info?token=${myToken.token}`)
        .then(res => {
            setUser(res.data);
            axios.get(`https://webnews-backend.herokuapp.com/api/category/${props.valueId}`)
            .then(res => {
                setCate(res.data);
                setTitle(res.data.title);
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
        
    },[myToken.token, props]);

    function handleChangeTitle(e){
        setTitle(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();

        const category = {
            title: title,
            id_user: user.result.id,
            status: '0'
        };

        axios.put(`https://webnews-backend.herokuapp.com/api/category/${props.valueId}`, category)
        .then(res => {
            console.log(res.data);
        })
        alert('Cập nhật thành công');
        window.location.reload();
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="category_title">Chủ đề</label>
                    <input className="form-control" name="category_title" onChange={handleChangeTitle} defaultValue={cate.title} required/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary mt-2">Cập nhật</button>
                </div>
            </form>
        </>
    );
}