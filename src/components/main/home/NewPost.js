import React from 'react';
import { Link } from 'react-router-dom';

function NewPost(props) {
    let limit3 = 0;
    let limit6 = 0;
    let idx = [];

    props.posts.map((data, index) => {
        if(limit3 < 3 && data.status === '1'){
            limit3++;
            idx.push(index);
        }
        return null;
    });

    return (
        <div className="new-post">
            <div className="new-post-title"><b>TIN MỚI</b></div>
            <ul className="new-post-list">
                {
                    props.posts.map((data, index) => {
                        if(limit6 < 6 && index !== idx[0] && index !== idx[1] && index !== idx[2] && data.status === '1'){
                            limit6++;
                            return(
                                <React.Fragment key={data.id}>
                                    <li><Link to={'/post/'+ data.id}>{data.title}</Link></li>
                                </React.Fragment>
                            );
                        }else return null;
                    })
                }
            </ul>
        </div>
    );
  }
  
  export default NewPost;