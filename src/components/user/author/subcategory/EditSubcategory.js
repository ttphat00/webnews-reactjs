import React from "react";
import { useState } from "react";
import FormEdit from './FormEdit';
import FormUpdate from './FormUpdate';

export default function EditSubcategory(){

    const [title, setTitle] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [key,setKey] = useState('');
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

    function getKey(res){
        setKey(res);
    }

    function getTitle(res){
        setTitle(res);
    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="my-table-post">
                            <div className="my-card-header"><b>CHỈNH SỬA CHỦ ĐỀ CON</b> {isShow ? <button type="submit" className="btn btn-light" onClick={clickBack}><i className="fa fa-undo" aria-hidden="true"></i></button> : null}</div>
                            <div className="card-body mt-4">
                                {isEdit ? <FormUpdate valueId={key} valueTitle={title} valueShow={getIsShow}/> : <FormEdit clickEdit={isClickEdit} keyValue={getKey} titleValue={getTitle}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}