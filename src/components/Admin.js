import React, { useEffect } from "react";
import '../css/dashboard.css';
import NavbarAdmin from "./user/admin/NavbarAdmin";
import AdminDashboard from "./user/admin/AdminDashboard";

export default function Admin(){

    useEffect(() => {
        document.title = 'Admin';
    },[]);

    if(localStorage.getItem('admin')){
        return (
            <div>
                <NavbarAdmin />
                <AdminDashboard />
            </div>
        );
    }else{
        window.location='/login'
        return null;
    }
}