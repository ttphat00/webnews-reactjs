import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function CreateSubcategory(){

    const [title,setTitle] = useState('');
    const [key,setKey] = useState('');
    const [category,setCategory] = useState([]);
    const [user, setUser] = useState({});
    let myToken = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        
        axios.get(`https://webnews-backend.herokuapp.com/api/user-info?token=${myToken.token}`)
        .then(res => {
            setUser(res.data);
            axios.get('https://webnews-backend.herokuapp.com/api/category')
            .then(res => {
                setCategory(res.data);
                setKey(document.querySelector('select').value);
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
        
    },[myToken.token]);

    function handleChangeTitle(e){
        setTitle(e.target.value);
    }

    function handleChangeKey(e){
        setKey(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();

        const subcategory = {
            title: title,
            id_category: key,
            id_user: user.result.id,
            status: '0'
        };

        axios.post('https://webnews-backend.herokuapp.com/api/subcategory', subcategory)
        .then(res => {
            console.log(res.data);
            alert('Thêm chủ đề con thành công');
        })
        
        document.querySelector('input[name="title"]').value = '';
    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="my-table-post">
                            <div className="my-card-header"><b>THÊM CHỦ ĐỀ CON</b></div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="category_title">Chủ đề</label>
                                        <select className="form-control col-md-5" name="category_title" onChange={handleChangeKey}>
                                            {
                                                category.map((data) => {
                                                    
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