import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {createChatMessage, subscribeToMessageUpdates} from "../../utils/index.js";
import ChatMessage from "./ChatMessage.jsx";

const StyledChat = styled.div`
  height: 100%;
  position: relative;
  
  h1{
    font-weight: bolder;

  }
  .messagesContainer{
    padding: 1em 0;
    height: 75%;
    overflow: scroll;
    overflow-x: hidden;
    
    .ChatMessage{
      margin-bottom: 1em;
    }
    
    h4{
      text-align: center;
    }
  }
  
  .messageSender{
    width: 100%;
    position: absolute;
    bottom: 0;
    
    textarea{
      border: none;
      width: 100%;
      max-height: 10%;
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
    const messagesEndRef = useRef(null)

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

    useEffect(()=>{
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])

    function sendMessage(){
        if(chatId, messageRef.current.value.length === 0) return
        createChatMessage(chatId, messageRef.current.value)
        messageRef.current.value = ''
    }

    return (
        <StyledChat>
            <h1>{chatInfo?.chatBuddy?.username}</h1>
            <hr/>
            <section className="messagesContainer">
                {
                    messages.length === 0 ? <>
                        <h4>Say Hi To the Pet Poster</h4>
                    </>: <></>
                }
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
                <div ref={messagesEndRef}></div>
            </section>
            <section className="messageSender">
                                <textarea
                                    ref={messageRef}
                                    name="" id=""
                                    cols="30" rows="5"
                                    placeholder={'Type your message here'}
                                    onKeyDown={e =>{
                                        if(e.key === 'Enter') {
                                            e.preventDefault()
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