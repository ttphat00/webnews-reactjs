import React from 'react';
import { Link } from 'react-router-dom';

function FeaturedPost(props) {
    let limit1 = 0;
    let limit2 = 0;
    let idx = 0;

    return (
        <div className="featured-post">
            <div className="featured-post-col-left">
                {
                    props.posts.map((data, index) => {
                        if(limit1 < 1 && data.status === '1'){
                            limit1++;
                            idx = index;
                            return(
                                <React.Fragment key={data.id}>
                                    <Link to={'/post/'+ data.id}>
                                        <div className="big-img">
                                            <img src={data.image} alt=""/>
                                        </div>
                                    </Link>
                                    <div className="big-content">
                                        <h3><Link to={'/post/'+ data.id}>{data.title}</Link></h3>
                                        <p><Link to={'/post/'+ data.id}>{data.description}</Link></p>
                                    </div>
                                </React.Fragment>
                            );
                        }else return null;
                    })
                }
            </div>
            <div className="featured-post-col-right">
                {
                    props.posts.map((data, index) => {
                        if(limit2 < 2 && index !== idx && data.status === '1'){
                            limit2++;
                            return(
                                <React.Fragment key={data.id}>
                                    <div className="small-post">
                                        <Link to={'/post/'+ data.id}>
                                            <div className="small-img">
                                                <img src={data.image} alt=""/>
                                            </div>
                                        </Link>
                                        <div className="small-content">
                                            <h5><Link to={'/post/'+ data.id}>{data.title}</Link></h5>
                                        </div>
                                    </div>
                                </React.Fragment>
                            );
                        }else return null;
                    })
                }
            </div>
        </div>
    );
  }
  
  export default FeaturedPost;