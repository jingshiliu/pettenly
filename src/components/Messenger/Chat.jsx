import React, {useState} from 'react';
import styled from "styled-components";

const StyledChat = styled.div`

`

function Chat({chatId}) {
    const [messages, setMessages] = useState([])

    return (
        <StyledChat>
            hello, {chatId}
        </StyledChat>
    );
}

export default Chat;