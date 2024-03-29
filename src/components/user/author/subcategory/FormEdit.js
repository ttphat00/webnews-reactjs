import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function FormEdit(props){

    const [key,setKey] = useState('');
    const [subcategory,setSubcategory] = useState([]);
    const [user, setUser] = useState({});
    let myToken = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        
        axios.get(`${process.env.REACT_APP_API_URL}user-info?token=${myToken.token}`)
        .then(res => {
            setUser(res.data);
            axios.get(`${process.env.REACT_APP_API_URL}subcategory`)
            .then(res => {
                setSubcategory(res.data);
                setKey(document.querySelector('select').value);
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
        
    },[myToken.token]);

    function handleClick(e){
        e.preventDefault();
        props.clickEdit(true);
        props.keyValue(key);
        props.titleValue(document.querySelector(`option[value="${key}"]`).textContent);
    }

    function handleChangeKey(e){
        setKey(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();

        var isDelete = window.confirm('Đồng ý xóa chủ đề con này?');
        if(isDelete){
            axios.delete(`${process.env.REACT_APP_API_URL}subcategory/${key}`)
            .then(res => {
                console.log(res.data);
                axios.get(`${process.env.REACT_APP_API_URL}subcategory`)
                .then(res => {
                    setSubcategory(res.data);
                    setKey(document.querySelector('select').value);
                })
                .catch(error => console.log(error));
            })
            .catch(() => alert('Bạn phải xóa những bài viết thuộc chủ đề này trước'));
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="subcategory_title">Chủ đề con</label>
                    <select className="form-control" name="subcategory_title" onChange={handleChangeKey}>
                        {
                            subcategory.map((data) => {
                                
                                if(user.result.id === data.id_user){
                                    return (
                                        <React.Fragment key={data.id}>
                                            <option value={data.id}>{data.title}</option>
                                        </React.Fragment>
                                    );
                                }else return null;
                                
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-light" onClick={handleClick}><i className="fa fa-pencil-square-o text-primary size-btn-edit" aria-hidden="true"></i></button>
                    <button type="submit" className="btn btn-light"><i className="fa fa-trash-o text-danger size-btn-edit" aria-hidden="true"></i></button>
                </div>
            </form>
        </>
    );
}