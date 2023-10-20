import React from 'react';
import styled from "styled-components";
import {auth} from "../../config/firebase.js";

const StyledChatMessage = styled.div`
  
`

function ChatMessage({chatBuddy, message, user}) {
    let Message;
    if(chatBuddy.id === user.id){
        Message = (
            <div className={'user'}>
                <span>{message.message}</span>
                <img src={user.image} alt={'Profile image of user'}/>
            </div>
        )
    }else{
        Message = (
            <div className={'chatBuddy'}>
                <div className={'info'}>
                    <span>{chatBuddy.name}</span>
                    <img src={chatBuddy.image} alt="Profile image of other people"/>
                </div>
                <span>{message.message}</span>
            </div>
        )
    }

    return (
        <StyledChatMessage>
            {Message}
        </StyledChatMessage>
    );
}

export default ChatMessage;