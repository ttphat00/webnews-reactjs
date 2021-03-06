import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminInfo(){
    const [category, setCategory] = useState([]);
    const [subcategory, setSubcategory] = useState([]);
    const [post, setPost] = useState([]);
    const [user, setUser] = useState({result:{id:''}});
    let myToken = JSON.parse(localStorage.getItem('admin'));
    const approving_cate = [];
    const approved_cate = [];
    const approving_post = [];
    const approved_post = [];

    useEffect(() => {
        axios.get('https://webnews-backend.herokuapp.com/api/category')
        .then(res => {
            setCategory(res.data);
        })
        .catch(error => console.log(error));

        axios.get('https://webnews-backend.herokuapp.com/api/subcategory')
        .then(res => {
            setSubcategory(res.data);
        })
        .catch(error => console.log(error))

        axios.get('https://webnews-backend.herokuapp.com/api/post')
        .then(res => {
            setPost(res.data);
        })
        .catch(error => console.log(error))

        axios.get(`https://webnews-backend.herokuapp.com/api/user-info?token=${myToken.token}`)
        .then(res => {
            setUser(res.data);
        })
        .catch(error => console.log(error));
    }, [])

    return (
        <>
            {
                category.map((data) => {
                    if(data.status === '1'){
                        approved_cate.push(data);
                    }else{
                        if(data.status === '0'){
                            approving_cate.push(data);
                        }
                    }
                    return null;
                })
            }
            {
                subcategory.map((data) => {
                    if(data.status === '1'){
                        approved_cate.push(data);
                    }else{
                        if(data.status === '0'){
                            approving_cate.push(data);
                        }
                    }
                    return null;
                })
            }
            {
                post.map((data) => {
                    if(data.status === '1'){
                        approved_post.push(data);
                    }else{
                        if(data.status === '0'){
                            approving_post.push(data);
                        }
                    }
                    return null;
                })
            }
            
            
            <div className="d-flex justify-content-center all-cate">
                <div className="bg-warning text-white quantity-cate">
                    <div>Ch??? ????? ch??? duy???t</div>
                    <div>{approving_cate.length}</div>
                </div>
                <div className="bg-success text-white quantity-cate">
                    <div>Ch??? ????? ???? duy???t</div>
                    <div>{approved_cate.length}</div>
                </div>
                <div className="bg-warning text-white quantity-post">
                    <div>B??i vi???t ch??? duy???t</div>
                    <div>{approving_post.length}</div>
                </div>
                <div className="bg-success text-white quantity-post">
                    <div>B??i vi???t ???? duy???t</div>
                    <div>{approved_post.length}</div>
                </div>
            </div>
            <div style={{position: 'absolute', top: '200px', left: '650px', textAlign: 'center'}}>
                <img style={{width: '100px', height: '100px'}} src="https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=1000w" alt="" />
                <p style={{marginTop: '20px', textAlign: 'left'}}>
                    <b>H??? t??n:</b> {user.result.name}<br />
                    <b>Email:</b> {user.result.email}<br />
                    <b>Ch???c v???:</b> {user.result.permission}
                </p>
            </div>
        </>
    )
}