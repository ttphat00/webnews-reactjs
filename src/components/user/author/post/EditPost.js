import React from "react";
import { useState } from "react";
import ShowPost from "./ShowPost";
import FormUpdate from './FormUpdate';

export default function EditPost(){

    const [isEdit, setIsEdit] = useState(false);
    const [id,setId] = useState('');
    const [isShow, setIsShow] = useState(false);


    function getIsShow(res){
        setIsShow(res);
    }

    function clickBack(e){
        window.location.reload();
    }

    function isClickEdit(res){
        setIsEdit(res);
    }

    function getId(res){
        setId(res);
    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-11">
                        <div className="my-table-post">
                            <div className="my-card-header"><b>DANH SÁCH BÀI VIẾT</b> {isShow ? <button type="submit" className="btn btn-light" onClick={clickBack}><i className="fa fa-undo" aria-hidden="true"></i></button> : null}</div>
                            <div className="card-body">
                                {isEdit ? <FormUpdate valueId={id} valueShow={getIsShow}/> : <ShowPost clickEdit={isClickEdit} idValue={getId}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}