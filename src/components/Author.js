import React, { useEffect } from "react";
import '../css/dashboard.css';
import Navbar from "./user/author/Navbar";
import AuthorDashboard from "./user/author/AuthorDashboard";

export default function Author(){

    useEffect(() => {
        document.title = 'Author';
    },[]);

    if(localStorage.getItem('token')){
        return (
            <div>
                <Navbar />
                <AuthorDashboard />
            </div>
        );
    }else{
        window.location='/login'
        return null;
    }
}