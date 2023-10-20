import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {subscribeToMessageUpdates} from "../../utils/index.js";
import ChatMessage from "./ChatMessage.jsx";

const StyledChat = styled.div`

`

function Chat({chatId, chatInfo, user}) {
    const [messages, setMessages] = useState([])

    useEffect(()=>{
        const unsubscribe = subscribeToMessageUpdates(chatId, newMessages =>{
            setMessages(newMessages)
        })

        return ()=>{
            if(unsubscribe !== undefined){
                unsubscribe()
            }
        }
    }, [chatId])

    return (
        <StyledChat>
            <h1>Hello, {chatId}</h1>
            {
                messages.map(message => {
                    return <ChatMessage
                                key={message.id}
                                message={message}
                                chatBuddy={chatInfo.chatBuddy}
                                user={user}
                           />
                })
            }
        </StyledChat>
    );
}

export default Chat;