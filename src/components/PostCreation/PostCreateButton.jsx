import React, {useContext, useState} from 'react';
import styled from "styled-components";
import {AuthContext} from "../../context/AuthContext.jsx";

import {BsPlusLg} from "react-icons/bs"

const StyledPostCreateButton = styled.div`
  position: fixed;
  right: 20px;
  top: 150px;
  display: flex;
  flex-direction: column;
  
  .postCreateButton{
    align-self: end;
    font-size: 30px;  
    width: 2em;
    height: 2em;
    background-color: red;
    border-radius: 50%;
    line-height: 0;
    color: white;
  }
`

function PostCreateButton({onClickInvokedUI}) {
    const [isCreatingPost, setIsCreatingPost] = useState(false)
    const {isLoggedIn} = useContext(AuthContext)
    return (
        <StyledPostCreateButton>
            {
                isLoggedIn && (
                    <>
                        <button className={'postCreateButton'} onClick={() => setIsCreatingPost(!isCreatingPost)}>
                            <BsPlusLg />
                        </button>
                        {
                            isCreatingPost && onClickInvokedUI
                        }
                    </>
                )
            }

        </StyledPostCreateButton>
    );
}

export default PostCreateButton;