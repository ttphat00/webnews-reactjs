import React, { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';

export default function FormUpdate(props){

    const [title,setTitle] = useState('');
    const [subcate,setSubcate] = useState({});
    const [user, setUser] = useState({});
    let myToken = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        props.valueShow(true);

        axios.get(`https://webnews-backend.herokuapp.com/api/user-info?token=${myToken.token}`)
        .then(res => {
            setUser(res.data);
            axios.get(`https://webnews-backend.herokuapp.com/api/subcategory/${props.valueId}`)
            .then(res => {
                setSubcate(res.data);
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

        const subcategory = {
            title: title,
            id_category: subcate.id_category,
            id_user: user.result.id,
            status: '0'
        };

        axios.put(`https://webnews-backend.herokuapp.com/api/subcategory/${props.valueId}`, subcategory)
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
                    <label htmlFor="subcategory_title">Chủ đề con</label>
                    <input className="form-control" name="subcategory_title" onChange={handleChangeTitle} defaultValue={props.valueTitle} required/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary mt-2">Cập nhật</button>
                </div>
            </form>
        </>
    );
}