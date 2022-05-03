import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export default function ShowCategory(){

    let stt = 0;
    let sts = '';
    const [category,setCategory] = useState([]);
    const [subcategory,setSubcategory] = useState([]);
    const [user, setUser] = useState({});
    let myToken = JSON.parse(localStorage.getItem('token'));
    let { id } = useParams();
    let sumCate = [];
    let limit5 = 0;

    stt = (id - 1) * 5;

    useEffect(() => {
        
        axios.get(`https://webnews-backend.herokuapp.com/api/user-info?token=${myToken.token}`)
        .then(res => {
            setUser(res.data);
            
            axios.get('https://webnews-backend.herokuapp.com/api/category')
            .then(res => {
                setCategory(res.data);
                axios.get('https://webnews-backend.herokuapp.com/api/subcategory')
                .then(res => {
                    setSubcategory(res.data);
                })
                .catch(error => console.log(error))
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
        
    },[myToken.token]);

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="my-table-post">
                        <div className="my-card-header"><b>CHỦ ĐỀ ĐÃ THÊM</b></div>
                            <div className="card-body">
                                <table className="table">
                                    <thead className="bg-primary text-white">
                                        <tr>
                                            <th scope="col">Stt</th>
                                            <th scope="col">Chủ đề</th>
                                            <th scope="col">Chủ đề con</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            category.map((data) => {
                                                
                                                if(user.result.id === data.id_user){
                                                    sumCate.push(data);
                                                }
                                                return null;
                                                
                                            })
                                        }
                                        {
                                            sumCate.map((data, index) => {
                                                if(limit5 < 5 && index >= (5 * (id - 1))){
                                                    stt++;
                                                    limit5++;
                                                    if(data.status === '0'){
                                                        sts = 'status-waiting';
                                                    }else if(data.status === '1'){
                                                        sts = 'status-success';
                                                    }else sts = 'status-fail';

                                                    return (
                                                        <React.Fragment key={data.id}>
                                                            <tr>
                                                                <td>{stt}</td>
                                                                <td style={{color: 'white'}}><div className={sts}>{data.title}</div></td>
                                                                <td style={{color: 'white'}}>
                                                                    {
                                                                        subcategory.map((item) => {
                                                                            if(item.id_category === data.id && user.result.id === item.id_user){
                                                                                if(item.status === '0'){
                                                                                    sts = 'status-waiting';
                                                                                }else if(item.status === '1'){
                                                                                    sts = 'status-success';
                                                                                }else sts = 'status-fail';

                                                                                return (
                                                                                    <React.Fragment key={item.id}>
                                                                                        <div className= {sts}>{item.title}</div>
                                                                                    </React.Fragment>
                                                                                );
                                                                            }else return null;
                                                                        })
                                                                    }
                                                                </td>
                                                            </tr>
                                                        </React.Fragment>
                                                    );
                                                }else return null;
                                            })
                                        }
                                    </tbody>
                                </table>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className="page-item"><Link className="page-link" to={'/author/category/'+(id > 1 ? (parseInt(id) - 1) : 1)}>&laquo;</Link></li>
                                        {
                                            sumCate.map((data, index) => {
                                                if( index < (sumCate.length/5) ){
                                                    return(
                                                        <li key={index} className="page-item"><Link className="page-link" to={'/author/category/'+(index + 1)}>{index + 1}</Link></li>
                                                    );
                                                }else return null;
                                            })
                                        }
                                        <li className="page-item"><Link className="page-link" to={'/author/category/'+(id < (sumCate.length/5) ? (parseInt(id) + 1) : id)}>&raquo;</Link></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}