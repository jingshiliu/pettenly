import React, {useContext} from 'react';
import styled from "styled-components";
import {AppContext} from "../../context/AppContext.js";

import {BsPlusLg} from "react-icons/bs"

const StyledPostCreateButton = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  
  
  .postCreateButton{
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: end;
    font-size: 30px;
    width: 200px;
    height: 50px;
    background-color: ${({theme}) => theme.colors.deepGreenBlue2};
    border-radius: 0.6em;
    line-height: 0;
    color: ${({theme}) => theme.colors.lightGreen};
    
    span{
      font-size: 20px;
    }
  }
`

function PostCreateButton({onClickInvokedUI}) {
    const {addToTheList} = useContext(AppContext)
    return (
        <StyledPostCreateButton>
            <button className={'postCreateButton'} onClick={() => addToTheList(onClickInvokedUI)}>
                <BsPlusLg />
                <span>Create Post</span>
            </button>
        </StyledPostCreateButton>
    );
}

export default PostCreateButton;