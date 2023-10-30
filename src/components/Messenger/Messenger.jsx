import React, {useEffect, useMemo, useState} from 'react';
import styled from "styled-components";

import {getChatPreviews, getUser} from "../../utils/index.js";
import {auth} from "../../config/firebase.js";
import ChatPreview from "./ChatPreview.jsx";
import Icon from "../Icon.jsx";
import Chat from "./Chat.jsx";

const StyledChat = styled.div`
  width: 50vw;
  height: 75vh;
  border-radius: 1.4em;
  background-color: ${({theme}) => theme.colors.deepGreenBlue};
  z-index: 1;
  padding: 20px;
  color: ${({theme}) => theme.colors.lightGreen};
  display: flex;
  justify-content: space-between;
  opacity: 0.95;
  
  .leftCol{
    width: 25%;
    
    h1{
      margin-bottom: 10px;
      font-weight: normal;
    }
    
    .ChatPreview{
      margin-bottom: 5px;
      
      :first-child{
        .background{
          z-index: 3;
        }
        color: ${({theme}) => theme.colors.lightGreen};
      }
    }
  }
  
  .chatContainer{
    width: 73%;
  }
`

function Messenger() {
    // two columns, left for chat selection with diff user, right for current chat
    // when component first load, fetch all the chats of current user from firebase
    // sorted with the order of last updated
    const [chats, setChats] = useState([])
    const [currentChatId, setCurrentChatId] = useState('')
    const [user, setUser] = useState({})

    useEffect(()=>{
        loadData()
            .catch(err => console.error(err))
        getUser()
            .then(userInfo => setUser(userInfo))
            .catch(err => console.error(err))
    }, [])

    async function loadData(){
        const chatPreviews = await getChatPreviews()
        const newChats = []
        for(let chatPreview of chatPreviews){
            let chatBuddyId = chatPreview.user1 === auth.currentUser.uid ? chatPreview.user2 : chatPreview.user1
            let chatBuddy = await getUser(chatBuddyId)

            newChats.push({
                ...chatPreview,
                chatBuddy
            })
        }
        setChats(newChats)
        setCurrentChatId(newChats[0].id)
    }

    function updateChat(chatId){
        setCurrentChatId(chatId)
        const newChats = [chats.find(chat => chat.id === chatId)]
        for(let chat of chats){
            if (chat.id === chatId)
                continue
            newChats.push(chat)
        }
        setChats(newChats)
    }

    return (
        <StyledChat>
            <section className={'leftCol'}>
                <h1><Icon /> Messenger</h1>
                <div className="chatPreview">
                    {chats.map(chat =>
                        <ChatPreview
                            chatBuddy={chat.chatBuddy}
                            updateChat={updateChat}
                            chatId={chat.id}
                            key={chat.id}
                        />
                    )}
                </div>
            </section>
            <section className={'chatContainer'}>
                <Chat
                    chatId={currentChatId}
                    chatInfo={chats[0]}
                    user={user}
                />
            </section>
        </StyledChat>
    );
}

export default Messenger;