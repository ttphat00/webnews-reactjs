import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function MenuNavbar() {
    const [category, setCategory] = useState([]);
    const [subcategory, setSubcategory] = useState([]);

    function navbarFixed(){
        var navElement = document.querySelector('nav');
        if(this.pageYOffset > 90){
            if(!navElement.classList.contains('navbar-fixed')){
                navElement.classList.add('navbar-fixed');
            }
        }else{
            if(navElement.classList.contains('navbar-fixed')){
                navElement.classList.remove('navbar-fixed');
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll',navbarFixed);

        axios.get('https://webnews-backend.herokuapp.com/api/category')
        .then(res => {
            setCategory(res.data);
            axios.get('https://webnews-backend.herokuapp.com/api/subcategory')
            .then(res => {
                setSubcategory(res.data);
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));

        return () => {
            window.removeEventListener('scroll',navbarFixed);
        }
    }, []);

    return (
        <>
            <nav className="menu-navbar">
                <div className="container">
                    <ul>
                        <li className="home"><Link to="/"><i style={{fontSize: '18px'}} className="fa fa-home" aria-hidden="true"></i></Link></li>
                        {
                            category.map((data) => {
                                if(data.status === '1'){
                                    return(
                                        <React.Fragment key={data.id}>
                                            <li>
                                                <Link to={'/category/'+data.id+'/1'}>{data.title}</Link>
                                                <div className="dropdown">
                                                    <ul className="dropdown-list">
                                                        {
                                                            subcategory.map((item) => {
                                                                if(item.id_category === data.id && item.status === '1'){
                                                                    return(
                                                                        <React.Fragment key={item.id}>
                                                                            <li><Link to={'/subcategory/'+item.id+'/1'}>{item.title}</Link></li>
                                                                        </React.Fragment>
                                                                    );
                                                                }else return null;
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            </li>
                                        </React.Fragment>
                                    );
                                }else return null;
                            })
                        }
                    </ul>
                </div>
            </nav>
        </>
    );
  }
  
  export default MenuNavbar;