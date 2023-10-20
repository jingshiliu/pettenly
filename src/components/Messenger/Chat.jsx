import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {subscribeToMessageUpdates} from "../../utils/index.js";
import ChatMessage from "./ChatMessage.jsx";

const StyledChat = styled.div`
  h1{
    font-weight: bolder;

  }
  .messagesContainer{
    padding: 1em 0;
    .ChatMessage{
      margin-bottom: 1em;
    }
  }
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
            <h1>{chatInfo?.chatBuddy?.username}</h1>
            <section className="messagesContainer">
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
            </section>
        </StyledChat>
    );
}

export default Chat;