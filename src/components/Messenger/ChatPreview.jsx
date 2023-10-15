import React from 'react';
import styled from "styled-components";

const StyledChatPreview = styled.div`

`

function ChatPreview({receiver, setCurrentChat, chatId}) {
    return (
        <StyledChatPreview onClick={() => setCurrentChat(chatId)}>
            {receiver.username}
        </StyledChatPreview>
    );
}

export default ChatPreview;