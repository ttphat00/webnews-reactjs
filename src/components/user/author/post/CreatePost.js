import React, { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function CreateCategory(){

    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [content,setContent] = useState('');
    const [key,setKey] = useState('');
    const [selectedFile,setSelectedFile] = useState(null);
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

    function handleChangeTitle(e){
        setTitle(e.target.value);
    }

    function handleChangeDescription(e){
        setDescription(e.target.value);
    }

    function onFileChange (e){
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (event) => {
                setSelectedFile(event.target.result);
                //console.log(event.target.result);
                document.querySelector('.image-post').setAttribute('src', event.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }else{
            document.querySelector('.image-post').setAttribute('src', '');
        }
    }

    function handleChangeContent(e, editor){
        setContent(editor.getData());
        //console.log(editor.getData());
    }

    function handleChangeKey(e){
        setKey(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        
        const post = {
            title: title,
            description: description,
            image: selectedFile,
            content: content,
            id_subcategory: key,
            id_user: user.result.id,
            status: '0'
        };

        axios.post(`${process.env.REACT_APP_API_URL}post`, post)
        .then(res => {
            console.log(res.data);
            alert('Thêm bài viết thành công');
            window.location.reload();
        })
    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="my-table-post">
                        <div className="my-card-header"><b>THÊM BÀI VIẾT</b></div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="title">Tiêu đề</label>
                                        <input type="text" placeholder="Tiêu đề" className="form-control" name="title" onChange={handleChangeTitle} required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="image">Hình ảnh</label>
                                        <input type="file" className="form-control-file col-sm-6" name="image" accept=".png, .jpg, .jpeg" onChange={onFileChange} required/>
                                        <img className="image-post w-25 ml-3" src="" alt=""/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Mô tả ngắn</label>
                                        <textarea className="form-control resize-txt" name="description" rows="5" onChange={handleChangeDescription} required></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="content">Nội dung</label>
                                        <CKEditor
                                        editor={ClassicEditor}
                                        onChange={handleChangeContent}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="id_subcategory">Chủ đề</label>
                                        <select name="id_subcategory" className="form-control col-sm-5" onChange={handleChangeKey}>
                                            {
                                                subcategory.map((data) => {
                                                    // if(user.result.id === data.id_user){
                                                        return (
                                                            <React.Fragment key={data.id}>
                                                                <option value={data.id}>{data.title}</option>
                                                            </React.Fragment>
                                                        );
                                                    // }else return null;
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary mt-2 btn-add-post">Thêm</button>
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