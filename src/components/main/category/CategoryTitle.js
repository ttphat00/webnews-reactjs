import React from "react";
import { Link } from "react-router-dom";

export default function CategoryTitle(props){
    return (
        <div className="cp-title">
            <div className="cp-category-title"><Link to={'/category/'+props.cate.id+'/1'}><b>{props.cate.title}</b></Link></div>
            <div className="cp-subcategory-title">
                {
                    props.subCate.map((data) => {
                        if(data.id_category === props.cate.id && data.status === '1'){
                            return(
                                <React.Fragment key={data.id}>
                                    <Link to={'/subcategory/'+data.id+'/1'}>{data.title}</Link>
                                </React.Fragment>
                            );
                        }else return null;
                    })
                }
            </div>
        </div>
    );
}