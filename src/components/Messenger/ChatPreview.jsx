import React from 'react';
import styled from "styled-components";

const StyledChatPreview = styled.div`
  width: 100%;
  background-color: ${({theme}) => theme.colors.blue};
  color: ${({theme}) => theme.colors.deepGreenBlue};
  padding: 20px 10px;
  border-radius: 0.5em;
  box-sizing: border-box;
  :hover{
    filter: brightness(90%);
  }
`

function ChatPreview({chatBuddyUserName, updateChat, chatId}) {
    return (
        <StyledChatPreview className={'ChatPreview'} onClick={() => updateChat(chatId) }>
            {chatBuddyUserName}
        </StyledChatPreview>
    );
}

export default ChatPreview;