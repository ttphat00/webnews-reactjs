//import React from 'react';
import { useParams } from "react-router";

export default function Logout(){
    let { permission } = useParams();

    if(permission === 'author'){
        if(localStorage.getItem('token')){
            localStorage.removeItem('token');
        }
    }else
        if(permission === 'admin'){
            if(localStorage.getItem('admin')){
                localStorage.removeItem('admin');
            }
        }else{
            if(localStorage.getItem('system_admin')){
                localStorage.removeItem('system_admin');
            }
        }
    
    window.location='/login'
    return null;
}