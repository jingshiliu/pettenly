import React, {useContext, useEffect, useMemo, useState} from 'react';
import styled from "styled-components";
import {AuthContext} from "../../context/AuthContext.jsx";
import {getImageFromStorage} from "../../utils/index.js";
import {ListContext} from "../../context/ListContext.js";
import PostDetail from "./PostDetail.jsx";


const StyledPostPreview = styled.div`
  width: 60px;
  height: 60px;
  background-color: ${({theme}) => theme.colors.greenBlue};
  object-fit: cover;
  overflow: hidden;
  
  border-radius: 1em;
  
  img{
    height: inherit;
  }
`

function PostPreview({post}) {
    const [imageUrl, setImageUrl] = useState('')
    const {isLoggedIn} = useContext(AuthContext)
    const {addToTheList} = useContext(ListContext)

    useEffect(()=>{
        getImage()
    }, [])

    async function getImage(){
        const url = await getImageFromStorage(post.petImage)
        if(! url) return
        setImageUrl(url)
    }

    function handleOnClick(){
        if (! isLoggedIn)
            return

        addToTheList(<PostDetail post={post}/>, true)
    }
    return (
        <StyledPostPreview className={'PostPreview'} onClick={handleOnClick}>
            {
                imageUrl ?
                    <img src={imageUrl} alt="preview photo of post that is a pet"/>
                    :
                    "Super Cute Pet Image"
            }
        </StyledPostPreview>
    );
}

export default PostPreview;