import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function CreateCategory(){

    const [title,setTitle] = useState('');
    const [user, setUser] = useState({});
    let myToken = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        
        axios.get(`${process.env.REACT_APP_API_URL}user-info?token=${myToken.token}`)
        .then(res => {
            setUser(res.data);
        })
        .catch(error => console.log(error));
        
    },[myToken.token]);

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

        axios.post(`${process.env.REACT_APP_API_URL}category`, category)
        .then(res => {
            console.log(res.data);
            alert('Thêm chủ đề thành công');
        })
        .catch(() => alert('Chủ đề này đã tồn tại'));
        
        document.querySelector('input[name="title"]').value = '';
    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="my-table-post">
                        <div className="my-card-header"><b>THÊM CHỦ ĐỀ</b></div>
                            <div className="card-body mt-4">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="title">Tiêu đề</label>
                                        <input type="text" placeholder="Tiêu đề" className="form-control" name="title" onChange={handleChangeTitle} required/>
                                        <button type="submit" className="btn btn-primary mt-2">Thêm</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}