import React from 'react';
import styled from "styled-components";

const StyledChatPreview = styled.button`
  display: block;
  position: relative;
  width: 100%;
  color: white;
  padding: 1em 2em;
  border-radius: 0.5em;
  box-sizing: border-box;
  font-size: larger;
  overflow: hidden;
  :hover{
    filter: brightness(90%);
  }
  
  span{
    position: relative;
    display: block;
    z-index: 2;
    text-shadow: 0 0 10px ${({theme}) => theme.colors.deepGreenBlue};
  }
  
  .background{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`

function ChatPreview({chatBuddy, updateChat, chatId}) {
    return (
        <StyledChatPreview className={'ChatPreview'} onClick={() => updateChat(chatId) }>
            <span>{chatBuddy.username}</span>
            <div className="background">
                <img src={chatBuddy.image} alt=""/>
            </div>
        </StyledChatPreview>
    );
}

export default ChatPreview;