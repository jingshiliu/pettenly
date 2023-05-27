import React, {useContext} from 'react';
import styled from "styled-components";
import {AuthContext} from "../../context/AuthContext.jsx";


const StyledPostPreview = styled.div`
  width: 50px;
  height: 50px;
  background-color: red;
`

function PostPreview({setDisplayingPost, post}) {
    const {isLoggedIn} = useContext(AuthContext)

    const handleOnClick = isLoggedIn ? () => setDisplayingPost(post) : null;
    return (
        <StyledPostPreview onClick={handleOnClick}>
            Super Cute Pet Image
        </StyledPostPreview>
    );
}

export default PostPreview;