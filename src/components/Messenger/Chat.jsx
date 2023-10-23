import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {createChatMessage, subscribeToMessageUpdates} from "../../utils/index.js";
import ChatMessage from "./ChatMessage.jsx";

const StyledChat = styled.div`
  height: 100%;
  
  h1{
    font-weight: bolder;

  }
  .messagesContainer{
    padding: 1em 0;
    height: 75%;
    
    .ChatMessage{
      margin-bottom: 1em;
    }
  }
  
  .messageSender{
    width: 100%;
    position: relative;
    
    textarea{
      border: none;
      width: 100%;
      padding: 0.8em 0.5em;
      box-sizing: border-box;
      border-radius: 1em;
      color: ${({theme}) => theme.colors.deepGreenBlue2};
      background-color: ${({theme}) => theme.colors.lightGreen};
    }
    
    button{
      border-radius: 0.8em;
      background-color: ${({theme}) => theme.colors.deepGreenBlue2};
      color: ${({theme}) => theme.colors.lightGreen};
      padding: 0.5em 2em;
      
      position: absolute;
      right: 0;
      bottom: 0.2em;
      
      :hover{
        filter: brightness(0.9);
      }
    }
  }
`

function Chat({chatId, chatInfo, user}) {
    const [messages, setMessages] = useState([])
    const messageRef = useRef()

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

    function sendMessage(){
        createChatMessage(chatId, messageRef.current.value)
        messageRef.current.value = ''
    }

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
            <section className="messageSender">
                                <textarea
                                    ref={messageRef}
                                    name="" id=""
                                    cols="30" rows="5"
                                    placeholder={'Type your message here'}
                                    onKeyDown={e =>{
                                        if(e.key === 'Enter') {
                                            sendMessage()
                                        }
                                    }}
                                />
                <button onClick={sendMessage}>Send</button>
            </section>
        </StyledChat>
    );
}

export default Chat;