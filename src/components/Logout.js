//import React from 'react';
import { useParams } from "react-router";

export default function Logout(){
    let { permission } = useParams();

    if(permission === 'author'){
        if(localStorage.getItem('token')){
            localStorage.removeItem('token');
        }
    }else{
        if(localStorage.getItem('admin')){
            localStorage.removeItem('admin');
        }
    }
    
    window.location='/login'
    return null;
}