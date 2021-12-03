import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router';
const DetailPage = ({ postid }) => {
    const params = useParams();
    const post = useLocation();
    useEffect(()=>{
        // console.log(postid);
        console.log(params.postId);
        console.log(post.post);
    },[]);
    return (
        <div>
            helloDetail
        </div>
    )
}

export default DetailPage
