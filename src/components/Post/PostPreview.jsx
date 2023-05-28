import React, {useContext, useEffect, useState} from 'react';
import styled from "styled-components";
import {AuthContext} from "../../context/AuthContext.jsx";
import {getImageFromStorage} from "../../utils/index.js";


const StyledPostPreview = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${({theme}) => theme.colors.greenBlue};
  object-fit: contain;
  overflow: hidden;
  
  border-radius: 1em;
  
  img{
    width: inherit;
    height: inherit;
  }
`

function PostPreview({setDisplayingPost, post}) {
    const [imageUrl, setImageUrl] = useState('')
    const {isLoggedIn} = useContext(AuthContext)

    useEffect(()=>{
        getImage()
    }, [])

    async function getImage(){
        const url = await getImageFromStorage(post.petImage)
        if(! url) return
        setImageUrl(url)
    }


    const handleOnClick = isLoggedIn ? () => setDisplayingPost(post) : null;
    return (
        <StyledPostPreview onClick={handleOnClick}>
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