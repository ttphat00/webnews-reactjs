import React, { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function FormUpdate(props){

    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [content,setContent] = useState('');
    const [key,setKey] = useState('');
    const [selectedFile,setSelectedFile] = useState(null);
    const [postSelected,setPostSelected] = useState({});
    const [subcategory,setSubcategory] = useState([]);
    const [user, setUser] = useState({});
    let myToken = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        props.valueShow(true);

        axios.get(`https://webnews-backend.herokuapp.com/api/user-info?token=${myToken.token}`)
        .then(res => {
            setUser(res.data);
            axios.get(`https://webnews-backend.herokuapp.com/api/post/${props.valueId}`)
            .then(res => {
                setPostSelected(res.data);
                setTitle(res.data.title);
                setSelectedFile(res.data.image);
                setDescription(res.data.description);
                setContent(res.data.content);
                setKey(res.data.id_subcategory);
                axios.get('https://webnews-backend.herokuapp.com/api/subcategory')
                .then(res => {
                    setSubcategory(res.data);
                    // setKey(document.querySelector('select').value);
                })
                .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    },[myToken.token, props]);

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

        axios.put(`https://webnews-backend.herokuapp.com/api/post/${props.valueId}`, post)
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
                    <label htmlFor="title">Tiêu đề</label>
                    <input type="text" placeholder="Tiêu đề" className="form-control" name="title" defaultValue={postSelected.title} onChange={handleChangeTitle} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="image">Hình ảnh</label>
                    <input type="file" className="form-control-file col-sm-6" name="image" accept=".png, .jpg, .jpeg" onChange={onFileChange}/>
                    <img className="image-post w-30 ml-3" src={postSelected.image} alt=""/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Mô tả ngắn</label>
                    <textarea className="form-control resize-txt" name="description" rows="5" defaultValue={postSelected.description} onChange={handleChangeDescription} required></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="content">Nội dung</label>
                    <CKEditor
                    editor={ClassicEditor}
                    data={postSelected.content}
                    onChange={handleChangeContent}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="id_subcategory">Chủ đề</label>
                    <select name="id_subcategory" className="form-control col-sm-3" value={key} onChange={handleChangeKey}>
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
                    <button type="submit" className="btn btn-primary btn-edit-post mt-2">Cập nhật</button>
                </div>
            </form>
        </>
    );
}