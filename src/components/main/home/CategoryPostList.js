import React from 'react';
import { Link } from 'react-router-dom';

function CategoryPostList(props) {
    let limit6 = 0;

    return (
        <div className="category-post-list">
            {
                props.subCate.map((data) => {
                    if(data.id_category === props.idCate && data.status === '1'){
                        return(
                            <React.Fragment key={data.id}>
                                {
                                    props.posts.map((item) => {
                                        if(limit6 < 6 && item.id_subcategory === data.id && item.status === '1'){
                                            limit6++;
                                            return(
                                                <React.Fragment key={item.id}>
                                                    <div className="one-post">
                                                        <Link to={'/post/'+ item.id}><div className="post-img"><img src={item.image} alt=""/></div></Link>
                                                        <div className="post-content">
                                                            <h5><Link to={'/post/'+ item.id}>{item.title}</Link></h5>
                                                            <p><Link to={'/post/'+ item.id}>{item.description.substr(0, 100)}...</Link></p>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            );
                                        }else return null;
                                    })
                                }
                            </React.Fragment>
                        );
                    }else return null;
                })
            }
        </div>
    );
  }
  
  export default CategoryPostList;