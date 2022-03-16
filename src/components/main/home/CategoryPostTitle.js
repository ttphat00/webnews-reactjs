import React from 'react';
import { Link } from 'react-router-dom';

function CategoryPostTitle(props) {
    return (
        <div className="category-post-title">
            <div className="category-title"><Link to={'/category/'+props.idCate+'/1'}><b>{props.titleCate}</b></Link></div>
            <div className="subcategory-title">
                {
                    props.subCate.map((data) => {
                        if(data.id_category === props.idCate && data.status === '1'){
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
  
  export default CategoryPostTitle;